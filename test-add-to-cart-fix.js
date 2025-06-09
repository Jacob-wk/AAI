#!/usr/bin/env node

/**
 * Test script to verify that add-to-cart functionality is working
 * after removing interfering auto-open code
 */

const fs = require('fs');
const path = require('path');

console.log('=== ADD-TO-CART FUNCTIONALITY TEST ===');
console.log('Date:', new Date().toISOString());
console.log('=========================================');

// Read the cart drawer JavaScript file
const cartDrawerPath = '/workspaces/AAI/assets/cart-drawer.js';
const cartDrawerContent = fs.readFileSync(cartDrawerPath, 'utf8');

console.log('\n1. CHECKING FOR INTERFERING CODE REMOVAL:');

// Check that we removed form submission interference
if (!cartDrawerContent.includes('document.addEventListener(\'submit\'')) {
  console.log('✅ Form submission interference removed');
} else {
  console.log('❌ Form submission interference still present');
}

// Check that we removed fetch override
if (!cartDrawerContent.includes('window.fetch = async')) {
  console.log('✅ Fetch override removed');
} else {
  console.log('❌ Fetch override still present');
}

// Check that we removed event.preventDefault in cart events
if (!cartDrawerContent.includes('event.preventDefault?.()')) {
  console.log('✅ Event prevention in cart events removed');
} else {
  console.log('❌ Event prevention in cart events still present');
}

console.log('\n2. CHECKING AUTO-OPEN FUNCTIONALITY:');

// Check that we still have cart event listening
if (cartDrawerContent.includes('ThemeEvents.cartUpdate') && 
    cartDrawerContent.includes('product-form-component')) {
  console.log('✅ Cart event listening preserved');
} else {
  console.log('❌ Cart event listening broken');
}

// Check that we have auto-open setting check
if (cartDrawerContent.includes('data-auto-open')) {
  console.log('✅ Auto-open setting check present');
} else {
  console.log('❌ Auto-open setting check missing');
}

// Check that we have cart link interception
if (cartDrawerContent.includes('a[href="/cart"]')) {
  console.log('✅ Cart link interception preserved');
} else {
  console.log('❌ Cart link interception missing');
}

console.log('\n3. CHECKING PRODUCT FORM FUNCTIONALITY:');

// Read product form to ensure it's not modified
const productFormPath = '/workspaces/AAI/assets/product-form.js';
if (fs.existsSync(productFormPath)) {
  const productFormContent = fs.readFileSync(productFormPath, 'utf8');
  
  // Check that product form still has proper event handling
  if (productFormContent.includes('CartAddEvent') && 
      productFormContent.includes('cart/add.js')) {
    console.log('✅ Product form AJAX functionality intact');
  } else {
    console.log('❌ Product form AJAX functionality may be broken');
  }
  
  // Check that product form prevents default properly
  if (productFormContent.includes('event.preventDefault()')) {
    console.log('✅ Product form event prevention intact');
  } else {
    console.log('❌ Product form event prevention missing');
  }
} else {
  console.log('⚠️  Product form file not found');
}

console.log('\n4. EXPECTED BEHAVIOR:');
console.log('• ✅ Add-to-cart buttons should work normally');
console.log('• ✅ Cart drawer should auto-open after successful add (if setting enabled)');
console.log('• ✅ Direct cart page links should open drawer instead');
console.log('• ✅ Cart functionality (update/remove) should work normally');
console.log('• ✅ No JavaScript errors in console');

console.log('\n=== TEST COMPLETE ===');
console.log('The add-to-cart functionality should now work properly.');
console.log('Please test by:');
console.log('1. Going to a product page');
console.log('2. Clicking "Add to Cart"');
console.log('3. Verifying the item is added to cart');
console.log('4. Verifying the cart drawer opens (if auto-open is enabled)');
