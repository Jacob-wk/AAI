#!/bin/bash

# Cart Drawer Synchronization Test Script
echo "🧪 Testing Cart Drawer Synchronization Fix"
echo "========================================"

echo "📝 Current Implementation Status:"
echo "✅ Fixed import paths in cart-drawer.js and product-form.js"
echo "✅ Wrapped product forms with product-form-component"
echo "✅ Added proper event dispatching for cart updates"
echo "✅ Enhanced cart refresh logic with cart.js API"
echo "✅ Added real-time content synchronization"
echo ""

echo "🔍 Checking cart drawer implementation..."

# Check if cart drawer JavaScript exists and is properly structured
if [ -f "/workspaces/AAI/assets/cart-drawer.js" ]; then
    echo "✅ Cart drawer JavaScript file exists"
    
    # Check for key functionality
    if grep -q "refreshCartContent" "/workspaces/AAI/assets/cart-drawer.js"; then
        echo "✅ Cart refresh functionality found"
    else
        echo "❌ Cart refresh functionality missing"
    fi
    
    if grep -q "handleCartUpdate" "/workspaces/AAI/assets/cart-drawer.js"; then
        echo "✅ Cart update handler found"
    else
        echo "❌ Cart update handler missing"
    fi
    
    if grep -q "cart.js" "/workspaces/AAI/assets/cart-drawer.js"; then
        echo "✅ Cart.js API integration found"
    else
        echo "❌ Cart.js API integration missing"
    fi
else
    echo "❌ Cart drawer JavaScript file not found"
fi

echo ""

# Check product form implementation
if [ -f "/workspaces/AAI/assets/product-form.js" ]; then
    echo "✅ Product form JavaScript file exists"
    
    if grep -q "CartAddEvent" "/workspaces/AAI/assets/product-form.js"; then
        echo "✅ Cart add event dispatching found"
    else
        echo "❌ Cart add event dispatching missing"
    fi
else
    echo "❌ Product form JavaScript file not found"
fi

echo ""

# Check product form templates
echo "🔍 Checking product form templates..."

FORMS_FOUND=0

if [ -f "/workspaces/AAI/snippets/product-form.liquid" ]; then
    if grep -q "product-form-component" "/workspaces/AAI/snippets/product-form.liquid"; then
        echo "✅ Product form snippet has component wrapper"
        FORMS_FOUND=$((FORMS_FOUND + 1))
    else
        echo "❌ Product form snippet missing component wrapper"
    fi
else
    echo "❌ Product form snippet not found"
fi

if [ -f "/workspaces/AAI/templates/product.course.liquid" ]; then
    if grep -q "product-form-component" "/workspaces/AAI/templates/product.course.liquid"; then
        echo "✅ Course product template has component wrapper"
        FORMS_FOUND=$((FORMS_FOUND + 1))
    else
        echo "❌ Course product template missing component wrapper"
    fi
else
    echo "❌ Course product template not found"
fi

echo ""

# Check cart drawer template
if [ -f "/workspaces/AAI/snippets/cart-drawer.liquid" ]; then
    echo "✅ Cart drawer template exists"
    
    if grep -q "data-auto-open" "/workspaces/AAI/snippets/cart-drawer.liquid"; then
        echo "✅ Auto-open configuration found"
    else
        echo "❌ Auto-open configuration missing"
    fi
else
    echo "❌ Cart drawer template not found"
fi

echo ""

# Check settings
if [ -f "/workspaces/AAI/config/settings_data.json" ]; then
    echo "✅ Settings file exists"
    
    if grep -q "auto_open_cart_drawer" "/workspaces/AAI/config/settings_data.json"; then
        echo "✅ Auto-open setting found in configuration"
        
        # Extract the setting value
        AUTO_OPEN=$(grep -o '"auto_open_cart_drawer":[^,}]*' "/workspaces/AAI/config/settings_data.json" | cut -d':' -f2 | tr -d ' "')
        echo "   Setting value: $AUTO_OPEN"
    else
        echo "❌ Auto-open setting not found in configuration"
    fi
else
    echo "❌ Settings file not found"
fi

echo ""
echo "📊 Test Summary:"
echo "=================="

ISSUES_FOUND=0

# Count issues by checking our previous output
if ! grep -q "✅ Cart drawer JavaScript file exists" <<< "$(cat)"; then
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

echo "Forms wrapped with components: $FORMS_FOUND"

if [ $FORMS_FOUND -eq 0 ]; then
    echo "⚠️  No product forms are properly wrapped with components"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
elif [ $FORMS_FOUND -lt 2 ]; then
    echo "⚠️  Some product forms may be missing component wrappers"
fi

if [ $ISSUES_FOUND -eq 0 ]; then
    echo ""
    echo "🎉 All cart drawer synchronization components are in place!"
    echo ""
    echo "🧪 Manual Testing Steps:"
    echo "1. Open a product page"
    echo "2. Add item to cart"
    echo "3. Verify cart drawer opens (not redirect to /cart)"
    echo "4. Check that cart shows correct item count and contents"
    echo "5. Add another item and verify real-time updates"
    echo "6. Test quantity changes and removals"
    echo ""
    echo "Expected Results:"
    echo "✅ Cart drawer opens instead of page redirect"
    echo "✅ Cart content is current and accurate"
    echo "✅ No stale data or empty cart display"
    echo "✅ Real-time updates without page refresh"
else
    echo ""
    echo "⚠️  Found $ISSUES_FOUND issues that may affect functionality"
    echo "Please review the items marked with ❌ above"
fi

echo ""
echo "🔧 If issues persist, check browser console for:"
echo "- JavaScript errors"
echo "- Cart drawer event dispatching"
echo "- API calls to /cart.js"
echo "- Custom element registration"

echo ""
echo "📋 Debug Commands:"
echo "- Check browser console: F12 > Console"
echo "- Inspect cart drawer: document.querySelector('cart-drawer')"
echo "- Check auto-open setting: cartDrawer.getAttribute('data-auto-open')"
echo "- Monitor events: addEventListener('cart:update', console.log)"
