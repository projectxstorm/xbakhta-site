'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Player {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  level: number;
  points: number;
  kills: number;
  kdRatio: number;
  winRate: number;
  clan?: string;
  isVIP?: boolean;
  isStreamer?: boolean;
}

type LeaderboardCategory = 'overall' | 'weekly' | 'monthly';
type LeaderboardStat = 'points' | 'kills' | 'kdRatio' | 'winRate';

const Leaderboard = () => {
  const [category, setCategory] = useState<LeaderboardCategory>('overall');
  const [stat, setStat] = useState<LeaderboardStat>('points');
  const [hovered, setHovered] = useState<string | null>(null);
  
  const players: Player[] = [
    {
      id: 'player1',
      rank: 1,
      name: 'ShadowSniper',
      avatar: '/images/battle-pass/samurai.png',
      level: 87,
      points: 125780,
      kills: 4982,
      kdRatio: 3.85,
      winRate: 67.2,
      clan: 'APEX',
      isVIP: true
    },
    {
      id: 'player2',
      rank: 2,
      name: 'TacticalOps',
      avatar: '/images/battle-pass/samurai.png',
      level: 92,
      points: 118450,
      kills: 5241,
      kdRatio: 3.52,
      winRate: 63.7,
      isStreamer: true
    },
    {
      id: 'player3',
      rank: 3,
      name: 'PhantomElite',
      avatar: '/images/battle-pass/samurai.png',
      level: 79,
      points: 109876,
      kills: 4125,
      kdRatio: 3.15,
      winRate: 59.8,
      clan: 'APEX'
    },
    {
      id: 'player4',
      rank: 4,
      name: 'Predator_Z',
      avatar: '/images/battle-pass/emote.png',
      level: 85,
      points: 98752,
      kills: 3980,
      kdRatio: 2.95,
      winRate: 54.3
    },
    {
      id: 'player5',
      rank: 5,
      name: 'StealthStrike',
      avatar: '/images/battle-pass/emote.png',
      level: 76,
      points: 92450,
      kills: 3780,
      kdRatio: 2.88,
      winRate: 52.1
    },
    {
      id: 'player6',
      rank: 6,
      name: 'CommandoAlpha',
      avatar: '/images/battle-pass/dragon-m4.png',
      level: 81,
      points: 89720,
      kills: 3654,
      kdRatio: 2.67,
      winRate: 51.8,
      clan: 'GHOST'
    },
    {
      id: 'player7',
      rank: 7,
      name: 'SpecOps_Recon',
      avatar: '/images/battle-pass/dragon-m4.png',
      level: 73,
      points: 84350,
      kills: 3421,
      kdRatio: 2.54,
      winRate: 49.2
    },
    {
      id: 'player8',
      rank: 8,
      name: 'DeadlyPrecision',
      avatar: '/images/battle-pass/blade.png',
      level: 78,
      points: 81240,
      kills: 3250,
      kdRatio: 2.41,
      winRate: 48.5,
      clan: 'GHOST'
    },
    {
      id: 'player9',
      rank: 9,
      name: 'SilentViper',
      avatar: '/images/battle-pass/blade.png',
      level: 72,
      points: 78950,
      kills: 3120,
      kdRatio: 2.35,
      winRate: 47.9
    },
    {
      id: 'player10',
      rank: 10,
      name: 'NightHawk',
      avatar: '/images/battle-pass/blade.png',
      level: 69,
      points: 75420,
      kills: 2980,
      kdRatio: 2.28,
      winRate: 46.2,
      isVIP: true
    },
  ];

  const formatStat = (value: number, type: LeaderboardStat): string => {
    if (type === 'points' || type === 'kills') {
      return value.toLocaleString();
    } else if (type === 'kdRatio') {
      return value.toFixed(2);
    } else {
      return `${value.toFixed(1)}%`;
    }
  };

  const getStatColor = (value: number, type: LeaderboardStat): string => {
    if (type === 'points') {
      if (value > 100000) return 'text-[#FF6B2B]';
      if (value > 80000) return 'text-[#8B5CF6]';
      return 'text-[#2563EB]';
    } else if (type === 'kills') {
      if (value > 4000) return 'text-[#FF6B2B]';
      if (value > 3000) return 'text-[#8B5CF6]';
      return 'text-[#2563EB]';
    } else if (type === 'kdRatio') {
      if (value > 3) return 'text-[#FF6B2B]';
      if (value > 2.5) return 'text-[#8B5CF6]';
      return 'text-[#2563EB]';
    } else { // winRate
      if (value > 60) return 'text-[#FF6B2B]';
      if (value > 50) return 'text-[#8B5CF6]';
      return 'text-[#2563EB]';
    }
  };

  const getValueLabel = (type: LeaderboardStat): string => {
    if (type === 'points') return 'Total Score';
    if (type === 'kills') return 'Kills';
    if (type === 'kdRatio') return 'K/D Ratio';
    return 'Win Rate';
  };

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
            <span className="text-gray-300">You&apos;re viewing global leaderboard data. Download the game client to track your personal stats and progression.</span>
          </p>
        </div>
      </div>
      
      {/* Leaderboard Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 p-1 bg-black/20 backdrop-blur-sm rounded-lg">
          <button 
            onClick={() => setCategory('overall')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              category === 'overall' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ALL TIME
          </button>
          <button 
            onClick={() => setCategory('monthly')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              category === 'monthly' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            MONTHLY
          </button>
          <button 
            onClick={() => setCategory('weekly')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              category === 'weekly' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            WEEKLY
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-black/20 backdrop-blur-sm rounded-lg">
          <button 
            onClick={() => setStat('points')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              stat === 'points' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SCORE
          </button>
          <button 
            onClick={() => setStat('kills')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              stat === 'kills' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            KILLS
          </button>
          <button 
            onClick={() => setStat('kdRatio')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              stat === 'kdRatio' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            K/D
          </button>
          <button 
            onClick={() => setStat('winRate')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${
              stat === 'winRate' 
                ? 'bg-[#8B5CF6] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            WINS
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-black/30">
          <div className="col-span-1 text-sm text-gray-400 font-medium">RANK</div>
          <div className="col-span-5 text-sm text-gray-400 font-medium">OPERATOR</div>
          <div className="col-span-2 text-sm text-gray-400 font-medium">LEVEL</div>
          <div className="col-span-4 text-sm text-gray-400 font-medium text-right">{getValueLabel(stat)}</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {players.map((player) => (
            <div 
              key={player.id}
              className={`grid grid-cols-12 gap-4 p-4 items-center transition-all duration-200 hover:bg-white/5 ${
                hovered === player.id ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setHovered(player.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Rank */}
              <div className="col-span-1 font-mono font-bold text-center">
                {player.rank <= 3 ? (
                  <span className={`
                    inline-flex items-center justify-center h-8 w-8 rounded-full
                    ${player.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' : 
                      player.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' : 
                      'bg-gradient-to-r from-amber-700 to-amber-900 text-white'}
                  `}>
                    {player.rank}
                  </span>
                ) : (
                  <span className="text-gray-400">{player.rank}</span>
                )}
              </div>

              {/* Player */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-black/40 border border-white/10">
                  <Image 
                    src={player.avatar}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{player.name}</span>
                    {player.isVIP && (
                      <span className="bg-gradient-to-r from-[#FF6B2B] to-[#8B5CF6] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
                        VIP
                      </span>
                    )}
                    {player.isStreamer && (
                      <span className="bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
                        STREAMER
                      </span>
                    )}
                  </div>
                  {player.clan && (
                    <div className="text-xs text-gray-400">
                      Clan: <span className="text-[#8B5CF6]">[{player.clan}]</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Level */}
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="bg-[#2563EB]/20 h-2 flex-grow rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2563EB]"
                      style={{ width: `${(player.level / 100) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-mono">{player.level}</span>
                </div>
              </div>

              {/* Stat Value */}
              <div className={`col-span-4 text-right font-bold ${getStatColor(player[stat], stat)}`}>
                {formatStat(player[stat], stat)}
              </div>

              {/* Expanded Player Stats (visible on hover) */}
              {hovered === player.id && (
                <div className="col-span-12 bg-black/30 p-3 rounded-md mt-2 grid grid-cols-4 gap-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">SCORE</div>
                    <div className={`font-mono font-medium ${getStatColor(player.points, 'points')}`}>
                      {formatStat(player.points, 'points')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">KILLS</div>
                    <div className={`font-mono font-medium ${getStatColor(player.kills, 'kills')}`}>
                      {formatStat(player.kills, 'kills')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">K/D RATIO</div>
                    <div className={`font-mono font-medium ${getStatColor(player.kdRatio, 'kdRatio')}`}>
                      {formatStat(player.kdRatio, 'kdRatio')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">WIN RATE</div>
                    <div className={`font-mono font-medium ${getStatColor(player.winRate, 'winRate')}`}>
                      {formatStat(player.winRate, 'winRate')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer with Download CTA instead of personal rank */}
        <div className="border-t border-white/10 p-4 bg-[#8B5CF6]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-400">TRACK YOUR STATS:</span>
              <span className="text-sm text-white">Download the game client to view your personal ranking</span>
            </div>
            <button className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#9D6FFF] transition-colors rounded text-sm font-bold">
              DOWNLOAD NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard 