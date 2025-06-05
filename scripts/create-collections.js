/**
 * AAI Collections Setup Script
 * Creates all required collections for course organization
 * Run this script to automatically set up collections in Shopify Admin
 */

const collections = [
  {
    handle: 'courses',
    title: 'Professional Courses',
    description: 'Industry-leading safety education courses designed by experts for amusement park professionals. Advance your career with comprehensive certification programs.',
    collection_type: 'smart',
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Course'
      }
    ],
    disjunctive: false,
    sort_order: 'manual',
    template_suffix: 'courses'
  },
  {
    handle: 'courses-safety',
    title: 'Safety & Compliance Training',
    description: 'Master safety regulations, standards, and compliance requirements with courses designed by industry experts.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'safety'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'compliance'
      }
    ],
    disjunctive: true
  },
  {
    handle: 'courses-operations',
    title: 'Operations Management',
    description: 'Learn efficient operations management techniques for amusement parks and family entertainment centers.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'operations'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'management'
      }
    ],
    disjunctive: true
  },
  {
    handle: 'courses-water-parks',
    title: 'Water Park Safety',
    description: 'Specialized training for water park operations, lifeguarding standards, and aquatic safety protocols.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'water-park'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'aquatic'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'lifeguard'
      }
    ],
    disjunctive: true
  },
  {
    handle: 'courses-maintenance',
    title: 'Maintenance & Technical Training',
    description: 'Technical training for ride maintenance, equipment inspections, and preventive maintenance programs.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'maintenance'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'technical'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'inspection'
      }
    ],
    disjunctive: true
  },
  {
    handle: 'courses-leadership',
    title: 'Leadership Development',
    description: 'Develop leadership skills specific to amusement park and entertainment industry management.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'leadership'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'supervisor'
      }
    ],
    disjunctive: true
  },
  {
    handle: 'courses-beginner',
    title: 'Beginner Level Courses',
    description: 'Perfect starting point for new professionals entering the amusement industry.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'level-beginner'
      }
    ],
    disjunctive: false
  },
  {
    handle: 'courses-intermediate',
    title: 'Intermediate Level Courses',
    description: 'Build on your foundation with intermediate-level professional development courses.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'level-intermediate'
      }
    ],
    disjunctive: false
  },
  {
    handle: 'courses-advanced',
    title: 'Advanced Level Courses',
    description: 'Expert-level courses for experienced professionals seeking advanced certifications.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'level-advanced'
      }
    ],
    disjunctive: false
  },
  {
    handle: 'courses-ceu-1-2',
    title: '1-2 CEU Credit Courses',
    description: 'Professional development courses offering 1-2 continuing education credits.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'ceu-1'
      },
      {
        column: 'tag',
        relation: 'equals',
        condition: 'ceu-2'
      }
    ],
    disjunctive: true
  },
  {
    handle: 'courses-featured',
    title: 'Featured Courses',
    description: 'Hand-picked courses recommended by industry experts.',
    collection_type: 'manual'
  },
  {
    handle: 'courses-new',
    title: 'New Courses',
    description: 'Recently added professional development courses.',
    collection_type: 'smart',
    rules: [
      {
        column: 'created_at',
        relation: 'greater_than',
        condition: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() // Last 60 days
      }
    ],
    disjunctive: false
  },
  {
    handle: 'courses-certifications',
    title: 'Certification Programs',
    description: 'Complete certification programs with industry-recognized credentials.',
    collection_type: 'smart',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'certification'
      }
    ],
    disjunctive: false
  }
];

/**
 * Create collections using Shopify Admin API
 */
async function createCollections() {
  const shopifyStore = process.env.SHOPIFY_STORE_URL || 'aai-amusement-adventure-institute.myshopify.com';
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('❌ SHOPIFY_ACCESS_TOKEN environment variable required');
    process.exit(1);
  }

  console.log('🚀 Creating AAI Course Collections...\n');

  for (const collection of collections) {
    try {
      const response = await fetch(`https://${shopifyStore}/admin/api/2023-10/smart_collections.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify({
          smart_collection: collection
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created collection: ${collection.title} (${collection.handle})`);
      } else {
        const error = await response.text();
        console.error(`❌ Failed to create ${collection.title}:`, error);
      }
    } catch (error) {
      console.error(`❌ Error creating ${collection.title}:`, error.message);
    }
  }

  console.log('\n🎉 Collection creation completed!');
  console.log('\n📋 Manual Steps Required:');
  console.log('1. Add TCI-1 course to Featured Courses collection manually');
  console.log('2. Update TCI-1 course tags: safety, inspection, level-beginner, ceu-1');
  console.log('3. Set collection templates in theme settings');
  console.log('4. Update navigation menus with new collections');
}

/**
 * Update TCI-1 course with proper tags for collection assignment
 */
async function updateTCI1CourseTags() {
  const shopifyStore = process.env.SHOPIFY_STORE_URL || 'aai-amusement-adventure-institute.myshopify.com';
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  
  console.log('🏷️  Updating TCI-1 course tags for collection assignment...\n');

  // Find TCI-1 product first
  try {
    const searchResponse = await fetch(`https://${shopifyStore}/admin/api/2023-10/products.json?title=TCI-1`, {
      headers: {
        'X-Shopify-Access-Token': accessToken
      }
    });

    const products = await searchResponse.json();
    
    if (products.products && products.products.length > 0) {
      const tci1Product = products.products[0];
      
      // Update with proper tags
      const updateResponse = await fetch(`https://${shopifyStore}/admin/api/2023-10/products/${tci1Product.id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify({
          product: {
            id: tci1Product.id,
            tags: 'safety, inspection, trampoline, level-beginner, ceu-1, certification'
          }
        })
      });

      if (updateResponse.ok) {
        console.log('✅ TCI-1 course tags updated successfully');
        console.log('🏷️  Tags added: safety, inspection, trampoline, level-beginner, ceu-1, certification');
      } else {
        console.error('❌ Failed to update TCI-1 course tags');
      }
    } else {
      console.log('⚠️  TCI-1 course not found. Make sure it has been imported first.');
    }
  } catch (error) {
    console.error('❌ Error updating TCI-1 course:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🎯 AAI Collections Setup Script');
  console.log('================================\n');
  
  await createCollections();
  await updateTCI1CourseTags();
  
  console.log('\n📚 Collections created and TCI-1 course updated!');
  console.log('💡 Next steps: Install Code Selling App and configure course delivery');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  createCollections,
  updateTCI1CourseTags,
  collections
};
