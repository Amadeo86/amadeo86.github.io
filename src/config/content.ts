export const siteConfig = {
  name: "Ramón Amadeo",
  title: "Ramón Amadeo | Tech con Impacto",
  description: "Técnico en Sistemas, innovador frugal y creador de soluciones tech para desarrollo local.",
  social: {
    github: "https://github.com/amadeo86",
    twitter: "https://x.com/ramona86",
    email: "mailto:ramonaamadeo@gmail.com",
  },
};

export const homeContent = {
  title: "De los palets al código",
  description:
    "Transformo problemas reales en soluciones tech sostenibles. Ingeniero en sistemas apasionado por la fabricación digital, economía circular e impacto social.",
  buttons: {
    about: {
      text: "Ver proyectos",
      href: "/projects/",
    },
    posts: {
      text: "Trabajemos juntos",
      href: "/contact/",
    },
  },
  images: {
    light: "https://multiplepage-portfolio.edgeone.app/assets/images/tech-background-light.svg",
    dark: "/assets/images/tech-background-dark.svg",
  },
};

export const aboutContent = {
  meta: {
    title: "Sobre mí - Ramón Amadeo",
    description: "Conoce mi historia, habilidades y experiencia",
  },
  title: "Mi Historia",
  description:
    "Soy un Técnico en Sistemas con pasión por la innovación y la solución de problemas reales. Mi viaje comenzó en los talleres de LAJ-IT, donde construí una máquina CNC desde cero con palets reutilizados, demostrando que la creatividad y el ingenio no conocen límites de presupuesto. Desde entonces, he combinado la fabricación digital con desarrollo de software para crear soluciones que generen impacto social y ambiental.",
  skills: [
    "Spring Boot",
    "Flutter",
    "React",
    "Node.js",
    "Docker",
    "Microservicios",
    "CAD/Fabricación Digital",
    "Python",
  ],
  image: {
    src: "/assets/images/about/ramon.jpg",
    alt: "Ramón Amadeo",
  },
  experience: {
    title: "Experiencia",
    items: [
      {
        period: "2024 - Presente",
        position: "Creador de LAJ-IT",
        company: "Innovación Frugal",
        description:
          "Lidero un proyecto de fabricación digital y economía circular, creando máquinas CNC desde materiales reutilizados.",
      },
      {
        period: "2023 - 2024",
        position: "Desarrollador Full Stack",
        company: "Varias Startups",
        description:
          "Trabajé en sistemas municipales, apps de reservas y soluciones de microservicios con Spring Boot.",
      },
      {
        period: "2021 - 2023",
        position: "Técnico en Sistemas",
        company: "Apoyo Técnico",
        description: "Soporte y desarrollo de soluciones para empresas locales.",
      },
    ],
  },
  connect: {
    title: "Conectemos",
    description:
      "¿Tienes un proyecto o quieres colaborar? Estoy siempre abierto a nuevas ideas y oportunidades. Puedes encontrarme en redes o escribirme un",
    email: {
      text: "email",
      href: "mailto:ramonaamadeo@gmail.com",
    },
  },
};

export const projectsContent = {
  meta: {
    title: "Proyectos - Ramón Amadeo",
    description: "Mis proyectos destacados en software y fabricación digital",
  },
  title: "Proyectos con Impacto",
  description:
    "De la fabricación digital al desarrollo de software: soluciones reales para problemas reales.",
  projects: [
    {
      id: 1,
      categoria: "🏗️ Innovación Frugal",
      title: "LAJ-IT: CNC Autoconstruida & Economía Circular",
      description:
        "Construí una fresadora CNC desde cero con Arduino y materiales reciclados, transformando palets en productos de valor. Ejemplo práctico de innovación frugal y sostenibilidad.",
      image: "/assets/images/projects/laj-it.jpg",
      href: "/projects/laj-it",
      technologies: ["Arduino", "CNC", "CAD/CAM", "Reciclaje"],
      featured: true,
      details: {
        fecha: "2016 - Presente",
        impacto: "2000+ kg de madera reciclada | 5 empleos locales | Premio 2024",
        longDescription:
          "Proyecto integral donde construí una fresadora CNC funcional utilizando Arduino, motores Nema 17 y materiales reciclados. Transformo palets en desuso en muebles y productos de diseño, aplicando principios de economía circular y desarrollo local.",
        gallery: [
          "/assets/images/projects/laj-it/cnc-construccion.jpg",
          "/assets/images/projects/laj-it/productos-terminados.jpg",
          "/assets/images/projects/laj-it/proceso-reciclaje.jpg",
        ],
        links: {
          tienda: "https://laj-it.mercadoshops.com.ar/",
          video: "#",
        },
      },
    },
    {
      id: 2,
      categoria: "💻 Software Empresarial",
      title: "Futsystem - Gestión de Reservas para Canchas",
      description:
        "Sistema full-stack para administración completa de canchas de fútbol: reservas, cálculo de comisiones, emisión de tickets y reportes.",
      image: "/assets/images/projects/futsystem.jpg",
      href: "/projects/futsystem",
      technologies: ["Java", "Bootstrap", "JPA", "MySQL", "MVC"],
      featured: true,
      details: {
        fecha: "2021 - 2023",
        impacto: "3+ complejos deportivos | Automatización 80% de procesos",
        longDescription:
          "Solución empresarial para gestión integral de canchas de fútsal. Incluye sistema de reservas online, cálculo automático de comisiones, emisión de tickets, reportes financieros y análisis de clientes.",
        technologies: [
          { name: "Java", type: "Backend" },
          { name: "Bootstrap", type: "Frontend" },
          { name: "MySQL", type: "Database" },
          { name: "JPA", type: "ORM" },
        ],
      },
    },
    {
      id: 3,
      categoria: "🏛️ Software Público",
      title: "Sistema Municipal - Secretaría de Acción Social",
      description:
        "Solución desarrollada para optimizar procesos administrativos y atención ciudadana en la municipalidad de Las Lajitas.",
      image: "/assets/images/projects/sistema-municipal.jpg",
      href: "/projects/sistema-municipal",
      technologies: ["Spring Boot", "Bootstrap", "MySQL", "Agile"],
      featured: false,
      details: {
        fecha: "2022 - 2023",
        impacto: "Reducción 60% en trámites administrativos",
        longDescription:
          "Aplicación empresarial desarrollada en Spring Boot para optimizar procesos de la municipalidad. Gestión de trámites, expedientes, ciudadanos y reportes administrativos.",
      },
    },
    {
      id: 4,
      categoria: "📱 App Móvil",
      title: "Gestión de Mantenimiento de Ascensores",
      description:
        "Aplicación móvil conectada a arquitectura de microservicios para gestión de mantenimiento predictivo y reportes en tiempo real.",
      image: "/assets/images/projects/app-ascensores.jpg",
      href: "/projects/app-ascensores",
      technologies: ["Flutter", "Dart", "Microservicios", "API Gateway"],
      featured: false,
      details: {
        fecha: "2023 - 2024",
        impacto: "Monitoreo de 50+ ascensores en tiempo real",
        longDescription:
          "Aplicación móvil moderna desarrollada en Flutter conectada a una arquitectura de microservicios. Permite gestionar mantenimiento, reportar incidencias y obtener métricas en tiempo real.",
      },
    },
  ],
};

