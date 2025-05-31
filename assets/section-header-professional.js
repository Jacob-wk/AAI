// Professional mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.aai-nav .container');
  const mobileMenu = document.querySelector('.aai-mobile-menu');
  const mobileClose = document.querySelector('.aai-mobile-close');
  
  // Add mobile menu trigger
  if (window.innerWidth <= 768 && nav) {
    nav.addEventListener('click', function(e) {
      if (e.target && e.target instanceof HTMLElement && e.target.textContent === '☰') {
        if (mobileMenu && mobileMenu instanceof HTMLElement) {
          mobileMenu.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      }
    });
  }
  
  // Close mobile menu
  if (mobileClose) {
    mobileClose.addEventListener('click', function() {
      if (mobileMenu && mobileMenu instanceof HTMLElement) {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Close on outside click
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu && mobileMenu instanceof HTMLElement) {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});
