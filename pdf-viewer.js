(() => {
    const viewers = document.querySelectorAll(".pdf-viewer");
    if (!viewers.length) return;

    viewers.forEach((viewer) => {
        const total = parseInt(viewer.dataset.total, 10);
        const path = viewer.dataset.path;
        const ext = viewer.dataset.ext || "png";
        const label = viewer.dataset.label || "Document";

        const page = viewer.querySelector(".pdf-viewer-page");
        const counter = viewer.querySelector(".pdf-viewer-counter");
        const prev = viewer.querySelector('[data-dir="prev"]');
        const next = viewer.querySelector('[data-dir="next"]');

        let current = 1;

        const pagePath = (n) =>
            `${path}${String(n).padStart(2, "0")}.${ext}`;

        function show(n) {
            current = ((n - 1 + total) % total) + 1;

            page.src = pagePath(current);
            page.alt = `Page ${current} — ${label}`;
            counter.textContent = `${current} / ${total}`;

            // Précharge la page suivante
            new Image().src = pagePath((current % total) + 1);
        }

        prev.addEventListener("click", () => show(current - 1));
        next.addEventListener("click", () => show(current + 1));

        page.addEventListener("error", () => {
            console.error("Image introuvable :", page.src);
        });

        document.addEventListener("keydown", (event) => {
            // Ne pas naviguer si une lightbox est ouverte
            if (document.querySelector(".project-lightbox.active, .lightbox.active")) return;

            if (event.key === "ArrowLeft") show(current - 1);
            if (event.key === "ArrowRight") show(current + 1);
        });

        show(1);
    });
})();