# SEC99 Portfolio

A modern portfolio website built with React and Framer Motion.

![Portfolio Preview](https://ss-r3nebs-projects.vercel.app)

## Features

- **Discord Status** - Real-time Discord status via Lanyard API
- **Spotify Card** - Now playing display
- **Skills Section** - Animated skill progress bars
- **Projects Showcase** - Card-based project display with hover effects
- **Multi-language** - English, Indonesian, Spanish support
- **Dark Theme** - Modern dark design with animations
- **Code Protection** - Obfuscated production code
- **Snowfall Effect** - Animated snowflakes background

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/r3neb/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Discord User ID

# Start development server
npm run dev
```

### Build for Production (Protected)

```bash
# Build with code obfuscation (recommended)
npm run build:protected

# Or build without obfuscation
npm run build
```

## Code Protection

The production build includes:
- **Minification** - Removes whitespace and shortens variable names
- **Obfuscation** - Makes code unreadable
- **Console blocking** - Hides console output in browser
- **Debug protection** - Prevents browser dev tools inspection
- **String encoding** - Encodes strings in base64

### Environment Variables

Create a `.env` file to protect sensitive data:

```env
VITE_DISCORD_USER_ID=your_discord_id_here
```

## Customization

### Edit Projects
Edit `src/data/projects.js`:
```javascript
export const projects = [
    {
        id: 1,
        name: 'Your Project',
        description: 'Description here',
        tech: ['React', 'Node.js'],
        link: 'https://yourproject.com',
        github: 'https://github.com/yourproject',
        image: 'https://image-url.jpg'
    }
];
```

### Edit Skills
Edit `src/data/skills.js`:
```javascript
export const skills = [
    { name: 'JavaScript', level: 90, category: 'language', icon: 'JS' },
    // Add more skills
];
```

### Add Languages
Edit `src/i18n/translations.js` to add more languages.

## Tech Stack

- React 18
- Framer Motion
- Vite
- JavaScript Obfuscator
- Lanyard API

## License

MIT
# ss
