# AAI Amusement Adventure Institute - Master Development Plan

## Project Overview
**Store:** aai-amusement-adventure-institute.myshopify.com  
**Theme:** Horizon (Shopify's newest theme - perfect for professional authority sites)  
**Goal:** Professional safety education platform using Shopify + Intuto Multi Token integration  
**Brand Position:** "Where Safety Meets Adventure" - Academic authority for amusement industry professionals  

---

## Phase 1: Foundation Setup (Days 1-2)

### Day 1: Environment Ready - Start Development
**✅ COMPLETE: Repository & Codespace Setup**
- GitHub repo already created with proper file structure
- Horizon theme files already imported
- Codespace ready for development

**Immediate Actions:**
```bash
# Start development server (repo already set up)
shopify theme dev --store=aai-amusement-adventure-institute

# Begin customization work immediately
# All file structure and theme files ready to go
```


### Essential Pages Development
**Use `aai-lms-mockup.html` as exact template - proven design that works**

#### 1. Homepage (`templates/index.liquid`)
**Copy exactly from mockup:** 
- Sticky header with credentials bar (IAAPA Certified, ASTM F24 Compliant)
- Hero section with gradient background and professional messaging
- Trust indicators grid (15,000+ Certified, 98% Pass Rate, 500+ Parks, 50 States)
- Clean, professional layout with subtle industry touches

#### 2. Course Catalog (`templates/page.course-access.liquid`)
**Based on mockup course grid:**
- Category filtering tabs (All, Safety Regulations, Operations, Water Parks)
- Course cards with professional imagery, CEU credits, certification badges
- Clear pricing and enrollment CTAs
- Prerequisites display for advanced courses
- Professional development focus throughout

#### 3. User Dashboard (`customers/account.liquid`)
**Exact replica of mockup dashboard:**
- Welcome header with user stats (courses completed, CEU credits, certifications)
- Active courses with progress bars and continue buttons
- Completed courses with certificate download options
- Achievements sidebar with professional badges
- Recommended next courses based on user progress

#### 4. About & Demo Pages
**Maintain mockup's professional aesthetic:**
- Clean layouts with authority-building content
- Industry credential showcases
- Professional photography style (clean equipment shots)
- Trust indicators prominently displayed

### Custom Components

#### Component Architecture (from proven mockup)
**All components must match the exact styling and interaction patterns from `aai-lms-mockup.html`**

#### Course Card (`snippets/course-card.liquid`)
**Exact implementation of mockup design:**
```liquid
<div class="course-card">
  <div class="course-header">
    {{ course.featured_image | img_url: '400x' | img_tag: course.title }}
    <div class="course-badges">
      {% if course.metafields.course.ceu_credits %}
        <span class="ceu-credits">{{ course.metafields.course.ceu_credits }} CEU Credits</span>
      {% endif %}
      {% if course.metafields.course.certification %}
        <span class="certification">{{ course.metafields.course.certification }}</span>
      {% endif %}
    </div>
  </div>
  
  <div class="course-content">
    <h3>{{ course.title }}</h3>
    <p class="course-outcome">{{ course.metafields.course.learning_outcome }}</p>
    <div class="course-meta">
      <span>{{ course.metafields.course.duration }}</span>
      <span>{{ course.metafields.course.level }}</span>
      <span>{{ course.metafields.course.standards_covered }}</span>
    </div>
    
    {% if course.metafields.course.prerequisites %}
      <div class="prerequisites">
        <small><strong>Prerequisites:</strong> {{ course.metafields.course.prerequisites }}</small>
      </div>
    {% endif %}
    
    <div class="course-price">
      <span class="price">${{ course.price | money_without_cents }}</span>
      <a href="#" class="enroll-btn" data-course="{{ course.id }}">Enroll Now</a>
    </div>
  </div>
</div>
```

#### User Dashboard Components
**Progress tracking exactly as shown in mockup:**
- Enrolled course cards with progress bars
- Achievement badges and statistics
- Professional styling throughout
- Certificate download integration

#### Header Component (`sections/header.liquid`)
**Exact replica of mockup header:**
- Credentials bar with IAAPA/ASTM badges
- Sticky navigation with professional styling
- Account link with user state management

---

## Phase 3: Stripe Integration (Days 9-11)

### Payment Setup
- [ ] Stripe account with course products configured
- [ ] Secure checkout flow implementation
- [ ] Order confirmation system
- [ ] Email confirmation automation

### Purchase Flow Logic
1. Course selection from catalog
2. Professional checkout experience (not typical e-commerce)
3. Order confirmation with next steps
4. Customer account integration
5. Prepare for token assignment (next phase)

**Key:** Build this to work independently first, then add token automation

---

## Phase 4: Intuto Token Integration (Days 12-16)

### Multi Token System Strategy
**The Technical Breakthrough:**
1. **Pre-generate Multi Tokens** - Create batches of unique URLs for each course
2. **Purchase triggers webhook** - Shopify order completion
3. **Assign specific token** - Next available token to customer email
4. **Email delivery** - Customer receives their unique course access link
5. **Single-use security** - Token consumed, cannot be reused
6. **Full tracking** - Intuto tracks usage, progress, completion

### Implementation Steps

#### Token Management System
```javascript
// Token assignment logic (webhooks/order-created.js)
// 1. Order completed in Shopify
// 2. Identify purchased course
// 3. Assign next available token for that course
// 4. Send token URL to customer email
// 5. Mark token as assigned in tracking system
```

#### Database Structure for Token Tracking
- Course ID
- Token URL
- Status (available, assigned, consumed)
- Customer email (when assigned)
- Assignment date
- Consumption date

#### Webhook Development
- [ ] Order creation handler
- [ ] Token assignment logic
- [ ] Email automation trigger
- [ ] Error handling for sold-out tokens
- [ ] Token consumption tracking

### Email Automation
Professional email template for token delivery:
- Subject: "Your [Course Name] Access - Professional Development Portal"
- Body: Professional design with course details, access instructions
- Include: Course outline, completion timeline, support contact

---

## Phase 5: User Experience & Polish (Days 17-18)

### Customer Account Dashboard
**Professional Development Focus:**
- [ ] Purchased courses with progress tracking
- [ ] Direct links to course access (token URLs)
- [ ] Certificates and badges display
- [ ] Continuing education credit tracking
- [ ] Career pathway recommendations

### Mobile Optimization
- [ ] Responsive professional design
- [ ] Touch-optimized course access
- [ ] Readable safety information on mobile
- [ ] Professional appearance on tablets

### Performance Optimization
- [ ] Page speed optimization (< 3 seconds)
- [ ] Image optimization for course photos
- [ ] Efficient token assignment system
- [ ] Cross-browser compatibility

---

## Phase 6: Testing & Launch (Days 19-20)

### Complete System Testing
- [ ] End-to-end: Course selection → Purchase → Token assignment → Course access
- [ ] Token assignment accuracy (100% success rate required)
- [ ] Email delivery reliability
- [ ] Mobile experience verification
- [ ] Payment processing in live mode

### Launch Checklist
- [ ] Domain configuration (if custom domain)
- [ ] SSL certificate verification
- [ ] Customer support system ready
- [ ] Token monitoring system active
- [ ] Backup token generation procedures

---

## Repository Structure

```
aai-lms-shopify/
├── theme/
│   ├── assets/
│   │   ├── application.js
│   │   ├── aai-core.js
│   │   ├── token-handler.js
│   │   ├── intuto-integration.js
│   │   └── application.css
│   ├── sections/
│   │   ├── hero-professional.liquid
│   │   ├── course-catalog.liquid
│   │   ├── token-purchase.liquid
│   │   └── credential-showcase.liquid
│   ├── snippets/
│   │   ├── course-card.liquid
│   │   ├── token-selector.liquid
│   │   ├── credential-badge.liquid
│   │   └── progress-tracker.liquid
│   └── templates/
│       ├── page.about.liquid
│       ├── page.demo.liquid
│       ├── page.course-access.liquid
│       └── customers/account.liquid
├── scripts/
│   ├── setup-metafields.js
│   ├── token-manager.js
│   └── deploy.js
├── webhooks/
│   ├── order-created.js
│   ├── token-consumed.js
│   └── email-automation.js
└── docs/
    ├── token-management.md
    ├── deployment-guide.md
    └── troubleshooting.md
```

---

## Environment Variables

```env
SHOPIFY_STORE_URL=aai-amusement-adventure-institute.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_access_token
INTUTO_API_KEY=your_intuto_api_key
INTUTO_SUBDOMAIN=your_subdomain
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
EMAIL_SERVICE_KEY=your_email_service_key
```

## Success Metrics

**Technical:**
- [ ] Purchase completion rate > 95%
- [ ] Token assignment success rate 100%
- [ ] Page load times < 3 seconds
- [ ] Mobile-responsive professional design

**Business:**
- [ ] Clear professional development value proposition
- [ ] Seamless authority-building user experience
- [ ] Scalable token management system
- [ ] Industry-appropriate branding throughout

---

## Risk Mitigation

**Token Shortage:** Monitor usage, auto-generate new batches at 75% depletion  
**Email Delivery:** Use SendGrid/Mailgun for reliable token delivery  
**Payment Issues:** Clear error handling with professional support escalation  
**Course Access:** Direct integration with Intuto support for resolution  

---

## Daily Development Schedule

**Morning (2-3 hours):** Major feature development with GitHub Copilot  
**Evening (1 hour):** Testing, refinement, documentation  

**Next Immediate Actions (Since Setup is Complete):**
1. Start Shopify CLI development server (5 minutes)
2. Begin homepage customization with professional authority focus (start immediately)