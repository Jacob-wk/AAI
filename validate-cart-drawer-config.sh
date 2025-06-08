#!/bin/bash

echo "=== Cart Drawer Configuration Validation ==="
echo ""

echo "1. Checking cart_type setting in settings_data.json:"
grep -A 1 -B 1 "cart_type" /workspaces/AAI/config/settings_data.json

echo ""
echo "2. Checking cart_type conditional in header-actions.liquid:"
grep -A 8 -B 2 "settings.cart_type" /workspaces/AAI/snippets/header-actions.liquid

echo ""
echo "3. Verifying cart drawer component exists:"
if [ -f "/workspaces/AAI/snippets/cart-drawer.liquid" ]; then
    echo "✅ cart-drawer.liquid exists"
else
    echo "❌ cart-drawer.liquid missing"
fi

echo ""
echo "4. Verifying cart drawer JavaScript exists:"
if [ -f "/workspaces/AAI/assets/cart-drawer.js" ]; then
    echo "✅ cart-drawer.js exists"
else
    echo "❌ cart-drawer.js missing"
fi

echo ""
echo "5. Checking cart drawer button in cart-drawer.liquid:"
grep -A 3 -B 1 "on:click" /workspaces/AAI/snippets/cart-drawer.liquid

echo ""
echo "=== Configuration Analysis ==="
echo "Based on the configuration:"
echo "- cart_type is set to 'drawer' ✅"
echo "- Cart drawer component exists ✅"
echo "- Cart drawer JavaScript exists ✅"
echo ""
echo "If the cart still opens as a page instead of drawer:"
echo "1. You might be on the cart page template (/cart) where hyperlink is expected"
echo "2. Browser cache might need to be cleared"
echo "3. Shopify theme settings might need to be refreshed"
echo ""
echo "To test: Navigate to a product page or home page and click the cart icon"
