/* ============================================================
   HARSH RAWAT — PORTFOLIO INTERACTIONS
   Scroll animations · Text reveal · Smooth navigation
   ============================================================ */

(function () {
  'use strict';

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTextReveal();
    initScrollAnimations();
    initNavigation();
    initScrollProgress();
    initMobileNav();
    initSmoothScroll();
    initSkillTagStagger();
  }

  // ---------- Text Reveal Effect ----------
  function initTextReveal() {
    const titleEl = document.getElementById('heroTitle');
    if (!titleEl) return;

    const words = [
      { text: "I'm ", accent: false },
      { text: "Harsh ", accent: false },
      { text: "Rawat", accent: true },
      { text: " — ", accent: false },
      { text: "a ", accent: false },
      { text: "Creative ", accent: false },
      { text: "Developer", accent: true },
    ];

    // Build HTML
    const html = words.map((w) => {
      const cls = w.accent ? 'text-reveal-word hero__title-accent' : 'text-reveal-word';
      return `<span class="${cls}">${w.text}</span>`;
    }).join('');

    titleEl.innerHTML = html;

    // Stagger reveal
    const wordEls = titleEl.querySelectorAll('.text-reveal-word');
    wordEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 300 + i * 120);
    });
  }

  // ---------- Scroll-Triggered Animations ----------
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ---------- Navigation Scroll Effect ----------
  function initNavigation() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---------- Scroll Progress ----------
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollTop / docHeight, 1);
        progressBar.style.transform = `scaleX(${progress})`;
      });
    });
  }

  // ---------- Mobile Nav ----------
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Smooth Scroll ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      });
    });
  }

  // ---------- Skill Tags Stagger ----------
  function initSkillTagStagger() {
    const tags = document.querySelectorAll('.skill-tag');
    if (!tags.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.closest('.skills__tags');
            if (parent) {
              const children = parent.querySelectorAll('.skill-tag');
              children.forEach((tag, i) => {
                tag.style.transitionDelay = `${i * 0.05}s`;
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Initially hide tags
    tags.forEach((tag) => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(10px)';
      tag.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    // Observe first tag in each group
    document.querySelectorAll('.skills__tags').forEach((group) => {
      const first = group.querySelector('.skill-tag');
      if (first) observer.observe(first);
    });
  }

})();
