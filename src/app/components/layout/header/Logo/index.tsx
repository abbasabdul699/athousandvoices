'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  light?: boolean
  showWordmark?: boolean
}

const Logo: React.FC<LogoProps> = ({ light = false, showWordmark = false }) => {
  if (!showWordmark) {
    return (
      <Link
        href='/'
        aria-label='A Thousand Voices home'
        className='relative z-10 block p-2 -m-2 leading-none'>
        <Image
          src='/images/logo/logo.png'
          alt='A Thousand Voices logo'
          width={50}
          height={15}
          quality={100}
          priority={true}
          className='h-auto w-10 lg:w-[50px]'
        />
      </Link>
    )
  }

  return (
    <Link
      href='/'
      aria-label='A Thousand Voices home'
      className='relative z-10 flex items-center gap-3 leading-none'>
      <span
        className={`flex items-center justify-center rounded-full transition-colors duration-500 w-10 h-10 lg:w-11 lg:h-11 ${
          light ? 'bg-cream' : 'bg-transparent'
        }`}>
        <Image
          src='/images/logo/logo.png'
          alt='A Thousand Voices logo'
          width={50}
          height={55}
          quality={100}
          priority={true}
          className='h-auto w-7 lg:w-8'
        />
      </span>
      <span
        className={`hidden sm:block lg:hidden xxl:block instrument-font text-2xl lg:text-[26px] tracking-tight transition-colors duration-500 ${
          light ? 'text-white' : 'text-dark_black dark:text-white'
        }`}>
        A Thousand Voices
      </span>
    </Link>
  )
}

export default Logo
