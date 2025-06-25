'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions about our IGCSE notes? Need help with specific subjects? 
            We're here to help you succeed in your studies!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#e9f2b3] rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-[#7d9929]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">vedapurnithaalaparthi@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#e9f2b3] rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-5 h-5 text-[#7d9929]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Response Time</p>
                  <p className="text-gray-600">We typically respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#e9f2b3] rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-[#7d9929]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Service Area</p>
                  <p className="text-gray-600">Serving IGCSE students worldwide</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#e9f2b3] border border-[#c5d86c] rounded-lg">
              <h3 className="font-semibold text-[#5a7a1e] mb-2">📚 Study Support</h3>
              <p className="text-[#7d9929] text-sm">
                Need help with specific topics? Request subject notes or ask questions 
                about our materials. We're committed to your academic success!
              </p>
            </div>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Can We Help?
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-[#7d9929] text-white p-4 rounded-lg hover:bg-[#5a7a1e] transition-colors text-left"
              >
                <div className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  <div>
                    <p className="font-semibold">Send us a Message</p>
                    <p className="text-[#e9f2b3] text-sm">General inquiries and feedback</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-[#a0b834] text-white p-4 rounded-lg hover:bg-[#7d9929] transition-colors text-left"
              >
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-3" />
                  <div>
                    <p className="font-semibold">Request Subject Notes</p>
                    <p className="text-[#e9f2b3] text-sm">Request notes for specific subjects</p>
                  </div>
                </div>
              </button>
              
              <div className="bg-[#e9f2b3] p-4 rounded-lg border border-[#c5d86c]">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-[#7d9929]" />
                  <div>
                    <p className="font-semibold text-gray-900">Study Questions</p>
                    <p className="text-[#7d9929] text-sm">Ask about specific topics or materials</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">⚡ Quick Response</h3>
              <p className="text-yellow-800 text-sm">
                For urgent requests or questions about existing notes, 
                we aim to respond within a few hours during business days.
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I request new subject notes?
              </h3>
              <p className="text-gray-600 text-sm">
                Click "Request Subject Notes" above or use the contact form on any subject page. 
                We'll let you know when new notes are available.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Are the notes updated regularly?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! We regularly update our notes to match the latest IGCSE curriculum 
                and exam requirements.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I suggest improvements to existing notes?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely! We welcome feedback and suggestions. Use our contact form 
                to share your thoughts.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does it take to add new subjects?
              </h3>
              <p className="text-gray-600 text-sm">
                It typically takes 1-2 weeks to create comprehensive notes for a new subject, 
                depending on the complexity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Modal */}
        <ContactForm
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          type="general"
        />
      </div>
    </div>
  );
}
