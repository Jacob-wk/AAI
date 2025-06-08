/**
 * Validation script for cart drawer slide-in animation
 * This script can be run in the browser console to test the cart drawer functionality
 */

function validateCartDrawerAnimation() {
  console.log('🛒 Testing Cart Drawer Right-Side Slide Animation...');
  
  // Check if cart drawer exists
  const cartDrawer = document.querySelector('cart-drawer-component');
  if (!cartDrawer) {
    console.error('❌ Cart drawer component not found');
    return false;
  }
  
  const dialog = cartDrawer.querySelector('.cart-drawer__dialog');
  if (!dialog) {
    console.error('❌ Cart drawer dialog not found');
    return false;
  }
  
  console.log('✅ Cart drawer component found');
  
  // Check CSS positioning and animations
  const computedStyle = window.getComputedStyle(dialog);
  
  // Test initial positioning (should be off-screen to the right)
  const initialTransform = computedStyle.transform;
  console.log('🎯 Initial transform:', initialTransform);
  
  // Check if positioned on the right
  const position = computedStyle.position;
  const right = computedStyle.right;
  const top = computedStyle.top;
  
  console.log('📍 Position properties:', { position, right, top });
  
  if (position !== 'fixed') {
    console.warn('⚠️  Expected position: fixed, got:', position);
  }
  
  if (right !== '0px') {
    console.warn('⚠️  Expected right: 0px, got:', right);
  }
  
  // Test animation classes exist
  const hasSlideInAnimation = document.styleSheets[0]?.cssRules 
    ? Array.from(document.styleSheets[0].cssRules).some(rule => 
        rule.name === 'cart-drawer-slide-in'
      )
    : false;
    
  console.log('🎬 Animation keyframes found:', hasSlideInAnimation);
  
  // Test opening the drawer
  console.log('🚀 Testing drawer open...');
  try {
    cartDrawer.open();
    
    setTimeout(() => {
      const isOpen = dialog.hasAttribute('open');
      const hasOpenClass = dialog.matches('[open]');
      
      console.log('📂 Drawer state after open:', { 
        isOpen, 
        hasOpenClass,
        computedTransform: window.getComputedStyle(dialog).transform 
      });
      
      // Test closing
      setTimeout(() => {
        console.log('🔄 Testing drawer close...');
        cartDrawer.close();
        
        setTimeout(() => {
          const isClosedAfterAnimation = !dialog.hasAttribute('open');
          console.log('🚪 Drawer closed:', isClosedAfterAnimation);
          
          if (isClosedAfterAnimation) {
            console.log('🎉 Cart drawer animation validation PASSED!');
          } else {
            console.error('❌ Cart drawer close animation FAILED');
          }
        }, 350); // Wait for close animation
      }, 100);
    }, 350); // Wait for open animation
    
  } catch (error) {
    console.error('❌ Error testing drawer:', error);
  }
  
  return true;
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('Cart Drawer Animation Validator Ready!');
  console.log('Run validateCartDrawerAnimation() to test the implementation');
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateCartDrawerAnimation };
}
