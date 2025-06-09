import { Component } from '@theme/component';
import { ThemeEvents } from '@theme/events';
import { fetchConfig, onAnimationEnd } from '@theme/utilities';

/**
 * A custom element that displays a cart drawer.
 *
 * @typedef {object} Refs
 * @property {HTMLDialogElement} dialog - The dialog element.
 *
 * @extends {Component<Refs>}
 */
class CartDrawerComponent extends Component {
  requiredRefs = ['dialog'];

  connectedCallback() {
    super.connectedCallback();
    
    // Listen for cart trigger clicks
    document.addEventListener('click', this.#handleCartTriggerClick);
    document.addEventListener('keydown', this.#handleEscapeKey);
    
    // Listen for cart updates
    document.addEventListener(ThemeEvents.cartUpdate, this.#handleCartUpdate);
    
    // Bind overlay and close button clicks
    this.#bindCloseEvents();
    
    // Intercept cart page links when drawer is enabled
    this.#interceptCartLinks();
    
    // Setup auto-open functionality for add-to-cart actions
    this.#setupAutoOpenFunctionality();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    document.removeEventListener('click', this.#handleCartTriggerClick);
    document.removeEventListener('keydown', this.#handleEscapeKey);
    document.removeEventListener(ThemeEvents.cartUpdate, this.#handleCartUpdate);
  }

  /**
   * Setup auto-open functionality when items are added to cart
   */
  #setupAutoOpenFunctionality() {
    // Listen for cart add events if auto-open is enabled
    document.addEventListener(ThemeEvents.cartUpdate, (event) => {
      // Cast event to CustomEvent for proper type handling
      const customEvent = /** @type {CustomEvent} */ (event);
      
      // Check if this is an add event (not just an update)
      const isAddEvent = customEvent.detail?.data?.source === 'product-form' || 
                        customEvent.detail?.data?.variantId || 
                        customEvent.detail?.sourceId?.includes('product-form') ||
                        customEvent.detail?.source?.includes('add-to-cart');
                        
      // Get the auto-open setting from the cart drawer element data attribute
      const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
      
      if (isAddEvent && autoOpenEnabled && !this.refs.dialog.open) {
        // Small delay to allow cart update to complete
        setTimeout(() => {
          this.showDialog();
        }, 100);
      }
    });

    // Also listen for direct add-to-cart form submissions
    document.addEventListener('submit', (event) => {
      const form = /** @type {HTMLFormElement} */ (event.target);
      if (form?.matches('[data-type="add-to-cart-form"]')) {
        const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
        if (autoOpenEnabled && !this.refs.dialog.open) {
          // Delay to allow form submission to complete
          setTimeout(() => {
            this.showDialog();
          }, 500);
        }
      }
    });
  }

  /**
   * Handle cart trigger button clicks
   * @param {Event} event
   */
  #handleCartTriggerClick = (event) => {
    const trigger = /** @type {HTMLElement} */ (event.target);
    if (trigger?.matches('[data-cart-drawer-trigger]') || trigger?.closest('[data-cart-drawer-trigger]')) {
      event.preventDefault();
      event.stopPropagation();
      this.showDialog();
    }
  };

  /**
   * Handle escape key to close drawer
   * @param {KeyboardEvent} event
   */
  #handleEscapeKey = (event) => {
    if (event.key === 'Escape' && this.refs.dialog.open) {
      this.closeDialog();
    }
  };

  /**
   * Handle cart updates to refresh drawer content
   * @param {CustomEvent} event
   */
  #handleCartUpdate = (event) => {
    if (this.refs.dialog.open) {
      this.#refreshCartContent();
    }
  };

  /**
   * Bind close events for overlay and close buttons
   */
  #bindCloseEvents() {
    // Handle overlay clicks
    this.refs.dialog.addEventListener('click', (event) => {
      const target = /** @type {HTMLElement} */ (event.target);
      if (target === this.refs.dialog || target?.classList?.contains('cart-drawer__overlay')) {
        this.closeDialog();
      }
    });

    // Handle close button clicks
    const closeButtons = this.refs.dialog.querySelectorAll('.cart-drawer__close');
    closeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.closeDialog();
      });
    });
  }

  /**
   * Show the cart drawer
   */
  showDialog() {
    if (!this.refs.dialog.open) {
      this.refs.dialog.showModal();
      this.refs.dialog.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Bind quantity and removal controls after opening
      this.#bindCartControls();
    }
  }

  /**
   * Close the cart drawer with animation
   */
  closeDialog() {
    if (this.refs.dialog.open) {
      // Add closing class for CSS animation
      this.refs.dialog.classList.add('closing');
      
      // Wait for animation to complete before actually closing
      setTimeout(() => {
        this.refs.dialog.close();
        this.refs.dialog.classList.remove('closing');
        this.refs.dialog.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }, 300); // Match CSS animation duration
    }
  }

  /**
   * Bind cart quantity and removal controls
   */
  #bindCartControls() {
    this.#bindQuantityControls();
    this.#bindRemoveButtons();
  }

  /**
   * Bind quantity control buttons and inputs
   */
  #bindQuantityControls() {
    // Quantity buttons
    const quantityButtons = this.refs.dialog.querySelectorAll('[data-quantity-change]');
    quantityButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const change = parseInt(button.getAttribute('data-quantity-change') || '0');
        const line = parseInt(button.getAttribute('data-line') || '0');
        this.#updateQuantity(line, change);
      });
    });

    // Quantity inputs
    const quantityInputs = this.refs.dialog.querySelectorAll('[data-quantity-input]');
    quantityInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        const target = /** @type {HTMLInputElement} */ (event.target);
        const line = parseInt(target.getAttribute('data-line') || '0');
        const newQuantity = parseInt(target.value);
        this.#setQuantity(line, newQuantity);
      });
    });
  }

  /**
   * Bind item removal buttons
   */
  #bindRemoveButtons() {
    const removeButtons = this.refs.dialog.querySelectorAll('[data-remove-item]');
    removeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const line = parseInt(button.getAttribute('data-line') || '0');
        this.#removeItem(line);
      });
    });
  }

  /**
   * Update quantity by relative change
   * @param {number} line
   * @param {number} change
   */
  #updateQuantity(line, change) {
    const input = this.refs.dialog.querySelector(`[data-line="${line}"][data-quantity-input]`);
    if (input) {
      const currentQuantity = parseInt(/** @type {HTMLInputElement} */ (input).value);
      const newQuantity = Math.max(0, currentQuantity + change);
      this.#setQuantity(line, newQuantity);
    }
  }

  /**
   * Set absolute quantity
   * @param {number} line
   * @param {number} quantity
   */
  #setQuantity(line, quantity) {
    this.#updateCart({ [line]: quantity });
  }

  /**
   * Remove item from cart
   * @param {number} line
   */
  #removeItem(line) {
    this.#updateCart({ [line]: 0 });
  }

  /**
   * Update cart via Shopify cart API
   * @param {Object} updates
   */
  async #updateCart(updates) {
    try {
      // Show loading state
      this.#setLoadingState(true);

      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ updates })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Reload the cart drawer content
        await this.#refreshCartContent();
        
        // Dispatch cart update event
        document.dispatchEvent(new CustomEvent(ThemeEvents.cartUpdate, {
          detail: { 
            data: data,
            source: 'cart-drawer',
            success: true
          }
        }));
      } else {
        const errorData = await response.json();
        console.error('Cart update failed:', errorData);
        // Show error message to user
        this.#showError(errorData.message || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Cart update failed:', error);
      this.#showError('Failed to update cart. Please try again.');
    } finally {
      this.#setLoadingState(false);
    }
  }

  /**
   * Set loading state for cart operations
   * @param {boolean} isLoading
   */
  #setLoadingState(isLoading) {
    const cartItems = /** @type {HTMLElement | null} */ (this.refs.dialog.querySelector('.cart-drawer__items'));
    if (cartItems) {
      cartItems.style.opacity = isLoading ? '0.6' : '1';
      cartItems.style.pointerEvents = isLoading ? 'none' : 'auto';
    }
  }

  /**
   * Show error message to user
   * @param {string} message
   */
  #showError(message) {
    // Create or update error message element
    let errorElement = /** @type {HTMLElement | null} */ (this.refs.dialog.querySelector('.cart-drawer__error'));
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'cart-drawer__error';
      const header = /** @type {HTMLElement | null} */ (this.refs.dialog.querySelector('.cart-drawer__header'));
      if (header) {
        header.after(errorElement);
      }
    }
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        if (errorElement) {
          errorElement.style.display = 'none';
        }
      }, 5000);
    }
  }

  /**
   * Refresh cart drawer content
   */
  async #refreshCartContent() {
    try {
      const response = await fetch('/cart?view=drawer');
      if (response.ok) {
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('.cart-drawer__content');
        const currentContent = this.refs.dialog.querySelector('.cart-drawer__content');
        
        if (newContent && currentContent) {
          currentContent.innerHTML = newContent.innerHTML;
          // Re-bind events for the new content
          this.#bindCartControls();
          
          // Dispatch cart updated event
          document.dispatchEvent(new CustomEvent(ThemeEvents.cartUpdate, {
            detail: { 
              source: 'cart-drawer-refresh',
              success: true
            }
          }));
        }
      }
    } catch (error) {
      console.error('Cart refresh failed:', error);
      // Fallback to page reload
      window.location.reload();
    }
  }

  /**
   * Intercept links to cart page and open drawer instead
   */
  #interceptCartLinks() {
    document.addEventListener('click', (event) => {
      const target = /** @type {HTMLElement} */ (event.target);
      const link = target?.closest('a[href*="/cart"]');
      if (link && link.getAttribute('href') === '/cart') {
        event.preventDefault();
        event.stopPropagation();
        this.showDialog();
      }
    });
  }
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawerComponent);
}