(function () {
  'use strict';
  const data = window.YCM_CONTENT || {posts: [], pastShows: []};
  const postsGrid = document.getElementById('posts-grid');
  const postGrid = document.getElementById('post-detail');
  const albumCover = document.getElementById('album-cover');
  if (albumCover) { const showArt = () => { if (albumCover.naturalWidth > 0) albumCover.classList.add('image-loaded'); }; albumCover.addEventListener('load', showArt); if (albumCover.complete) showArt(); }
  document.getElementById('copyright-year')?.replaceChildren(String(new Date().getFullYear()));
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  toggle?.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!expanded)); nav?.classList.toggle('nav-open', !expanded); });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { toggle?.setAttribute('aria-expanded','false'); nav.classList.remove('nav-open'); }));
  const safe = (value) => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (entry) => entry.dateLabel || new Date(`${entry.date}T12:00:00`).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
  const media = (p) => `<div class="post-media media-${safe(p.visual || 'album')}">${p.image ? `<img src="${safe(p.image)}" loading="lazy" alt="${safe(p.title)}" onerror="this.style.display='none'">` : ''}<span class="media-caption">${safe(p.visualLabel || p.title).replace(/\n/g,'<br>')}</span><span class="media-corner">YCM / ARCHIVE</span></div>`;
  let filter = 'all'; let showAll = false;
  function renderPosts() {
    if (!postsGrid) return;
    const filtered = data.posts.filter(p => filter === 'all' || p.category === filter);
    const visible = showAll ? filtered : filtered.slice(0,4);
    postsGrid.innerHTML = visible.map((p,i) => `<article class="journal-card ${i===0?'journal-card-featured':''}"><a class="post-link" href="post.html?slug=${encodeURIComponent(p.slug)}" aria-label="Read ${safe(p.title)}">${media(p)}<div class="post-copy"><div class="post-meta"><span>${safe(p.kicker)}</span><span>${safe(fmt(p))}</span></div><h3>${safe(p.title)}</h3><p>${safe(p.excerpt)}</p><span class="post-read">Read the story <span aria-hidden="true">↗</span></span></div></a></article>`).join('');
    if (!visible.length) postsGrid.innerHTML = '<p>No posts in this category yet. Check back soon.</p>';
    const more = document.getElementById('more-posts');
    if (more) {more.hidden = filtered.length <= 4; more.textContent = showAll ? 'Show fewer ↑' : 'More from the archive ↓';}
  }
  if (postsGrid) {
    document.getElementById('count-all')?.replaceChildren(`(${data.posts.length})`);
    document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {filter = btn.dataset.filter || 'all'; showAll = false; document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active',b===btn); b.setAttribute('aria-pressed',String(b===btn)); }); renderPosts();}));
    document.getElementById('more-posts')?.addEventListener('click', () => { showAll = !showAll; renderPosts(); });
    renderPosts();
  }
  const shows = document.getElementById('past-show-list');
  if (shows) shows.innerHTML = data.pastShows.map(s=>`<div class="show-row"><span><strong>${safe(s.venue)}</strong><small>${safe(s.city)}</small></span><span>${safe(s.date)}</span></div>`).join('');
  if (postGrid) {
    const slug = new URLSearchParams(location.search).get('slug');
    const post = data.posts.find(p=>p.slug===slug);
    if (!post) {postGrid.innerHTML = '<h1>Story not found.</h1><p><a href="index.html#journal">Return to the journal →</a></p>';return;}
    document.title = `${post.title} — Yellow Couch Music`;
    postGrid.innerHTML = `<div class="post-page-kicker"><span>${safe(post.kicker)}</span><span>${safe(fmt(post))}</span></div><h1>${safe(post.title)}</h1><p class="post-deck">${safe(post.excerpt)}</p>${media(post)}<div class="article-body">${post.body.map(par=>`<p>${safe(par)}</p>`).join('')}${post.externalUrl ? `<a class="button button-dark" href="${safe(post.externalUrl)}" target="_blank" rel="noopener noreferrer">${safe(post.externalLabel || 'Explore more')} ↗</a>`:''}</div><div class="article-end"><a href="index.html#journal">← Back to the journal</a><a href="https://www.instagram.com/yellowcouchmusic/" target="_blank" rel="noopener noreferrer">Follow along on Instagram ↗</a></div>`;
  }
})();
