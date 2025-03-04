'use client'

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { HeroButton } from '@/app/context/AdminContext';

// Icons
import { Plus as PlusIcon, X as CloseIcon, Edit as EditIcon, Trash as TrashIcon } from 'lucide-react';

// Form for editing a hero button
const HeroButtonForm = ({ 
  button, 
  onSave, 
  onDelete 
}: { 
  button: HeroButton; 
  onSave: (updatedButton: HeroButton) => void; 
  onDelete: () => void;
}) => {
  const [formData, setFormData] = useState<HeroButton>({...button});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({...prev, [name]: checked}));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Button Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Text</label>
          <input 
            type="text" 
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
          <input 
            type="text" 
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Style</label>
          <select 
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>
        
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="isPrimaryButton" 
            name="isPrimary"
            checked={!!formData.isPrimary}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isPrimaryButton" className="text-sm text-gray-300">Primary Call-to-Action</label>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" /> Delete
        </button>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// Main HeroButtonsEditor component
const HeroButtonsEditor = () => {
  const { heroContent, updateHeroButton, addHeroButton, deleteHeroButton } = useAdmin();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isButtonModalOpen, setIsButtonModalOpen] = useState(false);
  
  const currentButton = selectedButton 
    ? heroContent?.buttons.find(button => button.id === selectedButton) 
    : null;
  
  const openEditButtonModal = (buttonId: string) => {
    setSelectedButton(buttonId);
    setIsButtonModalOpen(true);
  };
  
  const handleAddNewButton = () => {
    // Create a new button with default values
    const newId = `button-${Date.now()}`;
    const newButton: HeroButton = {
      id: newId,
      text: 'New Button',
      url: '#',
      style: 'primary',
      isPrimary: false
    };
    
    addHeroButton(newButton);
    openEditButtonModal(newId);
  };
  
  const handleSaveButton = (updatedButton: HeroButton) => {
    updateHeroButton(updatedButton.id, updatedButton);
    setIsButtonModalOpen(false);
  };
  
  const handleDeleteButton = () => {
    if (currentButton && window.confirm('Are you sure you want to delete this button?')) {
      deleteHeroButton(currentButton.id);
      setIsButtonModalOpen(false);
    }
  };
  
  // Sort buttons so primary ones appear first
  const sortedButtons = [...(heroContent?.buttons || [])].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return 0;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Hero Buttons Editor</h3>
        <button 
          onClick={handleAddNewButton}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" /> Add Button
        </button>
      </div>
      
      <div className="bg-[#161923] rounded-md p-4 mb-4">
        <h4 className="text-lg font-semibold text-white mb-3">Current Hero Content</h4>
        <div className="space-y-2">
          <div>
            <p className="text-gray-400 text-sm">Title:</p>
            <p className="text-white">{heroContent?.title}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Subtitle:</p>
            <p className="text-white">{heroContent?.subtitle}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#161923] rounded-md p-4 mb-4">
        <h4 className="text-lg font-semibold text-white mb-3">Hero Buttons</h4>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {sortedButtons.length > 0 ? sortedButtons.map(button => (
            <div 
              key={button.id} 
              className={`bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center ${button.isPrimary ? 'border-l-4 border-blue-500' : ''}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{button.text}</span>
                  {button.isPrimary && (
                    <span className="bg-blue-600 text-xs text-white px-2 py-0.5 rounded-full">Primary</span>
                  )}
                </div>
                <span className="text-sm text-blue-400">{button.url}</span>
                <span className="text-xs text-gray-500 capitalize">{button.style} style</span>
              </div>
              <button
                onClick={() => openEditButtonModal(button.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                aria-label="Edit button"
              >
                <EditIcon className="h-4 w-4" />
              </button>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">No hero buttons found. Add your first button!</p>
          )}
        </div>
      </div>
      
      {/* Button Edit Modal */}
      {isButtonModalOpen && currentButton && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1f2e] rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">Edit Button</h3>
              <button onClick={() => setIsButtonModalOpen(false)} className="text-gray-400 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <HeroButtonForm 
                button={currentButton} 
                onSave={handleSaveButton}
                onDelete={handleDeleteButton}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroButtonsEditor; 