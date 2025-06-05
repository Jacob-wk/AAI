#!/bin/bash
# AAI LMS Intuto Integration - Setup Validation Script
# This script validates that all components are ready for implementation

echo "🔍 AAI LMS Implementation Readiness Check"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Counters
READY_COUNT=0
TOTAL_COUNT=0

check_item() {
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if [ "$1" = "ready" ]; then
        echo -e "${GREEN}✅ $2${NC}"
        READY_COUNT=$((READY_COUNT + 1))
    elif [ "$1" = "pending" ]; then
        echo -e "${YELLOW}⏳ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

echo "📋 INFRASTRUCTURE READINESS"
echo "----------------------------"

# Check if template files exist
if [ -f "templates/product.course.liquid" ]; then
    check_item "ready" "Course product template exists"
else
    check_item "missing" "Course product template missing"
fi

if [ -f "templates/collection.courses.liquid" ]; then
    check_item "ready" "Courses collection template exists"
else
    check_item "missing" "Courses collection template missing"
fi

if [ -f "assets/collection-courses.css" ]; then
    check_item "ready" "Course collection CSS exists"
else
    check_item "missing" "Course collection CSS missing"
fi

if [ -f "assets/collection-courses.js" ]; then
    check_item "ready" "Course collection JavaScript exists"
else
    check_item "missing" "Course collection JavaScript missing"
fi

echo ""
echo "📦 CONFIGURATION FILES"
echo "----------------------"

if [ -f "scripts/shopify-metafields-bulk.liquid" ]; then
    check_item "ready" "Shopify metafields configuration ready"
else
    check_item "missing" "Shopify metafields configuration missing"
fi

if [ -f "scripts/tci-1-product-import.csv" ]; then
    check_item "ready" "TCI-1 product import CSV ready"
else
    check_item "missing" "TCI-1 product import CSV missing"
fi

if [ -f "scripts/intuto-shopify-automation.js" ]; then
    check_item "ready" "Automation system script ready"
else
    check_item "missing" "Automation system script missing"
fi

echo ""
echo "🔧 INTEGRATION COMPONENTS"
echo "-------------------------"

check_item "pending" "Shopify metafields setup (requires Shopify Admin)"
check_item "pending" "Code Selling App configuration (requires app access)"
check_item "pending" "Intuto API credentials (requires Intuto admin)"
check_item "pending" "TCI-1 Multi Token generation (requires Intuto)"

echo ""
echo "🎯 IMMEDIATE ACTION ITEMS"
echo "------------------------"

check_item "pending" "Import TCI-1 product to Shopify"
check_item "pending" "Set up Code Selling App token pool"
check_item "pending" "Test complete purchase workflow"
check_item "pending" "Validate course access delivery"

echo ""
echo "🚀 NEXT PHASE PREPARATION"
echo "-------------------------"

check_item "pending" "Intuto webhook endpoint deployment"
check_item "pending" "Environment variables configuration"
check_item "pending" "Production API testing"
check_item "pending" "Course creator documentation"

echo ""
echo "📊 READINESS SUMMARY"
echo "======================"

READY_PERCENTAGE=$((READY_COUNT * 100 / TOTAL_COUNT))

echo "Ready: $READY_COUNT/$TOTAL_COUNT ($READY_PERCENTAGE%)"
echo ""

if [ $READY_PERCENTAGE -ge 80 ]; then
    echo -e "${GREEN}🎉 EXCELLENT! Infrastructure is ready for implementation.${NC}"
    echo ""
    echo "Next Steps:"
    echo "1. Set up Shopify metafields using scripts/shopify-metafields-bulk.liquid"
    echo "2. Import TCI-1 product using scripts/tci-1-product-import.csv"
    echo "3. Configure Code Selling App with TCI-1 token pool"
    echo "4. Test purchase workflow end-to-end"
elif [ $READY_PERCENTAGE -ge 60 ]; then
    echo -e "${YELLOW}⚠️  GOOD PROGRESS! Most components ready.${NC}"
    echo "Complete missing infrastructure components before proceeding."
elif [ $READY_PERCENTAGE -ge 40 ]; then
    echo -e "${YELLOW}⚠️  PARTIAL READINESS. More work needed.${NC}"
    echo "Focus on completing core infrastructure first."
else
    echo -e "${RED}❌ NOT READY. Significant work required.${NC}"
    echo "Complete infrastructure setup before implementation."
fi

echo ""
echo "📁 KEY FILES FOR IMPLEMENTATION"
echo "===============================:"

echo ""
echo "For Shopify Admin:"
echo "• scripts/shopify-metafields-bulk.liquid (metafields setup)"
echo "• scripts/tci-1-product-import.csv (product import)"
echo ""
echo "For Development:"
echo "• scripts/intuto-shopify-automation.js (automation system)"
echo "• AAI_LMS_IMPLEMENTATION_ROADMAP.md (complete guide)"
echo ""
echo "For Testing:"
echo "• Test TCI-1 purchase workflow"
echo "• Verify Code Selling App delivery"
echo "• Validate Intuto course access"

echo ""
echo "🔗 INTEGRATION ARCHITECTURE"
echo "==========================="
echo ""
echo "Customer Journey:"
echo "Browse Courses → Purchase → Email Delivery → Intuto Access → Course Completion"
echo ""
echo "Technical Flow:"
echo "Intuto Course → Webhook → Shopify Product → Code Selling App → Customer Delivery"
echo ""
echo "Multi-Creator Support:"
echo "Course Creator → Intuto → Auto Product Creation → Immediate Sales Availability"

echo ""
echo -e "${GREEN}✨ Ready to launch AAI LMS with TCI-1 course!${NC}"
