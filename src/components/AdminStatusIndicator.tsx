'use client'

import React from 'react'
import { useAdmin } from '@/app/context/AdminContext'

const AdminStatusIndicator = () => {
  const { isAdmin, logoutAdmin, isPasswordDialogOpen, toggleAdminSidebar, adminSidebarOpen } = useAdmin();
  
  if (!isAdmin && !isPasswordDialogOpen) return null;
  
  return (
    <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end gap-3">
      {isPasswordDialogOpen ? (
        <div 
          className="bg-black/80 text-white p-3 rounded-lg shadow-lg flex items-center gap-3"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <span className="text-sm font-semibold">
            <span className="text-yellow-400">SECURITY</span> VERIFICATION
          </span>
        </div>
      ) : (
        <>
          {/* Admin Badge - Clickable */}
          <div 
            onClick={toggleAdminSidebar}
            className={`
              bg-black/80 text-white p-3 rounded-lg shadow-lg flex items-center gap-3 cursor-pointer
              hover:bg-black/90 transition-all duration-300 
              ${adminSidebarOpen ? 'border-l-4 border-yellow-400' : 'hover:translate-x-[-5px]'}
            `}
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-semibold">
              <span className="text-yellow-400">ADMIN</span> PANEL
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 text-yellow-400 transition-transform duration-300 ${adminSidebarOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          
          {/* Session Indicator */}
          <div 
            className="bg-black/80 text-white px-3 py-1 rounded-lg shadow-lg flex items-center text-xs"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <span className="text-gray-400 mr-1">Session active</span>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          
          {/* Exit Admin Button */}
          <div 
            className="bg-black/80 text-white p-2 rounded-lg shadow-lg flex items-center"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <button 
              onClick={logoutAdmin}
              className="px-2 py-1 bg-red-600/80 hover:bg-red-500 text-xs rounded transition flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStatusIndicator; 