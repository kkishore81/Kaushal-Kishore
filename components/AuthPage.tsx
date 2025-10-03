import React, { useState } from 'react';

interface AuthPageProps {
    onLoginSuccess: () => void;
}

const RupeeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 7H9.21C9.69 6.39 10.28 6 11 6h7a1 1 0 000-2h-7c-1.66 0-3 1.34-3 3v1h-1a1 1 0 000 2h1v2H8a1 1 0 000 2h2v1c0 1.66 1.34 3 3 3h7a1 1 0 000-2h-7c-.55 0-1-.45-1-1v-1h1a1 1 0 000-2h-1v-2h8a1 1 0 000-2z" />
  </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.596,44,31.1,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    
    // In a real app, this would involve API calls. Here, we simulate success.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess();
    };

    const handleGoogleSignIn = () => {
        // Simulate successful Google sign-in
        onLoginSuccess();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-md">
                 <div className="flex items-center justify-center space-x-3 mb-8">
                    <RupeeIcon className="h-10 w-10 text-brand-primary" />
                    <h1 className="text-3xl font-bold text-white">
                        Indian Money Code
                    </h1>
                </div>
                
                <div className="bg-base-200 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                    <p className="text-content-200 text-center mb-6">
                        {isLogin ? 'Sign in to access your dashboard' : 'Get started with your financial journey'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                             <input type="text" placeholder="Full Name" required className="w-full bg-base-300 border border-base-100 rounded-lg px-4 py-3 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                        )}
                        <input type="email" placeholder="Email Address" required className="w-full bg-base-300 border border-base-100 rounded-lg px-4 py-3 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                        <input type="password" placeholder="Password" required className="w-full bg-base-300 border border-base-100 rounded-lg px-4 py-3 text-content-100 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                        
                        <button type="submit" className="w-full bg-brand-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300">
                           {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-base-300"></div>
                        <span className="flex-shrink mx-4 text-content-200 text-sm">OR</span>
                        <div className="flex-grow border-t border-base-300"></div>
                    </div>

                    <button onClick={handleGoogleSignIn} className="w-full flex justify-center items-center gap-3 bg-base-300 text-white font-semibold py-3 px-4 rounded-lg hover:bg-base-100 transition-colors duration-300">
                        <GoogleIcon className="w-6 h-6" />
                        Sign in with Google
                    </button>

                     <p className="text-center text-sm text-content-200 mt-6">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brand-primary hover:underline ml-2">
                             {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
