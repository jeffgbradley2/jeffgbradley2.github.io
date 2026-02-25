(function() {
  'use strict';

  // Theme toggle
  function toggleTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      updateToggleLabel('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateToggleLabel('light');
    }
  }

  function updateToggleLabel(label) {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = label;
  }

  // Set initial toggle label
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  updateToggleLabel(isDark ? 'light' : 'dark');

  // Mobile menu
  function toggleMobileMenu() {
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    if (header && toggle) {
      var isOpen = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', isOpen);
    }
  }

  // Copy code buttons
  function addCopyButtons() {
    var codeBlocks = document.querySelectorAll('.highlight pre');
    codeBlocks.forEach(function(pre) {
      var wrapper = pre.closest('.highlight');
      if (!wrapper || wrapper.querySelector('.copy-button')) return;

      var button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'copy';
      button.setAttribute('aria-label', 'Copy code');

      button.addEventListener('click', function() {
        navigator.clipboard.writeText(pre.textContent).then(function() {
          button.textContent = 'copied';
          button.classList.add('copied');
          setTimeout(function() {
            button.textContent = 'copy';
            button.classList.remove('copied');
          }, 2000);
        });
      });

      wrapper.appendChild(button);
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', function() {
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    var menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);

    addCopyButtons();
  });

  // Close mobile menu on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 640) {
      var header = document.querySelector('.site-header');
      if (header) header.classList.remove('menu-open');
    }
  });
})();
