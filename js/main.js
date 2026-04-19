// ── Scroll-in animations ──
const sections = document.querySelectorAll('.section');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });
sections.forEach(s => fadeObserver.observe(s));

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── Project filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards  = document.querySelectorAll('.projects-grid .proj-card');
const emptyMsg   = document.getElementById('filter-empty');
const grid       = document.getElementById('projects-grid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;

    projCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.split(' ').includes(filter);
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // handle featured card spanning — reset to span 2 when visible, span 1 if hidden
    const featured = document.querySelector('.proj-card.featured');
    if (featured && !featured.classList.contains('hidden')) {
      featured.style.gridColumn = 'span 2';
    }

    emptyMsg.style.display = visible === 0 ? 'block' : 'none';

    // fix grid background gap when cards are hidden
    grid.style.background = visible > 0 ? 'var(--border)' : 'transparent';
  });
});
