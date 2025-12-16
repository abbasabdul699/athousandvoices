'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function PartnershipPage() {
  const partnershipTypes = [
    {
      title: "Educational Institutions",
      description: "Partner with universities, colleges, and educational organizations to support Afghan youth in their academic and creative pursuits.",
      icon: "🎓",
      benefits: [
        "Access to student networks and creative talent",
        "Academic credibility and institutional support",
        "Research collaboration opportunities",
        "Workshop and event hosting capabilities"
      ]
    },
    {
      title: "NGOs & Non-Profits",
      description: "Collaborate with organizations working with Afghan communities to amplify voices and create meaningful impact.",
      icon: "🤝",
      benefits: [
        "Direct access to Afghan communities",
        "Established trust and relationships",
        "Program implementation expertise",
        "Funding and resource opportunities"
      ]
    },
    {
      title: "Publishing Houses",
      description: "Work with publishers to bring Afghan stories to global audiences through traditional and digital platforms.",
      icon: "📚",
      benefits: [
        "Professional editing and publishing expertise",
        "Distribution networks and marketing support",
        "International reach and audience access",
        "Quality assurance and industry standards"
      ]
    },
    {
      title: "Media Organizations",
      description: "Partner with media outlets to share Afghan stories and raise awareness about the platform's mission.",
      icon: "📰",
      benefits: [
        "Wide audience reach and visibility",
        "Professional storytelling expertise",
        "Cross-platform content distribution",
        "Public relations and media coverage"
      ]
    }
  ]

  const currentPartners = [
    {
      name: "Project for Peace",
      logo: "https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/brand/ProjectforPeace.png",
      description: "Supporting peace-building initiatives through storytelling and cultural exchange."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Partner with <span className="instrument-font italic font-normal dark:text-white/70">Us</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Join our network of partners and help amplify Afghan voices while building meaningful connections across cultures. Together, we can create a platform that empowers storytellers and fosters understanding.
            </p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='flex flex-col items-center justify-center gap-4'>
              <div className='flex flex-col items-center justify-center gap-8 w-full sm:flex-row'>
                <Link
                  href='/contact'
                  className='group bg-purple_blue text-white font-medium flex flex-row justify-between items-center py-2 px-5 rounded-full max-w-64 w-full md:py-3 border border-purple_blue transition-all duration-200 ease-in-out hover:bg-transparent hover:text-purple_blue'>
                  <span className='flex text-start transform transition-transform duration-200 ease-in-out group-hover:translate-x-20'>
                    Become a Partner
                  </span>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='transform transition-transform duration-200 ease-in-out group-hover:-translate-x-44 group-hover:rotate-45'>
                    <rect
                      width='40'
                      height='40'
                      rx='20'
                      className='fill-white transition-colors duration-200 ease-in-out group-hover:fill-blue'
                    />
                    <path
                      d='M15.832 15.3334H24.1654V23.6667'
                      className='stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white'
                      strokeWidth='1.66667'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M15.832 23.6667L24.1654 15.3334'
                      className='stroke-[#1B1D1E] transition-colors duration-500 ease-in-out group-hover:stroke-white'
                      strokeWidth='1.66667'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Why Partner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Why Partner with A Thousand Voices?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
            Our partnerships are built on shared values of cultural exchange, education, and empowerment. 
            By working together, we can create lasting impact and amplify voices that deserve to be heard.
          </p>
        </motion.div>

        {/* Partnership Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Partnership Opportunities
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {type.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {type.description}
                </p>
                <ul className="space-y-2 pl-4">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-purple_blue rounded-full mr-3 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Current Partners
          </h3>
          <div className="flex justify-center">
            <div className="grid gap-8 max-w-md">
              {currentPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
                >
                <div className="mx-auto mb-5 relative flex items-center justify-center" style={{ width: '140px', height: '140px' }}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {partner.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {partner.description}
                </p>
              </motion.div>
            ))}
            </div>
          </div>
        </motion.div>

        {/* Partnership Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            How to Partner with Us
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Initial Contact",
                description: "Reach out to us through our contact form or email to express your interest in partnership."
              },
              {
                step: "2",
                title: "Discussion & Planning",
                description: "We'll schedule a meeting to discuss potential collaboration opportunities and align our goals."
              },
              {
                step: "3",
                title: "Partnership Agreement",
                description: "Once we agree on terms, we'll formalize our partnership with a clear agreement and timeline."
              }
            ].map((process, index) => (
              <div key={process.step} className="text-center">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {process.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center rounded-2xl p-12 text-gray-900 dark:text-white"
          style={{
            background: 'linear-gradient(to right, #d9f3fc, #fdf1d3)',
          }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Partner with Us?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our network of partners and help us amplify Afghan voices while building meaningful connections across cultures. 
            Your partnership can make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 