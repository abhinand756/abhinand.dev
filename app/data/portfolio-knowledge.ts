/**
 * JARVIS — Portfolio Knowledge Base
 * ---------------------------------------------------------------------------
 * Single source of truth for the JARVIS chatbot.
 *
 * Everything in this file is verified information taken from the existing
 * portfolio source code (Hero, About, Skills, Projects, ProjectsDetail,
 * Personal, Contact, Certifications and the project/social links). Nothing
 * here is invented — if a fact is not present in the portfolio, it is not
 * listed here.
 *
 * When you add a new project, skill, certification or job, update this file
 * and JARVIS will automatically know about it. This is the ONLY place the
 * assistant's facts live.
 *
 * NOTE: this module is imported by server-side code only (the /api/chat
 * route). It is never shipped to the browser.
 */

/** Age is derived from the date of birth on the portfolio so it never goes stale. */
function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

export interface KnowledgeProject {
  name: string;
  kind: "personal" | "professional";
  role?: string;
  summary: string;
  details: string;
  technologies: string[];
  highlights: string[];
  link?: string;
}

export interface KnowledgeEducation {
  period: string;
  qualification: string;
  institution: string;
  grade?: string;
  notes?: string;
}

export interface KnowledgeSkill {
  name: string;
  level: number;
  group: string;
}

const PERSONAL = {
  fullName: "Abhinand M",
  displayName: "Abhinand",
  role: "Full Stack Developer",
  professionalTitle: "Software Engineer / Web Developer",
  currentCompany: "Coddle Technologies",
  location: "Kozhikode (Calicut), Kerala, India",
  dateOfBirth: "09 March 2001",
  age: calculateAge("2001-03-09"),
  languages: ["Malayalam", "English", "Tamil"],
  degree: "BTech – Electrical & Electronics Engineering",
  tagline: "Web & App Developer specialising in JavaScript technologies",
  availability: "Open to freelance work and professional opportunities.",
  portfolioUrl: "https://dev-abhinand.vercel.app/",
  email: "abhinandabhi756@gmail.com",
  phone: "+91 8086714039",
} as const;

const SOCIAL_LINKS = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/dev-abhi/" },
  { platform: "GitHub", url: "https://github.com/abhinand-ct205" },
  { platform: "X (Twitter)", url: "https://x.com/abhinand756" },
  { platform: "Instagram", url: "https://www.instagram.com/_abhinand_756_/" },
  { platform: "YouTube", url: "https://www.youtube.com/@dev_abhinand" },
] as const;

const ABOUT = {
  short:
    "Experienced Web & App Developer specialising in JavaScript technologies, on a mission to become a full-stack developer with the MERN stack.",
  long:
    "Abhinand is a passionate developer dedicated to engineering intuitive, high-performance web and mobile products. He is obsessed with crisp design systems, interactive state logic and smooth motion craft. He primarily focuses on front-end development with deep expertise in the JavaScript ecosystem — React and Next.js for the web, and React Native and Flutter for mobile — while actively expanding into full-stack development with the MERN stack.",
  highlights: [
    "3+ years of hands-on development experience",
    "20+ projects delivered across web and mobile",
    "12+ technologies in his day-to-day toolkit",
    "Strong focus on UI/UX, responsive interfaces and micro-interactions",
  ],
  services: [
    {
      name: "UI & UX Development",
      description:
        "Crafting pixel-perfect interfaces with smooth micro-interactions and intuitive user flows.",
    },
    {
      name: "Web Development",
      description:
        "Building fast, scalable web apps using React, Next.js and modern full-stack patterns.",
    },
    {
      name: "Mobile Development",
      description:
        "Cross-platform mobile experiences with React Native and Flutter.",
    },
  ],
  stats: [
    { label: "Years of experience", value: "3+" },
    { label: "Projects", value: "20+" },
    { label: "Technologies", value: "12+" },
  ],
} as const;

const EDUCATION: KnowledgeEducation[] = [
  {
    period: "2018 – 2022",
    qualification: "BTech – Electrical & Electronics Engineering",
    institution: "College of Engineering, Vadakara",
    grade: "CGPA 6.8 / 10",
    notes:
      "Here he discovered his passion for software development, computing fundamentals, logic design and full-stack web applications.",
  },
  {
    period: "2016 – 2018",
    qualification: "Higher Secondary (Science – Biology)",
    institution: "SGM GHSS Kolathur",
    grade: "86%",
    notes:
      "Graduated with strong foundations in analytical problem solving and scientific reasoning.",
  },
  {
    period: "2016",
    qualification: "Secondary School Leaving Certificate (SSLC)",
    institution: "SGM GHSS Kolathur",
    grade: "95%",
    notes:
      "Completed secondary education with distinction across all core academic disciplines.",
  },
];

/**
 * Skill levels come straight from the portfolio's Skills section.
 * `group` keeps the frontend / backend / mobile / design split explicit.
 */
const SKILLS: KnowledgeSkill[] = [
  { name: "JavaScript", level: 90, group: "Frontend" },
  { name: "React.js", level: 88, group: "Frontend" },
  { name: "Next.js", level: 85, group: "Frontend" },
  { name: "HTML5", level: 95, group: "Frontend" },
  { name: "CSS3", level: 92, group: "Frontend" },
  { name: "SASS", level: 84, group: "Frontend" },
  { name: "TypeScript", level: 0, group: "Frontend" },
  { name: "Tailwind CSS", level: 0, group: "Frontend" },
  { name: "Node.js", level: 75, group: "Backend" },
  { name: "Express.js", level: 0, group: "Backend" },
  { name: "MongoDB", level: 0, group: "Backend" },
  { name: "REST APIs", level: 0, group: "Backend" },
  { name: "JWT Authentication", level: 0, group: "Backend" },
  { name: "Socket.io", level: 0, group: "Backend" },
  { name: "React Native", level: 76, group: "Mobile" },
  { name: "Flutter", level: 72, group: "Mobile" },
  { name: "Redux Toolkit", level: 0, group: "Mobile" },
  { name: "WordPress", level: 80, group: "Tools & Platforms" },
  { name: "Git", level: 82, group: "Tools & Platforms" },
  { name: "Figma", level: 78, group: "Tools & Platforms" },
  { name: "UI/UX Design", level: 0, group: "Tools & Platforms" },
];

const WORK_EXPERIENCE = [
  {
    company: "Coddle Technologies",
    title: "Software Engineer / Web Developer",
    period: "November 2023 – Present",
    location: "Kerala, India",
    summary:
      "Building scalable web and mobile applications using React, Next.js and modern front-end technologies. Delivering seamless UI/UX, responsive interfaces and interactive web solutions.",
    responsibilities: [
      "Develop and maintain production web and mobile applications with React, Next.js and React Native",
      "Build responsive, accessible interfaces with a strong focus on UI/UX detail and micro-interactions",
      "Collaborate with design and backend teams to ship full-stack features and integrate REST APIs",
      "Optimise rendering, image loading and component architecture for performance across devices",
      "Work on client-facing enterprise products across news, media and real-estate domains",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "UI/UX",
    ],
  },
];

const PROJECTS: KnowledgeProject[] = [
  {
    name: "HappyMart — E-Commerce Platform",
    kind: "personal",
    summary:
      "A full-featured e-commerce platform with authentication, product management, shopping cart, wishlist, order management and secure checkout.",
    details:
      "A modern full-stack e-commerce application built to replicate the experience of leading online marketplaces. It includes user authentication, product browsing, category filtering, shopping cart, wishlist, a complete checkout flow, order tracking, admin product management and a responsive UI optimised for desktop and mobile.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
    ],
    highlights: [
      "JWT authentication with secure login and registration",
      "Dynamic product search, filtering, sorting and pagination",
      "Shopping cart, wishlist and seamless checkout experience",
      "Order history, returns and user profile management",
      "Product return and review integration",
      "Admin dashboard for products, categories and orders",
      "Responsive UI inspired by Flipkart with optimised performance",
    ],
    link: "https://happymartstore.vercel.app/",
  },
  {
    name: "Cineholic — Movie Discovery Platform",
    kind: "personal",
    summary:
      "A modern entertainment platform for exploring trending movies, TV shows and music with powerful search, filtering and a responsive browsing experience.",
    details:
      "An entertainment discovery platform that lets users browse popular movies, TV series, albums, artists and trending content through a clean and intuitive interface. It integrates external APIs to deliver real-time content, advanced filtering, detailed information pages and an engaging browsing experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TMDB API",
      "MongoDB",
      "REST API",
    ],
    highlights: [
      "Browse trending movies, cast and artists",
      "Advanced search with genre and category filtering",
      "Detailed information pages with ratings and metadata",
      "Responsive UI optimised for desktop, tablet and mobile",
      "API integration for real-time entertainment content",
      "Modern card-based interface with smooth animations",
    ],
    link: "https://cineholic.vercel.app/",
  },
  {
    name: "Real-Time Chat Application",
    kind: "personal",
    summary:
      "A real-time messaging application supporting instant chat, online presence, media sharing and responsive conversations.",
    details:
      "A modern real-time chat platform built to deliver a smooth messaging experience. It features live messaging, user authentication, online/offline status indicators, media sharing, conversation management and a responsive interface for desktop and mobile users.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
    ],
    highlights: [
      "Real-time messaging powered by Socket.io",
      "Private one-to-one conversations",
      "User authentication with secure JWT sessions",
      "Online/offline presence indicators",
      "Image and file sharing support",
      "Responsive user interface",
    ],
    link: "https://github.com/abhinand-ct205",
  },
  {
    name: "Mathrubhumi — News Platform",
    kind: "professional",
    role: "Front-End Developer",
    summary:
      "A modern, responsive news platform for Mathrubhumi with dynamic content sections, intuitive navigation and a seamless reading experience across devices.",
    details:
      "A high-performance news web experience focused on delivering breaking news, articles, videos and multimedia content through a clean, engaging interface. It uses responsive layouts, reusable React components, optimised content rendering and smooth interactions for a fast, accessible experience on desktop and mobile.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Responsive Design",
    ],
    highlights: [
      "Dynamic news and article sections with API-driven content",
      "Responsive layouts for desktop, tablet and mobile",
      "Category-based news navigation and content discovery",
      "Modern UI with smooth transitions and interactive elements",
      "Optimised rendering and image loading for faster page performance",
    ],
    link: "https://www.mathrubhumi.com/",
  },
  {
    name: "Grihalakshmi — Weekly Magazine",
    kind: "professional",
    role: "Front-End Developer",
    summary:
      "A modern digital magazine experience for Grihalakshmi, featuring engaging editorial content, intuitive navigation, rich media and a responsive reading experience.",
    details:
      "A visually engaging digital platform for Grihalakshmi Weekly Magazine, focused on delivering articles, stories, lifestyle content and multimedia in an elegant, accessible interface. Reusable components and responsive layouts keep the reading experience consistent across desktop, tablet and mobile.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Responsive Design",
    ],
    highlights: [
      "Dynamic magazine articles and editorial content",
      "Category-based navigation for easy content discovery",
      "Responsive reading experience across all screen sizes",
      "Rich media integration for images and multimedia",
      "Reusable and scalable React component architecture",
      "Optimised page rendering and image loading",
    ],
    link: "https://grihalakshmi.mathrubhumi.com/",
  },
  {
    name: "EdgeProp — Malaysia Property Platform",
    kind: "professional",
    role: "Front-End Developer",
    summary:
      "A property and real-estate platform (EdgeProp.my) for Malaysia, covering property discovery, listings, project information and market content.",
    details:
      "Contributed to EdgeProp.my, a comprehensive property platform serving buyers, renters, investors and property professionals across Malaysia. Built responsive, reusable interfaces for property discovery, listing experiences, project information, search and filtering, and data-driven content while maintaining a seamless experience across desktop and mobile.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
    ],
    highlights: [
      "Dynamic property listings with advanced search and filtering",
      "Responsive property discovery on desktop and mobile",
      "Interactive property details with pricing, location and market information",
      "New launch and project discovery interfaces",
      "Data-driven property insights and transaction information",
      "Reusable React components for large-scale property data",
    ],
    link: "https://www.edgeprop.my/",
  },
];

const PORTFOLIO_CATEGORIES = [
  {
    name: "Web Projects",
    count: "10+",
    description:
      "Full-stack web apps built with React, Next.js and Node.js — responsive, performant and accessible across all devices.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    name: "App Projects",
    count: "5+",
    description:
      "Cross-platform mobile applications with React Native and Flutter, with smooth UX and native-level performance.",
    technologies: ["React Native", "Flutter"],
  },
];

/**
 * Certifications and achievement numbers are taken from the portfolio's
 * Certifications section (app/pages/Certifications.tsx). That section is
 * currently commented out of the home page, but the data is real portfolio
 * content, so JARVIS can talk about it.
 */
const CERTIFICATIONS = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    year: "2024",
    skills: ["React", "HTML/CSS", "JavaScript", "UI/UX"],
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2023",
    skills: ["JavaScript", "ES6+", "Algorithms", "Data Structures"],
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    skills: ["AWS", "Cloud Architecture", "Security"],
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google (Coursera)",
    year: "2023",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
  },
  {
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    year: "2024",
    skills: ["Node.js", "Express", "REST APIs", "npm"],
  },
  {
    title: "Flutter Developer Certification",
    issuer: "Udemy",
    year: "2023",
    skills: ["Flutter", "Dart", "Mobile UI"],
  },
];

const ACHIEVEMENTS = [
  { label: "Open source contributions", value: "50+" },
  { label: "GitHub stars earned", value: "200+" },
  { label: "Client satisfaction", value: "100%" },
  { label: "Awards & recognition", value: "5+" },
];

const INTERESTS = {
  hobbies: [
    { name: "Cinema", description: "Malayalam classics, international films and thought-provoking stories" },
    { name: "Anime", description: "Captivating stories, iconic characters and beautifully crafted worlds" },
    { name: "Cricket", description: "Watching thrilling matches and following favourite players" },
    { name: "Football", description: "Following exciting leagues and playing with friends" },
    { name: "Trekking", description: "Weekend mountain hikes through serene trails and scenic peaks" },
    { name: "Travel", description: "Exploring offbeat destinations and local cultures" },
    { name: "Photography", description: "Landscapes, street moments, portraits and everyday stories" },
    { name: "Filmmaking", description: "Visual storytelling through cinematography and editing" },
  ],
  favouriteMovies: [
    "Interstellar",
    "PK",
    "Anbe Sivam",
    "Guru",
    "The Dark Knight",
    "CID Moosa",
  ],
  favouriteSeries: [
    "DARK",
    "Stranger Things",
    "Attack on Titan",
    "Breaking Bad",
    "The Boys",
    "Money Heist",
  ],
  favouriteArtists: [
    "Mohanlal",
    "Christian Bale",
    "Shah Rukh Khan",
    "Leonardo DiCaprio",
    "Brad Pitt",
    "Robert Downey Jr.",
  ],
  favouriteMusicians: [
    "A R Rahman",
    "Anirudh Ravichander",
    "Shreya Ghoshal",
    "Arijit Singh",
    "Hans Zimmer",
    "Sushin Shyam",
  ],
  favouriteAthletes: [
    "Sachin Tendulkar",
    "Cristiano Ronaldo",
    "Rohit Sharma",
    "Toni Kroos",
    "Roger Federer",
    "Amelia Kerr",
  ],
  favouriteGames: [
    "GTA",
    "Need For Speed",
    "Minecraft",
    "Cricket 07",
    "PUBG",
    "Dream League'26",
  ],
};

/** Sections of the live site JARVIS is allowed to link visitors to. */
const SITE_SECTIONS = [
  { label: "Home / Hero", path: "/#hero" },
  { label: "About", path: "/#about" },
  { label: "Skills & Experience", path: "/#skills" },
  { label: "Projects", path: "/#projects" },
  { label: "Contact", path: "/#contact" },
  { label: "About Me (personal story, education, hobbies)", path: "/about-me" },
  { label: "Detailed project showcase", path: "/projects" },
];

export const portfolioKnowledge = {
  personal: PERSONAL,
  socialLinks: SOCIAL_LINKS,
  about: ABOUT,
  education: EDUCATION,
  skills: SKILLS,
  workExperience: WORK_EXPERIENCE,
  projects: PROJECTS,
  portfolioCategories: PORTFOLIO_CATEGORIES,
  certifications: CERTIFICATIONS,
  achievements: ACHIEVEMENTS,
  interests: INTERESTS,
  siteSections: SITE_SECTIONS,
  /**
   * Things Abhinand is explicitly still growing into — kept separate so the
   * assistant never presents them as established expertise.
   */
  currentlyLearning: [
    "Full-stack MERN development — deepening backend skills with Node.js, Express and MongoDB",
    "Advanced TypeScript patterns",
  ],
  /** Facts the assistant must never claim to know. */
  notAvailable: [
    "Salary expectations or notice period",
    "Any employer other than Coddle Technologies",
    "Personal addresses, family details or private contact information beyond the listed email, phone and social profiles",
  ],
} as const;

export type PortfolioKnowledge = typeof portfolioKnowledge;
