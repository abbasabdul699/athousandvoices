'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const IMAGES = [
  '/images/afghan1.jpg',
  '/images/afghan2.jpg',
  '/images/afghan3.jpg',
  '/images/afghan4.jpg',
  '/images/afghan5.jpg',
]

const PanoramicScrollGallery = () => {
  const [activeIndex, setActiveIndex] = useState(2)

  const visibleRange = 3

  const getTransformStyles = (i: number) => {
    const offset = i - activeIndex
    const abs = Math.abs(offset)

    const scale = 1 - abs * 0.1
    const translateY = abs * 15
    const rotateY = offset * 5 // for curved effect
    const opacity = abs > visibleRange ? 0 : 1

    return {
      transform: `translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - abs
    }
  }

  return (
    <section className="relative py-16 overflow-hidden before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-blue-50 before:via-white before:to-yellow-50 before:top-0 before:left-0 before:-z-10 dark:before:from-blue-900/20 dark:before:via-gray-900 dark:before:to-yellow-900/20">
      <div className="flex justify-between items-center px-4 sm:px-12">
        <button
          onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
          className="p-2 bg-white/80 dark:bg-gray-700/80 rounded-full shadow backdrop-blur-sm"
        >
          <ChevronLeft className="text-gray-800 dark:text-white" />
        </button>

        <div className="relative flex items-center justify-center gap-0 w-full overflow-hidden max-w-6xl">
          <div className="flex items-center justify-center relative w-full">
            {IMAGES.map((src, i) => {
              const { transform, opacity, zIndex } = getTransformStyles(i)
              return (
                <motion.div
                  key={i}
                  className="transition-all duration-500 ease-in-out mx-2 origin-center"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <img
                    src={src}
                    alt={`Afghanistan ${i}`}
                    className="rounded-lg shadow-xl w-[220px] h-[300px] object-cover"
                    onClick={() => setActiveIndex(i)}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => setActiveIndex((prev) => Math.min(IMAGES.length - 1, prev + 1))}
          className="p-2 bg-white/80 dark:bg-gray-700/80 rounded-full shadow backdrop-blur-sm"
        >
          <ChevronRight className="text-gray-800 dark:text-white" />
        </button>
      </div>
    </section>
  )
}

export default PanoramicScrollGallery