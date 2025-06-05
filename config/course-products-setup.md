# AAI Course Products Setup Guide

## Overview
This guide provides the exact configuration needed for each course product in Shopify Admin, including all required metafields for the Intuto integration.

## Product Setup Instructions

### Step 1: Create Products in Shopify Admin
Go to **Products > All products > Add product** and create each course using the specifications below.

---

## Course 1: ASTM F24 Standards Mastery

### Basic Product Information
```yaml
Product Title: "ASTM F24 Standards Mastery"
Description: "Master the complete ASTM F24 standards with our comprehensive professional certification course. Learn inspection protocols, safety documentation systems, and compliance training leadership. Designed for experienced safety professionals seeking advanced certification."
Product Type: "Digital Course"
Vendor: "AAI Institute"
Tags: "astm-f24, safety-standards, professional-certification, advanced-course, ceu-credits"
Handle: "astm-f24-standards-mastery"
Template: "product.course"
```

### Pricing & Inventory
```yaml
Price: $599.00
Compare at Price: $799.00
Cost per item: $0.00
SKU: "AAI-ASTM-F24-ADV"
Barcode: "AAI-ASTM-F24-2025"
Track quantity: No (digital product)
Continue selling when out of stock: Yes
Physical product: No
```

### Course Information Metafields (namespace: course)
```yaml
level: "Advanced"
ceu_credits: 8
duration: "40 Hours"
prerequisites: "Basic Safety Certification"
learning_objectives: "Master complete ASTM F24 standards|Implement inspection protocols|Develop safety documentation systems|Lead compliance training programs"
standards_covered: "ASTM F24, IAAPA Guidelines"
certification_type: "Professional Certificate"
delivery_method: "Online"
accreditation: "IAAPA Certified"
language: "English"
```

### Intuto Integration Metafields (namespace: intuto)
```yaml
course_id: "astm-f24-standards-2025"
token_pool_id: "astm_f24_tokens"
enrollment_url_template: "https://aai.intuto.com/enroll/{token}?course=astm-f24"
completion_webhook: "https://aai-institute.com/webhooks/intuto/completion"
embed_url: "https://aai.intuto.com/embed/astm-f24"
```

---

## Course 2: Water Park Safety Operations

### Basic Product Information
```yaml
Product Title: "Water Park Safety Operations"
Description: "Comprehensive water park safety protocols including chemical management, lifeguarding standards, and equipment maintenance. Essential training for water park operators and safety managers."
Product Type: "Digital Course"
Vendor: "AAI Institute"
Tags: "water-park, safety-operations, lifeguard-standards, chemical-management, ceu-credits"
Handle: "water-park-safety-operations"
Template: "product.course"
```

### Pricing & Inventory
```yaml
Price: $449.00
Compare at Price: $599.00
Cost per item: $0.00
SKU: "AAI-WATER-SAFETY-INT"
Barcode: "AAI-WATER-SAFETY-2025"
Track quantity: No
Continue selling when out of stock: Yes
Physical product: No
```

### Course Information Metafields (namespace: course)
```yaml
level: "Intermediate"
ceu_credits: 6
duration: "32 Hours"
prerequisites: "Lifeguard Certification"
learning_objectives: "Chemical management protocols|Lifeguarding standards|Equipment maintenance|Emergency response procedures"
standards_covered: "MAHC, IAAPA Water Guidelines"
certification_type: "Water Safety Certificate"
delivery_method: "Online"
accreditation: "MAHC Approved"
language: "English"
```

### Intuto Integration Metafields (namespace: intuto)
```yaml
course_id: "water-park-safety-2025"
token_pool_id: "water_park_tokens"
enrollment_url_template: "https://aai.intuto.com/enroll/{token}?course=water-park-safety"
completion_webhook: "https://aai-institute.com/webhooks/intuto/completion"
embed_url: "https://aai.intuto.com/embed/water-park-safety"
```

---

## Course 3: Ride Inspection Certification

### Basic Product Information
```yaml
Product Title: "Ride Inspection Certification"
Description: "Become a certified ride inspector with our comprehensive program. Learn mechanical systems, electrical safety, and documentation requirements. State-approved certification for experienced professionals."
Product Type: "Digital Course"
Vendor: "AAI Institute"
Tags: "ride-inspection, mechanical-systems, electrical-safety, inspector-certification, professional"
Handle: "ride-inspection-certification"
Template: "product.course"
```

### Pricing & Inventory
```yaml
Price: $899.00
Compare at Price: $1,199.00
Cost per item: $0.00
SKU: "AAI-RIDE-INSPECT-PRO"
Barcode: "AAI-RIDE-INSPECT-2025"
Track quantity: No
Continue selling when out of stock: Yes
Physical product: No
```

### Course Information Metafields (namespace: course)
```yaml
level: "Professional"
ceu_credits: 12
duration: "60 Hours"
prerequisites: "2+ years industry experience"
learning_objectives: "Mechanical systems inspection|Electrical safety protocols|Documentation requirements|Regulatory compliance"
standards_covered: "ASTM F24, State Regulations"
certification_type: "Inspector ID Card"
delivery_method: "Online"
accreditation: "State Certified"
language: "English"
```

### Intuto Integration Metafields (namespace: intuto)
```yaml
course_id: "ride-inspection-2025"
token_pool_id: "ride_inspection_tokens"
enrollment_url_template: "https://aai.intuto.com/enroll/{token}?course=ride-inspection"
completion_webhook: "https://aai-institute.com/webhooks/intuto/completion"
embed_url: "https://aai.intuto.com/embed/ride-inspection"
```

---

## Course 4: Risk Management Fundamentals

### Basic Product Information
```yaml
Product Title: "Risk Management Fundamentals"
Description: "Learn essential risk assessment strategies, liability reduction techniques, and safety protocol development. Perfect introduction for new safety professionals and managers."
Product Type: "Digital Course"
Vendor: "AAI Institute"
Tags: "risk-management, safety-protocols, liability-reduction, beginner-course, fundamentals"
Handle: "risk-management-fundamentals"
Template: "product.course"
```

### Pricing & Inventory
```yaml
Price: $299.00
Compare at Price: $399.00
Cost per item: $0.00
SKU: "AAI-RISK-MGMT-BEG"
Barcode: "AAI-RISK-MGMT-2025"
Track quantity: No
Continue selling when out of stock: Yes
Physical product: No
```

### Course Information Metafields (namespace: course)
```yaml
level: "Beginner"
ceu_credits: 4
duration: "20 Hours"
prerequisites: "None"
learning_objectives: "Risk assessment strategies|Liability reduction|Safety protocol development|Incident management"
standards_covered: "Industry Best Practices"
certification_type: "Risk Management Certificate"
delivery_method: "Online"
accreditation: "IAAPA Endorsed"
language: "English"
```

### Intuto Integration Metafields (namespace: intuto)
```yaml
course_id: "risk-management-2025"
token_pool_id: "risk_mgmt_tokens"
enrollment_url_template: "https://aai.intuto.com/enroll/{token}?course=risk-management"
completion_webhook: "https://aai-institute.com/webhooks/intuto/completion"
embed_url: "https://aai.intuto.com/embed/risk-management"
```

---

## Course 5: Guest Services Excellence

### Basic Product Information
```yaml
Product Title: "Guest Services Excellence"
Description: "Elevate guest experience while maintaining safety standards. Learn de-escalation techniques, ADA compliance, and emergency procedures. Essential training for all guest-facing staff."
Product Type: "Digital Course"
Vendor: "AAI Institute"
Tags: "guest-services, customer-service, ada-compliance, de-escalation, all-levels"
Handle: "guest-services-excellence"
Template: "product.course"
```

### Pricing & Inventory
```yaml
Price: $199.00
Compare at Price: $279.00
Cost per item: $0.00
SKU: "AAI-GUEST-SERVICE-ALL"
Barcode: "AAI-GUEST-SERVICE-2025"
Track quantity: No
Continue selling when out of stock: Yes
Physical product: No
```

### Course Information Metafields (namespace: course)
```yaml
level: "All Levels"
ceu_credits: 3
duration: "16 Hours"
prerequisites: "None"
learning_objectives: "De-escalation techniques|ADA compliance|Emergency procedures|Guest satisfaction strategies"
standards_covered: "ADA Guidelines, Customer Service Best Practices"
certification_type: "Guest Services Certificate"
delivery_method: "Online"
accreditation: "Industry Recognized"
language: "English"
```

### Intuto Integration Metafields (namespace: intuto)
```yaml
course_id: "guest-services-2025"
token_pool_id: "guest_services_tokens"
enrollment_url_template: "https://aai.intuto.com/enroll/{token}?course=guest-services"
completion_webhook: "https://aai-institute.com/webhooks/intuto/completion"
embed_url: "https://aai.intuto.com/embed/guest-services"
```

---

## Course 6: Electrical Systems Safety

### Basic Product Information
```yaml
Product Title: "Electrical Systems Safety"
Description: "Advanced electrical safety training covering control circuit analysis, LOTO procedures, and compliance standards. Essential for maintenance professionals and electrical inspectors."
Product Type: "Digital Course"
Vendor: "AAI Institute"
Tags: "electrical-safety, loto-procedures, nfpa-standards, advanced-course, maintenance"
Handle: "electrical-systems-safety"
Template: "product.course"
```

### Pricing & Inventory
```yaml
Price: $799.00
Compare at Price: $999.00
Cost per item: $0.00
SKU: "AAI-ELECTRICAL-ADV"
Barcode: "AAI-ELECTRICAL-2025"
Track quantity: No
Continue selling when out of stock: Yes
Physical product: No
```

### Course Information Metafields (namespace: course)
```yaml
level: "Advanced"
ceu_credits: 10
duration: "48 Hours"
prerequisites: "Basic Electrical Knowledge"
learning_objectives: "Control circuit analysis|LOTO procedures|Electrical inspection|Safety compliance|Troubleshooting techniques"
standards_covered: "NFPA, OSHA Electrical Standards"
certification_type: "Electrical Safety Certificate"
delivery_method: "Online"
accreditation: "NFPA Certified"
language: "English"
```

### Intuto Integration Metafields (namespace: intuto)
```yaml
course_id: "electrical-safety-2025"
token_pool_id: "electrical_safety_tokens"
enrollment_url_template: "https://aai.intuto.com/enroll/{token}?course=electrical-safety"
completion_webhook: "https://aai-institute.com/webhooks/intuto/completion"
embed_url: "https://aai.intuto.com/embed/electrical-safety"
```

---

## Additional Setup Steps

### 1. Course Collection Setup
1. Go to **Products > Collections**
2. Create "Courses" collection with handle `courses`
3. Set condition: Product type equals "Digital Course"
4. Add all course products to this collection

### 2. Product Images
Upload high-quality course images (1200x800px minimum):
- ASTM F24: Professional safety documentation/standards imagery
- Water Park: Pool/water park facility imagery
- Ride Inspection: Amusement ride inspection imagery
- Risk Management: Business/safety meeting imagery
- Guest Services: Customer service/hospitality imagery
- Electrical Safety: Electrical systems/safety equipment imagery

### 3. SEO Settings
For each product, configure:
- **Page title**: Include course name and "AAI Institute"
- **Meta description**: Include key benefits, CEU credits, and level
- **URL handle**: Keep consistent with product handles above

### 4. Related Products
Set up related product recommendations:
- ASTM F24 → Ride Inspection (similar advanced level)
- Water Park → Guest Services (operational focus)
- Risk Management → All courses (foundational)
- Guest Services → Risk Management (complementary skills)
- Electrical Safety → Ride Inspection (technical focus)

---

## Validation Checklist

### Product Setup Validation
- [ ] All 6 products created with correct SKUs
- [ ] Product types set to "Digital Course"
- [ ] Template assigned to "product.course"
- [ ] All metafields populated with exact values above
- [ ] Products added to "Courses" collection
- [ ] Images uploaded and optimized
- [ ] SEO settings configured

### Integration Validation
- [ ] Metafields display correctly on product pages
- [ ] Course details section shows all information
- [ ] CEU credits and prerequisites display properly
- [ ] Enrollment buttons functional
- [ ] Code Selling App recognizes product SKUs
- [ ] Test purchase flow works end-to-end

---

**Setup Time**: 2-3 hours for all products
**Dependencies**: Metafields configured, Code Selling App installed
**Next Steps**: Generate Intuto tokens, configure Code Selling App pools
