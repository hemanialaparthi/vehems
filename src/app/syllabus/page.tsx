'use client';

import { motion } from 'framer-motion';
import { levels } from '@/config/levels';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

export default function SyllabusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <GraduationCap className="w-16 h-16 text-[#a0b834]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Syllabus
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Select your academic level to access comprehensive study materials 
            and notes tailored for your curriculum.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/syllabus/${level.id}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-[#c5d86c] h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {level.icon}
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#a0b834] transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {level.displayName}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {level.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>Multiple subjects available</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-white rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            What's Available?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🎓
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">GCSE/IGCSE</h3>
              <p className="text-sm text-gray-600">
                Foundation level content for ages 14-16
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                📖
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AS Level</h3>
              <p className="text-sm text-gray-600">
                Advanced Subsidiary level for ages 16-17
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🏆
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">A Level</h3>
              <p className="text-sm text-gray-600">
                Advanced level content for ages 17-18
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
