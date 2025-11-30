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
];

// Shuffle function to randomize photo order
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle the imageFiles array
const shuffledImages = shuffleArray(imageFiles);

const gallerySection = document.querySelector(".gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-content");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;

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

// Open lightbox
function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = gallerySection.children[index].src;
  lightbox.classList.add("show");
  lightbox.style.pointerEvents = "auto";
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.style.pointerEvents = "none";
}

// Close button
closeBtn.addEventListener("click", closeLightbox);

// Click outside image → close
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % gallerySection.children.length;
    openLightbox(currentIndex);
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + gallerySection.children.length) % gallerySection.children.length;
    openLightbox(currentIndex);
  }

  if (e.key === "Escape") {
    closeLightbox();
  }
});
