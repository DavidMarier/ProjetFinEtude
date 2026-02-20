const sectionNuages = document.querySelector("#nuages");

const NOMBRE_NUAGES = 20;
const listeNuages = [];

function creerNuage() {
    const elementNuage = document.createElement("div");

    // Dimensions aléatoires
    const largeur = Math.random() * 200 + 100;   // 100 à 300px
    const hauteur = Math.random() * 80 + 40;     // 40 à 120px

    // Opacité aléatoire
    const opacite = Math.random() * 0.8 + 0.1; // 0.1 à 0.9

    // Vitesse proportionnelle à l'opacité
    const vitesse = opacite * 2;

    elementNuage.style.position = "absolute";
    elementNuage.style.width = largeur + "px";
    elementNuage.style.height = hauteur + "px";
    elementNuage.style.backgroundColor = `rgba(255,255,255,${opacite})`;
    elementNuage.style.top =
        Math.random() * (sectionNuages.offsetHeight - hauteur) + "px";
    elementNuage.style.left = window.innerWidth + "px";

    sectionNuages.appendChild(elementNuage);

    return {
        element: elementNuage,
        positionX: window.innerWidth,
        vitesse: vitesse,
        largeur: largeur
    };
}

function initialiserNuages() {
    for (let i = 0; i < NOMBRE_NUAGES; i++) {
        listeNuages.push(creerNuage());
    }
}

function animerNuages() {
    listeNuages.forEach(nuage => {
        nuage.positionX -= nuage.vitesse;

        // Si le nuage sort à gauche
        if (nuage.positionX < -nuage.largeur) {
            nuage.positionX = window.innerWidth;
        }

        nuage.element.style.left = nuage.positionX + "px";
    });

    requestAnimationFrame(animerNuages);
}

initialiserNuages();
animerNuages();