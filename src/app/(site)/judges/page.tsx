'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { judges } from './judgesData'

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

export default function JudgesPage() {
  return (
    <div className="min-h-screen bg-[#e8e0d4] dark:bg-gray-900">
      <div className="w-full mx-auto px-8 md:px-16 pt-36 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-6xl instrument-font italic font-normal text-gray-800 dark:text-white/80">
            Meet the individuals who carefully reviewed and selected the stories you shared with us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-10 gap-y-14 justify-items-center">
          {judges.map((judge, index) => (
            <motion.div
              key={judge.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`w-full max-w-[420px] ${
                index === 3
                  ? 'lg:col-start-2 lg:col-span-2'
                  : index === 4
                    ? 'lg:col-start-4 lg:col-span-2'
                    : 'lg:col-span-2'
              }`}
            >
              <Link href={`/judges/${judge.slug}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden rounded-md mb-5">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-gray-900 dark:text-white mb-1 break-words">
                  {judge.name.split(' ').length > 2 ? (
                    <>
                      {judge.name.split(' ').slice(0, -1).join(' ')}
                      <br />
                      {judge.name.split(' ').slice(-1)}
                    </>
                  ) : (
                    <>
                      {judge.name.split(' ')[0]}
                      <br />
                      {judge.name.split(' ').slice(1).join(' ')}
                    </>
                  )}
                </h3>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-2">
                  {judge.title.includes('@') ? (
                    <>
                      {renderTitle(judge.title.split('@')[0].trim())}
                      <br />
                      {renderTitle(judge.title.split('@').slice(1).join('@').trim())}
                    </>
                  ) : (
                    renderTitle(judge.title)
                  )}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400 underline underline-offset-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                  Read More
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
