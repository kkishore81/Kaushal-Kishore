
import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center p-4 border-b border-base-300">
        <div>
            <p className="font-medium text-white">{transaction.description}</p>
            <p className="text-sm text-content-200">{transaction.date}</p>
        </div>
        <div className="hidden md:block">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {transaction.type === 'credit' ? 'Credit' : 'Debit'}
            </span>
        </div>
        <div className="text-right">
            <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount.toLocaleString('en-IN')}
            </p>
        </div>
        <div className="text-right">
             <button className="text-brand-primary hover:text-brand-secondary text-sm font-medium">Details</button>
        </div>
    </div>
);


const Transactions: React.FC = () => {
    return (
        <div className="bg-base-200 rounded-xl shadow-lg">
            <div className="p-4 border-b border-base-300">
                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            </div>
            <div>
                 <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4 text-sm font-bold text-content-200">
                    <span>Description</span>
                    <span className="hidden md:block">Type</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Actions</span>
                </div>
                {MOCK_TRANSACTIONS.map(tx => (
                    <TransactionRow key={tx.id} transaction={tx} />
                ))}
            </div>
        </div>
    );
};

export default Transactions;