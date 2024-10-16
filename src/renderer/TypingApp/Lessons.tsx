import { Lesson } from './Lesson';

// Type for the lessons grouped by level
export interface Lessons {
  lessons: {
    [level: string]: Lesson[];
  };
}
