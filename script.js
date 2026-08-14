gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-toggle, .project-card-large, .case-card, .service-card, .social-link, .tech-item, .back-to-top, .carousel-card, .tech-pill');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: target, offsetY: 0 },
                ease: 'power3.inOut'
            });
        }
    });
});

// ===== HERO ANIMATIONS =====
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

heroTl
    .from('.hero-tag', { opacity: 0, y: 30, duration: 0.8 }, 0)
    .from('.hero-line .hero-word', { opacity: 0, y: 120, duration: 1.2, stagger: 0.15 }, 0.3)
    .from('.hero-subtitle', { opacity: 0, y: 40, duration: 1 }, 0.8)
    .from('.hero-cta .btn', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1 }, 1)
    .from('.hero-card', { opacity: 0, scale: 0.8, duration: 1.2, stagger: 0.2 }, 0.5)
    .from('.hero-bg-text', { opacity: 0, x: 100, duration: 1.5 }, 0)
    .from('.hero-bg-text-2', { opacity: 0, x: -100, duration: 1.5 }, 0.2)
    .from('.scroll-indicator', { opacity: 0, duration: 0.8 }, 1.5)
    .from('.hero-avatar', { opacity: 0, scale: 0.5, duration: 1.2, ease: 'back.out(1.7)' }, 0.6);

// Hero card floating animation
gsap.to('.hero-card-1', {
    y: -15,
    rotationY: -12,
    rotationX: 8,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.hero-card-2', {
    y: 20,
    rotationY: 18,
    rotationX: -4,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.hero-card-3', {
    y: -10,
    rotationY: -8,
    rotationX: 12,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.hero-card-4', {
    y: 25,
    rotationY: 22,
    rotationX: -8,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// ===== SECTION REVEAL ANIMATIONS =====
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out'
    });
});

// About section
gsap.from('.about-large-text', {
    scrollTrigger: {
        trigger: '.about-large-text',
        start: 'top 85%',
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.about-intro', {
    scrollTrigger: {
        trigger: '.about-intro',
        start: 'top 85%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
});

gsap.from('.about-detail', {
    scrollTrigger: {
        trigger: '.about-detail',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(stat, {
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    });
});

// Projects section
gsap.utils.toArray('.project-card-large').forEach((card, i) => {
    const mockup = card.querySelector('.project-mockup');
    
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        delay: i * 0.1,
        ease: 'power3.out'
    });
    
    gsap.from(mockup, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        scale: 0.95,
        duration: 1.5,
        ease: 'power3.out'
    });
});

// Project card hover 3D effect
const projectCards = document.querySelectorAll('.project-card-large');
projectCards.forEach(card => {
    const mockup = card.querySelector('.project-mockup');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(mockup, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(mockup, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

// 3D Carousel
const carouselStage = document.getElementById('carouselStage');
const carouselCards = document.querySelectorAll('.carousel-card');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
let currentIndex = 0;
const totalCards = carouselCards.length;
let isAnimating = false;
const TRANSITION_MS = 1000; 

function setNavDisabled(disabled) {
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
    prevBtn.style.pointerEvents = disabled ? 'none' : '';
    nextBtn.style.pointerEvents = disabled ? 'none' : '';
}

function updateCarousel() {
    carouselCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'hidden');
        let offset = index - currentIndex;
        if (offset > Math.floor(totalCards / 2)) {
            offset -= totalCards;
        } else if (offset < -Math.floor(totalCards / 2)) {
            offset += totalCards;
        }
        switch (offset) {
            case 0:
                card.classList.add('active');
                break;
            case 1:
                card.classList.add('next');
                break;
            case -1:
                card.classList.add('prev');
                break;
            case 2:
                card.classList.add('far-next');
                break;
            case -2:
                card.classList.add('far-prev');
                break;
            default:
                card.classList.add('hidden');
                break;
        }
    });
}

function goTo(newIndex) {
    if (isAnimating) return;
    isAnimating = true;
    setNavDisabled(true);

    currentIndex = (newIndex + totalCards) % totalCards;
    updateCarousel();
    window.setTimeout(() => {
        isAnimating = false;
        setNavDisabled(false);
    }, TRANSITION_MS + 50);
}


prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

updateCarousel();

carouselCards.forEach(card => {
    const inner = card.querySelector('.carousel-card-inner');

    card.addEventListener('mouseenter', () => {
        gsap.to(inner, {
            scale: 1.05,
            boxShadow: '0 50px 100px rgba(0,0,0,0.2)',
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(inner, {
            scale: 1,
            boxShadow: 'var(--shadow-hover)',
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});
// Contact
gsap.from('.contact-heading', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.contact-text', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 85%',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.1,
    ease: 'power3.out'
});

gsap.from('.contact-item', {
    scrollTrigger: {
        trigger: '.contact-details',
        start: 'top 85%',
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
});

gsap.from('.form-group', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out'
});

gsap.from('.social-link', {
    scrollTrigger: {
        trigger: '.social-links',
        start: 'top 85%',
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)'
});

// ===== PARALLAX EFFECTS =====
gsap.to('.hero-bg-text', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 200,
    opacity: 0
});

gsap.to('.hero-bg-text-2', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -150,
    opacity: 0
});

// ===== MAGNETIC BUTTONS =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ===== FORM SUBMISSION =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('.btn-submit');
    const btnText = btn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    btnText.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btnText.textContent = 'Message Sent!';
        btn.style.background = '#4D4D4D';
        btn.style.borderColor = '#4D4D4D';
        
        this.reset();
        
        setTimeout(() => {
            btnText.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// ===== PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== HIDE CURSOR ON MOBILE =====
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// ===== SMOOTH PARALLAX FOR HERO CARDS =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom > 0) {
            const speed = 0.3;
            gsap.to('.hero-card-1', { y: scrolled * speed * 0.5, duration: 0.5, overwrite: 'auto' });
            gsap.to('.hero-card-2', { y: scrolled * speed * 0.7, duration: 0.5, overwrite: 'auto' });
            gsap.to('.hero-card-3', { y: scrolled * speed * 0.4, duration: 0.5, overwrite: 'auto' });
            gsap.to('.hero-card-4', { y: scrolled * speed * 0.6, duration: 0.5, overwrite: 'auto' });
        }
    }
});

// ===== SCROLL PROGRESS INDICATOR =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: #2A2A2A;
    z-index: 10001;
    transform-origin: left;
    transform: scaleX(0);
`;
document.body.appendChild(scrollProgress);

ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        scrollProgress.style.transform = `scaleX(${self.progress})`;
    }
});
