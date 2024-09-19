document.addEventListener('DOMContentLoaded', function() {
    const aboutText = "I'm learning <span class='code-html'>HTML</span>, <span class='code-css'>CSS</span>, <span class='code-js'>JavaScript</span>, and <span class='code-csharp'>C#</span>.";
    const aboutElement = document.getElementById('about-text');
    let index = 0;

    function typeWriter() {
        if (index < aboutText.length) {
            aboutElement.innerHTML += aboutText.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
});

