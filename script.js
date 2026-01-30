document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const hoverables = document.querySelectorAll('a, button, .skill-card, .photo-frame');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Slight delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            follower.classList.add('follower-active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            follower.classList.remove('follower-active');
        });
    });

    // --- Vanilla Tilt Effect ---
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Reveal Animation on Scroll ---
    const revealElements = document.querySelectorAll('.hero-text, .hero-image-wrapper, .about-content, .contact-wrapper, .skill-card');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.style.opacity = '1';
                reveal.style.transform = 'translateY(0)';
                // Reset transform for tilt elements after reveal so they don't get stuck
                if (reveal.hasAttribute('data-tilt')) {
                    reveal.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                }
            }
        });
    }

    // Initial State for Animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once

    // --- Glitch Text Effect ---
    const title = document.querySelector('.glitch-text');
    if (title) {
        const originalText = title.getAttribute('data-text');
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;

        title.addEventListener("mouseover", event => {
            let iteration = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");
                if (iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });

        title.addEventListener("mouseleave", () => {
            title.innerText = originalText;
            clearInterval(interval);
        });
    }
});
