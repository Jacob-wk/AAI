# Dynamic Tag-Based Course Categories Implementation

## Overview
Replaced hardcoded course categories with a dynamic, tag-based system that automatically generates categories from actual product tags.

## Benefits of Dynamic Categories

### ✅ **No Hardcoding**
- Categories are automatically generated from product tags
- No manual template updates needed when adding new course types
- Scales automatically with your product catalog

### ✅ **Real-Time Updates**
- Categories update immediately when products are tagged
- Category counts reflect actual available courses
- No maintenance required

### ✅ **Flexible & Scalable**
- Merchants can add any tags they want
- System adapts to any course categorization scheme
- Works with any number of categories

## Implementation Details

### 1. **Main Collection Template**
**File:** `templates/collection.courses.json`
- Uses native Shopify `main-collection` section
- Includes built-in tag filtering and sorting
- Clean, minimal structure focusing on functionality

### 2. **Dynamic Categories Section**
**File:** `sections/aai-collection-courses-categories-dynamic.liquid`
- Automatically scans all products in the courses collection
- Extracts unique tags and creates category cards
- Shows course count for each category
- Links to filtered collection views

### 3. **Hero Section**
**File:** `sections/aai-collection-courses-hero.liquid`
- Professional header with statistics
- Configurable through theme customizer
- No hardcoded content

## How It Works

### Tag Collection Process
```liquid
{% assign course_tags = '' | split: ',' %}
{% for product in collections.courses.products %}
  {% for tag in product.tags %}
    {% unless course_tags contains tag %}
      {% assign course_tags = course_tags | append: tag | split: ',' %}
    {% endunless %}
  {% endfor %}
{% endfor %}
```

### Dynamic Category Display
- Loops through collected tags
- Counts products for each tag
- Creates category cards with proper links
- Uses Shopify's native filtering URLs

### URL Structure
Categories link to: `/collections/courses?filter.p.tag=TAGNAME`
- Uses Shopify's standard filtering system
- SEO-friendly URLs
- Works with existing search and sort features

## Usage for Merchants

### Adding New Course Categories
1. Simply add tags to course products in Shopify Admin
2. Categories appear automatically on the collection page
3. No code changes required

### Tag Examples
- `safety-management`
- `operations`
- `maintenance`
- `leadership`
- `beginner`
- `advanced`
- `ceu-eligible`

### Best Practices
- Use consistent tag naming (kebab-case recommended)
- Keep tag names user-friendly (they'll be displayed)
- Consider both topic tags and meta tags (level, certification type, etc.)

## Template Structure
```json
{
  "sections": {
    "aai_collection_hero": "Course header with stats",
    "main": "Native Shopify collection with filtering",
    "dynamic_categories": "Auto-generated tag-based categories"
  }
}
```

## Configuration Options
- Maximum categories to display (4-12)
- Section title and description
- All configurable through theme customizer

## Future Enhancements
- Could add tag grouping (e.g., by topic vs. level)
- Could add icons mapping for common tags
- Could implement tag hierarchy
- Could add analytics tracking for category clicks

This implementation provides a completely dynamic, maintainable solution that scales with your course catalog without requiring any code changes.
