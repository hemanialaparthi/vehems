import { SubjectInfo } from '@/types';

export const subjects: SubjectInfo[] = [
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: 'bg-green-500',
    description: 'Life sciences, genetics, and biological processes'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '⚗️',
    color: 'bg-blue-500',
    description: 'Chemical reactions, molecular structures, and compounds'
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    color: 'bg-purple-500',
    description: 'Forces, energy, motion, and physical phenomena'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'bg-red-500',
    description: 'Algebra, geometry, calculus, and mathematical reasoning'
  },
  {
    id: 'additional-mathematics',
    name: 'Additional Mathematics',
    icon: '📚',
    color: 'bg-yellow-500',
    description: 'Advanced mathematical concepts including calculus, statistics, and complex problem-solving'
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    color: 'bg-emerald-500',
    description: 'Physical geography, human settlements, and environmental studies'
  },
  {
    id: 'business-studies',
    name: 'Business Studies',
    icon: '💼',
    color: 'bg-slate-600',
    description: 'Business operations, management, and entrepreneurship'
  },
  {
    id: 'ict',
    name: 'ICT',
    icon: '💻',
    color: 'bg-cyan-500',
    description: 'Programming, algorithms, and computational thinking'
  }
];

// Define which subjects are available for each level
export const levelSubjects = {
  'gcse': [
    'biology', 'chemistry', 'physics', 'mathematics', 'additional-mathematics',
    'geography', 'business-studies', 'ict'
  ],
  'as-level': [
    'mathematics', 'biology', 'chemistry', 'physics'
  ],
  'a-level': [
    'mathematics', 'biology', 'chemistry', 'physics'
  ]
} as const;

// Helper function to get subjects for a specific level
export const getSubjectsForLevel = (levelId: string): SubjectInfo[] => {
  const levelSubjectIds = levelSubjects[levelId as keyof typeof levelSubjects];
  if (!levelSubjectIds) return [];
  
  return subjects.filter(subject => 
    levelSubjectIds.includes(subject.id as any)
  );
};

// Helper function to get available levels for a subject
export const getLevelsForSubject = (subjectId: string): string[] => {
  const availableLevels: string[] = [];
  
  Object.entries(levelSubjects).forEach(([level, subjects]) => {
    if (subjects.includes(subjectId as any)) {
      availableLevels.push(level);
    }
  });
  
  return availableLevels;
};
