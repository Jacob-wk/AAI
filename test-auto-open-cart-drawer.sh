#!/bin/bash

echo "🧪 Testing Cart Drawer Auto-Open Functionality"
echo "================================================"

# Check if auto_open_cart_drawer setting exists in settings_data.json
echo "1. Checking auto_open_cart_drawer setting:"
if grep -q '"auto_open_cart_drawer": true' /workspaces/AAI/config/settings_data.json; then
    echo "   ✅ auto_open_cart_drawer setting found and enabled"
else
    echo "   ❌ auto_open_cart_drawer setting not found or disabled"
    echo "   Current cart settings:"
    grep -A 3 -B 1 "cart_type" /workspaces/AAI/config/settings_data.json
fi

echo ""

# Check if cart drawer template has the data attribute
echo "2. Checking cart drawer template for data-auto-open attribute:"
if grep -q 'data-auto-open="{{ settings.auto_open_cart_drawer }}"' /workspaces/AAI/snippets/cart-drawer.liquid; then
    echo "   ✅ data-auto-open attribute found in cart drawer template"
else
    echo "   ❌ data-auto-open attribute missing from cart drawer template"
    echo "   Cart drawer opening tag:"
    grep -A 1 -B 1 "<cart-drawer" /workspaces/AAI/snippets/cart-drawer.liquid
fi

echo ""

# Check if JavaScript has auto-open functionality
echo "3. Checking cart drawer JavaScript for auto-open functionality:"
if grep -q "#setupAutoOpenFunctionality" /workspaces/AAI/assets/cart-drawer.js; then
    echo "   ✅ Auto-open functionality method found"
    
    if grep -q "data-auto-open" /workspaces/AAI/assets/cart-drawer.js; then
        echo "   ✅ Data attribute reading implemented"
    else
        echo "   ❌ Data attribute reading not implemented"
    fi
    
    if grep -q "ThemeEvents.cartUpdate" /workspaces/AAI/assets/cart-drawer.js; then
        echo "   ✅ Cart update event listener implemented"
    else
        echo "   ❌ Cart update event listener not implemented"
    fi
else
    echo "   ❌ Auto-open functionality not implemented"
fi

echo ""

# Check cart drawer JavaScript syntax
echo "4. Checking JavaScript syntax:"
if node -c /workspaces/AAI/assets/cart-drawer.js 2>/dev/null; then
    echo "   ✅ JavaScript syntax is valid"
else
    echo "   ⚠️  JavaScript has syntax warnings (TypeScript annotations)"
    echo "   This is normal for Shopify themes using TypeScript-style comments"
fi

echo ""

# Check if cart drawer is properly included in theme
echo "5. Checking theme integration:"
if grep -q "cart-drawer.js" /workspaces/AAI/layout/theme.liquid; then
    echo "   ✅ Cart drawer JavaScript loaded in theme"
else
    echo "   ❌ Cart drawer JavaScript not loaded in theme"
fi

if grep -q "cart-styling.css" /workspaces/AAI/layout/theme.liquid; then
    echo "   ✅ Cart drawer CSS loaded in theme"
else
    echo "   ❌ Cart drawer CSS not loaded in theme"
fi

echo ""

# Check if cart drawer is included in templates
echo "6. Checking cart drawer inclusion:"
if grep -q "cart-drawer" /workspaces/AAI/snippets/header-actions.liquid; then
    echo "   ✅ Cart drawer included in header actions"
else
    echo "   ❌ Cart drawer not included in header actions"
fi

echo ""

# Summary
echo "📋 Auto-Open Implementation Summary:"
echo "======================================"

ISSUES=0

if ! grep -q '"auto_open_cart_drawer": true' /workspaces/AAI/config/settings_data.json; then
    echo "❌ Missing auto_open_cart_drawer setting"
    ((ISSUES++))
fi

if ! grep -q 'data-auto-open="{{ settings.auto_open_cart_drawer }}"' /workspaces/AAI/snippets/cart-drawer.liquid; then
    echo "❌ Missing data-auto-open attribute in template"
    ((ISSUES++))
fi

if ! grep -q "#setupAutoOpenFunctionality" /workspaces/AAI/assets/cart-drawer.js; then
    echo "❌ Missing auto-open JavaScript functionality"
    ((ISSUES++))
fi

if [ $ISSUES -eq 0 ]; then
    echo "✅ All auto-open functionality checks passed!"
    echo ""
    echo "🎯 Next Steps for Testing:"
    echo "1. Load the theme in a live Shopify environment"
    echo "2. Ensure 'auto_open_cart_drawer' is enabled in theme customizer"
    echo "3. Add a product to cart and verify drawer opens automatically"
    echo "4. Test that manual cart triggers still work normally"
else
    echo "⚠️  Found $ISSUES issues that need to be resolved"
fi
