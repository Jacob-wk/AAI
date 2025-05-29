/*
 * AAI LMS Theme - Application JavaScript
 * Main application scripts for the AAI professional safety education platform
 */

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('AAI Application JS: Initializing...');
  
  // Initialize theme components
  initializeThemeComponents();
  
  // Initialize AAI specific functionality
  initializeAAIFeatures();
  
  console.log('AAI Application JS: Initialization complete');
});

/**
 * Initialize core theme components
 */
function initializeThemeComponents() {
  // Initialize mobile navigation
  initializeMobileNav();
  
  // Initialize responsive images
  initializeResponsiveImages();
  
  // Initialize form enhancements
  initializeFormEnhancements();
  
  // Initialize scroll behaviors
  initializeScrollBehaviors();
}

/**
 * Initialize mobile navigation
 */
function initializeMobileNav() {
  const mobileToggle = document.querySelector('[data-mobile-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      const isOpen = mobileNav.getAttribute('aria-expanded') === 'true';
      mobileNav.setAttribute('aria-expanded', String(!isOpen));
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      
      // Toggle body scroll
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }
}

/**
 * Initialize responsive images with lazy loading
 */
function initializeResponsiveImages() {
  // Use Intersection Observer for lazy loading if supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = /** @type {HTMLImageElement} */ (entry.target);
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Initialize form enhancements
 */
function initializeFormEnhancements() {
  // Add loading states to form submissions
  const forms = document.querySelectorAll('form[data-enhanced]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      const submitBtn = /** @type {HTMLButtonElement|HTMLInputElement|null} */ (form.querySelector('button[type="submit"], input[type="submit"]'));
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }
    });
  });
  
  // Initialize custom select dropdowns
  initializeCustomSelects();
}

/**
 * Initialize custom select elements
 */
function initializeCustomSelects() {
  const customSelects = document.querySelectorAll('[data-custom-select]');
  
  customSelects.forEach(select => {
    const button = /** @type {HTMLElement|null} */ (select.querySelector('[data-select-button]'));
    const options = /** @type {HTMLElement|null} */ (select.querySelector('[data-select-options]'));
    const hiddenInput = /** @type {HTMLInputElement|null} */ (select.querySelector('input[type="hidden"]'));
    
    if (button && options && hiddenInput) {
      button.addEventListener('click', () => {
        const isOpen = options.style.display === 'block';
        options.style.display = isOpen ? 'none' : 'block';
        button.setAttribute('aria-expanded', String(!isOpen));
      });
      
      options.addEventListener('click', (e) => {
        const target = /** @type {HTMLElement} */ (e.target);
        if (target.dataset.value) {
          hiddenInput.value = target.dataset.value;
          button.textContent = target.textContent;
          options.style.display = 'none';
          button.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

/**
 * Initialize scroll behaviors
 */
function initializeScrollBehaviors() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Header scroll behavior
  let lastScrollTop = 0;
  const header = /** @type {HTMLElement|null} */ (document.querySelector('.site-header'));
  
  if (header) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });
  }
}

/**
 * Initialize AAI-specific features
 */
function initializeAAIFeatures() {
  // Initialize course card interactions
  initializeCourseCards();
  
  // Initialize progress bars
  initializeProgressBars();
  
  // Initialize professional animations
  initializeProfessionalAnimations();
}

/**
 * Initialize course card interactions
 */
function initializeCourseCards() {
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach(card => {
    // Add hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    // Add click tracking
    card.addEventListener('click', function(e) {
      // Only track if not clicking on buttons
      const target = /** @type {HTMLElement|null} */ (e.target);
      if (target && !target.closest('button, a')) {
        const courseId = /** @type {HTMLElement} */ (this).dataset.courseId;
        if (courseId) {
          console.log('Course card clicked:', courseId);
          // Track interaction for analytics
        }
      }
    });
  });
}

/**
 * Initialize progress bars with animation
 */
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.course-progress-bar');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = /** @type {HTMLElement} */ (entry.target);
        const targetWidth = progressBar.dataset.progress || '0';
        
        // Animate progress bar
        setTimeout(() => {
          progressBar.style.width = targetWidth + '%';
        }, 100);
        
        progressObserver.unobserve(progressBar);
      }
    });
  }, observerOptions);
  
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

/**
 * Initialize professional animations
 */
function initializeProfessionalAnimations() {
  // Fade in animations for content sections
  const animatedElements = document.querySelectorAll('[data-animate="fade-in"]');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
}

/**
 * Utility functions
 */

/**
 * Debounce function for performance
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
  /** @type {number|undefined} */
  let timeout;
  return function executedFunction(/** @type {...any} */ ...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} The throttled function
 */
function throttle(func, limit) {
  /** @type {boolean|undefined} */
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('AAI Theme Error:', e.error);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeThemeComponents,
    initializeAAIFeatures,
    debounce,
    throttle
  };
}