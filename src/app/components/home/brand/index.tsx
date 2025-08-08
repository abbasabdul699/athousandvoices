'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Slide component for horizontal scrolling
const Slide = (props: any) => {
  const direction = props.direction === 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction]);

  return (
    <motion.div 
      style={{ x: translateX, left: props.left }} 
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={props.src} />
      <Phrase src={props.src} />
      <Phrase src={props.src} />
    </motion.div>
  );
};

// Phrase component for text and image combination
const Phrase = ({ src }: { src: string }) => {
  return (
    <div className='px-5 flex gap-5 items-center'>
      <p className='text-[4vw] font-bold text-gray-900 dark:text-white'>
        Sponsored
      </p>
      <span className="relative h-[4vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image
          style={{ objectFit: "cover" }}
          src={src}
          alt="sponsor"
          fill
        />
      </span>
    </div>
  );
};

function Brand() {
  const container = useRef(null);
  const [brandList, setbrandList] = useState<any>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setbrandList(data?.brandList || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  // Use brand images or fallback to Afghan images
  const images = brandList?.map((brand: any) => brand.image) || [
    '/images/afghan1.jpg',
    '/images/afghan2.jpg',
    '/images/afghan3.jpg',
  ];

  return (
    <section>
      {/* Horizontal Scrolling Banner */}
      <div className='w-full bg-gradient-to-r from-pink-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-0 overflow-hidden'>
        <div className='container mx-auto'>
          {/* Horizontal Scrolling Content */}
          <div className='h-[5vh]'></div> {/* Initial scroll space */}
          <div ref={container} className='relative'>
            {images.map((src: string, index: number) => (
              <Slide 
                key={index}
                src={src} 
                direction={index % 2 === 0 ? 'left' : 'right'} 
                left={`${-40 + (index * 15)}%`} 
                progress={scrollYProgress}
              />
            ))}
          </div>
          <div className='h-[5vh]'></div> {/* Final scroll space */}
        </div>
      </div>
    </section>
  )
}

export default Brand
