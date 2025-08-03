import Image from 'next/image'
import Slider from 'react-infinite-logo-slider'

const SingleBrand = ({ brand }: { brand: any }) => {
  const { image, title, darkImg } = brand

  return (
    <Slider.Slide>
      <div className='flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
        <Image
          src={image}
          alt={title}
          height={60}
          width={150}
          className='dark:hidden swiper-logo-image object-contain hover:scale-105 transition-all duration-200'
          style={{ width: 'auto', height: 'auto', maxHeight: '60px' }}
        />
        <Image
          src={darkImg}
          alt={title}
          height={60}
          width={150}
          className='dark:block hidden swiper-logo-image object-contain hover:scale-105 transition-all duration-200'
          style={{ width: 'auto', height: 'auto', maxHeight: '60px' }}
        />
      </div>
    </Slider.Slide>
  )
}

export default SingleBrand
