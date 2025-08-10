'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const IMAGES = [
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan1.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan2.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan3.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan4.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan5.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan1.jpg', // Reusing images for more variety
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan2.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan3.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan4.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan5.jpg',
]

export default function ParallaxZoomScroll() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  // Reduced scale values to prevent overlap
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2.2])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 2.4])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 2.6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 2.8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 3.0])
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 2.5])
  const scale10 = useTransform(scrollYProgress, [0, 1], [1, 3.2])
  const scale11 = useTransform(scrollYProgress, [0, 1], [1, 3.4])
  const scale12 = useTransform(scrollYProgress, [0, 1], [1, 3.6])
  const scale13 = useTransform(scrollYProgress, [0, 1], [1, 3.8])

  // Tighter positioning with reduced gaps
  const picturePositions = [
    { top: '0vh', left: '0vw', width: '25vw', height: '25vh' },
    { top: '-15vh', left: '-20vw', width: '30vw', height: '30vh' },
    { top: '-15vh', left: '20vw', width: '25vw', height: '30vh' },
    { top: '10vh', left: '-25vw', width: '20vw', height: '20vh' },
    { top: '10vh', left: '25vw', width: '20vw', height: '20vh' },
    { top: '25vh', left: '-25vw', width: '25vw', height: '25vh' },
    { top: '25vh', left: '25vw', width: '25vw', height: '25vh' },
    { top: '40vh', left: '-15vw', width: '20vw', height: '20vh' },
    { top: '40vh', left: '15vw', width: '20vw', height: '20vh' },
    { top: '40vh', left: '0vw', width: '30vw', height: '25vh' },
  ]

  const pictures = [
    { src: IMAGES[0], scale: scale4 },
    { src: IMAGES[1], scale: scale5 },
    { src: IMAGES[2], scale: scale6 },
    { src: IMAGES[3], scale: scale8 },
    { src: IMAGES[4], scale: scale9 },
    { src: IMAGES[5], scale: scale7 },
    { src: IMAGES[6], scale: scale10 },
    { src: IMAGES[7], scale: scale11 },
    { src: IMAGES[8], scale: scale12 },
    { src: IMAGES[9], scale: scale13 },
  ]

  return (
    <section className="relative -mt-10">
      <div ref={container} className="h-[150vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {pictures.map(({ src, scale }, index) => {
            const pos = picturePositions[index] || picturePositions[0];
            return (
              <motion.div
                key={index}
                style={{ scale, zIndex: 100 - index }}
                className="w-full h-full absolute top-0 flex items-center justify-center"
              >
                <div 
                  className="relative"
                  style={{ 
                    width: pos.width, 
                    height: pos.height, 
                    top: pos.top, 
                    left: pos.left,
                  }}
                >
                  <Image
                    src={src}
                    fill
                    alt={`Afghanistan ${index + 1}`}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    className="object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
} 