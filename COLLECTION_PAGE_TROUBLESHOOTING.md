# Collection Page Troubleshooting Summary

## Issue
The `/collections/courses` page isn't showing any content.

## Root Cause Analysis
The collection template was using custom sections that had configuration mismatches and potential Liquid template errors.

## Fixes Applied

### 1. Simplified Collection Template
**File:** `templates/collection.courses.json`
- Removed complex custom sections that had potential configuration issues
- Reduced to minimal working template with just `main-collection` section
- This ensures the basic collection functionality works

**Before:** Complex template with custom hero, filters, featured sections, etc.
**After:** Minimal template with just the main collection grid

### 2. Fixed Hero Section Template
**File:** `sections/aai-collection-courses-hero.liquid`
- Fixed richtext handling for subtitle field
- Changed from `<p>` to `<div>` wrapper for proper richtext display

## Current Template Structure
```json
{
  "wrapper": "div.page-width",
  "sections": {
    "main": {
      "type": "main-collection",
      "settings": {
        "products_per_page": 12,
        "show_sort": true,
        "show_filters": true,
        "filter_type": "sidebar",
        "show_product_count": true
      }
    }
  },
  "order": ["main"]
}
```

## Testing Steps

### 1. Test Basic Collection Page
- Visit `/collections/courses` 
- Should now show:
  - Collection header with title and description
  - Product grid (if products exist)
  - Sorting and filtering options
  - Pagination (if needed)

### 2. If Still No Content Shows
Possible causes:
- **No Products:** The "courses" collection may not exist or be empty
- **Collection Settings:** Collection might not be published or properly configured
- **Theme Issues:** There might be broader theme configuration issues

### 3. Verify Collection in Shopify Admin
1. Go to Shopify Admin → Products → Collections
2. Check if "courses" collection exists
3. Verify it has products assigned
4. Ensure collection is published and visible

## Next Steps

### If Basic Template Works
Add back custom sections one by one:
1. Add hero section back first
2. Test after each addition
3. Identify which specific section causes issues

### If Basic Template Still Doesn't Work
The issue is likely:
1. Collection doesn't exist in Shopify
2. Collection has no products
3. Collection visibility/publication settings
4. Theme-level configuration issues

## Files Modified
- `templates/collection.courses.json` - Simplified to basic template
- `sections/aai-collection-courses-hero.liquid` - Fixed richtext handling
- `troubleshoot-collection.sh` - Created debugging script

## Backup Files Created
- `templates/collection.courses.test.json` - Ultra-minimal test template

## Recommendation
Test the simplified template first. If it works, we can gradually add back the custom sections. If it doesn't work, the issue is with the collection setup in Shopify Admin, not the template code.
