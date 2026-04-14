# PricingSection Specification

## Overview
- **Target file:** `src/components/PricingSection.tsx`
- **Interaction model:** static

## DOM Structure
```
section#pricing.pricing
  img.pricing-background-image    ← (q-97c536f9.png) full-bg gradient image
  div.reflect-container
    div.section-header
      span label "Get access"
      h2 "We like keeping things simple"
      p "One plan one price."
    div.pricing-card
      div.pricing-price
        span "$10"
        span "/month"
        span "(billed annually)"
      ul.pricing-features
        li × 6 (feature items with checkmark)
      a.btn-reflect → "Start your 14-day trial"
```

## Text Content
- Label: "Get access"
- H2: "We like keeping things simple"
- Tagline: "One plan one price."
- Price: **$10/month** (billed annually)

## Feature List
1. Networked note-taking
2. Chrome and Safari web clipper
3. Kindle offline sync
4. End to end encryption
5. Kindle highlights sync
6. iOS app

## Computed Styles

### section#pricing
- padding-top: ~120px
- padding-bottom: ~120px
- position: relative
- overflow: hidden

### .pricing-background-image
- position: absolute
- inset: 0
- width: 100%
- height: 100%
- object-fit: cover
- z-index: 0
- opacity: 0.4
- src: `/images/q-97c536f9.png`

### .section-header
- text-align: center
- margin-bottom: 64px
- position: relative
- z-index: 3

### .pricing-card
- background: rgba(255, 255, 255, 0.04)
- border: 1px solid rgba(255, 255, 255, 0.08)
- border-radius: 24px
- padding: 48px
- max-width: 480px
- margin: 0 auto
- backdrop-filter: blur(16px)
- position: relative
- z-index: 3

### .pricing-price
- display: flex
- align-items: baseline
- gap: 4px
- margin-bottom: 8px

### Price amount "$10"
- font-family: AeonikPro
- font-size: 56px
- font-weight: 500
- color: #ffffff

### Price period "/month"
- font-size: 20px
- color: rgba(239, 237, 253, 0.7)

### Billed annually text
- font-size: 14px
- color: rgba(239, 237, 253, 0.5)
- display: block
- margin-bottom: 32px

### .pricing-features (ul)
- list-style: none
- padding: 0
- margin: 0 0 32px 0
- display: flex
- flex-direction: column
- gap: 12px

### Feature item (li)
- display: flex
- align-items: center
- gap: 10px
- font-size: 16px
- color: rgba(239, 237, 253, 0.8)

### Checkmark icon
- width: 20px
- height: 20px
- color: #712fff (purple)

### CTA button
- Use .btn-reflect class from globals.css
- Text: "Start your 14-day trial"
- width: 100%
- text-align: center
- font-size: 16px
- padding: 12px 24px
- display: block

## Assets
- Background: `/images/q-97c536f9.png`

## Responsive Behavior
- Card stays centered, full-width on mobile
