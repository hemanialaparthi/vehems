export interface Note {
  id: string;
  subject: Subject;
  level: AcademicLevel;
  topic: string;
  downloadURL?: string; // Optional for backward compatibility
  fileName?: string; // For base64 storage
  fileType?: string; // For base64 storage
  fileSize?: number; // For base64 storage
  fileContent?: string; // Base64 encoded file content
  driveLink?: string; // Google Drive link for new notes
  createdAt: Date;
  updatedAt: Date;
  downloads?: number;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  joinedAt: Date;
  savedNotes?: string[]; // Array of note IDs
}

export type AcademicLevel = 'gcse' | 'as-level' | 'a-level';

export type Subject = 
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'mathematics'
  | 'additional-mathematics'
  | 'geography'
  | 'business-studies'
  | 'ict'


export interface SubjectInfo {
  id: Subject;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface LevelInfo {
  id: AcademicLevel;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
}
