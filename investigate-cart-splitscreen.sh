#!/bin/bash

echo "🔍 COMPREHENSIVE CART SPLIT-SCREEN INVESTIGATION"
echo "================================================"

echo ""
echo "1. CHECKING CART PAGE TEMPLATE STRUCTURE:"
echo "==========================================="
echo "Cart template first 20 lines:"
head -20 /workspaces/AAI/templates/cart.liquid
echo ""
echo "Cart template last 10 lines:"
tail -10 /workspaces/AAI/templates/cart.liquid

echo ""
echo "2. CHECKING FOR CART DRAWER INCLUDES IN CART PAGE:"
echo "=================================================="
if grep -n "cart-drawer" /workspaces/AAI/templates/cart.liquid; then
    echo "❌ FOUND: Cart drawer is being included in cart page template!"
else
    echo "✅ Cart drawer not directly included in cart page template"
fi

echo ""
echo "3. CHECKING LAYOUT/THEME.LIQUID FOR GLOBAL CART DRAWER:"
echo "======================================================="
if grep -n "cart-drawer" /workspaces/AAI/layout/theme.liquid; then
    echo "❌ FOUND: Cart drawer globally included in theme layout!"
    echo "Lines containing cart-drawer in theme.liquid:"
    grep -n "cart-drawer" /workspaces/AAI/layout/theme.liquid
else
    echo "✅ Cart drawer not globally included in theme layout"
fi

echo ""
echo "4. CHECKING HEADER-ACTIONS FOR CART DRAWER INCLUSION:"
echo "====================================================="
echo "Header actions cart drawer section:"
grep -A 10 -B 5 "cart-drawer" /workspaces/AAI/snippets/header-actions.liquid

echo ""
echo "5. CHECKING CART-DRAWER.LIQUID TEMPLATE CONDITIONS:"
echo "=================================================="
echo "First 10 lines of cart-drawer.liquid:"
head -10 /workspaces/AAI/snippets/cart-drawer.liquid

echo ""
echo "6. CHECKING FOR TEMPLATE CONDITIONS IN CART PAGE:"
echo "==============================================="
if grep -n "template\." /workspaces/AAI/templates/cart.liquid; then
    echo "Template conditions found in cart.liquid:"
    grep -n "template\." /workspaces/AAI/templates/cart.liquid
else
    echo "✅ No template conditions found in cart page"
fi

echo ""
echo "7. CHECKING THEME LAYOUT FOR CONDITIONAL CART DRAWER:"
echo "===================================================="
if grep -A 20 -B 5 "{% include.*cart-drawer" /workspaces/AAI/layout/theme.liquid; then
    echo "Cart drawer conditional include found"
else
    echo "✅ No conditional cart drawer include in theme layout"
fi

echo ""
echo "8. CHECKING ALL FILES FOR CART-DRAWER REFERENCES:"
echo "==============================================="
echo "Files containing 'cart-drawer' references:"
find /workspaces/AAI -name "*.liquid" -exec grep -l "cart-drawer" {} \;

echo ""
echo "9. CHECKING JAVASCRIPT CART DRAWER INITIALIZATION:"
echo "==============================================="
if grep -n "cart-drawer" /workspaces/AAI/assets/cart-drawer.js | head -5; then
    echo "Cart drawer JS initialization found"
fi

echo ""
echo "10. CHECKING FOR GLOBAL CART DRAWER IN SNIPPETS:"
echo "=============================================="
find /workspaces/AAI/snippets -name "*cart*" -type f | while read file; do
    echo "File: $file"
    if grep -q "cart-drawer" "$file"; then
        echo "  Contains cart-drawer reference"
        grep -n "cart-drawer" "$file" | head -3
    fi
    echo ""
done

echo ""
echo "🎯 ANALYSIS COMPLETE - Check results above for conflicts"
