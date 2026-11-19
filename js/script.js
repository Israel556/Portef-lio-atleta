
// MENU MOBILE

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");

    menuToggle.textContent =
        navbar.classList.contains("show") ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {
        navbar.classList.remove("show");
        menuToggle.textContent = "☰";
    });

});

// ANIMAÇÕES AO ROLAR A PÁGINA

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// GALERIA E LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeButton = document.getElementById("close-lightbox");
const nextButton = document.getElementById("next-image");
const prevButton = document.getElementById("prev-image");

const counter = document.getElementById("image-counter");

let currentImage = 0;

const images = Array.from(galleryImages).map(image => ({
    src: image.src,
    alt: image.alt
}));

// ABRIR IMAGEM

function openLightbox(index) {

    currentImage = index;

    updateImage();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();
}

// ATUALIZAR IMAGEM

function updateImage() {

    lightboxImage.style.opacity = "0";

    setTimeout(() => {

        lightboxImage.src = images[currentImage].src;
        lightboxImage.alt = images[currentImage].alt;

        counter.textContent =
            `${String(currentImage + 1).padStart(2, "0")} / 04`;

        lightboxImage.onload = () => {
            lightboxImage.style.opacity = "1";
        };

    }, 150);
}

// EVENTOS DAS FOTOS

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {
        openLightbox(index);
    });

});

// FECHAR LIGHTBOX

function closeLightbox() {

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}

closeButton.addEventListener("click", closeLightbox);

// PRÓXIMA IMAGEM

nextButton.addEventListener("click", () => {

    currentImage = (currentImage + 1) % images.length;

    updateImage();

});

// IMAGEM ANTERIOR

prevButton.addEventListener("click", () => {

    currentImage =
        (currentImage - 1 + images.length) % images.length;

    updateImage();

});

// FECHAR AO CLICAR NO FUNDO

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// CONTROLES PELO TECLADO

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

});

// ANIMAÇÃO DA IMAGEM

lightboxImage.style.transition = "opacity .3s ease";
