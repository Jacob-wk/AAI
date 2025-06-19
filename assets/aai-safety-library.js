/**
 * AAI Safety Library - Interactive functionality
 * Handles search, filtering, and document management for the Safety Library
 * Follows AAI naming conventions and accessibility best practices
 * @fileoverview Safety Library JavaScript module with TypeScript-compatible JSDoc
 */

// Type definitions for better IDE support and error prevention
/**
 * @typedef {Object} FilterState
 * @property {string} search - Current search term
 * @property {string} category - Selected category filter
 * @property {string} industry - Selected industry filter
 * @property {string} year - Selected year filter
 */

/**
 * @typedef {HTMLElement} SafetyLibraryElement
 * @property {DOMStringMap} dataset - Element dataset
 * @property {CSSStyleDeclaration} style - Element style
 */

// Global declarations to avoid TypeScript errors
/* global gtag */

// Extend window interface for TypeScript
/** @type {any} */
const windowAny = window;

class AAISafetyLibrary {
  constructor() {
    /** @type {HTMLInputElement|null} */
    this.searchInput = /** @type {HTMLInputElement|null} */ (document.getElementById('safety-library-search'));
    /** @type {NodeListOf<HTMLSelectElement>} */
    this.filterSelects = document.querySelectorAll('.aai-filter-select[data-filter]');
    /** @type {NodeListOf<HTMLButtonElement>} */
    this.categoryButtons = document.querySelectorAll('[data-toggle-category]');
    /** @type {NodeListOf<HTMLButtonElement>} */
    this.closeButtons = document.querySelectorAll('[data-close-category]');
    /** @type {NodeListOf<HTMLElement>} */
    this.documentItems = document.querySelectorAll('.aai-document-item');
    /** @type {NodeListOf<HTMLElement>} */
    this.categoryCards = document.querySelectorAll('.aai-category-card');
    /** @type {NodeListOf<HTMLElement>} */
    this.categorySections = document.querySelectorAll('.aai-category-section');
    /** @type {HTMLElement|null} */
    this.noResultsElement = document.querySelector('.aai-no-results');
    
    /** @type {FilterState} */
    this.currentFilters = {
      search: '',
      category: '',
      industry: '',
      year: ''
    };
    
    this.init();
  }

  init() {
    // Search functionality
    if (this.searchInput) {
      const debouncedSearch = this.debounce(/** @param {Event} e */ (e) => {
        const target = /** @type {HTMLInputElement} */ (e.target);
        this.currentFilters.search = target.value.toLowerCase();
        this.filterDocuments();
      }, 300);
      
      this.searchInput.addEventListener('input', /** @type {EventListener} */ (debouncedSearch));
    }

    // Filter functionality
    this.filterSelects.forEach(select => {
      select.addEventListener('change', /** @param {Event} e */ (e) => {
        const target = /** @type {HTMLSelectElement} */ (e.target);
        if (!target?.dataset?.filter) return;
        
        const filterType = target.dataset.filter;
        if (filterType in this.currentFilters) {
          this.currentFilters[/** @type {keyof FilterState} */ (filterType)] = target.value;
          this.filterDocuments();
        }
      });
    });

    // Category navigation
    this.categoryButtons.forEach(button => {
      button.addEventListener('click', /** @param {Event} e */ (e) => {
        e.preventDefault();
        const target = /** @type {HTMLElement} */ (e.target);
        const categorySlug = target?.dataset?.toggleCategory;
        if (categorySlug) {
          this.showCategory(categorySlug);
        }
      });
    });

    this.closeButtons.forEach(button => {
      button.addEventListener('click', /** @param {Event} e */ (e) => {
        e.preventDefault();
        this.hideAllCategories();
      });
    });

    // Download tracking
    this.trackDocumentDownloads();

    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  /**
   * Filter documents based on current search and filter criteria
   */
  filterDocuments() {
    let visibleCount = 0;
    
    // Filter document items
    this.documentItems.forEach(item => {
      const htmlItem = /** @type {HTMLElement} */ (item);
      const matchesSearch = this.matchesSearchCriteria(htmlItem);
      const matchesFilters = this.matchesFilterCriteria(htmlItem);
      const shouldShow = matchesSearch && matchesFilters;
      
      htmlItem.style.display = shouldShow ? 'flex' : 'none';
      if (shouldShow) visibleCount++;
    });

    // Filter category cards in overview
    if (this.currentFilters.category) {
      this.categoryCards.forEach(card => {
        const htmlCard = /** @type {HTMLElement} */ (card);
        const categorySlug = htmlCard.dataset.category;
        htmlCard.style.display = categorySlug === this.currentFilters.category ? 'block' : 'none';
      });
    } else {
      this.categoryCards.forEach(card => {
        const htmlCard = /** @type {HTMLElement} */ (card);
        htmlCard.style.display = 'block';
      });
    }

    // Show/hide no results message
    this.toggleNoResults(visibleCount === 0);

    // Update search results count
    this.updateResultsCount(visibleCount);
  }

  /**
   * Check if document matches search criteria
   * @param {HTMLElement} item - Document item element
   * @returns {boolean} Whether item matches search
   */
  matchesSearchCriteria(item) {
    if (!this.currentFilters.search) return true;
    
    const title = item.dataset.title || '';
    const description = item.querySelector('.aai-document-description')?.textContent?.toLowerCase() || '';
    const category = item.dataset.category || '';
    
    const searchTerm = this.currentFilters.search;
    return title.includes(searchTerm) || 
           description.includes(searchTerm) || 
           category.includes(searchTerm);
  }

  /**
   * Check if document matches filter criteria
   * @param {HTMLElement} item - Document item element
   * @returns {boolean} Whether item matches filters
   */
  matchesFilterCriteria(item) {
    // Category filter
    if (this.currentFilters.category && 
        item.dataset.category !== this.currentFilters.category) {
      return false;
    }

    // Year filter
    if (this.currentFilters.year && 
        item.dataset.year !== this.currentFilters.year) {
      return false;
    }

    // Industry filter (would need to be added to document data)
    if (this.currentFilters.industry && 
        item.dataset.industry !== this.currentFilters.industry) {
      return false;
    }

    return true;
  }

  /**
   * Show specific category section
   * @param {string} categorySlug - Category identifier
   */
  showCategory(categorySlug) {
    // Hide category overview
    const categoriesGrid = document.querySelector('.aai-categories-grid');
    if (categoriesGrid) {
      /** @type {HTMLElement} */ (categoriesGrid).style.display = 'none';
    }

    // Hide all category sections
    this.categorySections.forEach(section => {
      /** @type {HTMLElement} */ (section).style.display = 'none';
    });

    // Show target category
    const targetSection = document.getElementById(`category-${categorySlug}`);
    if (targetSection) {
      /** @type {HTMLElement} */ (targetSection).style.display = 'block';
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update filter to match category
      const categoryFilter = document.querySelector('[data-filter="category"]');
      if (categoryFilter) {
        /** @type {HTMLSelectElement} */ (categoryFilter).value = categorySlug;
        this.currentFilters.category = categorySlug;
        this.filterDocuments();
      }
    }

    // Update button states
    this.updateCategoryButtonStates(categorySlug);
  }

  /**
   * Hide all category sections and show overview
   */
  hideAllCategories() {
    // Show category overview
    const categoriesGrid = document.querySelector('.aai-categories-grid');
    if (categoriesGrid) {
      /** @type {HTMLElement} */ (categoriesGrid).style.display = 'grid';
    }

    // Hide all category sections
    this.categorySections.forEach(section => {
      /** @type {HTMLElement} */ (section).style.display = 'none';
    });

    // Clear category filter
    const categoryFilter = document.querySelector('[data-filter="category"]');
    if (categoryFilter) {
      /** @type {HTMLSelectElement} */ (categoryFilter).value = '';
      this.currentFilters.category = '';
      this.filterDocuments();
    }

    // Reset button states
    this.updateCategoryButtonStates('');
  }

  /**
   * Update category button states for accessibility
   * @param {string} activeCategory - Currently active category
   */
  updateCategoryButtonStates(activeCategory) {
    this.categoryButtons.forEach(button => {
      const htmlButton = /** @type {HTMLElement} */ (button);
      const category = htmlButton.dataset.toggleCategory;
      const isActive = category === activeCategory;
      htmlButton.setAttribute('aria-expanded', isActive.toString());
      htmlButton.classList.toggle('active', isActive);
    });
  }

  /**
   * Toggle no results message
   * @param {boolean} show - Whether to show no results message
   */
  toggleNoResults(show) {
    if (this.noResultsElement) {
      this.noResultsElement.style.display = show ? 'block' : 'none';
    }
  }

  /**
   * Update results count display
   * @param {number} count - Number of visible results
   */
  updateResultsCount(count) {
    const counters = document.querySelectorAll('.aai-results-count');
    counters.forEach(counter => {
      counter.textContent = `${count} document${count !== 1 ? 's' : ''} found`;
    });
  }

  /**
   * Track document downloads for analytics
   */
  trackDocumentDownloads() {
    const downloadLinks = document.querySelectorAll('[data-document-download]');
    downloadLinks.forEach(link => {
      link.addEventListener('click', /** @param {Event} e */ (e) => {
        const target = /** @type {HTMLElement} */ (e.target);
        const documentName = target?.dataset?.documentDownload;
        
        if (documentName) {
          // Google Analytics 4 event
          if (typeof windowAny.gtag !== 'undefined') {
            windowAny.gtag('event', 'file_download', {
              'file_name': documentName,
              'file_extension': 'pdf',
              'content_type': 'safety_document'
            });
          }

          // Custom analytics or tracking
          this.logDocumentAccess(documentName);
        }
      });
    });
  }

  /**
   * Log document access for internal tracking
   * @param {string} documentName - Name of the accessed document
   */
  logDocumentAccess(documentName) {
    console.log(`Document accessed: ${documentName}`);
    
    // Could send to analytics endpoint
    // fetch('/analytics/document-access', {
    //   method: 'POST',
    //   body: JSON.stringify({ document: documentName, timestamp: Date.now() })
    // });
  }

  /**
   * Setup keyboard navigation for accessibility
   */
  setupKeyboardNavigation() {
    // Escape key to close categories
    document.addEventListener('keydown', /** @param {KeyboardEvent} e */ (e) => {
      if (e.key === 'Escape') {
        this.hideAllCategories();
      }
    });

    // Enter key on category cards
    this.categoryCards.forEach(card => {
      card.addEventListener('keydown', /** @param {KeyboardEvent} e */ (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const button = card.querySelector('[data-toggle-category]');
          if (button) {
            /** @type {HTMLElement} */ (button).click();
          }
        }
      });
    });
  }

  /**
   * Clear all filters and search
   */
  clearAllFilters() {
    // Clear search
    if (this.searchInput) {
      this.searchInput.value = '';
    }

    // Clear all filters
    this.filterSelects.forEach(select => {
      /** @type {HTMLSelectElement} */ (select).value = '';
    });

    // Reset filter state
    this.currentFilters = {
      search: '',
      category: '',
      industry: '',
      year: ''
    };

    // Hide categories and show overview
    this.hideAllCategories();

    // Apply cleared filters
    this.filterDocuments();
  }

  /**
   * Debounce utility function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    /** @type {number|undefined} */
    let timeout;
    return function executedFunction(/** @type {any[]} */ ...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

/**
 * Global function to clear filters (called from no-results button)
 */
function clearLibraryFilters() {
  if (windowAny.aaiSafetyLibrary) {
    windowAny.aaiSafetyLibrary.clearAllFilters();
  }
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.aai-safety-library')) {
    windowAny.aaiSafetyLibrary = new AAISafetyLibrary();
  }
});

/**
 * Export for module systems if needed
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AAISafetyLibrary;
}
