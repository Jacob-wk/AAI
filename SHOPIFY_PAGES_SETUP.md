# AAI LMS Platform - Shopify Pages Setup Guide

## Overview
This guide explains how to make all the created page templates visible and functional in your Shopify admin dashboard.

## Page Templates Created
The following 14 page templates have been created and are ready for use:

### Core Educational Pages
1. **About** (`page.about.liquid`) - Company information and authority branding
2. **Instructors** (`page.instructors.liquid`) - Faculty showcase with credentials
3. **Certifications** (`page.certifications.liquid`) - Professional certification programs
4. **Course Access** (`page.course-access.liquid`) - Embedded Intuto course player

### Training & Resources
5. **Corporate Training** (`page.corporate-training.liquid`) - Enterprise training solutions
6. **Industry Standards** (`page.industry-standards.liquid`) - Standards documentation
7. **Safety Library** (`page.safety-library.liquid`) - Resource center with searchable documents
8. **Webinars** (`page.webinars.liquid`) - Live and recorded webinar library

### Support & Business
9. **Help Center** (`page.help-center.liquid`) - FAQs and support resources
10. **Contact** (`page.contact.liquid`) - Contact forms and support options
11. **Demo** (`page.demo.liquid`) - Interactive platform demonstration
12. **Partnerships** (`page.partnerships.liquid`) - Industry collaboration network

### Legal Pages
13. **Privacy Policy** (`page.privacy-policy.liquid`) - GDPR/CCPA compliant privacy policy
14. **Terms of Service** (`page.terms-of-service.liquid`) - Complete legal framework

## Setup Instructions

### Step 1: Create Pages in Shopify Admin
1. Go to your Shopify admin dashboard
2. Navigate to **Online Store** > **Pages**
3. Click **Add page** for each template
4. Use these exact handle names (must match template names):

| Page Title | Handle (URL) | Template |
|------------|--------------|----------|
| About AAI | `about` | `page.about.liquid` |
| Our Instructors | `instructors` | `page.instructors.liquid` |
| Certifications | `certifications` | `page.certifications.liquid` |
| Course Access | `course-access` | `page.course-access.liquid` |
| Corporate Training | `corporate-training` | `page.corporate-training.liquid` |
| Industry Standards | `industry-standards` | `page.industry-standards.liquid` |
| Safety Library | `safety-library` | `page.safety-library.liquid` |
| Webinars | `webinars` | `page.webinars.liquid` |
| Help Center | `help-center` | `page.help-center.liquid` |
| Contact Us | `contact` | `page.contact.liquid` |
| Platform Demo | `demo` | `page.demo.liquid` |
| Partnerships | `partnerships` | `page.partnerships.liquid` |
| Privacy Policy | `privacy-policy` | `page.privacy-policy.liquid` |
| Terms of Service | `terms-of-service` | `page.terms-of-service.liquid` |

### Step 2: Configure Navigation Menu
1. Go to **Online Store** > **Navigation**
2. Click on **Main menu** (or create it if it doesn't exist)
3. Add menu items linking to your new pages:

**Recommended Menu Structure:**
```
Home
Courses (Collection: courses)
├── Course Catalog
├── Certifications
└── Corporate Training

Training Resources
├── Webinars
├── Safety Library
└── Industry Standards

About
├── About AAI
├── Our Instructors
└── Partnerships

Support
├── Help Center
├── Platform Demo
└── Contact Us
```

### Step 3: Footer Menu (Legal)
1. Create a new menu called "Footer Menu"
2. Add legal pages:
   - Privacy Policy
   - Terms of Service

### Step 4: Set Template Assignments
After creating each page:
1. Edit the page in Shopify admin
2. In the **Search engine listing preview** section, click **Edit website SEO**
3. Scroll to **Template** section
4. Select the corresponding template (e.g., `page.about` for About page)

### Step 5: Configure Header Settings
The header is configured to use the `main-menu`. Ensure your navigation structure matches the template expectations.

## Integration Points

### Intuto LMS Integration
- Course pages use embedded Intuto player
- Customer account shows purchased courses with direct access
- No external redirects - all learning happens within Shopify

### Professional Branding
- All pages use "Since 2025" branding
- Navy (#1e3a5f), Safety Orange (#ff6b35), Electric Blue (#3498db) color scheme
- Industry authority aesthetic with professional credentials

### Mobile Responsive
- All templates are mobile-optimized
- Touch-friendly navigation
- Responsive forms and content

## Testing Checklist

### Navigation
- [ ] All pages accessible from main menu
- [ ] Footer links work correctly
- [ ] Mobile menu functions properly
- [ ] Search functionality works

### Content
- [ ] All pages display correctly
- [ ] Forms submit properly
- [ ] Embedded content loads
- [ ] Images and icons display

### Integration
- [ ] Intuto player loads in course pages
- [ ] Customer account shows courses
- [ ] Search filters work in catalog
- [ ] Contact forms send emails

### Branding
- [ ] All "Since 2025" branding appears
- [ ] Professional color scheme consistent
- [ ] Industry credentials display
- [ ] AAI authority messaging clear

## Advanced Configuration

### Course Products
- Use `product.course.liquid` template for course products
- Set up product metafields for Intuto integration
- Configure customer account course access

### Collection Templates
- Use `collection.courses.liquid` for course catalog
- Set up course filtering and search
- Configure category and level taxonomies

### Customer Account
- `customers/account.liquid` shows purchased courses
- Embedded Intuto access for enrolled students
- Progress tracking and certificate display

## Support
For technical issues or customization needs, refer to:
- Shopify template documentation
- Intuto integration guide
- AAI brand guidelines
