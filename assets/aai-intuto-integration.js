/**
 * AAI Intuto Integration Module
 * COPILOT CONTEXT:
 * - Handles Intuto Multi Token system integration
 * - Manages course access, progress tracking, and certificate generation
 * - Professional education platform integration (not casual e-commerce)
 * - Exact integration matching AAI requirements
 */

class AAIIntutoIntegration {
  constructor() {
    /** @type {string} */
    // @ts-ignore - AAI is added to window object by aai-core.js
    this.apiUrl = (window.AAI && window.AAI.config && window.AAI.config.intutoApiUrl) || 'https://api.intuto.com';
    /** @type {string} */
    // @ts-ignore - AAI is added to window object by aai-core.js
    this.apiKey = window.AAI && window.AAI.config && window.AAI.config.intutoApiKey;
    /** @type {string} */
    // @ts-ignore - AAI is added to window object by aai-core.js
    this.organizationId = window.AAI && window.AAI.config && window.AAI.config.intutoOrgId;
    /** @type {boolean} */
    // @ts-ignore - AAI is added to window object by aai-core.js
    this.debug = (window.AAI && window.AAI.config && window.AAI.config.debug) || false;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkCourseAccess();
    this.updateProgressDisplay();
    
    if (this.debug) {
      console.log('AAI Intuto Integration initialized');
    }
  }

  /**
   * Setup event listeners for course interactions
   */
  setupEventListeners() {
    // Continue Learning buttons
    document.addEventListener('click', (e) => {
      if (e.target && e.target instanceof Element && e.target.matches('.aai-btn-continue, .aai-progress-btn.aai-btn-primary')) {
        e.preventDefault();
        this.handleContinueLearning(/** @type {HTMLElement} */ (e.target));
      }
    });

    // Certificate download buttons
    document.addEventListener('click', (e) => {
      if (e.target && e.target instanceof Element && e.target.matches('.aai-btn-certificate')) {
        e.preventDefault();
        this.handleCertificateDownload(/** @type {HTMLElement} */ (e.target));
      }
    });

    // Course enrollment tracking
    document.addEventListener('click', (e) => {
      if (e.target && e.target instanceof Element && e.target.matches('.enroll-btn')) {
        this.trackEnrollmentIntent(/** @type {HTMLElement} */ (e.target));
      }
    });
  }

  /**
   * Handle "Continue Learning" button clicks
   * @param {HTMLElement} button
   */
  async handleContinueLearning(button) {
    const productId = this.getProductIdFromElement(button);
    const customerId = this.getCurrentCustomerId();
    
    if (!productId || !customerId) {
      this.showError('Unable to access course. Please ensure you are logged in.');
      return;
    }

    try {
      this.showLoading(button);
      
      // Get or create Intuto token for this course
      const tokenData = await this.getOrCreateToken(customerId, productId);
      
      if (tokenData && tokenData.access_url) {
        // Track learning session start
        this.trackLearningSession(customerId, productId, 'started');
        
        // Open course in new window/tab
        this.openCourse(tokenData.access_url, productId);
      } else {
        throw new Error('Unable to generate course access');
      }
    } catch (error) {
      console.error('Error accessing course:', error);
      this.showError('Unable to access course. Please contact support if this continues.');
    } finally {
      this.hideLoading(button);
    }
  }

  /**
   * Handle certificate download
   * @param {HTMLElement} button
   */
  async handleCertificateDownload(button) {
    const productId = this.getProductIdFromElement(button);
    const customerId = this.getCurrentCustomerId();
    
    if (!productId || !customerId) {
      this.showError('Unable to download certificate. Please ensure you are logged in.');
      return;
    }

    try {
      this.showLoading(button);
      
      const certificateData = await this.getCertificate(customerId, productId);
      
      if (certificateData && certificateData.certificate_url) {
        // Track certificate download
        this.trackCertificateDownload(customerId, productId);
        
        // Download certificate
        this.downloadFile(certificateData.certificate_url, `AAI-Certificate-${productId}.pdf`);
      } else {
        throw new Error('Certificate not yet available');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
      this.showError('Certificate not yet available. Complete the course to earn your certificate.');
    } finally {
      this.hideLoading(button);
    }
  }

  /**
   * Get certificate for completed course
   * @param {string} customerId
   * @param {string} productId
   * @returns {Promise<any>}
   */
  async getCertificate(customerId, productId) {
    try {
      const response = await fetch(`${this.apiUrl}/certificates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          user_id: customerId,
          course_id: productId,
          organization_id: this.organizationId
        })
      });

      if (!response.ok) {
        throw new Error('Certificate not available');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching certificate:', error);
      throw error;
    }
  }

  /**
   * Track enrollment intent for analytics
   * @param {HTMLElement} button
   */
  trackEnrollmentIntent(button) {
    const productId = this.getProductIdFromElement(button);
    if (productId) {
      // @ts-ignore - AAI is added to window object by aai-core.js
      if (window.AAI?.analytics) {
        // @ts-ignore - AAI is added to window object by aai-core.js
        window.AAI.analytics.track('Enrollment Intent', {
          product_id: productId,
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  /**
   * Get or create Intuto token for customer and course
   * @param {string} customerId
   * @param {string} productId
   * @returns {Promise<any>}
   */
  async getOrCreateToken(customerId, productId) {
    try {
      // First check if token already exists
      let tokenData = await this.getExistingToken(customerId, productId);
      
      if (!tokenData || this.isTokenExpired(tokenData)) {
        // Create new token
        tokenData = await this.createNewToken(customerId, productId);
      }
      
      return tokenData;
    } catch (error) {
      console.error('Error managing token:', error);
      throw error;
    }
  }

  /**
   * Get existing token from Shopify customer metafields
   * @param {string} customerId
   * @param {string} productId
   * @returns {Promise<any>}
   */
  async getExistingToken(customerId, productId) {
    try {
      const response = await fetch(`/admin/api/2023-10/customers/${customerId}/metafields.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // @ts-ignore - AAI is added to window object by aai-core.js
          'X-Shopify-Access-Token': window.AAI?.config?.shopifyToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer metafields');
      }

      const data = await response.json();
      const tokenMetafield = data.metafields?.find(
        /** @param {any} mf */ (mf) => mf.namespace === 'aai' && mf.key === `intuto_token_${productId}`
      );

      return tokenMetafield ? JSON.parse(tokenMetafield.value) : null;
    } catch (error) {
      console.error('Error fetching existing token:', error);
      return null;
    }
  }

  /**
   * Create new Intuto token via API
   * @param {string} customerId
   * @param {string} productId
   * @returns {Promise<any>}
   */
  async createNewToken(customerId, productId) {
    try {
      // Get customer and product data
      const customer = await this.getCustomerData(customerId);
      const product = await this.getProductData(productId);
      
      if (!customer || !product) {
        throw new Error('Unable to fetch customer or product data');
      }

      // Create token request to Intuto
      const tokenRequest = {
        organization_id: this.organizationId,
        user: {
          email: customer.email,
          first_name: customer.first_name,
          last_name: customer.last_name,
          external_id: customerId.toString()
        },
        course: {
          external_id: productId.toString(),
          title: product.title,
          intuto_course_id: product.metafields?.aai?.intuto_course_id
        },
        settings: {
          expires_at: this.calculateTokenExpiry(),
          progress_callback_url: `${window.location.origin}/webhooks/intuto/progress`,
          completion_callback_url: `${window.location.origin}/webhooks/intuto/completion`
        }
      };

      const response = await fetch(`${this.apiUrl}/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(tokenRequest)
      });

      if (!response.ok) {
        throw new Error(`Intuto API error: ${response.statusText}`);
      }

      const tokenData = await response.json();
      
      // Store token in customer metafields
      await this.storeTokenInMetafields(customerId, productId, tokenData);
      
      return tokenData;
    } catch (error) {
      console.error('Error creating new token:', error);
      throw error;
    }
  }

  /**
   * Get customer data from Shopify
   * @param {string} customerId
   * @returns {Promise<any>}
   */
  async getCustomerData(customerId) {
    try {
      const response = await fetch(`/admin/api/2023-10/customers/${customerId}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // @ts-ignore - AAI is added to window object by aai-core.js
          'X-Shopify-Access-Token': window.AAI?.config?.shopifyToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }

      const data = await response.json();
      return data.customer;
    } catch (error) {
      console.error('Error fetching customer data:', error);
      return null;
    }
  }

  /**
   * Get product data from Shopify
   * @param {string} productId
   * @returns {Promise<any>}
   */
  async getProductData(productId) {
    try {
      const response = await fetch(`/admin/api/2023-10/products/${productId}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // @ts-ignore - AAI is added to window object by aai-core.js
          'X-Shopify-Access-Token': window.AAI?.config?.shopifyToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  }

  /**
   * Store token data in Shopify customer metafields
   * @param {string} customerId
   * @param {string} productId
   * @param {any} tokenData
   */
  async storeTokenInMetafields(customerId, productId, tokenData) {
    try {
      const metafieldData = {
        metafield: {
          namespace: 'aai',
          key: `intuto_token_${productId}`,
          value: JSON.stringify({
            token_id: tokenData.id,
            access_url: tokenData.access_url,
            created_at: new Date().toISOString(),
            expires_at: tokenData.expires_at
          }),
          type: 'json'
        }
      };

      const response = await fetch(`/admin/api/2023-10/customers/${customerId}/metafields.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // @ts-ignore - AAI is added to window object by aai-core.js
          'X-Shopify-Access-Token': window.AAI?.config?.shopifyToken
        },
        body: JSON.stringify(metafieldData)
      });

      if (!response.ok) {
        throw new Error('Failed to store token in metafields');
      }
    } catch (error) {
      console.error('Error storing token:', error);
      // Don't throw - token creation succeeded, storage is secondary
    }
  }

  /**
   * Open course in appropriate context
   * @param {string} accessUrl
   * @param {string} productId
   */
  openCourse(accessUrl, productId) {
    // @ts-ignore - AAI is added to window object by aai-core.js
    if (window.AAI?.config?.embedCourses) {
      // Open in modal/iframe for embedded experience
      this.openCourseModal(accessUrl, productId);
    } else {
      // Open in new tab for full Intuto experience
      window.open(accessUrl, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Open course in modal for embedded experience
   * @param {string} accessUrl
   * @param {string} productId
   */
  openCourseModal(accessUrl, productId) {
    const modal = document.createElement('div');
    modal.className = 'aai-course-modal';
    modal.innerHTML = `
      <div class="aai-modal-backdrop">
        <div class="aai-modal-content">
          <div class="aai-modal-header">
            <h3>Course Learning Environment</h3>
            <button class="aai-modal-close" onclick="this.closest('.aai-course-modal').remove()">×</button>
          </div>
          <div class="aai-modal-body">
            <iframe src="${accessUrl}" frameborder="0" style="width: 100%; height: 600px;"></iframe>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Cleanup on close
    modal.addEventListener('click', (e) => {
      if (e.target && e.target instanceof Element && e.target.matches('.aai-modal-backdrop, .aai-modal-close')) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Check course access for current customer
   */
  async checkCourseAccess() {
    const customerId = this.getCurrentCustomerId();
    if (!customerId) return;

    try {
      // Get customer's purchased courses
      const orders = await this.getCustomerOrders(customerId);
      const purchasedCourses = this.extractPurchasedCourses(orders);
      
      // Update UI to show access status
      this.updateCourseAccessUI(purchasedCourses);
    } catch (error) {
      console.error('Error checking course access:', error);
    }
  }

  /**
   * Get customer orders from Shopify
   * @param {string} customerId
   * @returns {Promise<any>}
   */
  async getCustomerOrders(customerId) {
    try {
      const response = await fetch(`/admin/api/2023-10/customers/${customerId}/orders.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // @ts-ignore - AAI is added to window object by aai-core.js
          'X-Shopify-Access-Token': window.AAI?.config?.shopifyToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer orders');
      }

      const data = await response.json();
      return data.orders;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      return [];
    }
  }

  /**
   * Extract purchased courses from orders
   * @param {any[]} orders
   * @returns {string[]}
   */
  extractPurchasedCourses(orders) {
    /** @type {string[]} */
    const courseProducts = [];
    
    orders.forEach(order => {
      order.line_items?.forEach(/** @param {any} item */ (item) => {
        if (item.product_type === 'course' || item.tags?.includes('course')) {
          courseProducts.push(item.product_id.toString());
        }
      });
    });
    
    return courseProducts;
  }

  /**
   * Update UI to show course access status
   * @param {string[]} purchasedCourses
   */
  updateCourseAccessUI(purchasedCourses) {
    document.querySelectorAll('[data-product-id]').forEach(element => {
      if (element instanceof HTMLElement) {
        const productId = element.dataset.productId;
        if (productId && purchasedCourses.includes(productId)) {
          element.classList.add('aai-course-purchased');
          
          // Update buttons to show access
          const enrollBtn = element.querySelector('.enroll-btn');
          if (enrollBtn instanceof HTMLElement) {
            enrollBtn.textContent = 'Access Course';
            enrollBtn.classList.add('aai-btn-continue');
            enrollBtn.classList.remove('enroll-btn');
          }
        }
      }
    });
  }

  /**
   * Update progress display for enrolled courses
   */
  async updateProgressDisplay() {
    const customerId = this.getCurrentCustomerId();
    if (!customerId) return;

    try {
      const progressData = await this.getProgressData(customerId);
      this.updateProgressUI(progressData);
    } catch (error) {
      console.error('Error updating progress display:', error);
    }
  }

  /**
   * Get progress data from Intuto API
   * @param {string} customerId
   * @returns {Promise<any>}
   */
  async getProgressData(customerId) {
    try {
      const response = await fetch(`${this.apiUrl}/progress/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch progress data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching progress data:', error);
      return {};
    }
  }

  /**
   * Update progress UI elements
   * @param {any} progressData
   */
  updateProgressUI(progressData) {
    Object.keys(progressData).forEach(courseId => {
      const progress = progressData[courseId];
      const progressElement = document.querySelector(`[data-course-id="${courseId}"] .aai-progress-bar`);
      
      if (progressElement instanceof HTMLElement) {
        const progressBar = progressElement.querySelector('.aai-progress-fill');
        const progressText = progressElement.querySelector('.aai-progress-text');
        
        if (progressBar instanceof HTMLElement) {
          progressBar.style.width = `${progress.percentage}%`;
        }
        
        if (progressText instanceof HTMLElement) {
          progressText.textContent = `${progress.percentage}% Complete`;
        }
      }
    });
  }

  /**
   * Track learning session events
   * @param {string} customerId
   * @param {string} productId
   * @param {string} action
   */
  trackLearningSession(customerId, productId, action) {
    // @ts-ignore - AAI is added to window object by aai-core.js
    if (window.AAI?.analytics) {
      // @ts-ignore - AAI is added to window object by aai-core.js
      window.AAI.analytics.track('Course Access', {
        customer_id: customerId,
        product_id: productId,
        action: action,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Track certificate downloads
   * @param {string} customerId
   * @param {string} productId
   */
  trackCertificateDownload(customerId, productId) {
    // @ts-ignore - AAI is added to window object by aai-core.js
    if (window.AAI?.analytics) {
      // @ts-ignore - AAI is added to window object by aai-core.js
      window.AAI.analytics.track('Certificate Download', {
        customer_id: customerId,
        product_id: productId,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Utility methods
   */
  /**
   * @param {any} element
   * @returns {string|null}
   */
  getProductIdFromElement(element) {
    if (element instanceof HTMLElement) {
      const productId = element.dataset.productId;
      if (productId) return productId;
      
      const closest = element.closest('[data-product-id]');
      if (closest instanceof HTMLElement) {
        return closest.dataset.productId || null;
      }
    }
    return null;
  }

  getCurrentCustomerId() {
    // @ts-ignore - AAI is added to window object by aai-core.js
    if (window.AAI?.customer?.id) {
      // @ts-ignore - AAI is added to window object by aai-core.js
      return window.AAI.customer.id;
    }
    
    const element = document.querySelector('[data-customer-id]');
    if (element instanceof HTMLElement) {
      return element.dataset.customerId || null;
    }
    
    return null;
  }

  calculateTokenExpiry() {
    // Default to 1 year from now
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry.toISOString();
  }

  /**
   * Check if token is expired
   * @param {any} tokenData
   * @returns {boolean}
   */
  isTokenExpired(tokenData) {
    if (!tokenData.expires_at) return false;
    return new Date(tokenData.expires_at) <= new Date();
  }

  /**
   * Show loading state on button
   * @param {HTMLElement} button
   */
  showLoading(button) {
    if (button instanceof HTMLButtonElement || button instanceof HTMLInputElement) {
      button.disabled = true;
    }
    button.dataset.originalText = button.textContent || '';
    button.textContent = 'Loading...';
  }

  /**
   * Hide loading state on button
   * @param {HTMLElement} button
   */
  hideLoading(button) {
    if (button instanceof HTMLButtonElement || button instanceof HTMLInputElement) {
      button.disabled = false;
    }
    button.textContent = button.dataset.originalText || button.textContent;
  }

  /**
   * Show error message to user
   * @param {string} message
   */
  showError(message) {
    // @ts-ignore - AAI is added to window object by aai-core.js
    if (window.AAI?.notifications) {
      // @ts-ignore - AAI is added to window object by aai-core.js
      window.AAI.notifications.show(message, 'error');
    } else {
      alert(message);
    }
  }

  /**
   * Download file helper
   * @param {string} url
   * @param {string} filename
   */
  downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore - AAI is added to window object by aai-core.js
  window.AAI = window.AAI || {};
  // @ts-ignore - AAI is added to window object by aai-core.js
  window.AAI.intuto = new AAIIntutoIntegration();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AAIIntutoIntegration;
}
