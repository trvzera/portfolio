import { registerAnimation, destroyAnimations } from './components/lottie-controller.js';

const menu = document.querySelector('[data-site-menu]');

if (menu) {
  const toggle = menu.querySelector('.site-menu-toggle');
  const panel = menu.querySelector('.site-menu-panel');
  const animationPath = menu.dataset.animation;
  let animation = null;
  let open = false;

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

  toggle.addEventListener('click', () => setOpen(!open));
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

  registerAnimation('hamburger-animation', animationPath)
    .then((instance) => {
      if (!instance) return;
      animation = instance;
      animation.addEventListener('DOMLoaded', () => {
        menu.setAttribute('data-animation-ready', '');
        if (open) {
          animation.setDirection(1);
          animation.play();
        }
      });
    })
    .catch(() => {
      // The CSS icon remains usable when the CDN or JSON cannot load.
    });

  window.addEventListener('pagehide', destroyAnimations, { once: true });
}
