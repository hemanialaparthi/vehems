'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Note } from '@/types';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { subjects } from '@/config/subjects';
import { useAuth } from '@/contexts/AuthContext';
import { showLoginModal } from '@/lib/auth-utils';

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const noteId = params.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // User is not logged in, show login prompt
        setShowLoginPrompt(true);
        setLoading(false);
      } else {
        // User is logged in, hide login prompt and fetch the note
        setShowLoginPrompt(false);
        if (noteId) {
          setLoading(true); // Set loading when starting to fetch
          fetchNote();
        }
      }
    }
  }, [noteId, user, authLoading]);

  const fetchNote = async () => {
    try {
      const noteRef = doc(db, 'notes', noteId);
      const noteSnap = await getDoc(noteRef);
      
      if (noteSnap.exists()) {
        const noteData = {
          id: noteSnap.id,
          ...noteSnap.data(),
          createdAt: noteSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: noteSnap.data().updatedAt?.toDate() || new Date(),
        } as Note;
        setNote(noteData);
      } else {
        router.push('/subjects');
      }
    } catch (error: any) {
      console.error('Error fetching note:', error);
      // If there's a permission error, show login prompt
      if (error?.code === 'permission-denied') {
        setShowLoginPrompt(true);
      } else {
        router.push('/subjects');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!note) return;
    
    try {
      // Increment download counter
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        downloads: increment(1)
      });
      
      // Update local state
      setNote(prev => prev ? { ...prev, downloads: (prev.downloads || 0) + 1 } : null);
      
      // Handle download based on storage type
      if (note.driveLink) {
        // New Google Drive link - open in new tab
        window.open(note.driveLink, '_blank');
      } else if (note.fileContent) {
        // Legacy base64 stored file - create blob and download
        const byteCharacters = atob(note.fileContent.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: note.fileType || 'application/pdf' });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = note.fileName || `${note.topic}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else if (note.downloadURL) {
        // Legacy Firebase Storage file - open in new tab
        window.open(note.downloadURL, '_blank');
      }
    } catch (error) {
      console.error('Error accessing file:', error);
      alert('Error accessing file. Please try again.');
    }
  };

  const subject = note ? subjects.find(s => s.id === note.subject) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a0b834] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (showLoginPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto px-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#e9f2b3] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h1>
            
            <p className="text-gray-600 mb-6">
              You need to be logged in to access study notes. Please sign in or create an account to continue.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={showLoginModal}
                className="bg-[#a0b834] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors"
              >
                Sign In / Sign Up
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="text-[#a0b834] hover:text-[#7d9929] flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!note || !subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Note Not Found</h1>
          <Link
            href="/subjects"
            className="text-[#a0b834] hover:text-[#7d9929]"
          >
            ← Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <Link href="/subjects" className="hover:text-[#a0b834]">
              Subjects
            </Link>
            <span className="mx-2">›</span>
            <Link 
              href={`/subjects/${subject.id}`} 
              className="hover:text-[#a0b834]"
            >
              {subject.name}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{note.topic}</span>
          </div>

          {/* Back Button */}
          <Link
            href={`/subjects/${subject.id}`}
            className="inline-flex items-center text-[#a0b834] hover:text-[#7d9929] mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {subject.name}
          </Link>

          {/* Note Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-2xl mr-4`}>
                  {subject.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {note.topic}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {subject.name} • IGCSE Notes
                  </p>
                </div>
              </div>
            </div>

            {/* Note Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Added {note.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                <span>{note.downloads || 0} downloads</span>
              </div>
              {note.driveLink && (
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    🔗 Google Drive
                  </span>
                </div>
              )}
            </div>

            {/* Download Section */}
            <div className="border-t pt-6">
              {note.driveLink ? (
                <div className="flex justify-center">
                  <button
                    onClick={handleDownload}
                    className="bg-[#a0b834] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Open in Google Drive
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-[#a0b834] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Preview
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-3 text-center">
                {note.driveLink 
                  ? 'Click to open the file in Google Drive where you can view, download, or print it'
                  : 'Click to download or preview the PDF in a new tab'
                }
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#e9f2b3] border border-[#c5d86c] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[#5a7a1e] mb-2">
              📚 Study Tips
            </h2>
            <ul className="text-[#7d9929] space-y-1">
              <li>• Review the notes multiple times for better retention</li>
              <li>• Create your own summary after reading</li>
              <li>• Practice with past papers to test your understanding</li>
              <li>• Join study groups to discuss complex topics</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
