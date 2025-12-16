'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import StorySubmissionForm from '../../components/story-submission/StorySubmissionForm'

export default function SubmitStoryPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('submitStory.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('submitStory.subtitle')}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('submitStory.guidelines')}
              </h2>
              
              <div className="space-y-6">
                {/* Length and Language Guidelines */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.lengthRequirements')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.storyLength')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.languageAcceptance')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.rollingBasis')}</span>
                    </li>
                  </ul>
                </div>

                {/* File Format Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.fileRequirements')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.fileFormat')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.maxFileSize')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.properFormat')}</span>
                    </li>
                  </ul>
                </div>

                {/* Content Guidelines */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.contentGuidelines')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.authenticStorytelling')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.uniqueExperiences')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.culturalHeritage')}</span>
                    </li>
                  </ul>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.eligibility')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.ageRequirement')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.fictionNonFiction')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.originalWork')}</span>
                    </li>
                  </ul>
                </div>

                {/* Submission Process & Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.process')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.reviewProcess')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.emailConfirmation')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.acceptanceNotification')}</span>
                    </li>
                  </ul>
                </div>

                {/* Content Restrictions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.restrictions')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.noHateSpeech')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.respectfulRepresentation')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.noExplicitContent')}</span>
                    </li>
                  </ul>
                </div>

                {/* Rights & Publication */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.rights')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.retainCopyright')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.websitePublication')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.promotionalUse')}</span>
                    </li>
                  </ul>
                </div>

                {/* Multiple Submissions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('submitStory.multipleSubmissions')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple_blue mt-1">•</span>
                      <span>{t('submitStory.multipleStories')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Submission Form and Messages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
          <StorySubmissionForm />
              
              {/* AI Disclaimer */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  {t('submitStory.aiDisclaimer')}
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  {t('submitStory.aiDisclaimerText')}
                </p>
              </div>

              {/* Need Help Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {t('submitStory.needHelp')}
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                  {t('submitStory.needHelpText')}
                </p>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                  <li>• {t('submitStory.email')}: <a href="mailto:submissions@athousandvoices.com" className="underline hover:text-blue-900 dark:hover:text-blue-100">submissions@athousandvoices.com</a></li>
                  <li>• {t('submitStory.responseTime')}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 