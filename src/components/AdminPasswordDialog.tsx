'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/app/context/AdminContext';

const AdminPasswordDialog = () => {
  const { isPasswordDialogOpen, closePasswordDialog, verifyPassword } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPasswordDialogOpen && inputRef.current) {
      // Focus the input when dialog opens
      inputRef.current.focus();
    }

    // Reset state when dialog closes
    if (!isPasswordDialogOpen) {
      setPassword('');
      setError('');
    }
  }, [isPasswordDialogOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    verifyPassword(password);
  };

  if (!isPasswordDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-black/80 border border-yellow-500/50 rounded-lg shadow-xl p-6 w-full max-w-md"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            <span className="text-yellow-400">ADMIN</span> LOGIN
          </h2>
          <button 
            onClick={closePasswordDialog}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="border-l-2 border-yellow-500/70 pl-3 mb-6">
          <p className="text-gray-300 text-sm">
            Enter your admin password to access administrator controls.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              ref={inputRef}
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full bg-gray-900/60 border border-gray-700 focus:border-yellow-500 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="Enter admin password"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closePasswordDialog}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordDialog; 