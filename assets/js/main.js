// =============================================================================
// Main JavaScript - Theme Toggle, Reading Progress, Mobile Menu
// =============================================================================

(function() {
  'use strict';

  // ===========================================================================
  // Theme Toggle (Dark/Light Mode)
  // ===========================================================================

  const THEME_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function setStoredTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) {
      return stored;
    }
    // Default to dark mode (as per design spec)
    return DARK;
  }

  function applyTheme(theme) {
    if (theme === LIGHT) {
      document.documentElement.setAttribute('data-theme', LIGHT);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === LIGHT ? DARK : LIGHT;
    applyTheme(newTheme);
    setStoredTheme(newTheme);
  }

  // Apply theme immediately to prevent flash
  applyTheme(getPreferredTheme());

  // ===========================================================================
  // Reading Progress Bar
  // ===========================================================================

  function updateReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    const article = document.querySelector('.post-content') || document.querySelector('article');
    if (!article) {
      progressBar.style.display = 'none';
      return;
    }

    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    // Calculate progress
    const start = articleTop - windowHeight / 2;
    const end = articleTop + articleHeight - windowHeight / 2;
    const progress = Math.max(0, Math.min(100, ((scrollTop - start) / (end - start)) * 100));

    progressBar.style.width = progress + '%';
  }

  // ===========================================================================
  // Back to Top Button
  // ===========================================================================

  function updateBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    if (window.scrollY > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ===========================================================================
  // Mobile Menu Toggle
  // ===========================================================================

  function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navLinks && menuToggle) {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    }
  }

  function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navLinks && menuToggle) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // ===========================================================================
  // Copy Code Button
  // ===========================================================================

  function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.highlight pre');

    codeBlocks.forEach(function(pre) {
      const wrapper = pre.closest('.highlight');
      if (!wrapper || wrapper.querySelector('.copy-button')) return;

      const button = document.createElement('button');
      button.className = 'copy-button';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

      button.addEventListener('click', function() {
        const code = pre.textContent;
        navigator.clipboard.writeText(code).then(function() {
          button.classList.add('copied');
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

          setTimeout(function() {
            button.classList.remove('copied');
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
          }, 2000);
        });
      });

      wrapper.appendChild(button);
    });
  }

  // ===========================================================================
  // Initialize on DOM Ready
  // ===========================================================================

  document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', scrollToTop);
    }

    // Copy buttons for code blocks
    addCopyButtons();

    // Initial updates
    updateReadingProgress();
    updateBackToTop();
  });

  // ===========================================================================
  // Scroll Event Listeners (throttled)
  // ===========================================================================

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateReadingProgress();
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 640) {
      closeMobileMenu();
    }
  });

})();
