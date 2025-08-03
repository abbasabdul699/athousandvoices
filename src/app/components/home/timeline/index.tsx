'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, BookOpen, Award, Globe, Heart } from 'lucide-react'

interface TimelineItem {
  id: number
  step: string
  title: string
  description: string
  icon: React.ReactNode
  bg_color: string
  txt_color: string
}

function Timeline() {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      step: 'June - July 2025',
      title: 'Outreach & Curriculum',
      description: 'We forge partnerships with universities, NGOs, and creative networks to launch our call for stories and begin designing our workshop curriculum.',
      icon: <Heart className="w-6 h-6" />,
      bg_color: 'bg-red-500/20',
      txt_color: 'text-red-600',
    },
    {
      id: 2,
      step: 'July - August 2025',
      title: 'Workshop',
      description: 'Virtual storytelling and creative writing sessions take place across the globe, particularly in countries with biggest populations of Afghan immigrants such as Pakistan, the U.S., Canada, the U.K., and Germany—paired with one-on-one mentorship.',
      icon: <Users className="w-6 h-6" />,
      bg_color: 'bg-blue-500/20',
      txt_color: 'text-blue-600',
    },
    {
      id: 3,
      step: 'July - October 2025',
      title: 'Story Submissions',
      description: 'Afghan youth will submit short stories—fiction or non-fiction—centered on themes of identity, resilience, and home.',
      icon: <Globe className="w-6 h-6" />,
      bg_color: 'bg-green-500/20',
      txt_color: 'text-green-600',
    },
    {
      id: 4,
      step: 'August 2026',
      title: 'Publishing and Book Launch (Washington D.C.)',
      description: 'We celebrate the power of Afghan youth voices with a public launch event, readings, and recognition—on the fifth anniversary of Kabul’s fall.',
      icon: <BookOpen className="w-6 h-6" />,
      bg_color: 'bg-purple-500/20',
      txt_color: 'text-purple-600',
    },
  ]

  return (
    <section id='timeline' className='py-20 bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-4xl mx-auto mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Our{' '}
            <span className='instrument-font italic font-normal dark:text-white/70'>
              Journey
            </span>
          </h2>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            Discover the milestones that shaped A Thousand Voices into the platform it is today.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className='max-w-4xl mx-auto'>
          <div className='relative'>
            {/* Timeline Line */}
            <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600'></div>
            
            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='relative flex items-start mb-12 last:mb-0'>
                
                {/* Timeline Dot */}
                <div className='absolute left-6 w-4 h-4 bg-purple_blue rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10'></div>
                
                {/* Content Card */}
                <div className='ml-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-sm font-bold text-purple_blue'>
                      {item.step}
                    </span>
                    <div className={`w-12 h-12 ${item.bg_color} rounded-full flex items-center justify-center ${item.txt_color}`}>
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                    {item.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA Section - KEEPING THIS INTACT */}
        <div className='mt-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='flex flex-col gap-4 xl:flex xl:flex-row bg-dark_black items-center justify-between dark:bg-white/5 py-8 px-7 sm:px-12 rounded-3xl w-full'>
            <h4 className='text-white text-center xl:text-left'>
              Join us on this journey.
              <br /> Share your story with the world!
            </h4>
            <div className='flex flex-col sm:flex-row gap-3 items-center'>
              
              <a
                href='/about'
                className='group border border-white dark:border-white/50 text-white font-medium bg-dark_black gap-2 rounded-full flex items-center justify-between lg:gap-4 py-2 pl-5 pr-2 hover:opacity-95 hover:bg-transparent hover:text-white transition-all duration-200 ease-in-out'>
                <span className='group-hover:translate-x-9 transform transition-transform duration-200 ease-in-out'>
                  Learn More
                </span>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='group-hover:-translate-x-[125px] transition-all duration-200 ease-in-out '>
                  <rect width='32' height='32' rx='16' fill='white' />
                  <path
                    d='M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668'
                    stroke='#1B1D1E'
                    strokeWidth='1.42857'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Timeline 