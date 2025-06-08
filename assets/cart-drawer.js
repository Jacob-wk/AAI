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