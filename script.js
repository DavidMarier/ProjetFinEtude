document.querySelectorAll('.titre').forEach(el => {
    let pos = { x: 0, y: 0 };
    let vel = { x: 0, y: 0 };

    let temps = Math.random() * 1000;

    function animerTitre() {
        temps += 0.01;

        vel.x += Math.sin(temps) * 0.002;
        vel.y += Math.cos(temps * 0.8) * 0.002;

        vel.x *= 0.98;
        vel.y *= 0.98;

        pos.x += vel.x;
        pos.y += vel.y;

        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

        requestAnimationFrame(animerTitre);
    }

    animerTitre();
});
