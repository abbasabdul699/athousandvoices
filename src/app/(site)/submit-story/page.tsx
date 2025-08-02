'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import StorySubmissionForm from '../../components/story-submission/StorySubmissionForm'

export default function SubmitStoryPage() {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Submit Your Story
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Share your voice with the world. Upload your short story and join Afghanistan's literary community.
            </p>
          </div>

          {/* Form Section */}
          <StorySubmissionForm />
        </motion.div>
      </div>
    </div>
  )
} 