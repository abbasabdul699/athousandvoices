'use client'

import React, { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const VOICE_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/bird.png'
const SPEAKER_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/speaker.png'
const HAND_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/hand.png'
const FARSI_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/farsi.png'
const CAMERA_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/camera.png'
const BUILDING_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/building.png'
const COIN_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/coin.png'
const MAN_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/man.png'
const TEA_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/tea.png'
const FUTURE_IMAGE =
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/81LLI8IPUWL._AC_UF1000,1000_QL80_.jpg'

type HeroNote = {
  id: string
  label: string
  left: string
  top: string
  rot: number
  delay: number
  depth: 'near' | 'mid' | 'far'
  imageSrc?: string
}

const noteItems: HeroNote[] = [
  {
    id: 'n2',
    label: 'ART',
    left: '23%',
    top: '41%',
    rot: 9,
    delay: 0.3,
    depth: 'mid' as const,
    imageSrc: BUILDING_IMAGE,
  },
  {
    id: 'n3',
    label: 'VOICE',
    left: '34%',
    top: '25%',
    rot: -8,
    delay: 0.15,
    depth: 'mid' as const,
    imageSrc: VOICE_IMAGE,
  },
  {
    id: 'n4',
    label: 'STORY',
    left: '47%',
    top: '16%',
    rot: 12,
    delay: 0.4,
    depth: 'far' as const,
    imageSrc: SPEAKER_IMAGE,
  },
  {
    id: 'n5',
    label: 'MEMORY',
    left: '60%',
    top: '39%',
    rot: -11,
    delay: 0.2,
    depth: 'near' as const,
    imageSrc: CAMERA_IMAGE,
  },
  {
    id: 'n6',
    label: 'HOPE',
    left: '73%',
    top: '27%',
    rot: 7,
    delay: 0.45,
    depth: 'mid' as const,
    imageSrc: TEA_IMAGE,
  },
  {
    id: 'n7',
    label: 'LETTER',
    left: '83%',
    top: '45%',
    rot: -9,
    delay: 0.1,
    depth: 'near' as const,
    imageSrc: HAND_IMAGE,
  },
  {
    id: 'n8',
    label: 'POEM',
    left: '18%',
    top: '68%',
    rot: 6,
    delay: 0.25,
    depth: 'far' as const,
    imageSrc: FARSI_IMAGE,
  },
  {
    id: 'n9',
    label: 'DREAM',
    left: '37%',
    top: '74%',
    rot: -7,
    delay: 0.35,
    depth: 'mid' as const,
    imageSrc: COIN_IMAGE,
  },
  {
    id: 'n10',
    label: 'FUTURE',
    left: '65%',
    top: '69%',
    rot: 10,
    delay: 0.05,
    depth: 'far' as const,
    imageSrc: FUTURE_IMAGE,
  },
  {
    id: 'n11',
    label: 'COURAGE',
    left: '86%',
    top: '74%',
    rot: -12,
    delay: 0.28,
    depth: 'mid' as const,
    imageSrc: MAN_IMAGE,
  },
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
        <div className='relative h-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-[#f3f2ef] dark:bg-gray-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_0_100px_rgba(0,0,0,0.035)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_0_120px_rgba(0,0,0,0.45)]'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(0,0,0,0.08)_0,rgba(0,0,0,0)_58%)] dark:bg-[radial-gradient(circle_at_70%_48%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_58%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.0)_35%,rgba(0,0,0,0.03)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.35)_100%)]' />
          {/* Warm mesh + corner washes so empty areas feel intentional, not flat grey */}
          <div
            className='pointer-events-none absolute inset-0 opacity-100 dark:hidden'
            style={{
              backgroundImage: [
                'radial-gradient(ellipse 85% 55% at 55% 42%, rgba(250,188,104,0.11) 0%, transparent 52%)',
                'radial-gradient(ellipse 45% 40% at 8% 92%, rgba(0,0,0,0.045) 0%, transparent 50%)',
                'radial-gradient(ellipse 38% 42% at 96% 12%, rgba(0,0,0,0.035) 0%, transparent 48%)',
              ].join(', '),
            }}
          />
          <div
            className='pointer-events-none absolute inset-0 hidden opacity-90 dark:block'
            style={{
              backgroundImage: [
                'radial-gradient(ellipse 80% 50% at 50% 38%, rgba(250,188,104,0.08) 0%, transparent 55%)',
                'radial-gradient(ellipse 40% 35% at 4% 85%, rgba(255,255,255,0.06) 0%, transparent 50%)',
              ].join(', '),
            }}
          />
          <div
            className='pointer-events-none absolute inset-0 bg-[length:28px_28px] opacity-[0.55] dark:hidden'
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(0,0,0,0.055) 1.2px, transparent 1.2px)',
            }}
          />
          <div
            className='pointer-events-none absolute inset-0 hidden bg-[length:28px_28px] opacity-[0.4] dark:block'
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)',
            }}
          />

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
              className={
                note.imageSrc
                  ? `absolute overflow-visible ${note.depth === 'near' ? 'z-20' : note.depth === 'mid' ? 'z-10' : 'z-[5]'} w-[178px] h-[127px] sm:w-[188px] sm:h-[134px] md:w-[224px] md:h-[160px] lg:w-[236px] lg:h-[168px]`
                  : `absolute ${note.depth === 'near' ? 'z-20' : note.depth === 'mid' ? 'z-10' : 'z-[5]'} w-[74px] md:w-[88px] h-[48px] md:h-[56px] rounded-md border ${
                      note.id === 'n10' ? 'border-[#fabc68]/70' : 'border-black/12'
                    } bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)] dark:border-white/15 dark:bg-gray-800/80`
              }>
              <div
                style={{ transform: `rotate(${note.rot}deg)` }}
                className={
                  note.imageSrc
                    ? 'absolute inset-0 overflow-visible'
                    : 'absolute inset-0 flex items-center justify-center text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-black/62 dark:text-white/72'
                }>
                {note.imageSrc ? (
                  <Image
                    src={note.imageSrc}
                    alt=''
                    fill
                    className='object-contain object-center select-none pointer-events-none'
                    sizes='(max-width: 640px) 188px, (max-width: 1024px) 224px, 236px'
                  />
                ) : (
                  note.label
                )}
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
            className='absolute z-30 w-[248px] sm:w-[260px] md:w-[340px] lg:w-[360px]'>
            <div className='relative'>
              <div className='relative w-full aspect-square'>
                <Image
                  src='/plane.png'
                  alt='Paper plane'
                  fill
                  className='object-contain select-none pointer-events-none'
                  sizes='(max-width: 640px) 260px, (max-width: 1024px) 340px, 360px'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
