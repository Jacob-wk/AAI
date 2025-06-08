#!/bin/bash

# Cart Styling Validation Script for AAI Professional Safety Education
# Tests the new clean cart drawer styling implementation

echo "🛒 Validating Cart Drawer Styling..."
echo "=================================="

# Check if cart styling file exists and is valid
if [ -f "/workspaces/AAI/assets/cart-styling.css" ]; then
    echo "✅ Cart styling file exists"
    
    # Check file size
    size=$(stat -c%s "/workspaces/AAI/assets/cart-styling.css")
    echo "📏 File size: $size bytes"
    
    # Validate CSS syntax
    echo "🔍 Checking CSS syntax..."
    if command -v css-validator &> /dev/null; then
        css-validator /workspaces/AAI/assets/cart-styling.css
    else
        echo "⚠️  CSS validator not available, checking basic syntax..."
        # Basic check for unmatched braces
        open_braces=$(grep -o "{" /workspaces/AAI/assets/cart-styling.css | wc -l)
        close_braces=$(grep -o "}" /workspaces/AAI/assets/cart-styling.css | wc -l)
        
        if [ "$open_braces" -eq "$close_braces" ]; then
            echo "✅ Balanced braces: $open_braces opening, $close_braces closing"
        else
            echo "❌ Unbalanced braces: $open_braces opening, $close_braces closing"
            exit 1
        fi
    fi
else
    echo "❌ Cart styling file not found"
    exit 1
fi

# Check if cart styling is integrated in main-cart.liquid
echo ""
echo "🔗 Checking integration..."
if grep -q "cart-styling.css" /workspaces/AAI/sections/main-cart.liquid; then
    echo "✅ Cart styling integrated in main-cart.liquid"
else
    echo "❌ Cart styling not integrated in main-cart.liquid"
    exit 1
fi

# Check cart drawer structure
echo ""
echo "🏗️  Checking cart drawer structure..."
if [ -f "/workspaces/AAI/snippets/cart-drawer.liquid" ]; then
    echo "✅ Cart drawer component exists"
    
    # Check for key cart drawer elements
    if grep -q "cart-drawer__dialog" /workspaces/AAI/snippets/cart-drawer.liquid; then
        echo "✅ Cart drawer dialog found"
    else
        echo "⚠️  Cart drawer dialog not found"
    fi
    
    if grep -q "cart-drawer__items" /workspaces/AAI/snippets/cart-drawer.liquid; then
        echo "✅ Cart drawer items container found"
    else
        echo "⚠️  Cart drawer items container not found"
    fi
    
    if grep -q "cart-drawer__summary" /workspaces/AAI/snippets/cart-drawer.liquid; then
        echo "✅ Cart drawer summary found"
    else
        echo "⚠️  Cart drawer summary not found"
    fi
else
    echo "❌ Cart drawer component not found"
    exit 1
fi

# Check cart products structure
echo ""
echo "📦 Checking cart products structure..."
if [ -f "/workspaces/AAI/snippets/cart-products.liquid" ]; then
    echo "✅ Cart products component exists"
    
    # Check for key cart items elements
    if grep -q "cart-items__table-row" /workspaces/AAI/snippets/cart-products.liquid; then
        echo "✅ Cart items table row found"
    else
        echo "⚠️  Cart items table row not found"
    fi
    
    if grep -q "cart-items__media" /workspaces/AAI/snippets/cart-products.liquid; then
        echo "✅ Cart items media found"
    else
        echo "⚠️  Cart items media not found"
    fi
    
    if grep -q "cart-items__quantity" /workspaces/AAI/snippets/cart-products.liquid; then
        echo "✅ Cart items quantity found"
    else
        echo "⚠️  Cart items quantity not found"
    fi
else
    echo "❌ Cart products component not found"
    exit 1
fi

# Validate key CSS selectors are present
echo ""
echo "🎨 Validating CSS selectors..."
selectors=(
    ".cart-drawer__dialog"
    ".cart-drawer__header" 
    ".cart-drawer__items"
    ".cart-drawer__summary"
    ".cart-items__table-row"
    ".cart-items__media-container"
    ".cart-items__quantity"
    ".quantity-selector"
    ".cart__checkout-button"
)

for selector in "${selectors[@]}"; do
    if grep -q "$selector" /workspaces/AAI/assets/cart-styling.css; then
        echo "✅ $selector styles found"
    else
        echo "⚠️  $selector styles missing"
    fi
done

# Check for responsive design
echo ""
echo "📱 Checking responsive design..."
if grep -q "@media (max-width: 768px)" /workspaces/AAI/assets/cart-styling.css; then
    echo "✅ Mobile responsive styles found"
else
    echo "⚠️  Mobile responsive styles missing"
fi

# Check for accessibility features
echo ""
echo "♿ Checking accessibility features..."
if grep -q "focus" /workspaces/AAI/assets/cart-styling.css; then
    echo "✅ Focus states found"
else
    echo "⚠️  Focus states missing"
fi

if grep -q "outline" /workspaces/AAI/assets/cart-styling.css; then
    echo "✅ Outline styles found"
else
    echo "⚠️  Outline styles missing"
fi

echo ""
echo "📊 Validation Summary"
echo "===================="
echo "✨ Cart drawer styling validation complete!"
echo "🎯 Clean, focused styling that respects drawer architecture"
echo "🚀 Ready for testing and deployment"
echo ""
echo "Next Steps:"
echo "1. Test cart drawer functionality in browser"
echo "2. Add products to cart to test item display"
echo "3. Test quantity changes and item removal"
echo "4. Verify mobile responsiveness"
echo "5. Test accessibility with keyboard navigation"
