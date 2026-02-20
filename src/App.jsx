import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanyard } from './useLanyard';
import Snowflakes from './Snowflakes';
import SpotifyCard from './SpotifyCard';
import { DiscordLogo, PythonIcon, TailwindIcon, PHPIcon, LuaIcon, MongoIcon, XIcon, InstagramIcon, SCIcon } from './Icons';
import './App.css';

const App = () => {
  const presence = useLanyard();

  useEffect(() => {
    const titles = ['SEC99 - Profile', 'SEC99 - Developer', 'SEC99 - Coder', 'SEC99 - Designer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const typeTitle = () => {
      const currentTitle = titles[titleIndex];
      if (isDeleting) {
        document.title = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        document.title = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
      }
      setTimeout(typeTitle, typingSpeed);
    };

    const timeoutId = setTimeout(typeTitle, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, []);

  const statusColors = {
    online: '#3ba55c',
    idle: '#faa61a',
    dnd: '#ed4245',
    offline: '#747f8d'
  };

  const statusText = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline'
  };

  const status = presence?.discord_status || 'offline';

  return (
    <div className="app-container">
      <Snowflakes />

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-picture">
            <img src="https://i.imgur.com/LqmeZJN.png" alt="Profile Picture" />
          </div>
          <h1 className="username">SEC99</h1>
          <div className="status-info">
            <span className="status-dot-inline" style={{ backgroundColor: statusColors[status] }}></span>
            <span className="status-text">{statusText[status]}</span>
            <div className="status-icons">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
              </svg>
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Discord Section */}
        <div className="discord-card">
          <div className="discord-info">
            <div className="discord-logo">
              <DiscordLogo />
            </div>
            <div className="discord-text">
              <h3>Discord <span className="online-status" style={{ color: statusColors[status] }}>● {statusText[status]}</span></h3>
              <p className="discord-username">
                {presence?.discord_user ? `${presence.discord_user.username}#${presence.discord_user.discriminator || '0'}` : 'sect99#0'}
              </p>
            </div>
          </div>
          <a href="https://discord.com/users/1058031013474877540" target="_blank" rel="noopener">
            <button className="message-btn">Message</button>
          </a>
        </div>

        {/* Spotify Section */}
        <SpotifyCard spotify={presence?.spotify} />

        {/* Languages Section */}
        <div className="languages-section">
          <h2 className="section-title">LANGUAGES</h2>
          <div className="languages-grid">
            <div className="language-badge js">
              <span className="lang-icon">JS</span>
              <span>JavaScript</span>
            </div>
            <div className="language-badge ts">
              <span className="lang-icon">TS</span>
              <span>TypeScript</span>
            </div>
            <div className="language-badge python">
              <PythonIcon />
              <span>Python</span>
            </div>
            <div className="language-badge tailwind">
              <TailwindIcon />
              <span>Tailwind CSS</span>
            </div>
            <div className="language-badge php">
              <PHPIcon />
              <span>PHP</span>
            </div>
            <div className="language-badge lua">
              <LuaIcon />
              <span>Lua</span>
            </div>
            <div className="language-badge mongodb">
              <MongoIcon />
              <span>MongoDB</span>
            </div>
            <div className="language-badge discord">
              <DiscordLogo />
              <span>Discord Dev</span>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="languages-section">
          <h2 className="section-title">SOCIAL MEDIA</h2>
          <div className="languages-grid">
            <a href="https://x.com/Sec99R" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="language-badge x-platform">
                <XIcon />
                <span>X Platform</span>
              </div>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="language-badge instagram">
                <InstagramIcon />
                <span>Instagram</span>
              </div>
            </a>
          </div>
        </div>

        <a href="https://discord.com/users/1058031013474877540" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
          <button className="discord-add-btn">
            <DiscordLogo />
            Add on Discord
          </button>
        </a>

        {/* Footer */}
        <div className="footer">
          <p>© 2025 All rights reserved</p>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
