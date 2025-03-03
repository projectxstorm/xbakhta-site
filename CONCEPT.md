# Game Concept & Design Guidelines

## Game Concept: "Quantum Ops"

### Core Concept
A next-generation sci-fi tactical shooter that combines strategic team play with futuristic combat mechanics. The game blends traditional shooting mechanics with unique character abilities and vertical movement systems.

### Key Features
- Advanced mobility system with wall-running and jetpack mechanics
- Character-based gameplay with unique abilities
- Multiple game modes (Battle Royale, Team Deathmatch, Objective-based)
- Cross-platform play between mobile and PC
- Seasonal content updates with new characters and maps
- Competitive ranking system
- Social features and clan system

## Color Scheme

### Primary Colors
- Deep Purple (`#6B46C1`)
  - Usage: Main branding, primary buttons, important UI elements
  - Represents premium quality and innovation

- Electric Blue (`#3B82F6`)
  - Usage: Secondary buttons, highlights, energy effects
  - Represents technology and futuristic elements

- Neon Green (`#4ADE80`)
  - Usage: CTAs, "Play Now" button, success states
  - Represents action and engagement

### Secondary Colors
- Dark Gray (`#1A202C`)
  - Usage: Main background, cards
  - Creates depth and readability

- Navy Blue (`#1E3A8A`)
  - Usage: Secondary backgrounds, gradients
  - Adds sophistication and depth

### Accent Colors
- Warning Orange (`#F97316`)
  - Usage: Warnings, limited-time events
  
- Danger Red (`#EF4444`)
  - Usage: Error states, enemy indicators

### Text Colors
- Pure White (`#FFFFFF`)
  - Usage: Primary text on dark backgrounds
  
- Light Gray (`#F3F4F6`)
  - Usage: Secondary text, descriptions
  
- Muted Gray (`#9CA3AF`)
  - Usage: Disabled states, tertiary text

## Typography

### Headings
- Font Family: 'Industry', sans-serif
- Weights: Bold (700) for main headings
- Usage: Game titles, section headers

### Body Text
- Font Family: 'Inter', sans-serif
- Weights: Regular (400), Medium (500)
- Usage: General content, descriptions

### Special Text
- Font Family: 'Chakra Petch', sans-serif
- Usage: HUD elements, game statistics

## Visual Elements

### Gradients
1. Hero Gradient
   ```css
   background: linear-gradient(135deg, #6B46C1 0%, #3B82F6 100%);
   ```

2. Card Gradient
   ```css
   background: linear-gradient(180deg, #1E3A8A 0%, #1A202C 100%);
   ```

### UI Components

#### Buttons
- Primary Button
  - Background: Deep Purple (`#6B46C1`)
  - Hover: Lighter Purple (`#805AD5`)
  - Text: White
  - Border Radius: 8px

- Secondary Button
  - Background: Electric Blue (`#3B82F6`)
  - Hover: Lighter Blue (`#60A5FA`)
  - Text: White
  - Border Radius: 8px

#### Cards
- Background: Dark Gray (`#1A202C`)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border Radius: 12px
- Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

### Icons
- Style: Outlined with 2px stroke
- Corner Radius: 2px
- States:
  - Default: White (`#FFFFFF`)
  - Hover: Neon Green (`#4ADE80`)
  - Active: Electric Blue (`#3B82F6`)

## Animation Guidelines

### Transitions
- Duration: 200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Usage: All interactive elements

### Hover Effects
- Scale: 1.05
- Duration: 150ms
- Add subtle glow effect using box-shadow

### Loading States
- Use subtle pulse animations
- Color: Electric Blue (`#3B82F6`)
- Duration: 1.5s
- Easing: ease-in-out

## Responsive Design

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Mobile-First Considerations
- Touch-friendly hit areas (minimum 44x44px)
- Simplified navigation
- Optimized image loading
- Reduced animation on lower-end devices

## Asset Guidelines

### Images
- Format: WebP with PNG fallback
- Quality: 85%
- Max Width: 1920px
- Lazy loading for better performance

### Icons
- Format: SVG
- Style: Consistent 2px stroke weight
- Colors: Should follow color scheme
- Size: 24x24px base size

### Game Art
- Character Renders: PNG with transparency
- Background Art: JPG for better compression
- Weapon Skins: PNG with transparency
- Effects: Sprite sheets for animations

## Brand Voice

### Tone
- Modern and technical
- Confident but not aggressive
- Clear and concise
- Engaging and exciting

### Writing Style
- Short, impactful sentences
- Technical terms when relevant
- Action-oriented CTAs
- Clear hierarchy in information

This document serves as a living style guide and should be updated as the design evolves. 