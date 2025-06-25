'use client';

import { useAuth } from '@/contexts/AuthContext';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error with email authentication:', error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-[#a0b834]">
                Vehems
              </div>
              <div className="text-sm text-gray-500 hidden sm:block">
                Study Notes Platform
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/syllabus" className="text-gray-700 hover:text-[#a0b834] transition-colors">
                Syllabus
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#a0b834] transition-colors">
                About
              </Link>
              {user && (
                <Link href="/profile" className="text-gray-700 hover:text-[#a0b834] transition-colors">
                  Profile
                </Link>
              )}
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.displayName || user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-[#a0b834] text-white px-4 py-2 rounded-lg hover:bg-[#7d9929] transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#a0b834]"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/syllabus" 
                className="block px-3 py-2 text-gray-700 hover:text-[#a0b834]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Syllabus
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-700 hover:text-[#a0b834]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {user && (
                <Link 
                  href="/profile" 
                  className="block px-3 py-2 text-gray-700 hover:text-[#a0b834]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
              
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-[#a0b834] text-white rounded-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834] text-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0b834] text-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a0b834] text-white py-2 rounded-lg hover:bg-[#7d9929] transition-colors font-medium"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-black">Or</span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sign in with Google
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#a0b834] hover:text-[#7d9929] text-sm font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
