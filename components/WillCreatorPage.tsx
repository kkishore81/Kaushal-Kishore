
import React, { useState } from 'react';
import { WillData, Beneficiary, Asset } from '../types';
import { MOCK_INVESTMENTS } from '../constants';
import { generateWillText } from '../services/willTemplate';

const initialWillData: WillData = {
    fullName: '',
    address: '',
    executor: { name: '', relationship: '', address: '' },
    beneficiaries: [{ id: `b-${Date.now()}`, name: '', relationship: '' }],
    assets: [
        ...MOCK_INVESTMENTS.map(inv => ({ id: inv.id, description: `${inv.name} (${inv.type}) - Value: ₹${inv.currentValue.toLocaleString('en-IN')}`, beneficiaryId: null })),
        { id: `a-${Date.now()}`, description: 'House at [Your Address]', beneficiaryId: null },
        { id: `a-${Date.now() + 1}`, description: 'Savings Bank Account - [Bank Name]', beneficiaryId: null }
    ],
    witness1: { name: '', address: '' },
    witness2: { name: '', address: '' },
};

const WillCreatorPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [willData, setWillData] = useState<WillData>(initialWillData);
    const [generatedWill, setGeneratedWill] = useState<string | null>(null);

    const totalSteps = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: keyof WillData, index?: number, field?: string) => {
        const { name, value } = e.target;
        
        setWillData(prev => {
            const newData = { ...prev };
            if (index !== undefined && field && Array.isArray(newData[section])) {
                const arraySection = newData[section] as any[];
                arraySection[index] = { ...arraySection[index], [name]: value };
            } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
                 (newData[section] as any)[name] = value;
            } else {
                (newData as any)[name] = value;
            }
            return newData;
        });
    };
    
    const addBeneficiary = () => {
        setWillData(prev => ({
            ...prev,
            beneficiaries: [...prev.beneficiaries, { id: `b-${Date.now()}`, name: '', relationship: '' }]
        }));
    };
    
    const handleGenerateWill = () => {
        const willText = generateWillText(willData);
        setGeneratedWill(willText);
    };
    
    if (generatedWill) {
        return (
            <div className="bg-base-200 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Your Will Draft</h2>
                <div className="bg-base-300 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-content-100">{generatedWill}</pre>
                </div>
                 <div className="mt-6 flex gap-4">
                     <button onClick={() => setGeneratedWill(null)} className="bg-base-300 text-white font-semibold py-2 px-4 rounded-lg hover:bg-base-100 transition-colors duration-300">
                        Edit Details
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(generatedWill)} className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-base-200 p-6 rounded-xl shadow-lg">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-brand-primary">Step {step} of {totalSteps}</span>
                </div>
                <div className="w-full bg-base-300 rounded-full h-2.5">
                    <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                </div>
            </div>

            {/* Form Steps */}
            <div className="space-y-4">
                {step === 1 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Step 1: Your Personal Details</h3>
                        <input name="fullName" value={willData.fullName} onChange={e => handleInputChange(e, 'fullName')} placeholder="Full Name" className="w-full bg-base-300 p-2 rounded mb-2" />
                        <input name="address" value={willData.address} onChange={e => handleInputChange(e, 'address')} placeholder="Full Address" className="w-full bg-base-300 p-2 rounded" />
                    </div>
                )}
                 {step === 2 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Step 2: Appoint an Executor</h3>
                        <p className="text-sm text-content-200 mb-2">This person will be responsible for carrying out your will's instructions.</p>
                        <input name="name" value={willData.executor.name} onChange={e => handleInputChange(e, 'executor')} placeholder="Executor's Full Name" className="w-full bg-base-300 p-2 rounded mb-2" />
                        <input name="relationship" value={willData.executor.relationship} onChange={e => handleInputChange(e, 'executor')} placeholder="Relationship to You" className="w-full bg-base-300 p-2 rounded mb-2" />
                        <input name="address" value={willData.executor.address} onChange={e => handleInputChange(e, 'executor')} placeholder="Executor's Full Address" className="w-full bg-base-300 p-2 rounded" />
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Step 3: Beneficiaries & Asset Allocation</h3>
                        <div className="mb-4">
                            <h4 className="font-semibold text-white mb-2">Beneficiaries</h4>
                            {willData.beneficiaries.map((b, i) => (
                                <div key={b.id} className="flex gap-2 mb-2">
                                    <input name="name" value={b.name} onChange={e => handleInputChange(e, 'beneficiaries', i, 'name')} placeholder="Beneficiary Name" className="w-1/2 bg-base-300 p-2 rounded" />
                                    <input name="relationship" value={b.relationship} onChange={e => handleInputChange(e, 'beneficiaries', i, 'relationship')} placeholder="Relationship" className="w-1/2 bg-base-300 p-2 rounded" />
                                </div>
                            ))}
                            <button onClick={addBeneficiary} className="text-sm text-brand-primary font-semibold">+ Add Beneficiary</button>
                        </div>
                         <div>
                            <h4 className="font-semibold text-white mb-2">Assets</h4>
                             {willData.assets.map((a, i) => (
                                <div key={a.id} className="flex gap-2 mb-2 items-center">
                                    <p className="w-1/2 p-2 bg-base-100 rounded text-sm">{a.description}</p>
                                    <select name="beneficiaryId" value={a.beneficiaryId || ''} onChange={e => handleInputChange(e, 'assets', i, 'beneficiaryId')} className="w-1/2 bg-base-300 p-2 rounded">
                                        <option value="">Assign to...</option>
                                        {willData.beneficiaries.map(b => b.name && <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                 {step === 4 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Step 4: Witnesses</h3>
                        <p className="text-sm text-content-200 mb-2">You will need two witnesses who are not beneficiaries.</p>
                        <div className="mb-4">
                            <h4 className="font-semibold text-white mb-2">Witness 1</h4>
                             <input name="name" value={willData.witness1.name} onChange={e => handleInputChange(e, 'witness1')} placeholder="Witness 1 Full Name" className="w-full bg-base-300 p-2 rounded mb-2" />
                             <input name="address" value={willData.witness1.address} onChange={e => handleInputChange(e, 'witness1')} placeholder="Witness 1 Full Address" className="w-full bg-base-300 p-2 rounded" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Witness 2</h4>
                             <input name="name" value={willData.witness2.name} onChange={e => handleInputChange(e, 'witness2')} placeholder="Witness 2 Full Name" className="w-full bg-base-300 p-2 rounded mb-2" />
                             <input name="address" value={willData.witness2.address} onChange={e => handleInputChange(e, 'witness2')} placeholder="Witness 2 Full Address" className="w-full bg-base-300 p-2 rounded" />
                        </div>
                    </div>
                )}
                 {step === 5 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Step 5: Review & Generate</h3>
                        <p className="text-content-200 mb-4">Please review all the information you've entered. When you are ready, click the button below to generate a draft of your will.</p>
                        <div className="bg-base-300 p-4 rounded-lg space-y-2 text-sm">
                            <p><strong>Your Name:</strong> {willData.fullName}</p>
                            <p><strong>Executor:</strong> {willData.executor.name}</p>
                            <p><strong>Beneficiaries:</strong> {willData.beneficiaries.map(b => b.name).join(', ')}</p>
                            <p><strong>Witnesses:</strong> {willData.witness1.name}, {willData.witness2.name}</p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Navigation */}
            <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="bg-base-300 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50">Back</button>
                {step < totalSteps && <button onClick={() => setStep(s => Math.min(totalSteps, s + 1))} className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300">Next</button>}
                {step === totalSteps && <button onClick={handleGenerateWill} className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300">Generate Will</button>}
            </div>
        </div>
    );
};

export default WillCreatorPage;