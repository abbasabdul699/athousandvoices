import Image from 'next/image'
import Slider from 'react-infinite-logo-slider'

const SingleBrand = ({ brand }: { brand: any }) => {
  const { image, title, darkImg } = brand

  return (
    <Slider.Slide>
      <div className='flex items-center justify-center'>
        <Image
          src={image}
          alt={title}
          height={50}
          width={130}
          className='dark:hidden swiper-logo-image object-contain'
          style={{ width: 'auto', height: 'auto', maxHeight: '50px' }}
        />
        <Image
          src={darkImg}
          alt={title}
          height={50}
          width={130}
          className='dark:block hidden swiper-logo-image object-contain'
          style={{ width: 'auto', height: 'auto', maxHeight: '50px' }}
        />
      </div>
    </Slider.Slide>
  )
}

export default SingleBrand
