import { useState } from "react"; // 4.2k (gzipped: 1.8k)
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home"
import "./index.css";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
            <div
             className={`min-h-screen transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
             } bg-black text-gray-100`}
            >
                <Navbar manuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <MobileMenu manuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <Home />
            </div>
        </>
    );
}

export default App;
