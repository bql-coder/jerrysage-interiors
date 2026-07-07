// =============================================
// JERRYSAGE INTERIORS — Interactive Features
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- PRELOADER ----------
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000);
    }

    // ---------- NAVBAR ----------
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
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

    revealElements.forEach(el => revealObserver.observe(el));

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

    counters.forEach(counter => counterObserver.observe(counter));

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
