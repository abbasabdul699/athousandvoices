'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type SubmissionType = 'writing' | 'art'

interface RunnerUpSubmission {
  id: string
  title: string
  creator: string
  type: SubmissionType
  category: string
  image?: string
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

const titlePool = [
  'The House with One Window',
  'Threads of Kabul',
  'Letters I Never Sent',
  'My Grandmother\'s Garden',
  'After the Checkpoint',
  'Maps Without Borders',
  'Dust and Jasmine',
  'The Last Classroom Bell',
  'City of Quiet Rivers',
  'When the Apricots Returned',
]

const creatorPool = [
  'A. Rahimi',
  'M. Ahmadi',
  'S. Yousufi',
  'F. Mehrabi',
  'N. Wafa',
  'L. Safi',
  'Z. Nazari',
  'K. Qaderi',
]

const writingExcerpts = [
  'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  'At the bus stop, everyone carried a story in silence. Mine was wrapped in notebook paper, tied with the red thread my sister once braided into my hair.',
]

const artExcerpts = [
  'A layered visual memory of Kabul: fragments of homes, old fabrics, and handwritten notes stitched into one frame.',
  'A study in light and memory, inspired by gardens that survived when so much else did not.',
  'Portrait fragments and shadows explore memory, displacement, and return through texture and color.',
]

const artImages = [
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/wmremove-transformed.png',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Lotfullah.jpg',
]

const runnerUps: RunnerUpSubmission[] = Array.from({ length: 50 }, (_, index) => {
  const rowNumber = index + 1
  const isArt = rowNumber % 4 === 0
  const titleBase = titlePool[index % titlePool.length]
  const creator = creatorPool[index % creatorPool.length]

  return {
    id: `ru-${String(rowNumber).padStart(3, '0')}`,
    title: `${titleBase} ${rowNumber}`,
    creator,
    type: isArt ? 'art' : 'writing',
    category: isArt ? 'Visual Art' : 'Writing',
    image: isArt ? artImages[index % artImages.length] : undefined,
    excerpt: isArt
      ? artExcerpts[index % artExcerpts.length]
      : writingExcerpts[index % writingExcerpts.length],
  }
})

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

const INTRO_DURATION_MS = 5200

const introDropItems = [
  { id: 'piece-1', left: '-4%', top: '-6%', width: '24%', height: '40%', rotate: -9, delay: 0.04, z: 20 },
  { id: 'piece-2', left: '13%', top: '-4%', width: '23%', height: '38%', rotate: 8, delay: 0.12, z: 30 },
  { id: 'piece-3', left: '31%', top: '-8%', width: '22%', height: '40%', rotate: -7, delay: 0.2, z: 25 },
  { id: 'piece-4', left: '48%', top: '-5%', width: '24%', height: '39%', rotate: 10, delay: 0.28, z: 35 },
  { id: 'piece-5', left: '67%', top: '-7%', width: '22%', height: '42%', rotate: -8, delay: 0.36, z: 45 },
  { id: 'piece-6', left: '84%', top: '-4%', width: '22%', height: '40%', rotate: 6, delay: 0.44, z: 28 },
  { id: 'piece-7', left: '-6%', top: '29%', width: '23%', height: '44%', rotate: 7, delay: 0.52, z: 38 },
  { id: 'piece-8', left: '12%', top: '30%', width: '25%', height: '43%', rotate: -11, delay: 0.6, z: 32 },
  { id: 'piece-9', left: '31%', top: '31%', width: '23%', height: '45%', rotate: 9, delay: 0.68, z: 50 },
  { id: 'piece-10', left: '50%', top: '30%', width: '24%', height: '44%', rotate: -8, delay: 0.76, z: 37 },
  { id: 'piece-11', left: '69%', top: '31%', width: '22%', height: '45%', rotate: 12, delay: 0.84, z: 42 },
  { id: 'piece-12', left: '86%', top: '29%', width: '20%', height: '44%', rotate: -10, delay: 0.92, z: 34 },
  { id: 'piece-13', left: '4%', top: '63%', width: '26%', height: '40%', rotate: -8, delay: 1.0, z: 33 },
  { id: 'piece-14', left: '27%', top: '62%', width: '24%', height: '41%', rotate: 11, delay: 1.08, z: 47 },
  { id: 'piece-15', left: '52%', top: '63%', width: '24%', height: '39%', rotate: -7, delay: 1.16, z: 36 },
  { id: 'piece-16', left: '75%', top: '62%', width: '24%', height: '40%', rotate: 9, delay: 1.24, z: 40 },
]

export default function WinnersPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openWinnerBook, setOpenWinnerBook] = useState<Record<string, boolean>>({})

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
    const timeout = window.setTimeout(() => {
      setShowIntro(false)
    }, INTRO_DURATION_MS)

    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.section
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className='fixed inset-0 z-[9999] bg-[#f5efe4] dark:bg-gray-900 overflow-hidden'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_64%)] dark:bg-none' />

            <div className='absolute inset-0'>
              {introDropItems.map((piece) => (
                <motion.div
                  key={piece.id}
                  initial={{ y: -900, rotate: piece.rotate * 2, opacity: 0 }}
                  animate={{
                    y: [-900, 0, 1250],
                    rotate: [piece.rotate * 2, piece.rotate, piece.rotate + 6],
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    delay: piece.delay,
                    duration: 4.8,
                    times: [0, 0.42, 1],
                    ease: 'easeInOut',
                  }}
                  style={{
                    left: piece.left,
                    top: piece.top,
                    width: piece.width,
                    height: piece.height,
                    zIndex: piece.z,
                  }}
                  className='absolute rounded-sm border border-black/25 dark:border-white/25 bg-gradient-to-br from-[#f6cf7a] via-[#d96a3f] to-[#5c2c19] dark:from-[#3a2a1a] dark:via-[#503126] dark:to-[#211a15] shadow-xl'
                />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <main
        className={`min-h-screen bg-[#efefef] dark:bg-gray-900 transition-opacity duration-500 ${
          showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
      <section className='relative h-[100svh] w-full overflow-hidden bg-[#efefef] dark:bg-gray-900'>
        <div className='absolute inset-0'>
          <div className='relative h-full border-2 border-black dark:border-white bg-[#f2f2f2] dark:bg-gray-800/40 overflow-hidden'>
            {/* Collage Panel: top left text block */}
            <div className='absolute top-0 left-0 z-10 w-[56%] h-[50%] border-r-4 border-b border-black dark:border-white p-3 md:p-5'>
              <p className='text-[clamp(13px,1.8vw,32px)] font-semibold leading-[1.15] tracking-[-0.01em] text-black/88 dark:text-white/88 max-w-[98%]'>
                Not every journey begins with a map. Some start with a question, a spark, a childhood memory, a turning point. These stories come from young Afghans choosing their own path, and sharing it in their own words.
              </p>
            </div>

            {/* Collage Panel: top right geometric frame */}
            <div className='absolute top-0 right-0 z-10 w-[44%] h-[50%]'>
              <div className='relative h-full w-full'>
                <div className='absolute inset-[8%] border border-black dark:border-white' />
                <div className='absolute inset-[8%] border-t-2 border-black dark:border-white rotate-[49deg] origin-center' />
                <div className='absolute inset-[8%] border-t border-black dark:border-white rotate-[-49deg] origin-center' />
                <h2 className='absolute left-[10%] bottom-[7%] uppercase font-semibold leading-[0.9] tracking-[-0.03em] text-[clamp(24px,4vw,72px)] text-black/90 dark:text-white/90'>
                  Own your
                  <br />
                  voice
                </h2>
              </div>
            </div>

            {/* Collage Panel: bottom left text block */}
            <div className='absolute left-[4%] top-[56%] z-[15] w-[33%] h-[33%] overflow-hidden'>
              <h2 className='uppercase font-semibold leading-[0.86] tracking-[-0.03em] text-[clamp(24px,4.5vw,90px)] text-black/92 dark:text-white/92'>
                Write.
                <br />
                Remember.
                <br />
                Resist.
              </h2>
            </div>

            {/* Collage Panel: large overlapping headline */}
            <div className='absolute z-30 left-[40%] top-[48%] md:left-[41%] md:top-[44%] w-[57%] h-[50%] border-4 border-black dark:border-white bg-[#f5f5f5] dark:bg-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]'>
              <div className='absolute inset-0 px-4 md:px-8 py-4 md:py-8 overflow-hidden'>
                <h1 className='uppercase text-black dark:text-white leading-[0.86] tracking-[-0.03em] text-[66px] sm:text-[88px] md:text-[110px] lg:text-[126px] origin-top-left rotate-90 translate-x-[68%] -translate-y-[8%] md:translate-x-[62%] md:-translate-y-[3%] whitespace-nowrap'>
                  Live your truth.
                  <br />
                  Change your world.
                </h1>
              </div>
            </div>

            {/* Vertical text rails */}
            <div className='absolute left-0 top-[50%] z-20 h-[50%] w-10 md:w-14 flex items-center justify-center'>
              <p className='text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/65 dark:text-white/65 [writing-mode:vertical-rl] [text-orientation:mixed]'>
                contestant archives
              </p>
            </div>
            <div className='absolute right-0 top-[50%] z-20 h-[50%] w-10 md:w-14 border-l-[3px] border-black dark:border-white flex items-center justify-center'>
              <p className='text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/65 dark:text-white/65 [writing-mode:vertical-rl] [text-orientation:mixed]'>
                explore voices
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='relative px-4 md:px-8 lg:px-10 py-10 md:py-16 bg-[#efefef] dark:bg-gray-900'>
        <div className='space-y-6 md:space-y-10'>
          {featuredWinners.map((winner, winnerIndex) => (
            <article
              key={winner.rank}
              className='relative bg-[#efefef] dark:bg-gray-900 min-h-[540px] md:min-h-[620px] overflow-hidden'>

              <div className='h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-8 md:px-12 py-16 md:py-20'>
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
          ))}
        </div>
      </section>

      <section className='relative h-[calc(100vh-72px)] min-h-[640px] w-full px-5 md:px-10 pt-8 md:pt-10 pb-10 overflow-hidden'>
        {/* Preview canvas */}
        <div className='absolute inset-0 pl-5 md:pl-[360px] lg:pl-[420px] pr-5 md:pr-10 pt-8 md:pt-10 pb-10 pointer-events-none'>
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
                    <p className='max-w-3xl text-center text-lg md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 italic'>
                      &ldquo;{activeSubmission.excerpt}&rdquo;
                    </p>
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
                      {submission.type === 'art' ? 'Visual' : 'Text'}
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
      </main>
    </>
  )
}
