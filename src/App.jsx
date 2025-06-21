import { useState, useEffect, useCallback } from "react";
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
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3
      };
      return star;
    };

    const starArray = Array.from({ length: 20 }, createStar);
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
            background: `radial-gradient(circle, #ff85a2 ${star.opacity * 100}%, transparent 70%)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            filter: `blur(${star.size / 5}px)`
          }}
        />
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  const createHeart = useCallback(() => {
    const colors = ['#ff6b8b', '#ff85a2', '#ffb6c1', '#ffc0cb'];
    const heart = {
      id: Math.random().toString(36).substring(7),
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 5,
      size: Math.random() * 10 + 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.3
    };
    return heart;
  }, []);

  useEffect(() => {
    const heartArray = Array.from({ length: 12 }, createHeart);
    setHearts(heartArray);

    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-15), createHeart()]);
    }, 3000);

    return () => clearInterval(interval);
  }, [createHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${heart.color}' opacity='${heart.opacity}'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            filter: `drop-shadow(0 0 2px rgba(255, 107, 139, 0.5))`
          }}
        />
      ))}
    </div>
  );
};

const KawaiiCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsPointer(window.getComputedStyle(e.target).getPropertyValue('cursor') === 'pointer');
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className={`fixed pointer-events-none z-50 transition-transform duration-100 ease-out ${isPointer ? 'scale-150' : 'scale-100'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}>
      <div className={`transition-all duration-300 ${isPointer ? 'opacity-100 scale-125' : 'opacity-70 scale-100'}`}>
        {isPointer ? (
          <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping absolute"></div>
            <div className="text-xs">♥</div>
          </div>
        ) : (
          <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const KawaiiNotification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 bg-white p-4 rounded-xl shadow-lg border-l-4 border-pink-500 z-50 transition-all duration-500 transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-center">
        <div className="mr-3 text-2xl">🌸</div>
        <div>
          <div className="font-bold text-pink-600">Kawaii Alert!</div>
          <div className="text-gray-700">{message}</div>
        </div>
        <button onClick={() => setVisible(false)} className="ml-4 text-pink-400 hover:text-pink-600">
          ✕
        </button>
      </div>
    </div>
  );
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMoeElements, setShowMoeElements] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const addNotification = useCallback((message) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, message }]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowMoeElements(true);
        addNotification("Welcome to our kawaii world! (◕‿◕✿)");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, addNotification]);

  const handleSpecialClick = useCallback(() => {
    setClickCount(prev => prev + 1);
    if (clickCount > 0 && clickCount % 5 === 0) {
      const messages = [
        "You found the secret! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
        "So much kawaii! (●ˊωˋ●)",
        "Nyan~ (≧◡≦) ♡",
        "Moe moe kyun! (｡♥‿♥｡)",
        "Keep clicking for more cuteness! ヽ(♡‿♡)ノ"
      ];
      addNotification(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [clickCount, addNotification]);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-gradient-to-br from-pink-50 to-blue-50 text-gray-800 relative overflow-hidden`}
        onClick={handleSpecialClick}
      >
        {showMoeElements && (
          <>
            <KawaiiCursor />
            <KawaiiStars />
            <FloatingHearts />
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-20 -ml-24 -mb-24" />
            
            {/* Kawaii floating buttons */}
            <button 
              className="fixed bottom-8 right-8 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white text-xl shadow-lg hover:bg-pink-500 transition-all z-40 animate-bounce-slow"
              onClick={() => addNotification("You clicked the cute button! (づ｡◕‿‿◕｡)づ")}
            >
              ♥
            </button>
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
            <div className="mt-2 text-xs text-pink-300">
              {clickCount > 0 && `Secret clicks: ${clickCount}`}
            </div>
          </footer>
        )}

        {/* Notifications */}
        <div className="fixed bottom-0 right-0 z-50 space-y-2 p-4">
          {notifications.map((notification) => (
            <KawaiiNotification
              key={notification.id}
              message={notification.message}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
