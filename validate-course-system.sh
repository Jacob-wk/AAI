#!/bin/bash

echo "🔍 AAI Course System Validation"
echo "================================"

# Check critical files exist
echo "📁 Checking critical files..."

critical_files=(
    "snippets/product-form.liquid"
    "snippets/product-media.liquid"
    "snippets/course-access-simple.liquid"
    "assets/section-product-information.css"
    "assets/section-collection-courses.css"
    "assets/collection-courses.css"
    "templates/product.course.json"
    "templates/collection.courses.json"
    "sections/course-details-professional.liquid"
    "sections/aai-collection-courses-grid.liquid"
)

missing_files=()
for file in "${critical_files[@]}"; do
    if [[ -f "/workspaces/AAI/$file" ]]; then
        echo "✅ $file"
    else
        echo "❌ $file"
        missing_files+=("$file")
    fi
done

echo ""

# Summary
if [[ ${#missing_files[@]} -eq 0 ]]; then
    echo "🎉 All critical files are present!"
else
    echo "⚠️  Missing ${#missing_files[@]} critical files:"
    printf '%s\n' "${missing_files[@]}"
fi

echo ""
echo "✨ Course system validation complete!"