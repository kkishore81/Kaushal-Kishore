import React from 'react';
import { Investment } from '../types';
import PerformanceChart from './PerformanceChart';

interface InvestmentCardProps {
  investment: Investment;
  goalName: string;
  onUpdate: (investment: Investment) => void;
}

const RupeeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor" className={className}><path d="M19 7H9.21C9.69 6.39 10.28 6 11 6h7a1 1 0 0 0 0-2h-7c-1.66 0-3 1.34-3 3v1h-1a1 1 0 0 0 0 2h1v2H8a1 1 0 0 0 0 2h2v1c0 1.66 1.34 3 3 3h7a1 1 0 0 0 0-2h-7c-.55 0-1-.45-1-1v-1h1a1 1 0 0 0 0-2h-1v-2h8a1 1 0 0 0 0-2z" /></svg>);

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, goalName, onUpdate }) => {
    const riskColor = {
        Low: 'bg-green-500/20 text-green-400',
        Medium: 'bg-yellow-500/20 text-yellow-400',
        High: 'bg-red-500/20 text-red-400',
    }[investment.risk];

    const profitAndLoss = investment.currentValue - investment.investedValue;
    const isPositive = profitAndLoss >= 0;
    const pnlColor = isPositive ? 'text-green-400' : 'text-red-400';
    const pnlPercentage = investment.investedValue > 0 ? (profitAndLoss / investment.investedValue) * 100 : 0;

  return (
    <div className="bg-base-300 rounded-lg shadow-lg p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-brand-primary/20 hover:scale-[1.02]">
      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-white pr-2">{investment.name}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${riskColor} flex-shrink-0`}>
                {investment.risk} Risk
            </span>
        </div>
        <div className="flex items-baseline space-x-2 text-sm text-content-200 mb-2">
            <span>{investment.type}</span>
            {investment.subType && (
                <>
                    <span className="text-xs">•</span>
                    <span>{investment.subType}</span>
                </>
            )}
        </div>
         <div className="mb-4">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-brand-primary/20 text-brand-primary">
                For: {goalName}
            </span>
        </div>

        {/* Conditional Content for Market-Linked vs Fixed Income */}
        {investment.type === 'Fixed Income' ? (
          <div className="space-y-3 my-4">
             {investment.interestRate && (
                <div className="flex justify-between items-center bg-base-100 p-2 rounded-md">
                    <span className="text-xs text-content-200">Interest Rate</span>
                    <span className="text-sm font-bold text-white">{investment.interestRate}% p.a.</span>
                </div>
             )}
            {investment.monthlyInstallment && (
                <div className="flex justify-between items-center bg-base-100 p-2 rounded-md">
                    <span className="text-xs text-content-200">Monthly Installment</span>
                    <span className="text-sm font-bold text-white">₹{investment.monthlyInstallment?.toLocaleString('en-IN')}</span>
                </div>
            )}
             {investment.maturityDate && (
                <div className="flex justify-between items-center bg-base-100 p-2 rounded-md">
                    <span className="text-xs text-content-200">Maturity Date</span>
                    <span className="text-sm font-bold text-white">{new Date(investment.maturityDate).toLocaleDateString('en-IN')}</span>
                </div>
            )}
          </div>
        ) : (
          <>
            {/* Chart */}
            {investment.chartData && (
                <div className="h-24 mb-4">
                    <PerformanceChart data={investment.chartData} />
                </div>
            )}
            {/* Returns */}
            {investment.returns && (
              <div className="flex justify-around text-center border-t border-base-100 pt-4">
                  <div>
                      <p className="text-xs text-content-200">1Y Return</p>
                      <p className={`font-semibold ${investment.returns['1Y'] > 0 ? 'text-green-400' : 'text-red-400'}`}>{investment.returns['1Y']}%</p>
                  </div>
                  {investment.returns['3Y'] && (
                       <div>
                          <p className="text-xs text-content-200">3Y Return</p>
                          <p className={`font-semibold ${investment.returns['3Y'] > 0 ? 'text-green-400' : 'text-red-400'}`}>{investment.returns['3Y']}%</p>
                      </div>
                  )}
                  {investment.returns['5Y'] && (
                       <div>
                          <p className="text-xs text-content-200">5Y Return</p>
                          <p className={`font-semibold ${investment.returns['5Y'] > 0 ? 'text-green-400' : 'text-red-400'}`}>{investment.returns['5Y']}%</p>
                      </div>
                  )}
              </div>
            )}
          </>
        )}
      </div>

      {/* SIP Info */}
      {investment.sipAmount && (
        <div className="bg-brand-primary/10 border-l-4 border-brand-primary text-brand-primary p-3 rounded-md my-4 flex items-center gap-3">
          <RupeeIcon className="w-6 h-6"/>
          <div>
            <p className="font-bold text-sm">Monthly SIP</p>
            <p className="text-xs">₹{investment.sipAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
      )}

      {/* P&L Section */}
      <div className="border-t border-base-100 pt-4 space-y-2 mt-auto">
        <div className="flex justify-between text-sm">
          <span className="text-content-200">Invested</span>
          <span className="font-medium text-white">₹{investment.investedValue.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-content-200">Current Value</span>
          <span className="font-medium text-white">₹{investment.currentValue.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-content-200">P&L</span>
          <span className={`font-bold ${pnlColor}`}>
            {isPositive ? '+' : '-'}₹{Math.abs(profitAndLoss).toLocaleString('en-IN')} ({pnlPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <button 
        onClick={() => onUpdate(investment)}
        className="w-full bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 mt-5"
      >
        Update Value
      </button>
    </div>
  );
};

export default InvestmentCard;