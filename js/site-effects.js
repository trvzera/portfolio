const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

console.info(
  '%cVocê encontrou um acampamento escondido. Siga @trvzera no Instagram e depois arrume mais alguma coisa para fazer da vida.',
  'color: #0267ff; font: 600 0.8125rem system-ui;',
);

const loadingScreenByPage = {
  'home.html': 'home',
  'about.html': 'about',
  'skill.html': 'skills',
  'projects.html': 'projects',
  'contact.html': 'contact',
  'inspirations.html': 'inspirations',
};

function showLoadingScreen() {
  if (reducedMotion.matches) {
    document.querySelector('.page-loading-screen')?.remove();
    document.documentElement.classList.remove('loading-pending');
    return;
  }

  const page = window.location.pathname.split('/').pop() || 'home.html';
  const screen = loadingScreenByPage[page];
  if (!screen) {
    document.documentElement.classList.remove('loading-pending');
    return;
  }

  const language = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
  const existingOverlay = document.querySelector('.page-loading-screen');
  const overlay = existingOverlay || document.createElement('div');
  const video = existingOverlay?.querySelector('.page-loading-video') || document.createElement('video');
  let finished = false;
  let finishTimer;
  let fallbackTimer;
  const shownAt = performance.now();
  const minimumVisibleMs = 1000;
  const maximumBackgroundWaitMs = 3200;
  const loadingStartOffset = 0.3;
  const loadingEndOffset = 0.3;

  overlay.className = 'page-loading-screen';
  overlay.setAttribute('aria-hidden', 'true');
  video.className = 'page-loading-video';
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.disablePictureInPicture = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('disablepictureinpicture', '');
  if (!video.getAttribute('src')) {
    video.src = new URL(`../loading-screens/${language}/${screen}.webm`, import.meta.url);
  }

  const skipEmptyIntro = () => {
    if (video.currentTime >= loadingStartOffset) return;
    video.currentTime = Math.min(loadingStartOffset, Math.max(video.duration - 0.1, 0));
  };
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) skipEmptyIntro();
  else video.addEventListener('loadedmetadata', skipEmptyIntro, { once: true });

  const finish = () => {
    if (finished) return;
    const elapsed = performance.now() - shownAt;
    const remainingMinimum = minimumVisibleMs - elapsed;
    if (remainingMinimum > 0) {
      window.clearTimeout(finishTimer);
      finishTimer = window.setTimeout(finish, remainingMinimum);
      return;
    }
    const waitingForBackground = !document.body.classList.contains('performance-lite') &&
      !document.querySelector('.site-background-video.is-ready');
    if (waitingForBackground && elapsed < maximumBackgroundWaitMs) {
      window.clearTimeout(finishTimer);
      finishTimer = window.setTimeout(finish, 80);
      return;
    }
    finished = true;
    window.clearTimeout(finishTimer);
    window.clearTimeout(fallbackTimer);
    document.documentElement.classList.remove('loading-pending');
    document.documentElement.classList.add('loading-complete');
    overlay.classList.add('is-leaving');
    window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove('is-page-loading');
    }, 360);
  };

  const scheduleFinish = () => {
    window.clearTimeout(finishTimer);
    const remaining = Number.isFinite(video.duration)
      ? Math.max(video.duration - video.currentTime - loadingEndOffset, 0)
      : 2.5;
    finishTimer = window.setTimeout(finish, remaining * 1000);
  };

  const showVideo = () => video.classList.add('is-ready');

  video.addEventListener('loadeddata', showVideo, { once: true });
  video.addEventListener('playing', showVideo, { once: true });
  video.addEventListener('playing', scheduleFinish);
  video.addEventListener('seeking', scheduleFinish);
  video.addEventListener('waiting', () => window.clearTimeout(finishTimer));
  video.addEventListener('ended', finish, { once: true });
  video.addEventListener('error', finish, { once: true });
  if (!video.parentElement) overlay.append(video);
  document.body.classList.add('is-page-loading');
  if (!overlay.isConnected) document.body.append(overlay);
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) showVideo();
  fallbackTimer = window.setTimeout(finish, 3200);
  video.play().catch(finish);
}

showLoadingScreen();

let backgroundVideo = null;

function startBackgroundVideo() {
  if (reducedMotion.matches || document.body.classList.contains('performance-lite') || backgroundVideo) return;

  backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'site-background-video';
  backgroundVideo.autoplay = true;
  backgroundVideo.loop = true;
  backgroundVideo.muted = true;
  backgroundVideo.defaultMuted = true;
  backgroundVideo.playsInline = true;
  backgroundVideo.controls = false;
  backgroundVideo.disablePictureInPicture = true;
  backgroundVideo.preload = 'auto';
  backgroundVideo.setAttribute('autoplay', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('webkit-playsinline', '');
  backgroundVideo.setAttribute('disablepictureinpicture', '');
  backgroundVideo.setAttribute('x-webkit-airplay', 'deny');
  backgroundVideo.setAttribute('tabindex', '-1');
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundVideo.src = new URL('../media/videos/backloop.webm', import.meta.url);
  const showBackgroundVideo = () => backgroundVideo?.classList.add('is-ready');
  backgroundVideo.addEventListener('playing', showBackgroundVideo, { once: true });
  backgroundVideo.addEventListener('canplay', showBackgroundVideo, { once: true });
  document.body.prepend(backgroundVideo);
  backgroundVideo.play().catch(() => {});
}

function scheduleBackgroundVideo() {
  if (document.body.classList.contains('is-page-loading')) {
    startBackgroundVideo();
    return;
  }

  const start = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(startBackgroundVideo, { timeout: 1200 });
    } else {
      window.setTimeout(startBackgroundVideo, 250);
    }
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

scheduleBackgroundVideo();

window.addEventListener('performance-mode-change', (event) => {
  const loopingContentVideos = document.querySelectorAll('video[loop]:not(.site-background-video)');
  if (event.detail?.enabled) {
    backgroundVideo?.pause();
    backgroundVideo?.remove();
    backgroundVideo = null;
    loopingContentVideos.forEach((video) => video.pause());
  } else {
    startBackgroundVideo();
    loopingContentVideos.forEach((video) => video.play().catch(() => {}));
  }
});

if (document.body.classList.contains('performance-lite')) {
  document.querySelectorAll('video[loop]').forEach((video) => video.pause());
}

const homeUrl = new URL('home.html', window.location.href);

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || event.repeat || window.location.pathname === homeUrl.pathname ||
      document.body.classList.contains('is-page-leaving')) return;

  event.preventDefault();
  if (reducedMotion.matches) {
    window.location.assign(homeUrl.href);
    return;
  }

  document.body.classList.add('is-page-leaving');
  window.setTimeout(() => window.location.assign(homeUrl.href), 220);
});

const defaultProfilePhoto = new URL(
  document.querySelector('#main') ? '../imgs/banners/giovanni.webp' : '../imgs/banners/about2.webp',
  import.meta.url,
);
const footerProfilePhoto = new URL('../imgs/banners/about1.webp', import.meta.url);
const nameNodes = [];
const nameWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

while (nameWalker.nextNode()) {
  const node = nameWalker.currentNode;
  const parent = node.parentElement;
  if (node.textContent.includes('Giovanni Trivellato') &&
      !parent.closest('script, style, .about-name, .profile-name, .about-eyebrow, .projects-eyebrow, .skills-eyebrow, .contact-eyebrow')) nameNodes.push(node);
}

for (const node of nameNodes) {
  const parts = node.textContent.split('Giovanni Trivellato');
  const fragment = document.createDocumentFragment();

  parts.forEach((part, index) => {
    fragment.append(document.createTextNode(part));
    if (index === parts.length - 1) return;

    const name = document.createElement('span');
    name.className = 'profile-name';
    name.tabIndex = 0;
    name.append(document.createTextNode('Giovanni Trivellato'));

    const photo = document.createElement('img');
    photo.className = 'profile-name-photo';
    photo.src = node.parentElement.closest('footer') ? footerProfilePhoto : defaultProfilePhoto;
    photo.alt = '';
    name.append(photo);
    fragment.append(name);
  });

  node.replaceWith(fragment);
}

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
    ".about-hero, .about-section, .projects-hero, .projects-section-heading, .project-row, .motion-card, .skills-hero, .skills-section, .skill-card, .contact-hero, .contact-section, .contact-social-card, .contact-form, .inspirations-hero, .inspirations-section-heading, .origin-card, .inspiration-principle, .inspiration-closing, .credits-list",
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
    if (target.classList.contains("motion-card") || target.classList.contains("skill-card")) {
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
    const target = event.target.closest(
      'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])',
    );
    cursor.classList.toggle("is-active", Boolean(target));
  }, { passive: true });

  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) cursor.classList.remove("is-visible");
  });
}
