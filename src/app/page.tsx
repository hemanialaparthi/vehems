'use client';

import { subjects } from '@/config/subjects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Users, Download, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">Vehems</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Your ultimate destination for comprehensive IGCSE notes and study materials. 
              Excel in your exams with our carefully curated educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subjects"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Subjects
              </Link>
              <Link
                href="#features"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">10+</div>
              <div className="text-gray-600">Subjects</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">1K+</div>
              <div className="text-gray-600">Students</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Download className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">5K+</div>
              <div className="text-gray-600">Downloads</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-gray-600">Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore Our Subjects
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Choose from our comprehensive collection of IGCSE subjects, 
              each carefully organized with high-quality notes and resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link href={`/subjects/${subject.id}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-indigo-200">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {subject.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {subject.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {subject.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Vehems?
            </h2>
            <p className="text-xl text-gray-700">
              We provide everything you need to succeed in your IGCSE journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Notes</h3>
              <p className="text-gray-700">
                Detailed, well-structured notes covering all IGCSE subjects with clear explanations and examples.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Access</h3>
              <p className="text-gray-700">
                Download notes instantly in PDF format. Study offline anytime, anywhere.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Content</h3>
              <p className="text-gray-700">
                All notes are carefully reviewed and updated to match the latest IGCSE curriculum standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Excel in Your IGCSE Journey?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of students who trust Vehems for their study materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subjects"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Start Learning Today
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors inline-block"
              >
                Meet the Creator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
