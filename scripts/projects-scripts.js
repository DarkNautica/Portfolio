document.addEventListener('DOMContentLoaded', function() {
    const githubProjectsContainer = document.getElementById('github-projects');

    async function fetchGitHubRepos() {
        const username = 'DarkNautica'; // Replace with your GitHub username
        const apiUrl = `https://api.github.com/users/${username}/repos`;
        
        try {
            const response = await fetch(apiUrl);
            const repos = await response.json();

            if (repos.length > 0) {
                displayProjects(repos);
            } else {
                githubProjectsContainer.innerHTML = '<p>No repositories found.</p>';
            }
        } catch (error) {
            githubProjectsContainer.innerHTML = '<p>Failed to load projects.</p>';
            console.error('Error fetching GitHub repositories:', error);
        }
    }

    function displayProjects(repos) {
        repos.forEach(repo => {
            // Add another condition for the additional project (e.g., "NetflixClone" project)
            if (repo.name === `${repo.owner.login}.github.io` || repo.name === "FormProject" || repo.name === "Netflix-Remake") {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                // Add a placeholder image to the left of the project card
                projectCard.innerHTML = `
                    <div class="project-content">
                        <img src="https://via.placeholder.com/150" alt="Project Image" class="project-image" />
                        <div class="project-info">
                            <h3>${repo.name}</h3>
                            <p>${repo.description || 'No description available.'}</p>
                            <a href="${repo.html_url}" target="_blank">View Project</a>
                        </div>
                    </div>
                `;

                githubProjectsContainer.appendChild(projectCard);
            }
        });
    }

    fetchGitHubRepos();
});
