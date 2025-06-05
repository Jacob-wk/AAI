# AAI LMS Intuto Integration Implementation

## 🎯 Project Status
- ✅ **Phase 1**: Foundation Setup (Current)
- ⏳ **Phase 2**: Product Configuration 
- ⏳ **Phase 3**: Code Selling App Integration
- ⏳ **Phase 4**: Customer Journey Enhancement
- ⏳ **Phase 5**: Testing & Launch

## 📋 Phase 1: Foundation Setup (IN PROGRESS)

### ✅ Theme Infrastructure Ready
The AAI theme already includes:
- Professional course card layouts with metafield support
- Customer account integration for purchased courses
- Course details sections with CEU credits, duration, prerequisites
- Filtering system for courses by level, category, CEU credits
- Mobile-responsive professional design

### 🔧 Required Product Metafields
The following metafields need to be configured in Shopify Admin:

#### Course Information Metafields
```
Namespace: course
- level: Single line text (Beginner, Intermediate, Advanced)
- ceu_credits: Integer (number of CEU credits)
- duration: Single line text (e.g., "40 Hours", "3 Days")
- prerequisites: Single line text
- learning_objectives: Multi-line text (| separated)
- standards_covered: Single line text (e.g., "ASTM F24, IAAPA Guidelines")
- certification_type: Single line text (e.g., "Professional Certificate")
- delivery_method: Single line text (Online, Blended, In-Person)
- accreditation: Single line text (e.g., "IAAPA Certified")
- language: Single line text (default: English)
```

#### Intuto Integration Metafields
```
Namespace: intuto
- course_id: Single line text (Intuto course identifier)
- token_pool_id: Single line text (Code Selling App pool identifier)  
- enrollment_url_template: URL (Intuto enrollment URL pattern)
- completion_webhook: URL (webhook for course completion)
```

### 📦 Code Selling App Configuration
1. **Product Linking**: Each Shopify product linked to code pool
2. **Token Management**: Pre-loaded Intuto Multi Token URLs
3. **Delivery Settings**: Immediate delivery upon order completion
4. **Email Templates**: Professional AAI branded delivery emails

## 📋 Phase 2: Course Products Setup

### Individual Course Products Configuration

#### ASTM F24 Standards Mastery
```yaml
Product Details:
  Title: "ASTM F24 Standards Mastery"
  Price: $599
  Handle: astm-f24-standards-mastery
  Product Type: "Digital Course"
  Template: product.course.liquid

Metafields:
  course.level: "Advanced"
  course.ceu_credits: 8
  course.duration: "40 Hours"
  course.prerequisites: "Basic Safety Certification"
  course.learning_objectives: "Master complete ASTM F24 standards|Implement inspection protocols|Develop safety documentation systems|Lead compliance training programs"
  course.standards_covered: "ASTM F24, IAAPA Guidelines"
  course.certification_type: "Professional Certificate"
  course.delivery_method: "Online"
  course.accreditation: "IAAPA Certified"

Code Selling Integration:
  Pool ID: "astm_f24_tokens"
  Initial Token Count: 500
  Reorder Threshold: 50
```

#### Water Park Safety Operations
```yaml
Product Details:
  Title: "Water Park Safety Operations"
  Price: $449
  Handle: water-park-safety-operations
  
Metafields:
  course.level: "Intermediate"
  course.ceu_credits: 6
  course.duration: "32 Hours"
  course.prerequisites: "Lifeguard Certification"
  course.learning_objectives: "Chemical management protocols|Lifeguarding standards|Equipment maintenance|Emergency response procedures"
  course.standards_covered: "MAHC, IAAPA Water Guidelines"
  course.certification_type: "Water Safety Certificate"

Code Selling Integration:
  Pool ID: "water_park_tokens"
  Initial Token Count: 300
```

#### Ride Inspection Certification
```yaml
Product Details:
  Title: "Ride Inspection Certification"
  Price: $899
  Handle: ride-inspection-certification
  
Metafields:
  course.level: "Professional"
  course.ceu_credits: 12
  course.duration: "60 Hours"
  course.prerequisites: "2+ years industry experience"
  course.learning_objectives: "Mechanical systems inspection|Electrical safety protocols|Documentation requirements|Regulatory compliance"
  course.standards_covered: "ASTM F24, State Regulations"
  course.certification_type: "Inspector ID Card"

Code Selling Integration:
  Pool ID: "ride_inspection_tokens"
  Initial Token Count: 200
```

#### Risk Management Fundamentals
```yaml
Product Details:
  Title: "Risk Management Fundamentals"
  Price: $299
  Handle: risk-management-fundamentals
  
Metafields:
  course.level: "Beginner"
  course.ceu_credits: 4
  course.duration: "20 Hours"
  course.prerequisites: "None"
  course.learning_objectives: "Risk assessment strategies|Liability reduction|Safety protocol development|Incident management"
  course.standards_covered: "Industry Best Practices"
  course.certification_type: "Risk Management Certificate"

Code Selling Integration:
  Pool ID: "risk_mgmt_tokens"
  Initial Token Count: 300
```

#### Guest Services Excellence
```yaml
Product Details:
  Title: "Guest Services Excellence"
  Price: $199
  Handle: guest-services-excellence
  
Metafields:
  course.level: "All Levels"
  course.ceu_credits: 3
  course.duration: "16 Hours"
  course.prerequisites: "None"
  course.learning_objectives: "De-escalation techniques|ADA compliance|Emergency procedures|Guest satisfaction strategies"
  course.standards_covered: "ADA Guidelines, Customer Service Best Practices"
  course.certification_type: "Guest Services Certificate"

Code Selling Integration:
  Pool ID: "guest_services_tokens"
  Initial Token Count: 400
```

#### Electrical Systems Safety
```yaml
Product Details:
  Title: "Electrical Systems Safety"
  Price: $799
  Handle: electrical-systems-safety
  
Metafields:
  course.level: "Advanced"
  course.ceu_credits: 10
  course.duration: "48 Hours"
  course.prerequisites: "Basic Electrical Knowledge"
  course.learning_objectives: "Control circuit analysis|LOTO procedures|Electrical inspection|Safety compliance|Troubleshooting techniques"
  course.standards_covered: "NFPA, OSHA Electrical Standards"
  course.certification_type: "Electrical Safety Certificate"

Code Selling Integration:
  Pool ID: "electrical_safety_tokens"
  Initial Token Count: 200
```

## 📋 Phase 3: Code Selling App Configuration

### Email Template Configuration
```html
Subject: Your {product_title} Access - AAI Professional Development

Dear {customer_first_name},

Thank you for enrolling in {product_title} with AAI Institute.

🎓 Your secure course access link:
{unique_token_url}

This link will automatically enroll you and provide immediate access to:
• Interactive course modules
• Professional assessments  
• CEU credit tracking ({ceu_credits} credits)
• Digital certificate upon completion

📚 Course Details:
• Duration: {duration}
• Level: {level}
• Prerequisites: {prerequisites}

💡 Getting Started:
1. Click your unique access link above
2. Complete your Intuto profile setup
3. Begin learning immediately
4. Track progress in your AAI customer account

🔧 Technical Support:
Email: support@aai-institute.com
Phone: 1-800-AAI-HELP

Best regards,
The AAI Institute Team
Professional Safety Education Since 2025
```

### Token Pool Management
```yaml
Monitoring Thresholds:
  Critical: 25 tokens remaining
  Warning: 50 tokens remaining
  Healthy: 100+ tokens remaining

Auto-Generation Triggers:
  - Email alert when threshold reached
  - Automatic Intuto token generation request
  - Slack notification to admin team
  - Dashboard reporting

Token Lifecycle:
  - Generate in Intuto with 1-year expiry
  - Import to Code Selling App
  - Monitor usage patterns
  - Generate reports on demand forecasting
```

## 📋 Phase 4: Customer Journey Enhancement

### Customer Account Integration
The existing `customers/account.liquid` template already supports:
- Purchased courses display with progress tracking
- CEU credits earned calculation
- Course access links
- Professional development dashboard

### Course Access Workflow
1. **Purchase**: Customer completes Shopify checkout
2. **Trigger**: Order webhook triggers Code Selling App
3. **Token Assignment**: App selects unused Intuto token from pool
4. **Email Delivery**: Professional email with unique token URL
5. **Intuto Enrollment**: Customer clicks token, auto-enrolled in Intuto
6. **Progress Tracking**: Course progress synced to Shopify (if webhook configured)
7. **Completion**: Certificate generated, recorded in customer account

### Customer Support Integration
- Clear troubleshooting guides in help center
- Easy re-access instructions in customer account
- Support ticket system for technical issues
- FAQ section covering common scenarios

## 📋 Phase 5: Testing & Quality Assurance

### Pre-Launch Testing Checklist
- [ ] Product metafields properly configured
- [ ] Code Selling App token pools loaded and tested
- [ ] Email delivery formatting and branding verified
- [ ] Intuto token URLs functional and auto-enrolling
- [ ] Customer account integration displaying correctly
- [ ] Mobile responsiveness across all touchpoints
- [ ] Purchase to access workflow timing optimal
- [ ] Error handling for edge cases implemented

### Success Metrics
- **Token Delivery Success Rate**: >99%
- **Course Access Time**: <5 minutes from purchase
- **Customer Satisfaction**: >4.5/5 rating
- **Support Ticket Volume**: <2% of purchases
- **Email Delivery Rate**: >98%

## 🚀 Implementation Timeline

### Week 1: Foundation (Current)
- [x] Document integration architecture
- [ ] Configure product metafields in Shopify
- [ ] Set up Code Selling App account
- [ ] Create initial token pools

### Week 2: Product Setup
- [ ] Configure all 6 course products
- [ ] Generate initial Intuto token batches
- [ ] Load tokens into Code Selling App
- [ ] Test basic purchase-to-delivery flow

### Week 3: Enhancement & Testing
- [ ] Customize email templates
- [ ] Implement customer account enhancements
- [ ] Comprehensive testing across all scenarios
- [ ] Performance optimization

### Week 4: Launch Preparation
- [ ] Final testing and validation
- [ ] Staff training and documentation
- [ ] Monitoring setup
- [ ] Soft launch with limited products

## 📞 Next Steps
1. **Configure Shopify Metafields** (Today)
2. **Set up Code Selling App** (This Week)
3. **Generate Intuto Tokens** (This Week)
4. **Test Purchase Flow** (Next Week)

---

**Status**: Ready for Phase 1 implementation
**Priority**: High - Foundation for LMS integration
**Owner**: Development Team
**Timeline**: 4 weeks to full launch
