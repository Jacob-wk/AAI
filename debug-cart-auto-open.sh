#!/bin/bash

echo "=== CART DRAWER AUTO-OPEN TROUBLESHOOTING ==="
echo "Date: $(date)"
echo "=============================================="

# Check if cart drawer is properly included
echo
echo "1. CHECKING CART DRAWER INCLUSION:"

if grep -q "render 'cart-drawer'" /workspaces/AAI/sections/main-cart.liquid; then
    echo "✅ Cart drawer rendered in main-cart section"
else
    echo "❌ Cart drawer not found in main-cart section"
fi

if grep -q "render 'cart-drawer'" /workspaces/AAI/snippets/header-actions.liquid; then
    echo "✅ Cart drawer rendered in header-actions"
else
    echo "❌ Cart drawer not found in header-actions"
fi

# Check auto-open setting
echo
echo "2. CHECKING AUTO-OPEN SETTING:"

if grep -q '"auto_open_cart_drawer": true' /workspaces/AAI/config/settings_data.json; then
    echo "✅ auto_open_cart_drawer is enabled in settings"
else
    echo "❌ auto_open_cart_drawer is not enabled"
fi

# Check for potential conflicts
echo
echo "3. CHECKING FOR POTENTIAL CONFLICTS:"

if grep -q "window.location.*cart" /workspaces/AAI/assets/*.js; then
    echo "⚠️  Found potential cart redirects in JavaScript files:"
    grep -n "window.location.*cart" /workspaces/AAI/assets/*.js | head -3
else
    echo "✅ No obvious cart redirects found in JavaScript"
fi

# Check for form actions that might redirect
echo
echo "4. CHECKING FORM ACTIONS:"

if find /workspaces/AAI -name "*.liquid" -exec grep -l 'action.*cart' {} \; 2>/dev/null | head -3; then
    echo "⚠️  Found forms with cart actions:"
    find /workspaces/AAI -name "*.liquid" -exec grep -l 'action.*cart' {} \; | head -3
else
    echo "✅ No problematic cart forms found"
fi

# Check product form implementation
echo
echo "5. CHECKING PRODUCT FORM:"

if grep -q "handleSubmit.*preventDefault" /workspaces/AAI/assets/product-form.js; then
    echo "✅ Product form prevents default submission"
else
    echo "❌ Product form may not prevent default submission"
fi

echo
echo "=== TROUBLESHOOTING SUGGESTIONS ==="
echo "1. Open browser console when adding items to cart"
echo "2. Look for console logs from cart drawer auto-open detection"
echo "3. Check if CartAddEvent is being dispatched properly"
echo "4. Verify that cart drawer element has data-auto-open='true'"
echo "5. Ensure no other scripts are interfering with cart operations"

echo
echo "=== DEBUGGING COMMANDS ==="
echo "To debug in browser console:"
echo "1. document.querySelector('cart-drawer').getAttribute('data-auto-open')"
echo "2. Check for console logs when adding items to cart"
echo "3. Manually trigger: document.querySelector('cart-drawer').showDialog()"
