# Responsive Design Implementation Guide

## Breakpoints

```scss
// Mobile first breakpoints
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'large-desktop': 1440px
);

// Usage in TailwindCSS config
module.exports = {
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    }
  }
}
```

## Layout Grid System

### Container Widths
- Mobile: 100% - 32px margin
- Tablet: 720px
- Desktop: 960px
- Large Desktop: 1200px

### Grid Columns
- Mobile: 4 columns
- Tablet: 8 columns
- Desktop: 12 columns
- Column gap: 16px (mobile) / 24px (tablet+)

## Component Responsive Behavior

### Navigation
```css
/* Mobile */
.nav-mobile {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: var(--dark-gray);
}

/* Tablet+ */
.nav-desktop {
  position: fixed;
  top: 0;
  height: 80px;
  padding: 0 24px;
}
```

### Hero Section
- Mobile: Full-width background, stacked content
- Tablet: 2-column layout
- Desktop: Full-width with overlay text

### Game Features Grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

### Character Gallery
- Mobile: Horizontal scroll
- Tablet: 3 columns
- Desktop: 4 columns with hover effects

## Responsive Typography

```css
:root {
  /* Base sizes */
  --h1: clamp(2rem, 5vw, 4rem);
  --h2: clamp(1.5rem, 4vw, 3rem);
  --h3: clamp(1.25rem, 3vw, 2rem);
  --body: clamp(1rem, 2vw, 1.125rem);
}
```

## Mobile-First Optimizations

### Touch Targets
- Minimum button size: 44x44px
- Input fields: 48px height
- Icon buttons: 40x40px
- Spacing between clickable elements: 8px minimum

### Performance
```javascript
// Image loading strategy
<Image
  src="/hero-image.jpg"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  loading="lazy"
/>
```

### Navigation Patterns
- Mobile: Bottom navigation bar
- Tablet+: Top horizontal navigation
- Hamburger menu trigger: ≤ 768px

## Component-Specific Guidelines

### Cards
```css
.game-card {
  /* Mobile */
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 16px;
  }
  
  /* Tablet */
  @media (min-width: 768px) {
    width: calc(50% - 12px);
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    width: calc(33.333% - 16px);
  }
}
```

### Game Mode Sections
```css
.game-mode {
  /* Mobile */
  flex-direction: column;
  padding: 24px 16px;
  
  /* Tablet+ */
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 48px 24px;
  }
}
```

### News Feed
```css
.news-grid {
  display: grid;
  gap: 16px;
  
  /* Mobile */
  grid-template-columns: 1fr;
  
  /* Tablet */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Animation Considerations

### Mobile Optimization
```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Adjust animations accordingly
if (prefersReducedMotion.matches) {
  // Use simplified animations
  document.documentElement.style.setProperty('--animation-duration', '0.1s');
} else {
  // Use full animations
  document.documentElement.style.setProperty('--animation-duration', '0.3s');
}
```

## Testing Checklist

### Mobile Testing
- [ ] Touch targets are appropriately sized
- [ ] No horizontal scroll
- [ ] Images load appropriately
- [ ] Text is readable without zooming
- [ ] Forms are usable on mobile keyboards

### Tablet Testing
- [ ] Layout adjusts appropriately
- [ ] Navigation is accessible
- [ ] Images scale correctly
- [ ] Interactive elements work with touch and mouse

### Desktop Testing
- [ ] Full feature set is accessible
- [ ] Hover states work correctly
- [ ] Performance is optimized
- [ ] High-resolution images load for retina displays

## Implementation Priority

1. Mobile layout (320px - 767px)
   - Core functionality
   - Essential content
   - Performance optimization

2. Tablet layout (768px - 1023px)
   - Enhanced navigation
   - Expanded content layout
   - Touch/mouse hybrid interactions

3. Desktop layout (1024px+)
   - Full feature set
   - Advanced animations
   - Optimal viewing experience

## Best Practices

1. Always start with mobile layout first
2. Use relative units (rem, em, %) over fixed units
3. Test on real devices when possible
4. Implement progressive enhancement
5. Optimize images for each breakpoint
6. Use CSS Grid and Flexbox for layouts
7. Ensure accessibility across all devices
8. Monitor performance metrics for each breakpoint 