'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Article {
  id: number
  title: string
  excerpt?: string
  author?: string
  date: string
  image: string
  featured?: boolean
}

const pressArticle: Article = {
  id: 1,
  title: "Yale junior receives Projects for Peace award",
  author: "By: Yale News",
  date: "MAY 21, 2025 · A THOUSAND VOICES",
  image: "/images/home/press/Zakira.png",
  featured: true
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              <span className="instrument-font italic font-normal dark:text-white/70">A Thousand Voices</span> Press
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stories, updates, and insights from our journey to amplify Afghan voices through literature
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Single Article Display */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <a 
            href="https://news.yale.edu/2025/05/21/yale-junior-receives-projects-peace-award" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={pressArticle.image}
                  alt={pressArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple_blue transition-colors duration-200">
                  {pressArticle.title}
                </h2>
                {pressArticle.author && (
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">
                    {pressArticle.author}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {pressArticle.date}
                </p>
                {pressArticle.excerpt && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {pressArticle.excerpt}
                  </p>
                )}
              </div>
            </div>
          </a>
        </motion.article>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Get the latest stories and updates from A Thousand Voices delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple_blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button className="px-6 py-3 bg-purple_blue text-white font-medium rounded-lg hover:bg-purple_blue/90 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 