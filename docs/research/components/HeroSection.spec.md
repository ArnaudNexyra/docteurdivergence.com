# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/hero-desktop.png` (first screenshot taken)
- **Interaction model:** static + animated purple glow ring + app preview image

## DOM Structure
```
section.hero
  div.hero-content       ← badge + h1 + subtitle + CTA (centered)
    a.hero-badge         ← "✦ Take notes using AI"
    div.section-header
      h1.section-header-title
        span.desktop → "Think better with Reflect"
        span.mobile  → "Think better\nwith Reflect"
    p.hero-description   ← "Never miss a note, idea or connection."
  div.hero-black-hole    ← radial purple/dark gradient arch background
  div.hero-video         ← app screenshot image + video play button
    img                  ← hero-preview.png
    button.hero-video-play
```

## Computed Styles

### section.hero
- padding-top: 173px
- padding-bottom: 0
- position: relative
- overflow: visible
- width: 100%

### div.hero-content
- display: flex
- flex-direction: column
- align-items: center
- text-align: center
- padding: 0 20px
- position: relative
- z-index: 3

### a.hero-badge
- display: flex
- align-items: center
- gap: 6px
- padding: 4px 13px 4px 8px
- border-radius: 32px
- font-size: 14px
- font-weight: 400
- color: #ffffff
- isolation: isolate
- overflow: hidden
- backdrop-filter: blur(6px)
- box-shadow: rgba(164, 143, 255, 0.12) 0px -7px 11px inset
- margin: 0 auto 16px
- width: max-content
- position: relative
- ::after: gradient border rgba(229,156,255,0.24)→rgba(186,156,255,0.24)→rgba(156,178,255,0.24)
  with mask content-box trick for 1px border effect

### h1 (section-header-title)
- font-family: AeonikPro
- font-size: 72px
- font-weight: 500
- line-height: 80px
- color: #ffffff
- text-align: center
- margin-bottom: 12px

### p.hero-description (subtitle)
- font-size: 18px
- line-height: 28px
- color: rgba(239, 237, 253, 0.7)
- text-align: center
- margin-bottom: 32px

### div.hero-black-hole
- position: absolute
- bottom: 0 / centered
- A large radial gradient that creates a dark arch effect with purple glow
- Background: radial-gradient from rgba(113,47,255,0.15) center outward to transparent
- Dimensions roughly 1000px × 500px centered
- Has subtle concentric ring lines (SVG or CSS borders)

### div.hero-video
- position: relative
- margin: 0 auto
- max-width: 1060px
- border-radius: 16px 16px 0 0
- overflow: hidden
- The app screenshot image fills this container

### img (hero-preview.png)
- src: `/images/hero-preview.png`
- width: 100%
- border-radius: 16px 16px 0 0
- display: block

### Video play button overlay
- position: absolute
- centered on image
- width: 56px, height: 56px
- border-radius: 50%
- background: rgba(255,255,255,0.1)
- backdrop-filter: blur(8px)
- displays a play triangle icon

## States & Behaviors

### Hero badge border
- Static gradient border via ::after pseudo-element with mask trick
- Background: linear-gradient(90deg, rgba(229,156,255,0.24), rgba(186,156,255,0.24), rgba(156,178,255,0.24))
- Padding: 1px (creates 1px border)

### No CTA buttons in hero
- The hero has NO visible CTA buttons (just the badge and text)
- CTA is deferred to the bottom CTA section

## Text Content (verbatim)
- Badge: "Take notes using AI"
- H1: "Think better with Reflect"
- Subtitle: "Never miss a note, idea or connection."

## Assets
- Hero badge SVG icon: sparkle/star (multi-point star with gradient fill) from icons.tsx
- Hero preview image: `/images/hero-preview.png` (2400×1500)
- Video: `/videos/q-b0877a06.mp4` (hero demo video — shown in modal on click)

## Responsive Behavior
- **Desktop (1440px):** h1 72px, image max-width 1060px
- **Mobile (390px):** h1 ~48px, image full-width with slight horizontal padding
- **Breakpoint:** ~768px — h1 font size reduces
