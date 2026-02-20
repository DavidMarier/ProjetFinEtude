const introduction = document.querySelector("#intro");
const titreIntro = document.querySelector("#titre-intro");

let debut = null;

const dureeFondu = 3000;   // durée du fondu
const dureeAnimationTitre = 1500; // durée animation du titre

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

requestAnimationFrame(animer);