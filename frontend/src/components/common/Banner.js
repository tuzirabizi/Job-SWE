import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage = '/images/banner-bg.jpg',
  overlay = true,
}) => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {overlay && (
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        )}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="banner-title">
            {title}
          </h1>
          <p className="banner-subtitle">
            {subtitle}
          </p>
          {buttonText && buttonLink && (
            <div className="mt-8">
              <Link
                to={buttonLink}
                className="btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
              >
                {buttonText}
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner; 