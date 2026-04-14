# CTASection Specification

## Overview
- **Target file:** `src/components/CTASection.tsx`
- **Interaction model:** static

## DOM Structure
```
section.cta
  div.reflect-container
    div.cta-content
      h2 "Start your 14-day free trial"
      p subtitle
      div.cta-actions
        a.btn-reflect → "Start free trial"
        a.cta-link    → "See pricing"
```

## Text Content
- H2: "Start your 14-day free trial"
- Subtitle: (based on site patterns) — no credit card required
- Primary CTA: "Start free trial" → href="https://reflect.app/sign-up"
- Secondary link: "See pricing" → href="#pricing"

## Computed Styles

### section.cta
- padding-top: ~120px
- padding-bottom: ~120px
- text-align: center
- position: relative

### H2
- font-family: AeonikPro
- font-size: 64px
- font-weight: 500
- line-height: 72px
- color: #ffffff
- margin-bottom: 16px

### Subtitle p
- font-size: 18px
- color: rgba(239, 237, 253, 0.7)
- margin-bottom: 40px

### .cta-actions
- display: flex
- align-items: center
- justify-content: center
- gap: 24px

### Primary button
- Use .btn-reflect class
- font-size: 16px
- padding: 12px 24px

### .cta-link
- font-size: 16px
- color: rgba(239, 237, 253, 0.7)
- text-decoration: underline
- text-underline-offset: 3px

## Responsive Behavior
- All centered
- Mobile: stack buttons vertically
