/**
 * Standard Cart Drawer JavaScript
 * Clean, simple implementation following Shopify best practices
 */

class StandardCartDrawer {
  constructor() {
    this.drawer = document.getElementById('standard-cart-drawer');
    this.overlay = document.getElementById('standard-cart-drawer-overlay');
    this.closeBtn = document.getElementById('close-cart-drawer');
    this.itemCount = document.getElementById('cart-item-count');
    this.subtotal = document.getElementById('cart-subtotal');
    this.itemsContainer = document.getElementById('cart-drawer-items');
    
    this.init();
  }

  init() {
    // Close drawer events
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    
    // Quantity control events
    this.itemsContainer?.addEventListener('click', (e) => this.handleItemClick(e));
    this.itemsContainer?.addEventListener('change', (e) => this.handleQuantityChange(e));
    
    // Listen for cart icon clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-cart-trigger]') || e.target.closest('.cart-icon')) {
        e.preventDefault();
        this.open();
      }
    });
    
    // Listen for cart updates from product forms
    document.addEventListener('cart:updated', (e) => {
      this.updateCart(e.detail);
      if (e.detail.openDrawer !== false) {
        this.open();
      }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    this.drawer?.classList.add('open');
    this.overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.closeBtn?.focus();
  }

  close() {
    this.drawer?.classList.remove('open');
    this.overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.drawer?.classList.contains('open');
  }

  handleItemClick(e) {
    const action = e.target.dataset.action;
    const line = e.target.dataset.line;
    
    if (!action || !line) return;
    
    switch (action) {
      case 'increase':
        this.updateQuantity(line, 1, 'increase');
        break;
      case 'decrease':
        this.updateQuantity(line, -1, 'decrease');
        break;
      case 'remove':
        this.updateQuantity(line, 0, 'remove');
        break;
    }
  }

  handleQuantityChange(e) {
    if (e.target.classList.contains('standard-cart-item__qty-input')) {
      const line = e.target.dataset.line;
      const quantity = parseInt(e.target.value) || 0;
      this.updateQuantity(line, quantity, 'set');
    }
  }

  async updateQuantity(line, quantity, action) {
    const lineNumber = parseInt(line);
    
    if (action === 'increase' || action === 'decrease') {
      const currentInput = document.querySelector(`[data-line="${line}"].standard-cart-item__qty-input`);
      const currentQuantity = parseInt(currentInput?.value) || 0;
      quantity = action === 'increase' ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);
    }

    this.setLoading(true);
    
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line: lineNumber,
          quantity: quantity
        })
      });

      if (response.ok) {
        const cart = await response.json();
        this.updateCartUI(cart);
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('cart:updated', {
          detail: { cart, openDrawer: false }
        }));
      } else {
        console.error('Failed to update cart');
        this.showError('Failed to update cart. Please try again.');
      }
    } catch (error) {
      console.error('Cart update error:', error);
      this.showError('Network error. Please check your connection.');
    } finally {
      this.setLoading(false);
    }
  }

  async addToCart(variantId, quantity = 1, properties = {}) {
    this.setLoading(true);
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity,
          properties: properties
        })
      });

      if (response.ok) {
        const item = await response.json();
        const cartResponse = await fetch('/cart.js');
        const cart = await cartResponse.json();
        
        this.updateCartUI(cart);
        this.open();
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('cart:updated', {
          detail: { cart, item, openDrawer: true }
        }));
        
        return item;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showError(error.message || 'Failed to add item to cart');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  updateCartUI(cart) {
    // Update item count
    if (this.itemCount) {
      this.itemCount.textContent = cart.item_count;
    }
    
    // Update subtotal
    if (this.subtotal) {
      this.subtotal.textContent = this.formatMoney(cart.total_price);
    }
    
    // Update cart icon bubble (if exists)
    const cartBubble = document.querySelector('.cart-bubble__text');
    if (cartBubble) {
      cartBubble.textContent = cart.item_count;
      cartBubble.closest('.cart-bubble')?.classList.toggle('visually-hidden', cart.item_count === 0);
    }
    
    // Re-render cart items
    this.renderCartItems(cart);
  }

  async renderCartItems(cart) {
    if (!this.itemsContainer) return;
    
    try {
      // Fetch updated cart HTML
      const response = await fetch('/cart?section_id=cart-drawer');
      if (response.ok) {
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newItems = doc.querySelector('#cart-drawer-items');
        
        if (newItems) {
          this.itemsContainer.innerHTML = newItems.innerHTML;
        }
      }
    } catch (error) {
      console.error('Failed to update cart items:', error);
      // Fallback: just close and reopen
      window.location.reload();
    }
  }

  setLoading(loading) {
    if (loading) {
      this.drawer?.classList.add('loading');
    } else {
      this.drawer?.classList.remove('loading');
    }
  }

  showError(message) {
    // Simple error display - you can enhance this
    alert(message);
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new StandardCartDrawer());
} else {
  new StandardCartDrawer();
}

// Export for use in other scripts
window.StandardCartDrawer = StandardCartDrawer;
