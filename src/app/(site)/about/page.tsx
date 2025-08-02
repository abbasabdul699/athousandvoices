'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About A Thousand Voices
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering Afghan storytellers and amplifying their voices through the power of literature and digital platforms.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                A Thousand Voices is dedicated to creating a platform where Afghan writers can share their stories, 
                experiences, and perspectives with the world. We believe that every voice matters and that storytelling 
                has the power to bridge cultures, foster understanding, and inspire change.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Through our short story competition and digital publishing platform, we aim to amplify the diverse 
                voices of Afghanistan, celebrating the rich cultural heritage and contemporary experiences of its people.
              </p>
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-purple_blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple_blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Community
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Building a supportive community of writers and readers who celebrate Afghan culture and literature.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-purple_blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple_blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Promoting literary excellence and providing opportunities for writers to develop their craft.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-purple_blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple_blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Creating meaningful impact through storytelling that educates, inspires, and connects people globally.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Team
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                A Thousand Voices is led by a dedicated team of professionals passionate about literature, 
                technology, and cultural exchange. Our diverse team brings together expertise in publishing, 
                digital platforms, and Afghan culture to create meaningful opportunities for writers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Zakira Bakhshi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">President</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ahmadzia Momand
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Outreach Coordinator</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Abdul Abbas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Software Engineer</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple_blue to-purple_blue/80 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Ready to share your story? Submit your work to our competition or get in touch to learn more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/submit-story"
                  className="bg-white text-purple_blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Submit Your Story
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple_blue transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 