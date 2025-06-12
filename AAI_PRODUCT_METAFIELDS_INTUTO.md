# AAI Product Metafields for Intuto Integration

## 🏗️ PRODUCT METAFIELD STRUCTURE

### **Course Namespace: `course`**

#### **Basic Course Information**
```json
{
  "namespace": "course",
  "key": "duration",
  "type": "single_line_text_field",
  "name": "Course Duration",
  "description": "Total course duration (e.g., '60 Hours', '24 Hours')"
}
```

```json
{
  "namespace": "course",
  "key": "level",
  "type": "single_line_text_field",
  "name": "Course Level",
  "description": "Difficulty level (Beginner, Intermediate, Advanced, Professional)"
}
```

```json
{
  "namespace": "course",
  "key": "ceu_credits",
  "type": "number_integer",
  "name": "CEU Credits",
  "description": "Continuing Education Unit credits earned"
}
```

```json
{
  "namespace": "course",
  "key": "format",
  "type": "single_line_text_field",
  "name": "Course Format",
  "description": "Delivery format (Online Self-Paced, Interactive, Live Virtual, etc.)"
}
```

```json
{
  "namespace": "course",
  "key": "prerequisites",
  "type": "multi_line_text_field",
  "name": "Prerequisites",
  "description": "Required qualifications or prior courses"
}
```

#### **Learning Content**
```json
{
  "namespace": "course",
  "key": "learning_objectives",
  "type": "rich_text_field",
  "name": "Learning Objectives",
  "description": "What students will learn and achieve"
}
```

```json
{
  "namespace": "course",
  "key": "curriculum_modules",
  "type": "json",
  "name": "Curriculum Modules",
  "description": "Structured list of course modules with durations"
}
```

```json
{
  "namespace": "course",
  "key": "whats_included",
  "type": "json",
  "name": "What's Included",
  "description": "List of included materials and features"
}
```

#### **Instructor Information**
```json
{
  "namespace": "course",
  "key": "instructor_name",
  "type": "single_line_text_field",
  "name": "Lead Instructor",
  "description": "Primary instructor name"
}
```

```json
{
  "namespace": "course",
  "key": "instructor_bio",
  "type": "rich_text_field",
  "name": "Instructor Biography",
  "description": "Instructor background and qualifications"
}
```

```json
{
  "namespace": "course",
  "key": "instructor_image",
  "type": "file_reference",
  "name": "Instructor Photo",
  "description": "Professional headshot of instructor"
}
```

#### **Certification & Credentials**
```json
{
  "namespace": "course",
  "key": "certification_type",
  "type": "single_line_text_field",
  "name": "Certification Type",
  "description": "Type of certification awarded"
}
```

```json
{
  "namespace": "course",
  "key": "iaapa_certified",
  "type": "boolean",
  "name": "IAAPA Certified",
  "description": "Is this course IAAPA certified?"
}
```

```json
{
  "namespace": "course",
  "key": "astm_compliant",
  "type": "boolean",
  "name": "ASTM F24 Compliant",
  "description": "Does this course meet ASTM F24 standards?"
}
```

#### **Course Badges & Tags**
```json
{
  "namespace": "course",
  "key": "course_badges",
  "type": "json",
  "name": "Course Badges",
  "description": "Array of badge objects with text and style"
}
```

```json
{
  "namespace": "course",
  "key": "industry_focus",
  "type": "single_line_text_field",
  "name": "Industry Focus",
  "description": "Primary industry focus (FEC, Water Park, Adventure Park, etc.)"
}
```

#### **Intuto Integration Fields**
```json
{
  "namespace": "intuto",
  "key": "course_id",
  "type": "single_line_text_field",
  "name": "Intuto Course ID",
  "description": "Unique identifier in Intuto LMS"
}
```

```json
{
  "namespace": "intuto",
  "key": "enrollment_url",
  "type": "url",
  "name": "Intuto Enrollment URL",
  "description": "Direct link to course enrollment in Intuto"
}
```

```json
{
  "namespace": "intuto",
  "key": "preview_url",
  "type": "url",
  "name": "Course Preview URL",
  "description": "Link to course preview/demo"
}
```

```json
{
  "namespace": "intuto",
  "key": "completion_webhook",
  "type": "url",
  "name": "Completion Webhook",
  "description": "Webhook URL for course completion notifications"
}
```

## 📊 **SAMPLE METAFIELD DATA**

### **Example: Ride Safety Inspector Certification**
```json
{
  "course": {
    "duration": "60 Hours",
    "level": "Professional",
    "ceu_credits": 12,
    "format": "Self-paced online with practical assessments",
    "prerequisites": "2+ years maintenance or operations experience",
    "learning_objectives": "<ul><li>Master comprehensive ride inspection protocols</li><li>Understand mechanical and electrical safety systems</li><li>Apply ASTM F24 safety standards</li><li>Document inspection findings professionally</li><li>Identify and mitigate operational hazards</li></ul>",
    "curriculum_modules": [
      {
        "title": "Introduction to Safety Standards",
        "duration": "4 hours",
        "description": "Overview of industry safety requirements"
      },
      {
        "title": "Mechanical Systems Safety",
        "duration": "8 hours",
        "description": "Inspection of ride mechanical components"
      },
      {
        "title": "Electrical Safety Control Systems",
        "duration": "8 hours",
        "description": "Electrical safety protocols and procedures"
      },
      {
        "title": "Inspection Procedures & Documentation",
        "duration": "12 hours",
        "description": "Professional inspection methodology"
      },
      {
        "title": "Risk Assessment & Hazard Identification",
        "duration": "8 hours",
        "description": "Systematic hazard analysis techniques"
      },
      {
        "title": "Emergency Response Protocols",
        "duration": "6 hours",
        "description": "Emergency procedures and coordination"
      },
      {
        "title": "Regulatory Compliance & Reporting",
        "duration": "8 hours",
        "description": "Legal requirements and documentation"
      },
      {
        "title": "Final Assessment & Certification",
        "duration": "6 hours",
        "description": "Comprehensive evaluation and certification"
      }
    ],
    "whats_included": [
      "Lifetime access to course materials",
      "Professional certificate upon completion",
      "Mobile and desktop access",
      "Progress tracking and bookmarks",
      "Expert instructor support",
      "Downloadable inspection checklists",
      "Industry standard reference guides"
    ],
    "instructor_name": "Sarah Chen, P.E.",
    "instructor_bio": "Sarah brings over 25 years of ride engineering experience and serves as an active member of the ASTM F24 committee. She has designed safety systems for major theme parks worldwide and specializes in mechanical and electrical safety protocols.",
    "certification_type": "Professional Ride Safety Inspector",
    "iaapa_certified": true,
    "astm_compliant": true,
    "course_badges": [
      {
        "text": "IAAPA Certified",
        "style": "success"
      },
      {
        "text": "ASTM F24 Compliant",
        "style": "primary"
      },
      {
        "text": "Professional Level",
        "style": "warning"
      }
    ],
    "industry_focus": "Amusement Rides"
  },
  "intuto": {
    "course_id": "aai-ride-safety-inspector-cert-001",
    "enrollment_url": "https://aai.intuto.com/courses/ride-safety-inspector-certification",
    "preview_url": "https://aai.intuto.com/preview/ride-safety-inspector-certification",
    "completion_webhook": "https://aai-shopify.intuto.com/webhooks/completion"
  }
}
```

## 🔧 **IMPLEMENTATION STEPS**

### **1. Create Metafield Definitions**
```bash
# Use Shopify CLI to create metafield definitions
shopify app generate extension --type=product_metafield_definition
```

### **2. Update Product Templates**
- Modify `product.course.liquid` to display metafield data
- Update `course-details-professional.liquid` section
- Enhance `course-curriculum.liquid` with module data

### **3. Collection Template Updates**
- Update course collection filters to use metafield data
- Add sorting by CEU credits, duration, level
- Implement badge display in product cards

### **4. Admin Interface**
- Create custom metafield forms for course creation
- Add bulk metafield management tools
- Implement course import/export functionality

---

*Metafield Structure Updated: June 12, 2025*
*Ready for Intuto LMS Integration*
