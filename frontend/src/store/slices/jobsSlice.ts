import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
  postedDate: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}

interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
  appliedDate: string;
  notes?: string;
}

interface JobsState {
  jobs: Job[];
  applications: JobApplication[];
  filters: {
    searchQuery: string;
    jobType: string;
    location: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  applications: [],
  filters: {
    searchQuery: '',
    jobType: 'all',
    location: '',
  },
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    setApplications: (state, action: PayloadAction<JobApplication[]>) => {
      state.applications = action.payload;
    },
    addApplication: (state, action: PayloadAction<JobApplication>) => {
      state.applications.push(action.payload);
    },
    updateApplicationStatus: (state, action: PayloadAction<{ id: string; status: JobApplication['status'] }>) => {
      const application = state.applications.find(app => app.id === action.payload.id);
      if (application) {
        application.status = action.payload.status;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
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
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setApplications,
  addApplication,
  updateApplicationStatus,
  setFilters,
  setLoading,
  setError,
} = jobsSlice.actions;

export default jobsSlice.reducer; 