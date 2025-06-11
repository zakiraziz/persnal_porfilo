import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import DescriptionIcon from "@material-ui/icons/Description";
import { Tooltip, IconButton, Button } from "@material-ui/core";
import "../styles/Home.css";

function Home() {
  const handleEmailClick = () => {
    window.location.href = "mailto:pedro@example.com";
  };

  const handleResumeClick = () => {
    // Replace with your actual resume URL
    window.open("https://example.com/pedro-resume.pdf", "_blank");
  };

  return (
    <div className="home">
      <div className="about">
        <h2> Hi, My Name is Pedro</h2>
        <div className="prompt">
          <p className="tagline">
            A passionate full-stack developer with {new Date().getFullYear() - 2020}+ years of experience 
            building scalable web applications and solving complex problems.
          </p>
          <div className="social-icons">
            <Tooltip title="LinkedIn Profile" arrow>
              <IconButton 
                aria-label="LinkedIn" 
                onClick={() => window.open("https://linkedin.com/in/pedro", "_blank")}
              >
                <LinkedInIcon className="icon" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Send Email" arrow>
              <IconButton aria-label="Email" onClick={handleEmailClick}>
                <EmailIcon className="icon" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="GitHub Profile" arrow>
              <IconButton 
                aria-label="GitHub"
                onClick={() => window.open("https://github.com/pedro", "_blank")}
              >
                <GithubIcon className="icon" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Download Resume" arrow>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DescriptionIcon />}
                onClick={handleResumeClick}
                className="resume-button"
              >
                Resume
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      
      <div className="skills">
        <h1> Skills</h1>
        <ol className="list">
          <li className="item">
            <h2> Front-End</h2>
            <span>
              ReactJS, Angular, Redux, HTML5, CSS3, SASS, React Native, Flutter,
              NPM, Ionic, BootStrap, MaterialUI, Yarn, TailwindCSS, StyledComponents,
              Next.js, Gatsby, Webpack, Babel
            </span>
          </li>
          <li className="item">
            <h2>Back-End</h2>
            <span>
              NodeJS, Express, NestJS, Java Spring, .NET Core, Django,
              GraphQL, ApolloServer, REST APIs, MySQL, PostgreSQL, MongoDB,
              DynamoDB, Firebase, Docker, Kubernetes, AWS, DigitalOcean
            </span>
          </li>
          <li className="item">
            <h2>Languages</h2>
            <span>
              JavaScript (ES6+), TypeScript, Java, Python, C#, C, C++, Go, Ruby,
              Swift, Kotlin
            </span>
          </li>
          <li className="item">
            <h2>Other Technologies</h2>
            <span>
              Git, CI/CD, Jenkins, GitHub Actions, JIRA, Agile/Scrum, Figma,
              Adobe XD, TensorFlow (Basic), Blockchain (Basic), Web3.js
            </span>
          </li>
        </ol>
      </div>

      <div className="stats">
        <h1>Quick Stats</h1>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <h3>20+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Technologies Mastered</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Passion for Coding</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
