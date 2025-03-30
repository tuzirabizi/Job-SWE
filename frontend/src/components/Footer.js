import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/images/logo.png" alt="Crimble Logo" className="w-10 h-10 rounded" />
              <span className="text-2xl font-bold">Crimble</span>
            </Link>
            <p className="text-gray-400 mb-6">
              The complete platform for professional growth, talent showcase, and career advancement.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Core Learning</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Jobs</Link></li>
              <li><Link to="/talent" className="text-gray-400 hover:text-white transition-colors">Talent Management</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/admin/content" className="text-gray-400 hover:text-white transition-colors">Content Management</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center md:flex md:justify-between">
          <p className="text-gray-400">© {new Date().getFullYear()} Crimble. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors mx-3">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors mx-3">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors mx-3">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 