#!/bin/bash

echo "=== Cart Split-Screen Fix Verification ==="
echo ""

echo "1. Checking header-actions.liquid for cart template exclusion:"
grep -A 3 "template.name == 'cart'" /workspaces/AAI/snippets/header-actions.liquid
echo ""

echo "2. Verifying cart drawer is NOT rendered on cart page in header:"
if grep -q "template.name == 'cart'" /workspaces/AAI/snippets/header-actions.liquid; then
    echo "✅ Cart template exclusion condition found in header-actions.liquid"
else
    echo "❌ Cart template exclusion condition NOT found in header-actions.liquid"
fi
echo ""

echo "3. Checking cart.liquid for drawer mode handling:"
grep -A 2 -B 2 "settings.cart_type == 'drawer'" /workspaces/AAI/templates/cart.liquid
echo ""

echo "4. Verifying cart.liquid has proper drawer trigger (no auto-open):"
if grep -q "Auto-open cart drawer on page load" /workspaces/AAI/templates/cart.liquid; then
    echo "❌ Found auto-open script in cart.liquid (should be removed)"
else
    echo "✅ No auto-open script found in cart.liquid"
fi
echo ""

echo "5. Cart drawer JavaScript component status:"
if [ -f "/workspaces/AAI/assets/cart-drawer.js" ]; then
    echo "✅ Cart drawer JavaScript component exists"
    if grep -q "setupAutoOpenFunctionality" /workspaces/AAI/assets/cart-drawer.js; then
        echo "✅ Auto-open functionality exists in cart-drawer.js"
    else
        echo "❌ Auto-open functionality missing in cart-drawer.js"
    fi
else
    echo "❌ Cart drawer JavaScript component missing"
fi
echo ""

echo "6. Settings verification:"
if grep -q '"auto_open_cart_drawer": true' /workspaces/AAI/config/settings_data.json; then
    echo "✅ Auto-open cart drawer setting is enabled"
else
    echo "❌ Auto-open cart drawer setting is not enabled"
fi
echo ""

echo "=== Summary ==="
echo "The fix should now prevent the cart drawer from appearing on the /cart page"
echo "while still allowing it to function properly on all other pages."
echo "When users visit /cart directly, they'll see a clean page with a button to open the drawer."
