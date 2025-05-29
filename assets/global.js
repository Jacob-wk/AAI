// Global JavaScript utilities for AAI LMS Theme
// This file provides core functionality and utilities used across the theme

/**
 * Global theme utilities and initialization
 */
class AAITheme {
  constructor() {
    this.init();
  }

  init() {
    // Initialize core theme functionality
    this.setupEventListeners();
    this.initializeComponents();
  }

  setupEventListeners() {
    // Global event listeners
    document.addEventListener('DOMContentLoaded', () => {
      console.log('AAI Theme: DOM Content Loaded');
    });

    // Global resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  initializeComponents() {
    // Initialize any global components
    this.initializeAccessibility();
  }

  initializeAccessibility() {
    // Add skip to content functionality
    const skipLink = document.querySelector('.skip-to-content-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }
  }

  handleResize() {
    // Handle global resize events
    const width = window.innerWidth;
    document.documentElement.style.setProperty('--viewport-width', `${width}px`);
  }

  // Utility function for debouncing
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  window.AAITheme = new AAITheme();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AAITheme;
}
