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

## DirectAdmin Deployment

To deploy this site to a DirectAdmin hosting environment:

1. Build the static site and ensure the server files are ready:
```bash
npm run build
```

2. Upload all files to your DirectAdmin hosting using FTP/SFTP, including:
   - The `out` directory (contains the static Next.js export)
   - `server.js` file
   - `package.json` file
   - `.htaccess` file
   - Any other necessary configuration files

3. SSH into your DirectAdmin server and navigate to your website directory.

4. Install the Node.js dependencies:
```bash
npm install
```

5. Set up a Node.js application in DirectAdmin:
   - Go to your DirectAdmin control panel
   - Navigate to "Advanced Features" > "Node.js App"
   - Create a new Node.js application
   - Set the entry point to `server.js`
   - Set the port to match what's in your server.js (default: 3000)
   - Enable "Start on boot" option
   - Save and start the application

6. Your application should now be running and accessible through your domain.

## Created By

BlinkBox Game Studios
