// Sélection de la section d’introduction
const introduction = document.querySelector("#intro");

// Sélection du titre de l’introduction
const titreIntro = document.querySelector("#titre-intro");

// Temps de départ de l’animation
let debut = null;

// Durées des différentes animations
const dureeFondu = 3000;  
const dureeAnimationTitre = 1500; 
const dureeShake = 3000;  

function animer(tempsActuel) {

    // Initialisation du temps de départ
    if (!debut) debut = tempsActuel;

    // Temps écoulé depuis le début
    const progression = tempsActuel - debut;

    // Fondu du fond noir
    const progressionFondu = Math.min(progression / dureeFondu, 1);
    introduction.style.background = `rgba(0,0,0,${1 - progressionFondu})`;

    // Animation du titre
    const progressionTitre = Math.min(progression / dureeAnimationTitre, 1);

    // Apparition progressive
    titreIntro.style.opacity = progressionTitre;

    // Déplacement vertical progressif (-100px vers 0px)
    titreIntro.style.transform = 
        `translateY(${ -100 + (100 * progressionTitre)}px)`;

    // Continuer l’animation tant que le fondu n’est pas terminé
    if (progression < dureeFondu) {
        requestAnimationFrame(animer);
    } 
}

// Déclenchement au clic sur le titre
titreIntro.addEventListener("click", () => {

    // Temps de départ du shake
    const start = Date.now();

    // Intervalle entre chaque mouvement
    const intervale = 30;

    // Intensité maximale du shake
    const maxX = 6;
    const maxY = 6;
    const maxR = 2;

    const shaker = setInterval(() => {

        // Temps écoulé depuis le début du shake
        const ecoule = Date.now() - start;

        // Arrêt du shake après la durée définie
        if (ecoule >= dureeShake) {
            clearInterval(shaker);
            document.body.style.transform = "";
            lancerSequenceFinale();
            return;
        }

        // Génération d’un déplacement aléatoire
        const x = (Math.random() * 2 - 1) * maxX;
        const y = (Math.random() * 2 - 1) * maxY;
        const r = (Math.random() * 2 - 1) * maxR;

        // Application du déplacement et de la rotation
        document.body.style.transform = 
            `translate(${x}px, ${y}px) rotate(${r}deg)`;

    }, intervale);

});


function lancerSequenceFinale(){

    // Création d’un overlay couvrant la page
    const overlay = document.createElement("div");
    overlay.id = "overlay-final";
    document.body.appendChild(overlay);

    // Losange
    const losange = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    losange.setAttribute("viewBox", "0 0 300 200");
    losange.setAttribute("class", "forme-svg");

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", "150,0 300,100 150,200 0,100");
    polygon.setAttribute("fill", "yellow");

    losange.appendChild(polygon);

    // Cercle 
    const cercle = document.createElement("div");
    cercle.className = "forme cercle";

    // Triangle 
    const triangle = document.createElement("div");
    triangle.className = "forme triangle";

    // Ajout des formes à l’overlay
    overlay.appendChild(losange);
    overlay.appendChild(cercle);
    overlay.appendChild(triangle);

    // Activation de la transition CSS
    requestAnimationFrame(()=>{
        overlay.classList.add("visible");
    });

    // Après 5 secondes, déclencher la disparition
    setTimeout(()=>{
        overlay.classList.add("fade-out-formes");

        // Redirection après la fin du fondu
        setTimeout(()=>{
            location.href = "accueil.html";
        },1000);

    },5000);
}

// Lancement initial de l’animation
requestAnimationFrame(animer);