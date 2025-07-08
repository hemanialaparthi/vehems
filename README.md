# VeHems - IGCSE Notes Platform 🚀

A modern, full-stack web application for sharing IGCSE study notes and materials. Built with Next.js, Firebase, and Tailwind CSS.

## ✨ Features

### For Students

- **Subject Browse**: Visual subject grid with icons and descriptions
- **Search & Filter**: Easy navigation through notes by subject and topic
- **Easy Access**: Direct links to Google Drive for reliable file access
- **User Authentication**: Secure login with Google or email
- **Profile Management**: Track downloads and study progress
- **Responsive Design**: Works perfectly on desktop and mobile

### For Admins

- **Content Management**: Simple admin panel for adding notes via Google Drive links
- **Link Management**: Easy integration with Google Drive for unlimited file sizes
- **Note Organization**: Categorize by subject and topic
- **Analytics**: Track download counts and popular content
- **User Management**: Monitor user activity and engagement

### Technical Features

- **Modern UI**: Clean, animated interface with Framer Motion
- **Firebase Backend**: Firestore database, Authentication, and Storage
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Server-side rendering with Next.js
- **Performance**: Optimized loading and caching strategies

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vehems
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firefox Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable the following services:
     - **Authentication** (Email/Password and Google providers)
     - **Firestore Database**
     - **Storage**

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Admin email for admin panel access
   ADMIN_EMAIL=admin@yourdomain.com
   ```

5. **Set up Firestore Security Rules**

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /notes/{note} {
         allow read: if true; // Public read access
         allow create, update, delete: if request.auth != null; // Only authenticated users can modify
       }
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

6. **Set up Firebase Storage Rules (Optional)**

   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /notes/{allPaths=**} {
         allow read: if true; // Public read access for legacy files
         allow write: if request.auth != null; // Only authenticated users can upload legacy files
       }
     }
   }
   ```
   
   *Note: Firebase Storage is now only used for legacy file support. New notes use Google Drive links.*

7. **Start the development server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Next Steps

1. **Set up Firebase** - Replace placeholder values in `.env.local`
2. **Configure Admin Access** - Add your sister's email to admin settings
3. **Add First Notes** - Use the admin panel at `/admin` to add Google Drive links
4. **Deploy to Vercel** - Connect repository and deploy
5. **Test Everything** - Verify links, access, and user flows

**Note**: The application now uses Google Drive links instead of direct file uploads, eliminating the 1MB file size limitation and providing more reliable file hosting.

---
