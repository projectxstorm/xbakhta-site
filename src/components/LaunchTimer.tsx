'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAdmin } from '@/app/context/LaunchContext'
import { 
  Calendar, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Twitch,
  ArrowRight
} from 'lucide-react'

// Import necessary types from LaunchContext
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
}

interface LaunchButton {
  id: string;
  text: string;
  url: string;
  isPrimary: boolean;
}

interface SocialLink {
  id: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'twitch' | 'other';
  url: string;
}

const LaunchTimer = () => {
  const { launchContent, isAdmin } = useAdmin();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Calculate time remaining
  useEffect(() => {
    if (!launchContent.releaseDate) return;
    
    const calculateTimeLeft = () => {
      const difference = new Date(launchContent.releaseDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Release date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [launchContent.releaseDate]);
  
  // If no release date is set
  if (!launchContent.releaseDate && !isAdmin) {
    return null;
  }
  
  const hasTimePassed = 
    timeLeft.days === 0 && 
    timeLeft.hours === 0 && 
    timeLeft.minutes === 0 && 
    timeLeft.seconds === 0 && 
    launchContent.releaseDate;
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background media layer */}
      <div className="absolute inset-0 z-0 opacity-30">
        {launchContent.backgroundMedia && launchContent.backgroundMedia.length > 0 && (
          <div className="relative w-full h-full">
            {launchContent.backgroundMedia[0].type === 'image' ? (
              <Image 
                src={launchContent.backgroundMedia[0].url} 
                alt="Background" 
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
              >
                <source src={launchContent.backgroundMedia[0].url} type="video/mp4" />
              </video>
            )}
          </div>
        )}
      </div>
      
      {/* Overlay to make content more readable */}
      <div className="absolute inset-0 bg-black/50 z-1"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-chakra">
          {hasTimePassed ? launchContent.postLaunchTitle || 'AVAILABLE NOW!' : launchContent.title || 'COMING SOON'}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          {hasTimePassed ? launchContent.postLaunchDescription || 'The wait is over. Begin your mission.' : launchContent.description || 'Get ready for the ultimate tactical experience'}
        </p>
        
        {!hasTimePassed && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="bg-black/70 p-6 rounded-lg backdrop-blur-md border border-yellow-500/20 flex flex-col items-center min-w-[120px]">
              <span className="text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-sm uppercase text-gray-400 mt-2">Days</span>
            </div>
            <div className="bg-black/70 p-6 rounded-lg backdrop-blur-md border border-yellow-500/20 flex flex-col items-center min-w-[120px]">
              <span className="text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-sm uppercase text-gray-400 mt-2">Hours</span>
            </div>
            <div className="bg-black/70 p-6 rounded-lg backdrop-blur-md border border-yellow-500/20 flex flex-col items-center min-w-[120px]">
              <span className="text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-sm uppercase text-gray-400 mt-2">Minutes</span>
            </div>
            <div className="bg-black/70 p-6 rounded-lg backdrop-blur-md border border-yellow-500/20 flex flex-col items-center min-w-[120px]">
              <span className="text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-sm uppercase text-gray-400 mt-2">Seconds</span>
            </div>
          </div>
        )}
        
        {/* Release Information */}
        <div className="mb-12 flex justify-center items-center gap-2 text-gray-300">
          <Calendar className="h-5 w-5 text-yellow-500" />
          <span>
            {hasTimePassed 
              ? `Released on ${new Date(launchContent.releaseDate).toLocaleDateString()}` 
              : `Releasing on ${new Date(launchContent.releaseDate).toLocaleDateString()}`}
          </span>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {hasTimePassed && launchContent.postLaunchButtons && launchContent.postLaunchButtons.map((button: LaunchButton, index: number) => (
            <a 
              key={index}
              href={button.url}
              className={`px-8 py-3 rounded-md font-medium flex items-center gap-2 transition-all
                ${button.isPrimary 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                  : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}`}
            >
              {button.text}
              <ArrowRight className="h-4 w-4" />
            </a>
          ))}
          
          {!hasTimePassed && launchContent.preReleaseButtons && launchContent.preReleaseButtons.map((button: LaunchButton, index: number) => (
            <a 
              key={index}
              href={button.url}
              className={`px-8 py-3 rounded-md font-medium flex items-center gap-2 transition-all
                ${button.isPrimary 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                  : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}`}
            >
              {button.text}
              <ArrowRight className="h-4 w-4" />
            </a>
          ))}
        </div>
        
        {/* Media Gallery */}
        {launchContent.mediaGallery && launchContent.mediaGallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-chakra">LATEST MEDIA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {launchContent.mediaGallery.map((media: MediaItem, index: number) => (
                <div 
                  key={index} 
                  className="relative h-60 bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group"
                >
                  {media.type === 'image' ? (
                    <Image 
                      src={media.url} 
                      alt={media.title || 'Media item'} 
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <video
                      controls
                      className="absolute w-full h-full object-cover"
                    >
                      <source src={media.url} type="video/mp4" />
                    </video>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <p className="text-white text-sm font-medium">{media.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Social Media Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 font-chakra">FOLLOW US</h2>
          <div className="flex justify-center gap-4">
            {launchContent.socialLinks && launchContent.socialLinks.map((link: SocialLink, index: number) => {
              const Icon = () => {
                switch(link.platform) {
                  case 'instagram': return <Instagram className="h-6 w-6" />;
                  case 'twitter': return <Twitter className="h-6 w-6" />;
                  case 'facebook': return <Facebook className="h-6 w-6" />;
                  case 'youtube': return <Youtube className="h-6 w-6" />;
                  case 'twitch': return <Twitch className="h-6 w-6" />;
                  default: return <ArrowRight className="h-6 w-6" />;
                }
              };
              
              return (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white transition-colors"
                  aria-label={link.platform}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchTimer; 