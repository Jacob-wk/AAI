# AAI Course Products Setup Guide

## Quick Setup for Course Products

This guide helps you create course products that work with the simplified AAI LMS system using Code Selling App + Intuto Multi Token approach.

### 1. Create Course Products in Shopify

#### Product Type Setup
- **Product Type**: Set to `digital_course` OR add the tag `course`
- **Title**: Professional course name (e.g., "Trampoline Safety Management Certification")
- **Handle**: Use clean URLs (e.g., "trampoline-safety-management")

#### Required Metafields
Create these metafields for each course product:

**Course Information:**
- `course.ceu_credits` (Single line text): "3.5"
- `course.duration` (Single line text): "4 hours"
- `course.level` (Single line text): "Intermediate"
- `course.short_description` (Multi-line text): Brief course description
- `course.certificate` (Boolean): true for certificate courses

**Professional Features:**
- `course.instructor_name` (Single line text): "Dr. Sarah Johnson"
- `course.prerequisites` (Multi-line text): Course requirements
- `course.learning_objectives` (Multi-line text): What students will learn

### 2. Configure Code Selling App

#### Email Template Setup
The Code Selling App should send emails with:
- Course access link with unique Intuto token
- Professional branding matching AAI theme
- Clear instructions for accessing the course

#### Email Template Example:
```
Subject: Your AAI Course Access - {{course_title}}

Dear {{customer_name}},

Your professional development course is ready!

Course: {{course_title}}
Access Link: {{intuto_course_url}}?token={{unique_token}}

This link provides lifetime access to your course materials.

Questions? Contact support@aai-institute.com

Best regards,
AAI Professional Development Team
```

### 3. Intuto Multi Token Configuration

#### Token Management
- Each purchase generates unique token via Code Selling App
- Tokens are single-use for initial access
- Course progress tracked in Intuto platform
- Customer gets permanent course access

#### Integration Flow:
1. Customer purchases course → Shopify order created
2. Code Selling App triggered → Generates Intuto token
3. Email sent with access link → Customer clicks to access
4. Intuto validates token → Customer enrolled in course
5. Customer account shows course → Via our simplified template

### 4. Customer Experience

#### Purchase Flow:
1. Browse courses at `/collections/courses`
2. View course details on product page
3. Add to cart and purchase normally
4. Receive email with course access link
5. Access course via customer account at `/account`

#### Course Access:
- Email link directs to Intuto platform
- Customer account shows purchased courses
- Support contacts provided for assistance
- Professional messaging throughout

### 5. Testing Checklist

- [ ] Course products have correct product type/tags
- [ ] All required metafields populated
- [ ] Code Selling App configured for email delivery
- [ ] Intuto integration working with tokens
- [ ] Customer account displays courses correctly
- [ ] Email templates professional and branded
- [ ] Support workflows documented

### 6. Launch Preparation

#### Content Requirements:
- Course product descriptions
- Professional course images
- Instructor profiles and credentials
- Course curriculum details
- Prerequisites and learning objectives

#### Technical Setup:
- Email templates tested and approved
- Intuto courses uploaded and configured
- Token generation system tested
- Customer support processes documented
- FAQ and help documentation prepared

### 7. Professional Messaging

All course communications should emphasize:
- Industry expertise and credibility
- Professional development value
- Insurance and compliance benefits
- Proven track record with FEC operators
- Ongoing support and resources

### 8. Support Workflows

#### Customer Support Contacts:
- **Technical Support**: support@aai-institute.com
- **Training Questions**: training@aai-institute.com  
- **Corporate Training**: corporate@aai-institute.com

#### Common Issues:
- Resend access email requests
- Course access troubleshooting
- Certificate and completion questions
- Technical platform assistance

This simplified approach ensures professional course delivery without complex API integrations, focusing on proven email-based access and customer service excellence.
