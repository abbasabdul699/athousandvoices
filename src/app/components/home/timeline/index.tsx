'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface TimelineItem {
  id: number
  date: string
  title: string
  color: string
  end: number
}

const timelineData: TimelineItem[] = [
  { id: 1, date: 'Sep 2025', title: 'Story submissions open to Afghan youth', color: '#d4b5f6', end: 17 },
  { id: 2, date: 'Dec 15, 2025', title: 'Regular submissions closed', color: '#ffff6b', end: 34 },
  { id: 3, date: 'Jan 2026', title: 'Pre-selection of writers', color: '#402531', end: 51 },
  { id: 4, date: 'Feb–Mar 2026', title: 'Second round of selection and interviews', color: '#7acaff', end: 68 },
  { id: 5, date: 'Dec 2026', title: 'Publishing and book launch', color: '#f96926', end: 85 },
]

const EXTRA_TAB_TITLE = 'Mentorship and other programs'

const ease = [0.47, 0.12, 0.5, 0.9] as const

const BAR_HEIGHT = 72
const TIP_WIDTH = Math.round((BAR_HEIGHT * 73) / 85)
const HOVER_ROOM = 14
const HOVER_LIFT = -8
const hoverTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }

const tabCenter = (i: number) => {
  const end = timelineData[i].end
  if (i === 0) return `calc(${end / 2}% - ${TIP_WIDTH / 4}px)`
  const prevEnd = timelineData[i - 1].end
  return `calc(${(prevEnd + end) / 2}% - ${TIP_WIDTH / 2}px)`
}

const tipMask = {
  maskImage: 'url(/images/home/timeline/chevron-tip.svg)',
  WebkitMaskImage: 'url(/images/home/timeline/chevron-tip.svg)',
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
}

function Chevron({ color }: { color: string }) {
  return (
    <>
      <span
        className='absolute inset-y-0 left-0 rounded-l-[0.75rem]'
        style={{ right: TIP_WIDTH - 6, backgroundColor: color }}
      />
      <span
        className='absolute inset-y-0 right-0'
        style={{
          width: TIP_WIDTH,
          backgroundColor: color,
          clipPath: 'polygon(0 0, 70% 0, 104% 50%, 70% 100%, 0 100%)',
          ...tipMask,
        }}
      />
    </>
  )
}

const textVariants = (i: number) => ({
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.25 + i * 0.15 } },
})

function Timeline() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id='timeline' className='relative bg-[#ffdc7e] dark:bg-dark_black'>
      <div className='rounded-t-[2rem] lg:rounded-t-[2.5rem] bg-sage pt-20 md:pt-36 pb-20 lg:pb-28 text-[#2c111d]'>
        <div className='px-5 lg:px-12'>
          {/* ---------------- heading --------------- */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease }}
            className='mb-12 md:mb-20'>
            <span className='instrument-font block text-[20px] leading-[1.3]'>Timeline</span>
            <h2 className='text-[clamp(2rem,3.4vw,2.45rem)] font-semibold leading-[1.2] tracking-normal text-[#2c111d] dark:text-[#2c111d]'>
              Our journey, from first draft to book
            </h2>
          </motion.header>

          {/* ---------------- desktop: chevron bar --------------- */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.4 }}
            className='relative hidden md:block h-[24.125rem] mb-9'>
            <div
              className='absolute inset-x-0 overflow-hidden'
              style={{
                top: `calc(50% - ${BAR_HEIGHT / 2 + HOVER_ROOM}px)`,
                height: BAR_HEIGHT + HOVER_ROOM * 2,
              }}
              onMouseLeave={() => setHovered(null)}>
              <div className='absolute inset-x-0' style={{ top: HOVER_ROOM, bottom: HOVER_ROOM }}>
                <Chevron color='#f9f8f2' />
                <motion.span
                  variants={textVariants(timelineData.length)}
                  className='absolute inset-y-0 flex items-center pl-4 text-[13px] font-semibold leading-[1.3] text-[#402531]'
                  style={{ left: `${timelineData[timelineData.length - 1].end}%`, right: TIP_WIDTH * 0.6 }}>
                  {EXTRA_TAB_TITLE}
                </motion.span>
              </div>
              {timelineData.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { x: '-100%' },
                    visible: { x: 0, transition: { duration: 0.9, ease, delay: i * 0.15 } },
                  }}
                  className='absolute left-0'
                  style={{
                    top: HOVER_ROOM,
                    bottom: HOVER_ROOM,
                    width: `${item.end}%`,
                    zIndex: timelineData.length - i,
                  }}>
                  <motion.div
                    animate={{ y: hovered === i ? HOVER_LIFT : 0 }}
                    transition={hoverTransition}
                    onMouseEnter={() => setHovered(i)}
                    className='absolute inset-0 cursor-default'>
                    <Chevron color={item.color} />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {timelineData.map((item, i) => {
              const above = i % 2 === 0
              return (
                <motion.div
                  key={item.id}
                  variants={textVariants(i)}
                  className={`absolute ${above ? 'top-0' : 'bottom-0'}`}
                  style={{ left: tabCenter(i), height: `calc(50% - ${BAR_HEIGHT / 2}px + 1.5rem)` }}>
                  <motion.div
                    animate={{ y: hovered === i ? HOVER_LIFT : 0 }}
                    transition={hoverTransition}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative flex h-full w-max max-w-[11.5rem] flex-col pl-3 ${
                      above ? '' : 'justify-end'
                    }`}>
                    <span aria-hidden className='absolute inset-y-0 left-0 w-px bg-[#543945]/70' />
                    <h3 className='instrument-font text-[26px] font-normal leading-[1.3] tracking-[-0.01em] text-[#402531] dark:text-[#402531]'>
                      {item.date}
                    </h3>
                    <p className='text-[13px] font-medium leading-[1.45] text-[#543945] dark:text-[#543945]'>
                      {item.title}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ---------------- mobile: stacked chevrons --------------- */}
          <motion.ol
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            className='md:hidden mb-12'>
            {timelineData.map((item, i) => (
              <li key={item.id} className='relative flex gap-5' style={{ zIndex: timelineData.length - i }}>
                <motion.span
                  aria-hidden
                  variants={{
                    hidden: { scaleY: 0 },
                    visible: { scaleY: 1, transition: { duration: 0.6, ease, delay: i * 0.12 } },
                  }}
                  className={`w-14 shrink-0 origin-top ${i === 0 ? 'rounded-t-[0.75rem]' : '-mt-4'}`}
                  style={{
                    backgroundColor: item.color,
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), 50% 100%, 0 calc(100% - 16px))',
                  }}
                />
                <motion.div variants={textVariants(i)} className='py-6'>
                  <h3 className='instrument-font text-[26px] font-normal leading-[1.3] text-[#402531] dark:text-[#402531]'>
                    {item.date}
                  </h3>
                  <p className='text-[14px] font-medium leading-[1.45] text-[#543945] dark:text-[#543945]'>
                    {item.title}
                  </p>
                </motion.div>
              </li>
            ))}
            <li className='relative flex gap-5'>
              <motion.span
                aria-hidden
                variants={{
                  hidden: { scaleY: 0 },
                  visible: { scaleY: 1, transition: { duration: 0.6, ease, delay: timelineData.length * 0.12 } },
                }}
                className='-mt-4 w-14 shrink-0 origin-top rounded-b-[0.75rem] bg-cream'
              />
              <motion.div variants={textVariants(timelineData.length)} className='py-6'>
                <p className='text-[14px] font-semibold leading-[1.45] text-[#402531]'>{EXTRA_TAB_TITLE}</p>
              </motion.div>
            </li>
          </motion.ol>

          <Link
            href='/about'
            className='group inline-flex h-11 items-center gap-1.5 rounded-[0.4rem] border border-[#543945] px-[1.125rem] text-[13px] font-semibold text-[#402531] transition-[border-radius] duration-200 ease-in-out hover:rounded-full'>
            Learn more about us
            <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Timeline
