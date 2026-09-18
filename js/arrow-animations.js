import { loadLottie } from './components/lottie-controller.js';

const arrows = document.querySelectorAll('.link-arrow, .motion-open > span');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (arrows.length && !reducedMotion.matches) {
  const animationUrl = new URL('../lotties/arrow.json', import.meta.url);

  Promise.all([
    loadLottie(),
    fetch(animationUrl).then((response) => {
      if (!response.ok) throw new Error(`Could not load ${animationUrl}`);
      return response.json();
    }),
  ]).then(([lottie, animationData]) => {
    const instances = [];

    arrows.forEach((arrow) => {
      const link = arrow.closest('a');
      if (!link) return;

      const animation = lottie.loadAnimation({
        container: arrow,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: structuredClone(animationData),
      });

      instances.push(animation);
      let direction = -1;

      const updateDirection = () => {
        if (!arrow.classList.contains('arrow-animation-ready')) return;
        const nextDirection = link.matches(':hover, :focus-visible') ? 1 : -1;
        if (nextDirection === direction) return;
        direction = nextDirection;
        animation.setDirection(direction);
        if (animation.isPaused) animation.play();
      };

      animation.addEventListener('DOMLoaded', () => {
        if (arrow.firstChild?.nodeType === Node.TEXT_NODE) arrow.firstChild.remove();
        arrow.classList.add('arrow-animation-ready');
        updateDirection();
      });

      link.addEventListener('pointerenter', updateDirection);
      link.addEventListener('pointerleave', updateDirection);
      link.addEventListener('focusin', updateDirection);
      link.addEventListener('focusout', updateDirection);
    });

    window.addEventListener('pagehide', () => {
      instances.forEach((animation) => animation.destroy());
    }, { once: true });
  }).catch(() => {});
}
