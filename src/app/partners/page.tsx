'use client';

import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5a7a1e] via-[#a0b834] to-[#c5d86c] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Partners
            </h1>
            <p className="text-xl text-[#e9f2b3] max-w-2xl mx-auto">
              Discover our trusted educational partners that help enhance your learning experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Partner Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Partner Header with Solid Background */}
            <div className="h-64 bg-[#a0b834] relative">
              {/* Main title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider mb-2">
                    Vike Resources
                  </h2>
                </div>
              </div>
            </div>

            {/* Partner Content */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Vike Resources is your ultimate online study hub for Cambridge IGCSE, AS, and A2 Levels. 
                  Run by a passionate and driven team of teens, it offers a wide variety of high-quality, 
                  often self-made revision notes, study guides, and academic tools designed to support 
                  students at every stage of their learning journey. With a strong focus on clarity, 
                  accessibility, and community, Vike makes studying more effective, less stressful, 
                  and even fun, helping learners worldwide revise smarter, understand better, 
                  and feel confident every step of the way.
                </p>

                <div className="flex justify-center">
                  <motion.a
                    href="https://vikeresources.framer.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-[#a0b834] text-white rounded-lg hover:bg-[#7d9929] transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VISIT WEBSITE
                    <ExternalLink className="w-5 h-5 ml-3" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              More Partners Coming Soon
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're actively seeking partnerships with educational institutions and platforms 
              that share our mission of making quality education accessible to all students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#5a7a1e] to-[#a0b834]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-[#e9f2b3] mb-8 max-w-2xl mx-auto">
              Start your learning journey with our comprehensive study materials and trusted partner resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/syllabus"
                className="inline-flex items-center px-6 py-3 bg-white text-[#5a7a1e] rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Syllabus
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#5a7a1e] transition-colors font-medium"
              >
                <Globe className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
