import React, { useState } from "react";
import ProjectItem from "../components/ProjectItem";
import { ProjectList } from "../helpers/ProjectList";
import "../styles/Projects.css";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("all");

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(ProjectList.flatMap(project => project.technologies || []))
  );

  // Filter projects based on search term and technology filter
  const filteredProjects = ProjectList.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = filterTech === "all" || 
                       (project.technologies && project.technologies.includes(filterTech));
    return matchesSearch && matchesTech;
  });

  return (
    <div className="projects">
      <h1>My Personal Projects</h1>
      
      {/* Search and filter section */}
      <div className="projects-controls">
        <input
          type="text"
          placeholder="Search projects..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select 
          onChange={(e) => setFilterTech(e.target.value)}
          className="tech-filter"
          value={filterTech}
        >
          <option value="all">All Technologies</option>
          {allTechnologies.map((tech, index) => (
            <option key={index} value={tech}>{tech}</option>
          ))}
        </select>
      </div>

      {/* Project count */}
      <div className="project-count">
        Showing {filteredProjects.length} of {ProjectList.length} projects
      </div>

      {/* Project list */}
      <div className="projectList">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectItem 
              key={project.id || idx}
              id={idx}
              name={project.name}
              image={project.image}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveDemoUrl={project.liveDemoUrl}
            />
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
