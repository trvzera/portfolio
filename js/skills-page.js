const sectionNavigation = document.querySelector('.skills-sidebar');
const backToTop = document.querySelector('.back-to-top');

if (sectionNavigation && backToTop) {
  const links = [...sectionNavigation.querySelectorAll('a[href^="#"]')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let scheduled = false;

  function updateScrollState() {
    scheduled = false;
    const marker = window.innerHeight * .4;
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
