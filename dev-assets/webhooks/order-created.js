/**
 * Order Created Webhook Handler - Code Selling App Integration Monitoring
 * COPILOT CONTEXT:
 * - Monitors orders for course purchases (Code Selling App handles actual delivery)
 * - Tracks order analytics and customer engagement
 * - Professional education platform monitoring
 * - Backup tracking for AAI-specific course enrollment workflow
 * - NOTE: Primary delivery handled by Code Selling App, this is for monitoring/analytics only
 */

const crypto = require('crypto');

/**
 * Verify webhook authenticity
 */
function verifyWebhook(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody);
  const hash = 'sha256=' + hmac.digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(hash, 'utf8'),
    Buffer.from(signature, 'utf8')
  );
}

/**
 * Check if order contains course products
 */
function hasCourseProducts(order) {
  return order.line_items.some(item => 
    item.product_type === 'Course' || 
    item.tags?.includes('course') ||
    item.vendor === 'AAI Institute'
  );
}

/**
 * Track course purchases for analytics (Code Selling App handles delivery)
 */
async function trackCourseOrder(order) {
  const customer = order.customer;
  const courseItems = order.line_items.filter(item => 
    item.product_type === 'Course' || 
    item.tags?.includes('course')
  );

  // Log course purchase analytics
  console.log('AAI Course Order Tracking:', {
    orderId: order.id,
    orderNumber: order.order_number,
    customer: {
      email: customer.email,
      name: `${customer.first_name} ${customer.last_name}`,
      id: customer.id
    },
    courses: courseItems.map(item => ({
      productId: item.product_id,
      title: item.title,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price
    })),
    totalValue: courseItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0),
    timestamp: new Date().toISOString(),
    deliveryMethod: 'Code Selling App',
    status: 'order_created'
  });

  // Optional: Send to analytics service or database
  try {
    if (process.env.ANALYTICS_WEBHOOK_URL) {
      await fetch(process.env.ANALYTICS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`
        },
        body: JSON.stringify({
          event: 'course_order_created',
          order_id: order.id,
          customer_email: customer.email,
          course_skus: courseItems.map(item => item.sku),
          total_value: courseItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0),
          timestamp: new Date().toISOString(),
          delivery_method: 'code_selling_app'
        })
      });
    }
  } catch (error) {
    console.error('Failed to send analytics:', error);
  }

  return {
    success: true,
    message: 'Course order tracked successfully',
    deliveryNote: 'Course access will be delivered via Code Selling App integration',
    courseCount: courseItems.length
  };
}

/**
 * Main webhook handler function
 */
async function handleOrderCreated(req, res) {
  try {
    // Verify webhook signature
    const signature = req.get('X-Shopify-Hmac-Sha256');
    const rawBody = JSON.stringify(req.body);
    
    if (!verifyWebhook(rawBody, signature, process.env.SHOPIFY_WEBHOOK_SECRET)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const order = req.body;
    
    console.log(`Processing order ${order.id} for customer ${order.customer?.id}`);

    // Check if order contains course products
    if (!hasCourseProducts(order)) {
      console.log(`Order ${order.id} contains no course products, skipping tracking`);
      return res.status(200).json({ message: 'Order processed - no courses' });
    }

    // Only process paid orders
    if (order.financial_status !== 'paid') {
      console.log(`Order ${order.id} not yet paid, skipping tracking`);
      return res.status(200).json({ message: 'Order received - awaiting payment' });
    }

    // Track course order (Code Selling App handles actual delivery)
    const trackingResult = await trackCourseOrder(order);

    console.log(`Order tracking completed for order ${order.id}: ${trackingResult.courseCount} courses`);

    res.status(200).json({
      message: 'Order tracked successfully',
      order_id: order.id,
      courses_tracked: trackingResult.courseCount,
      delivery_method: 'code_selling_app',
      note: 'Course delivery handled by Code Selling App - this webhook is for tracking only'
    });

  } catch (error) {
    console.error('Error processing order webhook:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

module.exports = {
  handleOrderCreated,
  verifyWebhook,
  trackCourseOrder
};