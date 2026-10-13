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

type HeaderLinkProps = { item: HeaderItem; light?: boolean }

// HeaderLink component
const HeaderLinkContent: React.FC<HeaderLinkProps> = ({ item, light = false }) => {
  const [activeLink, setActiveLink] = useState('')

  useActiveLink(setActiveLink)

  const isActive = activeLink === item.href
  const isExternal = item.href.startsWith('http')

  return (
    <li>
      <Link
        href={item.href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`group relative inline-block px-3 py-2 text-[16.8px] leading-[1.2] transition-colors duration-500 ${
          light ? 'text-white' : 'text-dark_black dark:text-white'
        }`}>
        {item.label}
        <span
          className={`absolute left-3 right-3 bottom-1 h-px origin-left bg-current transition-transform duration-300 ease-out ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </Link>
    </li>
  )
}

// Wrap in Suspense
const HeaderLink: React.FC<HeaderLinkProps> = (props) => (
  <Suspense fallback={null}>
    <HeaderLinkContent {...props} />
  </Suspense>
)

export default HeaderLink
