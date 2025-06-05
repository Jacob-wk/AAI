# Code Selling App Configuration Guide
# AAI LMS Integration - Phase 2 Setup

## Account Setup Steps

### 1. Install Code Selling App
1. Go to Shopify App Store
2. Install "Code Selling" app by Codeselling
3. Complete initial setup and payment plan selection

### 2. Configure Token Pools

#### Pool 1: ASTM F24 Standards Mastery
```yaml
Pool Configuration:
  Name: "ASTM F24 Tokens"
  Pool ID: "astm_f24_tokens"
  Initial Tokens: 500
  Reorder Threshold: 50
  Linked Product: "astm-f24-standards-mastery"
  
Email Template:
  Subject: "Your ASTM F24 Standards Mastery Course Access"
  Use Custom Template: Yes (see below)
```

#### Pool 2: Water Park Safety Operations
```yaml
Pool Configuration:
  Name: "Water Park Safety Tokens"
  Pool ID: "water_park_tokens"
  Initial Tokens: 300
  Reorder Threshold: 30
  Linked Product: "water-park-safety-operations"
```

#### Pool 3: Ride Inspection Certification
```yaml
Pool Configuration:
  Name: "Ride Inspection Tokens"
  Pool ID: "ride_inspection_tokens"
  Initial Tokens: 200
  Reorder Threshold: 25
  Linked Product: "ride-inspection-certification"
```

#### Pool 4: Risk Management Fundamentals
```yaml
Pool Configuration:
  Name: "Risk Management Tokens"
  Pool ID: "risk_mgmt_tokens"
  Initial Tokens: 300
  Reorder Threshold: 30
  Linked Product: "risk-management-fundamentals"
```

#### Pool 5: Guest Services Excellence
```yaml
Pool Configuration:
  Name: "Guest Services Tokens"
  Pool ID: "guest_services_tokens"
  Initial Tokens: 400
  Reorder Threshold: 40
  Linked Product: "guest-services-excellence"
```

#### Pool 6: Electrical Systems Safety
```yaml
Pool Configuration:
  Name: "Electrical Safety Tokens"
  Pool ID: "electrical_safety_tokens"
  Initial Tokens: 200
  Reorder Threshold: 25
  Linked Product: "electrical-systems-safety"
```

## 3. Email Template Configuration

### Custom Email Template (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Access - AAI Institute</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .cta-button { display: inline-block; background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .course-details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎓 AAI Institute</div>
            <h1>Course Access Granted</h1>
        </div>
        
        <div class="content">
            <h2>Welcome to {product_title}!</h2>
            <p>Dear {customer_first_name},</p>
            
            <p>Thank you for enrolling in <strong>{product_title}</strong> with AAI Institute. Your professional development journey begins now!</p>
            
            <div style="text-align: center;">
                <a href="{code}" class="cta-button">🚀 Start Your Course Now</a>
            </div>
            
            <div class="course-details">
                <h3>📋 Course Information</h3>
                <ul>
                    <li><strong>Access Link:</strong> <a href="{code}">Click here to begin</a></li>
                    <li><strong>Order Number:</strong> {order_number}</li>
                    <li><strong>Purchase Date:</strong> {order_date}</li>
                    <li><strong>Support:</strong> <a href="mailto:support@aai-institute.com">support@aai-institute.com</a></li>
                </ul>
            </div>
            
            <h3>🎯 What to Expect</h3>
            <ul>
                <li>✅ Interactive learning modules</li>
                <li>✅ Professional certification upon completion</li>
                <li>✅ CEU credits for your professional development</li>
                <li>✅ 24/7 access to course materials</li>
                <li>✅ Expert instructor support</li>
            </ul>
            
            <h3>📞 Need Help?</h3>
            <p>Our support team is ready to assist you:</p>
            <ul>
                <li>📧 Email: <a href="mailto:support@aai-institute.com">support@aai-institute.com</a></li>
                <li>📱 Phone: 1-800-AAI-HELP</li>
                <li>💬 Live Chat: Available on our website</li>
            </ul>
            
            <p><strong>Important:</strong> Please save this email for your records. Your course access link is unique to you and should not be shared.</p>
        </div>
        
        <div class="footer">
            <p>© 2024 AAI Institute. All rights reserved.</p>
            <p>Professional Safety Education Since 1978</p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Version
```
Subject: Your {product_title} Access - AAI Institute

Dear {customer_first_name},

Thank you for enrolling in {product_title} with AAI Institute.

🎓 Your secure course access link:
{code}

This link will automatically enroll you and provide immediate access to your professional safety education course.

Course Information:
- Order: {order_number}
- Date: {order_date}
- Support: support@aai-institute.com

What's Included:
✓ Interactive learning modules
✓ Professional certification
✓ CEU credits
✓ 24/7 course access
✓ Expert support

Need help? Contact us:
Email: support@aai-institute.com
Phone: 1-800-AAI-HELP

Please save this email for your records.

Best regards,
AAI Institute Team
Professional Safety Education Since 1978
```

## 4. Delivery Settings Configuration

### Global Settings
```yaml
Delivery Method: Email
Delivery Timing: Immediate (upon order paid)
Email From Name: "AAI Institute"
Email From Address: "courses@aai-institute.com"
Reply-To: "support@aai-institute.com"

Order Status Trigger: "paid"
Include Order Details: Yes
Track Delivery: Yes
Send Test Email: Yes
```

### Per-Product Settings
```yaml
All Course Products:
  Maximum Uses Per Code: 1
  Code Expiration: Never
  Allow Resend: Yes (customers can request resend)
  Notification on Low Stock: Yes
  Admin Email for Alerts: "admin@aai-institute.com"
```

## 5. Webhook Configuration

### Course Completion Webhook
```yaml
Endpoint: "https://aai-institute.com/api/webhooks/course-completion"
Method: POST
Headers:
  Content-Type: "application/json"
  Authorization: "Bearer YOUR_WEBHOOK_SECRET"

Payload:
{
  "customer_email": "{customer_email}",
  "course_id": "{course_id}",
  "completion_date": "{completion_date}",
  "certificate_url": "{certificate_url}",
  "ceu_credits": "{ceu_credits}"
}
```

## 6. Testing Checklist

### Pre-Launch Testing
- [ ] Create test order for each course
- [ ] Verify email delivery templates
- [ ] Test Intuto enrollment process
- [ ] Validate webhook notifications
- [ ] Check token pool depletion alerts
- [ ] Confirm customer account integration

### Ongoing Monitoring
- [ ] Token pool levels
- [ ] Email delivery rates
- [ ] Customer enrollment success
- [ ] Course completion tracking
- [ ] Certificate generation

## 7. Support Documentation

### Customer FAQ Integration
Add to website FAQ section:

**Q: When will I receive my course access?**
A: Course access is delivered immediately after payment confirmation, typically within 2-3 minutes.

**Q: I didn't receive my course access email. What should I do?**
A: Check your spam folder first. If not found, contact support@aai-institute.com with your order number.

**Q: Can I share my course access with others?**
A: No, course access is individual and tied to your certification. Sharing violates our terms of service.

**Q: How long do I have access to the course?**
A: You have lifetime access to your purchased courses through your AAI Institute account.

### Staff Training Points
- Order processing workflow
- Manual token delivery process (backup)
- Customer support escalation
- Technical troubleshooting steps
- Intuto platform navigation

## Next Steps
1. Complete Code Selling App setup
2. Generate initial token batches from Intuto
3. Upload tokens to respective pools
4. Test complete purchase-to-enrollment workflow
5. Launch Phase 3: Customer Journey Enhancement
