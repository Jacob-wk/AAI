#!/usr/bin/env node

/**
 * Simple test to check if cart drawer is loading properly
 */

console.log('🔍 CART DRAWER LOADING TEST');
console.log('===========================');

const fs = require('fs');

// 1. Check if cart drawer JavaScript exists and is valid
console.log('\n1. Checking cart drawer JavaScript file...');
try {
  const cartDrawerJS = fs.readFileSync('/workspaces/AAI/assets/cart-drawer.js', 'utf8');
  
  // Check for basic structure
  if (cartDrawerJS.includes('class CartDrawerComponent')) {
    console.log('✅ CartDrawerComponent class found');
  } else {
    console.log('❌ CartDrawerComponent class missing');
  }
  
  if (cartDrawerJS.includes('customElements.define')) {
    console.log('✅ Custom element definition found');
  } else {
    console.log('❌ Custom element definition missing');
  }
  
  // Check for potential import issues
  const imports = cartDrawerJS.match(/import.*from.*['"]@theme\/.*['"];/g);
  if (imports) {
    console.log('⚠️  Found @theme imports that might need resolution:');
    imports.forEach(imp => console.log(`   ${imp}`));
  }
  
  // Check for console.log statements
  const consoleLogs = cartDrawerJS.match(/console\.log\(/g);
  if (consoleLogs) {
    console.log(`✅ Found ${consoleLogs.length} console.log statements`);
  } else {
    console.log('❌ No console.log statements found');
  }
  
} catch (error) {
  console.log('❌ Error reading cart drawer file:', error.message);
}

// 2. Check if cart drawer is included in theme
console.log('\n2. Checking theme layout inclusion...');
try {
  const themeLayout = fs.readFileSync('/workspaces/AAI/layout/theme.liquid', 'utf8');
  
  if (themeLayout.includes("render 'cart-drawer'")) {
    console.log('✅ Cart drawer template is rendered');
  } else {
    console.log('❌ Cart drawer template not rendered');
  }
  
  if (themeLayout.includes("cart-drawer.js")) {
    console.log('✅ Cart drawer script is loaded');
  } else {
    console.log('❌ Cart drawer script not loaded');
  }
  
} catch (error) {
  console.log('❌ Error reading theme layout:', error.message);
}

// 3. Check cart drawer template
console.log('\n3. Checking cart drawer template...');
try {
  const cartDrawerTemplate = fs.readFileSync('/workspaces/AAI/snippets/cart-drawer.liquid', 'utf8');
  
  if (cartDrawerTemplate.includes('<cart-drawer')) {
    console.log('✅ Cart drawer custom element tag found');
  } else {
    console.log('❌ Cart drawer custom element tag missing');
  }
  
  if (cartDrawerTemplate.includes('data-auto-open')) {
    console.log('✅ Auto-open data attribute found');
  } else {
    console.log('❌ Auto-open data attribute missing');
  }
  
} catch (error) {
  console.log('❌ Error reading cart drawer template:', error.message);
}

// 4. Check dependencies
console.log('\n4. Checking dependencies...');
try {
  const componentJS = fs.readFileSync('/workspaces/AAI/assets/component.js', 'utf8');
  if (componentJS.includes('export class Component')) {
    console.log('✅ Base Component class exists');
  } else {
    console.log('❌ Base Component class missing');
  }
} catch (error) {
  console.log('❌ Component.js not found:', error.message);
}

try {
  const eventsJS = fs.readFileSync('/workspaces/AAI/assets/events.js', 'utf8');
  if (eventsJS.includes('cartUpdate')) {
    console.log('✅ ThemeEvents.cartUpdate exists');
  } else {
    console.log('❌ ThemeEvents.cartUpdate missing');
  }
} catch (error) {
  console.log('❌ Events.js not found:', error.message);
}

console.log('\n🎯 POTENTIAL ISSUES:');
console.log('===================');
console.log('If console logs are not appearing:');
console.log('1. Check browser console is not filtering messages');
console.log('2. Verify JavaScript modules are loading correctly');
console.log('3. Check for import path resolution issues (@theme/ aliases)');
console.log('4. Look for JavaScript errors in browser console');
console.log('5. Ensure custom elements are registered properly');

console.log('\n💡 QUICK DEBUG COMMANDS FOR BROWSER CONSOLE:');
console.log('===========================================');
console.log('• Check if cart drawer exists: document.querySelector("cart-drawer")');
console.log('• Check if custom element is defined: customElements.get("cart-drawer")');
console.log('• Check data attribute: document.querySelector("cart-drawer")?.getAttribute("data-auto-open")');
console.log('• Manual test: document.querySelector("cart-drawer")?.showDialog()');
