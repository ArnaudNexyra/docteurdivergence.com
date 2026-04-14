# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Interaction model:** fixed position, scroll-triggered background opacity change

## DOM Structure
```
div.header
  div.container-lg
    a.logo-with-name.header-logo → img (logo) + div "Reflect"
    ul.header-nav
      li × 5 → a.header-nav-link (Product, Pricing, Company, Blog, Changelog)
    div.header-actions
      a.header-nav-link (Login)
      a.button.button-primary.header-actions-trial → div.button-border + "Start free trial"
      a.button.header-actions-signup → "Sign up" (mobile only)
```

## Computed Styles

### .header container
- position: fixed
- top: 0px
- left: 0
- right: 0
- height: 88px
- background: rgba(3, 0, 20, 0.08)
- backdropFilter: blur(16px)
- zIndex: 10
- padding: 0px 20px

### .container-lg (inner)
- display: flex
- align-items: center
- justify-content: space-between
- max-width: 1280px
- margin: 0 auto
- padding: 0 60px
- height: 88px

### .logo-with-name
- display: flex
- align-items: center
- gap: 8px
- text-decoration: none

### Logo image
- width: 36px
- height: 36px
- src: `/images/logo.png`

### Logo text "Reflect"
- font-family: AeonikPro
- font-size: 18px
- font-weight: 500
- color: #ffffff

### .header-nav
- display: flex
- list-style: none
- gap: 32px
- margin: 0
- padding: 0

### .header-nav-link
- font-size: 14px
- font-weight: 400
- color: rgba(255, 255, 255, 0.9)
- text-decoration: none
- transition: color 0.2s ease

### .header-actions
- display: flex
- align-items: center
- gap: 16px

### .header-actions Login link
- font-size: 14px
- color: #ffffff
- text-decoration: none

### .button-primary (Start free trial button)
- Uses .btn-reflect + .btn-reflect-border classes from globals.css
- padding: 8px 16px
- border-radius: 8px
- font-size: 14px
- font-weight: 500
- color: rgb(244, 240, 255)
- backdrop-filter: blur(8px)
- position: relative
- ::before bg: linear-gradient(rgba(60,8,126,0) 0%, rgba(60,8,126,0.32) 100%), rgba(113,47,255,0.12)
- ::before box-shadow: rgba(191,151,255,0.24) 0px 0px 12px inset

## States & Behaviors

### Scroll-triggered background
- **Trigger:** page scrolls past ~50px
- **State A (top):** background rgba(3,0,20,0.08), no visible border
- **State B (scrolled):** background rgba(3,0,20,0.6) or similar darker opacity
- **Transition:** transition: background 0.3s ease
- **Implementation:** useEffect + scroll listener, toggle class or inline style

## Nav Items
- Product → href="#connected" (smooth scroll)
- Pricing → href="#pricing"
- Company → href="#about"
- Blog → href="https://reflect.app/blog"
- Changelog → href="https://reflect.app/changelog"
- Login → href="https://reflect.app/auth"
- Start free trial → href="https://reflect.app/sign-up"

## Responsive Behavior
- **Desktop (1440px):** full nav visible
- **Mobile (390px):** hamburger menu, nav links hidden, only logo + CTA button shown
- **Breakpoint:** ~768px
