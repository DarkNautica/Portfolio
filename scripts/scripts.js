document.addEventListener('DOMContentLoaded', function() {
    // Check if the About section exists to apply typewriter effect
    const aboutElement = document.getElementById('about-text');
    if (aboutElement) {
        // Typewriter Effect
        const aboutText = "I'm learning <span class='code-html'>HTML</span>, <span class='code-css'>CSS</span>, <span class='code-js'>JavaScript</span>, and <span class='code-csharp'>C#</span>.";
        let index = 0;
        let isTag = false;
        let text = '';

        function typeWriter() {
            text += aboutText[index];
            if (aboutText[index] === '<') isTag = true;
            if (aboutText[index] === '>') isTag = false;

            aboutElement.innerHTML = text;
            index++;
            if (index < aboutText.length) {
                setTimeout(typeWriter, isTag ? 0 : 50);
            }
        }

        typeWriter();
    }

    // Progress Bars (Sliders)
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        const proficiencyLevels = [
            { width: '60%', color: '#178600' },  // C# - Green
            { width: '30%', color: '#e34c26' },  // HTML - Red
            { width: '30%', color: '#563d7c' },  // CSS - Purple
            { width: '30%', color: '#f1e05a' }   // JavaScript - Yellow
        ];

        function fillBars() {
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = proficiencyLevels[index].width;
                    bar.style.backgroundColor = proficiencyLevels[index].color;
                }, index * 500);
            });
        }
        fillBars();
    }

    // Dark Mode Toggle
    const toggleSwitch = document.getElementById('dark-mode-toggle');
    if (toggleSwitch) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }

        function switchTheme(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        }

        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // GitHub API Integration (if on the projects page)
    const projectSection = document.getElementById('github-projects');
    if (projectSection) {
        fetch('https://api.github.com/users/YOUR_USERNAME/repos')
            .then(response => response.json())
            .then(data => {
                data.forEach(repo => {
                    const projectItem = document.createElement('div');
                    projectItem.innerHTML = `<h3>${repo.name}</h3><p>${repo.description}</p>`;
                    projectSection.appendChild(projectItem);
                });
            });
    }

    // Form Validation (if on the contact page)
    const form = document.getElementById('contact-form');
    if (form) {
        const emailInput = document.getElementById('email');
        form.addEventListener('submit', function(e) {
            if (!emailInput.value.includes('@')) {
                e.preventDefault();
                emailInput.classList.add('error');
                alert('Please enter a valid email');
            }
        });
    }

    // Floating Particles Effect
    const particleContainer = document.querySelector('.particles');
    if (particleContainer) {
        const numParticles = 50;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            particleContainer.appendChild(particle);
        }
    }

    // Code Playground Logic
    function runCode() {
        const htmlCode = document.getElementById("html-code").value;
        const cssCode = "<style>" + document.getElementById("css-code").value + "</style>";
        const jsCode = "<script>" + document.getElementById("js-code").value + "<\/script>";
        const previewWindow = document.getElementById("preview-window").contentWindow.document;

        previewWindow.open();
        previewWindow.write(htmlCode + cssCode + jsCode);
        previewWindow.close();
    }

    // Make runCode function accessible globally
    window.runCode = runCode;

    // Ripple effect on click
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX - this.offsetLeft}px`;
            ripple.style.top = `${e.clientY - this.offsetTop}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600); // Removes the ripple after the animation
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, // Duration of the animation in milliseconds
    });

    // Mini-Game Logic
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    
    canvas.width = 300;
    canvas.height = 400;

    let gameInterval;
    let fallingObjects = [];
    let player = { x: 130, y: 370, width: 50, height: 10 };
    let score = 0;
    let gameOver = false;

    // Start game button
    startButton.addEventListener('click', startGame);

    function startGame() {
        fallingObjects = [];
        score = 0;
        gameOver = false;
        gameInterval = setInterval(updateGame, 20);
        startButton.disabled = true;
    }

    // Function to create falling objects
    function createFallingObject() {
        const size = Math.random() * 20 + 10;
        const x = Math.random() * (canvas.width - size);
        const speed = Math.random() * 2 + 1;
        fallingObjects.push({ x: x, y: 0, size: size, speed: speed });
    }

    // Function to update the game state
    function updateGame() {
        if (Math.random() < 0.05) {
            createFallingObject();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw player paddle
        ctx.fillStyle = '#007BFF';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw falling objects
        for (let i = 0; i < fallingObjects.length; i++) {
            const obj = fallingObjects[i];
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();
            obj.y += obj.speed;

            // Check if the object hits the player
            if (obj.y + obj.size > player.y && obj.x > player.x && obj.x < player.x + player.width) {
                score++;
                fallingObjects.splice(i, 1);
                i--;
            } else if (obj.y > canvas.height) {
                gameOver = true;
            }
        }

        // Game over logic
        if (gameOver) {
            clearInterval(gameInterval);
            ctx.font = '20px Courier New';
            ctx.fillStyle = 'black';
            ctx.fillText('Game Over', 100, 200);
            ctx.fillText(`Score: ${score}`, 110, 230);
            startButton.disabled = false;
        }

        // Draw score
        ctx.font = '16px Courier New';
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${score}`, 10, 20);
    }

    // Move player with mouse
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        player.x = mouseX - player.width / 2;
    });

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
});
