const menu = document.querySelector('[data-site-menu]');
console.log("O que você tá fazendo aqui? Aproveita e me segue no Instagram: @strvzera");
if (menu) {
  const toggle = menu.querySelector('.site-menu-toggle');
  const panel = menu.querySelector('.site-menu-panel');
  const animationPath = menu.dataset.animation;
  const languageLink = panel.querySelector('.site-menu-language');
  const performanceButton = document.createElement('button');
  const performanceAnimationPath = new URL('../lotties/toggle.json', import.meta.url).href;
  let performanceLite = false;
  let performanceAnimation = null;
  let performanceAnimationPromise = null;

  try {
    performanceLite = localStorage.getItem('portfolio:performance-lite') === 'true';
  } catch {
    performanceLite = false;
  }

  document.body.classList.toggle('performance-lite', performanceLite);
  performanceButton.type = 'button';
  performanceButton.className = 'site-menu-performance';
  performanceButton.setAttribute('role', 'switch');
  performanceButton.innerHTML = `
    <span>${document.documentElement.lang.startsWith('en') ? 'Performance mode' : 'Modo desempenho'}</span>
    <span class="site-menu-performance-toggle" aria-hidden="true">
      <span id="performance-toggle-animation" class="site-menu-performance-animation"></span>
      <span class="site-menu-performance-fallback"><span></span></span>
    </span>`;
  languageLink?.before(performanceButton);

  const updatePerformanceButton = () => {
    performanceButton.setAttribute('aria-checked', String(performanceLite));
    performanceButton.setAttribute(
      'aria-label',
      document.documentElement.lang.startsWith('en')
        ? `Performance mode: ${performanceLite ? 'on' : 'off'}`
        : `Modo desempenho: ${performanceLite ? 'ativado' : 'desativado'}`,
    );
  };

  function ensurePerformanceAnimation() {
    if (performanceAnimationPromise || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return performanceAnimationPromise;
    }

    performanceAnimationPromise = import('./components/lottie-controller.js')
      .then(({ registerAnimation }) => registerAnimation(
        'performance-toggle-animation',
        performanceAnimationPath,
      ))
      .then((instance) => {
        if (!instance) return null;
        performanceAnimation = instance;
        performanceAnimation.addEventListener('DOMLoaded', () => {
          performanceButton.setAttribute('data-animation-ready', '');
          performanceAnimation.goToAndStop(
            performanceLite ? performanceAnimation.totalFrames - 1 : 0,
            true,
          );
        });
        return instance;
      })
      .catch(() => null);

    return performanceAnimationPromise;
  }

  updatePerformanceButton();
  ensurePerformanceAnimation();
  performanceButton.addEventListener('click', () => {
    performanceLite = !performanceLite;
    document.body.classList.toggle('performance-lite', performanceLite);
    try {
      localStorage.setItem('portfolio:performance-lite', String(performanceLite));
    } catch {
      // The mode still works for the current page when storage is unavailable.
    }
    updatePerformanceButton();
    if (performanceAnimation) {
      performanceAnimation.setDirection(performanceLite ? 1 : -1);
      performanceAnimation.play();
    }
    window.dispatchEvent(new CustomEvent('performance-mode-change', {
      detail: { enabled: performanceLite },
    }));
  });

  const cascadeItems = panel.querySelectorAll('.site-menu-group > *, .site-menu-performance, .site-menu-language');
  let animation = null;
  let animationPromise = null;
  let open = false;

  cascadeItems.forEach((item, index) => {
    item.style.setProperty('--menu-item-index', index);
  });
  menu.setAttribute('data-cascade-ready', '');

  function setOpen(value) {
    open = value;
    menu.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? menu.dataset.closeLabel : menu.dataset.openLabel);
    panel.setAttribute('aria-hidden', String(!open));
    if (animation) {
      animation.setDirection(open ? 1 : -1);
      animation.play();
    }
  }

  function ensureAnimation() {
    if (animationPromise || !animationPath || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return animationPromise;
    }

    animationPromise = import('./components/lottie-controller.js')
      .then(({ registerAnimation }) => registerAnimation('hamburger-animation', animationPath))
      .then((instance) => {
        if (!instance) return null;
        animation = instance;
        animation.addEventListener('DOMLoaded', () => {
          menu.setAttribute('data-animation-ready', '');
          if (open) {
            animation.setDirection(1);
            animation.play();
          }
        });
        return instance;
      })
      .catch(() => null);

    return animationPromise;
  }

  ensureAnimation();
  toggle.addEventListener('click', () => {
    ensureAnimation();
    setOpen(!open);
  });
  document.addEventListener('click', (event) => {
    if (open && !menu.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  window.addEventListener('pagehide', () => {
    animation?.destroy();
    performanceAnimation?.destroy();
  }, { once: true });
}
