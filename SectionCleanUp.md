# Section Clean Up Documentation

⚠️ **IMPORTANT:** Before removing anything, please confirm that it is actually not in use.

---

## Current Status Summary - COMPLETE ✅

- **Sections to keep:** 25 sections (including newly identified ones)
- **Sections already removed:** 15 sections  
- **Sections successfully removed in cleanup:** 8 additional sections
- **Total sections removed:** 23 sections
- **Functionality verified:** 8 items confirmed as built-in features
- **Exceptions kept:** Custom liquid, Divider, Product recommendations, Collection banner

---

## Sections to Keep

**AAI Demo Experience** - Showcasing platform capabilities and user experience demonstrations

**AAI Feature Focus** - Highlighting key platform features and functionality

**AAI Footer** - Site navigation and standard footer elements

**AAI Header** - Critical site navigation component

**AAI Hero** - Primary hero section for main page impact and messaging

**AAI Instructors Grid** - Displaying instructor profiles and credentials

**AAI Universal CTA** - Universal call-to-action component for consistent user engagement

**AAI Universal Content** - Flexible content component for various page layouts

**AAI Universal Hero** - Standardized hero component for consistency across page types

**About Content** - Content section for About page information and messaging

**About Hero** - Hero section tailored for the About page experience

**Custom Section** - Flexible section type for unique content requirements

**Demo Experience Tabs** - Interactive tabbed interface for demo content organization

**Demo Platform Features** - Showcasing platform capabilities and feature highlights

**Homepage Call to Action** - Primary conversion-focused component for homepage engagement

**Image** - Basic image component, essential building block for content creation

**Industry Authority** - Establishing credibility and industry expertise

**Instructor Profile** - Individual instructor showcase component

**Instructor Showcase** - AAI instructor showcase display component

**Text** - Fundamental text component, basic building block for all content

**User Dashboard** - User account and progress tracking interface component

**Webinars CTA** - Call-to-action for webinar engagement and registration

**Webinars Hero** - Hero section optimized for webinar landing pages

**Webinars List** - Displaying webinar schedules and listings

---

## Sections Already Removed

**AAI Custom Content** - No longer needed for current site architecture

**AAI Course Categories** - Course organization and navigation component

**Collection Courses Hero** - Specialized hero for course collection pages

**Help Categories** - Help center organization and user support navigation

**Help Center Hero** - Dedicated hero section for help and support pages

**Help Contact Options** - User support and contact functionality

**Help FAQ** - Frequently asked questions component for user self-service support

**Hero** - Basic hero section (replaced by AAI-specific hero sections)

**Marquee** - Scrolling text banner component 

**Collection Links** - Collection spotlight and text link components

**Collection List** - Bento, carousel, editorial, and grid collection layouts

**Featured Product** - Product highlight component

**Product List** - Product carousel, editorial, and grid layouts

**Media with Content** - Image with text and editorial content sections

**Slideshow** - Image slideshow component

---

## Section Cleanup Complete ✅

### Successfully Removed Sections (8 total)
- ~~Hero~~ ✅ REMOVED - Basic hero section (replaced by AAI-specific versions)
- ~~Hero: Marquee~~ ✅ REMOVED - Was part of hero.liquid schema
- ~~Marquee~~ ✅ REMOVED - Standalone scrolling text component  
- ~~Collection links: Spotlight~~ ✅ REMOVED - Collection link components
- ~~Collection links: Text~~ ✅ REMOVED - Text-based collection links
- ~~Collection list: Bento/Carousel/Editorial/Grid~~ ✅ REMOVED - Various collection layouts
- ~~Product highlight~~ ✅ REMOVED - Featured product component
- ~~Product list: Carousel/Editorial/Grid~~ ✅ REMOVED - Product listing layouts
- ~~Media with content~~ ✅ REMOVED - Image with text component
- ~~Slideshow~~ ✅ REMOVED - Image slideshow component

### Functionality Built Into Existing Sections (Not Standalone)
- **Contact form** - Built into `aai-universal-content.liquid` ✅ VERIFIED
- **Email signup** - No standalone section found ✅ VERIFIED
- **Large logo** - Part of header/footer sections ✅ VERIFIED  
- **Split showcase** - No standalone section found ✅ VERIFIED
- **FAQ** - Built into `section.liquid` (Custom Section) ✅ VERIFIED
- **Icons with text** - Icon functionality in existing sections ✅ VERIFIED
- **Pull quote** - Built into `section.liquid` (Custom Section) ✅ VERIFIED
- **Video** - Video functionality in existing sections ✅ VERIFIED

### Sections Kept (Found In Use)
- **Custom liquid** - KEEP (still needed for custom functionality)
- **Divider** - KEEP (useful spacing and visual separation component)
- **Product recommendations** - KEEP (currently used in product.course.json)
- **Collection banner** - KEEP (currently used in collection.courses.json)

---

*This cleanup will streamline the available sections while maintaining all essential functionality for the AAI platform, webinars, and core user experience components.*