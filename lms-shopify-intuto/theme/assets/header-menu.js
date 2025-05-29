import { Component } from '@theme/component';
import { debounce, onDocumentReady } from '@theme/utilities';
import { MegaMenuHoverEvent } from '@theme/events';

const ACTIVATE_DELAY = 250;
const DEACTIVATE_DELAY = 350;

/**
 * A custom element that manages a header menu.
 *
 * @typedef {Object} State
 * @property {HTMLElement | null} activeItem - The currently active menu item.
 *
 * @typedef {object} Refs
 * @property {HTMLElement[]} [submenu] - The submenu in each respective menu item.
 *
 * @extends {Component<Refs>}
 */
class HeaderMenu extends Component {
  connectedCallback() {
    super.connectedCallback();

    onDocumentReady(this.#preloadImages);
  }

  /**
   * @type {State}
   */
  #state = {
    activeItem: null,
  };

  /**
   * Time to allow for a closing animation between initiating a deactivation and actually deactivating the active item.
   * @returns {number}
   */
  get animationDelay() {
    const value = this.dataset.animationDelay;
    return value ? parseInt(value, 10) : 0;
  }

  /**
   * Activate the selected menu item immediately
   * @param {PointerEvent | FocusEvent} event
   */
  activate = (event) => {
    this.#debouncedDeactivate.cancel();

    if (this.#state.activeItem) {
      this.#activateHandler(event);
    } else {
      this.#debouncedActivateHandler(event);
    }
  };

  /**
   * Activate the selected menu item with a delay
   * @param {PointerEvent | FocusEvent} event
   */
  #activateHandler = (event) => {
    this.#debouncedDeactivate.cancel();

    this.dispatchEvent(new MegaMenuHoverEvent());

    this.removeAttribute('data-animating');

    if (!(event.target instanceof Element)) return;

    let item = findMenuItem(event.target);

    if (!item || item == this.#state.activeItem) return;

    this.dataset.overflowExpanded = (event.target.slot !== '').toString();

    this.#deactivate();
    this.#state.activeItem = item;
    this.ariaExpanded = 'true';
    item.ariaExpanded = 'true';

    const submenu = findSubmenu(item);

    if (!submenu) return;

    this.style.setProperty('--submenu-height', `${submenu.offsetHeight}px`);
  };

  #debouncedActivateHandler = debounce(this.#activateHandler, ACTIVATE_DELAY);

  /**
   * Deactivate the active item after a delay
   * @param {PointerEvent | FocusEvent} event
   */
  deactivate(event) {
    this.#debouncedActivateHandler.cancel();

    if (!(event.target instanceof Element)) return;

    const item = findMenuItem(event.target);

    // Make sure the item to be deactivated is still the active one. Ideally
    // we cancelled the debounce before the item was changed, but just in case.
    if (item === this.#state.activeItem) {
      this.#debouncedDeactivate(event);
    }
  }

  /**
   * Deactivate the active item after a delay
   * @param {PointerEvent | FocusEvent} event
   */
  #debouncedDeactivate = debounce((event) => {
    this.dataset.overflowExpanded = 'false';

    const item = findMenuItem(event.target);

    // Make sure the item to be deactivated is still the active one. Ideally
    // we cancelled the debounce before the item was changed, but just in case.
    if (item != this.#state.activeItem) return;

    this.#deactivate(item);
  }, DEACTIVATE_DELAY);

  /**
   * Deactivate the active item immediately
   * @param {HTMLElement | null} [item]
   */
  #deactivate = (item = this.#state.activeItem) => {
    this.style.setProperty('--submenu-height', '0px');

    if (!item) return;

    this.#state.activeItem = null;
    this.ariaExpanded = 'false';
    item.ariaExpanded = 'false';
    item.setAttribute('data-animating', '');

    setTimeout(() => {
      item.removeAttribute('data-animating');
    }, this.animationDelay);
  };

  /**
   * Preload images that are set to load lazily.
   */
  #preloadImages = () => {
    const images = this.querySelectorAll('img[loading="lazy"]');
    images?.forEach((image) => image.removeAttribute('loading'));
  };
}

if (!customElements.get('header-menu')) {
  customElements.define('header-menu', HeaderMenu);
}

/**
 * Find the closest menu item.
 * @param {Element | null | undefined} element
 * @returns {HTMLElement | null}
 */
function findMenuItem(element) {
  if (!(element instanceof Element)) return null;

  if (element?.matches('[slot="more"')) {
    // Select the first overflowing menu item when hovering over the "More" item
    return findMenuItem(element.parentElement?.querySelector('[slot="overflow"]'));
  }

  return element?.querySelector('[role="menuitem"]');
}

/**
 * Find the closest submenu.
 * @param {Element | null | undefined} element
 * @returns {HTMLElement | null}
 */
function findSubmenu(element) {
  const submenu = element?.parentElement?.querySelector('[ref="submenu[]"]');
  return submenu instanceof HTMLElement ? submenu : null;
}
