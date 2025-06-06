#!/bin/bash

echo "=== Collection Page Troubleshooting ==="
echo ""

echo "1. Checking collection template structure..."
if [ -f "/workspaces/AAI/templates/collection.courses.json" ]; then
    echo "✅ collection.courses.json exists"
    
    # Check if main section is properly configured
    if grep -q '"type": "main-collection"' "/workspaces/AAI/templates/collection.courses.json"; then
        echo "✅ main-collection section is configured"
    else
        echo "❌ main-collection section is missing"
    fi
    
    # Check JSON validity
    if python3 -m json.tool "/workspaces/AAI/templates/collection.courses.json" > /dev/null 2>&1; then
        echo "✅ JSON structure is valid"
    else
        echo "❌ JSON structure has errors"
    fi
else
    echo "❌ collection.courses.json is missing"
fi

echo ""
echo "2. Checking required sections..."
sections=("main-collection" "aai-collection-courses-hero")
for section in "${sections[@]}"; do
    if [ -f "/workspaces/AAI/sections/${section}.liquid" ]; then
        echo "✅ ${section}.liquid exists"
    else
        echo "❌ ${section}.liquid is missing"
    fi
done

echo ""
echo "3. Checking CSS assets..."
css_files=("section-collection-courses.css" "collection-courses.css")
for css in "${css_files[@]}"; do
    if [ -f "/workspaces/AAI/assets/${css}" ]; then
        echo "✅ ${css} exists"
    else
        echo "❌ ${css} is missing"
    fi
done

echo ""
echo "4. Collection template content preview:"
echo "----------------------------------------"
head -20 "/workspaces/AAI/templates/collection.courses.json"
echo "----------------------------------------"

echo ""
echo "=== Troubleshooting Complete ==="
