'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Link as LinkIcon, FileText, Save, Trash2, Eye } from 'lucide-react';
import { subjects } from '@/config/subjects';
import { levels } from '@/config/levels';
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
  const [selectedLevel, setSelectedLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [driveLink, setDriveLink] = useState('');

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
        const noteData = doc.data();
        fetchedNotes.push({
          id: doc.id,
          subject: noteData.subject,
          level: noteData.level || 'gcse', // Default to GCSE for backward compatibility
          topic: noteData.topic,
          fileName: noteData.fileName,
          fileType: noteData.fileType,
          fileSize: noteData.fileSize,
          fileContent: noteData.fileContent,
          downloadURL: noteData.downloadURL,
          driveLink: noteData.driveLink, // Add driveLink field
          downloads: noteData.downloads || 0,
          createdAt: noteData.createdAt?.toDate() || new Date(),
          updatedAt: noteData.updatedAt?.toDate() || new Date(),
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
    
    if (!driveLink.trim() || !selectedSubject || !selectedLevel || !topic.trim()) {
      alert('Please fill in all fields including the Google Drive link.');
      return;
    }

    // Validate if it's a proper Google Drive link
    if (!isValidDriveLink(driveLink)) {
      alert('Please enter a valid Google Drive link. Make sure the link is publicly accessible.');
      return;
    }

    console.log('Starting note creation...');
    setUploading(true);

    try {
      // Save note data to Firestore with drive link
      const noteData = {
        subject: selectedSubject,
        level: selectedLevel,
        topic: topic.trim(),
        driveLink: driveLink.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        downloads: 0,
      };

      console.log('Saving to Firestore...');
      await addDoc(collection(db, 'notes'), noteData);
      console.log('Successfully saved to Firestore');

      // Reset form
      setSelectedSubject('');
      setSelectedLevel('');
      setTopic('');
      setDriveLink('');
      
      // Refresh notes list
      fetchNotes();
      
      alert('Note added successfully!');
    } catch (error) {
      console.error('Error adding note:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error adding note: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  // Helper function to validate Google Drive links
  const isValidDriveLink = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'drive.google.com' || 
             urlObj.hostname === 'docs.google.com' ||
             url.includes('drive.google.com') ||
             url.includes('docs.google.com');
    } catch {
      return false;
    }
  };

  // Helper function to handle file preview
  const handlePreview = (note: Note) => {
    if (note.driveLink) {
      // New Google Drive link - open directly
      window.open(note.driveLink, '_blank');
    } else if (note.fileContent) {
      // Legacy base64 stored file - create blob URL and open
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

  const handleDelete = async (note: Note) => {
    if (!confirm(`Are you sure you want to delete "${note.topic}"?`)) {
      return;
    }

    try {
      // Delete from Firestore
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
              <LinkIcon className="w-6 h-6 mr-2" />
              Add New Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834] text-gray-900"
                    required
                  >
                    <option value="" className="text-gray-900">Select level</option>
                    {levels.map((level) => (
                      <option key={level.id} value={level.id} className="text-gray-900">
                        {level.icon} {level.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834] text-gray-900"
                    required
                  >
                    <option value="" className="text-gray-900">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id} className="text-gray-900">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834] text-gray-900 placeholder-gray-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Drive Link
                </label>
                <input
                  type="url"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834] text-gray-900 placeholder-gray-600"
                  required
                />
                {driveLink && !isValidDriveLink(driveLink) && (
                  <p className="text-sm text-red-600 mt-1">
                    ⚠️ Please enter a valid Google Drive link
                  </p>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  <p className="font-medium mb-1">📋 How to get a shareable Google Drive link:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Upload your PDF to Google Drive</li>
                    <li>Right-click the file and select "Share"</li>
                    <li>Change access to "Anyone with the link"</li>
                    <li>Set permission to "Viewer"</li>
                    <li>Copy and paste the link here</li>
                  </ol>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-[#a0b834] text-white py-3 rounded-lg font-semibold hover:bg-[#7d9929] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Note...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Add Note
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Level</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Topic</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Downloads</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note) => {
                      const subject = subjects.find(s => s.id === note.subject);
                      const level = levels.find(l => l.id === note.level);
                      return (
                        <tr key={note.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">
                            <div className="flex items-center">
                              <span className="mr-2">{level?.icon || '🎓'}</span>
                              <span className="font-medium text-gray-900">{level?.displayName || 'GCSE'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            <div className="flex items-center">
                              <span className="mr-2">{subject?.icon}</span>
                              <span className="text-gray-900">{subject?.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">{note.topic}</td>
                          <td className="py-3 px-4">
                            {note.driveLink ? (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                🔗 Drive Link
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                                📄 Legacy File
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {note.createdAt.toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
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
