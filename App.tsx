import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InvestmentsPage from './components/InvestmentsPage';
import AdvisorPage from './components/AdvisorPage';
import BudgetPage from './components/BudgetPage';
import GoalsPage from './components/GoalsPage';
import WillCreatorPage from './components/WillCreatorPage';
import AuthPage from './components/AuthPage';
import ProjectionPage from './components/ProjectionPage';
import { Investment, Goal, BudgetCategory } from './types';
import { MOCK_BUDGET_CATEGORIES, MOCK_TRANSACTIONS } from './constants';

export type Page = 'dashboard' | 'investments' | 'advisor' | 'budget' | 'goals' | 'willCreator' | 'projection';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  
  // Budget state is now managed here to be passed to ProjectionPage
  const [budget, setBudget] = useState<{categories: BudgetCategory[], transactions: any[]}>({
    categories: MOCK_BUDGET_CATEGORIES,
    transactions: MOCK_TRANSACTIONS
  });


  const pageTitles: Record<Page, string> = {
    dashboard: 'Dashboard',
    investments: 'Explore Investments',
    advisor: 'AI Financial Advisor',
    budget: 'My Budget & Transactions',
    goals: 'My Financial Goals',
    willCreator: 'Automatic Will Creator',
    projection: 'Wealth Projection Simulator'
  };
  
  const monthlySavings = useMemo(() => {
    const income = budget.transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
    const expenses = budget.transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
    // Assuming transactions are for one month for this calculation
    return Math.max(0, income - expenses);
  }, [budget.transactions]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActivePage('dashboard'); // Reset to dashboard on login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear user data on logout
    setInvestments([]);
    setGoals([]);
    setBudget({categories: [], transactions: []});
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
        return <BudgetPage budgetData={budget} setBudgetData={setBudget} />;
      case 'goals':
        return <GoalsPage goals={goals} setGoals={setGoals} investments={investments} />;
      case 'willCreator':
        return <WillCreatorPage />;
      case 'projection':
        return <ProjectionPage investments={investments} monthlySavings={monthlySavings} />;
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