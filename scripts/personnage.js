// Sélection des éléments
const personnage = document.querySelector("#personnage");
const limites = document.querySelector("#limites");
const oeilGauche = document.querySelector("#oeil-g");
const oeilDroite = document.querySelector("#oeil-d");

// Dimensions de la zone
const largeurFenetre = window.innerWidth;
const hauteurZone = limites.getBoundingClientRect().height;

// Position initiale (centré horizontalement)
let posX = window.innerWidth / 2 - personnage.offsetWidth / 2;
let posY = 0;

// Vitesse actuelle
let vitesseX = 0;
let vitesseY = 0;

// Constantes physiques
const gravite = 0.4;
const frottement = 0.99;
const coefficientRebond = 0.4;

// État de drag
let glisse = false;

// Position précédente de la souris
let derniereSourisX = 0;
let derniereSourisY = 0;

// Pupilles - suivi souris
const yeux = [oeilGauche, oeilDroite];
const distanceMax = 20;

// Position initiale de la souris (centre personnage)
let sourisX = posX + personnage.offsetWidth / 2;
let sourisY = posY + personnage.offsetHeight / 2;


/**
 * Gère les collisions du personnage avec les limites de la zone
 * @param {void}
 * @returns {void}
 */
function gestionCollisions() {

    const sol = hauteurZone - personnage.offsetHeight;

    // Sol
    if (posY >= sol) {
        posY = sol;
        vitesseY *= -coefficientRebond;
    }

    // Plafond
    if (posY <= 0) {
        posY = 0;
        vitesseY *= -coefficientRebond;
    }

    // Mur gauche
    if (posX <= 0) {
        posX = 0;
        vitesseX *= -coefficientRebond;
    }

    // Mur droit
    if (posX + personnage.offsetWidth >= largeurFenetre) {
        posX = largeurFenetre - personnage.offsetWidth;
        vitesseX *= -coefficientRebond;
    }
}


// Mise à jour physique

function update() {

    if (!glisse) {

        // Application de la gravité
        vitesseY += gravite;

        // Mise à jour des positions
        posX += vitesseX;
        posY += vitesseY;

        // Application du frottement
        vitesseX *= frottement;
        vitesseY *= frottement;
    }

    // Vérification des collisions
    gestionCollisions();

    // Application des positions au personnage
    personnage.style.left = posX + "px";
    personnage.style.top = posY + "px";

    // Mise à jour des pupilles
    yeux.forEach(oeil => {

        const rect = oeil.getBoundingClientRect();
        const centreX = rect.left + rect.width / 2;
        const centreY = rect.top + rect.height / 2;

        // Calcul de la distance souris → centre de l’œil
        const dx = sourisX - centreX;
        const dy = sourisY - centreY;

        // Limitation de la distance maximale
        const distance = Math.sqrt(dx*dx + dy*dy);
        const ratio = Math.min(distanceMax / distance, 1);

        const x = dx * ratio;
        const y = dy * ratio;

        // Interpolation pour un mouvement fluide
        const transformActuel = oeil.style.transform || "translate(0px,0px)";
        const match = transformActuel.match(/translate\((-?\d+\.?\d*)px, (-?\d+\.?\d*)px\)/);

        let curX = 0, curY = 0;
        if (match) {
            curX = parseFloat(match[1]);
            curY = parseFloat(match[2]);
        }

        const smoothX = curX + (x - curX) * 0.2;
        const smoothY = curY + (y - curY) * 0.2;

        oeil.style.transform = `translate(${smoothX}px, ${smoothY}px)`;
    });

    // Boucle d’animation continue
    requestAnimationFrame(update);
}


// Drag souris

personnage.addEventListener("mousedown", (e) => {

    // Activation du drag
    glisse = true;

    // Réinitialisation des vitesses
    vitesseX = 0;
    vitesseY = 0;

    // Stockage position souris
    derniereSourisX = e.pageX;
    derniereSourisY = e.pageY;

    e.preventDefault();
});


document.addEventListener("mousemove", (e) => {

    // Mise à jour position souris globale
    sourisX = e.pageX;
    sourisY = e.pageY;

    if (glisse) {

        const sourisMX = e.pageX;
        const sourisMY = e.pageY;

        // Centrage du personnage sous la souris
        posX = sourisMX - personnage.offsetWidth / 2;
        posY = sourisMY - personnage.offsetHeight / 2;

        // Calcul vitesse basée sur déplacement souris
        vitesseX = sourisMX - derniereSourisX;
        vitesseY = sourisMY - derniereSourisY;

        // Mise à jour position précédente
        derniereSourisX = sourisMX;
        derniereSourisY = sourisMY;
    }
});


document.addEventListener("mouseup", () => {

    // Désactivation du drag
    glisse = false;
});


// Initialisation de la boucle
update();