let lottiePromise;
const animations = new Map();

export function loadLottie() {
  if (!lottiePromise) {
    lottiePromise = import('https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/+esm')
      .then((module) => module.default);
  }
  return lottiePromise;
}

export async function registerAnimation(id, path, options = {}) {
  const container = document.getElementById(id);
  if (!container) return null;

  const lottie = await loadLottie();
  const animation = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path,
    ...options,
  });
  animations.set(id, animation);
  return animation;
}

export async function registerDirectionalAnimation(id, path, trigger) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const animation = await registerAnimation(id, path);
  if (!animation || !trigger) return animation;

  let direction = -1;
  const playDirection = (nextDirection) => {
    if (nextDirection === direction) return;
    direction = nextDirection;
    animation.setDirection(direction);
    if (animation.isPaused) animation.play();
  };

  animation.addEventListener('DOMLoaded', () => {
    trigger.setAttribute('data-animation-ready', '');
    if (trigger.matches(':hover, :focus-within')) playDirection(1);
  });

  trigger.addEventListener('pointerenter', () => playDirection(1));
  trigger.addEventListener('pointerleave', () => playDirection(-1));
  trigger.addEventListener('focusin', () => playDirection(1));
  trigger.addEventListener('focusout', () => playDirection(-1));

  return animation;
}

export function destroyAnimations() {
  animations.forEach((animation) => animation.destroy());
  animations.clear();
}
