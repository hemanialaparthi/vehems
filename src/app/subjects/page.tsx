'use client';

import { useState } from 'react';
import { subjects } from '@/config/subjects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function SubjectsPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Subjects
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore our comprehensive collection of IGCSE subjects. 
            Each subject contains carefully curated notes and study materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/subjects/${subject.id}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-indigo-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {subject.icon}
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {subject.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {subject.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>Multiple topics available</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center bg-white rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-700 mb-6">
            We're constantly adding new subjects and topics. 
            Check back regularly for updates!
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Request a Subject
          </button>
        </motion.div>

        {/* Contact Form Modal */}
        <ContactForm
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          type="subject-request"
        />
      </div>
    </div>
  );
}
