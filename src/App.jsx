import { useState, useEffect } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import "./index.css";

// Cute animated components
const KawaiiStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStar = () => {
      const star = {
        id: Math.random().toString(36).substring(7),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      };
      return star;
    };

    const starArray = Array.from({ length: 15 }, createStar);
    setStars(starArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, #ff85a2 30%, transparent 70%)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  const createHeart = () => {
    const heart = {
      id: Math.random().toString(36).substring(7),
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 5
    };
    return heart;
  };

  useEffect(() => {
    const heartArray = Array.from({ length: 8 }, createHeart);
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            width: '24px',
            height: '24px',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff6b8b' opacity='0.6'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")`,
            backgroundRepeat: 'no-repeat',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMoeElements, setShowMoeElements] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowMoeElements(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-gradient-to-br from-pink-50 to-blue-50 text-gray-800 relative overflow-hidden`}
      >
        {showMoeElements && (
          <>
            <KawaiiStars />
            <FloatingHearts />
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-20 -ml-24 -mb-24" />
          </>
        )}
        
        <Navbar 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
          className="relative z-10"
        />
        <MobileMenu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          className="relative z-10"
        />
        <Home className="relative z-10" />
        
        {/* Cute footer */}
        {showMoeElements && (
          <footer className="py-4 text-center text-sm text-pink-400 relative z-10">
            <div className="animate-bounce inline-block mx-1">(◕‿◕✿)</div>
            Made with love 
            <div className="animate-heartbeat inline-block mx-1">❤️</div>
            and moe magic
            <div className="animate-spin-slow inline-block ml-1">☆</div>
          </footer>
        )}
      </div>
    </>
  );
}

export default App;
