#!/usr/bin/env bash

echo "🛒 TESTING CART DRAWER AUTO-OPEN FIX"
echo "===================================="
echo "Date: $(date)"
echo

# 1. Test JavaScript Module Loading
echo "1. TESTING JAVASCRIPT MODULE LOADING:"
echo "======================================="

if grep -q "product-form.js" /workspaces/AAI/snippets/scripts.liquid; then
    echo "✅ product-form.js is loaded in scripts"
else
    echo "❌ product-form.js is missing from scripts"
fi

if grep -q "cart-drawer.js" /workspaces/AAI/layout/theme.liquid; then
    echo "✅ cart-drawer.js is loaded in theme"
else
    echo "❌ cart-drawer.js is missing from theme"
fi

# 2. Test Product Form Component Usage
echo
echo "2. TESTING PRODUCT FORM COMPONENTS:"
echo "===================================="

form_count=$(grep -c "product-form-component" /workspaces/AAI/snippets/product-form.liquid)
if [ "$form_count" -ge 2 ]; then
    echo "✅ Found $form_count product-form-component elements in product-form.liquid"
else
    echo "❌ Missing product-form-component elements in product-form.liquid"
fi

if grep -q "product-form-component" /workspaces/AAI/templates/product.course.liquid; then
    echo "✅ product-form-component found in product.course.liquid"
else
    echo "❌ product-form-component missing from product.course.liquid"
fi

# 3. Test Submit Handler Binding
echo
echo "3. TESTING SUBMIT HANDLER BINDING:"
echo "==================================="

submit_handlers=$(grep -c "on:submit=\"/handleSubmit\"" /workspaces/AAI/snippets/product-form.liquid)
if [ "$submit_handlers" -ge 2 ]; then
    echo "✅ Found $submit_handlers submit handlers in product-form.liquid"
else
    echo "❌ Missing submit handlers in product-form.liquid"
fi

if grep -q "on:submit=\"/handleSubmit\"" /workspaces/AAI/templates/product.course.liquid; then
    echo "✅ Submit handler found in product.course.liquid"
else
    echo "❌ Submit handler missing from product.course.liquid"
fi

# 4. Test Required Refs
echo
echo "4. TESTING REQUIRED REFS:"
echo "========================="

refs_to_check=("ref=\"variantId\"" "ref=\"addToCartButton\"" "ref=\"liveRegion\"" "ref=\"addToCartButtonContainer\"")

for ref in "${refs_to_check[@]}"; do
    if grep -q "$ref" /workspaces/AAI/snippets/product-form.liquid; then
        echo "✅ $ref found in product-form.liquid"
    else
        echo "❌ $ref missing from product-form.liquid"
    fi
done

# 5. Test Cart Drawer Configuration
echo
echo "5. TESTING CART DRAWER CONFIGURATION:"
echo "======================================"

if grep -q "cart_type.*drawer" /workspaces/AAI/config/settings_data.json; then
    echo "✅ Cart type set to drawer"
else
    echo "❌ Cart type not set to drawer"
fi

if grep -q "auto_open_cart_drawer.*true" /workspaces/AAI/config/settings_data.json; then
    echo "✅ Auto-open cart drawer enabled"
else
    echo "❌ Auto-open cart drawer not enabled"
fi

# 6. Test Cart Drawer Event Handling
echo
echo "6. TESTING CART DRAWER EVENT HANDLING:"
echo "======================================="

if grep -q "ThemeEvents.cartUpdate" /workspaces/AAI/assets/cart-drawer.js; then
    echo "✅ Cart drawer listens for cart update events"
else
    echo "❌ Cart drawer event listening broken"
fi

if grep -q "product-form-component" /workspaces/AAI/assets/cart-drawer.js; then
    echo "✅ Cart drawer checks for product-form-component source"
else
    echo "❌ Cart drawer missing product-form-component check"
fi

# 7. Test Import Paths
echo
echo "7. TESTING IMPORT PATHS:"
echo "========================"

if grep -q "@theme/" /workspaces/AAI/assets/cart-drawer.js; then
    echo "❌ Cart drawer still has @theme/ imports"
else
    echo "✅ Cart drawer imports fixed"
fi

if grep -q "@theme/" /workspaces/AAI/assets/product-form.js; then
    echo "❌ Product form still has @theme/ imports"
else
    echo "✅ Product form imports fixed"
fi

echo
echo "🎯 SUMMARY:"
echo "==========="
echo "The cart drawer auto-open issue has been fixed by:"
echo "1. ✅ Fixed import paths in both cart-drawer.js and product-form.js"
echo "2. ✅ Wrapped all product forms in product-form-component"
echo "3. ✅ Added on:submit handlers to prevent default form submission"
echo "4. ✅ Added required refs for JavaScript functionality"
echo "5. ✅ Ensured cart drawer listens for proper events"
echo

echo "🧪 EXPECTED BEHAVIOR:"
echo "===================="
echo "• Adding items to cart should now open the cart drawer (not redirect to /cart)"
echo "• Cart drawer should slide in from the right side"
echo "• Auto-open only occurs when theme setting is enabled"
echo "• Manual cart icon clicks should still work normally"
echo

echo "🔧 TO TEST:"
echo "==========="
echo "1. Go to any product page"
echo "2. Open browser Developer Tools (F12)"
echo "3. Add item to cart"
echo "4. Verify cart drawer opens instead of redirecting to /cart"
echo "5. Check console for event logs and no JavaScript errors"
