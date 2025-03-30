import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CareerPaths = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Paths' },
    { id: 'tech', label: 'Technology' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'product', label: 'Product & Design' },
    { id: 'business', label: 'Business' }
  ];

  const careerPaths = [
    {
      id: 1,
      title: 'Software Engineering',
      description: 'Build scalable applications and systems using modern technologies.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      levels: [
        {
          title: 'Junior Developer',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
          salary: '$60k - $90k',
          duration: '1-2 years'
        },
        {
          title: 'Mid-Level Developer',
          skills: ['TypeScript', 'AWS', 'Docker', 'CI/CD'],
          salary: '$90k - $120k',
          duration: '2-4 years'
        },
        {
          title: 'Senior Developer',
          skills: ['System Design', 'Microservices', 'Cloud Architecture'],
          salary: '$120k - $160k',
          duration: '4-6 years'
        },
        {
          title: 'Lead Developer',
          skills: ['Team Leadership', 'Technical Strategy', 'Architecture Design'],
          salary: '$160k - $200k',
          duration: '6+ years'
        }
      ]
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Analyze complex data sets and build predictive models.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      levels: [
        {
          title: 'Data Analyst',
          skills: ['SQL', 'Python', 'Data Visualization', 'Statistics'],
          salary: '$70k - $90k',
          duration: '1-2 years'
        },
        {
          title: 'Data Scientist',
          skills: ['Machine Learning', 'Deep Learning', 'Big Data', 'R'],
          salary: '$90k - $130k',
          duration: '2-4 years'
        },
        {
          title: 'Senior Data Scientist',
          skills: ['MLOps', 'Advanced Analytics', 'Team Leadership'],
          salary: '$130k - $170k',
          duration: '4-6 years'
        },
        {
          title: 'Data Science Manager',
          skills: ['Project Management', 'Team Building', 'Strategic Planning'],
          salary: '$170k - $220k',
          duration: '6+ years'
        }
      ]
    },
    {
      id: 3,
      title: 'Product Management',
      description: 'Lead product development and strategy for innovative solutions.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      levels: [
        {
          title: 'Associate Product Manager',
          skills: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
          salary: '$80k - $100k',
          duration: '1-2 years'
        },
        {
          title: 'Product Manager',
          skills: ['Product Roadmap', 'Stakeholder Management', 'Market Analysis'],
          salary: '$100k - $140k',
          duration: '2-4 years'
        },
        {
          title: 'Senior Product Manager',
          skills: ['Product Vision', 'Team Leadership', 'Business Strategy'],
          salary: '$140k - $180k',
          duration: '4-6 years'
        },
        {
          title: 'Product Director',
          skills: ['Portfolio Management', 'Executive Leadership', 'Innovation'],
          salary: '$180k - $250k',
          duration: '6+ years'
        }
      ]
    }
  ];

  const filteredPaths = careerPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'tech' && path.id === 1) ||
                         (selectedFilter === 'data' && path.id === 2) ||
                         (selectedFilter === 'product' && path.id === 3);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Career Paths
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Explore different career trajectories and plan your professional growth.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search career paths..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                    selectedFilter === filter.id
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex-shrink-0">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Sort by: Popular</option>
                <option>Sort by: Salary Range</option>
                <option>Sort by: Growth Potential</option>
                <option>Sort by: Entry Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Career Paths Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                selectedPath === path.id ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {path.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{path.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{path.description}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {selectedPath === path.id ? 'Hide Details' : 'View Career Path'}
                  </button>
                </div>
              </div>

              {/* Career Levels */}
              {selectedPath === path.id && (
                <div className="border-t border-gray-200">
                  <div className="px-6 py-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Career Progression
                    </h4>
                    <div className="mt-4 space-y-6">
                      {path.levels.map((level, index) => (
                        <div key={index} className="relative">
                          <div className="absolute left-0 top-0 h-full w-0.5 bg-indigo-200" />
                          <div className="relative pl-6">
                            <div className="flex items-center">
                              <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-indigo-500" />
                              <h5 className="text-lg font-medium text-gray-900">{level.title}</h5>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center text-sm text-gray-500">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {level.salary}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {level.duration}
                              </div>
                            </div>
                            <div className="mt-4">
                              <h6 className="text-sm font-medium text-gray-500">Required Skills</h6>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {level.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start your career journey?</span>
            <span className="block">Create your development plan today.</span>
          </h2>
          <p className="mt-6 text-lg leading-6 text-indigo-200">
            Get personalized guidance and track your progress towards your career goals.
          </p>
          <Link
            to="/profile/development-plan"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Create Development Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerPaths; 