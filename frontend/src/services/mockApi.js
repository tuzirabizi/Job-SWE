// Mock API service for development purposes
export const mockApi = {
  get: async (url, config = {}) => {
    console.log(`Mock GET request to: ${url}`, config);
    return mockResponse(url, 'GET');
  },
  
  post: async (url, data, config = {}) => {
    console.log(`Mock POST request to: ${url}`, data, config);
    return mockResponse(url, 'POST', data);
  },
  
  put: async (url, data, config = {}) => {
    console.log(`Mock PUT request to: ${url}`, data, config);
    return mockResponse(url, 'PUT', data);
  },
  
  delete: async (url, config = {}) => {
    console.log(`Mock DELETE request to: ${url}`, config);
    return mockResponse(url, 'DELETE');
  },
  
  patch: async (url, data, config = {}) => {
    console.log(`Mock PATCH request to: ${url}`, data, config);
    return mockResponse(url, 'PATCH', data);
  }
};

// Generate mock responses based on URL patterns
function mockResponse(url, method, data = null) {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Parse the URL to understand what resource is being requested
      if (url.includes('/api/analytics')) {
        resolve({ data: mockAnalyticsData(url, method, data) });
      } else if (url.includes('/api/content')) {
        resolve({ data: mockContentData(url, method, data) });
      } else if (url.includes('/api/users')) {
        resolve({ data: mockUsersData(url, method, data) });
      } else if (url.includes('/api/jobs')) {
        resolve({ data: mockJobsData(url, method, data) });
      } else if (url.includes('/api/learning')) {
        resolve({ data: mockLearningData(url, method, data) });
      } else {
        resolve({ data: { message: 'No mock data available for this endpoint' } });
      }
    }, 300); // Simulate 300ms of network latency
  });
}

// Mock data generators for different API endpoints
function mockAnalyticsData(url, method, data) {
  if (url.includes('/dashboard')) {
    return {
      pageViews: 1254,
      contentInteractions: 867,
      searches: 432,
      applications: 128,
      courseCompletions: 45,
      averageEngagementTime: '18m 23s',
      popularContent: [
        { id: 1, title: 'Introduction to React', views: 356 },
        { id: 2, title: 'JavaScript Fundamentals', views: 298 },
        { id: 3, title: 'UX Design Principles', views: 245 }
      ]
    };
  }
  
  return {
    events: [
      { type: 'page_view', timestamp: '2023-07-15T10:23:45Z', data: { page: '/jobs' } },
      { type: 'content_interaction', timestamp: '2023-07-15T10:25:12Z', data: { contentId: 123 } },
      { type: 'search', timestamp: '2023-07-15T10:30:18Z', data: { query: 'react developer' } }
    ],
    metrics: {
      pageViews: 89,
      contentInteractions: 45,
      searches: 12
    }
  };
}

function mockContentData(url, method, data) {
  if (method === 'GET') {
    if (url.includes('/search')) {
      return [
        { id: 1, title: 'Building a React App', type: 'course', category: 'Web Development' },
        { id: 2, title: 'React Interview Questions', type: 'article', category: 'Career' }
      ];
    }
    
    if (url.includes('/category')) {
      return [
        { id: 3, title: 'CSS Grid Fundamentals', type: 'course', category: 'Web Development' },
        { id: 4, title: 'Flexbox Layout Guide', type: 'tutorial', category: 'Web Development' }
      ];
    }
    
    return [
      { id: 1, title: 'Building a React App', type: 'course', category: 'Web Development' },
      { id: 2, title: 'JavaScript Promises', type: 'tutorial', category: 'Programming' },
      { id: 3, title: 'CSS Grid Fundamentals', type: 'course', category: 'Web Development' },
      { id: 4, title: 'Career Path: Frontend Developer', type: 'career-guide', category: 'Career' }
    ];
  }
  
  if (method === 'POST' || method === 'PUT') {
    return { ...data, id: Math.floor(Math.random() * 1000) + 1 };
  }
  
  if (method === 'DELETE') {
    return { success: true };
  }
  
  return { message: 'Operation successful' };
}

function mockUsersData(url, method, data) {
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'employer' }
  ];
}

function mockJobsData(url, method, data) {
  return [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$80,000 - $100,000' },
    { id: 2, title: 'UX Designer', company: 'DesignStudio', location: 'San Francisco', salary: '$90,000 - $120,000' },
    { id: 3, title: 'Data Scientist', company: 'DataWorks', location: 'New York', salary: '$100,000 - $130,000' }
  ];
}

function mockLearningData(url, method, data) {
  return [
    { id: 1, title: 'Introduction to React', duration: '4 hours', level: 'Beginner', author: 'Sarah Johnson' },
    { id: 2, title: 'Advanced JavaScript Patterns', duration: '6 hours', level: 'Advanced', author: 'Michael Chen' },
    { id: 3, title: 'UX Design Fundamentals', duration: '5 hours', level: 'Intermediate', author: 'Emily Rodriguez' }
  ];
} 