document.querySelectorAll('.step-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    }
  });

  item.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      item.classList.remove('active');
    }
  });
});

if (window.innerWidth <= 768) {
  document.querySelectorAll('.step-item').forEach(el => el.classList.add('active'));
}