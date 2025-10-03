export interface ChartDataPoint {
  name: string;
  value: number;
}

export type InvestmentType = 'Mutual Fund' | 'Stock' | 'Crypto' | 'Gold' | 'Fixed Income';

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  subType?: string;
  category: string; 
  risk: 'Low' | 'Medium' | 'High';
  returns?: {
    '1Y': number;
    '3Y'?: number;
    '5Y'?: number;
  };
  chartData?: ChartDataPoint[];
  currentValue: number;
  investedValue: number;
  symbol?: string;
  sipAmount?: number;
  monthlyInstallment?: number;
  interestRate?: number;
  maturityDate?: string;
  goalId: string; // All investments must be linked to a goal
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    category?: string;
}

export interface BudgetCategory {
    name: string;
    budgeted: number;
    spent: number;
    color: string;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    targetDate: string;
    // This is now calculated dynamically, not stored
    // linkedInvestmentIds: string[];
}

// Types for Will Creator
export interface Executor {
    name: string;
    relationship: string;
    address: string;
}

export interface Beneficiary {
    id: string;
    name: string;
    relationship: string;
}

export interface Asset {
    id: string;
    description: string;
    beneficiaryId: string | null;
}

export interface Witness {
    name: string;
    address: string;
}

export interface WillData {
    fullName: string;
    address: string;
    executor: Executor;
    beneficiaries: Beneficiary[];
    assets: Asset[];
    witness1: Witness;
    witness2: Witness;
}