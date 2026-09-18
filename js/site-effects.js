const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches) {
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('is-page-leaving');
  });

  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') ||
        (link.target && link.target !== '_self') ||
        document.body.classList.contains('is-page-leaving')) return;

    const destination = new URL(link.href);
    if (destination.href === window.location.href ||
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
         destination.search === window.location.search && destination.hash)) return;

    event.preventDefault();
    document.body.classList.add('is-page-leaving');
    window.setTimeout(() => window.location.assign(link.href), 220);
  });
}

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".about-hero, .about-section, .projects-hero, .projects-section-heading, .project-row, .motion-card, .app-container, .bottom-container",
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }
    },
    { threshold: 0.12, rootMargin: "60px 0px -32px 0px" },
  );

  revealTargets.forEach((target, index) => {
    if (target.classList.contains("motion-card")) {
      target.style.setProperty("--reveal-delay", `${(index % 3) * 80}ms`);
    }
    target.classList.add("reveal-pending");
    revealObserver.observe(target);
  });
}

const finePointer = window.matchMedia("(pointer: fine)");
if (finePointer.matches && !reducedMotion.matches) {
  const cursor = document.createElement("div");
  cursor.className = "site-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.append(cursor);

  let x = 0;
  let y = 0;
  let currentX = 0;
  let currentY = 0;
  let running = false;

  function animateCursor() {
    currentX += (x - currentX) * 0.24;
    currentY += (y - currentY) * 0.24;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    if (Math.abs(x - currentX) + Math.abs(y - currentY) > 0.2) {
      requestAnimationFrame(animateCursor);
    } else {
      running = false;
    }
  }

  document.addEventListener("pointermove", (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!cursor.classList.contains("is-visible")) {
      currentX = x;
      currentY = y;
      cursor.classList.add("is-visible");
    }
    if (!running) {
      running = true;
      requestAnimationFrame(animateCursor);
    }
    const target = event.target.closest("a, button");
    cursor.classList.toggle("is-active", Boolean(target));
  }, { passive: true });

  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) cursor.classList.remove("is-visible");
  });
}
