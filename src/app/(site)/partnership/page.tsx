'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
const ease = [0.22, 1, 0.36, 1] as const

const STORAGE = 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public'

const schools: { name: string; logo?: string; imageClassName?: string }[] = [
  { name: 'Yale University', logo: '/images/partners/yale.jpg', imageClassName: 'object-cover' },
  { name: 'Projects for Peace', logo: '/images/partners/projects-for-peace.webp', imageClassName: 'object-cover scale-[1.2]' },
  { name: 'University of Toronto', logo: '/images/partners/university-of-toronto.svg', imageClassName: 'object-contain p-4' },
  { name: 'A Thousand Voices', logo: '/images/logo/logo.png' },
]

const ink = 'text-[#1a1a1a] dark:text-[#1a1a1a]'
const displayClass = `instrument-font font-normal leading-[1.05] tracking-[-0.01em] ${ink}`
const bodyClass = 'text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.6] text-[#1c1c1c]/80 dark:text-[#1c1c1c]/80'
const eyebrowClass = 'text-[15px] font-semibold tracking-[0.01em] text-[#1a1a1a]'

const questions = [
  {
    question: 'How can classrooms make room for Afghan stories?',
    title: 'Educational Institutions',
    description:
      'Partner with universities, colleges, and educational organizations to support Afghan youth in their academic and creative pursuits.',
    color: '#bdf2fc',
  },
  {
    question: 'How do we reach the young Afghans who most need to be heard?',
    title: 'NGOs & Non-Profits',
    description:
      'Collaborate with organizations working with Afghan communities to amplify voices and create meaningful impact.',
    color: '#faed64',
  },
  {
    question: 'How do these stories find readers around the world?',
    title: 'Publishing Houses',
    description:
      'Work with publishers to bring Afghan stories to global audiences through traditional and digital platforms.',
    color: '#ffca61',
  },
  {
    question: 'Who will carry these voices beyond the page?',
    title: 'Media Organizations',
    description:
      "Partner with media outlets to share Afghan stories and raise awareness about the platform's mission.",
    color: '#ff9782',
  },
  {
    question: 'What could we build together?',
    title: 'Become a Partner',
    description: 'Tell us about your organization and the voices you want to help amplify.',
    color: '#c5cffd',
  },
]

const currentPartners = [
  {
    name: 'Projects for Peace',
    logo: `${STORAGE}/brand/ProjectforPeace.png`,
    description: 'Supporting peace-building initiatives through storytelling and cultural exchange.',
    color: '#d9dfbf',
  },
]

const steps = [
  {
    title: 'Initial Contact',
    description: 'Reach out to us through our contact form or email to express your interest in partnership.',
    color: '#bdf2fc',
  },
  {
    title: 'Discussion & Planning',
    description: "We'll schedule a meeting to discuss potential collaboration opportunities and align our goals.",
    color: '#faed64',
  },
  {
    title: 'Partnership Agreement',
    description: "Once we agree on terms, we'll formalize our partnership with a clear agreement and timeline.",
    color: '#ff9782',
  },
]

const impactStats = [
  { value: '80–100', label: 'Stories to be published' },
  { value: '2000+', label: 'People helped' },
  { value: '1200', label: 'Contestants submitted a story' },
  { value: '<1', label: 'Year to make this impact' },
]

function FadeUp({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}>
      {children}
    </motion.div>
  )
}

function ArrowPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className='group inline-flex items-center gap-4 rounded-full bg-white py-3 pl-3.5 pr-8 text-[17px] font-semibold text-[#1a1a1a] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]'>
      <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8533f] text-white transition-transform duration-300 group-hover:translate-x-1'>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
          <path d='M2 8h11M9 3.5 13.5 8 9 12.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </span>
      {label}
    </Link>
  )
}

function UnderlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className='inline-block border-b border-[#1a1a1a]/40 pb-0.5 text-[17px] font-semibold text-[#1a1a1a] transition-colors duration-300 hover:border-[#1a1a1a]'>
      {children}
    </Link>
  )
}

function Hero() {
  return (
    <section className='mb-20 bg-[#f1eee3] px-5 pt-[8.5rem] pb-20 lg:mb-28 lg:px-8 lg:pt-44 lg:pb-28'>
      <div className='grid items-center gap-10 lg:grid-cols-12 lg:gap-8'>
        <FadeUp className='lg:col-span-7'>
          <h1 className={`${displayClass} text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.12]`}>
            A Thousand Voices partners with schools, nonprofits, publishers, and media to bring the stories of young
            Afghans to the world.
          </h1>
        </FadeUp>
        <FadeUp className='lg:col-span-4 lg:col-start-9' delay={0.15}>
          <ul className='grid grid-cols-2 gap-3 lg:gap-4'>
            {schools.map((school) => (
              <motion.li
                key={school.name}
                whileHover={{ scale: 1.08, y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className='relative z-0 flex aspect-square items-center justify-center overflow-hidden rounded-[0.6rem] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:z-10 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)] transition-shadow'>
                {school.logo ? (
                  <Image
                    src={school.logo}
                    alt={`${school.name} logo`}
                    fill
                    sizes='(min-width: 1024px) 15vw, 50vw'
                    className={school.imageClassName ?? 'object-contain p-6'}
                  />
                ) : (
                  <span className='text-center text-[15px] font-semibold text-[#1a1a1a]/60'>{school.name}</span>
                )}
              </motion.li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}

function BigQuestions() {
  return (
    <section className='bg-cream px-5 pb-8 lg:px-8 lg:pb-12'>
      <div className='grid gap-12 lg:grid-cols-12 lg:gap-8'>
        <div className='lg:col-span-4'>
          <div className='lg:sticky lg:top-[7rem]'>
            <FadeUp>
              <p className={eyebrowClass}>How we partner</p>
              <h2 className={`${displayClass} mt-4 max-w-[12ch] text-[clamp(2.5rem,4vw,3.4rem)]`}>
                We begin every partnership by asking big questions
              </h2>
              <p className={`${bodyClass} mt-6 max-w-[30ch]`}>
                Our partnerships are built on shared values of cultural exchange, education, and empowerment.
              </p>
            </FadeUp>
          </div>
        </div>

        <div className='lg:col-span-8'>
          {questions.map((item, i) => {
            const isLast = i === questions.length - 1
            return (
              <div
                key={item.title}
                className={`lg:sticky ${isLast ? '' : 'mb-6 lg:mb-[28vh]'}`}
                style={{ top: `calc(7rem + ${i * 2.75}rem)` }}>
                <div
                  className='rounded-[0.6rem] px-6 py-10 text-center sm:px-10 lg:px-12 lg:py-12'
                  style={{ backgroundColor: item.color }}>
                  <div className='flex min-h-[18rem] flex-col items-center justify-center border-b border-[#1a1a1a]/70 pb-10 lg:min-h-[22rem] lg:pb-12'>
                    <h3 className='max-w-[18ch] text-[clamp(1.75rem,3.2vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'>
                      {item.question}
                    </h3>
                    <p className='mt-5 max-w-[46ch] text-[16px] leading-[1.55] text-[#1a1a1a]/75'>{item.description}</p>
                    <div className='mt-8'>
                      <ArrowPill href='/contact' label={item.title} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section className='bg-cream px-5 py-20 lg:px-8 lg:py-28'>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease }}
        className='text-[clamp(4.5rem,15vw,11rem)] font-extrabold uppercase leading-[0.85] tracking-[0.02em] text-[#1a1a1a] dark:text-[#1a1a1a]'>
        Impact
      </motion.h2>

      <div className='mt-14 grid items-center gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8'>
        <FadeUp className='lg:col-span-4 lg:col-start-2'>
          <div className='flex aspect-auto flex-col justify-center bg-[#b3dcf5] p-8 sm:aspect-[29/27] lg:p-10'>
            <p className='text-[15px] leading-[1.5] text-[#1a1a1a]/85'>
              A Thousand Voices connects young Afghan writers inside Afghanistan and across the diaspora with readers
              around the world. Through our storytelling competition, the top stories are published on our website and
              in a professionally published anthology, and our partners help carry them even further.{' '}
              <strong className='font-semibold text-[#1a1a1a]'>
                Every partnership helps turn a young writer&apos;s story into a voice the world can hear.
              </strong>
            </p>
          </div>
        </FadeUp>

        <div className='grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-6 lg:col-start-7 lg:gap-x-10 lg:gap-y-16'>
          {impactStats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <p className='text-[clamp(2.5rem,4.5vw,3.5rem)] font-bold leading-none tracking-[-0.01em] text-[#1a1a1a]'>
                {stat.value}
              </p>
              <hr className='mt-4 h-px border-0 bg-[#1a1a1a]/60' />
              <p className='mt-3 text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.3] tracking-[0.02em] text-[#1a1a1a]/80'>
                {stat.label}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function CurrentPartners() {
  return (
    <section className='bg-cream px-5 py-20 lg:px-8 lg:py-28'>
      <FadeUp>
        <p className={eyebrowClass}>Current partners</p>
        <h2 className={`${displayClass} mt-4 max-w-[42ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.15]`}>
          Our partners share a commitment to cultural exchange, education, and the power of storytelling.
        </h2>
      </FadeUp>

      <div className='mt-10 grid gap-6 sm:grid-cols-2'>
        {currentPartners.map((partner) => (
          <FadeUp key={partner.name}>
            <div
              className='flex aspect-[4/3] items-center justify-center rounded-[0.6rem]'
              style={{ backgroundColor: partner.color }}>
              <Image
                src={partner.logo}
                alt={partner.name}
                width={2194}
                height={966}
                sizes='25vw'
                className='h-auto w-1/2 rounded-[0.6rem]'
              />
            </div>
            <h3 className='mt-5 text-[22px] font-semibold text-[#1a1a1a] dark:text-[#1a1a1a]'>{partner.name}</h3>
            <p className='mt-1.5 text-[16px] leading-[1.5] text-[#1a1a1a]/70'>{partner.description}</p>
          </FadeUp>
        ))}
        <FadeUp delay={0.1}>
          <Link
            href='/contact'
            className='group flex aspect-[4/3] flex-col items-center justify-center rounded-[0.6rem] border border-dashed border-[#1a1a1a]/35 text-center transition-colors duration-300 hover:bg-[#1a1a1a]/[0.03]'>
            <span className='flex h-14 w-14 items-center justify-center rounded-full bg-[#e8533f] text-white transition-transform duration-300 group-hover:rotate-90'>
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
                <path d='M11 3v16M3 11h16' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
              </svg>
            </span>
            <span className='mt-5 text-[20px] font-semibold text-[#1a1a1a]'>Your organization here</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

function HowToPartner() {
  return (
    <section className='bg-cream px-5 pt-4 pb-20 lg:px-8 lg:pt-8 lg:pb-28'>
      <div className='flex flex-wrap items-end justify-between gap-6'>
        <FadeUp>
          <p className={eyebrowClass}>How to partner</p>
          <h2 className={`${displayClass} mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.15]`}>
            Three steps to working together
          </h2>
        </FadeUp>
        <UnderlineLink href='/contact'>Become a partner</UnderlineLink>
      </div>

      <div className='mt-10 grid gap-6 md:grid-cols-3'>
        {steps.map((step, i) => (
          <FadeUp key={step.title} delay={i * 0.08}>
            <div
              className='flex h-full min-h-[20rem] flex-col justify-between rounded-[0.6rem] p-8'
              style={{ backgroundColor: step.color }}>
              <span className='instrument-font text-[5rem] leading-none text-[#1a1a1a]'>{i + 1}</span>
              <div>
                <h3 className='text-[24px] font-semibold text-[#1a1a1a] dark:text-[#1a1a1a]'>{step.title}</h3>
                <p className='mt-2 text-[16px] leading-[1.5] text-[#1a1a1a]/75'>{step.description}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

export default function PartnershipPage() {
  return (
    <main className='bg-cream'>
      <Hero />
      <BigQuestions />
      <Impact />
      <CurrentPartners />
      <HowToPartner />
    </main>
  )
}
