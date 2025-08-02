'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { HeaderItem } from '../../../../types/menu'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const OFFSET = 80 // Adjust this value based on your fixed header height

// Hook to manage the active link and apply offset
const useActiveLink = (setActiveLink: (link: string) => void) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const updateActiveLink = () => {
      const fullPath = window.location.hash
        ? `${pathname}${window.location.hash}`
        : pathname
      setActiveLink(fullPath)
    }

    const handleScrollOffset = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          setTimeout(() => {
            const elementPosition =
              element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
              top: elementPosition - OFFSET,
              behavior: 'smooth',
            })
          }, 0)
        }
      }
    }

    updateActiveLink()
    handleScrollOffset()

    window.addEventListener('hashchange', updateActiveLink)
    window.addEventListener('hashchange', handleScrollOffset)

    return () => {
      window.removeEventListener('hashchange', updateActiveLink)
      window.removeEventListener('hashchange', handleScrollOffset)
    }
  }, [pathname, searchParams, setActiveLink])
}

// HeaderLink component
const HeaderLinkContent: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [activeLink, setActiveLink] = useState('')

  useActiveLink(setActiveLink)

  // If it's a button (Submit Story), render with special styling
  if (item.isButton) {
    return (
      <li>
        <Link
          href={item.href}
          className={`px-6 py-2 font-medium text-purple_blue hover:text-purple_blue/80 hover:bg-white hover:rounded-full transition-all duration-200 hover:shadow-header_shadow ${
            activeLink === item.href
              ? 'bg-white text-purple_blue rounded-full shadow-header_shadow'
              : 'text-purple_blue'
          }`}>
          {item.label}
        </Link>
      </li>
    )
  }

  // Regular navigation link
  return (
    <li>
      <Link
        href={item.href}
        className={`px-4 py-2 font-medium hover:text-black dark:hover:text-black hover:bg-white hover:rounded-3xl hover:shadow-header_shadow 
                    ${
                      activeLink === item.href
                        ? 'bg-white text-black rounded-[90rem] shadow-header_shadow'
                        : 'text-dark_black/60 dark:text-white'
                    }`}>
        {item.label}
      </Link>
    </li>
  )
}

// Wrap in Suspense
const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => (
  <Suspense fallback={null}>
    <HeaderLinkContent item={item} />
  </Suspense>
)

export default HeaderLink
