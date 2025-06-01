# Shopify 2.0 Theme Development - Lessons Learned & Best Practices

**Date:** June 1, 2025  
**Project:** AAI Custom Theme Development  
**Context:** Debugging theme editor compatibility issues

---

## 🎯 Critical Architecture Understanding

### **Sections vs Blocks - The Foundation**

**SECTIONS** (`/sections/*.liquid`)
- Main containers that appear in theme customizer
- Define layout structure and overall functionality
- Have their own schema with settings
- Examples: `hero.liquid`, `product-list.liquid`, `footer.liquid`

**BLOCKS** (`/blocks/*.liquid`) 
- Reusable components WITHIN sections
- Provide modular content pieces
- Defined in section's `blocks` array in schema
- Examples: `text.liquid`, `image.liquid`, `button.liquid`

**KEY INSIGHT:** Templates reference section types, sections reference block types internally.

---

## 🏗️ JSON Template Structure

### **Template JSON Files** (`/templates/*.json`)
```json
{
  "sections": {
    "section_id": {
      "type": "section-file-name",  // Must match /sections/section-file-name.liquid
      "settings": {
        // Section-level settings
      },
      "blocks": {
        "block_id": {
          "type": "block-type-name",  // Must match block defined in section schema
          "settings": {
            // Block-level settings
          }
        }
      }
    }
  },
  "order": ["section_id"]  // Controls section display order
}
```

### **Critical JSON Rules**
1. **NO COMMENTS** - JSON files cannot contain `//` or `/* */` comments
2. **NO TRAILING COMMAS** - Will break theme editor completely
3. **EXACT TYPE MATCHING** - Section/block types must match file names exactly
4. **VALID JSON STRUCTURE** - Use `python3 -m json.tool file.json` to validate

---

## 🔧 Section Schema Best Practices

### **Complete Section Structure**
```liquid
{% comment %}
  Section: Example Section
  Purpose: Demonstrates proper structure
{% endcomment %}

<section class="example-section">
  <!-- Section HTML content -->
  {% for block in section.blocks %}
    {% render block.type, block: block %}
  {% endfor %}
</section>

{% schema %}
{
  "name": "Example Section",
  "tag": "section",
  "class": "example-section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Title",
      "default": "Default Title"
    }
  ],
  "blocks": [
    {
      "type": "text_block",
      "name": "Text Block",
      "settings": [
        {
          "type": "textarea",
          "id": "content",
          "label": "Text Content"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Example Section"
    }
  ]
}
{% endschema %}
```

### **Schema Requirements for Theme Editor**
- **`name`** - Appears in section picker
- **`settings`** - Section-level customization options
- **`blocks`** - Available block types within section
- **`presets`** - Default configurations for easy setup

---

## 📁 File Organization Standards

### **Required Directory Structure**
```
/assets/          # CSS, JS, images, icons
/blocks/          # Reusable block components
/config/          # Theme configuration
  ├── settings_schema.json    # Theme customization options
  ├── settings_data.json      # Default values
  ├── section_groups.json     # Section groupings for editor
  └── theme.yml              # Theme metadata
/layout/          # Base layout files
  ├── theme.liquid           # Main layout
  └── password.liquid        # Password page layout
/locales/         # Internationalization
/sections/        # Main section files
/snippets/        # Reusable Liquid snippets
/templates/       # Page templates (JSON format)
```

### **Section Groups Configuration** (`/config/section_groups.json`)
```json
[
  {
    "name": "header",
    "type": "header",
    "sections": ["header", "announcement-bar"]
  },
  {
    "name": "main",
    "type": "main", 
    "sections": ["hero", "content", "product-list"]
  },
  {
    "name": "footer",
    "type": "footer",
    "sections": ["footer"]
  }
]
```

**CRITICAL:** All sections used in templates MUST be listed in section_groups.json

---

## 🚨 Common Theme Editor Breaking Issues

### **1. Missing Block Files**
**Problem:** Template references `"type": "text_block"` but `/blocks/text_block.liquid` doesn't exist  
**Solution:** Create the missing block file or update template to use existing block

### **2. Invalid JSON Syntax**
**Problem:** Comments, trailing commas, or malformed JSON in templates  
**Solution:** Validate ALL `.json` files with `python3 -m json.tool`

### **3. Section/Block Type Mismatches**
**Problem:** Template references section type that doesn't exist  
**Solution:** Ensure section file exists with exact name match

### **4. Missing Schema Definitions**
**Problem:** Sections without `{% schema %}` won't appear in editor  
**Solution:** Add complete schema with name, settings, blocks, presets

### **5. Section Groups Configuration**
**Problem:** Sections not listed in `section_groups.json`  
**Solution:** Add all custom sections to appropriate groups

---

## 🔍 Debugging Methodology

### **Step 1: JSON Validation**
```bash
# Check all JSON template files
cd /templates
for file in *.json; do
  python3 -m json.tool "$file" > /dev/null && echo "✅ $file" || echo "❌ $file"
done
```

### **Step 2: Section/Block Availability Check**
```python
import json, os

# Get all section types from templates
template_sections = set()
for filename in os.listdir('templates'):
    if filename.endswith('.json'):
        with open(f'templates/{filename}') as f:
            data = json.load(f)
            for section in data.get('sections', {}).values():
                template_sections.add(section.get('type'))

# Check if section files exist
for section_type in template_sections:
    exists = os.path.exists(f'sections/{section_type}.liquid')
    print(f"{'✅' if exists else '❌'} {section_type}.liquid")
```

### **Step 3: Block Availability Check**
```python
# Extract block types from section schemas
# Check if corresponding block files exist in /blocks/
```

---

## 📋 Theme Editor Compatibility Checklist

### **Essential Requirements**
- [ ] All JSON templates are valid (no syntax errors)
- [ ] All referenced sections exist in `/sections/`
- [ ] All referenced blocks exist in `/blocks/`
- [ ] Section schemas are complete with name, settings, blocks
- [ ] `section_groups.json` includes all custom sections
- [ ] `settings_schema.json` defines theme customization options
- [ ] `theme.liquid` includes proper CSS/JS asset loading

### **Template Structure Validation**
- [ ] Templates use proper JSON structure
- [ ] Section types match existing files
- [ ] Block types are defined in parent section schemas
- [ ] Order arrays reference valid section IDs

### **Performance Considerations**
- [ ] CSS files are modular and section-specific
- [ ] JavaScript is conditionally loaded based on sections
- [ ] Images are optimized and properly referenced
- [ ] Minimal inline styles (prefer external CSS)

---

## 🎯 AAI Theme Specific Learnings

### **Issues Discovered**
1. **Empty JSON Templates** - Several templates had no content, breaking editor
2. **Missing Block Files** - Blocks referenced in templates didn't exist
3. **Section Groups Incomplete** - Custom sections not listed for editor
4. **JSON Syntax Errors** - Comments and trailing commas in JSON files
5. **Type Mismatches** - Templates referencing non-existent section types

### **Solutions Implemented**
1. Created minimal valid JSON for all empty templates
2. Created missing block files with proper schema
3. Updated `section_groups.json` with all custom sections
4. Fixed all JSON syntax errors
5. Verified section type availability

### **Best Practices Established**
- Always validate JSON before deployment
- Maintain 1:1 relationship between template references and files
- Use consistent naming conventions
- Document block/section relationships
- Test theme editor after each major change

---

## 🚀 Deployment Checklist

### **Pre-Deployment Validation**
```bash
# Validate all JSON files
find templates/ -name "*.json" -exec python3 -m json.tool {} \; > /dev/null

# Check for missing sections
python3 validate-sections.py

# Verify schema completeness
grep -r "{% schema %}" sections/ | wc -l

# Test theme import
zip -r theme.zip . -x "*.git*" "*.md" "validate-*"
```

### **Post-Deployment Testing**
- [ ] Theme appears in Shopify admin
- [ ] All sections appear in theme customizer
- [ ] Blocks can be added/removed/reordered
- [ ] Settings save and apply correctly
- [ ] No console errors in browser
- [ ] Mobile responsiveness maintained

---

## 💡 Key Takeaways

1. **Shopify 2.0 is strict** - Missing files or invalid JSON breaks everything
2. **Editor compatibility requires precision** - Every reference must resolve
3. **Block/Section distinction is critical** - Don't confuse the two
4. **Schema completeness matters** - Incomplete schemas = invisible sections
5. **Validation is essential** - Always test before deployment

This architecture understanding is crucial for successful Shopify 2.0 theme development and debugging.

---

*Generated from AAI theme debugging session - June 1, 2025*
