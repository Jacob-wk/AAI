#!/bin/bash

echo "🔍 CART DRAWER SPLIT-SCREEN DIAGNOSTIC - COMPREHENSIVE"
echo "======================================================"
echo ""

# 1. Check cart type configuration
echo "1️⃣ Cart Type Configuration:"
echo "--------------------------------"
if grep -q '"cart_type": "drawer"' /workspaces/AAI/config/settings_data.json; then
    echo "✅ Cart type is set to 'drawer'"
else
    echo "❌ Cart type is NOT set to 'drawer'"
    echo "Current cart_type setting:"
    grep -A 1 -B 1 "cart_type" /workspaces/AAI/config/settings_data.json || echo "No cart_type found"
fi

echo ""

# 2. Check cart drawer template rendering
echo "2️⃣ Cart Drawer Template Rendering:"
echo "------------------------------------"
if grep -q "{% render 'cart-drawer' %}" /workspaces/AAI/layout/theme.liquid; then
    echo "✅ Cart drawer template is rendered in theme.liquid"
else
    echo "❌ Cart drawer template is NOT rendered in theme.liquid"
    echo "Checking for cart drawer rendering:"
    grep -n "cart-drawer" /workspaces/AAI/layout/theme.liquid || echo "No cart-drawer found in theme.liquid"
fi

echo ""

# 3. Check for cart page template conflicts
echo "3️⃣ Cart Page Template Analysis:"
echo "--------------------------------"
if [ -f "/workspaces/AAI/templates/cart.liquid" ]; then
    echo "⚠️  Standard cart page template exists: /templates/cart.liquid"
    echo "This could cause conflicts if users navigate to /cart"
    echo "Cart template loads:"
    head -10 /workspaces/AAI/templates/cart.liquid | grep -E "(css|js|stylesheet)"
else
    echo "✅ No conflicting cart page template found"
fi

echo ""

# 4. Check cart drawer CSS positioning
echo "4️⃣ Cart Drawer CSS Analysis:"
echo "-----------------------------"
if [ -f "/workspaces/AAI/assets/cart-styling.css" ]; then
    echo "✅ Cart styling CSS exists"
    echo "Key positioning properties:"
    grep -E "(position.*fixed|z-index.*[0-9]{4,}|transform.*translateX)" /workspaces/AAI/assets/cart-styling.css | head -5
else
    echo "❌ Cart styling CSS is missing"
fi

echo ""

# 5. Check cart drawer JavaScript
echo "5️⃣ Cart Drawer JavaScript Analysis:"
echo "------------------------------------"
if [ -f "/workspaces/AAI/assets/cart-drawer.js" ]; then
    echo "✅ Cart drawer JavaScript exists"
    echo "Component registration:"
    grep -n "customElements.define" /workspaces/AAI/assets/cart-drawer.js
    echo "Show/close methods:"
    grep -n -E "(showDialog|closeDialog)" /workspaces/AAI/assets/cart-drawer.js | head -2
else
    echo "❌ Cart drawer JavaScript is missing"
fi

echo ""

# 6. Check for CSS conflicts
echo "6️⃣ CSS Conflict Detection:"
echo "---------------------------"
echo "Checking for dialog element styling conflicts:"
find /workspaces/AAI/assets -name "*.css" -exec grep -l "dialog" {} \; | while read file; do
    echo "Found dialog styles in: $file"
    grep -n -A 2 -B 2 "dialog" "$file" | head -5
done

echo ""

# 7. Check cart trigger integration
echo "7️⃣ Cart Trigger Integration:"
echo "-----------------------------"
if grep -q "data-cart-drawer-trigger" /workspaces/AAI/snippets/header-actions.liquid; then
    echo "✅ Cart trigger has data-cart-drawer-trigger attribute"
else
    echo "❌ Cart trigger missing data-cart-drawer-trigger attribute"
    echo "Current cart trigger:"
    grep -n -A 3 -B 3 "cart" /workspaces/AAI/snippets/header-actions.liquid | grep -E "(href|click|trigger)" | head -3
fi

echo ""

# 8. Potential root causes analysis
echo "8️⃣ POTENTIAL ROOT CAUSES ANALYSIS:"
echo "====================================="
echo ""

echo "🔍 Cause 1: Browser navigation to /cart URL"
echo "If users type /cart in URL or click a direct cart link,"
echo "they will see the cart page template instead of the drawer."
echo ""

echo "🔍 Cause 2: JavaScript not properly bound"
echo "Cart drawer JavaScript might not be intercepting cart icon clicks."
echo ""

echo "🔍 Cause 3: CSS z-index conflicts"
echo "Other elements might have higher z-index than cart drawer."
echo ""

echo "🔍 Cause 4: Dialog element not supported"
echo "Older browsers might not support native dialog element."
echo ""

echo "💡 RECOMMENDED FIXES:"
echo "====================="
echo "1. Ensure cart icon clicks are intercepted by JavaScript"
echo "2. Add cart page redirect to drawer for /cart URLs"
echo "3. Increase cart drawer z-index to 99999"
echo "4. Add dialog polyfill for older browsers"
echo ""

echo "🎯 NEXT STEPS:"
echo "=============="
echo "1. Test cart drawer in browser console"
echo "2. Check network tab for JavaScript errors"
echo "3. Inspect DOM for proper cart drawer rendering"
echo "4. Verify click event handling on cart icon"

echo ""
echo "✨ Diagnostic complete!"
