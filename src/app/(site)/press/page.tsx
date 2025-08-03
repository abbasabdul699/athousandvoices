'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  excerpt?: string
  author?: string
  date: string
  image: string
  featured?: boolean
}

const pressArticles: Article[] = [
  {
    id: 1,
    title: "A Thousand Voices: Amplifying Afghan Storytellers Through Literature",
    author: "By: Afghan Literature Foundation",
    date: "DEC 15 · A THOUSAND VOICES",
    image: "/images/home/creative/creative_img_1.png",
    featured: true
  },
  {
    id: 2,
    title: "The Power of Storytelling in Cultural Preservation",
    excerpt: "How literature serves as a bridge between generations...",
    author: "Written by Cultural Heritage Institute",
    date: "NOV 28 · A THOUSAND VOICES",
    image: "/images/home/creative/creative_img_2.png"
  },
  {
    id: 3,
    title: "Digital Platforms Revolutionizing Literary Access in Afghanistan",
    excerpt: "Technology is transforming how stories reach global audiences...",
    date: "NOV 15 · A THOUSAND VOICES",
    image: "/images/home/creative/creative_img_3.png"
  },
  {
    id: 4,
    title: "Meet the Voices Behind A Thousand Voices",
    excerpt: "The team working to amplify Afghan narratives worldwide...",
    author: "Written by Team Spotlight",
    date: "OCT 30 · A THOUSAND VOICES",
    image: "/images/home/creative/creative_img_4.png"
  },
  {
    id: 5,
    title: "The Impact of Short Story Competitions on Emerging Writers",
    excerpt: "How competitions are nurturing the next generation of Afghan authors...",
    date: "OCT 15 · A THOUSAND VOICES",
    image: "/images/home/creative/Abbas.png"
  },
  {
    id: 6,
    title: "Building Bridges Through Literature: Afghan Stories Go Global",
    excerpt: "The international reach of Afghan storytelling...",
    date: "SEP 28 · A THOUSAND VOICES",
    image: "/images/home/creative/Ahmad.png"
  }
]

const mostPopularArticles = pressArticles.slice(0, 4)

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              A Thousand Voices Press
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stories, updates, and insights from our journey to amplify Afghan voices through literature
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            {pressArticles.slice(1, 3).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple_blue transition-colors duration-200">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    {article.author && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {article.author}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {article.date}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Center Column - Featured Article */}
          <div className="lg:col-span-1">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group cursor-pointer"
            >
                              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pressArticles[0].image}
                    alt={pressArticles[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple_blue transition-colors duration-200">
                    {pressArticles[0].title}
                  </h2>
                  {pressArticles[0].author && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {pressArticles[0].author}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pressArticles[0].date}
                  </p>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {pressArticles.slice(3, 5).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple_blue transition-colors duration-200">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    {article.author && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {article.author}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {article.date}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Most Popular Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Most Popular
            </h2>
            <Link 
              href="/press"
              className="text-purple_blue hover:text-purple_blue/80 font-medium transition-colors duration-200"
            >
              VIEW ALL
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostPopularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-24 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple_blue transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {article.date}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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