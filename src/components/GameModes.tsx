'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAdmin } from '@/app/context/AdminContext'

interface GameMode {
  name: string
  description: string
  image: string
  players: string
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Extreme'
  isNew?: boolean
  isPopular?: boolean
  creator?: string
  mapCount?: number
  matchDuration?: string
  objectiveType?: string
}

const GameModes = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'competitive' | 'casual' | 'custom'>('all')
  const [focusedMode, setFocusedMode] = useState<GameMode | null>(null)
  const { gameModes } = useAdmin();
  
  // Convert admin context game modes to component format
  const getGameModesByCategory = (category: 'competitive' | 'casual' | 'custom') => {
    return gameModes.filter(mode => mode.category === category);
  };
  
  const competitiveModes = getGameModesByCategory('competitive');
  const casualModes = getGameModesByCategory('casual');
  const customModes = getGameModesByCategory('custom');
  const allModes = [...competitiveModes, ...casualModes, ...customModes];
  
  const displayModes = () => {
    switch (activeCategory) {
      case 'competitive':
        return competitiveModes
      case 'casual':
        return casualModes
      case 'custom':
        return customModes
      default:
        return allModes
    }
  }

  const DifficultyMeter = ({ difficulty }: { difficulty?: string }) => {
    if (!difficulty) return null
    
    const levels = {
      'Easy': 1,
      'Medium': 2,
      'Hard': 3,
      'Extreme': 4
    }
    
    const level = levels[difficulty as keyof typeof levels] || 0
    
    return (
      <div className="flex items-center gap-1">
        <div className={`h-1.5 w-5 rounded-sm ${level >= 1 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
        <div className={`h-1.5 w-5 rounded-sm ${level >= 2 ? 'bg-yellow-500' : 'bg-gray-700'}`}></div>
        <div className={`h-1.5 w-5 rounded-sm ${level >= 3 ? 'bg-orange-500' : 'bg-gray-700'}`}></div>
        <div className={`h-1.5 w-5 rounded-sm ${level >= 4 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
        <span className="text-xs ml-1 text-gray-400">{difficulty}</span>
      </div>
    )
  }

  const GameModeCard = ({ mode, isDetailed = false }: { mode: GameMode, isDetailed?: boolean }) => (
    <div 
      className={`group overflow-hidden rounded-xl tactical-border ${
        isDetailed ? 'cursor-default' : 'cursor-pointer hover:border-[#8B5CF6]'
      } transition-all`}
      onClick={() => !isDetailed && setFocusedMode(mode)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={mode.image}
          alt={mode.name}
          fill
          className={`object-cover ${isDetailed ? '' : 'group-hover:scale-110'} transition-transform duration-300`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        
        {mode.isNew && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-3 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}
        {mode.isPopular && !mode.isNew && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-3 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
        )}
        {mode.creator && (
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
            {mode.creator}
          </div>
        )}
        
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold">{mode.name}</h3>
            {!isDetailed && (
              <div className="h-6 w-6 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {isDetailed ? (
            <p className="text-gray-300 text-sm mb-4">{mode.description}</p>
          ) : (
            <p className="text-gray-300 text-sm mb-2 line-clamp-2">{mode.description}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
            <div className="flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            {mode.players}
            </div>
            
            {isDetailed && mode.mapCount && (
              <div className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                {mode.mapCount} Maps
              </div>
            )}
            
            {isDetailed && mode.matchDuration && (
              <div className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {mode.matchDuration}
              </div>
            )}
            
            {isDetailed && mode.objectiveType && (
              <div className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
                {mode.objectiveType}
              </div>
            )}
            
            {isDetailed && (
              <div className="flex items-center gap-2 mt-1 w-full">
                <DifficultyMeter difficulty={mode.difficulty} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="py-8">
      {focusedMode ? (
      <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <button 
              onClick={() => setFocusedMode(null)}
              className="flex items-center text-[#8B5CF6] hover:text-[#6D28D9] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Game Modes
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-xl overflow-hidden tactical-border">
              <Image
                src={focusedMode.image}
                alt={focusedMode.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-6 w-full">
                <h2 className="text-3xl font-bold mb-2">{focusedMode.name}</h2>
                <DifficultyMeter difficulty={focusedMode.difficulty} />
              </div>
            </div>
            
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#8B5CF6]">Mode Details</h3>
              <p className="text-gray-300 mb-6">{focusedMode.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-effect p-4 rounded-lg flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Players</span>
                  <span className="text-lg font-bold">{focusedMode.players}</span>
                </div>
                <div className="glass-effect p-4 rounded-lg flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Match Duration</span>
                  <span className="text-lg font-bold">{focusedMode.matchDuration || 'Varies'}</span>
                </div>
                <div className="glass-effect p-4 rounded-lg flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Maps Available</span>
                  <span className="text-lg font-bold">{focusedMode.mapCount || 'Custom'}</span>
                </div>
                <div className="glass-effect p-4 rounded-lg flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Objective Type</span>
                  <span className="text-lg font-bold">{focusedMode.objectiveType || 'Custom'}</span>
                </div>
              </div>
              
              <button className="primary-button w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Launch Mode
              </button>
          </div>
        </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Similar Game Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allModes
                .filter(mode => mode.name !== focusedMode.name)
                .filter(mode => mode.objectiveType === focusedMode.objectiveType || mode.difficulty === focusedMode.difficulty)
                .slice(0, 3)
                .map((mode, index) => (
              <GameModeCard key={index} mode={mode} />
            ))}
          </div>
        </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-8">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === 'all' 
                    ? 'bg-[#8B5CF6] text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveCategory('competitive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === 'competitive' 
                    ? 'bg-[#8B5CF6] text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                Competitive
              </button>
              <button 
                onClick={() => setActiveCategory('casual')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === 'casual' 
                    ? 'bg-[#8B5CF6] text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                Casual
              </button>
              <button 
                onClick={() => setActiveCategory('custom')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === 'custom' 
                    ? 'bg-[#8B5CF6] text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                Custom
              </button>
          </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayModes().map((mode, index) => (
              <GameModeCard key={index} mode={mode} />
            ))}
          </div>
        </div>
      )}
      </div>
  )
}

export default GameModes 