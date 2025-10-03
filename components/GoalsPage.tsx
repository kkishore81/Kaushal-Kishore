import React, { useState } from 'react';
import { Goal, Investment } from '../types';
import GoalCard from './GoalCard';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (goal: Omit<Goal, 'id'>) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [targetDate, setTargetDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name && targetAmount && targetDate) {
            onAdd({
                name,
                targetAmount: parseFloat(targetAmount),
                targetDate,
            });
            onClose(); // Close modal on successful add
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-base-300 rounded-xl shadow-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white mb-6">Add New Financial Goal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Goal Name (e.g., European Vacation)" required className="w-full bg-base-200 p-2 rounded" />
                    <input type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="Target Amount (₹)" required className="w-full bg-base-200 p-2 rounded" />
                    <input type="text" value={targetDate} onChange={e => setTargetDate(e.target.value)} placeholder="Target Date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required className="w-full bg-base-200 p-2 rounded" />
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-base-200 text-white font-semibold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg">Save Goal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const EmptyState: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
    <div className="flex flex-col items-center justify-center text-center h-full bg-base-200 rounded-xl p-8 min-h-[400px]">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-primary mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-9-9H3m18 0h-2.25" />
        </svg>
        <h2 className="text-2xl font-bold text-white mt-4">Define What You're Working Towards</h2>
        <p className="text-content-200 mt-2 max-w-md">
            Setting clear financial goals is the first step to achieving them. What's your next big milestone?
        </p>
        <button 
            onClick={onAdd} 
            className="bg-brand-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-secondary transition-colors duration-300 mt-6 text-lg"
        >
            + Add Your First Goal
        </button>
    </div>
);

interface GoalsPageProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  investments: Investment[];
}

const GoalsPage: React.FC<GoalsPageProps> = ({ goals, setGoals, investments }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddGoal = (newGoalData: Omit<Goal, 'id'>) => {
        const newGoal: Goal = {
            ...newGoalData,
            id: `goal-${Date.now()}`
        };
        setGoals(prev => [...prev, newGoal]);
    };

    const handleResetGoals = () => {
        setGoals([]);
    }

    const calculateCurrentAmount = (goal: Goal): number => {
        return investments
            .filter(inv => inv.goalId === goal.id)
            .reduce((sum, inv) => sum + inv.currentValue, 0);
    };

    if (goals.length === 0) {
        return (
            <>
                <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddGoal} />
                <EmptyState onAdd={() => setIsModalOpen(true)} />
            </>
        )
    }

    return (
        <>
        <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddGoal} />
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Your Financial Goals</h1>
                    <p className="text-content-200 mt-1">Track your progress and stay motivated on your journey to financial freedom.</p>
                </div>
                <div className="flex gap-4">
                     <button onClick={() => setIsModalOpen(true)} className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300">
                        + Add New Goal
                    </button>
                     <button 
                        onClick={handleResetGoals}
                        className="bg-base-300 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500/80 transition-colors duration-300"
                    >
                        Reset Goals
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {goals.map(goal => {
                    const currentAmount = calculateCurrentAmount(goal);
                    const linkedInvestments = investments.filter(inv => inv.goalId === goal.id);
                    
                    return (
                        <GoalCard 
                            key={goal.id} 
                            goal={goal}
                            currentAmount={currentAmount}
                            linkedInvestments={linkedInvestments}
                        />
                    );
                })}
            </div>
        </div>
        </>
    );
};

export default GoalsPage;