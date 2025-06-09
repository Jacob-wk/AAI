#!/bin/bash

echo "🔍 CART DRAWER DEBUG SCRIPT"
echo "==========================="
echo ""

echo "1. Cart Type Setting:"
grep '"cart_type"' /workspaces/AAI/config/settings_data.json
echo ""

echo "2. Header Actions Cart Logic:"
echo "   Checking if drawer mode and template exclusion are working..."
grep -A 10 -B 2 "settings.cart_type == 'drawer'" /workspaces/AAI/snippets/header-actions.liquid
echo ""

echo "3. Cart Drawer Rendering Logic:"
echo "   Template exclusion condition:"
grep -A 2 -B 1 "template.name == 'cart'" /workspaces/AAI/snippets/header-actions.liquid
echo ""

echo "4. Cart Icon Implementation Check:"
echo "   Looking for cart trigger button vs link..."
grep -A 5 -B 2 "data-cart-drawer-trigger" /workspaces/AAI/snippets/header-actions.liquid
echo ""

echo "5. Cart Drawer Component Check:"
if [ -f "/workspaces/AAI/snippets/cart-drawer.liquid" ]; then
    echo "   ✅ Cart drawer template exists"
    if grep -q "data-auto-open" /workspaces/AAI/snippets/cart-drawer.liquid; then
        echo "   ✅ Cart drawer has auto-open attribute"
    else
        echo "   ❌ Cart drawer missing auto-open attribute"
    fi
else
    echo "   ❌ Cart drawer template missing"
fi
echo ""

echo "6. JavaScript Event Handler Check:"
if grep -q "handleCartTriggerClick" /workspaces/AAI/assets/cart-drawer.js; then
    echo "   ✅ Cart trigger click handler exists"
    if grep -q "data-cart-drawer-trigger" /workspaces/AAI/assets/cart-drawer.js; then
        echo "   ✅ Cart trigger selector in JavaScript"
    else
        echo "   ❌ Cart trigger selector missing in JavaScript"
    fi
else
    echo "   ❌ Cart trigger click handler missing"
fi
echo ""

echo "7. Potential Issues to Check:"
echo "   • Is cart drawer being rendered on non-cart pages?"
echo "   • Is the button element properly configured?"
echo "   • Is the JavaScript event listener working?"
echo "   • Are there any console errors?"
echo ""

echo "🛠️  RECOMMENDED DEBUG STEPS:"
echo "1. Check browser console for JavaScript errors"
echo "2. Inspect cart icon element to verify it's a button with data-cart-drawer-trigger"
echo "3. Verify cart-drawer element exists in DOM on non-cart pages"
echo "4. Test if showDialog() method works when called manually in console"
