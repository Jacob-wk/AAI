# AAI Partnerships Page Setup Guide
*Corporate Partnerships & Regulatory Compliance for FEC Industry*

## Overview
The partnerships page uses the existing universal sections (aai-universal-hero, aai-universal-content, aai-universal-cta) configured through the Shopify theme customizer. This follows Shopify 2.0 best practices by using flexible, reusable sections.

## Page Structure
```
/pages/partnerships → uses template: page.partnerships.liquid
├── Hero Section (aai-universal-hero)
├── Regulatory Compliance Solutions (aai-universal-content)
├── Why AAI Certification is Essential (aai-universal-content)
├── Enterprise Compliance Packages (aai-universal-content)
├── Compliance Implementation Process (aai-universal-content)
├── Regulatory Support Services (aai-universal-content)
└── Final CTA Section (aai-universal-cta)
```

## Section Configuration

### 1. Hero Section (aai-universal-hero)
**Settings:**
- Hero Title: `Official Compliance Training for FEC Industry`
- Hero Subtitle: `Mandatory safety certification programs for family entertainment centers. Ensure your FEC meets all regulatory requirements with AAI's comprehensive compliance solutions.`
- Hero Style: `hero-standard`
- Layout Style: `text-left-image-right`
- Color Scheme: `color-scheme-2` (Navy background)
- Show Image: `true`
- Show Stats: `true`
- Show Features: `true`
- Show Credentials: `true`
- Primary Button Text: `Get Compliance Assessment`
- Primary Button URL: `/pages/contact`
- Secondary Button Text: `View Certification Programs`
- Secondary Button URL: `/collections/courses`
- Button Size: `large`

**Blocks to Add:**
- **Statistic 1:** Number: `500+`, Label: `FECs Certified`
- **Statistic 2:** Number: `100%`, Label: `Compliance Rate`
- **Statistic 3:** Number: `24/7`, Label: `Regulatory Support`
- **Feature 1:** Icon: `🏛️`, Title: `Regulatory Approved`, Description: `Official compliance documentation`
- **Feature 2:** Icon: `⚖️`, Title: `Industry Standards`, Description: `FEC safety regulations alignment`
- **Feature 3:** Icon: `📋`, Title: `Audit Ready`, Description: `Inspection preparation included`
- **Credential 1:** Text: `State Regulatory Approved`
- **Credential 2:** Text: `FEC Industry Standard`

### 2. Regulatory Compliance Solutions (aai-universal-content)
**Settings:**
- Section Title: `Regulatory Compliance Solutions`
- Section Subtitle: `Mandatory certification programs designed specifically for Family Entertainment Centers`
- Layout Style: `grid`
- Blocks Per Row: `2`
- Background Style: `standard`
- Color Scheme: `color-scheme-1`
- Show Main Content: `false`

**Blocks to Add:**
- **Feature List 1:** 
  - Title: `Mandatory Certification Programs`
  - Items: `Staff Safety Certification | Equipment Operation Training | Emergency Response Protocols | Compliance Documentation | Regulatory Updates`

- **Feature List 2:**
  - Title: `Official Documentation`
  - Items: `AAI-issued Certificates | Regulatory Compliance Records | Audit-Ready Documentation | Legal Protection Evidence | Digital Badge System`

- **Feature List 3:**
  - Title: `Industry Standards`
  - Items: `FEC Safety Standards | Industry Best Practices | Regulatory Alignment | Compliance Guidelines | State Requirements`

- **Feature List 4:**
  - Title: `Audit Preparation`
  - Items: `Inspection Readiness | Compliance Audits | Documentation Review | Regulatory Support | Corrective Action Plans`

### 3. Why AAI Certification is Essential (aai-universal-content)
**Settings:**
- Section Title: `Why AAI Certification is Essential`
- Section Subtitle: `AAI certification isn't just recommended—it's becoming the industry standard for FEC operations`
- Layout Style: `text-left-image-right`
- Background Style: `gradient`
- Color Scheme: `color-scheme-2`
- Show Main Content: `true`
- Content Title: `Regulatory Requirement & Industry Standard`
- Content Body: `Family Entertainment Centers face increasing regulatory scrutiny. AAI certification provides the comprehensive training and documentation needed to meet all requirements while protecting your business.`

**Blocks to Add:**
- **Text Block 1:**
  - Title: `Regulatory Requirement`
  - Content: `Many states now require certified safety training for FEC operations. AAI certification meets these mandatory requirements.`

- **Text Block 2:**
  - Title: `Legal Protection`
  - Content: `Demonstrate due diligence in safety training with official AAI documentation, providing crucial legal protection.`

- **Text Block 3:**
  - Title: `Insurance Benefits`
  - Content: `Many insurance providers offer reduced premiums for businesses with certified staff and documented safety programs.`

- **Text Block 4:**
  - Title: `Industry Recognition`
  - Content: `AAI is recognized as the leading authority in FEC safety training, with certifications valued industry-wide.`

### 4. Enterprise Compliance Packages (aai-universal-content)
**Settings:**
- Section Title: `Enterprise Compliance Packages`
- Section Subtitle: `Comprehensive solutions for multi-location FEC operations and corporate training programs`
- Layout Style: `timeline`
- Background Style: `standard`
- Color Scheme: `color-scheme-3`
- Show Main Content: `false`

**Blocks to Add:**
- **Text Block 1:**
  - Title: `Multi-Location Compliance`
  - Content: `Standardize safety training across all your FEC locations with bulk certification programs and centralized management.`

- **Feature List 1:**
  - Title: `Corporate Training Programs`
  - Items: `Organization-wide Safety Standards | Management Training Modules | Train-the-Trainer Programs | Customized Content Development | Progress Tracking Dashboard`

- **Text Block 2:**
  - Title: `Ongoing Compliance`
  - Content: `Annual recertification programs and regulatory updates ensure your entire organization stays current with changing requirements.`

- **Feature List 2:**
  - Title: `Documentation Management`
  - Items: `Centralized Compliance Records | Digital Certificate Management | Audit Trail Documentation | Regulatory Reporting | Compliance Dashboards`

### 5. Compliance Implementation Process (aai-universal-content)
**Settings:**
- Section Title: `Compliance Implementation Process`
- Section Subtitle: `Our proven 4-step process ensures seamless compliance implementation`
- Layout Style: `timeline`
- Background Style: `standard`
- Color Scheme: `color-scheme-1`
- Show Main Content: `false`

**Blocks to Add:**
- **Text Block 1:**
  - Title: `1. Assessment`
  - Content: `Comprehensive evaluation of your current safety protocols and regulatory compliance status.`

- **Text Block 2:**
  - Title: `2. Training Deployment`
  - Content: `Customized staff certification programs delivered on-site or online based on your needs.`

- **Text Block 3:**
  - Title: `3. Documentation`
  - Content: `Official compliance certificates and comprehensive documentation for regulatory requirements.`

- **Text Block 4:**
  - Title: `4. Ongoing Support`
  - Content: `Continuous regulatory updates, recertification programs, and compliance monitoring.`

### 6. Regulatory Support Services (aai-universal-content)
**Settings:**
- Section Title: `Regulatory Support Services`
- Section Subtitle: `Comprehensive support to ensure ongoing compliance and regulatory readiness`
- Layout Style: `grid`
- Blocks Per Row: `2`
- Background Style: `gradient`
- Color Scheme: `color-scheme-2`
- Show Main Content: `false`

**Blocks to Add:**
- **Feature List 1:**
  - Title: `Official Compliance Documentation`
  - Items: `AAI Certificates | Regulatory Filing Support | Compliance Attestations | Official Transcripts | Digital Verification`

- **Feature List 2:**
  - Title: `Regulatory Update Notifications`
  - Items: `Regulatory Changes Alerts | Industry Updates | Compliance Deadlines | New Requirements | Best Practice Updates`

- **Feature List 3:**
  - Title: `Inspection Readiness Support`
  - Items: `Pre-inspection Audits | Documentation Review | Compliance Checklists | Corrective Action Plans | Inspector Relations`

- **Feature List 4:**
  - Title: `Industry Standard Development`
  - Items: `Standards Committee Participation | Best Practice Development | Regulatory Input | Industry Advocacy | Expert Consultation`

### 7. Final CTA Section (aai-universal-cta)
**Settings:**
- CTA Title: `Get Compliant Today`
- CTA Subtitle: `Ensure Your FEC Meets Industry Standards`
- CTA Description: `Don't wait for regulatory issues. Start your compliance journey today with AAI's proven certification programs.`
- Primary Button Text: `Schedule Compliance Assessment`
- Primary Button URL: `/pages/contact`
- Secondary Button Text: `View Certification Programs`
- Secondary Button URL: `/collections/courses`
- Background Style: `gradient`
- Color Scheme: `color-scheme-2`

## Setup Instructions

1. **Create the Page:**
   - In Shopify Admin, go to Online Store > Pages
   - Create a new page with handle `partnerships`
   - Set template to `page.partnerships`

2. **Configure Sections:**
   - Go to Online Store > Themes > Customize
   - Navigate to the Partnerships page
   - Configure each section using the settings above
   - Add all blocks as specified

3. **Add Images:**
   - Upload relevant compliance/regulatory images
   - Consider using images of:
     - Professional training environments
     - Certificates and documentation
     - FEC safety equipment
     - Regulatory officials or inspections

4. **Test the Page:**
   - Preview the page to ensure all content displays correctly
   - Test all buttons and links
   - Verify responsive design on mobile

## Content Recommendations

- **Tone:** Professional, authoritative, compliance-focused
- **Keywords:** FEC compliance, regulatory training, safety certification, industry standards
- **Images:** Professional training, certificates, safety equipment, regulatory documents
- **Call-to-Actions:** Focus on assessment, consultation, and immediate compliance needs

## SEO Considerations

- Page Title: "FEC Regulatory Compliance Training | AAI Partnerships"
- Meta Description: "Mandatory safety certification programs for Family Entertainment Centers. Ensure regulatory compliance with AAI's official training programs."
- Focus Keywords: FEC compliance, regulatory training, safety certification, industry standards
