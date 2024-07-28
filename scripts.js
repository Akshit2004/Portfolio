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

    <script>
    // Show the button when the user scrolls down 20px from the top
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("back-to-top").style.display = "block";
        } else {
            document.getElementById("back-to-top").style.display = "none";
        }
    };

    // Scroll to the top of the document when the user clicks the button
    document.getElementById("back-to-top").onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll effect
        });
    };
</script>

});
