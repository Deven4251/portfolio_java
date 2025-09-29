// Portfolio Website JavaScript
// Handles navigation, animations, and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initMobileMenu();
    initTypingEffect();
    initParallaxEffect();
    initTabs();
    initGalaxy();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

// Immediate display - no scroll animations needed
function initScrollAnimations() {
    // Make all elements visible immediately
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .tech-category, .project-card, .timeline-item, .award-card');
    animatedElements.forEach(el => {
        el.classList.add('visible');
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Immediate display - no typing effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Show title immediately
        heroTitle.style.opacity = '1';
    }
}

// Optimized parallax effect for better performance
function initParallaxEffect() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.hero::before, .technologies::before, .projects::before, .experience::before, .awards::before');

                parallaxElements.forEach(element => {
                    const speed = 0.3; // Reduced speed for better performance
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll animations with more control
function initAdvancedScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-animate]');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', debounce(handleScrollAnimation, 10));
}

// Project card interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Technology item interactions
function initTechInteractions() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Award card interactions
function initAwardInteractions() {
    const awardCards = document.querySelectorAll('.award-card');

    awardCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.award-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.award-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Timeline item interactions
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'translateX(-50%) scale(1.1)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    });
}

// Initialize all interactions
document.addEventListener('DOMContentLoaded', function() {
    // Start fade-in animations immediately
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('visible');
    });

    initScrollAnimations();
    initTypingEffect();

    initProjectInteractions();
    initTechInteractions();
    initAwardInteractions();
    initTimelineInteractions();
    initAdvancedScrollAnimations();
});

// Immediate loading - start fade-in animations right away
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Ensure all fade-in elements start animating immediately
    const allFadeElements = document.querySelectorAll('.fade-in');
    allFadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('visible');
    });
});

// Performance optimization
const optimizePerformance = () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log(`
🚀 Java Developer Portfolio
Built with HTML, CSS, and JavaScript
Featuring smooth animations and responsive design
`);

// Tab functionality for experience page
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0 || tabPanels.length === 0) {
        return; // Exit if no tabs found
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Trigger animation for tech tags in the active panel
                const techTags = targetPanel.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    tag.style.animationDelay = `${index * 0.1}s`;
                    tag.style.animation = 'slideInUp 0.2s ease forwards';
                });
            }
        });
    });

    // Initialize first tab as active if none are active
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab && tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        const firstPanel = document.querySelector('.tab-panel');
        if (firstPanel) {
            firstPanel.classList.add('active');
        }
    }
}

// Badge functionality for awards page
function initGalaxy() {
    const awardBadges = document.querySelectorAll('.award-badge');
    const awardDetailsPanel = document.getElementById('awardDetails');
    const closePanel = document.getElementById('closePanel');

    if (awardBadges.length === 0) {
        return; // Exit if no badges found
    }

    // Award data
    const awardData = {
        iitjava: {
            title: "Java Programming Competition (1st Prize)",
            issuer: "IIT Bombay",
            date: "Feb 2024",
            description: "Secured 1st prize in IIT Bombay Java Programming competition with an aggregate score of 77.52%.",
            credential: "Certificate ID: IITB-JAVA-2024",
            icon: "bx bxl-java"
        },
        ml: {
            title: "Machine Learning Bootcamp Certificate",
            issuer: "Devtown",
            date: "2024",
            description: "Completed comprehensive Machine Learning bootcamp covering data science, AI algorithms, and practical applications.",
            credential: "Certificate ID: DEVTOWN-ML-2024",
            icon: "bx bx-brain"
        },
        certs: {
            title: "Microsoft & Google – Student Ambassador Certifications",
            issuer: "Microsoft & Google",
            date: "2023-2024",
            description: "Earned multiple certifications from Microsoft and Google in cloud technologies, data analytics, and development tools.",
            credential: "Multiple Certifications",
            icon: "bx bx-certification"
        },
        srimt: {
            title: "Academic Excellence Award",
            issuer: "SRIMT",
            date: "2023",
            description: "Recognized for outstanding academic performance and leadership in computer science and engineering.",
            credential: "Award #SRIMT-2023-001",
            icon: "bx bx-trophy"
        },
        umaga: {
            title: "Umaga Technology Competition Winner",
            issuer: "Umaga Technologies",
            date: "2023",
            description: "Won the Umaga Tech competition showcasing innovative solutions and technical excellence in software development.",
            credential: "Competition Winner 2023",
            icon: "bx bx-medal"
        }
    };

    // Add click event listeners to badges
    awardBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const awardType = badge.getAttribute('data-award');
            const award = awardData[awardType];

            if (award) {
                showAwardDetails(award);
            }
        });

        // Add hover effects
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.15)';
            badge.style.zIndex = '30';

            // Add glow effect to badge frame
            const badgeFrame = badge.querySelector('.badge-frame');
            if (badgeFrame) {
                badgeFrame.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(255, 107, 53, 0.6)';
            }

            // Enhance glow effect
            const badgeGlow = badge.querySelector('.badge-glow');
            if (badgeGlow) {
                badgeGlow.style.animationDuration = '0.5s';
            }

            // Speed up particle animation
            const particles = badge.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '1s';
            });
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1)';
            badge.style.zIndex = '10';

            // Remove glow effect
            const badgeFrame = badge.querySelector('.badge-frame');
            if (badgeFrame) {
                badgeFrame.style.boxShadow = '';
            }

            // Reset glow effect
            const badgeGlow = badge.querySelector('.badge-glow');
            if (badgeGlow) {
                badgeGlow.style.animationDuration = '2s';
            }

            // Reset particle animation
            const particles = badge.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '4s';
            });
        });
    });

    // Show award details
    function showAwardDetails(award) {
        const panel = awardDetailsPanel;
        const content = panel.querySelector('.award-detail-content');

        // Update content
        content.querySelector('.award-icon-large i').className = award.icon;
        content.querySelector('.award-title').textContent = award.title;
        content.querySelector('.award-issuer').textContent = award.issuer;
        content.querySelector('.award-date').textContent = award.date;
        content.querySelector('.award-description').textContent = award.description;
        content.querySelector('.credential-id').textContent = award.credential;

        // Show panel
        panel.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close panel
    if (closePanel) {
        closePanel.addEventListener('click', () => {
            awardDetailsPanel.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close panel when clicking outside
    awardDetailsPanel.addEventListener('click', (e) => {
        if (e.target === awardDetailsPanel) {
            awardDetailsPanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close panel with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && awardDetailsPanel.classList.contains('active')) {
            awardDetailsPanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Optimized connection path animation
    const connectionPath = document.querySelector('.connection-path');
    if (connectionPath) {
        connectionPath.style.strokeDasharray = '1, 1';
        connectionPath.style.animation = 'connectionFlow 4s linear infinite';
    }

    // Optimized background dots with reduced animation complexity
    const backgroundDots = document.querySelectorAll('.badge-background .pattern-dot');
    backgroundDots.forEach((dot, index) => {
        const randomDelay = Math.random() * 2; // Reduced from 4s to 2s
        const randomDuration = 2 + Math.random() * 1; // Reduced from 3-5s to 2-3s
        dot.style.animationDelay = `${randomDelay}s`;
        dot.style.animationDuration = `${randomDuration}s`;
    });
}

// Export functions for potential external use
window.PortfolioJS = {
    initNavigation,
    initScrollAnimations,
    initSmoothScrolling,
    initMobileMenu,
    initTabs,
    initGalaxy,
    debounce
};
