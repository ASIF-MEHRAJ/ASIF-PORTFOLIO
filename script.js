gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== TEXT ROLL / SLOT ANIMATION GENERATOR =====
function initTextRollAnimations() {
  const rollElements = document.querySelectorAll('.roll-text');

  rollElements.forEach((el) => {
    if (!el || el.dataset.rolled) return;
    el.dataset.rolled = 'true';

    const text = el.innerText.trim();
    el.innerText = ''; // Clear original string

    const words = text.split(' ');

    words.forEach((wordText, wIndex) => {
      const wordWrapper = document.createElement('span');
      wordWrapper.classList.add('roll-word-wrapper');

      [...wordText].forEach((char) => {
        const charBox = document.createElement('span');
        charBox.classList.add('roll-char-box');

        const charInner = document.createElement('span');
        charInner.classList.add('roll-char-inner');
        charInner.innerText = char;

        charBox.appendChild(charInner);
        wordWrapper.appendChild(charBox);
      });

      el.appendChild(wordWrapper);

      // Preserve spaces between words
      if (wIndex < words.length - 1) {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.display = 'inline-block';
        el.appendChild(space);
      }
    });

    const chars = el.querySelectorAll('.roll-char-inner');

    // Initial state below view mask
    gsap.set(chars, {
      yPercent: 120,
      rotateX: -35
    });

    // Scroll trigger slot machine reveal
    gsap.to(chars, {
      yPercent: 0,
      rotateX: 0,
      duration: 1.1,
      stagger: 0.025,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

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
const heroTl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });

heroTl
    .from('.hero-tag', { opacity: 0, y: 30, duration: 0.8 }, 0)
    .from('.hero-subtitle', { opacity: 0, y: 40, duration: 1 }, 0.8)
    .from('.hero-cta .btn', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1 }, 1)
    .from('.hero-card', { opacity: 0, scale: 0.8, duration: 1.2, stagger: 0.2 }, 0.5)
    .from('.hero-bg-text', { opacity: 0, x: 100, duration: 1.5 }, 0)
    .from('.hero-bg-text-2', { opacity: 0, x: -100, duration: 1.5 }, 0.2)
    .from('.scroll-indicator', { opacity: 0, duration: 0.8 }, 1.5)
    .from('.hero-avatar', { opacity: 0, scale: 0.5, duration: 1.2, ease: 'back.out(1.7)' }, 0.6);

// Floating cards in Hero
gsap.to('.hero-card-1', {
    y: -15, rotationY: -12, rotationX: 8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
});
gsap.to('.hero-card-2', {
    y: 20, rotationY: 18, rotationX: -4, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
});
gsap.to('.hero-card-3', {
    y: -10, rotationY: -8, rotationX: 12, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'
});
gsap.to('.hero-card-4', {
    y: 25, rotationY: 22, rotationX: -8, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut'
});

// ===== SECTION REVEALS =====
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

gsap.from('.about-intro', {
    scrollTrigger: { trigger: '.about-intro', start: 'top 85%' },
    opacity: 0, y: 50, duration: 1, delay: 0.2, ease: 'power3.out'
});

gsap.from('.about-detail', {
    scrollTrigger: { trigger: '.about-detail', start: 'top 85%' },
    opacity: 0, y: 40, duration: 1, delay: 0.3, ease: 'power3.out'
});

gsap.from('.stat-item', {
    scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
    opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: 'power3.out'
});

// Stats counter
document.querySelectorAll('.stat-number').forEach(stat => {
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

// Projects Section Cards
gsap.utils.toArray('.project-card-large').forEach((card, i) => {
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
});

// ===== 3D CAROUSEL =====
const carouselCards = document.querySelectorAll('.carousel-card');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
let currentIndex = 0;
const totalCards = carouselCards.length;
let isAnimating = false;
const TRANSITION_MS = 1000; 

function setNavDisabled(disabled) {
    if (!prevBtn || !nextBtn) return;
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

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
}

updateCarousel();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
}

// ===== PRELOADER SOUND ENGINE =====
// Synthesized entirely with the Web Audio API (no external audio files),
// so the mechanical/HUD boot sounds are self-contained and load instantly.
const SFX = (() => {
    const STORAGE_KEY = 'portfolioSoundMuted';
    let ctx = null;
    let master = null;
    let muted = false;

    try {
        muted = localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {}

    function ensureCtx() {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtor) return null;
        if (!ctx) {
            ctx = new AudioCtor();
            master = ctx.createGain();
            master.gain.value = 0.5;
            master.connect(ctx.destination);
        }
        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
        return ctx;
    }

    // Browsers block audio until a user gesture; pick it up the first
    // chance we get so subsequent cues in the sequence can play.
    ['pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
        document.addEventListener(evt, () => ensureCtx(), { once: true, passive: true });
    });

    function ready() {
        if (muted) return null;
        const c = ensureCtx();
        return c && c.state === 'running' ? c : null;
    }

    function expEnvelope(gainNode, peak, atTime, duration) {
        gainNode.gain.cancelScheduledValues(atTime);
        gainNode.gain.setValueAtTime(0.0001, atTime);
        gainNode.gain.exponentialRampToValueAtTime(peak, atTime + 0.006);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, atTime + duration);
    }

    function makeNoiseBuffer(c, duration) {
        const size = Math.max(1, Math.floor(c.sampleRate * duration));
        const buffer = c.createBuffer(1, size, c.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
        return buffer;
    }

    function tone(freq, duration, type, gain, glideTo) {
        const c = ready();
        if (!c) return;
        const t = c.currentTime;
        const osc = c.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t + duration);
        const g = c.createGain();
        expEnvelope(g, gain, t, duration);
        osc.connect(g).connect(master);
        osc.start(t);
        osc.stop(t + duration + 0.03);
    }

    function noiseBurst(duration, filterFreq, gain, filterType, q) {
        const c = ready();
        if (!c) return;
        const t = c.currentTime;
        const src = c.createBufferSource();
        src.buffer = makeNoiseBuffer(c, duration);
        const filter = c.createBiquadFilter();
        filter.type = filterType || 'bandpass';
        filter.frequency.value = filterFreq;
        filter.Q.value = q || 1;
        const g = c.createGain();
        expEnvelope(g, gain, t, duration);
        src.connect(filter).connect(g).connect(master);
        src.start(t);
        src.stop(t + duration + 0.03);
    }

    return {
        setMuted(val) {
            muted = val;
            try { localStorage.setItem(STORAGE_KEY, val ? '1' : '0'); } catch (e) {}
        },
        isMuted() { return muted; },
        resume() { ensureCtx(); },

        // Small relay click — HUD elements powering on
        click() {
            tone(1500, 0.035, 'square', 0.11);
            noiseBurst(0.02, 3200, 0.07, 'highpass', 6);
        },
        // Light tick for staggered reveals, pitch-scalable
        tick(pitch) {
            tone(1700 * (pitch || 1), 0.028, 'square', 0.09);
        },
        // Odometer-style counter tick, pitch rises with progress
        counterTick(pct) {
            tone(850 + (pct / 100) * 950, 0.022, 'square', 0.07);
        },
        // Two-tone confirmation beep for status changes
        beep() {
            tone(660, 0.07, 'sine', 0.1);
            setTimeout(() => tone(900, 0.09, 'sine', 0.1), 55);
        },
        // Low mechanical thunk / lock-in
        thunk() {
            tone(85, 0.2, 'sine', 0.32, 50);
            noiseBurst(0.07, 280, 0.14, 'lowpass', 1);
        },
        // Servo lock for the name-block reveal
        reveal() {
            tone(220, 0.09, 'square', 0.1, 90);
            noiseBurst(0.05, 1200, 0.08, 'bandpass', 2);
        },
        // Bright "ready" chime once loading completes
        chime() {
            tone(523.25, 0.13, 'sine', 0.14);
            setTimeout(() => tone(784, 0.22, 'sine', 0.16), 90);
        },
        // Electric spark synced with the flash sweep
        zap() {
            noiseBurst(0.12, 4200, 0.16, 'highpass', 8);
            tone(2200, 0.08, 'sawtooth', 0.09, 400);
        },
        // Hydraulic pressure hiss before the curtains move
        hiss(duration) {
            noiseBurst(duration || 0.35, 1600, 0.09, 'bandpass', 0.7);
        },
        // Sustained servo/hydraulic whoosh spanning the curtain split
        servoWhoosh(duration) {
            const c = ready();
            if (!c) return;
            const dur = duration || 1.7;
            const t = c.currentTime;

            const osc = c.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(65, t);
            osc.frequency.exponentialRampToValueAtTime(135, t + dur * 0.5);
            osc.frequency.exponentialRampToValueAtTime(48, t + dur);

            const oscFilter = c.createBiquadFilter();
            oscFilter.type = 'lowpass';
            oscFilter.frequency.value = 380;

            const oscGain = c.createGain();
            oscGain.gain.setValueAtTime(0.0001, t);
            oscGain.gain.linearRampToValueAtTime(0.13, t + dur * 0.15);
            oscGain.gain.setValueAtTime(0.13, t + dur * 0.75);
            oscGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

            osc.connect(oscFilter).connect(oscGain).connect(master);

            const src = c.createBufferSource();
            src.buffer = makeNoiseBuffer(c, dur);
            const noiseFilter = c.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.setValueAtTime(450, t);
            noiseFilter.frequency.linearRampToValueAtTime(1100, t + dur);
            noiseFilter.Q.value = 0.8;

            const noiseGain = c.createGain();
            noiseGain.gain.setValueAtTime(0.0001, t);
            noiseGain.gain.linearRampToValueAtTime(0.07, t + dur * 0.2);
            noiseGain.gain.setValueAtTime(0.07, t + dur * 0.7);
            noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

            src.connect(noiseFilter).connect(noiseGain).connect(master);

            osc.start(t);
            osc.stop(t + dur + 0.05);
            src.start(t);
            src.stop(t + dur + 0.05);
        },
        // Soft rising hum as the hero visual powers up
        powerUp(duration) {
            tone(220, duration || 0.9, 'sine', 0.09, 440);
        }
    };
})();

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        heroTl.play();
        initTextRollAnimations();
        return;
    }

    const counterEl = document.getElementById('preloaderCounter');
    const barFill = document.getElementById('preloaderProgressFill');
    const statusSub = document.getElementById('preloaderStatusSub');
    const topHalf = preloader.querySelector('.preloader-half-top');
    const bottomHalf = preloader.querySelector('.preloader-half-bottom');
    const lineInners = preloader.querySelectorAll('.pl-line-inner');
    const topbarItems = preloader.querySelectorAll('.pl-topbar-item');
    const topbarTick = preloader.querySelector('.pl-topbar-tick');
    const loadingTag = preloader.querySelector('.preloader-loading-tag');
    const frame = preloader.querySelector('.preloader-frame');
    const corners4 = preloader.querySelectorAll('.pl-corner');
    const marks = preloader.querySelectorAll('.pl-mark');
    const tagline = preloader.querySelector('.preloader-tagline');
    const statusRow = preloader.querySelector('.preloader-status-row');
    const progressRow = preloader.querySelector('.preloader-progress-row');
    const cornerLabels = preloader.querySelectorAll('.preloader-corner');
    const nameBlock = preloader.querySelector('.preloader-name');
    const soundToggle = document.getElementById('preloaderSoundToggle');

    if (soundToggle) {
        const syncToggleUI = () => {
            const isMuted = SFX.isMuted();
            soundToggle.setAttribute('aria-pressed', String(!isMuted));
        };
        syncToggleUI();
        soundToggle.addEventListener('click', () => {
            SFX.resume();
            SFX.setMuted(!SFX.isMuted());
            syncToggleUI();
            if (!SFX.isMuted()) SFX.click();
        });
    }

    const STATUS_STEPS = [
        { at: 0, label: 'Initializing systems' },
        { at: 22, label: 'Loading assets' },
        { at: 48, label: 'Calibrating motion' },
        { at: 78, label: 'Rendering interface' },
        { at: 96, label: 'Finalizing' }
    ];
    let statusIndex = 0;

    gsap.set(lineInners, { yPercent: 115 });
    gsap.set(corners4, { opacity: 0, scale: 0.6 });
    gsap.set(marks, { opacity: 0 });

    // ----- Intro: topbar, viewfinder frame, name reveal -----
    // Kept brisk so the full HUD (bar, tagline, status) is settled in
    // well before the counter/load cycle triggers the reveal below.
    const introTl = gsap.timeline();
    introTl
        .from(topbarItems, {
            opacity: 0,
            y: -12,
            duration: 0.45,
            stagger: { each: 0.08, onStart: () => SFX.tick(0.85) },
            ease: 'power3.out'
        })
        .to(topbarTick, { scaleX: 1, duration: 0.5, ease: 'power3.out', onStart: () => SFX.click() }, '-=0.2')
        .from(loadingTag, { opacity: 0, y: 12, duration: 0.35, ease: 'power3.out', onStart: () => SFX.tick(1.3) }, '-=0.15')
        .to(frame, { opacity: 1, duration: 0.3, ease: 'power2.out', onStart: () => SFX.hiss(0.3) }, '-=0.1')
        .to(corners4, {
            opacity: 0.4,
            scale: 1,
            duration: 0.4,
            stagger: { each: 0.05, onStart: () => SFX.tick(0.7) },
            ease: 'back.out(2)'
        }, '-=0.2')
        .to(lineInners, {
            yPercent: 0,
            duration: 0.8,
            stagger: { each: 0.1, onStart: () => SFX.reveal() },
            ease: 'power4.out'
        }, '-=0.2')
        .to(marks, { opacity: 0.55, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, '-=0.45')
        .to(tagline, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.3')
        .to(statusRow, { opacity: 1, duration: 0.35, ease: 'power2.out', onStart: () => SFX.tick(1.4) }, '-=0.2')
        .to(progressRow, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.2')
        .to(statusSub, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.2')
        .to(cornerLabels, { opacity: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' }, '-=0.25');
    // introTl now settles at roughly ~1.9s, leaving a clear window before
    // the counter (2.4s to 90%) and the load-gated finish tween complete.

    // ----- Counter: simulated progress gated by real page load -----
    const progress = { val: 0 };
    let pageLoaded = document.readyState === 'complete';
    window.addEventListener('load', () => { pageLoaded = true; });

    let lastTickAt = -1;
    function paintCounter() {
        const v = Math.min(100, Math.round(progress.val));
        counterEl.textContent = v;
        barFill.style.width = v + '%';

        // Odometer-style relay tick every ~4% of progress, pitch rising
        // as the load approaches completion.
        if (v >= lastTickAt + 4) {
            lastTickAt = v;
            SFX.counterTick(v);
        }

        while (
            statusIndex < STATUS_STEPS.length - 1 &&
            v >= STATUS_STEPS[statusIndex + 1].at
        ) {
            statusIndex++;
            statusSub.textContent = STATUS_STEPS[statusIndex].label;
            SFX.beep();
        }
    }

    gsap.to(progress, {
        val: 90,
        duration: 2.4,
        ease: 'power1.inOut',
        onUpdate: paintCounter,
        onComplete: waitForLoad
    });

    function waitForLoad() {
        if (pageLoaded) {
            finishCounter();
        } else {
            const check = setInterval(() => {
                if (pageLoaded) {
                    clearInterval(check);
                    finishCounter();
                }
            }, 100);
            // Safety net so the loader never hangs indefinitely
            setTimeout(() => {
                clearInterval(check);
                finishCounter();
            }, 2500);
        }
    }

    let finished = false;
    function finishCounter() {
        if (finished) return;
        finished = true;
        gsap.to(progress, {
            val: 100,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: paintCounter,
            onComplete: () => {
                statusSub.textContent = 'Ready';
                SFX.chime();
                gsap.delayedCall(0.5, revealSite);
            }
        });
    }

    // ----- Reveal: curtain split + exit choreography into the hero -----
    function revealSite() {
        const flash = preloader.querySelector('.preloader-flash');
        gsap.set(document.body, { opacity: 1 });
        gsap.set('.hero-visual', { opacity: 0 });

        const revealTl = gsap.timeline({
            defaults: { ease: 'power4.inOut' },
            onComplete: () => {
                preloader.remove();
                document.documentElement.classList.remove('is-loading');
                document.body.classList.remove('is-loading');
                document.body.style.opacity = '1';
                ScrollTrigger.refresh();
            }
        });

        revealTl
            // HUD elements settle out first, unhurried — a soft power-down click
            .to(nameBlock, { opacity: 0, y: -34, filter: 'blur(8px)', duration: 0.65, ease: 'power2.in', onStart: () => SFX.click() }, 0)
            .to(corners4, { opacity: 0, scale: 0.65, duration: 0.5, ease: 'power2.in' }, 0.05)
            .to(marks, { opacity: 0, duration: 0.45, ease: 'power2.in' }, 0.05)
            .to([topbarItems, loadingTag, tagline, statusRow, progressRow, statusSub, cornerLabels], {
                opacity: 0,
                y: -10,
                duration: 0.55,
                ease: 'power2.in',
                stagger: 0.04
            }, 0.1)

            // A quick, bright flash sweeps across the seam right as the curtains
            // begin to part — an electric zap sells the split
            .set(flash, { opacity: 1 }, 0.55)
            .fromTo(flash, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out', onStart: () => SFX.zap() }, 0.55)
            .to(flash, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 0.85)

            // Curtains part slowly, with a gentle zoom + blur breath for weight —
            // a hydraulic hiss primes the release just before they move
            .to([topHalf, bottomHalf], {
                scale: 1.04,
                filter: 'blur(1.5px)',
                duration: 0.5,
                ease: 'power2.in',
                onStart: () => SFX.hiss(0.5)
            }, 0.45)
            .to(topHalf, {
                yPercent: -101,
                duration: 1.7,
                ease: 'expo.inOut',
                onStart: () => SFX.servoWhoosh(1.7)
            }, 0.6)
            .to(bottomHalf, {
                yPercent: 101,
                duration: 1.7,
                ease: 'expo.inOut'
            }, 0.6)
            .to([topHalf, bottomHalf], {
                filter: 'blur(0px)',
                duration: 0.6,
                ease: 'power2.out'
            }, 0.9)
            // Heavy mechanical lock as the curtains finish parting
            .add(() => SFX.thunk(), 2.3)

            // Hero eases in slightly ahead of the curtains finishing, so the
            // reveal feels continuous rather than a hard cut
            .add(() => {
                initTextRollAnimations();
            }, 1.55)
            .fromTo('.hero-visual', { opacity: 0, scale: 0.94, filter: 'blur(6px)' }, {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                ease: 'power3.out',
                onStart: () => SFX.powerUp(0.9)
            }, 1.6)
            .add(() => {
                heroTl.play();
            }, 1.65);
    }
}

// ===== PARALLAX & PAGE LOAD INIT =====
document.addEventListener('DOMContentLoaded', initPreloader);

if ('ontouchstart' in window && cursor && cursorFollower) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// ===== TECH STACK SECTION =====

// Infinite marquee strip
const techMarquee = document.getElementById('techMarquee');
if (techMarquee) {
    gsap.to(techMarquee, {
        xPercent: -50,
        duration: 18,
        ease: 'none',
        repeat: -1
    });
}

// Card reveal + bar fill on scroll
gsap.utils.toArray('.tech-card').forEach((card, i) => {
    const fill = card.querySelector('.tech-bar-fill');
    const level = fill ? fill.dataset.level : 0;

    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        scale: 0.94,
        duration: 0.9,
        delay: (i % 4) * 0.08,
        ease: 'power3.out'
    });

    if (fill) {
        gsap.to(fill, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            width: level + '%',
            duration: 1.2,
            delay: 0.3 + (i % 4) * 0.08,
            ease: 'power2.out'
        });
    }
});

// Magnetic tilt + cursor-tracked glow (desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tech-card').forEach(card => {
        const strength = 10;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;

            gsap.to(card, {
                rotateY: (px - 0.5) * strength,
                rotateX: (0.5 - py) * strength,
                duration: 0.4,
                ease: 'power2.out'
            });

            card.style.setProperty('--mx', `${px * 100}%`);
            card.style.setProperty('--my', `${py * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        });
    });
}

// ===== SCROLL PROGRESS BAR =====
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

// ===== FOOTER ANIMATION =====
const footer = document.querySelector('.footer');

if (footer) {
    gsap.from('.footer-brand, .footer-navigation, .footer-cta', {
        scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 45,
        duration: 1,
        stagger: 0.14,
        ease: 'power3.out'
    });

    gsap.from('.footer-bottom', {
        scrollTrigger: {
            trigger: footer,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.35,
        ease: 'power3.out'
    });

    const footerLogo = document.querySelector('.footer-logo');

    if (footerLogo) {
        footerLogo.addEventListener('mouseenter', () => {
            gsap.to(footerLogo, {
                y: -4,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        footerLogo.addEventListener('mouseleave', () => {
            gsap.to(footerLogo, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    const footerCTA = document.querySelector('.footer-cta-button');

    if (footerCTA) {
        footerCTA.addEventListener('mouseenter', () => {
            gsap.to(footerCTA.querySelector('.footer-arrow'), {
                x: 6,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        footerCTA.addEventListener('mouseleave', () => {
            gsap.to(footerCTA.querySelector('.footer-arrow'), {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();

            gsap.to(window, {
                duration: 1.4,
                scrollTo: {
                    y: 0
                },
                ease: 'power4.inOut'
            });
        });

        backToTop.addEventListener('mouseenter', () => {
            gsap.to(backToTop, {
                y: -5,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        backToTop.addEventListener('mouseleave', () => {
            gsap.to(backToTop, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}