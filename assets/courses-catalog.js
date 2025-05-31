/**
 * Course Catalog JavaScript Functionality
 * Handles course filtering, search, view controls, and preview modal
 */

// Course filtering and search
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = /** @type {HTMLInputElement} */ (document.getElementById('course-search'));
  const levelFilter = /** @type {HTMLSelectElement} */ (document.getElementById('level-filter'));
  const categoryFilter = /** @type {HTMLSelectElement} */ (document.getElementById('category-filter'));
  const ceuFilter = /** @type {HTMLSelectElement} */ (document.getElementById('ceu-filter'));
  const coursesGrid = document.getElementById('courses-grid');
  const courseItems = document.querySelectorAll('.course-item');
  const noResults = /** @type {HTMLElement} */ (document.getElementById('no-results'));
  const viewBtns = document.querySelectorAll('.view-btn');
  
  // Filter courses
  function filterCourses() {
    const searchTerm = searchInput?.value?.toLowerCase() || '';
    const levelValue = levelFilter?.value || '';
    const categoryValue = categoryFilter?.value || '';
    const ceuValue = ceuFilter?.value || '';
    
    let visibleCount = 0;
    
    courseItems.forEach(item => {
      const htmlItem = /** @type {HTMLElement} */ (item);
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
        const [min, max] = ceuValue.split('-').map((/** @type {string} */ v) => v.replace('+', ''));
        if (ceuValue.includes('+')) {
          if (ceu < parseInt(min || '0')) visible = false;
        } else {
          if (ceu < parseInt(min || '0') || ceu > parseInt(max || '0')) visible = false;
        }
      }
      
      const itemElement = /** @type {HTMLElement} */ (item);
      if (itemElement.style) {
        itemElement.style.display = visible ? 'block' : 'none';
      }
      if (visible) visibleCount++;
    });
    
    if (noResults?.style) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }
  
  // Add event listeners
  if (searchInput) searchInput.addEventListener('input', filterCourses);
  if (levelFilter) levelFilter.addEventListener('change', filterCourses);
  if (categoryFilter) categoryFilter.addEventListener('change', filterCourses);
  if (ceuFilter) ceuFilter.addEventListener('change', filterCourses);
  
  // View controls
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.dataset.view;
      
      viewBtns.forEach(b => b.classList.remove('view-btn--active'));
      this.classList.add('view-btn--active');
      
      if (coursesGrid) {
        coursesGrid.className = `courses-grid courses-grid--${view}`;
      }
    });
  });
});

// Clear all filters
function clearFilters() {
  const searchInput = /** @type {HTMLInputElement} */ (document.getElementById('course-search'));
  const levelFilter = /** @type {HTMLSelectElement} */ (document.getElementById('level-filter'));
  const categoryFilter = /** @type {HTMLSelectElement} */ (document.getElementById('category-filter'));
  const ceuFilter = /** @type {HTMLSelectElement} */ (document.getElementById('ceu-filter'));
  const noResults = /** @type {HTMLElement} */ (document.getElementById('no-results'));
  
  if (searchInput && 'value' in searchInput) searchInput.value = '';
  if (levelFilter && 'value' in levelFilter) levelFilter.value = '';
  if (categoryFilter && 'value' in categoryFilter) categoryFilter.value = '';
  if (ceuFilter && 'value' in ceuFilter) ceuFilter.value = '';
  
  document.querySelectorAll('.course-item').forEach(item => {
    const itemElement = /** @type {HTMLElement} */ (item);
    if (itemElement && 'style' in itemElement) {
      itemElement.style.display = 'block';
    }
  });
  
  if (noResults && 'style' in noResults) {
    noResults.style.display = 'none';
  }
}

// Preview modal functions
/**
 * @param {string} videoUrl - URL of the video to preview
 * @param {string} title - Title of the course
 */
function openPreview(videoUrl, title) {
  const modal = /** @type {HTMLElement} */ (document.getElementById('preview-modal'));
  const iframe = /** @type {HTMLIFrameElement} */ (document.getElementById('preview-iframe'));
  const titleElement = document.getElementById('preview-title');
  
  if (modal && iframe && 'src' in iframe) {
    iframe.src = videoUrl;
    if (titleElement) {
      titleElement.textContent = `${title} - Preview`;
    }
    if ('style' in modal) {
      modal.style.display = 'flex';
    }
    
    document.body.style.overflow = 'hidden';
  }
}

function closePreview() {
  const modal = /** @type {HTMLElement} */ (document.getElementById('preview-modal'));
  const iframe = /** @type {HTMLIFrameElement} */ (document.getElementById('preview-iframe'));
  
  if (modal && iframe && 'src' in iframe) {
    iframe.src = '';
    if ('style' in modal) {
      modal.style.display = 'none';
    }
    
    document.body.style.overflow = '';
  }
}

// Handle URL filters
window.addEventListener('load', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get('filter');
  
  if (filter) {
    const categoryFilter = /** @type {HTMLSelectElement} */ (document.getElementById('category-filter'));
    if (categoryFilter && 'value' in categoryFilter) {
      categoryFilter.value = filter;
      categoryFilter.dispatchEvent(new Event('change'));
    }
  }
});

// Make functions available globally for HTML onclick handlers
window.clearFilters = clearFilters;
window.openPreview = openPreview;
window.closePreview = closePreview;
