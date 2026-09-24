import {
  destroyAnimations,
  registerDirectionalAnimation,
} from './components/lottie-controller.js';

const form = document.querySelector('[data-contact-form]');

if (form) {
  const sendAnimation = form.querySelector('[data-send-animation]');
  const submitButton = form.querySelector('.contact-submit');
  let sendAnimationInstance = null;

  if (sendAnimation && submitButton) {
    registerDirectionalAnimation(
      sendAnimation.id,
      sendAnimation.dataset.sendAnimation,
      submitButton,
    ).then((animation) => {
      sendAnimationInstance = animation;
    }).catch(() => {});
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (sendAnimationInstance) {
      sendAnimationInstance.setDirection(1);
      if (sendAnimationInstance.isPaused) sendAnimationInstance.play();
    }

    const fields = new FormData(form);
    const portuguese = form.dataset.language === 'pt';
    const subject = fields.get('subject').trim();
    const body = portuguese
      ? `Olá, Giovanni!\n\n${fields.get('message').trim()}\n\nNome: ${fields.get('name').trim()}\nE-mail para resposta: ${fields.get('email').trim()}`
      : `Hi, Giovanni!\n\n${fields.get('message').trim()}\n\nName: ${fields.get('name').trim()}\nReply email: ${fields.get('email').trim()}`;

    window.location.href = `mailto:giovanni@trvzera.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  submitButton.disabled = false;

  window.addEventListener('pagehide', destroyAnimations, { once: true });
}

const sectionNavigation = document.querySelector('.contact-sidebar');
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

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) activeSection = sections.at(-1);

    links.forEach((link) => {
      link.toggleAttribute('aria-current', link.hash === `#${activeSection?.id}`);
      if (link.hasAttribute('aria-current')) link.setAttribute('aria-current', 'location');
    });

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
