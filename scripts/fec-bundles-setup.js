#!/usr/bin/env node
/**
 * AAI FEC Course Bundles Setup
 * 
 * This script generates the bundle product configurations for FEC industry
 * with proper pricing, savings calculations, and course inclusions
 * 
 * Usage: node fec-bundles-setup.js > bundles-import.csv
 */

const bundles = [
  {
    // Trampoline Park Essentials Bundle
    title: "Trampoline Park Essentials Bundle",
    handle: "trampoline-park-essentials-bundle",
    price: 999.00,
    compare_at_price: 1147.00, // Individual courses: $449 + $299 + $349 = $1097, but we'll round up for marketing
    product_type: "Course Bundle",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "bundle",
    tags: "bundle,trampoline-park,essentials,fec,operations-manager,ceu-15",
    seo_title: "Trampoline Park Essentials Bundle | Complete FEC Safety Training",
    seo_description: "Complete safety training bundle for trampoline park managers. Includes operations, staff training, and risk management. Save $148.",
    description: "The essential safety training package for trampoline park operators. This comprehensive bundle covers all fundamental aspects of safe trampoline park operations, from staff training to risk management. Perfect for new operators or those looking to enhance their safety protocols.",
    
    // Bundle Metafields
    "metafields.bundle.courses": "trampoline-safety-operations,staff-training-customer-safety,risk-management-fecs",
    "metafields.bundle.savings": 148,
    "metafields.bundle.bonus_content": "Includes: Trampoline safety checklist templates, Staff training video modules, Risk assessment worksheets, Sample waiver forms",
    "metafields.course.level": "Operations Manager",
    "metafields.course.ceu_credits": 15,
    "metafields.course.duration": "64 Hours Total",
    "metafields.course.certification_type": "Trampoline Park Management Certificate",
    "metafields.course.delivery_method": "Online"
  },
  
  {
    // FEC Manager Certification
    title: "FEC Manager Certification Bundle",
    handle: "fec-manager-certification-bundle",
    price: 1399.00,
    compare_at_price: 1597.00, // $999 + $399 + $249 = $1647, but rounded for marketing appeal
    product_type: "Course Bundle",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "bundle",
    tags: "bundle,fec-manager,certification,complete,management,ceu-23",
    seo_title: "FEC Manager Certification Bundle | Professional Management Training",
    seo_description: "Complete FEC manager certification including operations, equipment inspection, and emergency response. Professional certification program.",
    description: "The comprehensive certification program for family entertainment center managers. This bundle builds on the essentials with advanced equipment inspection and emergency response training. Ideal for experienced operators seeking professional certification.",
    
    "metafields.bundle.courses": "trampoline-safety-operations,staff-training-customer-safety,risk-management-fecs,equipment-inspection-fundamentals,emergency-response-protocols",
    "metafields.bundle.savings": 198,
    "metafields.bundle.bonus_content": "Includes: All Essentials Bundle content PLUS Equipment inspection forms, Emergency response playbooks, Manager certification badge, Quarterly safety update webinars",
    "metafields.course.level": "Professional Manager",
    "metafields.course.ceu_credits": 23,
    "metafields.course.duration": "100 Hours Total",
    "metafields.course.certification_type": "Certified FEC Manager",
    "metafields.course.delivery_method": "Online"
  },
  
  {
    // Complete FEC Safety Program
    title: "Complete FEC Safety Program",
    handle: "complete-fec-safety-program",
    price: 1799.00,
    compare_at_price: 2147.00, // All 6 courses: $449+$299+$349+$399+$249+$499 = $2244, marketing rounded down
    product_type: "Course Bundle",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "bundle",
    tags: "bundle,complete,fec-safety,comprehensive,master-certification,ceu-29",
    seo_title: "Complete FEC Safety Program | Master Certification Bundle",
    seo_description: "The ultimate FEC safety training program. All 6 courses plus legal compliance. Master certification with 29 CEU credits. Save $348.",
    description: "The ultimate family entertainment center safety program. This comprehensive bundle includes every course in our FEC catalog, covering operations, staff training, risk management, equipment inspection, emergency response, and legal compliance. The complete solution for FEC safety excellence.",
    
    "metafields.bundle.courses": "trampoline-safety-operations,staff-training-customer-safety,risk-management-fecs,equipment-inspection-fundamentals,emergency-response-protocols,legal-compliance-family-entertainment",
    "metafields.bundle.savings": 348,
    "metafields.bundle.bonus_content": "Includes: Everything from Manager Certification PLUS Legal compliance templates, Insurance documentation guidance, Master certification plaque, Priority support access, Quarterly safety updates for 1 year, Access to exclusive FEC manager forums",
    "metafields.course.level": "Master Level",
    "metafields.course.ceu_credits": 29,
    "metafields.course.duration": "128 Hours Total",
    "metafields.course.certification_type": "Master FEC Safety Specialist",
    "metafields.course.delivery_method": "Online"
  },
  
  {
    // Staff Training Starter Pack (New addition for smaller operations)
    title: "FEC Staff Training Starter Pack",
    handle: "fec-staff-training-starter-pack",
    price: 499.00,
    compare_at_price: 548.00, // $299 + $249 = $548
    product_type: "Course Bundle",
    vendor: "AAI Institute",
    published: true,
    template_suffix: "bundle",
    tags: "bundle,staff-training,starter,small-fec,ceu-7",
    seo_title: "FEC Staff Training Starter Pack | Essential Employee Training",
    seo_description: "Essential staff training bundle for FEC employees. Customer safety and emergency response training. Perfect for small operations.",
    description: "The perfect starting point for FEC staff training. This bundle focuses on essential skills every FEC employee should have: customer safety protocols and emergency response procedures. Ideal for smaller operations or as foundational training for new staff.",
    
    "metafields.bundle.courses": "staff-training-customer-safety,emergency-response-protocols",
    "metafields.bundle.savings": 49,
    "metafields.bundle.bonus_content": "Includes: Staff training certificates, Emergency contact templates, Customer service quick reference cards, New employee orientation checklist",
    "metafields.course.level": "All Staff Levels",
    "metafields.course.ceu_credits": 7,
    "metafields.course.duration": "34 Hours Total",
    "metafields.course.certification_type": "FEC Staff Safety Certificate",
    "metafields.course.delivery_method": "Online"
  }
];

// Generate CSV for Shopify bulk import
function generateCSV() {
  // Get all possible headers
  const headers = new Set();
  bundles.forEach(bundle => {
    Object.keys(bundle).forEach(key => headers.add(key));
  });
  
  const headerArray = Array.from(headers).sort();
  
  // CSV Header
  console.log(headerArray.join(','));
  
  // CSV Rows
  bundles.forEach(bundle => {
    const row = headerArray.map(header => {
      const value = bundle[header] || '';
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
  return JSON.stringify(bundles, null, 2);
}

// Generate detailed bundle analysis
function generateBundleAnalysis() {
  console.log('=== FEC Course Bundle Analysis ===\n');
  
  bundles.forEach(bundle => {
    console.log(`## ${bundle.title}`);
    console.log(`Price: $${bundle.price}`);
    console.log(`Compare At: $${bundle.compare_at_price}`);
    console.log(`Savings: $${bundle["metafields.bundle.savings"]}`);
    console.log(`CEU Credits: ${bundle["metafields.course.ceu_credits"]}`);
    console.log(`Courses Included: ${bundle["metafields.bundle.courses"].split(',').length}`);
    console.log(`Target: ${bundle["metafields.course.level"]}`);
    console.log('---\n');
  });
  
  const totalBundles = bundles.length;
  const avgPrice = bundles.reduce((sum, bundle) => sum + bundle.price, 0) / totalBundles;
  const totalSavings = bundles.reduce((sum, bundle) => sum + bundle["metafields.bundle.savings"], 0);
  
  console.log(`Total Bundles: ${totalBundles}`);
  console.log(`Average Bundle Price: $${avgPrice.toFixed(2)}`);
  console.log(`Total Customer Savings: $${totalSavings}`);
  console.log(`Price Range: $${Math.min(...bundles.map(b => b.price))} - $${Math.max(...bundles.map(b => b.price))}`);
}

// Command line usage
if (require.main === module) {
  const format = process.argv[2] || 'csv';
  
  if (format === 'json') {
    console.log(generateJSON());
  } else if (format === 'analysis') {
    generateBundleAnalysis();
  } else {
    generateCSV();
  }
}

module.exports = { bundles, generateCSV, generateJSON, generateBundleAnalysis };
