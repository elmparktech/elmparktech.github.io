(() => {
  // Mobile navigation toggle
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Interactive spotlight tracking on the bottom-most footer logo
  const logoStage = document.querySelector('[data-logo-stage]');
  if (logoStage) {
    logoStage.addEventListener('pointermove', (event) => {
      const rect = logoStage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      logoStage.style.setProperty('--mx', `${x.toFixed(2)}%`);
      logoStage.style.setProperty('--my', `${y.toFixed(2)}%`);
    });
  }

  // Keep footer copyright year current
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
