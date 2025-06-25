'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, FileText, Save, Trash2, Eye } from 'lucide-react';
import { subjects } from '@/config/subjects';
import { Note } from '@/types';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  serverTimestamp,
  orderBy,
  query 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  // Form state
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin(user.email))) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && isAdmin(user.email)) {
      fetchNotes();
    }
  }, [user]);

  const isAdmin = (email: string | null) => {
    // Check if the user is an admin (you can add your sister's email here)
    const adminEmails = [
      process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      'vedapurnithaalaparthi@gmail.com', // Primary admin email
      'vedapurnithalaparthi@gmail.com', // Alternative spelling (backup)
      'admin@vehems.com',
      // Add more admin emails as needed
    ];
    return email && adminEmails.includes(email);
  };

  const fetchNotes = async () => {
    try {
      const notesRef = collection(db, 'notes');
      const q = query(notesRef, orderBy('createdAt', 'desc'));
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
      setLoadingNotes(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !selectedSubject || !topic.trim()) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    // Check file size (Firestore has a 1MB document limit)
    if (file.size > 1024 * 1024) { // 1MB limit
      alert('File size must be less than 1MB due to Firestore limitations. Please use a smaller PDF file.');
      return;
    }

    console.log('Starting upload process...');
    setUploading(true);

    try {
      // Convert file to base64
      console.log('Converting file to base64...');
      const base64String = await convertFileToBase64(file);
      console.log('File converted to base64 successfully');

      // Save note data to Firestore with base64 content
      const noteData = {
        subject: selectedSubject,
        topic: topic.trim(),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileContent: base64String, // Store file as base64
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        downloads: 0,
      };

      console.log('Saving to Firestore...');
      await addDoc(collection(db, 'notes'), noteData);
      console.log('Successfully saved to Firestore');

      // Reset form
      setSelectedSubject('');
      setTopic('');
      setFile(null);
      
      // Refresh notes list
      fetchNotes();
      
      alert('Note uploaded successfully!');
    } catch (error) {
      console.error('Error uploading note:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error uploading note: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  // Helper function to handle file preview
  const handlePreview = (note: Note) => {
    if (note.fileContent) {
      // Base64 stored file - create blob URL and open
      const byteCharacters = atob(note.fileContent.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: note.fileType || 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      // Clean up the URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else if (note.downloadURL) {
      // Legacy Firebase Storage file
      window.open(note.downloadURL, '_blank');
    }
  };

  // Helper function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = async (note: Note) => {
    if (!confirm(`Are you sure you want to delete "${note.topic}"?`)) {
      return;
    }

    try {
      // Delete from Firestore (files are stored as base64 in the document)
      await deleteDoc(doc(db, 'notes', note.id));
      
      // Refresh notes list
      fetchNotes();
      
      alert('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a0b834] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#a0b834] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors"
          >
            Go Home
          </button>
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
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-600">
                Welcome, {user.displayName || user.email}! Manage notes and content here.
              </p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              🔐 Admin Access
            </div>
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-2" />
              Upload New Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834]"
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.icon} {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Photosynthesis, Atomic Structure"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File (Max 1MB)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834]"
                  required
                />
                {file && (
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">
                      Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    {file.size > 1024 * 1024 && (
                      <p className="text-sm text-red-600">
                        ⚠️ File is too large! Maximum size is 1MB due to Firestore limitations.
                      </p>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Note: Using Firebase free plan (Spark) - files are stored as Base64 in Firestore with 1MB limit per document.
                </p>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-[#a0b834] text-white py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Upload Note
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Notes List */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Manage Notes ({notes.length})
            </h2>

            {loadingNotes ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a0b834] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading notes...</p>
              </div>
            ) : notes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Topic</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Downloads</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note) => {
                      const subject = subjects.find(s => s.id === note.subject);
                      return (
                        <tr key={note.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="mr-2">{subject?.icon}</span>
                              {subject?.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{note.topic}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {note.createdAt.toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {note.downloads || 0}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handlePreview(note)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(note)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Notes Yet
                </h3>
                <p className="text-gray-600">
                  Upload your first note using the form above.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
