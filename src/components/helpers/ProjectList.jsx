import Proj1 from "../assets/proj1.jpg";
import Proj2 from "../assets/proj2.jpg";
import Proj3 from "../assets/proj3.webp";
import Proj4 from "../assets/proj4.webp";
import Proj5 from "../assets/proj5.jpg";
import Proj6 from "../assets/proj6.png";
import Proj7 from "../assets/proj7.jpg";
import Proj8 from "../assets/proj8.png";

export const ProjectList = [
  {
    name: "Dijkstra Algorithm Visualizer",
    image: Proj1,
    skills: "JavaScript, HTML, CSS",
    technologies: ["JavaScript", "HTML5", "CSS3", "D3.js"],
    description: "An interactive visualization tool for Dijkstra's pathfinding algorithm that shows the shortest path between nodes in a graph.",
    githubUrl: "https://github.com/yourusername/dijkstra-visualizer",
    deploymentUrl: "https://dijkstra-visualizer-demo.netlify.app",
    isFeatured: true,
    year: 2023,
    tags: ["algorithms", "visualization", "web"],
    collaborators: [],
    status: "completed"
  },
  {
    name: "Ecommerce Website",
    image: Proj2,
    skills: "React, Node.js, MongoDB",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API"],
    description: "A full-stack e-commerce platform with product listings, cart functionality, user authentication, and payment processing.",
    githubUrl: "https://github.com/yourusername/ecommerce-app",
    deploymentUrl: "https://my-ecommerce-store.vercel.app",
    isFeatured: true,
    year: 2022,
    tags: ["fullstack", "ecommerce", "authentication"],
    collaborators: ["Jane Smith", "Mike Johnson"],
    status: "completed"
  },
  {
    name: "Spotify Clone",
    image: Proj3,
    skills: "React, Node.js, MongoDB, Spotify API",
    technologies: ["React", "Node.js", "Spotify API", "OAuth", "MongoDB"],
    description: "A music streaming application that mimics Spotify's core features using the Spotify Web API for music data.",
    githubUrl: "https://github.com/yourusername/spotify-clone",
    deploymentUrl: "https://spotify-clone-demo.herokuapp.com",
    isFeatured: false,
    year: 2023,
    tags: ["music", "clone", "API integration"],
    collaborators: [],
    status: "completed"
  },
  {
    name: "Social Media Website",
    image: Proj4,
    skills: "React, Node.js, MySQL, GraphQL",
    technologies: ["React", "GraphQL", "Apollo", "Node.js", "MySQL", "JWT"],
    description: "A social networking platform with user profiles, posts, comments, and real-time updates using GraphQL subscriptions.",
    githubUrl: "https://github.com/yourusername/social-media-app",
    deploymentUrl: null,
    isFeatured: true,
    year: 2022,
    tags: ["social", "graphql", "realtime"],
    collaborators: ["Alex Brown"],
    status: "completed"
  },
  {
    name: "Dashboard Visualizer",
    image: Proj5,
    skills: "JavaScript, HTML, CSS",
    technologies: ["JavaScript", "Chart.js", "Bootstrap", "REST API"],
    description: "A responsive admin dashboard with data visualization charts, metrics tracking, and interactive UI components.",
    githubUrl: "https://github.com/yourusername/dashboard-visualizer",
    deploymentUrl: "https://dashboard-demo.netlify.app",
    isFeatured: false,
    year: 2021,
    tags: ["dashboard", "data visualization"],
    collaborators: [],
    status: "completed"
  },
  {
    name: "Mobile Game",
    image: Proj6,
    skills: "React Native, JavaScript, HTML, CSS",
    technologies: ["React Native", "Expo", "Game Physics", "Firebase"],
    description: "A cross-platform mobile game with physics-based gameplay, score tracking, and social sharing features.",
    githubUrl: "https://github.com/yourusername/mobile-game",
    deploymentUrl: null,
    isFeatured: true,
    year: 2023,
    tags: ["mobile", "games", "react native"],
    collaborators: ["Sarah Lee"],
    status: "completed"
  },
  {
    name: "Weather App",
    image: Proj7,
    skills: "React, OpenWeather API, Tailwind CSS",
    technologies: ["React", "OpenWeather API", "Tailwind CSS", "Geolocation API"],
    description: "Real-time weather application with location detection, 5-day forecast, and interactive maps.",
    githubUrl: "https://github.com/yourusername/weather-app",
    deploymentUrl: "https://weather-app-demo.vercel.app",
    isFeatured: false,
    year: 2023,
    tags: ["weather", "API", "responsive"],
    collaborators: [],
    status: "completed"
  },
  {
    name: "AI Image Generator",
    image: Proj8,
    skills: "Python, React, TensorFlow",
    technologies: ["Python", "React", "TensorFlow", "Flask", "DALL-E API"],
    description: "Web application that generates images from text prompts using machine learning models.",
    githubUrl: "https://github.com/yourusername/ai-image-generator",
    deploymentUrl: "https://ai-image-generator.vercel.app",
    isFeatured: true,
    year: 2024,
    tags: ["AI", "machine learning", "image generation"],
    collaborators: ["David Wilson"],
    status: "active"
  },
  {
    name: "Task Management System",
    image: null,
    skills: "Vue.js, Firebase, TypeScript",
    technologies: ["Vue 3", "Firebase", "TypeScript", "Vuetify"],
    description: "Kanban-style task management system with drag-and-drop functionality and team collaboration features.",
    githubUrl: "https://github.com/yourusername/task-management",
    deploymentUrl: "https://task-management-demo.firebaseapp.com",
    isFeatured: true,
    year: 2023,
    tags: ["productivity", "vue", "realtime"],
    collaborators: ["Emma Davis"],
    status: "completed"
  },
  {
    name: "Blockchain Explorer",
    image: null,
    skills: "Solidity, Web3.js, Ethers.js",
    technologies: ["Solidity", "Web3.js", "Ethers.js", "Hardhat"],
    description: "Explorer for Ethereum blockchain that displays transactions, blocks, and smart contract interactions.",
    githubUrl: "https://github.com/yourusername/blockchain-explorer",
    deploymentUrl: null,
    isFeatured: false,
    year: 2023,
    tags: ["blockchain", "web3", "ethereum"],
    collaborators: [],
    status: "completed"
  }
];

// Utility functions for filtering projects
export const getProjectsByYear = (year) => {
  return ProjectList.filter(project => project.year === year);
};

export const getProjectsByTag = (tag) => {
  return ProjectList.filter(project => 
    project.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
};

export const getProjectsByStatus = (status) => {
  return ProjectList.filter(project => 
    project.status.toLowerCase() === status.toLowerCase()
  );
};

export const getProjectsByTechnology = (tech) => {
  return ProjectList.filter(project => 
    project.technologies.some(t => 
      t.toLowerCase().includes(tech.toLowerCase())
    )
  );
};

// Pre-defined filtered lists
export const FeaturedProjects = ProjectList.filter(project => project.isFeatured);
export const RecentProjects = ProjectList.filter(project => project.year >= 2022).sort((a, b) => b.year - a.year);
export const CompletedProjects = ProjectList.filter(project => project.status === "completed");
export const ActiveProjects = ProjectList.filter(project => project.status === "active");

// Group projects by year
export const ProjectsByYear = ProjectList.reduce((acc, project) => {
  if (!acc[project.year]) {
    acc[project.year] = [];
  }
  acc[project.year].push(project);
  return acc;
}, {});

// Get all unique tags from projects
export const AllTags = [...new Set(ProjectList.flatMap(project => project.tags))];
