export interface Note {
  id: string;
  subject: Subject;
  topic: string;
  downloadURL?: string; // Optional for backward compatibility
  fileName?: string; // For base64 storage
  fileType?: string; // For base64 storage
  fileSize?: number; // For base64 storage
  fileContent?: string; // Base64 encoded file content
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

export type Subject = 
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'mathematics'
  | 'english'
  | 'history'
  | 'geography'
  | 'economics'
  | 'business-studies'
  | 'computer-science';

export interface SubjectInfo {
  id: Subject;
  name: string;
  icon: string;
  color: string;
  description: string;
}
