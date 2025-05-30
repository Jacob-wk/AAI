# AAI LMS Development Context

## CRITICAL: Always reference aai-lms-mockup.html for exact styling and interactions

## Project Overview
- Professional safety education for amusement industry
- Shopify store + Intuto LMS integration via Fly app connector
- Target: Industry professionals seeking certifications/CEU credits
- Brand: Authoritative but accessible, industry-savvy
- Founded: 2025 - Where Safety Meets Adventure

## ARCHITECTURE: Embedded Intuto Integration
- Intuto content is EMBEDDED within Shopify pages via iframe/player
- Shopify handles professional course catalog, checkout, and course delivery pages
- Fly app connector bridges Shopify purchases ↔ Intuto access tokens
- Post-purchase: customers access embedded course content on AAI site
- Users never leave the AAI Shopify experience

## Design Requirements
- Professional course catalog like The Association Academy
- Authority aesthetic throughout (safety credentials prominent)  
- Industry credibility (IAAPA, ASTM F24 badges)
- Clean, accessible layouts with professional focus

## Technical Scope
- Standard Shopify Horizon theme
- Professional course product pages
- Embedded Intuto course players within Shopify templates
- Customer account showing purchased courses with embedded access
- Course access templates with integrated Intuto iframes

### Live Implementation Example
**The Association Academy:** https://theassociation.academy/collections/acme-association-of-comedy-music-entertainment
- Working Intuto + Shopify integration for professional associations
- Professional course catalog UI/UX patterns
- Industry-appropriate pricing and presentation
- Association authority branding examples

## Code Style
- Professional variable naming
- Comprehensive error handling
- Performance-optimized (page load < 3 seconds)
- Mobile-responsive design patterns
- Accessibility compliance

## Key User Flows
1. Browse courses → Professional development focus
2. Purchase course → Stripe checkout
3. Webhook assigns unique Intuto token for embedded access
4. Customer accesses embedded course content on AAI site
5. Progress tracking in embedded user dashboard

## Brand Colors
- Authority Navy: #1e3a5f
- Safety Orange: #ff6b35
- Electric Blue: #3498db

## Brand Messaging
- Founded in 2025
- "Where Safety Meets Adventure"
- Professional authority in amusement industry safety
- Focus on career advancement and professional development
