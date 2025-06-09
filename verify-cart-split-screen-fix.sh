#!/bin/bash

echo "🔧 Cart Drawer Split-Screen Fix Verification"
echo "============================================"

echo ""
echo "1. Checking cart_type setting:"
CART_TYPE=$(grep -o '"cart_type": "[^"]*"' /workspaces/AAI/config/settings_data.json | cut -d'"' -f4)
echo "   Cart type: $CART_TYPE"

echo ""
echo "2. Checking auto_open_cart_drawer setting:"
# Count how many times auto_open_cart_drawer appears
AUTO_OPEN_COUNT=$(grep -c '"auto_open_cart_drawer"' /workspaces/AAI/config/settings_data.json)
echo "   Found $AUTO_OPEN_COUNT instances of auto_open_cart_drawer"

if [ $AUTO_OPEN_COUNT -gt 1 ]; then
    echo "   ❌ DUPLICATE SETTINGS FOUND - this will cause conflicts"
    echo "   All instances:"
    grep -n '"auto_open_cart_drawer"' /workspaces/AAI/config/settings_data.json
else
    AUTO_OPEN_VALUE=$(grep -o '"auto_open_cart_drawer": [^,]*' /workspaces/AAI/config/settings_data.json | cut -d':' -f2 | tr -d ' ')
    echo "   Auto-open setting: $AUTO_OPEN_VALUE"
fi

echo ""
echo "3. Checking cart page template redirect logic:"
if grep -q "window.location.pathname === '/cart'" /workspaces/AAI/templates/cart.liquid; then
    echo "   ✅ Cart page redirect logic found"
else
    echo "   ❌ Cart page redirect logic missing"
fi

if grep -q "cart-page-content { display: none" /workspaces/AAI/templates/cart.liquid; then
    echo "   ✅ Cart page content hiding CSS found"
else
    echo "   ❌ Cart page content hiding CSS missing"
fi

echo ""
echo "4. Checking cart drawer template data attribute:"
if grep -q 'data-auto-open="{{ settings.auto_open_cart_drawer }}"' /workspaces/AAI/snippets/cart-drawer.liquid; then
    echo "   ✅ Cart drawer data-auto-open attribute found"
else
    echo "   ❌ Cart drawer data-auto-open attribute missing"
fi

echo ""
echo "5. Checking JavaScript auto-open functionality:"
if grep -q "#setupAutoOpenFunctionality" /workspaces/AAI/assets/cart-drawer.js; then
    echo "   ✅ Auto-open function found"
else
    echo "   ❌ Auto-open function missing"
fi

echo ""
echo "📋 Summary of Expected Behavior:"
echo "================================"
echo "When cart_type = 'drawer':"
echo "1. Visiting /cart should redirect to home page with cart drawer open"
echo "2. Cart page content should be hidden/replaced with redirect message"
echo "3. Add-to-cart actions should automatically open the drawer"
echo "4. No split-screen effect should occur"

echo ""
echo "🎯 Troubleshooting Steps if Issues Persist:"
echo "==========================================="
echo "1. Clear browser cache and hard refresh"
echo "2. Check browser console for JavaScript errors"
echo "3. Verify cart drawer is included in header-actions.liquid"
echo "4. Test with incognito/private browsing window"
echo "5. Check that theme assets are properly loaded"
