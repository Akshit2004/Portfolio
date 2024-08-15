document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav");
    const sections = document.querySelectorAll("section");
    const skillItems = document.querySelectorAll(".skill-item");
    const projectCards = document.querySelectorAll(".project-card");

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const setupElement = (element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        element.style.willChange = "opacity, transform";
        elementObserver.observe(element);
    };

    skillItems.forEach(setupElement);
    projectCards.forEach(setupElement);

    window.addEventListener("scroll", function () {
        nav.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Advanced animation for skill items
    const skillSection = document.querySelector("#skills");
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.skill-item',
                    opacity: [0, 1],
                    translateY: [50, 0],
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo',
                    duration: 1000
                });
                observer.unobserve(skillSection);
            }
        });
    }, observerOptions);

    skillObserver.observe(skillSection);
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-content');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function onScroll() {
        if (isElementInViewport(aboutSection)) {
            aboutSection.classList.add('visible');
            window.removeEventListener('scroll', onScroll);
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Check if the element is already in view
});

document.addEventListener("DOMContentLoaded", function () {
    function createExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        document.body.appendChild(explosion);

        explosion.addEventListener('animationend', () => {
            explosion.remove();
        });
    }

    // Example: Trigger explosion effect on thumbnail click
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function (event) {
            const rect = thumbnail.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createExplosion(x, y);
        });
    });

    // Example: Trigger explosion effect on button click
    const sortButtons = document.querySelectorAll(".sort-btn");
    sortButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createExplosion(x, y);
        });
    });

    // Existing code for modal functionality
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const closeBtn = document.querySelector(".close");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const closeBtn = document.querySelector(".close");
    const sortButtons = document.querySelectorAll(".sort-btn");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    sortButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            thumbnails.forEach(thumbnail => {
                if (category === "all" || thumbnail.getAttribute("data-category") === category) {
                    thumbnail.style.display = "block";
                } else {
                    thumbnail.style.display = "none";
                }
            });
        });
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const fullImage = document.getElementById("fullImage");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const sortButtons = document.querySelectorAll(".sort-btn");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            modal.style.display = "block";
            fullImage.src = this.src;
        });
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.className === "close") {
            modal.style.display = "none";
        }
    });

    sortButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            thumbnails.forEach(thumbnail => {
                if (category === "all" || thumbnail.getAttribute("data-category") === category) {
                    thumbnail.style.display = "block";
                } else {
                    thumbnail.style.display = "none";
                }
            });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});