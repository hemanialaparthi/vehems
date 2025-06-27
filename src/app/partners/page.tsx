'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Globe, Users, Award, Star } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    id: 1,
    name: "Cambridge Assessment International Education",
    description: "Official IGCSE curriculum provider and examination board",
    url: "https://www.cambridgeinternational.org/",
    category: "Official",
    logo: "🎓",
    features: ["Past Papers", "Syllabus Updates", "Assessment Guidelines"]
  },
  {
    id: 2,
    name: "Khan Academy",
    description: "Free online courses and practice exercises for various subjects",
    url: "https://www.khanacademy.org/",
    category: "Educational",
    logo: "📚",
    features: ["Video Lessons", "Interactive Exercises", "Progress Tracking"]
  },
  {
    id: 3,
    name: "Coursera",
    description: "Online courses from top universities and institutions",
    url: "https://www.coursera.org/",
    category: "Online Learning",
    logo: "🎯",
    features: ["University Courses", "Certificates", "Specializations"]
  },
  {
    id: 4,
    name: "edX",
    description: "High-quality courses from the world's best universities",
    url: "https://www.edx.org/",
    category: "Online Learning",
    logo: "🏛️",
    features: ["MIT & Harvard Courses", "Verified Certificates", "MicroMasters"]
  },
  {
    id: 5,
    name: "Quizlet",
    description: "Study tools including flashcards and practice tests",
    url: "https://quizlet.com/",
    category: "Study Tools",
    logo: "🃏",
    features: ["Flashcards", "Study Games", "Practice Tests"]
  },
  {
    id: 6,
    name: "Wolfram Alpha",
    description: "Computational knowledge engine for mathematics and sciences",
    url: "https://www.wolframalpha.com/",
    category: "Study Tools",
    logo: "🔬",
    features: ["Step-by-step Solutions", "Mathematical Computations", "Data Analysis"]
  },
  {
    id: 7,
    name: "TED-Ed",
    description: "Educational videos and lessons on various topics",
    url: "https://ed.ted.com/",
    category: "Educational",
    logo: "🎬",
    features: ["Animated Lessons", "Think Questions", "Dig Deeper Resources"]
  }
];

const partners = [
  {
    id: 1,
    name: "Your Partner Name",
    description: "Description of your educational partner and collaboration",
    url: "https://partner-website.com/",
    logo: "🤝",
    features: ["Collaborative Programs", "Joint Resources", "Special Offers"]
  }
];

const categories = ["All", "Official", "Educational", "Study Resources", "Online Learning", "Study Tools"];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources = selectedCategory === "All" 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

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
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#e9f2b3]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Educational Resources
            </h1>
            <p className="text-xl text-[#e9f2b3] max-w-2xl mx-auto">
              Explore trusted educational resources and tools to enhance your learning journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-3xl font-bold text-[#a0b834] mb-2">{resources.length}+</div>
              <div className="text-gray-600">Educational Resources</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-3xl font-bold text-[#a0b834] mb-2">5</div>
              <div className="text-gray-600">Resource Categories</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-3xl font-bold text-[#a0b834] mb-2">100%</div>
              <div className="text-gray-600">Free Access</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#a0b834] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Educational Resources</h2>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{resource.logo}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {resource.name}
                        </h3>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-[#e9f2b3] text-[#5a7a1e] rounded-full">
                          {resource.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {resource.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <Star className="w-3 h-3 text-[#a0b834] mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#a0b834] text-white rounded-lg hover:bg-[#7d9929] transition-colors text-sm font-medium"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Oh no, nothing here yet!
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We're constantly adding new resources to this category. Please check back soon for exciting new educational tools and materials!
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="inline-flex items-center px-6 py-3 bg-[#a0b834] text-white rounded-lg hover:bg-[#7d9929] transition-colors font-medium"
              >
                View All Resources
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Partners</h2>
          <div className="flex justify-center">
            <div className="max-w-md">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4">{partner.logo}</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {partner.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {partner.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Partnership Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {partner.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center justify-center">
                            <Star className="w-4 h-4 text-[#a0b834] mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#a0b834] text-white rounded-lg hover:bg-[#7d9929] transition-colors font-medium"
                    >
                      Visit Partner
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#5a7a1e] to-[#a0b834]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
