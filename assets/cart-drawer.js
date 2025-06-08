import { DialogComponent } from '@theme/dialog';
import { ThemeEvents } from '@theme/events';

/**
 * Cart drawer component that extends the base dialog functionality
 */
class CartDrawerComponent extends DialogComponent {
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(ThemeEvents.cartUpdate, this.onCartUpdate);
    
    // Connect to the cart trigger button
    this.setupCartTrigger();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(ThemeEvents.cartUpdate, this.onCartUpdate);
  }

  /**
   * Setup the cart trigger button connection
   */
  setupCartTrigger() {
    const cartTrigger = document.querySelector('[data-cart-drawer-trigger]');
    if (cartTrigger) {
      cartTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.showDialog();
      });
    }
  }

  /**
   * Handle cart updates
   */
  onCartUpdate = async () => {
    if (this.refs.dialog && this.refs.dialog.open) {
      await this.refreshCart();
    }
  };

  /**
   * Override showDialog to add custom animations
   */
  showDialog() {
    this.classList.remove('cart-drawer--closing');
    super.showDialog();
    this.classList.add('cart-drawer--opening');
    
    setTimeout(() => {
      this.classList.remove('cart-drawer--opening');
    }, 300);
  }

  /**
   * Override closeDialog to add custom animations
   */
  closeDialog = async () => {
    this.classList.add('cart-drawer--closing');
    
    // Call the original closeDialog method
    setTimeout(async () => {
      // Access the parent's closeDialog via the prototype
      await DialogComponent.prototype.closeDialog.call(this);
      this.classList.remove('cart-drawer--closing');
    }, 300);
  };

  /**
   * Refresh cart content via AJAX
   */
  async refreshCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      document.dispatchEvent(new CustomEvent(ThemeEvents.cartUpdate, {
        detail: { data: { itemCount: cart.item_count } }
      }));
      
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  }
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawerComponent);
}