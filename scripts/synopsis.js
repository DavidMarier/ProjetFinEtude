// Sélection de tous les éléments avec la classe losange
document.querySelectorAll('.losange').forEach(el => {

    // Position actuelle du losange
    let pos = { x: 0, y: 0 };

    // Vitesse actuelle du losange
    let vel = { x: 0, y: 0 };

    // Temps initial aléatoire pour désynchroniser les animations
    let temps = Math.random() * 1000;

    function animerLosange() {

        // Incrémentation progressive du temps
        temps += 0.01;

        // Variation sinusoïdale horizontale très légère
        vel.x += Math.sin(temps) * 0.0005;

        // Variation cosinusoïdale verticale très légère
        vel.y += Math.cos(temps * 0.8) * 0.0005;

        // Application d’un amortissement pour adoucir le mouvement
        vel.x *= 0.98;
        vel.y *= 0.98;

        // Mise à jour de la position selon la vitesse
        pos.x += vel.x;
        pos.y += vel.y;

        // Application du déplacement avec transform
        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

        // Boucle d’animation continue
        requestAnimationFrame(animerLosange);
    }

    // Lancement de l’animation pour chaque losange
    animerLosange();
});