#!/usr/bin/env node
/**
 * AAI LMS Integration - Course Products Bulk Setup
 * 
 * This script generates the product configurations for all 6 AAI courses
 * with proper metafields for Shopify Admin bulk import
 * 
 * Usage: node course-products-setup.js > products-import.csv
 */

const courses = [
  {
    // Trampoline Safety Operations
    title: "Trampoline Safety Operations",
    handle: "trampoline-safety-operations",
    price: 449.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "operations-manager,trampoline,safety,fec,ceu-6",
    seo_title: "Trampoline Safety Operations | FEC Manager Certification",
    seo_description: "Comprehensive trampoline park safety training for operations managers. ASTM F381 compliance, staff training protocols. 6 CEU credits.",
    
    // Course Metafields
    "metafields.course.level": "Operations Manager",
    "metafields.course.ceu_credits": 6,
    "metafields.course.duration": "24 Hours",
    "metafields.course.prerequisites": "Basic Management Experience",
    "metafields.course.learning_objectives": "Master trampoline safety protocols|Implement staff training programs|Develop risk assessment procedures|Ensure ASTM F381 compliance",
    "metafields.course.standards_covered": "ASTM F381, IAAPA Guidelines, Local Safety Codes",
    "metafields.course.certification_type": "FEC Safety Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "IAAPA Certified",
    "metafields.course.language": "English",
    
    // Intuto Integration
    "metafields.intuto.course_id": "trampoline_safety_ops_2024",
    "metafields.intuto.token_pool_id": "trampoline_safety_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  },
  
  {
    // Staff Training & Customer Safety
    title: "Staff Training & Customer Safety",
    handle: "staff-training-customer-safety",
    price: 299.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "staff-training,customer-safety,fec,all-levels,ceu-4",
    seo_title: "Staff Training & Customer Safety | FEC Employee Development",
    seo_description: "Essential staff training for family entertainment centers. Customer safety protocols, de-escalation techniques. 4 CEU credits.",
    
    "metafields.course.level": "All Levels",
    "metafields.course.ceu_credits": 4,
    "metafields.course.duration": "18 Hours",
    "metafields.course.prerequisites": "None",
    "metafields.course.learning_objectives": "Train staff in safety protocols|Implement customer service standards|Master de-escalation techniques|Develop emergency response skills",
    "metafields.course.standards_covered": "IAAPA Staff Guidelines, Customer Service Best Practices",
    "metafields.course.certification_type": "FEC Staff Training Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "IAAPA Certified",
    "metafields.course.language": "English",
    
    "metafields.intuto.course_id": "staff_training_safety_2024",
    "metafields.intuto.token_pool_id": "staff_training_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  },
  
  {
    // Risk Management for FECs
    title: "Risk Management for FECs",
    handle: "risk-management-fecs",
    price: 349.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "risk-management,fec,liability,insurance,ceu-5",
    seo_title: "Risk Management for FECs | Family Entertainment Center Safety",
    seo_description: "Comprehensive risk management training for family entertainment centers. Liability reduction, insurance compliance. 5 CEU credits.",
    
    "metafields.course.level": "Management",
    "metafields.course.ceu_credits": 5,
    "metafields.course.duration": "22 Hours",
    "metafields.course.prerequisites": "Management Experience",
    "metafields.course.learning_objectives": "Develop risk assessment strategies|Implement liability reduction programs|Master insurance compliance|Create safety documentation systems",
    "metafields.course.standards_covered": "Industry Best Practices, Insurance Guidelines",
    "metafields.course.certification_type": "FEC Risk Management Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "IAAPA Certified",
    "metafields.course.language": "English",
    
    "metafields.intuto.course_id": "risk_mgmt_fecs_2024",
    "metafields.intuto.token_pool_id": "risk_mgmt_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  },
  
  {
    // Equipment Inspection Fundamentals
    title: "Equipment Inspection Fundamentals",
    handle: "equipment-inspection-fundamentals",
    price: 399.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "equipment,inspection,maintenance,fec,ceu-5",
    seo_title: "Equipment Inspection Fundamentals | FEC Maintenance Training",
    seo_description: "Essential equipment inspection training for family entertainment centers. Maintenance protocols, safety compliance. 5 CEU credits.",
    
    "metafields.course.level": "Intermediate",
    "metafields.course.ceu_credits": 5,
    "metafields.course.duration": "20 Hours",
    "metafields.course.prerequisites": "Basic Technical Knowledge",
    "metafields.course.learning_objectives": "Master equipment inspection protocols|Implement preventive maintenance|Document safety compliance|Identify potential hazards",
    "metafields.course.standards_covered": "ASTM Standards, Manufacturer Guidelines",
    "metafields.course.certification_type": "Equipment Inspection Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "IAAPA Certified",
    "metafields.course.language": "English",
    
    "metafields.intuto.course_id": "equipment_inspection_2024",
    "metafields.intuto.token_pool_id": "equipment_inspection_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  },
  
  {
    // Emergency Response Protocols
    title: "Emergency Response Protocols",
    handle: "emergency-response-protocols",
    price: 249.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "emergency,response,protocols,fec,all-levels,ceu-3",
    seo_title: "Emergency Response Protocols | FEC Emergency Preparedness",
    seo_description: "Essential emergency response training for family entertainment centers. Emergency procedures, crisis management. 3 CEU credits.",
    
    "metafields.course.level": "All Levels",
    "metafields.course.ceu_credits": 3,
    "metafields.course.duration": "16 Hours",
    "metafields.course.prerequisites": "None",
    "metafields.course.learning_objectives": "Develop emergency response plans|Train staff in crisis procedures|Implement evacuation protocols|Coordinate with emergency services",
    "metafields.course.standards_covered": "Emergency Management Guidelines, Local Fire Codes",
    "metafields.course.certification_type": "Emergency Response Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "IAAPA Certified",
    "metafields.course.language": "English",
    
    "metafields.intuto.course_id": "emergency_response_2024",
    "metafields.intuto.token_pool_id": "emergency_response_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  },
  
  {
    // Legal Compliance for Family Entertainment
    title: "Legal Compliance for Family Entertainment",
    handle: "legal-compliance-family-entertainment",
    price: 499.00,
    product_type: "Digital Course",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "course",
    tags: "legal,compliance,fec,management,ceu-6",
    seo_title: "Legal Compliance for Family Entertainment | FEC Legal Training",
    seo_description: "Comprehensive legal compliance training for family entertainment centers. Liability, regulations, documentation. 6 CEU credits.",
    
    "metafields.course.level": "Management",
    "metafields.course.ceu_credits": 6,
    "metafields.course.duration": "28 Hours",
    "metafields.course.prerequisites": "Management Experience",
    "metafields.course.learning_objectives": "Understand legal requirements|Implement compliance programs|Manage liability exposure|Maintain proper documentation",
    "metafields.course.standards_covered": "State Regulations, Federal Guidelines, Industry Standards",
    "metafields.course.certification_type": "Legal Compliance Certificate",
    "metafields.course.delivery_method": "Online",
    "metafields.course.accreditation": "IAAPA Certified",
    "metafields.course.language": "English",
    
    "metafields.intuto.course_id": "legal_compliance_fec_2024",
    "metafields.intuto.token_pool_id": "legal_compliance_tokens",
    "metafields.intuto.enrollment_url_template": "https://aai.intuto.com/enroll/{{token}}",
    "metafields.intuto.completion_webhook": "https://aai-institute.com/api/webhooks/course-completion"
  }
];

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

// Generate JSON for API import
function generateJSON() {
  return JSON.stringify(courses, null, 2);
}

// Command line usage
if (require.main === module) {
  const format = process.argv[2] || 'csv';
  
  if (format === 'json') {
    console.log(generateJSON());
  } else {
    generateCSV();
  }
}

module.exports = { courses, generateCSV, generateJSON };
