/* ============================================================
   HARSH RAWAT — PORTFOLIO INTERACTIONS
   Scroll animations · Swiss Mask Text reveal · Smooth navigation
   Design Spells: Magnetic snapping, list element staggers
   Premium details: Lerped custom cursor, archive list image previews
   ============================================================ */

(function () {
  'use strict';

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTextReveal();
    initScrollAnimations();
    initNavigation();
    initMobileNav();
    initSmoothScroll();
    initSkillItemsStagger();
    
    // Design Spells (Tactile interactions)
    initMagneticElements();
    initCustomCursor();
    initArchiveHoverPreviews();
  }

  // ---------- Text Reveal Effect ----------
  function initTextReveal() {
    const titleEl = document.getElementById('heroTitle');
    if (!titleEl) return;

    const words = [
      { text: "Harsh ", accent: false },
      { text: "Rawat", accent: false },
      { text: " — ", accent: false },
      { text: "Graphics ", accent: false },
      { text: "Designer", accent: false },
      { text: " & ", accent: false },
      { text: "Motion ", accent: false },
      { text: "Artist.", accent: false }
    ];

    // Build HTML with inner wrapping span for overflow mask reveal
    const html = words.map((w) => {
      const cls = 'text-reveal-word';
      if (w.text.trim() === '') return w.text;
      
      const cleanVal = w.text.trim();
      const hasSpace = w.text.endsWith(' ') ? '&nbsp;' : '';
      return `<span class="${cls}"><span>${cleanVal}</span></span>${hasSpace}`;
    }).join(' ');

    titleEl.innerHTML = html;

    // Stagger reveal
    const wordEls = titleEl.querySelectorAll('.text-reveal-word');
    wordEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 100 + i * 75);
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
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
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
          if (window.scrollY > 40) {
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

        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      });
    });
  }

  // ---------- Skill Items Stagger ----------
  function initSkillItemsStagger() {
    const items = document.querySelectorAll('.skills__list li');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.closest('.skills__list');
            if (parent) {
              const children = parent.querySelectorAll('li');
              children.forEach((item, i) => {
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateX(0)';
                }, i * 60);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Initially hide items
    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-8px)';
      item.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    // Observe first item in each group
    document.querySelectorAll('.skills__list').forEach((group) => {
      const first = group.querySelector('li');
      if (first) observer.observe(first);
    });
  }

  // ---------- Design Spell 1: Magnetic Elements ----------
  function initMagneticElements() {
    const magnetics = document.querySelectorAll('[data-magnetic]');
    if (!magnetics.length) return;

    magnetics.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const bound = el.getBoundingClientRect();
        const x = e.clientX - (bound.left + bound.width / 2);
        const y = e.clientY - (bound.top + bound.height / 2);

        const strength = el.classList.contains('btn') ? 18 : 10;

        el.style.transform = `translate(${x * (strength / bound.width)}px, ${y * (strength / bound.height)}px)`;

        const inner = el.querySelector('span');
        if (inner) {
          inner.style.transform = `translate(${x * (strength * 1.3 / bound.width)}px, ${y * (strength * 1.3 / bound.height)}px)`;
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1.15, 0.45, 1.1)';
        
        const inner = el.querySelector('span');
        if (inner) {
          inner.style.transform = 'translate(0px, 0px)';
          inner.style.transition = 'transform 0.5s cubic-bezier(0.25, 1.15, 0.45, 1.1)';
        }
      });
      
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
        const inner = el.querySelector('span');
        if (inner) inner.style.transition = 'none';
      });
    });
  }

  // ---------- Design Spell 2: Custom Cursor (Lerped) ----------
  function initCustomCursor() {
    const ring = document.getElementById('customCursorRing');
    const dot = document.getElementById('customCursorDot');
    if (!ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the center dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Interpolate outer ring coordinates for dynamic lag
    function tick() {
      const ease = 0.16; // Lerping speed factor
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Expand ring on hovered links
    const hoverables = document.querySelectorAll('a, button, [data-magnetic], .archive__row, .project-module');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hovered');
      });
    });
  }

  // ---------- Design Spell 3: Archive List Image Previews ----------
  function initArchiveHoverPreviews() {
    const preview = document.getElementById('archiveHoverPreview');
    const rows = document.querySelectorAll('.archive__row[data-preview]');
    if (!preview || !rows.length) return;

    const img = preview.querySelector('img');

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const src = row.getAttribute('data-preview');
        if (img) img.src = src;
        preview.classList.add('active');
      });

      row.addEventListener('mousemove', (e) => {
        // Offset coordinates slightly to display box next to cursor
        preview.style.left = `${e.clientX + 140}px`;
        preview.style.top = `${e.clientY + 20}px`;
      });

      row.addEventListener('mouseleave', () => {
        preview.classList.remove('active');
      });
    });
  }

})();
