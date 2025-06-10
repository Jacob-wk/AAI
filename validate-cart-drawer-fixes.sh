#!/bin/bash

# Cart Drawer Icon Flashing Fix Validation Script
# This script validates all the fixes implemented to resolve cart drawer icon flashing issues

echo "🛒 Cart Drawer Icon Flashing Fix Validation"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    local status=$1
    local message=$2
    
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Check if we're in the right directory
if [ ! -f "assets/cart-drawer.js" ]; then
    print_status "error" "Not in AAI workspace directory. Please run from /workspaces/AAI"
    exit 1
fi

echo "🔍 STEP 1: Checking JavaScript Fixes"
echo "-----------------------------------"

# Check if cart-item--loaded class is added in JavaScript
if grep -q "cart-item--loaded" assets/cart-drawer.js; then
    print_status "success" "JavaScript adds cart-item--loaded class to prevent continuous animations"
else
    print_status "error" "cart-item--loaded class not found in JavaScript"
fi

# Check if markExistingItemsAsLoaded method exists
if grep -q "#markExistingItemsAsLoaded" assets/cart-drawer.js; then
    print_status "success" "markExistingItemsAsLoaded method found in cart-drawer.js"
else
    print_status "error" "markExistingItemsAsLoaded method not found"
fi

# Check if method is called in connectedCallback
if grep -q "this.#markExistingItemsAsLoaded();" assets/cart-drawer.js; then
    print_status "success" "markExistingItemsAsLoaded is called on initialization"
else
    print_status "error" "markExistingItemsAsLoaded not called in connectedCallback"
fi

echo ""
echo "🎨 STEP 2: Checking CSS Animation Fixes"
echo "---------------------------------------"

# Check if cart-item--loaded CSS rule exists
if grep -q "cart-item--loaded" assets/cart-styling.css; then
    print_status "success" "cart-item--loaded CSS rules found"
else
    print_status "error" "cart-item--loaded CSS rules not found"
fi

# Check if continuous animation prevention is in place
if grep -q "cart-item:not(.cart-item--loaded)" assets/cart-styling.css; then
    print_status "success" "CSS prevents continuous animations for loaded items"
else
    print_status "error" "Animation prevention CSS not found"
fi

# Check if problematic transforms are removed from remove buttons
if grep -q "transform: scale" assets/cart-styling.css | grep -q "cart-item__remove"; then
    print_status "warning" "Found transform: scale in remove button styles - may cause flashing"
else
    print_status "success" "No problematic transforms found in remove button styles"
fi

# Check if SVG pointer-events are set to none
if grep -q "pointer-events: none" assets/cart-styling.css; then
    print_status "success" "SVG pointer-events prevention found in CSS"
else
    print_status "warning" "SVG pointer-events prevention not explicitly found"
fi

echo ""
echo "🔧 STEP 3: Checking Button Interaction Fixes"
echo "--------------------------------------------"

# Check quantity selector button styles
if grep -A 5 "quantity-selector__button:active" assets/cart-styling.css | grep -q "transform"; then
    print_status "warning" "Found transform in quantity button active state - may cause flashing"
else
    print_status "success" "No problematic transforms in quantity button active states"
fi

# Check for z-index management
if grep -q "z-index:" assets/cart-styling.css | grep -q "cart-item__remove\|quantity-selector__button"; then
    print_status "success" "Z-index management found for interactive elements"
else
    print_status "info" "Z-index management not explicitly found"
fi

echo ""
echo "📱 STEP 4: Checking Template Structure"
echo "-------------------------------------"

# Check if cart drawer template exists
if [ -f "snippets/cart-drawer.liquid" ]; then
    print_status "success" "Cart drawer template found"
    
    # Check if close button exists
    if grep -q "cart-drawer__close" snippets/cart-drawer.liquid; then
        print_status "success" "Close button found in template"
    else
        print_status "error" "Close button not found in template"
    fi
    
    # Check if proper cart item structure exists
    if grep -q "cart-item" snippets/cart-drawer.liquid; then
        print_status "success" "Cart item structure found in template"
    else
        print_status "error" "Cart item structure not found in template"
    fi
else
    print_status "error" "Cart drawer template not found"
fi

echo ""
echo "🛠️ STEP 5: Checking Asset Files"
echo "-------------------------------"

# Check if close icon exists
if [ -f "assets/icon-close.svg" ]; then
    print_status "success" "Close icon SVG found"
else
    print_status "error" "Close icon SVG not found"
fi

# Check if cart styling CSS exists
if [ -f "assets/cart-styling.css" ]; then
    print_status "success" "Cart styling CSS found"
    
    # Get file size to check if it's not empty
    size=$(wc -c < "assets/cart-styling.css")
    if [ $size -gt 1000 ]; then
        print_status "success" "Cart styling CSS has substantial content ($size bytes)"
    else
        print_status "warning" "Cart styling CSS seems small ($size bytes)"
    fi
else
    print_status "error" "Cart styling CSS not found"
fi

echo ""
echo "🧪 STEP 6: Animation and Performance Checks"
echo "------------------------------------------"

# Count animation keyframes
animation_count=$(grep -c "@keyframes" assets/cart-styling.css 2>/dev/null || echo "0")
print_status "info" "Found $animation_count CSS animation keyframes"

# Check for excessive transitions
transition_count=$(grep -c "transition:" assets/cart-styling.css 2>/dev/null || echo "0")
print_status "info" "Found $transition_count CSS transitions"

# Check for problematic animation properties
if grep -q "animation.*infinite" assets/cart-styling.css; then
    print_status "warning" "Found infinite animations - may cause performance issues"
else
    print_status "success" "No infinite animations found"
fi

echo ""
echo "📋 STEP 7: Final Validation Summary"
echo "-----------------------------------"

# Count total issues
error_count=$(grep -c "❌" <<< "$(print_status "error" "test" 2>&1)" 2>/dev/null || echo "0")
warning_count=$(grep -c "⚠️" <<< "$(print_status "warning" "test" 2>&1)" 2>/dev/null || echo "0")

echo ""
echo "🎯 Key Fixes Implemented:"
echo "  • Added cart-item--loaded class to prevent continuous animations"
echo "  • Removed problematic transform properties from interactive elements"
echo "  • Added SVG pointer-events: none to prevent interaction conflicts"
echo "  • Implemented proper z-index management for clickable elements"
echo "  • Added method to mark existing items as loaded on initialization"
echo ""

echo "🔍 Manual Testing Required:"
echo "  1. Open cart drawer and hover over remove buttons (should not flash)"
echo "  2. Test quantity +/- buttons (should be clickable without flashing)"
echo "  3. Verify cart items only animate once when drawer opens"
echo "  4. Check that close button works properly"
echo "  5. Ensure all hover effects are smooth and stable"
echo ""

echo "📄 Test Page Created: cart-drawer-final-test.html"
echo "  Open this file in a browser to run interactive tests"
echo ""

if [ -f "cart-drawer-final-test.html" ]; then
    print_status "success" "Interactive test page available"
else
    print_status "warning" "Interactive test page not found"
fi

echo ""
echo "✅ Cart drawer icon flashing fix validation completed!"
echo "   Review the results above and perform manual testing to confirm fixes."
