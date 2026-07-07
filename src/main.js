// =============================================
// JERRYSAGE INTERIORS — Interactive Features
// =============================================

// ---------- CLIENT-SIDE ROUTER ----------
const routes = {
    '/': 'home',
    '/about': 'about',
    '/services': 'services',
    '/gallery': 'gallery',
    '/testimonials': 'testimonials',
    '/contact': 'contact',
};

// Additional sections to show alongside a page
const sectionsByRoute = {
    'home': ['home'],
    'about': ['about'],
    'services': ['services', 'why-us'],
    'gallery': ['gallery'],
    'testimonials': ['testimonials'],
    'contact': ['contact'],
};

let isNavigating = false;

function navigateTo(path) {
    const route = routes[path] || 'home';
    showPage(route);
    history.pushState({ page: route }, '', path);
    updateActiveNavLink(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    isNavigating = true;
    setTimeout(() => { isNavigating = false; }, 300);
}

function showPage(pageId) {
    const sectionIds = sectionsByRoute[pageId] || ['home'];

    // Get all sections that are part of the page system
    const allSections = document.querySelectorAll('section[id]');

    allSections.forEach(section => {
        section.classList.remove('active');
    });

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('active');
            // Trigger reveal animations
            const revealed = section.querySelectorAll('[data-reveal]');
            revealed.forEach(el => {
                el.classList.remove('revealed');
                // Force reflow
                void el.offsetWidth;
                el.classList.add('revealed');
            });
        }
    });

    // Update page title
    const titles = {
        'home': 'JerrySage Interiors – Premium Interiors | Asaba, Delta',
        'about': 'About – JerrySage Interiors | Asaba, Delta',
        'services': 'Our Services – JerrySage Interiors | Asaba, Delta',
        'gallery': 'Gallery – JerrySage Interiors | Asaba, Delta',
        'testimonials': 'Testimonials – JerrySage Interiors | Asaba, Delta',
        'contact': 'Contact – JerrySage Interiors | Asaba, Delta',
    };
    document.title = titles[pageId] || titles['home'];
}

function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const routeMap = {
            '/': 'home',
            '/about': 'about',
            '/services': 'services',
            '/gallery': 'gallery',
            '/testimonials': 'testimonials',
            '/contact': 'contact',
        };
        if (routeMap[href] === pageId) {
            link.classList.add('active');
        }
    });
}

function getPathFromRoute() {
    const path = window.location.pathname;
    // Try exact match first
    if (routes[path]) return path;
    // Fallback to root
    return '/';
}

document.addEventListener('DOMContentLoaded', () => {

    // ---------- INITIALIZE ROUTER ----------
    const initialPath = getPathFromRoute();
    const initialRoute = routes[initialPath] || 'home';
    
    // Set initial active nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === initialPath) {
            link.classList.add('active');
        }
    });

    // Intercept nav link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (routes[href] !== undefined) {
            e.preventDefault();
            // Close mobile menu if open
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            navigateTo(href);
        }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        const path = getPathFromRoute();
        const route = routes[path] || 'home';
        showPage(route);
        updateActiveNavLink(route);
    });

    // Show initial page (after preloader delay)
    setTimeout(() => {
        showPage(initialRoute);
    }, 2100);

    // ---------- PRELOADER ----------
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000);
    }

    // ---------- PARTICLES ----------
    createParticles();

    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const count = 40;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 3 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            container.appendChild(particle);
        }
    }

    // ---------- NAVBAR ----------
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ---------- SCROLL REVEAL ----------
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe any remaining unrevealed elements
    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => revealObserver.observe(el));

    // ---------- COUNTER ANIMATION ----------
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function observeCounters() {
        document.querySelectorAll('[data-count]').forEach(counter => {
            counter.textContent = '0';
            counterObserver.observe(counter);
        });
    }
    observeCounters();

    function animateCounter(element, target) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const stepTime = duration / steps;

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

    // ---------- TESTIMONIAL SLIDER ----------
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.dot');

    if (track && prevBtn && nextBtn) {
        const cards = track.querySelectorAll('.testimonial-card');
        const totalSlides = cards.length;
        let currentSlide = 0;

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlide = index;

            // Show only the active card
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === currentSlide);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Initialize: show first card
        if (cards.length > 0) {
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === 0);
            });
        }

        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Auto-slide every 5 seconds
        let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
            slider.addEventListener('mouseleave', () => {
                clearInterval(autoSlide);
                autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
            });
        }
    }

    // ---------- CONTACT FORM ----------
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.classList.add('active');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ---------- BACK TO TOP ----------
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- SMOOTH PARALLAX ON HERO ----------
    window.addEventListener('scroll', () => {
        const heroContent = document.querySelector('.hero-content');
        const scrollY = window.scrollY;

        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
        }
    });

    // ---------- CURSOR GLOW ON GLASS CARDS ----------
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    console.log('%c JerrySage Interiors ', 'background: #c6934a; color: #0a0a12; font-size: 18px; font-weight: bold; padding: 8px 12px; border-radius: 4px; font-family: serif;');
    console.log('%c Premium Interior Solutions in Asaba, Delta ', 'color: #e8c87a; font-size: 12px;');
});
