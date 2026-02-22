const sonIntro = new Audio('./son/vertige.mp3');
sonIntro.loop = true;

document.addEventListener('pointerdown', () => {
    sonIntro.play()
}, { once: true });