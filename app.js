/* Yellow Couch Music V6 — client-only interactivity; works on GitHub Pages. */
(() => {
  'use strict';
  const content = window.YCM_CONTENT || {posts: [],pastShows: []};
  const posts = Array.isArray(content.posts) ? content.posts : [];
  const pastShows = Array.isArray(content.pastShows) ? content.pastShows : [];
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatDate = item => item.dateLabel || (item.date ? new Date(`${item.date}T12:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '');

  document.getElementById('copyright-year')?.replaceChildren(String(new Date().getFullYear()));
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  toggle?.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));
    nav?.classList.toggle('nav-open',open);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('nav-open');toggle?.setAttribute('aria-expanded','false')}));

  // Show safe graphic backgrounds when an optional image isn't uploaded yet.
  function guardImages(root=document){
    root.querySelectorAll('img:not([data-guarded])').forEach(img=>{
      img.dataset.guarded='true';
      img.addEventListener('error',()=>img.style.display='none');
    });
  }
  guardImages();

  const slides=[...document.querySelectorAll('.hero-slide')];
  const dots=[...document.querySelectorAll('.hero-dot')];
  if(slides.length){
    let current=0;
    const show=i=>{
      current=(i+slides.length)%slides.length;
      slides.forEach((slide,n)=>{slide.hidden=n!==current;slide.classList.toggle('is-active',n===current);slide.setAttribute('aria-hidden',String(n!==current));});
      dots.forEach((dot,n)=>{dot.classList.toggle('is-active',n===current);dot.setAttribute('aria-current',String(n===current));});
    };
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
    document.getElementById('hero-prev')?.addEventListener('click',()=>show(current-1));
    document.getElementById('hero-next')?.addEventListener('click',()=>show(current+1));
    show(0);
  }

  function mediaHTML(post, klass){
    const visual=safe(post.visual || 'album');
    const caption=safe(post.visualLabel || post.title).replace(/\n/g,'<br>');
    return `<div class="${klass}" data-visual="${visual}">${post.image ? `<img src="${safe(post.image)}" alt="${safe(post.title)}" loading="lazy">` : ''}<span class="fallback-text" aria-hidden="true">${caption}</span></div>`;
  }
  const grid=document.getElementById('posts-grid');
  if(grid){
    let expanded=false;
    const render=()=>{
      const visible=expanded?posts:posts.slice(0,2);
      grid.innerHTML=visible.length?visible.map(post=>`<article class="news-card"><a class="news-card-link" href="post.html?slug=${encodeURIComponent(post.slug)}">${mediaHTML(post,'news-media')}<div class="news-content"><span class="story-tag">${safe(post.kicker || post.category || 'From the journal')} / ${safe(formatDate(post))}</span><h3>${safe(post.title)}</h3><p>${safe(post.excerpt)}</p><div class="card-bottom"><span>THE YCM JOURNAL</span><b>READ MORE ↗</b></div></div></a></article>`).join(''):'<p>New stories are on the way.</p>';
      guardImages(grid);
      const button=document.getElementById('news-toggle');
      if(button){button.hidden=posts.length<=2;button.innerHTML=expanded?'SHOW LESS <span aria-hidden="true">↑</span>':'VIEW ALL <span aria-hidden="true">↗</span>';button.setAttribute('aria-expanded',String(expanded));}
    };
    document.getElementById('news-toggle')?.addEventListener('click',()=>{expanded=!expanded;render();});
    render();
  }
  const shows=document.getElementById('past-show-list');
  if(shows)shows.innerHTML=pastShows.length?pastShows.map(s=>`<div class="show-row"><span><strong>${safe(s.venue)}</strong><small>${safe(s.city)}</small></span><span>${safe(s.date)}</span></div>`).join(''):'<p>Past performances coming soon.</p>';

  const article=document.getElementById('post-detail');
  if(article){
    const slug=new URLSearchParams(location.search).get('slug');
    const post=posts.find(p=>p.slug===slug);
    if(!post){article.innerHTML='<h1>STORY NOT FOUND.</h1><p><a class="black-link" href="index.html#news">← BACK TO NEWS</a></p>';return;}
    document.title=`${post.title} | Yellow Couch Music`;
    article.innerHTML=`<div class="post-page-kicker"><span>${safe(post.kicker || post.category)}</span><span>${safe(formatDate(post))}</span></div><h1>${safe(post.title)}</h1><p class="post-deck">${safe(post.excerpt)}</p>${mediaHTML(post,'article-media')}<div class="article-body">${(post.body || []).map(p=>`<p>${safe(p)}</p>`).join('')}${post.externalUrl?`<a class="black-link" href="${safe(post.externalUrl)}" target="_blank" rel="noopener noreferrer">${safe(post.externalLabel || 'EXPLORE MORE')} ↗</a>`:''}</div><div class="article-end"><a href="index.html#news">← BACK TO THE JOURNAL</a><a href="https://www.instagram.com/yellowcouchmusic/" target="_blank" rel="noopener noreferrer">FOLLOW ON INSTAGRAM ↗</a></div>`;
    guardImages(article);
  }
})();
