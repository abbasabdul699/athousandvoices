'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type FloatingLogoButtonProps = {
  visible: boolean
  onClick: () => void
}

export default function FloatingLogoButton({ visible, onClick }: FloatingLogoButtonProps) {
  return (
    <div
      className={cn(
        'fixed right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[9998] transition-all duration-300 lg:right-6',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-3 opacity-0',
      )}>
      <div className='floating-logo-glow'>
        <div aria-hidden className='floating-logo-glow__apple-ring' />

        <button
          type='button'
          onClick={onClick}
          aria-label='Back to top'
          className='floating-logo-glow__button flex items-center justify-center rounded-full bg-white p-2.5 transition-shadow duration-300 active:scale-[0.98] dark:bg-dark_black'>
          <Image
            src='/images/logo/logo.png'
            alt='A Thousand Voices logo'
            width={50}
            height={15}
            quality={100}
            className='h-auto w-9 dark:hidden lg:w-10'
          />
          <Image
            src='/images/logo/logo.png'
            alt='A Thousand Voices logo'
            width={50}
            height={15}
            quality={100}
            className='hidden h-auto w-9 dark:block lg:w-10'
          />
        </button>
      </div>
    </div>
  )
}
