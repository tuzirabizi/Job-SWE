import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  progress: number;
  image: string;
  tags: string[];
  isLocked: boolean;
  modules: CourseModule[];
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  completed: boolean;
  quiz?: Quiz;
}

interface Quiz {
  id: string;
  questions: Question[];
  score?: number;
  completed: boolean;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface LearningState {
  courses: Course[];
  currentCourse: Course | null;
  learningPath: {
    id: string;
    title: string;
    description: string;
    courses: string[];
    progress: number;
  } | null;
  statistics: {
    totalHours: number;
    completedCourses: number;
    skillsAcquired: number;
    currentStreak: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: LearningState = {
  courses: [],
  currentCourse: null,
  learningPath: null,
  statistics: {
    totalHours: 0,
    completedCourses: 0,
    skillsAcquired: 0,
    currentStreak: 0,
  },
  loading: false,
  error: null,
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    updateCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
      }
    },
    setCurrentCourse: (state, action: PayloadAction<Course | null>) => {
      state.currentCourse = action.payload;
    },
    updateLessonProgress: (state, action: PayloadAction<{
      courseId: string;
      moduleId: string;
      lessonId: string;
      completed: boolean;
    }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        const module = course.modules.find(m => m.id === action.payload.moduleId);
        if (module) {
          const lesson = module.lessons.find(l => l.id === action.payload.lessonId);
          if (lesson) {
            lesson.completed = action.payload.completed;
          }
        }
      }
    },
    setLearningPath: (state, action: PayloadAction<LearningState['learningPath']>) => {
      state.learningPath = action.payload;
    },
    updateLearningPathProgress: (state, action: PayloadAction<number>) => {
      if (state.learningPath) {
        state.learningPath.progress = action.payload;
      }
    },
    updateStatistics: (state, action: PayloadAction<Partial<LearningState['statistics']>>) => {
      state.statistics = { ...state.statistics, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourseProgress,
  setCurrentCourse,
  updateLessonProgress,
  setLearningPath,
  updateLearningPathProgress,
  updateStatistics,
  setLoading,
  setError,
} = learningSlice.actions;

export default learningSlice.reducer; 