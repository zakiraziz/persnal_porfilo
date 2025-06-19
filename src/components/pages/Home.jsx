import React, { useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import { ProjectList } from "../helpers/ProjectList";
import "../styles/Projects.css";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("all");
  const [sortOption, setSortOption] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProject, setExpandedProject] = useState(null);

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(ProjectList.flatMap(project => project.technologies || []))
    .sort();

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort projects
  const filteredProjects = ProjectList.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = filterTech === "all" || 
                       (project.technologies && project.technologies.includes(filterTech));
    return matchesSearch && matchesTech;
  }).sort((a, b) => {
    if (sortOption === "recent") {
      return (b.date || b.id) - (a.date || a.id);
    } else if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "difficulty") {
      return (b.difficulty || 0) - (a.difficulty || 0);
    }
    return 0;
  });

  const toggleExpandProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterTech("all");
    setSortOption("recent");
  };

  if (isLoading) {
    return (
      <div className="projects-loading">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="projects">
      <h1>My Personal Projects</h1>
      <p className="projects-subtitle">Browse through my collection of work</p>
      
      {/* Search and filter section */}
      <div className="projects-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search projects by name or description..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            value={searchTerm}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="filter-group">
          <label htmlFor="tech-filter">Filter by Technology:</label>
          <select 
            id="tech-filter"
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

        <div className="filter-group">
          <label htmlFor="sort-option">Sort by:</label>
          <select 
            id="sort-option"
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-option"
            value={sortOption}
          >
            <option value="recent">Most Recent</option>
            <option value="name">Alphabetical</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>

        {(searchTerm || filterTech !== "all" || sortOption !== "recent") && (
          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Project count */}
      <div className="project-meta">
        <div className="project-count">
          Showing {filteredProjects.length} of {ProjectList.length} projects
        </div>
        {filterTech !== "all" && (
          <div className="active-filter">
            Filtering by: <span>{filterTech}</span>
          </div>
        )}
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
              date={project.date}
              difficulty={project.difficulty}
              isExpanded={expandedProject === (project.id || idx)}
              onExpandToggle={() => toggleExpandProject(project.id || idx)}
            />
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found matching your criteria.</p>
            <button onClick={resetFilters} className="reset-filters">
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Footer note */}
      {filteredProjects.length > 0 && (
        <div className="projects-footer">
          <p>Want to see more? Check out my <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub profile</a>.</p>
        </div>
      )}
    </div>
  );
}

export default Projects;
