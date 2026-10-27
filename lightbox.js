(() => {
    const lightbox =
        document.getElementById("projectLightbox") ||
        document.getElementById("lightbox");

    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector("button");
    const images = document.querySelectorAll(".lightbox-image");

    function openLightbox(image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    images.forEach((image) => {
        image.addEventListener("click", () => openLightbox(image));
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
})();