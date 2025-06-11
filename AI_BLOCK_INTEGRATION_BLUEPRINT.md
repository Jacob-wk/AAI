# AI Block Integration Blueprint
*Technical guide for adding AI-generated blocks to AAI theme sections*

## Overview

This blueprint provides step-by-step instructions for enabling AI-generated blocks in the AAI theme, using existing storytelling sections as reference and extending the functionality to all custom sections.

## AI Block Requirements

### Shopify AI Block Criteria
According to Shopify documentation, AI-generated blocks require:

1. **Theme blocks support** - Add `"type": "@theme"` to section's blocks array
2. **App blocks support** - Add `"type": "@app"` to section's blocks array  
3. **Proper _blocks.liquid wrapper** - Custom wrapper section for generated blocks
4. **Clear section structure** - Following Shopify 2.0 patterns

### Key Implementation Points:
- Sections need `{ "type": "@theme" }` and `{ "type": "@app" }` in blocks array
- The `_blocks.liquid` wrapper handles AI-generated blocks in new sections
- No special categories required - works with any section that accepts theme blocks

## Reference: Existing AI-Ready Sections

### ✅ `slideshow.liquid` - AI Block Ready
```liquid
{
  "name": "t:names.slideshow",
  "category": "t:categories.storytelling",  // ← Enables AI generation
  "blocks": [
    {
      "type": "_slide"  // ← Semantic block type
    }
  ]
}
```

**Why it works:**
- ✅ Has `storytelling` category
- ✅ Semantic block types (`_slide`)
- ✅ Clear purpose (slideshow presentation)
- ✅ Proper block structure

### ✅ `media-with-content.liquid` - AI Block Ready
```liquid
{
  "name": "Media with content",
  "category": "t:categories.storytelling",
  "blocks": [
    {
      "type": "text",
      "name": "Text",
      "settings": [
        {
          "type": "richtext",
          "id": "text",
          "label": "Text"
        }
      ]
    },
    {
      "type": "button",
      "name": "Button",
      "settings": [
        {
          "type": "text",
          "id": "label",
          "label": "Button label"
        }
      ]
    }
  ]
}
```

**Why it works:**
- ✅ Semantic block names (`text`, `button`)
- ✅ Clear settings with descriptive labels
- ✅ Storytelling category

## AI Integration Strategy

### Phase 1: Core Content Sections

#### Target Sections for AI Integration:
1. `aai-universal-content.liquid` - Main content builder
2. `aai-universal-hero.liquid` - Hero sections
3. `aai-feature-focus.liquid` - Feature highlights
4. `aai-universal-cta.liquid` - Call-to-action sections

### Phase 2: Specialized Sections

#### Target Sections:
1. `about-content.liquid` - About page content
2. `course-details-professional.liquid` - Course information
3. `instructor-profile-professional.liquid` - Instructor bios

## Implementation Guide

### Step 1: Analyze Current Block Structure

#### Current `aai-universal-content.liquid` blocks:
```liquid
"blocks": [
  {
    "type": "text_block",     // ← Generic, needs semantic improvement
    "name": "Text Block"
  },
  {
    "type": "feature_list",   // ← Good semantic name
    "name": "Feature List"
  },
  {
    "type": "credential_grid", // ← Good semantic name
    "name": "Credential Grid"
  }
]
```

### Step 2: Create AI-Ready Block Types

#### Enhanced block structure for `aai-universal-content.liquid`:

```liquid
{
  "name": "AAI Content Section",
  "tag": "section",
  "class": "section",
  "category": "t:categories.storytelling", // ← Enable AI generation
  "blocks": [
    {
      "type": "course_overview",
      "name": "Course Overview",
      "ai_instructions": "Create compelling course descriptions for safety training programs",
      "settings": [
        {
          "type": "text",
          "id": "course_title",
          "label": "Course Title",
          "info": "Name of the safety training course"
        },
        {
          "type": "richtext",
          "id": "course_description",
          "label": "Course Description",
          "info": "Detailed description of what students will learn"
        },
        {
          "type": "text",
          "id": "duration",
          "label": "Course Duration",
          "placeholder": "e.g., 4 hours, 2 days"
        }
      ]
    },
    {
      "type": "safety_tip",
      "name": "Safety Tip",
      "ai_instructions": "Generate practical safety tips for amusement park operations",
      "settings": [
        {
          "type": "text",
          "id": "tip_title",
          "label": "Safety Tip Title"
        },
        {
          "type": "richtext",
          "id": "tip_content",
          "label": "Tip Content",
          "info": "Practical safety advice for operators"
        },
        {
          "type": "select",
          "id": "tip_level",
          "label": "Importance Level",
          "options": [
            { "value": "critical", "label": "Critical" },
            { "value": "important", "label": "Important" },
            { "value": "helpful", "label": "Helpful" }
          ]
        }
      ]
    },
    {
      "type": "instructor_bio",
      "name": "Instructor Biography",
      "ai_instructions": "Create professional instructor biographies for safety education experts",
      "settings": [
        {
          "type": "text",
          "id": "instructor_name",
          "label": "Instructor Name"
        },
        {
          "type": "text",
          "id": "instructor_title",
          "label": "Professional Title"
        },
        {
          "type": "richtext",
          "id": "instructor_bio",
          "label": "Biography",
          "info": "Professional background and expertise"
        },
        {
          "type": "image_picker",
          "id": "instructor_photo",
          "label": "Instructor Photo"
        }
      ]
    },
    {
      "type": "certification_info",
      "name": "Certification Information",
      "ai_instructions": "Generate information about safety certifications and credentials",
      "settings": [
        {
          "type": "text",
          "id": "cert_name",
          "label": "Certification Name"
        },
        {
          "type": "richtext",
          "id": "cert_description",
          "label": "Certification Description"
        },
        {
          "type": "text",
          "id": "cert_duration",
          "label": "Validity Period",
          "placeholder": "e.g., 3 years"
        }
      ]
    },
    {
      "type": "testimonial",
      "name": "Customer Testimonial",
      "ai_instructions": "Create realistic testimonials from safety professionals who completed training",
      "settings": [
        {
          "type": "richtext",
          "id": "testimonial_text",
          "label": "Testimonial"
        },
        {
          "type": "text",
          "id": "customer_name",
          "label": "Customer Name"
        },
        {
          "type": "text",
          "id": "customer_title",
          "label": "Job Title"
        },
        {
          "type": "text",
          "id": "company_name",
          "label": "Company Name"
        }
      ]
    },
    {
      "type": "statistics",
      "name": "Training Statistics",
      "ai_instructions": "Generate relevant statistics about safety training effectiveness",
      "settings": [
        {
          "type": "text",
          "id": "stat_number",
          "label": "Statistic Number",
          "placeholder": "e.g., 98%"
        },
        {
          "type": "text",
          "id": "stat_label",
          "label": "Statistic Label",
          "placeholder": "e.g., Pass Rate"
        },
        {
          "type": "richtext",
          "id": "stat_description",
          "label": "Context Description"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Safety Training Content",
      "category": "t:categories.storytelling",
      "blocks": [
        {
          "type": "course_overview",
          "settings": {
            "course_title": "Amusement Park Safety Fundamentals",
            "course_description": "<p>Comprehensive training covering essential safety protocols for amusement park operations.</p>"
          }
        },
        {
          "type": "instructor_bio",
          "settings": {
            "instructor_name": "Sarah Johnson",
            "instructor_title": "Senior Safety Engineer"
          }
        }
      ]
    }
  ]
}
```

### Step 3: Update Section Rendering Logic

```liquid
<!-- aai-universal-content.liquid -->
<section class="aai-content">
  {% for block in section.blocks %}
    {% case block.type %}
      {% when 'course_overview' %}
        <div class="course-overview-block" {{ block.shopify_attributes }}>
          {% if block.settings.course_title != blank %}
            <h3 class="course-title">{{ block.settings.course_title }}</h3>
          {% endif %}
          {% if block.settings.course_description != blank %}
            <div class="course-description">{{ block.settings.course_description }}</div>
          {% endif %}
          {% if block.settings.duration != blank %}
            <p class="course-duration">Duration: {{ block.settings.duration }}</p>
          {% endif %}
        </div>

      {% when 'safety_tip' %}
        <div class="safety-tip-block {{ block.settings.tip_level }}" {{ block.shopify_attributes }}>
          {% if block.settings.tip_title != blank %}
            <h4 class="tip-title">{{ block.settings.tip_title }}</h4>
          {% endif %}
          {% if block.settings.tip_content != blank %}
            <div class="tip-content">{{ block.settings.tip_content }}</div>
          {% endif %}
        </div>

      {% when 'instructor_bio' %}
        <div class="instructor-bio-block" {{ block.shopify_attributes }}>
          {% if block.settings.instructor_photo != blank %}
            <img src="{{ block.settings.instructor_photo | image_url: width: 200 }}" 
                 alt="{{ block.settings.instructor_name }}" 
                 class="instructor-photo">
          {% endif %}
          <div class="instructor-info">
            {% if block.settings.instructor_name != blank %}
              <h4 class="instructor-name">{{ block.settings.instructor_name }}</h4>
            {% endif %}
            {% if block.settings.instructor_title != blank %}
              <p class="instructor-title">{{ block.settings.instructor_title }}</p>
            {% endif %}
            {% if block.settings.instructor_bio != blank %}
              <div class="instructor-bio">{{ block.settings.instructor_bio }}</div>
            {% endif %}
          </div>
        </div>

      {% when 'testimonial' %}
        <div class="testimonial-block" {{ block.shopify_attributes }}>
          {% if block.settings.testimonial_text != blank %}
            <blockquote class="testimonial-text">{{ block.settings.testimonial_text }}</blockquote>
          {% endif %}
          <div class="testimonial-attribution">
            {% if block.settings.customer_name != blank %}
              <cite class="customer-name">{{ block.settings.customer_name }}</cite>
            {% endif %}
            {% if block.settings.customer_title != blank %}
              <p class="customer-title">{{ block.settings.customer_title }}</p>
            {% endif %}
            {% if block.settings.company_name != blank %}
              <p class="company-name">{{ block.settings.company_name }}</p>
            {% endif %}
          </div>
        </div>

      <!-- Existing block types -->
      {% when 'text_block' %}
        <!-- Keep existing functionality -->
      {% when 'feature_list' %}
        <!-- Keep existing functionality -->
      
    {% endcase %}
  {% endfor %}
</section>
```

### Step 4: Hero Section AI Integration

#### Enhanced `aai-universal-hero.liquid`:

```liquid
{
  "name": "AAI Hero Section",
  "tag": "section", 
  "class": "section",
  "category": "t:categories.storytelling",
  "blocks": [
    {
      "type": "hero_heading",
      "name": "Hero Heading",
      "ai_instructions": "Create compelling headlines for safety training and educational content",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Hero Heading",
          "info": "Main headline for the section"
        },
        {
          "type": "select",
          "id": "heading_size",
          "label": "Heading Size",
          "options": [
            { "value": "large", "label": "Large" },
            { "value": "medium", "label": "Medium" }
          ]
        }
      ]
    },
    {
      "type": "hero_subtitle", 
      "name": "Hero Subtitle",
      "ai_instructions": "Create supporting text that explains the value of safety education",
      "settings": [
        {
          "type": "richtext",
          "id": "subtitle",
          "label": "Hero Subtitle"
        }
      ]
    },
    {
      "type": "cta_button",
      "name": "Call to Action",
      "ai_instructions": "Generate action-oriented button text for course enrollment or learning more",
      "settings": [
        {
          "type": "text",
          "id": "button_text",
          "label": "Button Text"
        },
        {
          "type": "url",
          "id": "button_url",
          "label": "Button URL"
        }
      ]
    },
    {
      "type": "trust_indicator",
      "name": "Trust Indicator",
      "ai_instructions": "Create credibility markers like certifications, years of experience, or client count",
      "settings": [
        {
          "type": "text",
          "id": "indicator_text",
          "label": "Trust Indicator"
        },
        {
          "type": "text",
          "id": "indicator_icon",
          "label": "Icon (emoji or text)"
        }
      ]
    }
  ]
}
```

## CSS Styling for AI Blocks

### Create dedicated styles for new block types:

```css
/* AI-generated block styling */
.course-overview-block {
  background: var(--color-background-alt);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.course-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.safety-tip-block {
  border-left: 4px solid var(--color-accent);
  padding: 1.5rem;
  margin: 1rem 0;
  background: var(--color-background);
}

.safety-tip-block.critical {
  border-color: var(--color-error);
  background: rgba(var(--color-error-rgb), 0.05);
}

.instructor-bio-block {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.instructor-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-block {
  background: var(--color-background-alt);
  padding: 2rem;
  border-radius: 8px;
  position: relative;
}

.testimonial-text {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.testimonial-attribution {
  text-align: right;
  color: var(--color-text-secondary);
}
```

## Testing AI Block Generation

### Step 1: Enable AI in Theme Editor
1. Open Shopify theme editor
2. Add enhanced section to a page
3. Look for "Generate with AI" option
4. Test with prompts like:
   - "Create content for amusement park safety training"
   - "Generate instructor bios for safety experts"
   - "Create course descriptions for ride operator certification"

### Step 2: Validate Generated Content
Ensure AI-generated blocks:
- ✅ Use appropriate safety industry terminology
- ✅ Create realistic but appropriate content
- ✅ Follow AAI brand voice
- ✅ Include relevant technical details

### Step 3: Iterate on Block Definitions
Based on AI generation quality:
- Refine `ai_instructions` text
- Adjust setting labels and info text
- Add more specific placeholder examples
- Update block schemas for better context

## Implementation Checklist

### ✅ Phase 1: Core Sections (Week 1)
- [ ] Update `aai-universal-content.liquid` with AI blocks
- [ ] Update `aai-universal-hero.liquid` with AI blocks  
- [ ] Test AI generation functionality
- [ ] Create CSS for new block types

### ✅ Phase 2: Specialized Sections (Week 2)  
- [ ] Update `aai-feature-focus.liquid`
- [ ] Update `about-content.liquid`
- [ ] Update course and instructor sections
- [ ] Test across all updated sections

### ✅ Phase 3: Validation (Week 3)
- [ ] Test AI generation quality
- [ ] Refine block schemas based on results
- [ ] Document best practices for content creation
- [ ] Train team on AI block usage

## Best Practices for AI Block Design

### 1. Semantic Naming
```liquid
// ❌ Generic
{ "type": "content", "name": "Content" }

// ✅ Semantic  
{ "type": "course_overview", "name": "Course Overview" }
```

### 2. Clear AI Instructions
```liquid
{
  "ai_instructions": "Create compelling course descriptions for safety training programs in the amusement industry, focusing on practical skills and regulatory compliance"
}
```

### 3. Helpful Setting Info
```liquid
{
  "type": "text",
  "id": "course_duration", 
  "label": "Course Duration",
  "info": "How long the course takes to complete (e.g., 4 hours, 2 days)",
  "placeholder": "4 hours"
}
```

### 4. Industry-Specific Context
Focus block types on AAI's domain:
- Safety protocols
- Training programs  
- Instructor expertise
- Certification information
- Industry standards

This blueprint ensures AI-generated blocks will be contextually appropriate and useful for AAI's educational content while maintaining the theme's existing functionality.
