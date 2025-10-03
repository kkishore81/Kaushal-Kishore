
import React, { useState, useRef, useEffect } from 'react';
import { getInvestmentAdvice } from '../services/aiAdvisorService';
import { ChatMessage } from '../types';

const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10 3.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V4.25A.75.75 0 0 1 10 3.5ZM10 16.5a.75.75 0 0 1-.75-.75V10.25a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-.75.75Z" transform="rotate(90 10 10)" />
        <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.949a.75.75 0 0 0 .95.826L11.25 9.75l-7.407-2.116A.75.75 0 0 0 3.105 2.29ZM4.795 14.512a.75.75 0 0 0-.95-.826l-1.414-4.949a.75.75 0 0 0 .826.95l7.407 2.116-6.873-1.964Z"/>
    </svg>
);

const AdvisorPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "Hello! I'm your AI investment advisor from Indian Money Code. How can I help you navigate your financial journey today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await getInvestmentAdvice(input);
        const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    return (
        <div className="bg-base-200 rounded-xl shadow-lg flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0"><AiIcon className="w-5 h-5 text-white" /></div>}
                        <div className={`max-w-xl p-3 rounded-lg ${msg.sender === 'ai' ? 'bg-base-300 text-content-100' : 'bg-brand-primary text-white'}`}>
                            <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        </div>
                         {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5 text-content-100" /></div>}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                         <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0"><AiIcon className="w-5 h-5 text-white" /></div>
                        <div className="max-w-md p-3 rounded-lg bg-base-300">
                           <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-content-200 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-content-200 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-content-200 rounded-full animate-pulse"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-base-300">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about funds, strategies, or markets..."
                        className="flex-1 bg-base-300 border border-base-100 rounded-lg px-4 py-2 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-primary text-white rounded-lg p-2.5 disabled:bg-base-300 disabled:cursor-not-allowed hover:bg-brand-secondary transition-colors">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdvisorPage;
