// --- GALLERY IMAGE FILES ---
// Add any new image filename here (in the gallery/ folder)
const imageFiles = [
  "000000010003-2.jpg",
  "000000010005-2-2.jpg",
  "000000010005-2.jpg",
  "000000010007-2.jpg",
  "000000010012-2.jpg",
  "000000010021.jpg",
  "000000010023-2.jpg",
  "A000324-R1-06-5.jpg",
  "A000324-R1-37-36.jpg",
  "A000325-R1-06-5A.jpg",
  "A000325-R1-30-29A.jpg",
  "DJI_20250628110637_0189_D.jpg",
  "DJI_20250830113138_0257_D.jpg",
  "DSC06326.jpg",
  "DSC07410.jpg",
  "DSC08414.jpg"
  ,"_DSC0776-Pano_copy_2.jpg"
];

// Optional captions for images shown in the lightbox.
// Keyed by filename (exact match). Add more captions here.
const captions = {
  "A000324-R1-06-5.jpg": "Black's Beach"
};

// Shuffle function to randomize photo order
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
// DOM elements (may be absent on pages without a gallery)
const gallerySection = document.querySelector(".gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-content") : null;
const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
const closeBtn = lightbox ? lightbox.querySelector(".close") : null;

let currentIndex = 0;

// Only populate the gallery when a .gallery element exists on the page
if (gallerySection) {
  const shuffledImages = shuffleArray(imageFiles);

  // Dynamically create gallery images
  shuffledImages.forEach((filename, index) => {
    const img = document.createElement("img");
    img.src = `gallery/${filename}`;
    img.alt = `Photo ${index + 1}`;
    img.loading = "lazy";

    // Click to open lightbox
    img.addEventListener("click", () => openLightbox(index));

    gallerySection.appendChild(img);
  });
}

// Open lightbox (guarded)
function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentIndex = index;
  if (gallerySection && gallerySection.children[index]) {
    lightboxImg.src = gallerySection.children[index].src;
  }
  // set caption (if available)
  if (lightboxCaption) {
    const src = gallerySection && gallerySection.children[index] ? gallerySection.children[index].src : '';
    const filename = src.split('/').pop();
    lightboxCaption.textContent = captions[filename] || '';
  }

  lightbox.classList.add("show");
  lightbox.style.pointerEvents = "auto";
}

// Close lightbox (guarded)
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.style.pointerEvents = "none";
  if (lightboxCaption) lightboxCaption.textContent = '';
}

// Close button
if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

// Click outside image → close (guarded)
if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Keyboard navigation (only when lightbox is present)
document.addEventListener("keydown", e => {
  if (!lightbox || !lightbox.classList.contains("show")) return;

  if (e.key === "ArrowRight") {
    if (!gallerySection) return;
    currentIndex = (currentIndex + 1) % gallerySection.children.length;
    openLightbox(currentIndex);
  }

  if (e.key === "ArrowLeft") {
    if (!gallerySection) return;
    currentIndex = (currentIndex - 1 + gallerySection.children.length) % gallerySection.children.length;
    openLightbox(currentIndex);
  }

  if (e.key === "Escape") {
    closeLightbox();
  }
});
