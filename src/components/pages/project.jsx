import React, { useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import { ProjectList } from "../helpers/ProjectList";
import "../styles/Projects.css";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteProjects");
    if (savedFavorites) {
      setFavoriteProjects(JSON.parse(savedFavorites));
    }
  }, []);

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(ProjectList.flatMap(project => project.technologies || []))
  ).sort();

  // Toggle project favorite status
  const toggleFavorite = (projectId) => {
    const newFavorites = favoriteProjects.includes(projectId)
      ? favoriteProjects.filter(id => id !== projectId)
      : [...favoriteProjects, projectId];
    
    setFavoriteProjects(newFavorites);
    localStorage.setItem("favoriteProjects", JSON.stringify(newFavorites));
  };

  // Filter projects based on search term, technology filter, and favorites
  const filteredProjects = ProjectList
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = filterTech === "all" || 
                         (project.technologies && project.technologies.includes(filterTech));
      const matchesFavorites = !showOnlyFavorites || favoriteProjects.includes(project.id || ProjectList.indexOf(project));
      
      return matchesSearch && matchesTech && matchesFavorites;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "date") {
        return new Date(b.date || 0) - new Date(a.date || 0);
      } else if (sortBy === "favorites") {
        const aIsFavorite = favoriteProjects.includes(a.id || ProjectList.indexOf(a));
        const bIsFavorite = favoriteProjects.includes(b.id || ProjectList.indexOf(b));
        return bIsFavorite - aIsFavorite;
      }
      return 0;
    });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterTech("all");
    setSortBy("default");
    setShowOnlyFavorites(false);
  };

  return (
    <div className="projects">
      <header className="projects-header">
        <h1>My Personal Projects</h1>
        <p className="projects-subtitle">Browse through my collection of work</p>
      </header>
      
      {/* Search and filter section */}
      <div className="projects-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search projects..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            value={searchTerm}
          />
          {searchTerm && (
            <button 
              className="clear-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="filter-group">
          <label htmlFor="tech-filter">Technology:</label>
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
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by"
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-by"
            value={sortBy}
          >
            <option value="default">Default</option>
            <option value="name">Name (A-Z)</option>
            <option value="date">Date (Newest)</option>
            <option value="favorites">Favorites First</option>
          </select>
        </div>

        <div className="filter-group favorites-toggle">
          <input
            type="checkbox"
            id="show-favorites"
            checked={showOnlyFavorites}
            onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
          />
          <label htmlFor="show-favorites">Show Favorites Only</label>
        </div>

        {(searchTerm || filterTech !== "all" || sortBy !== "default" || showOnlyFavorites) && (
          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Project count */}
      <div className="project-meta">
        <div className="project-count">
          Showing {filteredProjects.length} of {ProjectList.length} projects
          {filterTech !== "all" && ` (filtered by ${filterTech})`}
        </div>
        {showOnlyFavorites && (
          <div className="favorites-count">
            {favoriteProjects.length} favorite project(s)
          </div>
        )}
      </div>

      {/* Project list */}
      <div className="projectList">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => {
            const projectId = project.id || idx;
            const isFavorite = favoriteProjects.includes(projectId);
            
            return (
              <ProjectItem 
                key={projectId}
                id={projectId}
                name={project.name}
                image={project.image}
                description={project.description}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveDemoUrl={project.liveDemoUrl}
                date={project.date}
                isFavorite={isFavorite}
                onToggleFavorite={() => toggleFavorite(projectId)}
              />
            );
          })
        ) : (
          <div className="no-projects">
            <p>No projects found matching your criteria.</p>
            <button onClick={resetFilters} className="reset-filters">
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="projects-footer">
        <p>Want to see more? Check out my <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      </footer>
    </div>
  );
}

export default Projects;
