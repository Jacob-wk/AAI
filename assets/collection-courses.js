/**
 * @fileoverview AAI Course Collection Management System
 * Enhanced filtering, sorting, and discovery with professional UI/UX for safety education courses
 * TypeScript-compatible JavaScript with comprehensive type annotations
 */

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  /** @type {number|null} */
  let timeout = null;
  return function executedFunction(/** @type {...any} */ ...args) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func.apply(this, args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Course Collection Manager Class
 * Handles all course filtering, sorting, and display functionality
 */
class CourseCollectionManager {
  constructor() {
    /** @type {HTMLInputElement|null} */
    this.searchInput = /** @type {HTMLInputElement|null} */ (document.getElementById('course-search'));
    
    /** @type {HTMLSelectElement|null} */
    this.levelFilter = /** @type {HTMLSelectElement|null} */ (document.getElementById('level-filter'));
    
    /** @type {HTMLSelectElement|null} */
    this.categoryFilter = /** @type {HTMLSelectElement|null} */ (document.getElementById('category-filter'));
    
    /** @type {HTMLSelectElement|null} */
    this.ceuFilter = /** @type {HTMLSelectElement|null} */ (document.getElementById('ceu-filter'));
    
    /** @type {HTMLSelectElement|null} */
    this.sortSelect = /** @type {HTMLSelectElement|null} */ (document.getElementById('sort-by'));
    
    /** @type {HTMLElement|null} */
    this.coursesGrid = document.getElementById('courses-grid');
    
    /** @type {HTMLElement[]} */
    this.courseItems = Array.from(document.querySelectorAll('.course-item'));
    
    /** @type {HTMLElement|null} */
    this.noResults = document.getElementById('no-results');
    
    /** @type {NodeListOf<Element>} */
    this.viewBtns = document.querySelectorAll('.view-btn');
    
    /** @type {HTMLElement|null} */
    this.resultsCount = document.getElementById('results-count');
    
    /** @type {Element|null} */
    this.clearFiltersBtn = document.querySelector('.clear-filters-btn');

    /** @type {HTMLElement[]} */
    this.originalOrder = [...this.courseItems];
    
    /** @type {string} */
    this.currentView = 'grid';
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateResultsCount();
    this.initializeView();
  }

  bindEvents() {
    // Search and filter events
    if (this.searchInput) {
      const debouncedFilter = debounce(() => this.filterCourses(), 300);
      this.searchInput.addEventListener('input', /** @param {Event} _event */ (_event) => {
        debouncedFilter();
      });
    }
    
    if (this.levelFilter) {
      this.levelFilter.addEventListener('change', () => this.filterCourses());
    }
    
    if (this.categoryFilter) {
      this.categoryFilter.addEventListener('change', () => this.filterCourses());
    }
    
    if (this.ceuFilter) {
      this.ceuFilter.addEventListener('change', () => this.filterCourses());
    }

    // Sort functionality
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => this.sortCourses());
    }

    // View toggle
    this.viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.toggleView(e));
    });

    // Clear filters
    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
    }

    // URL parameter handling
    this.handleUrlParameters();
  }

  filterCourses() {
    const searchTerm = this.searchInput?.value?.toLowerCase() || '';
    const levelValue = this.levelFilter?.value || '';
    const categoryValue = this.categoryFilter?.value || '';
    const ceuValue = this.ceuFilter?.value || '';
    
    let visibleCount = 0;
    
    // Add loading state
    if (this.coursesGrid) {
      this.coursesGrid.classList.add('updating');
    }

    // Filter with animation delay
    setTimeout(() => {
      this.courseItems.forEach((item, index) => {
        const htmlItem = item;
        const title = htmlItem.dataset?.title || '';
        const level = htmlItem.dataset?.level || '';
        const category = htmlItem.dataset?.category || '';
        const ceu = parseInt(htmlItem.dataset?.ceu || '0') || 0;
        
        let visible = true;
        
        // Search filter
        if (searchTerm && !title.includes(searchTerm)) {
          visible = false;
        }
        
        // Level filter
        if (levelValue && level !== levelValue) {
          visible = false;
        }
        
        // Category filter
        if (categoryValue && category !== categoryValue) {
          visible = false;
        }
        
        // CEU filter
        if (ceuValue) {
          const [min, max] = ceuValue.split('-').map(v => v.replace('+', ''));
          if (ceuValue.includes('+')) {
            if (ceu < parseInt(min || '0')) visible = false;
          } else {
            if (ceu < parseInt(min || '0') || ceu > parseInt(max || '99')) visible = false;
          }
        }
        
        // Apply visibility with stagger effect
        if (visible) {
          setTimeout(() => {
            htmlItem.style.display = 'block';
            htmlItem.classList.remove('hidden');
          }, index * 50);
          visibleCount++;
        } else {
          htmlItem.style.display = 'none';
          htmlItem.classList.add('hidden');
        }
      });

      // Update UI
      this.updateNoResultsState(visibleCount);
      this.updateResultsCount(visibleCount);
      
      // Remove loading state
      if (this.coursesGrid) {
        this.coursesGrid.classList.remove('updating');
      }
    }, 100);
  }

  sortCourses() {
    if (!this.sortSelect) return;
    
    const sortValue = this.sortSelect.value;
    const sortedItems = [...this.courseItems];
    
    // Add loading state
    if (this.coursesGrid) {
      this.coursesGrid.classList.add('updating');
    }

    switch (sortValue) {
      case 'title-ascending':
        sortedItems.sort((a, b) => (a.dataset.title || '').localeCompare(b.dataset.title || ''));
        break;
      case 'title-descending':
        sortedItems.sort((a, b) => (b.dataset.title || '').localeCompare(a.dataset.title || ''));
        break;
      case 'price-ascending':
        sortedItems.sort((a, b) => parseInt(a.dataset.price || '0') - parseInt(b.dataset.price || '0'));
        break;
      case 'price-descending':
        sortedItems.sort((a, b) => parseInt(b.dataset.price || '0') - parseInt(a.dataset.price || '0'));
        break;
      case 'created-descending':
        // Keep original order for newest first
        break;
      default:
        // Restore original order
        sortedItems.sort((a, b) => {
          return this.originalOrder.indexOf(a) - this.originalOrder.indexOf(b);
        });
    }

    // Apply new order with animation
    setTimeout(() => {
      sortedItems.forEach((item, index) => {
        if (this.coursesGrid && item.parentNode === this.coursesGrid) {
          this.coursesGrid.appendChild(item);
        }
      });
      
      if (this.coursesGrid) {
        this.coursesGrid.classList.remove('updating');
      }
    }, 200);
  }

  /**
   * Toggle between grid and list view
   * @param {Event} event - The click event
   */
  toggleView(event) {
    /** @type {HTMLElement} */
    const btn = /** @type {HTMLElement} */ (event.currentTarget);
    if (!btn) return;
    
    const view = btn.dataset.view;
    if (!view) return;
    
    if (view === this.currentView) return;
    
    // Update button states
    this.viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update grid view
    if (this.coursesGrid) {
      this.coursesGrid.setAttribute('data-view', view);
    }
    
    this.currentView = view;
    
    // Save preference
    localStorage.setItem('aai-courses-view', view);
  }

  initializeView() {
    // Restore saved view preference
    const savedView = localStorage.getItem('aai-courses-view');
    if (savedView && ['grid', 'list'].includes(savedView)) {
      /** @type {HTMLElement|null} */
      const viewBtn = /** @type {HTMLElement|null} */ (document.querySelector(`[data-view="${savedView}"]`));
      if (viewBtn) {
        viewBtn.click();
      }
    }
  }

  clearAllFilters() {
    // Clear all filter inputs
    if (this.searchInput) this.searchInput.value = '';
    if (this.levelFilter) this.levelFilter.value = '';
    if (this.categoryFilter) this.categoryFilter.value = '';
    if (this.ceuFilter) this.ceuFilter.value = '';
    if (this.sortSelect) this.sortSelect.value = 'title-ascending';
    
    // Show all courses
    this.courseItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.display = 'block';
        item.classList.remove('hidden');
      }, index * 30);
    });
    
    // Update UI
    this.updateNoResultsState(this.courseItems.length);
    this.updateResultsCount(this.courseItems.length);
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    url.searchParams.delete('level');
    url.searchParams.delete('category');
    url.searchParams.delete('ceu');
    window.history.replaceState({}, '', url);
  }

  /**
   * Updates the results count display
   * @param {number|null} count - The count to display, or null to calculate automatically
   */
  updateResultsCount(count = null) {
    if (!this.resultsCount) return;
    
    if (count === null) {
      count = this.courseItems.filter(item => 
        !item.classList.contains('hidden') && 
        item.style.display !== 'none'
      ).length;
    }
    
    this.resultsCount.textContent = count.toString();
  }

  /**
   * Updates the no results state based on visible count
   * @param {number} visibleCount - Number of visible courses
   */
  updateNoResultsState(visibleCount) {
    if (!this.noResults) return;
    
    if (visibleCount === 0) {
      this.noResults.style.display = 'block';
      if (this.coursesGrid) {
        this.coursesGrid.style.display = 'none';
      }
    } else {
      this.noResults.style.display = 'none';
      if (this.coursesGrid) {
        this.coursesGrid.style.display = 'grid';
      }
    }
  }

  handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Apply URL filters
    const searchParam = urlParams.get('search');
    const levelParam = urlParams.get('level');
    const categoryParam = urlParams.get('category');
    const ceuParam = urlParams.get('ceu');
    
    if (searchParam && this.searchInput) {
      this.searchInput.value = searchParam;
    }
    
    if (levelParam && this.levelFilter) {
      this.levelFilter.value = levelParam;
    }
    
    if (categoryParam && this.categoryFilter) {
      this.categoryFilter.value = categoryParam;
    }
    
    if (ceuParam && this.ceuFilter) {
      this.ceuFilter.value = ceuParam;
    }
    
    // Apply filters if any were set
    if (searchParam || levelParam || categoryParam || ceuParam) {
      this.filterCourses();
    }
  }

  // Public method for external filter updates
  /**
   * Updates filters based on provided filter object
   * @param {Object} filters - Filter configuration object
   * @param {string} [filters.search] - Search term
   * @param {string} [filters.level] - Level filter
   * @param {string} [filters.category] - Category filter  
   * @param {string} [filters.ceu] - CEU filter
   */
  updateFilters(filters) {
    if (filters.search && this.searchInput) {
      this.searchInput.value = filters.search;
    }
    
    if (filters.level && this.levelFilter) {
      this.levelFilter.value = filters.level;
    }
    
    if (filters.category && this.categoryFilter) {
      this.categoryFilter.value = filters.category;
    }
    
    if (filters.ceu && this.ceuFilter) {
      this.ceuFilter.value = filters.ceu;
    }
    
    this.filterCourses();
  }
}

// Course Preview Modal functionality
class CoursePreviewModal {
  constructor() {
    this.modal = document.getElementById('course-preview-modal');
    this.modalContent = document.querySelector('.modal-content');
    this.closeBtn = document.querySelector('.modal-close');
    this.iframe = document.getElementById('preview-iframe');
    this.modalTitle = document.getElementById('preview-title');
    
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  /**
   * Opens the preview modal with video URL and title
   * @param {string} videoUrl - URL of the video to display  
   * @param {string} title - Title of the course
   */
  open(videoUrl, title) {
    if (!this.modal || !this.iframe) return;
    
    if (this.iframe) {
      /** @type {HTMLIFrameElement} */ (this.iframe).src = videoUrl;
    }
    
    if (this.modalTitle && title) {
      this.modalTitle.textContent = `${title} - Preview`;
    }
    
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
      if (this.modalContent) {
        this.modalContent.classList.add('modal-open');
      }
    }, 10);
  }

  close() {
    if (!this.modal) return;
    
    if (this.iframe) {
      /** @type {HTMLIFrameElement} */ (this.iframe).src = '';
    }
    
    if (this.modalContent) {
      this.modalContent.classList.remove('modal-open');
    }
    
    setTimeout(() => {
      if (this.modal) {
        this.modal.style.display = 'none';
      }
      document.body.style.overflow = '';
    }, 300);
  }

  isOpen() {
    return this.modal && this.modal.style.display === 'flex';
  }
}

// Analytics and tracking
class CourseAnalytics {
  constructor() {
    this.init();
  }

  init() {
    this.trackCourseViews();
    this.trackFilterUsage();
    this.trackPreviewEngagement();
  }

  trackCourseViews() {
    // Track course card interactions
    document.querySelectorAll('.course-card-professional').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const courseTitle = card.querySelector('.course-title')?.textContent;
        this.logEvent('course_hover', {
          course_title: courseTitle,
          timestamp: new Date().toISOString()
        });
      });
      
      card.addEventListener('click', () => {
        const courseTitle = card.querySelector('.course-title')?.textContent;
        this.logEvent('course_click', {
          course_title: courseTitle,
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  trackFilterUsage() {
    const filters = ['course-search', 'level-filter', 'category-filter', 'ceu-filter'];
    
    filters.forEach(filterId => {
      const element = document.getElementById(filterId);
      if (element) {
        element.addEventListener('change', () => {
          this.logEvent('filter_used', {
            filter_type: filterId,
            filter_value: /** @type {HTMLInputElement|HTMLSelectElement} */ (element).value,
            timestamp: new Date().toISOString()
          });
        });
      }
    });
  }

  trackPreviewEngagement() {
    // Track preview modal usage
    document.addEventListener('preview_opened', (e) => {
      /** @type {CustomEvent} */
      const customEvent = /** @type {CustomEvent} */ (e);
      this.logEvent('course_preview', {
        course_title: customEvent.detail.title,
        timestamp: new Date().toISOString()
      });
    });
  }

  /**
   * Log analytics event
   * @param {string} eventType - The type of event to log
   * @param {any} data - The event data
   */
  logEvent(eventType, data) {
    // Send to analytics service (placeholder)
    console.log(`AAI Analytics: ${eventType}`, data);
    
    // In production, send to your analytics service:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event: eventType, data })
    // });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize course collection manager
  const courseManager = new CourseCollectionManager();
  
  // Initialize preview modal
  const previewModal = new CoursePreviewModal();
  
  // Initialize analytics
  const analytics = new CourseAnalytics();
  
  // Make functions globally available
  /** @type {any} */ (window).courseManager = courseManager;
  /** @type {any} */ (window).previewModal = previewModal;
  
  // Global functions for inline event handlers
  window.openPreview = function(videoUrl, title) {
    previewModal.open(videoUrl, title);
    
    // Dispatch custom event for analytics
    document.dispatchEvent(new CustomEvent('preview_opened', {
      detail: { title, videoUrl }
    }));
  };
  
  window.closePreview = function() {
    previewModal.close();
  };
  
  window.clearFilters = function() {
    courseManager.clearAllFilters();
  };
  
  // Professional loading enhancement
  const courseCards = document.querySelectorAll('.course-card-professional');
  if (courseCards.length > 0) {
    // Staggered animation on load
    courseCards.forEach((card, index) => {
      /** @type {HTMLElement} */
      const htmlCard = /** @type {HTMLElement} */ (card);
      htmlCard.style.opacity = '0';
      htmlCard.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        htmlCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        htmlCard.style.opacity = '1';
        htmlCard.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CourseCollectionManager,
    CoursePreviewModal,
    CourseAnalytics
  };
}
