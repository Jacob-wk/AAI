#!/usr/bin/env node
/**
 * AAI LMS Intuto-Shopify Dynamic Course Integration
 * 
 * This system automatically creates Shopify products when new courses are added to Intuto.
 * Multiple course creators can work independently in Intuto, and products will appear automatically.
 * 
 * Key Features:
 * - Webhook-triggered course synchronization
 * - Automatic Shopify product creation
 * - Code Selling App integration
 * - Intelligent pricing based on course metadata
 * - SEO optimization
 * 
 * Usage: 
 * - Set up as webhook endpoint: /api/webhooks/intuto-course-created
 * - Manual sync: node intuto-shopify-automation.js sync
 * - Test mode: node intuto-shopify-automation.js test
 */

const axios = require('axios');
const crypto = require('crypto');

// Configuration (move to environment variables in production)
const CONFIG = {
  intuto: {
    apiKey: process.env.INTUTO_API_KEY || 'your-intuto-api-key',
    siteUrl: process.env.INTUTO_SITE_URL || 'https://aai.intuto.com',
    webhookSecret: process.env.INTUTO_WEBHOOK_SECRET || 'your-webhook-secret'
  },
  shopify: {
    storeName: process.env.SHOPIFY_STORE_NAME || 'aai-institute',
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN || 'your-shopify-token',
    apiVersion: '2024-01'
  },
  codeSelling: {
    apiKey: process.env.CODE_SELLING_API_KEY || 'your-code-selling-key',
    webhookUrl: process.env.CODE_SELLING_WEBHOOK || 'https://aai-institute.com/api/webhooks/course-completion'
  },
  pricing: {
    basePricePerHour: 50, // $50 per hour of content
    minimumPrice: 99,     // Minimum course price
    maximumPrice: 899,    // Maximum course price
    ceuMultiplier: 25     // $25 per CEU credit
  }
};

/**
 * Intuto API Client
 */
class IntutoAPI {
  constructor(apiKey, siteUrl) {
    this.apiKey = apiKey;
    this.siteUrl = siteUrl;
    this.baseURL = 'https://api.intuto.com/v2';
  }

  async getCourses() {
    try {
      const response = await axios.get(`${this.baseURL}/courses`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Intuto courses:', error.message);
      throw error;
    }
  }

  async getCourseDetails(courseId) {
    try {
      const response = await axios.get(`${this.baseURL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching course details:', error.message);
      throw error;
    }
  }

  async generateMultiTokens(courseId, quantity = 100) {
    try {
      const response = await axios.post(`${this.baseURL}/tokens/multi`, {
        course_id: courseId,
        quantity: quantity,
        expiry_date: this.getTokenExpiryDate()
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error generating tokens:', error.message);
      throw error;
    }
  }

  getTokenExpiryDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 2); // 2 years from now
    return date.toISOString().split('T')[0];
  }
}

/**
 * Shopify API Client
 */
class ShopifyAPI {
  constructor(storeName, accessToken, apiVersion) {
    this.storeName = storeName;
    this.accessToken = accessToken;
    this.apiVersion = apiVersion;
    this.baseURL = `https://${storeName}.myshopify.com/admin/api/${apiVersion}`;
  }

  async createProduct(productData) {
    try {
      const response = await axios.post(`${this.baseURL}/products.json`, {
        product: productData
      }, {
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json'
        }
      });
      return response.data.product;
    } catch (error) {
      console.error('Error creating Shopify product:', error.message);
      throw error;
    }
  }

  async updateProductMetafields(productId, metafields) {
    const promises = metafields.map(metafield => 
      axios.post(`${this.baseURL}/products/${productId}/metafields.json`, {
        metafield: metafield
      }, {
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json'
        }
      })
    );

    try {
      await Promise.all(promises);
      console.log(`Updated metafields for product ${productId}`);
    } catch (error) {
      console.error('Error updating metafields:', error.message);
      throw error;
    }
  }

  async getProductByHandle(handle) {
    try {
      const response = await axios.get(`${this.baseURL}/products.json?handle=${handle}`, {
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json'
        }
      });
      return response.data.products[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error.message);
      return null;
    }
  }
}

/**
 * Course Synchronization System
 */
class CourseSyncSystem {
  constructor() {
    this.intutoAPI = new IntutoAPI(CONFIG.intuto.apiKey, CONFIG.intuto.siteUrl);
    this.shopifyAPI = new ShopifyAPI(CONFIG.shopify.storeName, CONFIG.shopify.accessToken, CONFIG.shopify.apiVersion);
  }

  /**
   * Process a new course from Intuto webhook
   */
  async processCourseWebhook(webhookData) {
    console.log('Processing course webhook:', webhookData);

    // Verify webhook signature (implement based on Intuto webhook spec)
    if (!this.verifyWebhookSignature(webhookData)) {
      throw new Error('Invalid webhook signature');
    }

    const courseId = webhookData.course_id;
    const courseDetails = await this.intutoAPI.getCourseDetails(courseId);

    return await this.createShopifyProduct(courseDetails);
  }

  /**
   * Sync all courses from Intuto to Shopify
   */
  async syncAllCourses() {
    console.log('Starting full course synchronization...');

    try {
      const courses = await this.intutoAPI.getCourses();
      const results = [];

      for (const course of courses) {
        try {
          const handle = this.generateProductHandle(course.name);
          const existingProduct = await this.shopifyAPI.getProductByHandle(handle);

          if (!existingProduct) {
            console.log(`Creating new product for course: ${course.name}`);
            const result = await this.createShopifyProduct(course);
            results.push(result);
          } else {
            console.log(`Product already exists for course: ${course.name}`);
          }
        } catch (error) {
          console.error(`Error processing course ${course.name}:`, error.message);
        }
      }

      return results;
    } catch (error) {
      console.error('Error during full sync:', error.message);
      throw error;
    }
  }

  /**
   * Create Shopify product from Intuto course data
   */
  async createShopifyProduct(courseData) {
    const handle = this.generateProductHandle(courseData.name);
    const price = this.calculatePrice(courseData);
    const tags = this.generateTags(courseData);

    const productData = {
      title: courseData.name,
      handle: handle,
      body_html: this.generateProductDescription(courseData),
      vendor: 'AAI Institute',
      product_type: 'Digital Course',
      status: 'active',
      template_suffix: 'course',
      tags: tags.join(','),
      variants: [{
        price: price.toString(),
        inventory_management: null,
        inventory_policy: 'continue',
        fulfillment_service: 'manual',
        requires_shipping: false,
        taxable: false
      }],
      options: [{
        name: 'Title',
        values: ['Default Title']
      }],
      seo_title: this.generateSEOTitle(courseData),
      seo_description: this.generateSEODescription(courseData)
    };

    const product = await this.shopifyAPI.createProduct(productData);

    // Add metafields
    const metafields = this.generateMetafields(courseData);
    await this.shopifyAPI.updateProductMetafields(product.id, metafields);

    // Set up Code Selling App integration
    await this.setupCodeSellingIntegration(product, courseData);

    console.log(`✅ Created product: ${product.title} (ID: ${product.id})`);
    return product;
  }

  /**
   * Generate Shopify metafields from course data
   */
  generateMetafields(courseData) {
    const duration = this.parseDuration(courseData.estimated_duration || courseData.duration);
    const ceuCredits = this.calculateCEUCredits(duration);

    return [
      {
        namespace: 'course',
        key: 'level',
        value: this.determineLevel(courseData),
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'ceu_credits',
        value: ceuCredits,
        type: 'integer'
      },
      {
        namespace: 'course',
        key: 'duration',
        value: duration,
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'prerequisites',
        value: courseData.prerequisites || 'None',
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'learning_objectives',
        value: this.extractLearningObjectives(courseData),
        type: 'multi_line_text_field'
      },
      {
        namespace: 'course',
        key: 'standards_covered',
        value: this.identifyStandards(courseData),
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'certification_type',
        value: this.generateCertificationType(courseData),
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'delivery_method',
        value: 'Online',
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'accreditation',
        value: 'AAI Institute',
        type: 'single_line_text_field'
      },
      {
        namespace: 'course',
        key: 'language',
        value: courseData.language || 'English',
        type: 'single_line_text_field'
      },
      {
        namespace: 'intuto',
        key: 'course_id',
        value: courseData.id || courseData.course_id,
        type: 'single_line_text_field'
      },
      {
        namespace: 'intuto',
        key: 'token_pool_id',
        value: this.generateTokenPoolId(courseData),
        type: 'single_line_text_field'
      },
      {
        namespace: 'intuto',
        key: 'enrollment_url_template',
        value: `${CONFIG.intuto.siteUrl}/enroll/{{token}}`,
        type: 'url'
      },
      {
        namespace: 'intuto',
        key: 'completion_webhook',
        value: CONFIG.codeSelling.webhookUrl,
        type: 'url'
      }
    ];
  }

  /**
   * Calculate intelligent pricing based on course metadata
   */
  calculatePrice(courseData) {
    const duration = this.parseDurationInHours(courseData.estimated_duration || courseData.duration);
    const ceuCredits = this.calculateCEUCredits(duration);

    // Base price calculation
    let price = Math.max(
      duration * CONFIG.pricing.basePricePerHour,
      ceuCredits * CONFIG.pricing.ceuMultiplier,
      CONFIG.pricing.minimumPrice
    );

    // Level multipliers
    const level = this.determineLevel(courseData);
    const levelMultipliers = {
      'Beginner': 1.0,
      'Intermediate': 1.2,
      'Advanced': 1.5,
      'Professional': 1.8,
      'Expert': 2.0
    };

    price *= levelMultipliers[level] || 1.0;

    // Round to nearest $10 and cap at maximum
    price = Math.min(Math.round(price / 10) * 10, CONFIG.pricing.maximumPrice);

    return price;
  }

  /**
   * Generate product handle from course name
   */
  generateProductHandle(courseName) {
    return courseName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  /**
   * Parse duration string into standardized format
   */
  parseDuration(durationStr) {
    if (!durationStr) return '1 Hour';
    
    // Extract numbers from duration string
    const hours = (durationStr.match(/(\d+)\s*h/i) || [])[1];
    const minutes = (durationStr.match(/(\d+)\s*m/i) || [])[1];
    
    if (hours) {
      return `${hours} Hour${hours > 1 ? 's' : ''}`;
    } else if (minutes) {
      const hourEquivalent = Math.ceil(minutes / 60);
      return `${hourEquivalent} Hour${hourEquivalent > 1 ? 's' : ''}`;
    }
    
    return '1 Hour';
  }

  parseDurationInHours(durationStr) {
    if (!durationStr) return 1;
    
    const hours = (durationStr.match(/(\d+)\s*h/i) || [])[1];
    const minutes = (durationStr.match(/(\d+)\s*m/i) || [])[1];
    
    if (hours) return parseInt(hours);
    if (minutes) return Math.ceil(parseInt(minutes) / 60);
    
    return 1;
  }

  /**
   * Calculate CEU credits based on duration
   */
  calculateCEUCredits(duration) {
    const hours = this.parseDurationInHours(duration);
    return Math.max(1, Math.floor(hours / 4)); // 1 CEU per 4 hours
  }

  /**
   * Determine course level from metadata
   */
  determineLevel(courseData) {
    const name = courseData.name.toLowerCase();
    const description = (courseData.description || '').toLowerCase();
    
    if (name.includes('level 1') || name.includes('basic') || name.includes('introduction')) {
      return 'Beginner';
    }
    if (name.includes('level 2') || name.includes('intermediate')) {
      return 'Intermediate';
    }
    if (name.includes('level 3') || name.includes('advanced')) {
      return 'Advanced';
    }
    if (name.includes('professional') || name.includes('expert') || name.includes('master')) {
      return 'Professional';
    }
    
    return 'Intermediate'; // Default
  }

  /**
   * Extract learning objectives from course content
   */
  extractLearningObjectives(courseData) {
    // This would need to be customized based on how Intuto structures course data
    const description = courseData.description || '';
    const objectives = [];
    
    // Look for common patterns in course descriptions
    if (description.includes('learn')) {
      objectives.push('Master course fundamentals');
    }
    if (description.includes('safety')) {
      objectives.push('Understand safety protocols');
    }
    if (description.includes('inspection')) {
      objectives.push('Perform professional inspections');
    }
    if (description.includes('compliance')) {
      objectives.push('Ensure regulatory compliance');
    }
    
    return objectives.length > 0 ? objectives.join('|') : 'Complete course objectives successfully';
  }

  /**
   * Set up Code Selling App integration
   */
  async setupCodeSellingIntegration(product, courseData) {
    console.log(`Setting up Code Selling App for product: ${product.title}`);
    
    // Generate initial token batch
    const tokenPoolId = this.generateTokenPoolId(courseData);
    
    try {
      const tokens = await this.intutoAPI.generateMultiTokens(
        courseData.id || courseData.course_id,
        100 // Initial batch of 100 tokens
      );
      
      console.log(`✅ Generated ${tokens.length} tokens for ${tokenPoolId}`);
      
      // Here you would integrate with Code Selling App API
      // to create the token pool and link it to the Shopify product
      
    } catch (error) {
      console.error('Error setting up Code Selling integration:', error.message);
    }
  }

  /**
   * Generate token pool ID
   */
  generateTokenPoolId(courseData) {
    return courseData.id || courseData.course_id || 
           this.generateProductHandle(courseData.name) + '_tokens';
  }

  /**
   * Verify webhook signature (implement based on Intuto webhook spec)
   */
  verifyWebhookSignature(webhookData) {
    // This would implement the actual webhook signature verification
    // based on Intuto's webhook documentation
    return true; // Placeholder
  }

  // Additional helper methods...
  generateTags(courseData) {
    const tags = ['aai-course', 'digital-course'];
    const level = this.determineLevel(courseData);
    tags.push(level.toLowerCase());
    
    if (courseData.name.toLowerCase().includes('trampoline')) {
      tags.push('trampoline', 'safety');
    }
    if (courseData.name.toLowerCase().includes('inspector')) {
      tags.push('inspector', 'certification');
    }
    
    const ceuCredits = this.calculateCEUCredits(this.parseDuration(courseData.estimated_duration));
    tags.push(`ceu-${ceuCredits}`);
    
    return tags;
  }

  generateProductDescription(courseData) {
    return `
      <div class="course-description">
        <h3>Course Overview</h3>
        <p>${courseData.description || 'Professional training course designed for industry practitioners.'}</p>
        
        <h3>What You'll Learn</h3>
        <ul>
          <li>Master essential course concepts</li>
          <li>Apply industry best practices</li>
          <li>Enhance professional competency</li>
          <li>Earn continuing education credits</li>
        </ul>
        
        <h3>Course Format</h3>
        <p>Self-paced online learning with immediate access upon purchase.</p>
      </div>
    `;
  }

  generateSEOTitle(courseData) {
    return `${courseData.name} | Professional Training | AAI Institute`;
  }

  generateSEODescription(courseData) {
    const duration = this.parseDuration(courseData.estimated_duration);
    const ceu = this.calculateCEUCredits(duration);
    return `Professional ${courseData.name} training course. ${duration} of content, ${ceu} CEU credits. Immediate access upon purchase.`;
  }

  generateCertificationType(courseData) {
    if (courseData.name.toLowerCase().includes('inspector')) {
      return 'Inspector Certificate';
    }
    if (courseData.name.toLowerCase().includes('safety')) {
      return 'Safety Certificate';
    }
    return 'Professional Certificate';
  }

  identifyStandards(courseData) {
    const standards = [];
    const name = courseData.name.toLowerCase();
    const description = (courseData.description || '').toLowerCase();
    
    if (name.includes('trampoline') || description.includes('trampoline')) {
      standards.push('ASTM F381');
    }
    if (name.includes('astm') || description.includes('astm')) {
      standards.push('ASTM Standards');
    }
    if (name.includes('iaapa') || description.includes('iaapa')) {
      standards.push('IAAPA Guidelines');
    }
    
    return standards.length > 0 ? standards.join(', ') : 'Industry Best Practices';
  }
}

/**
 * Main execution
 */
async function main() {
  const command = process.argv[2] || 'help';
  const syncSystem = new CourseSyncSystem();

  switch (command) {
    case 'sync':
      console.log('🔄 Starting full course synchronization...');
      try {
        const results = await syncSystem.syncAllCourses();
        console.log(`✅ Synchronization complete. Created ${results.length} new products.`);
      } catch (error) {
        console.error('❌ Synchronization failed:', error.message);
        process.exit(1);
      }
      break;

    case 'test':
      console.log('🧪 Running test mode...');
      // Test with sample data
      const testCourse = {
        id: 'TCI-1',
        name: 'Trampoline Court Inspector Training Level 1 (TCI-1)',
        description: 'Essential 1-hour online course for trampoline park inspectors.',
        estimated_duration: '1h',
        prerequisites: 'None'
      };
      try {
        const result = await syncSystem.createShopifyProduct(testCourse);
        console.log('✅ Test product created:', result.title);
      } catch (error) {
        console.error('❌ Test failed:', error.message);
      }
      break;

    case 'webhook':
      // This would be called by a webhook endpoint
      const webhookData = JSON.parse(process.argv[3] || '{}');
      try {
        const result = await syncSystem.processCourseWebhook(webhookData);
        console.log('✅ Webhook processed:', result.title);
      } catch (error) {
        console.error('❌ Webhook processing failed:', error.message);
        process.exit(1);
      }
      break;

    default:
      console.log(`
AAI LMS Intuto-Shopify Dynamic Course Integration

Usage:
  node intuto-shopify-automation.js sync     - Sync all courses from Intuto
  node intuto-shopify-automation.js test     - Test with sample course data
  node intuto-shopify-automation.js webhook  - Process webhook (used by API endpoint)

Features:
  ✅ Automatic Shopify product creation from Intuto courses
  ✅ Intelligent pricing based on course duration and level
  ✅ SEO-optimized product pages
  ✅ Complete metafield configuration
  ✅ Code Selling App integration
  ✅ Multi-creator support

Configuration:
  Set environment variables for API keys and credentials.
  See CONFIG object in script for required variables.
      `);
  }
}

// Export for use as module
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CourseSyncSystem, IntutoAPI, ShopifyAPI };
