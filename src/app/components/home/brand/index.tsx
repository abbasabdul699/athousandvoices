'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

function Brand() {
  const [brandList, setbrandList] = useState<any>(null);
  const router = useRouter();

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

  const handleBrandClick = () => {
    router.push('/press')
  }

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center'
        >
          <h3 className='text-lg text-gray-600 mb-8'>
            In partnership with
          </h3>
          
          <div className='flex flex-wrap justify-center items-center gap-8 md:gap-12'>
            {brandList?.map((brand: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='flex-shrink-0'
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onClick={handleBrandClick}
              >
                <div className='w-32 h-30 md:w-40 md:h-30 relative cursor-pointer'>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className='w-full h-full object-contain transition-all duration-300'
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Brand
