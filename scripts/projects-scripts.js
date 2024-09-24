document.addEventListener('DOMContentLoaded', function() {
    const githubProjectsContainer = document.getElementById('github-projects');

    async function fetchGitHubRepos() {
        const username = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
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
            if (repo.name === `${repo.owner.login}.github.io` || repo.name === "YOUR_GITHUB_PAGES_REPO_NAME") {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <a href="${repo.html_url}" target="_blank">View Project</a>
                `;

                githubProjectsContainer.appendChild(projectCard);
            }
        });
    }

    fetchGitHubRepos();
});
