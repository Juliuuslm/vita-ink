# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VITA-INK** is a tattoo studio website built with Astro, React, GSAP, and Tailwind CSS v4. The project was rebranded from "Soulmark" and features smooth scrolling animations, an infinite vertical marquee hero section, and a horizontal scrolling gallery.

## Tech Stack

- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Animations**: GSAP with ScrollTrigger
- **Smooth Scrolling**: Lenis
- **TypeScript**: Strict mode enabled
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server (runs on localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run Astro CLI commands
pnpm astro [command]

# Optimize images (see PERFORMANCE.md before running)
node scripts/optimize-images.mjs
```

**Note**: Dev server runs on `http://localhost:4321` by default. Hot Module Replacement (HMR) is enabled for React components.

## Architecture

### File Structure

- **src/pages/**: Route-based pages (currently single-page site via `index.astro`)
- **src/layouts/**: Base layout with Lenis smooth scrolling integration and SEO meta tags
- **src/components/sections/**: Main page sections as React components (Hero, About, Services, Gallery, Artists, Testimonials, Contact, CTA)
- **src/components/layout/**: Shared layout components (Header, Footer, MobileMenu)
- **src/components/ui/**: Reusable UI components (Button, OptimizedImage)
- **src/lib/**: Utilities and constants
  - `constants.ts`: All site content (navigation, services, artists, testimonials, contact info, colors, fonts)
  - `utils.ts`: Helper functions
- **src/styles/**: Global CSS with Tailwind v4 configuration
- **public/placeholders/**: Static image assets (56MB of optimized JPG/WebP images)

### Key Architectural Patterns

#### 1. Astro Islands Architecture
React components are hydrated selectively using `client:load` directive in `index.astro`. All major sections are interactive React components wrapped by Astro's static shell.

#### 2. Lenis Smooth Scrolling Integration
Initialized globally in `BaseLayout.astro` via inline script:
- GSAP ticker integration for 60fps performance
- Anchor link handling with offset compensation for fixed header
- Available globally as `window.lenis`

#### 3. Animation System
Two types of animations coexist:
- **Hero**: Infinite vertical marquee using GSAP with modulo wrapping for seamless loops
- **Gallery**: Horizontal scroll triggered by vertical scroll using GSAP ScrollTrigger
- Both use `gsap.context()` for proper cleanup on unmount/resize

#### 4. Design System
Centralized in `src/lib/constants.ts`:
- All content is data-driven (services, artists, testimonials)
- Color palette defined in CSS variables (`global.css`)
- Typography: Unbounded (headings) + Plus Jakarta Sans (body)
- Theme colors: Dark (#0a0a0a), Light mint (#e8f5e8), Gold accent (#daa520)

## Important Implementation Details

### Hero Section (Infinite Marquee)
The Hero component implements a complex infinite vertical scroll:
- 5 columns of images, each with 4 images duplicated for seamless looping
- Uses GSAP modulo wrapping (`modifiers: { y }`) to avoid visual jumps
- Waits for all images to load before calculating scroll heights
- Handles resize/orientation changes with debouncing
- Gap calculation varies by breakpoint (12px mobile, 16px desktop)

Formula: `contentHeight = (totalHeight / 2) + gap`

### Gallery Section (Horizontal Scroll)
Horizontal scrolling triggered by vertical scroll progress:
- Explicit widths set for aspect ratio preservation (711px for 16:9, 933px for 21:9)
- ScrollTrigger pinning with `pin: true` and `scrub: 1`
- `x` translation calculated based on container overflow
- Fixed scroll horizontal overflow issues in PERFORMANCE.md
- **Mobile behavior**: Uses vertical grid layout on screens <768px (no horizontal scroll) to prevent section overlap
- Desktop (≥768px): Horizontal scroll via ScrollTrigger
- Waits for all images to load before calculating scroll distances

### Image Optimization Strategy
From PERFORMANCE.md analysis:
- Current images are already optimized JPGs from Webflow (~56MB total)
- **DO NOT** re-compress to WebP (results in larger files)
- **Priority optimizations**: Lazy loading, preload critical images, responsive srcset
- First image in each section uses `loading="eager"`, rest use `loading="lazy"`
- Preload hero main image in `BaseLayout.astro` for LCP optimization

### Tailwind CSS v4 Configuration
Uses `@tailwindcss/vite` plugin, not traditional config file:
- Theme variables defined in `global.css` using `@theme` directive
- Custom CSS variables prefixed with `--color-`, `--font-`, `--spacing-`
- Custom utilities: `.container-custom`, `.btn-primary`, `.section-spacing`
- Google Fonts imported directly in CSS before Tailwind import
- Font smoothing enabled globally via `-webkit-font-smoothing: antialiased`

### Utilities and Helper Libraries
- **clsx**: Used for conditional CSS class names (especially in React components)
- **sharp**: Image processing library (used in optimization scripts)
- TypeScript configured in strict mode for type safety

## Common Development Workflows

### Adding a New Section
1. Create React component in `src/components/sections/`
2. Add data to `src/lib/constants.ts` if content-driven
3. Import in `src/pages/index.astro`
4. Use `client:load` directive for interactivity
5. Add section to navigation in `NAV_LINKS` constant

### Modifying Animations
- Hero animations: Edit `src/components/sections/Hero.tsx` GSAP setup
- Other scroll animations: Use GSAP ScrollTrigger in component `useEffect`
- Always wrap in `gsap.context()` and return cleanup function
- Test resize behavior on mobile (orientation changes)

### Updating Site Content
All content is in `src/lib/constants.ts`:
- Services, artists, testimonials are exported as typed constants
- Navigation links, contact info, social links
- Color palette and fonts (also synced with CSS variables)

### Working with Images
- Place images in `public/placeholders/`
- Use `.webp` extension in import paths
- First visible image: `loading="eager"`
- Off-screen images: `loading="lazy"`
- Consider using `OptimizedImage.astro` component for advanced cases
- **Optimization script available**: `node scripts/optimize-images.mjs` (converts JPG to WebP with configurable quality)
  - Note: Current images are already well-optimized; see PERFORMANCE.md before running
  - Configurable via QUALITY and SIZE_THRESHOLD constants in the script

## Performance Considerations

From PERFORMANCE.md:
- **LCP target**: 2-2.5s (currently 4-6s baseline)
- **Critical optimizations implemented**: Lazy loading, preload hero image
- **Pending optimizations**: Responsive srcset for mobile, blur-up placeholders
- **Avoid**: Re-compressing already optimized images
- **Mobile savings**: Responsive images can reduce payload by 55% on mobile

## Git Workflow

- Main branch: `main`
- Recent rebrand from Soulmark to VITA-INK (see commit history)
- License: GNU GPL v3

## Known Issues & Gotchas

1. **Horizontal scroll in Gallery**: Fixed by adding explicit widths. Don't remove `w-[711px]` / `w-[933px]` classes.
2. **Hero marquee gaps**: Gap calculation is breakpoint-dependent. Changing Tailwind gap classes requires updating JavaScript gap values.
3. **Image loading races**: Hero waits for all images to load before calculating heights. Don't remove `waitForImages()` logic.
4. **Lenis conflicts**: If scroll feels broken, check if other scroll libraries are interfering.
5. **GSAP context cleanup**: Always use `gsap.context()` and revert on cleanup to avoid memory leaks.
6. **Mobile Gallery**: On mobile (<768px), Gallery uses vertical grid instead of horizontal scroll to prevent ScrollTrigger conflicts with other sections.

## Debugging Tips

### GSAP ScrollTrigger Issues
- Use `ScrollTrigger.getAll()` in console to see all active triggers
- Add `markers: true` to ScrollTrigger config to visualize trigger points
- Check if multiple ScrollTriggers are conflicting with same element
- Ensure ScrollTrigger.refresh() is called after dynamic content loads

### Animation Not Working
- Verify GSAP context is properly set up with `gsap.context()`
- Check if cleanup function is being called prematurely
- Ensure images are loaded before calculating positions (`waitForImages()`)
- For Lenis issues, check `window.lenis` is defined in console

### Performance Issues
- Open Chrome DevTools → Performance tab and record
- Look for long tasks (>50ms) during scroll
- Check Network tab for large images without lazy loading
- Run Lighthouse audit: `pnpm build && pnpm preview` then DevTools → Lighthouse

## SEO & Meta Tags

Configured in `BaseLayout.astro`:
- Open Graph and Twitter Card meta tags
- Canonical URLs with Astro.site fallback
- Default title/description can be overridden per page
- Preconnect to Google Fonts for performance
- Preload critical hero image

## Browser Support

- Modern browsers with ES2020+ support
- CSS custom properties (CSS variables) required
- GSAP and Lenis handle cross-browser animation compatibility
- Tailwind CSS v4 requires modern CSS features
