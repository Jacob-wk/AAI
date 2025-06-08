#!/bin/bash

# Cart Styling Validation Script
# Validates that cart styling is properly consolidated and working

echo "🛒 Validating Cart Styling Implementation..."

# Check if main cart CSS file exists
if [ -f "/workspaces/AAI/assets/cart-styling.css" ]; then
    echo "✅ Main cart-styling.css file exists"
else
    echo "❌ Main cart-styling.css file missing"
    exit 1
fi

# Check if old fixes file was removed
if [ -f "/workspaces/AAI/assets/cart-styling-fixes.css" ]; then
    echo "⚠️  Old cart-styling-fixes.css file still exists - should be removed"
else
    echo "✅ Old cart-styling-fixes.css file properly removed"
fi

# Check if cart CSS is included in theme.liquid
if grep -q "cart-styling.css" /workspaces/AAI/layout/theme.liquid; then
    echo "✅ cart-styling.css properly included in theme.liquid"
else
    echo "❌ cart-styling.css not found in theme.liquid"
fi

# Check if cart CSS is included in main-cart section
if grep -q "cart-styling.css" /workspaces/AAI/sections/main-cart.liquid; then
    echo "✅ cart-styling.css properly included in main-cart section"
else
    echo "❌ cart-styling.css not found in main-cart section"
fi

# Check for any remaining references to the old fixes file
echo "🔍 Checking for any remaining references to old fixes file..."
if grep -r "cart-styling-fixes" /workspaces/AAI --exclude-dir=.git 2>/dev/null; then
    echo "⚠️  Found references to old cart-styling-fixes file"
else
    echo "✅ No references to old cart-styling-fixes file found"
fi

# Validate CSS syntax
echo "🔍 Validating CSS syntax..."
if command -v stylelint >/dev/null 2>&1; then
    stylelint /workspaces/AAI/assets/cart-styling.css
else
    echo "ℹ️  stylelint not available - skipping CSS validation"
fi

# Check for comprehensive cart styling coverage
echo "🔍 Checking cart styling coverage..."

REQUIRED_SELECTORS=(
    ".cart-drawer"
    ".cart-page"
    ".cart-items__table-row"
    ".cart-items__media"
    ".cart-items__details"
    ".cart-items__quantity"
    ".cart-items__price"
    ".cart__checkout-button"
    ".cart__summary-totals"
    ".cart-items__remove"
)

for selector in "${REQUIRED_SELECTORS[@]}"; do
    if grep -q "$selector" /workspaces/AAI/assets/cart-styling.css; then
        echo "✅ $selector styling found"
    else
        echo "❌ $selector styling missing"
    fi
done

# Check for responsive design
if grep -q "@media.*max-width.*767px" /workspaces/AAI/assets/cart-styling.css; then
    echo "✅ Mobile responsive styles found"
else
    echo "❌ Mobile responsive styles missing"
fi

# Check for AAI branding
if grep -q "#005a9f\|--color-accent" /workspaces/AAI/assets/cart-styling.css; then
    echo "✅ AAI brand colors found in cart styling"
else
    echo "⚠️  AAI brand colors not found in cart styling"
fi

echo ""
echo "🏁 Cart styling validation complete!"
