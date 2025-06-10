/* filepath: /workspaces/AAI/assets/animations.js */

// AAI Animation System
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
      enabled: body.classList.contains('page-animations-enabled'),
      style: body.dataset.pageAnimationStyle || 'fade-up',
      duration: parseInt(body.dataset.pageAnimationDuration || '1000') || 1000, // Increased default duration
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    };
  }

  init() {
    // Apply page-level animations first if enabled
    if (this.pageAnimationSettings.enabled) {
      this.initializePageAnimation();
      // Don't apply component animations when page animations are enabled
      return;
    }
    
    // Apply animations to all elements automatically only if page animations are disabled
    this.applyGlobalAnimations();
    
    // Initialize intersection observer for scroll animations
    this.setupScrollAnimations();
    
    // Initialize on page load
    this.animateOnLoad();
    
    // Setup page transition animations
    this.setupPageTransitionAnimations();
  }

  /**
   * Initialize page-level animation for the entire page
   */
  initializePageAnimation() {
    const body = document.body;
    if (!body) return;

    // Apply the page animation class based on customizer setting
    if (!body.classList.contains('page-animation-applied')) {
      body.classList.add('page-animation-applied');
      
      // Set CSS custom properties for animation
      body.style.setProperty('--page-animation-duration', `${this.pageAnimationSettings.duration}ms`);
      body.style.setProperty('--page-animation-easing', this.pageAnimationSettings.easing);
      
      // Apply the specific animation style to the body
      switch (this.pageAnimationSettings.style) {
        case 'fade':
          body.classList.add('page-fade-in');
          break;
        case 'fade-up':
          body.classList.add('page-fade-up');
          break;
        case 'slide-up':
          body.classList.add('page-slide-up');
          break;
        case 'none':
          // No animation
          break;
        default:
          body.classList.add('page-fade-up'); // Default fallback
      }
      
      // Improved timing for more reliable page load animation
      const triggerAnimation = () => {
        if (document.readyState === 'complete') {
          // Page is fully loaded, trigger immediately
          requestAnimationFrame(() => {
            body.classList.add('page-animation-visible');
          });
        } else {
          // Page still loading, wait for load event
          window.addEventListener('load', () => {
            requestAnimationFrame(() => {
              body.classList.add('page-animation-visible');
            });
          }, { once: true });
        }
      };
      
      // Small delay to ensure DOM is stable, then check readiness
      setTimeout(triggerAnimation, 50);
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
    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
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
    
    // Reset all animations first - include all animated elements
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-up, .slide-in-left, .slide-in-right, [class*="anim-delay"], section, .page-section, [class*="section-"], [class*="block"], .content-block, .feature-block, .text-block, .card, .course-card, .instructor-card, [class*="item-"], .product-item'
    );
    
    animatedElements.forEach(el => {
      el.classList.remove('aai-animate-visible');
    });

    // Reset and re-apply page-level animation if enabled
    const body = document.body;
    if (body && this.pageAnimationSettings.enabled) {
      // Remove existing page animation classes from body
      body.classList.remove('page-animation-applied', 'page-animation-visible', 'page-fade-in', 'page-fade-up', 'page-slide-up');
      
      // Force reflow to ensure classes are removed before re-adding
      body.offsetHeight;
      
      // Re-initialize page animation with better timing coordination
      requestAnimationFrame(() => {
        this.initializePageAnimation();
      });
    }

    // Re-apply global animations to new elements
    this.applyGlobalAnimations();

    // Trigger animations with slight delay to ensure smooth transition
    setTimeout(() => {
      this.reinitializeAnimations();
    }, 50);
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
