'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ease = [0.47, 0.12, 0.5, 0.9] as const

const colors = ['#d4b5f6', '#ffff6b', '#7acaff', '#f96926', '#69e691', '#f2a8d0']

const TAB_HEIGHT = 59
const TIP_WIDTH = Math.round((TAB_HEIGHT * 73) / 85)

const tipMask = {
  maskImage: 'url(/images/home/timeline/chevron-tip.svg)',
  WebkitMaskImage: 'url(/images/home/timeline/chevron-tip.svg)',
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
}

function Faq() {
  const [faqList, setfaqList] = useState<any>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setfaqList(data?.faqList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <section id='faq' className='bg-cream dark:bg-dark_black text-[#2c111d]'>
      <div className='px-5 lg:px-12 py-20 lg:py-[7.35rem] grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10'>
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease }}>
          <span className='instrument-font block text-[20px] leading-[1.3] dark:text-white/80'>Questions</span>
          <h2 className='text-[clamp(2rem,3.4vw,2.45rem)] font-semibold leading-[1.2] tracking-normal text-[#2c111d] dark:text-white'>
            Q&amp;A / all you need to know
          </h2>
        </motion.header>

        <div>
          <motion.ul
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className='flex flex-col gap-2.5'>
            {faqList?.map((item: any, index: number) => {
              const open = openIndex === index
              const color = colors[index % colors.length]
              return (
                <motion.li
                  key={item.faq_que}
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
                  }}>
                  <button
                    type='button'
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    className='group relative flex w-full items-center justify-between gap-4 py-2.5 pl-5 text-left'
                    style={{ minHeight: TAB_HEIGHT, paddingRight: TIP_WIDTH }}>
                    <span
                      aria-hidden
                      className='absolute inset-y-0 left-0 rounded-l-[0.6rem]'
                      style={{ right: Math.round(TIP_WIDTH * 0.35), backgroundColor: color }}
                    />
                    <span
                      aria-hidden
                      className='absolute inset-y-0 right-0 transition-transform duration-300 group-hover:translate-x-4'
                      style={{
                        width: TIP_WIDTH,
                        backgroundColor: color,
                        clipPath: 'polygon(0 0, 70% 0, 104% 50%, 70% 100%, 0 100%)',
                        ...tipMask,
                      }}
                    />
                    <span className='relative text-[clamp(1rem,1.5vw,1.125rem)] font-semibold leading-[1.3] text-[#402531]'>
                      {item.faq_que}
                    </span>
                    <span
                      aria-hidden
                      className={`relative flex h-[2.45rem] w-[2.45rem] shrink-0 items-center justify-center rounded-full bg-[#543945]/[0.08] transition-[transform,background-color] duration-300 group-hover:translate-x-2.5 group-hover:bg-[#543945]/[0.05] ${
                        open ? '' : 'group-hover:rotate-90'
                      }`}>
                      <span className='absolute h-px w-[0.82rem] bg-[#543945]' />
                      <span
                        className={`absolute h-px w-[0.82rem] bg-[#543945] transition-transform duration-300 ${
                          open ? 'rotate-0' : 'rotate-90'
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className='overflow-hidden'>
                        <div className='mt-1.5 rounded-[0.6rem] bg-white px-[1.43rem] pt-[0.82rem] pb-4'>
                          <p className='text-[15px] leading-[1.6] text-[#402531]/90 dark:text-[#402531]/90'>
                            {item.faq_ans}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </motion.ul>

          <Link
            href='/contact'
            className='mt-6 inline-flex h-11 items-center rounded-[0.4rem] border border-[#543945] px-[1.125rem] text-[13px] font-semibold text-[#402531] transition-[border-radius] duration-200 ease-in-out hover:rounded-full dark:border-white/60 dark:text-white'>
            Ask us a question
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Faq
