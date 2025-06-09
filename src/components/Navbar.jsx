import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import CloseIcon from "@material-ui/icons/Close";
import { Button, IconButton } from "@material-ui/core";
import logo from "../assets/logo.png"; // assuming you have a logo image

function Navbar() {
  const [expandNavbar, setExpandNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
    { path: "/experience", name: "Experience" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`} id={expandNavbar ? "open" : "close"}>
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Company Logo" />
        <span>PedroTech</span>
      </div>
      
      <div className="links">
        {navLinks.map((link, index) => (
          <Link 
            key={index} 
            to={link.path} 
            className={location.pathname === link.path ? "active" : ""}
          >
            {link.name}
          </Link>
        ))}
        <Button 
          variant="contained" 
          color="primary" 
          className="cta-button"
          onClick={() => navigate("/contact")}
        >
          Get in Touch
        </Button>
      </div>

      <div className="toggleButton">
        <IconButton
          onClick={() => setExpandNavbar((prev) => !prev)}
          aria-label={expandNavbar ? "Close menu" : "Open menu"}
        >
          {expandNavbar ? <CloseIcon /> : <ReorderIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
