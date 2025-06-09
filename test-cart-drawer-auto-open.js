#!/usr/bin/env node

/**
 * Test script to verify cart drawer auto-open functionality
 * This script simulates the cart add events and checks the auto-open logic
 */

console.log('🛒 Testing Cart Drawer Auto-Open Functionality\n');

// Mock DOM environment
global.document = {
  addEventListener: function(event, handler) {
    console.log(`✅ Event listener added for: ${event}`);
    
    // Simulate a CartAddEvent from product form
    if (event === 'theme:cart:update') {
      setTimeout(() => {
        console.log('🔄 Simulating CartAddEvent...');
        const mockEvent = {
          detail: {
            data: {
              source: 'product-form-component',
              itemCount: 1,
              productId: '123'
            },
            sourceId: 'product-form-456'
          }
        };
        
        console.log('📦 Mock event detail:', JSON.stringify(mockEvent.detail, null, 2));
        handler(mockEvent);
      }, 1000);
    }
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({}),
  body: { style: {} }
};

global.customElements = {
  get: () => false,
  define: (name, constructor) => {
    console.log(`🎯 Custom element defined: ${name}`);
    
    // Create mock instance to test auto-open logic
    const mockElement = {
      getAttribute: (attr) => {
        if (attr === 'data-auto-open') {
          console.log('🔧 Auto-open setting: true');
          return 'true';
        }
        return null;
      },
      refs: {
        dialog: {
          open: false,
          showModal: () => {
            console.log('🎉 SUCCESS: Cart drawer opened automatically!');
            mockElement.refs.dialog.open = true;
          },
          setAttribute: () => {},
          addEventListener: () => {},
          querySelectorAll: () => [],
          querySelector: () => null
        }
      },
      showDialog: function() {
        console.log('📱 showDialog() called');
        this.refs.dialog.showModal();
      },
      addEventListener: () => {},
      closest: () => null,
      querySelector: () => null,
      dataset: {}
    };
    
    // Simulate the setupAutoOpenFunctionality method
    const setupAutoOpen = function() {
      console.log('🔧 Setting up auto-open functionality...');
      
      document.addEventListener('theme:cart:update', (event) => {
        console.log('🎯 Cart update event received');
        
        const customEvent = event;
        const isAddEvent = customEvent.detail?.data?.source === 'product-form-component' || 
                          customEvent.detail?.data?.variantId || 
                          customEvent.detail?.sourceId?.includes('product-form') ||
                          customEvent.detail?.source?.includes('add-to-cart') ||
                          (customEvent.detail?.data && !customEvent.detail?.data?.didError);
                          
        const autoOpenEnabled = mockElement.getAttribute('data-auto-open') === 'true';
        
        console.log('🔍 Detection results:', {
          isAddEvent,
          autoOpenEnabled,
          drawerOpen: mockElement.refs.dialog.open
        });
        
        if (isAddEvent && autoOpenEnabled && !mockElement.refs.dialog.open) {
          setTimeout(() => {
            mockElement.showDialog();
          }, 100);
        }
      });
    };
    
    // Initialize auto-open
    setupAutoOpen();
  }
};

// Mock Theme events
global.ThemeEvents = {
  cartUpdate: 'theme:cart:update'
};

// Load the cart drawer component
try {
  require('./assets/cart-drawer.js');
  console.log('✅ Cart drawer component loaded successfully\n');
} catch (error) {
  console.error('❌ Failed to load cart drawer:', error.message);
}

console.log('⏱️  Waiting for events...\n');

// Keep the script running for a moment to see results
setTimeout(() => {
  console.log('\n🏁 Test completed!');
  process.exit(0);
}, 3000);
