Feature: Enhanced Media and Content Blocks for AAI Universal Content

Overview

Purpose: Replace the existing `text_block` usage in the `aai-universal-content` section with a flexible `content_block` that supports combined text + image layouts, and add a standalone `media_block` for image/video presentation. This feature improves the theme's content capabilities while preserving backward compatibility for existing `text_block` content.

Design Principles
- Professional, clean design with AAI brand colors:
  - Authority Navy: #1e3a5f
  - Safety Orange: #ff6b35
  - Electric Blue: #3498db
- Mobile-first, accessible (WCAG 2.1 AA), fast-loading, and maintainable.

Requirements (summary)
1. Replace `text_block` with `content_block` (new block type) supporting:
   - image placement: text-only, image-above-text, image-below-text, image-left-text-right, image-right-text-left, image-background
   - image settings: image picker, alt text, caption, link URL, aspect ratio (original, 16-9, 4-3, square), image size (small/medium/large/full-width)
   - text: block title and richtext content
   - styling: border radius (0-20px), subtle shadow toggle, padding controls
2. Add `media_block` (standalone) supporting images and videos:
   - media_type selector (image/video)
   - image picker, alt text, caption, link URL
   - video field with autoplay/loop controls
   - aspect ratio, border radius, shadow toggle, padding
3. Update `sections/aai-universal-content.liquid` to render both blocks and maintain timeline compatibility.
4. Update `assets/section-aai-content.css` with responsive, accessible styles for the new blocks.
5. Update `theme.json` blocks metadata to register `content_block` and `media_block`.
6. Maintain backward compatibility by preserving `text_block` rendering as a fallback.

Liquid behavior
- `content_block` wrapper: <div class="content-block" data-layout="{{ block.settings.image_placement }}" {{ block.shopify_attributes }}>
- Support conditional rendering per `image_placement` with semantic HTML and accessible ordering.
- `image-background` uses an overlay to ensure text contrast.
- Images use Shopify `image_url` with width based on `image_size`. Use `loading="lazy"` and `decoding="async"`.

CSS expectations
- Add `.content-block`, `.content-block__media`, `.content-block__text`, `.media-block`, `.media-block__figure`.
- Mobile-first with 50/50 split at >=768px for left/right placements.
- Border-radius and shadow controlled by settings (prefer inline styles where required).
- Focus states and hover transitions; no reliance on JS.

Testing checklist
- Render pages with each `content_block` placement and `media_block` types.
- Verify timeline layout with `content_block` entries.
- Validate accessibility (keyboard nav, focus, contrast for image-background).
- Check image sizing and lazy-loading.

Migration
- Keep `text_block` schema and rendering as fallback. Migrate presets to `content_block` where sensible.

Files to change
- sections/aai-universal-content.liquid
- assets/section-aai-content.css
- theme.json
- dev-assets/docs/feature-image-media-blocks.md (this document)

Notes
- Avoid external JS; prefer Liquid + CSS.
- Keep code comments for maintainability.

