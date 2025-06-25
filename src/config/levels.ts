import { AcademicLevel } from '@/types';

export interface LevelInfo {
  id: AcademicLevel;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
}

export const levels: LevelInfo[] = [
  {
    id: 'gcse',
    name: 'GCSE',
    displayName: 'GCSE',
    description: 'General Certificate of Secondary Education',
    icon: '🎓',
    color: 'bg-blue-500'
  },
  {
    id: 'as-level',
    name: 'AS Level',
    displayName: 'AS Level',
    description: 'Advanced Subsidiary Level',
    icon: '📖',
    color: 'bg-green-500'
  },
  {
    id: 'a-level',
    name: 'A Level',
    displayName: 'A Level',
    description: 'Advanced Level',
    icon: '🏆',
    color: 'bg-purple-500'
  }
];

export const getLevelInfo = (levelId: AcademicLevel): LevelInfo | undefined => {
  return levels.find(level => level.id === levelId);
};
