export const translations = {
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            skills: 'Skills',
            contact: 'Contact'
        },
        profile: {
            welcome: 'Welcome to my portfolio',
            subtitle: 'Developer | Designer | Creator'
        },
        status: {
            online: 'Online',
            idle: 'Idle',
            dnd: 'Do Not Disturb',
            offline: 'Offline'
        },
        sections: {
            languages: 'LANGUAGES',
            skills: 'SKILLS',
            projects: 'PROJECTS',
            social: 'SOCIAL MEDIA'
        },
        skills: {
            title: 'My Skills',
            subtitle: 'Technologies I work with',
            level: 'Proficiency'
        },
        projects: {
            title: 'My Projects',
            subtitle: 'Things I\'ve built',
            view: 'View Project',
            source: 'Source Code',
            tech: 'Technologies'
        },
        contact: {
            addDiscord: 'Add on Discord',
            message: 'Message Me'
        },
        footer: {
            rights: 'All rights reserved'
        },
        buttons: {
            verify: 'Verify Roblox Account'
        }
    },
    id: {
        nav: {
            home: 'Beranda',
            projects: 'Proyek',
            skills: 'Keterampilan',
            contact: 'Kontak'
        },
        profile: {
            welcome: 'Selamat datang di portofolio saya',
            subtitle: 'Developer | Desainer | Kreator'
        },
        status: {
            online: 'Online',
            idle: 'Menganggur',
            dnd: 'Jangan Ganggu',
            offline: 'Offline'
        },
        sections: {
            languages: 'BAHASA',
            skills: 'KETERAMPILAN',
            projects: 'PROYEK',
            social: 'MEDIA SOSIAL'
        },
        skills: {
            title: 'Keterampilan Saya',
            subtitle: 'Teknologi yang saya gunakan',
            level: 'Tingkat'
        },
        projects: {
            title: 'Proyek Saya',
            subtitle: 'Yang telah saya buat',
            view: 'Lihat Proyek',
            source: 'Kode Sumber',
            tech: 'Teknologi'
        },
        contact: {
            addDiscord: 'Tambah di Discord',
            message: 'Kirim Pesan'
        },
        footer: {
            rights: 'Semua hak dilindungi'
        },
        buttons: {
            verify: 'Verifikasi Akun Roblox'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            projects: 'Proyectos',
            skills: 'Habilidades',
            contact: 'Contacto'
        },
        profile: {
            welcome: 'Bienvenido a mi portafolio',
            subtitle: 'Desarrollador | Diseñador | Creador'
        },
        status: {
            online: 'En línea',
            idle: 'Inactivo',
            dnd: 'No molestar',
            offline: 'Desconectado'
        },
        sections: {
            languages: 'IDIOMAS',
            skills: 'HABILIDADES',
            projects: 'PROYECTOS',
            social: 'REDES SOCIALES'
        },
        skills: {
            title: 'Mis Habilidades',
            subtitle: 'Tecnologías que uso',
            level: 'Dominio'
        },
        projects: {
            title: 'Mis Proyectos',
            subtitle: 'Cosas que he construido',
            view: 'Ver Proyecto',
            source: 'Código Fuente',
            tech: 'Tecnologías'
        },
        contact: {
            addDiscord: 'Agregar en Discord',
            message: 'Enviar Mensaje'
        },
        footer: {
            rights: 'Todos los derechos reservados'
        },
        buttons: {
            verify: 'Verificar Cuenta de Roblox'
        }
    }
};

export const getTranslation = (lang, path) => {
    const keys = path.split('.');
    let result = translations[lang];
    
    for (const key of keys) {
        result = result?.[key];
    }
    
    return result || path;
};
