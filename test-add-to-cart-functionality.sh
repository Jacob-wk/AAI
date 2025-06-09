#!/bin/bash

echo "=== CART ADD-TO-CART FUNCTIONALITY TEST ==="
echo "Date: $(date)"
echo "============================================"

# Check for any remaining problematic code
echo
echo "1. CHECKING FOR PROBLEMATIC CODE:"

if grep -q "window.fetch.*async.*args" /workspaces/AAI/assets/cart-drawer.js; then
    echo "❌ Found fetch override - this breaks add-to-cart!"
    echo "   Location in cart-drawer.js:"
    grep -n "window.fetch" /workspaces/AAI/assets/cart-drawer.js
else
    echo "✅ No fetch override found"
fi

if grep -q "submit.*preventDefault" /workspaces/AAI/assets/cart-drawer.js; then
    echo "❌ Found form submission preventDefault - this may break add-to-cart!"
    echo "   Location in cart-drawer.js:"
    grep -n -A2 -B2 "submit.*preventDefault" /workspaces/AAI/assets/cart-drawer.js
else
    echo "✅ No form submission preventDefault found"
fi

# Check for sandboxing issues
echo
echo "2. CHECKING FOR SANDBOXING ISSUES:"

if grep -q "sandbox" /workspaces/AAI/snippets/cart-drawer.liquid; then
    echo "❌ Found sandbox attribute in cart-drawer.liquid"
    grep -n "sandbox" /workspaces/AAI/snippets/cart-drawer.liquid
else
    echo "✅ No sandbox attribute found in cart-drawer.liquid"
fi

if grep -q "iframe" /workspaces/AAI/snippets/cart-drawer.liquid; then
    echo "❌ Found iframe in cart-drawer.liquid"
    grep -n "iframe" /workspaces/AAI/snippets/cart-drawer.liquid
else
    echo "✅ No iframe found in cart-drawer.liquid"
fi

# Check product form implementation
echo
echo "3. CHECKING PRODUCT FORM IMPLEMENTATION:"

if [ -f "/workspaces/AAI/assets/product-form.js" ]; then
    echo "✅ product-form.js exists"
    
    if grep -q "handleSubmit.*event.preventDefault" /workspaces/AAI/assets/product-form.js; then
        echo "✅ Product form properly prevents default submission"
    else
        echo "❌ Product form may not be preventing default submission"
    fi
    
    if grep -q "cart/add.js" /workspaces/AAI/assets/product-form.js; then
        echo "✅ Product form uses cart/add.js API"
    else
        echo "❌ Product form may not be using cart/add.js API"
    fi
else
    echo "❌ product-form.js missing"
fi

# Check cart drawer current implementation
echo
echo "4. CHECKING CURRENT CART DRAWER:"

echo "Current setupAutoOpenFunctionality method:"
echo "----------------------------------------"
grep -A 20 "#setupAutoOpenFunctionality" /workspaces/AAI/assets/cart-drawer.js | head -25

echo
echo "=== RECOMMENDATION ==="
echo "Based on the error message 'Blocked form submission to '/cart/add' because the form's frame is sandboxed':"
echo "1. The issue is likely NOT in cart-drawer.js (current implementation looks clean)"
echo "2. Check if there are any iframe or sandbox restrictions"
echo "3. Verify that product forms are not being interfered with by other scripts"
echo "4. Test add-to-cart functionality with browser dev tools open to see exact error"
