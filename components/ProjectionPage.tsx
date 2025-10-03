import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Legend } from 'recharts';
import { Investment, ProjectionDataPoint } from '../types';

interface ProjectionPageProps {
    investments: Investment[];
    monthlySavings: number;
}

const calculateProjectionData = (
    initialCapital: number, 
    monthlyInvestment: number, 
    annualReturn: number, 
    years: number
): ProjectionDataPoint[] => {
    const data: ProjectionDataPoint[] = [{ year: new Date().getFullYear(), value: initialCapital }];
    let currentCapital = initialCapital;
    const monthlyReturnRate = annualReturn / 100 / 12;

    for (let i = 1; i <= years * 12; i++) {
        currentCapital = (currentCapital + monthlyInvestment) * (1 + monthlyReturnRate);
        if (i % 12 === 0) {
            data.push({ year: new Date().getFullYear() + i / 12, value: Math.round(currentCapital) });
        }
    }
    return data;
};

const formatter = (value: number) => `₹${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(value)}`;

const ProjectionPage: React.FC<ProjectionPageProps> = ({ investments, monthlySavings }) => {
    const initialCapital = useMemo(() => investments.reduce((sum, inv) => sum + inv.currentValue, 0), [investments]);

    const [additionalInvestment, setAdditionalInvestment] = useState(0);
    const [annualReturn, setAnnualReturn] = useState(10); // Default to 10%
    const [targetWealth, setTargetWealth] = useState(10000000); // Default to 1 Crore

    const totalMonthlyInvestment = monthlySavings + additionalInvestment;

    const projectionData = useMemo(() => {
        return calculateProjectionData(initialCapital, totalMonthlyInvestment, annualReturn, 40);
    }, [initialCapital, totalMonthlyInvestment, annualReturn]);
    
    const yearToReachTarget = useMemo(() => {
        const targetPoint = projectionData.find(p => p.value >= targetWealth);
        return targetPoint ? targetPoint.year : null;
    }, [projectionData, targetWealth]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* Controls Panel */}
            <div className="w-full lg:w-1/3 bg-base-200 p-6 rounded-xl shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-6">Simulation Controls</h2>
                
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-content-200">Current Portfolio Value</label>
                        <p className="text-2xl font-bold text-brand-primary">₹{initialCapital.toLocaleString('en-IN')}</p>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-content-200">Base Monthly Savings (from Budget)</label>
                        <p className="text-xl font-bold text-white">₹{monthlySavings.toLocaleString('en-IN')}</p>
                    </div>

                    <div>
                        <label htmlFor="additionalInvestment" className="flex justify-between text-sm font-medium text-content-200">
                            <span>Additional Monthly Investment</span>
                            <span className="font-bold text-white">₹{additionalInvestment.toLocaleString('en-IN')}</span>
                        </label>
                        <input
                            id="additionalInvestment"
                            type="range"
                            min="0"
                            max="200000"
                            step="5000"
                            value={additionalInvestment}
                            onChange={(e) => setAdditionalInvestment(Number(e.target.value))}
                            className="w-full h-2 bg-base-300 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-content-200">Total Monthly Investment</label>
                        <p className="text-xl font-bold text-white">₹{totalMonthlyInvestment.toLocaleString('en-IN')}</p>
                    </div>

                    <div>
                        <label htmlFor="annualReturn" className="flex justify-between text-sm font-medium text-content-200">
                           <span>Expected Annual Return (CAGR)</span>
                           <span className="font-bold text-white">{annualReturn}%</span>
                        </label>
                        <input
                            id="annualReturn"
                            type="range"
                            min="1"
                            max="25"
                            step="0.5"
                            value={annualReturn}
                            onChange={(e) => setAnnualReturn(Number(e.target.value))}
                             className="w-full h-2 bg-base-300 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                    </div>
                     <div>
                        <label htmlFor="targetWealth" className="text-sm font-medium text-content-200">Target Wealth</label>
                        <input
                            id="targetWealth"
                            type="number"
                            step="500000"
                            value={targetWealth}
                            onChange={(e) => setTargetWealth(Number(e.target.value))}
                            className="w-full bg-base-300 border border-base-100 rounded-lg p-2 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary mt-1"
                        />
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-base-300">
                     <h3 className="text-lg font-bold text-white">Projection Outcome</h3>
                     {yearToReachTarget ? (
                         <p className="text-content-100 mt-2">
                            You are projected to reach your target of <span className="font-bold text-brand-primary">₹{targetWealth.toLocaleString('en-IN')}</span> in the year <span className="font-bold text-brand-primary">{yearToReachTarget}</span>.
                         </p>
                     ) : (
                         <p className="text-yellow-400 mt-2">
                            At this rate, you may not reach your target within 40 years. Try increasing your investment or adjusting expectations.
                         </p>
                     )}
                </div>
            </div>

            {/* Chart */}
            <div className="w-full lg:w-2/3 bg-base-200 p-6 rounded-xl shadow-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} />
                        <YAxis tickFormatter={formatter} tick={{ fill: '#9CA3AF' }} width={80} />
                        <Tooltip
                            formatter={(value: number) => formatter(value)}
                            labelStyle={{ color: '#D1D5DB' }}
                            contentStyle={{ backgroundColor: '#374151', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="Projected Wealth" stroke="#10B981" strokeWidth={2} dot={false} />
                        <ReferenceLine y={targetWealth} label={{ value: 'Target', position: 'insideTopLeft', fill: '#FBBF24' }} stroke="#FBBF24" strokeDasharray="4 4" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProjectionPage;
