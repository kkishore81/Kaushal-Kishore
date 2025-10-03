import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InvestmentsPage from './components/InvestmentsPage';
import AdvisorPage from './components/AdvisorPage';
import BudgetPage from './components/BudgetPage';
import GoalsPage from './components/GoalsPage';
import WillCreatorPage from './components/WillCreatorPage';
import AuthPage from './components/AuthPage';
import { Investment, Goal } from './types';

export type Page = 'dashboard' | 'investments' | 'advisor' | 'budget' | 'goals' | 'willCreator';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  const pageTitles: Record<Page, string> = {
    dashboard: 'Dashboard',
    investments: 'Explore Investments',
    advisor: 'AI Financial Advisor',
    budget: 'My Budget & Transactions',
    goals: 'My Financial Goals',
    willCreator: 'Automatic Will Creator',
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActivePage('dashboard'); // Reset to dashboard on login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear user data on logout
    setInvestments([]);
    setGoals([]);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'investments':
        return <InvestmentsPage investments={investments} setInvestments={setInvestments} goals={goals} />;
      case 'advisor':
        return <AdvisorPage />;
      case 'budget':
        return <BudgetPage />;
      case 'goals':
        return <GoalsPage goals={goals} setGoals={setGoals} investments={investments} />;
      case 'willCreator':
        return <WillCreatorPage />;
      default:
        return <Dashboard setActivePage={setActivePage}/>;
    }
  };
  
  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-base-100 font-sans flex text-content-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col h-screen">
          <Header title={pageTitles[activePage]} />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {renderPage()}
          </main>
      </div>
    </div>
  );
};

export default App;