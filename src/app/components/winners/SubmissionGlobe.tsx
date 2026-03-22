'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography, Graticule, Marker } from 'react-simple-maps'
import { motion } from 'framer-motion'

type SubmissionHotspot = {
  label: string
  lat: number
  lng: number
  submissions: number
}

interface SubmissionGlobeProps {
  hotspots: SubmissionHotspot[]
}

const GEO_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

export default function SubmissionGlobe({ hotspots }: SubmissionGlobeProps) {
  const mapWrapRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [rotation, setRotation] = useState(20)
  const [dimensions, setDimensions] = useState({ width: 900, height: 620 })

  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + 0.18) % 360)
      frameRef.current = window.requestAnimationFrame(animate)
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const el = mapWrapRef.current
    if (!el) return

    const resize = () => {
      const rect = el.getBoundingClientRect()
      // Use real box size on mobile; large mins were inflating scale and clipping the sphere.
      const w = Math.max(rect.width, 120)
      const h = Math.max(rect.height, 120)
      setDimensions({ width: w, height: h })
    }

    resize()
    const observer = new ResizeObserver(() => resize())
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const projectionScale = useMemo(
    () => Math.min(dimensions.width, dimensions.height) * 0.36,
    [dimensions.height, dimensions.width]
  )

  return (
    <div className='relative h-full w-full rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black overflow-hidden'>
      <div ref={mapWrapRef} className='h-full w-full'>
        <ComposableMap
          projection='geoOrthographic'
          projectionConfig={{
            rotate: [rotation, -14, 0],
            scale: projectionScale,
            // @ts-expect-error clipAngle supported by d3 geoOrthographic; types lag behind
            clipAngle: 90,
          }}
          style={{ width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id='globeFill' cx='48%' cy='42%' r='62%'>
              <stop offset='0%' stopColor='rgba(0,0,0,0.1)' />
              <stop offset='65%' stopColor='rgba(0,0,0,0.03)' />
              <stop offset='100%' stopColor='rgba(0,0,0,0.005)' />
            </radialGradient>
          </defs>

          <circle
            cx='50%'
            cy='50%'
            r={`${projectionScale}px`}
            fill='url(#globeFill)'
            stroke='rgba(0,0,0,0.55)'
            strokeWidth={1.2}
          />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill='rgba(0,0,0,0.01)'
                  stroke='rgba(0,0,0,0.58)'
                  strokeWidth={0.45}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          <Graticule stroke='rgba(0,0,0,0.2)' strokeWidth={0.35} />

          {hotspots.map((spot) => {
            const intensity = Math.min(1.2, 0.45 + spot.submissions / 70)
            const baseRadius = 1.7 + intensity * 1.8
            return (
              <Marker key={spot.label} coordinates={[spot.lng, spot.lat]}>
                <g>
                  <motion.circle
                    r={baseRadius}
                    fill='rgba(250, 191, 104, 0.95)'
                    animate={{ opacity: [0.95, 0.45, 0.95] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    r={baseRadius + 3.8}
                    fill='transparent'
                    stroke='rgba(250, 191, 104, 0.66)'
                    strokeWidth={0.8}
                    animate={{ opacity: [0.85, 0.12, 0.85], scale: [0.8, 1.9, 0.8] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </g>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>

      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_48%,rgba(0,0,0,0.07)_0,rgba(0,0,0,0)_56%)]' />
      <div className='absolute left-4 bottom-4 rounded-md border border-black/25 bg-[#fabc68] px-3 py-2'>
        <p className='text-[10px] uppercase tracking-[0.2em] text-black'>Highlighted Submission Areas</p>
      </div>
    </div>
  )
}
