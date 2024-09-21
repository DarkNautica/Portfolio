document.addEventListener('DOMContentLoaded', function() {
    // Typewriter Effect
    const aboutText = "I'm learning <span class='code-html'>HTML</span>, <span class='code-css'>CSS</span>, <span class='code-js'>JavaScript</span>, and <span class='code-csharp'>C#</span>.";
    const aboutElement = document.getElementById('about-text');
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

    // Progress Bars
    const progressBars = document.querySelectorAll('.progress-bar');
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

    // Dark Mode Toggle
    const toggleSwitch = document.getElementById('dark-mode-toggle');

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

    // GitHub API Integration
    fetch('https://api.github.com/users/YOUR_USERNAME/repos')
        .then(response => response.json())
        .then(data => {
            const projectSection = document.getElementById('github-projects');
            data.forEach(repo => {
                const projectItem = document.createElement('div');
                projectItem.innerHTML = `<h3>${repo.name}</h3><p>${repo.description}</p>`;
                projectSection.appendChild(projectItem);
            });
        });

    // Form Validation
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    form.addEventListener('submit', function(e) {
        if (!emailInput.value.includes('@')) {
            e.preventDefault();
            emailInput.classList.add('error');
            alert('Please enter a valid email');
        }
    });

    // Floating Particles Effect
    const numParticles = 50;
    const particleContainer = document.querySelector('.particles');

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${5 + Math.random() * 10}s`;
        particleContainer.appendChild(particle);
    }
});
