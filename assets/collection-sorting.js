/**
 * Collection-Based Course Sorting JavaScript
 * Handles switching between different course collections
 */

class CollectionSorting {
  constructor() {
    this.buttons = document.querySelectorAll('.collection-nav__btn');
    this.groups = document.querySelectorAll('.collection-group');
    this.container = document.querySelector('.collection-sorting');
    this.activeCollection = 'all';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setInitialState();
  }
  
  bindEvents() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (e) => this.handleCollectionSwitch(e));
    });
    
    // Handle URL hash for direct collection linking
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Handle initial hash if present
    if (window.location.hash) {
      this.handleHashChange();
    }
  }
  
  setInitialState() {
    // Ensure only the "all" collection is shown initially
    this.showCollection('all');
  }
  
  handleCollectionSwitch(event) {
    const button = event.currentTarget;
    const collection = button.dataset.collection;
    
    if (collection === this.activeCollection) return;
    
    this.showCollection(collection);
    this.updateUrl(collection);
  }
  
  showCollection(collection) {
    // Add loading state
    if (this.container) {
      this.container.classList.add('loading');
    }
    
    // Update button states
    this.buttons.forEach(btn => {
      btn.classList.toggle('collection-nav__btn--active', btn.dataset.collection === collection);
    });
    
    // Hide all groups first
    this.groups.forEach(group => {
      group.classList.remove('collection-group--active');
    });
    
    // Show the selected group after a brief delay for smooth transition
    setTimeout(() => {
      const targetGroup = document.querySelector(`[data-collection-group="${collection}"]`);
      if (targetGroup) {
        targetGroup.classList.add('collection-group--active');
      }
      
      // Remove loading state
      if (this.container) {
        this.container.classList.remove('loading');
      }
      
      // Update active collection
      this.activeCollection = collection;
      
      // Trigger custom event for analytics or other integrations
      this.dispatchCollectionChangeEvent(collection);
      
    }, 150);
  }
  
  updateUrl(collection) {
    // Update URL hash without page reload
    const newHash = collection === 'all' ? '' : `#collection-${collection}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, null, newHash || window.location.pathname);
    }
  }
  
  handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith('#collection-')) {
      const collection = hash.replace('#collection-', '');
      // Check if this collection exists
      const targetButton = document.querySelector(`[data-collection="${collection}"]`);
      if (targetButton) {
        this.showCollection(collection);
      }
    } else {
      this.showCollection('all');
    }
  }
  
  dispatchCollectionChangeEvent(collection) {
    const event = new CustomEvent('collectionChanged', {
      detail: {
        collection: collection,
        previousCollection: this.activeCollection
      }
    });
    document.dispatchEvent(event);
  }
  
  // Public method to programmatically switch collections
  switchToCollection(collection) {
    const targetButton = document.querySelector(`[data-collection="${collection}"]`);
    if (targetButton) {
      this.showCollection(collection);
      this.updateUrl(collection);
    }
  }
  
  // Public method to get current active collection
  getCurrentCollection() {
    return this.activeCollection;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if the collection sorting section exists
  if (document.querySelector('.collection-sorting')) {
    window.collectionSorting = new CollectionSorting();
  }
});

// Global functions for external use
window.switchToCollection = function(collection) {
  if (window.collectionSorting) {
    window.collectionSorting.switchToCollection(collection);
  }
};

window.getCurrentCollection = function() {
  if (window.collectionSorting) {
    return window.collectionSorting.getCurrentCollection();
  }
  return 'all';
};

// Analytics integration example
document.addEventListener('collectionChanged', function(event) {
  // Track collection switches for analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'collection_switch', {
      'collection_name': event.detail.collection,
      'previous_collection': event.detail.previousCollection
    });
  }
  
  // Track for Shopify analytics
  if (typeof window.ShopifyAnalytics !== 'undefined') {
    window.ShopifyAnalytics.track('Collection Switch', {
      collection: event.detail.collection,
      previousCollection: event.detail.previousCollection
    });
  }
});
