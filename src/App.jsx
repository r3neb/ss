import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanyard } from './useLanyard';
import Snowflakes from './Snowflakes';
import SpotifyCard from './SpotifyCard';
import { DiscordLogo, PythonIcon, TailwindIcon, PHPIcon, LuaIcon, MongoIcon, XIcon, InstagramIcon, GithubIcon, GlobeIcon } from './Icons';
import { projects, getProjects } from './data/projects';
import { skills, getSkills } from './data/skills';
import { LanguageProvider, useLanguage } from './i18n/useTranslation';
import './App.css';

const statusColors = {
    online: '#3ba55c',
    idle: '#faa61a',
    dnd: '#ed4245',
    offline: '#747f8d'
};

const LanguageSwitcher = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: '🇺🇸 English' },
        { code: 'id', name: '🇮🇩 Indonesia' },
        { code: 'es', name: '🇪🇸 Español' }
    ];

    return (
        <div className="language-switcher">
            <button 
                className="lang-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                <GlobeIcon />
                <span>{languages.find(l => l.code === language)?.name.split(' ')[0]}</span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="lang-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                className={`lang-option ${language === lang.code ? 'active' : ''}`}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SkillBar = ({ skill, index }) => {
    return (
        <motion.div 
            className="skill-bar-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar">
                <motion.div 
                    className="skill-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
};

const ProjectCard = ({ project, index }) => {
    const { t } = useLanguage();

    return (
        <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -5 }}
        >
            <div className="project-image">
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-btn">
                        {t('projects.view')}
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn secondary">
                        {t('projects.source')}
                    </a>
                </div>
            </div>
            <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                    {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ProfileSection = ({ presence }) => {
    const { t } = useLanguage();
    const status = presence?.discord_status || 'offline';

    useEffect(() => {
        const titles = ['SEC99 - Profile', 'SEC99 - Developer', 'SEC99 - Designer', 'SEC99 - Portfolio'];
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

    return (
        <motion.div 
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className="profile-picture"
                whileHover={{ scale: 1.05 }}
            >
                <img src="https://i.imgur.com/LqmeZJN.png" alt="Profile" />
                <span className="status-indicator" style={{ backgroundColor: statusColors[status] }}></span>
            </motion.div>
            <motion.h1 
                className="username"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                SEC99
            </motion.h1>
            <motion.p 
                className="profile-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {t('profile.subtitle')}
            </motion.p>
            <div className="status-info">
                <span className="status-dot" style={{ backgroundColor: statusColors[status] }}></span>
                <span className="status-text">{t(`status.${status}`)}</span>
            </div>
        </motion.div>
    );
};

const SkillsSection = () => {
    const { t } = useLanguage();
    const skillList = getSkills();

    return (
        <motion.div 
            className="skills-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <h2 className="section-title">{t('sections.skills')}</h2>
            <div className="skills-grid">
                {skillList.map((skill, index) => (
                    <SkillBar key={index} skill={skill} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const { t } = useLanguage();
    const projectList = getProjects();

    return (
        <motion.div 
            className="projects-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <h2 className="section-title">{t('sections.projects')}</h2>
            <div className="projects-grid">
                {projectList.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

const AppContent = () => {
    const presence = useLanyard();
    const { t } = useLanguage();

    const status = presence?.discord_status || 'offline';

    return (
        <div className="app-container">
            <Snowflakes />
            
            <div className="language-switcher-wrapper">
                <LanguageSwitcher />
            </div>

            <motion.div 
                className="container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ProfileSection presence={presence} />

                <motion.div 
                    className="discord-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="discord-info">
                        <div className="discord-logo">
                            <DiscordLogo />
                        </div>
                        <div className="discord-text">
                            <h3>Discord <span className="online-status" style={{ color: statusColors[status] }}>● {t(`status.${status}`)}</span></h3>
                            <p className="discord-username">
                                {presence?.discord_user ? `${presence.discord_user.username}#${presence.discord_user.discriminator || '0'}` : 'sect99#0'}
                            </p>
                        </div>
                    </div>
                    <a href="https://discord.com/users/1058031013474877540" target="_blank" rel="noopener">
                        <motion.button 
                            className="message-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t('contact.message')}
                        </motion.button>
                    </a>
                </motion.div>

                <SpotifyCard spotify={presence?.spotify} />

                <SkillsSection />

                <ProjectsSection />

                <motion.div 
                    className="languages-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">{t('sections.languages')}</h2>
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
                </motion.div>

                <motion.div 
                    className="languages-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">{t('sections.social')}</h2>
                    <div className="social-grid">
                        <a href="https://x.com/Sec99R" target="_blank" rel="noopener" className="social-link">
                            <div className="language-badge x-platform">
                                <XIcon />
                                <span>X Platform</span>
                            </div>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener" className="social-link">
                            <div className="language-badge instagram">
                                <InstagramIcon />
                                <span>Instagram</span>
                            </div>
                        </a>
                        <a href="https://github.com/r3neb" target="_blank" rel="noopener" className="social-link">
                            <div className="language-badge github">
                                <GithubIcon />
                                <span>GitHub</span>
                            </div>
                        </a>
                    </div>
                </motion.div>

                <a href="https://discord.com/users/1058031013474877540" target="_blank" rel="noopener">
                    <motion.button 
                        className="discord-add-btn"
                        whileHover={{ scale: 1.02, backgroundColor: '#5865F2' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <DiscordLogo />
                        {t('contact.addDiscord')}
                    </motion.button>
                </a>

                <motion.div 
                    className="footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p>© 2025 {t('footer.rights')}</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

const App = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
};

export default App;
