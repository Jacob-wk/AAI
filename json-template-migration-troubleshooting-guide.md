# JSON Template Migration Troubleshooting Guide

## Problem: JSON Templates Not Deploying to Shopify

**Symptoms:**
- Only index.json, demo, and about pages display correctly
- All other pages show default page.json fallback content
- Templates exist in local files but don't appear in Shopify admin
- Custom sections and styling not rendering

---

## Root Cause Analysis

### Primary Issues to Investigate

#### 1. Template File Naming Convention Problems
**Check for:**
- Incorrect file extensions (.json vs .liquid)
- Missing template prefixes (page., collection., product., customers/)
- Case sensitivity issues in filenames
- Special characters or spaces in template names
- Templates saved in wrong directory structure

#### 2. JSON Syntax and Validation Errors
**Common Problems:**
- Malformed JSON structure (missing commas, brackets)
- Invalid section references that don't exist
- Incorrect block ordering or missing block definitions
- Schema validation failures preventing deployment
- Invalid setting values or types

#### 3. Shopify Theme Deployment Issues
**Deployment Problems:**
- Templates not being pushed to live theme
- Cached template versions in Shopify
- Theme file synchronization failures
- CLI deployment errors not visible during push
- Development vs. live theme discrepancies

#### 4. Section Reference Failures
**Section Issues:**
- Referenced sections don't exist in sections/ directory
- Section schema errors preventing template loading
- Missing required section settings causing fallback
- Incorrect section type names in JSON templates

---

## Systematic Troubleshooting Process

### Phase 1: File Structure Verification

#### Step 1: Audit Template Directory
**Check that all templates exist with correct naming:**
- Verify templates/ directory contains all JSON files
- Confirm proper naming convention (page.course-access.json, not page-course-access.json)
- Ensure no duplicate .liquid and .json templates with same name
- Check file permissions and accessibility

#### Step 2: Validate JSON Syntax
**For each non-working template:**
- Run JSON validation tools on each template file
- Check for trailing commas, missing quotes, bracket mismatches
- Verify section references match actual section file names
- Confirm all block IDs are unique within template

#### Step 3: Section Dependency Check
**Verify all referenced sections exist:**
- Cross-reference template section types with sections/ directory
- Check that custom AAI sections are properly named and located
- Ensure section schema is valid and complete
- Verify section liquid syntax has no errors

### Phase 2: Deployment Verification

#### Step 4: Theme Push Validation
**Confirm templates are actually deploying:**
- Use Shopify CLI with verbose logging to see deployment status
- Check for deployment errors or warnings during push
- Verify templates appear in Shopify admin theme editor
- Compare local file timestamps with deployed versions

#### Step 5: Shopify Admin Inspection
**In Shopify admin:**
- Navigate to Online Store > Themes > Actions > Edit Code
- Verify all JSON templates appear in templates/ folder
- Check that template content matches local files
- Look for any error indicators or missing files

#### Step 6: Template Assignment Check
**Verify page template assignments:**
- In Shopify admin, check each page's template assignment
- Ensure pages are assigned to correct JSON templates, not fallback
- Look for template selector showing available options
- Check for any template conflicts or overrides

### Phase 3: Content and Logic Validation

#### Step 7: Section Functionality Test
**Test individual sections:**
- Temporarily create minimal JSON template with single section
- Verify each custom section renders correctly in isolation
- Check section settings are properly configured
- Test section schema validation in theme editor

#### Step 8: Template Logic Verification
**Check template structure and logic:**
- Verify section order makes logical sense
- Check that required settings have appropriate default values
- Ensure block ordering doesn't have gaps or duplicates
- Validate conditional logic in section references

#### Step 9: Data Dependencies Check
**Verify required data exists:**
- Check that referenced collections actually exist
- Ensure metafields are properly configured for products
- Verify page handles match template expectations
- Check for missing product or collection data

---

## Common Migration Failure Patterns

### Pattern 1: Silent Section Failures
**When sections exist but don't render:**
- Section liquid syntax errors causing silent failure
- Missing required section settings causing fallback to default
- Schema validation errors preventing section loading
- CSS class conflicts causing invisible rendering

### Pattern 2: Template Assignment Issues
**When templates exist but aren't selectable:**
- Template naming doesn't match Shopify conventions
- JSON syntax errors preventing template recognition
- Schema errors causing template invalidation
- File encoding issues preventing proper reading

### Pattern 3: Deployment Synchronization Problems
**When local changes don't appear live:**
- CLI not properly connected to correct theme
- Cached template versions overriding new content
- Deployment happening to development theme, not live
- File modification timestamps causing sync issues

### Pattern 4: Section Reference Cascading Failures
**When one broken section breaks entire template:**
- Invalid section reference causing template fallback
- Missing section dependencies causing chain failures
- Circular section references causing infinite loops
- Resource loading failures causing template abandonment

---

## Systematic Resolution Process

### Resolution Phase 1: Template Isolation Testing

#### Isolate Working vs. Non-Working Templates
**Create minimal test templates:**
- Strip non-working templates down to single section
- Test with known working sections only
- Gradually add complexity to identify failure point
- Compare working template structure with failing ones

#### Validate Section Rendering
**Test each custom section individually:**
- Create temporary JSON template with only one section
- Deploy and verify section renders correctly
- Check section settings in theme customizer
- Verify section responds to setting changes

### Resolution Phase 2: Deployment Pipeline Verification

#### Confirm Deployment Process
**Verify deployment is actually working:**
- Check CLI connection to correct Shopify store
- Verify deployment target (development vs. live theme)
- Use deployment logging to track file uploads
- Confirm template files appear in Shopify admin

#### Check Template Recognition
**Ensure Shopify recognizes templates:**
- Verify templates appear in theme editor file list
- Check that page template selectors show new options
- Ensure template preview functionality works
- Validate template assignment saves correctly

### Resolution Phase 3: Progressive Content Migration

#### Start with Minimal Content
**Build templates incrementally:**
- Begin with single section templates that work
- Add sections one at a time, testing after each addition
- Verify each section's settings and blocks function
- Check mobile responsiveness and cross-browser compatibility

#### Content Validation and Testing
**Verify all content displays correctly:**
- Check that text content appears as expected
- Verify images load and display properly
- Test interactive elements and CTAs
- Validate professional styling and brand consistency

---

## Prevention Strategies for Future Migrations

### Development Workflow Improvements

#### Template Development Process
**Establish systematic approach:**
- Always validate JSON syntax before deployment
- Test templates in development environment first
- Use version control to track template changes
- Maintain backup copies of working templates

#### Section Development Standards
**Create reliable section development:**
- Follow consistent naming conventions for sections
- Validate section schema before referencing in templates
- Test sections in isolation before template integration
- Document section dependencies and requirements

#### Deployment Validation Process
**Ensure reliable deployments:**
- Use deployment checklists to verify all files upload
- Test template functionality immediately after deployment
- Verify template assignments in Shopify admin
- Check page rendering on multiple devices

### Quality Assurance Protocols

#### Pre-Deployment Testing
**Comprehensive validation before going live:**
- JSON syntax validation on all templates
- Section rendering verification in development
- Template assignment testing with actual pages
- Cross-browser and mobile compatibility testing

#### Post-Deployment Verification
**Confirm successful deployment:**
- Verify all pages display intended templates
- Check template customization works in admin
- Test user flows and professional functionality
- Validate SEO and performance metrics

---

## Emergency Recovery Procedures

### Quick Rollback Process
**When migration fails completely:**
- Revert to backup liquid templates immediately
- Use git version control to restore working state
- Deploy known working template versions
- Document failure points for future resolution

### Partial Recovery Strategy
**When some templates work, others fail:**
- Keep working JSON templates active
- Revert failing templates to liquid versions temporarily
- Migrate failing templates one at a time
- Use systematic testing to identify specific failure points

### Template Assignment Reset
**When template assignments get corrupted:**
- Document current page template assignments
- Reset all pages to default templates
- Systematically reassign working templates
- Test page functionality after each assignment

---

## Success Validation Checklist

### Technical Validation
- [ ] All JSON templates deploy without errors
- [ ] Templates appear in Shopify admin file list
- [ ] Page template selectors show new templates
- [ ] Template assignments save correctly
- [ ] Sections render content properly

### Functional Validation
- [ ] Course catalog displays professionally
- [ ] User dashboard shows progress tracking
- [ ] Contact forms function correctly
- [ ] Mobile responsiveness maintained
- [ ] Professional styling consistent throughout

### Business Validation
- [ ] Professional authority brand maintained
- [ ] Industry credibility features display correctly
- [ ] Course enrollment process works
- [ ] Token integration remains functional
- [ ] Performance metrics meet requirements

This systematic approach will identify and resolve the specific issues preventing your JSON templates from deploying correctly to Shopify.