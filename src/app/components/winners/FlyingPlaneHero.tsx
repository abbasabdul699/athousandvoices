'use client'

import React, { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const noteItems = [
  { id: 'n2', label: 'ART', left: '23%', top: '41%', rot: 9, delay: 0.3, depth: 'mid' as const },
  { id: 'n3', label: 'VOICE', left: '34%', top: '25%', rot: -8, delay: 0.15, depth: 'mid' as const },
  { id: 'n4', label: 'STORY', left: '47%', top: '16%', rot: 12, delay: 0.4, depth: 'far' as const },
  { id: 'n5', label: 'MEMORY', left: '60%', top: '39%', rot: -11, delay: 0.2, depth: 'near' as const },
  { id: 'n6', label: 'HOPE', left: '73%', top: '27%', rot: 7, delay: 0.45, depth: 'mid' as const },
  { id: 'n7', label: 'LETTER', left: '83%', top: '45%', rot: -9, delay: 0.1, depth: 'near' as const },
  { id: 'n8', label: 'POEM', left: '18%', top: '68%', rot: 6, delay: 0.25, depth: 'far' as const },
  { id: 'n9', label: 'DREAM', left: '37%', top: '74%', rot: -7, delay: 0.35, depth: 'mid' as const },
  { id: 'n10', label: 'FUTURE', left: '65%', top: '69%', rot: 10, delay: 0.05, depth: 'far' as const },
  { id: 'n11', label: 'COURAGE', left: '86%', top: '74%', rot: -12, delay: 0.28, depth: 'mid' as const },
]

export default function FlyingPlaneHero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Flight path lands on the "FUTURE" card.
  const planeX = useTransform(scrollYProgress, [0, 1], ['10%', '65%'])
  const planeY = useTransform(scrollYProgress, [0, 0.25, 0.52, 0.8, 1], ['14%', '24%', '40%', '58%', '69%'])
  const planeRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-8, 2, 7, 12])
  const planeScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.07])
  const planePitch = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -2])

  const notes = useMemo(() => noteItems, [])

  return (
    <section ref={sectionRef} className='relative h-[150svh] bg-[#efefef] dark:bg-gray-900'>
      <div className='sticky top-0 h-svh w-full px-4 md:px-8 lg:px-10 py-6 md:py-8'>
        <div className='relative h-full rounded-2xl border border-black/10 dark:border-white/15 bg-[#f6f6f6] dark:bg-gray-900/60 overflow-hidden'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(0,0,0,0.08)_0,rgba(0,0,0,0)_58%)] dark:bg-[radial-gradient(circle_at_70%_48%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_58%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.0)_35%,rgba(0,0,0,0.03)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.35)_100%)]' />

          <div className='absolute left-6 top-14 md:left-10 md:top-16 z-20 max-w-xl'>
            <p className='text-[10px] md:text-xs uppercase tracking-[0.22em] text-black/55 dark:text-white/65'>
              Winners Collection
            </p>
            <h1 className='mt-3 text-[clamp(30px,5vw,70px)] leading-[0.95] tracking-tight font-semibold text-black dark:text-white'>
              Every entry
              <br />
              takes flight.
            </h1>
            <p className='mt-4 max-w-md text-sm md:text-base text-black/70 dark:text-white/70'>
              Scroll to follow the journey from submitted notes to the winning stories.
            </p>
          </div>

          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: note.delay, duration: 0.55 }}
              style={{
                left: note.left,
                top: note.top,
                y: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [
                    0,
                    note.depth === 'near' ? (index % 2 === 0 ? -56 : 44) : note.depth === 'mid' ? (index % 2 === 0 ? -30 : 22) : (index % 2 === 0 ? -16 : 14),
                  ]
                ),
                scale: note.depth === 'near' ? 1.04 : note.depth === 'mid' ? 1 : 0.9,
                filter: note.depth === 'near' ? 'blur(0px)' : note.depth === 'mid' ? 'blur(0.2px)' : 'blur(0.8px)',
                opacity: note.depth === 'near' ? 1 : note.depth === 'mid' ? 0.88 : 0.72,
              }}
              className={`absolute ${note.depth === 'near' ? 'z-20' : note.depth === 'mid' ? 'z-10' : 'z-[5]'} w-[74px] md:w-[88px] h-[48px] md:h-[56px] rounded-md border ${
                note.id === 'n10' ? 'border-[#fabc68]/70' : 'border-black/12'
              } bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)] dark:border-white/15 dark:bg-gray-800/80`}>
              <div
                style={{ transform: `rotate(${note.rot}deg)` }}
                className='absolute inset-0 flex items-center justify-center text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-black/62 dark:text-white/72'>
                {note.label}
              </div>
              {note.id === 'n10' && (
                <motion.div
                  aria-hidden='true'
                  animate={{ opacity: [0.15, 0.45, 0.15], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className='absolute inset-0 rounded-md border border-[#fabc68]/70'
                />
              )}
            </motion.div>
          ))}

          <motion.div
            style={{ left: planeX, top: planeY, rotate: planeRotate, scale: planeScale, rotateX: planePitch }}
            className='absolute z-30 w-[180px] md:w-[250px]'>
            <div className='relative'>
              <div className='relative w-full aspect-square'>
                <Image
                  src='/plane.png'
                  alt='Paper plane'
                  fill
                  className='object-contain select-none pointer-events-none'
                  sizes='(max-width: 768px) 180px, 250px'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
