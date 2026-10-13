'use client'
import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ParallaxImage from '../../components/shared/ParallaxImage'

const ease = [0.22, 1, 0.36, 1] as const

const h2Class =
  'text-[clamp(2.5rem,5.85vw,4.25rem)] font-normal leading-[1.06] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'
const leadClass =
  'text-[clamp(1.2rem,2vw,1.47rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'
const bodyClass =
  'mt-8 first:mt-0 text-[clamp(1.05rem,1.7vw,1.24rem)] leading-[1.6] tracking-[0.01em] text-[#1c1c1c]/80 dark:text-[#1c1c1c]/80'
const panelClass = 'relative rounded-t-[2rem] lg:rounded-t-[2.5rem] px-5 lg:px-8'

const outcomes = [
  {
    title: 'Cash prizes and recognition',
    description: 'The top three storytellers receive cash prizes and recognition for their work.',
  },
  {
    title: 'A published anthology',
    description: 'The top 80–100 stories appear on our website and in a professionally published book.',
  },
  {
    title: 'A global conference',
    description: 'A gathering of Afghan youth, authors, and partners who believe in the power of words.',
  },
]

const cardColors = ['#b0cde4', '#de8a74', '#ffdc7e', '#bd9fc3', '#d9dfbf', '#f4c7a1']

const objectPositions: Record<string, string> = {
  'Zakira Bakhshi': '60% center',
  'Sajad Amini': 'center 40%',
  'Somaya Fazel': '40% center',
  'Ethan Schroyer': 'center 20%',
}

function RevealHeading({ text, className, as = 'h2' }: { text: string; className: string; as?: 'h1' | 'h2' }) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2
  return (
    <Tag
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.04 }}
      className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className='inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top'>
          <motion.span
            className='inline-block'
            variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 0.9, ease } } }}>
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

function Rule({ className = '' }: { className?: string }) {
  return (
    <motion.hr
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease }}
      className={`origin-left border-0 h-px bg-[#1a1a1a]/25 ${className}`}
    />
  )
}

function FadeUp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
      className={className}>
      {children}
    </motion.div>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((text) => (
        <p key={text} className={bodyClass}>
          {text}
        </p>
      ))}
    </>
  )
}

function FocusList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className='mt-14'>
      <p className={`${leadClass} !text-[clamp(1.05rem,1.6vw,1.2rem)]`}>{title}</p>
      <ul className='mt-5 border-t border-[#1a1a1a]/20'>
        {items.map((item) => (
          <li
            key={item}
            className='border-b border-[#1a1a1a]/20 py-3 text-[clamp(1.05rem,1.7vw,1.24rem)] leading-[1.5] text-[#1c1c1c]/80 last:border-b-0'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CallOuts({ items, heading }: { items: { title: string; description: string }[]; heading?: string }) {
  return (
    <div className='md:mx-[8.33%]'>
      {heading && (
        <>
          <RevealHeading text={heading} className={h2Class} />
          <Rule className='mt-10 lg:mt-12 mb-10 lg:mb-12' />
        </>
      )}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
        className='grid grid-cols-1 md:grid-cols-3'>
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            className={`py-6 md:py-0 md:pr-8 lg:pr-12 ${
              index > 0 ? 'border-t md:border-t-0 md:border-l border-[#1a1a1a]/25 md:pl-8 lg:pl-12' : ''
            }`}>
            <h3 className='text-[clamp(1.1rem,1.6vw,1.24rem)] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1a1a1a] dark:text-[#1a1a1a]'>
              {item.title}
            </h3>
            <p className='mt-2.5 text-[clamp(1rem,1.6vw,1.24rem)] leading-[1.6] tracking-[0.01em] text-[#1c1c1c]/80 dark:text-[#1c1c1c]/80'>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function ContentMediaHigh({
  heading,
  lead,
  paragraphs,
  listTitle,
  list,
  image,
  stat,
}: {
  heading: string
  lead: string
  paragraphs: string[]
  listTitle: string
  list: string[]
  image: { src: string; alt: string }
  stat?: { label: string; value: string }
}) {
  return (
    <>
      <RevealHeading text={heading} className={`${h2Class} max-w-[22ch]`} />
      <Rule className='mt-10 lg:mt-12' />
      <div className='mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-12 gap-x-8'>
        <div className='md:col-span-5 flex flex-col justify-between gap-12'>
          <FadeUp>
            <h3 className={leadClass}>{lead}</h3>
          </FadeUp>
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            sizes='(max-width: 768px) 100vw, 40vw'
            className='hidden md:block aspect-[433/480] w-full'
          />
        </div>
        <FadeUp className='md:col-start-7 md:col-span-5 mt-8 md:mt-0'>
          <Paragraphs items={paragraphs} />
          <FocusList title={listTitle} items={list} />
          {stat && (
            <div className='mt-14 border-t border-[#1a1a1a]/20 pt-8'>
              <p className='text-[clamp(0.95rem,1.3vw,1rem)] text-[#1c1c1c]/80'>{stat.label}</p>
              <p className='mt-6 text-[clamp(4.5rem,8.5vw,6.25rem)] font-normal leading-none tracking-[-0.02em] text-[#1a1a1a]'>
                {stat.value}
              </p>
            </div>
          )}
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            sizes='100vw'
            className='md:hidden mt-12 aspect-[433/480] w-full'
          />
        </FadeUp>
      </div>
    </>
  )
}

function TeamCard({ member, color }: { member: any; color: string }) {
  const [open, setOpen] = useState(false)
  const origin = 'at calc(100% - 2.75rem) calc(100% - 2.75rem)'

  return (
    <div className='relative aspect-[348/443] overflow-hidden rounded-2xl bg-[#1a1a1a]'>
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes='(max-width: 768px) 80vw, 33vw'
        className='object-cover'
        style={{ objectPosition: objectPositions[member.name] ?? 'center' }}
      />
      <div className='absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/45 to-transparent' />
      <h3 className='absolute left-6 top-6 right-16 text-[clamp(1.15rem,1.8vw,1.47rem)] font-semibold leading-[1.25] text-white dark:text-white'>
        {member.name}
      </h3>

      <motion.div
        initial={false}
        animate={{ clipPath: open ? `circle(150% ${origin})` : `circle(0% ${origin})` }}
        transition={{ duration: 0.7, ease }}
        aria-hidden={!open}
        className={`absolute inset-0 flex flex-col p-6 text-[#1a1a1a] ${open ? '' : 'pointer-events-none'}`}
        style={{ backgroundColor: color }}>
        <h3 className='text-[clamp(1.15rem,1.8vw,1.47rem)] font-semibold leading-[1.25] text-[#1a1a1a] dark:text-[#1a1a1a]'>
          {member.name}
        </h3>
        <p className='mt-4 text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.5] text-[#1c1c1c]/80 dark:text-[#1c1c1c]/80'>
          {member.position}
        </p>
        <a
          href={`mailto:${member.email}`}
          tabIndex={open ? 0 : -1}
          className='mt-2 text-[clamp(0.95rem,1.3vw,1.05rem)] text-[#1c1c1c]/80 underline underline-offset-4 break-all'>
          {member.email}
        </a>
        {member.linkedinLink && (
          <a
            href={member.linkedinLink}
            target='_blank'
            rel='noopener noreferrer'
            tabIndex={open ? 0 : -1}
            className='mt-auto mr-16 w-fit rounded-full border border-[#1a1a1a]/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1a1a1a] hover:text-white'>
            LinkedIn
          </a>
        )}
      </motion.div>

      <button
        type='button'
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${member.name} - ${open ? 'close' : 'click to expand'}`}
        className={`absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
          open ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a]'
        }`}>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease }}
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'>
          <path d='M8 2v12M2 8h12' />
        </motion.svg>
      </button>
    </div>
  )
}

function TeamGrid({ members }: { members: any[] | null }) {
  return (
    <section className='bg-cream px-5 lg:px-8 pt-16 lg:pt-16 pb-24 lg:pb-[8rem]'>
      <RevealHeading
        text='Our Team'
        className='text-center text-[clamp(3.25rem,8.5vw,6.25rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#1a1a1a] dark:text-[#1a1a1a]'
      />
      <div className='mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {members && members.length > 0 ? (
          members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease }}>
              <TeamCard member={member} color={cardColors[i % cardColors.length]} />
            </motion.div>
          ))
        ) : (
          <p className='col-span-full mx-auto py-16 text-[#1c1c1c]/60'>Loading our team...</p>
        )}
      </div>
    </section>
  )
}

export default function AboutPage() {
  const [creativeMindList, setCreativeMindList] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setCreativeMindList(data.creativeMindList)
      } catch (error) {
        console.error('Error fetching creative minds:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <main className='bg-cream text-[#1a1a1a]'>
      {/* ---------------- Mission statement ---------------- */}
      <section className='bg-cream px-5 lg:px-8 pt-[8.5rem] lg:pt-40 pb-20 lg:pb-28'>
        <FadeUp>
          <p className={leadClass}>Mission Statement</p>
        </FadeUp>
        <div className='mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-8'>
          <FadeUp className='order-2 md:order-1 md:col-span-6 mt-12 md:mt-4'>
            <Image
              src='/images/about/afghan-refugee-map.png'
              alt='World map of registered Afghan refugee populations by country as of 2020 (source: UNHCR)'
              width={1024}
              height={621}
              sizes='(max-width: 768px) 100vw, 50vw'
              className='h-auto w-full mix-blend-multiply'
            />
          </FadeUp>
          <div className='order-1 md:order-2 md:col-start-8 md:col-span-5'>
            <RevealHeading as='h1' text='Our Mission' className={h2Class} />
            <FadeUp className='mt-8'>
              <p className={bodyClass}>
                A Thousand Voices gives young Afghans, inside Afghanistan and across the diaspora, a platform to write
                and share their own stories, challenging stereotypes and showing the diversity, creativity, and hope
                that still exist within and beyond Afghan borders.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ---------------- The problem ---------------- */}
      <section className={`${panelClass} bg-[#de8a74] pt-20 lg:pt-24 pb-24 lg:pb-[8rem]`}>
        <ContentMediaHigh
          heading='Our stories, told by us'
          lead='Why A Thousand Voices exists'
          paragraphs={[
            'Since the fall of Kabul in August 2021, the global spotlight has largely shifted away from Afghanistan, but the crisis persists.',
            "Under the Taliban's rule, Afghan youth, especially girls and women, have been silenced and erased from classrooms, media, and public life.",
            'Across the diaspora, Afghan voices are often misrepresented or lost entirely, reduced to simple tropes of victimhood or violence. Our stories have long been told for us, not by us.',
          ]}
          listTitle='What we set out to do:'
          list={[
            'Amplify Afghan voices globally',
            'Foster cultural exchange through literature',
            'Build bridges between communities',
          ]}
          image={{ src: '/images/about/children-reading.webp', alt: 'Afghan schoolboys reading a Dari picture book together' }}
        />
      </section>

      {/* ---------------- How it began ---------------- */}
      <section className='bg-cream px-5 lg:px-8 pt-20 lg:pt-28 pb-24 lg:pb-[8rem]'>
        <ContentMediaHigh
          heading='How A Thousand Voices began'
          lead='Born from a belief that storytelling is resistance'
          paragraphs={[
            'A Thousand Voices began with a simple idea: reclaiming our narratives is essential to challenging the way the world sees Afghanistan.',
            'Started as a Project for Peace and Thomas C. Barry Fellowship initiative, the project set out to collect and showcase fiction and nonfiction from Afghan youth around the world.',
            'What has not changed is the purpose: a platform where young Afghans write their own stories, and where their creativity and hope are seen and celebrated.',
          ]}
          listTitle='What shapes our work:'
          list={[
            'Authentic storytelling and cultural preservation',
            'An inclusive platform for diverse voices',
            'Quality literature and meaningful connections',
          ]}
          image={{ src: '/images/home/about/gateway.jpg', alt: 'An old stone archway overlooking Kabul' }}
          stat={{ label: 'Amplifying Afghan voices since', value: '2025' }}
        />
      </section>

      {/* ---------------- Values ---------------- */}
      <section className={`${panelClass} bg-[#ffdc7e] pt-20 lg:pt-24 pb-24 lg:pb-[8rem]`}>
        <ContentMediaHigh
          heading='Guided by Afghan voices'
          lead='What this looks like in practice'
          paragraphs={[
            "Everything we do starts with the writer. We create space for young Afghans to tell the stories they choose, in their own words, without fitting someone else's idea of Afghanistan.",
            'Through storytelling workshops, creative mentorship, and partnerships with NGOs and universities around the world, we help writers grow in confidence and reach new readers.',
          ]}
          listTitle='In practice:'
          list={[
            'Workshops that help young writers find and shape their stories',
            'Mentorship that supports writers from first draft to finished piece',
            'Partnerships that carry Afghan stories across borders',
          ]}
          image={{ src: '/images/about/poem-writing.png', alt: 'A woman writing a poem titled "Zan" (Woman) in Persian' }}
        />
      </section>

      {/* ---------------- Our team intro ---------------- */}
      <section className='bg-cream px-5 lg:px-8 pt-16 lg:pt-20 pb-12'>
        <FadeUp>
          <p className={leadClass}>Our team</p>
        </FadeUp>
        <div className='mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-8'>
          <ParallaxImage
            src='/images/about/band-e-amir.jpg'
            alt='A lone figure overlooking the lakes of Band-e Amir, Afghanistan'
            sizes='(max-width: 768px) 100vw, 30vw'
            imageClassName='object-[15%_center]'
            className='order-2 md:order-1 md:col-span-5 mt-12 md:mt-4 aspect-[433/480] w-full'
          />
          <div className='order-1 md:order-2 md:col-start-7 md:col-span-5'>
            <RevealHeading text='The people working alongside our storytellers' className={h2Class} />
            <FadeUp className='mt-8'>
              <Paragraphs
                items={[
                  'Our diverse team brings together expertise in literature, technology, and Afghan culture to create meaningful opportunities for writers.',
                  'From reading submissions to building partnerships, every member of the team works to make sure young Afghan writers are heard.',
                ]}
              />
            </FadeUp>
          </div>
        </div>
      </section>

      <TeamGrid members={creativeMindList} />

      {/* ---------------- Looking ahead ---------------- */}
      <section className={`${panelClass} bg-[#bd9fc3] pt-20 lg:pt-24 pb-24 lg:pb-[8rem]`}>
        <RevealHeading text='Looking ahead' className={h2Class} />
        <Rule className='mt-10 lg:mt-12' />
        <div className='mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-12 gap-x-8'>
          <figure className='order-2 md:order-1 md:col-span-5 mt-12'>
            <ParallaxImage
              src='/images/about/children-in-field.jpg'
              alt='Afghan children holding hands as they walk beside a wheat field in a mountain valley'
              sizes='(max-width: 768px) 100vw, 40vw'
              imageClassName='object-[35%_center]'
              className='aspect-[433/480] w-full'
            />
            <figcaption className='mt-3 text-[13px] text-[#1a1a1a]/70'>Photo by Daniel Malikyar</figcaption>
          </figure>
          <div className='order-1 md:order-2 md:col-start-7 md:col-span-6'>
            <FadeUp className='max-w-[26rem]'>
              <h3 className={leadClass}>Building toward the anthology and beyond</h3>
              <div className='mt-7'>
                <Paragraphs
                  items={[
                    'The top 80–100 stories will be published on our website and featured in a professionally published anthology, launching in 2026.',
                    'The project will culminate in a global storytelling conference spotlighting Afghan youth, authors, and partners who believe in the power of words to heal, connect, and transform.',
                  ]}
                />
              </div>
            </FadeUp>
            <ParallaxImage
              src='/images/about/calligraphy-wheel.jpg'
              alt='Illuminated manuscript page with a circular diagram of Arabic calligraphy on a blue background'
              sizes='(max-width: 768px) 50vw, 20vw'
              className='hidden md:block mt-24 ml-auto aspect-[195/205] w-[17vw] max-w-[260px]'
            />
          </div>
        </div>
        <div className='mt-20 lg:mt-24'>
          <CallOuts items={outcomes} />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className='bg-cream px-5 lg:px-8 pt-20 lg:pt-28 pb-24 lg:pb-36'>
        <FadeUp className='md:mx-[8.33%] grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl bg-[#b0cde4] p-6 lg:p-7'>
          <div className='flex flex-col'>
            <h2 className={h2Class}>Get involved</h2>
            <p className='mt-6 text-[clamp(1.05rem,1.7vw,1.24rem)] leading-[1.6] text-[#1c1c1c]/80 dark:text-[#1c1c1c]/80'>
              If you would like to collaborate, partner, or help bring this vision to life in any capacity, please
              reach out. To all the young Afghans across the world: we can&apos;t wait to read your stories.
            </p>
            <Link
              href='/contact'
              className='group mt-10 md:mt-auto flex w-fit items-center gap-2 rounded-full bg-[#1a1a1a] py-3 pl-6 pr-4 text-white transition-colors hover:bg-[#1a1a1a]/85'>
              Get in touch
              <svg
                className='transition-transform duration-300 group-hover:translate-x-0.5'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='m9 18 6-6-6-6' />
              </svg>
            </Link>
          </div>
          <div className='relative aspect-[408/419] w-full overflow-hidden'>
            <Image src='/images/afghan2.jpg' alt='Life in Afghanistan' fill sizes='(max-width: 768px) 100vw, 40vw' className='object-cover' />
          </div>
        </FadeUp>
      </section>
    </main>
  )
}
