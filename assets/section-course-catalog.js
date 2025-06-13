// Course Catalog Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Professional course filtering
  const categoryTabs = document.querySelectorAll('.aai-category-tab');
  const courseCards = document.querySelectorAll('.aai-course-card');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Professional loading state
      const grid = document.getElementById('aai-course-grid');
      if (grid) {
        grid.style.opacity = '0.5';
        grid.style.pointerEvents = 'none';
      }

      // Remove active state from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      
      // Add active state to clicked tab
      this.classList.add('active');

      // Filter courses based on category
      const category = this.dataset.category;
      
      setTimeout(() => {
        courseCards.forEach((card, index) => {
          const htmlCard = /** @type {HTMLElement} */ (card);
          if (category === 'all' || htmlCard.dataset.category === category) {
            htmlCard.style.display = 'block';
            // Professional staggered animation
            setTimeout(() => {
              htmlCard.style.opacity = '1';
              htmlCard.style.transform = 'translateY(0)';
            }, index * 100);
          } else {
            htmlCard.style.display = 'none';
          }
        });

        // Restore grid interactivity
        if (grid) {
          setTimeout(() => {
            grid.style.opacity = '1';
            grid.style.pointerEvents = 'auto';
          }, 300);
        }
      }, 200);
    });
  });

  // Professional scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        /** @type {HTMLElement} */ (entry.target).style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observe course cards for professional entrance effects
  courseCards.forEach(card => {
    observer.observe(card);
  });

  // Professional analytics for course interest
  courseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const courseTitle = this.querySelector('h3')?.textContent;
      // Track professional course engagement
      if (courseTitle && typeof window !== 'undefined' && 'gtag' in window) {
        /** @type {any} */ (window).gtag('event', 'course_interest', {
          course_name: courseTitle
        });
      }
    });
  });
});
