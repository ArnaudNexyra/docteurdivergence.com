# ConnectedSection Specification

## Overview
- **Target file:** `src/components/ConnectedSection.tsx`
- **Interaction model:** static with scroll-in animations

## DOM Structure
```
section#connected.connected
  img.connected-background          ← large abstract background (q-44e26a19.png)
  div.rising-stars                  ← animated sparkle particles
  div.section-header
    span label "All your notes, connected"
    h2 "Give your brain superpowers"
    p subtitle
  div.connected-cards
    div.connected-card × 3          ← each with image + title + description
```

## Section Header
- Label: "All your notes, connected"
- H2: "Give your brain superpowers"
- Subtitle: "Mirror the way your mind works by associating notes through backlinks. Reflect builds you a second brain that you can reference anytime."

## Cards (3 total)

### Card 1 — Backlinks
- Image: `/images/q-c92fad10.png` (936×512)
- Title: "Your thoughts connected."
- Description: "Backlink your notes to make everything easily searchable."

### Card 2 — Record / Daily notes
- Image: `/images/q-f6418f24.png` (936×512)
- Title: "Frictionless thought capture."
- Description: "Record your ideas and to-do's easily, so you never miss a thing."

### Card 3 — (third card)
- Image: `/images/q-871c3758.png` (936×512)

## Computed Styles

### section.connected
- padding-top: 496px (large top padding due to hero overlap)
- padding-bottom: 145px
- position: relative
- overflow: visible

### .connected-background (img)
- position: absolute
- top: 0
- left: 50%
- transform: translateX(-50%)
- width: ~806px
- height: ~849px
- z-index: 0
- opacity: 0.6

### .section-header
- text-align: center
- position: relative
- z-index: 3
- margin-bottom: 64px

### Section label (eyebrow)
- font-size: 14px
- font-weight: 500
- color: rgba(239, 237, 253, 0.5)
- text-transform: uppercase
- letter-spacing: 0.1em
- margin-bottom: 12px

### .connected-cards
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: 16px
- max-width: 1280px
- margin: 0 auto
- padding: 0 80px
- position: relative
- z-index: 3

### .connected-card
- background: rgba(255, 255, 255, 0.03)
- border: 1px solid rgba(255, 255, 255, 0.06)
- border-radius: 16px
- overflow: hidden
- display: flex
- flex-direction: column

### Card image area
- width: 100%
- aspect-ratio: 468/256 (≈ 1.83:1)
- overflow: hidden

### Card image
- width: 100%
- height: 100%
- object-fit: cover

### Card content area
- padding: 20px 24px
- display: flex
- flex-direction: column
- gap: 8px

### Card title (h3)
- font-family: AeonikPro
- font-size: 18px
- font-weight: 500
- color: #ffffff

### Card description (p)
- font-size: 14px
- line-height: 20px
- color: rgba(239, 237, 253, 0.7)

## Assets
- Background: `/images/q-44e26a19.png` (1612×1698)
- Card 1 bg: `/images/q-c92fad10.png` (936×512)
- Card 2 bg: `/images/q-f6418f24.png` (936×512)
- Card 3 bg: `/images/q-871c3758.png` (936×512)

## Responsive Behavior
- **Desktop:** 3-column grid
- **Tablet:** 2-column grid
- **Mobile:** 1-column stack
