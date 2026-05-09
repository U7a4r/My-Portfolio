// ===================================
// GLOBAL STATE
// ===================================

const state = {
    theme: localStorage.getItem('theme') || 'light',
    isScrolling: false,
    scrollTimeout: null
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializePreloader();
    initializeNavbar();
    initializeScrollProgress();
    initializeTypewriter();
    initializeParticles();
    initializeScrollAnimations();
    initializeParallax();
    initializeCounters();
    initializeFormHandling();
    initializeBackToTop();
    initializeMobileMenu();
});

// ===================================
// THEME MANAGEMENT
// ===================================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', state.theme);
    
    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('theme', state.theme);
        
        // Add animation to theme toggle
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ===================================
// PRELOADER
// ===================================

function initializePreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Trigger entrance animations
            document.body.style.overflow = 'visible';
        }, 1000);
    });
}

// ===================================
// NAVBAR
// ===================================

function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                navLinksContainer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
}

// ===================================
// MOBILE MENU
// ===================================

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// ===================================
// SCROLL PROGRESS BAR
// ===================================

function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight);
        scrollProgress.style.transform = `scaleX(${scrolled})`;
    });
}

// ===================================
// TYPEWRITER EFFECT
// ===================================

function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        'Building Modern & Responsive Websites',
        'Photography & Videography with Creative Vision',
        'Frontend Developer Focused on Performance & Design',
        
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// ===================================
// PARTICLE ANIMATION
// ===================================

function initializeParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 5 + Math.random() * 10;
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';
    
    // Random size
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (duration + delay) * 1000);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Stagger animations for children
                const children = entry.target.querySelectorAll('.service-card, .project-card, .stat-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '0';
                        child.style.animation = `fadeInUp 0.6s ease forwards`;
                        child.style.animationDelay = `${index * 0.1}s`;
                    }, 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.about, .services, .projects, .contact');
    sections.forEach(section => observer.observe(section));
    
    // Observe individual elements
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .contact-content');
    animatedElements.forEach(element => observer.observe(element));
}

// ===================================
// PARALLAX EFFECTS
// ===================================

function initializeParallax() {
    const heroVisual = document.getElementById('heroVisual');
    
    // Mouse move parallax for hero
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        if (heroVisual) {
            const moveX = (mouseX - 0.5) * 30;
            const moveY = (mouseY - 0.5) * 30;
            heroVisual.style.transform = `translate(${moveX}px, ${moveY}px) perspective(1000px) rotateY(${moveX * 0.5}deg) rotateX(${-moveY * 0.5}deg)`;
        }
    });
    
    // Scroll parallax for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        // Parallax for project images
        const projectImages = document.querySelectorAll('.project-image');
        projectImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const yPos = scrollPercent * 20;
                image.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// ===================================
// ANIMATED COUNTERS
// ===================================

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===================================
// FORM HANDLING
// ===================================

function initializeFormHandling() {
    const form = document.getElementById('contactForm');
    
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
        
    //     const submitBtn = form.querySelector('.btn-submit');
    //     const originalText = submitBtn.querySelector('span').textContent;
        
    //     // Animate button
    //     submitBtn.querySelector('span').textContent = 'Sending...';
    //     submitBtn.style.pointerEvents = 'none';
        
    //     // Simulate form submission
    //     setTimeout(() => {
    //         submitBtn.querySelector('span').textContent = 'Message Sent! ✓';
    //         submitBtn.style.background = 'linear-gradient(135deg, #34a853 0%, #0f9d58 100%)';
            
    //         // Reset form
    //         setTimeout(() => {
    //             form.reset();
    //             submitBtn.querySelector('span').textContent = originalText;
    //             submitBtn.style.background = '';
    //             submitBtn.style.pointerEvents = '';
    //         }, 3000);
    //     }, 2000);
    // });
    
    // Floating label animation
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        const ripple = button.querySelector('.btn-ripple');
        
        if (ripple) {
            ripple.style.width = '0';
            ripple.style.height = '0';
            
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
            }, 10);
            
            setTimeout(() => {
                ripple.style.width = '0';
                ripple.style.height = '0';
            }, 600);
        }
    }
});

// ===================================
// SERVICE CARD 3D TILT EFFECT
// ===================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// PROJECT CARD PARALLAX ON HOVER
// ===================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.project-image');
        if (image) {
            image.style.transform = '';
        }
    });
});

// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for interactive elements
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #4285f4;');
console.log('%cInterested in how this was built?', 'font-size: 14px; color: #5f6368;');
console.log('%cThis portfolio was crafted with pure HTML, CSS, and JavaScript - no frameworks!', 'font-size: 14px; color: #34a853;');
console.log('%cFeel free to explore the code and reach out if you have any questions.', 'font-size: 14px; color: #fbbc04;');
console.log('%c- Muhammad Suleman', 'font-size: 14px; font-style: italic; color: #ea4335;');

// ===================================
// ANALYTICS & TRACKING (Placeholder)
// ===================================

// Add your analytics code here
// Example: Google Analytics, Mixpanel, etc.

// Track page views
function trackPageView(page) {
    console.log(`Page view tracked: ${page}`);
    // Add your tracking code here
}

// Track events
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Add your tracking code here
}

// Track form submissions
document.getElementById('contactForm').addEventListener('submit', () => {
    trackEvent('Contact', 'Form Submit', 'Contact Form');
});

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        trackEvent('Button', 'Click', btnText);
    });
});

// ===================================
// LAZY LOADING (Future Enhancement)
// ===================================

// Placeholder for lazy loading images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// EXPORT FOR TESTING
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        initializeTypewriter,
        animateCounter,
        debounce,
        throttle
    };
}
// ===================================
// DISABLE INSPECT ELEMENT & RIGHT CLICK
// ===================================

// 1. Disable Right Click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+U)
document.addEventListener('keydown', (e) => {
    // F12 key
    if(e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl + Shift + I (Open DevTools)
    if(e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl + Shift + J (Open Console)
    if(e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl + U (View Source)
    if(e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});
