'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import FlyingPlaneHero from '@/app/components/winners/FlyingPlaneHero'
import SubmissionGlobe from '@/app/components/winners/SubmissionGlobe'
import SignatureReveal from '@/app/components/winners/SignatureReveal'

type SubmissionType = 'story' | 'poem' | 'art'

interface RunnerUpSubmission {
  id: string
  title: string
  creator: string
  type: SubmissionType
  category: string
  image?: string
  fileUrl?: string
  excerpt: string
}

interface FeaturedWinner {
  rank: 'First Place' | 'Second Place' | 'Third Place'
  title: string
  creator: string
  summary: string
  image: string
  tag: string
}

const writingExcerpts = [
  'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
]

const runnerUps: RunnerUpSubmission[] = [
  {
    id: 'ru-001',
    title: 'On The Way To School',
    creator: 'Husna Rasekh',
    type: 'story',
    category: 'Story',
    fileUrl:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/d0c920a8-51be-4e2b-b7dd-9ac70e806b0b_On_The_Way_To_School-By_Husna_Rasekh.pdf',
    excerpt:
      'A young girl walks with her father to school while both carry the weight of difficult family and social pressure.',
  },
  {
    id: 'ru-002',
    title: 'Letters I Never Sent',
    creator: 'A. Rahimi',
    type: 'poem',
    category: 'Poetry',
    fileUrl: '',
    excerpt: writingExcerpts[1],
  },
  {
    id: 'ru-003',
    title: 'The House with One Window',
    creator: 'M. Ahmadi',
    type: 'story',
    category: 'Story',
    fileUrl: '',
    excerpt: writingExcerpts[0],
  },
  {
    id: 'ru-004',
    title: 'Threads of Kabul',
    creator: 'S. Yousufi',
    type: 'art',
    category: 'Visual Art',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/wmremove-transformed.png',
    excerpt:
      'A layered visual memory of Kabul: fragments of homes, old fabrics, and handwritten notes stitched into one frame.',
  },
  {
    id: 'ru-005',
    title: 'Dust and Jasmine',
    creator: 'F. Mehrabi',
    type: 'art',
    category: 'Visual Art',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Lotfullah.jpg',
    excerpt:
      'Portrait fragments and shadows explore memory, displacement, and return through texture and color.',
  },
]

const featuredWinners: FeaturedWinner[] = [
  {
    rank: 'First Place',
    title: 'When the Apricots Returned',
    creator: 'A. Rahimi',
    summary:
      'A reflective narrative on memory and return, this piece stood out for its emotional precision, original voice, and layered storytelling.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/wmremove-transformed.png',
    tag: '01',
  },
  {
    rank: 'Second Place',
    title: 'Threads of Kabul',
    creator: 'M. Ahmadi',
    summary:
      'Through vivid imagery and composition, this work bridges personal memory with collective history and offers a powerful visual statement.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Lotfullah.jpg',
    tag: '02',
  },
  {
    rank: 'Third Place',
    title: 'After the Checkpoint',
    creator: 'N. Wafa',
    summary:
      'A concise and deeply resonant piece that balances restraint and intensity while capturing displacement, dignity, and hope.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Adam.png',
    tag: '03',
  },
]

type SubmissionHotspot = {
  label: string
  lat: number
  lng: number
  submissions: number
}

const fallbackSubmittedHotspots: SubmissionHotspot[] = [
  { label: 'Kabul, Afghanistan', lat: 34.5553, lng: 69.2075, submissions: 63 },
  { label: 'Herat, Afghanistan', lat: 34.3529, lng: 62.204, submissions: 34 },
  { label: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, submissions: 27 },
  { label: 'London, UK', lat: 51.5072, lng: -0.1276, submissions: 21 },
  { label: 'Berlin, Germany', lat: 52.52, lng: 13.405, submissions: 18 },
  { label: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784, submissions: 16 },
  { label: 'Islamabad, Pakistan', lat: 33.6844, lng: 73.0479, submissions: 14 },
  { label: 'Fremont, USA', lat: 37.5483, lng: -121.9886, submissions: 11 },
]

interface ScrollUnmaskSectionProps {
  children: React.ReactNode
  containerClassName?: string
  panelClassName?: string
}

function ScrollUnmaskSection({
  children,
  containerClassName = '',
  panelClassName = '',
}: ScrollUnmaskSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const revealTop = useTransform(scrollYProgress, [0, 0.35, 1], [100, 0, 0])
  const clipPath = useMotionTemplate`inset(${revealTop}% 0% 0% 0%)`
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.35], [0.45, 0.85, 1])

  return (
    <section ref={sectionRef} className={`relative h-[170svh] ${containerClassName}`}>
      <motion.div
        style={{ clipPath, opacity }}
        className={`sticky top-0 h-svh overflow-hidden ${panelClassName}`}>
        {children}
      </motion.div>
    </section>
  )
}

export default function WinnersPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openWinnerBook, setOpenWinnerBook] = useState<Record<string, boolean>>({})
  const [submittedHotspots, setSubmittedHotspots] =
    useState<SubmissionHotspot[]>(fallbackSubmittedHotspots)

  const activeSubmission = useMemo(
    () => runnerUps.find((item) => item.id === activeId) ?? null,
    [activeId]
  )

  const toggleWinnerBook = (rank: FeaturedWinner['rank']) => {
    setOpenWinnerBook((prev) => ({
      ...prev,
      [rank]: !prev[rank],
    }))
  }

  useEffect(() => {
    let isMounted = true

    const loadSubmissionHotspots = async () => {
      try {
        const response = await fetch('/api/submission-hotspots')
        if (!response.ok) return

        const payload = (await response.json()) as { hotspots?: SubmissionHotspot[] }
        if (!isMounted || !payload.hotspots || payload.hotspots.length === 0) return

        setSubmittedHotspots(payload.hotspots)
      } catch {
        // Keep fallback hotspots if API is unavailable.
      }
    }

    loadSubmissionHotspots()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <main className='min-h-screen bg-[#efefef] dark:bg-gray-900'>
      <FlyingPlaneHero />

      <ScrollUnmaskSection containerClassName='bg-white dark:bg-gray-900'>
        <section className='relative h-full min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white px-5 md:px-10 py-12 md:py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 h-full'>
            <div className='lg:col-span-4 flex flex-col justify-center'>
              <p className='text-[10px] md:text-xs uppercase tracking-[0.22em] text-black/65 dark:text-white/65'>
                Global Reach
              </p>
              <h2 className='mt-3 text-3xl md:text-5xl font-semibold tracking-tight'>
                Where submissions came from
              </h2>
              <p className='mt-5 text-sm md:text-base text-black/72 dark:text-white/72 leading-relaxed max-w-md'>
                Highlighted points mark locations where contestants submitted entries. Dot size reflects the relative submission count.
              </p>

              <div className='mt-7 space-y-2 max-w-sm max-h-[45svh] overflow-y-auto pr-1'>
                {submittedHotspots.map((spot) => (
                  <div
                    key={spot.label}
                    className='border-b border-black/10 dark:border-white/10 pb-2'>
                    <p className='text-xs md:text-sm text-black/82 dark:text-white/82'>{spot.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='lg:col-span-8 min-h-[460px] md:min-h-[620px]'>
              <SubmissionGlobe hotspots={submittedHotspots} />
            </div>
          </div>
        </section>
      </ScrollUnmaskSection>

      {featuredWinners.map((winner, winnerIndex) => (
        <ScrollUnmaskSection
          key={winner.rank}
          containerClassName='bg-[#efefef] dark:bg-gray-900'>
          <article className='relative bg-[#efefef] dark:bg-gray-900 min-h-screen overflow-hidden px-4 md:px-8 lg:px-10'>
            <div className='h-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4 md:px-12 py-14 md:py-20'>
              <div className='lg:col-span-6 max-w-xl'>
                <p className='text-xs md:text-sm uppercase tracking-[0.2em] text-black/65 dark:text-white/70'>
                  {winner.rank}
                </p>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-black dark:text-white'>
                  {winner.title}
                </h2>
                <p className='mt-3 text-base md:text-lg text-black/80 dark:text-white/80'>
                  by {winner.creator}
                </p>
                <p className='mt-6 text-[15px] md:text-lg leading-relaxed text-black/78 dark:text-white/78'>
                  {winner.summary}
                </p>
              </div>

              <div className='lg:col-span-6'>
                <div className='relative w-full max-w-[560px] ml-auto aspect-[3/4] md:aspect-[5/7] max-h-[780px] [perspective:2000px]'>
                  <div
                    className={`absolute inset-0 rounded-[12px] bg-[#f8f7f3] dark:bg-gray-800 px-5 md:px-8 py-5 md:py-8 overflow-hidden transition-opacity duration-300 ${
                      openWinnerBook[winner.rank] ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <p className='text-[11px] md:text-xs uppercase tracking-[0.22em] text-black/60 dark:text-white/65'>
                      {winner.rank} Writing
                    </p>
                    <h3 className='mt-3 text-xl md:text-2xl font-semibold text-black dark:text-white'>
                      {winner.title}
                    </h3>
                    <p className='mt-1 text-sm md:text-base text-black/75 dark:text-white/75'>
                      by {winner.creator}
                    </p>
                    <p className='mt-5 text-sm md:text-base leading-relaxed text-black/80 dark:text-white/80'>
                      {winner.summary}
                    </p>
                    <p className='mt-4 text-sm md:text-base leading-relaxed text-black/80 dark:text-white/80 italic'>
                      {writingExcerpts[winnerIndex % writingExcerpts.length]}
                    </p>
                  </div>

                  <motion.button
                    type='button'
                    onClick={() => toggleWinnerBook(winner.rank)}
                    aria-label={`Open or close ${winner.rank} winner book`}
                    animate={{ rotateY: openWinnerBook[winner.rank] ? -165 : 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute inset-0 origin-left [transform-style:preserve-3d] cursor-pointer'>
                    <div className='absolute inset-0 [backface-visibility:hidden] rounded-[12px] bg-white dark:bg-gray-700 overflow-hidden shadow-[0_16px_28px_rgba(0,0,0,0.2)]'>
                      <Image
                        src={winner.image}
                        alt={`${winner.rank} winner cover artwork`}
                        fill
                        className='object-cover'
                      />
                      {/* Tint + soft gloss for Apple Books-like card finish */}
                      <div className='absolute inset-0 bg-[linear-gradient(165deg,rgba(64,96,255,0.24)_0%,rgba(27,34,98,0.12)_52%,rgba(6,8,14,0.18)_100%)]' />
                      <div className='absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent' />
                      {/* Apple Books-style spine */}
                      <div className='absolute inset-y-0 left-0 w-[28px] md:w-[36px] bg-gradient-to-r from-black/32 via-black/18 to-transparent' />
                      <div className='absolute inset-y-0 left-[2px] w-[1px] bg-white/45' />
                      <div className='absolute inset-y-0 left-[5px] w-[1px] bg-white/20' />
                      <div className='absolute inset-y-0 right-[1px] w-[1px] bg-white/30' />
                      <div className='absolute left-4 md:left-5 right-4 top-4 md:top-5 text-left'>
                        <p className='text-[22px] md:text-[30px] leading-[0.96] font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]'>
                          {winner.title}
                        </p>
                        <p className='mt-2 text-lg md:text-[30px] leading-none font-semibold text-black/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.22)]'>
                          {winner.creator}
                        </p>
                        <p className='mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/85'>
                          Tap to {openWinnerBook[winner.rank] ? 'close' : 'open'}
                        </p>
                      </div>
                    </div>

                    <div className='absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-l-[12px] bg-[#ebe8df] dark:bg-gray-800 px-5 md:px-8 py-6 text-left'>
                      <p className='text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/65 dark:text-white/70'>
                        Inside Cover
                      </p>
                      <p className='mt-4 text-base md:text-lg leading-relaxed text-black/80 dark:text-white/80'>
                        This selected piece reflects craft, honesty, and narrative depth. Continue reading on the right page.
                      </p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </article>
        </ScrollUnmaskSection>
      ))}

      <ScrollUnmaskSection containerClassName='bg-[#efefef] dark:bg-gray-900'>
      <section className='relative h-full min-h-[640px] w-full px-5 md:px-10 pt-24 md:pt-28 pb-10 overflow-hidden'>
        {/* Preview canvas */}
        <div className='absolute inset-0 pl-5 md:pl-[360px] lg:pl-[420px] pr-5 md:pr-10 pt-24 md:pt-28 pb-10 pointer-events-none'>
          <AnimatePresence mode='wait'>
            {activeSubmission ? (
              <motion.div
                key={activeSubmission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className='w-full h-full flex items-center justify-center'>
                {activeSubmission.type === 'art' && activeSubmission.image ? (
                  <div className='relative w-full max-w-[980px] h-[72vh] max-h-[640px]'>
                    <Image
                      src={activeSubmission.image}
                      alt={activeSubmission.title}
                      fill
                      className='object-cover'
                      priority
                    />
                  </div>
                ) : (
                  <div className='w-full max-w-[980px] h-[72vh] max-h-[640px] flex items-center justify-center px-8 md:px-16'>
                    <div className='max-w-3xl text-center'>
                      <p className='text-lg md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 italic'>
                        &ldquo;{activeSubmission.excerpt}&rdquo;
                      </p>
                      {activeSubmission.fileUrl && (
                        <a
                          href={activeSubmission.fileUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex mt-6 text-xs md:text-sm uppercase tracking-[0.16em] text-[#fabc68] hover:text-[#e3a952] transition-colors'>
                          Open submission
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key='idle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-full h-full flex items-center justify-center'>
                <p className='text-xs uppercase tracking-[0.25em] text-black/30 dark:text-white/30'>
                  Hover a title to preview
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submission index list */}
        <div className='relative z-10 w-full max-w-[320px] md:max-w-[360px]'>
          <div className='mb-6'>
            <p className='text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/60'>
              Runner-Up Selection
            </p>
          </div>

          <div
            onMouseLeave={() => setActiveId(null)}
            className='border-t border-black/15 dark:border-white/20'>
            {runnerUps.map((submission, index) => {
              const isActive = submission.id === activeId
              return (
                <button
                  key={submission.id}
                  type='button'
                  onMouseEnter={() => setActiveId(submission.id)}
                  onFocus={() => setActiveId(submission.id)}
                  onClick={() => setActiveId(submission.id)}
                  className='w-full text-left border-b border-black/10 dark:border-white/15 py-2.5 md:py-2 transition-opacity'>
                  <div className='grid grid-cols-[1fr_auto_auto] gap-3 items-center'>
                    <p
                      className={`text-[11px] md:text-xs leading-tight uppercase tracking-wide ${
                        isActive
                          ? 'text-black dark:text-white'
                          : 'text-black/65 dark:text-white/70 hover:text-black dark:hover:text-white'
                      }`}>
                      {submission.title}
                    </p>
                    <span className='text-[10px] md:text-[11px] uppercase text-black/45 dark:text-white/45'>
                      {submission.type === 'art'
                        ? 'Visual'
                        : submission.type === 'poem'
                          ? 'Poem'
                          : 'Story'}
                    </span>
                    <span className='text-[10px] md:text-[11px] text-black/45 dark:text-white/45 tabular-nums'>
                      {String(index + 1).padStart(3, '0')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
      </ScrollUnmaskSection>

      {/* Mobile fallback details */}
      <section className='md:hidden px-5 pb-14'>
        <div className='rounded-lg border border-black/10 dark:border-white/15 p-4'>
          <p className='text-xs uppercase tracking-[0.18em] text-black/60 dark:text-white/70 mb-2'>
            Tap a title to preview
          </p>
          {activeSubmission && (
            <p className='text-sm text-black/80 dark:text-white/80'>
              {activeSubmission.title} by {activeSubmission.creator}
            </p>
          )}
        </div>
      </section>

      <SignatureReveal />
      </main>
    </>
  )
}
