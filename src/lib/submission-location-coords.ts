const COUNTRY_COORDS: Record<string, { lat: number; lng: number }> = {
  Afghanistan: { lat: 33.9391, lng: 67.71 },
  Albania: { lat: 41.1533, lng: 20.1683 },
  Australia: { lat: -25.2744, lng: 133.7751 },
  Austria: { lat: 47.5162, lng: 14.5501 },
  Belgium: { lat: 50.5039, lng: 4.4699 },
  Canada: { lat: 56.1304, lng: -106.3468 },
  China: { lat: 35.8617, lng: 104.1954 },
  Denmark: { lat: 56.2639, lng: 9.5018 },
  Finland: { lat: 61.9241, lng: 25.7482 },
  France: { lat: 46.2276, lng: 2.2137 },
  Germany: { lat: 51.1657, lng: 10.4515 },
  Indonesia: { lat: -0.7893, lng: 113.9213 },
  Iran: { lat: 32.4279, lng: 53.688 },
  Kazakhstan: { lat: 48.0196, lng: 66.9237 },
  Pakistan: { lat: 30.3753, lng: 69.3451 },
  'Sri Lanka': { lat: 7.8731, lng: 80.7718 },
  Tanzania: { lat: -6.369, lng: 34.8888 },
  Turkey: { lat: 38.9637, lng: 35.2433 },
  'United Kingdom': { lat: 55.3781, lng: -3.436 },
  'United States': { lat: 37.0902, lng: -95.7129 },
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'Kabul, Afghanistan': { lat: 34.5553, lng: 69.2075 },
  'Herat, Afghanistan': { lat: 34.3529, lng: 62.204 },
  'Ghazni, Afghanistan': { lat: 33.5539, lng: 68.422 },
  'Mazar-e-Sharif, Afghanistan': { lat: 36.7069, lng: 67.1143 },
  'Badakhshan, Afghanistan': { lat: 36.7348, lng: 70.812 },
  'Bamyan, Afghanistan': { lat: 34.825, lng: 67.825 },
  'Balkh, Afghanistan': { lat: 36.7581, lng: 66.8981 },
  'Takhar, Afghanistan': { lat: 36.6694, lng: 69.6681 },
  'Ghor, Afghanistan': { lat: 34.0996, lng: 64.905 },
  'Baghlan, Afghanistan': { lat: 36.1307, lng: 68.7087 },
  'Helmand, Afghanistan': { lat: 31.3636, lng: 64.0 },
  'Nili, Afghanistan': { lat: 33.7218, lng: 66.1302 },
  'Sheberghan, Afghanistan': { lat: 36.6678, lng: 65.7529 },
  'Islamabad, Pakistan': { lat: 33.6844, lng: 73.0479 },
  'Quetta, Pakistan': { lat: 30.1798, lng: 66.975 },
  'Tehran, Iran': { lat: 35.6892, lng: 51.389 },
  'Mashhad, Iran': { lat: 36.2605, lng: 59.6168 },
  'Shiraz, Iran': { lat: 29.5918, lng: 52.5837 },
  'Toronto, Canada': { lat: 43.6532, lng: -79.3832 },
  'London, United Kingdom': { lat: 51.5072, lng: -0.1276 },
  'Berlin, Germany': { lat: 52.52, lng: 13.405 },
  'Istanbul, Turkey': { lat: 41.0082, lng: 28.9784 },
  'Fremont, United States': { lat: 37.5483, lng: -121.9886 },
}

/** Normalize city names so variants like "kabul", "کابل" group together. */
const CITY_ALIASES: Record<string, string> = {
  kabul: 'Kabul',
  'کابل': 'Kabul',
  'kabul afghanistan': 'Kabul',
  herat: 'Herat',
  'هرات': 'Herat',
  ghazni: 'Ghazni',
  gazni: 'Ghazni',
  'mazar-e-sharif': 'Mazar-e-Sharif',
  'mazar-i-sharif': 'Mazar-e-Sharif',
  mazaresharif: 'Mazar-e-Sharif',
  'mazar e sharif': 'Mazar-e-Sharif',
  mazar_e_sharif: 'Mazar-e-Sharif',
  'mazar_e_sharif, karter wahdat': 'Mazar-e-Sharif',
  'مزارشریف': 'Mazar-e-Sharif',
  'ولایت بلخ شهر مزارشریف': 'Mazar-e-Sharif',
  'تهران': 'Tehran',
  'تهران, afghanistan': 'Tehran',
}

export function normalizeCountry(value: string) {
  return value.trim().replace(/\s+/g, ' ').replace(/[.,]+$/g, '')
}

export function canonicalCity(city: string) {
  const trimmed = city.trim().replace(/\s+/g, ' ')
  const aliasKey = trimmed.toLowerCase()
  return CITY_ALIASES[aliasKey] ?? CITY_ALIASES[trimmed] ?? trimmed
}

export function locationLabel(city: string, country: string) {
  return `${canonicalCity(city)}, ${normalizeCountry(country)}`
}

function offsetFromLabel(label: string, lat: number, lng: number) {
  let hash = 0
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) | 0
  }

  const latOffset = ((hash % 100) / 100 - 0.5) * 3.5
  const lngOffset = (((hash / 100) % 100) / 100 - 0.5) * 3.5

  return { lat: lat + latOffset, lng: lng + lngOffset }
}

export function getCoordsForLocation(city: string, country: string) {
  const normalizedCountry = normalizeCountry(country)
  const label = locationLabel(city, normalizedCountry)

  const cityCoords = CITY_COORDS[label]
  if (cityCoords) return cityCoords

  const countryCoords = COUNTRY_COORDS[normalizedCountry]
  if (!countryCoords) return null

  return offsetFromLabel(label, countryCoords.lat, countryCoords.lng)
}
