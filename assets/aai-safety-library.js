/**
 * AAI Safety Library - Interactive functionality
 * Handles search, filtering, and document management for the Safety Library
 * Follows AAI naming conventions and accessibility best practices
 */

class AAISafetyLibrary {
  constructor() {
    this.searchInput = document.getElementById('safety-library-search');
    this.filterSelects = document.querySelectorAll('.aai-filter-select[data-filter]');
    this.categoryButtons = document.querySelectorAll('[data-toggle-category]');
    this.closeButtons = document.querySelectorAll('[data-close-category]');
    this.documentItems = document.querySelectorAll('.aai-document-item');
    this.categoryCards = document.querySelectorAll('.aai-category-card');
    this.categorySections = document.querySelectorAll('.aai-category-section');
    this.noResultsElement = document.querySelector('.aai-no-results');
    
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
      this.searchInput.addEventListener('input', this.debounce((e) => {
        this.currentFilters.search = e.target.value.toLowerCase();
        this.filterDocuments();
      }, 300));
    }

    // Filter functionality
    this.filterSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const filterType = e.target.dataset.filter;
        this.currentFilters[filterType] = e.target.value;
        this.filterDocuments();
      });
    });

    // Category navigation
    this.categoryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const categorySlug = e.target.dataset.toggleCategory;
        this.showCategory(categorySlug);
      });
    });

    this.closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
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
      const matchesSearch = this.matchesSearchCriteria(item);
      const matchesFilters = this.matchesFilterCriteria(item);
      const shouldShow = matchesSearch && matchesFilters;
      
      item.style.display = shouldShow ? 'flex' : 'none';
      if (shouldShow) visibleCount++;
    });

    // Filter category cards in overview
    if (this.currentFilters.category) {
      this.categoryCards.forEach(card => {
        const categorySlug = card.dataset.category;
        card.style.display = categorySlug === this.currentFilters.category ? 'block' : 'none';
      });
    } else {
      this.categoryCards.forEach(card => {
        card.style.display = 'block';
      });
    }

    // Show/hide no results message
    this.toggleNoResults(visibleCount === 0);

    // Update search results count
    this.updateResultsCount(visibleCount);
  }

  /**
   * Check if document matches search criteria
   */
  matchesSearchCriteria(item) {
    if (!this.currentFilters.search) return true;
    
    const title = item.dataset.title || '';
    const description = item.querySelector('.aai-document-description')?.textContent.toLowerCase() || '';
    const category = item.dataset.category || '';
    
    const searchTerm = this.currentFilters.search;
    return title.includes(searchTerm) || 
           description.includes(searchTerm) || 
           category.includes(searchTerm);
  }

  /**
   * Check if document matches filter criteria
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
   */
  showCategory(categorySlug) {
    // Hide category overview
    const categoriesGrid = document.querySelector('.aai-categories-grid');
    if (categoriesGrid) {
      categoriesGrid.style.display = 'none';
    }

    // Hide all category sections
    this.categorySections.forEach(section => {
      section.style.display = 'none';
    });

    // Show target category
    const targetSection = document.getElementById(`category-${categorySlug}`);
    if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update filter to match category
      const categoryFilter = document.querySelector('[data-filter="category"]');
      if (categoryFilter) {
        categoryFilter.value = categorySlug;
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
      categoriesGrid.style.display = 'grid';
    }

    // Hide all category sections
    this.categorySections.forEach(section => {
      section.style.display = 'none';
    });

    // Clear category filter
    const categoryFilter = document.querySelector('[data-filter="category"]');
    if (categoryFilter) {
      categoryFilter.value = '';
      this.currentFilters.category = '';
      this.filterDocuments();
    }

    // Reset button states
    this.updateCategoryButtonStates('');
  }

  /**
   * Update category button states for accessibility
   */
  updateCategoryButtonStates(activeCategory) {
    this.categoryButtons.forEach(button => {
      const category = button.dataset.toggleCategory;
      const isActive = category === activeCategory;
      button.setAttribute('aria-expanded', isActive.toString());
      button.classList.toggle('active', isActive);
    });
  }

  /**
   * Toggle no results message
   */
  toggleNoResults(show) {
    if (this.noResultsElement) {
      this.noResultsElement.style.display = show ? 'block' : 'none';
    }
  }

  /**
   * Update results count display
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
      link.addEventListener('click', (e) => {
        const documentName = e.target.dataset.documentDownload;
        
        // Google Analytics 4 event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'file_download', {
            'file_name': documentName,
            'file_extension': 'pdf',
            'content_type': 'safety_document'
          });
        }

        // Custom analytics or tracking
        this.logDocumentAccess(documentName);
      });
    });
  }

  /**
   * Log document access for internal tracking
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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideAllCategories();
      }
    });

    // Enter key on category cards
    this.categoryCards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const button = card.querySelector('[data-toggle-category]');
          if (button) {
            button.click();
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
      select.value = '';
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
   */
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

/**
 * Global function to clear filters (called from no-results button)
 */
function clearLibraryFilters() {
  if (window.aaiSafetyLibrary) {
    window.aaiSafetyLibrary.clearAllFilters();
  }
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.aai-safety-library')) {
    window.aaiSafetyLibrary = new AAISafetyLibrary();
  }
});

/**
 * Export for module systems if needed
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AAISafetyLibrary;
}
