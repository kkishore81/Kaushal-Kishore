
import React, { useState, useMemo } from 'react';
import { MOCK_INVESTMENTS, INVESTMENT_TYPES } from '../constants';
import { InvestmentType } from '../types';
import AdvisorChat from './AdvisorChat';
import CategoryTabs from './CategoryTabs';
import FundCard from './FundCard';
import SearchBar from './SearchBar';

const InvestmentDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<InvestmentType | 'All'>('All');

  const filteredInvestments = useMemo(() => {
    return MOCK_INVESTMENTS.filter(investment => {
      const matchesCategory = activeCategory === 'All' || investment.type === activeCategory;
      const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="space-y-8">
      <AdvisorChat />

      <div className="bg-base-200 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Explore Investments</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        <CategoryTabs 
            categories={['All', ...INVESTMENT_TYPES]} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
        />

        {filteredInvestments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {filteredInvestments.map(investment => (
                    <FundCard key={investment.id} fund={investment} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-content-200 text-lg">No investments found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentDashboard;