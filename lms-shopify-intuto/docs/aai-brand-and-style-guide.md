# AAI Amusement Adventure Institute - Brand & Style Guide

## Brand Positioning
**"Where Safety Meets Adventure"**

Professional safety education for the amusement industry - maintaining academic authority while respecting the joy and excitement that drives the business.

---

## Color Palette

### Primary Colors
- **Authority Navy:** `#1e3a5f` - Headers, navigation, primary buttons
- **Charcoal Grey:** `#2c3e50` - Body text, secondary elements
- **Clean White:** `#ffffff` - Backgrounds, content areas

### Accent Colors
- **Safety Orange:** `#ff6b35` - CTAs, alerts, important highlights
- **Electric Blue:** `#3498db` - Links, interactive elements, fun touches
- **Success Green:** `#27ae60` - Completed courses, certifications

### Supporting Neutrals
- **Light Grey:** `#ecf0f1` - Section backgrounds, borders
- **Medium Grey:** `#95a5a6` - Meta text, less important information
- **Dark Grey:** `#34495e` - Secondary text

---

## Typography

### Primary Font Stack
```css
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
```
**Usage:** Clean, professional, excellent readability for safety-critical content

### Headlines
- **H1:** 2.5rem, font-weight: 700, color: Authority Navy
- **H2:** 2rem, font-weight: 600, color: Authority Navy  
- **H3:** 1.5rem, font-weight: 600, color: Charcoal Grey
- **H4:** 1.25rem, font-weight: 500, color: Charcoal Grey

### Body Text
- **Primary:** 1rem, font-weight: 400, color: Charcoal Grey
- **Secondary:** 0.875rem, font-weight: 400, color: Medium Grey
- **Small:** 0.75rem, font-weight: 400, color: Medium Grey

### Accent Typography
```css
.credential-badge {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.professional-cta {
  font-size: 1rem;
  font-weight: 600;
  text-transform: none;
}
```

---

## Voice & Tone Guidelines

### Brand Voice Characteristics
- **Authoritative** but not intimidating
- **Professional** but not cold
- **Knowledgeable** but not condescending
- **Industry-savvy** but not exclusive

### Content Tone by Context

#### Headlines & Titles
- Direct, outcome-focused
- Use industry terminology confidently
- Emphasize professional advancement
- **Examples:**
  - "Master ASTM F24 Committee Standards"
  - "Advanced Ride Safety Inspection Protocols"
  - "Water Park Operations & Compliance Certification"

#### Course Descriptions
- Balance technical accuracy with accessibility
- Always include learning outcomes
- Connect to real-world applications
- **Examples:**
  - "Learn the regulations that keep guests safe while parks profitable"
  - "Understand inspection protocols that satisfy both insurance and regulatory requirements"

#### Call-to-Actions
- Professional development focused
- Avoid casual language
- Emphasize career advancement
- **Examples:**
  - "Advance Your Expertise"
  - "Earn Professional Certification"
  - "Start Your Safety Career Path"

#### Error Messages & Support
- Helpful and solution-oriented
- Maintain professional tone even in problems
- Offer clear next steps

---

## Visual Elements

### Photography Style
- **Equipment Photos:** Clean, well-maintained rides and attractions
- **Professional Shots:** Industry professionals in action (inspections, operations)
- **Avoid:** Casual theme park guest photos, overly playful imagery
- **Lighting:** Natural, bright, clean - conveys transparency and safety

### Icon Style
- **Style:** Outline icons with subtle fills
- **Weight:** Medium stroke weight (1.5-2px)
- **Colors:** Primarily Authority Navy with Safety Orange accents
- **Examples:**
  - Safety helmets, clipboards, certification badges
  - Ride silhouettes (professional, not cartoonish)
  - Inspection tools, regulatory symbols

### Button Styles
```css
.btn-primary {
  background: #ff6b35; /* Safety Orange */
  color: white;
  font-weight: 600;
  border-radius: 4px;
  padding: 12px 24px;
}

.btn-secondary {
  background: transparent;
  color: #1e3a5f; /* Authority Navy */
  border: 2px solid #1e3a5f;
  font-weight: 500;
}

.btn-professional {
  background: #1e3a5f; /* Authority Navy */
  color: white;
  font-weight: 600;
  text-transform: none;
}
```

---

## Layout Principles

### Spacing & Structure
- **Generous whitespace** conveys professionalism and clarity
- **Consistent grid system** (12-column for desktop, stacked for mobile)
- **Clear visual hierarchy** with safety information always prominent
- **Logical groupings** of related content

### Content Organization
- **Lead with credentials** - certifications, accreditations visible early
- **Clear course outcomes** - what will students achieve?
- **Industry relevance** - how does this apply to real work?
- **Progressive disclosure** - don't overwhelm, layer complexity appropriately

---

## Component Guidelines

### Course Cards
```css
.course-card {
  background: white;
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
```

### Credential Badges
```css
.credential-badge {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.ceu-credits {
  background: #3498db;
}

.certification {
  background: #ff6b35;
}
```

### Progress Indicators
- Use familiar academic metaphors (completion bars, grade-like indicators)
- Green for completed, blue for in-progress, grey for not started
- Always include percentage or fraction completed

---

## Content Strategy

### Required Elements for Authority
- **Accreditation mentions** in headers/footers
- **Standards references** (ASTM, IAAPA, state regulations)
- **Industry partnerships** prominently displayed
- **Success metrics** (pass rates, career advancement stats)
- **Testimonials from industry leaders** not just satisfied customers

### Balancing Fun Industry Connection
- **Industry terminology** shows insider knowledge
- **Business outcome focus** (profitability + safety)
- **Career advancement stories** from parks to corporate
- **Subtle visual nods** to the fun industry without compromising authority

---

## Do's and Don'ts

### DO
✅ Use specific industry standards and regulations by name  
✅ Emphasize career advancement and professional development  
✅ Show understanding of business pressures parks face  
✅ Include continuing education credits and certifications  
✅ Use clean, professional photos of well-maintained equipment  
✅ Lead with safety outcomes, support with business benefits  

### DON'T
❌ Use cartoon-style or overly playful imagery  
❌ Downplay the seriousness of safety regulations  
❌ Use casual language in course descriptions  
❌ Hide credentials or accreditations  
❌ Focus only on fun without acknowledging responsibility  
❌ Use generic stock photos of theme parks  

---

## Responsive Considerations

### Mobile Priority
- **Safety information** remains prominently displayed
- **Course cards** stack cleanly with key info visible
- **CTAs** remain thumb-friendly and professionally styled
- **Credentials** don't get hidden in mobile navigation

### Tablet Considerations
- **Two-column course layout** maintains professional appearance
- **Touch targets** sized appropriately for professional use
- **Reading experience** optimized for longer course descriptions

---

## Brand Applications

### Email Communications
- Subject lines emphasize professional development outcomes
- Clean, minimal design with credential badges
- Clear course completion tracking and next steps

### Course Materials
- Consistent branding throughout Intuto integration
- Professional certificate designs
- Progress tracking that feels academic, not gamified

### Customer Support
- Professional, solution-oriented tone
- Industry knowledge demonstrated in responses
- Quick resolution focus (professionals are busy)

This style guide ensures AAI maintains its unique position as the trusted authority for safety education in the amusement industry - professional enough for regulators, industry-savvy enough for operators.