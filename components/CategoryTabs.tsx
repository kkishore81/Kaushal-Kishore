

import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: any) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 md:space-x-4 border-b border-base-300">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 md:px-4 py-2 text-sm md:text-base font-medium whitespace-nowrap transition-colors duration-300 ${
              activeCategory === category
                ? 'border-b-2 border-brand-primary text-brand-primary'
                : 'text-content-200 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;