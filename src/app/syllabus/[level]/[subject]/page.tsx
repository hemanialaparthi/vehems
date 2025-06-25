'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { subjects } from '@/config/subjects';
import { levels } from '@/config/levels';
import { Note } from '@/types';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ContactForm from '@/components/ContactForm';

export default function LevelSubjectPage() {
  const params = useParams();
  const levelId = params.level as string;
  const subjectId = params.subject as string;
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  const level = levels.find(l => l.id === levelId);
  const subject = subjects.find(s => s.id === subjectId);

  useEffect(() => {
    if (levelId && subjectId) {
      fetchNotes();
    }
  }, [levelId, subjectId]);

  const fetchNotes = async () => {
    try {
      const notesRef = collection(db, 'notes');
      // optimized query with orderBy (uses the composite index)
      const q = query(
        notesRef,
        where('subject', '==', subjectId),
        where('level', '==', levelId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedNotes: Note[] = [];
      
      querySnapshot.forEach((doc) => {
        const noteData = doc.data();
        fetchedNotes.push({
          id: doc.id,
          subject: noteData.subject,
          topic: noteData.topic,
          level: noteData.level || levelId,
          fileName: noteData.fileName,
          fileType: noteData.fileType,
          fileSize: noteData.fileSize,
          fileContent: noteData.fileContent,
          downloadURL: noteData.downloadURL,
          downloads: noteData.downloads || 0,
          createdAt: noteData.createdAt?.toDate() || new Date(),
          updatedAt: noteData.updatedAt?.toDate() || new Date(),
        } as Note);
      });
      
      // No JavaScript sorting needed - Firestore handles it with the index
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!level || !subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link
              href="/syllabus"
              className="text-[#a0b834] hover:text-[#7d9929] mr-2"
            >
              Syllabus
            </Link>
            <span className="text-gray-400 mx-2">→</span>
            <Link
              href={`/syllabus/${levelId}`}
              className="text-[#a0b834] hover:text-[#7d9929] mr-2"
            >
              {level.displayName}
            </Link>
            <span className="text-gray-400 mx-2">→</span>
            <span className="text-gray-600">{subject.name}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <div className={`w-20 h-20 ${subject.color} rounded-full flex items-center justify-center text-3xl mr-6`}>
              {subject.icon}
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${level.color} text-white mr-3`}>
                  {level.icon} {level.displayName}
                </span>
              </div>
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
                    className="inline-flex items-center bg-[#a0b834] text-white px-4 py-2 rounded-lg hover:bg-[#7d9929] transition-colors text-sm font-medium"
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
                We're working on adding comprehensive {level.displayName} notes for {subject.name}. 
                Check back soon for updates!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/syllabus/${levelId}`}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Explore Other Subjects
                </Link>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[#a0b834] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors"
                >
                  Request This Content
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Form Modal */}
        <ContactForm
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          subject={`${level.displayName} ${subject?.name}`}
          type="subject-request"
        />
      </div>
    </div>
  );
}
