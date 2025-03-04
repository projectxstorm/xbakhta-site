'use client'

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { Map } from '@/app/context/AdminContext';

// Icons
import { Plus as PlusIcon, X as CloseIcon, Edit as EditIcon, Trash as TrashIcon } from 'lucide-react';

// New Icon component for indicating new items
const NewIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.5 3v18m-6-6h12m-6-6h.01M9 3a9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9z" />
  </svg>
);

// Form for editing a single map
const MapForm = ({ 
  map, 
  onSave, 
  onDelete 
}: { 
  map: Map; 
  onSave: (updatedMap: Map) => void; 
  onDelete: () => void;
}) => {
  const [formData, setFormData] = useState<Map>({...map});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({...prev, [name]: checked}));
  };
  
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(f => f.trim() !== '');
    setFormData(prev => ({...prev, features}));
  };
  
  const handleGameModesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const gameModes = e.target.value.split('\n').filter(gm => gm.trim() !== '');
    setFormData(prev => ({...prev, gameModes}));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Map Information</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Environment</label>
            <select 
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            >
              <option value="Urban">Urban</option>
              <option value="Forest">Forest</option>
              <option value="Desert">Desert</option>
              <option value="Arctic">Arctic</option>
              <option value="Industrial">Industrial</option>
              <option value="Military">Military</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md h-20"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Difficulty</label>
            <select 
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Size</label>
            <select 
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Features (one per line)</label>
          <textarea 
            value={formData.features?.join('\n')}
            onChange={handleFeaturesChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md h-20"
            placeholder="Enter map features, one per line"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Game Modes (one per line)</label>
          <textarea 
            value={formData.gameModes?.join('\n')}
            onChange={handleGameModesChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md h-20"
            placeholder="Enter compatible game modes, one per line"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="isNewMap" 
            name="isNew"
            checked={!!formData.isNew}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isNewMap" className="text-sm text-gray-300">Mark as New</label>
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
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSave(map)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

// Component for editing maps
const MapsEditor = () => {
  const { maps, updateMap, addMap, deleteMap } = useAdmin();
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const currentMap = selectedMap 
    ? maps.find(map => map.id === selectedMap) 
    : null;
    
  const openEditModal = (mapId: string) => {
    setSelectedMap(mapId);
    setIsModalOpen(true);
  };
  
  const handleAddNew = () => {
    // Create a new map with default values
    const newId = `map-${Date.now()}`;
    const newMap: Map = {
      id: newId,
      name: 'NEW MAP',
      description: 'Map description goes here.',
      image: '/images/maps/default.png',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      difficulty: 'Medium',
      size: 'Medium',
      environment: 'Urban',
      gameModes: ['Team Deathmatch'],
      isNew: true
    };
    
    addMap(newMap);
    openEditModal(newId);
  };

  const handleSaveMap = (updatedMap: Map) => {
    updateMap(updatedMap.id, updatedMap);
    setIsModalOpen(false);
  };
  
  const handleDeleteMap = () => {
    if (currentMap && window.confirm('Are you sure you want to delete this map?')) {
      deleteMap(currentMap.id);
      setIsModalOpen(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Maps Editor</h3>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" /> Add New Map
        </button>
      </div>
      
      <div className="bg-[#161923] rounded-md p-4 mb-4">
        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          {maps && maps.length > 0 ? maps.map(map => (
            <div key={map.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{map.name}</span>
                    {map.isNew && (
                      <span className="flex items-center">
                        <NewIcon className="h-4 w-4 text-blue-400" />
                        <span className="sr-only">New</span>
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{map.environment}</span>
                  <span className="text-xs text-gray-500">{map.gameModes?.join(', ')}</span>
                </div>
              </div>
              <button
                onClick={() => openEditModal(map.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                aria-label="Edit map"
              >
                <EditIcon className="h-4 w-4" />
              </button>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">No maps found. Add your first map!</p>
          )}
        </div>
      </div>
      
      {isModalOpen && currentMap && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1f2e] rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">{currentMap.name}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <MapForm 
                map={currentMap} 
                onSave={handleSaveMap}
                onDelete={handleDeleteMap}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapsEditor; 