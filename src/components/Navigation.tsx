'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAdmin } from '@/app/context/AdminContext'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navigationContent } = useAdmin()
  
  const { studioName, tagline, menuItems, downloadButton, socialLinks, supportLinks } = navigationContent

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12 md:w-12">
              <Image
                src="/images/logos/logo.png"
                alt={`${studioName} Logo`}
                fill
                className="object-contain"
                priority
                onError={(e) => {
                  // @ts-expect-error - Event target type is not properly inferred
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">{studioName} <span className="text-[#8B5CF6]">FPS</span></h1>
              <p className="text-xs text-gray-400">{tagline}</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.filter(item => item.enabled).map((item) => (
              <Link key={item.id} href={item.href} className="menu-item">
                {item.label}
              </Link>
            ))}
            <Link href="/launch" className="menu-item text-yellow-400 font-medium">
              LAUNCH
            </Link>
          </div>

          {/* Desktop Social & Download */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.filter(link => link.enabled).map((link) => (
              <Link 
                key={link.id} 
                href={link.href}
                className="p-2 hover:bg-gradient-to-r hover:from-[#8B5CF6]/10 hover:to-[#2563EB]/10 rounded-lg transition-colors"
                aria-label={link.label}
              >
                <Image 
                  src={link.icon} 
                  alt={link.label} 
                  width={24} 
                  height={24} 
                  className="opacity-75 hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
            <Link 
              href={downloadButton.href}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] 
                text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg uppercase flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {downloadButton.label}
            </Link>
          </div>

          {/* Mobile Header Right */}
          <div className="md:hidden flex items-center gap-2">
            {/* Download Button */}
            <Link 
              href={downloadButton.href}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] 
                text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg uppercase flex items-center gap-1"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {downloadButton.label}
            </Link>

            {/* Menu Button */}
            <button 
              className="p-2 hover:bg-white/5 rounded-lg transition-colors tactical-border"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-[#8B5CF6]/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {/* Menu Items */}
              <div className="grid grid-cols-2 gap-2">
                {menuItems.filter(item => item.enabled).map((item) => (
                  <Link 
                    key={item.id} 
                    href={item.href} 
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-[#8B5CF6]/20"
                  >
                    <Image 
                      src={`https://cdn-icons-png.flaticon.com/128/${item.id === 'operators' ? '1752/1752535' : '3208/3208809'}.png`}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="opacity-75"
                    />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <Link 
                  href="/launch" 
                  className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-yellow-500/40"
                >
                  <Image 
                    src="https://cdn-icons-png.flaticon.com/128/2764/2764505.png"
                    alt="Launch"
                    width={20}
                    height={20}
                    className="opacity-75"
                  />
                  <span className="text-yellow-400 font-medium">LAUNCH</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-2">
                {socialLinks.filter(link => link.enabled).map((link) => (
                  <Link 
                    key={link.id} 
                    href={link.href}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    aria-label={link.label}
                  >
                    <Image 
                      src={link.icon} 
                      alt={link.label} 
                      width={24} 
                      height={24} 
                      className="opacity-75 hover:opacity-100 transition-opacity"
                    />
                  </Link>
                ))}
              </div>

              {/* Support Links */}
              <div className="flex justify-center gap-4 text-sm text-gray-400 pt-2">
                {supportLinks.map((link, index) => (
                  <Link 
                    key={index} 
                    href={link.href} 
                    className="hover:text-[#8B5CF6] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation 