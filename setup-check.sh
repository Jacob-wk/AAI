#!/bin/bash
# AAI LMS Pages - Quick Setup Script
# This script helps verify that all implementation files are in place

echo "🎯 AAI LMS Pages Implementation Check"
echo "======================================"

# Check template files
echo ""
echo "📄 Template Files:"
if [ -f "templates/page.join.liquid" ]; then
    echo "✅ page.join.liquid - EXISTS"
else
    echo "❌ page.join.liquid - MISSING"
fi

if [ -f "templates/page.join.json" ]; then
    echo "✅ page.join.json - EXISTS"
else
    echo "❌ page.join.json - MISSING"
fi

if [ -f "templates/page.courses-development.liquid" ]; then
    echo "✅ page.courses-development.liquid - EXISTS"
else
    echo "❌ page.courses-development.liquid - MISSING"
fi

if [ -f "templates/page.courses-development.json" ]; then
    echo "✅ page.courses-development.json - EXISTS"
else
    echo "❌ page.courses-development.json - MISSING"
fi

# Check section files
echo ""
echo "🧩 Section Files:"
if [ -f "sections/featured-courses.liquid" ]; then
    echo "✅ featured-courses.liquid - EXISTS"
else
    echo "❌ featured-courses.liquid - MISSING"
fi

# Check CSS files
echo ""
echo "🎨 Stylesheet Files:"
if [ -f "assets/aai-featured-courses.css" ]; then
    echo "✅ aai-featured-courses.css - EXISTS"
else
    echo "❌ aai-featured-courses.css - MISSING"
fi

# Check documentation
echo ""
echo "📚 Documentation:"
if [ -f "AAI_LMS_IMPLEMENTATION_GUIDE.md" ]; then
    echo "✅ Implementation Guide - EXISTS"
else
    echo "❌ Implementation Guide - MISSING"
fi

echo ""
echo "🚀 Next Steps:"
echo "1. Create pages in Shopify admin (/admin/pages)"
echo "2. Set templates: 'Join AAI' → page.join, 'Courses in Development' → page.courses-development" 
echo "3. Add navigation links to new pages"
echo "4. Customize content through theme editor - all content is editable!"
echo "5. Simple contact forms route to standard Shopify contact"
echo ""
echo "📖 See AAI_LMS_IMPLEMENTATION_GUIDE.md for detailed instructions"
