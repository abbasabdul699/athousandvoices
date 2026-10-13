'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParallaxImage from '../../shared/ParallaxImage'

const ease = [0.22, 1, 0.36, 1] as const

const content = {
  label: 'Our mission',
  heading: 'Afghan stories, told by the people who live them',
  subheading: 'At A Thousand Voices, every story begins with an Afghan voice.',
  paragraphs: [
    'For too long, Afghanistan has been written about by outsiders. We give Afghan youth, at home and across the diaspora, the space to tell their own stories, in their own words, about identity, resilience, and home.',
    'Writing is only the beginning. Through mentorship, publication, and our upcoming anthology, young writers grow in confidence, find a community of readers, and carry their voices further than they ever imagined.',
  ],
}

function IntroStatement() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const leftY = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])
  const centerY = useTransform(scrollYProgress, [0, 1], ['30%', '-20%'])
  const rightY = useTransform(scrollYProgress, [0, 1], ['50%', '-50%'])

  return (
    <section id='home-intro' ref={ref} className='relative bg-cream dark:bg-dark_black pt-24 md:pt-10'>
      {/* ---------------- big word with floating photos (phones) --------------- */}
      <div className='relative px-5 pb-24 md:hidden'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease }}
          className='relative z-10 instrument-font font-normal text-center tracking-[-0.02em] leading-[0.95] text-[clamp(4.5rem,17vw,17rem)] text-dark_black dark:text-white'>
          Every voice
        </motion.h2>

        <motion.div
          style={{ y: leftY }}
          className='hidden md:block absolute left-[6%] top-[55%] w-[13vw] max-w-[190px] aspect-[155/214] overflow-hidden'>
          <Image src='/images/afghan3.jpg' alt='Children celebrating with balloons' fill sizes='13vw' className='object-cover' />
        </motion.div>
        <motion.div
          style={{ y: centerY }}
          className='hidden md:block absolute left-[44%] top-[75%] w-[11vw] max-w-[160px] aspect-[155/214] overflow-hidden'>
          <Image src='/images/home/about/grandpareading.jpg' alt='A bookseller reading in his shop' fill sizes='11vw' className='object-cover' />
        </motion.div>
        <motion.div
          style={{ y: rightY }}
          className='hidden md:block absolute right-[6%] top-[40%] w-[13vw] max-w-[190px] aspect-[155/214] overflow-hidden'>
          <Image src='/images/afghan4.jpg' alt='Kabul at golden hour' fill sizes='13vw' className='object-cover' />
        </motion.div>
      </div>

      {/* ---------------- content with two images --------------- */}
      <div className='rounded-t-[2rem] lg:rounded-t-[2.5rem] bg-[#ffdc7e] px-5 lg:px-8 pt-20 lg:pt-24 pb-28 lg:pb-[13rem] text-[#1a1a1a]'>
        <header>
          <motion.p
            initial={{ opacity: 0, y: '100%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className='text-[clamp(1.05rem,1.7vw,1.25rem)] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'>
            {content.label}
          </motion.p>

          <motion.h2
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.04 }}
            className='mt-6 lg:mt-7 max-w-[19ch] text-[clamp(2.5rem,5.85vw,4.25rem)] font-normal leading-[1.06] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'>
            {content.heading.split(' ').map((word, i) => (
              <span key={i} className='inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top'>
                <motion.span
                  className='inline-block'
                  variants={{
                    hidden: { y: '110%' },
                    visible: { y: 0, transition: { duration: 0.9, ease } },
                  }}>
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className='mt-10 lg:mt-12 origin-left border-0 h-px bg-[#1a1a1a]/25'
          />
        </header>

        <div className='mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-8'>
          <figure className='md:col-span-6 order-2 md:order-1 mt-12 md:mt-16'>
            <ParallaxImage
              src='/images/home/kite-flyer.jpg'
              alt='A boy flying a kite on a hilltop above Kabul at sunset'
              sizes='(max-width: 768px) 100vw, 50vw'
              imageClassName='object-[30%_center]'
              className='aspect-[5/4] w-full'
            />
            <figcaption className='mt-3 text-[13px] text-[#1a1a1a]/70'>
              Photo by Daniel Malikyar
            </figcaption>
          </figure>

          <div className='md:col-start-7 md:col-span-6 order-1 md:order-2'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
              className='max-w-[26rem]'>
              <h3 className='text-[clamp(1.25rem,2vw,1.47rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'>
                {content.subheading}
              </h3>
              <div className='mt-7'>
                {content.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className='mt-8 first:mt-0 text-[clamp(1.05rem,1.7vw,1.24rem)] leading-[1.6] tracking-[0.01em] text-[#1c1c1c]/80 dark:text-[#1c1c1c]/80'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <ParallaxImage
              src='/images/home/pomegranates.jpg'
              alt='Halved pomegranates piled together, their red seeds exposed'
              sizes='(max-width: 768px) 50vw, 20vw'
              className='hidden md:block mt-36 ml-auto aspect-[195/205] w-[17vw] max-w-[260px]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroStatement
