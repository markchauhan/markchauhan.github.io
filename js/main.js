// ── Active nav on scroll ──────────────────
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => observer.observe(s));

// ── Scroll-in animation ──────────────────
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

sections.forEach(s => fadeObserver.observe(s));

// ── Nav link smooth scroll ──────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector('#' + link.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Update email in contact ──────────────────
// Replace the placeholder href with your actual email
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
  contactBtn.href = 'mailto:markchauhan@u.northwestern.edu';
}
