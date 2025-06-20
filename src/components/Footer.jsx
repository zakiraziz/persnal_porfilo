import React, { useState, useEffect, useRef } from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  LinkedIn,
  GitHub,
  YouTube,
  Email,
  RssFeed,
  ArrowUpward,
  Favorite,
  Code,
  Language,
  Phone,
  LocationOn,
  Schedule,
  Star,
  VerifiedUser,
  Help
} from "@material-ui/icons";
import { 
  IconButton, 
  Tooltip, 
  Snackbar,
  Fade,
  useMediaQuery,
  useTheme,
  TextField,
  Button,
  Divider,
  Collapse,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/Footer.css";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: "0.8rem",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[4],
  },
  snackbar: {
    [theme.breakpoints.down('sm')]: {
      bottom: 90,
    },
  },
  dialog: {
    borderRadius: 16,
  },
}));

function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const footerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const socialMediaLinks = [
    {
      icon: <Instagram />,
      name: "Instagram",
      url: "https://instagram.com/pedrotech",
      color: "#E1306C",
      description: "Follow us for daily tech tips and behind-the-scenes content"
    },
    {
      icon: <Twitter />,
      name: "Twitter",
      url: "https://twitter.com/pedrotech",
      color: "#1DA1F2",
      description: "Join the conversation about latest tech trends"
    },
    {
      icon: <Facebook />,
      name: "Facebook",
      url: "https://facebook.com/pedrotech",
      color: "#1877F2",
      description: "Connect with our community on Facebook"
    },
    {
      icon: <LinkedIn />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/pedrotech",
      color: "#0077B5",
      description: "Professional network and career opportunities"
    },
    {
      icon: <GitHub />,
      name: "GitHub",
      url: "https://github.com/pedrotech",
      color: "#333",
      description: "Explore our open-source projects and contributions"
    },
    {
      icon: <YouTube />,
      name: "YouTube",
      url: "https://youtube.com/pedrotech",
      color: "#FF0000",
      description: "Watch tutorials and tech reviews"
    },
    {
      icon: <Email />,
      name: "Email",
      url: "mailto:contact@pedrotech.com",
      color: "#D44638",
      description: "Send us your questions and feedback"
    },
    {
      icon: <RssFeed />,
      name: "RSS Feed",
      url: "/rss",
      color: "#FFA500",
      description: "Subscribe to our RSS feed for updates"
    },
  ];

  const footerLinks = [
    { 
      label: "Privacy Policy", 
      url: "/privacy",
      icon: <VerifiedUser fontSize="small" />,
      description: "Learn how we protect your data"
    },
    { 
      label: "Terms of Service", 
      url: "/terms",
      icon: <Help fontSize="small" />,
      description: "Read our terms and conditions"
    },
    { 
      label: "Contact Us", 
      url: "/contact",
      icon: <Phone fontSize="small" />,
      description: "Get in touch with our team"
    },
    { 
      label: "Careers", 
      url: "/careers",
      icon: <Star fontSize="small" />,
      description: "Explore job opportunities"
    },
    { 
      label: "Blog", 
      url: "/blog",
      icon: <RssFeed fontSize="small" />,
      description: "Read our latest articles"
    },
    { 
      label: "Sitemap", 
      url: "/sitemap",
      icon: <Language fontSize="small" />,
      description: "Navigate our website structure"
    },
  ];

  const contactInfo = [
    {
      icon: <LocationOn />,
      text: "123 Tech Street, Silicon Valley, CA 94025",
      action: () => window.open("https://maps.google.com?q=123+Tech+Street")
    },
    {
      icon: <Phone />,
      text: "+1 (555) 123-4567",
      action: () => window.open("tel:+15551234567")
    },
    {
      icon: <Schedule />,
      text: "Mon-Fri: 9AM-5PM PST",
      action: null
    }
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setSnackbarMessage("Please enter a valid email address");
      setOpenSnackbar(true);
      return;
    }
    
    setEmailError(false);
    setSnackbarMessage("Thank you for subscribing!");
    setOpenSnackbar(true);
    setEmail("");
    // Here you would typically send the email to your backend
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDialogOpen = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoveredIcon(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hoveredIcon]);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-content">
        {/* Newsletter Subscription */}
        <div className="footer-section newsletter">
          <h4>
            <Email fontSize="small" /> Newsletter
          </h4>
          <p>Stay updated with our latest news and offers</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <TextField
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
              variant="outlined"
              size="small"
              fullWidth
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              endIcon={<Send />}
              style={{ marginTop: 8 }}
              fullWidth
            >
              Subscribe
            </Button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h4>
            <Language fontSize="small" /> Quick Links
          </h4>
          <ul>
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDialogOpen({
                      title: link.label,
                      content: (
                        <div>
                          <p>{link.description}</p>
                          <Button 
                            href={link.url} 
                            color="primary"
                            variant="contained"
                          >
                            Visit Page
                          </Button>
                        </div>
                      )
                    });
                  }}
                >
                  {link.icon} {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-info">
          <h4>
            <Phone fontSize="small" /> Contact Us
          </h4>
          <ul>
            {contactInfo.map((info, index) => (
              <li 
                key={index} 
                onClick={() => info.action && info.action()}
                style={{ cursor: info.action ? "pointer" : "default" }}
              >
                {info.icon} {info.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-media-container">
          <h4>
            <Favorite fontSize="small" /> Connect With Us
          </h4>
          <p>Follow us on social media for updates</p>
          <div className="social-media">
            {socialMediaLinks.map((social, index) => (
              <Tooltip 
                key={index} 
                title={
                  <div>
                    <strong>{social.name}</strong>
                    <p>{social.description}</p>
                  </div>
                } 
                arrow
                classes={{ tooltip: classes.tooltip }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 200 }}
                placement="top"
              >
                <IconButton
                  aria-label={social.name}
                  onClick={() => handleSocialClick(social)}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="social-icon"
                  style={{ 
                    backgroundColor: hoveredIcon === index ? `${social.color}20` : 'transparent',
                    color: hoveredIcon === index ? social.color : 'inherit',
                    margin: 4,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      <Divider style={{ margin: '16px 0', backgroundColor: 'rgba(255,255,255,0.1)' }} />

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>
            &copy; {currentYear} pedrotech.com - All Rights Reserved
            {!isMobile && (
              <span style={{ marginLeft: 16 }}>
                <Code fontSize="small" style={{ verticalAlign: 'middle', margin: '0 4px' }} />
                Made with <Favorite fontSize="small" style={{ verticalAlign: 'middle', margin: '0 4px' }} /> 
                using React and Material-UI
              </span>
            )}
          </p>
        </div>

        <div className="footer-actions">
          <Button 
            variant="outlined" 
            color="inherit"
            size="small"
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <ArrowUpward /> : null}
          >
            {expanded ? 'Show Less' : 'More Info'}
          </Button>

          <Tooltip title="Back to Top" arrow>
            <IconButton 
              color="inherit" 
              onClick={scrollToTop}
              size="small"
            >
              <ArrowUpward />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Expanded Info */}
      <Collapse in={expanded}>
        <div className="footer-expanded">
          <div className="footer-expanded-content">
            <h5>About PedroTech</h5>
            <p>
              We're a passionate team of developers creating innovative solutions 
              to make technology accessible to everyone.
            </p>
            <h5>Our Mission</h5>
            <p>
              To empower people through technology education and high-quality 
              software development services.
            </p>
          </div>
        </div>
      </Collapse>

      {/* Feedback Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        className={classes.snackbar}
        TransitionComponent={Zoom}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="info"
          icon={false}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Link Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          {dialogContent.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </footer>
  );
}

export default Footer;
