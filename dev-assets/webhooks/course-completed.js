/**
 * Course Completed Webhook Handler - FetchApp Integration Monitoring
 * COPILOT CONTEXT:
 * - Monitors course completion events from Intuto API
 * - Updates customer progress and certification status
 * - Professional education platform completion tracking
 * - Integrates with AAI dashboard for professional development records
 * - NOTE: Course delivery handled by FetchApp, this tracks completion
 */

const crypto = require('crypto');

/**
 * Verify webhook authenticity from Intuto
 */
function verifyIntutoWebhook(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody);
  const hash = hmac.digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(hash, 'utf8'),
    Buffer.from(signature, 'utf8')
  );
}

/**
 * Process course completion event
 */
async function processCourseCompletion(completionData) {
  const { user, course, completion_details } = completionData;

  console.log('AAI Course Completion Tracking:', {
    userId: user.external_id,
    userEmail: user.email,
    courseId: course.external_id,
    courseTitle: course.title,
    completionDate: completion_details.completed_at,
    score: completion_details.score,
    certificateEligible: completion_details.certificate_eligible,
    timestamp: new Date().toISOString()
  });

  // Update customer progress in Shopify
  await updateCustomerProgress(user, course, completion_details);

  // Generate/assign professional certificate if eligible
  if (completion_details.certificate_eligible) {
    await processCertificateGeneration(user, course, completion_details);
  }

  return {
    success: true,
    message: 'Course completion processed successfully',
    certificateGenerated: completion_details.certificate_eligible
  };
}

/**
 * Update customer progress in Shopify metafields
 */
async function updateCustomerProgress(user, course, completion_details) {
  try {
    const customerId = user.external_id;
    const progressData = {
      metafield: {
        namespace: 'aai',
        key: `course_completion_${course.external_id}`,
        value: JSON.stringify({
          course_title: course.title,
          completion_date: completion_details.completed_at,
          score: completion_details.score,
          certificate_eligible: completion_details.certificate_eligible,
          intuto_user_id: user.id,
          intuto_course_id: course.id,
          completion_status: 'completed',
          updated_at: new Date().toISOString()
        }),
        type: 'json'
      }
    };

    const response = await fetch(
      `https://${process.env.SHOPIFY_SHOP_DOMAIN}/admin/api/2023-10/customers/${customerId}/metafields.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
        },
        body: JSON.stringify(progressData)
      }
    );

    if (!response.ok) {
      console.warn(`Failed to update customer progress: ${response.statusText}`);
    }

  } catch (error) {
    console.error('Failed to update customer progress:', error);
  }
}

/**
 * Main webhook handler function
 */
async function handleCourseCompleted(req, res) {
  try {
    // Verify webhook signature from Intuto
    const signature = req.get('X-Intuto-Signature');
    const rawBody = JSON.stringify(req.body);
    
    if (!verifyIntutoWebhook(rawBody, signature, process.env.INTUTO_WEBHOOK_SECRET)) {
      console.error('Invalid Intuto webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const completionData = req.body;
    
    console.log(`Processing course completion for user ${completionData.user?.external_id}`);

    // Process the course completion
    const result = await processCourseCompletion(completionData);

    console.log(`Course completion processed: ${result.message}`);

    res.status(200).json({
      message: result.message,
      success: result.success,
      certificate_generated: result.certificateGenerated
    });

  } catch (error) {
    console.error('Error processing course completion webhook:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

module.exports = {
  handleCourseCompleted,
  verifyIntutoWebhook,
  processCourseCompletion
};