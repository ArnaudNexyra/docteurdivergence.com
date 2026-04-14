# ResearchSection Specification

## Overview
- **Target file:** `src/components/ResearchSection.tsx`
- **Interaction model:** static

## DOM Structure
```
section.research
  div.section-header
    span label "Research and reading"
    h2 "Never lose information"
    p subtitle
  div.research-content          ← 2-column layout
    div.research-left           ← radar/graph visualization
      img.research-radar-background  (q-62492b69.png, 890×890)
      img.research-radar-logo        (q-76ac7eee.png, 80×80)
    div.research-right          ← 3 feature blurbs
```

## Section Header
- Label: "Research and reading"
- H2: "Never lose information"
- Subtitle: "Collect your web snippets, Kindle highlights and important links – all in one place. Then quickly find them again from any device."

## Feature blurbs (right column)
1. **"Integrated with your devices"**
   - "We're everywhere, mobile or desktop, online or offline. Everything is synced in real-time."
2. **"Secure but open"**
   - "End-to-end encryption keeps your notes secure. Our export and API keeps your notes accessible."

## Computed Styles

### section.research
- padding-top: 64px
- padding-bottom: 128px
- position: relative

### .section-header
- margin-bottom: 80px
- text-align: center

### Research content grid
- max-width: 1280px
- margin: 0 auto
- padding: 0 80px
- display: grid
- grid-template-columns: 1fr 1fr
- gap: 80px
- align-items: center

### Radar/visualization (left)
- position: relative
- width: 100%
- aspect-ratio: 1

### .research-radar-background
- width: 100%
- opacity: 0.8

### .research-radar-logo
- position: absolute
- top: 50%
- left: 50%
- transform: translate(-50%, -50%)
- width: 80px
- height: 80px
- border-radius: 50%

### Feature blurb
- display: flex
- flex-direction: column
- gap: 8px
- margin-bottom: 40px

### Feature blurb h3
- font-family: AeonikPro
- font-size: 22px
- font-weight: 500
- color: #ffffff

### Feature blurb p
- font-size: 16px
- line-height: 24px
- color: rgba(239, 237, 253, 0.7)

## Assets
- Radar bg: `/images/q-62492b69.png` (1780×1780)
- Radar logo: `/images/q-76ac7eee.png` (160×160)

## Responsive Behavior
- **Desktop:** 2-column (visual left, text right)
- **Mobile:** stack, visual on top
