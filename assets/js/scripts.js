// HTML partial loader
document.addEventListener('DOMContentLoaded', async () => {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async slot => {
    const url = slot.getAttribute('data-include');
    const res = await fetch(url);
    const html = await res.text();
    slot.outerHTML = html;
  }));

  // ⬇️ ADD THIS BLOCK AFTER PARTIALS ARE LOADED ⬇️
  const menu = document.querySelector('.menu');
  if (menu) {
    const mq = window.matchMedia('(max-width: 700px)');

    const syncMenuOpen = () => {
      if (mq.matches) {
        // mobile: start CLOSED
        menu.removeAttribute('open');
      } else {
        // desktop/tablet: keep it OPEN
        menu.setAttribute('open', '');
      }
    };

    syncMenuOpen();                 // set initial state
    mq.addEventListener('change', syncMenuOpen); // update on resize/orientation
  }
  // ⬆️ END NEW BLOCK ⬆️
});

// ---- Theme toggle with persistence ----
(function(){
  const KEY = 'theme';
  const root = document.documentElement;

 const applySaved = () => {
    const saved = localStorage.getItem(KEY);
    if (saved === 'dark') { root.classList.add('theme-dark'); root.classList.remove('theme-light'); }
    if (saved === 'light'){ root.classList.add('theme-light'); root.classList.remove('theme-dark'); }
  };

  const updateButton = () => {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const isDark = root.classList.contains('theme-dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(isDark));
  };

  // initial
  applySaved();
  updateButton();

  // click handler (works across pages thanks to localStorage)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    const isDark = root.classList.contains('theme-dark');
    root.classList.toggle('theme-dark', !isDark);
    root.classList.toggle('theme-light',  isDark);
    localStorage.setItem(KEY, isDark ? 'light' : 'dark');
    updateButton();
  });

  // optional: keyboard shortcut “t” to toggle
  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() !== 't' || e.target.closest('input,textarea')) return;
    const fakeClick = new Event('click', {bubbles:true});
    document.querySelector('.theme-toggle')?.dispatchEvent(fakeClick);
  });
})();


 