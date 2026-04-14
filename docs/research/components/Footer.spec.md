# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static

## DOM Structure
```
div.footer
  div.reflect-container
    div.footer-top
      a.logo-with-name             ← logo + "Reflect" 
      div.footer-socials           ← Discord + Twitter icons
    div.footer-columns             ← 3 link columns
      div.footer-column × 3
        h4 (column heading)
        ul → li → a × N
    div.footer-newsletter
      p "Get free note-taking workflows"
      p "In our weekly newsletter."
      form → input + button "Subscribe"
    div.footer-bottom
      a → "Privacy Policy"
      span "·"
      a → "Terms of Conditions"
      p "Reflect App, LLC. All rights reserved."
```

## Footer Columns

### Column 1: Product
- Features → #features
- Integrations → #integrations
- Pricing → #pricing
- Changelog → https://reflect.app/changelog
- Roadmap → https://reflect.academy/roadmap

### Column 2: Company
- Our team → https://reflect.academy/our-team
- Our values → https://reflect.academy/our-values
- Blog → https://reflect.app/blog

### Column 3: Resources
- Downloads → https://reflect.app/downloads
- Documentation → https://reflect.academy
- Contact → https://reflect.academy/contact-us

## Social Icons
- Discord → https://reflect.app/discord
- Twitter → https://twitter.com/reflectnotes

## Computed Styles

### div.footer
- padding-top: 80px
- padding-bottom: 40px
- border-top: 1px solid rgba(255, 255, 255, 0.06)

### .footer-top
- display: flex
- justify-content: space-between
- align-items: center
- margin-bottom: 48px

### .footer-socials
- display: flex
- gap: 12px

### Social icon link
- width: 36px
- height: 36px
- background: rgba(255, 255, 255, 0.06)
- border-radius: 8px
- display: flex
- align-items: center
- justify-content: center
- color: rgba(255, 255, 255, 0.6)
- hover: color white, bg rgba(255,255,255,0.1)

### .footer-columns
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: 40px
- margin-bottom: 48px

### Column heading (h4)
- font-size: 12px
- font-weight: 500
- color: rgba(239, 237, 253, 0.5)
- text-transform: uppercase
- letter-spacing: 0.1em
- margin-bottom: 16px

### Column link (a)
- display: block
- font-size: 14px
- color: rgba(239, 237, 253, 0.7)
- text-decoration: none
- margin-bottom: 8px
- hover: color white

### .footer-newsletter
- padding: 32px
- background: rgba(255, 255, 255, 0.03)
- border: 1px solid rgba(255, 255, 255, 0.06)
- border-radius: 16px
- margin-bottom: 32px
- display: flex
- align-items: center
- gap: 32px
- flex-wrap: wrap

### Newsletter text
- font-size: 16px
- color: rgba(239, 237, 253, 0.7)

### Newsletter form
- display: flex
- gap: 8px

### Email input
- background: rgba(255, 255, 255, 0.06)
- border: 1px solid rgba(255, 255, 255, 0.1)
- border-radius: 8px
- padding: 8px 16px
- font-size: 14px
- color: white
- placeholder color: rgba(239,237,253,0.4)

### Subscribe button
- Use .btn-reflect style
- font-size: 14px

### .footer-bottom
- display: flex
- align-items: center
- gap: 8px
- flex-wrap: wrap
- font-size: 12px
- color: rgba(239, 237, 253, 0.4)

## Responsive Behavior
- **Desktop:** 3-column footer links
- **Mobile:** 1-column stack
