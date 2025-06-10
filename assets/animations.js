/* filepath: /workspaces/AAI/assets/animations.js */

// AAI Animation System - page-fade class is now applied directly in HTML
class AAIAnimations {
  constructor() {
    this.pageAnimationSettings = this.getPageAnimationSettings();
    this.init();
  }

  /**
   * Get page animation settings from body data attributes
   */
  getPageAnimationSettings() {
    const body = document.body;
    
    return {
      enabled: true, // Simple fade enabled
      duration: 800,
      easing: 'ease-out'
    };
  }

  init() {
    // Apply simple page fade animation if enabled
    if (this.pageAnimationSettings.enabled) {
      this.initializePageFade();
      // Still set up scroll animations - they'll work after page fade completes
      this.applyGlobalAnimations(); // Important: Apply animation classes to elements
      this.setupScrollAnimations();
      this.setupPageTransitionAnimations();
      return;
    }
    
    // Apply component animations if page animation is disabled
    this.applyGlobalAnimations();
    this.setupScrollAnimations();
    this.animateOnLoad();
    this.setupPageTransitionAnimations();
  }

  /**
   * Initialize simple page fade animation
   */
  initializePageFade() {
    const body = document.body;
    if (!body) return;

    console.log('AAI: Initializing page fade animation...');
    console.log('AAI: Body classes:', body.className);
    
    // page-fade class should already be applied from HTML
    if (!body.classList.contains('page-fade')) {
      console.log('AAI: Warning - page-fade class not found, adding it');
      body.classList.add('page-fade');
    }
    
    // Trigger fade in when DOM is ready
    const triggerFade = () => {
      console.log('AAI: Triggering fade animation...');
      
      requestAnimationFrame(() => {
        body.classList.add('page-loaded');
        console.log('AAI: Added page-loaded class');
        console.log('AAI: Final body classes:', body.className);
        
        // After page fade completes, ensure scroll animations work
        setTimeout(() => {
          console.log('AAI: Page fade complete, triggering scroll animations...');
          this.animateElementsInViewport();
        }, 100);
      });
    };

    if (document.readyState === 'loading') {
      console.log('AAI: DOM still loading, waiting for DOMContentLoaded...');
      document.addEventListener('DOMContentLoaded', triggerFade, { once: true });
    } else {
      console.log('AAI: DOM already loaded, triggering fade with delay...');
      setTimeout(triggerFade, 50);
    }
  }

  /**
   * Automatically apply animation classes to common Shopify elements
   */
  applyGlobalAnimations() {
    // Section-level animations
    const sections = document.querySelectorAll('section, .page-section, [class*="section-"]');
    sections.forEach((section, index) => {
      if (!section.classList.contains('fade-in') && !section.classList.contains('slide-up')) {
        section.classList.add('fade-in');
        if (index > 0) section.classList.add('anim-delay-' + Math.min(index, 5));
      }
    });

    // Block-level animations
    const blocks = document.querySelectorAll('[class*="block"], .content-block, .feature-block, .text-block');
    blocks.forEach((block, index) => {
      if (!block.classList.contains('slide-up') && !block.classList.contains('fade-in')) {
        block.classList.add('slide-up');
        if (index % 2 === 0) {
          block.classList.add('slide-in-left');
        } else {
          block.classList.add('slide-in-right');
        }
        block.classList.add('anim-delay-' + Math.min(index + 1, 6));
      }
    });

    // Card and item animations
    const cards = document.querySelectorAll('.card, .course-card, .instructor-card, [class*="item-"], .product-item');
    cards.forEach((card, index) => {
      if (!card.classList.contains('fade-in')) {
        card.classList.add('fade-in', 'slide-up');
        card.classList.add('anim-delay-' + Math.min(index + 1, 8));
      }
    });

    // Navigation and header animations
    const navItems = document.querySelectorAll('.nav-item, .menu-item, .header-item');
    navItems.forEach((item, index) => {
      if (!item.classList.contains('slide-in-left')) {
        item.classList.add('slide-in-left');
        item.classList.add('anim-delay-' + Math.min(index + 1, 6));
      }
    });

    // Content elements
    const contentElements = document.querySelectorAll('h1, h2, h3, .content-title, .section-title');
    contentElements.forEach((element, index) => {
      if (!element.classList.contains('fade-in')) {
        element.classList.add('fade-in', 'slide-up');
        element.classList.add('anim-delay-' + Math.min(index + 1, 4));
      }
    });

    // Image and media animations
    const mediaElements = document.querySelectorAll('img, video, .media, .image-block');
    mediaElements.forEach((element, index) => {
      if (!element.classList.contains('fade-in')) {
        element.classList.add('fade-in');
        element.classList.add('anim-delay-' + Math.min(index + 2, 6));
      }
    });

    // Form and interactive elements
    const formElements = document.querySelectorAll('.form-group, .input-group, .btn, button');
    formElements.forEach((element, index) => {
      if (!element.classList.contains('slide-up')) {
        element.classList.add('slide-up');
        element.classList.add('anim-delay-' + Math.min(index + 1, 6));
      }
    });

    // List items and features
    const listItems = document.querySelectorAll('li, .feature-item, .list-item');
    listItems.forEach((item, index) => {
      if (!item.classList.contains('slide-in-left') && !item.classList.contains('slide-in-right')) {
        if (index % 2 === 0) {
          item.classList.add('slide-in-left');
        } else {
          item.classList.add('slide-in-right');
        }
        item.classList.add('anim-delay-' + Math.min(index + 1, 8));
      }
    });
  }

  setupScrollAnimations() {
    console.log('AAI: Setting up scroll animations...');
    
    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          console.log('AAI: Element entering viewport:', element);
          
          // Add visible class to trigger animations
          element.classList.add('aai-animate-visible');
          
          // Handle staggered animations for child elements
          this.handleStaggeredAnimations(element);
          
          // Stop observing once animated
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes - now includes auto-applied animations
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-up, .slide-in-left, .slide-in-right, [class*="anim-delay"], section, .page-section, [class*="section-"], [class*="block"], .content-block, .feature-block, .text-block, .card, .course-card, .instructor-card, [class*="item-"], .product-item'
    );
    
    console.log('AAI: Found', animatedElements.length, 'elements to animate');
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Handle staggered animations for container children
   * @param {Element} container - The container element
   */
  handleStaggeredAnimations(container) {
    // Find child elements with delay classes
    const delayedElements = container.querySelectorAll('[class*="anim-delay"]');
    
    delayedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('aai-animate-visible');
      }, index * 100); // 100ms stagger
    });
  }

  animateOnLoad() {
    // Animate elements that should appear immediately
    const immediateElements = document.querySelectorAll('.aai-animate-immediate');
    immediateElements.forEach(el => {
      el.classList.add('aai-animate-visible');
    });
  }

  setupPageTransitionAnimations() {
    // Listen for page reveal events (View Transitions API)
    window.addEventListener('pagereveal', () => {
      this.triggerPageAnimations();
    });

    // Fallback for browsers without View Transitions API
    // Re-initialize animations when DOM changes significantly
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        let shouldReinitialize = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 5) {
            shouldReinitialize = true;
          }
        });
        
        if (shouldReinitialize) {
          // Debounce reinitializations
          clearTimeout(this.reinitTimeout);
          this.reinitTimeout = setTimeout(() => {
            this.reinitializeAnimations();
          }, 100);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  triggerPageAnimations() {
    // Update page animation settings for new page
    this.pageAnimationSettings = this.getPageAnimationSettings();
    
    // Reset page fade animation
    const body = document.body;
    if (body && this.pageAnimationSettings.enabled) {
      // Remove existing page animation classes
      body.classList.remove('page-fade', 'page-loaded');
      
      // Force reflow
      body.offsetHeight;
      
      // Re-initialize simple page fade
      requestAnimationFrame(() => {
        this.initializePageFade();
      });
    } else {
      // If page animations are disabled, handle component animations
      this.reinitializeAnimations();
    }
  }

  reinitializeAnimations() {
    // Re-setup scroll animations for new elements
    this.setupScrollAnimations();
    
    // Animate elements in viewport immediately
    this.animateElementsInViewport();
  }

  animateElementsInViewport() {
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-up, .slide-in-left, .slide-in-right, [class*="anim-delay"], section, .page-section, [class*="section-"], [class*="block"], .content-block, .feature-block, .text-block, .card, .course-card, .instructor-card, [class*="item-"], .product-item'
    );
    
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        setTimeout(() => {
          el.classList.add('aai-animate-visible');
          this.handleStaggeredAnimations(el);
        }, 10);
      }
    });
  }

  /**
   * Public method to trigger specific animations
   * @param {HTMLElement} element - The DOM element to animate
   * @param {string} animationType - The animation type class to apply
   */
  static triggerAnimation(element, animationType = 'fade-in') {
    if (!element) return;
    
    element.classList.add(animationType);
    setTimeout(() => {
      element.classList.add('aai-animate-visible');
    }, 10);
  }

  /**
   * Public method to reset animations
   * @param {HTMLElement} element - The DOM element to reset
   */
  static resetAnimation(element) {
    if (!element) return;
    
    element.classList.remove('aai-animate-visible');
    element.style.animation = 'none';
    
    // Force reflow
    element.offsetHeight;
    
    // Re-enable animation
    element.style.animation = '';
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AAIAnimations();
});

// Export for manual usage
// @ts-ignore
window.AAIAnimations = AAIAnimations;
