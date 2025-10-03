import { Investment, Transaction, InvestmentType, BudgetCategory, Goal } from './types';

export const MOCK_INVESTMENTS: Investment[] = [
  // Mutual Funds
  {
    id: 'mf-1',
    name: 'Quantum Blue Chip Equity Fund',
    type: 'Mutual Fund',
    category: 'Equity',
    subType: 'Large Cap',
    risk: 'High',
    symbol: 'QBC',
    returns: { '1Y': 25.4, '3Y': 18.2, '5Y': 15.6 },
    chartData: [ { name: 'Jan', value: 100 }, { name: 'Feb', value: 105 }, { name: 'Mar', value: 102 }, { name: 'Apr', value: 110 }, { name: 'May', value: 115 }, { name: 'Jun', value: 120 } ],
    currentValue: 55000,
    investedValue: 48000,
    sipAmount: 5000,
    goalId: 'goal-1',
  },
  {
    id: 'mf-2',
    name: 'Stellar Short Term Debt Fund',
    type: 'Mutual Fund',
    category: 'Debt',
    risk: 'Low',
    symbol: 'SSTD',
    returns: { '1Y': 7.8, '3Y': 6.5, '5Y': 6.1 },
    chartData: [ { name: 'Jan', value: 100 }, { name: 'Feb', value: 101 }, { name: 'Mar', value: 101.5 }, { name: 'Apr', value: 102 }, { name: 'May', value: 102.5 }, { name: 'Jun', value: 103 } ],
    currentValue: 80000,
    investedValue: 75000,
    goalId: 'goal-2',
  },
  // Stocks
  {
    id: 's-1',
    name: 'Reliance Industries',
    type: 'Stock',
    category: 'Energy',
    risk: 'Medium',
    symbol: 'RELIANCE',
    returns: { '1Y': 35.2 },
    chartData: [ { name: 'Jan', value: 2500 }, { name: 'Feb', value: 2550 }, { name: 'Mar', value: 2480 }, { name: 'Apr', value: 2600 }, { name: 'May', value: 2700 }, { name: 'Jun', value: 2800 } ],
    currentValue: 45000,
    investedValue: 38000,
    goalId: 'goal-1',
  },
  {
    id: 's-2',
    name: 'Tata Consultancy Services',
    type: 'Stock',
    category: 'IT',
    risk: 'Low',
    symbol: 'TCS',
    returns: { '1Y': 18.9 },
    chartData: [ { name: 'Jan', value: 3800 }, { name: 'Feb', value: 3850 }, { name: 'Mar', value: 3900 }, { name: 'Apr', value: 3950 }, { name: 'May', value: 4000 }, { name: 'Jun', value: 4050 } ],
    currentValue: 62000,
    investedValue: 55000,
    goalId: 'goal-3',
  },
  // Crypto
  {
    id: 'c-1',
    name: 'Bitcoin',
    type: 'Crypto',
    category: 'Cryptocurrency',
    risk: 'High',
    symbol: 'BTC',
    returns: { '1Y': 120.5 },
    chartData: [ { name: 'Jan', value: 40000 }, { name: 'Feb', value: 45000 }, { name: 'Mar', value: 52000 }, { name: 'Apr', value: 60000 }, { name: 'May', value: 58000 }, { name: 'Jun', value: 65000 } ],
    currentValue: 15000,
    investedValue: 10000,
    goalId: 'goal-1',
  },
  {
    id: 'c-2',
    name: 'Ethereum',
    type: 'Crypto',
    category: 'Cryptocurrency',
    risk: 'High',
    symbol: 'ETH',
    returns: { '1Y': 95.8 },
    chartData: [ { name: 'Jan', value: 2500 }, { name: 'Feb', value: 2800 }, { name: 'Mar', value: 3200 }, { name: 'Apr', value: 3500 }, { name: 'May', value: 3400 }, { name: 'Jun', value: 3800 } ],
    currentValue: 10000,
    investedValue: 8000,
    goalId: 'goal-1',
  },
  // Gold
  {
    id: 'g-1',
    name: 'Digital Gold',
    type: 'Gold',
    category: 'Commodity',
    risk: 'Low',
    symbol: 'GOLD',
    returns: { '1Y': 15.0 },
    chartData: [ { name: 'Jan', value: 6000 }, { name: 'Feb', value: 6100 }, { name: 'Mar', value: 6200 }, { name: 'Apr', value: 6300 }, { name: 'May', value: 6400 }, { name: 'Jun', value: 6500 } ],
    currentValue: 25000,
    investedValue: 22000,
    goalId: 'goal-2',
  },
  // Fixed Income
  {
    id: 'rd-1',
    name: 'HDFC Bank RD',
    type: 'Fixed Income',
    subType: 'Recurring Deposit',
    category: 'Fixed Income',
    risk: 'Low',
    currentValue: 30500,
    investedValue: 30000,
    monthlyInstallment: 5000,
    interestRate: 7.1,
    maturityDate: '2025-01-15',
    goalId: 'goal-2',
  },
  {
    id: 'rd-2',
    name: 'Post Office RD',
    type: 'Fixed Income',
    subType: 'Recurring Deposit',
    category: 'Fixed Income',
    risk: 'Low',
    currentValue: 24300,
    investedValue: 24000,
    monthlyInstallment: 2000,
    interestRate: 6.7,
    maturityDate: '2026-07-20',
    goalId: 'goal-3',
  },
  {
    id: 'fd-1',
    name: 'Bajaj Finance FD',
    type: 'Fixed Income',
    subType: 'Fixed Deposit',
    category: 'Fixed Income',
    risk: 'Low',
    currentValue: 108000,
    investedValue: 100000,
    interestRate: 8.0,
    maturityDate: '2027-08-01',
    goalId: 'goal-1',
  },
    {
    id: 'ppf-1',
    name: 'Public Provident Fund',
    type: 'Fixed Income',
    subType: 'PPF',
    category: 'Fixed Income',
    risk: 'Low',
    currentValue: 214200,
    investedValue: 200000,
    interestRate: 7.1,
    maturityDate: '2035-04-01',
    goalId: 'goal-3',
  },
  {
    id: 'ssy-1',
    name: 'Sukanya Samriddhi Yojana',
    type: 'Fixed Income',
    subType: 'Sukanya Samriddhi',
    category: 'Fixed Income',
    risk: 'Low',
    currentValue: 54000,
    investedValue: 50000,
    interestRate: 8.2,
    maturityDate: '2042-01-01',
    goalId: 'goal-3',
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', date: '2024-07-26', description: 'Invested in Quantum Blue Chip', amount: 5000, type: 'debit', category: 'Investments' },
    { id: '2', date: '2024-07-25', description: 'Salary Credit', amount: 75000, type: 'credit', category: 'Income' },
    { id: '3', date: '2024-07-24', description: 'Sold TCS Stocks', amount: 10000, type: 'credit', category: 'Investments' },
    { id: '4', date: '2024-07-22', description: 'Bought Bitcoin', amount: 2000, type: 'debit', category: 'Investments' },
    { id: '5', date: '2024-07-21', description: 'SIP - Stellar Debt Fund', amount: 2500, type: 'debit', category: 'Investments' },
    { id: '6', date: '2024-07-20', description: 'Grocery Shopping', amount: 3500, type: 'debit', category: 'Groceries' },
    { id: '7', date: '2024-07-19', description: 'Electricity Bill', amount: 1200, type: 'debit', category: 'Utilities' },
    { id: '8', date: '2024-07-18', description: 'Dinner with friends', amount: 2200, type: 'debit', category: 'Entertainment' },
    { id: '9', date: '2024-07-15', description: 'Rent Payment', amount: 20000, type: 'debit', category: 'Housing' },
    { id: '10', date: '2024-07-12', description: 'Movie tickets', amount: 800, type: 'debit', category: 'Entertainment' },

];

export const INVESTMENT_TYPES: InvestmentType[] = ['Mutual Fund', 'Stock', 'Crypto', 'Gold', 'Fixed Income'];

export const SPENDING_CATEGORIES: { [key: string]: string[] } = {
    'Needs': ['Housing', 'Groceries', 'Utilities', 'Transportation', 'Health & Wellness', 'Insurance'],
    'Wants': ['Entertainment', 'Shopping', 'Dining Out', 'Subscriptions', 'Hobbies'],
    'Desires': ['Travel', 'Luxury Goods', 'Major Home Upgrades'],
    'Investment': ['Emergency Fund', 'Retirement', 'Wealth Creation', "Child's Education", 'Real Estate']
};

export const MOCK_BUDGET_CATEGORIES: BudgetCategory[] = [
    { name: 'Housing', budgeted: 20000, spent: 20000, color: '#EF4444' }, // red-500
    { name: 'Groceries', budgeted: 8000, spent: 3500, color: '#F97316' }, // orange-500
    { name: 'Utilities', budgeted: 3000, spent: 1200, color: '#3B82F6' }, // blue-500
    { name: 'Wealth Creation', budgeted: 10000, spent: 9500, color: '#10B981' }, // emerald-500
    { name: 'Entertainment', budgeted: 5000, spent: 3000, color: '#A855F7' }, // purple-500
];

export const MOCK_GOALS: Goal[] = [
    {
        id: 'goal-1',
        name: 'Dream Vacation to Europe',
        targetAmount: 400000,
        targetDate: '2025-12-31',
    },
    {
        id: 'goal-2',
        name: 'Down Payment for a Car',
        targetAmount: 250000,
        targetDate: '2025-06-30',
    },
    {
        id: 'goal-3',
        name: 'Emergency Fund',
        targetAmount: 500000,
        targetDate: '2026-12-31',
    }
];