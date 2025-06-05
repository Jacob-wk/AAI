# AAI Collections Setup Guide

## Required Collections for Course Organization

### 1. Main Courses Collection
- **Collection Handle**: `courses`
- **Title**: Professional Courses
- **Description**: Industry-leading safety education courses designed by experts for amusement park professionals. Advance your career with comprehensive certification programs.
- **Collection Type**: Manual (curated course selection)
- **Template**: `collection.courses.liquid`

### 2. Category Collections

#### Safety & Compliance
- **Collection Handle**: `courses-safety`  
- **Title**: Safety & Compliance Training
- **Description**: Master safety regulations, standards, and compliance requirements with courses designed by industry experts.
- **Automatic Conditions**: Product tag contains `safety` OR Product type equals `course` AND Product tag contains `compliance`

#### Operations Management
- **Collection Handle**: `courses-operations`
- **Title**: Operations Management
- **Description**: Learn efficient operations management techniques for amusement parks and family entertainment centers.
- **Automatic Conditions**: Product tag contains `operations` OR Product tag contains `management`

#### Water Park Safety
- **Collection Handle**: `courses-water-parks`
- **Title**: Water Park Safety
- **Description**: Specialized training for water park operations, lifeguarding standards, and aquatic safety protocols.
- **Automatic Conditions**: Product tag contains `water-park` OR Product tag contains `aquatic` OR Product tag contains `lifeguard`

#### Maintenance & Technical
- **Collection Handle**: `courses-maintenance`
- **Title**: Maintenance & Technical Training
- **Description**: Technical training for ride maintenance, equipment inspections, and preventive maintenance programs.
- **Automatic Conditions**: Product tag contains `maintenance` OR Product tag contains `technical` OR Product tag contains `inspection`

#### Leadership Development
- **Collection Handle**: `courses-leadership`
- **Title**: Leadership Development
- **Description**: Develop leadership skills specific to amusement park and entertainment industry management.
- **Automatic Conditions**: Product tag contains `leadership` OR Product tag contains `supervisor`

### 3. Level-Based Collections

#### Beginner Courses
- **Collection Handle**: `courses-beginner`
- **Title**: Beginner Level Courses
- **Description**: Perfect starting point for new professionals entering the amusement industry.
- **Automatic Conditions**: Product metafield `course.level` equals `beginner`

#### Intermediate Courses
- **Collection Handle**: `courses-intermediate`
- **Title**: Intermediate Level Courses  
- **Description**: Build on your foundation with intermediate-level professional development courses.
- **Automatic Conditions**: Product metafield `course.level` equals `intermediate`

#### Advanced Courses
- **Collection Handle**: `courses-advanced`
- **Title**: Advanced Level Courses
- **Description**: Expert-level courses for experienced professionals seeking advanced certifications.
- **Automatic Conditions**: Product metafield `course.level` equals `advanced`

### 4. CEU Credit Collections

#### CEU 1-2 Credits
- **Collection Handle**: `courses-ceu-1-2`
- **Title**: 1-2 CEU Credit Courses
- **Description**: Professional development courses offering 1-2 continuing education credits.
- **Automatic Conditions**: Product metafield `course.ceu_credits` is greater than or equal to 1 AND Product metafield `course.ceu_credits` is less than or equal to 2

#### CEU 3-5 Credits  
- **Collection Handle**: `courses-ceu-3-5`
- **Title**: 3-5 CEU Credit Courses
- **Description**: Comprehensive courses offering 3-5 continuing education credits.
- **Automatic Conditions**: Product metafield `course.ceu_credits` is greater than or equal to 3 AND Product metafield `course.ceu_credits` is less than or equal to 5

#### CEU 6+ Credits
- **Collection Handle**: `courses-ceu-6-plus`
- **Title**: 6+ CEU Credit Courses
- **Description**: Extensive professional development programs offering 6 or more CEU credits.
- **Automatic Conditions**: Product metafield `course.ceu_credits` is greater than or equal to 6

### 5. Special Collections

#### Featured Courses
- **Collection Handle**: `courses-featured`
- **Title**: Featured Courses
- **Description**: Hand-picked courses recommended by industry experts.
- **Collection Type**: Manual
- **Usage**: Homepage course showcases, marketing campaigns

#### New Courses
- **Collection Handle**: `courses-new`
- **Title**: New Courses
- **Description**: Recently added professional development courses.
- **Automatic Conditions**: Product created date is in the last 60 days

#### Certification Programs
- **Collection Handle**: `courses-certifications`
- **Title**: Certification Programs
- **Description**: Complete certification programs with industry-recognized credentials.
- **Automatic Conditions**: Product tag contains `certification` OR Product metafield `course.accreditation` is not blank

## Implementation Steps

### Step 1: Create Collections in Shopify Admin
1. Go to **Products** > **Collections**
2. Click **Create collection**
3. Add collection details (title, description, handle)
4. Set collection type (Manual or Automatic)
5. Configure automatic conditions if applicable
6. Save collection

### Step 2: Assign Products to Collections
- **TCI-1 Course** should be added to:
  - `courses` (main collection)
  - `courses-safety` (safety category)
  - `courses-beginner` (beginner level)
  - `courses-ceu-1-2` (1 CEU credit)
  - `courses-new` (if recently created)

### Step 3: Update Navigation Menu
Add collections to main navigation:
```
Courses
├── All Courses (/collections/courses)
├── Safety & Compliance (/collections/courses-safety)
├── Operations (/collections/courses-operations)
├── Water Parks (/collections/courses-water-parks)
├── Maintenance (/collections/courses-maintenance)
└── Leadership (/collections/courses-leadership)
```

### Step 4: Configure Collection Templates
- Ensure `collection.courses.liquid` template is set for main courses collection
- Other collections can use default `collection.liquid` template

## Filter Setup for TCI-1 Course

To ensure TCI-1 course appears in correct collections, add these tags:
- `safety`
- `inspection`
- `trampoline`
- `level-beginner`
- `ceu-1`

## SEO Optimization

Each collection should have:
- Descriptive meta title (include "AAI" and "Professional Training")
- Meta description highlighting value proposition
- Relevant keywords for amusement industry professionals

## Analytics Tracking

Set up collection tracking to monitor:
- Most viewed collections
- Conversion rates by collection
- Popular course categories
- CEU credit preferences

This data will inform future course development and marketing strategies.
