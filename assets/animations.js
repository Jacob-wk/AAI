/* filepath: /workspaces/AAI/assets/animations.js */

// AAI Animation System
class AAIAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize intersection observer for scroll animations
    this.setupScrollAnimations();
    
    // Initialize on page load
    this.animateOnLoad();
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

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-up, .slide-in-left, .slide-in-right, [class*="anim-delay"]'
    );
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

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

  // Public method to trigger specific animations
  static triggerAnimation(element, animationType = 'fade-in') {
    if (!element) return;
    
    element.classList.add(animationType);
    setTimeout(() => {
      element.classList.add('aai-animate-visible');
    }, 10);
  }

  // Public method to reset animations
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
window.AAIAnimations = AAIAnimations;
