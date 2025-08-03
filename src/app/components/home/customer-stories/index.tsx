import Image from 'next/image'

function CustomerStories() {
  return (
    <section>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col justify-center gap-10 md:gap-20'>
            <div className='mx-auto max-w-2xl flex items-center text-center'>
              <h2>
                What our
                <span className='instrument-font italic font-normal dark:text-white/70'>
                  {' '}
                  mission is
                </span>
              </h2>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col xl:flex xl:flex-row gap-6'>
                <div className="p-8 gap-64 rounded-2xl flex flex-col relative bg-[url('/images/home/creative/Zakira.png')] object-cover bg-center bg-bottom h-full w-full bg-cover bg-no-repeat backdrop-blur-sm" style={{backgroundPosition: 'center 30%', filter: 'grayscale(60%)'}}>
                  <span className='text-white/60 uppercase text-sm font-bold'>
                    Empowering Voices
                  </span>
                  <div className='flex flex-col gap-6 '>
                    <h4 className='text-white'>
                      “We create safe, nurturing spaces where young Afghans can share their stories, find confidence in their voice, and begin to shape their futures with pride and purpose.”
                    </h4>
                    <div className='flex flex-col gap-1'>
                      <p className='text-white font-medium'>Zakira Bakhshi</p>
                      <p className='text-white/60 text-sm font-medium'>
                        Founder of A Thousand Voices
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-between gap-36 xl:max-w-25 bg-pale-yellow rounded-2xl p-8'>
                  <div>
                    <span className='uppercase text-sm font-medium text-dark_black/60'>
                      Facts & numbers
                    </span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className='text-7xl font-medium dark:text-dark_black'>
                      37%
                    </h2>
                    <h4 className='dark:text-dark_black'>
                      Afghanistan Literacy Rate .”
                    </h4>
                  </div>
                </div>
              </div>
              <div className='flex flex-col xl:flex xl:flex-row gap-6'>
                <div className='flex flex-col justify-between bg-dark_black xl:max-w-25 dark:bg-white/10 rounded-2xl p-8'>
                  <div className='flex flex-col gap-6'>
                    <span className='text-white/60 uppercase text-sm font-medium'>
                      Rewritting the Narrative
                    </span>
                    <h4 className='text-white'>
                      Through storytelling, we challenge prevailing stereotypes and show the world the depth, creativity, and strength of Afghan people—not as victims, but as vibrant changemakers.
                    </h4>
                    <div>
                      <Image
                        src='/images/home/customerStories/afghanart.jpg'
                        alt='image'
                        width={344}
                        height={220}
                        className='w-full h-52 rounded-2xl'
                        unoptimized={true}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-24 justify-between bg-dark_black/5 dark:bg-white/5 p-8 rounded-2xl'>
                  <div className='flex flex-col gap-6'>
                    <span className='text-dark_black/60 dark:text-white/60 uppercase text-sm font-medium'>
                      Inspiring a New Generation
                    </span>
                    <h2 className='text-2xl lg:text-5xl'>
                      “Every story shared is a spark of hope. We uplift voices that have long been silenced to inspire others to lead, dream, and believe that—no matter how dark it gets—spring will return.”
                    </h2>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='font-medium'>Zakira Bakhshi</p>
                    <p className='text-dark_black/60 dark:text-white/60 text-sm font-medium'>
                      Founder of A Thousand Voices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerStories
