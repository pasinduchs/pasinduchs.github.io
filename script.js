const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const siteHeader = document.querySelector('.site-header');

const themeButtons = document.querySelectorAll('[data-theme-toggle]');
const themeColor = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme, persist = true) {
  const selectedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = selectedTheme;
  if (themeColor) themeColor.content = selectedTheme === 'light' ? '#F4F6F8' : '#05070D';
  themeButtons.forEach((button) => {
    const isLight = selectedTheme === 'light';
    button.setAttribute('aria-pressed', String(isLight));
    button.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
    button.title = `Switch to ${isLight ? 'dark' : 'light'} theme`;
  });
  if (persist) {
    try { localStorage.setItem('portfolio-theme', selectedTheme); } catch { /* Storage may be disabled. */ }
  }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Use the dark theme by default. */ }
applyTheme(savedTheme === 'light' ? 'light' : 'dark', false);
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
});

if (siteHeader) {
  const updateHeader = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 18);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !open);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const status = document.querySelector('#form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const buttonLabel = submitButton.querySelector('.button-label');
  const idleLabel = buttonLabel.textContent;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    contactForm.classList.add('is-submitting');
    contactForm.setAttribute('aria-busy', 'true');
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    buttonLabel.textContent = 'Sending…';
    status.textContent = 'Sending your message…';
    status.dataset.state = 'sending';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      let result = {};
      try { result = await response.json(); } catch { /* Keep a useful form error below. */ }
      if (!response.ok || result.ok !== true) throw new Error('Formspree did not confirm the submission.');

      contactForm.reset();
      status.textContent = 'Thanks — your message was sent successfully.';
      status.dataset.state = 'success';
    } catch {
      status.textContent = 'We couldn’t send your message. Please check your connection and try again.';
      status.dataset.state = 'error';
    } finally {
      contactForm.classList.remove('is-submitting');
      contactForm.removeAttribute('aria-busy');
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      buttonLabel.textContent = idleLabel;
    }
  });
}

document.querySelectorAll('#year').forEach((year) => {
  year.textContent = new Date().getFullYear();
});
