'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import AfghanDiasporaMap from '../afghan-diaspora-map';

type Quote = {
  text: string;
  author: string;
  role?: string;
  org?: string;
};

const quote: Quote = {
  text:
    'If culture was a house, then language was the key to the front door, to all the rooms inside. Without it, you ended up on the street, outside, without shelter. You became an observer rather than a participant in the story.',
  author: 'Khaled Hosseini',
  role: '',
  org: '',
};

const quoteHighlights = [
  'language was the key',
  'You became an observer rather than a participant in the story.',
];

function renderHighlightedQuote(text: string) {
  const pattern = new RegExp(`(${quoteHighlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
  return text.split(pattern).map((part, i) =>
    quoteHighlights.includes(part) ? (
      <span key={i} className="text-red-500">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function QuoteShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const openProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1], { clamp: true });
  const imageScale = useTransform(openProgress, [0, 1], [1.25, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.62, 0.78], [24, 0]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-cream dark:bg-dark_black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.figure
          className="absolute inset-0 m-0"
          style={{
            ['--p' as string]: openProgress,
            ['--s' as string]: 'min(35rem, 80vw)',
            clipPath:
              'inset(max(0px, calc((1 - var(--p)) * (50vh - var(--s) / 2))) max(0px, calc((1 - var(--p)) * (50vw - var(--s) / 2))) round calc((1 - var(--p)) * var(--s) / 2))',
          }}
        >
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
            <Image
              src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/Screenshot%202025-08-19%20at%206.18.23%20PM.png"
              alt="A woman walking through the snow in the mountains of Afghanistan"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.figcaption
            className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-black/20 to-transparent px-6 pb-12 md:bg-gradient-to-r md:from-black/40 md:via-black/15 md:px-12 md:pb-14 lg:px-16"
            style={{ opacity: quoteOpacity }}
          >
            <motion.div className="flex w-full flex-col gap-6 md:w-[44vw]" style={{ y: quoteY }}>
              <blockquote className="instrument-font text-[min(8vw,5vh)] leading-[0.95] tracking-tight text-pale-yellow md:text-[min(4.8vw,6vh)]">
                &ldquo;{renderHighlightedQuote(quote.text)}&rdquo;
              </blockquote>
              <span className="instrument-font self-end text-xl tracking-tight text-pale-yellow/85 md:text-2xl">— {quote.author}</span>
            </motion.div>
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default function CustomerStories() {
  const { t } = useLanguage();

  return (
    <section className='bg-cream dark:bg-dark_black pb-16 md:pb-24'>
      {/* Quote Section - Malala.org Style with Background Image */}
      <QuoteShowcase />

      {/* Afghan Diaspora Map Section - Moved from Ambassador page */}
      <div className='container mx-auto px-4'>
        <AfghanDiasporaMap />
        
        {/* Mission Section - Commented out per team request */}
        {/* 
        <div className='mx-auto max-w-2xl flex items-center text-center'>
          <h2>
            What our
            <span className='instrument-font italic font-normal dark:text-white/70'>
              {' '}
              mission is
            </span>
          </h2>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col xl:flex xl:flex-row gap-6'>
            <div className="p-8 gap-64 rounded-2xl flex flex-col relative bg-cover bg-center bg-bottom h-full w-full bg-no-repeat backdrop-blur-sm" 
                 style={{
                   backgroundImage: 'url(https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/zakirabackground1.jpeg)',
                   backgroundPosition: 'center 50%', 
                   filter: 'grayscale(60%)'
                 }}>
              <span className='text-black/60 uppercase text-sm font-bold'>
                Empowering Voices
              </span>
              <div className='flex flex-col gap-6 '>
                <h4 className='text-white'>
                  "We create safe, nurturing spaces where young Afghans can share their stories, find confidence in their voice, and begin to shape their futures with pride and purpose."
                </h4>
                <div className='flex flex-col gap-1'>
                  <p className='text-white font-medium'>Zakira Bakhshi</p>
                  <p className='text-white/60 text-sm font-medium'>
                    Founder of A Thousand Voices
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between gap-36 xl:max-w-25 bg-pale-yellow rounded-2xl p-8'>
              <div>
                <span className='uppercase text-sm font-medium text-dark_black/60'>
                  Facts & numbers
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='text-7xl font-medium dark:text-dark_black'>
                  37%
                </h2>
                <h4 className='dark:text-dark_black'>
                  <a 
                    href="https://data.worldbank.org/indicator/SE.ADT.LITR.ZS?locations=AF" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline cursor-pointer transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Afghanistan Literacy Rate According to the World Bank
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className='flex flex-col xl:flex xl:flex-row gap-6'>
            <div className='flex flex-col justify-between bg-dark_black xl:max-w-25 dark:bg-white/10 rounded-2xl p-8'>
              <div className='flex flex-col gap-6'>
                <span className='text-white/60 uppercase text-sm font-medium'>
                  Rewritting the Narrative
                </span>
                <h4 className='text-white'>
                  Through storytelling, we challenge prevailing stereotypes and show the world the depth, creativity, and strength of Afghan people—not as victims, but as vibrant changemakers.
                </h4>
                <div>
                  <Image
                    src='https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghanart.jpg'
                    alt='Afghan art and culture'
                    width={344}
                    height={220}
                    className='rounded-lg'
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between bg-pale-yellow xl:max-w-25 rounded-2xl p-8'>
              <div className='flex flex-col gap-6'>
                <span className='uppercase text-sm font-medium text-dark_black/60'>
                  Our Impact
                </span>
                <h4 className='text-dark_black'>
                  We've helped hundreds of young Afghans find their voice and share their stories with the world, creating a platform for authentic representation and cultural exchange.
                </h4>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
