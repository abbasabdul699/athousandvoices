'use client'
import React, { useEffect, useRef, useState } from 'react'

const IMAGES = [
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan1.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan2.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan3.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan4.jpg',
  'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/afghan5.jpg',
]

const ParallaxCarousel = () => {
  const ringRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rotationY, setRotationY] = useState(180)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      setIsDragging(true)
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      setStartX(clientX)
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const deltaX = clientX - startX
      const newRotationY = rotationY - (deltaX % 360)
      
      setRotationY(newRotationY)
      ring.style.transform = `rotateY(${newRotationY}deg)`
      
      // Update background positions for parallax effect
      const images = ring.querySelectorAll('.img') as NodeListOf<HTMLElement>
      images.forEach((img, i) => {
        const bgPos = getBgPos(i, newRotationY)
        img.style.backgroundPosition = bgPos
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const getBgPos = (i: number, rotation: number) => {
      const wrappedRotation = ((rotation - 180 - i * 36) % 360 + 360) % 360
      const percentage = (100 - (wrappedRotation / 360) * 500)
      return `${percentage}px 0px`
    }

    // Add event listeners
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchstart', handleMouseDown)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseUp)

    // Set initial rotation
    ring.style.transform = `rotateY(${rotationY}deg)`

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchstart', handleMouseDown)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, startX, rotationY])

  return (
    <div className="stage">
      <div className="container">
        <div ref={ringRef} className="ring">
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className="img"
              style={{
                backgroundImage: `url(${src})`,
                transform: `rotateY(${i * -36}deg) translateZ(500px)`,
                transformOrigin: '50% 50% 500px',
                backgroundPosition: '50% 0px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ParallaxCarousel 