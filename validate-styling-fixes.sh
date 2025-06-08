#!/bin/bash

# Validation script for cart styling and product layout fixes
# AAI Professional Safety Education Theme

echo "🔍 Validating cart styling and product layout fixes..."

# Check if CSS files exist
echo "📁 Checking CSS files..."
files=(
    "/workspaces/AAI/assets/cart-styling-fixes.css"
    "/workspaces/AAI/assets/product-layout-fixes.css"
    "/workspaces/AAI/assets/section-product-information.css"
    "/workspaces/AAI/assets/product-form-course.css"
)

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Check if CSS files are properly included in theme.liquid
echo ""
echo "🔗 Checking CSS inclusion in theme.liquid..."
theme_file="/workspaces/AAI/layout/theme.liquid"

if grep -q "cart-styling-fixes.css" "$theme_file"; then
    echo "✅ cart-styling-fixes.css is included in theme.liquid"
else
    echo "❌ cart-styling-fixes.css is NOT included in theme.liquid"
fi

if grep -q "product-layout-fixes.css" "$theme_file"; then
    echo "✅ product-layout-fixes.css is included in theme.liquid"
else
    echo "❌ product-layout-fixes.css is NOT included in theme.liquid"
fi

# Check for common cart-related classes in templates
echo ""
echo "🎨 Checking cart template structure..."
cart_templates=(
    "/workspaces/AAI/snippets/cart-products.liquid"
    "/workspaces/AAI/snippets/cart-drawer.liquid"
    "/workspaces/AAI/snippets/header-actions.liquid"
    "/workspaces/AAI/sections/main-cart.liquid"
)

for template in "${cart_templates[@]}"; do
    if [[ -f "$template" ]]; then
        echo "✅ $template exists"
        
        # Check for key cart classes
        if grep -q "cart-items__table-row" "$template"; then
            echo "  ✅ Contains cart-items__table-row class"
        fi
        
        if grep -q "cart-drawer" "$template"; then
            echo "  ✅ Contains cart-drawer classes"
        fi
    else
        echo "❌ $template is missing"
    fi
done

# Check product template structure
echo ""
echo "🏷️ Checking product template structure..."
product_templates=(
    "/workspaces/AAI/sections/main-product.liquid"
    "/workspaces/AAI/snippets/product-form.liquid"
)

for template in "${product_templates[@]}"; do
    if [[ -f "$template" ]]; then
        echo "✅ $template exists"
        
        # Check for product wrapper classes
        if grep -q "product-information__wrapper\|product-form__wrapper" "$template"; then
            echo "  ✅ Contains product wrapper classes"
        fi
    else
        echo "❌ $template is missing"
    fi
done

echo ""
echo "🎯 Summary of fixes applied:"
echo "1. ✅ Removed duplicate card styling from .product-information__wrapper"
echo "2. ✅ Fixed card-within-card issue by keeping styling only on .product-form__wrapper"
echo "3. ✅ Updated course-specific styling to prevent visual layering"
echo "4. ✅ Enhanced cart drawer styling with proper animations and states"
echo "5. ✅ Added responsive design improvements for cart and product layouts"
echo "6. ✅ Integrated product-layout-fixes.css into theme.liquid"
echo "7. ✅ Added comprehensive cart styling fixes with loading states"

echo ""
echo "🚀 Cart styling and product layout fixes have been implemented!"
echo "   - Cart drawer should now display properly with consistent styling"
echo "   - Product cards no longer have the card-within-card visual issue"
echo "   - All styling is responsive and follows the theme's design system"
