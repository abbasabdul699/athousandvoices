import React from 'react'

interface ImageSkeletonProps {
  className?: string
  width?: number
  height?: number
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ 
  className = '', 
  width = 80, 
  height = 80 
}) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}

export default ImageSkeleton
