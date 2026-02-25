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

// document.body{
//     let pos = { x: 0, y: 0 };
//     let vel = { x: 0, y: 0 };

//     let temps = Math.random() * 1000;

//     function shake() {
//         temps += 0.01;

//         vel.x += Math.sin(temps) * 2;
//         vel.y += Math.cos(temps * 0.8) * 2;

//         vel.x *= 0.97;
//         vel.y *= 0.97;

//         pos.x += vel.x;
//         pos.y += vel.y;

//         requestAnimationFrame(shake);
//     }
// };

// titreIntro.addEventListener("click", ()=>{
//     shake();
//     setTimeout(()=>{location.href="accueil.html"}, 3000);
// });

function quake() {
    document.body.classList.add("shake");
}