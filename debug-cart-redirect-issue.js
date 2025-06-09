#!/usr/bin/env node

/**
 * Comprehensive test to debug cart auto-open redirect issue
 */

const fs = require('fs');

console.log('🔍 DEBUGGING CART AUTO-OPEN REDIRECT ISSUE');
console.log('==========================================');
console.log('Date:', new Date().toISOString());
console.log();

// 1. Check current import structure
console.log('1. CHECKING IMPORT PATHS:');
const cartDrawerJS = fs.readFileSync('/workspaces/AAI/assets/cart-drawer.js', 'utf8');
const productFormJS = fs.readFileSync('/workspaces/AAI/assets/product-form.js', 'utf8');

if (cartDrawerJS.includes('@theme/')) {
  console.log('❌ Cart drawer still has @theme/ imports');
  const themeImports = cartDrawerJS.match(/import.*from.*@theme\/.*$/gm);
  themeImports?.forEach(imp => console.log(`   ${imp}`));
} else {
  console.log('✅ Cart drawer imports fixed to relative paths');
}

if (productFormJS.includes('@theme/')) {
  console.log('❌ Product form still has @theme/ imports');  
  const themeImports = productFormJS.match(/import.*from.*@theme\/.*$/gm);
  themeImports?.forEach(imp => console.log(`   ${imp}`));
} else {
  console.log('✅ Product form imports fixed to relative paths');
}

// 2. Check cart drawer event listening
console.log('\n2. CHECKING CART DRAWER EVENT DETECTION:');
if (cartDrawerJS.includes('ThemeEvents.cartUpdate') && 
    cartDrawerJS.includes('#handleCartUpdate')) {
  console.log('✅ Cart drawer listens for cart update events');
} else {
  console.log('❌ Cart drawer event listening broken');
}

if (cartDrawerJS.includes('product-form-component')) {
  console.log('✅ Cart drawer checks for product-form-component source');
} else {
  console.log('❌ Cart drawer missing product-form-component check');
}

// 3. Check product form event dispatch
console.log('\n3. CHECKING PRODUCT FORM EVENT DISPATCH:');
if (productFormJS.includes('document.dispatchEvent') && 
    productFormJS.includes('CartAddEvent')) {
  console.log('✅ Product form dispatches CartAddEvent to document');
} else {
  console.log('❌ Product form event dispatch broken');
}

if (productFormJS.includes('source: \'product-form-component\'')) {
  console.log('✅ Product form sets correct source identifier');
} else {
  console.log('❌ Product form missing source identifier');
}

// 4. Check cart form actions
console.log('\n4. CHECKING CART FORM ACTIONS:');
const cartDrawerTemplate = fs.readFileSync('/workspaces/AAI/snippets/cart-drawer.liquid', 'utf8');
const productFormTemplate = fs.readFileSync('/workspaces/AAI/snippets/product-form.liquid', 'utf8');

if (cartDrawerTemplate.includes('action="{{ routes.cart_url }}"')) {
  console.log('⚠️  Cart drawer form still submits to cart page');
} else {
  console.log('✅ Cart drawer form action looks good');
}

if (productFormTemplate.includes('action="{{ routes.cart_add_url }}"')) {
  console.log('✅ Product form submits to cart add API');
} else {
  console.log('❌ Product form action missing or incorrect');
}

// 5. Check for any remaining cart redirects
console.log('\n5. CHECKING FOR CART REDIRECTS:');
const redirectPatterns = [
  'window.location.*cart',
  'location.href.*cart',
  'window.location.assign.*cart',
  'window.location.replace.*cart'
];

let foundRedirects = false;
for (const pattern of redirectPatterns) {
  const regex = new RegExp(pattern, 'g');
  if (regex.test(cartDrawerJS)) {
    console.log(`⚠️  Found potential redirect in cart drawer: ${pattern}`);
    foundRedirects = true;
  }
  if (regex.test(productFormJS)) {
    console.log(`⚠️  Found potential redirect in product form: ${pattern}`);
    foundRedirects = true;
  }
}

if (!foundRedirects) {
  console.log('✅ No obvious cart redirects in main JavaScript files');
}

// 6. Check event names match
console.log('\n6. CHECKING EVENT NAME CONSISTENCY:');
const eventsJS = fs.readFileSync('/workspaces/AAI/assets/events.js', 'utf8');
const cartUpdateEventName = eventsJS.match(/cartUpdate.*=.*['"]([^'"]+)['"]/);

if (cartUpdateEventName) {
  const eventName = cartUpdateEventName[1];
  console.log(`Event name in events.js: ${eventName}`);
  
  if (cartDrawerJS.includes(eventName)) {
    console.log('✅ Cart drawer uses correct event name');
  } else {
    console.log('❌ Cart drawer event name mismatch');
  }
} else {
  console.log('❌ Could not find cartUpdate event definition');
}

console.log('\n🎯 LIKELY CAUSES OF REDIRECT ISSUE:');
console.log('===================================');
console.log('1. JavaScript module loading errors (check browser console)');
console.log('2. Import path resolution failures');
console.log('3. Event name mismatches between dispatch and listen');
console.log('4. Product form submission not being prevented');
console.log('5. Cart drawer not being rendered on product pages');

console.log('\n🧪 DEBUGGING STEPS:');
console.log('==================');
console.log('1. Open browser Developer Tools');
console.log('2. Go to Console tab');
console.log('3. Navigate to a product page');
console.log('4. Look for import/module errors');
console.log('5. Add item to cart and watch for events');
console.log('6. Check Network tab for form submissions');

console.log('\n💡 BROWSER CONSOLE COMMANDS:');
console.log('============================');
console.log('• Check cart drawer exists: document.querySelector("cart-drawer")');
console.log('• Check custom element registered: customElements.get("cart-drawer")');
console.log('• Check auto-open setting: document.querySelector("cart-drawer")?.getAttribute("data-auto-open")');
console.log('• Manual test drawer: document.querySelector("cart-drawer")?.showDialog()');
console.log('• Dispatch test event: document.dispatchEvent(new CustomEvent("cart:update", {detail:{data:{source:"product-form-component"}}}))');

console.log('\n🔧 NEXT STEPS:');
console.log('==============');
console.log('If redirects still occur:');
console.log('1. Check if JavaScript is loading without errors');
console.log('2. Verify event listeners are actually attached');
console.log('3. Add more console logging to track event flow');
console.log('4. Check if form submission is being prevented');
