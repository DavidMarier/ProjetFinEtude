document.querySelectorAll('.titre').forEach(el => {
    let pos = { x: 0, y: 0 };
    let vel = { x: 0, y: 0 };

    let temps = Math.random() * 1000;

    function animerTitre() {
        temps += 0.01;

        vel.x += Math.sin(temps) * 0.0025;
        vel.y += Math.cos(temps * 0.8) * 0.0025;

        vel.x *= 0.97;
        vel.y *= 0.97;

        pos.x += vel.x;
        pos.y += vel.y;

        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

        requestAnimationFrame(animerTitre);
    }

    animerTitre();
});

// Appliquer les offsets à chaque forme secondaire
document.querySelectorAll('.forme.secondaire').forEach(svg => {
    const offsetX = svg.dataset.offsetX || 0;
    const offsetY = svg.dataset.offsetY || 0;
    svg.style.setProperty('--offset-x', `${offsetX}px`);
    svg.style.setProperty('--offset-y', `${offsetY}px`);
});

