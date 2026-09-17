const languageMenu = document.querySelector('[data-language-menu]');

if (languageMenu) {
  const toggle = languageMenu.querySelector('.lang-toggle');

  function setOpen(open) {
    languageMenu.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => {
    setOpen(!languageMenu.hasAttribute('data-open'));
  });

  document.addEventListener('click', (event) => {
    if (!languageMenu.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && languageMenu.hasAttribute('data-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}
