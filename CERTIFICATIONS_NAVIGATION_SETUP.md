# AAI Navigation Structure - Certifications Setup

## ✅ Navigation Configuration Updated

### Primary Navigation
- **Home** → `/` (homepage)
- **About** → `/pages/about` (company info)
- **Certifications** → `/collections/courses` (main course/certification listing)
- **Corporate Training** → `/pages/corporate-training` (enterprise solutions)
- **Contact** → `/pages/contact` (contact form)

## Course/Certification Page Structure

### 1. Main Collection Page: `/collections/courses`
**Template**: `templates/collection.courses.json`
**URL**: Your "Certifications" nav item points here
**Content**: 
- Professional hero section with "Professional Certifications & Training"
- Course filtering and search
- Course grid with certification cards
- Category organization
- Professional messaging for FEC industry

### 2. Individual Course Pages: `/products/[course-handle]`
**Template**: `templates/product.course.liquid` (the file you're viewing)
**Content**:
- Detailed course information
- CEU credits and certification details
- Professional enrollment form
- Course curriculum
- Prerequisites and learning objectives

### 3. Customer Course Access: `/account`
**Template**: `templates/customers/account.liquid`
**Content**:
- Customer dashboard
- Purchased course access
- Email-based course links (Code Selling App + Intuto)
- Support contact information

## Professional Messaging Strategy

### "Certifications" Focus
- Industry-recognized professional certifications
- CEU credits for continuing education
- ASTM F24 compliance training
- Insurance-approved programs
- FEC operator-specific content

### Course Product Setup
Each course product should have:
- **Product Type**: `digital_course` OR tag `course`
- **Metafields**:
  - `course.ceu_credits`: "3.5"
  - `course.duration`: "4 hours"
  - `course.level`: "Intermediate"
  - `course.certification_type`: "Professional Safety Certification"

## Implementation Benefits

1. **Clear Navigation**: "Certifications" is the primary course access point
2. **Professional Positioning**: Emphasizes credentials and industry recognition
3. **SEO Optimized**: `/collections/courses` URL structure
4. **Simplified Management**: One collection for all course products
5. **Scalable**: Easy to add new certification programs

## Next Steps

1. **Update Shopify Navigation**: Set "Certifications" menu item to `/collections/courses`
2. **Create Course Products**: Add certification programs with proper metafields
3. **Test Navigation Flow**: Verify users can find and purchase certifications
4. **Configure Code Selling App**: Set up email delivery for course access

Your "Certifications" navigation now correctly points to your course collection, making it the primary way customers discover and purchase your professional certification programs!
