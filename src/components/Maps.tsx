'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Map {
  id: string;
  name: string;
  location: string;
  description: string;
  features: string[];
  details: {
    size: 'Small' | 'Medium' | 'Large';
    time: 'Day' | 'Night' | 'Dusk';
    weather: string;
    terrain: string;
  };
  objectives: {
    name: string;
    description: string;
    icon: string;
  }[];
  modes: string[];
  image: string;
  mapOverview: string;
  screenshots: string[];
  thumbnail: string;
  isNew?: boolean;
  isPopular?: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

const Maps = () => {
  const [activeMap, setActiveMap] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'overview' | 'tactical' | 'screenshots'>('overview');
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulates loading when changing maps
  const handleMapChange = (index: number) => {
    if (index === activeMap) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setActiveMap(index);
      setActiveScreenshot(0);
      setIsLoading(false);
    }, 500);
  };

  const maps: Map[] = [
    {
      id: 'compound',
      name: 'COMPOUND',
      location: 'Eastern Europe',
      description: 'A decommissioned military compound with multiple buildings, underground bunkers, and strategic vantage points. Perfect for close to mid-range engagements and tactical team coordination.',
      features: [
        'Underground tunnel network',
        'Multi-level command center',
        'Breach-able walls',
        'Defensive perimeter with guard towers',
        'Ambush-friendly choke points'
      ],
      details: {
        size: 'Medium',
        time: 'Day',
        weather: 'Clear',
        terrain: 'Urban'
      },
      objectives: [
        {
          name: 'Alpha Site',
          description: 'Command center with documents to secure',
          icon: 'A'
        },
        {
          name: 'Bravo Site',
          description: 'Weapons cache in the underground bunker',
          icon: 'B'
        },
        {
          name: 'Charlie Site',
          description: 'Communication tower that can be sabotaged',
          icon: 'C'
        }
      ],
      modes: ['Search & Destroy', 'Team Deathmatch', 'Domination'],
      image: '/images/pets/dragon.png',
      mapOverview: '/images/pets/dragon.png',
      screenshots: [
        '/images/pets/dragon.png',
        '/images/pets/wolf.png',
        '/images/pets/eagle.png'
      ],
      thumbnail: '/images/pets/dragon.png',
      isPopular: true,
      difficulty: 'Medium'
    },
    {
      id: 'downtown',
      name: 'DOWNTOWN',
      location: 'North America',
      description: 'Dense urban environment featuring high-rise buildings, narrow streets, and a central plaza. Offers diverse combat scenarios from long-range sniper positions to intense CQB situations.',
      features: [
        'Rooftop helicopter landing pads',
        'Destructible environments',
        'Underground parking garage',
        'Interactive map elements (car alarms, etc)',
        'Multiple vertical combat layers'
      ],
      details: {
        size: 'Large',
        time: 'Night',
        weather: 'Rain',
        terrain: 'Urban'
      },
      objectives: [
        {
          name: 'Alpha Site',
          description: 'Bank vault in the financial district',
          icon: 'A'
        },
        {
          name: 'Bravo Site',
          description: 'Police station armory',
          icon: 'B'
        },
        {
          name: 'Charlie Site',
          description: 'Rooftop helipad',
          icon: 'C'
        }
      ],
      modes: ['Headquarters', 'Team Deathmatch', 'VIP Escort'],
      image: '/images/pets/wolf.png',
      mapOverview: '/images/pets/wolf.png',
      screenshots: [
        '/images/pets/wolf.png',
        '/images/pets/dragon.png',
        '/images/pets/panther.png'
      ],
      thumbnail: '/images/pets/wolf.png',
      difficulty: 'Hard'
    },
    {
      id: 'outpost',
      name: 'OUTPOST',
      location: 'Middle East',
      description: 'Remote desert outpost with a mix of indoor and outdoor combat areas. Long sight lines in the surrounding area contrast with tight indoor spaces.',
      features: [
        'Sandstorm dynamic weather effect',
        'Vehicle depot with usable cover',
        'Elevated sniper positions',
        'Central command building',
        'Surrounding desert terrain'
      ],
      details: {
        size: 'Small',
        time: 'Dusk',
        weather: 'Sandstorm',
        terrain: 'Desert'
      },
      objectives: [
        {
          name: 'Alpha Site',
          description: 'Radar installation that can be hacked',
          icon: 'A'
        },
        {
          name: 'Bravo Site',
          description: 'Fuel depot that can be destroyed',
          icon: 'B'
        }
      ],
      modes: ['Search & Destroy', 'Control', 'Free-for-All'],
      image: '/images/pets/eagle.png',
      mapOverview: '/images/pets/eagle.png',
      screenshots: [
        '/images/pets/eagle.png',
        '/images/pets/wolf.png',
        '/images/pets/dragon.png'
      ],
      thumbnail: '/images/pets/eagle.png',
      isNew: true,
      difficulty: 'Easy'
    },
    {
      id: 'facility',
      name: 'FACILITY',
      location: 'Arctic Region',
      description: 'Classified research facility built into an arctic mountain range. Features a mix of sterile laboratory environments and industrial areas connected by a complex layout.',
      features: [
        'Laboratory with hazardous areas',
        'Security checkpoint system',
        'Exterior snow-covered areas',
        'Server room with limited visibility',
        'Ventilation system shortcuts'
      ],
      details: {
        size: 'Medium',
        time: 'Night',
        weather: 'Snow',
        terrain: 'Arctic'
      },
      objectives: [
        {
          name: 'Alpha Site',
          description: 'Bioweapon containment lab',
          icon: 'A'
        },
        {
          name: 'Bravo Site',
          description: 'Server room with classified data',
          icon: 'B'
        },
        {
          name: 'Charlie Site',
          description: 'Power generator that can be sabotaged',
          icon: 'C'
        },
        {
          name: 'Delta Site',
          description: 'Helicopter evacuation point',
          icon: 'D'
        }
      ],
      modes: ['Search & Destroy', 'Extraction', 'Team Deathmatch'],
      image: '/images/pets/panther.png',
      mapOverview: '/images/pets/panther.png',
      screenshots: [
        '/images/pets/panther.png',
        '/images/pets/eagle.png',
        '/images/pets/wolf.png'
      ],
      thumbnail: '/images/pets/panther.png',
      difficulty: 'Medium'
    }
  ]

  const sizeColors = {
    Small: 'bg-green-500/20 text-green-400 border-l-2 border-green-500',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-500',
    Large: 'bg-red-500/20 text-red-400 border-l-2 border-red-500'
  }
  
  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400 border-l-2 border-green-500',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-500',
    Hard: 'bg-red-500/20 text-red-400 border-l-2 border-red-500'
  }

  const timeIcons = {
    Day: '☀️',
    Night: '🌙',
    Dusk: '🌆'
  }
  
  const currentMap = maps[activeMap];

  // Custom component for map features with hover effect
  const MapFeature = ({ feature }: { feature: string }) => (
    <div 
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
        selectedFeature === feature 
          ? 'bg-[#8B5CF6]/20 border-l-2 border-[#8B5CF6]' 
          : 'bg-black/20 hover:bg-black/30'
      }`}
      onMouseEnter={() => setSelectedFeature(feature)}
      onMouseLeave={() => setSelectedFeature(null)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      <span className="text-sm text-gray-300">{feature}</span>
    </div>
  )
  
  // Component for map objective markers
  const ObjectiveMarker = ({ objective, index }: { objective: Map['objectives'][0], index: number }) => {
    const positions = [
      'top-[20%] left-[30%]',
      'top-[40%] right-[20%]',
      'bottom-[30%] left-[40%]',
      'bottom-[15%] right-[35%]'
    ];
    
    return (
      <div className={`absolute ${positions[index % positions.length]} z-10 group`}>
        <div className="relative">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8B5CF6] text-white font-bold border-2 border-white shadow-lg shadow-[#8B5CF6]/30 cursor-pointer transition-transform transform hover:scale-110">
            {objective.icon}
          </div>
          
          {/* Pulse animation */}
          <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#8B5CF6] opacity-75 animate-ping-slow"></div>
          
          {/* Objective details tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 w-48 bg-black/90 backdrop-blur-md rounded-md p-2 border border-[#8B5CF6]/30 shadow-lg invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="text-sm font-bold mb-1 text-[#8B5CF6]">{objective.name}</div>
            <div className="text-xs text-gray-300">{objective.description}</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-[#8B5CF6]/30"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* View Mode Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-black/30 rounded-lg p-1 inline-flex">
          <button 
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded font-medium text-sm transition-all ${
              viewMode === 'overview' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            MAP OVERVIEW
          </button>
          <button 
            onClick={() => setViewMode('tactical')}
            className={`px-4 py-2 rounded font-medium text-sm transition-all ${
              viewMode === 'tactical' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            TACTICAL VIEW
          </button>
          <button 
            onClick={() => setViewMode('screenshots')}
            className={`px-4 py-2 rounded font-medium text-sm transition-all ${
              viewMode === 'screenshots' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SCREENSHOTS
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Viewer - Left Panel */}
        <div className="lg:w-2/3">
          <div className="relative h-[400px] lg:h-[550px] rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm border border-[#8B5CF6]/20">
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center">
                <div className="text-[#8B5CF6] flex flex-col items-center">
                  <svg className="animate-spin h-10 w-10 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-bold text-sm uppercase tracking-wider">Loading Map Data</span>
                </div>
              </div>
            )}
            
            {/* Map visualization based on view mode */}
            {viewMode === 'overview' && (
              <>
                {/* Tactical Grid Background */}
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.png')] opacity-10" />
                
                {/* Map Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-700">
                    <Image
                      src={currentMap.image}
                      alt={currentMap.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 60vw"
                    />
                  </div>
                </div>
                
                {/* Map Status Tags */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <span className={`px-3 py-1 rounded-sm text-xs font-bold tracking-wider ${sizeColors[currentMap.details.size]}`}>
                    {currentMap.details.size.toUpperCase()} MAP
                  </span>
                  
                  {currentMap.isNew && (
                    <span className="px-3 py-1 bg-[#2563EB]/20 text-[#2563EB] rounded-sm text-xs font-bold tracking-wider border-l-2 border-[#2563EB]">
                      NEW LOCATION
                    </span>
                  )}
                  
                  {currentMap.isPopular && (
                    <span className="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-sm text-xs font-bold tracking-wider border-l-2 border-[#8B5CF6]">
                      POPULAR
                    </span>
                  )}
                  
                  {currentMap.difficulty && (
                    <span className={`px-3 py-1 rounded-sm text-xs font-bold tracking-wider ${difficultyColors[currentMap.difficulty]}`}>
                      {currentMap.difficulty.toUpperCase()} DIFFICULTY
                    </span>
                  )}
                </div>
                
                {/* Map Location Indicator */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-sm border-l-2 border-white/30 z-10">
                  <div className="text-xs text-gray-400">LOCATION</div>
                  <div className="text-sm font-bold">{currentMap.location}</div>
                </div>
                
                {/* Tactical Overlay Elements */}
                <div className="absolute top-0 left-0 w-28 h-28 border-l-2 border-t-2 border-[#8B5CF6]/30 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 border-r-2 border-b-2 border-[#2563EB]/30 opacity-60"></div>
              </>
            )}
            
            {viewMode === 'tactical' && (
              <>
                <div className="absolute inset-0 bg-[#0F1218] opacity-80" />
                
                {/* Tactical Grid Background */}
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.png')] opacity-20" />
                
                {/* Map tactical overview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5">
                    {/* Map blueprint/schematic */}
                    <div className="relative w-full h-full">
                      <Image
                        src={currentMap.mapOverview}
                        alt={`${currentMap.name} Tactical Overview`}
                        fill
                        className="object-contain opacity-70"
                        sizes="(max-width: 768px) 90vw, 60vw"
                      />
                    </div>
                    
                    {/* Objective markers */}
                    {currentMap.objectives.map((objective, index) => (
                      <ObjectiveMarker key={index} objective={objective} index={index} />
                    ))}
                  </div>
                </div>
                
                {/* Status overlay */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-sm">
                  <div className="text-xs text-[#8B5CF6] font-bold">TACTICAL OVERLAY ACTIVE</div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-sm z-10">
                  <div className="text-xs text-gray-400 mb-1">OBJECTIVES</div>
                  <div className="flex flex-col gap-2">
                    {currentMap.objectives.map((obj, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#8B5CF6] text-white text-xs font-bold">
                          {obj.icon}
                        </div>
                        <span className="text-xs text-white">{obj.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {viewMode === 'screenshots' && (
              <>
                {/* Screenshot display */}
                <div className="absolute inset-0 bg-black/90" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={currentMap.screenshots[activeScreenshot]}
                      alt={`${currentMap.name} Screenshot ${activeScreenshot + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 60vw"
                    />
                  </div>
                </div>
                
                {/* Screenshot navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {currentMap.screenshots.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveScreenshot(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeScreenshot === idx ? 'bg-[#8B5CF6]' : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`View screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
                
                {/* Screenshot count indicator */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-sm z-10">
                  <div className="text-xs text-white font-mono">
                    {activeScreenshot + 1} / {currentMap.screenshots.length}
                  </div>
                </div>
              </>
            )}

            {/* Map Info Overlay - Common for all view modes */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-wider text-white">
                  {currentMap.name}
                </h3>
              </div>

              {viewMode !== 'screenshots' && (
                <p className="text-gray-300 mb-4 max-w-3xl text-sm lg:text-base line-clamp-2">
                  {currentMap.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Map Details Panel */}
          <div className="mt-6 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-5">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h4 className="text-sm font-bold text-[#8B5CF6] uppercase tracking-wider mb-3">
                  Combat Intelligence
                </h4>
                
                <div className="space-y-4">
                  {/* Map Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/30 px-3 py-2 rounded-md">
                      <div className="text-xs text-gray-400">TERRAIN</div>
                      <div className="text-sm font-medium">{currentMap.details.terrain}</div>
                    </div>
                    <div className="bg-black/30 px-3 py-2 rounded-md">
                      <div className="text-xs text-gray-400">TIME</div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <span>{timeIcons[currentMap.details.time]}</span>
                        <span>{currentMap.details.time}</span>
                      </div>
                    </div>
                    <div className="bg-black/30 px-3 py-2 rounded-md">
                      <div className="text-xs text-gray-400">WEATHER</div>
                      <div className="text-sm font-medium">{currentMap.details.weather}</div>
                    </div>
                    <div className="bg-black/30 px-3 py-2 rounded-md">
                      <div className="text-xs text-gray-400">STATUS</div>
                      <div className="text-sm font-medium text-green-400">ACTIVE IN ROTATION</div>
                    </div>
                  </div>
                  
                  {/* Game Modes */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">AVAILABLE GAME MODES</div>
                    <div className="flex flex-wrap gap-2">
                      {currentMap.modes.map((mode, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-md text-xs text-white"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h4 className="text-sm font-bold text-[#8B5CF6] uppercase tracking-wider mb-3">
                  Tactical Features
                </h4>
                
                <div className="grid grid-cols-1 gap-2">
                  {currentMap.features.map((feature, index) => (
                    <MapFeature key={index} feature={feature} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Selection - Right Panel */}
        <div className="lg:w-1/3">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 h-full">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">SELECT BATTLEFIELD</h3>
              <p className="text-sm text-gray-400">Choose your next combat environment</p>
            </div>
            
            <div className="p-2 max-h-[600px] overflow-y-auto">
              {maps.map((map, index) => (
                <button
                  key={map.id}
                  onClick={() => handleMapChange(index)}
                  className={`w-full text-left mb-2 relative overflow-hidden rounded-lg transition-all ${
                    activeMap === index 
                      ? 'border-2 border-[#8B5CF6]'
                      : 'border border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={map.thumbnail}
                      alt={map.name}
                      fill
                      className="object-cover brightness-75"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Overlay for selected map */}
                    {activeMap === index && (
                      <div className="absolute inset-0 bg-[#8B5CF6]/10"></div>
                    )}
                    
                    {/* Map tags */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {map.isNew && (
                        <div className="bg-[#2563EB] text-white text-xs px-2 py-0.5 rounded-sm">
                          NEW
                        </div>
                      )}
                      {map.isPopular && (
                        <div className="bg-[#8B5CF6] text-white text-xs px-2 py-0.5 rounded-sm">
                          POPULAR
                        </div>
                      )}
                    </div>
                    
                    {/* Size indicator */}
                    <div className={`absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-sm ${
                      map.details.size === 'Small' ? 'bg-green-500' :
                      map.details.size === 'Medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    } text-white`}>
                      {map.details.size}
                    </div>
                    
                    {/* Map name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-bold">{map.name}</h4>
                          <p className="text-xs text-gray-300">{map.location}</p>
                        </div>
                        
                        {activeMap === index && (
                          <div className="bg-[#8B5CF6] rounded-full p-0.5">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Map details row */}
                  <div className="p-2 bg-black/70 flex items-center text-xs">
                    <div className="flex-1 flex items-center gap-1">
                      <span className="text-gray-400">Weather:</span>
                      <span className="text-white">{map.details.weather}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white flex items-center">
                        <span className="mr-1">{timeIcons[map.details.time]}</span>
                        {map.details.time}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="text-sm text-white mb-2">Map Types</div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-black/30 hover:bg-black/50 rounded-full text-xs text-white border border-white/10">
                  All Maps
                </button>
                <button className="px-3 py-1 bg-black/30 hover:bg-black/50 rounded-full text-xs text-white border border-white/10">
                  Urban
                </button>
                <button className="px-3 py-1 bg-black/30 hover:bg-black/50 rounded-full text-xs text-white border border-white/10">
                  Desert
                </button>
                <button className="px-3 py-1 bg-black/30 hover:bg-black/50 rounded-full text-xs text-white border border-white/10">
                  Arctic
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maps 