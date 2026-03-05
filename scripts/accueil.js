/**
 * Anime chaque élément ayant la classe "titre" en appliquant un mouvement flottant
 * @param {void}
 * @returns {void}
 */
// Sélection de tous les éléments avec la classe "titre"
document.querySelectorAll('.titre').forEach(el => {

    // Position actuelle du titre
    let pos = { x: 0, y: 0 };

    // Vitesse actuelle du titre
    let vel = { x: 0, y: 0 };

    // Temps initial aléatoire pour désynchroniser les animations
    let temps = Math.random() * 1000;

    function animerTitre() {

        // Incrémentation progressive du temps
        temps += 0.01;

        // Ajout d’une variation sinusoïdale à la vitesse horizontale
        vel.x += Math.sin(temps) * 0.0025;

        // Ajout d’une variation cosinusoïdale à la vitesse verticale
        vel.y += Math.cos(temps * 0.8) * 0.0025;

        // Application d’un amortissement pour ralentir le mouvement
        vel.x *= 0.97;
        vel.y *= 0.97;

        // Mise à jour de la position selon la vitesse
        pos.x += vel.x;
        pos.y += vel.y;

        // Application du déplacement avec transform
        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

        // Boucle d’animation continue
        requestAnimationFrame(animerTitre);
    }

    // Lancement de l’animation pour chaque titre
    animerTitre();
});


// Appliquer les offsets à chaque forme secondaire
document.querySelectorAll('.forme.secondaire').forEach(svg => {

    // Récupération des offsets depuis les attributs data (ou 0 par défaut)
    const offsetX = svg.dataset.offsetX || 0;
    const offsetY = svg.dataset.offsetY || 0;

    // Application des variables CSS personnalisées
    svg.style.setProperty('--offset-x', `${offsetX}px`);
    svg.style.setProperty('--offset-y', `${offsetY}px`);
});