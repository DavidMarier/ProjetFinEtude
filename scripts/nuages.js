// Sélection de la section qui contiendra les nuages
const sectionNuages = document.querySelector("#nuages");

// Nombre total de nuages à générer
const NOMBRE_NUAGES = 20;

// Tableau qui stocke tous les nuages créés
const listeNuages = [];

function creerNuage() {
    // Création d’un élément div pour représenter un nuage
    const elementNuage = document.createElement("div");

    // Dimensions aléatoires
    const largeur = Math.random() * 200 + 100;   // 100 à 300px
    const hauteur = Math.random() * 80 + 40;     // 40 à 120px

    // Opacité aléatoire
    const opacite = Math.random() * 0.8 + 0.1; // 0.1 à 0.9

    // Vitesse proportionnelle à l'opacité
    const vitesse = opacite * 2;

    // Positionnement absolu du nuage
    elementNuage.style.position = "absolute";

    // Application des dimensions
    elementNuage.style.width = largeur + "px";
    elementNuage.style.height = hauteur + "px";

    // Couleur blanche avec opacité variable
    elementNuage.style.backgroundColor = `rgba(255,255,255,${opacite})`;

    // Position verticale aléatoire dans la section
    elementNuage.style.top =
        Math.random() * (sectionNuages.offsetHeight - hauteur) + "px";

    // Position initiale à droite de l’écran
    elementNuage.style.left = window.innerWidth + "px";

    // Ajout du nuage dans la section
    sectionNuages.appendChild(elementNuage);

    // Retourne un objet contenant les propriétés utiles à l’animation
    return {
        element: elementNuage,
        positionX: window.innerWidth,
        vitesse: vitesse,
        largeur: largeur
    };
}

function initialiserNuages() {
    // Création du nombre défini de nuages
    for (let i = 0; i < NOMBRE_NUAGES; i++) {
        listeNuages.push(creerNuage());
    }
}

function animerNuages() {
    // Parcours de tous les nuages
    listeNuages.forEach(nuage => {

        // Déplacement vers la gauche selon la vitesse
        nuage.positionX -= nuage.vitesse;

        // Si le nuage sort à gauche
        if (nuage.positionX < -nuage.largeur) {

            // Réapparition à droite de l’écran
            nuage.positionX = window.innerWidth;
        }

        // Mise à jour de la position horizontale
        nuage.element.style.left = nuage.positionX + "px";
    });

    // Boucle d’animation continue
    requestAnimationFrame(animerNuages);
}

// Initialisation des nuages
initialiserNuages();

// Lancement de l’animation
animerNuages();