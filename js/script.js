document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles background
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#9d4edd"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#9d4edd",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // Implement scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        if (scrollProgress) scrollProgress.style.width = progress + '%';
    });

    // Navigation links and scroll behavior
    const navLinks = document.querySelectorAll('.nav-link');
    const actionButtons = document.querySelectorAll('.btn[data-section]');
    const sections = document.querySelectorAll('.section');
    
    // Highlight navigation based on current scroll position
    const scrollSpy = () => {
        const scrollPos = window.scrollY;
        
        sections.forEach(section => {
            const offset = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= offset && scrollPos < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Apply active class to navigation items
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update action buttons to use href instead of data-section
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .feature-box, .stat-item, .project-card, .about-card, .skills, .tools, .extra-curricular, .about-summary');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
        
        // Trigger counters when stats section is in view
        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            if (statsSectionTop < windowHeight - 150 && !countersStarted) {
                startCounting();
            }
        }
        
        // Trigger skill animations when in view
        const skillsSection = document.querySelector('.skills-container');
        if (skillsSection) {
            const skillsSectionTop = skillsSection.getBoundingClientRect().top;
            if (skillsSectionTop < windowHeight - 150 && !skillsAnimated) {
                animateSkills();
                skillsAnimated = true;
            }
        }
    };
    
    // Form submission handler with enhanced feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Let Formspree handle the actual submission
            // But we'll still provide visual feedback to the user
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // We don't prevent default anymore as we want the form to actually submit
            // The rest of this is just UI feedback, the actual submission is handled by Formspree
            setTimeout(() => {
                // This might run if the submission is very fast, otherwise the page will refresh
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
            }, 1000);
        });
    }
    
    // Enhanced stats counter animation with easing
    const statCounts = document.querySelectorAll('.stat-count');
    let countersStarted = false;
    let skillsAnimated = false;
    
    function startCounting() {
        if (countersStarted) return;
        
        statCounts.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2500; // Longer duration for smoother counting
            let startTime = null;
            
            function easeOutQuart(t) {
                return 1 - Math.pow(1 - t, 4);
            }
            
            function animateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const value = Math.floor(easedProgress * target);
                
                counter.textContent = value;
                
                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    counter.textContent = target;
                    // Add a pulse animation when counting completes
                    counter.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        counter.style.animation = '';
                    }, 500);
                }
            }
            
            requestAnimationFrame(animateCount);
        });
        
        // Animate the stat bars when counting starts
        const statBars = document.querySelectorAll('.stat-bar span');
        statBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
        
        countersStarted = true;
    }
    
    // Add animation to skill tags when about section becomes visible
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        const skillLevelBars = document.querySelectorAll('.skill-level-bar span');
        
        // Set animation delay for each skill item
        skillItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
            
            // Set the level bar width based on data-level attribute
            const levelBar = item.querySelector('.skill-level-bar span');
            const level = item.getAttribute('data-level');
            
            if (levelBar && level) {
                setTimeout(() => {
                    levelBar.style.width = `${level}%`;
                }, 300 + (index * 100));
            }
        });
        
        // Animate skill items with staggered delay
        setTimeout(() => {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'burstIn 0.6s forwards';
                }, index * 100);
            });
        }, 200);
        
        // Skill tags animation (in case the old elements are still there)
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
    };

    // Project tabs functionality
    const initProjectTabs = () => {
        const projectTabs = document.querySelectorAll('.project-tab');
        const projectCategories = document.querySelectorAll('.project-category');
        
        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                projectTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all project categories
                projectCategories.forEach(category => {
                    category.classList.remove('active');
                    category.style.display = 'none';
                });
                
                // Show the selected category
                const targetId = tab.getAttribute('data-target');
                const targetCategory = document.getElementById(targetId);
                
                if (targetCategory) {
                    setTimeout(() => {
                        targetCategory.style.display = 'block';
                        
                        // Trigger reflow
                        void targetCategory.offsetWidth;
                        
                        targetCategory.classList.add('active');
                    }, 50);
                }
            });
        });
    };

    // Add scroll down indicator to first section
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i><p>Scroll Down</p>';
        homeSection.appendChild(scrollIndicator);
        
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: homeSection.offsetHeight,
                behavior: 'smooth'
            });
        });
    }

    // Initialize project tabs
    initProjectTabs();

    // Initialize cursor effect with enhanced interactivity
    initCursorEffect();
    
    // Add parallax effect to decorations on mouse move
    document.addEventListener('mousemove', (e) => {
        const decorations = document.querySelectorAll('.decoration');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        decorations.forEach((decoration, index) => {
            const speed = 30 + (index * 10);
            const x = (mouseX * speed) - (speed/2);
            const y = (mouseY * speed) - (speed/2);
            
            decoration.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });
    
    // Tilt effect for feature boxes
    const tiltElements = document.querySelectorAll('.feature-box, .project-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const boundingRect = element.getBoundingClientRect();
            const centerX = boundingRect.left + boundingRect.width / 2;
            const centerY = boundingRect.top + boundingRect.height / 2;
            const percentX = (e.clientX - centerX) / (boundingRect.width / 2);
            const percentY = (e.clientY - centerY) / (boundingRect.height / 2);
            
            element.style.transform = `perspective(1000px) rotateX(${percentY * -3}deg) rotateY(${percentX * 3}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
    
    // Add event listeners for scroll events
    window.addEventListener('scroll', scrollSpy);
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger reveal on initial load
    revealOnScroll();
    scrollSpy();
    
    // Mobile menu functionality - consolidated code
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !e.target.closest('nav') && 
                !e.target.closest('.mobile-menu-toggle')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Adjust layout on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Typewriter effect for hero section
    const typewriterElement = document.querySelector('.text-rotate');
    if (typewriterElement) {
        const phrases = [
            'build things for the web',
            'create digital experiences',
            'design user interfaces',
            'develop web applications'
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // Base typing speed in ms
        
        function typeText() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            // If deleting, remove a character, otherwise add a character
            if (isDeleting) {
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                currentCharIndex++;
                typingSpeed = 100; // Normal speed when typing
            }
            
            // Set text with current number of characters
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex);
            
            // Add blinking cursor effect
            typewriterElement.classList.toggle('typing');
            
            // If completed typing the phrase
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Pause at end of phrase
                isDeleting = true;
                typingSpeed = 1000; // Pause before deleting
            } 
            // If completed deleting the phrase
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to next phrase
                typingSpeed = 500; // Pause before typing new phrase
            }
            
            // Continue the typing effect with appropriate speed
            setTimeout(typeText, typingSpeed);
        }
        
        // Start the typing effect
        typeText();
    }

    // Back to Top Button Functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Enhanced cursor effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-fx';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Items that trigger the cursor effect
    const hoverItems = document.querySelectorAll('.btn, .nav-link, .project-card, .feature-box, .social-links a, .stat-item, .timeline-item');
    
    hoverItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    function animateCursor() {
        const speed = 0.1;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}