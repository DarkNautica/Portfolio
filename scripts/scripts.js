document.addEventListener('DOMContentLoaded', function() {
    // Existing code for various features...

    // GitHub Profile Fetcher
    const fetchButton = document.getElementById('fetch-profile');
    const usernameInput = document.getElementById('github-username');
    const profileDisplay = document.getElementById('profile-display');
    const avatarImg = document.getElementById('profile-avatar');
    const nameEl = document.getElementById('profile-name');
    const bioEl = document.getElementById('profile-bio');
    const followersEl = document.getElementById('profile-followers');
    const followingEl = document.getElementById('profile-following');
    const reposEl = document.getElementById('profile-repos');
    const repoListEl = document.getElementById('repo-list');

    fetchButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (username) {
            fetchGitHubProfile(username);
        } else {
            alert("Please enter a valid GitHub username.");
        }
    });

    async function fetchGitHubProfile(username) {
        const url = `https://api.github.com/users/${username}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                displayProfile(data);
                fetchRepos(username);
            } else {
                alert("User not found. Please try another username.");
                profileDisplay.style.display = 'none';
            }
        } catch (error) {
            console.error("Error fetching GitHub profile:", error);
            alert('Failed to fetch GitHub profile.');
        }
    }

    function displayProfile(data) {
        profileDisplay.style.display = 'block';
        avatarImg.src = data.avatar_url;
        nameEl.textContent = data.name || "No Name Available";
        bioEl.textContent = data.bio || "No Bio Available";
        followersEl.textContent = data.followers;
        followingEl.textContent = data.following;
        reposEl.textContent = data.public_repos;
    }

    async function fetchRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const repos = await response.json();
                displayRepos(repos);
            } else {
                console.error("Error fetching repos");
                alert('Failed to fetch repositories.');
            }
        } catch (error) {
            console.error("Error fetching GitHub repos:", error);
            alert('Failed to fetch repositories.');
        }
    }

    function displayRepos(repos) {
        repoListEl.innerHTML = ''; // Clear previous list
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong> - ${repo.description || 'No description'}`;
            repoListEl.appendChild(repoItem);
        });
    }

    // Rest of your existing script for features and interactions...
});
