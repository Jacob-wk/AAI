# GitHub Copilot Development Guide - AAI LMS

## Project Context for Copilot

**Project:** AAI Amusement Adventure Institute - Professional Safety Education Platform  
**Tech Stack:** Shopify Horizon Theme + Intuto LMS + Stripe + Multi Token Integration  
**Design Reference:** `aai-lms-mockup.html` - use as exact visual template  
**Brand Position:** "Where Safety Meets Adventure" - Professional authority in amusement industry safety  

## Copilot Optimization Strategy

### 1. Repository Structure (Already Set Up)

**✅ READY TO GO:** Repository and Codespace already configured with proper structure

```
aai-lms-shopify/ (✅ Already Created)
├── COPILOT_CONTEXT.md          # Create this file for Copilot reference
├── design-reference/
│   └── aai-lms-mockup.html     # Add mockup for visual reference
├── brand-assets/
│   ├── colors.css              # Extract from mockup
│   ├── typography.css          # Extract from mockup
│   └── components.css          # Reusable component styles
├── theme/ (✅ Horizon files imported)
│   ├── assets/
│   │   ├── aai-core.js         # Custom functionality
│   │   ├── token-integration.js # Intuto token handling
│   │   └── stripe-checkout.js  # Payment processing
│   ├── sections/ (✅ Horizon sections ready)
│   │   ├── header-professional.liquid
│   │   ├── hero-authority.liquid
│   │   ├── course-catalog.liquid
│   │   └── user-dashboard.liquid
│   ├── snippets/ (✅ Horizon snippets ready)
│   │   ├── course-card.liquid
│   │   ├── progress-tracker.liquid
│   │   └── credential-badge.liquid
│   └── templates/ (✅ Horizon templates ready)
│       ├── index.liquid
│       ├── page.course-access.liquid
│       └── customers/account.liquid
└── integration/
    ├── webhooks/
    │   ├── order-processing.js
    │   └── token-assignment.js
    └── api/
        ├── intuto-connector.js
        └── stripe-handler.js
```

### 2. Copilot Context Instructions

#### Primary Context File (`COPILOT_CONTEXT.md`)
**Place this in repository root for Copilot to always reference:**

```markdown
# AAI LMS Development Context

## CRITICAL: Always reference aai-lms-mockup.html for exact styling and interactions

## Project Overview
- Professional safety education for amusement industry
- Shopify store + Intuto LMS integration via Multi Tokens
- Target: Industry professionals seeking certifications/CEU credits
- Brand: Authoritative but accessible, industry-savvy

## Design Requirements
- EXACT visual replication of mockup design
- Professional authority aesthetic throughout
- Industry credibility (IAAPA, ASTM F24 badges)
- Clean, accessible layouts with subtle fun industry touches

## Technical Architecture
- Shopify Horizon theme (modern, professional design system)
- Intuto Multi Token system (pre-generated unique URLs)
- Stripe payment processing
- Webhook-based token assignment
- Customer account integration

## Code Style
- Professional variable naming
- Comprehensive error handling
- Performance-optimized (page load < 3 seconds)
- Mobile-responsive design patterns
- Accessibility compliance

## Key User Flows
1. Browse courses → Professional development focus
2. Purchase course → Stripe checkout
3. Webhook assigns unique Intuto token URL
4. Customer receives email with course access
5. Progress tracking in user dashboard
```

### 3. File-Specific Copilot Prompts

#### For Component Development
**Add these comments at the top of component files:**

```liquid
{% comment %}
COPILOT CONTEXT:
- This component must exactly match styling from aai-lms-mockup.html
- Professional development focus (not casual e-commerce)
- Industry authority aesthetic (safety credentials prominent)
- All interactions should reflect professional education context
- Color scheme: Authority Navy (#1e3a5f), Safety Orange (#ff6b35), Electric Blue (#3498db)
{% endcomment %}
```

#### For JavaScript Files
**Header comments for Copilot context:**

```javascript
/*
COPILOT CONTEXT: AAI LMS Integration
- Professional safety education platform
- Intuto Multi Token integration (unique URLs per purchase)
- Stripe payment processing with webhook token assignment
- Error handling must be comprehensive (professionals need reliability)
- Performance critical (quick course access essential)
*/
```

### 4. Copilot-Optimized Development Workflow

#### Phase 1: Component Development
**Prompt Copilot with specific context:**
```
Create Shopify Liquid component for course card that:
1. Exactly matches the course-card styling in aai-lms-mockup.html
2. Displays CEU credits prominently (professional development focus)
3. Shows prerequisites when applicable
4. Uses professional pricing display ($X format)
5. Handles course metafields: duration, level, standards_covered, ceu_credits
6. Maintains AAI brand colors: Authority Navy, Safety Orange, Electric Blue
```

#### Phase 2: Integration Development
**Copilot prompts for webhook development:**
```
Create webhook handler for Shopify order completion that:
1. Receives order data when course purchase completes
2. Identifies which course was purchased
3. Assigns next available Intuto Multi Token for that course
4. Sends professional email with course access instructions
5. Updates token availability tracking
6. Handles errors gracefully with admin notifications
7. Logs all token assignments for audit trail
```

#### Phase 3: User Experience
**Copilot prompts for dashboard development:**
```
Create user account dashboard that replicates aai-lms-mockup.html exactly:
1. Professional welcome with user statistics
2. Course progress tracking with visual progress bars
3. Completed courses with certificate download options
4. Achievement badges for professional milestones
5. Recommended next courses based on career path
6. All styling must match mockup's professional aesthetic
```

### 5. Copilot Coding Standards

#### Liquid Template Standards
```liquid
{% comment %}
COMPONENT: Course Card Professional
PURPOSE: Display course with professional development focus
BRAND: AAI authority aesthetic, industry credibility
INTERACTIONS: Professional enrollment flow
{% endcomment %}

<div class="course-card" data-course-id="{{ course.id }}">
  <!-- Copilot: Generate course header with exact mockup styling -->
  <!-- Copilot: Include CEU credits and certification badges -->
  <!-- Copilot: Professional pricing and enrollment CTA -->
</div>
```

#### JavaScript Standards
```javascript
/**
 * COPILOT: Token Assignment Handler
 * PURPOSE: Assign Intuto Multi Token URLs when Shopify orders complete
 * REQUIREMENTS: Professional error handling, audit logging, email notifications
 * INTEGRATION: Shopify webhooks → Intuto Multi Token system
 */

class TokenAssignmentHandler {
  // Copilot: Generate professional error handling
  // Copilot: Include comprehensive logging
  // Copilot: Email professional course access instructions
}
```

### 6. Copilot Testing Prompts

#### Component Testing
```
Generate test cases for AAI course card component:
1. Test CEU credit display for different course types
2. Test prerequisite requirements display
3. Test professional pricing format
4. Test accessibility compliance (screen readers)
5. Test mobile responsiveness matching mockup
6. Test hover states and professional interactions
```

#### Integration Testing
```
Create test suite for token assignment system:
1. Test successful token assignment flow
2. Test error handling when tokens depleted
3. Test email delivery with professional formatting
4. Test token uniqueness validation
5. Test audit logging accuracy
6. Test performance under load (100+ simultaneous purchases)
```

### 7. Documentation Generation with Copilot

#### Component Documentation
**Copilot prompt for automatic documentation:**
```
Generate component documentation for AAI course card including:
1. Purpose and professional development context
2. Required metafields and data structure
3. Styling dependencies (colors, typography)
4. Accessibility features
5. Mobile responsiveness notes
6. Integration points with Intuto/Stripe
```

#### API Documentation
**Copilot prompt for webhook documentation:**
```
Document token assignment webhook including:
1. Shopify order payload structure
2. Intuto Multi Token integration steps
3. Error handling and retry logic
4. Professional email template requirements
5. Audit logging specifications
6. Performance considerations
```

### 8. Copilot Optimization Tips

#### Maximize Context Awareness
1. **Always reference mockup:** Include "match aai-lms-mockup.html exactly" in prompts
2. **Brand consistency:** Mention AAI professional authority in every component prompt
3. **User context:** Specify "professional development" vs "casual e-commerce" in prompts
4. **Technical specifics:** Include "Intuto Multi Token integration" in relevant prompts

#### Effective Prompting Patterns
```
PATTERN: Create [component/function] for AAI LMS that:
1. [Specific visual/functional requirement from mockup]
2. [Professional development context]
3. [Brand authority requirement]
4. [Technical integration requirement]
5. [Performance/accessibility requirement]
```

#### Code Review with Copilot
```
Review this code for AAI LMS ensuring:
1. Matches professional aesthetic from mockup
2. Handles errors appropriately for professional users
3. Maintains brand authority throughout
4. Integrates properly with Intuto Multi Token system
5. Meets performance requirements (< 3 second load)
```

### 9. Deployment Automation with Copilot

#### Deployment Scripts
**Copilot prompt for deployment automation:**
```
Create deployment script for AAI LMS that:
1. Validates all components match mockup styling
2. Tests token assignment functionality
3. Verifies Stripe integration
4. Checks professional email templates
5. Validates mobile responsiveness
6. Deploys to Shopify with proper error handling
```

### 10. Maintenance and Updates

#### Ongoing Development Prompts
```
Update AAI component to:
1. Maintain exact mockup visual fidelity
2. Enhance professional development messaging
3. Improve token assignment reliability
4. Optimize for professional user workflows
5. Add new industry credential displays
```

## Key Success Metrics for Copilot Development

**Code Quality:**
- Exact visual match to mockup design
- Professional tone throughout all text
- Comprehensive error handling
- Performance optimized (< 3 second loads)

**Integration Success:**
- 100% token assignment success rate
- Professional email delivery reliability
- Seamless Shopify/Intuto integration
- Accurate progress tracking

**User Experience:**
- Professional authority maintained throughout
- Industry credibility displayed prominently
- Career advancement focus in all messaging
- Accessible design for all users

This guide ensures Copilot has the context needed to generate code that maintains AAI's professional authority while building a robust, scalable LMS platform.