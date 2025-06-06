#!/bin/bash

echo "=== AAI Collection Debug Test ==="
echo "Testing collection page functionality..."
echo ""

# Check if key files exist
echo "1. Checking template files..."
if [ -f "/workspaces/AAI/templates/collection.courses.json" ]; then
    echo "✓ collection.courses.json exists"
else
    echo "✗ collection.courses.json missing"
fi

if [ -f "/workspaces/AAI/sections/main-collection.liquid" ]; then
    echo "✓ main-collection.liquid exists"
else
    echo "✗ main-collection.liquid missing"
fi

if [ -f "/workspaces/AAI/sections/aai-collection-courses-hero.liquid" ]; then
    echo "✓ aai-collection-courses-hero.liquid exists"
else
    echo "✗ aai-collection-courses-hero.liquid missing"
fi

echo ""
echo "2. Checking for syntax issues..."

# Check for liquid syntax issues
echo "Checking main-collection.liquid..."
grep -n "collections\..*\.products_count" /workspaces/AAI/sections/main-collection.liquid || echo "✓ No problematic dynamic references in main-collection"

echo "Checking hero section..."
grep -n "collections\..*\.products_count" /workspaces/AAI/sections/aai-collection-courses-hero.liquid || echo "✓ No problematic dynamic references in hero"

echo ""
echo "3. Checking collection template structure..."
cat /workspaces/AAI/templates/collection.courses.json

echo ""
echo "=== Debug Summary ==="
echo "If the collection page is still not working:"
echo "1. Verify 'courses' collection exists in Shopify Admin"
echo "2. Check that the collection has products assigned"
echo "3. Ensure collection is published and visible"
echo "4. Test with simplified template: collection.courses.test.json"
echo ""
echo "Current template uses:"
echo "- Hero section: aai-collection-courses-hero"
echo "- Main section: main-collection (standard Shopify)"
echo ""
