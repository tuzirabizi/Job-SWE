export const mockUsers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    role: 'student',
    fullName: 'John Doe'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    role: 'student',
    fullName: 'Jane Smith'
  }
];

export const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    description: 'Looking for an experienced frontend developer',
    requirements: 'React, TypeScript, 5+ years experience',
    location: 'New York, NY',
    salaryRange: '$100,000 - $150,000',
    jobType: 'full-time',
    status: 'active'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'StartUp Inc',
    description: 'Join our growing team',
    requirements: 'Node.js, PostgreSQL, 3+ years experience',
    location: 'Remote',
    salaryRange: '$80,000 - $120,000',
    jobType: 'full-time',
    status: 'active'
  }
];

export const mockStudents = [
  {
    id: 1,
    userId: 1,
    fullName: 'John Doe',
    bio: 'Passionate software developer',
    skills: ['JavaScript', 'React', 'Node.js'],
    education: 'BS Computer Science',
    experience: '2 years experience'
  },
  {
    id: 2,
    userId: 2,
    fullName: 'Jane Smith',
    bio: 'Full stack developer',
    skills: ['Python', 'Django', 'PostgreSQL'],
    education: 'MS Software Engineering',
    experience: '3 years experience'
  }
];

export const mockJobApplications = [
  {
    id: 1,
    jobId: 1,
    studentId: 1,
    status: 'pending',
    coverLetter: 'I am excited to apply for this position...'
  }
];

export const mockAnalyticsData = {
  pageViews: 1234,
  contentInteractions: 567,
  applications: 89,
  courseCompletions: 45,
  pageViewsOverTime: [
    { date: '2024-03-01', views: 120 },
    { date: '2024-03-02', views: 150 },
    { date: '2024-03-03', views: 180 },
    { date: '2024-03-04', views: 200 },
    { date: '2024-03-05', views: 220 },
    { date: '2024-03-06', views: 250 },
    { date: '2024-03-07', views: 280 }
  ],
  contentDistribution: [
    { name: 'Courses', value: 40 },
    { name: 'Articles', value: 25 },
    { name: 'Videos', value: 20 },
    { name: 'Quizzes', value: 15 }
  ],
  applicationStatus: [
    { status: 'Pending', count: 30 },
    { status: 'In Review', count: 25 },
    { status: 'Accepted', count: 20 },
    { status: 'Rejected', count: 14 }
  ],
  courseCompletionRate: [
    { course: 'Web Development', completionRate: 85 },
    { course: 'Data Science', completionRate: 75 },
    { course: 'UI/UX Design', completionRate: 90 },
    { course: 'Mobile Development', completionRate: 80 },
    { course: 'Cloud Computing', completionRate: 70 }
  ]
};

export const mockContent = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of web development with HTML, CSS, and JavaScript',
    type: 'course',
    category: 'Web Development',
    content: 'Course content goes here...'
  },
  {
    id: 2,
    title: 'Best Practices for UI/UX Design',
    description: 'Essential principles and practices for creating user-friendly interfaces',
    type: 'article',
    category: 'Design',
    content: 'Article content goes here...'
  },
  {
    id: 3,
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript features and patterns',
    type: 'video',
    category: 'Programming',
    content: 'Video content goes here...'
  },
  {
    id: 4,
    title: 'Data Structures Quiz',
    description: 'Test your knowledge of fundamental data structures',
    type: 'quiz',
    category: 'Computer Science',
    content: 'Quiz content goes here...'
  }
];

export const mockResumes = [
  {
    id: 1,
    userId: 1,
    title: 'Software Developer Resume',
    template: 'modern',
    sections: {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        location: 'New York, NY'
      },
      summary: 'Experienced software developer with expertise in full-stack development...',
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Developer',
          duration: '2020 - Present',
          description: 'Led development of multiple web applications...'
        }
      ],
      education: [
        {
          school: 'University of Technology',
          degree: 'BS Computer Science',
          year: '2018'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
    },
    createdAt: '2024-03-01T10:00:00Z'
  }
];

export const mockInternalJobs = [
  {
    id: 1,
    companyId: 1,
    title: 'Senior Software Architect',
    department: 'Engineering',
    location: 'New York, NY',
    description: 'Lead the architectural design of our core systems...',
    requirements: '10+ years experience, strong system design skills...',
    type: 'internal',
    status: 'open',
    postedAt: '2024-03-01T10:00:00Z',
    deadline: '2024-04-01T10:00:00Z'
  }
];

export const mockCareerPaths = [
  {
    id: 1,
    companyId: 1,
    title: 'Software Engineering Track',
    levels: [
      {
        level: 'Junior Developer',
        requirements: ['BS in CS or related field', '1-2 years experience'],
        skills: ['Basic programming', 'Web development']
      },
      {
        level: 'Senior Developer',
        requirements: ['5+ years experience', 'Strong system design'],
        skills: ['System architecture', 'Team leadership']
      }
    ]
  }
];

export const mockInterviews = [
  {
    id: 1,
    jobId: 1,
    candidateId: 1,
    type: 'technical',
    status: 'scheduled',
    date: '2024-03-15T14:00:00Z',
    duration: 60,
    interviewers: [2, 3],
    format: 'video',
    meetingLink: 'https://zoom.us/j/123456789'
  }
];

export const mockInterviewFeedback = [
  {
    id: 1,
    interviewId: 1,
    interviewerId: 2,
    rating: 4.5,
    strengths: ['Strong technical knowledge', 'Good communication'],
    areasForImprovement: ['System design could be stronger'],
    notes: 'Promising candidate with good potential...',
    recommendation: 'hire',
    createdAt: '2024-03-15T15:30:00Z'
  }
];

export const mockScreeningResults = [
  {
    id: 1,
    candidateId: 1,
    jobId: 1,
    technicalScore: 85,
    communicationScore: 90,
    experienceMatch: 95,
    skillsMatch: 88,
    overallScore: 89.5,
    status: 'passed',
    completedAt: '2024-03-10T12:00:00Z'
  }
]; 