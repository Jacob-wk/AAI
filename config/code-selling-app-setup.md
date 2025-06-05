# Code Selling App Configuration for AAI LMS Intuto Integration

## Overview
This guide configures the Code Selling App to serve as middleware between Shopify orders and Intuto course delivery using Multi Token system.

## Account Setup

### Step 1: Install Code Selling App
1. Visit Shopify App Store: https://apps.shopify.com/code-selling-app
2. Install app to your AAI Shopify store
3. Complete account setup and subscription selection

### Step 2: Basic Configuration
```yaml
App Settings:
  Store Integration: Enabled
  Auto-Delivery: Immediate (upon order completion)
  Download Limits: Single Use (matches Intuto token behavior)
  Email Delivery: Enabled
  Customer Account Integration: Enabled
```

## Product Configuration

### ASTM F24 Standards Mastery
```yaml
Product Setup:
  Shopify SKU: "AAI-ASTM-F24-ADV"
  Pool ID: "astm_f24_tokens"
  Pool Name: "ASTM F24 Standards Mastery Tokens"
  Initial Token Count: 500
  Reorder Threshold: 50
  Auto-Replenish: Enabled

Token Format:
  Type: "URL"
  Pattern: "https://aai.intuto.com/enroll/{token}?course=astm-f24&user={customer_email}"
  Expiration: 365 days
  Single Use: Yes

Email Template Variables:
  {product_title}: "ASTM F24 Standards Mastery"
  {course_level}: "Advanced"
  {ceu_credits}: "8"
  {duration}: "40 Hours"
  {prerequisites}: "Basic Safety Certification"
```

### Water Park Safety Operations
```yaml
Product Setup:
  Shopify SKU: "AAI-WATER-SAFETY-INT"
  Pool ID: "water_park_tokens"
  Pool Name: "Water Park Safety Operations Tokens"
  Initial Token Count: 300
  Reorder Threshold: 30

Token Format:
  Type: "URL"
  Pattern: "https://aai.intuto.com/enroll/{token}?course=water-park-safety&user={customer_email}"
  Expiration: 365 days
  Single Use: Yes

Email Template Variables:
  {product_title}: "Water Park Safety Operations"
  {course_level}: "Intermediate"
  {ceu_credits}: "6"
  {duration}: "32 Hours"
  {prerequisites}: "Lifeguard Certification"
```

### Ride Inspection Certification
```yaml
Product Setup:
  Shopify SKU: "AAI-RIDE-INSPECT-PRO"
  Pool ID: "ride_inspection_tokens"
  Pool Name: "Ride Inspection Certification Tokens"
  Initial Token Count: 200
  Reorder Threshold: 20

Token Format:
  Type: "URL"
  Pattern: "https://aai.intuto.com/enroll/{token}?course=ride-inspection&user={customer_email}"
  Expiration: 365 days
  Single Use: Yes

Email Template Variables:
  {product_title}: "Ride Inspection Certification"
  {course_level}: "Professional"
  {ceu_credits}: "12"
  {duration}: "60 Hours"
  {prerequisites}: "2+ years industry experience"
```

### Risk Management Fundamentals
```yaml
Product Setup:
  Shopify SKU: "AAI-RISK-MGMT-BEG"
  Pool ID: "risk_mgmt_tokens"
  Pool Name: "Risk Management Fundamentals Tokens"
  Initial Token Count: 300
  Reorder Threshold: 30

Token Format:
  Type: "URL"
  Pattern: "https://aai.intuto.com/enroll/{token}?course=risk-management&user={customer_email}"
  Expiration: 365 days
  Single Use: Yes

Email Template Variables:
  {product_title}: "Risk Management Fundamentals"
  {course_level}: "Beginner"
  {ceu_credits}: "4"
  {duration}: "20 Hours"
  {prerequisites}: "None"
```

### Guest Services Excellence
```yaml
Product Setup:
  Shopify SKU: "AAI-GUEST-SERVICE-ALL"
  Pool ID: "guest_services_tokens"
  Pool Name: "Guest Services Excellence Tokens"
  Initial Token Count: 400
  Reorder Threshold: 40

Token Format:
  Type: "URL"
  Pattern: "https://aai.intuto.com/enroll/{token}?course=guest-services&user={customer_email}"
  Expiration: 365 days
  Single Use: Yes

Email Template Variables:
  {product_title}: "Guest Services Excellence"
  {course_level}: "All Levels"
  {ceu_credits}: "3"
  {duration}: "16 Hours"
  {prerequisites}: "None"
```

### Electrical Systems Safety
```yaml
Product Setup:
  Shopify SKU: "AAI-ELECTRICAL-ADV"
  Pool ID: "electrical_safety_tokens"
  Pool Name: "Electrical Systems Safety Tokens"
  Initial Token Count: 200
  Reorder Threshold: 20

Token Format:
  Type: "URL"
  Pattern: "https://aai.intuto.com/enroll/{token}?course=electrical-safety&user={customer_email}"
  Expiration: 365 days
  Single Use: Yes

Email Template Variables:
  {product_title}: "Electrical Systems Safety"
  {course_level}: "Advanced"
  {ceu_credits}: "10"
  {duration}: "48 Hours"
  {prerequisites}: "Basic Electrical Knowledge"
```

## Email Template Configuration

### Professional AAI Email Template
```html
Subject: Your {product_title} Access - AAI Professional Development

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Access - AAI Institute</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e3a5f; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1e3a5f 0%, #3498db 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .tagline { font-size: 14px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .welcome { font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #1e3a5f; }
        .course-info { background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ff6b35; }
        .course-title { font-size: 20px; font-weight: 600; color: #1e3a5f; margin-bottom: 15px; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .meta-item { font-size: 14px; }
        .meta-label { font-weight: 600; color: #6b7280; }
        .meta-value { color: #1e3a5f; }
        .access-button { display: inline-block; background: linear-gradient(135deg, #ff6b35 0%, #ff8c66 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; text-align: center; margin: 25px 0; box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3); }
        .instructions { background: #fffbeb; padding: 20px; border-radius: 6px; border: 1px solid #fed7aa; margin: 25px 0; }
        .instructions h3 { color: #92400e; margin-top: 0; font-size: 16px; }
        .step-list { margin: 15px 0; padding-left: 20px; }
        .step-list li { margin-bottom: 8px; color: #1e3a5f; }
        .support { background: #f0f9ff; padding: 20px; border-radius: 6px; margin: 25px 0; text-align: center; }
        .footer { background: #1e3a5f; color: white; padding: 25px; text-align: center; font-size: 14px; }
        .footer-links { margin-top: 15px; }
        .footer-link { color: #94a3b8; text-decoration: none; margin: 0 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AAI Institute</div>
            <div class="tagline">Professional Safety Education Since 2025</div>
        </div>
        
        <div class="content">
            <div class="welcome">Welcome to your course, {customer_first_name}!</div>
            
            <p>Thank you for enrolling in professional development with AAI Institute. Your course access is ready!</p>
            
            <div class="course-info">
                <div class="course-title">📚 {product_title}</div>
                <div class="meta-grid">
                    <div class="meta-item">
                        <div class="meta-label">Level</div>
                        <div class="meta-value">{course_level}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">CEU Credits</div>
                        <div class="meta-value">{ceu_credits} credits</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Duration</div>
                        <div class="meta-value">{duration}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Prerequisites</div>
                        <div class="meta-value">{prerequisites}</div>
                    </div>
                </div>
                
                <a href="{unique_token_url}" class="access-button">🎓 Start Learning Now</a>
                
                <p><strong>Your secure access link:</strong><br>
                <a href="{unique_token_url}" style="color: #3498db; word-break: break-all;">{unique_token_url}</a></p>
            </div>
            
            <div class="instructions">
                <h3>🚀 Getting Started</h3>
                <ol class="step-list">
                    <li>Click your unique access link above</li>
                    <li>Complete your Intuto profile setup</li>
                    <li>Begin learning immediately</li>
                    <li>Track progress in your AAI customer account</li>
                </ol>
            </div>
            
            <div class="support">
                <h3>🔧 Need Help?</h3>
                <p>Our support team is here to help with any technical questions or course access issues.</p>
                <p><strong>Email:</strong> support@aai-institute.com<br>
                <strong>Phone:</strong> 1-800-AAI-HELP</p>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2025 AAI Institute - Professional Safety Education</p>
            <div class="footer-links">
                <a href="https://aai-institute.com/account" class="footer-link">My Account</a>
                <a href="https://aai-institute.com/help-center" class="footer-link">Help Center</a>
                <a href="https://aai-institute.com/contact" class="footer-link">Contact Support</a>
            </div>
        </div>
    </div>
</body>
</html>
```

## Webhook Configuration

### Order Completion Webhook
```yaml
Webhook Setup:
  Event: "Order Paid"
  URL: "https://app.codeselling.com/webhooks/shopify/order-paid"
  Format: "JSON"
  API Version: "2023-10"
  
Authentication:
  Method: "Bearer Token"
  Token: "[Code Selling App API Key]"
  
Payload Mapping:
  order_id: "{{ order.id }}"
  customer_email: "{{ order.customer.email }}"
  customer_name: "{{ order.customer.first_name }} {{ order.customer.last_name }}"
  line_items: "{{ order.line_items }}"
  total_price: "{{ order.total_price }}"
```

## Testing & Validation

### Test Purchase Flow
1. **Create Test Order**: Place order for ASTM F24 course using test payment
2. **Verify Webhook**: Check that Code Selling App receives order notification
3. **Token Assignment**: Confirm token is selected from correct pool
4. **Email Delivery**: Verify professional email is sent with valid token URL
5. **Intuto Access**: Test that token URL successfully enrolls customer
6. **Progress Sync**: Validate progress tracking (if webhooks configured)

### Monitoring Setup
- **Token Pool Levels**: Alert when pools drop below threshold
- **Delivery Success Rate**: Track email delivery success (target: >99%)
- **Access Success Rate**: Monitor successful token redemptions
- **Customer Support Tickets**: Track integration-related issues

## Troubleshooting

### Common Issues
1. **Token Not Working**: Check token expiration and single-use status
2. **Email Not Received**: Verify customer email and delivery settings
3. **Pool Depletion**: Implement auto-replenishment or manual monitoring
4. **SKU Mismatch**: Ensure Shopify SKUs exactly match Code Selling App

### Support Contacts
- **Code Selling App**: support@codeselling.com
- **Intuto Platform**: support@intuto.com
- **AAI Development**: development@aai-institute.com

---

**Implementation Status**: Ready for setup
**Dependencies**: Shopify metafields, Intuto course creation, token generation
**Timeline**: 1 week for initial configuration, 2 weeks for testing
