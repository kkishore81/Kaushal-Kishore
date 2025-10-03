import React from 'react';
import { Goal, Investment } from '../types';

interface GoalCardProps {
    goal: Goal;
    currentAmount: number;
    linkedInvestments: Investment[];
}

const GoalIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-9-9H3m18 0h-2.25" /></svg>);

const GoalCard: React.FC<GoalCardProps> = ({ goal, currentAmount, linkedInvestments }) => {
    const progressPercentage = goal.targetAmount > 0 ? Math.min((currentAmount / goal.targetAmount) * 100, 100) : 0;

    return (
        <div className="bg-base-200 rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">{goal.name}</h3>
                    <p className="text-sm text-content-200">Target: {new Date(goal.targetDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</p>
                </div>
                 <div className="p-2 bg-brand-primary/20 rounded-full">
                    <GoalIcon className="w-5 h-5 text-brand-primary" />
                </div>
            </div>

            <div className="my-4">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xl font-bold text-white">₹{currentAmount.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-content-200"> of ₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-base-300 rounded-full h-2.5">
                    <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                 <p className="text-right text-sm font-semibold mt-1 text-brand-primary">{progressPercentage.toFixed(1)}% Complete</p>
            </div>

            <div>
                <h4 className="text-sm font-semibold text-white mb-2">Linked Investments</h4>
                <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
                    {linkedInvestments.length > 0 ? linkedInvestments.map(inv => (
                        <div key={inv.id} className="flex justify-between items-center bg-base-300 p-2 rounded-md">
                            <span className="text-xs text-content-100">{inv.name}</span>
                            <span className="text-xs font-medium text-white">₹{inv.currentValue.toLocaleString('en-IN')}</span>
                        </div>
                    )) : (
                        <p className="text-xs text-content-200 text-center">No investments linked yet.</p>
                    )}
                </div>
            </div>
            
             <button className="w-full border-2 border-brand-primary text-brand-primary font-semibold py-2 px-4 rounded-lg hover:bg-brand-primary hover:text-white transition-colors duration-300 mt-6">
                Manage Goal
            </button>
        </div>
    );
};

export default GoalCard;