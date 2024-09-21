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

    // Animate the progress bars when the skills section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress-bar').forEach((bar) => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
        });
    });

    observer.observe(document.querySelector('#skills'));
});
