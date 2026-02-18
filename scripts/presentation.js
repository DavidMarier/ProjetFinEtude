const personnage = document.querySelector("#personnage");

// Gestion des collisions

const limites = document.querySelector("#limites");

const largeur = window.innerWidth;
const hauteur = limites.getBoundingClientRect().height;

function gestionCollisions(){
    const rect = personnage.getBoundingClientRect();
    if (rect.left <= 0) {
        console.log("Hit LEFT border");
    }
    if (rect.top <= 0) {
        console.log("Hit TOP border");
    }
    if (rect.right >= largeur) {
        console.log("Hit RIGHT border");
    }
    if (rect.bottom >= hauteur) {
        console.log("Hit BOTTOM border");
    }
}

// Gestion personnage

let deplacementActif = false;

function deplace(){
    personnage.addEventListener('mousedown', (e) => {
        deplacementActif = true;
        personnage.classList.add('actif');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (deplacementActif) {
          personnage.style.left = (e.pageX - personnage.offsetWidth / 2) + 'px';
          personnage.style.top = (e.pageY - personnage.offsetHeight / 2) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (deplacementActif) {
          deplacementActif = false;
          personnage.classList.remove('active');
        }
    });
}

// Générer des nuages

