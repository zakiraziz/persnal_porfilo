import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LaunchIcon from "@material-ui/icons/Launch";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function ProjectItem({ image, name, id, description, technologies, githubLink, liveDemoLink }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleProjectClick = () => {
    navigate(`/project/${id}`);
  };

  const handleExternalLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`projectItem ${isHovered ? "hovered" : ""}`}
      onClick={handleProjectClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{ backgroundImage: `url(${image})` }} 
        className="bgImage"
      >
        {isHovered && (
          <div className="projectOverlay">
            <p className="projectDescription">{description}</p>
            <div className="technologies">
              {technologies?.map((tech, index) => (
                <span key={index} className="techTag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="projectInfo">
        <div className="projectHeader">
          <h2>{name}</h2>
          <div className="projectActions">
            <IconButton onClick={toggleLike} aria-label={isLiked ? "Unlike project" : "Like project"}>
              {isLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
        </div>
        
        <div className="projectLinks">
          {githubLink && (
            <Tooltip title="View code" arrow>
              <IconButton
                onClick={(e) => handleExternalLinkClick(e, githubLink)}
                aria-label="GitHub repository"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          )}
          
          {liveDemoLink && (
            <Tooltip title="Live demo" arrow>
              <IconButton
                onClick={(e) => handleExternalLinkClick(e, liveDemoLink)}
                aria-label="Live demo"
              >
                <LaunchIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
