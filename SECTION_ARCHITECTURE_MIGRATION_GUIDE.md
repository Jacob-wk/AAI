# Section Architecture Migration Guide
*Migrating from Generic Wrapper Sections to Shopify 2.0 Semantic Sections*

## Overview

This guide provides step-by-step instructions for migrating the AAI theme from generic wrapper sections (like `_blocks.liquid` and `section.liquid`) to proper Shopify 2.0 semantic sections that support AI-generated blocks.

## Current Architecture Issues

### ❌ Problem: Generic Wrapper Sections
```liquid
// sections/_blocks.liquid & sections/section.liquid
{% capture children %}
  {% content_for 'blocks' %}
{% endcapture %}

{% render 'section', section: section, children: children %}

"blocks": [
  { "type": "@theme" },
  { "type": "@app" },
  { "type": "_divider" }
]
```

**Issues:**
- Generic `@theme` blocks bypass proper typing
- AI can't understand semantic meaning
- "Edit code" opens wrong files
- No semantic context for block generation

### ✅ Solution: Semantic Section Pattern
```liquid
// sections/hero-section.liquid
<section class="hero-section">
  {% for block in section.blocks %}
    {% case block.type %}
      {% when 'heading' %}
        <h2>{{ block.settings.heading }}</h2>
      {% when 'text' %}
        <p>{{ block.settings.text }}</p>
      {% when 'button' %}
        <a href="{{ block.settings.url }}">{{ block.settings.text }}</a>
    {% endcase %}
  {% endfor %}
</section>

"blocks": [
  { "type": "heading", "name": "Heading" },
  { "type": "text", "name": "Text" },
  { "type": "button", "name": "Button" }
]
```

## Migration Strategy

### Phase 1: Identify Current Usage

#### Step 1: Audit Template Usage
```bash
# Find all templates using generic sections
grep -r "_blocks\\|section\\.liquid" templates/
grep -r "section\\.liquid" templates/
```

#### Step 2: Categorize Sections by Purpose
- **Hero Sections** → `hero-section.liquid`
- **Content Sections** → `content-section.liquid`  
- **Feature Sections** → `features-section.liquid`
- **CTA Sections** → `cta-section.liquid`

### Phase 2: Create Semantic Sections

#### Step 1: Hero Section Migration
Replace generic sections used for hero content with:

```liquid
// sections/hero-section.liquid
{% schema %}
{
  "name": "Hero Section",
  "tag": "section",
  "class": "section",
  "blocks": [
    {
      "type": "heading",
      "name": "Heading",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Welcome to AAI"
        },
        {
          "type": "select",
          "id": "heading_size",
          "label": "Heading Size",
          "options": [
            { "value": "h1", "label": "Large" },
            { "value": "h2", "label": "Medium" },
            { "value": "h3", "label": "Small" }
          ],
          "default": "h1"
        }
      ]
    },
    {
      "type": "text",
      "name": "Text Content",
      "settings": [
        {
          "type": "richtext",
          "id": "text",
          "label": "Text",
          "default": "<p>Professional safety education for the amusement industry</p>"
        }
      ]
    },
    {
      "type": "button",
      "name": "Call to Action",
      "settings": [
        {
          "type": "text",
          "id": "button_text",
          "label": "Button Text",
          "default": "Get Started"
        },
        {
          "type": "url",
          "id": "button_url",
          "label": "Button URL"
        },
        {
          "type": "select",
          "id": "button_style",
          "label": "Button Style",
          "options": [
            { "value": "primary", "label": "Primary" },
            { "value": "secondary", "label": "Secondary" }
          ],
          "default": "primary"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero Section",
      "blocks": [
        {
          "type": "heading",
          "settings": {
            "heading": "Amusement Adventure Institute",
            "heading_size": "h1"
          }
        },
        {
          "type": "text",
          "settings": {
            "text": "<p>Where Safety Meets Adventure - Professional safety education for the amusement industry</p>"
          }
        },
        {
          "type": "button",
          "settings": {
            "button_text": "Explore Courses",
            "button_url": "/collections/courses",
            "button_style": "primary"
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

#### Step 2: Content Section Migration
Modernize `aai-universal-content` for AI blocks:

```liquid
// sections/content-section.liquid
{% schema %}
{
  "name": "Content Section",
  "tag": "section",
  "class": "section",
  "blocks": [
    {
      "type": "heading",
      "name": "Heading",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading"
        }
      ]
    },
    {
      "type": "text",
      "name": "Text",
      "settings": [
        {
          "type": "richtext",
          "id": "content",
          "label": "Content"
        }
      ]
    },
    {
      "type": "image",
      "name": "Image",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        }
      ]
    },
    {
      "type": "features",
      "name": "Feature List",
      "settings": [
        {
          "type": "text",
          "id": "feature_title",
          "label": "Feature Title"
        },
        {
          "type": "textarea",
          "id": "features",
          "label": "Features (one per line)"
        }
      ]
    }
  ],
  "settings": [
    {
      "type": "select",
      "id": "layout",
      "label": "Layout",
      "options": [
        { "value": "text-left", "label": "Text Left, Image Right" },
        { "value": "text-right", "label": "Text Right, Image Left" },
        { "value": "text-center", "label": "Text Center" }
      ],
      "default": "text-left"
    }
  ]
}
{% endschema %}
```

### Phase 3: Update Templates

#### Step 1: Replace Generic Section References
```json
// Before (in templates/page.json)
{
  "sections": {
    "main": {
      "type": "_blocks",
      "blocks": {
        "heading": { "type": "@theme" }
      }
    }
  }
}

// After
{
  "sections": {
    "main": {
      "type": "hero-section",
      "blocks": {
        "heading": { 
          "type": "heading",
          "settings": {
            "heading": "About AAI",
            "heading_size": "h1"
          }
        }
      }
    }
  }
}
```

#### Step 2: Migrate Block Settings
For each template, map generic block settings to semantic block settings:

```bash
# Find all template files
find templates/ -name "*.json" -exec echo "Processing: {}" \; -exec cat {} \;
```

### Phase 4: Enable AI Block Generation

#### Step 1: Add AI-Ready Block Types
```liquid
"blocks": [
  {
    "type": "heading",
    "name": "Heading",
    "ai_instructions": "Create compelling headings for safety training content"
  },
  {
    "type": "text", 
    "name": "Text Content",
    "ai_instructions": "Generate educational content about amusement park safety"
  },
  {
    "type": "testimonial",
    "name": "Testimonial",
    "ai_instructions": "Create realistic testimonials from safety professionals"
  }
]
```

#### Step 2: Add Semantic Categories
```liquid
"presets": [
  {
    "name": "Safety Education Hero",
    "category": "t:categories.storytelling"
  }
]
```

## Migration Checklist

### ✅ Pre-Migration
- [ ] Backup all template files
- [ ] Document current section usage
- [ ] Test all existing functionality
- [ ] Create staging environment

### ✅ During Migration
- [ ] Create semantic sections
- [ ] Update one template at a time
- [ ] Test each migrated section
- [ ] Preserve all content and settings

### ✅ Post-Migration
- [ ] Remove unused generic sections
- [ ] Test AI block generation
- [ ] Verify "Edit code" functionality
- [ ] Update documentation

## Best Practices

### 1. Semantic Block Naming
```liquid
// ❌ Generic
{ "type": "content", "name": "Content" }

// ✅ Semantic
{ "type": "course_overview", "name": "Course Overview" }
{ "type": "safety_tip", "name": "Safety Tip" }
{ "type": "instructor_bio", "name": "Instructor Bio" }
```

### 2. AI-Friendly Settings
```liquid
{
  "type": "text",
  "id": "course_description",
  "label": "Course Description",
  "info": "Describe what students will learn in this safety course"
}
```

### 3. Proper Schema Structure
```liquid
{
  "name": "Safety Course Section",
  "tag": "section",
  "class": "section course-section",
  "blocks": [
    // Semantic block definitions
  ],
  "settings": [
    // Section-level settings
  ],
  "presets": [
    // Ready-to-use presets
  ]
}
```

## Testing AI Block Generation

### 1. Enable AI Blocks
In Shopify admin, ensure AI block generation is enabled for your theme.

### 2. Test Block Generation
1. Add your semantic section to a page
2. Click "Generate with AI"
3. Provide context like "Create content for safety training courses"
4. Verify generated blocks are appropriate

### 3. Iterate on Block Definitions
Refine block schemas based on AI generation quality.

## Conclusion

This migration will:
- ✅ Enable AI-generated blocks
- ✅ Fix "Edit code" functionality  
- ✅ Follow Shopify 2.0 best practices
- ✅ Maintain all existing content
- ✅ Improve theme maintainability

The semantic approach makes blocks more meaningful for both AI generation and developer maintenance.
