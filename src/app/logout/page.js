'use client';

import React from 'react';
import { LogOut, Home, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Logout Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <LogOut className="w-8 h-8 text-blue-600" />
        </div>
        
        {/* Main Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You've Been Logged Out
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for using our service. You have been safely logged out of your account.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Log Back In
          </button>
          
          {/* <button
            onClick={handleHome}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            Return to Homepage
          </button> */}
        </div>
        
        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          If you didn't initiate this logout, please contact support.
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;