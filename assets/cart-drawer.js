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
      const isAddEvent = customEvent.detail?.data?.source === 'product-form-component' || 
                        customEvent.detail?.sourceId?.includes('product-form') ||
                        (customEvent.detail?.data && !customEvent.detail?.data?.didError && 
                         customEvent.detail?.source !== 'cart-drawer' && 
                         customEvent.detail?.source !== 'cart-drawer-refresh');
                        
      // Get the auto-open setting from the cart drawer element data attribute
      const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
      
      console.log('Cart event detected:', {
        isAddEvent,
        autoOpenEnabled,
        eventDetail: customEvent.detail,
        drawerOpen: this.refs.dialog.open
      });
      
      if (isAddEvent && autoOpenEnabled && !this.refs.dialog.open) {
        // Small delay to allow cart update to complete
        setTimeout(() => {
          console.log('Auto-opening cart drawer');
          this.showDialog();
        }, 100);
      }
    });

    // Prevent any form submissions that might redirect to cart
    document.addEventListener('submit', (event) => {
      const form = /** @type {HTMLFormElement} */ (event.target);
      
      // If this is an add-to-cart form and auto-open is enabled
      if (form?.action?.includes('/cart/add')) {
        const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
        
        if (autoOpenEnabled) {
          console.log('Intercepting add-to-cart form submission');
          // The product form component should handle the AJAX submission
          // We just need to ensure we don't navigate away
        }
      }
      
      // Prevent any form submission that goes to /cart
      if (form?.action?.includes('/cart') && !form.action.includes('/cart/add')) {
        const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
        if (autoOpenEnabled) {
          event.preventDefault();
          console.log('Prevented cart form submission, opening drawer instead');
          this.showDialog();
        }
      }
    });

    // Also listen for beforeunload to prevent navigation
    window.addEventListener('beforeunload', (event) => {
      const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
      if (autoOpenEnabled && window.location.href.includes('/cart')) {
        console.log('Preventing navigation to cart page');
        event.preventDefault();
        this.showDialog();
        return false;
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
        const key = button.getAttribute('data-key');
        this.#updateQuantity(line, change, key);
      });
    });

    // Quantity inputs
    const quantityInputs = this.refs.dialog.querySelectorAll('[data-quantity-input]');
    quantityInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        const target = /** @type {HTMLInputElement} */ (event.target);
        const line = parseInt(target.getAttribute('data-line') || '0');
        const key = target.getAttribute('data-key');
        const newQuantity = parseInt(target.value);
        this.#setQuantity(line, newQuantity, key);
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
        const key = button.getAttribute('data-key');
        this.#removeItem(line, key);
      });
    });
  }

  /**
   * Update quantity by relative change
   * @param {number} line
   * @param {number} change
   * @param {string|null} key
   */
  #updateQuantity(line, change, key) {
    const input = this.refs.dialog.querySelector(`[data-line="${line}"][data-quantity-input]`);
    if (input) {
      const currentQuantity = parseInt(/** @type {HTMLInputElement} */ (input).value);
      const newQuantity = Math.max(0, currentQuantity + change);
      this.#setQuantity(line, newQuantity, key);
    }
  }

  /**
   * Set absolute quantity
   * @param {number} line
   * @param {number} quantity
   * @param {string|null} key
   */
  #setQuantity(line, quantity, key) {
    if (key) {
      this.#changeCartItem(key, quantity);
    } else {
      // Fallback to line-based update for older themes
      this.#updateCart({ [line]: quantity });
    }
  }

  /**
   * Remove item from cart
   * @param {number} line
   * @param {string|null} key
   */
  #removeItem(line, key) {
    if (key) {
      this.#changeCartItem(key, 0);
    } else {
      // Fallback to line-based update for older themes
      this.#updateCart({ [line]: 0 });
    }
  }

  /**
   * Change cart item quantity using Shopify 2.0 cart/change.js API
   * @param {string} key - The line item key
   * @param {number} quantity - New quantity
   */
  async #changeCartItem(key, quantity) {
    try {
      // Show loading state
      this.#setLoadingState(true);

      console.log('Changing cart item:', { key, quantity });

      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          id: key,
          quantity: quantity
        })
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
        let errorMessage = 'Failed to update cart';
        
        try {
          const errorData = await response.json();
          console.error('Cart change failed:', {
            status: response.status,
            statusText: response.statusText,
            errorData: errorData,
            key: key,
            quantity: quantity
          });
          
          if (response.status === 422) {
            errorMessage = errorData.message || errorData.description || 'Invalid cart update. Please refresh the page and try again.';
          } else {
            errorMessage = errorData.message || errorData.description || errorMessage;
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          console.error('Response status:', response.status, response.statusText);
        }
        
        this.#showError(errorMessage);
      }
    } catch (error) {
      console.error('Cart change failed:', error);
      this.#showError('Failed to update cart. Please try again.');
    } finally {
      this.#setLoadingState(false);
    }
  }

  /**
   * Update cart via Shopify cart API
   * @param {Record<string, any>} updates
   */
  async #updateCart(updates) {
    try {
      // Show loading state
      this.#setLoadingState(true);

      // Convert updates object to have string keys for Shopify API
      const formattedUpdates = /** @type {Record<string, number>} */ ({});
      Object.entries(updates).forEach(([key, value]) => {
        if (typeof value === 'number') {
          formattedUpdates[key.toString()] = value;
        }
      });

      console.log('Sending cart update:', formattedUpdates);

      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ updates: formattedUpdates })
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
        let errorMessage = 'Failed to update cart';
        
        try {
          const errorData = await response.json();
          console.error('Cart update failed:', {
            status: response.status,
            statusText: response.statusText,
            errorData: errorData,
            updates: formattedUpdates
          });
          
          if (response.status === 422) {
            errorMessage = errorData.message || errorData.description || 'Invalid cart update. Please refresh the page and try again.';
          } else {
            errorMessage = errorData.message || errorData.description || errorMessage;
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          console.error('Response status:', response.status, response.statusText);
        }
        
        this.#showError(errorMessage);
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
      if (link && (link.getAttribute('href') === '/cart' || link.getAttribute('href') === '/cart/')) {
        event.preventDefault();
        event.stopPropagation();
        console.log('Intercepting cart link click, opening drawer instead');
        this.showDialog();
      }
    }, true); // Use capture phase to intercept early

    // Also intercept any programmatic navigation to cart
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      get: () => originalLocation,
      set: (value) => {
        if (typeof value === 'string' && (value.includes('/cart') || value.endsWith('/cart'))) {
          console.log('Intercepting location change to cart, opening drawer instead');
          this.showDialog();
          return;
        }
        originalLocation.href = value;
      }
    });
  }
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawerComponent);
}