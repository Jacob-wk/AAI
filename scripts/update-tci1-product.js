/**
 * Update TCI-1 Course Product with Collection Tags
 * This script updates the existing TCI-1 product with proper tags for collection organization
 */

require('dotenv').config();

const PRODUCT_HANDLE = 'trampoline-court-inspector-level-1';

/**
 * Find product by handle
 */
async function findProductByHandle(handle) {
  if (!process.env.SHOPIFY_STORE_URL || !process.env.SHOPIFY_ACCESS_TOKEN) {
    console.error('Missing Shopify credentials. Please set SHOPIFY_STORE_URL and SHOPIFY_ACCESS_TOKEN in .env file');
    return null;
  }

  const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-10/products.json?handle=${handle}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.products[0] || null;
    } else {
      console.error('Failed to fetch product:', await response.text());
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error.message);
    return null;
  }
}

/**
 * Update product with new tags
 */
async function updateProductTags(productId, tags) {
  const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-10/products/${productId}.json`;
  
  const payload = {
    product: {
      id: productId,
      tags: tags
    }
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Updated product tags: ${data.product.tags}`);
      return data.product;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to update product: ${error}`);
      return null;
    }
  } catch (error) {
    console.error('❌ Error updating product:', error.message);
    return null;
  }
}

/**
 * Main execution function
 */
async function updateTCI1Product() {
  console.log('🚀 Updating TCI-1 Course Product Tags...\n');
  
  // Find the product
  console.log(`Searching for product: ${PRODUCT_HANDLE}...`);
  const product = await findProductByHandle(PRODUCT_HANDLE);
  
  if (!product) {
    console.error(`❌ Product not found: ${PRODUCT_HANDLE}`);
    console.log('\n💡 Make sure the TCI-1 product has been imported first');
    return;
  }
  
  console.log(`✅ Found product: ${product.title} (ID: ${product.id})`);
  console.log(`Current tags: ${product.tags}\n`);
  
  // New tags for collection organization
  const newTags = [
    // Core tags
    'Course',           // For main courses collection
    'safety',           // For safety courses collection  
    'inspector',        // Course type
    'trampoline',       // Equipment type
    
    // Level tags  
    'beginner',         // For beginner courses collection
    
    // CEU tags
    'ceu-1-2',          // For 1-2 CEU courses collection
    
    // Special collections
    'featured',         // For featured courses collection
    'certification',    // For certification courses collection
    
    // Additional descriptive tags
    'fundamentals',
    'tci-1'
  ].join(', ');
  
  console.log(`New tags: ${newTags}\n`);
  
  // Update the product
  const updatedProduct = await updateProductTags(product.id, newTags);
  
  if (updatedProduct) {
    console.log('\n🎉 TCI-1 Product Updated Successfully!');
    console.log('\n📊 Course will now appear in these collections:');
    console.log('• All Courses (type: Course)');
    console.log('• Safety Courses (tag: safety)');
    console.log('• Beginner Courses (tag: beginner)');
    console.log('• 1-2 CEU Credits (tag: ceu-1-2)');
    console.log('• Featured Courses (tag: featured)');
    console.log('• Certification Courses (tag: certification)');
    
    console.log('\n💡 Next Steps:');
    console.log('1. Create collections using collections-setup.js');
    console.log('2. Verify course appears in collections');
    console.log('3. Test purchase flow with Code Selling App');
  }
}

// Run the update
if (require.main === module) {
  updateTCI1Product().catch(console.error);
}

module.exports = { updateTCI1Product, findProductByHandle, updateProductTags };
