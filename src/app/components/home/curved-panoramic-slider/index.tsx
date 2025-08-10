'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface CarouselImage {
  name: string
  url: string
  alt: string
}

const PanoramicScrollGallery = () => {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isDragging, setIsDragging] = useState(false)
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleRange = 3

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching carousel images...')
        const response = await fetch('/api/carousel-images')
        console.log('API response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('API response data:', data)
        
        if (data.images && data.images.length > 0) {
          setImages(data.images)
          console.log('Images loaded from Supabase:', data.images)
        } else {
          console.log('No images from API, using fallback')
          // Fallback to hardcoded Supabase URLs
          setImages([
            { name: 'afghan1.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan1.jpg', alt: 'Afghanistan 1' },
            { name: 'afghan2.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan2.jpg', alt: 'Afghanistan 2' },
            { name: 'afghan3.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan3.jpg', alt: 'Afghanistan 3' },
            { name: 'afghan4.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan4.jpg', alt: 'Afghanistan 4' },
            { name: 'afghan5.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan5.jpg', alt: 'Afghanistan 5' },
          ])
        }
      } catch (error) {
        console.error('Error fetching carousel images:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch images')
        // Fallback to hardcoded Supabase URLs
        setImages([
          { name: 'afghan1.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan1.jpg', alt: 'Afghanistan 1' },
          { name: 'afghan2.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan2.jpg', alt: 'Afghanistan 2' },
          { name: 'afghan3.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan3.jpg', alt: 'Afghanistan 3' },
          { name: 'afghan4.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan4.jpg', alt: 'Afghanistan 4' },
          { name: 'afghan5.jpg', url: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan5.jpg', alt: 'Afghanistan 5' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const getTransformStyles = (i: number) => {
    const offset = i - activeIndex
    const abs = Math.abs(offset)

    // Mobile-specific adjustments
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 1 - abs * 0.15 : 1 - abs * 0.1
    const translateY = isMobile ? abs * 8 : abs * 15
    const rotateY = isMobile ? offset * 2 : offset * 5 // Reduced rotation on mobile
    const opacity = abs > visibleRange ? 0 : 1

    return {
      transform: `translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - abs
    }
  }

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 50 // Minimum distance for swipe

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swipe right - go to previous
        setActiveIndex((prev) => Math.max(0, prev - 1))
      } else {
        // Swipe left - go to next
        setActiveIndex((prev) => Math.min(images.length - 1, prev + 1))
      }
    }
  }

  // Auto-advance on mobile (optional)
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile || images.length === 0) return

    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveIndex((prev) => (prev + 1) % images.length)
      }
    }, 4000) // Auto-advance every 4 seconds on mobile

    return () => clearInterval(interval)
  }, [isDragging, images.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(images.length - 1, prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  if (loading) {
    return (
      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple_blue"></div>
        </div>
      </section>
    )
  }

  if (error) {
    console.error('Carousel error:', error)
  }

  if (images.length === 0) {
    return (
      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="flex justify-center items-center">
          <p className="text-gray-600">No images available</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-8 sm:py-16 overflow-hidden before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
      {/* Mobile: Hidden navigation buttons, Desktop: Visible */}
      <div className="hidden sm:flex justify-between items-center px-4 sm:px-12">
        <button
          onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
          className="p-2 bg-white/80 dark:bg-gray-700/80 rounded-full shadow backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="text-gray-800 dark:text-white" />
        </button>

        <div className="relative flex items-center justify-center gap-0 w-full overflow-hidden max-w-6xl">
          <div className="flex items-center justify-center relative w-full">
            {images.map((image, i) => {
              const { transform, opacity, zIndex } = getTransformStyles(i)
              return (
                <motion.div
                  key={image.name}
                  className="transition-all duration-500 ease-in-out mx-1 sm:mx-2 origin-center"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={480}
                    height={320}
                    className="rounded-lg shadow-xl w-[400px] h-[280px] sm:w-[480px] sm:h-[320px] object-cover"
                    onClick={() => setActiveIndex(i)}
                    priority={i === activeIndex}
                    onError={(e) => {
                      console.error(`Failed to load image: ${image.url}`)
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => setActiveIndex((prev) => Math.min(images.length - 1, prev + 1))}
          className="p-2 bg-white/80 dark:bg-gray-700/80 rounded-full shadow backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="text-gray-800 dark:text-white" />
        </button>
      </div>

      {/* Mobile: Touch-enabled carousel */}
      <div className="sm:hidden">
        <motion.div
          ref={containerRef}
          className="relative flex items-center justify-center w-full overflow-hidden"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'pan-y pinch-zoom' }}
        >
          <div className="flex items-center justify-center relative w-full">
            {images.map((image, i) => {
              const { transform, opacity, zIndex } = getTransformStyles(i)
              return (
                <motion.div
                  key={image.name}
                  className="transition-all duration-500 ease-in-out mx-1 origin-center"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transition: 'all 0.5s ease',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={400}
                    height={280}
                    className="rounded-lg shadow-xl w-[400px] h-[280px] object-cover"
                    onClick={() => setActiveIndex(i)}
                    priority={i === activeIndex}
                    onError={(e) => {
                      console.error(`Failed to load image: ${image.url}`)
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Mobile: Dot indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? 'bg-purple_blue w-6' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PanoramicScrollGallery