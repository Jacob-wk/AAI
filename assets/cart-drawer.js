import { Component } from './component.js';
import { ThemeEvents } from './events.js';
import { fetchConfig, onAnimationEnd } from './utilities.js';

/**
 * @typedef {Object} ShopifyCartItem
 * @property {string} key - The line item key
 * @property {string} product_title - Product title
 * @property {string} variant_title - Variant title
 * @property {string} title - Item title
 * @property {string} url - Product URL
 * @property {string} image - Image URL
 * @property {number} quantity - Item quantity
 * @property {number} final_price - Item price in cents
 * @property {number} final_line_price - Line total in cents
 */

// Production-ready cart drawer initialization

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
    
    // Bind overlay and close button clicks immediately
    this.#bindCloseEvents();
    
    // Intercept cart page links when drawer is enabled
    this.#interceptCartLinks();
    
    // Setup auto-open functionality for add-to-cart actions
    this.#setupAutoOpenFunctionality();
    
    // Mark existing cart items as loaded to prevent continuous animations
    this.#markExistingItemsAsLoaded();
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
    // Setup auto-open functionality when items are added to cart
    document.addEventListener(ThemeEvents.cartUpdate, (event) => {
      const customEvent = /** @type {CustomEvent} */ (event);
      const autoOpenEnabled = this.getAttribute('data-auto-open') === 'true';
      
      // Don't auto-open if we're already on the cart page or drawer is already open
      if (window.location.pathname === '/cart' || 
          window.location.pathname.includes('/cart') ||
          this.refs.dialog.open) {
        return;
      }
      
      // Check if this is from product form and auto-open is enabled
      const isFromProductForm = customEvent.detail?.source === 'product-form-component' ||
                               customEvent.detail?.data?.source === 'product-form-component';
                        
      if (isFromProductForm && autoOpenEnabled) {
        // First refresh the cart content, then open the drawer
        setTimeout(async () => {
          await this.#refreshCartContent();
          this.showDialog();
        }, 100);
      }
    });
  }

  /**
   * Handle cart trigger button clicks
   * @param {Event} event
   */
  #handleCartTriggerClick = async (event) => {
    const trigger = /** @type {HTMLElement} */ (event.target);
    if (trigger?.matches('[data-cart-drawer-trigger]') || trigger?.closest('[data-cart-drawer-trigger]')) {
      event.preventDefault();
      event.stopPropagation();
      
      // Refresh cart content before opening drawer to ensure fresh data
      await this.#refreshCartContent();
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
  #handleCartUpdate = async (event) => {
    // Prevent infinite loop: Don't refresh if this event came from our own refresh
    if (event.detail?.source === 'cart-drawer-refresh') {
      return;
    }
    
    // Always refresh cart content when cart updates occur from other sources
    // This ensures fresh data whether drawer is open or will be opened
    await this.#refreshCartContent();
    
    // If the drawer is currently open, we've already refreshed above
    // If it's not open but will auto-open, the refresh above ensures fresh content
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
      
      // Bind all events after opening
      this.#bindCloseEvents();
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
            data: {
              itemCount: data.item_count,
              source: 'cart-drawer'
            },
            source: 'cart-drawer',
            success: true,
            cart: data
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
            data: {
              itemCount: data.item_count,
              source: 'cart-drawer'
            },
            source: 'cart-drawer',
            success: true,
            cart: data
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
   * Refresh cart drawer content using cart.js API
   */
  async #refreshCartContent() {
    try {
      // Get the latest cart data
      const response = await fetch('/cart.js', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (response.ok) {
        const cart = await response.json();
        
        // Update cart count in header
        this.#updateCartCount(cart.item_count);
        
        // Update cart items
        this.#updateCartItems(cart.items);
        
        // Update cart subtotal
        this.#updateCartSubtotal(cart.total_price);
        
        // Re-bind events for the updated content
        this.#bindCloseEvents();
        this.#bindCartControls();
        
        // Dispatch cart updated event
        document.dispatchEvent(new CustomEvent(ThemeEvents.cartUpdate, {
          detail: { 
            source: 'cart-drawer-refresh',
            success: true,
            data: {
              itemCount: cart.item_count,
              source: 'cart-drawer-refresh'
            },
            cart: cart
          }
        }));
      }
    } catch (error) {
      console.error('Cart refresh failed:', error);
      
      // Fallback: Try to refresh using simple HTML fetch
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
            this.#bindCloseEvents();
            this.#bindCartControls();
          }
        }
      } catch (fallbackError) {
        console.error('Fallback cart refresh also failed:', fallbackError);
        // Last resort: page reload
        window.location.reload();
      }
    }
  }

  /**
   * Update cart count in drawer header
   * @param {number} itemCount - Number of items in cart
   */
  #updateCartCount(itemCount) {
    // Update the count span in the title
    const countElement = this.refs.dialog.querySelector('.cart-drawer__count');
    if (countElement) {
      countElement.textContent = `(${itemCount})`;
    } else {
      // If count element doesn't exist, add it to the title
      const titleElement = this.refs.dialog.querySelector('.cart-drawer__title');
      if (titleElement) {
        const countSpan = document.createElement('span');
        countSpan.className = 'cart-drawer__count';
        countSpan.textContent = `(${itemCount})`;
        titleElement.appendChild(document.createTextNode(' '));
        titleElement.appendChild(countSpan);
      }
    }
    
    // Also update any cart count badges in the header
    const headerCountElements = document.querySelectorAll('.cart-count');
    headerCountElements.forEach(element => {
      element.textContent = itemCount.toString();
    });
  }

  /**
   * Update cart items in drawer
   * @param {ShopifyCartItem[]} items - Cart items array from cart.js
   */
  #updateCartItems(items) {
    const itemsContainer = this.refs.dialog.querySelector('.cart-drawer__items');
    const bodyElement = this.refs.dialog.querySelector('.cart-drawer__body');
    
    if (!bodyElement) {
      console.error('Cart drawer body not found');
      return;
    }
    
    if (items.length === 0) {
      // Show empty cart state - replace entire body content
      bodyElement.innerHTML = `
        <div class="cart-drawer__empty">
          <p>Your cart is empty</p>
          <a href="/collections/all" class="button button--primary">
            Continue Shopping
          </a>
        </div>
      `;
      return;
    }
    
    // If we have items but no items container, we need to recreate the structure
    if (!itemsContainer) {
      bodyElement.innerHTML = `
        <div class="cart-drawer__items" id="cart-drawer-items">
        </div>
        <div class="cart-drawer__footer">
          <div class="cart-drawer__subtotal">
            <span class="cart-drawer__subtotal-label">Subtotal:</span>
            <span class="cart-drawer__subtotal-price">$0.00</span>
          </div>
          <div class="cart-drawer__actions">
            <button type="button" class="button button--secondary cart-drawer__view-cart" onclick="window.location.href='/cart'">
              View Cart
            </button>
            <button type="button" class="button button--primary cart-drawer__checkout" onclick="window.location.href='/checkout'">
              Checkout
            </button>
          </div>
        </div>
      `;
    }
    
    const updatedItemsContainer = this.refs.dialog.querySelector('.cart-drawer__items');
    if (!updatedItemsContainer) return;
    
    // Clear current items
    updatedItemsContainer.innerHTML = '';
    
    // Add updated items
    items.forEach((item, index) => {
      const itemElement = this.#createCartItemElement(item, index + 1);
      updatedItemsContainer.appendChild(itemElement);
    });
  }

  /**
   * Create cart item element
   * @param {ShopifyCartItem} item - Cart item from cart.js
   * @param {number} line - Line number (1-based)
   * @returns {Element} - Cart item element
   */
  #createCartItemElement(item, line) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item cart-item--loaded';  // Add loaded class to prevent continuous animations
    itemDiv.setAttribute('data-index', line.toString());
    itemDiv.setAttribute('data-line', line.toString());
    itemDiv.setAttribute('data-key', item.key);
    
    // Format price (item.price is in cents)
    const formattedPrice = this.#formatMoney(item.final_price);
    const formattedLinePrice = this.#formatMoney(item.final_line_price);
    
    // Build item HTML to match the Liquid template structure
    itemDiv.innerHTML = `
      <div class="cart-item__image">
        ${item.image ? `
          <img 
            src="${item.image}" 
            alt="${item.title}"
            loading="lazy"
            width="80"
            height="80"
          >
        ` : ''}
      </div>
      
      <div class="cart-item__details">
        <h3 class="cart-item__title">
          <a href="${item.url}">${item.product_title}</a>
        </h3>
        ${item.variant_title && item.variant_title !== 'Default Title' ? `
          <p class="cart-item__variant">${item.variant_title}</p>
        ` : ''}
        
        <div class="cart-item__quantity">
          <label for="quantity-${line}" class="visually-hidden">Quantity</label>
          <div class="quantity-selector">
            <button 
              type="button" 
              class="quantity-selector__button" 
              data-quantity-change="-1"
              data-line="${line}"
              data-key="${item.key}"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input 
              type="number" 
              id="quantity-${line}"
              name="updates[]"
              value="${item.quantity}" 
              min="0"
              data-line="${line}"
              data-key="${item.key}"
              data-quantity-input
              class="quantity-selector__input"
              aria-label="Quantity"
            >
            <button 
              type="button" 
              class="quantity-selector__button" 
              data-quantity-change="1"
              data-line="${line}"
              data-key="${item.key}"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        
        <div class="cart-item__price">
          <span class="cart-item__price-current">${formattedLinePrice}</span>
        </div>
      </div>
      
      <button 
        type="button"
        class="cart-item__remove" 
        data-line="${line}"
        data-key="${item.key}"
        data-remove-item
        aria-label="Remove ${item.product_title}"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    `;
    
    return itemDiv;
  }

  /**
   * Update cart subtotal
   * @param {number} totalPrice - Total price in cents
   */
  #updateCartSubtotal(totalPrice) {
    const subtotalElement = this.refs.dialog.querySelector('.cart-drawer__subtotal-price');
    if (subtotalElement) {
      subtotalElement.textContent = this.#formatMoney(totalPrice);
    }
  }

  /**
   * Format money amount (from cents to currency string)
   * @param {number} cents - Amount in cents
   * @returns {string} - Formatted money string
   */
  #formatMoney(cents) {
    const amount = cents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
        this.showDialog();
      }
    }, true); // Use capture phase to intercept early
  }

  /**
   * Mark existing cart items as loaded to prevent continuous animations
   */
  #markExistingItemsAsLoaded() {
    const cartItems = this.refs.dialog.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
      if (!item.classList.contains('cart-item--loaded')) {
        item.classList.add('cart-item--loaded');
      }
    });
  }

}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawerComponent);
}