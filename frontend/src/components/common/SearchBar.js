import React, { useState } from 'react';

const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  filters = [],
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, selectedFilter);
  };

  return (
    <div className={`search-container ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {filters.length > 0 && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-transparent border-none text-gray-500 focus:outline-none focus:ring-0"
            >
              <option value="all">All</option>
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 