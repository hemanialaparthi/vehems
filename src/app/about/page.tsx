'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Heart, BookOpen, Code, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
              Meet the Creator
            </h1>
            <p className="text-xl text-[#e9f2b3]">
              The story behind Vehems and its passionate creator
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="relative w-80 h-80 mx-auto lg:mx-0 mb-6">
                {/* Placeholder for photo - replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-[#e9f2b3] to-[#c5d86c] rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <div className="text-center">
                    <GraduationCap className="w-20 h-20 text-[#5a7a1e] mx-auto mb-4" />
                    <p className="text-[#5a7a1e] font-medium">Add Your Photo Here</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <BookOpen className="w-6 h-6 text-[#7d9929] mx-auto mb-2" />
                  <div className="font-bold text-gray-900">IGCSE</div>
                  <div className="text-sm text-gray-600">Expert</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <Code className="w-6 h-6 text-[#a0b834] mx-auto mb-2" />
                  <div className="font-bold text-gray-900">Developer</div>
                  <div className="text-sm text-gray-600">& Designer</div>
                </div>
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hi, I'm Veda! 👋
              </h2>
              
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  Welcome to Vehems! I'm passionate about education and helping students excel in their IGCSE journey. 
                  As someone who has navigated the challenges of IGCSE studies myself, I understand the importance of 
                  having quality, accessible study materials.
                </p>
                
                <p>
                  I created Vehems with a simple mission: to provide comprehensive, well-organized notes that make 
                  learning easier and more effective. Every note on this platform has been carefully crafted and 
                  reviewed to ensure accuracy and clarity.
                </p>
                
                <p>
                  When I'm not creating educational content, you can find me exploring new [Add more here!]
                </p>
              </div>

              {/* Skills/Interests */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What I Do</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-[#e9f2b3] text-[#5a7a1e] px-3 py-1 rounded-full text-sm font-medium">
                    Educational Content Creation
                  </span>
                  <span className="bg-[#c5d86c] text-[#5a7a1e] px-3 py-1 rounded-full text-sm font-medium">
                    IGCSE Tutoring
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-[#7d9929] to-[#a0b834] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              "I believe every student deserves access to high-quality educational resources. Through Vehems, 
              I'm committed to providing comprehensive IGCSE notes that help students understand complex concepts, 
              prepare effectively for exams, and achieve their academic goals. Education should be accessible, 
              engaging, and empowering for everyone."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Vehems Was Born</h2>
            <p className="text-lg text-gray-700">The journey from idea to reality</p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-[#a0b834] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Problem</h3>
                <p className="text-gray-700">
                  During my IGCSE journey, I struggled to find comprehensive, well-organized study materials. 
                  Most resources were scattered, incomplete, or difficult to understand.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-[#7d9929] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Solution</h3>
                <p className="text-gray-700">
                  I started creating my own notes, organizing them by subject and topic. Friends began asking 
                  for copies, and I realized many students faced the same challenges.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-[#6d8524] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Platform</h3>
                <p className="text-gray-700">
                  Using my programming skills, I built Vehems as a comprehensive platform where students 
                  can access high-quality IGCSE notes, organized and easily accessible.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#7d9929] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Let's Connect!</h2>
            <p className="text-xl text-[#e9f2b3] mb-8">
              Have questions, suggestions, or just want to say hi? I'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-[#7d9929] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Send a Message</span>
              </Link>
              
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/vedapurnithaalaparthi/"
                  className="bg-[#5a7a1e] p-3 rounded-full hover:bg-[#4a6319] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#5a7a1e] rounded-lg">
              <p className="text-[#e9f2b3]">
                💡 <strong>Got a suggestion for new notes or features?</strong> Your feedback helps make Vehems better for everyone!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
