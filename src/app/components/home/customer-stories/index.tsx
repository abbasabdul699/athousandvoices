'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
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
  return (
    <section className="relative isolate overflow-hidden w-full">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/Screenshot%202025-08-19%20at%206.18.23%20PM.png"
          alt="Workshop participants forming a circle"
          fill
          priority
          className="object-cover"
        />
        {/* Soft dark-to-transparent vignette so the card reads well */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/20 to-transparent" />
      </div>

      {/* Layout container */}
      <div className="w-full px-6 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 max-w-7xl mx-auto">
          {/* Quote Card - Now on the left side */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ rotateX: 2, rotateY: -2 }}
            className="relative lg:col-span-6 max-w-xl lg:justify-self-start"
          >
            {/* decorative shadow plate behind card (like the colored drop in the example) */}
            <div className="absolute -bottom-4 -left-4 right-6 h-4 rounded-lg bg-[#1961d6]/70 blur-[1px]" aria-hidden />

            <blockquote className="relative rounded-2xl bg-[#1961d6]/95 backdrop-blur p-8 md:p-10 shadow-xl ring-1 ring-black/5">
              {/* Big opening quote mark */}
              <span
                aria-hidden
                className="pointer-events-none select-none absolute -top-6 left-8 text-6xl md:text-7xl font-serif text-slate-300"
              >
                "
              </span>

              <p className="text-slate-800 text-lg md:text-xl leading-relaxed">
                "{quote.text}"
              </p>

              {/* Author line with photo */}
              <figcaption className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/khalid.png"
                    alt="Khaled Hosseini"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="text-sm md:text-base text-slate-600">
                    — <span className="font-medium text-slate-800">{quote.author}</span>
                    {quote.role ? `, ${quote.role}` : ''}
                    {quote.org ? `, ${quote.org}` : ''}
                  </div>
                </div>
              </figcaption>

              {/* Corner "bookmark" accent */}
              <div
                aria-hidden
                className="absolute -top-3 right-6 h-7 w-7"
              >
                <div className="absolute inset-0 rounded-md bg-[#1961d6]" />
                <div className="absolute right-0 bottom-0 h-0 w-0 border-t-[14px] border-l-[14px] border-t-white border-l-transparent" />
              </div>
            </blockquote>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

export default function CustomerStories() {
  const { t } = useLanguage();

  return (
    <section className='py-16 md:py-24'>
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
