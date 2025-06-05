# AAI LMS - Code Selling App Setup Implementation Guide

## Overview
This guide provides step-by-step instructions for replacing FetchApp with the Code Selling App for AAI's LMS course delivery system.

## Phase 1: Code Selling App Installation & Configuration

### Step 1: Install Code Selling App in Shopify
1. **Navigate to Shopify App Store**
   - Go to your Shopify Admin: `https://[your-store].myshopify.com/admin`
   - Visit Apps → Shopify App Store
   - Search for "Code Selling App" or "Digital Downloads"

2. **Install and Configure App**
   ```bash
   # App Store URL
   https://apps.shopify.com/code-selling-app
   ```
   - Click "Add app" and authorize permissions
   - Complete initial setup wizard

### Step 2: Configure Code Pool Management
```javascript
// Example configuration for TCI-1 course
{
  "product_id": "tci-1-course",
  "token_pool": {
    "name": "TCI-1 Intuto Access Tokens",
    "description": "Enrollment tokens for Trampoline Court Inspector Level 1",
    "delivery_method": "email",
    "tokens": [
      "https://aai.intuto.com/enroll/token-001",
      "https://aai.intuto.com/enroll/token-002",
      // ... additional tokens
    ]
  }
}
```

## Phase 2: TCI-1 Course Integration

### Step 3: Prepare Intuto Token Pool
1. **Generate Enrollment Tokens in Intuto**
   ```bash
   # Log into Intuto Admin
   # Navigate to: Courses → TCI-1 → Enrollment Management
   # Generate bulk enrollment URLs (minimum 50 tokens recommended)
   ```

2. **Format Tokens for Code Selling App**
   ```text
   # Create text file: tci-1-tokens.txt
   https://aai.intuto.com/enroll/abc123def456
   https://aai.intuto.com/enroll/ghi789jkl012
   https://aai.intuto.com/enroll/mno345pqr678
   ```

### Step 4: Configure TCI-1 Product in Code Selling App
1. **Link Product to App**
   - In Shopify Admin → Apps → Code Selling App
   - Find "Trampoline Court Inspector Training Level 1 (TCI-1)"
   - Enable digital delivery for this product

2. **Upload Token Pool**
   - Upload `tci-1-tokens.txt` file
   - Configure delivery settings:
     ```json
     {
       "delivery_method": "email",
       "email_template": "course_access",
       "deliver_after": "payment_confirmed",
       "tokens_per_purchase": 1
     }
     ```

## Phase 3: Remove FetchApp Dependencies

### Step 5: Update Webhook Configuration
```javascript
// File: /dev-assets/webhooks/order-created.js
// Replace FetchApp references with Code Selling App monitoring

// OLD (FetchApp):
deliveryMethod: 'FetchApp',
delivery_method: 'fetchapp'

// NEW (Code Selling App):
deliveryMethod: 'Code Selling App',
delivery_method: 'code_selling_app'
```

### Step 6: Update Documentation References
- [x] Replace `/dev-assets/docs/aai-fetchapp-setup-testing-guide.md`
- [x] Update `/dev-assets/docs/aai-fetch-app-implementation.md`
- [x] Create new Code Selling App documentation

## Phase 4: Testing & Validation

### Step 7: End-to-End Testing Protocol
1. **Test Purchase Flow**
   ```bash
   # Test scenarios:
   # 1. Valid course purchase
   # 2. Payment confirmation
   # 3. Token delivery via email
   # 4. Intuto enrollment process
   # 5. Course access verification
   ```

2. **Validate Token Management**
   - Monitor token pool levels
   - Test automatic replenishment alerts
   - Verify unique token delivery per purchase

### Step 8: Collection Organization Testing
```bash
# Run collections setup
cd /workspaces/AAI/scripts
node collections-setup.js

# Update TCI-1 product tags
node update-tci1-product.js

# Verify collections display correctly
```

## Phase 5: Professional Messaging Updates

### Step 9: FEC/Adventure Park Messaging
- [x] Updated hero sections to focus on Family Entertainment Centers
- [x] Updated statistics to reflect FEC industry focus
- [x] Updated course descriptions for adventure park professionals

### Step 10: Navigation & Content Updates
```liquid
<!-- Update navigation labels -->
<!-- OLD: "Amusement Industry Training" -->
<!-- NEW: "FEC & Adventure Park Training" -->

<!-- Update collection page headers -->
<!-- Focus on Family Entertainment Centers -->
<!-- Emphasize adventure park safety -->
```

## Phase 6: Launch Checklist

### Pre-Launch Validation
- [ ] Code Selling App fully configured
- [ ] TCI-1 token pool uploaded and tested
- [ ] All FetchApp references removed
- [ ] Collections created and organized
- [ ] Course appears in correct collections
- [ ] Purchase flow tested end-to-end
- [ ] Email delivery templates customized
- [ ] Token pool monitoring configured

### Launch Day Steps
1. **Enable Code Selling App** for TCI-1 product
2. **Disable any FetchApp** integration (if still active)
3. **Monitor first purchases** for proper token delivery
4. **Verify Intuto enrollment** works correctly
5. **Document any issues** for immediate resolution

### Post-Launch Monitoring
- Monitor token pool levels
- Track course enrollment success rates
- Collect customer feedback on course access
- Monitor email delivery rates
- Track completion rates in Intuto

## Technical Implementation Files

### Updated Files
```bash
# Core implementation files
/dev-assets/webhooks/order-created.js          # Updated to Code Selling App
/sections/aai-hero.liquid                      # FEC messaging
/sections/aai-universal-hero.liquid            # FEC messaging  
/sections/aai-collection-courses-hero.liquid   # FEC messaging
/scripts/actual-course-products-setup.js       # Updated tags
/scripts/collections-setup.js                  # New collections
/scripts/update-tci1-product.js               # Tag updates

# Documentation
/dev-assets/docs/aai-code-selling-app-setup-guide.md
/scripts/collections-setup-guide.md
```

## Success Metrics

### Key Performance Indicators
1. **Course Access Success Rate**: >98%
2. **Token Delivery Time**: <5 minutes
3. **Customer Support Tickets**: <2% of purchases
4. **Intuto Enrollment Rate**: >95%
5. **Course Completion Rate**: Track baseline

### Monitoring Dashboard
```javascript
// Metrics to track
{
  "purchases": "Daily course purchases",
  "deliveries": "Successful token deliveries", 
  "enrollments": "Intuto course enrollments",
  "completions": "Course completion rates",
  "support_tickets": "Course access issues"
}
```

## Next Steps After TCI-1 Success

1. **Scale to Additional Courses**: Add more Intuto courses
2. **Expand Course Catalog**: Create course roadmap
3. **Advanced Features**: Bulk discounts, course bundles
4. **Analytics Integration**: Enhanced reporting
5. **Mobile Optimization**: Course access on mobile devices

---

**Status**: Ready for Code Selling App installation and TCI-1 integration  
**Last Updated**: June 5, 2025  
**Next Action**: Install Code Selling App from Shopify App Store
