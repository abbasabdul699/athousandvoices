'use client'
import Slider from 'react-infinite-logo-slider'
import SingleBrand from './SingleBrand'
import { useEffect, useState } from 'react';

function Brand() {
  const [brandList, setbrandList] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setbrandList(data?.brandList || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      {/* Horizontal Strip Banner */}
      <div className='w-full bg-gradient-to-r from-pink-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-6'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>
              Sponsored by brands around the world
            </h2>
          </div>

          {brandList && brandList.length > 0 && (
            <div className='py-4 py-2'>
              <Slider
                width='200px'
                duration={25}
                pauseOnHover={true}
                blurBorders={false}>
                {brandList?.map((items: any, index: any) => (
                  <SingleBrand key={index} brand={items} />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Brand
