export const scenes = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SceneId = (typeof scenes)[number]["id"];

export const projects = [
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    tag: "Expense Tracking App",
    description:
      "Expense Tracker App built with HTML, Tailwind CSS, & JavaScript, using Local Storage to track expense, income, & balance.",
    architecture:
      "Vanilla JavaScript with Local Storage persistence, component-based UI rendering, and client-side state synchronization.",
    tech: ["HTML", "Tailwind CSS", "JS"],
    challenge:
      "Maintaining accurate financial totals while keeping the UI synchronized with Local Storage after every transaction.",
    solution:
      "Created a lightweight expense tracking system that stores data locally, validates user input, and keeps financial summaries synchronized with every transaction.",
    links: {
      github: "https://github.com/SulymanKhalil/Expense-Tracker",
      live: "https://web-expensetracker.netlify.app/",
    },
  },
  {
    id: "recipe-finder",
    name: "Recipe Finder",
    tag: "Recipe Search App",
    description:
      "Recipe Finder App built with React, styled with Bootstrap, featuring API-powered recipe search and detailed recipe display.",
    architecture:
      "React SPA with REST API integration, component-driven UI, and asynchronous data fetching.",
    tech: ["React", "Bootstrap"],
    challenge:
      "Fetching and displaying recipe data efficiently while handling empty search results, API errors, and user input validation.",
    solution:
      "Integrated a recipe API with React to perform real-time searches, implemented conditional rendering for loading and error states, and created a responsive interface for browsing recipe details.",
    links: {
      github: "https://github.com/SulymanKhalil/Recipe-Finder",
      live: "https://web-find-recipes.netlify.app/",
    },
  },
  {
    id: "notes-app",
    name: "Notes App",
    tag: "Note Taking App",
    description:
      "Responsive Notes App built with React, Redux and Tailwind CSS featuring state management, Local Storage, and smooth performance.",
    architecture:
      "React SPA with Redux for global state management and Local Storage for persistent note storage.",
    tech: ["React", "Redux", "Tailwind CSS"],
    challenge:
      "Keeping note data synchronized across Redux state and Local Storage without introducing inconsistent updates.",
    solution:
      "Combined Redux for predictable state management with Local Storage persistence, ensuring instant UI updates and data retention across browser sessions.",
    links: {
      github: "https://github.com/SulymanKhalil/Notes-App",
      live: "https://notes-app-by-sulyman.netlify.app/",
    },
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    tag: "Currency Conversion Tool",
    description:
      "Responsive Currency Converter built with React and Tailwind CSS featuring real-time currency conversion using a live exchange rate API.",
    architecture:
      "React SPA with live exchange rate API integration, client-side state management, and responsive UI components.",
    tech: ["React", "Tailwind CSS"],
    challenge:
      "Providing accurate currency conversions while handling asynchronous API requests and changing exchange rates.",
    solution:
      "Integrated a live exchange rate API with efficient state management to perform instant conversions and gracefully handle loading and error states.",
    links: {
      github: "https://github.com/SulymanKhalil/Currency-Converter",
      live: "https://convertcurrencyweb.netlify.app/",
    },
  },
  {
    id: "e-com-app",
    name: "E-Com App",
    tag: "E-Commerce Store",
    description:
      "E-commerce app built with React & Redux featuring add-to-cart, quantity control, dynamic pricing, and a responsive Bootstrap UI.",
    architecture:
      "React SPA with Redux-powered cart management, reusable product components, and client-side routing.",
    tech: ["React", "Redux"],
    challenge:
      "Managing cart state consistently while keeping pricing and quantities synchronized throughout the application.",
    solution:
      "Implemented centralized cart management with Redux, enabling predictable state updates, automatic price calculations, and a responsive shopping experience.",
    links: {
      github: "https://github.com/SulymanKhalil/e-commerce-app",
      live: "https://addtocart-by-sulyman.netlify.app/",
    },
  },
  {
    id: "tech-rivals",
    name: "Tech Rivals",
    tag: "Brand Comparison Website",
    description:
      "AI-generated static webpage comparing Samsung vs Apple with products, innovations, lifestyle, and gallery.",
    architecture:
      "React static website with AI-assisted content generation, responsive component architecture, and Tailwind CSS styling.",
    tech: ["AI ✦", "React", "Tailwind CSS"],
    challenge:
      "Presenting large amounts of comparison content without overwhelming users or sacrificing readability.",
    solution:
      "Organized information into clear comparison sections with responsive layouts and AI-assisted content generation to improve browsing experience.",
    links: {
      github: "https://github.com/SulymanKhalil/samsung-apple",
      live: "https://marvelous-salamander-95b72e.netlify.app/#ecosystem",
    },
  },
  {
    id: "grocery-app",
    name: "Grocery App",
    tag: "AI Grocery Planner",
    description:
      "AI-powered grocery planner built with React and Tailwind CSS that generates grocery lists from selected recipes via API.",
    architecture:
      "React SPA integrating recipe APIs with AI-assisted grocery list generation and component-driven state management.",
    tech: ["AI ✦", "React", "Tailwind CSS"],
    challenge:
      "Transforming recipe selections into organized grocery lists while handling varying ingredient formats from the API.",
    solution:
      "Built an API-driven workflow that processes recipe ingredients into structured grocery lists, providing users with a simple meal-planning experience.",
    links: {
      github: "https://github.com/SulymanKhalil/grocery-app",
      live: "https://grocerio.netlify.app/",
    },
  },
  {
    id: "task-flow",
    name: "TaskFlow",
    tag: "Productivity Tool",
    description:
      "Advanced React Todo app with role-based access, i18n support, sorting, priorities, and detailed task status tracking.",
    architecture:
      "React application built with Umi.js, centralized state management, role-based access control, and modular component architecture.",
    tech: ["React", "Umi.js", "Ant Design"],
    challenge:
      "Managing complex task workflows while keeping application state predictable as features expanded.",
    solution:
      "Designed a modular architecture with centralized state management, making task filtering, permissions, and workflow updates scalable and maintainable.",
    links: {
      github: "https://github.com/SulymanKhalil/Todo-App",
      live: "https://taskflow-page.netlify.app/",
    },
  },
  {
    id: "mafia-empire",
    name: "Mafia Empire",
    tag: "Real-Time Social Game",
    description:
      "AI-assisted multiplayer social deduction game built with Next.js, featuring room-based gameplay, live player interactions, and a modern responsive interface.",
    architecture:
      "Next.js application with AI-assisted development, room-based session management, and real-time client synchronization.",
    tech: ["AI ✦", "Next.js", "React", "Tailwind CSS"],
    challenge:
      "Keeping game state synchronized across multiple players while maintaining a smooth, responsive gameplay experience.",
    solution:
      "Designed a room-based architecture with synchronized client state, allowing players to interact in real time while keeping game logic predictable and responsive.",
    links: {
      github: "https://github.com/SulymanKhalil/Mafia-Empire",
      live: "https://mafia-empire.netlify.app/",
    },
  },
  {
    id: "freshly",
    name: "Freshly",
    tag: "Laundry Service Platform",
    description:
      "Modern laundry service website built with React and Tailwind CSS, featuring service showcase, responsive layouts, smooth animations, and an intuitive booking experience.",
    architecture:
      "React single-page application with reusable UI components, responsive layouts, and animation-driven user interactions.",
    tech: ["AI ✦", "React"],
    challenge:
      "Making a simple laundry service feel trustworthy and premium without adding unnecessary complexity to the user journey.",
    solution:
      "Focused on clean visual hierarchy, subtle animations, and reusable components to create a polished experience while keeping navigation and service discovery effortless.",
    links: {
      github: "https://github.com/SulymanKhalil/freshly",
      live: "https://freshly-laundryy.netlify.app/",
    },
  },
] as const;

export const experience = [
  {
    id: "multiconnect",
    company: "MultiConnect Horizon Technologies Ltd.",
    role: "Software Engineer",
    location: "Hong Kong (Remote)",
    period: "Current",
    responsibilities: [
      "Develop and maintain scalable full-stack web applications using React, Next.js, TypeScript, Node.js, and Express.js.",
      "Architect and implement secure REST APIs, backend services, and database integrations with a focus on scalability and maintainability.",
      "Collaborate across engineering teams to optimize performance, resolve technical challenges, and deliver high-quality production features.",
    ],
    achievements: [
      "Delivered production-ready features that enhanced application performance, usability, and overall development efficiency.",
      "Owned features end-to-end, from frontend implementation and backend development to deployment and ongoing production support.",
    ],
    tech: [
      "AI-Assisted Development ✦",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Express.js",
      "NestJS",
    ],
  },
] as const;

export const skills = {
  core: [
    "AI-Assisted Workflow",
    "Reactjs",
    "Nextjs",
    "Expressjs",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
  ],
  growing: ["WebRTC", "FFmpeg", "System Design", "Architecture Study"],
  tools: ["Claude", "Cursor"],
} as const;

export const profile = {
  name: "Sulyman Khalil",
  title: "Software Engineer",
  focus: "Development & Real-time Systems",
  location: "Lahore, Pakistan",
  email: "sulymankhalil.dev@gmail.com",
  github: "https://github.com/SulymanKhalil",
  linkedin: "https://linkedin.com/in/sulymankhalil/",
  contact: "+92 3707843216",
  portfolio: "https://sulymanlive.netlify.app",
  availability: "Open to onsite/remote roles",
  bio: "Full Stack Developer with 1+ year of experience crafting modern web experiences. Passionate about clean architecture, intuitive user interfaces, and AI-assisted engineering, I build fast, scalable products that turn ambitious ideas into production-ready solutions.",
};
