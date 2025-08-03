'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Solutions() {
  const ref = useRef(null)
  const inView = useInView(ref)

  const bottomAnimation = {
    initial: { y: '5%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  }

  return (
    <section>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div
            ref={ref}
            className='py-16 md:py-28 px-6 border border-dark_black/10 rounded-3xl bg-[linear-gradient(90deg,#CDEFFB_0%,#FFFFFF_33.23%,#FFFFFF_65.77%,#FDEECB_100%)] backdrop-blur-[200px] dark:opacity-80'>
            <motion.div
              {...bottomAnimation}
              className='flex flex-col gap-6 items-center md:max-w-3xl mx-auto'>
              <div className='flex flex-col gap-3 items-center text-center'>
                <h2 className='text-3xl md:text-5xl dark:text-dark_black'>
                  Become an A Thousand Voices {' '}
                  <span className='instrument-font italic font-normal dark:text-black/70'>
                    Ambassador
                  </span>
                </h2>
                <p className='dark:text-dark_black'>
                  Looking to make a global impact? Join our ambassador program and help amplify Afghan voices while building meaningful connections across cultures.
                </p>
              </div>
              <Link
                href='/ambassador'
                className='group w-fit text-white font-medium bg-dark_black rounded-full flex items-center gap-4 py-2 pl-5 pr-2 hover:bg-transparent border border-dark_black'>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='order-2 group-hover:order-1 group-hover:-translate-x-2 transition-all duration-200 ease-in-out group-hover:rotate-45'>
                  <rect
                    width='32'
                    height='32'
                    rx='16'
                    fill='white'
                    className='fill-white transition-colors duration-200 ease-in-out group-hover:fill-black'
                  />
                  <path
                    d='M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668'
                    stroke='#1B1D1E'
                    strokeWidth='1.42857'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white'
                  />
                </svg>
                <span className='order-1 group-hover:order-2 group-hover:translate-x-0 group-hover:text-dark_black transform transition-all duration-200 ease-in-out'>
                  Become an Ambassador
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solutions
