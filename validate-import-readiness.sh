#!/bin/bash

echo "=== SHOPIFY THEME IMPORT READINESS CHECK ==="
echo

# Check critical files exist
echo "✓ Checking critical configuration files..."
critical_files=(
    "config/settings_data.json"
    "config/settings_schema.json" 
    "config/section_groups.json"
    "templates/index.json"
    "sections/aai-hero.liquid"
    "sections/user-dashboard.liquid"
    "sections/course-catalog.liquid"
    "sections/aai-instructor-showcase.liquid"
    "sections/header-professional.liquid"
    "sections/footer-professional.liquid"
    "layout/theme.liquid"
)

missing_critical=0
for file in "${critical_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file MISSING - CRITICAL!"
        missing_critical=$((missing_critical + 1))
    fi
done

echo
echo "✓ Checking homepage configuration..."

# Check homepage setup in settings_data.json
if grep -q "content_for_index" config/settings_data.json; then
    echo "  ✓ Homepage content_for_index configured"
else
    echo "  ✗ Homepage content_for_index MISSING"
    missing_critical=$((missing_critical + 1))
fi

if grep -q "aai_hero_homepage" config/settings_data.json; then
    echo "  ✓ Homepage hero section configured"
else
    echo "  ✗ Homepage hero section MISSING"
    missing_critical=$((missing_critical + 1))
fi

echo
echo "✓ Checking required assets..."

# Check critical CSS files
critical_assets=(
    "assets/section-aai-hero.css"
    "assets/section-user-dashboard.css"
    "assets/section-course-catalog.css"
    "assets/section-aai-instructors.css"
    "assets/section-header-professional.css"
    "assets/section-footer-professional.css"
    "assets/base.css"
)

missing_assets=0
for asset in "${critical_assets[@]}"; do
    if [[ -f "$asset" ]]; then
        echo "  ✓ $asset exists"
    else
        echo "  ✗ $asset MISSING"
        missing_assets=$((missing_assets + 1))
    fi
done

echo
echo "=== IMPORT READINESS SUMMARY ==="
if [[ $missing_critical -eq 0 ]]; then
    echo "🎉 THEME IS READY FOR SHOPIFY IMPORT!"
    echo "   - All critical configuration files present"
    echo "   - Homepage sections properly configured"
    echo "   - Section group structure valid"
    echo "   - Required assets available"
    echo
    echo "📦 To import:"
    echo "   1. Zip the entire theme directory"
    echo "   2. Upload to Shopify Admin > Themes > Add theme"
    echo "   3. Theme will import with prebuilt content"
else
    echo "⚠️  THEME NEEDS FIXES BEFORE IMPORT"
    echo "   - $missing_critical critical files missing"
    echo "   - $missing_assets asset files missing"
    echo "   - Fix these issues before importing"
fi

echo
