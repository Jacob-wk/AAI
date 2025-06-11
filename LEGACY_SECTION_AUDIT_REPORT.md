# Legacy Section Audit Report
*Comprehensive analysis of all sections with usage recommendations*

## Executive Summary

**Total Sections Found:** 72 sections
**Templates Analyzed:** 30 template files
**Current Architecture:** Mixed Shopify 2.0 and legacy patterns

### Key Findings:
- ✅ **27 Active AAI Custom Sections** - Well-designed, in use
- ⚠️ **3 Generic Wrapper Sections** - Need replacement
- ❌ **8 Legacy Horizon Sections** - Candidates for removal
- 🔄 **34 Standard Shopify Sections** - Need AI block integration

## Section Categories

### 🟢 KEEP & ENHANCE - Active AAI Sections (27)

These sections are actively used in templates and follow good patterns:

#### Hero Sections (4)
- ✅ `aai-hero.liquid` - Main homepage hero (used in index.json)
- ✅ `aai-universal-hero.liquid` - Flexible hero (used in 12+ templates)
- ✅ `aai-demo-hero.liquid` - Demo page hero (used in page.demo.json)
- ✅ `about-hero.liquid` - About page hero (used in page.about.json)

**Status:** **ENHANCE for AI blocks**
**Usage:** High - Core sections for all pages
**Action:** Add semantic block types for AI generation

#### Content Sections (8)
- ✅ `aai-universal-content.liquid` - Main content section (used in 15+ templates)
- ✅ `aai-custom-content.liquid` - Custom content blocks
- ✅ `aai-feature-focus.liquid` - Feature highlights
- ✅ `aai-universal-cta.liquid` - Call-to-action sections
- ✅ `aai-terms-page-content.liquid` - Legal content (page.terms.json)
- ✅ `about-content.liquid` - About page content
- ✅ `course-details-professional.liquid` - Course details
- ✅ `instructor-profile-professional.liquid` - Instructor profiles

**Status:** **ENHANCE for AI blocks**
**Usage:** High - Content building blocks
**Action:** Modernize block schemas for AI generation

#### Collection & Product Sections (6)
- ✅ `aai-collection-courses-hero.liquid` - Course collection hero
- ✅ `aai-collection-courses-grid.liquid` - Course grid display
- ✅ `aai-collection-courses-featured.liquid` - Featured courses
- ✅ `aai-collection-courses-categories.liquid` - Course categories
- ✅ `collection-banner.liquid` - Collection page banners
- ✅ `product-information.liquid` - Product details

**Status:** **KEEP as-is**
**Usage:** High - E-commerce functionality
**Action:** Minor enhancements only

#### Demo & Interactive Sections (4)
- ✅ `aai-demo-experience.liquid` - Demo platform (page.demo.json)
- ✅ `aai-demo-experience-tabs.liquid` - Demo tabs
- ✅ `aai-demo-platform-features.liquid` - Demo features
- ✅ `aai-demo-cta.liquid` - Demo call-to-action

**Status:** **KEEP as-is**
**Usage:** Medium - Demo functionality
**Action:** No changes needed

#### Help & Support Sections (3)
- ✅ `aai-help-center-hero.liquid` - Help center hero
- ✅ `aai-help-contact.liquid` - Help contact form
- ✅ `aai-help-faq.liquid` - FAQ section

**Status:** **ENHANCE contact form**
**Usage:** Medium - Support functionality
**Action:** Improve form functionality

#### Instructor & Webinar Sections (2)
- ✅ `aai-instructor-showcase.liquid` - Instructor showcase
- ✅ `aai-webinars-hero.liquid` - Webinar hero

**Status:** **KEEP as-is**
**Usage:** Low-Medium
**Action:** Minor improvements

### 🔴 REMOVE - Generic Wrapper Sections (3)

These sections cause architectural problems:

#### ❌ `_blocks.liquid`
```liquid
{% capture children %}
  {% content_for 'blocks' %}
{% endcapture %}
{% render 'section', section: section, children: children %}
```
**Issues:** 
- Generic `@theme` blocks
- Causes "Edit code" to open wrong file
- Blocks AI block generation
**Used in:** Unknown (needs investigation)
**Action:** **REMOVE and replace with semantic sections**

#### ❌ `section.liquid` (1,321 lines)
**Issues:**
- Massive generic wrapper
- Multiple storytelling presets that should be separate sections
- Overly complex schema
**Used in:** Potentially multiple templates
**Action:** **SPLIT into semantic sections**

#### ❌ `custom-liquid.liquid`
**Issues:**
- Generic liquid execution
- No semantic meaning
**Used in:** Unknown
**Action:** **REMOVE if unused**

### 🟡 MODERNIZE - Legacy Horizon Sections (8)

These are leftover from the Horizon theme:

#### Storytelling Sections
- 🔄 `slideshow.liquid` - Has storytelling category, could support AI
- 🔄 `marquee.liquid` - Simple marquee, modernize or remove
- 🔄 `media-with-content.liquid` - Good candidate for AI blocks
- 🔄 `text.liquid` - Basic text section
- 🔄 `image.liquid` - Basic image section
- 🔄 `divider.liquid` - Simple divider
- 🔄 `hero.liquid` - Generic hero (conflicts with aai-hero)
- 🔄 `featured-product.liquid` - Product showcase

**Analysis:**
- `slideshow.liquid` - **KEEP & MODERNIZE** (322 lines, good structure)
- `media-with-content.liquid` - **KEEP & MODERNIZE** (389 lines, storytelling category)
- `hero.liquid` - **REMOVE** (conflicts with aai-hero)
- `featured-product.liquid` - **EVALUATE** (may duplicate aai functionality)
- Others - **EVALUATE** based on actual usage

### 🟢 STANDARD SHOPIFY SECTIONS (34)

These are standard Shopify sections that work well:

#### Headers & Footers (6)
- ✅ `aai-header.liquid` - Custom AAI header
- ✅ `aai-footer.liquid` - Custom AAI footer
- ✅ `header.liquid` - Standard header
- ✅ `footer.liquid` - Standard footer
- ✅ `header-professional.liquid` - Professional theme header
- ✅ `footer-professional.liquid` - Professional theme footer

#### Main Template Sections (9)
- ✅ `main-page.liquid` - Page template
- ✅ `main-product.liquid` - Product template
- ✅ `main-collection.liquid` - Collection template
- ✅ `main-cart.liquid` - Cart template
- ✅ `main-blog.liquid` - Blog template
- ✅ `main-blog-post.liquid` - Blog post template
- ✅ `main-404.liquid` - 404 template
- ✅ `main-list-collections.liquid` - Collection list
- ✅ `password.liquid` - Password page

#### Search & Navigation (6)
- ✅ `search-header.liquid` - Search functionality
- ✅ `search-results.liquid` - Search results
- ✅ `predictive-search.liquid` - Predictive search
- ✅ `predictive-search-empty.liquid` - Empty search
- ✅ `collection-links.liquid` - Collection navigation
- ✅ `collection-list.liquid` - Collection listing

#### Product & Cart Features (5)
- ✅ `product-recommendations.liquid` - Product recommendations
- ✅ `product-list.liquid` - Product listing
- ✅ `section-rendering-product-card.liquid` - Product cards
- ✅ `collection-based-sorting.liquid` - Collection sorting
- ✅ `user-dashboard.liquid` - User dashboard

#### Other (8)
- ✅ `instructor-profile.liquid` - Instructor profiles
- ✅ `header-announcements.liquid` - Announcement bar
- ✅ Various JSON group files - Section groups

## Template Usage Analysis

### High Usage Templates (10+)
- `aai-universal-hero.liquid` - Used in 12+ templates
- `aai-universal-content.liquid` - Used in 15+ templates
- `main-*.liquid` sections - Core template functionality

### Medium Usage Templates (3-9)
- `aai-hero.liquid` - Homepage specific
- `about-hero.liquid` - About page specific
- Help center sections - Support functionality

### Low Usage Templates (1-2)
- Demo-specific sections
- Webinar sections
- Instructor showcase

### Unused/Unknown Usage
- Generic wrapper sections
- Some legacy Horizon sections

## Recommendations by Priority

### 🚨 IMMEDIATE (High Priority)

#### 1. Remove Generic Wrapper Sections
```bash
# Investigate usage first
grep -r "_blocks\|section\.liquid" templates/

# Then remove/replace:
- sections/_blocks.liquid
- sections/section.liquid (split into semantic sections)
```

#### 2. Fix Contact Form
- Replace block-based contact form with proper section
- Implement in `sections/contact-form.liquid`

#### 3. Enable AI Blocks on Main Sections
- `aai-universal-content.liquid`
- `aai-universal-hero.liquid`
- `slideshow.liquid`
- `media-with-content.liquid`

### 🔄 NEXT (Medium Priority)

#### 4. Modernize Legacy Sections
```bash
# Evaluate and modernize:
- marquee.liquid
- text.liquid  
- image.liquid
- featured-product.liquid
```

#### 5. Clean Up Conflicts
- Remove duplicate `hero.liquid` (conflicts with `aai-hero.liquid`)
- Consolidate similar functionality

#### 6. Enhance Core Sections
- Add more semantic block types to content sections
- Improve schema for better AI generation

### 🎯 FINAL (Low Priority)

#### 7. Polish & Optimize
- Collection page styling
- 404 page redesign
- Cart functionality improvements

## Migration Strategy

### Phase 1: Foundation (Week 1)
1. ✅ Backup all templates and sections
2. ✅ Create section usage map
3. ✅ Remove `_blocks.liquid` and `section.liquid`
4. ✅ Replace with semantic sections

### Phase 2: AI Integration (Week 2)
1. ✅ Add AI block support to main sections
2. ✅ Test AI generation functionality
3. ✅ Modernize legacy storytelling sections

### Phase 3: Polish (Week 3)
1. ✅ Contact form implementation
2. ✅ Cart functionality fixes
3. ✅ Collection page improvements
4. ✅ 404 page redesign

## File Actions Summary

### ❌ DELETE (3 files)
- `sections/_blocks.liquid`
- `sections/section.liquid`
- `sections/custom-liquid.liquid`

### 🔄 MODERNIZE (8 files)
- `sections/slideshow.liquid`
- `sections/media-with-content.liquid`
- `sections/marquee.liquid`
- `sections/text.liquid`
- `sections/image.liquid`
- `sections/divider.liquid`
- `sections/hero.liquid`
- `sections/featured-product.liquid`

### ✅ ENHANCE (27 files)
- All `aai-*.liquid` sections
- Add AI block support
- Improve schemas

### 🟢 KEEP (34 files)
- All standard Shopify sections
- Main template sections
- Headers/footers

## Conclusion

The AAI theme has a solid foundation with well-designed custom sections. The main issues are:

1. **Generic wrapper sections** blocking AI functionality
2. **Legacy Horizon sections** needing evaluation
3. **Missing semantic block types** for AI generation

Priority should be removing problematic sections first, then enhancing the strong foundation for AI block generation.
