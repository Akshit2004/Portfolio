document.addEventListener('DOMContentLoaded', () => {
    const photos = document.querySelectorAll('.featured-photo img');
    const viewer = document.getElementById('fullscreenViewer');
    const viewerImage = document.getElementById('fullscreenImage');
    const closeViewer = document.getElementById('closeViewer');

    photos.forEach(photo => {
        photo.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default behavior
            viewerImage.src = photo.src;
            viewer.style.display = 'flex';
        });
    });

    closeViewer.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default behavior
        viewer.style.display = 'none';
    });

    // Optional: Close the viewer when clicking outside the image
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            viewer.style.display = 'none';
        }
    });
});