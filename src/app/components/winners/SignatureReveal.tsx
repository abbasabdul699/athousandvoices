'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function SignatureReveal() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end 8%'],
  })

  const paperY = useTransform(scrollYProgress, [0.16, 0.56], [170, -42])
  const paperOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0.65, 1])

  const reveal = useTransform(scrollYProgress, [0.4, 0.72], [0, 100])
  const revealRightInset = useTransform(reveal, (value) => `${100 - value}%`)
  const clipPath = useMotionTemplate`inset(0% ${revealRightInset} 0% 0%)`

  const penX = useTransform(scrollYProgress, [0.36, 0.64, 0.74], [2, 70, 92])
  const penY = useTransform(scrollYProgress, [0.36, 0.64, 0.74], [-18, -26, -18])
  const penRotate = useTransform(scrollYProgress, [0.36, 0.64, 0.74], [-22, -14, -6])
  const penOpacity = useTransform(scrollYProgress, [0.32, 0.38, 0.7, 0.76], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      className='relative h-[220svh] bg-white'>
      <div className='sticky top-0 h-svh w-full px-5 md:px-10 py-10 md:py-12'>
        <div className='relative h-full w-full rounded-2xl border border-black/10 bg-[#f5f5f5] overflow-hidden'>
          <div
            aria-hidden='true'
            className='absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_6%_7%,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:38px_38px]'
          />

          <div className='absolute left-5 top-5 md:left-10 md:top-10 z-30 max-w-sm'>
            <p className='text-[clamp(20px,3vw,34px)] leading-[1.05] text-black/58'>
              Imagine a world
              <br />
              Where every Afghan story,
            </p>
            <p className='mt-1 text-[clamp(20px,3vw,34px)] leading-[1.05] text-black/58'>
              poem, and work of art is heard.
            </p>
            <p className='mt-1 text-[clamp(20px,3vw,34px)] font-semibold leading-[1.05] text-black'>
              Voices are honored, and winners are seen.
            </p>
          </div>

          <div className='absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[clamp(360px,54vw,760px)] aspect-[4/4.3]'>
            {/* Envelope back layer */}
            <div className='absolute inset-0 z-10'>
              <Image
                src='/envelop_background.webp'
                alt='Envelope background'
                fill
                className='object-contain select-none pointer-events-none'
                sizes='(max-width: 768px) 95vw, 62vw'
              />
            </div>

            {/* Letter */}
            <motion.div
              style={{ y: paperY, opacity: paperOpacity }}
              className='absolute left-1/2 top-[22%] z-20 h-[62%] w-[66%] -translate-x-1/2'>
              <Image
                src='/paper.png'
                alt='Letter'
                fill
                className='object-contain select-none pointer-events-none'
                sizes='(max-width: 768px) 70vw, 44vw'
              />

              <div className='absolute left-[34%] top-[56.5%] w-[46%] h-[26%] translate-x-[65px] -translate-y-[40px]'>
                <Image
                  src='/signature.webp'
                  alt='Signature base'
                  fill
                  className='object-contain opacity-30 select-none pointer-events-none'
                  sizes='(max-width: 768px) 26vw, 16vw'
                />
              </div>

              <motion.div style={{ clipPath }} className='absolute left-[34%] top-[56.5%] w-[46%] h-[26%] translate-x-[65px] -translate-y-[40px]'>
                <Image
                  src='/signature.webp'
                  alt='Signature reveal'
                  fill
                  className='object-contain select-none pointer-events-none'
                  sizes='(max-width: 768px) 26vw, 16vw'
                />
              </motion.div>

              <motion.div
                style={{ x: penX, y: penY, rotate: penRotate, opacity: penOpacity }}
                className='absolute left-[55%] top-[42%] w-[30%] h-[30%] origin-[18%_80%]'>
                <Image
                  src='/pen.webp'
                  alt='Pen'
                  fill
                  className='object-contain select-none pointer-events-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]'
                  sizes='(max-width: 768px) 22vw, 12vw'
                />
              </motion.div>
            </motion.div>

            {/* Envelope front layer */}
            <div className='absolute inset-0 z-30'>
              <Image
                src='/envelop_front.webp'
                alt='Envelope front'
                fill
                className='object-contain object-bottom select-none pointer-events-none'
                sizes='(max-width: 768px) 100vw, 70vw'
              />
            </div>

            {/* Wax seal */}
            <div className='absolute left-1/2 top-[71.5%] z-40 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
              <Image
                src='/stamp.png'
                alt='Wax seal'
                fill
                className='object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.22)]'
                sizes='(max-width: 768px) 20vw, 12vw'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
