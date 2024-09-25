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
        if (repo.name === `${repo.owner.login}.github.io` || repo.name === "FormProject" || repo.name === "Netflix-Remake") {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            // Manually assign image URLs based on project name
            let projectImageUrl = 'https://via.placeholder.com/150'; // Default placeholder image

            if (repo.name === "FormProject") {
                projectImageUrl = "FormProject-Icon.png"; // Replace with actual image URL
            } else if (repo.name === "Netflix-Remake") {
                projectImageUrl = "Netflix-Remake-Icon.png"; // Replace with actual image URL
            }

            const liveSiteUrl = `https://${repo.owner.login}.github.io/${repo.name}`;

            // Add project image and buttons
            projectCard.innerHTML = `
                <div class="project-content">
                    <img src="${projectImageUrl}" alt="Project Image" class="project-image" />
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available.'}</p>
                        <a href="${repo.html_url}" target="_blank" class="project-button">View Project</a>
                        <a href="${liveSiteUrl}" target="_blank" class="project-button">Visit Site</a>
                    </div>
                </div>
            `;

            githubProjectsContainer.appendChild(projectCard);
        }
    });
}



    fetchGitHubRepos();
});
