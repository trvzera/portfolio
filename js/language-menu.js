import { registerAnimation } from './components/lottie-controller.js';

const languageMenu = document.querySelector('[data-language-menu]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (languageMenu) {
  const toggle = languageMenu.querySelector('.lang-toggle');
  const animationPath = languageMenu.dataset.chevronAnimation;
  let animation = null;
  let open = false;

  function setOpen(nextOpen) {
    if (open === nextOpen) return;
    open = nextOpen;
    languageMenu.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (animation) {
      animation.setDirection(open ? 1 : -1);
      if (animation.isPaused) animation.play();
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(!open);
  });

  document.addEventListener('click', (event) => {
    if (!languageMenu.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && languageMenu.hasAttribute('data-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  if (animationPath && !reducedMotion.matches) {
    registerAnimation('language-chevron-animation', animationPath)
      .then((instance) => {
        if (!instance) return;
        animation = instance;
        animation.addEventListener('DOMLoaded', () => {
          languageMenu.setAttribute('data-chevron-ready', '');
          if (open) {
            animation.setDirection(1);
            animation.play();
          }
        });
      })
      .catch(() => {});
  }
}
