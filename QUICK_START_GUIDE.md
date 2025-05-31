# AAI Theme - Quick Start Guide

## 🚀 Immediate Next Steps

### 1. Upload Theme to Shopify
1. Zip the entire `/workspaces/AAI` folder
2. Go to **Online Store > Themes** in Shopify Admin
3. Click **Upload theme**
4. Upload the zip file
5. Click **Publish** when ready

### 2. Create Pages (Critical!)
**You currently only see "Contact Us" because the other pages don't exist yet.**

Go to **Online Store > Pages** and create these pages **exactly**:

| Page Title | Handle | Template |
|------------|--------|----------|
| About Us | `about` | page.about |
| Instructors | `instructors` | page.instructors |
| Demo | `demo` | page.demo |
| Certifications | `certifications` | page.certifications |
| Corporate Training | `corporate-training` | page.corporate-training |
| Industry Standards | `industry-standards` | page.industry-standards |
| Safety Library | `safety-library` | page.safety-library |
| Partnerships | `partnerships` | page.partnerships |
| Webinars | `webinars` | page.webinars |
| Help Center | `help-center` | page.help-center |
| Privacy Policy | `privacy-policy` | page.privacy-policy |
| Terms of Service | `terms-of-service` | page.terms-of-service |
| Test Page (optional) | `test` | page.test |

**For each page:**
1. Click "Add page"
2. Enter the **exact** title from above
3. **Leave content blank** (template handles content)
4. **Verify the handle** matches exactly
5. **Select the template** from dropdown
6. Save

### 3. Configure Navigation Menu
1. Go to **Online Store > Navigation**
2. Edit your main menu
3. Add links to all the pages you just created
4. Structure: Home → About → Courses → Training → Resources → Company

### 4. Configure Header
1. Go to **Online Store > Themes > Customize**
2. Click **Header** in left panel
3. Select **AAI Header**
4. Set **Main menu** to your configured menu
5. Enable **Show credentials bar**
6. Save

### 5. Upload Logo
1. In theme customizer, go to **Theme settings**
2. Upload `AAI-Full-Color-Logo.jpg` as logo
3. Save

## 🔧 What Was Fixed

### Template Issues Resolved:
- ✅ Removed duplicate headers from page templates
- ✅ **Fixed hero content bleeding into all pages**
- ✅ **Moved hero section from header-group to homepage only**
- ✅ Templates now use theme's layout system correctly
- ✅ No more style stacking or overlapping content
- ✅ Single, consistent header across all pages

### Files Updated:
- `/templates/page.about.liquid` - Removed duplicate header
- `/templates/page.course-access.liquid` - Removed duplicate header  
- `/templates/page.test.liquid` - Created for testing
- `/sections/header-group.json` - **Removed hero section that was appearing on all pages**
- `/templates/index.json` - **Fixed homepage hero section configuration**
- `SHOPIFY_ADMIN_SETUP.md` - Complete setup guide

## 📋 Verification Checklist

After completing the setup:

1. **Test Navigation**: Visit each page to ensure no duplicate headers
2. **Check Styling**: Pages should have consistent AAI branding
3. **Mobile Test**: Verify responsive design works
4. **Header Test**: Login button should work properly
5. **Menu Test**: All navigation links should work

## 🆘 Troubleshooting

**Still seeing duplicate headers?**
- Clear browser cache
- Check that correct template is selected for each page
- Verify theme is published (not preview mode)

**Pages not appearing?**
- Check page handles match exactly
- Ensure pages are published (not drafts)
- Verify templates are selected correctly

**Navigation not working?**
- Check menu configuration in Navigation settings
- Ensure AAI Header is selected in theme customizer
- Verify main menu is assigned to header

## 📞 Support Files

- `SHOPIFY_ADMIN_SETUP.md` - Detailed setup instructions
- `DEPLOYMENT_CHECKLIST.md` - Full deployment guide
- `THEME_PACKAGE_GUIDE.md` - Complete theme overview
- `/templates/page.test.liquid` - Use to verify theme is working

The theme is now ready for production deployment!
