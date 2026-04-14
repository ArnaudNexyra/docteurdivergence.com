# FeaturesSection Specification

## Overview
- **Target file:** `src/components/FeaturesSection.tsx`
- **Interaction model:** horizontal scrolling carousel (Swiper.js on original, implement with CSS scroll-snap)

## DOM Structure
```
section#features.features
  div.features-cards.swiper
    div.swiper-wrapper
      div.features-card.swiper-slide × 8
        svg (40×40 icon with gradient)
        h3 (title)
        p (description)
```

## Card Data (all 8 cards)
1. **Built for speed** — "Instantly sync your notes across devices"
   - Icon: cloud/lightning bolt SVG
2. **Networked notes** — "Form a graph of ideas with backlinked notes"
   - Icon: network/nodes SVG
3. **iOS app** — "Capture ideas on the go, online or offline"
   - Icon: phone/mobile SVG
4. **End-to-end encryption** — "Only you can access your notes"
   - Icon: lock/shield SVG
5. **Calendar integration** — "Keep track of meetings and agendas"
   - Icon: calendar SVG
6. **Publishing** — "Share anything you write with one click"
   - Icon: share/arrow SVG
7. **Instant capture** — "Save snippets from your browser and Kindle"
   - Icon: lightning/capture SVG
8. **Frictionless search** — "Easily recall and index past notes and ideas"
   - Icon: search/magnifier SVG

## Computed Styles

### section.features
- padding: 0
- position: relative
- overflow: visible

### .features-cards container
- display: flex
- flex-direction: row (horizontal)
- overflow-x: auto
- scroll-snap-type: x mandatory
- gap: 0 (cards are adjacent)
- padding: 32px 80px
- scrollbar-width: none (hidden scrollbar)

### .features-card
- min-width: 280px
- background: rgba(255, 255, 255, 0.03)
- border: 1px solid rgba(255, 255, 255, 0.06)
- border-radius: 16px
- padding: 24px
- display: flex
- flex-direction: column
- gap: 12px
- scroll-snap-align: start
- margin-right: 16px
- backdrop-filter: blur(8px)

### Card icon SVG
- width: 40px, height: 40px
- fill: linear gradient purple → blue (each icon unique)
- fill-opacity: 0.24 for fill, separate stroke path at full opacity

### Card h3
- font-family: AeonikPro
- font-size: 16px
- font-weight: 500
- color: #ffffff
- margin: 0

### Card p
- font-size: 14px
- line-height: 20px
- color: rgba(239, 237, 253, 0.7)
- margin: 0

## States & Behaviors

### Scroll interaction
- **Type:** CSS overflow-x: scroll with scroll-snap
- Cards scroll horizontally on desktop and touch on mobile
- No scrollbar visible (scrollbar-width: none)

## Responsive Behavior
- **Desktop (1440px):** cards in horizontal row, ~6 visible, user scrolls to see more
- **Mobile (390px):** cards in horizontal scroll, ~1.3 cards visible
