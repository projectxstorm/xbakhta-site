'use client'

import React from 'react'
import { useAdmin } from '@/app/context/AdminContext'
import { Calendar, AlertTriangle, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const LaunchSettingsEditor = () => {
  const { launchSettings, updateLaunchSettings, toggleLaunchMode } = useAdmin();
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-yellow-400 mb-2">LAUNCH MODE SETTINGS</h3>
        
        {/* Launch Mode Toggle */}
        <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700/50 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold">Launch Mode</h4>
              <p className="text-xs text-gray-400">
                {launchSettings.isActive 
                  ? "Launch mode is active - visitors will see the launch page" 
                  : "Launch mode is inactive - visitors will see the regular site"}
              </p>
            </div>
            
            <div className="flex items-center">
              <span className="mr-3 text-sm text-gray-400">
                {launchSettings.isActive ? "Enabled" : "Disabled"}
              </span>
              <button
                onClick={toggleLaunchMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  launchSettings.isActive ? 'bg-green-600 focus:ring-green-600' : 'bg-gray-600 focus:ring-yellow-500'
                }`}
                role="switch"
                aria-checked={launchSettings.isActive}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    launchSettings.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          {launchSettings.isActive && (
            <div className="p-3 border border-yellow-600/30 bg-yellow-900/20 rounded text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-yellow-400">
                Remember to set your launch date and content before activating launch mode
              </span>
            </div>
          )}
        </div>
        
        {/* Auto Redirect Toggle */}
        <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700/50 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold">Auto Redirect</h4>
              <p className="text-xs text-gray-400">
                {launchSettings.redirectToLaunch 
                  ? "Visitors will be automatically redirected to the launch page" 
                  : "Visitors need to manually navigate to the launch page"}
              </p>
            </div>
            
            <div className="flex items-center">
              <span className="mr-3 text-sm text-gray-400">
                {launchSettings.redirectToLaunch ? "Enabled" : "Disabled"}
              </span>
              <button
                onClick={() => updateLaunchSettings({ redirectToLaunch: !launchSettings.redirectToLaunch })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  launchSettings.redirectToLaunch ? 'bg-blue-600 focus:ring-blue-600' : 'bg-gray-600 focus:ring-yellow-500'
                }`}
                role="switch"
                aria-checked={launchSettings.redirectToLaunch}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    launchSettings.redirectToLaunch ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Game Logo and Name Section */}
        <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700/50 space-y-4">
          <h4 className="text-white font-semibold mb-2">Game Branding</h4>
          
          {/* Logo Image */}
          <div className="space-y-2">
            <label className="text-xs text-gray-300 flex items-center gap-1">
              <Image 
                src="/path/to/logo.jpg"
                alt="Logo"
                width={12}
                height={12}
                className="h-3 w-3"
              />
              Logo Image URL
            </label>
            <input
              type="text"
              value={launchSettings.logoImage}
              onChange={(e) => updateLaunchSettings({ logoImage: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="/images/logos/game-logo.png"
            />
            <p className="text-xs text-gray-500">
              If no logo is provided, the game name will be displayed instead
            </p>
          </div>
          
          {/* Game Name */}
          <div className="space-y-2">
            <label className="text-xs text-gray-300">Game Name</label>
            <input
              type="text"
              value={launchSettings.gameName}
              onChange={(e) => updateLaunchSettings({ gameName: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="MFPS Tactical"
            />
          </div>
          
          {/* Logo Preview */}
          {launchSettings.logoImage && (
            <div className="mt-2 p-3 bg-black/30 rounded-md">
              <p className="text-xs text-gray-400 mb-2">Logo Preview:</p>
              <div className="w-full h-20 flex items-center justify-center bg-black/50 rounded-md overflow-hidden">
                <Image 
                  src={launchSettings.logoImage} 
                  alt="Game Logo" 
                  className="max-h-16 max-w-[80%] object-contain"
                  width={500}
                  height={300}
                  onError={(e) => {
                    // @ts-expect-error - Event target type is not properly inferred
                    e.target.style.display = 'none';
                    // @ts-expect-error - Same issue
                    e.target.parentNode.innerHTML += `<p class="text-xs text-red-400">Error loading image</p>`;
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Launch Date */}
        <div className="space-y-2">
          <label className="text-xs text-gray-300 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Launch Date
          </label>
          <input
            type="datetime-local"
            value={launchSettings.launchDate}
            onChange={(e) => updateLaunchSettings({ launchDate: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        
        {/* Launch Page Title */}
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Launch Page Title</label>
          <input
            type="text"
            value={launchSettings.title}
            onChange={(e) => updateLaunchSettings({ title: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Game Launch Countdown"
          />
        </div>
        
        {/* Launch Page Subtitle */}
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Launch Page Subtitle</label>
          <input
            type="text"
            value={launchSettings.subtitle}
            onChange={(e) => updateLaunchSettings({ subtitle: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Get ready for the ultimate tactical experience"
          />
        </div>
        
        {/* Background Image */}
        <div className="space-y-2">
          <label className="text-xs text-gray-300">Background Image URL</label>
          <input
            type="text"
            value={launchSettings.backgroundImage}
            onChange={(e) => updateLaunchSettings({ backgroundImage: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="/images/backgrounds/launch-bg.jpg"
          />
        </div>
        
        {/* View Launch Page Button */}
        <div className="py-2">
          <a
            href="/launch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
          >
            View Launch Page
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaunchSettingsEditor; 