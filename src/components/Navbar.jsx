import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import CloseIcon from "@material-ui/icons/Close";
import { Button, IconButton, Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import logo from "../assets/logo.png";
import DarkModeIcon from "@material-ui/icons/Brightness4";
import LightModeIcon from "@material-ui/icons/Brightness7";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";

function Navbar({ darkMode, toggleDarkMode }) {
  const [expandNavbar, setExpandNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setExpandNavbar(false);
    setActiveLink(location.pathname);
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

  const handleNavLinkClick = (path) => {
    navigate(path);
    if (isMobile) setExpandNavbar(false);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { path: "/", name: "Home", icon: "🏠" },
    { path: "/projects", name: "Projects", icon: "💻" },
    { path: "/experience", name: "Experience", icon: "📈" },
    { path: "/skills", name: "Skills", icon: "🛠️" },
    { path: "/about", name: "About", icon: "👤" },
    { path: "/contact", name: "Contact", icon: "📧" },
  ];

  const socialLinks = [
    { 
      url: "https://github.com/yourusername", 
      icon: <GitHubIcon />, 
      tooltip: "GitHub Profile" 
    },
    { 
      url: "https://linkedin.com/in/yourusername", 
      icon: <LinkedInIcon />, 
      tooltip: "LinkedIn Profile" 
    },
    { 
      url: "mailto:your.email@example.com", 
      icon: <MailIcon />, 
      tooltip: "Send Email" 
    },
  ];

  return (
    <div 
      className={`navbar ${scrolled ? "scrolled" : ""} ${darkMode ? "dark" : "light"}`} 
      id={expandNavbar ? "open" : "close"}
    >
      <div className="logo-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src={logo} alt="Portfolio Logo" />
          <span className="logo-text">PedroTech</span>
        </div>
      </div>
      
      <div className={`nav-links ${expandNavbar ? "expanded" : ""}`}>
        {navLinks.map((link, index) => (
          <div 
            key={index} 
            className={`nav-item ${activeLink === link.path ? "active" : ""}`}
            onClick={() => handleNavLinkClick(link.path)}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-text">{link.name}</span>
          </div>
        ))}
      </div>

      <div className="nav-actions">
        {!isMobile && (
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <Tooltip title={social.tooltip} key={index}>
                <IconButton 
                  color="inherit" 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </div>
        )}

        <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {!isMobile && (
          <Button 
            variant="contained" 
            color="primary" 
            className="cta-button"
            onClick={() => handleNavLinkClick("/contact")}
            startIcon={<MailIcon />}
          >
            Hire Me
          </Button>
        )}
      </div>

      <div className="toggle-button">
        <Tooltip title={expandNavbar ? "Close menu" : "Open menu"}>
          <IconButton
            onClick={() => setExpandNavbar((prev) => !prev)}
            aria-label={expandNavbar ? "Close menu" : "Open menu"}
            color="inherit"
          >
            {expandNavbar ? <CloseIcon /> : <ReorderIcon />}
          </IconButton>
        </Tooltip>
      </div>

      {/* Mobile Menu Overlay */}
      {expandNavbar && isMobile && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            {navLinks.map((link, index) => (
              <div 
                key={index} 
                className={`mobile-nav-item ${activeLink === link.path ? "active" : ""}`}
                onClick={() => handleNavLinkClick(link.path)}
              >
                {link.icon} {link.name}
              </div>
            ))}
            <div className="mobile-social-links">
              {socialLinks.map((social, index) => (
                <Tooltip title={social.tooltip} key={index}>
                  <IconButton 
                    color="inherit" 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
