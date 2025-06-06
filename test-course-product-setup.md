# Sample Course Product for Testing Collection Page

## Creating Test Course Product

To test the collection page functionality, we need to create a sample course product. I'll create a sample product file that can be imported into Shopify.

### TCI-1 Course Product (Simplified for Testing)

```json
{
  "title": "Trampoline Court Inspector Training Level 1 (TCI-1)",
  "handle": "trampoline-court-inspector-level-1",
  "body_html": "<p>Professional trampoline court inspection training designed for facility managers, safety professionals, and inspection personnel. Learn essential safety protocols, hazard identification, and documentation requirements.</p><p><strong>Course Highlights:</strong></p><ul><li>1 hour of focused training content</li><li>1 CEU credit upon completion</li><li>Professional certification</li><li>Industry-standard protocols</li><li>No prerequisites required</li></ul>",
  "vendor": "AAI Institute",
  "product_type": "Digital Course",
  "published": true,
  "template_suffix": "course",
  "tags": "Course,safety,inspector,trampoline,beginner,ceu-1-2,featured,certification,fundamentals",
  "variants": [
    {
      "price": "149.00",
      "sku": "AAI-TCI-1",
      "inventory_management": null,
      "inventory_policy": "continue",
      "fulfillment_service": "manual",
      "inventory_quantity": 0,
      "requires_shipping": false,
      "taxable": true,
      "weight": 0,
      "weight_unit": "lb"
    }
  ],
  "metafields": [
    {
      "namespace": "course",
      "key": "level",
      "value": "Beginner",
      "type": "single_line_text_field"
    },
    {
      "namespace": "course", 
      "key": "ceu_credits",
      "value": "1",
      "type": "single_line_text_field"
    },
    {
      "namespace": "course",
      "key": "duration", 
      "value": "1 Hour",
      "type": "single_line_text_field"
    },
    {
      "namespace": "course",
      "key": "prerequisites",
      "value": "None",
      "type": "single_line_text_field"
    },
    {
      "namespace": "course",
      "key": "learning_objectives",
      "value": "Master trampoline court inspection protocols|Identify safety hazards and risks|Document inspection findings|Apply ASTM F381 standards",
      "type": "multi_line_text_field"
    },
    {
      "namespace": "course",
      "key": "certification_type",
      "value": "TCI-1 Inspector Certificate",
      "type": "single_line_text_field"
    }
  ]
}
```

## Testing Steps

1. **Create Collection**: Ensure 'courses' collection exists in Shopify
2. **Import Product**: Create the TCI-1 product using above configuration
3. **Assign to Collection**: Add product to 'courses' collection
4. **Test Collection Page**: Visit `/collections/courses` to verify display

## Expected Results

With the TCI-1 product in place, the collection page should:
- Display the hero section with course statistics
- Show the product in the main collection grid
- Enable filtering and sorting functionality
- Display product cards with course information

## Next Steps

If the collection page works with this test product:
1. Add more course products from the comprehensive setup
2. Configure product images and detailed descriptions
3. Set up Code Selling App integration for purchase flow
4. Test complete purchase-to-access workflow
