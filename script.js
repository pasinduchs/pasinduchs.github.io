const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});
const themeButtons = document.querySelectorAll('.theme-toggle');
let savedTheme = null;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch {}
const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101820' : '#FFFFFF';
  themeButtons.forEach((button) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    button.querySelector('.theme-label').textContent = theme === 'dark' ? 'Dark' : 'Light';
    button.setAttribute('aria-label', `Switch to ${next} mode`);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
}
setTheme(initialTheme);
themeButtons.forEach((button) => button.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')));

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const contactStatus = document.querySelector('#form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const idleButtonText = submitButton.textContent;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    contactStatus.textContent = 'Sending your message…';
    contactStatus.dataset.state = 'sending';
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending…';
    contactForm.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        throw new Error('Formspree did not confirm the submission.');
      }

      contactForm.reset();
      contactStatus.textContent = 'Thanks — your message was sent successfully.';
      contactStatus.dataset.state = 'success';
    } catch (error) {
      contactStatus.textContent = 'We couldn’t send your message. Please check your connection and try again.';
      contactStatus.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.textContent = idleButtonText;
      contactForm.removeAttribute('aria-busy');
    }
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

const sectionLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
const sections = [...sectionLinks].map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
function markCurrentSection(id) {
  sectionLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
markCurrentSection('top');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) markCurrentSection(visible[0].target.id);
  }, { rootMargin: '-76px 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.6] });
  sections.forEach((section) => sectionObserver.observe(section));
}


const siteHeader = document.querySelector('.site-header');
function updateHeaderScrollState() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
updateHeaderScrollState();
