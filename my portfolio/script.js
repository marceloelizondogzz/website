const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.close');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImages[index].src;
  lightbox.classList.add('show');
  lightbox.style.pointerEvents = "auto";
}

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.style.pointerEvents = "none";
}

// Click image → open
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

// Close button
closeBtn.addEventListener('click', closeLightbox);

// Click background → close
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard controls
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('show')) return;

  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openLightbox(currentIndex);
  }

  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentIndex);
  }

  if (e.key === 'Escape') {
    closeLightbox();
  }
});
