import { DialogComponent } from '@theme/dialog';

/**
 * Clean cart drawer component with smooth slide animations
 */
class CartDrawerComponent extends DialogComponent {
  constructor() {
    super();
    this.cartForm = null;
    this.isUpdating = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.cartForm = this.querySelector('#cart-drawer-form');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Handle quantity changes
    this.addEventListener('change', this.handleQuantityChange.bind(this));
    
    // Handle remove buttons
    this.addEventListener('click', this.handleRemoveClick.bind(this));
    
    // Handle form submission
    if (this.cartForm) {
      this.cartForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
  }

  /**
   * Override showDialog to add smooth slide-in animation
   */
  async showDialog() {
    const dialog = this.refs.dialog;
    
    // Remove any closing animation classes
    dialog.classList.remove('cart-drawer--closing');
    
    // Call parent showDialog method
    super.showDialog();
    
    // Add opening animation
    dialog.classList.add('cart-drawer--opening');
    
    // Remove opening class after animation
    setTimeout(() => {
      dialog.classList.remove('cart-drawer--opening');
    }, 300);
  }

  /**
   * Override closeDialog to add smooth slide-out animation
   */
  async closeDialog() {
    const dialog = this.refs.dialog;
    
    // Add closing animation
    dialog.classList.add('cart-drawer--closing');
    
    // Wait for animation to complete
    return new Promise((resolve) => {
      setTimeout(() => {
        dialog.classList.remove('cart-drawer--closing');
        super.closeDialog();
        resolve();
      }, 300);
    });
  }

  /**
   * Handle quantity input changes
   */
  async handleQuantityChange(event) {
    if (!event.target.matches('.quantity__input')) return;
    
    const quantity = parseInt(event.target.value);
    const lineIndex = event.target.dataset.index;
    
    if (quantity === 0) {
      await this.removeItem(lineIndex);
    } else {
      await this.updateQuantity(lineIndex, quantity);
    }
  }

  /**
   * Handle remove button clicks
   */
  async handleRemoveClick(event) {
    if (!event.target.matches('.cart-item__remove')) return;
    
    const removeButton = event.target.closest('cart-remove-button');
    const lineIndex = removeButton.dataset.index;
    
    await this.removeItem(lineIndex);
  }

  /**
   * Handle form submission for checkout
   */
  handleFormSubmit(event) {
    if (event.submitter && event.submitter.formAction.includes('/checkout')) {
      // Allow checkout to proceed
      return;
    }
    
    // Prevent default form submission for updates
    event.preventDefault();
    this.updateCart();
  }

  /**
   * Update item quantity
   */
  async updateQuantity(lineIndex, quantity) {
    if (this.isUpdating) return;
    this.isUpdating = true;

    try {
      const response = await fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line: lineIndex,
          quantity: quantity
        })
      });

      if (response.ok) {
        const cart = await response.json();
        await this.refreshCartDrawer(cart);
        this.dispatchCartUpdateEvent(cart);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Remove item from cart
   */
  async removeItem(lineIndex) {
    await this.updateQuantity(lineIndex, 0);
  }

  /**
   * Update entire cart
   */
  async updateCart() {
    if (this.isUpdating) return;
    this.isUpdating = true;

    try {
      const formData = new FormData(this.cartForm);
      
      const response = await fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const cart = await response.json();
        await this.refreshCartDrawer(cart);
        this.dispatchCartUpdateEvent(cart);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Refresh cart drawer content
   */
  async refreshCartDrawer(cart) {
    try {
      const response = await fetch(window.location.pathname + '?section_id=cart-drawer');
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('.cart-drawer__content');
      
      if (newContent) {
        this.querySelector('.cart-drawer__content').innerHTML = newContent.innerHTML;
        this.cartForm = this.querySelector('#cart-drawer-form');
      }
    } catch (error) {
      console.error('Error refreshing cart drawer:', error);
      // Fallback: reload the page
      window.location.reload();
    }
  }

  /**
   * Dispatch cart update event
   */
  dispatchCartUpdateEvent(cart) {
    document.dispatchEvent(new CustomEvent('cart:updated', {
      detail: { cart }
    }));
  }
}

// Register the custom element
if (!customElements.get('cart-drawer-component')) {
  customElements.define('cart-drawer-component', CartDrawerComponent);
}
