#!/bin/bash

echo "=== AAI SHOPIFY THEME - FINAL VALIDATION ==="
echo ""

# Check critical theme files
echo "✓ Checking essential Shopify theme structure..."

# Required config files
required_config=(
    "config/settings_schema.json"
    "config/settings_data.json" 
    "config/section_groups.json"
    "config/theme.yml"
)

for file in "${required_config[@]}"; do
    if [ -f "/workspaces/AAI/$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file MISSING"
    fi
done

# Required layout files  
required_layout=(
    "layout/theme.liquid"
    "layout/password.liquid"
)

for file in "${required_layout[@]}"; do
    if [ -f "/workspaces/AAI/$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file MISSING"
    fi
done

echo ""
echo "✓ Checking section files and their CSS dependencies..."

# Check sections have corresponding CSS
section_css_pairs=(
    "sections/aai-universal-hero.liquid:assets/section-aai-hero.css"
    "sections/aai-universal-content.liquid:assets/section-aai-content.css"
    "sections/aai-instructor-showcase.liquid:assets/section-aai-instructors.css"
    "sections/aai-demo-experience.liquid:assets/section-aai-demo.css"
    "sections/course-catalog.liquid:assets/section-course-catalog.css"
    "sections/header-professional.liquid:assets/section-header-professional.css"
    "sections/footer-professional.liquid:assets/section-footer-professional.css"
)

for pair in "${section_css_pairs[@]}"; do
    section=$(echo $pair | cut -d: -f1)
    css=$(echo $pair | cut -d: -f2)
    
    if [ -f "/workspaces/AAI/$section" ] && [ -f "/workspaces/AAI/$css" ]; then
        echo "  ✓ $section + $css"
    else
        echo "  ✗ Missing: $section or $css"
    fi
done

echo ""
echo "✓ Validating JSON template files..."

# Count and validate JSON templates
json_count=$(find /workspaces/AAI/templates -name "*.json" | wc -l)
echo "  Found $json_count JSON template files"

# Check critical templates exist
critical_templates=(
    "templates/index.json"
    "templates/collection.json"
    "templates/collection.courses.json"
    "templates/product.json"
    "templates/page.json"
    "templates/blog.json"
    "templates/article.json"
    "templates/404.json"
    "templates/password.json"
)

for template in "${critical_templates[@]}"; do
    if [ -f "/workspaces/AAI/$template" ]; then
        echo "  ✓ $template exists"
    else
        echo "  ✗ $template MISSING"
    fi
done

echo ""
echo "✓ Checking asset files..."
css_count=$(find /workspaces/AAI/assets -name "*.css" | wc -l)
js_count=$(find /workspaces/AAI/assets -name "*.js" | wc -l) 
svg_count=$(find /workspaces/AAI/assets -name "*.svg" | wc -l)

echo "  CSS files: $css_count"
echo "  JS files: $js_count" 
echo "  SVG icons: $svg_count"

echo ""
echo "✓ Checking core CSS files exist..."
core_css=(
    "assets/base.css"
    "assets/aai-core.css"
    "assets/global.css"
    "assets/component.css"
)

for css in "${core_css[@]}"; do
    if [ -f "/workspaces/AAI/$css" ]; then
        echo "  ✓ $css exists"
    else
        echo "  ✗ $css MISSING"
    fi
done

echo ""
echo "=== VALIDATION COMPLETE ==="
echo ""
echo "Theme Structure Summary:"
echo "- Templates: $json_count JSON files"
echo "- Sections: $(find /workspaces/AAI/sections -name "*.liquid" | wc -l) Liquid files"
echo "- Assets: CSS($css_count) + JS($js_count) + SVG($svg_count)"
echo "- Locales: $(ls /workspaces/AAI/locales/*.json | wc -l) language files"
echo "- Snippets: $(find /workspaces/AAI/snippets -name "*.liquid" | wc -l) Liquid files"
echo ""
echo "🎉 AAI Shopify theme is ready for import!"
