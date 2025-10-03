import React, { useState, useMemo } from 'react';
import { INVESTMENT_TYPES } from '../constants';
import { Investment, InvestmentType, Goal } from '../types';
import CategoryTabs from './CategoryTabs';
import InvestmentCard from './InvestmentCard';
import SearchBar from './SearchBar';

// --- AddInvestmentModal Component ---
interface AddInvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (investment: Omit<Investment, 'id'>) => void;
    goals: Goal[];
}

const AddInvestmentModal: React.FC<AddInvestmentModalProps> = ({ isOpen, onClose, onAdd, goals }) => {
    const [formData, setFormData] = useState<Partial<Investment>>({ type: 'Mutual Fund', risk: 'Medium', goalId: goals[0]?.id || '' });

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInvestment: Omit<Investment, 'id'> = {
            name: formData.name || 'Unnamed Investment',
            type: formData.type || 'Stock',
            category: formData.category || 'General', // This is instrument category e.g. Equity, Debt
            risk: formData.risk || 'Medium',
            investedValue: Number(formData.investedValue) || 0,
            currentValue: Number(formData.currentValue) || Number(formData.investedValue) || 0,
            goalId: formData.goalId!,
            ...formData,
        };
        onAdd(newInvestment);
        // Reset form for next entry
        setFormData({ type: 'Mutual Fund', risk: 'Medium', goalId: goals[0]?.id || '' });
    };
    
    const fixedIncomeSubTypes = ['Fixed Deposit', 'Recurring Deposit', 'PPF', 'Sukanya Samriddhi'];

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-base-300 rounded-xl shadow-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white mb-6">Add New Investment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Investment Name (e.g., HDFC Bank FD)" onChange={handleInputChange} required className="w-full bg-base-200 p-2 rounded" />
                    
                    <div>
                        <label className="text-sm text-content-200 mb-1 block">Link to Financial Goal</label>
                        {goals.length > 0 ? (
                            <select name="goalId" value={formData.goalId} onChange={handleInputChange} required className="w-full bg-base-200 p-2 rounded">
                                {goals.map(goal => <option key={goal.id} value={goal.id}>{goal.name}</option>)}
                            </select>
                        ) : (
                            <p className="text-yellow-400 text-sm p-2 bg-yellow-500/10 rounded">You must create a financial goal first.</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-base-200 p-2 rounded">
                            {INVESTMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                         <select name="risk" value={formData.risk} onChange={handleInputChange} className="w-full bg-base-200 p-2 rounded">
                            <option value="Low">Low Risk</option>
                            <option value="Medium">Medium Risk</option>
                            <option value="High">High Risk</option>
                        </select>
                    </div>

                    {formData.type === 'Fixed Income' && (
                         <select name="subType" value={formData.subType} onChange={handleInputChange} className="w-full bg-base-200 p-2 rounded">
                            <option value="">Select Sub-Type</option>
                            {fixedIncomeSubTypes.map(subType => <option key={subType} value={subType}>{subType}</option>)}
                        </select>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <input type="number" name="investedValue" placeholder="Amount Invested (₹)" onChange={handleInputChange} required className="w-full bg-base-200 p-2 rounded" />
                         <input type="number" name="currentValue" placeholder="Current Value (₹)" onChange={handleInputChange} required className="w-full bg-base-200 p-2 rounded" />
                    </div>
                    {formData.type === 'Fixed Income' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="number" step="0.1" name="interestRate" placeholder="Interest Rate (%)" onChange={handleInputChange} className="w-full bg-base-200 p-2 rounded" />
                             <input type="text" name="maturityDate" placeholder="Maturity Date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} onChange={handleInputChange} className="w-full bg-base-200 p-2 rounded" />
                        </div>
                    )}
                    {formData.subType === 'Recurring Deposit' && (
                        <input type="number" name="monthlyInstallment" placeholder="Monthly Installment (₹)" onChange={handleInputChange} className="w-full bg-base-200 p-2 rounded" />
                    )}


                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-base-200 text-white font-semibold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" disabled={goals.length === 0} className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg disabled:bg-base-300 disabled:cursor-not-allowed">Save Investment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- UpdateInvestmentModal Component ---
interface UpdateInvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (investmentId: string, newInvested: number, newValue: number) => void;
    investment: Investment | null;
}

const UpdateInvestmentModal: React.FC<UpdateInvestmentModalProps> = ({ isOpen, onClose, onUpdate, investment }) => {
    const [currentValue, setCurrentValue] = useState(investment?.currentValue || 0);
    const [investedValue, setInvestedValue] = useState(investment?.investedValue || 0);

    React.useEffect(() => {
        if (investment) {
            setCurrentValue(investment.currentValue);
            setInvestedValue(investment.investedValue);
        }
    }, [investment]);

    if (!isOpen || !investment) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(investment.id, investedValue, currentValue);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-base-300 rounded-xl shadow-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white mb-2">Update Value</h2>
                <p className="text-content-200 mb-6">Update the latest valuation for: <span className="font-bold text-white">{investment.name}</span></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="text-sm text-content-200 mb-1 block">New Total Amount Invested (₹)</label>
                        <input type="number" value={investedValue} onChange={(e) => setInvestedValue(Number(e.target.value))} required className="w-full bg-base-200 p-2 rounded" />
                    </div>
                    <div>
                        <label className="text-sm text-content-200 mb-1 block">New Current Value (₹)</label>
                        <input type="number" value={currentValue} onChange={(e) => setCurrentValue(Number(e.target.value))} required className="w-full bg-base-200 p-2 rounded" />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-base-200 text-white font-semibold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const StatCard: React.FC<{ title: string; value: string; subValue?: string; valueColor?: string }> = ({ title, value, subValue, valueColor }) => (
    <div className="bg-base-300 p-4 rounded-lg shadow-md">
        <p className="text-sm text-content-200">{title}</p>
        <p className={`text-2xl font-bold text-white mt-1 ${valueColor}`}>{value}</p>
        {subValue && <p className="text-xs text-content-200 mt-1">{subValue}</p>}
    </div>
);

const EmptyState: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
    <div className="flex flex-col items-center justify-center text-center h-full bg-base-200 rounded-xl p-8 min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-primary mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
        <h2 className="text-2xl font-bold text-white mt-4">Welcome to Your Portfolio</h2>
        <p className="text-content-200 mt-2 max-w-md">
            You haven't added any investments yet. Track your stocks, mutual funds, FDs, and more all in one place.
        </p>
        <button 
            onClick={onAdd} 
            className="bg-brand-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-secondary transition-colors duration-300 mt-6 text-lg"
        >
            + Add Your First Investment
        </button>
    </div>
);

interface InvestmentsPageProps {
  investments: Investment[];
  setInvestments: React.Dispatch<React.SetStateAction<Investment[]>>;
  goals: Goal[];
}

const InvestmentsPage: React.FC<InvestmentsPageProps> = ({ investments, setInvestments, goals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<InvestmentType | 'All'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const { totalInvested, totalCurrentValue, totalPnl, totalPnlPercentage } = useMemo(() => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.investedValue, 0);
    const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalPnl = totalCurrentValue - totalInvested;
    const totalPnlPercentage = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
    return { totalInvested, totalCurrentValue, totalPnl, totalPnlPercentage };
  }, [investments]);


  const filteredInvestments = useMemo(() => {
    return investments.filter(inv => {
      const matchesType = activeType === 'All' || inv.type === activeType;
      const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [searchTerm, activeType, investments]);

  const pnlColor = totalPnl >= 0 ? 'text-green-400' : 'text-red-400';

  const handleAddInvestment = (newInvestmentData: Omit<Investment, 'id'>) => {
    const newInvestment: Investment = {
        ...newInvestmentData,
        id: `inv-${Date.now()}`
    }
    setInvestments(prev => [newInvestment, ...prev]);
    setIsAddModalOpen(false);
  };
  
  const handleOpenUpdateModal = (investment: Investment) => {
    setEditingInvestment(investment);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateInvestment = (investmentId: string, newInvested: number, newValue: number) => {
    setInvestments(prev => 
        prev.map(inv => 
            inv.id === investmentId 
            ? { ...inv, investedValue: newInvested, currentValue: newValue } 
            : inv
        )
    );
    setIsUpdateModalOpen(false);
    setEditingInvestment(null);
  };

  return (
    <>
        <AddInvestmentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddInvestment} goals={goals} />
        <UpdateInvestmentModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} onUpdate={handleUpdateInvestment} investment={editingInvestment} />

        {investments.length === 0 ? (
            <EmptyState onAdd={() => setIsAddModalOpen(true)} />
        ) : (
            <div className="space-y-6">
                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Total Invested" value={`₹${totalInvested.toLocaleString('en-IN')}`} />
                    <StatCard title="Current Value" value={`₹${totalCurrentValue.toLocaleString('en-IN')}`} />
                    <StatCard 
                        title="Overall P&L" 
                        value={`${totalPnl >= 0 ? '+' : '-'}₹${Math.abs(totalPnl).toLocaleString('en-IN')}`}
                        subValue={`${totalPnlPercentage.toFixed(2)}%`}
                        valueColor={pnlColor}
                    />
                </div>

                {/* Investment List */}
                <div className="bg-base-200 p-6 rounded-xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white">Your Investments</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                             <div className="relative">
                                <button 
                                    onClick={() => setIsAddModalOpen(true)} 
                                    disabled={goals.length === 0}
                                    className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 whitespace-nowrap disabled:bg-base-300 disabled:cursor-not-allowed"
                                >
                                    + Add Investment
                                </button>
                                {goals.length === 0 && <span className="absolute -top-8 left-0 w-max bg-base-100 text-xs text-content-200 p-2 rounded shadow-lg">Create a goal first!</span>}
                            </div>
                        </div>
                    </div>
                    
                    <CategoryTabs 
                        categories={['All', ...INVESTMENT_TYPES]} 
                        activeCategory={activeType} 
                        setActiveCategory={setActiveType}
                    />

                    {filteredInvestments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                            {filteredInvestments.map(inv => {
                                const goal = goals.find(g => g.id === inv.goalId);
                                return <InvestmentCard key={inv.id} investment={inv} goalName={goal?.name || 'Unlinked'} onUpdate={handleOpenUpdateModal} />;
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-content-200 text-lg">No investments found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        )}
    </>
  );
};

export default InvestmentsPage;