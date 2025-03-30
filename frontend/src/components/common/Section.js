import React from 'react';

const Section = ({
  title,
  subtitle,
  children,
  className = '',
  containerClassName = '',
}) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section; 