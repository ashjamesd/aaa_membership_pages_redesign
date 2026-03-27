document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxScroll = document.getElementById('lightbox-scroll');
  const closeButton = document.querySelector('.lightbox-close');
  const zoomInButton = document.getElementById('zoom-in');
  const zoomOutButton = document.getElementById('zoom-out');
  const zoomResetButton = document.getElementById('zoom-reset');
  const triggers = document.querySelectorAll('.image-trigger');

  let zoomLevel = 1;

  function applyZoom() {
    lightboxImage.style.transform = `scale(${zoomLevel})`;
  }

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    zoomLevel = 1;
    applyZoom();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxScroll.scrollTop = 0;
    lightboxScroll.scrollLeft = 0;
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    zoomLevel = 1;
    applyZoom();
    document.body.style.overflow = '';
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(trigger.dataset.fullImage, trigger.dataset.alt);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }

  if (zoomInButton) {
    zoomInButton.addEventListener('click', () => {
      zoomLevel = Math.min(zoomLevel + 0.25, 4);
      applyZoom();
    });
  }

  if (zoomOutButton) {
    zoomOutButton.addEventListener('click', () => {
      zoomLevel = Math.max(zoomLevel - 0.25, 1);
      applyZoom();
    });
  }

  if (zoomResetButton) {
    zoomResetButton.addEventListener('click', () => {
      zoomLevel = 1;
      applyZoom();
    });
  }

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === '+') {
      zoomLevel = Math.min(zoomLevel + 0.25, 4);
      applyZoom();
    }

    if (event.key === '-') {
      zoomLevel = Math.max(zoomLevel - 0.25, 1);
      applyZoom();
    }
  });
});
