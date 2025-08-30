const gridItems = document.querySelectorAll('.grid-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

gridItems.forEach(item => {
  item.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});
