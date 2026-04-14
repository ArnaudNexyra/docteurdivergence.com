# EncryptionSection Specification

## Overview
- **Target file:** `src/components/EncryptionSection.tsx`
- **Interaction model:** static + animated scrambled text effect (decorative)

## DOM Structure
```
section.encryption
  div.encryption-scramble-text   ← animated random chars visual (decorative background)
  div.encryption-logo            ← lock icon + shield image
    img.encryption-logo-lock     ← lock SVG/icon
    img.encryption-logo-image    ← shield/security image (q-92fb8db8.png)
  div.section-header
    span label "Encryption"
    h2 "Hardened security"
    p subtitle
```

## Section Header
- Label: "Encryption"
- H2: "Hardened security"
- Subtitle: "The contents of your notes are end-to-end encrypted. No one else can read them (not even us)."

## Scrambled text visual (decorative)
- Animated random characters (A-Z, 0-9) displayed in a monospace font
- Appears as "matrix-style" random text behind the content
- Color: rgba(113, 47, 255, 0.15) — very subtle
- font-family: monospace
- position: absolute, fills section

## Computed Styles

### section.encryption
- padding-top: 222px
- padding-bottom: 236px
- position: relative
- overflow: hidden
- text-align: center

### .encryption-scramble-text
- position: absolute
- inset: 0
- display: flex
- flex-wrap: wrap
- font-family: monospace
- font-size: 14px
- color: rgba(113, 47, 255, 0.15)
- letter-spacing: 0.15em
- line-height: 24px
- pointer-events: none
- overflow: hidden
- z-index: 0

### .encryption-logo
- position: relative
- z-index: 3
- display: flex
- justify-content: center
- align-items: center
- margin-bottom: 40px
- gap: 0

### .encryption-logo-image
- width: ~200px
- src: `/images/q-92fb8db8.png`

### .section-header
- position: relative
- z-index: 3
- max-width: 560px
- margin: 0 auto

## Assets
- Encryption image: `/images/q-92fb8db8.png`

## Implementation Notes
- The scrambled text is a `useEffect` animation cycling random chars
- Use a grid of ~200 character spans, each randomly cycling every 50-100ms
- Keep it very subtle (low opacity) as it's purely decorative

## Responsive Behavior
- All centered, works at any width
- Mobile: reduce scramble text density
