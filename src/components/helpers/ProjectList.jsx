import Proj1 from "../assets/proj1.jpg";
import Proj2 from "../assets/proj2.jpg";
import Proj3 from "../assets/proj3.webp";
import Proj4 from "../assets/proj4.webp";
import Proj5 from "../assets/proj5.jpg";
import Proj6 from "../assets/proj6.png";

export const ProjectList = [
  {
    name: "Dijkstra Algorithm Visualizer",
    image: Proj1,
    skills: "JavaScript, HTML, CSS",
    description: "An interactive visualization tool for Dijkstra's pathfinding algorithm that shows the shortest path between nodes in a graph.",
    githubUrl: "https://github.com/yourusername/dijkstra-visualizer",
    deploymentUrl: "https://dijkstra-visualizer-demo.netlify.app",
    isFeatured: true,
    year: 2023
  },
  {
    name: "Ecommerce Website",
    image: Proj2,
    skills: "React, Node.js, MongoDB",
    description: "A full-stack e-commerce platform with product listings, cart functionality, user authentication, and payment processing.",
    githubUrl: "https://github.com/yourusername/ecommerce-app",
    deploymentUrl: "https://my-ecommerce-store.vercel.app",
    isFeatured: true,
    year: 2022
  },
  {
    name: "Spotify Clone",
    image: Proj3,
    skills: "React, Node.js, MongoDB, Spotify API",
    description: "A music streaming application that mimics Spotify's core features using the Spotify Web API for music data.",
    githubUrl: "https://github.com/yourusername/spotify-clone",
    deploymentUrl: "https://spotify-clone-demo.herokuapp.com",
    isFeatured: false,
    year: 2023
  },
  {
    name: "Social Media Website",
    image: Proj4,
    skills: "React, Node.js, MySQL, GraphQL",
    description: "A social networking platform with user profiles, posts, comments, and real-time updates using GraphQL subscriptions.",
    githubUrl: "https://github.com/yourusername/social-media-app",
    deploymentUrl: null, // if not deployed
    isFeatured: true,
    year: 2022
  },
  {
    name: "Dashboard Visualizer",
    image: Proj5,
    skills: "JavaScript, HTML, CSS",
    description: "A responsive admin dashboard with data visualization charts, metrics tracking, and interactive UI components.",
    githubUrl: "https://github.com/yourusername/dashboard-visualizer",
    deploymentUrl: "https://dashboard-demo.netlify.app",
    isFeatured: false,
    year: 2021
  },
  {
    name: "Mobile Game",
    image: Proj6,
    skills: "React Native, JavaScript, HTML, CSS",
    description: "A cross-platform mobile game with physics-based gameplay, score tracking, and social sharing features.",
    githubUrl: "https://github.com/yourusername/mobile-game",
    deploymentUrl: null, // if not published to app stores
    isFeatured: true,
    year: 2023
  },
  // You can add more projects below
  {
    name: "Weather App",
    image: null, // you can add another image import
    skills: "React, OpenWeather API, Tailwind CSS",
    description: "Real-time weather application with location detection, 5-day forecast, and interactive maps.",
    githubUrl: "https://github.com/yourusername/weather-app",
    deploymentUrl: "https://weather-app-demo.vercel.app",
    isFeatured: false,
    year: 2023
  }
];

// Optional: You can also create filtered lists
export const FeaturedProjects = ProjectList.filter(project => project.isFeatured);
export const RecentProjects = ProjectList.filter(project => project.year >= 2022).sort((a, b) => b.year - a.year);
