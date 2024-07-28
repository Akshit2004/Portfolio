document.addEventListener("DOMContentLoaded", function () {
    const photos = document.querySelectorAll(".featured-photo img");
    const fullscreenViewer = document.createElement("div");
    fullscreenViewer.className = "fullscreen-viewer";
    fullscreenViewer.innerHTML = "<img src='' alt='Fullscreen Image'><span class='close'>&times;</span>";
    document.body.appendChild(fullscreenViewer);

    const fullscreenImage = fullscreenViewer.querySelector("img");
    const closeBtn = fullscreenViewer.querySelector(".close");

    photos.forEach(photo => {
        photo.addEventListener("click", () => {
            fullscreenImage.src = photo.src;
            fullscreenViewer.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        fullscreenViewer.style.display = "none";
    });

    fullscreenViewer.addEventListener("click", (e) => {
        if (e.target === fullscreenViewer) {
            fullscreenViewer.style.display = "none";
        }
    });
});
