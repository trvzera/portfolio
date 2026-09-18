const sectionNavigation = document.querySelector('.about-sidebar');
const backToTop = document.querySelector('.back-to-top');

if (sectionNavigation && backToTop) {
  const links = [...sectionNavigation.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);
  let scheduled = false;

  function updateScrollState() {
    scheduled = false;
    const marker = window.innerHeight * 0.38;
    let activeSection = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) activeSection = section;
    }

    const atPageEnd = window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    if (atPageEnd) activeSection = sections.at(-1);

    for (const link of links) {
      if (link.hash === `#${activeSection?.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }

    backToTop.toggleAttribute('data-visible', window.scrollY > window.innerHeight * 0.65);
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
