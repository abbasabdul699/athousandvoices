'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
const slides = [
  { src: '/images/afghan5.jpg', alt: 'Shah-Do Shamshira Mosque in Kabul' },
  { src: '/images/afghan1.jpg', alt: 'Street life in front of a sunlit yellow wall' },
  { src: '/images/afghan3.jpg', alt: 'Children celebrating with balloons' },
  { src: '/images/afghan4.jpg', alt: 'Kabul at golden hour' },
  { src: '/images/afghan2.jpg', alt: 'The cliffs of Bamiyan' },
]

const introFrames = [
  { bg: 'bg-sage', slide: 2 },
  { bg: 'bg-sky', slide: 3 },
  { bg: 'bg-sand', slide: 1 },
  { bg: 'bg-cream', slide: 0 },
]

const floatingPhotos = [
  { src: '/images/afghan3.jpg', alt: 'Children celebrating with balloons', className: 'left-[7%] top-[3%] w-[12vw]', speed: 1 },
  { src: '/images/home/ambassador/hat.jpg', alt: 'A man in front of a wall of pakol hats', className: 'right-[7%] top-[28%] w-[9vw]', speed: 1.4 },
  { src: '/images/home/about/grandpareading.jpg', alt: 'A bookseller reading in his shop', className: 'left-[19%] top-[90%] w-[11vw]', speed: 1.8 },
  { src: '/images/home/about/gateway.jpg', alt: 'Kabul seen through a stone archway', className: 'right-[22%] top-[105%] w-[10vw]', speed: 2.2 },
]

const INTRO_FRAME_MS = 550
const SLIDE_MS = 6000
const INTRO_SEEN_KEY = 'atv-intro-seen'

const ease = [0.76, 0, 0.24, 1] as const

function HeroSection() {
  const [introState, setIntroState] = useState<'pending' | 'playing' | 'expanding' | 'done'>('pending')
  const [frame, setFrame] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || sessionStorage.getItem(INTRO_SEEN_KEY)) {
      setIntroState('done')
      return
    }
    setIntroState('playing')
  }, [])

  useEffect(() => {
    if (introState !== 'playing') return
    if (frame >= introFrames.length - 1) {
      const t = setTimeout(() => setIntroState('expanding'), INTRO_FRAME_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setFrame((f) => f + 1), INTRO_FRAME_MS)
    return () => clearTimeout(t)
  }, [introState, frame])

  useEffect(() => {
    const locked = introState === 'playing' || introState === 'expanding'
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [introState])

  useEffect(() => {
    if (introState !== 'done') return
    const t = setInterval(() => setActiveSlide((s) => (s + 1) % slides.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [introState])

  const sectionRef = useRef<HTMLElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const insetTop = useTransform(scrollYProgress, [0, 0.5], [0, 36.5])
  const insetSide = useTransform(scrollYProgress, [0, 0.5], [0, 31])
  const insetBottom = useTransform(scrollYProgress, [0, 0.5], [0, 37])
  const clipPath = useMotionTemplate`inset(${insetTop}% ${insetSide}% ${insetBottom}% ${insetSide}%)`
  const cardY = useTransform(scrollYProgress, [0.55, 1], ['0vh', '-75vh'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const photoY = [
    useTransform(scrollYProgress, [0, 1], ['10vh', `-${30 * floatingPhotos[0].speed}vh`]),
    useTransform(scrollYProgress, [0, 1], ['10vh', `-${30 * floatingPhotos[1].speed}vh`]),
    useTransform(scrollYProgress, [0, 1], ['10vh', `-${30 * floatingPhotos[2].speed}vh`]),
    useTransform(scrollYProgress, [0, 1], ['10vh', `-${30 * floatingPhotos[3].speed}vh`]),
  ]
  const lowerPhotoOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0])

  const heroReady = introState === 'done'
  const current = introFrames[frame]

  return (
    <section ref={sectionRef} className='relative w-full bg-cream dark:bg-dark_black md:h-[340vh]'>
      <div className='relative h-[100svh] min-h-[560px] w-full overflow-hidden md:sticky md:top-0'>
        {/* ---------------- backdrop revealed on scroll (tablet & desktop) --------------- */}
        <div aria-hidden className='absolute inset-0 hidden md:flex items-center justify-center'>
          <p className='instrument-font whitespace-nowrap text-center tracking-[-0.02em] leading-[0.95] text-[24vw] text-dark_black dark:text-white'>
            Every voice
          </p>
          {floatingPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              style={{ y: photoY[i], opacity: i >= 2 ? lowerPhotoOpacity : 1 }}
              className={`absolute aspect-[155/214] overflow-hidden ${photo.className}`}>
              <Image src={photo.src} alt='' fill sizes='12vw' className='object-cover' />
            </motion.div>
          ))}
        </div>

        <motion.div
          className='absolute inset-0 z-10 overflow-hidden bg-dark_black'
          style={{ clipPath: isDesktop ? clipPath : 'none', y: isDesktop ? cardY : 0 }}>
          {/* ---------------- background slideshow --------------- */}
          <div className='absolute inset-0'>
            {slides.map((slide, i) => (
              <motion.div
                key={slide.src}
                className='absolute inset-0'
                initial={false}
                animate={{
                  opacity: i === activeSlide ? 1 : 0,
                  scale: i === activeSlide ? 1.08 : 1,
                }}
                transition={{
                  opacity: { duration: 1.4, ease: 'easeInOut' },
                  scale: { duration: SLIDE_MS / 1000 + 1.4, ease: 'linear' },
                }}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes='100vw'
                  className='object-cover'
                />
              </motion.div>
            ))}
            <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/60' />
          </div>

          {/* ---------------- headline --------------- */}
          <motion.div
            style={{ opacity: isDesktop ? textOpacity : 1 }}
            className='relative z-10 flex h-full flex-col justify-end px-5 lg:px-8 pb-6 lg:pb-8'>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className='mb-2 lg:mb-4 text-base lg:text-xl text-white/85'>
              Afghanistan&apos;s Short Story Competition
            </motion.p>

            <h1 className='overflow-hidden pb-[0.08em] text-cream dark:text-cream instrument-font font-normal tracking-[-0.02em] leading-[0.9] text-[clamp(3.75rem,13.5vw,15rem)]'>
              <motion.span
                className='block'
                initial={{ y: '105%' }}
                animate={heroReady ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease }}>
                A Thousand Voices
              </motion.span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={heroReady ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease }}
              className='mt-4 lg:mt-6 h-px w-full origin-left bg-white/35'
            />

            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroReady ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='mt-4 flex h-10 items-center justify-center text-white'>
                <div className='hidden sm:flex items-center gap-2'>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Show slide ${i + 1}`}
                      onClick={() => setActiveSlide(i)}
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        i === activeSlide ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------------- intro overlay --------------- */}
      <AnimatePresence>
        {(introState === 'playing' || introState === 'expanding') && (
          <motion.div
            key='intro'
            className={`fixed inset-0 z-[10002] flex items-center justify-center transition-colors duration-300 ${current.bg}`}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <motion.div
              className='relative overflow-hidden'
              initial={{ width: '34vw', height: '30vh', opacity: 0 }}
              animate={
                introState === 'expanding'
                  ? { width: '100vw', height: '100vh', opacity: 1 }
                  : { width: 'max(34vw, 260px)', height: 'max(30vh, 200px)', opacity: 1 }
              }
              transition={{ duration: introState === 'expanding' ? 1.1 : 0.4, ease }}
              onAnimationComplete={() => {
                if (introState !== 'expanding') return
                sessionStorage.setItem(INTRO_SEEN_KEY, '1')
                setIntroState('done')
              }}>
              <Image
                src={slides[current.slide].src}
                alt=''
                fill
                sizes='100vw'
                priority
                className='object-cover'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSection
