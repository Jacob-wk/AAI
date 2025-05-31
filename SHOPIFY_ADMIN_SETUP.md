# AAI Theme - Shopify Admin Setup Guide

## Pages Setup Required

The theme includes 14 custom page templates, but the actual pages need to be created in Shopify Admin.

### Step 1: Create Pages in Shopify Admin

Go to **Online Store > Pages** and create the following pages:

| Page Title | Handle (URL) | Template Assignment |
|------------|--------------|-------------------|
| About Us | `about` | `page.about.liquid` |
| Instructors | `instructors` | `page.instructors.liquid` |
| Demo | `demo` | `page.demo.liquid` |
| Certifications | `certifications` | `page.certifications.liquid` |
| Corporate Training | `corporate-training` | `page.corporate-training.liquid` |
| Industry Standards | `industry-standards` | `page.industry-standards.liquid` |
| Safety Library | `safety-library` | `page.safety-library.liquid` |
| Partnerships | `partnerships` | `page.partnerships.liquid` |
| Webinars | `webinars` | `page.webinars.liquid` |
| Help Center | `help-center` | `page.help-center.liquid` |
| Privacy Policy | `privacy-policy` | `page.privacy-policy.liquid` |
| Terms of Service | `terms-of-service` | `page.terms-of-service.liquid` |
| Course Access | `course-access` | `page.course-access.liquid` |
| Contact Us | `contact` | `page.contact.liquid` |
| **Test Page** | `test` | `page.test.liquid` |

**Note:** The Test Page is optional and can be used to verify theme functionality.

### Step 2: For Each Page:

1. **Click "Add page"**
2. **Enter the Title** from the table above
3. **Leave Content blank** (content is handled by the template)
4. **Set the Handle** to match the table (this creates the URL)
5. **In "Search engine listing preview"** - click "Edit website SEO"
6. **In "Template"** dropdown - select the corresponding template
7. **Save**

### Step 3: Navigation Menu Setup

Go to **Online Store > Navigation** and edit your main menu:

#### Main Menu Structure:
```
- Home (/)
- About Us (/pages/about)
- Courses
  - Course Catalog (/collections/courses)
  - Certifications (/pages/certifications)
  - Course Access (/pages/course-access)
- Training
  - Corporate Training (/pages/corporate-training)
  - Webinars (/pages/webinars)
- Resources
  - Safety Library (/pages/safety-library)
  - Industry Standards (/pages/industry-standards)
  - Help Center (/pages/help-center)
- Company
  - Instructors (/pages/instructors)
  - Partnerships (/pages/partnerships)
  - Demo (/pages/demo)
  - Contact (/pages/contact)
```

### Step 4: Header Configuration

1. Go to **Online Store > Themes > Customize**
2. Navigate to **Header** section
3. Ensure **AAI Header** is selected
4. Configure:
   - **Show credentials bar**: ✓ Enabled
   - **Main menu**: Select your configured main menu
   - **Show search**: ✓ Enabled  
   - **Show cart**: ✓ Enabled

### Step 5: Theme Settings

In **Theme Settings**:
1. **Logo**: Upload `AAI-Full-Color-Logo.jpg`
2. **Colors**: Should automatically use AAI brand colors
3. **Typography**: Should use Inter font family

### Step 6: Footer Menu

Create a footer menu with:
- Privacy Policy (/pages/privacy-policy)
- Terms of Service (/pages/terms-of-service)
- Contact (/pages/contact)
- Help Center (/pages/help-center)

## Important Notes

### Template Selection
When creating each page, you MUST select the specific template in the dropdown. If you don't see the template options:
1. Make sure all template files are uploaded to your theme
2. The template files must be named exactly as shown above
3. Both `.liquid` and `.json` files must be present

### Content Management
- Page content is built into the templates
- No manual content entry needed in Shopify admin
- Templates are fully responsive and mobile-optimized

### Troubleshooting

**If pages show duplicate headers:**
- ✅ **FIXED**: Templates have been updated to remove duplicate headers
- The theme layout automatically includes the AAI header
- Individual page templates only contain their main content

**If pages still show styling issues:**
- Ensure you're using the correct template for each page
- Check that the AAI Header is configured in the theme customizer
- Verify the main navigation menu is selected in header settings

**If navigation doesn't work:**
- Verify all page handles match exactly
- Ensure pages are published (not drafts)
- Check menu structure in Navigation settings

**If pages don't display correctly:**
- Verify both `.liquid` and `.json` template files are uploaded
- Check that template is selected for each page
- Ensure AAI logo is uploaded to theme settings

## Collections Setup

Don't forget to create the **Courses** collection for course products:
1. Go to **Products > Collections**
2. Create "Courses" collection with handle `courses`
3. Add your course products to this collection
