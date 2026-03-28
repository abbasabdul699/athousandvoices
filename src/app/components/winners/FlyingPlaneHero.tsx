'use client'

import React, { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
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

/** Fewer, smaller tiles — spaced for narrow viewports (wide vertical + horizontal spread) */
const mobileHeroNotes: HeroNote[] = [
  {
    id: 'n4',
    label: 'STORY',
    left: '58%',
    top: '30%',
    rot: 8,
    delay: 0.18,
    depth: 'far' as const,
    imageSrc: SPEAKER_IMAGE,
  },
  {
    id: 'n3',
    label: 'VOICE',
    left: '46%',
    top: '36%',
    rot: -6,
    delay: 0.12,
    depth: 'mid' as const,
    imageSrc: VOICE_IMAGE,
  },
  {
    id: 'n2',
    label: 'ART',
    left: '10%',
    top: '42%',
    rot: 10,
    delay: 0.24,
    depth: 'mid' as const,
    imageSrc: BUILDING_IMAGE,
  },
  {
    id: 'n6',
    label: 'HOPE',
    left: '60%',
    top: '50%',
    rot: 5,
    delay: 0.32,
    depth: 'mid' as const,
    imageSrc: TEA_IMAGE,
  },
  {
    id: 'n5',
    label: 'MEMORY',
    left: '38%',
    top: '56%',
    rot: -8,
    delay: 0.28,
    depth: 'near' as const,
    imageSrc: CAMERA_IMAGE,
  },
  {
    id: 'n8',
    label: 'POEM',
    left: '6%',
    top: '70%',
    rot: 4,
    delay: 0.36,
    depth: 'far' as const,
    imageSrc: FARSI_IMAGE,
  },
  {
    id: 'n10',
    label: 'FUTURE',
    left: '54%',
    top: '84%',
    rot: 8,
    delay: 0.06,
    depth: 'far' as const,
    imageSrc: FUTURE_IMAGE,
  },
]

function imageNoteClass(depth: HeroNote['depth'], layout: 'desktop' | 'mobile') {
  const z = depth === 'near' ? 'z-20' : depth === 'mid' ? 'z-10' : 'z-[5]'
  if (layout === 'mobile') {
    return `absolute overflow-visible ${z} w-[min(28vw,118px)] h-[min(20vw,84px)]`
  }
  return `absolute overflow-visible ${z} w-[178px] h-[127px] sm:w-[188px] sm:h-[134px] md:w-[224px] md:h-[160px] lg:w-[236px] lg:h-[168px]`
}

function parallaxEndY(note: HeroNote, index: number, layout: 'desktop' | 'mobile'): number {
  if (layout === 'mobile') {
    if (note.depth === 'near') return index % 2 === 0 ? -28 : 22
    if (note.depth === 'mid') return index % 2 === 0 ? -16 : 12
    return index % 2 === 0 ? -10 : 8
  }
  if (note.depth === 'near') return index % 2 === 0 ? -56 : 44
  if (note.depth === 'mid') return index % 2 === 0 ? -30 : 22
  return index % 2 === 0 ? -16 : 14
}

function HeroNoteTile({
  note,
  index,
  scrollYProgress,
  layout,
}: {
  note: HeroNote
  index: number
  scrollYProgress: MotionValue<number>
  layout: 'desktop' | 'mobile'
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxEndY(note, index, layout)])

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: note.delay, duration: 0.55 }}
      style={{
        left: note.left,
        top: note.top,
        y,
        scale: note.depth === 'near' ? 1.04 : note.depth === 'mid' ? 1 : 0.9,
        filter:
          note.depth === 'near' ? 'blur(0px)' : note.depth === 'mid' ? 'blur(0.2px)' : 'blur(0.8px)',
        opacity: note.depth === 'near' ? 1 : note.depth === 'mid' ? 0.88 : 0.72,
      }}
      className={
        note.imageSrc
          ? imageNoteClass(note.depth, layout)
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
            sizes={
              layout === 'mobile'
                ? '(max-width: 768px) 120px, 120px'
                : '(max-width: 640px) 188px, (max-width: 1024px) 224px, 236px'
            }
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
  )
}

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
  const mobileNotes = useMemo(() => mobileHeroNotes, [])

  return (
    <section ref={sectionRef} className='relative h-[150svh] bg-[#efefef] dark:bg-gray-900'>
      <div className='sticky top-0 h-svh w-full px-3 py-4 md:px-8 md:py-8 lg:px-10'>
        <div className='relative h-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15 bg-[#f3f2ef] dark:bg-gray-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_0_100px_rgba(0,0,0,0.035)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_0_120px_rgba(0,0,0,0.45)] md:rounded-2xl'>
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
            className='pointer-events-none absolute inset-0 bg-[length:22px_22px] opacity-[0.55] dark:hidden md:bg-[length:28px_28px]'
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(0,0,0,0.055) 1.2px, transparent 1.2px)',
            }}
          />
          <div
            className='pointer-events-none absolute inset-0 hidden bg-[length:22px_22px] opacity-[0.4] dark:block md:bg-[length:28px_28px]'
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)',
            }}
          />

          <div className='absolute left-4 top-[4.25rem] z-20 max-w-[min(100%,20rem)] pr-2 md:left-10 md:top-16 md:max-w-xl md:pr-0'>
            <p className='text-[10px] md:text-xs uppercase tracking-[0.22em] text-black/55 dark:text-white/65'>
              Winners Collection
            </p>
            <h1 className='mt-2 text-[clamp(1.625rem,6.5vw,2.125rem)] leading-[0.98] tracking-tight font-semibold text-black dark:text-white md:mt-3 md:text-[clamp(30px,5vw,70px)] md:leading-[0.95]'>
              Every entry
              <br />
              takes flight.
            </h1>
            <p className='mt-3 max-w-md text-[13px] leading-snug text-black/70 dark:text-white/70 md:mt-4 md:text-sm lg:text-base'>
              Scroll to follow the journey from submitted notes to the winning stories.
            </p>
          </div>

          <div className='pointer-events-none absolute inset-0 max-md:hidden' aria-hidden>
            {notes.map((note, index) => (
              <HeroNoteTile
                key={`desktop-${note.id}`}
                note={note}
                index={index}
                scrollYProgress={scrollYProgress}
                layout='desktop'
              />
            ))}
          </div>
          <div className='pointer-events-none absolute inset-0 md:hidden' aria-hidden>
            {mobileNotes.map((note, index) => (
              <HeroNoteTile
                key={`mobile-${note.id}`}
                note={note}
                index={index}
                scrollYProgress={scrollYProgress}
                layout='mobile'
              />
            ))}
          </div>

          <motion.div
            style={{ left: planeX, top: planeY, rotate: planeRotate, scale: planeScale, rotateX: planePitch }}
            className='absolute z-30 w-[min(48vw,200px)] sm:w-[240px] md:w-[340px] lg:w-[360px]'>
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
