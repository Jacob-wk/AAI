#!/usr/bin/env node

/**
 * Test script to verify cart drawer auto-open fix
 * This tests that the issue where auto-open redirected to /cart page is resolved
 */

const fs = require('fs');

console.log('🎯 CART DRAWER AUTO-OPEN FIX VERIFICATION');
console.log('==========================================');
console.log(`Date: ${new Date().toISOString()}`);
console.log('');

let testsPassed = 0;
let totalTests = 0;

function test(description, condition) {
  totalTests++;
  if (condition) {
    console.log(`✅ ${description}`);
    testsPassed++;
  } else {
    console.log(`❌ ${description}`);
  }
}

// 1. Check cart drawer template has simplified auto-open attribute
console.log('1. CHECKING CART DRAWER TEMPLATE:');
const cartDrawerContent = fs.readFileSync('/workspaces/AAI/snippets/cart-drawer.liquid', 'utf8');
test('Auto-open attribute is simplified', 
  cartDrawerContent.includes('data-auto-open="{{ settings.auto_open_cart_drawer }}"') &&
  !cartDrawerContent.includes('{% if auto_open == false %}')
);

// 2. Check product form dispatches events to document level
console.log('\n2. CHECKING PRODUCT FORM EVENT DISPATCH:');
const productFormContent = fs.readFileSync('/workspaces/AAI/assets/product-form.js', 'utf8');
test('Product form dispatches CartAddEvent to document (success case)', 
  productFormContent.includes('document.dispatchEvent(\n            new CartAddEvent({}, id.toString()')
);
test('Product form dispatches CartAddEvent to document (error case)', 
  productFormContent.includes('document.dispatchEvent(\n            new CartAddEvent({}, this.id,')
);
test('Product form uses correct event source', 
  productFormContent.includes("source: 'product-form-component'")
);

// 3. Check cart drawer auto-open detection
console.log('\n3. CHECKING CART DRAWER AUTO-OPEN LOGIC:');
const cartDrawerJsContent = fs.readFileSync('/workspaces/AAI/assets/cart-drawer.js', 'utf8');
test('Cart drawer listens for cart update events on document', 
  cartDrawerJsContent.includes('document.addEventListener(ThemeEvents.cartUpdate')
);
test('Cart drawer detects product-form-component source', 
  cartDrawerJsContent.includes("'product-form-component'")
);
test('Cart drawer reads auto-open setting from data attribute', 
  cartDrawerJsContent.includes("this.getAttribute('data-auto-open') === 'true'")
);

// 4. Check auto-open setting is enabled
console.log('\n4. CHECKING AUTO-OPEN SETTING:');
const settingsContent = fs.readFileSync('/workspaces/AAI/config/settings_data.json', 'utf8');
test('Auto-open cart drawer setting is enabled in config', 
  settingsContent.includes('"auto_open_cart_drawer": true')
);

// 5. Check cart link interception
console.log('\n5. CHECKING CART LINK INTERCEPTION:');
test('Cart drawer intercepts cart page links', 
  cartDrawerJsContent.includes('#interceptCartLinks') &&
  cartDrawerJsContent.includes('a[href*="/cart"]')
);

console.log('\n' + '='.repeat(50));
console.log(`RESULTS: ${testsPassed}/${totalTests} tests passed`);

if (testsPassed === totalTests) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('\n✅ THE AUTO-OPEN CART DRAWER FIX IS COMPLETE');
  console.log('\nExpected behavior:');
  console.log('• Adding items to cart should open the cart drawer (not redirect to /cart)');
  console.log('• Cart drawer should slide in from the right side');
  console.log('• Clicking cart icon should open drawer');
  console.log('• Direct /cart links should open drawer instead of page');
  console.log('• Auto-open only occurs when theme setting is enabled');
} else {
  console.log('\n❌ SOME TESTS FAILED');
  console.log('Please review the failing tests and fix the issues.');
}

console.log('\n🧪 TO TEST MANUALLY:');
console.log('1. Go to a product page');
console.log('2. Add item to cart');
console.log('3. Verify cart drawer opens (not /cart page redirect)');
console.log('4. Check browser console for event logs');
