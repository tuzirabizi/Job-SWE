import { mockApi } from './mockApi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || true; // Default to mock data for now

// Helper function for making API requests
async function apiRequest(endpoint, options = {}) {
  try {
    if (USE_MOCK_DATA) {
      // Use the mockApi service
      const method = options.method || 'GET';
      const body = options.body ? JSON.parse(options.body) : null;
      
      switch (method) {
        case 'GET':
          return await mockApi.get(endpoint, { params: options.params });
        case 'POST':
          return await mockApi.post(endpoint, body);
        case 'PUT':
          return await mockApi.put(endpoint, body);
        case 'DELETE':
          return await mockApi.delete(endpoint);
        default:
          return await mockApi.get(endpoint);
      }
    }
    
    const url = `${API_URL}${endpoint}`;
    console.log(`Making API request to: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Auth API
export const login = (credentials) => apiRequest('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const register = (userData) => apiRequest('/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData),
});

// Users API
export const getUsers = () => apiRequest('/users');
export const getUser = (id) => apiRequest(`/users/${id}`);
export const updateUser = (id, data) => apiRequest(`/users/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

// Jobs API
export const getJobs = (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/jobs?${queryParams}`);
};
export const getJob = (id) => apiRequest(`/jobs/${id}`);
export const createJob = (jobData) => apiRequest('/jobs', {
  method: 'POST',
  body: JSON.stringify(jobData),
});

// Learning content API
export const getCourses = (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/learning/courses?${queryParams}`);
};
export const getCourse = (id) => apiRequest(`/learning/courses/${id}`);

// Analytics API
export const getUserAnalytics = (userId) => apiRequest(`/analytics/users/${userId}`);
export const getPlatformAnalytics = () => apiRequest('/analytics/platform');

// Mock API implementation for development
function mockAPI(endpoint, options = {}) {
  console.log('Using mock API for:', endpoint);
  // Implement mock data responses here based on endpoint
  // This could be expanded with more comprehensive mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint.includes('/users')) {
        resolve({ users: mockUsers });
      } else if (endpoint.includes('/jobs')) {
        resolve({ jobs: mockJobs });
      } else if (endpoint.includes('/auth/login')) {
        resolve({ token: 'mock-jwt-token', user: mockUsers[0] });
      } else if (endpoint.includes('/learning/courses')) {
        resolve({ courses: mockCourses });
      } else {
        resolve({ message: 'Mock data not implemented for this endpoint' });
      }
    }, 500);
  });
}

// Mock data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'employer' },
];

const mockJobs = [
  { id: 1, title: 'Software Developer', company: 'Tech Corp', location: 'Remote' },
  { id: 2, title: 'UX Designer', company: 'Design Studio', location: 'New York' },
];

const mockCourses = [
  { id: 1, title: 'Introduction to React', category: 'Web Development', level: 'Beginner' },
  { id: 2, title: 'Advanced JavaScript', category: 'Programming', level: 'Advanced' },
]; 