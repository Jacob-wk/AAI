#!/usr/bin/env node
/**
 * AAI LMS Integration - Actual Course Products Setup
 * 
 * This script generates product configurations starting with the real Intuto course:
 * "Trampoline Court Inspector Training Level 1 (TCI-1)"
 * 
 * Usage: node actual-course-products-setup.js > actual-products-import.csv
 */

// Currently available courses (only courses that exist in Intuto)
const courses = [
  {
    // ACTUAL INTUTO COURSE: Trampoline Court Inspector Training Level 1
    title: "Trampoline Court Inspector Training Level 1 (TCI-1)",
    handle: "trampoline-court-inspector-level-1",
    price: 149.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "Course,safety,inspector,trampoline,beginner,ceu-1-2,featured,certification,fundamentals",
    seo_title: "Trampoline Court Inspector Training Level 1 | TCI-1 Certification",
    seo_description: "Essential 1-hour online course for trampoline park inspectors, owners, managers, and daily safety checkers. Learn best practice safety rules.",
    
    // Course Metafields
    "metafields.course.level": "Level 1",
    "metafields.course.ceu_credits": 1,
    "metafields.course.duration": "1 Hour",
    "metafields.course.prerequisites": "None",
    "metafields.course.learning_objectives": "Follow best practice safety rules|Understand daily safety inspection requirements|Identify safety hazards in trampoline areas|Ensure safe operation for customers",
    "metafields.course.standards_covered": "ASTM F381, Trampoline Safety Best Practices",
    "metafields.course.certification_type": "TCI-1 Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "AAI Institute",
    "metafields.course.language": "English",
    
    // Intuto Integration - Using actual course identifier
    "metafields.intuto.course_id": "TCI-1",
    "metafields.intuto.token_pool_id": "tci_1_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  }
];

// Template for new courses that will be created dynamically
const courseTemplate = {
  product_type: "Digital Course",
  vendor: "AAI Institute",
  published: true,
  template_suffix: "course",
  "metafields.course.delivery_method": "Online",
  "metafields.course.accreditation": "AAI Institute",
  "metafields.course.language": "English",
  "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
  "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
};

// Generate CSV for Shopify bulk import
function generateCSV() {
  // Get all possible headers
  const headers = new Set();
  courses.forEach(course => {
    Object.keys(course).forEach(key => headers.add(key));
  });
  
  const headerArray = Array.from(headers).sort();
  
  // CSV Header
  console.log(headerArray.join(','));
  
  // CSV Rows
  courses.forEach(course => {
    const row = headerArray.map(header => {
      const value = course[header] || '';
      // Escape values with commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    console.log(row.join(','));
  });
}

// Generate JSON for detailed view
function generateJSON() {
  return JSON.stringify(courses, null, 2);
}

// Generate implementation summary
function generateSummary() {
  console.log('=== AAI LMS Dynamic Course Integration Summary ===\n');
  
  const published = courses.filter(c => c.published);
  
  console.log('📚 CURRENT COURSES (Ready for Shopify):');
  published.forEach(course => {
    console.log(`✅ ${course.title}`);
    console.log(`   - Price: $${course.price}`);
    console.log(`   - Duration: ${course['metafields.course.duration']}`);
    console.log(`   - CEU: ${course['metafields.course.ceu_credits']}`);
    console.log(`   - Intuto ID: ${course['metafields.intuto.course_id']}`);
    console.log('');
  });
  
  console.log('🔄 DYNAMIC COURSE CREATION SYSTEM:');
  console.log('When course creators add new courses in Intuto:');
  console.log('1. Intuto webhook triggers course sync');
  console.log('2. Course metadata fetched via Intuto API');
  console.log('3. Shopify product auto-created with proper metafields');
  console.log('4. Code Selling App token pool auto-configured');
  console.log('5. Course becomes available for purchase');
  console.log('');
  
  console.log('🎯 IMMEDIATE NEXT STEPS:');
  console.log('1. ✅ Create TCI-1 Shopify product (ready now)');
  console.log('2. ⏳ Set up Code Selling App with TCI-1 token pool');
  console.log('3. ⏳ Test complete purchase → course access flow');
  console.log('4. ⏳ Implement Intuto webhook automation');
  console.log('5. ⏳ Course creators can add courses independently');
  console.log('');
  
  console.log('🚀 AUTOMATION BENEFITS:');
  console.log('- Course creators work independently in Intuto');
  console.log('- Products auto-appear in Shopify store');
  console.log('- No manual coordination needed');
  console.log('- Consistent pricing and metadata');
  console.log('- Immediate sales availability');
}

// Command line usage
if (require.main === module) {
  const format = process.argv[2] || 'summary';
  
  if (format === 'csv') {
    generateCSV();
  } else if (format === 'json') {
    console.log(generateJSON());
  } else {
    generateSummary();
  }
}

module.exports = { courses, generateCSV, generateJSON, generateSummary };
