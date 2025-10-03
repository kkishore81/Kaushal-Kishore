
import React from 'react';
import { Investment } from '../types';
import PerformanceChart from './PerformanceChart';

interface FundCardProps {
  fund: Investment;
}

const FundCard: React.FC<FundCardProps> = ({ fund }) => {
    const riskColor = {
        Low: 'bg-green-500/20 text-green-400',
        Medium: 'bg-yellow-500/20 text-yellow-400',
        High: 'bg-red-500/20 text-red-400',
    }[fund.risk];

  return (
    <div className="bg-base-300 rounded-lg shadow-lg p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-brand-primary/20 hover:scale-[1.02]">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-white mb-1">{fund.name}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${riskColor}`}>
                {fund.risk} Risk
            </span>
        </div>
        <p className="text-sm text-content-200 mb-4">{fund.category}</p>
        
        <div className="h-24 mb-4">
             <PerformanceChart data={fund.chartData} />
        </div>
        
        <div className="flex justify-around text-center border-t border-base-100 pt-4">
            <div>
                <p className="text-xs text-content-200">1Y Return</p>
                <p className={`font-semibold ${fund.returns['1Y'] > 0 ? 'text-green-400' : 'text-red-400'}`}>{fund.returns['1Y']}%</p>
            </div>
            {fund.returns['3Y'] && (
                 <div>
                    <p className="text-xs text-content-200">3Y Return</p>
                    <p className={`font-semibold ${fund.returns['3Y'] > 0 ? 'text-green-400' : 'text-red-400'}`}>{fund.returns['3Y']}%</p>
                </div>
            )}
            {fund.returns['5Y'] && (
                 <div>
                    <p className="text-xs text-content-200">5Y Return</p>
                    <p className={`font-semibold ${fund.returns['5Y'] > 0 ? 'text-green-400' : 'text-red-400'}`}>{fund.returns['5Y']}%</p>
                </div>
            )}
        </div>
      </div>
      <button className="w-full bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 mt-5">
        Invest Now
      </button>
    </div>
  );
};

export default FundCard;