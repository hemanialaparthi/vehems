'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getSubjectsForLevel } from '@/config/subjects';
import { levels } from '@/config/levels';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ArrowLeft } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function LevelSubjectsPage() {
  const params = useParams();
  const levelId = params.level as string;
  const [showContactForm, setShowContactForm] = useState(false);

  const level = levels.find(l => l.id === levelId);
  const availableSubjects = getSubjectsForLevel(levelId);

  if (!level) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Level Not Found</h1>
          <Link
            href="/syllabus"
            className="text-[#a0b834] hover:text-[#7d9929]"
          >
            ← Back to Syllabus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/syllabus"
            className="inline-flex items-center text-[#a0b834] hover:text-[#7d9929] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Syllabus
          </Link>
          
          <div className="flex items-center mb-6">
            <div className={`w-20 h-20 ${level.color} rounded-full flex items-center justify-center text-3xl mr-6`}>
              {level.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {level.displayName} Subjects
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {level.description}
              </p>
            </div>
          </div>
        </motion.div>

        {availableSubjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No subjects available for this level yet.</p>
            <button
              onClick={() => setShowContactForm(true)}
              className="mt-4 bg-[#a0b834] text-white px-6 py-2 rounded-lg hover:bg-[#7d9929] transition-colors"
            >
              Request Subjects
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableSubjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/syllabus/${levelId}/${subject.id}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-[#c5d86c]">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {subject.icon}
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#a0b834] transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {subject.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {subject.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>Notes and resources available</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        )}

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
            We're constantly adding new subjects and topics for {level.displayName}. 
            Check back regularly for updates!
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-[#a0b834] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors"
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
