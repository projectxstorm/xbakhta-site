'use client'

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { BottomButton } from '@/app/context/AdminContext';

// Icons
import { Plus as PlusIcon, X as CloseIcon, Edit as EditIcon, Trash as TrashIcon } from 'lucide-react';

// Form for editing a bottom button
const BottomButtonForm = ({ 
  button, 
  onSave, 
  onDelete 
}: { 
  button: BottomButton; 
  onSave: (updatedButton: BottomButton) => void; 
  onDelete: () => void;
}) => {
  const [formData, setFormData] = useState<BottomButton>({...button});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
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
          <label className="block text-sm font-medium text-gray-400 mb-1">Icon (Lucide icon name)</label>
          <input 
            type="text" 
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter a Lucide icon name (e.g., &quot;download&quot;, &quot;arrow-right&quot;, &quot;external-link&quot;).
            See <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lucide Icons</a> for options.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Position</label>
          <select 
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
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

// Main BottomButtonsEditor component
const BottomButtonsEditor = () => {
  const { bottomButtons, updateBottomButton, addBottomButton, deleteBottomButton } = useAdmin();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isButtonModalOpen, setIsButtonModalOpen] = useState(false);
  
  const currentButton = selectedButton 
    ? bottomButtons?.find(button => button.id === selectedButton) 
    : null;
  
  const openEditButtonModal = (buttonId: string) => {
    setSelectedButton(buttonId);
    setIsButtonModalOpen(true);
  };
  
  const handleAddNewButton = () => {
    // Create a new button with default values
    const newId = `bottom-btn-${Date.now()}`;
    const newButton: BottomButton = {
      id: newId,
      text: 'New Button',
      url: '#',
      icon: 'arrow-right',
      position: 'center'
    };
    
    addBottomButton(newButton);
    openEditButtonModal(newId);
  };
  
  const handleSaveButton = (updatedButton: BottomButton) => {
    updateBottomButton(updatedButton.id, updatedButton);
    setIsButtonModalOpen(false);
  };
  
  const handleDeleteButton = () => {
    if (currentButton && window.confirm('Are you sure you want to delete this button?')) {
      deleteBottomButton(currentButton.id);
      setIsButtonModalOpen(false);
    }
  };
  
  // Group buttons by position
  const leftButtons = bottomButtons?.filter(btn => btn.position === 'left') || [];
  const centerButtons = bottomButtons?.filter(btn => btn.position === 'center') || [];
  const rightButtons = bottomButtons?.filter(btn => btn.position === 'right') || [];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Bottom Buttons Editor</h3>
        <button 
          onClick={handleAddNewButton}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" /> Add Button
        </button>
      </div>
      
      {/* Left positioned buttons */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Left Buttons</h4>
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {leftButtons.length > 0 ? leftButtons.map(button => (
              <div key={button.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 bg-gray-800 rounded-full text-white">
                    <span className="text-sm">{button.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{button.text}</span>
                    <span className="text-sm text-blue-400">{button.url}</span>
                  </div>
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
              <p className="text-gray-500 text-center py-4">No left buttons found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Center positioned buttons */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Center Buttons</h4>
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {centerButtons.length > 0 ? centerButtons.map(button => (
              <div key={button.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 bg-gray-800 rounded-full text-white">
                    <span className="text-sm">{button.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{button.text}</span>
                    <span className="text-sm text-blue-400">{button.url}</span>
                  </div>
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
              <p className="text-gray-500 text-center py-4">No center buttons found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Right positioned buttons */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Right Buttons</h4>
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {rightButtons.length > 0 ? rightButtons.map(button => (
              <div key={button.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 bg-gray-800 rounded-full text-white">
                    <span className="text-sm">{button.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{button.text}</span>
                    <span className="text-sm text-blue-400">{button.url}</span>
                  </div>
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
              <p className="text-gray-500 text-center py-4">No right buttons found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Button Edit Modal */}
      {isButtonModalOpen && currentButton && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1f2e] rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">Edit Bottom Button</h3>
              <button onClick={() => setIsButtonModalOpen(false)} className="text-gray-400 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <BottomButtonForm 
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

export default BottomButtonsEditor; 