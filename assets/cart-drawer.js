/**
 * Simple Cart Drawer Implementation
 * Uses native HTML dialog element for proper modal behavior
 */

class CartDrawer {
  constructor() {
    this.dialog = null;
    this.cartTrigger = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.dialog = document.getElementById('cart-drawer');
    this.cartTrigger = document.querySelector('[data-cart-drawer-trigger]');
    
    if (this.dialog && this.cartTrigger) {
      this.bindEvents();
    }
  }

  bindEvents() {
    // Cart trigger button
    if (this.cartTrigger) {
      this.cartTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.open();
      });
    }

    // Close when clicking backdrop/overlay
    if (this.dialog) {
      this.dialog.addEventListener('click', (e) => {
        // Close if clicking the dialog itself (backdrop) or the overlay
        const target = /** @type {HTMLElement} */ (e.target);
        if (target === this.dialog || target?.classList?.contains('cart-drawer__overlay')) {
          this.close();
        }
      });

      // Close on escape key
      this.dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      });

      // Handle close buttons
      const closeButtons = this.dialog.querySelectorAll('.cart-drawer__close');
      closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      });

      // Handle quantity changes
      this.bindQuantityControls();

      // Handle item removal
      this.bindRemoveButtons();
    }
  }

  bindQuantityControls() {
    if (!this.dialog) return;

    // Quantity buttons
    const quantityButtons = this.dialog.querySelectorAll('[data-quantity-change]');
    quantityButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const change = parseInt(button.getAttribute('data-quantity-change') || '0');
        const line = parseInt(button.getAttribute('data-line') || '0');
        this.updateQuantity(line, change);
      });
    });

    // Quantity inputs
    const quantityInputs = this.dialog.querySelectorAll('[data-quantity-input]');
    quantityInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const target = /** @type {HTMLInputElement} */ (e.target);
        const line = parseInt(target.getAttribute('data-line') || '0');
        const newQuantity = parseInt(target.value);
        this.setQuantity(line, newQuantity);
      });
    });
  }

  bindRemoveButtons() {
    if (!this.dialog) return;

    const removeButtons = this.dialog.querySelectorAll('[data-remove-item]');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const line = parseInt(button.getAttribute('data-line') || '0');
        this.removeItem(line);
      });
    });
  }

  /**
   * @param {number} line
   * @param {number} change
   */
  updateQuantity(line, change) {
    const input = this.dialog?.querySelector(`[data-line="${line}"][data-quantity-input]`);
    if (input) {
      const currentQuantity = parseInt((/** @type {HTMLInputElement} */ (input)).value);
      const newQuantity = Math.max(0, currentQuantity + change);
      this.setQuantity(line, newQuantity);
    }
  }

  /**
   * @param {number} line
   * @param {number} quantity
   */
  setQuantity(line, quantity) {
    this.updateCart({ [line]: quantity });
  }

  /**
   * @param {number} line
   */
  removeItem(line) {
    this.updateCart({ [line]: 0 });
  }

  /**
   * @param {Object} updates
   */
  async updateCart(updates) {
    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates })
      });

      if (response.ok) {
        // Reload the cart drawer content
        this.refreshCart();
      }
    } catch (error) {
      console.error('Cart update failed:', error);
    }
  }

  async refreshCart() {
    try {
      const response = await fetch('/cart?view=drawer');
      if (response.ok) {
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('.cart-drawer__content');
        const currentContent = this.dialog?.querySelector('.cart-drawer__content');
        
        if (newContent && currentContent) {
          currentContent.innerHTML = newContent.innerHTML;
          // Re-bind events for the new content
          this.bindQuantityControls();
          this.bindRemoveButtons();
        }
      }
    } catch (error) {
      console.error('Cart refresh failed:', error);
      // Fallback to page reload
      window.location.reload();
    }
  }

  open() {
    if (this.dialog && !(/** @type {HTMLDialogElement} */(this.dialog)).open) {
      (/** @type {HTMLDialogElement} */(this.dialog)).showModal();
      document.body.style.overflow = 'hidden';
      this.dialog.setAttribute('aria-hidden', 'false');
    }
  }

  close() {
    if (this.dialog && (/** @type {HTMLDialogElement} */(this.dialog)).open) {
      (/** @type {HTMLDialogElement} */(this.dialog)).close();
      document.body.style.overflow = '';
      this.dialog.setAttribute('aria-hidden', 'true');
    }
  }
}

// Initialize cart drawer when page loads
const cartDrawer = new CartDrawer();

// Also expose globally for other scripts
// @ts-ignore
window.CartDrawer = cartDrawer;