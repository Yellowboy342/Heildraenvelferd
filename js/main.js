/**
 * Heildrænvelferð — Main JavaScript
 * Navigation, mobile menu, smooth scroll, header effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      navOverlay.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // --- Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Dropdown Menu (Desktop) ---
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    // Keyboard accessibility
    if (toggle) {
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('open');
          toggle.setAttribute('aria-expanded',
            dropdown.classList.contains('open'));
        }
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Intersection Observer for Fade-in Animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});
