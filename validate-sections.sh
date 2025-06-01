#!/bin/bash

echo "=== SHOPIFY THEME SECTION VALIDATION ==="
echo ""

# Get all section types referenced in templates
echo "✓ Checking section type references..."
referenced_sections=$(grep -r '"type":' /workspaces/AAI/templates/ | grep -v '"text_block"' | grep -v '"feature_list"' | grep -v '"statistic"' | grep -v '"instructor"' | grep -v '"credential_grid"' | grep -v '"feature"' | grep -v '"content_block"' | sed 's/.*"type": *"//' | sed 's/".*//' | sort | uniq)

# Get all actual section files
echo "✓ Checking actual section files..."
actual_sections=$(find /workspaces/AAI/sections -name "*.liquid" -exec basename {} .liquid \; | sort)

echo ""
echo "REFERENCED SECTIONS IN TEMPLATES:"
for section in $referenced_sections; do
    echo "  - $section"
done

echo ""
echo "ACTUAL SECTION FILES:"
for section in $actual_sections; do
    echo "  - $section"
done

echo ""
echo "MISSING SECTIONS (referenced but no file):"
for section in $referenced_sections; do
    if [ ! -f "/workspaces/AAI/sections/$section.liquid" ]; then
        echo "  ✗ $section.liquid MISSING"
    fi
done

echo ""
echo "AVAILABLE SECTIONS (file exists):"
for section in $referenced_sections; do
    if [ -f "/workspaces/AAI/sections/$section.liquid" ]; then
        echo "  ✓ $section.liquid exists"
    fi
done

echo ""
echo "=== TEMPLATE VALIDATION COMPLETE ==="
