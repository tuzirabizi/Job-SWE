import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
  profile: {
    bio: string;
    location: string;
    phone: string;
    skills: Array<{
      id: string;
      name: string;
      level: string;
    }>;
    experience: Array<{
      id: string;
      title: string;
      company: string;
      period: string;
      description: string;
    }>;
  } | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    setProfile: (state, action: PayloadAction<UserState['profile']>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserState['profile']>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
      state.profile = null;
    },
  },
});

export const { setUser, setProfile, updateProfile, logout } = userSlice.actions;
export default userSlice.reducer; 