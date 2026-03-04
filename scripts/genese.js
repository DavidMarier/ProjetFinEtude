const images = document.querySelectorAll(".galerie img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const btnFerme = document.querySelector(".close");

images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });
});

btnFerme.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
    if (e.target == lightbox) {
        lightbox.classList.remove("active");
    }
});
