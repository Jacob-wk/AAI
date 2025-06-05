# AAI FEC Course Implementation - Phase 2 Implementation Guide
# Family Entertainment Center Safety Training Program

## 🎯 Current Status & Constraints
- ✅ Code Selling App installed (not yet paid)
- ❌ Intuto API access not yet available  
- ✅ FEC-focused course structure defined
- ✅ Shopify theme infrastructure ready

## 📋 Phase 2A: Manual Setup Process (Current Implementation)

### Step 1: Shopify Metafields Configuration
**Required Action:** Manual setup in Shopify Admin

1. Navigate to `Settings > Metafields`
2. Create Product metafields using the script in `/scripts/shopify-metafields-bulk.liquid`
3. Copy the console script output and paste in browser console on Metafields page

**Metafields to Create:**
- **course** namespace: level, ceu_credits, duration, prerequisites, learning_objectives, standards_covered, certification_type, delivery_method, accreditation, language
- **intuto** namespace: course_id, token_pool_id, enrollment_url_template, completion_webhook
- **courses** namespace (customer): enrolled_courses, completed_courses, total_ceu_earned, certification_numbers

### Step 2: FEC Course Products Bulk Import
**Required Action:** CSV import to Shopify Admin

1. Use generated file: `/scripts/fec-courses-import.csv`
2. Navigate to `Products > Import`
3. Upload CSV with all 6 FEC courses:
   - Trampoline Safety Operations ($449)
   - Staff Training & Customer Safety ($299)
   - Risk Management for FECs ($349)
   - Equipment Inspection Fundamentals ($399)
   - Emergency Response Protocols ($249)
   - Legal Compliance for Family Entertainment ($499)

### Step 3: Code Selling App Initial Setup (Manual Process)
**Required Action:** Configure without API integration

1. **Upgrade Code Selling App** to paid plan
2. **Create Token Pools** manually for each course:
   ```yaml
   Pool 1: trampoline_safety_tokens (300 tokens)
   Pool 2: staff_training_tokens (400 tokens)
   Pool 3: risk_mgmt_tokens (250 tokens)
   Pool 4: equipment_inspection_tokens (200 tokens)
   Pool 5: emergency_response_tokens (350 tokens)
   Pool 6: legal_compliance_tokens (150 tokens)
   ```

3. **Manual Token Generation Process:**
   - Generate placeholder URLs initially
   - Replace with real Intuto tokens when API access available
   - Use format: `https://aai.intuto.com/enroll/TOKEN_PLACEHOLDER_001`

### Step 4: Email Template Configuration
**Required Action:** Set up FEC-specific messaging

Use the email template from `/scripts/code-selling-app-setup.md` with FEC industry focus:

```html
Subject: Your {product_title} Access - AAI FEC Safety Training

Dear {customer_first_name},

Thank you for enrolling in {product_title} with AAI Institute - the leading provider of Family Entertainment Center safety education.

🎯 Your Course Access:
{code}

This comprehensive training is specifically designed for trampoline parks and family entertainment centers, featuring:
✅ Real-world FEC case studies
✅ Trampoline-specific safety protocols  
✅ Staff training modules
✅ Insurance compliance documentation
✅ Professional certification

Course Support: support@aai-institute.com
FEC Industry Expertise Since 1978
```

## 📋 Phase 2B: API Integration (Future Enhancement)

### Intuto API Setup Process
**When API access becomes available:**

1. **Generate API Keys:**
   - Login to Intuto Admin
   - Navigate to Settings > API/Webhooks > API V2
   - Create "AAI Shopify Integration" key
   - Store Client ID and Secret securely

2. **Multi Token Batch Generation:**
   ```javascript
   // Token generation script for each FEC course
   const tokenRequests = [
     { course_id: 'trampoline_safety_ops_2024', tokens: 300, pool: 'trampoline_safety_tokens' },
     { course_id: 'staff_training_safety_2024', tokens: 400, pool: 'staff_training_tokens' },
     { course_id: 'risk_mgmt_fecs_2024', tokens: 250, pool: 'risk_mgmt_tokens' },
     { course_id: 'equipment_inspection_2024', tokens: 200, pool: 'equipment_inspection_tokens' },
     { course_id: 'emergency_response_2024', tokens: 350, pool: 'emergency_response_tokens' },
     { course_id: 'legal_compliance_fec_2024', tokens: 150, pool: 'legal_compliance_tokens' }
   ];
   ```

3. **Replace Placeholder Tokens:**
   - Export real tokens from Intuto
   - Update Code Selling App pools
   - Test enrollment flow

## 🏗️ FEC Course Bundle Strategy

### Bundle Packages for Different FEC Types
Create product bundles to increase average order value:

#### 1. Trampoline Park Essentials Bundle ($999)
- Trampoline Safety Operations
- Staff Training & Customer Safety  
- Risk Management for FECs
- **Save $148** vs individual purchase

#### 2. FEC Manager Certification ($1,399)
- All Trampoline Park Essentials courses
- Equipment Inspection Fundamentals
- Emergency Response Protocols
- **Save $198** vs individual purchase

#### 3. Complete FEC Safety Program ($1,799)
- All individual courses included
- Legal Compliance for Family Entertainment
- **Save $348** vs individual purchase
- **Bonus:** Quarterly safety updates for 1 year

### Bundle Implementation in Shopify
```yaml
Bundle Configuration:
- Product Type: "Course Bundle"
- Template: product.bundle.liquid
- Metafields: 
  - bundle.courses: JSON array of included course handles
  - bundle.savings: Dollar amount saved
  - bundle.bonus_content: Additional materials included
```

## 🎯 FEC Market Testing Strategy

### Phase 2C: Pre-Launch Testing (Manual Process)

#### Test Scenarios for FEC Industry:
1. **Single Course Purchase:**
   - Test: Trampoline Safety Operations
   - Verify: Email delivery, course access, mobile compatibility

2. **Multi-Location Operator:**
   - Test: Bulk purchase simulation
   - Verify: Multiple email deliveries to different managers

3. **Staff Turnover Scenario:**
   - Test: Re-access request process
   - Verify: Support workflow for new staff training

4. **Insurance Compliance Check:**
   - Test: Certificate generation and delivery
   - Verify: Professional documentation quality

#### Success Metrics for Testing:
- ✅ Email delivery: >98% success rate
- ✅ Course access: <2 minutes from purchase
- ✅ Mobile compatibility: Full functionality on smartphones
- ✅ Support response: <4 hours for access issues

## 🚀 Launch Readiness Checklist

### Technical Requirements:
- [ ] All 6 FEC courses created in Shopify
- [ ] Code Selling App configured with token pools
- [ ] Email templates customized for FEC industry
- [ ] Mobile-responsive course access tested
- [ ] Support documentation prepared

### Business Requirements:
- [ ] FEC industry pricing strategy validated
- [ ] Trampoline park marketing materials ready
- [ ] Customer support team trained on FEC needs
- [ ] Insurance compliance documentation verified
- [ ] Multi-location operator workflows tested

### Marketing Requirements:
- [ ] FEC-specific landing pages created
- [ ] Trampoline park case studies prepared
- [ ] Industry association partnerships established
- [ ] Social proof from existing FEC customers
- [ ] SEO optimization for FEC search terms

## 📊 FEC Industry Monitoring Dashboard

### Daily Metrics:
- Course enrollment by FEC type (trampoline vs other)
- Token delivery success rates
- Customer support ticket volume
- Mobile vs desktop access patterns

### Weekly Reports:
- Popular course combinations for FEC operators
- Geographic distribution of FEC customers
- Seasonal trends in safety training demand
- Multi-location operator purchasing patterns

### Monthly Analysis:
- FEC market penetration rates
- Customer lifetime value by FEC size
- Course completion rates by industry segment
- Insurance-driven enrollment correlations

## 🔄 Iterative Improvement Process

### Phase 2D: Continuous Enhancement
**Monthly Reviews:**
1. **Customer Feedback Analysis:**
   - Survey FEC operators on course quality
   - Identify gaps in trampoline-specific content
   - Request additional safety topics

2. **Technical Performance Review:**
   - Monitor token delivery success rates
   - Optimize email templates based on open rates
   - Improve mobile course access experience

3. **Business Development:**
   - Expand FEC course catalog based on demand
   - Develop partnerships with trampoline manufacturers
   - Create advanced certification programs

## 🎯 Success Indicators for Phase 2

### Technical Success:
- [ ] All FEC courses accessible via Code Selling App
- [ ] Email delivery success rate >98%
- [ ] Course access time <2 minutes average
- [ ] Zero critical technical issues reported

### Business Success:
- [ ] Trampoline park market penetration >10%
- [ ] Average order value >$450 for FEC customers
- [ ] Customer satisfaction score >4.5/5
- [ ] Repeat purchase rate >25% within 12 months

### Market Success:
- [ ] Recognition as leading FEC safety education provider
- [ ] Partnerships with major trampoline park chains
- [ ] Featured at IAAPA and FEC industry events
- [ ] Positive case studies from successful implementations

This implementation guide provides a clear path forward even without immediate API access, focusing on manual setup processes that can be enhanced with automation as capabilities become available.
