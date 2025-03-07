'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Media item for background and gallery
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  description?: string;
}

// Button interface for CTA buttons
interface LaunchButton {
  id: string;
  text: string;
  url: string;
  isPrimary: boolean;
}

// Social media link interface
interface SocialLink {
  id: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'twitch' | 'other';
  url: string;
}

// Main launch content interface
interface LaunchContent {
  // Pre-launch content
  title: string;
  description: string;
  releaseDate: string; // ISO date string
  backgroundMedia: MediaItem[];
  mediaGallery: MediaItem[];
  socialLinks: SocialLink[];
  preReleaseButtons: LaunchButton[];
  
  // Post-launch content
  postLaunchTitle: string;
  postLaunchDescription: string;
  postLaunchButtons: LaunchButton[];
}

// Context interface
interface LaunchContextType {
  launchContent: LaunchContent;
  isAdmin: boolean;
  updateLaunchContent: (data: Partial<LaunchContent>) => void;
  addMediaItem: (item: MediaItem, target: 'background' | 'gallery') => void;
  removeMediaItem: (id: string, target: 'background' | 'gallery') => void;
  addSocialLink: (link: SocialLink) => void;
  removeSocialLink: (id: string) => void;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  addButton: (button: LaunchButton, target: 'preRelease' | 'postLaunch') => void;
  removeButton: (id: string, target: 'preRelease' | 'postLaunch') => void;
  updateButton: (id: string, data: Partial<LaunchButton>, target: 'preRelease' | 'postLaunch') => void;
}

// Storage keys
const LAUNCH_CONTENT_KEY = 'game_launch_content';

// Default launch content
const defaultLaunchContent: LaunchContent = {
  title: 'LAUNCHING SOON',
  description: 'Prepare for the ultimate tactical experience. The countdown has begun.',
  releaseDate: '', // Empty by default
  backgroundMedia: [],
  mediaGallery: [],
  socialLinks: [
    {
      id: '1',
      platform: 'twitter',
      url: 'https://twitter.com'
    },
    {
      id: '2',
      platform: 'instagram',
      url: 'https://instagram.com'
    }
  ],
  preReleaseButtons: [
    {
      id: '1',
      text: 'Pre-order Now',
      url: '#',
      isPrimary: true
    },
    {
      id: '2',
      text: 'Learn More',
      url: '#',
      isPrimary: false
    }
  ],
  postLaunchTitle: 'AVAILABLE NOW',
  postLaunchDescription: 'The wait is over. Begin your mission today and join the fight.',
  postLaunchButtons: [
    {
      id: '1',
      text: 'Buy Now',
      url: '#',
      isPrimary: true
    },
    {
      id: '2',
      text: 'Watch Trailer',
      url: '#',
      isPrimary: false
    }
  ]
};

// Create the context
const LaunchContext = createContext<LaunchContextType | null>(null);

// Custom hook to use the context
export const useAdmin = () => {
  const context = useContext(LaunchContext);
  if (!context) {
    throw new Error('useAdmin must be used within a LaunchProvider');
  }
  return context;
};

// Provider component
export const LaunchProvider = ({ children }: { children: ReactNode }) => {
  const [launchContent, setLaunchContent] = useState<LaunchContent>(defaultLaunchContent);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get admin state from AdminContext if available
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined' && !isInitialized) {
      // Check for admin session - we'll have to integrate with your admin system
      const adminSession = sessionStorage.getItem('admin_session');
      if (adminSession === 'true') {
        setIsAdmin(true);
      }
      
      // Load saved launch content if available
      const savedContent = localStorage.getItem(LAUNCH_CONTENT_KEY);
      if (savedContent) {
        try {
          setLaunchContent(JSON.parse(savedContent));
        } catch (err) {
          console.error('Error parsing saved launch content:', err);
        }
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);
  
  // Save launch content when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(LAUNCH_CONTENT_KEY, JSON.stringify(launchContent));
    }
  }, [launchContent, isInitialized]);
  
  // Update launch content
  const updateLaunchContent = (data: Partial<LaunchContent>) => {
    setLaunchContent(prev => ({ ...prev, ...data }));
  };
  
  // Media management functions
  const addMediaItem = (item: MediaItem, target: 'background' | 'gallery') => {
    setLaunchContent(prev => {
      if (target === 'background') {
        return {
          ...prev,
          backgroundMedia: [...prev.backgroundMedia, item]
        };
      } else {
        return {
          ...prev,
          mediaGallery: [...prev.mediaGallery, item]
        };
      }
    });
  };
  
  const removeMediaItem = (id: string, target: 'background' | 'gallery') => {
    setLaunchContent(prev => {
      if (target === 'background') {
        return {
          ...prev,
          backgroundMedia: prev.backgroundMedia.filter(item => item.id !== id)
        };
      } else {
        return {
          ...prev,
          mediaGallery: prev.mediaGallery.filter(item => item.id !== id)
        };
      }
    });
  };
  
  // Social link functions
  const addSocialLink = (link: SocialLink) => {
    setLaunchContent(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, link]
    }));
  };
  
  const removeSocialLink = (id: string) => {
    setLaunchContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };
  
  const updateSocialLink = (id: string, data: Partial<SocialLink>) => {
    setLaunchContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => 
        link.id === id ? { ...link, ...data } : link
      )
    }));
  };
  
  // Button functions
  const addButton = (button: LaunchButton, target: 'preRelease' | 'postLaunch') => {
    setLaunchContent(prev => {
      if (target === 'preRelease') {
        return {
          ...prev,
          preReleaseButtons: [...prev.preReleaseButtons, button]
        };
      } else {
        return {
          ...prev,
          postLaunchButtons: [...prev.postLaunchButtons, button]
        };
      }
    });
  };
  
  const removeButton = (id: string, target: 'preRelease' | 'postLaunch') => {
    setLaunchContent(prev => {
      if (target === 'preRelease') {
        return {
          ...prev,
          preReleaseButtons: prev.preReleaseButtons.filter(button => button.id !== id)
        };
      } else {
        return {
          ...prev,
          postLaunchButtons: prev.postLaunchButtons.filter(button => button.id !== id)
        };
      }
    });
  };
  
  const updateButton = (id: string, data: Partial<LaunchButton>, target: 'preRelease' | 'postLaunch') => {
    setLaunchContent(prev => {
      if (target === 'preRelease') {
        return {
          ...prev,
          preReleaseButtons: prev.preReleaseButtons.map(button => 
            button.id === id ? { ...button, ...data } : button
          )
        };
      } else {
        return {
          ...prev,
          postLaunchButtons: prev.postLaunchButtons.map(button => 
            button.id === id ? { ...button, ...data } : button
          )
        };
      }
    });
  };
  
  return (
    <LaunchContext.Provider value={{
      launchContent,
      isAdmin,
      updateLaunchContent,
      addMediaItem,
      removeMediaItem,
      addSocialLink,
      removeSocialLink,
      updateSocialLink,
      addButton,
      removeButton,
      updateButton
    }}>
      {children}
    </LaunchContext.Provider>
  );
};

export default LaunchContext; 