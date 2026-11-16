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

  // Dotted particle wave mesh in the hero section
  const particleCanvas = document.querySelector('[data-hero-particles]');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = particleCanvas.clientWidth;
      height = particleCanvas.clientHeight;
      particleCanvas.width = Math.floor(width * dpr);
      particleCanvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawParticles = (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.0008;
      const cols = Math.max(36, Math.floor(width / 22));
      const rows = 14;

      for (let r = 0; r < rows; r++) {
        const rowRatio = r / (rows - 1);
        const baseY = height * (0.42 + rowRatio * 0.52);

        for (let c = 0; c < cols; c++) {
          const colRatio = c / (cols - 1);
          const x = colRatio * width;

          // Undulating dual-sine wave cresting toward the left-center like the brand banner
          const wave1 = Math.sin(colRatio * 6.5 + t + rowRatio * 1.8) * (18 + rowRatio * 10);
          const wave2 = Math.cos(colRatio * 3.4 - t * 0.7 + rowRatio * 2.4) * 14;
          const y = baseY + wave1 + wave2;

          // Fade out softly on far right so the coral wave takes focus
          const horizontalFade = Math.max(0, 1 - Math.pow(colRatio, 1.85) * 0.85);
          const verticalFade = Math.sin(rowRatio * Math.PI) * 0.85 + 0.15;
          const alpha = 0.52 * horizontalFade * verticalFade;

          if (alpha <= 0.03) continue;

          const radius = 0.9 + (1 - rowRatio) * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          // Blend royal blue, electric cyan, and subtle violet accents
          if ((c + r) % 7 === 0) {
            ctx.fillStyle = `rgba(124, 92, 255, ${alpha.toFixed(3)})`;
          } else if (rowRatio < 0.35) {
            ctx.fillStyle = `rgba(96, 165, 250, ${alpha.toFixed(3)})`;
          } else {
            ctx.fillStyle = `rgba(30, 86, 217, ${(alpha * 1.1).toFixed(3)})`;
          }
          ctx.fill();
        }
      }
    };

    resize();
    window.addEventListener('resize', () => {
      resize();
      if (prefersReducedMotion) drawParticles(0);
    });

    if (prefersReducedMotion) {
      drawParticles(0);
    } else {
      const tick = (now) => {
        drawParticles(now);
        frameId = window.requestAnimationFrame(tick);
      };
      frameId = window.requestAnimationFrame(tick);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden && frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = null;
        } else if (!document.hidden && !frameId) {
          frameId = window.requestAnimationFrame(tick);
        }
      });
    }
  }

  // Keep footer copyright year current
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
