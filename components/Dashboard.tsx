
import React from 'react';
import { Page } from '../App';

interface DashboardProps {
    setActivePage: (page: Page) => void;
}

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg">
        <p className="text-sm text-content-200">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        <p className={`text-sm mt-1 font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
    </div>
);

const ActionCard: React.FC<{title: string, description: string, buttonText: string, onClick: () => void}> = ({ title, description, buttonText, onClick }) => (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-start">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-content-200 mt-2 mb-4 flex-grow">{description}</p>
        <button onClick={onClick} className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 mt-auto">
            {buttonText}
        </button>
    </div>
)

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                <p className="text-content-200 mt-1">Here's a snapshot of your financial health.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Investments" value="₹2,92,000" change="+2.5% this month" isPositive={true} />
                <StatCard title="Portfolio Gain" value="+₹12,340" change="+4.2% all time" isPositive={true} />
                <StatCard title="Monthly Spending" value="₹37,200" change="vs ₹46,000 budget" isPositive={true} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <ActionCard 
                    title="Grow Your Wealth"
                    description="Explore a wide range of investment opportunities tailored for you."
                    buttonText="Explore Investments"
                    onClick={() => setActivePage('investments')}
                 />
                  <ActionCard 
                    title="Set Your Goals"
                    description="Define your financial goals and track your progress towards achieving them."
                    buttonText="Manage Goals"
                    onClick={() => setActivePage('goals')}
                 />
                 <ActionCard 
                    title="Secure Your Legacy"
                    description="Create a draft of your will in minutes to protect your assets and loved ones."
                    buttonText="Create My Will"
                    onClick={() => setActivePage('willCreator')}
                 />
                 <ActionCard 
                    title="Have a Question?"
                    description="Get instant, AI-powered financial advice to make informed decisions."
                    buttonText="Talk to AI Advisor"
                    onClick={() => setActivePage('advisor')}
                 />
            </div>
        </div>
    );
};

export default Dashboard;