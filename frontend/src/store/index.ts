import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobsReducer from './slices/jobsSlice';
import learningReducer from './slices/learningSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobsReducer,
    learning: learningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 