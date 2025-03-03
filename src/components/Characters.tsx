'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAdmin, Operator } from '@/app/context/AdminContext'

const Operators = () => {
  const { operators } = useAdmin();
  const [selectedOperator, setSelectedOperator] = useState<number>(0);
  const [selectedFaction, setSelectedFaction] = useState<'PHANTOM' | 'SENTINEL'>('PHANTOM');
  const [activeTab, setActiveTab] = useState<'profile' | 'loadout' | 'abilities'>('profile');
  const [animatingOut, setAnimatingOut] = useState(false);
  const [showOperatorSelect, setShowOperatorSelect] = useState(false);
  
  const handleOperatorChange = (index: number) => {
    if (index === selectedOperator) return;
    
    setAnimatingOut(true);
    setTimeout(() => {
      setSelectedOperator(index);
      setAnimatingOut(false);
    }, 300);
  };

  const filteredOperators = operators.filter(op => op.faction === selectedFaction);
  const currentOperator = filteredOperators[selectedOperator] || filteredOperators[0];
  
  // Component for the circular stat graph
  const StatChart = ({ stats }: { stats: Operator['stats'] }) => {
    const statKeys = Object.keys(stats) as Array<keyof typeof stats>;
    const statCount = statKeys.length;
    const angleStep = (2 * Math.PI) / statCount;
    
    // Calculate coordinates for each stat point
    const points = statKeys.map((key, i) => {
      const value = stats[key] / 100;
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const x = 50 + 40 * value * Math.cos(angle);
      const y = 50 + 40 * value * Math.sin(angle);
      return { x, y, value: stats[key], label: key };
    });
    
    // Create path for the stat polygon
    const polygonPoints = points.map(point => `${point.x},${point.y}`).join(' ');
    
    return (
      <div className="relative w-full h-[250px] p-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Stat grid circles */}
          {[0.25, 0.5, 0.75, 1].map((radius, i) => (
            <circle 
              key={`circle-${i}`}
              cx="50" 
              cy="50" 
              r={40 * radius} 
              fill="transparent" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="0.5" 
            />
          ))}
          
          {/* Stat axis lines */}
          {statKeys.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = 50 + 40 * Math.cos(angle);
            const y2 = 50 + 40 * Math.sin(angle);
            return (
              <line 
                key={`axis-${i}`}
                x1="50" 
                y1="50" 
                x2={x2} 
                y2={y2} 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.5" 
              />
            );
          })}
          
          {/* Stat polygon */}
          <polygon 
            points={polygonPoints} 
            fill="rgba(139, 92, 246, 0.2)" 
            stroke="#8B5CF6" 
            strokeWidth="1" 
            className="transition-all duration-500"
          />
          
          {/* Stat points */}
          {points.map((point, i) => (
            <circle 
              key={`point-${i}`}
              cx={point.x} 
              cy={point.y} 
              r="2" 
              fill="#8B5CF6" 
              className="transition-all duration-500"
            />
          ))}
          
          {/* Stat labels */}
          {statKeys.map((key, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = 45;
            const x = 50 + labelRadius * Math.cos(angle);
            const y = 50 + labelRadius * Math.sin(angle);
            return (
              <text 
                key={`label-${i}`}
                x={x} 
                y={y} 
                fontSize="3.5"
                fill="white" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="uppercase font-bold"
                transform={`rotate(${(angle * 180 / Math.PI) + (angle > Math.PI / 2 && angle < 3 * Math.PI / 2 ? 180 : 0)}, ${x}, ${y})`}
              >
                {key}
              </text>
            );
          })}
          
          {/* Stat values */}
          {points.map((point, i) => {
            const statKey = statKeys[i] as keyof typeof stats;
            return (
              <g key={`value-${i}`} className="stat-value opacity-0 group-hover:opacity-100 transition-opacity">
                <rect 
                  x={point.x - 8} 
                  y={point.y - 8} 
                  width="16" 
                  height="10" 
                  rx="2" 
                  fill="rgba(0,0,0,0.8)" 
                />
                <text 
                  x={point.x} 
                  y={point.y} 
                  fontSize="5"
                  fill="white" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                >
                  {stats[statKey]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // Status effect that's shown when not logged in
  const LoginNotice = () => (
    <div className="mb-6 p-3 border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-5 w-5 text-[#8B5CF6]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-xs">
          <span className="font-semibold text-white">Not logged in.</span>{' '}
          <span className="text-gray-300">Download the game to unlock and customize operators.</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <LoginNotice />
      
      {/* Faction Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-1 flex">
          <button 
            onClick={() => setSelectedFaction('PHANTOM')}
            className={`px-6 py-2 rounded font-bold text-sm transition-all ${
              selectedFaction === 'PHANTOM' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            PHANTOM UNIT
          </button>
          <button 
            onClick={() => setSelectedFaction('SENTINEL')}
            className={`px-6 py-2 rounded font-bold text-sm transition-all ${
              selectedFaction === 'SENTINEL' 
                ? 'bg-[#2563EB] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SENTINEL SQUAD
          </button>
        </div>
      </div>

      {/* Main Operator Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operator Image - Left Panel */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="relative h-[420px] lg:h-[600px] rounded-lg overflow-hidden border border-[#8B5CF6]/20">
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
              currentOperator.faction === 'PHANTOM' 
                ? 'from-[#8B5CF6]/20 to-black/70' 
                : 'from-[#2563EB]/20 to-black/70'
            }`} />
            
            {/* Tactical Grid Background */}
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.png')] opacity-10" />
          
            {/* Operator Image with Animation */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              animatingOut ? 'opacity-0' : 'opacity-100'
            }`}>
              <div className="relative w-full h-full">
                <Image
                  src={currentOperator.image}
                  alt={currentOperator.name}
                  fill
                  className="object-contain scale-110 hover:scale-115 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
            </div>
          </div>

            {/* Faction Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-bold tracking-wider ${
              currentOperator.faction === 'PHANTOM' 
                ? 'bg-[#8B5CF6]/20 text-[#8B5CF6] border-l-2 border-[#8B5CF6]' 
                : 'bg-[#2563EB]/20 text-[#2563EB] border-l-2 border-[#2563EB]'
            }`}>
              {currentOperator.faction}
            </div>

            {/* Status Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {currentOperator.isNew && (
                <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-sm text-xs font-bold tracking-wider border-l-2 border-yellow-500">
                  NEW
                </div>
              )}
              {currentOperator.isPremium && (
                <div className="px-3 py-1 bg-gradient-to-r from-[#FF6B2B]/20 to-[#8B5CF6]/20 text-white rounded-sm text-xs font-bold tracking-wider border-l-2 border-[#FF6B2B]">
                  PREMIUM
                </div>
              )}
            </div>

            {/* Operator Name Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${
              animatingOut ? 'opacity-0' : 'opacity-100'
            }`}>
              <div className="text-base text-[#8B5CF6] font-bold mb-1 uppercase tracking-wider">
                {currentOperator.role}
              </div>
              <h3 className="text-4xl font-bold tracking-wider text-white mb-2">
                {currentOperator.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-sm text-xs font-medium ${
                  currentOperator.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border-l-2 border-green-500' :
                  currentOperator.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-500' :
                  'bg-red-500/20 text-red-400 border-l-2 border-red-500'
                }`}>
                  {currentOperator.difficulty}
                </span>
                
              <button 
                  className="flex items-center gap-1 ml-auto text-xs text-[#8B5CF6] hover:text-[#9D6FFF]"
                  onClick={() => setShowOperatorSelect(!showOperatorSelect)}
                >
                  <span>CHANGE</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                </button>
              </div>
              
              {/* Mobile Operator Selection */}
              {showOperatorSelect && (
                <div className="absolute bottom-24 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border border-[#8B5CF6]/20 rounded-t-lg max-h-[300px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {filteredOperators.map((operator, index) => (
                      <button
                        key={operator.id}
                        onClick={() => {
                          handleOperatorChange(index);
                          setShowOperatorSelect(false);
                        }}
                        className={`flex items-center gap-2 p-2 rounded ${
                          selectedOperator === index ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/50' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black/30">
                          <Image
                            src={operator.image}
                            alt={operator.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{operator.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Operator Details - Center Panel */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 h-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-[#8B5CF6]/20 text-white border-b-2 border-[#8B5CF6]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                PROFILE
              </button>
              <button
                onClick={() => setActiveTab('loadout')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'loadout' 
                    ? 'bg-[#8B5CF6]/20 text-white border-b-2 border-[#8B5CF6]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                LOADOUT
              </button>
              <button
                onClick={() => setActiveTab('abilities')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'abilities' 
                    ? 'bg-[#8B5CF6]/20 text-white border-b-2 border-[#8B5CF6]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                ABILITIES
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm text-gray-400 uppercase mb-2">Background</h4>
                    <p className="text-white leading-relaxed">{currentOperator.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 uppercase mb-4">Combat Profile</h4>
                    <div className="group">
                      <StatChart stats={currentOperator.stats} />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 uppercase mb-2">Intel</h4>
                    <p className="text-white">{currentOperator.background}</p>
                  </div>
                </div>
              )}
              
              {/* Loadout Tab */}
              {activeTab === 'loadout' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-lg p-4 border border-[#8B5CF6]/20">
                      <h4 className="text-sm text-[#8B5CF6] uppercase mb-2 font-medium">Primary Weapon</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center text-white/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold">{currentOperator.loadout.primary}</div>
                          <div className="text-xs text-gray-400">PRIMARY</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4 border border-[#8B5CF6]/20">
                      <h4 className="text-sm text-[#8B5CF6] uppercase mb-2 font-medium">Secondary Weapon</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center text-white/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold">{currentOperator.loadout.secondary}</div>
                          <div className="text-xs text-gray-400">SECONDARY</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4 border border-[#8B5CF6]/20">
                      <h4 className="text-sm text-[#8B5CF6] uppercase mb-2 font-medium">Tactical Equipment</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center text-white/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold">{currentOperator.loadout.tactical}</div>
                          <div className="text-xs text-gray-400">TACTICAL</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4 border border-[#8B5CF6]/20">
                      <h4 className="text-sm text-[#8B5CF6] uppercase mb-2 font-medium">Lethal Equipment</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center text-white/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold">{currentOperator.loadout.lethal}</div>
                          <div className="text-xs text-gray-400">LETHAL</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full py-3 px-4 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 transition-colors rounded-lg border border-[#8B5CF6]/30 text-white font-medium">
                      CUSTOMIZE LOADOUT
                    </button>
                    <div className="text-center text-xs text-gray-400 mt-2">
                      Download and login to customize operator loadouts
                    </div>
                  </div>
                </div>
              )}
              
              {/* Abilities Tab */}
              {activeTab === 'abilities' && (
                <div className="space-y-6">
                  <div className="bg-black/30 rounded-lg p-6 border border-[#8B5CF6]/20">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{currentOperator.specialAbility.name}</h3>
                        <p className="text-gray-300 mb-4">{currentOperator.specialAbility.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="bg-black/30 px-3 py-1 rounded text-sm">
                            <span className="text-gray-400">Cooldown:</span> 
                            <span className="ml-1 text-white">{currentOperator.specialAbility.cooldown}s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#8B5CF6]/20 to-transparent p-5 rounded-lg border border-[#8B5CF6]/10">
                    <h4 className="text-sm text-[#8B5CF6] uppercase mb-3 font-medium">Tactical Advantage</h4>
                    <p className="text-gray-300">
                      Each operator has a unique special ability that can change the course of battle when used strategically.
                      Synergize with your team&apos;s abilities for maximum effectiveness.
                    </p>
                    </div>

                  <div className="mt-6">
                    <button className="w-full py-3 px-4 bg-[#8B5CF6] hover:bg-[#9D6FFF] transition-colors rounded-lg text-white font-medium">
                      DEPLOY OPERATOR
                    </button>
                    <div className="text-center text-xs text-gray-400 mt-2">
                      Download and login to select this operator
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

        {/* Operator Selection - Right Panel (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3 order-3">
          <h3 className="text-sm text-gray-400 uppercase mb-4 ml-2">
            Quick Select ({filteredOperators.length} Operators)
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {filteredOperators.map((operator, index) => (
          <button
                key={operator.id}
                onClick={() => handleOperatorChange(index)}
                className={`relative rounded-lg overflow-hidden group transition-all duration-300 
                  border ${selectedOperator === index 
                    ? (operator.faction === 'PHANTOM' ? 'border-[#8B5CF6]' : 'border-[#2563EB]')
                    : 'border-transparent hover:border-white/20'
                  }`}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="relative p-3 flex flex-col items-center">
                  <div className="relative w-12 h-12 mb-2 overflow-hidden rounded-full bg-black/30">
                <Image
                      src={operator.image}
                      alt={operator.name}
                  fill
                      className="object-cover"
                />
              </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis">{operator.name}</h4>
                    <p className="text-xs text-[#8B5CF6]">{operator.role}</p>
              </div>

                  {/* Status badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {operator.isNew && (
                      <div className="w-2 h-2 rounded-full bg-yellow-500" title="New Operator" />
                    )}
                    {operator.isPremium && (
                      <div className="w-2 h-2 rounded-full bg-[#FF6B2B]" title="Premium Operator" />
                    )}
              </div>
            </div>
          </button>
        ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Operators 