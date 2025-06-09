#!/bin/bash

echo "🕵️ Cart Drawer Split-Screen Issue Diagnosis"
echo "==========================================="

echo ""
echo "1. Checking cart drawer dialog CSS..."
echo "--------------------------------------"
grep -A 10 -B 2 "cart-drawer__dialog" assets/cart-styling.css | head -20

echo ""
echo "2. Checking if cart drawer is correctly positioned as overlay..."
echo "--------------------------------------------------------------"
grep -A 5 "position.*fixed\|z-index.*10000" assets/cart-styling.css

echo ""
echo "3. Checking for any conflicting CSS rules..."
echo "-------------------------------------------"
find . -name "*.css" -exec grep -l "position.*fixed" {} \; | head -5

echo ""
echo "4. Checking cart drawer template structure..."
echo "-------------------------------------------"
head -10 snippets/cart-drawer.liquid

echo ""
echo "5. Checking for any inline styles in header-actions..."
echo "----------------------------------------------------"
grep -n "style\|<style" snippets/header-actions.liquid || echo "No inline styles found"

echo ""
echo "6. Testing if cart drawer is a proper web component..."
echo "----------------------------------------------------"
grep -A 5 -B 5 "customElements.define" assets/cart-drawer.js

echo ""
echo "Analysis Summary:"
echo "================"
echo "The cart drawer should:"
echo "- Use position: fixed with full viewport coverage"
echo "- Have overlay background and content panel on right"
echo "- Slide in from translateX(100%) to translateX(0)"
echo "- Not show as split-screen or separate page"

