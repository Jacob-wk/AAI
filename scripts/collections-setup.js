/**
 * AAI LMS - Shopify Collections Setup Script
 * Creates course collections based on the collections setup guide
 * This script creates collections with smart rules for automatic product assignment
 */

require('dotenv').config();

// Collection configurations based on collections-setup-guide.md
const collections = [
  {
    title: "All Courses",
    handle: "courses",
    description: "Complete catalog of professional safety education courses for Family Entertainment Centers and adventure parks",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      }
    ]
  },
  {
    title: "Safety Courses",
    handle: "safety-courses", 
    description: "Essential safety training for FEC and adventure park professionals",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals", 
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "safety"
      }
    ]
  },
  {
    title: "Operations Courses",
    handle: "operations-courses",
    description: "Operational excellence training for amusement facility management", 
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag", 
        relation: "equals",
        condition: "operations"
      }
    ]
  },
  {
    title: "Water Park Courses",
    handle: "water-park-courses",
    description: "Specialized training for water park operations and safety",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals", 
        condition: "water-park"
      }
    ]
  },
  {
    title: "Maintenance Courses", 
    handle: "maintenance-courses",
    description: "Technical maintenance training for amusement park equipment",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "maintenance"
      }
    ]
  },
  {
    title: "Leadership Courses",
    handle: "leadership-courses", 
    description: "Management and leadership development for industry professionals",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "leadership"
      }
    ]
  },
  {
    title: "Beginner Courses",
    handle: "beginner-courses",
    description: "Entry-level courses for new professionals entering the industry",
    published: true,
    rules: [
      {
        column: "type", 
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "beginner"
      }
    ]
  },
  {
    title: "Intermediate Courses",
    handle: "intermediate-courses",
    description: "Mid-level training for experienced professionals",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals", 
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "intermediate"
      }
    ]
  },
  {
    title: "Advanced Courses",
    handle: "advanced-courses",
    description: "Expert-level training for senior professionals and specialists",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"  
      },
      {
        column: "tag",
        relation: "equals",
        condition: "advanced"
      }
    ]
  },
  {
    title: "1-2 CEU Credits",
    handle: "1-2-ceu-courses",
    description: "Courses offering 1-2 continuing education units",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals", 
        condition: "ceu-1-2"
      }
    ]
  },
  {
    title: "3-5 CEU Credits", 
    handle: "3-5-ceu-courses",
    description: "Courses offering 3-5 continuing education units",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "ceu-3-5"
      }
    ]
  },
  {
    title: "6+ CEU Credits",
    handle: "6-plus-ceu-courses", 
    description: "Comprehensive courses offering 6 or more continuing education units",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "ceu-6-plus"
      }
    ]
  },
  {
    title: "Featured Courses",
    handle: "featured-courses",
    description: "Highlighted courses recommended for professionals",
    published: true, 
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "featured"
      }
    ]
  },
  {
    title: "New Courses",
    handle: "new-courses",
    description: "Recently added courses and latest training content",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals", 
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals",
        condition: "new"
      }
    ]
  },
  {
    title: "Certification Courses",
    handle: "certification-courses",
    description: "Courses that provide industry certifications upon completion",
    published: true,
    rules: [
      {
        column: "type",
        relation: "equals",
        condition: "Course"
      },
      {
        column: "tag",
        relation: "equals", 
        condition: "certification"
      }
    ]
  }
];

/**
 * Create a collection using Shopify Admin API
 */
async function createCollection(collection) {
  if (!process.env.SHOPIFY_STORE_URL || !process.env.SHOPIFY_ACCESS_TOKEN) {
    console.error('Missing Shopify credentials. Please set SHOPIFY_STORE_URL and SHOPIFY_ACCESS_TOKEN in .env file');
    return false;
  }

  const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-10/smart_collections.json`;
  
  const payload = {
    smart_collection: {
      title: collection.title,
      handle: collection.handle,
      body_html: collection.description,
      published: collection.published,
      rules: collection.rules,
      disjunctive: false // AND logic between rules
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Created collection: ${collection.title} (Handle: ${collection.handle})`);
      return data.smart_collection;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to create collection ${collection.title}: ${error}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error creating collection ${collection.title}:`, error.message);
    return false;
  }
}

/**
 * Check if collection already exists
 */
async function collectionExists(handle) {
  const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-10/smart_collections.json?handle=${handle}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.smart_collections.length > 0;
    }
  } catch (error) {
    console.error(`Error checking collection ${handle}:`, error.message);
  }
  
  return false;
}

/**
 * Main execution function
 */
async function setupCollections() {
  console.log('🚀 Starting AAI Course Collections Setup...\n');
  
  let created = 0;
  let skipped = 0;
  
  for (const collection of collections) {
    console.log(`Processing: ${collection.title}...`);
    
    // Check if collection already exists
    if (await collectionExists(collection.handle)) {
      console.log(`⏭️  Collection ${collection.title} already exists, skipping...\n`);
      skipped++;
      continue;
    }
    
    // Create the collection
    const result = await createCollection(collection);
    if (result) {
      created++;
    }
    
    console.log(''); // Add spacing
    
    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎉 Collections Setup Complete!');
  console.log(`📊 Summary: ${created} created, ${skipped} skipped`);
  console.log('\n💡 Next Steps:');
  console.log('1. Update TCI-1 course product with appropriate tags');
  console.log('2. Verify collections appear in Shopify Admin');
  console.log('3. Test collection rules are working correctly');
  console.log('4. Update navigation menus to include new collections');
}

// Run the setup
if (require.main === module) {
  setupCollections().catch(console.error);
}

module.exports = { setupCollections, createCollection, collections };
