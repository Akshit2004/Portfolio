document.addEventListener("DOMContentLoaded", function() {
    // Form submission handler
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "red";
            return;
        }

        if (!validateEmail(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.style.color = "red";
            return;
        }

        // Simulate form submission
        formMessage.textContent = "Thank you for your message! We will get back to you soon.";
        formMessage.style.color = "green";

        // Clear form fields
        form.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Fullscreen image viewer functionality
    const fullscreenViewer = document.getElementById("fullscreen-viewer");
    const fullscreenImage = document.getElementById("fullscreen-image");

    function openFullScreen(img) {
        fullscreenImage.src = img.src;
        fullscreenViewer.style.display = "flex";
    }

    function closeFullScreen() 
