import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../header/Logo'

const Footer = () => {
  const [footerData, setfooterData] = useState<any>(null);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/footer-data')
          if (!res.ok) throw new Error('Failed to fetch')
          const data = await res.json()        
          setfooterData(data?.footerData)
        } catch (error) {
          console.error('Error fetching services:', error)
        }
      }
  
      fetchData()
    }, [])

  return (
    <footer className='xl:pt-20 pb-6 bg-gradient-to-br from-red-50 via-green-50 to-blue-50 dark:from-red-900/20 dark:via-green-900/20 dark:to-blue-900/20'>
      <div className='container'>
        <div className='flex flex-col xl:flex-row py-16 gap-10 justify-between border-b border-dark_black/10 dark:border-white/10'>
          <div className='flex flex-col gap-6 max-w-md'>
            {/* Larger Footer Logo */}
            <Link href="/">
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={80}
                height={24}
                quality={100}
                priority={true}
                className='dark:hidden'
              />
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={80}
                height={24}
                quality={100}
                className='dark:block hidden'
              />
            </Link>
            
            {/* Bold Tagline */}
            <p className='opacity-80 font-bold text-lg text-dark_black dark:text-white'>{footerData?.brand?.tagline}</p>
            
            {footerData?.brand?.website && (
              <p className='text-dark_black/70 hover:text-black dark:text-white/70 dark:hover:text-white'>
                <Link href={footerData.brand.website} target="_blank" rel="noopener noreferrer">
                  {footerData.brand.website}
                </Link>
              </p>
            )}
            <div className='flex gap-4'>
              {footerData?.brand?.socialLinks.map((item:any, index:any) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target='_blank'
                    className='hover:opacity-60 transition-opacity duration-200'>
                    <Image
                      key={index}
                      src={item.icon}
                      alt='social-icon'
                      height={24}
                      width={24}
                      className='filter dark:invert'
                    />
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='grid sm:grid-cols-3 gap-6'>
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-dark_black dark:text-white'>{footerData?.sitemap?.name}</p>
              <ul className='flex flex-col gap-3'>
                {footerData?.sitemap?.links.map((item:any, index:any) => {
                  return (
                    <li
                      key={index}
                      className='text-dark_black/70 hover:text-black dark:text-white/70 dark:hover:text-white'>
                      <Link href={item.url}>{item.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-dark_black dark:text-white'>{footerData?.otherPages?.name}</p>
              <ul className='flex flex-col gap-3'>
                {footerData?.otherPages?.links.map((item:any, index:any) => {
                  return (
                    <li
                      key={index}
                      className='text-dark_black/70 hover:text-black dark:text-white/70 dark:hover:text-white'>
                      <Link href={item.url}>{item.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-dark_black dark:text-white'>{footerData?.contactDetails?.name}</p>
              <p className='text-dark_black/70 dark:text-white/70'>
                {footerData?.contactDetails?.address}
              </p>
              <p className='text-dark_black/70 hover:text-black dark:text-white/70 dark:hover:text-white'>
                <Link href={`mailto:${footerData?.contactDetails?.email}`}>
                  {footerData?.contactDetails?.email}
                </Link>
              </p>
              <p className='text-dark_black/70 hover:text-black dark:text-white/70 dark:hover:text-white'>
                <Link href={`tel:${footerData?.contactDetails?.phone}`}>
                  {footerData?.contactDetails?.phone}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <p className='text-dark_black/70 dark:text-white/70'>
            {footerData?.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
