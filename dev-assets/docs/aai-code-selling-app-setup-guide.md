<!-- AAI LMS - Code Selling App Integration Setup & Testing Guide -->
# AAI Code Selling App Integration Setup & Testing Protocol

## Current Status: 📦 Ready for Implementation

### Implementation Checklist:
- ✅ Course product templates created and TCI-1 product ready for import
- ✅ Professional course collection styling complete with TypeScript fixes
- ✅ Updated webhook handlers for Code Selling App integration workflow
- ✅ Customer account course access configured with progress tracking
- ✅ Intuto course embedding infrastructure ready for token management

---

## Overview
This guide details the integration of Code Selling App with Shopify for automated course delivery via Intuto tokens. Code Selling App provides superior digital product delivery with token pool management specifically designed for LMS integration.

## Immediate Next Steps (Priority Order)

### Step 1: Code Selling App Setup
**Priority: HIGH - Required for TCI-1 course delivery**

#### Action Items:
1. **Install Code Selling App**
   - URL: https://apps.shopify.com/codeselling
   - Install directly from Shopify Admin > Apps
   - Choose plan based on volume needs (Professional recommended)
   - Complete onboarding setup

2. **Initial Configuration**
   - Set up app preferences in Shopify Admin
   - Configure delivery settings and timeframes
   - Set up basic email templates for professional delivery
   - Enable webhook notifications for order processing

3. **Token Pool Setup**
   - Create token pool for TCI-1 course
   - Configure pool settings (single-use, expiration rules)
   - Set up automated pool monitoring and alerts

### Step 2: Intuto Multi Token Generation & Import
**Priority: HIGH - Required for TCI-1 course access**

#### Action Items:
1. **Generate TCI-1 Tokens in Intuto**
   - Access Intuto admin panel
   - Navigate to TCI-1 course settings
   - Generate 50-100 Multi Tokens for initial pool
   - Export token URLs in bulk

2. **Format Tokens for Import**
   - Save each token URL as individual entries
   - Format: Clean URL strings without extra formatting
   - Verify each token opens correctly in browser
   - Document token format for future reference

3. **Import to Code Selling App**
   - Create "TCI-1 Tokens" pool in Code Selling App
   - Bulk import all token URLs
   - Set pool rules: Single-use, no expiration
   - Link pool to TCI-1 Shopify product (SKU: AAI-TCI-1)

### Step 3: TCI-1 Product Configuration
**Priority: HIGH - Enables immediate sales**

#### Action Items:
1. **Verify TCI-1 Product Import**
   - Confirm TCI-1 product exists in Shopify
   - Verify all metafields are populated correctly
   - Check SKU matches Code Selling App configuration
   - Ensure product uses course template

2. **Link Product to Token Pool**
   - In Code Selling App, select TCI-1 product
   - Assign "TCI-1 Tokens" pool
   - Configure delivery settings:
     - Immediate delivery after payment
     - Single token per purchase
     - Professional email template

3. **Configure Email Template**
   - Use AAI professional branding
   - Include course details and CEU information
   - Add clear access instructions
   - Include support contact information

### Step 4: End-to-End Testing
**Priority: HIGH - Validates complete purchase flow**

#### Test Scenarios:
1. **Complete Purchase Flow**
   ```
   Customer visits TCI-1 product page → 
   Adds to cart and completes checkout → 
   Code Selling App processes order → 
   Customer receives email with Intuto token → 
   Customer accesses course successfully
   ```

2. **Order Processing Validation**
   - Create test order for TCI-1 course
   - Verify Code Selling App receives order notification
   - Confirm token is selected from pool and delivered
   - Test email delivery timing (should be < 2 minutes)
   - Validate token URL functionality

3. **Token Pool Management**
   - Monitor token pool depletion after test orders
   - Verify used tokens are marked as consumed
   - Test pool monitoring and alert system
   - Confirm no token reuse occurs

#### Success Criteria:
- [ ] Order processing < 2 minutes from payment
- [ ] Email delivery with professional AAI formatting
- [ ] Token URLs provide immediate course access
- [ ] Single-use token enforcement works correctly
- [ ] Pool monitoring tracks usage accurately

## Professional Email Template Configuration

### Email Structure for AAI Authority:
```
Subject: "Your TCI-1 Professional Certification Access - AAI Institute"

Header: 
- AAI logo and "Since 2025" professional branding
- Authority Navy (#1e3a5f) color scheme

Content:
- Professional greeting with customer name
- Course title: "Trampoline Court Inspector Training Level 1 (TCI-1)"
- Course details: 1 Hour | 1 CEU Credit | Beginner Level
- Clear access instructions with token URL
- Course completion requirements
- CEU credit information

Footer:
- Industry credentials (IAAPA, ASTM F24, NAARSO)
- Professional development support contact
- AAI Institute contact information
```

### Key Messaging Focus:
- **Professional Development**: Emphasize career advancement
- **Industry Recognition**: Highlight AAI credentials and partnerships
- **Family Entertainment Centers**: Position courses for FEC professionals
- **Adventure Park Focus**: Target trampoline parks and adventure facilities

## Advanced Configuration

### Token Pool Management Strategy:
1. **Initial Pool Size**: 50-100 tokens per course
2. **Monitoring Threshold**: Alert at 25% remaining
3. **Replenishment**: Generate new tokens when pool reaches 10 tokens
4. **Rotation Strategy**: Use oldest tokens first to prevent expiration

### Integration Monitoring:
1. **Order Processing**: Track processing time and success rate
2. **Email Delivery**: Monitor delivery rates and bounces
3. **Token Usage**: Track token consumption and success rates
4. **Customer Support**: Monitor access issues and support requests

### Analytics & Reporting:
- **Sales Metrics**: Track TCI-1 course sales and conversion rates
- **Token Efficiency**: Monitor token pool usage and waste
- **Customer Journey**: Track from purchase to course completion
- **Support Tickets**: Analyze common issues and resolutions

## Quality Assurance Checklist

### Technical Validation:
- [ ] Order processing: Shopify → Code Selling App (< 2 minutes)
- [ ] Email delivery: Professional formatting with AAI branding
- [ ] Token delivery: Unique Intuto URLs for each customer
- [ ] Single-use enforcement: Tokens work only once per customer
- [ ] Mobile compatibility: Professional appearance on all devices

### Professional Standards:
- [ ] Email templates reflect FEC/adventure park focus
- [ ] Course materials emphasize professional development
- [ ] Industry credentials displayed prominently (IAAPA, ASTM F24)
- [ ] Professional tone maintained throughout customer journey
- [ ] Support channels clearly identified for professionals

### User Experience:
- [ ] Clear course access instructions for industry professionals
- [ ] Professional development context maintained in all communications
- [ ] FEC and adventure park-appropriate language and terminology
- [ ] Easy support contact for professional development questions
- [ ] Certificate/completion tracking guidance for CEU credits

## Risk Mitigation & Troubleshooting

### Common Issues & Solutions:
1. **Token Pool Depletion**
   - Set up automated alerts at 25% remaining
   - Implement emergency token generation process
   - Monitor usage patterns to predict needs

2. **Email Delivery Issues**
   - Configure professional "from" address
   - Set up backup email notification system
   - Monitor delivery rates and bounce handling

3. **Integration Failures**
   - Implement webhook retry logic
   - Set up manual order processing backup
   - Create customer support escalation process

### Monitoring & Maintenance:
- **Daily**: Check token pool levels and email delivery rates
- **Weekly**: Review customer support tickets and resolution times
- **Monthly**: Analyze sales data and token usage efficiency
- **Quarterly**: Review and update email templates and messaging

## Future Course Integration

### Scalability Preparation:
1. **Template Systems**: Create reusable token pool templates
2. **Automated Workflows**: Set up automatic product-to-pool linking
3. **Bulk Token Management**: Develop efficient token generation processes
4. **Multi-Course Support**: Prepare for multiple simultaneous courses

### Integration with Dynamic Course Creation:
- **Automatic Pool Creation**: When new courses are added via automation
- **Token Generation Integration**: Link with Intuto API for seamless token creation
- **Product Linking**: Automatic association of new products with token pools
- **Scaling Monitoring**: Track performance as course catalog grows

## Success Metrics & KPIs

### Technical Performance:
- **Order Processing Time**: < 2 minutes (target: < 1 minute)
- **Email Delivery Rate**: > 99%
- **Token Success Rate**: > 99% (tokens work when accessed)
- **System Uptime**: > 99.9%

### Business Metrics:
- **Customer Satisfaction**: > 95% (based on post-purchase surveys)
- **Support Ticket Rate**: < 1% of orders
- **Course Access Rate**: > 98% (customers who receive tokens access courses)
- **Token Efficiency**: < 2% waste (unused tokens)

### Professional Development Focus:
- **Industry Relevance**: Measure course applicability to FEC/adventure parks
- **Career Impact**: Track professional advancement of course completers
- **Credential Recognition**: Monitor industry acceptance of AAI certifications
- **Continuing Education**: Track CEU credit usage and professional development

## Implementation Timeline

### Week 1: Setup & Configuration
- Install and configure Code Selling App
- Generate and import TCI-1 tokens
- Set up professional email templates
- Complete initial testing

### Week 2: Testing & Refinement
- Conduct comprehensive end-to-end testing
- Refine email templates and messaging
- Test token pool management
- Train customer support team

### Week 3: Launch Preparation
- Final quality assurance testing
- Monitor system performance under load
- Prepare launch marketing materials
- Set up ongoing monitoring systems

### Week 4: Soft Launch
- Limited release to select customers
- Monitor performance and gather feedback
- Refine processes based on real usage
- Prepare for full launch

## Support & Resources

### Code Selling App Support:
- Documentation: Available in Shopify Admin after installation
- Support: Through app dashboard or Shopify Partner support
- Best Practices: Focus on professional development industry needs

### AAI Institute Implementation:
- Focus on professional development for FEC and adventure park industries
- Emphasize career advancement and industry recognition
- Maintain authority branding throughout customer journey
- Position as essential professional development resource

### Next Phase Planning:
- **Multi-Course Expansion**: Prepare infrastructure for additional courses
- **Advanced Analytics**: Implement detailed tracking and reporting
- **Customer Success Programs**: Develop ongoing professional development relationships
- **Industry Partnerships**: Leverage success for broader industry recognition

---

**IMMEDIATE ACTION REQUIRED:**
1. Install Code Selling App and complete basic configuration
2. Generate TCI-1 tokens in Intuto and import to token pool
3. Configure professional email template with AAI branding and FEC focus
4. Test complete purchase → delivery → access flow
5. Monitor and refine based on initial results

This implementation positions AAI as the authoritative source for professional development in the family entertainment center and adventure park industry.
