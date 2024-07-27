function openFullScreen(imageElement) {
    const fullscreenViewer = document.getElementById('fullscreen-viewer');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = imageElement.src;
    fullscreenViewer.style.display = 'flex';
}

function closeFullScreen() {
    const fullscreenViewer = document.getElementById('fullscreen-viewer');
    fullscreenViewer.style.display = 'none';
}
// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('experience-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.modal .close');
    const experienceCards = document.querySelectorAll('.experience-card');

    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            // Fetch data based on id (could be hardcoded or from an API)
            let title, date, description;

            switch(id) {
                case '1':
                    title = 'Graphic Designer/Video Editor - Part-Time Intern';
                    date = 'Nov 2023 - Jan 2024';
                    description = 'I was given the task of making daily Instagram posts and reels on the latest sports affairs...';
                    break;
                case '2':
                    title = 'Graphic Design Lead - TMP Club';
                    date = 'Sep 2022 - Present';
                    description = 'I was an integral part of the design team for my college\'s technical club...';
                    break;
                case '3':
                    title = 'Freelance Designer - College Event';
                    date = 'Sep 2022 - May 2022';
                    description = 'Worked as a freelance designer for a major college event...';
                    break;
            }

            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalDescription.textContent = description;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
