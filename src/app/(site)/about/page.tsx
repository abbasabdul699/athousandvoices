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
        {/* Mission Section - The Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Side - Image (order-1 on mobile, order-1 on desktop) */}
          <div className="relative order-1 lg:order-1">
            <div className="relative h-130 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/mountain.png"
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

          {/* Right Side - Content (order-2 on mobile, order-2 on desktop) */}
          <div className="space-y-6 order-2 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
              Since the fall of Kabul in August 2021, the global spotlight has largely shifted away from Afghanistan—but the crisis persists. Under the Taliban's draconian rule, Afghan youth—especially girls and women—have been silenced, erased from classrooms, media, and public life. And across the diaspora, Afghan voices are often misrepresented or lost entirely, reduced to simplistic tropes of victimhood or violence. Our stories have long been told for us, not by us.
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

        {/* Values Section - The Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Side - Content (order-2 on mobile, order-1 on desktop) */}
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
              A Thousand Voices was born from a belief that storytelling is resistance— and that reclaiming our narratives is essential to challenge the global perceptions about Afghanistan. This project is a Project for Peace and Thomas C. Barry Fellowship initiative, aiming to collect and showcase fiction and nonfiction pieces from Afghan youth around the world.
              <br />
              <br />
              Through storytelling workshops, creative mentorship, and strategic partnerships with NGOs and universities across the world A Thousand Voices offers a platform for young Afghans to write, breaking stereotypes and highlighting the diversity, creativity, and hope that still exists within and beyond Afghan borders.
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

          {/* Right Side - Image (order-1 on mobile, order-2 on desktop) */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-130 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/mission.png"
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

        {/* New Section - The Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Side - Image (order-1 on mobile, order-1 on desktop) */}
          <div className="relative order-1 lg:order-1">
            <div className="relative h-130 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/vase.png"
                alt="Your Section Image"
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

          {/* Right Side - Content (order-2 on mobile, order-2 on desktop) */}
          <div className="space-y-8 order-2 lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Outcome
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
              The top 3 winners will receive great cash prizes. The top 80-100 stories will be published on our website and featured in a professionally published anthology, launching on August 15, 2026—marking five years since the fall of Kabul. The project will culminate in a global storytelling conference spotlighting Afghan youth, authors, and partners who believe in the power of words to heal, connect, and transform.
            </p>
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Cash prizes and recognition for top storytellers</span>
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Professional anthology publication and global reach</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Global storytelling conference and community building</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Goals and Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Goals and Impact
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              Our story is a testament to the power of storytelling and cultural exchange. Together, we have navigated challenges, 
              celebrated milestones, and crafted a narrative of growth and achievement in amplifying Afghan voices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-5">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Empowering Voices</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                  We create safe, nurturing spaces where young Afghans can share their stories, find confidence in their voice, and begin to shape their futures with pride and purpose.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 border border-transparent bg-gradient-to-r from-black to-red-600 text-white text-sm font-medium rounded-lg hover:from-gray-800 hover:to-red-700 transition-all duration-200">
                    Breaking Barriers
                  </button>
                  <button className="px-4 py-1.5 border border-transparent bg-gradient-to-r from-red-600 to-green-600 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-green-700 transition-all duration-200">
                    Revealing Vibrant Realities
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-5">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Rewriting the Narrative</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                  Through storytelling, we challenge prevailing stereotypes and show the world the depth, creativity, and strength of Afghan people—not as victims, but as vibrant changemakers.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 border border-transparent bg-gradient-to-r from-green-600 to-black text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-gray-800 transition-all duration-200">
                    Igniting Hope
                  </button>
                  <button className="px-4 py-1.5 border border-transparent bg-gradient-to-r from-black to-green-600 text-white text-sm font-medium rounded-lg hover:from-gray-800 hover:to-green-700 transition-all duration-200">
                    Cultivating Changemakers
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-5">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Spreading the Word</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                  We build community through media, partnerships, and shared storytelling—making sure these voices are heard, celebrated, and supported across borders.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 border border-transparent bg-gradient-to-r from-red-600 to-black text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-gray-800 transition-all duration-200">
                    Fostering Solidarity
                  </button>
                  <button className="px-4 py-1.5 border border-transparent bg-gradient-to-r from-green-600 to-red-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-red-700 transition-all duration-200">
                    Growing Together
                  </button>
                </div>
              </div>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            Get Involved
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            If you would like to collaborate, partner, or help bring this vision to life in any capacity, please reach out. 
            And to all the young Afghans across the world: we can't wait to read your stories. 
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