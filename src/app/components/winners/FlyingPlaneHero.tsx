'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Lottie from 'lottie-react'

const WELCOME_LOTTIE_URL =
  'https://lottie.host/2fc0001c-3110-4c80-b3fc-cd3967c9eb13/BimVYzzaAv.json'

export default function FlyingPlaneHero() {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [welcomeAnimation, setWelcomeAnimation] = useState<object | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const planeX = useTransform(scrollYProgress, [0, 1], ['10%', '65%'])
  const planeY = useTransform(scrollYProgress, [0, 0.25, 0.52, 0.8, 1], ['14%', '24%', '40%', '58%', '69%'])
  const planeRotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-8, 2, 7, 12])
  const planeScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.07])
  const planePitch = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -2])

  useEffect(() => {
    let isMounted = true

    fetch(WELCOME_LOTTIE_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load welcome animation')
        return response.json()
      })
      .then((data) => {
        if (isMounted) setWelcomeAnimation(data)
      })
      .catch(() => {
        // Keep hero usable if animation fails to load.
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id='winners-hero' ref={sectionRef} className='relative h-[150svh] bg-[#efefef] dark:bg-gray-900'>
      <div className='pointer-events-none sticky top-0 h-svh w-full px-3 py-4 md:px-8 md:py-8 lg:px-10'>
        <div className='relative h-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15 bg-[#f3f2ef] dark:bg-gray-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_0_100px_rgba(0,0,0,0.035)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_0_120px_rgba(0,0,0,0.45)] md:rounded-2xl'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(0,0,0,0.08)_0,rgba(0,0,0,0)_58%)] dark:bg-[radial-gradient(circle_at_70%_48%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_58%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.0)_35%,rgba(0,0,0,0.03)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.35)_100%)]' />
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
              A thousand stories arrived across the diaspora. Explore the finalists and winners whose voices rose to the top.
            </p>
          </div>

          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 top-[34%] z-[5] flex justify-center px-2 sm:top-[38%] md:top-[40%] md:px-6'>
            <div className='w-full max-w-[min(98vw,1100px)] scale-110 sm:scale-125 md:scale-[1.35]'>
              {welcomeAnimation ? (
                <Lottie
                  animationData={welcomeAnimation}
                  loop
                  autoplay
                  className='h-auto w-full'
                />
              ) : null}
            </div>
          </div>

          <motion.div
            style={{ left: planeX, top: planeY, rotate: planeRotate, scale: planeScale, rotateX: planePitch }}
            className='absolute z-30 w-[min(48vw,200px)] sm:w-[240px] md:w-[340px] lg:w-[360px]'>
            <div className='relative'>
              <div className='relative aspect-square w-full'>
                <Image
                  src='/plane.png'
                  alt='Paper plane'
                  fill
                  className='pointer-events-none select-none object-contain'
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
