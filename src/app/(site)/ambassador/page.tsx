'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AmbassadorPage() {
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
              Become an <span className="bg-yellow-300 dark:bg-yellow-400 text-gray-900 px-2">Ambassador</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Join our global network of cultural ambassadors and help amplify Afghan voices while building meaningful connections across cultures.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* What is an Ambassador Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left Side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What is an <span className="bg-yellow-300 dark:bg-yellow-400 text-gray-900 px-2">Ambassador</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Our ambassadors are passionate individuals who serve as cultural bridges, connecting communities and amplifying the voices of Afghan storytellers worldwide. 
              They help promote understanding, foster dialogue, and create meaningful impact through storytelling and community engagement.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Cultural bridge builders</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Community organizers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Story amplifiers</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple_blue/20 to-yellow-300/20 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 text-purple_blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">Ambassador Network</p>
              </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute -bottom-4 -right-4 flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits of becoming an{' '}
              <span className="bg-yellow-300 dark:bg-yellow-400 text-gray-900 px-2">
                Ambassador
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join our ambassador program and unlock opportunities for personal growth, community impact, and cultural exchange.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Global Network",
                description: "Connect with ambassadors and storytellers from around the world",
                icon: "🌍"
              },
              {
                title: "Cultural Exchange",
                description: "Learn about Afghan culture and share your own cultural heritage",
                icon: "🤝"
              },
              {
                title: "Leadership Skills",
                description: "Develop community organizing and communication skills",
                icon: "⭐"
              },
              {
                title: "Impact",
                description: "Make a real difference in amplifying marginalized voices",
                icon: "💫"
              },
              {
                title: "Resources",
                description: "Access to exclusive content, events, and training materials",
                icon: "📚"
              },
              {
                title: "Recognition",
                description: "Get recognized for your contributions to cultural dialogue",
                icon: "🏆"
              }
            ].map((benefit, index) => (
              <motion.div 
                key={benefit.title} 
                {...bottomAnimation(index)} 
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Apply Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to become an ambassador?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community of cultural ambassadors and help create meaningful connections across borders. 
            Your voice and passion can make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-purple_blue text-white font-medium rounded-lg hover:bg-purple_blue/90 transition-colors duration-200"
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 