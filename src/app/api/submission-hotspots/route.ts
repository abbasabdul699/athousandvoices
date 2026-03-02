import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

type CountryCount = {
  country: string
  submissions: number
}

type Hotspot = {
  label: string
  lat: number
  lng: number
  submissions: number
}

const countryCoordsCache = new Map<string, { lat: number; lng: number } | null>()

const COUNTRY_ALIASES: Record<string, string> = {
  usa: 'United States',
  us: 'United States',
  'united states of america': 'United States',
  uk: 'United Kingdom',
  uae: 'United Arab Emirates',
}

const normalizeCountry = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.,]+$/g, '')

async function lookupCountryCoords(country: string): Promise<{ lat: number; lng: number } | null> {
  const normalizedCountry = normalizeCountry(country)
  const cacheKey = normalizedCountry.toLowerCase()
  if (countryCoordsCache.has(cacheKey)) {
    return countryCoordsCache.get(cacheKey) ?? null
  }

  const aliasResolved = COUNTRY_ALIASES[cacheKey] ?? normalizedCountry

  const endpoints = [
    `https://restcountries.com/v3.1/name/${encodeURIComponent(aliasResolved)}?fullText=true&fields=name,latlng`,
    `https://restcountries.com/v3.1/name/${encodeURIComponent(aliasResolved)}?fields=name,latlng`,
  ]

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { next: { revalidate: 60 * 60 } })
      if (!response.ok) continue

      const data = (await response.json()) as Array<{ latlng?: number[] }>
      const latlng = data?.[0]?.latlng
      if (Array.isArray(latlng) && latlng.length >= 2) {
        const [lat, lng] = latlng
        const coords = { lat, lng }
        countryCoordsCache.set(cacheKey, coords)
        return coords
      }
    } catch {
      // Ignore transient lookup failures and try next strategy.
    }
  }

  countryCoordsCache.set(cacheKey, null)
  return null
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('submissions')
      .select('country')
      .not('country', 'is', null)

    if (error) {
      return NextResponse.json({ error: 'Failed to read submissions' }, { status: 500 })
    }

    const counts = new Map<string, CountryCount>()

    for (const row of data ?? []) {
      const rawCountry = typeof row.country === 'string' ? row.country : ''
      const country = normalizeCountry(rawCountry)
      if (!country) continue

      const key = country.toLowerCase()
      const current = counts.get(key)
      if (current) {
        current.submissions += 1
      } else {
        counts.set(key, { country, submissions: 1 })
      }
    }

    const aggregated = Array.from(counts.values()).sort((a, b) => b.submissions - a.submissions)

    const hotspots: Hotspot[] = []
    for (const item of aggregated) {
      const coords = await lookupCountryCoords(item.country)
      if (!coords) continue

      hotspots.push({
        label: item.country,
        submissions: item.submissions,
        lat: coords.lat,
        lng: coords.lng,
      })
    }

    return NextResponse.json({ hotspots })
  } catch (error) {
    console.error('submission-hotspots API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
