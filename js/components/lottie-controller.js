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

export function destroyAnimations() {
  animations.forEach((animation) => animation.destroy());
  animations.clear();
}
