'use client';

import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Calendar, Download, BookmarkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mr-6">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-indigo-600" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.displayName || 'Student'}
                </h1>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              </div>
            </div>

            {/* Member Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              ✨ Vehems Member
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-gray-600">Downloads</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <BookmarkIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-gray-600">Saved Notes</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Active</div>
              <div className="text-gray-600">Status</div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Activity Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start downloading notes to see your activity here.
              </p>
              <Link
                href="/subjects"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-block"
              >
                Explore Subjects
              </Link>
            </div>
          </motion.div>

          {/* Future Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">
              🚀 Coming Soon
            </h3>
            <ul className="text-indigo-800 space-y-1">
              <li>• Download history and analytics</li>
              <li>• Bookmark your favorite notes</li>
              <li>• Request specific topics</li>
              <li>• Early access to new notes</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
