document.addEventListener('DOMContentLoaded', function() {
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

    // Handle the filling of progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    // Set up an array of proficiency levels
    const proficiencyLevels = [
        { width: '60%', color: '#ffcc00' },  // C# - Intermediate
        { width: '30%', color: '#e34c26' },  // HTML - Beginner
        { width: '30%', color: '#563d7c' },  // CSS - Beginner
        { width: '30%', color: '#f1e05a' }   // JavaScript - Beginner
    ];

    // Function to animate each bar one after another
    function fillBars() {
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = proficiencyLevels[index].width;
                bar.style.backgroundColor = proficiencyLevels[index].color;
            }, index * 500); // Delay each bar by 0.5 seconds
        });
    }

    // Trigger the fill bars when the skills section is loaded
    fillBars();
});
