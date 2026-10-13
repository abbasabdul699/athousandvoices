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

function QuoteShowcase() {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section className="w-full bg-cream dark:bg-dark_black px-5 lg:px-8 py-24 md:py-36">
      <figure className="mx-auto w-full lg:w-[69.5%]">
        <div ref={frameRef} className="relative aspect-video overflow-clip">
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
            <Image
              src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/Screenshot%202025-08-19%20at%206.18.23%20PM.png"
              alt="A woman walking through the snow in the mountains of Afghanistan"
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <figcaption className="mt-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-10">
          <blockquote className="max-w-[40rem] text-[15px] leading-relaxed text-dark_black/75 dark:text-white/75">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <span className="shrink-0 text-[15px] text-dark_black dark:text-white">— {quote.author}</span>
        </figcaption>
      </figure>
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
