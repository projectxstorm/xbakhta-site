'use client'

import React, { useState } from 'react'
import { useAdmin, GameMode, Operator, Map as GameMap, BattlePass, BattlePassTier } from '@/app/context/AdminContext'
import { 
  X as CloseIcon, 
  Edit3 as EditIcon,
  Plus as PlusIcon,
  Trash2 as TrashIcon,
  Star as StarIcon,
  Tag as NewIcon
} from 'lucide-react'

interface SectionEditorProps {
  section: string;
  title: string;
  description: string;
  onUpdate: (section: string, data: { title: string; description: string }) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ 
  section, 
  title, 
  description,
  onUpdate
}) => {
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleUpdate = () => {
    onUpdate(section, {
      title: titleValue,
      description: descriptionValue
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-yellow-400 mb-2">{section.toUpperCase()}</h3>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Title</label>
        <input
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Description</label>
        <textarea
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm min-h-[80px]"
        />
      </div>
      
      <button
        onClick={handleUpdate}
        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
      >
        Update
      </button>
    </div>
  );
};

// Component for editing site branding
const BrandingEditor = () => {
  const { navigationContent, updateNavigation } = useAdmin();
  const [studioName, setStudioName] = useState(navigationContent.studioName);
  const [tagline, setTagline] = useState(navigationContent.tagline);

  const handleUpdate = () => {
    updateNavigation({
      studioName,
      tagline
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-yellow-400 mb-2">SITE BRANDING</h3>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Studio Name</label>
        <input
          type="text"
          value={studioName}
          onChange={(e) => setStudioName(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Tagline</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <button
        onClick={handleUpdate}
        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
      >
        Update
      </button>
    </div>
  );
};

// Component for editing the download button
const DownloadButtonEditor = () => {
  const { navigationContent, updateNavigation } = useAdmin();
  const [label, setLabel] = useState(navigationContent.downloadButton.label);
  const [href, setHref] = useState(navigationContent.downloadButton.href);

  const handleUpdate = () => {
    updateNavigation({
      downloadButton: { label, href }
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-yellow-400 mb-2">DOWNLOAD BUTTON</h3>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Button Text</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Link URL</label>
        <input
          type="text"
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <button
        onClick={handleUpdate}
        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
      >
        Update
      </button>
    </div>
  );
};

// Component for editing menu items
const MenuItemsEditor = () => {
  const { navigationContent, updateMenuItem } = useAdmin();
  const [selectedItem, setSelectedItem] = useState(navigationContent.menuItems[0].id);
  const currentItem = navigationContent.menuItems.find(item => item.id === selectedItem) || navigationContent.menuItems[0];
  
  const [label, setLabel] = useState(currentItem.label);
  const [href, setHref] = useState(currentItem.href);
  const [enabled, setEnabled] = useState(currentItem.enabled);

  const handleSelectItem = (id: string) => {
    const item = navigationContent.menuItems.find(item => item.id === id) || navigationContent.menuItems[0];
    setSelectedItem(id);
    setLabel(item.label);
    setHref(item.href);
    setEnabled(item.enabled);
  };

  const handleUpdate = () => {
    updateMenuItem(selectedItem, {
      label,
      href,
      enabled
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-yellow-400 mb-2">NAVIGATION ITEMS</h3>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Select Item</label>
        <select
          value={selectedItem}
          onChange={(e) => handleSelectItem(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        >
          {navigationContent.menuItems.map(item => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Link URL</label>
        <input
          type="text"
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3 flex items-center">
        <input
          type="checkbox"
          id="enabledToggle"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="enabledToggle" className="text-xs text-gray-400">
          Enabled
        </label>
      </div>
      
      <button
        onClick={handleUpdate}
        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
      >
        Update
      </button>
    </div>
  );
};

// Component for editing social links
const SocialLinksEditor = () => {
  const { navigationContent, updateSocialLink } = useAdmin();
  const [selectedLink, setSelectedLink] = useState(navigationContent.socialLinks[0].id);
  const currentLink = navigationContent.socialLinks.find(link => link.id === selectedLink) || navigationContent.socialLinks[0];
  
  const [label, setLabel] = useState(currentLink.label);
  const [href, setHref] = useState(currentLink.href);
  const [icon, setIcon] = useState(currentLink.icon);
  const [enabled, setEnabled] = useState(currentLink.enabled);

  const handleSelectLink = (id: string) => {
    const link = navigationContent.socialLinks.find(link => link.id === id) || navigationContent.socialLinks[0];
    setSelectedLink(id);
    setLabel(link.label);
    setHref(link.href);
    setIcon(link.icon);
    setEnabled(link.enabled);
  };

  const handleUpdate = () => {
    updateSocialLink(selectedLink, {
      label,
      href,
      icon,
      enabled
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-yellow-400 mb-2">SOCIAL LINKS</h3>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Select Social Platform</label>
        <select
          value={selectedLink}
          onChange={(e) => handleSelectLink(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        >
          {navigationContent.socialLinks.map(link => (
            <option key={link.id} value={link.id}>
              {link.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Link URL</label>
        <input
          type="text"
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">Icon URL</label>
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
      
      <div className="mb-3 flex items-center">
        <input
          type="checkbox"
          id="socialEnabledToggle"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="socialEnabledToggle" className="text-xs text-gray-400">
          Enabled
        </label>
      </div>
      
      <button
        onClick={handleUpdate}
        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
      >
        Update
      </button>
    </div>
  );
};

// Component for editing game modes
const GameModesEditor = () => {
  const { gameModes } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<'competitive' | 'casual' | 'custom' | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState<string | null>(null);
  
  const filteredModes = selectedCategory === 'all' 
    ? gameModes 
    : gameModes.filter(mode => mode.category === selectedCategory);
  
  const currentGameMode = selectedGameMode 
    ? gameModes.find(mode => mode.id === selectedGameMode) 
    : null;
    
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-yellow-400">GAME MODES</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-1 text-xs rounded ${
              selectedCategory === 'all' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('competitive')}
            className={`px-2 py-1 text-xs rounded ${
              selectedCategory === 'competitive' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Competitive
          </button>
          <button
            onClick={() => setSelectedCategory('casual')}
            className={`px-2 py-1 text-xs rounded ${
              selectedCategory === 'casual' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Casual
          </button>
          <button
            onClick={() => setSelectedCategory('custom')}
            className={`px-2 py-1 text-xs rounded ${
              selectedCategory === 'custom' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Custom
          </button>
        </div>
      </div>
      
      <div className="bg-black/50 rounded border border-gray-800 p-3 mb-4 max-h-[300px] overflow-y-auto">
        {filteredModes.map(mode => (
          <div 
            key={mode.id}
            className="flex items-center justify-between p-2 mb-2 rounded bg-gray-900/50 border border-gray-800 hover:border-yellow-600/30"
          >
            <div>
              <p className="text-sm font-semibold">{mode.name}</p>
              <p className="text-xs text-gray-400">{mode.category.charAt(0).toUpperCase() + mode.category.slice(1)}</p>
            </div>
            <button
              onClick={() => {
                setSelectedGameMode(mode.id);
                setIsModalOpen(true);
              }}
              className="px-2 py-1 text-xs bg-yellow-600/20 text-yellow-400 rounded hover:bg-yellow-600/40 transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      
      {/* Game Mode Modal */}
      {isModalOpen && currentGameMode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-yellow-600/30 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-yellow-400">Edit Game Mode</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <GameModeForm 
                gameMode={currentGameMode} 
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form for editing a game mode
const GameModeForm = ({ gameMode, onClose }: { gameMode: GameMode; onClose: () => void }) => {
  const { updateGameMode } = useAdmin();
  const [formData, setFormData] = useState(gameMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGameMode(gameMode.id, formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
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
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md h-24"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Players</label>
        <input
          type="text"
          name="players"
          value={formData.players}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
        >
          <option value="competitive">Competitive</option>
          <option value="casual">Casual</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Match Duration</label>
        <input
          type="text"
          name="matchDuration"
          value={formData.matchDuration}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          placeholder="e.g. ~15 min"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Objective Type</label>
        <input
          type="text"
          name="objectiveType"
          value={formData.objectiveType}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          placeholder="e.g. Elimination"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Creator</label>
        <input
          type="text"
          name="creator"
          value={formData.creator}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          placeholder="e.g. Community"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Map Count</label>
        <input
          type="number"
          name="mapCount"
          value={formData.mapCount}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
          min="0"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isNew" className="text-sm text-gray-300">Mark as NEW</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPopular"
            checked={formData.isPopular}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isPopular" className="text-sm text-gray-300">Mark as POPULAR</label>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// Component for editing operators
const OperatorsEditor = () => {
  const { operators, updateOperator, addOperator, deleteOperator } = useAdmin();
  const [selectedFaction, setSelectedFaction] = useState<'PHANTOM' | 'SENTINEL' | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  
  const filteredOperators = selectedFaction === 'all' 
    ? operators 
    : operators.filter(operator => operator.faction === selectedFaction);
  
  const currentOperator = selectedOperator 
    ? operators.find(operator => operator.id === selectedOperator) 
    : null;
    
  const openEditModal = (operatorId: string) => {
    setSelectedOperator(operatorId);
    setIsModalOpen(true);
  };
  
  const handleAddNew = () => {
    // Create a new operator with default values
    const newId = `operator-${Date.now()}`;
    const newOperator: Operator = {
      id: newId,
      name: 'NEW OPERATOR',
      role: 'Specialist',
      description: 'Operator description goes here.',
      specialAbility: {
        name: 'Special Ability',
        description: 'Description of the special ability.',
        cooldown: 60
      },
      loadout: {
        primary: 'Primary Weapon',
        secondary: 'Secondary Weapon',
        tactical: 'Tactical Equipment',
        lethal: 'Lethal Equipment'
      },
      image: '/images/characters/default.png',
      difficulty: 'Medium',
      stats: {
        speed: 50,
        armor: 50,
        firepower: 50,
        stealth: 50,
        support: 50
      },
      faction: 'PHANTOM',
      background: 'Background story goes here.',
      isNew: true
    };
    
    addOperator(newOperator);
    openEditModal(newId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Operators Editor</h3>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" /> Add New
        </button>
      </div>
      
      <div className="bg-[#161923] rounded-md p-4 mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-3 py-1 rounded-md text-sm ${selectedFaction === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSelectedFaction('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${selectedFaction === 'PHANTOM' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSelectedFaction('PHANTOM')}
          >
            PHANTOM
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${selectedFaction === 'SENTINEL' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSelectedFaction('SENTINEL')}
          >
            SENTINEL
          </button>
        </div>
        
        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          {filteredOperators.map(operator => (
            <div key={operator.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{operator.name}</span>
                    {operator.isNew && (
                      <span className="flex items-center">
                        <NewIcon className="h-4 w-4 text-blue-400" />
                        <span className="sr-only">New</span>
                      </span>
                    )}
                    {operator.isPremium && (
                      <span className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="sr-only">Premium</span>
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{operator.role}</span>
                  <span className="text-xs text-gray-500">{operator.faction}</span>
                </div>
              </div>
              <button
                onClick={() => openEditModal(operator.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                aria-label="Edit operator"
              >
                <EditIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {filteredOperators.length === 0 && (
            <p className="text-gray-500 text-center py-4">No operators found in this faction.</p>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1f2e] rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                {selectedOperator && operators.find(op => op.id === selectedOperator)?.name}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              {currentOperator && (
                <OperatorForm 
                  operator={currentOperator} 
                  onSave={(updatedOperator) => {
                    updateOperator(currentOperator.id, updatedOperator);
                    setIsModalOpen(false);
                  }}
                  onDelete={() => {
                    if (window.confirm('Are you sure you want to delete this operator?')) {
                      deleteOperator(currentOperator.id);
                      setIsModalOpen(false);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form for editing a single operator
const OperatorForm = ({ 
  operator, 
  onSave, 
  onDelete 
}: { 
  operator: Operator; 
  onSave: (updatedOperator: Operator) => void; 
  onDelete: () => void;
}) => {
  const { updateOperator } = useAdmin();
  const [formData, setFormData] = useState<Operator>({...operator});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else if (name.includes('.')) {
      const [obj, prop] = name.split('.');
      setFormData({
        ...formData,
        [obj]: {
          ...formData[obj as keyof Operator],
          [prop]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  
  const handleStatChange = (stat: keyof Operator['stats'], value: number) => {
    const newStats = {...formData.stats};
    newStats[stat] = Math.max(0, Math.min(100, value));
    setFormData({...formData, stats: newStats});
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Basic Information</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
            <input 
              type="text" 
              name="role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white h-20"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Difficulty</label>
            <select 
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Faction</label>
            <select 
              name="faction"
              value={formData.faction}
              onChange={(e) => handleChange('faction', e.target.value as 'PHANTOM' | 'SENTINEL')}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            >
              <option value="PHANTOM">PHANTOM</option>
              <option value="SENTINEL">SENTINEL</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Special Ability */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Special Ability</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Ability Name</label>
            <input 
              type="text" 
              name="specialAbility.name"
              value={formData.specialAbility.name}
              onChange={(e) => handleChange('specialAbility.name', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Cooldown (seconds)</label>
            <input 
              type="number" 
              name="specialAbility.cooldown"
              value={formData.specialAbility.cooldown}
              onChange={(e) => handleChange('specialAbility.cooldown', parseInt(e.target.value))}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              min="0"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Ability Description</label>
          <textarea 
            name="specialAbility.description"
            value={formData.specialAbility.description}
            onChange={(e) => handleChange('specialAbility.description', e.target.value)}
            className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white h-20"
            required
          />
        </div>
      </div>
      
      {/* Loadout */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Loadout</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Primary Weapon</label>
            <input 
              type="text" 
              name="loadout.primary"
              value={formData.loadout.primary}
              onChange={(e) => handleChange('loadout.primary', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Secondary Weapon</label>
            <input 
              type="text" 
              name="loadout.secondary"
              value={formData.loadout.secondary}
              onChange={(e) => handleChange('loadout.secondary', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Tactical Equipment</label>
            <input 
              type="text" 
              name="loadout.tactical"
              value={formData.loadout.tactical}
              onChange={(e) => handleChange('loadout.tactical', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Lethal Equipment</label>
            <input 
              type="text" 
              name="loadout.lethal"
              value={formData.loadout.lethal}
              onChange={(e) => handleChange('loadout.lethal', e.target.value)}
              className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white"
              required
            />
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Stats (0-100)</h4>
        
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.stats).map(([stat, value]) => (
            <div key={stat}>
              <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                {stat}
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={value}
                  onChange={(e) => handleChange(stat, parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white w-8 text-right">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background and Flags */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Background and Flags</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Background Story</label>
          <textarea 
            name="background"
            value={formData.background}
            onChange={(e) => handleChange('background', e.target.value)}
            className="w-full bg-[#0e1016] border border-gray-700 rounded-md px-3 py-2 text-white h-20"
            required
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="isNew" 
              checked={!!formData.isNew}
              onChange={(e) => handleChange('isNew', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isNew" className="text-sm text-gray-300">Mark as New</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="isPremium" 
              checked={!!formData.isPremium}
              onChange={(e) => handleChange('isPremium', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isPremium" className="text-sm text-gray-300">Mark as Premium</label>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
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
            onClick={() => onSave(operator)}
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

interface MapFormProps {
  map?: GameMap;
  onSave: (map: GameMap) => void;
  onClose: () => void;
}

const MapForm: React.FC<MapFormProps> = ({ map, onSave, onClose }) => {
  // ... MapForm implementation ...
};

interface BattlePassTierFormProps {
  tier?: BattlePassTier;
  onSave: (tier: BattlePassTier) => void;
  onClose: () => void;
}

const BattlePassTierForm: React.FC<BattlePassTierFormProps> = ({ tier, onSave, onClose }) => {
  // ... BattlePassTierForm implementation ...
};

const MapsEditor = () => {
  const { maps, updateMap, addMap, deleteMap } = useAdmin();
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditMap = (map: GameMap) => {
    updateMap(map.id, map);
    setIsModalOpen(false);
    setSelectedMap(null);
  };

  const handleAddMap = (map: GameMap) => {
    addMap(map);
    setIsModalOpen(false);
  };

  const handleOpenModal = (mapId: string | null = null) => {
    setSelectedMap(mapId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Maps</h3>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Add New Map
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {maps.map((map) => (
          <div key={map.id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">{map.name}</h4>
              <p className="text-sm text-gray-400">{map.location}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(map.id)}
                className="text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMap(map.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <MapForm
          map={selectedMap ? maps.find(m => m.id === selectedMap) : undefined}
          onSave={selectedMap ? handleEditMap : handleAddMap}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMap(null);
          }}
        />
      )}
    </div>
  );
};

const BattlePassEditor = () => {
  const { battlePass, updateBattlePass, updateBattlePassTier } = useAdmin();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditTier = (tier: BattlePassTier) => {
    updateBattlePassTier(tier.level, tier);
    setIsModalOpen(false);
    setSelectedTier(null);
  };

  const handleOpenModal = (level: number | null = null) => {
    setSelectedTier(level);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Battle Pass</h3>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Add New Reward
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {battlePass.tiers.map((tier) => (
          <div key={tier.level} className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Level {tier.level}</h4>
                <p className="text-sm text-gray-400">{tier.name}</p>
              </div>
              <button
                onClick={() => handleOpenModal(tier.level)}
                className="text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <BattlePassTierForm
          tier={selectedTier ? battlePass.tiers.find(t => t.level === selectedTier) : undefined}
          onSave={handleEditTier}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTier(null);
          }}
        />
      )}
    </div>
  );
};

const FooterEditor = () => {
  const { footer, updateFooter } = useAdmin();
  const [formData, setFormData] = useState(footer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooter(formData);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Footer Settings</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Copyright Text</label>
          <input
            type="text"
            value={formData.copyright}
            onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Links</label>
          {formData.links.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...formData.links];
                  newLinks[index].label = e.target.value;
                  setFormData({ ...formData, links: newLinks });
                }}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                placeholder="Label"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => {
                  const newLinks = [...formData.links];
                  newLinks[index].href = e.target.value;
                  setFormData({ ...formData, links: newLinks });
                }}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                placeholder="URL"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const HeroEditor = () => {
  const { hero, updateHero } = useAdmin();
  const [formData, setFormData] = useState(hero);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(formData);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Hero Section</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Background Image URL</label>
          <input
            type="text"
            value={formData.backgroundImage}
            onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Buttons</label>
          {formData.buttons.map((button, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                value={button.label}
                onChange={(e) => {
                  const newButtons = [...formData.buttons];
                  newButtons[index].label = e.target.value;
                  setFormData({ ...formData, buttons: newButtons });
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                placeholder="Button Label"
              />
              <input
                type="text"
                value={button.href}
                onChange={(e) => {
                  const newButtons = [...formData.buttons];
                  newButtons[index].href = e.target.value;
                  setFormData({ ...formData, buttons: newButtons });
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
                placeholder="Button URL"
              />
              <select
                value={button.style}
                onChange={(e) => {
                  const newButtons = [...formData.buttons];
                  newButtons[index].style = e.target.value as 'primary' | 'secondary';
                  setFormData({ ...formData, buttons: newButtons });
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const ContentEditor = () => {
  const { editableContent, updateContent } = useAdmin();
  
  const handleUpdate = (section: string, data: { title: string; description: string }) => {
    updateContent(section, data);
  };
  
  return (
    <div className="space-y-4">
      {Object.entries(editableContent).map(([section, content]) => (
        <SectionEditor
          key={section}
          section={section}
          title={content.title}
          description={content.description}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

const NavigationEditor = () => {
  return (
    <div className="space-y-6">
      <BrandingEditor />
      <DownloadButtonEditor />
      <MenuItemsEditor />
      <SocialLinksEditor />
    </div>
  );
};

const SettingsPanel = () => {
  const { resetContent } = useAdmin();
  
  return (
    <div className="space-y-4">
      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
        <h3 className="text-sm font-semibold text-yellow-400 mb-2">SESSION INFORMATION</h3>
        <p className="text-xs text-gray-300 mb-2">
          Your admin session will remain active until you log out or close the browser.
        </p>
        <p className="text-xs text-gray-300">
          All content changes are saved to your session automatically.
        </p>
      </div>
      
      <div>
        <button
          onClick={resetContent}
          className="bg-red-600/70 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Reset All Content
        </button>
      </div>
    </div>
  );
};

const AdminSidebar = () => {
  const { isAdmin, adminSidebarOpen, toggleAdminSidebar } = useAdmin();
  const [activeTab, setActiveTab] = useState<'content' | 'navigation' | 'gameModes' | 'operators' | 'maps' | 'battlePass' | 'footer' | 'hero' | 'settings'>('content');

  if (!isAdmin) return null;

  return (
    <aside className={`fixed right-0 top-0 h-full bg-[#0e1016] w-[40%] z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${adminSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#161923] p-4">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <button
            onClick={toggleAdminSidebar}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-800">
          {[
            { id: 'content', label: 'Content' },
            { id: 'hero', label: 'Hero' },
            { id: 'navigation', label: 'Navigation' },
            { id: 'gameModes', label: 'Game Modes' },
            { id: 'operators', label: 'Operators' },
            { id: 'maps', label: 'Maps' },
            { id: 'battlePass', label: 'Battle Pass' },
            { id: 'footer', label: 'Footer' },
            { id: 'settings', label: 'Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'content' && <ContentEditor />}
          {activeTab === 'hero' && <HeroEditor />}
          {activeTab === 'navigation' && <NavigationEditor />}
          {activeTab === 'gameModes' && <GameModesEditor />}
          {activeTab === 'operators' && <OperatorsEditor />}
          {activeTab === 'maps' && <MapsEditor />}
          {activeTab === 'battlePass' && <BattlePassEditor />}
          {activeTab === 'footer' && <FooterEditor />}
          {activeTab === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;

export {
  MapForm,
  BattlePassTierForm,
  MapsEditor,
  BattlePassEditor,
  OperatorForm
}; 