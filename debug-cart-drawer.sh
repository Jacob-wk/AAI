#!/bin/bash

echo "=== Cart Drawer Debug Script ==="
echo ""

echo "1. Checking cart_type setting:"
grep "cart_type" /workspaces/AAI/config/settings_data.json

echo ""
echo "2. Checking header-actions conditional:"
grep -A 5 -B 2 "settings.cart_type == 'drawer'" /workspaces/AAI/snippets/header-actions.liquid

echo ""
echo "3. Verifying cart-drawer.liquid exists:"
if [ -f "/workspaces/AAI/snippets/cart-drawer.liquid" ]; then
    echo "✅ cart-drawer.liquid exists"
    echo "   First few lines:"
    head -5 /workspaces/AAI/snippets/cart-drawer.liquid
else
    echo "❌ cart-drawer.liquid missing"
fi

echo ""
echo "4. Checking cart-drawer.js:"
if [ -f "/workspaces/AAI/assets/cart-drawer.js" ]; then
    echo "✅ cart-drawer.js exists"
    echo "   First few lines:"
    head -5 /workspaces/AAI/assets/cart-drawer.js
else
    echo "❌ cart-drawer.js missing"
fi

echo ""
echo "5. Checking cart-styling.css:"
if [ -f "/workspaces/AAI/assets/cart-styling.css" ]; then
    echo "✅ cart-styling.css exists"
    echo "   Size: $(wc -l < /workspaces/AAI/assets/cart-styling.css) lines"
else
    echo "❌ cart-styling.css missing"
fi

echo ""
echo "=== Diagnosis ==="
echo "If cart still opens to page instead of drawer:"
echo "1. Clear browser cache and hard refresh"
echo "2. Check browser console for JavaScript errors"
echo "3. Verify you're not on the /cart page (drawer won't show there)"
echo "4. Test from homepage or product page"
echo ""
echo "Files should now be correctly configured!"
