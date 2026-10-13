'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  className: string
  imageClassName?: string
  priority?: boolean
}

export default function ParallaxImage({ src, alt, sizes, className, imageClassName = '', priority }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <div ref={ref} className={`relative overflow-clip ${className}`}>
      <motion.div className='absolute inset-0' style={{ y, scale }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName}`} />
      </motion.div>
    </div>
  )
}
