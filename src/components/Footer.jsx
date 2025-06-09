import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { IconButton, Tooltip } from "@material-ui/core";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialMediaLinks = [
    {
      icon: <InstagramIcon />,
      name: "Instagram",
      url: "https://instagram.com/pedrotech",
    },
    {
      icon: <TwitterIcon />,
      name: "Twitter",
      url: "https://twitter.com/pedrotech",
    },
    {
      icon: <FacebookIcon />,
      name: "Facebook",
      url: "https://facebook.com/pedrotech",
    },
    {
      icon: <LinkedInIcon />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/pedrotech",
    },
  ];

  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="footer">
      <div className="socialMedia">
        {socialMediaLinks.map((social, index) => (
          <Tooltip key={index} title={social.name} arrow>
            <IconButton
              aria-label={social.name}
              onClick={() => handleSocialClick(social.url)}
              className="social-icon"
            >
              {social.icon}
            </IconButton>
          </Tooltip>
        ))}
      </div>
      <p> &copy; {currentYear} pedrotech.com - All Rights Reserved</p>
      <p className="footer-links">
        <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a> |{" "}
        <a href="/contact">Contact Us</a>
      </p>
    </div>
  );
}

export default Footer;
