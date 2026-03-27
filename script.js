document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxScroll = document.getElementById('lightbox-scroll');
  const closeButton = document.querySelector('.lightbox-close');
  const zoomButton = document.getElementById('lightbox-zoom');
  const triggers = document.querySelectorAll('.image-trigger');

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxScroll.classList.remove('is-zoomed');
    lightboxScroll.scrollTop = 0;
    lightboxScroll.scrollLeft = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxScroll.classList.remove('is-zoomed');
    document.body.style.overflow = '';
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(trigger.dataset.fullImage, trigger.dataset.alt);
    });
  });

  if (zoomButton) {
    zoomButton.addEventListener('click', () => {
      lightboxScroll.classList.toggle('is-zoomed');
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
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
  });
});
