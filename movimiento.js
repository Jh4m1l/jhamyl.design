(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  const cards = [...document.querySelectorAll('.project-select')];
  const selectedName = document.getElementById('selectedName');
  const names = ['Certificación Terapeuta Emocional', 'Conectando Mentes Brillantes', 'Retiro Rompe Tus Límites', 'Hoy Elijo Ser Lilia'];
  const select = (index) => {
    cards.forEach((card, i) => card.classList.toggle('is-active', i === index));
    if (selectedName) selectedName.textContent = names[index];
  };
  cards.forEach((card, index) => {
    card.addEventListener('pointerenter', () => select(index));
    card.addEventListener('focus', () => select(index));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); cards[(index + 1) % cards.length].focus(); }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); cards[(index - 1 + cards.length) % cards.length].focus(); }
    });
    const prefetch = () => {
      if (!card.dataset.prefetched) {
        const link = document.createElement('link'); link.rel = 'prefetch'; link.href = card.href;
        document.head.append(link); card.dataset.prefetched = 'true';
      }
    };
    card.addEventListener('pointerenter', prefetch, { once: true });
    card.addEventListener('focus', prefetch, { once: true });
  });

  const infoToggle = document.getElementById('infoToggle');
  const infoLinks = document.getElementById('infoLinks');
  if (infoToggle && infoLinks) {
    infoToggle.addEventListener('click', () => {
      const isOpen = infoToggle.getAttribute('aria-expanded') === 'true';
      infoToggle.setAttribute('aria-expanded', String(!isOpen));
      infoToggle.querySelector('span').textContent = isOpen ? '+' : '−';
      infoLinks.classList.toggle('open', !isOpen);
    });
    infoLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      infoToggle.setAttribute('aria-expanded', 'false'); infoToggle.querySelector('span').textContent = '+'; infoLinks.classList.remove('open');
    }));
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.info-menu')) { infoToggle.setAttribute('aria-expanded', 'false'); infoToggle.querySelector('span').textContent = '+'; infoLinks.classList.remove('open'); }
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
