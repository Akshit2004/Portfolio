document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation buttons and sections
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    const actionButtons = document.querySelectorAll('.btn[data-section]');
    
    // Function to switch active section with enhanced animations
    const switchSection = (sectionId) => {
        console.log(`Switching to section: ${sectionId}`);
        
        // Hide all sections first with a fade-out effect
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }, 400); // Longer fade for smoother transition
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
        
        // Remove active class from all buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected section and button after a short delay
        setTimeout(() => {
            const targetSection = document.getElementById(sectionId);
            const targetButton = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
            
            if (targetSection && targetButton) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
                // Reset the transform for the animation to work
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                targetButton.classList.add('active');
                
                // Scroll to top when changing sections
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Animate elements within the section
                const fadeElements = targetSection.querySelectorAll('.feature-box, .stat-item, .project-card, .about-card, .skills, .tools, .extra-curricular');
                fadeElements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        el.style.transition = 'all 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 500 + (index * 100)); // Staggered animation
                });
            } else {
                console.error(`Could not find section or button for: ${sectionId}`);
            }
        }, 450); // Slightly longer than the fade-out

        // Add animations for specific sections
        if (sectionId === 'home') {
            setTimeout(startCounting, 1000);
        } else if (sectionId === 'about') {
            setTimeout(animateSkills, 800);
        } else if (sectionId === 'projects') {
            // Reset to first tab when switching to projects section
            const firstTab = document.querySelector('.project-tab');
            if (firstTab) firstTab.click();
        }
    };
    
    // Add click event to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // Add click event to action buttons (in content) that switch sections
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add a loading state to the button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending (you would replace this with actual form submission)
            setTimeout(() => {
                alert('Form submission is currently disabled. This is a demo portfolio.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Make sure the initial section is properly displayed
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        activeSection.style.display = 'block';
        activeSection.style.opacity = '1';
        activeSection.style.transform = 'translateY(0)';
    }
    
    // Add scroll reveal animations for elements as they come into view
    const revealElements = document.querySelectorAll('.project-card, .timeline-item, .skills, .tools, .extra-curricular');
    
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger on initial load
    revealOnScroll();
    
    // Typing effect for the home page
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = ['Web Developer & Designer', 'UI/UX Designer', 'Front-End Developer'];
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing new phrase
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // Parallax effect for particles
    if (document.querySelector('.particles-container')) {
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = 30 + (index * 5);
                const x = (mouseX * speed) - (speed/2);
                const y = (mouseY * speed) - (speed/2);
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Stats counter animation
    const statCounts = document.querySelectorAll('.stat-count');
    let countersStarted = false;
    
    function startCounting() {
        if (countersStarted) return;
        
        statCounts.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2500; // Longer duration for smoother counting
            const increment = target / (duration / 16); // Update roughly every 16ms (60fps)
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                const value = Math.min(Math.round(current), target);
                counter.textContent = value;
                
                if (value < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // Add a pulse animation when counting completes
                    counter.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        counter.style.animation = '';
                    }, 500);
                }
            };
            
            updateCounter();
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
    
    // Start the counter when the section becomes visible
    const homeSection = document.getElementById('home');
    if (homeSection && homeSection.classList.contains('active')) {
        setTimeout(startCounting, 500); // Delay to let the section load
    }
    
    // Add animation to skill tags when about section becomes visible
    const animateSkills = () => {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100 + (index * 50)); // Staggered animation
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

    // Initialize project tabs
    initProjectTabs();

    // Initialize cursor effect
    initCursorEffect();
    
    // Initialize animations for the active section
    if (activeSection) {
        const fadeElements = activeSection.querySelectorAll('.feature-box, .stat-item, .project-card, .about-card, .skills, .tools, .extra-curricular');
        fadeElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 500 + (index * 100)); // Staggered animation
        });
        
        // Start counting if we're on the home section
        if (activeSection.id === 'home') {
            setTimeout(startCounting, 1000);
        }
    }
});

// Add animated cursor effect to hero section (new feature)
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
    const hoverItems = document.querySelectorAll('.btn, .nav-btn, .project-card, .feature-box, .social-links a');
    
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
}
