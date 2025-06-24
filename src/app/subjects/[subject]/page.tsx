'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { subjects } from '@/config/subjects';
import { Note } from '@/types';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SubjectPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const subject = subjects.find(s => s.id === subjectId);

  useEffect(() => {
    if (subjectId) {
      fetchNotes();
    }
  }, [subjectId]);

  const fetchNotes = async () => {
    try {
      const notesRef = collection(db, 'notes');
      const q = query(
        notesRef,
        where('subject', '==', subjectId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedNotes: Note[] = [];
      
      querySnapshot.forEach((doc) => {
        fetchedNotes.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Note);
      });
      
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
          <Link
            href="/subjects"
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/subjects"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Link>
          
          <div className="flex items-center mb-4">
            <div className={`w-20 h-20 ${subject.color} rounded-full flex items-center justify-center text-3xl mr-6`}>
              {subject.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {subject.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {subject.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Notes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {note.topic}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {note.createdAt.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {note.downloads || 0} downloads
                  </span>
                  
                  <Link
                    href={`/notes/${note.id}`}
                    className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    View
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-xl p-12 shadow-lg max-w-md mx-auto">
              <div className={`w-20 h-20 ${subject.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-6`}>
                {subject.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Notes Available Yet
              </h2>
              <p className="text-gray-600 mb-6">
                We're working on adding comprehensive notes for {subject.name}. 
                Check back soon for updates!
              </p>
              <Link
                href="/subjects"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-block"
              >
                Explore Other Subjects
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
