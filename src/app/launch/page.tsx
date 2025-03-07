'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAdmin } from '@/app/context/AdminContext'
import { Calendar, Timer, ArrowRight, ArrowLeft } from 'lucide-react'

const LaunchPage = () => {
  const { launchSettings, footerContent } = useAdmin();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isLaunched, setIsLaunched] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  // Calculate time remaining
  useEffect(() => {
    if (!launchSettings.launchDate) return;
    
    const calculateTimeLeft = () => {
      const difference = new Date(launchSettings.launchDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsLaunched(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setIsLaunched(false);
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [launchSettings.launchDate]);
  
  return (
    <div className="min-h-screen flex flex-col relative bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={launchSettings.backgroundImage || "/images/backgrounds/launch-bg.jpg"}
          alt="Launch Background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />
      </div>
      
      {/* Return to main site link */}
      {!launchSettings.redirectToLaunch && (
        <div className="absolute top-4 left-4 z-50">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2 px-3 bg-black/30 backdrop-blur-sm rounded-md"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Return to main site</span>
          </Link>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Game Logo or Name */}
        <div className="mb-16">
          {launchSettings.logoImage && !logoError ? (
            <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto relative h-32 flex items-center justify-center">
              <img
                src={launchSettings.logoImage}
                alt={launchSettings.gameName || "Game Logo"}
                className="max-h-32 max-w-full object-contain"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4 font-chakra">
              {launchSettings.gameName || "MFPS TACTICAL"}
            </h1>
          )}
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {launchSettings.title}
          </h2>
          <p className="text-xl text-gray-300 md:max-w-2xl mx-auto">
            {launchSettings.subtitle}
          </p>
        </div>
        
        {!isLaunched ? (
          <>
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Timer className="text-yellow-500 mr-2" size={20} />
                <span className="text-white font-semibold">LAUNCHING IN</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center max-w-md mx-auto">
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-white mb-1">{timeLeft.days}</div>
                  <div className="text-xs text-gray-400">DAYS</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-white mb-1">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-400">HOURS</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-white mb-1">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-400">MINUTES</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-white mb-1">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-400">SECONDS</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center justify-center">
                Wishlist Now <ArrowRight className="ml-2" size={16} />
              </button>
              
              <button className="px-6 py-3 bg-black/30 backdrop-blur-sm hover:bg-white/10 text-white rounded-md font-medium transition-colors border border-white/20">
                Sign Up for Updates
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-green-900/30 backdrop-blur-md p-6 rounded-xl border border-green-500/20 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="text-green-500 mr-2" size={20} />
                <span className="text-white font-semibold">AVAILABLE NOW</span>
              </div>
              <p className="text-center text-white">
                The wait is over! Download now and join the battle.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors flex items-center justify-center text-lg">
                Download Now <ArrowRight className="ml-2" size={18} />
              </button>
              
              <button className="px-6 py-3 bg-black/30 backdrop-blur-sm hover:bg-white/10 text-white rounded-md font-medium transition-colors border border-white/20">
                Watch Trailer
              </button>
            </div>
          </>
        )}
      </div>
      
      <footer className="py-6 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            {footerContent.copyright || `© ${new Date().getFullYear()} BlinkBox. All rights reserved.`}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LaunchPage; 