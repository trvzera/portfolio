const navigation = document.querySelector('.inspirations-sidebar');
const backToTop = document.querySelector('.back-to-top');
const storySteps = document.querySelectorAll('.story-step');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const canAnimateStory = !reducedMotion.matches && 'IntersectionObserver' in window;

document.body.toggleAttribute('data-story-ready', canAnimateStory);

if (navigation && backToTop) {
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let scheduled = false;

  function updateScrollState() {
    scheduled = false;
    const marker = window.innerHeight * .38;
    let activeSection = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) activeSection = section;
    }

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      activeSection = sections.at(-1);
    }

    for (const link of links) {
      link.toggleAttribute('aria-current', link.hash === `#${activeSection?.id}`);
      if (link.hasAttribute('aria-current')) link.setAttribute('aria-current', 'location');
    }

    backToTop.toggleAttribute('data-visible', window.scrollY > window.innerHeight * .65);
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateScrollState);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateScrollState();
}

if (!canAnimateStory) {
  storySteps.forEach((step) => step.classList.add('is-story-visible'));
} else {
  const storyObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-story-visible', entry.isIntersecting);
      const video = entry.target.querySelector('video');
      if (!video) continue;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }
  }, { threshold: .22, rootMargin: '40px 0px -12% 0px' });

  storySteps.forEach((step) => storyObserver.observe(step));
}
