import React, { useState, useEffect } from "react";
import {
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
  YouTubeIcon,
  EmailIcon,
  RssFeedIcon
} from "@material-ui/icons";
import { 
  IconButton, 
  Tooltip, 
  Snackbar,
  Fade,
  useMediaQuery,
  useTheme 
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/Footer.css";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: "0.8rem",
  },
  snackbar: {
    [theme.breakpoints.down('sm')]: {
      bottom: 90,
    },
  },
}));

function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const socialMediaLinks = [
    {
      icon: <InstagramIcon />,
      name: "Instagram",
      url: "https://instagram.com/pedrotech",
      color: "#E1306C",
    },
    {
      icon: <TwitterIcon />,
      name: "Twitter",
      url: "https://twitter.com/pedrotech",
      color: "#1DA1F2",
    },
    {
      icon: <FacebookIcon />,
      name: "Facebook",
      url: "https://facebook.com/pedrotech",
      color: "#1877F2",
    },
    {
      icon: <LinkedInIcon />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/pedrotech",
      color: "#0077B5",
    },
    {
      icon: <GitHubIcon />,
      name: "GitHub",
      url: "https://github.com/pedrotech",
      color: "#333",
    },
    {
      icon: <YouTubeIcon />,
      name: "YouTube",
      url: "https://youtube.com/pedrotech",
      color: "#FF0000",
    },
    {
      icon: <EmailIcon />,
      name: "Email",
      url: "mailto:contact@pedrotech.com",
      color: "#D44638",
    },
    {
      icon: <RssFeedIcon />,
      name: "RSS Feed",
      url: "/rss",
      color: "#FFA500",
    },
  ];

  const handleSocialClick = (social) => {
    try {
      if (social.name === "Email" || social.name === "RSS Feed") {
        window.location.href = social.url;
      } else {
        window.open(social.url, "_blank", "noopener,noreferrer");
      }
      setSnackbarMessage(`Visiting ${social.name}`);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage(`Failed to open ${social.name}`);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const footerLinks = [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" },
    { label: "Contact Us", url: "/contact" },
    { label: "Careers", url: "/careers" },
    { label: "Blog", url: "/blog" },
    { label: "Sitemap", url: "/sitemap" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoveredIcon(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hoveredIcon]);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Newsletter Subscription */}
        <div className="newsletter">
          <h4>Subscribe to our newsletter</h4>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="social-media-container">
          <h4>Connect with us</h4>
          <div className="social-media">
            {socialMediaLinks.map((social, index) => (
              <Tooltip 
                key={index} 
                title={social.name} 
                arrow
                classes={{ tooltip: classes.tooltip }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 200 }}
              >
                <IconButton
                  aria-label={social.name}
                  onClick={() => handleSocialClick(social)}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="social-icon"
                  style={{ 
                    backgroundColor: hoveredIcon === index ? `${social.color}20` : 'transparent',
                    color: hoveredIcon === index ? social.color : 'inherit'
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} pedrotech.com - All Rights Reserved</p>
        <p className="footer-links">
          {footerLinks.slice(0, 3).map((link, index) => (
            <React.Fragment key={index}>
              <a href={link.url}>{link.label}</a>
              {index < 2 && " | "}
            </React.Fragment>
          ))}
        </p>
        {!isMobile && (
          <p className="footer-credits">
            Made with ❤️ using React and Material-UI
          </p>
        )}
      </div>

      {/* Feedback Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        className={classes.snackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </footer>
  );
}

export default Footer;
