import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import {
  canonicalCity,
  getCoordsForLocation,
  locationLabel,
  normalizeCountry,
} from '@/lib/submission-location-coords'

type Hotspot = {
  label: string
  lat: number
  lng: number
  submissions: number
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('submissions')
      .select('city, country')
      .not('city', 'is', null)
      .not('country', 'is', null)

    if (error) {
      return NextResponse.json({ error: 'Failed to read submissions' }, { status: 500 })
    }

    const counts = new Map<
      string,
      { label: string; city: string; country: string; submissions: number }
    >()

    for (const row of data ?? []) {
      const rawCity = typeof row.city === 'string' ? row.city : ''
      const rawCountry = typeof row.country === 'string' ? row.country : ''
      const country = normalizeCountry(rawCountry)
      const city = canonicalCity(rawCity)

      if (!city || !country) continue

      const label = locationLabel(city, country)
      const key = label.toLowerCase()
      const current = counts.get(key)

      if (current) {
        current.submissions += 1
      } else {
        counts.set(key, { label, city, country, submissions: 1 })
      }
    }

    const aggregated = Array.from(counts.values()).sort(
      (a, b) => b.submissions - a.submissions,
    )

    const hotspots: Hotspot[] = []

    for (const item of aggregated) {
      const coords = getCoordsForLocation(item.city, item.country)
      if (!coords) continue

      hotspots.push({
        label: item.label,
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
