import { DialogComponent } from '@theme/dialog';
import { ThemeEvents } from '@theme/events';

/**
 * Cart drawer component that extends the base dialog functionality
 * Handles cart display and management in a slide-out drawer
 */
class CartDrawerComponent extends DialogComponent {
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(ThemeEvents.cartUpdate, this.onCartUpdate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(ThemeEvents.cartUpdate, this.onCartUpdate);
  }

  /**
   * Handle cart updates by refreshing the drawer content
   */
  onCartUpdate = async (event) => {
    if (this.open) {
      await this.refreshCart();
    }
  };

  /**
   * Override showDialog to add custom animations
   */
  showDialog() {
    // Remove any closing animation classes
    this.classList.remove('cart-drawer--closing');
    
    // Call parent method to show dialog
    super.showDialog();
    
    // Add opening animation class
    this.classList.add('cart-drawer--opening');
    
    // Remove opening class after animation
    setTimeout(() => {
      this.classList.remove('cart-drawer--opening');
    }, 300);
  }

  /**
   * Override closeDialog to add custom animations
   */
  closeDialog() {
    return new Promise((resolve) => {
      // Add closing animation class
      this.classList.add('cart-drawer--closing');
      
      // Wait for animation to complete
      setTimeout(() => {
        // Call parent method to close dialog
        super.closeDialog();
        
        // Clean up classes
        this.classList.remove('cart-drawer--closing');
        
        resolve();
      }, 300);
    });
  }

  /**
   * Refresh cart content via AJAX
   */
  async refreshCart() {
    try {
      const response = await fetch(window.Shopify.routes.root + 'cart.js');
      const cart = await response.json();
      
      // Dispatch cart update event
      document.dispatchEvent(new CustomEvent(ThemeEvents.cartUpdate, {
        detail: { data: { itemCount: cart.item_count } }
      }));
      
      // Refresh drawer content
      const cartResponse = await fetch('/?section_id=cart-drawer');
      const html = await cartResponse.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('cart-drawer');
      
      if (newContent) {
        this.innerHTML = newContent.innerHTML;
      }
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  }
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawerComponent);
}