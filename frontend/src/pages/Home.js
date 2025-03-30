import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import Banner from '../components/common/Banner';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner */}
      <Banner
        title="CareerHub"
        subtitle="Your comprehensive career development platform"
        buttonText="Get Started"
        buttonLink="/jobs"
        backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1907&q=80"
      />

      {/* Features Section */}
      <Section
        title="All-in-One Career Platform"
        subtitle="Everything you need to advance your career"
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card hover-scale">
            <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
            <p className="text-gray-600">
              Access custom learning paths tailored to your career goals and skill level.
            </p>
          </div>
          
          <div className="card hover-scale">
            <h3 className="text-xl font-semibold mb-3">Job Marketplace</h3>
            <p className="text-gray-600">
              Browse thousands of opportunities matched to your skills and preferences.
            </p>
          </div>
          
          <div className="card hover-scale">
            <h3 className="text-xl font-semibold mb-3">Professional Network</h3>
            <p className="text-gray-600">
              Connect with industry professionals, mentors, and potential employers.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gray-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to take the next step?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who are already growing their careers with us.
          </p>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Your Profile
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home; 