const introduction = document.querySelector("#intro");
const titreIntro = document.querySelector("#titre-intro");

let debut = null;

const dureeFondu = 3000;  
const dureeAnimationTitre = 1500; 
const dureeShake = 3000;  

function animer(tempsActuel) {

    if (!debut) debut = tempsActuel;

    const progression = tempsActuel - debut;

    // Fondu
    const progressionFondu = Math.min(progression / dureeFondu, 1);
    introduction.style.background = `rgba(0,0,0,${1 - progressionFondu})`;

    // Titre
    const progressionTitre = Math.min(progression / dureeAnimationTitre, 1);

    titreIntro.style.opacity = progressionTitre;
    titreIntro.style.transform = `translateY(${ -100 + (100 * progressionTitre)}px)`;

    if (progression < dureeFondu) {
        requestAnimationFrame(animer);
    } 
}

titreIntro.addEventListener("click", () => {

    const start = Date.now();
    const intervale = 30;
    const maxX = 6;
    const maxY = 6;
    const maxR = 2;

    const shaker = setInterval(() => {

        const ecoule = Date.now() - start;

        if (ecoule >= dureeShake) {
            clearInterval(shaker);
            document.body.style.transform = "";
            lancerSequenceFinale();
            return;
        }

        const x = (Math.random() * 2 - 1) * maxX;
        const y = (Math.random() * 2 - 1) * maxY;
        const r = (Math.random() * 2 - 1) * maxR;

        document.body.style.transform = 
            `translate(${x}px, ${y}px) rotate(${r}deg)`;

    }, intervale);

});


function lancerSequenceFinale(){

    const overlay = document.createElement("div");
    overlay.id = "overlay-final";
    document.body.appendChild(overlay);

    /* ===== LOSANGE SVG ===== */
    const losange = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    losange.setAttribute("viewBox", "0 0 300 200");
    losange.setAttribute("class", "forme-svg");

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", "150,0 300,100 150,200 0,100");
    polygon.setAttribute("fill", "yellow");

    losange.appendChild(polygon);

    /* ===== CERCLE ===== */
    const cercle = document.createElement("div");
    cercle.className = "forme cercle";

    /* ===== TRIANGLE ===== */
    const triangle = document.createElement("div");
    triangle.className = "forme triangle";

    overlay.appendChild(losange);
    overlay.appendChild(cercle);
    overlay.appendChild(triangle);

    requestAnimationFrame(()=>{
        overlay.classList.add("visible");
    });

    setTimeout(()=>{
        overlay.classList.add("fade-out-formes");

        setTimeout(()=>{
            location.href = "accueil.html";
        },1000);

    },5000);
}

requestAnimationFrame(animer);