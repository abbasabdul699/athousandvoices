'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ChevronRight, Mail } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import HeaderLink from './Navigation/HeaderLink'
import { headerData } from './Navigation/Menudata'
import Logo from './Logo'
import MobileHeader from './Navigation/MobileHeader'
import FloatingLogoButton from './FloatingLogoButton'

const Header = () => {
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<{ user: any } | null>(null)
  const [atTop, setAtTop] = useState(true)
  const [showHeader, setShowHeader] = useState(true)
  const [showFloatingLogo, setShowFloatingLogo] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const isWinnersPage = pathname?.startsWith('/winners')
  const hasImageHero = pathname === '/'
  const hasColorHero = pathname === '/about' || pathname === '/partnership'

  const transparent = (hasImageHero || hasColorHero) && atTop && !sidebarOpen
  const light = transparent && hasImageHero

  const getHeroScrollEnd = () => {
    const hero = document.getElementById('winners-hero')
    if (!hero) return window.innerHeight * 1.5
    return hero.offsetTop + hero.offsetHeight
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current
      lastScrollY.current = currentScrollY
      setAtTop(currentScrollY < 10)

      if (isWinnersPage) {
        const pastHero = currentScrollY >= getHeroScrollEnd() - 48
        setShowHeader(!pastHero || sidebarOpen)
        setShowFloatingLogo(pastHero && !sidebarOpen)
        return
      }

      setShowFloatingLogo(false)
      setShowHeader(sidebarOpen || currentScrollY < 120 || !scrollingDown)
    }

    const handleResize = () => handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname, isWinnersPage, sidebarOpen])

  useEffect(() => {
    setShowHeader(true)
    setShowFloatingLogo(false)
  }, [pathname])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignOut = () => {
    localStorage.removeItem('user')
    signOut()
    setUser(null)
  }

  const circleButtonClassName = `flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-300 ${
    light
      ? 'border-white/60 text-white hover:bg-white hover:text-dark_black'
      : 'border-dark_black/30 text-dark_black hover:bg-dark_black hover:text-white dark:border-white/30 dark:text-white'
  }`

  const pillButtonClassName = `group flex items-center gap-1 rounded-full pl-5 pr-4 py-2.5 text-[16px] tracking-[0.2px] transition-colors duration-300 ${
    light
      ? 'bg-white text-dark_black hover:bg-cream'
      : 'bg-dark_black text-white hover:bg-dark_black/85 dark:bg-white dark:text-dark_black'
  }`

  const socialLinkClassName = `items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
    light ? 'hover:bg-white/15' : 'hover:bg-dark_black/5 dark:hover:bg-white/10'
  }`

  return (
    <>
      <header
        className={`nav-font fixed top-0 z-[9999] w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showHeader ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}>
        <div className={`transition-[padding] duration-500 ${transparent ? 'px-0' : 'px-2 lg:px-3'}`}>
          <nav
            className={`relative flex items-center justify-between px-5 lg:px-8 transition-all duration-500 ${
              transparent
                ? 'py-5 lg:py-7 bg-transparent'
                : `py-3 rounded-b-2xl bg-cream/95 backdrop-blur-md dark:bg-dark_black/95 ${
                    showHeader ? 'shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'shadow-none'
                  }`
            }`}>
            <div className='relative z-10 flex items-center'>
              <Logo light={light} showWordmark />
            </div>

            <ul className='hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 xl:gap-4'>
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} light={light} />
              ))}
            </ul>

            <div className='relative z-10 flex items-center gap-2 xl:gap-3'>
              <Link href='/contact' aria-label='Contact' className={`hidden lg:flex ${circleButtonClassName}`}>
                <Mail className='h-4 w-4' strokeWidth={1.75} />
              </Link>

              {user?.user || session?.user ? (
                <div className='hidden lg:flex items-center gap-3'>
                  <button onClick={handleSignOut} className={pillButtonClassName}>
                    Sign Out
                    <Icon icon='solar:logout-outline' width='18' height='18' />
                  </button>
                  <div className='relative group'>
                    <Image
                      src='/images/home/avatar_1.jpg'
                      alt='Image'
                      width={40}
                      height={40}
                      quality={100}
                      className='rounded-full cursor-pointer'
                    />
                    <p className='absolute w-fit text-sm text-center z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-white/5 text-dark_black/60 p-1 min-w-28 rounded-lg shadow-2xl top-full left-1/2 transform -translate-x-1/2 mt-3'>
                      {user?.user || session?.user?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href='https://www.linkedin.com/company/athousand-voices/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                    className={`hidden lg:flex ${socialLinkClassName}`}>
                    <img src='/images/logo/linkedin.svg' alt='LinkedIn' className='w-8 h-8' />
                  </Link>
                  <Link
                    href='https://www.instagram.com/athousand.voices/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                    className={`hidden lg:flex ${socialLinkClassName}`}>
                    <img src='/images/logo/instagram.svg' alt='Instagram' className='w-8 h-8' />
                  </Link>
                </>
              )}

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label='Open menu'
                className={`lg:hidden ${circleButtonClassName}`}>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeMiterlimit='10'
                    strokeWidth='1.5'
                    d='M4.5 12h15m-15 5.77h15M4.5 6.23h15'
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isWinnersPage && (
        <FloatingLogoButton visible={showFloatingLogo} onClick={scrollToTop} />
      )}

      {/* ------------------------- Mobile sidebar starts ------------------------- */}
      {sidebarOpen && (
        <div className='lg:hidden fixed inset-0 z-[10001]'>
          <div
            className='absolute inset-0 bg-black/50'
            onClick={() => setSidebarOpen(false)}
          />
          <aside className='nav-font absolute top-0 right-0 h-full w-[85%] max-w-xs bg-cream dark:bg-dark_black shadow-lg flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b border-dark_black/10 dark:border-gray-700'>
              <h2 className='text-lg font-bold'>Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label='Close mobile menu'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'>
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
              <ul className='flex flex-col gap-1'>
                {headerData.map((item, index) => (
                  <MobileHeader key={index} item={item} onClick={() => setSidebarOpen(false)} />
                ))}
              </ul>
              <div className='flex flex-col items-center gap-3 px-2 mt-4'>
                {user || session?.user ? (
                  <>
                    <Link
                      href='/contact'
                      onClick={() => setSidebarOpen(false)}
                      className='w-full flex items-center justify-center border border-dark_black dark:border-white px-4 py-2 rounded-full hover:bg-dark_black dark:hover:bg-white hover:text-white dark:hover:text-dark_black'>
                      <Mail className='h-5 w-5' strokeWidth={1.75} />
                      <span className='ml-2'>Contact</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className='flex w-full justify-center group font-normal items-center gap-2 transition-all duration-200 ease-in-out text-white px-4 py-2 bg-dark_black rounded-full hover:opacity-90'>
                      Sign Out
                      <Icon icon='solar:logout-outline' width='25' height='25' />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href='/winners'
                      onClick={() => setSidebarOpen(false)}
                      className='w-full flex items-center justify-center gap-1 text-white dark:text-dark_black px-4 py-2.5 bg-dark_black dark:bg-white rounded-full hover:opacity-90'>
                      Finalists
                      <ChevronRight className='h-4 w-4' />
                    </Link>
                    <Link
                      href='/contact'
                      onClick={() => setSidebarOpen(false)}
                      className='w-full flex items-center justify-center border border-dark_black dark:border-white px-4 py-2.5 rounded-full hover:bg-dark_black dark:hover:bg-white hover:text-white dark:hover:text-dark_black'>
                      <Mail className='h-5 w-5' strokeWidth={1.75} />
                      <span className='ml-2'>Contact</span>
                    </Link>
                    <div className='flex items-center gap-3 mt-2'>
                      <Link
                        href='https://www.linkedin.com/company/athousand-voices/'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='LinkedIn'
                        className='flex items-center justify-center w-11 h-11 rounded-full border border-dark_black/20'>
                        <img src='/images/logo/linkedin.svg' alt='LinkedIn' className='w-6 h-6' />
                      </Link>
                      <Link
                        href='https://www.instagram.com/athousand.voices/'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Instagram'
                        className='flex items-center justify-center w-11 h-11 rounded-full border border-dark_black/20'>
                        <img src='/images/logo/instagram.svg' alt='Instagram' className='w-6 h-6' />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

export default Header
