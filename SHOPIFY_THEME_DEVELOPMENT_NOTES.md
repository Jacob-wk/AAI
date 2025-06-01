# Shopify Theme Development Notes for AAI Project

This document outlines key Shopify theme development concepts and best practices relevant to the AAI LMS theme conversion project.

## 1. Theme Architecture & Structure (Shopify 2.0)

*   **JSON Templates (`/templates/*.json`)**: Define the structure of page types (product, collection, page, blog, cart, etc.) by referencing sections and their settings. Allows for adding, removing, and reordering sections directly from the Shopify Theme Editor.
    *   **Relevance**: Core to this project. All old `.liquid` templates are being converted to `.json` templates.
*   **Sections (`/sections/*.liquid`)**: Reusable modules of content with their own schema (defined in Liquid using `{% schema %}`) and Liquid code for rendering. Sections can have settings, blocks, and presets.
    *   **Settings**: Allow merchants to customize content, layout, and styling (e.g., text, images, colors, numbers).
    *   **Blocks**: Repeatable content units within a section (e.g., slides in a slideshow, testimonials, list items). Each block can have its own settings.
    *   **Presets**: Default configurations for sections, making it easier to add them to templates with pre-filled content. Crucial for good "empty state" / initial import experience.
    *   **Relevance**: Building robust, editable sections is the primary goal. Enhancing presets is key to fixing empty page issues.
*   **Snippets (`/snippets/*.liquid`)**: Reusable pieces of Liquid code, often used for smaller components or logic shared across multiple sections or templates. Cannot have their own schema or be directly added/managed in the theme editor like sections.
    *   **Relevance**: Useful for keeping section code DRY (Don't Repeat Yourself), e.g., a product card snippet used in multiple sections.
*   **Assets (`/assets/*.*`)**: Contains all theme assets like CSS, JavaScript, images, and fonts.
    *   **Relevance**: CSS organization (global, section-specific), JavaScript for interactivity.
*   **Config (`/config/settings_schema.json`, `/config/settings_data.json`)**:
    *   `settings_schema.json`: Defines the theme's global settings available in the Theme Editor under "Theme settings".
    *   `settings_data.json`: Stores the merchant's saved settings for the theme.
    *   **Relevance**: For global styles, typography, social media links, etc., that apply across the theme.

## 2. Metafields

*   **Definition**: Custom data fields that can be added to products, variants, collections, customers, orders, pages, blogs, and the shop itself.
*   **Types**: Supports various data types (text, integer, boolean, URL, color, JSON, rich text, file, etc.).
*   **Access in Liquid**: `product.metafields.namespace.key`, `collection.metafields.namespace.key`, etc.
*   **Shopify Admin UI**: Merchants can manage metafield definitions and values directly in the Shopify admin.
*   **Relevance**: Essential for AAI project to store course-specific data like CEU credits, duration, instructor, curriculum details, learning objectives, prerequisites, etc. This data will be pulled into product sections.

## 3. App Integration

*   **App Blocks**: Apps can provide their own blocks that merchants can add to sections through the Theme Editor. This is common for reviews, wishlists, etc.
    *   **Relevance**: If AAI uses a Shopify Reviews app, it will likely provide an app block for `product.json`.
*   **App Embed Blocks**: For apps that need to inject content more broadly or add scripts.
*   **Script Tags API**: Older method for apps to add JavaScript.
*   **Theme App Extensions**: Modern way for apps to extend themes, offering more control and better integration.
    *   **Relevance**: Be mindful of how third-party apps (like for reviews or other LMS functionalities) will integrate.

## 4. Performance Best Practices

*   **Image Optimization**: Use responsive images (`srcset`, `sizes`), lazy loading, and appropriate image formats (e.g., WebP). Shopify's `image_url` filter can help generate optimized image URLs.
*   **Lazy Loading**: For images and videos below the fold.
*   **Minify CSS & JavaScript**: Reduce file sizes. Shopify often handles this for theme assets.
*   **Reduce Liquid Loops & Complex Logic**: Optimize Liquid code for efficiency. Avoid excessive `for` loops or complex calculations where possible.
*   **Limit HTTP Requests**: Fewer external files.
*   **Use `font-display: swap`**: For custom fonts to prevent text invisibility during loading.
*   **Shopify Analyzer for Themes**: Tool to identify performance issues.
    *   **Relevance**: Ensure the converted theme is performant for a good user experience.

## 5. Section & Block Schema Best Practices

*   **Clear and Intuitive Labels/Info**: Use `name` for section/block titles in the editor, `label` for setting names, and `info` for descriptions/help text.
*   **Logical Grouping**: Group related settings using `header` type in schema.
*   **Sensible Defaults**: Provide good `default` values for settings and well-structured `presets` for sections.
*   **Input Types**: Use appropriate `type` for settings (e.g., `text`, `richtext`, `image_picker`, `color`, `range`, `checkbox`, `select`, `product`, `collection`, `url`).
*   **`limit` for Blocks**: Set a reasonable `max_blocks` for repeatable blocks in a section's schema.
*   **`placeholder`**: Use for image pickers to provide context.
    *   **Relevance**: Critical for making the theme easy to manage for AAI staff.

## 6. Development Workflow & Tools

*   **Shopify CLI**: For theme development, previewing, and publishing.
*   **Theme Check**: Linter for Shopify themes, helps catch errors and enforce best practices.
*   **Git Integration**: Essential for version control and collaboration.
*   **Dawn Theme**: Shopify's reference theme, a good starting point and example of best practices.
    *   **Relevance**: Adopting these tools and practices will streamline development.

## 7. Accessibility (A11y)

*   **Semantic HTML**: Use HTML5 tags correctly (e.g., `<nav>`, `<article>`, `<aside>`).
*   **ARIA Attributes**: Use where necessary to enhance accessibility for assistive technologies.
*   **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible.
*   **Focus States**: Clear visual indicators for focused elements.
*   **Color Contrast**: Sufficient contrast between text and background.
*   **Alt Text for Images**: Descriptive alt text for all meaningful images.
    *   **Relevance**: Important for ensuring the AAI platform is usable by everyone.

## 8. Routing and Templates

*   **Alternate Templates**: Create multiple JSON templates for the same type (e.g., `product.course.json`, `page.contact.json`). Assign them in the Shopify admin.
    *   **Relevance**: Already in use for this project (e.g., `product.course.json`).
*   **Custom Pages**: Can be built using `page.custom-template.json` and then selected in the page admin.

This document will be updated as the project progresses and more specific Shopify features become relevant.
