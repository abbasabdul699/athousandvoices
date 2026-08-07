'use client'

import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {}

const Logo: React.FC<HeaderProps> = () => {
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
        className='h-auto w-10 dark:hidden lg:w-[50px]'
      />
      <Image
        src='/images/logo/logo.png'
        alt='A Thousand Voices logo'
        width={50}
        height={15}
        quality={100}
        className='hidden h-auto w-10 dark:block lg:w-[50px]'
      />
    </Link>
  )
}

export default Logo
