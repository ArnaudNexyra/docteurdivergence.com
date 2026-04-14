# IntegrationsSection Specification

## Overview
- **Target file:** `src/components/IntegrationsSection.tsx`
- **Interaction model:** static (original has animated lines)

## DOM Structure
```
section#integrations.integrations
  div.integrations-static-lines    ← decorative grid lines background
  div.section-header
    span label "Integrations"
    h2 "Use Reflect with other apps"
    p subtitle
  div.integrations-items           ← 2×2 grid of integration cards
    div.integrations-item × 4
      img.integrations-item-logo
      h3 (name)
      p (description)
  img.integrations-logo            ← Reflect logo centered at bottom
  div.integrations-bg-image        ← background stars/dots image
```

## Section Header
- Label: "Integrations"
- H2: "Use Reflect with other apps"
- Subtitle: "Mirror the way your mind works by associating notes through backlinks. Reflect builds you a second brain that you can reference anytime."

## Integration Items (4 total)
1. **Zapier** — "Connect with Reflect with dozens of applications without code"
   - Logo: Zapier orange logo (from inline SVG or public asset)
2. **Readwise** — "Sync your reading highlights and notes with Reflect."
   - Logo: Readwise logo
3. **Google and Outlook** — "Integrate your contacts and calendars"
   - Logo: `/images/q-ffb847cc.png`
4. **Chrome and Safari** — "Save web clips and sync with your Kindle"
   - Logo: `/images/q-0fbeed8c.png`

## Computed Styles

### section#integrations
- padding-top: ~120px
- padding-bottom: ~120px
- position: relative
- overflow: hidden

### .integrations-static-lines
- position: absolute
- inset: 0
- background: grid lines (thin rgba(255,255,255,0.04) lines)
- pointer-events: none

### .section-header
- text-align: center
- margin-bottom: 64px
- position: relative
- z-index: 3

### .integrations-items
- display: grid
- grid-template-columns: 1fr 1fr
- gap: 16px
- max-width: 800px
- margin: 0 auto
- padding: 0 80px
- position: relative
- z-index: 3

### .integrations-item
- background: rgba(255, 255, 255, 0.03)
- border: 1px solid rgba(255, 255, 255, 0.06)
- border-radius: 16px
- padding: 32px
- display: flex
- flex-direction: column
- gap: 12px
- backdrop-filter: blur(8px)

### Integration logo
- width: 48px
- height: 48px
- object-fit: contain

### Integration name (h3)
- font-family: AeonikPro
- font-size: 18px
- font-weight: 500
- color: #ffffff

### Integration description (p)
- font-size: 14px
- line-height: 20px
- color: rgba(239, 237, 253, 0.7)

### .integrations-logo (Reflect logo bottom)
- display: block
- margin: 48px auto 0
- width: 48px
- height: 48px
- src: `/images/q-f23fe959.png`
- position: relative
- z-index: 3

## Assets
- Google/Outlook logo: `/images/q-ffb847cc.png`
- Chrome/Safari logo: `/images/q-0fbeed8c.png`
- Reflect logo: `/images/q-f23fe959.png`
- Background: `/images/q-87026e2e.png`

## Responsive Behavior
- **Desktop:** 2×2 grid
- **Mobile:** 1-column stack
