'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import GameModes from '@/components/GameModes'
import Operators from '@/components/Characters'
import Maps from '@/components/Maps'
import MultiPass from '@/components/MultiPass'
import Leaderboard from '@/components/Leaderboard'
import { useAdmin } from './context/AdminContext'

export default function Home() {
  const gameName = process.env.NEXT_PUBLIC_GAME_NAME || 'FPS Arena'
  const studioName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'BlinkBox'
  
  return (
    <main className="min-h-screen bg-[#0F1218]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/heroes/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0F1218] via-[#0F1218]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="relative w-48 h-16 mx-auto md:hidden mb-8">
                <Image
                  src="/images/logos/logo.png"
                  alt="Game Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                <span className="inline-block text-[#8B5CF6] transform hover:scale-105 transition-transform">
                  TACTICAL
                </span>
                <br />
                <span className="inline-block text-[#2563EB] transform hover:scale-105 transition-transform">
                  PC COMBAT
                </span>
                <br />
                <span className="inline-block text-white transform hover:scale-105 transition-transform">
                  MULTIPLAYER
                </span>
              </h1>

              <div className="relative">
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                  Experience intense tactical first-person shooter gameplay with cutting-edge graphics and strategic team-based combat.
                  <span className="hidden sm:inline"> Join the battle and become a legend on the PC battlefield.</span>
                </p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#8B5CF6] to-[#2563EB] hidden md:block" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  href="#download" 
                  className="primary-button group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <span className="relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Now
                  </span>
                </Link>
                <Link 
                  href="#trailer" 
                  className="secondary-button group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] opacity-0 group-hover:opacity-10 transition-opacity" />
                  <span className="relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </span>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 md:mt-12">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform tactical-border">
                  <p className="text-[#8B5CF6] font-bold text-sm">TACTICAL FPS</p>
                  <p className="text-xs text-gray-400">Team-based combat</p>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform tactical-border">
                  <p className="text-[#2563EB] font-bold text-sm">MULTIPLAYER</p>
                  <p className="text-xs text-gray-400">5v5 competitive</p>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 transform hover:scale-105 transition-transform sm:col-span-1 col-span-2 tactical-border">
                  <p className="text-white font-bold text-sm">PC EXCLUSIVE</p>
                  <p className="text-xs text-gray-400">High-end graphics</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block relative h-[600px]">
              {/* Characters Container with Gradient Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* First Character */}
                <div className="absolute left-[10%] bottom-0 w-full max-w-[350px] h-full flex items-end">
                  <div className="relative w-full h-[90%]">
                    <Image
                      src="/images/heroes/character-1.png"
                      alt="Tactical Operator"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                
                {/* Second Character */}
                <div className="absolute right-[10%] bottom-0 w-full max-w-[350px] h-full flex items-end">
                  <div className="relative w-full h-[90%]">
                    <Image
                      src="/images/heroes/character-2.png"
                      alt="Special Forces Operator"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1218]/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Stats Banner */}
      <section className="py-6 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-sm">
                <span className="text-gray-400">PLAYERS ONLINE:</span>
                <span className="text-white font-mono ml-2">12,453</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="text-sm">
                <span className="text-gray-400">SERVER STATUS:</span>
                <span className="text-green-500 font-mono ml-2">OPERATIONAL</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="text-sm">
                <span className="text-gray-400">CURRENT SEASON:</span>
                <span className="text-[#8B5CF6] font-mono ml-2">PHANTOM RISE</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="text-sm">
                <span className="text-gray-400">NEXT UPDATE:</span>
                <span className="text-white font-mono ml-2">3D:14H:22M</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <GameModesSection />

      {/* Characters */}
      <OperatorsSection />

      {/* Maps */}
      <MapsSection />

      {/* Battle Pass */}
      <BattlePassSection />

      {/* Leaderboard */}
      <LeaderboardSection />

      {/* System Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="text-[#2563EB]">SYSTEM</span>
            <span className="text-white"> REQUIREMENTS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-lg tactical-border">
              <h3 className="text-2xl font-bold mb-4 text-[#8B5CF6]">MINIMUM</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">OS:</span>
                  <span className="text-white">Windows 10 64-bit</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">CPU:</span>
                  <span className="text-white">Intel Core i5-4460 / AMD Ryzen 3 1200</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">RAM:</span>
                  <span className="text-white">8 GB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">GPU:</span>
                  <span className="text-white">NVIDIA GTX 960 / AMD R9 380</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Storage:</span>
                  <span className="text-white">50 GB available space</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-white">Broadband Internet connection</span>
                </li>
              </ul>
            </div>
            <div className="glass-effect p-6 rounded-lg tactical-border">
              <h3 className="text-2xl font-bold mb-4 text-[#2563EB]">RECOMMENDED</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">OS:</span>
                  <span className="text-white">Windows 10/11 64-bit</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">CPU:</span>
                  <span className="text-white">Intel Core i7-8700K / AMD Ryzen 5 3600X</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">RAM:</span>
                  <span className="text-white">16 GB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">GPU:</span>
                  <span className="text-white">NVIDIA RTX 2060 / AMD RX 5700 XT</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Storage:</span>
                  <span className="text-white">50 GB SSD</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-white">Broadband Internet connection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-[#2563EB]/20" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#8B5CF6]">JOIN</span>
              <span className="text-white"> THE</span>
              <span className="text-[#2563EB]"> BATTLE</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download now and experience the next evolution of tactical PC combat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#" className="primary-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Client
              </Link>
              <Link href="#" className="secondary-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                System Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0F1218]/80">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-10 w-10">
                  <Image
                    src="/images/logos/logo.png"
                    alt={`${studioName} Logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{studioName}</h3>
                  <p className="text-xs text-gray-400">GAME STUDIOS</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Creating immersive tactical FPS experiences for PC gamers worldwide
              </p>
              <div className="flex space-x-3">
                <Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">LINKS</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Home</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">News</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Support</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Refund Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">EULA</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-[#8B5CF6] transition-colors">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">NEWSLETTER</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter to get updates and early access to promotions.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 bg-[#1A1F2B] border border-[#2563EB]/30 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] text-sm flex-grow" />
                <button className="bg-[#8B5CF6] text-white px-4 py-2 rounded-r-lg text-sm hover:bg-[#6D28D9] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {studioName}. All rights reserved. {gameName} is a trademark of {studioName}.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Game Modes Section
function GameModesSection() {
  const { editableContent } = useAdmin();
  const { title, description } = editableContent.gameModes;
  
  // Split the title to add different colors
  const titleParts = title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');
  
  return (
    <section id="game-modes" className="py-20 relative">
      <div className="absolute inset-0 bg-[#0F1218]/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#8B5CF6]">{firstWord}</span>
            <span className="text-white">{restOfTitle ? ` ${restOfTitle}` : ''}</span>
          </h2>
          <p className="text-gray-400 md:max-w-md mt-4 md:mt-0">
            {description}
          </p>
        </div>
        <GameModes />
      </div>
    </section>
  );
}

// Operators Section
function OperatorsSection() {
  const { editableContent } = useAdmin();
  const { title, description } = editableContent.operators;
  
  // Split the title to add different colors
  const titleParts = title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');
  
  return (
    <section id="operators" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2563EB]/5" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#2563EB]">{firstWord}</span>
            <span className="text-white">{restOfTitle ? ` ${restOfTitle}` : ''}</span>
          </h2>
          <p className="text-gray-400 md:max-w-md mt-4 md:mt-0">
            {description}
          </p>
        </div>
        <Operators />
      </div>
    </section>
  );
}

// Maps Section
function MapsSection() {
  const { editableContent } = useAdmin();
  const { title, description } = editableContent.maps;
  
  // Split the title to add different colors
  const titleParts = title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');
  
  return (
    <section id="maps" className="py-20 relative">
      <div className="absolute inset-0 bg-[#0F1218]/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#8B5CF6]">{firstWord}</span>
            <span className="text-white">{restOfTitle ? ` ${restOfTitle}` : ''}</span>
          </h2>
          <p className="text-gray-400 md:max-w-md mt-4 md:mt-0">
            {description}
          </p>
        </div>
        <Maps />
      </div>
    </section>
  );
}

// Battle Pass Section
function BattlePassSection() {
  const { editableContent } = useAdmin();
  const { title, description } = editableContent.battlePass;
  
  // Split the title to add different colors
  const titleParts = title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');
  
  return (
    <section id="multi-pass" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#8B5CF6]/5" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">{firstWord}</span>
            <span className="text-[#8B5CF6]">{restOfTitle ? ` ${restOfTitle}` : ''}</span>
          </h2>
          <p className="text-gray-400 md:max-w-md mt-4 md:mt-0">
            {description}
          </p>
        </div>
        <MultiPass />
      </div>
    </section>
  );
}

// Leaderboard Section
function LeaderboardSection() {
  const { editableContent } = useAdmin();
  const { title, description } = editableContent.leaderboard;
  
  // Split the title to add different colors
  const titleParts = title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');
  
  return (
    <section id="leaderboard" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1218] via-[#0F1218]/95 to-[#0F1218]" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#2563EB]">{firstWord}</span>
            <span className="text-white">{restOfTitle ? ` ${restOfTitle}` : ''}</span>
          </h2>
          <p className="text-gray-400 md:max-w-md mt-4 md:mt-0">
            {description}
          </p>
        </div>
        <Leaderboard />
      </div>
    </section>
  );
}
