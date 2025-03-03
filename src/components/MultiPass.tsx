'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Reward {
  id: number;
  name: string;
  type: 'Operator' | 'Weapon' | 'Tactical' | 'Attachment' | 'XP';
  tier: 'Free' | 'Premium';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  image: string;
  level: number;
  description?: string;
}

const MultiPass = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(12)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  
  const season = "SHADOW PROTOCOL"
  const daysLeft = 21
  const maxLevel = 50

  // Function to handle level changes
  const handleLevelChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setCurrentLevel(prev => Math.min(prev + 1, maxLevel));
    } else {
      setCurrentLevel(prev => Math.max(prev - 1, 1));
    }
  }

  const rewards: Reward[] = [
    {
      id: 1,
      name: 'COMBAT CRATE',
      type: 'Tactical',
      tier: 'Free',
      rarity: 'Common',
      image: '/images/battle-pass/emote.png',
      level: 1,
      description: 'Contains random tactical gear and weapon charms'
    },
    {
      id: 2,
      name: 'XP BOOST',
      type: 'XP',
      tier: 'Free',
      rarity: 'Rare',
      image: '/images/battle-pass/emote.png',
      level: 4,
      description: 'Grants 2X XP for 1 hour of gameplay'
    },
    {
      id: 3,
      name: 'GHOST OPERATOR',
      type: 'Operator',
      tier: 'Premium',
      rarity: 'Legendary',
      image: '/images/battle-pass/samurai.png',
      level: 5,
      description: 'Elite Tier 1 operator with specialized stealth capabilities'
    },
    {
      id: 4,
      name: 'TACTICAL AK',
      type: 'Weapon',
      tier: 'Premium',
      rarity: 'Epic',
      image: '/images/battle-pass/dragon-m4.png',
      level: 10,
      description: 'Modified AK rifle with enhanced tactical rail system'
    },
    {
      id: 5,
      name: 'NIGHT HUNTER CAMO',
      type: 'Attachment',
      tier: 'Free',
      rarity: 'Rare',
      image: '/images/battle-pass/blade.png',
      level: 15,
      description: 'Universal camouflage pattern for all primary weapons'
    },
    {
      id: 6,
      name: 'BREACH SPECIALIST',
      type: 'Operator',
      tier: 'Premium',
      rarity: 'Epic',
      image: '/images/battle-pass/samurai.png',
      level: 20,
      description: 'Demolition expert with unique breaching abilities'
    },
    {
      id: 7,
      name: 'ADVANCED SIGHTS PACK',
      type: 'Attachment',
      tier: 'Free',
      rarity: 'Rare',
      image: '/images/battle-pass/emote.png',
      level: 25,
      description: 'Unlocks specialized optics for all weapon classes'
    },
    {
      id: 8,
      name: 'SHADOW PROTOCOL MP5',
      type: 'Weapon',
      tier: 'Premium',
      rarity: 'Legendary',
      image: '/images/battle-pass/dragon-m4.png',
      level: 30,
      description: 'Legendary blueprint with integrated suppressor and tracer rounds'
    }
  ]

  const rarityColors = {
    Common: 'border-gray-400',
    Rare: 'border-[#2563EB]',
    Epic: 'border-[#8B5CF6]',
    Legendary: 'border-[#FF6B2B]'
  }
  
  const rarityBg = {
    Common: 'from-gray-500/10 to-gray-700/10',
    Rare: 'from-[#2563EB]/10 to-[#2563EB]/20',
    Epic: 'from-[#8B5CF6]/10 to-[#8B5CF6]/20',
    Legendary: 'from-[#FF6B2B]/10 to-[#FF6B2B]/20'
  }

  const tierColors = {
    Free: 'border-gray-400 text-gray-400',
    Premium: 'border-[#8B5CF6] text-[#8B5CF6]'
  }

  const typeIcons = {
    Operator: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
    Weapon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 7H7v6h6V7z" />
        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
      </svg>
    ),
    Tactical: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
      </svg>
    ),
    Attachment: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    XP: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    )
  }

  return (
    <div className="relative">
      {/* Login Notice */}
      <div className="mb-6 p-4 border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 h-6 w-6 text-[#8B5CF6]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm">
            <span className="font-semibold text-white">Not logged in.</span>{' '}
            <span className="text-gray-300">You&apos;re viewing the Battle Pass preview. Download the game to track your progress and unlock rewards.</span>
          </p>
        </div>
      </div>

      {/* Season Info */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-black/30 p-4 rounded-lg border border-[#8B5CF6]/20">
        <div>
          <div className="text-xs text-gray-400 mb-1">ACTIVE SEASON</div>
          <div className="text-xl font-bold">{season}</div>
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div>
            <div className="text-xs text-gray-400 mb-1">LEVEL</div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleLevelChange('down')} 
                className="w-6 h-6 flex items-center justify-center bg-black/30 hover:bg-[#8B5CF6]/30 rounded text-gray-400 hover:text-white transition-colors"
              >
                -
              </button>
              <div className="text-xl font-bold">{currentLevel}</div>
              <button 
                onClick={() => handleLevelChange('up')} 
                className="w-6 h-6 flex items-center justify-center bg-black/30 hover:bg-[#8B5CF6]/30 rounded text-gray-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">DAYS LEFT</div>
            <div className="text-xl font-bold">{daysLeft}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar as Interactive Slider */}
      <div className="flex items-center gap-4 mb-8 relative">
        <div className="text-xl font-bold text-[#8B5CF6]">LVL {currentLevel}</div>
        <div className="flex-1 relative h-8 flex items-center">
          {/* Background Track */}
          <div className="absolute inset-0 top-1/2 h-4 -mt-2 bg-black/30 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
            {/* Filled Track */}
            <div 
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] transition-all duration-300"
              style={{ width: `${(currentLevel / maxLevel) * 100}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 skew-x-[-20deg]"></div>
            </div>
            
            {/* Level Markers for Major Unlocks */}
            {rewards
              .filter(r => r.rarity === 'Legendary')
              .map(reward => (
                <div 
                  key={`marker-${reward.id}`}
                  className={`absolute top-1/2 w-2 h-6 -mt-3 bg-white/50 rounded-full transform -translate-x-1/2 transition-all duration-300 ${
                    currentLevel >= reward.level ? 'bg-[#FF6B2B]' : 'bg-white/20'
                  }`}
                  style={{ left: `${(reward.level / maxLevel) * 100}%` }}
                  title={`Level ${reward.level}: ${reward.name}`}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100">
                    {reward.level}
                  </div>
                </div>
              ))}
          </div>
          
          {/* Slider Input */}
          <input 
            type="range" 
            min="1" 
            max={maxLevel} 
            value={currentLevel}
            onChange={(e) => setCurrentLevel(parseInt(e.target.value))}
            className="w-full h-8 appearance-none bg-transparent relative z-10 cursor-pointer group"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
          />
        </div>
        <div className="text-lg font-medium text-gray-400">{maxLevel}</div>
      </div>

      {/* Custom CSS for slider to ensure cross-browser compatibility */}
      <style jsx>{`
        /* Hide default inputs but maintain functionality */
        input[type="range"] {
          -webkit-appearance: none;
          margin: 0;
          width: 100%;
          background: transparent;
        }
        
        /* Focus states */
        input[type="range"]:focus {
          outline: none;
        }
        
        /* Webkit (Chrome, Safari, Edge) specific styling */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid #8B5CF6;
          cursor: pointer;
          margin-top: -10px; /* Center thumb vertically relative to track */
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          position: relative;
          z-index: 20;
        }
        
        /* Firefox specific styling */
        input[type="range"]::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid #8B5CF6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          position: relative;
          z-index: 20;
        }
        
        /* Track styling for Webkit */
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: transparent;
          border-radius: 100px;
        }
        
        /* Track styling for Firefox */
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: transparent;
          border-radius: 100px;
        }
        
        /* Hover and active states for thumb */
        input[type="range"]:hover::-webkit-slider-thumb,
        input[type="range"]:active::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
        }
        
        input[type="range"]:hover::-moz-range-thumb,
        input[type="range"]:active::-moz-range-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
        }
      `}</style>

      {/* Display current level unlocks */}
      <div className="text-center text-sm text-white mb-8">
        {rewards.filter(r => r.level === currentLevel).length > 0 ? (
          <div className="p-2 bg-[#8B5CF6]/20 rounded-lg border border-[#8B5CF6]/30 inline-block">
            <span className="font-bold">Level {currentLevel}:</span> Unlocks {rewards.filter(r => r.level === currentLevel).length} new {rewards.filter(r => r.level === currentLevel).length === 1 ? 'item' : 'items'}
          </div>
        ) : (
          <div className="p-2 bg-black/20 rounded-lg inline-block">
            No items unlock at level {currentLevel}
          </div>
        )}
      </div>

      {/* Level Preview Instructions */}
      <div className="text-center mb-8 p-3 bg-[#8B5CF6]/10 rounded-lg border border-[#8B5CF6]/20">
        <p className="text-sm text-white mb-1">
          <span className="font-bold">Use the slider to preview Battle Pass rewards</span>
        </p>
        <p className="text-xs text-gray-300">
          Drag the slider to see which items unlock at different levels. Items will highlight as they become available.
        </p>
      </div>

      {/* Tiers */}
      <div className="flex justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-gray-400 font-medium">FREE TIER</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg">
          <div className="w-3 h-3 bg-[#8B5CF6] rounded-full"></div>
          <span className="text-[#8B5CF6] font-medium">PREMIUM TIER</span>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rewards.map((reward) => (
          <div 
            key={reward.id}
            className={`relative rounded-lg overflow-hidden transition-all duration-500 border-2 cursor-pointer
              ${rarityColors[reward.rarity]} 
              ${currentLevel >= reward.level 
                ? 'opacity-100 shadow-lg shadow-[#8B5CF6]/20 scale-100' 
                : 'opacity-40 grayscale scale-95 hover:opacity-60'
              }
              ${selectedReward === reward ? 'ring-2 ring-white scale-105' : 'hover:scale-[1.02]'}
            `}
            onClick={() => setSelectedReward(reward === selectedReward ? null : reward)}
          >
            {/* Just Unlocked Indicator */}
            {currentLevel === reward.level && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-pulse">
                <div className="bg-[#8B5CF6] text-white px-4 py-2 rounded-md font-bold transform rotate-[-5deg] shadow-lg">
                  UNLOCKED!
                </div>
              </div>
            )}
            
            {/* Background with Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${rarityBg[reward.rarity]}`} />
            
            {/* Tier Indicator */}
            <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-sm text-xs font-bold border ${tierColors[reward.tier]}`}>
              {reward.tier}
            </div>

            {/* Level Badge */}
            <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-sm text-xs font-bold backdrop-blur-sm border border-white/10
              ${currentLevel >= reward.level ? 'bg-[#8B5CF6]/50' : 'bg-black/50'}
            `}>
              LVL {reward.level}
            </div>

            {/* Main Content */}
            <div className="relative p-4">
              {/* Reward Image */}
              <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                <Image
                  src={reward.image}
                  alt={reward.name}
                  width={120}
                  height={120}
                  className={`object-contain transition-all duration-500
                    ${currentLevel >= reward.level ? 'scale-100 hover:scale-110' : 'scale-90'}
                  `}
                />
              </div>

              {/* Reward Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-black/30 text-white">
                    {typeIcons[reward.type]}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-bold ${
                    reward.rarity === 'Common' ? 'text-gray-400' :
                    reward.rarity === 'Rare' ? 'text-[#2563EB]' :
                    reward.rarity === 'Epic' ? 'text-[#8B5CF6]' :
                    'text-[#FF6B2B]'
                  }`}>
                    {reward.rarity}
                  </span>
                </div>
                <h3 className="text-base font-bold">{reward.name}</h3>
                {reward.description && selectedReward === reward && (
                  <p className="text-xs text-gray-400 mt-1">{reward.description}</p>
                )}
              </div>

              {/* Status Indicator */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  {currentLevel >= reward.level ? (
                    <span className="text-xs font-bold uppercase text-green-400">PREVIEW AVAILABLE</span>
                  ) : (
                    <span className="text-xs font-bold uppercase text-gray-400">LOCKED</span>
                  )}
                  <span className="text-xs text-[#8B5CF6]">Level {reward.level}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Section */}
      <div className="mt-12 bg-gradient-to-r from-[#8B5CF6]/20 to-[#8B5CF6]/5 rounded-lg border border-[#8B5CF6]/20 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">PREMIUM BATTLE PASS</h3>
            <p className="text-gray-400 mb-4">
              Unlock the Premium Battle Pass in-game to access exclusive rewards and accelerate your progression
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <span className="text-[#8B5CF6]">✓</span>
                <span>Instant unlock of tier 1-5 premium rewards</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-[#8B5CF6]">✓</span>
                <span>20% XP boost throughout the season</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-[#8B5CF6]">✓</span>
                <span>3 exclusive operator skins</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <button className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#9D6FFF] transition-colors rounded font-bold">
              DOWNLOAD NOW
            </button>
            <div className="text-center text-sm text-gray-400">
              Available in-game after installation
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiPass 