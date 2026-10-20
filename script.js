/* Portfólio Gustavo Aires — JavaScript progressivo, sem dependências. */
document.documentElement.classList.add('js');

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const menuButton = $('#mobile-toggle');
const nav = $('#main-nav');

function closeMenu() {
  if (!menuButton || !nav) return;
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  const use = $('use', menuButton);
  if (use) use.setAttribute('href', '#ico-menu');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opening = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
    const use = $('use', menuButton);
    if (use) use.setAttribute('href', opening ? '#ico-close' : '#ico-menu');
  });

  $$('#main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 790) closeMenu(); });
}

const themeButton = $('#theme-toggle');
function applyTheme(theme) {
  const mode = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = mode;
  if (themeButton) {
    themeButton.setAttribute('aria-label', mode === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
    themeButton.setAttribute('title', mode === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
    const use = $('use', themeButton);
    if (use) use.setAttribute('href', mode === 'light' ? '#ico-moon' : '#ico-sun');
  }
}
let storedTheme = '';
try { storedTheme = localStorage.getItem('ga-theme') || ''; } catch (_) {}
const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(storedTheme || (systemPrefersLight ? 'light' : 'dark'));
if (themeButton) themeButton.addEventListener('click', () => {
  const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  try { localStorage.setItem('ga-theme', newTheme); } catch (_) {}
});

const filterButtons = $$('.filter-btn');
const certificateCards = $$('.cert-card');
const filterStatus = $('#filter-status');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visible = 0;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    certificateCards.forEach(card => {
      const show = category === 'todos' || card.dataset.category === category;
      card.hidden = !show;
      if (show) visible++;
    });
    if (filterStatus) filterStatus.textContent = visible + (visible === 1 ? ' certificado exibido' : ' certificados exibidos');
  });
});

const revealNodes = $$('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, {threshold:0.08,rootMargin:'0px 0px -25px 0px'});
  revealNodes.forEach(node => revealObserver.observe(node));
} else {
  revealNodes.forEach(node => node.classList.add('is-visible'));
}

const navLinks = $$('#main-nav a');
if ('IntersectionObserver' in window && navLinks.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin:'-27% 0px -60% 0px'});
  ['sobre', 'experiencia', 'projetos', 'certificacoes', 'contato'].forEach(id => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

const progress = $('#reading-progress');
let ticking = false;
function updateReadingProgress() {
  ticking = false;
  if (!progress) return;
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 0) + '%';
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateReadingProgress);
  }
}, {passive:true});
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());
