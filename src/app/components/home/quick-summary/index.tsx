'use client'
import React from 'react'
import { motion } from 'framer-motion'

function QuickSummary() {
  return (
    <section className='py-16 bg-gradient-to-r from-pink-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-4xl mx-auto'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 hover:scale-105 transition-transform duration-300'>
            <span className='font-bold'>Stories that connect</span>
            <br />
            <span className='instrument-font italic font-bold dark:text-white/70'>
              voices that resist
            </span>
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto'>
            For too long, Afghan stories have been told by outsiders. The world often sees Afghanistan through the lens of war, conflict, and despair—flattening millions of voices into a single narrative of victimhood. A Thousand Voices is a Projects for Peace initiative that challenges this erasure by launching a global short story competition and anthology series to amplify the lived experiences, dreams, and resilience of Afghan youth—written by them, in their own voices.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default QuickSummary
