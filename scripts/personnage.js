const personnage = document.querySelector("#personnage");
const limites = document.querySelector("#limites");
const oeilGauche = document.querySelector("#oeil-g");
const oeilDroite = document.querySelector("#oeil-d");

const largeurFenetre = window.innerWidth;
const hauteurZone = limites.getBoundingClientRect().height;

// Variables physiques

let posX = window.innerWidth / 2 - personnage.offsetWidth / 2;
let posY = 0;

let vitesseX = 0;
let vitesseY = 0;

const gravite = 0.4;
const frottement = 0.99;
const coefficientRebond = 0.4;

let glisse = false;

let derniereSourisX = 0;
let derniereSourisY = 0;

// Pupilles - suivi souris
const yeux = [oeilGauche, oeilDroite];
const distanceMax = 20;
let sourisX = posX + personnage.offsetWidth / 2;
let sourisY = posY + personnage.offsetHeight / 2;

// Gestion des collisions

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
        // Gravité
        vitesseY += gravite;

        // Mise à jour position
        posX += vitesseX;
        posY += vitesseY;

        // Appliquer friction
        vitesseX *= frottement;
        vitesseY *= frottement;
    }

    gestionCollisions();

    personnage.style.left = posX + "px";
    personnage.style.top = posY + "px";

    // Mise à jour yeux
    yeux.forEach(oeil => {
        const rect = oeil.getBoundingClientRect();
        const centreX = rect.left + rect.width / 2;
        const centreY = rect.top + rect.height / 2;

        // Calcul distance souris vers centre œil
        const dx = sourisX - centreX;
        const dy = sourisY - centreY;

        // Limiter distance pupille
        const distance = Math.sqrt(dx*dx + dy*dy);
        const ratio = Math.min(distanceMax / distance, 1);

        const x = dx * ratio;
        const y = dy * ratio;

        // Mouvement (interpolation)
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

    requestAnimationFrame(update);
}

// Drag souris

personnage.addEventListener("mousedown", (e) => {
    glisse = true;

    vitesseX = 0;
    vitesseY = 0;

    derniereSourisX = e.pageX;
    derniereSourisY = e.pageY;

    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    sourisX = e.pageX;
    sourisY = e.pageY;

    if (glisse) {
        const sourisMX = e.pageX;
        const sourisMY = e.pageY;

        posX = sourisMX - personnage.offsetWidth / 2;
        posY = sourisMY - personnage.offsetHeight / 2;

        vitesseX = sourisMX - derniereSourisX;
        vitesseY = sourisMY - derniereSourisY;

        derniereSourisX = sourisMX;
        derniereSourisY = sourisMY;
    }
});

document.addEventListener("mouseup", () => {
    glisse = false;
});

// Initialisation

update();
