'use client'

import React, { useState } from 'react'
import { useAdmin } from '@/app/context/LaunchContext'
import {
  Calendar,
  Plus as PlusIcon,
  Trash2 as TrashIcon,
  Image as ImageIcon,
  Film as VideoIcon,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react'

// Simple ID generator function as an alternative to uuid
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const LaunchTimerEditor = () => {
  const { 
    launchContent, 
    updateLaunchContent,
    addMediaItem,
    removeMediaItem,
    addSocialLink,
    removeSocialLink,
    addButton,
    removeButton,
    updateButton
  } = useAdmin();
  
  // Form states
  const [newBackgroundUrl, setNewBackgroundUrl] = useState('');
  const [newBackgroundType, setNewBackgroundType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newSocialPlatform, setNewSocialPlatform] = useState<'instagram' | 'twitter' | 'facebook' | 'youtube' | 'twitch' | 'other'>('twitter');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  
  // Handle releaseDate input - ISO format for datepicker
  const handleReleaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLaunchContent({ releaseDate: e.target.value });
  };
  
  // Add background media
  const handleAddBackgroundMedia = () => {
    if (!newBackgroundUrl) return;
    
    addMediaItem({
      id: generateId(),
      type: newBackgroundType,
      url: newBackgroundUrl
    }, 'background');
    
    setNewBackgroundUrl('');
  };
  
  // Add gallery media
  const handleAddGalleryMedia = () => {
    if (!newMediaUrl) return;
    
    addMediaItem({
      id: generateId(),
      type: newMediaType,
      url: newMediaUrl,
      title: newMediaTitle || 'Media Item'
    }, 'gallery');
    
    setNewMediaUrl('');
    setNewMediaTitle('');
  };
  
  // Add social link
  const handleAddSocialLink = () => {
    if (!newSocialUrl) return;
    
    addSocialLink({
      id: generateId(),
      platform: newSocialPlatform,
      url: newSocialUrl
    });
    
    setNewSocialUrl('');
  };
  
  // Add button
  const handleAddButton = (target: 'preRelease' | 'postLaunch') => {
    const buttonText = target === 'preRelease' ? 'New Pre-Release Button' : 'New Post-Launch Button';
    
    addButton({
      id: generateId(),
      text: buttonText,
      url: '#',
      isPrimary: false
    }, target);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-yellow-400 mb-2">LAUNCH TIMER SETTINGS</h3>
        
        {/* Release Date */}
        <div className="space-y-2">
          <label className="text-xs text-gray-300 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Release Date
          </label>
          <input
            type="datetime-local"
            value={launchContent.releaseDate}
            onChange={handleReleaseDateChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
          />
          {!launchContent.releaseDate && (
            <p className="text-xs text-amber-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              No release date set. Timer will not be displayed.
            </p>
          )}
        </div>
        
        {/* Pre-Launch Content */}
        <div className="p-3 bg-gray-800/50 rounded-md space-y-3 border border-gray-700/50">
          <h4 className="text-xs font-semibold text-gray-300">Pre-Launch Content</h4>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Title</label>
            <input
              type="text"
              value={launchContent.title}
              onChange={(e) => updateLaunchContent({ title: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="LAUNCHING SOON"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Description</label>
            <textarea
              value={launchContent.description}
              onChange={(e) => updateLaunchContent({ description: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none h-20"
              placeholder="Prepare for the ultimate tactical experience. The countdown has begun."
            />
          </div>
          
          {/* Pre-Release Buttons */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-400">Pre-Release Buttons</label>
              <button
                onClick={() => handleAddButton('preRelease')}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
              >
                <PlusIcon className="h-3 w-3" />
                Add
              </button>
            </div>
            
            {launchContent.preReleaseButtons.map((button) => (
              <div key={button.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={button.text}
                  onChange={(e) => updateButton(button.id, { text: e.target.value }, 'preRelease')}
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Button Text"
                />
                <input
                  type="text"
                  value={button.url}
                  onChange={(e) => updateButton(button.id, { url: e.target.value }, 'preRelease')}
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="URL"
                />
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={button.isPrimary}
                    onChange={(e) => updateButton(button.id, { isPrimary: e.target.checked }, 'preRelease')}
                    className="rounded border-gray-700 text-yellow-500 focus:ring-yellow-500"
                  />
                  Primary
                </label>
                <button
                  onClick={() => removeButton(button.id, 'preRelease')}
                  className="text-red-400 hover:text-red-300"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Post-Launch Content */}
        <div className="p-3 bg-gray-800/50 rounded-md space-y-3 border border-gray-700/50">
          <h4 className="text-xs font-semibold text-gray-300">Post-Launch Content</h4>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Title</label>
            <input
              type="text"
              value={launchContent.postLaunchTitle}
              onChange={(e) => updateLaunchContent({ postLaunchTitle: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="AVAILABLE NOW"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Description</label>
            <textarea
              value={launchContent.postLaunchDescription}
              onChange={(e) => updateLaunchContent({ postLaunchDescription: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none h-20"
              placeholder="The wait is over. Begin your mission today and join the fight."
            />
          </div>
          
          {/* Post-Launch Buttons */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-400">Post-Launch Buttons</label>
              <button
                onClick={() => handleAddButton('postLaunch')}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
              >
                <PlusIcon className="h-3 w-3" />
                Add
              </button>
            </div>
            
            {launchContent.postLaunchButtons.map((button) => (
              <div key={button.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={button.text}
                  onChange={(e) => updateButton(button.id, { text: e.target.value }, 'postLaunch')}
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Button Text"
                />
                <input
                  type="text"
                  value={button.url}
                  onChange={(e) => updateButton(button.id, { url: e.target.value }, 'postLaunch')}
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="URL"
                />
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={button.isPrimary}
                    onChange={(e) => updateButton(button.id, { isPrimary: e.target.checked }, 'postLaunch')}
                    className="rounded border-gray-700 text-yellow-500 focus:ring-yellow-500"
                  />
                  Primary
                </label>
                <button
                  onClick={() => removeButton(button.id, 'postLaunch')}
                  className="text-red-400 hover:text-red-300"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background Media */}
        <div className="p-3 bg-gray-800/50 rounded-md space-y-3 border border-gray-700/50">
          <h4 className="text-xs font-semibold text-gray-300">Background Media</h4>
          
          <div className="flex gap-2">
            <select
              value={newBackgroundType}
              onChange={(e) => setNewBackgroundType(e.target.value as 'image' | 'video')}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input
              type="text"
              value={newBackgroundUrl}
              onChange={(e) => setNewBackgroundUrl(e.target.value)}
              className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="URL"
            />
            <button
              onClick={handleAddBackgroundMedia}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
              disabled={!newBackgroundUrl}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          
          {launchContent.backgroundMedia.map((media) => (
            <div key={media.id} className="flex items-center gap-2 bg-gray-800 rounded-md p-2 text-sm">
              {media.type === 'image' ? <ImageIcon className="h-4 w-4 text-blue-400" /> : <VideoIcon className="h-4 w-4 text-red-400" />}
              <span className="line-clamp-1 flex-grow">{media.url}</span>
              <button
                onClick={() => removeMediaItem(media.id, 'background')}
                className="text-red-400 hover:text-red-300"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Media Gallery */}
        <div className="p-3 bg-gray-800/50 rounded-md space-y-3 border border-gray-700/50">
          <h4 className="text-xs font-semibold text-gray-300">Media Gallery</h4>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as 'image' | 'video')}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              <input
                type="text"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="URL"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMediaTitle}
                onChange={(e) => setNewMediaTitle(e.target.value)}
                className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Title (optional)"
              />
              <button
                onClick={handleAddGalleryMedia}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
                disabled={!newMediaUrl}
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {launchContent.mediaGallery.map((media) => (
            <div key={media.id} className="flex items-center gap-2 bg-gray-800 rounded-md p-2 text-sm">
              {media.type === 'image' ? <ImageIcon className="h-4 w-4 text-blue-400" /> : <VideoIcon className="h-4 w-4 text-red-400" />}
              <div className="line-clamp-1 flex-grow">
                <div>{media.title}</div>
                <div className="text-xs text-gray-500">{media.url}</div>
              </div>
              <button
                onClick={() => removeMediaItem(media.id, 'gallery')}
                className="text-red-400 hover:text-red-300"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Social Links */}
        <div className="p-3 bg-gray-800/50 rounded-md space-y-3 border border-gray-700/50">
          <h4 className="text-xs font-semibold text-gray-300">Social Media Links</h4>
          
          <div className="flex gap-2">
            <select
              value={newSocialPlatform}
              onChange={(e) => setNewSocialPlatform(e.target.value as 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'twitch' | 'other')}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              value={newSocialUrl}
              onChange={(e) => setNewSocialUrl(e.target.value)}
              className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="URL"
            />
            <button
              onClick={handleAddSocialLink}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
              disabled={!newSocialUrl}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          
          {launchContent.socialLinks.map((link) => (
            <div key={link.id} className="flex items-center gap-2 bg-gray-800 rounded-md p-2 text-sm">
              <LinkIcon className="h-4 w-4 text-green-400" />
              <div className="flex-grow">
                <span className="bg-gray-700 rounded-full px-2 py-0.5 text-xs uppercase">{link.platform}</span>
                <span className="ml-2 line-clamp-1">{link.url}</span>
              </div>
              <button
                onClick={() => removeSocialLink(link.id)}
                className="text-red-400 hover:text-red-300"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchTimerEditor; 