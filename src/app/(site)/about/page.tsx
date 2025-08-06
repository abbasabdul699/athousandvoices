'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SingleCreativeMind from '../../components/home/creative-mind/SingleCreativeMind'

export default function AboutPage() {
  const [creativeMindList, setCreativeMindList] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()        
        setCreativeMindList(data.creativeMindList)
      } catch (error) {
        console.error('Error fetching creative minds:', error)
      }
    }
    fetchData()
  }, [])

  const bottomAnimation = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: index * 0.1 },
  })

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
              About <span className="instrument-font italic font-normal dark:text-white/70">A Thousand Voices</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We are dedicated to amplifying Afghan storytellers and creating a platform for cultural exchange through literature. 
              Our mission is to bridge cultures and connect voices from around the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Side - Image */}
          <div className="relative">
            <div className="relative h-130 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/home/about/mountain.png"
                alt="A Thousand Voices Team"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative dots */}
            <div className="absolute -bottom-4 -left-4 flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-300 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
              A Thousand Voices was born from the vision of creating a global platform where Afghan storytellers can share their narratives, 
              connect with readers worldwide, and preserve the rich cultural heritage of Afghanistan through literature.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Amplifying Afghan voices globally</span>
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Fostering cultural exchange through literature</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Building bridges between communities</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Side - Content */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
              We believe in the power of storytelling to connect people across borders, cultures, and experiences. 
              Our platform is built on the principles of inclusivity, authenticity, and the celebration of diverse voices.
            </p>
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Authentic storytelling and cultural preservation</span>
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Inclusive platform for diverse voices</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Quality literature and meaningful connections</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative h-130 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/home/about/mission.png"
                alt="Our Values"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative dots */}
            <div className="absolute -bottom-4 -right-4 flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Creative Minds Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the creative minds behind our success
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our diverse team brings together expertise in literature, technology, and Afghan culture to create meaningful opportunities for writers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creativeMindList?.map((item: any, index: any) => (
              <motion.div {...bottomAnimation(index)} key={index}>
                <SingleCreativeMind key={index} creativemind={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to share your story?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community of storytellers and connect with readers from around the world. 
            Your voice matters, and your story deserves to be heard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/submit-story"
              className="px-8 py-3 bg-purple_blue text-white font-medium rounded-lg hover:bg-purple_blue/90 transition-colors duration-200"
            >
              Submit Your Story
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 