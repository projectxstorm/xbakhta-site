# BlinkBox FPS Arena - Game Website

A responsive and modern website for a PC FPS multiplayer game. Built with Next.js and TailwindCSS.

## Features

- Fully responsive design for all devices
- Modern UI with tactical FPS game aesthetics
- Configurable site name and details via environment variables
- Sections for game modes, operators, weapons, and battle pass
- System requirements section
- Download section

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables by creating a `.env` file in the root directory (or use the existing one)

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

The site can be configured using environment variables in the `.env` file:

```
# Site Configuration
NEXT_PUBLIC_SITE_NAME="BlinkBox FPS Arena"
NEXT_PUBLIC_SITE_DESCRIPTION="Intense tactical first-person shooter multiplayer combat. Join the battle on PC and dominate the arena."
NEXT_PUBLIC_STUDIO_NAME="BlinkBox"
NEXT_PUBLIC_GAME_NAME="FPS Arena"

# Social Media Links
NEXT_PUBLIC_DISCORD_URL="https://discord.gg/blinkbox"
NEXT_PUBLIC_TWITTER_URL="https://twitter.com/blinkbox"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/blinkbox"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/blinkbox"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/blinkbox"

# Feature Flags
NEXT_PUBLIC_ENABLE_ESPORTS=true
NEXT_PUBLIC_ENABLE_LEADERBOARD=true
```

## Building for Production

```bash
npm run build
# or
yarn build
```

Then, you can run the production build with:

```bash
npm run start
# or
yarn start
```

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Created By

BlinkBox Game Studios
