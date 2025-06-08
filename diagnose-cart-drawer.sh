#!/bin/bash

echo "🛒 Cart Drawer Diagnostic Script"
echo "================================"
echo ""

# Check cart_type setting
echo "1. Cart Type Setting:"
echo "   $(grep -o '"cart_type": "[^"]*"' /workspaces/AAI/config/settings_data.json)"
echo ""

# Check conditional logic
echo "2. Current Conditional Logic:"
echo "   $(grep -A2 'settings.cart_type.*drawer' /workspaces/AAI/snippets/header-actions.liquid)"
echo ""

# Check if cart drawer component exists
echo "3. Cart Drawer Component:"
if [ -f "/workspaces/AAI/snippets/cart-drawer.liquid" ]; then
    echo "   ✅ EXISTS: snippets/cart-drawer.liquid"
    echo "   Size: $(wc -l < /workspaces/AAI/snippets/cart-drawer.liquid) lines"
else
    echo "   ❌ MISSING: snippets/cart-drawer.liquid"
fi
echo ""

# Check if cart drawer JavaScript exists
echo "4. Cart Drawer JavaScript:"
if [ -f "/workspaces/AAI/assets/cart-drawer.js" ]; then
    echo "   ✅ EXISTS: assets/cart-drawer.js"
    echo "   Size: $(wc -l < /workspaces/AAI/assets/cart-drawer.js) lines"
else
    echo "   ❌ MISSING: assets/cart-drawer.js"
fi
echo ""

# Check cart icon component
echo "5. Cart Icon Component:"
if [ -f "/workspaces/AAI/snippets/cart-icon-component.liquid" ]; then
    echo "   ✅ EXISTS: snippets/cart-icon-component.liquid"
else
    echo "   ❌ MISSING: snippets/cart-icon-component.liquid"
fi
echo ""

# Show the current cart rendering logic
echo "6. Current Cart Rendering Logic:"
echo "   From header-actions.liquid around line 374:"
sed -n '370,385p' /workspaces/AAI/snippets/header-actions.liquid | nl -v370
echo ""

echo "🔍 DIAGNOSIS:"
echo "============="

# Get the cart_type value
CART_TYPE=$(grep -o '"cart_type": "[^"]*"' /workspaces/AAI/config/settings_data.json | cut -d'"' -f4)

if [ "$CART_TYPE" = "drawer" ]; then
    echo "✅ cart_type is correctly set to 'drawer'"
    echo ""
    echo "🤔 If cart still opens as page instead of drawer:"
    echo "   • You might be testing on the /cart page (expected behavior)"
    echo "   • Browser cache might need clearing"
    echo "   • Try testing on: / (home), /products/*, /collections/*"
    echo ""
    echo "💡 SOLUTION: Test the cart icon on a NON-CART page"
    echo "   The drawer should work on product pages, home page, etc."
    echo "   The cart page (/cart) intentionally shows hyperlink behavior."
else
    echo "❌ cart_type is set to '$CART_TYPE' instead of 'drawer'"
    echo ""
    echo "🔧 FIX: Update config/settings_data.json:"
    echo '   Change "cart_type": "'$CART_TYPE'" to "cart_type": "drawer"'
fi
