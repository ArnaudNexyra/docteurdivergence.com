# AboutSection Specification

## Overview
- **Target file:** `src/components/AboutSection.tsx`
- **Interaction model:** static

## DOM Structure
```
section#about.about
  div.reflect-container
    div.section-header
      span label "About"
      h2 "We're an indie team dotted across the globe"
      p "Our mission is to improve the way people think by making a jolly good note-taking app."
      a → "See our values"
```

## Text Content
- Label: "About"
- H2: "We're an indie team dotted across the globe"
- Description: "Our mission is to improve the way people think by making a jolly good note-taking app."
- CTA link: "See our values" → href="https://reflect.academy/our-values"

## Computed Styles

### section#about
- padding-top: ~120px
- padding-bottom: ~120px
- position: relative
- text-align: center

### .section-header
- max-width: 680px
- margin: 0 auto
- text-align: center

### H2
- font-family: AeonikPro
- font-size: 72px
- font-weight: 500
- line-height: 80px
- color: #ffffff
- margin-bottom: 20px

### Description p
- font-size: 18px
- line-height: 28px
- color: rgba(239, 237, 253, 0.7)
- margin-bottom: 32px

### "See our values" link
- display: inline-flex
- align-items: center
- gap: 6px
- font-size: 16px
- color: #ffffff
- text-decoration: underline
- text-underline-offset: 3px

## Responsive Behavior
- All centered, responsive at any width
- Mobile: h2 reduces to 40px
