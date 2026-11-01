/* YCM V7 collaborator filters — no dependencies, works on GitHub Pages. */
(() => {
  'use strict';
  document.getElementById('copyright-year')?.replaceChildren(String(new Date().getFullYear()));
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('nav-open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  const buttons = [...document.querySelectorAll('.people-filter')];
  const cards = [...document.querySelectorAll('.person-card')];
  const search = document.getElementById('people-search');
  const counter = document.getElementById('people-count');
  const empty = document.getElementById('people-empty');
  let category = 'all';
  const update = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const match = (category === 'all' || card.dataset.category === category) &&
        (card.dataset.search || '').includes(query);
      card.hidden = !match;
      if (match) count++;
    });
    if (counter) counter.textContent = `SHOWING ${count} OF ${cards.length} COLLABORATORS`;
    if (empty) empty.hidden = count !== 0;
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    update();
  }));
  search?.addEventListener('input', update);
  update();
  if (window.location.hash) {
    const slug = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(slug);
    if (target?.classList.contains('person-card')) target.scrollIntoView({block:'start'});
  }
})();
