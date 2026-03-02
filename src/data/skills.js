export const skills = [
    {
        name: 'JavaScript',
        level: 90,
        category: 'language',
        icon: 'JS'
    },
    {
        name: 'TypeScript',
        level: 75,
        category: 'language',
        icon: 'TS'
    },
    {
        name: 'Python',
        level: 70,
        category: 'language',
        icon: 'PY'
    },
    {
        name: 'React',
        level: 85,
        category: 'frontend',
        icon: 'RE'
    },
    {
        name: 'Node.js',
        level: 80,
        category: 'backend',
        icon: 'NO'
    },
    {
        name: 'Discord.js',
        level: 95,
        category: 'framework',
        icon: 'DI'
    },
    {
        name: 'Tailwind CSS',
        level: 75,
        category: 'frontend',
        icon: 'TW'
    },
    {
        name: 'MongoDB',
        level: 70,
        category: 'database',
        icon: 'MO'
    }
];

export const getSkills = () => skills;

export const getSkillsByCategory = (category) => skills.filter(skill => skill.category === category);
