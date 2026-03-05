const images = document.querySelectorAll(".galerie img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const btnFerme = document.querySelector(".close");


/**
 * Initialise une lightbox pour un ensemble d’images.
 * 
 * Chaque image cliquée ouvre la lightbox avec cette image affichée.
 * La lightbox peut être fermée soit via le bouton de fermeture,
 * soit en cliquant sur l’arrière-plan.
 * 
 * @param {NodeListOf<HTMLImageElement>} images
 * @param {HTMLElement} lightbox 
 * @param {HTMLElement} btnFerme 
 * @param {HTMLImageElement} lightboxImg 
 * @returns {void}
 */
function initLightbox(images, lightbox, btnFerme, lightboxImg) {

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });
    });

    if (btnFerme) {
        btnFerme.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }
}

initLightbox(images, lightbox, btnFerme, lightboxImg);