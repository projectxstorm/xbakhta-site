'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SectionContent {
  title: string;
  description: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
}

interface NavButton {
  label: string;
  href: string;
}

interface SocialLink {
  id: string;
  label: string;
  icon: string;
  href: string;
  enabled: boolean;
}

interface NavigationContent {
  studioName: string;
  tagline: string;
  menuItems: NavItem[];
  downloadButton: NavButton;
  socialLinks: SocialLink[];
  supportLinks: NavButton[];
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  image: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  isNew?: boolean;
  isPopular?: boolean;
  creator?: string;
  mapCount?: number;
  matchDuration?: string;
  objectiveType?: string;
  category: 'competitive' | 'casual' | 'custom';
}

export interface Operator {
  id: string;
  name: string;
  role: string;
  description: string;
  specialAbility: {
    name: string;
    description: string;
    cooldown: number;
  };
  loadout: {
    primary: string;
    secondary: string;
    tactical: string;
    lethal: string;
  };
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  stats: {
    speed: number;
    armor: number;
    firepower: number;
    stealth: number;
    support: number;
  };
  faction: 'PHANTOM' | 'SENTINEL';
  background: string;
  isNew?: boolean;
  isPremium?: boolean;
}

type ContentSections = {
  welcome: SectionContent;
  gameModes: SectionContent;
  operators: SectionContent;
  maps: SectionContent;
  battlePass: SectionContent;
  leaderboard: SectionContent;
  [key: string]: SectionContent;
}

// Add new interfaces
export interface Map {
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

export interface BattlePassReward {
  id: number;
  name: string;
  type: 'Operator' | 'Weapon' | 'Tactical' | 'Attachment' | 'XP';
  tier: 'Free' | 'Premium';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  image: string;
  level: number;
  description?: string;
}

export interface BattlePass {
  id: string;
  name: string;
  season: string;
  daysLeft: number;
  maxLevel: number;
  premiumPrice: string;
  rewards: BattlePassReward[];
  image: string;
}

export interface HeroButton {
  id: string;
  label: string;
  description?: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;
}

export interface FooterSection {
  title: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
}

export interface Footer {
  copyright: string;
  sections: FooterSection[];
  bottomLinks: {
    id: string;
    label: string;
    href: string;
  }[];
}

type AdminContextType = {
  isAdmin: boolean;
  toggleAdmin: () => void;
  editableContent: ContentSections;
  updateContent: (section: string, data: Partial<SectionContent>) => void;
  resetContent: () => void;
  adminSidebarOpen: boolean;
  toggleAdminSidebar: () => void;
  isPasswordDialogOpen: boolean;
  closePasswordDialog: () => void;
  verifyPassword: (password: string) => void;
  navigationContent: NavigationContent;
  updateNavigation: (data: Partial<NavigationContent>) => void;
  updateMenuItem: (id: string, data: Partial<NavItem>) => void;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  updateSupportLink: (index: number, data: Partial<NavButton>) => void;
  logoutAdmin: () => void;
  gameModes: GameMode[];
  updateGameMode: (id: string, data: Partial<GameMode>) => void;
  addGameMode: (gameMode: GameMode) => void;
  deleteGameMode: (id: string) => void;
  operators: Operator[];
  updateOperator: (id: string, data: Partial<Operator>) => void;
  addOperator: (operator: Operator) => void;
  deleteOperator: (id: string) => void;
  maps: Map[];
  updateMap: (id: string, data: Partial<Map>) => void;
  addMap: (map: Map) => void;
  deleteMap: (id: string) => void;
  battlePass: BattlePass;
  updateBattlePass: (data: Partial<BattlePass>) => void;
  updateBattlePassReward: (id: number, data: Partial<BattlePassReward>) => void;
  addBattlePassReward: (reward: BattlePassReward) => void;
  deleteBattlePassReward: (id: number) => void;
  heroButtons: HeroButton[];
  updateHeroButton: (id: string, data: Partial<HeroButton>) => void;
  addHeroButton: (button: HeroButton) => void;
  deleteHeroButton: (id: string) => void;
  footer: Footer;
  updateFooter: (data: Partial<Footer>) => void;
  updateFooterSection: (index: number, data: Partial<FooterSection>) => void;
  updateFooterLink: (sectionIndex: number, linkId: string, data: Partial<{label: string, href: string}>) => void;
  updateBottomLink: (id: string, data: Partial<{label: string, href: string}>) => void;
}

const defaultContent: ContentSections = {
  welcome: {
    title: 'Welcome to MFPS Tactical',
    description: 'The ultimate team-based tactical FPS experience on mobile and desktop'
  },
  gameModes: {
    title: 'Game Modes',
    description: 'Multiple ways to play, from fast-paced action to strategic operations'
  },
  operators: {
    title: 'Operators',
    description: 'Choose your role with unique specialists designed for different playstyles'
  },
  maps: {
    title: 'Battlegrounds',
    description: 'Fight across diverse tactical environments from around the world'
  },
  battlePass: {
    title: 'BATTLE PASS',
    description: 'Unlock exclusive rewards, weapon skins, and operator customizations'
  },
  leaderboard: {
    title: 'LEADERBOARD',
    description: 'Compete against the best tactical operators and rise through the ranks'
  }
};

const defaultNavigation: NavigationContent = {
  studioName: 'BlinkBox',
  tagline: 'TACTICAL SHOOTER',
  menuItems: [
    { id: 'modes', label: 'MODES', href: '#game-modes', enabled: true },
    { id: 'weapons', label: 'WEAPONS', href: '#weapons', enabled: true },
    { id: 'operators', label: 'OPERATORS', href: '#characters', enabled: true },
    { id: 'maps', label: 'MAPS', href: '#maps', enabled: true },
    { id: 'esports', label: 'ESPORTS', href: '#esports', enabled: false },
    { id: 'leaderboard', label: 'LEADERBOARD', href: '#leaderboard', enabled: true }
  ],
  downloadButton: {
    label: 'Download',
    href: '#download'
  },
  socialLinks: [
    { id: 'discord', label: 'Discord', icon: 'https://cdn-icons-png.flaticon.com/128/3670/3670124.png', href: '#', enabled: true },
    { id: 'twitter', label: 'Twitter', icon: 'https://cdn-icons-png.flaticon.com/128/5969/5969020.png', href: '#', enabled: true },
    { id: 'youtube', label: 'YouTube', icon: 'https://cdn-icons-png.flaticon.com/128/3670/3670147.png', href: '#', enabled: true },
    { id: 'instagram', label: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/128/3670/3670125.png', href: '#', enabled: true },
    { id: 'facebook', label: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/128/3670/3670127.png', href: '#', enabled: true }
  ],
  supportLinks: [
    { label: 'Support', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' }
  ]
};

const defaultGameModes: GameMode[] = [
  {
    id: 'mode-1',
    name: 'Tactical Operations',
    description: 'Strategic 5v5 objective-based gameplay with limited respawns and tactical planning phases.',
    image: '/images/modes/tactical.jpg',
    players: '5v5',
    difficulty: 'Expert',
    category: 'competitive',
    isPopular: true,
    mapCount: 8,
    matchDuration: '30-45 min',
    objectiveType: 'Plant/Defuse'
  },
  {
    id: 'domination',
    name: 'DOMINATION',
    description: 'Capture and hold strategic points to accumulate score for your team.',
    image: '/images/game-modes/domination.jpg',
    players: '6v6',
    difficulty: 'Medium',
    mapCount: 5,
    matchDuration: '~15 min',
    objectiveType: 'Territory Control',
    category: 'competitive'
  },
  {
    id: 'ranked-match',
    name: 'RANKED MATCH',
    description: 'Compete in ranked competitive play to climb the global leaderboards.',
    image: '/images/game-modes/ffa.jpg',
    players: '5v5',
    difficulty: 'Expert',
    isNew: true,
    mapCount: 7,
    matchDuration: '~30 min',
    objectiveType: 'Ranked Play',
    category: 'competitive'
  },
  {
    id: 'team-deathmatch',
    name: 'TEAM DEATHMATCH',
    description: 'Classic team vs team combat with unlimited respawns. Highest score wins.',
    image: '/images/game-modes/team-deathmatch.jpg',
    players: '6v6',
    difficulty: 'Easy',
    mapCount: 9,
    matchDuration: '~15 min',
    objectiveType: 'Elimination',
    category: 'casual'
  },
  {
    id: 'free-for-all',
    name: 'FREE FOR ALL',
    description: 'Every operator for themselves in this high-octane battle.',
    image: '/images/game-modes/random.jpg',
    players: '12 Players',
    difficulty: 'Medium',
    mapCount: 6,
    matchDuration: '~10 min',
    objectiveType: 'Elimination',
    category: 'casual'
  },
  {
    id: 'gun-game',
    name: 'GUN GAME',
    description: 'Progress through a series of weapons by getting eliminations with each one.',
    image: '/images/game-modes/low-gravity.jpg',
    players: '12 Players',
    difficulty: 'Medium',
    isNew: true,
    mapCount: 4,
    matchDuration: '~15 min',
    objectiveType: 'Progression',
    category: 'casual'
  },
  {
    id: 'last-operator',
    name: 'LAST OPERATOR STANDING',
    description: 'One life, no respawns. Eliminate the enemy team to win the round.',
    image: '/images/game-modes/one-hp.jpg',
    players: '3v3',
    difficulty: 'Hard',
    mapCount: 5,
    matchDuration: '~8 min',
    objectiveType: 'Survival',
    category: 'casual'
  },
  {
    id: 'tactical-realism',
    name: 'TACTICAL REALISM',
    description: 'Hardcore mode with limited HUD, friendly fire, and realistic damage.',
    image: '/images/game-modes/zombie.jpg',
    players: '5v5',
    difficulty: 'Expert',
    creator: 'Community',
    mapCount: 7,
    matchDuration: 'Varies',
    objectiveType: 'Custom',
    category: 'custom'
  },
  {
    id: 'weapon-master',
    name: 'WEAPON MASTER',
    description: 'Prove your skill with every weapon in the game in this community favorite.',
    image: '/images/game-modes/knife.jpg',
    players: '8 Players',
    difficulty: 'Medium',
    creator: 'Official',
    isPopular: true,
    mapCount: 4,
    matchDuration: '~12 min',
    objectiveType: 'Skill',
    category: 'custom'
  },
  {
    id: 'mode-custom',
    name: 'Custom Match',
    description: 'Create your own match with custom rules, team size, and objectives.',
    image: '/images/modes/custom.jpg',
    players: 'Variable',
    difficulty: 'Medium',
    creator: 'Community',
    matchDuration: 'Variable',
    objectiveType: 'Variable',
    category: 'custom'
  },
  {
    id: 'domination',
    name: 'DOMINATION',
    description: 'Capture and hold strategic positions to earn points for your team.',
    image: '/images/game-modes/domination.jpg',
    players: '6v6',
    difficulty: 'Medium',
    isNew: true,
    mapCount: 6,
    matchDuration: '~15 min',
    objectiveType: 'Zone Control',
    category: 'competitive'
  },
  {
    id: 'escort',
    name: 'ESCORT',
    description: 'Guide the payload through checkpoints while the enemy team tries to stop you.',
    image: '/images/game-modes/escort.jpg',
    players: '5v5',
    difficulty: 'Hard',
    mapCount: 4,
    matchDuration: '~20 min',
    objectiveType: 'Objective-based',
    category: 'competitive'
  },
  {
    id: 'last-operator-standing',
    name: 'LAST OPERATOR STANDING',
    description: 'No respawns, limited health, and scarce resources. Be the last one alive.',
    image: '/images/game-modes/last-operator.jpg',
    players: '8-player FFA',
    difficulty: 'Expert',
    isNew: true,
    mapCount: 5,
    matchDuration: '~10 min',
    objectiveType: 'Survival',
    category: 'competitive'
  },
  {
    id: 'hardpoint',
    name: 'HARDPOINT',
    description: 'Control the hardpoint to earn points. Locations shift throughout the match.',
    image: '/images/game-modes/hardpoint.jpg',
    players: '5v5',
    difficulty: 'Expert',
    mapCount: 6,
    matchDuration: '~15 min',
    objectiveType: 'Zone Control',
    category: 'competitive'
  },
  {
    id: 'high-value-target',
    name: 'HIGH VALUE TARGET',
    description: 'One player becomes the VIP with special abilities. Protect or eliminate the VIP.',
    image: '/images/game-modes/vip.jpg',
    players: '5v5',
    difficulty: 'Expert',
    mapCount: 5,
    matchDuration: '~20 min',
    objectiveType: 'VIP',
    category: 'competitive'
  }
];

const defaultOperators: Operator[] = [
  {
    id: 'recon-1',
    name: 'VIPER',
    role: 'Recon Specialist',
    description: 'A stealth reconnaissance expert with advanced surveillance capabilities and unmatched target acquisition skills.',
    specialAbility: {
      name: 'Eagle Eye',
      description: 'Activate enhanced optics to mark enemies through smoke and thin cover for your entire team.',
      cooldown: 45
    },
    loadout: {
      primary: 'Tactical Marksman Rifle',
      secondary: 'Suppressed Pistol',
      tactical: 'Smoke Grenade',
      lethal: 'Proximity Mine'
    },
    image: '/images/characters/leo.png',
    difficulty: 'Medium',
    stats: {
      speed: 80,
      armor: 40,
      firepower: 75,
      stealth: 90,
      support: 65
    },
    faction: 'PHANTOM',
    background: 'Former special reconnaissance unit sniper with over 200 confirmed operations.',
    isNew: true
  },
  {
    id: 'medic-1',
    name: 'LOTUS',
    role: 'Combat Medic',
    description: 'A tactical support specialist who excels at keeping the squad operational under extreme pressure.',
    specialAbility: {
      name: 'Rapid Response',
      description: 'Deploy a medical drone that can revive downed teammates faster and restore partial health to the squad.',
      cooldown: 60
    },
    loadout: {
      primary: 'Compact SMG',
      secondary: 'Tactical Pistol',
      tactical: 'Healing Dart',
      lethal: 'Incendiary Grenade'
    },
    image: '/images/characters/lila.png',
    difficulty: 'Easy',
    stats: {
      speed: 70,
      armor: 50,
      firepower: 60,
      stealth: 65,
      support: 95
    },
    faction: 'PHANTOM',
    background: 'Distinguished combat medic with experience in high-risk extraction operations.',
    isPremium: true
  },
  {
    id: 'assault-1',
    name: 'SLEDGE',
    role: 'Breacher',
    description: 'A frontline assault specialist trained to create entry points and lead aggressive pushes into enemy territory.',
    specialAbility: {
      name: 'Breach Charge',
      description: 'Deploy a powerful explosive that can destroy reinforced walls and stun enemies in the vicinity.',
      cooldown: 70
    },
    loadout: {
      primary: 'Assault Shotgun',
      secondary: 'Heavy Pistol',
      tactical: 'Flashbang',
      lethal: 'Frag Grenade'
    },
    image: '/images/characters/leo.png',
    difficulty: 'Medium',
    stats: {
      speed: 60,
      armor: 85,
      firepower: 90,
      stealth: 30,
      support: 45
    },
    faction: 'SENTINEL',
    background: 'Ex-demolitions expert with specialized training in urban combat scenarios.'
  },
  {
    id: 'tech-1',
    name: 'CIPHER',
    role: 'Intelligence Operative',
    description: 'A tactical hacker who disrupts enemy communications and provides crucial intelligence to the team.',
    specialAbility: {
      name: 'Neural Interface',
      description: 'Hack into enemy tactical systems to reveal their positions and temporarily disable their abilities.',
      cooldown: 55
    },
    loadout: {
      primary: 'Precision Rifle',
      secondary: 'Machine Pistol',
      tactical: 'EMP Grenade',
      lethal: 'Claymore'
    },
    image: '/images/characters/lila.png',
    difficulty: 'Hard',
    stats: {
      speed: 65,
      armor: 45,
      firepower: 70,
      stealth: 85,
      support: 75
    },
    faction: 'SENTINEL',
    background: 'Former intelligence agency operative with extensive electronic warfare expertise.',
    isPremium: true
  }
];

// Admin password - in a real app, this would be server-side authenticated
const ADMIN_PASSWORD = 'xbakhta2024';

// Session storage keys
const ADMIN_SESSION_KEY = 'xbakhta_admin_session';
const CONTENT_SESSION_KEY = 'xbakhta_content_session';
const NAV_SESSION_KEY = 'xbakhta_nav_session';
const GAME_MODES_KEY = 'xbakhta_game_modes_session';
const OPERATORS_KEY = 'xbakhta_operators_session';
const MAPS_KEY = 'xbakhta_maps_session';
const BATTLE_PASS_KEY = 'xbakhta_battle_pass_session';
const HERO_BUTTONS_KEY = 'xbakhta_hero_buttons_session';
const FOOTER_KEY = 'xbakhta_footer_session';

const defaultMaps: Map[] = [
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
  }
];

const defaultBattlePass: BattlePass = {
  id: 'season-1',
  name: 'SHADOW PROTOCOL',
  season: 'SEASON 1',
  daysLeft: 21,
  maxLevel: 50,
  premiumPrice: '1000 Credits',
  image: '/images/battle-pass/battle-pass-hero.jpg',
  rewards: [
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
    }
  ]
};

const defaultHeroButtons: HeroButton[] = [
  {
    id: 'play-free',
    label: 'PLAY FREE',
    description: 'Download now and join the action',
    href: '#download',
    variant: 'primary',
    icon: 'download'
  },
  {
    id: 'watch-trailer',
    label: 'WATCH TRAILER',
    description: 'See the game in action',
    href: '#trailer',
    variant: 'secondary',
    icon: 'play'
  },
  {
    id: 'learn-more',
    label: 'LEARN MORE',
    href: '#about',
    variant: 'outline'
  }
];

const defaultFooter: Footer = {
  copyright: '© 2023 BlinkBox. All rights reserved.',
  sections: [
    {
      title: 'Game',
      links: [
        {id: 'about', label: 'About', href: '#about'},
        {id: 'modes', label: 'Game Modes', href: '#game-modes'},
        {id: 'maps', label: 'Maps', href: '#maps'},
        {id: 'operators', label: 'Operators', href: '#characters'}
      ]
    },
    {
      title: 'Support',
      links: [
        {id: 'faq', label: 'FAQ', href: '#faq'},
        {id: 'help', label: 'Help Center', href: '#help'},
        {id: 'contact', label: 'Contact Us', href: '#contact'},
        {id: 'community', label: 'Community', href: '#community'}
      ]
    },
    {
      title: 'Legal',
      links: [
        {id: 'terms', label: 'Terms of Service', href: '#terms'},
        {id: 'privacy', label: 'Privacy Policy', href: '#privacy'},
        {id: 'cookies', label: 'Cookie Policy', href: '#cookies'},
        {id: 'eula', label: 'EULA', href: '#eula'}
      ]
    }
  ],
  bottomLinks: [
    {id: 'terms', label: 'Terms', href: '#terms'},
    {id: 'privacy', label: 'Privacy', href: '#privacy'},
    {id: 'cookies', label: 'Cookies', href: '#cookies'}
  ]
};

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  toggleAdmin: () => {},
  editableContent: defaultContent,
  updateContent: () => {},
  resetContent: () => {},
  adminSidebarOpen: false,
  toggleAdminSidebar: () => {},
  isPasswordDialogOpen: false,
  closePasswordDialog: () => {},
  verifyPassword: () => {},
  navigationContent: defaultNavigation,
  updateNavigation: () => {},
  updateMenuItem: () => {},
  updateSocialLink: () => {},
  updateSupportLink: () => {},
  logoutAdmin: () => {},
  gameModes: defaultGameModes,
  updateGameMode: () => {},
  addGameMode: () => {},
  deleteGameMode: () => {},
  operators: defaultOperators,
  updateOperator: () => {},
  addOperator: () => {},
  deleteOperator: () => {},
  maps: defaultMaps,
  updateMap: () => {},
  addMap: () => {},
  deleteMap: () => {},
  battlePass: defaultBattlePass,
  updateBattlePass: () => {},
  updateBattlePassReward: () => {},
  addBattlePassReward: () => {},
  deleteBattlePassReward: () => {},
  heroButtons: defaultHeroButtons,
  updateHeroButton: () => {},
  addHeroButton: () => {},
  deleteHeroButton: () => {},
  footer: defaultFooter,
  updateFooter: () => {},
  updateFooterSection: () => {},
  updateFooterLink: () => {},
  updateBottomLink: () => {}
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [editableContent, setEditableContent] = useState<ContentSections>(defaultContent);
  const [navigationContent, setNavigationContent] = useState<NavigationContent>(defaultNavigation);
  const [gameModes, setGameModes] = useState<GameMode[]>(defaultGameModes);
  const [operators, setOperators] = useState<Operator[]>(defaultOperators);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [maps, setMaps] = useState<Map[]>(defaultMaps);
  const [battlePass, setBattlePass] = useState<BattlePass>(defaultBattlePass);
  const [heroButtons, setHeroButtons] = useState<HeroButton[]>(defaultHeroButtons);
  const [footer, setFooter] = useState<Footer>(defaultFooter);
  
  // Initialize state from session storage
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      // Check if we have admin session
      const adminSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (adminSession === 'true') {
        setIsAdmin(true);
      }
      
      // Load saved content if available
      const savedContent = sessionStorage.getItem(CONTENT_SESSION_KEY);
      if (savedContent) {
        try {
          setEditableContent(JSON.parse(savedContent));
        } catch (err) {
          console.error('Error parsing saved content:', err);
        }
      }
      
      // Load saved navigation if available
      const savedNav = sessionStorage.getItem(NAV_SESSION_KEY);
      if (savedNav) {
        try {
          setNavigationContent(JSON.parse(savedNav));
        } catch (err) {
          console.error('Error parsing saved navigation:', err);
        }
      }
      
      // Load saved game modes if available
      const savedGameModes = sessionStorage.getItem(GAME_MODES_KEY);
      if (savedGameModes) {
        try {
          setGameModes(JSON.parse(savedGameModes));
        } catch (err) {
          console.error('Error parsing saved game modes:', err);
        }
      }
      
      // Load saved operators if available
      const savedOperators = sessionStorage.getItem(OPERATORS_KEY);
      if (savedOperators) {
        try {
          setOperators(JSON.parse(savedOperators));
        } catch (err) {
          console.error('Error parsing saved operators:', err);
        }
      }
      
      // Load saved maps if available
      const savedMaps = sessionStorage.getItem(MAPS_KEY);
      if (savedMaps) {
        try {
          setMaps(JSON.parse(savedMaps));
        } catch (err) {
          console.error('Error parsing saved maps:', err);
        }
      }
      
      // Load saved battle pass if available
      const savedBattlePass = sessionStorage.getItem(BATTLE_PASS_KEY);
      if (savedBattlePass) {
        try {
          setBattlePass(JSON.parse(savedBattlePass));
        } catch (err) {
          console.error('Error parsing saved battle pass:', err);
        }
      }
      
      // Load saved hero buttons if available
      const savedHeroButtons = sessionStorage.getItem(HERO_BUTTONS_KEY);
      if (savedHeroButtons) {
        try {
          setHeroButtons(JSON.parse(savedHeroButtons));
        } catch (err) {
          console.error('Error parsing saved hero buttons:', err);
        }
      }
      
      // Load saved footer if available
      const savedFooter = sessionStorage.getItem(FOOTER_KEY);
      if (savedFooter) {
        try {
          setFooter(JSON.parse(savedFooter));
        } catch (err) {
          console.error('Error parsing saved footer:', err);
        }
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);
  
  // Save admin state to session storage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      if (isAdmin) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } else {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
  }, [isAdmin, isInitialized]);
  
  // Save content state to session storage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(CONTENT_SESSION_KEY, JSON.stringify(editableContent));
    }
  }, [editableContent, isInitialized]);
  
  // Save navigation state to session storage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(NAV_SESSION_KEY, JSON.stringify(navigationContent));
    }
  }, [navigationContent, isInitialized]);
  
  // Save game modes to session storage when they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(GAME_MODES_KEY, JSON.stringify(gameModes));
    }
  }, [gameModes, isInitialized]);
  
  // Save operators to session storage when they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(OPERATORS_KEY, JSON.stringify(operators));
    }
  }, [operators, isInitialized]);
  
  // Save maps to session storage when they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(MAPS_KEY, JSON.stringify(maps));
    }
  }, [maps, isInitialized]);
  
  // Save battle pass to session storage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(BATTLE_PASS_KEY, JSON.stringify(battlePass));
    }
  }, [battlePass, isInitialized]);
  
  // Save hero buttons to session storage when they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(HERO_BUTTONS_KEY, JSON.stringify(heroButtons));
    }
  }, [heroButtons, isInitialized]);
  
  // Save footer to session storage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      sessionStorage.setItem(FOOTER_KEY, JSON.stringify(footer));
    }
  }, [footer, isInitialized]);
  
  // Called when user successfully enters the key sequence
  const handleSequenceDetected = () => {
    // If already logged in, just open the sidebar
    if (isAdmin) {
      setAdminSidebarOpen(true);
    } else {
      setIsPasswordDialogOpen(true);
    }
  };
  
  const toggleAdmin = () => {
    setIsAdmin(prev => !prev);
    if (isAdmin) {
      // Logging out
      setAdminSidebarOpen(false);
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  };
  
  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminSidebarOpen(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };
  
  const updateContent = (section: string, data: Partial<SectionContent>) => {
    setEditableContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };
  
  const resetContent = () => {
    setEditableContent(defaultContent);
    setNavigationContent(defaultNavigation);
    setGameModes(defaultGameModes);
    setOperators(defaultOperators);
    setMaps(defaultMaps);
    setBattlePass(defaultBattlePass);
    setHeroButtons(defaultHeroButtons);
    setFooter(defaultFooter);
    
    // Also update session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CONTENT_SESSION_KEY, JSON.stringify(defaultContent));
      sessionStorage.setItem(NAV_SESSION_KEY, JSON.stringify(defaultNavigation));
      sessionStorage.setItem(GAME_MODES_KEY, JSON.stringify(defaultGameModes));
      sessionStorage.setItem(OPERATORS_KEY, JSON.stringify(defaultOperators));
      sessionStorage.setItem(MAPS_KEY, JSON.stringify(defaultMaps));
      sessionStorage.setItem(BATTLE_PASS_KEY, JSON.stringify(defaultBattlePass));
      sessionStorage.setItem(HERO_BUTTONS_KEY, JSON.stringify(defaultHeroButtons));
      sessionStorage.setItem(FOOTER_KEY, JSON.stringify(defaultFooter));
    }
  };
  
  const toggleAdminSidebar = () => {
    setAdminSidebarOpen(prev => !prev);
  };
  
  const closePasswordDialog = () => {
    setIsPasswordDialogOpen(false);
  };
  
  const verifyPassword = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsPasswordDialogOpen(false);
      setIsAdmin(true);
      // Don't automatically open sidebar
    } else {
      // In a real app, you might want to handle incorrect password attempts
      console.log('Invalid password');
      // Could add a counter for failed attempts or other security measures
    }
  };

  // Navigation content update functions
  const updateNavigation = (data: Partial<NavigationContent>) => {
    setNavigationContent(prev => ({
      ...prev,
      ...data
    }));
  };

  const updateMenuItem = (id: string, data: Partial<NavItem>) => {
    setNavigationContent(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  const updateSocialLink = (id: string, data: Partial<SocialLink>) => {
    setNavigationContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => 
        link.id === id ? { ...link, ...data } : link
      )
    }));
  };

  const updateSupportLink = (index: number, data: Partial<NavButton>) => {
    setNavigationContent(prev => ({
      ...prev,
      supportLinks: prev.supportLinks.map((link, i) => 
        i === index ? { ...link, ...data } : link
      )
    }));
  };
  
  // Game Mode update functions
  const updateGameMode = (id: string, data: Partial<GameMode>) => {
    setGameModes(prev => 
      prev.map(mode => mode.id === id ? { ...mode, ...data } : mode)
    );
  };
  
  const addGameMode = (gameMode: GameMode) => {
    setGameModes(prev => [...prev, gameMode]);
  };
  
  const deleteGameMode = (id: string) => {
    setGameModes(prev => prev.filter(mode => mode.id !== id));
  };

  // Operator update functions
  const updateOperator = (id: string, data: Partial<Operator>) => {
    setOperators(prev => 
      prev.map(operator => operator.id === id ? { ...operator, ...data } : operator)
    );
  };
  
  const addOperator = (operator: Operator) => {
    setOperators(prev => [...prev, operator]);
  };
  
  const deleteOperator = (id: string) => {
    setOperators(prev => prev.filter(operator => operator.id !== id));
  };

  // Konami code + "xbakhta" detector
  useEffect(() => {
    let ctrlKey = false;
    let altKey = false;
    let keySequence: string[] = [];
    
    const targetSequence = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight',
      'x', 'b', 'a', 'k', 'h', 't', 'a'
    ];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Track control and alt keys
      if (e.key === 'Control') ctrlKey = true;
      if (e.key === 'Alt') altKey = true;
      
      // Only start sequence if Ctrl+Alt are pressed
      if (ctrlKey && altKey) {
        // Start or continue the sequence
        keySequence.push(e.key);
        
        // Check if sequence matches target (for the portion we have)
        const sequenceLength = keySequence.length;
        const targetPortion = targetSequence.slice(0, sequenceLength);
        const currentPortion = keySequence.slice(-targetPortion.length);
        
        // Reset if the sequence doesn't match
        if (!targetPortion.every((key, i) => key === currentPortion[i])) {
          keySequence = [];
        }
        
        // Check if the complete sequence matches
        if (sequenceLength >= targetSequence.length) {
          const isMatch = targetSequence.every((key, i) => 
            key === keySequence[keySequence.length - targetSequence.length + i]
          );
          
          if (isMatch) {
            // Open password dialog if the sequence matches
            handleSequenceDetected();
            keySequence = [];
          }
        }
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') ctrlKey = false;
      if (e.key === 'Alt') altKey = false;
      
      // Reset sequence if either Ctrl or Alt is released
      if (e.key === 'Control' || e.key === 'Alt') {
        keySequence = [];
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isAdmin]);
  
  // Add map management functions
  const updateMap = (id: string, data: Partial<Map>) => {
    setMaps(prev => 
      prev.map(map => map.id === id ? { ...map, ...data } : map)
    );
  };
  
  const addMap = (map: Map) => {
    setMaps(prev => [...prev, map]);
  };
  
  const deleteMap = (id: string) => {
    setMaps(prev => prev.filter(map => map.id !== id));
  };

  // Add battle pass management functions
  const updateBattlePass = (data: Partial<BattlePass>) => {
    setBattlePass(prev => ({ ...prev, ...data }));
  };
  
  const updateBattlePassReward = (id: number, data: Partial<BattlePassReward>) => {
    setBattlePass(prev => ({
      ...prev,
      rewards: prev.rewards.map(reward => 
        reward.id === id ? { ...reward, ...data } : reward
      )
    }));
  };
  
  const addBattlePassReward = (reward: BattlePassReward) => {
    setBattlePass(prev => ({
      ...prev,
      rewards: [...prev.rewards, reward]
    }));
  };
  
  const deleteBattlePassReward = (id: number) => {
    setBattlePass(prev => ({
      ...prev,
      rewards: prev.rewards.filter(reward => reward.id !== id)
    }));
  };

  // Add hero buttons management functions
  const updateHeroButton = (id: string, data: Partial<HeroButton>) => {
    setHeroButtons(prev => 
      prev.map(button => button.id === id ? { ...button, ...data } : button)
    );
  };
  
  const addHeroButton = (button: HeroButton) => {
    setHeroButtons(prev => [...prev, button]);
  };
  
  const deleteHeroButton = (id: string) => {
    setHeroButtons(prev => prev.filter(button => button.id !== id));
  };

  // Add footer management functions
  const updateFooter = (data: Partial<Footer>) => {
    setFooter(prev => ({ ...prev, ...data }));
  };
  
  const updateFooterSection = (index: number, data: Partial<FooterSection>) => {
    setFooter(prev => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], ...data };
      return { ...prev, sections: newSections };
    });
  };
  
  const updateFooterLink = (sectionIndex: number, linkId: string, data: Partial<{label: string, href: string}>) => {
    setFooter(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        links: newSections[sectionIndex].links.map(link => 
          link.id === linkId ? { ...link, ...data } : link
        )
      };
      return { ...prev, sections: newSections };
    });
  };
  
  const updateBottomLink = (id: string, data: Partial<{label: string, href: string}>) => {
    setFooter(prev => ({
      ...prev,
      bottomLinks: prev.bottomLinks.map(link => 
        link.id === id ? { ...link, ...data } : link
      )
    }));
  };
  
  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        toggleAdmin, 
        editableContent, 
        updateContent, 
        resetContent,
        adminSidebarOpen,
        toggleAdminSidebar,
        isPasswordDialogOpen,
        closePasswordDialog,
        verifyPassword,
        navigationContent,
        updateNavigation,
        updateMenuItem,
        updateSocialLink,
        updateSupportLink,
        logoutAdmin,
        gameModes,
        updateGameMode,
        addGameMode,
        deleteGameMode,
        operators,
        updateOperator,
        addOperator,
        deleteOperator,
        maps,
        updateMap,
        addMap,
        deleteMap,
        battlePass,
        updateBattlePass,
        updateBattlePassReward,
        addBattlePassReward,
        deleteBattlePassReward,
        heroButtons,
        updateHeroButton,
        addHeroButton,
        deleteHeroButton,
        footer,
        updateFooter,
        updateFooterSection,
        updateFooterLink,
        updateBottomLink
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext; 