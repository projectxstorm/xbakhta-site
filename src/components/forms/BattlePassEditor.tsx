'use client'

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { BattlePass, BattlePassReward } from '@/app/context/AdminContext';

// Icons
import { Plus as PlusIcon, X as CloseIcon, Edit as EditIcon, Trash as TrashIcon, Star as StarIcon } from 'lucide-react';

// Component for editing battle pass details
const BattlePassForm = ({ 
  battlePass, 
  onSave 
}: { 
  battlePass: BattlePass; 
  onSave: (updatedBattlePass: BattlePass) => void;
}) => {
  const [formData, setFormData] = useState<BattlePass>({...battlePass});
  
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
        <h4 className="text-lg font-semibold text-white mb-2">Battle Pass Information</h4>
        
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
            <label className="block text-sm font-medium text-gray-400 mb-1">Season</label>
            <input 
              type="text" 
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
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
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Price (Credits)</label>
            <input 
              type="number" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Duration (Days)</label>
            <input 
              type="number" 
              name="durationDays"
              value={formData.durationDays}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
            <input 
              type="date" 
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
            <input 
              type="date" 
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="isActiveBattlePass" 
            name="isActive"
            checked={!!formData.isActive}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isActiveBattlePass" className="text-sm text-gray-300">Active Battle Pass</label>
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-gray-700">
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

// Component for editing individual battle pass reward/item
const BattlePassRewardForm = ({ 
  reward, 
  onSave, 
  onDelete 
}: { 
  reward: BattlePassReward; 
  onSave: (updatedReward: BattlePassReward) => void; 
  onDelete: () => void;
}) => {
  const [formData, setFormData] = useState<BattlePassReward>({...reward});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({...prev, [name]: checked}));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: parseInt(value, 10)}));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Reward Information</h4>
        
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
            <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            >
              <option value="Weapon">Weapon</option>
              <option value="Character">Character</option>
              <option value="Skin">Skin</option>
              <option value="Emote">Emote</option>
              <option value="Credits">Credits</option>
              <option value="XP">XP Boost</option>
              <option value="AccessToken">Access Token</option>
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
            <label className="block text-sm font-medium text-gray-400 mb-1">Level</label>
            <input 
              type="number" 
              name="level"
              value={formData.level}
              onChange={handleNumberChange}
              min="1"
              max="100"
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Rarity</label>
            <select 
              name="rarity"
              value={formData.rarity}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
              required
            >
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <input 
            type="checkbox" 
            id="isPremiumReward" 
            name="isPremium"
            checked={!!formData.isPremium}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isPremiumReward" className="text-sm text-gray-300">Premium Tier Reward</label>
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

// Main BattlePassEditor component
const BattlePassEditor = () => {
  const { battlePass, updateBattlePass, premiumRewards, freeRewards, addReward, updateReward, deleteReward } = useAdmin();
  const [isEditingPass, setIsEditingPass] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  
  const allRewards = [...(premiumRewards || []), ...(freeRewards || [])];
  const currentReward = selectedReward 
    ? allRewards.find(reward => reward.id === selectedReward) 
    : null;
  
  const openEditRewardModal = (rewardId: string) => {
    setSelectedReward(rewardId);
    setIsRewardModalOpen(true);
  };
  
  const handleAddNewReward = (isPremium: boolean) => {
    // Create a new reward with default values
    const newId = `reward-${Date.now()}`;
    const newReward: BattlePassReward = {
      id: newId,
      name: 'NEW REWARD',
      description: 'Reward description goes here.',
      image: '/images/rewards/default.png',
      type: 'skin',
      level: isPremium ? (premiumRewards?.length || 0) + 1 : (freeRewards?.length || 0) + 1,
      rarity: 'rare',
      isPremium
    };
    
    addReward(newReward);
    openEditRewardModal(newId);
  };
  
  const handleSaveBattlePass = (updatedBattlePass: BattlePass) => {
    updateBattlePass(updatedBattlePass);
    setIsEditingPass(false);
  };
  
  const handleSaveReward = (updatedReward: BattlePassReward) => {
    updateReward(updatedReward.id, updatedReward);
    setIsRewardModalOpen(false);
  };
  
  const handleDeleteReward = () => {
    if (currentReward && window.confirm('Are you sure you want to delete this reward?')) {
      deleteReward(currentReward.id);
      setIsRewardModalOpen(false);
    }
  };
  
  // Get rewards sorted by level
  const sortedPremiumRewards = [...(premiumRewards || [])].sort((a, b) => a.level - b.level);
  const sortedFreeRewards = [...(freeRewards || [])].sort((a, b) => a.level - b.level);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Battle Pass Editor</h3>
        <button 
          onClick={() => setIsEditingPass(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
        >
          Edit Battle Pass Details
        </button>
      </div>
      
      {/* Battle Pass Details */}
      {!isEditingPass ? (
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <h4 className="text-lg font-semibold text-white mb-3">Current Battle Pass</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Name:</p>
              <p className="text-white">{battlePass?.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Season:</p>
              <p className="text-white">{battlePass?.season}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Price:</p>
              <p className="text-white">{battlePass?.price} Credits</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Duration:</p>
              <p className="text-white">{battlePass?.durationDays} Days</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Status:</p>
              <p className={`${battlePass?.isActive ? 'text-green-400' : 'text-red-400'}`}>
                {battlePass?.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-gray-400 text-sm">Description:</p>
            <p className="text-white">{battlePass?.description}</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <BattlePassForm battlePass={battlePass} onSave={handleSaveBattlePass} />
        </div>
      )}
      
      {/* Battle Pass Rewards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Premium Rewards</h4>
          <button 
            onClick={() => handleAddNewReward(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Premium Reward
          </button>
        </div>
        
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {sortedPremiumRewards && sortedPremiumRewards.length > 0 ? sortedPremiumRewards.map(reward => (
              <div key={reward.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 bg-purple-600 rounded-full text-white font-bold">
                    {reward.level}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{reward.name}</span>
                      <StarIcon className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-sm text-gray-400">{reward.type}</span>
                    <span className="text-xs text-gray-500">{reward.rarity}</span>
                  </div>
                </div>
                <button
                  onClick={() => openEditRewardModal(reward.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-md"
                  aria-label="Edit reward"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No premium rewards found. Add your first reward!</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Free Rewards</h4>
          <button 
            onClick={() => handleAddNewReward(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Free Reward
          </button>
        </div>
        
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {sortedFreeRewards && sortedFreeRewards.length > 0 ? sortedFreeRewards.map(reward => (
              <div key={reward.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 bg-blue-600 rounded-full text-white font-bold">
                    {reward.level}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{reward.name}</span>
                    <span className="text-sm text-gray-400">{reward.type}</span>
                    <span className="text-xs text-gray-500">{reward.rarity}</span>
                  </div>
                </div>
                <button
                  onClick={() => openEditRewardModal(reward.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                  aria-label="Edit reward"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No free rewards found. Add your first reward!</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Reward Edit Modal */}
      {isRewardModalOpen && currentReward && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1f2e] rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">{currentReward.name}</h3>
              <button onClick={() => setIsRewardModalOpen(false)} className="text-gray-400 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <BattlePassRewardForm 
                reward={currentReward} 
                onSave={handleSaveReward}
                onDelete={handleDeleteReward}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattlePassEditor; 