import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SPENDING_CATEGORIES } from '../constants';
import { BudgetCategory, Transaction } from '../types';

const BudgetSummaryCard: React.FC<{ title: string; value: number; total?: number, className?: string }> = ({ title, value, total, className }) => (
    <div className={`bg-base-200 p-6 rounded-lg shadow-lg ${className}`}>
        <p className="text-sm text-content-200">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">₹{value.toLocaleString('en-IN')}</p>
        {total && <p className="text-sm text-content-200 mt-1">out of ₹{total.toLocaleString('en-IN')}</p>}
    </div>
);

const CategoryProgress: React.FC<{ category: BudgetCategory }> = ({ category }) => {
    const percentage = category.budgeted > 0 ? Math.min((category.spent / category.budgeted) * 100, 100) : 0;
    const isOverBudget = category.spent > category.budgeted;

    return (
        <div className="flex items-center p-4 bg-base-200 rounded-lg">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: `${category.color}33`}}>
                 <span className="w-4 h-4 rounded-full" style={{backgroundColor: category.color}}></span>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-white">{category.name}</span>
                    <span className={`text-sm ${isOverBudget ? 'text-red-400 font-bold' : 'text-content-200'}`}>
                        ₹{category.spent.toLocaleString('en-IN')} / ₹{category.budgeted.toLocaleString('en-IN')}
                    </span>
                </div>
                <div className="w-full bg-base-100 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full" style={{ width: `${percentage}%`, backgroundColor: isOverBudget ? '#F87171' : category.color }}></div>
                </div>
            </div>
        </div>
    );
};

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center p-4 border-b border-base-300 last:border-b-0">
        <div>
            <p className="font-medium text-white">{transaction.description}</p>
            <p className="text-sm text-content-200">{transaction.date}</p>
        </div>
        <div className="hidden md:block">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-base-100 text-content-200'}`}>
                {transaction.category}
            </span>
        </div>
        <div className="text-right">
            <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount.toLocaleString('en-IN')}
            </p>
        </div>
         <div className="text-right text-sm text-content-200">
            {transaction.type === 'credit' ? 'Income' : 'Expense'}
        </div>
    </div>
);

const availableColors = ['#EF4444', '#F97316', '#3B82F6', '#10B981', '#A855F7', '#6366F1', '#EC4899'];

interface BudgetPageProps {
    budgetData: { categories: BudgetCategory[], transactions: Transaction[] };
    setBudgetData: React.Dispatch<React.SetStateAction<{ categories: BudgetCategory[], transactions: Transaction[] }>>;
}

const BudgetPage: React.FC<BudgetPageProps> = ({ budgetData, setBudgetData }) => {
    const { categories, transactions } = budgetData;
    
    const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    
    // State for the new category form
    const [mainCategory, setMainCategory] = useState<string>(Object.keys(SPENDING_CATEGORIES)[0]);
    const [subCategory, setSubCategory] = useState<string>('');
    const [newCategoryBudget, setNewCategoryBudget] = useState('');

    // State for new transaction form
    const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', type: 'debit' as 'debit' | 'credit', category: ''});

    const { totalBudgeted, totalSpent, remaining } = useMemo(() => {
        const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
        const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
        const remaining = totalBudgeted - totalSpent;
        return { totalBudgeted, totalSpent, remaining };
    }, [categories]);

    const chartData = categories.map(cat => ({
        name: cat.name,
        value: cat.spent,
    }));

    const COLORS = categories.map(cat => cat.color);
    
    const handleResetBudget = () => {
        setBudgetData(prev => ({
            ...prev,
            categories: prev.categories.map(cat => ({ ...cat, budgeted: 0, spent: 0 }))
        }));
    };

    const handleAddBudgetCategory = (e: React.FormEvent) => {
        e.preventDefault();
        const budgetValue = parseFloat(newCategoryBudget);
        if (subCategory && !isNaN(budgetValue) && budgetValue > 0) {
            if (categories.some(cat => cat.name === subCategory)) {
                alert(`Category "${subCategory}" already exists.`);
                return;
            }

            const newCategory: BudgetCategory = {
                name: subCategory,
                budgeted: budgetValue,
                spent: 0, 
                color: availableColors[categories.length % availableColors.length],
            };
            setBudgetData(prev => ({ ...prev, categories: [...prev.categories, newCategory] }));
            
            setMainCategory(Object.keys(SPENDING_CATEGORIES)[0]);
            setSubCategory('');
            setNewCategoryBudget('');
            setShowAddBudgetForm(false);
        }
    };
    
    const handleAddTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(newTransaction.amount);
        if (newTransaction.description && amount > 0 && newTransaction.category) {
            const transactionToAdd: Transaction = {
                id: `t-${Date.now()}`,
                date: new Date().toISOString().split('T')[0], // a YYYY-MM-DD
                description: newTransaction.description,
                amount: amount,
                type: newTransaction.type,
                category: newTransaction.category,
            };
            
            setBudgetData(prev => {
                const newTransactions = [transactionToAdd, ...prev.transactions];
                let newCategories = prev.categories;

                if (transactionToAdd.type === 'debit') {
                    newCategories = prev.categories.map(cat => {
                        if (cat.name === transactionToAdd.category) {
                            return { ...cat, spent: cat.spent + transactionToAdd.amount };
                        }
                        return cat;
                    });
                }
                
                return { categories: newCategories, transactions: newTransactions };
            });

            // Reset form
            setNewTransaction({ description: '', amount: '', type: 'debit', category: '' });
            setShowAddTransactionForm(false);
        }
    };


    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                 <h1 className="text-2xl font-bold text-white">This Month's Budget</h1>
                 <div className="flex gap-4">
                    <button 
                        onClick={() => setShowAddBudgetForm(!showAddBudgetForm)}
                        className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300"
                    >
                        {showAddBudgetForm ? 'Cancel' : '+ Add Budget'}
                    </button>
                    <button 
                        onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}
                        className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300"
                    >
                        {showAddTransactionForm ? 'Cancel' : '+ Add Transaction'}
                    </button>
                    <button 
                        onClick={handleResetBudget}
                        className="bg-base-300 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500/80 transition-colors duration-300"
                    >
                        Reset Allocations
                    </button>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BudgetSummaryCard title="Total Budgeted" value={totalBudgeted} />
                <BudgetSummaryCard title="Total Spent" value={totalSpent} total={totalBudgeted} />
                <BudgetSummaryCard title="Remaining" value={remaining} className={remaining < 0 ? 'bg-red-500/20' : 'bg-green-500/20'} />
            </div>

            {showAddBudgetForm && (
                <div className="bg-base-300 p-6 rounded-xl shadow-lg animate-fade-in">
                    <h2 className="text-xl font-bold text-white mb-4">Add New Budget Category</h2>
                    <form onSubmit={handleAddBudgetCategory} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="text-sm text-content-200 mb-1 block">Category</label>
                            <select 
                                value={mainCategory} 
                                onChange={(e) => {
                                    setMainCategory(e.target.value);
                                    setSubCategory('');
                                }}
                                className="w-full bg-base-200 border border-base-100 rounded-lg px-4 py-2 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            >
                                {Object.keys(SPENDING_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                         <div className="flex-1 w-full">
                             <label className="text-sm text-content-200 mb-1 block">Sub-Category</label>
                            <select 
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="w-full bg-base-200 border border-base-100 rounded-lg px-4 py-2 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                required
                            >
                                <option value="">Select...</option>
                                {SPENDING_CATEGORIES[mainCategory]?.map(subCat => <option key={subCat} value={subCat}>{subCat}</option>)}
                            </select>
                        </div>
                        <div className="w-full md:w-64">
                             <label className="text-sm text-content-200 mb-1 block">Monthly Budget (₹)</label>
                            <input
                                type="number"
                                value={newCategoryBudget}
                                onChange={(e) => setNewCategoryBudget(e.target.value)}
                                placeholder="Amount"
                                className="w-full bg-base-200 border border-base-100 rounded-lg px-4 py-2 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                required
                                min="1"
                            />
                        </div>
                        <button type="submit" className="w-full md:w-auto bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 self-end h-[42px]">
                           Save
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-base-300 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Spending Breakdown</h2>
                     {categories.length > 0 && totalSpent > 0 ? (
                        <div className="w-full h-64">
                             <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                                         contentStyle={{ 
                                            backgroundColor: '#374151',
                                            border: '1px solid #4B5563',
                                            borderRadius: '0.5rem',
                                        }}
                                    />
                                    <Legend iconSize={10} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                         <div className="flex items-center justify-center h-64">
                            <p className="text-content-200 text-center">No spending data to display.</p>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-3 bg-base-300 p-6 rounded-xl shadow-lg">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Budget Categories</h2>
                     </div>
                     <div className="space-y-4">
                        {categories.map(cat => (
                            <CategoryProgress key={cat.name} category={cat} />
                        ))}
                        {categories.length === 0 && (
                            <p className="text-content-200 text-center py-8">You haven't added any budget categories yet. Click "+ Add Budget" to get started.</p>
                        )}
                     </div>
                </div>
            </div>

            <div className="bg-base-300 rounded-xl shadow-lg">
                <div className="p-6 border-b border-base-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                </div>

                {showAddTransactionForm && (
                     <div className="p-6">
                        <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <input type="text" placeholder="Description" value={newTransaction.description} onChange={e => setNewTransaction({...newTransaction, description: e.target.value})} required className="w-full bg-base-200 p-2 rounded col-span-1 md:col-span-2"/>
                            <input type="number" placeholder="Amount (₹)" value={newTransaction.amount} onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})} required className="w-full bg-base-200 p-2 rounded"/>
                            <select value={newTransaction.category} onChange={e => setNewTransaction({...newTransaction, category: e.target.value})} required className="w-full bg-base-200 p-2 rounded">
                                <option value="">Select Category</option>
                                <optgroup label="Expenses">
                                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                </optgroup>
                                <optgroup label="Income">
                                    <option value="Income">Income</option>
                                </optgroup>
                            </select>
                             <button type="submit" className="bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg">Save</button>
                        </form>
                    </div>
                )}
                
                <div>
                     <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-6 text-sm font-bold text-content-200">
                        <span>Description</span>
                        <span className="hidden md:block">Category</span>
                        <span className="text-right">Amount</span>
                        <span className="text-right">Type</span>
                    </div>
                    {transactions.map(tx => (
                        <TransactionRow key={tx.id} transaction={tx} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default BudgetPage;