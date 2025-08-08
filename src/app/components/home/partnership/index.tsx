'use client'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

function Partnership() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const partnershipTypes = [
    {
      title: "Educational Institutions",
      description: "Partner with universities and educational organizations to support Afghan youth.",
      icon: "��",
      color: "bg-blue-500/20",
      textColor: "text-blue-600"
    },
    {
      title: "NGOs & Non-Profits",
      description: "Collaborate with organizations working with Afghan communities.",
      icon: "��",
      color: "bg-green-500/20",
      textColor: "text-green-600"
    },
    {
      title: "Publishing Houses",
      description: "Work with publishers to bring Afghan stories to global audiences.",
      icon: "��",
      color: "bg-purple-500/20",
      textColor: "text-purple-600"
    },
    {
      title: "Media Organizations",
      description: "Partner with media outlets to share Afghan stories and raise awareness.",
      icon: "��",
      color: "bg-red-500/20",
      textColor: "text-red-600"
    }
  ]

  const currentPartners = [
    {
      name: "Project for Peace",
      logo: "/images/home/brand/ProjectforPeace.png",
      description: "Supporting peace-building initiatives through storytelling."
    },
    {
      name: "Brand Peace",
      logo: "/images/home/brand/brand-peace.png",
      description: "Promoting peace and understanding through creative expression."
    }
  ]

  const bottomAnimation = (index: number) => ({
    initial: { y: '20%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '20%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.2 + index * 0.1 },
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Partner with <span className="instrument-font italic font-normal dark:text-white/70">Us</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Join our network of partners and help amplify Afghan voices while building meaningful connections across cultures.
          </p>
        </motion.div>

        {/* Partnership Types */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            Partnership Opportunities
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                {...bottomAnimation(index)}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {type.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            Our Current Partners
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                {...bottomAnimation(index + 4)}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {partner.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-purple_blue rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Partner with Us?
            </h3>
            <p className="text-white/80 mb-8">
              Join our network of partners and help us amplify Afghan voices while building meaningful connections across cultures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partnership"
                className="px-8 py-3 bg-white text-purple_blue font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-purple_blue transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Partnership 