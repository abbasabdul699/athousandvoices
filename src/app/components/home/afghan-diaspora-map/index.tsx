'use client'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, TrendingUp, X, ArrowUpDown, Plus, Minus, RotateCcw } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Graticule, ZoomableGroup } from "react-simple-maps";
/**
 * Afghan Diaspora Explorer
 * - Interactive map with OWID-style color scale bubbles + legend
 * - Multiple views (Map / Table / Bar)
 * - Year slider (snaps to 1980, 1990, 2000, 2010, 2020, 2024)
 * - Country modal with cultural impact + population trend sparkline
 * - Sortable table
 * - Responsive layout
 *
 * Notes:
 * 1) Install deps: `npm i framer-motion lucide-react react-simple-maps`
 * 2) Tailwind recommended for styling (already used below).
 * 3) World map data is loaded from unpkg via react-simple-maps.
 */

// ----------------------------- Types ---------------------------------

type Year = 2024;

interface DiasporaData {
  country: string;
  code: string;
  population: Record<Year, number>;
  migrationWaves: {
    primary: "2000s" | "2010s" | "2020s";
    reasons: string[];
  };
  culturalImpact: {
    communityCenters: number;
    culturalEvents: number;
    mediaPresence: number;
  };
  coordinates: { lat: number; lng: number };
}

// ----------------------------- Data ----------------------------------

// =================== 2024 Afghan diaspora snapshot (replace entirely) ===================
// Numbers are rounded to the nearest whole person where needed.
// Each line cites the source used for the 2024 figure.

const afghanDiasporaData: DiasporaData[] = [
  {
    country: "Iran",
    code: "IRN",
    population: { 2024: 3_000_000 }, // c. 3–5M (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2020s", reasons: ["Post-2021 displacement", "Proximity & protracted hosting"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 32.4279, lng: 53.6880 },
  },
  {
    country: "Pakistan",
    code: "PAK",
    population: { 2024: 3_700_000 }, // UN est. ~3.7M (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2020s", reasons: ["Protracted refugee presence", "Border proximity"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 30.3753, lng: 69.3451 },
  },
  {
    country: "Germany",
    code: "DEU",
    population: { 2024: 476_000 }, // 476,000 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum in EU", "Secondary movement"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 51.1657, lng: 10.4515 },
  },
  {
    country: "United States",
    code: "USA",
    population: { 2024: 300_000 }, // 300,000 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2020s", reasons: ["SIV & refugee resettlement", "Family reunification"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 39.8283, lng: -98.5795 },
  },
  {
    country: "United Arab Emirates",
    code: "ARE",
    population: { 2024: 300_000 }, // 300,000 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Labor migration", "Transit & sponsorship"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 23.4241, lng: 53.8478 },
  },
  {
    country: "Russia",
    code: "RUS",
    population: { 2024: 150_000 }, // 150,000 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "1990s", reasons: ["Post-Soviet movement", "Labor & asylum"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 61.5240, lng: 105.3188 },
  },
  {
    country: "Saudi Arabia",
    code: "SAU",
    population: { 2024: 132_282 }, // 132,282 (2022 census). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "1990s", reasons: ["Labor migration", "Religious ties"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 23.8859, lng: 45.0792 },
  },
  {
    country: "Canada",
    code: "CAN",
    population: { 2024: 132_015 }, // 132,015 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2020s", reasons: ["Refugee resettlement", "Economic migration"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 56.1304, lng: -106.3468 },
  },
  {
    country: "Turkey",
    code: "TUR",
    population: { 2024: 129_323 }, // 129,323 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2020s", reasons: ["Transit to EU", "Protection"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 38.9637, lng: 35.2433 },
  },
  {
    country: "France",
    code: "FRA",
    population: { 2024: 124_830 }, // 124,830 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "Secondary EU movement"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 46.2276, lng: 2.2137 },
  },
  {
    country: "United Kingdom",
    code: "GBR",
    population: { 2024: 93_296 }, // 93,296 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "Family reunification"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 55.3781, lng: -3.4360 },
  },
  {
    country: "Sweden",
    code: "SWE",
    population: { 2024: 67_858 }, // 67,858 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["EU asylum influx", "Protection"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 60.1282, lng: 18.6435 },
  },
  {
    country: "Australia",
    code: "AUS",
    population: { 2024: 59_797 }, // 59,797 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Humanitarian program", "Skilled migration"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: -25.2744, lng: 133.7751 },
  },
  {
    country: "Netherlands",
    code: "NLD",
    population: { 2024: 51_830 }, // 51,830 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "EU movement"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 52.1326, lng: 5.2913 },
  },
  {
    country: "Austria",
    code: "AUT",
    population: { 2024: 44_918 }, // 44,918 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum during EU crisis", "Secondary movement"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 47.5162, lng: 14.5501 },
  },
  {
    country: "Denmark",
    code: "DNK",
    population: { 2024: 21_635 }, // 21,635 (2024). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "Family reunification"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 56.2639, lng: 9.5018 },
  },
  {
    country: "Greece",
    code: "GRC",
    population: { 2024: 21_456 }, // 21,456 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Transit & asylum", "EU entry point"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 39.0742, lng: 21.8243 },
  },
  {
    country: "Ukraine",
    code: "UKR",
    population: { 2024: 20_000 }, // 20,000 (2001). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "1990s", reasons: ["Post-Soviet study/work", "Residency"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 48.3794, lng: 31.1656 },
  },
  {
    country: "Norway",
    code: "NOR",
    population: { 2024: 19_072 }, // 19,072 (2023). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "Secondary movement"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 60.4720, lng: 8.4689 },
  },
  {
    country: "India",
    code: "IND",
    population: { 2024: 15_806 }, // 15,806 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Urban refugees (Delhi)", "Medical & education"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 20.5937, lng: 78.9629 },
  },
  {
    country: "Switzerland",
    code: "CHE",
    population: { 2024: 14_523 }, // 14,523 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "Family reunification"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 46.8182, lng: 8.2275 },
  },
  {
    country: "Finland",
    code: "FIN",
    population: { 2024: 12_044 }, // 12,044 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "Integration programs"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 61.9241, lng: 25.7482 },
  },
  {
    country: "Italy",
    code: "ITA",
    population: { 2024: 12_096 }, // 11,121–12,096 (2021) — using upper bound. Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Asylum", "EU movement"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 41.8719, lng: 12.5674 },
  },
  {
    country: "Uzbekistan",
    code: "UZB",
    population: { 2024: 10_000 }, // 10,000 (2022). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "1990s", reasons: ["Border trade", "Transit"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 41.3775, lng: 64.5853 },
  },
  {
    country: "Indonesia",
    code: "IDN",
    population: { 2024: 7_629 }, // 7,629 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["UNHCR-registered refugees", "Transit to Australia"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: -0.7893, lng: 113.9213 },
  },
  {
    country: "Tajikistan",
    code: "TJK",
    population: { 2024: 6_775 }, // 6,775 (2021). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "1990s", reasons: ["Border displacement", "Labor"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 38.8610, lng: 71.2761 },
  },
  {
    country: "Japan",
    code: "JPN",
    population: { 2024: 6_063 }, // 6,063 (2024). Source: https://en.wikipedia.org/wiki/Afghan_diaspora
    migrationWaves: { primary: "2010s", reasons: ["Study & work visas", "Humanitarian entry"] },
    culturalImpact: { communityCenters: 0, culturalEvents: 0, mediaPresence: 0 },
    coordinates: { lat: 36.2048, lng: 138.2529 },
  },

];

// Suggested while using 2024-only snapshot:
const YEARS: Year[] = [2024];

// ----------------------------- Helpers -------------------------------

// Country highlight colors (distinct from the OWID blues for bubbles)
const COUNTRY_FILL_SELECTED_DEFAULT = "#A7F3D0"; // soft emerald for selected countries
const COUNTRY_FILL_SELECTED_HOVER   = "#34D399"; // deeper emerald on hover
const COUNTRY_FILL_UNSELECTED       = "#F8FAFC"; // light slate base
const COUNTRY_STROKE                = "#CBD5E1"; // subtle border

// ---------- (optional but recommended for accuracy right now) ----------
const nf = new Intl.NumberFormat();

// Our World in Data-like sequential blues (light to dark)
// Reference feel: https://ourworldindata.org/ (not exact, but close)
const OWID_BLUES = [
  "#cfe8ff", // very light
  "#a6d1ff",
  "#7fbaff",
  "#589fff",
  "#2f7ff7",
  "#155ed6", // dark
];

// Size + color thresholds (single source of truth)
const THRESHOLDS = [
  { min: 1_000_000, r: 12, fill: OWID_BLUES[5], label: "> 1M" },
  { min:   500_000, r: 10, fill: OWID_BLUES[4], label: "500K–1M" },
  { min:   100_000, r: 8,  fill: OWID_BLUES[3], label: "100K–500K" },
  { min:    50_000, r: 7,  fill: OWID_BLUES[2], label: "50K–100K" },
  { min:    10_000, r: 6,  fill: OWID_BLUES[1], label: "10K–50K" },
  { min:         0, r: 5,  fill: OWID_BLUES[0], label: "< 10K" },
] as const;

type Threshold = typeof THRESHOLDS[number];

function bucket(pop: number): Threshold {
  return THRESHOLDS.find((t) => pop >= t.min)!;
}

const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const eventsByYear: Record<Year, { wave: string; note: string }> = {
  2024: { wave: "2020s", note: "Current Afghan diaspora distribution based on 2024 UNHCR and national statistics." },
};

// ----------------------------- Component ----------------------------

export default function AfghanDiasporaExplorer() {
  const [view, setView] = useState<"map" | "table" | "bar">("map");
  const [selected, setSelected] = useState<DiasporaData | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  // Map pan/zoom state
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(z * 1.4, 8));
  const zoomOut = () => setZoom((z) => Math.max(z / 1.4, 0.8));
  const resetView = () => { setCenter([0, 0]); setZoom(1); };

  // Table sorting
  type SortKey = "country" | "population" | "wave";
  const [sortKey, setSortKey] = useState<SortKey>("population");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const arr = [...afghanDiasporaData];
    arr.sort((a, b) => {
      if (sortKey === "country") return sortDir === "asc" ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
      if (sortKey === "population") return sortDir === "asc" ? a.population[2024] - b.population[2024] : b.population[2024] - a.population[2024];
      if (sortKey === "wave") return sortDir === "asc" ? a.migrationWaves.primary.localeCompare(b.migrationWaves.primary) : b.migrationWaves.primary.localeCompare(a.migrationWaves.primary);
      return 0;
    });
    return arr;
  }, [sortKey, sortDir]);

  const totalPopulation = useMemo(() => afghanDiasporaData.reduce((s, c) => s + c.population[2024], 0), []);
  const maxPopulation = useMemo(() => Math.max(...afghanDiasporaData.map((c) => c.population[2024])), []);

  // Create a fast lookup map for ISO codes
  const dataByIso = useMemo(
    () => new Map(afghanDiasporaData.map(d => [d.code, d])),
    []
  );

  // Helper function to check if a country has Afghan diaspora data
  const hasAfghanData = (geo: any) => {
    const countryName = geo.properties.NAME || geo.properties.ADMIN || geo.properties.SOVEREIGNT || '';
    
    // Debug: Log every country to see what we're getting
    console.log('Checking country:', countryName);
    
    // Use our actual data to match countries - STRICT MATCHING ONLY
    const hasData = afghanDiasporaData.some(country => {
      // Exact match for most countries
      if (country.country.toLowerCase() === countryName.toLowerCase()) {
        console.log('✅ EXACT MATCH:', countryName, '=', country.country);
        return true;
      }
      
      // Special case for United States
      if (country.country === 'United States' && countryName === 'United States of America') {
        console.log('✅ US MATCH:', countryName, '=', country.country);
        return true;
      }
      
      return false;
    });
    
    return hasData;
  };

  // Tooltip helpers
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const showTooltip = (e: React.MouseEvent, content: string) => {
    const rect = mapWrapperRef.current?.getBoundingClientRect();
    setTooltip({
      x: (rect ? e.clientX - rect.left : e.clientX) + 12,
      y: (rect ? e.clientY - rect.top : e.clientY) + 12,
      content,
    });
  };
  const hideTooltip = () => setTooltip(null);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl instrument-font italic font-normal text-gray-900 dark:text-white mb-3">Afghan Diaspora Across the World</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore geographic distribution, migration waves, and cultural impact across time.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm" role="tablist" aria-label="View mode">
            {[
              { key: "map", label: "Map", icon: MapPin },
              { key: "table", label: "Table", icon: Users },
              { key: "bar", label: "Bar", icon: TrendingUp },
            ].map(({ key, label, icon: Icon }) => {
              const active = view === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(key as typeof view)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${active ? "text-white" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
                    style={{ backgroundColor: active ? "#76b2fb" : "transparent" }}
                >
                  <Icon size={16} /> {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {view === "map" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div ref={mapWrapperRef} className="relative w-full h-[460px] md:h-[520px] xl:h-[600px]" suppressHydrationWarning>
              {isMounted ? (
                <>
                <ComposableMap projectionConfig={{ scale: 180 }} style={{ width: '100%', height: '100%' }}>
                  <ZoomableGroup
                    center={center}
                    zoom={zoom}
                    minZoom={0.8}
                    maxZoom={8}
                    onMoveEnd={({ coordinates, zoom }) => {
                      setCenter(coordinates as [number, number]);
                      setZoom(zoom);
                    }}
                  >
                    <Graticule stroke="#E5E7EB" strokeWidth={0.25} />
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map((geo: any) => {
                          const iso = geo.properties.ISO_A3 as string;
                          const inData = dataByIso.has(iso);
                          
                          const fillColor = inData ? COUNTRY_FILL_SELECTED_DEFAULT : COUNTRY_FILL_UNSELECTED;

                          return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                              fill={fillColor}
                              stroke={COUNTRY_STROKE}
                            strokeWidth={0.5}
                                                           style={{
                                 default: { outline: "none" },
                                 hover: {
                                   fill: inData ? "#4b7dde" : "#4b7dde",
                                   outline: "none",
                                 },
                                 pressed: { outline: "none" },
                               }}
                                                             // Handle tooltips only
                               onMouseEnter={(e: any) => {
                                 if (inData) {
                                   const c = dataByIso.get(iso)!;
                                   showTooltip(e, `${c.country}: ${nf.format(c.population[2024])}`);
                                 }
                               }}
                               onMouseMove={(e: any) => {
                                 if (inData) {
                                   const c = dataByIso.get(iso)!;
                                   showTooltip(e, `${c.country}: ${nf.format(c.population[2024])}`);
                                 }
                               }}
                               onMouseLeave={() => hideTooltip()}
                            />
                          );
                        })
                      }
                    </Geographies>
                      {afghanDiasporaData.map((country) => {
                        const pop = country.population[2024];
                        const radius = Math.max(3, Math.sqrt(pop / maxPopulation) * 20);
                        const color = bucket(pop).fill;
                      return (
                          <Marker key={country.code} coordinates={[country.coordinates.lng, country.coordinates.lat]}>
                          <circle
                              r={radius}
                              fill={color}
                              stroke="#76b2fb"
                            strokeWidth={1}
                              opacity={0.8}
                              onMouseEnter={(e) => showTooltip(e, `${country.country}: ${nf.format(pop)}`)}
                            onMouseLeave={hideTooltip}
                              style={{ cursor: 'pointer' }}
                          />
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>
                  
                  {/* Tooltip - moved outside ZoomableGroup */}
                  {tooltip && (
                    <div
                      className="absolute z-10 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg pointer-events-none"
                      style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translate(-50%, -100%)',
                        marginTop: '-8px'
                      }}
                    >
                      {tooltip.content}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}

                {/* Zoom controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button onClick={zoomIn} className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Plus size={16} />
                  </button>
                    <button onClick={zoomOut} className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Minus size={16} />
                  </button>
                    <button onClick={resetView} className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <RotateCcw size={16} />
                  </button>
                </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {view === "table" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    {[
                      { key: "country", label: "Country" },
                      { key: "population", label: `Afghan Population (${2024})` },
                      { key: "wave", label: "Primary Migration Wave" },
                    ].map((h) => (
                      <th key={h.key} className="px-4 py-3 text-left font-semibold select-none">
                        <button
                          className="inline-flex items-center gap-1 hover:underline"
                          onClick={() => {
                            const k = h.key as SortKey;
                            if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                            else {
                              setSortKey(k);
                              setSortDir(k === "country" || k === "wave" ? "asc" : "desc");
                            }
                          }}
                        >
                          {h.label}
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sorted.map((c) => (
                    <tr key={c.code} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">{c.country}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{nf.format(c.population[2024])}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{c.migrationWaves.primary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {view === "bar" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
            <div className="space-y-3">
              {[...afghanDiasporaData]
                .sort((a, b) => b.population[2024] - a.population[2024])
                .slice(0, 8)
                .map((c, idx) => {
                  const pop = c.population[2024];
                  const pct = (pop / maxPopulation) * 100;
                  return (
                    <div key={c.code} className="flex items-center gap-3">
                      <div className="w-32 shrink-0 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">{c.country}</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, delay: idx * 0.06 }}
                          className="h-5 rounded-full"
                          style={{ background: "linear-gradient(90deg, #7fbaff, #155ed6)" }}
                        />
                      </div>
                      <div className="w-24 text-right text-xs md:text-sm text-gray-700 dark:text-gray-300 tabular-nums">{nf.format(pop)}</div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* Summary Cards */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { v: nf.format(totalPopulation), l: `Total Afghan Diaspora (${2024})` },
            { v: nf.format(afghanDiasporaData.length), l: "Countries with Afghan Communities" },
          ].map((card) => (
            <div key={card.l} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "#195fd7" }}>{card.v}+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{card.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Remove the modal section entirely */}
        {/* {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            ... modal content ...
          </div>
        )} */}
      </div>
    </section>
  );
}

// ----------------------------- Sparkline -----------------------------

function Sparkline({ values, labels }: { values: number[]; labels: string[] }) {
  const width = 360;
  const height = 80;
  const padding = 8;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const x = (i: number) => padding + (i * (width - padding * 2)) / (values.length - 1);
  const y = (v: number) => height - padding - ((v - min) / Math.max(1, max - min)) * (height - padding * 2);

  const path = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {/* area under line */}
      <path d={`${path} L ${x(values.length - 1)},${height - padding} L ${x(0)},${height - padding} Z`} fill="#a6d1ff55" />
      {/* line */}
      <path d={path} fill="none" stroke="#155ed6" strokeWidth={2} />
      {/* points */}
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={2.5} fill="#155ed6" />
      ))}
      {/* labels */}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={height - 1} textAnchor="middle" fontSize={10} className="fill-gray-500">
          {l}
        </text>
      ))}
    </svg>
  );
}
