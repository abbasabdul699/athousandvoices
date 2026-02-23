'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { judges } from '../judgesData'

function renderTitle(text: string) {
  const lines = text.split('\n')
  return lines.map((line, li) => (
    <React.Fragment key={li}>
      {li > 0 && <br />}
      {renderWithItalics(line)}
    </React.Fragment>
  ))
}

function renderWithItalics(text: string) {
  const parts = text.split(/\*([^*]+)\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i}>{part}</em> : part
  )
}

export default function JudgeBioPage() {
  const { slug } = useParams<{ slug: string }>()

  const currentIndex = judges.findIndex((j) => j.slug === slug)
  const judge = judges[currentIndex]

  if (!judge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Judge not found
          </h2>
          <Link
            href="/judges"
            className="text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-white"
          >
            Back to all judges
          </Link>
        </div>
      </div>
    )
  }

  const prevJudge = currentIndex > 0 ? judges[currentIndex - 1] : null
  const nextJudge =
    currentIndex < judges.length - 1 ? judges[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-36 pb-12">
        <motion.div
          key={judge.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Bio text */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {judge.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-gray-500 dark:text-gray-400 mb-8"
              >
                {renderTitle(judge.title)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {judge.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex justify-center md:justify-end"
            >
              <div className="w-full max-w-sm aspect-[3/4] rounded-md overflow-hidden">
                <Image
                  src={judge.image}
                  alt={judge.name}
                  width={500}
                  height={667}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Previous / Next navigation */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between py-6">
            {prevJudge ? (
              <Link
                href={`/judges/${prevJudge.slug}`}
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                <span className="text-sm font-medium">{prevJudge.name}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextJudge ? (
              <Link
                href={`/judges/${nextJudge.slug}`}
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">{nextJudge.name}</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
