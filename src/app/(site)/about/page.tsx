'use client'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Lottie from 'lottie-react'
import SingleCreativeMind from '../../components/home/creative-mind/SingleCreativeMind'


export default function AboutPage() {
  const [creativeMindList, setCreativeMindList] = useState<any>(null)
  const { scrollY } = useScroll()
  
  // Transform scroll progress to scale, opacity, and border radius values
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.8])
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.6])
  const imageBorderRadius = useTransform(scrollY, [0, 300], [0, 24])

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
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" style={{ paddingTop: '120px', zIndex: 0 }}>
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden" 
          style={{ 
            top: '120px',
            scale: imageScale,
            opacity: imageOpacity,
            borderRadius: imageBorderRadius
          }}
        >
          <Image
            src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/3553904024_57617cfcaf_h.jpg"
            alt="A Thousand Voices Hero Background"
            fill
            className="object-cover"
            style={{ borderRadius: `${imageBorderRadius}px` }}
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" style={{ borderRadius: `${imageBorderRadius}px` }}></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >


            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Learn More About
              <br />
              <span className="instrument-font italic font-normal text-yellow-300">What We Do</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              We take pride in helping Afghan storytellers from all walks of life 
              achieve the recognition and platform they deserve.
            </motion.p>



            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-16 flex justify-center"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="arrow" style={{
                  position: 'relative',
                  cursor: 'pointer'
                }}>
                  <span style={{
                    display: 'block',
                    width: '1.5vw',
                    height: '1.5vw',
                    borderBottom: '5px solid #fbbf24',
                    borderRight: '5px solid #fbbf24',
                    transform: 'rotate(45deg)',
                    margin: '-10px',
                    animation: 'animate 2s infinite'
                  }}></span>
                  <span style={{
                    display: 'block',
                    width: '1.5vw',
                    height: '1.5vw',
                    borderBottom: '5px solid #fef3c7',
                    borderRight: '5px solid #fef3c7',
                    transform: 'rotate(45deg)',
                    margin: '-10px',
                    animation: 'animate 2s infinite',
                    animationDelay: '-0.2s'
                  }}></span>
                  <span style={{
                    display: 'block',
                    width: '1.5vw',
                    height: '1.5vw',
                    borderBottom: '5px solid #fef3c7',
                    borderRight: '5px solid #fef3c7',
                    transform: 'rotate(45deg)',
                    margin: '-10px',
                    animation: 'animate 2s infinite',
                    animationDelay: '-0.4s'
                  }}></span>
                </div>
              </div>
            </motion.div>
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
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >


          {/* Left Side - Image (order-1 on mobile, order-1 on desktop) */}
          <div className="relative order-1 lg:order-1">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/mountain.png"
                alt="A Thousand Voices Team"
                fill
                className="object-contain rounded-lg"
              />
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
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/mission.png"
                alt="Our Values"
                fill
                className="object-contain rounded-lg"
              />
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
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/vase.png"
                alt="Your Section Image"
                fill
                className="object-contain rounded-lg"
              />
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Meet the creative minds behind our success
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              Our diverse team brings together expertise in literature, technology, and Afghan culture to create meaningful opportunities for writers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creativeMindList && creativeMindList.length > 0 ? (
              creativeMindList.map((item: any, index: number) => (
                <motion.div 
                  initial={bottomAnimation(index).initial}
                  animate={bottomAnimation(index).animate}
                  transition={bottomAnimation(index).transition}
                  key={`creative-mind-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-102 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: item.name === 'Zakira Baskhshi' ? '60% center' : 
                                       item.name === 'Tamana Farewar' ? 'center 40%' :
                                       item.name === 'Sadia Ansari' ? '40% center' : 'center'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                      {item.position}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">
                      {item.email}
                    </p>
                    <div className="flex justify-center">
                      <a
                        href={item.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Loading creative minds...</p>
              </div>
            )}
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