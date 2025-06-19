import { Component } from '@theme/component';
import { onAnimationEnd } from '@theme/utilities';
import { ThemeEvents, CartUpdateEvent } from '@theme/events';

/**
 * A custom element that displays a cart icon.
 *
 * @typedef {object} Refs
 * @property {HTMLElement} cartBubble - The cart bubble element.
 * @property {HTMLElement} cartBubbleText - The cart bubble text element.
 *
 * @extends {Component<Refs>}
 */
class CartIcon extends Component {
  requiredRefs = ['cartBubble', 'cartBubbleText'];

  /** @type {number} */
  get currentCartCount() {
    const visibleCountElement = this.refs.cartBubbleText.querySelector('.cart-bubble__text-count');
    if (visibleCountElement) {
      return parseInt(visibleCountElement.textContent ?? '0', 10);
    }
    // Fallback: try to parse from the main text content
    return parseInt(this.refs.cartBubbleText.textContent ?? '0', 10);
  }

  set currentCartCount(value) {
    // Update the visible cart count
    const visibleCountElement = this.refs.cartBubbleText.querySelector('.cart-bubble__text-count');
    if (visibleCountElement) {
      if (value < 100) {
        visibleCountElement.textContent = String(value);
      } else {
        visibleCountElement.textContent = '';  // Hide when over 99 (matches Liquid logic)
      }
    }
    
    // Update the hidden text for screen readers
    const hiddenCountElement = this.refs.cartBubbleText.querySelector('.visually-hidden');
    if (hiddenCountElement) {
      // Try to get the accessibility text from the existing content, or use a fallback
      const accessibilityPrefix = hiddenCountElement.textContent?.split(':')[0] || 'Cart count';
      hiddenCountElement.textContent = `${accessibilityPrefix}: ${value}`;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ThemeEvents.cartUpdate, this.onCartUpdate);
    this.ensureCartBubbleIsCorrect();
    
    // Also listen for cart changes from other sources (like cart drawer, quick add)
    document.addEventListener('cart:refresh', this.refreshCartCount);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ThemeEvents.cartUpdate, this.onCartUpdate);
    document.removeEventListener('cart:refresh', this.refreshCartCount);
  }

  /**
   * Handles the cart update event.
   * @param {CartUpdateEvent} event - The cart update event.
   */
  onCartUpdate = async (event) => {
    // Debug logging (remove in production)
    console.log('Cart update event:', event.detail);
    
    // Try to get item count from various possible locations in the event
    let itemCount = event.detail.data?.itemCount ?? 0;
    
    // Fallback: check if there's cart data in a different structure
    if (itemCount === 0 && event.detail) {
      // @ts-ignore - Handle legacy event structure
      const cart = event.detail.cart;
      if (cart && typeof cart.item_count === 'number') {
        itemCount = cart.item_count;
      }
    }
    
    const comingFromProductForm = event.detail.data?.source === 'product-form-component';

    // For product form events, we need to fetch the actual cart to get the real total count
    // because the event only contains the quantity added, not the total cart count
    if (comingFromProductForm) {
      try {
        const response = await fetch('/cart.js', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const cart = await response.json();
        itemCount = cart.item_count;
        this.renderCartBubble(itemCount, false, true); // Pass false for comingFromProductForm since we have the total
      } catch (error) {
        console.error('Error fetching cart data:', error);
        // Fallback to additive behavior if cart fetch fails
        this.renderCartBubble(itemCount, comingFromProductForm, true);
      }
    } else {
      this.renderCartBubble(itemCount, comingFromProductForm, true);
    }
  };

  /**
   * Renders the cart bubble.
   * @param {number} itemCount - The number of items in the cart.
   * @param {boolean} comingFromProductForm - Whether the cart update is coming from the product form.
   * @param {boolean} animate - Whether to animate the bubble.
   */
  renderCartBubble = async (itemCount, comingFromProductForm, animate = true) => {
    // If the cart update is coming from the product form, we add to the current cart count, otherwise we set the new cart count
    this.refs.cartBubble.classList.toggle('visually-hidden', itemCount === 0);
    this.refs.cartBubble.classList.toggle('cart-bubble--animating', itemCount > 0 && animate);
    this.currentCartCount = comingFromProductForm ? this.currentCartCount + itemCount : itemCount;

    this.classList.toggle('header-actions__cart-icon--has-cart', itemCount > 0);

    sessionStorage.setItem(
      'cart-count',
      JSON.stringify({
        value: String(this.currentCartCount),
        timestamp: Date.now(),
      })
    );

    if (!animate) return;
    await onAnimationEnd(this.refs.cartBubbleText);

    this.refs.cartBubble.classList.remove('cart-bubble--animating');
  };

  /**
   * Checks if the cart count is correct.
   */
  ensureCartBubbleIsCorrect = () => {
    const sessionStorageCount = sessionStorage.getItem('cart-count');
    const visibleCount = this.currentCartCount; // Use the getter which handles the complex DOM structure
    
    if (sessionStorageCount === null) return;

    try {
      const { value, timestamp } = JSON.parse(sessionStorageCount);
      const sessionCount = parseInt(value, 10);

      // Only update if the session storage is recent (within 10 seconds) and different from visible count
      if (Date.now() - timestamp < 10000 && sessionCount !== visibleCount && sessionCount >= 0) {
        this.renderCartBubble(sessionCount, false, false);
      }
    } catch (_) {
      // no-op - invalid JSON in session storage
    }
  };

  /**
   * Manually refresh the cart count from the cart API
   */
  refreshCartCount = async () => {
    try {
      const response = await fetch('/cart.js', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const cart = await response.json();
      this.renderCartBubble(cart.item_count, false, false); // Don't animate for manual refresh
    } catch (error) {
      console.error('Error refreshing cart count:', error);
    }
  };
}

if (!customElements.get('cart-icon')) {
  customElements.define('cart-icon', CartIcon);
}
