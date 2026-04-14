# MeetingsSection Specification

## Overview
- **Target file:** `src/components/MeetingsSection.tsx`
- **Interaction model:** static + animated floating calendar "pieces"

## DOM Structure
```
section.meetings
  div.ring                          ← decorative ring in background
  div.section-header
    span label "Meetings"
    h2 "Get more out of your meetings"
    p subtitle
  div.meetings-animation            ← animated calendar cards (Google/Outlook)
    div.meetings-piece × N          ← each is a floating calendar card
      img.meetings-piece-background (q-e30fe909.png)
      div.meetings-piece-content
        img calendar logo           (q-7bea4872.png - Google Calendar)
        p "alexmaccaw@gmail.com"
        span calendar name
    img.meetings-animation-mobile   (q-b1d52962.png - mobile screenshot)
```

## Section Header
- Label: "Meetings"
- H2: "Get more out of your meetings"
- Subtitle: "Keep track of all your meetings and what was discussed. Import events quickly with our Google Calendar and Outlook integrations."

## Calendar Pieces (animation)
Multiple floating calendar entry cards that drift/float:
- Each shows: Calendar icon + email address + calendar name
- Content repeating: "Google Calendar / alexmaccaw@gmail.com" and "Outlook / alexmaccaw@outlook.com"
- The pieces are positioned absolutely and float with CSS animations

## Computed Styles

### section.meetings
- padding-top: ~120px
- padding-bottom: ~120px
- position: relative
- overflow: hidden

### .ring (decorative)
- position: absolute
- top: 0
- left: 50%
- transform: translateX(-50%)
- width: ~800px
- height: ~800px
- border-radius: 50%
- border: 1px solid rgba(255, 255, 255, 0.05)
- z-index: 0

### .section-header
- text-align: center
- position: relative
- z-index: 3
- margin-bottom: 64px

### .meetings-animation
- position: relative
- height: 500px
- max-width: 1280px
- margin: 0 auto
- overflow: hidden

### .meetings-piece
- position: absolute
- background: rgba(255, 255, 255, 0.04)
- border: 1px solid rgba(255, 255, 255, 0.08)
- border-radius: 12px
- padding: 12px 16px
- display: flex
- align-items: center
- gap: 12px
- animation: float 6s ease-in-out infinite

### .meetings-piece-background (img)
- position: absolute
- inset: 0
- width: 100%
- height: 100%
- object-fit: cover
- border-radius: inherit
- opacity: 0.15
- src: `/images/q-e30fe909.png`

### Calendar logo img
- width: 32px
- height: 32px

### Calendar text
- font-size: 14px
- color: rgba(239, 237, 253, 0.8)

## Assets
- Calendar piece bg: `/images/q-e30fe909.png` (1792×932)
- Google Calendar visualization: `/images/q-7bea4872.png` (1624×862)
- Mobile version: `/images/q-b1d52962.png`

## Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
```
Different pieces have different delays (0s, 1s, 2s, 3s) for staggered effect.

## Simplified Implementation
Instead of many floating pieces, show the Google Calendar visualization image (`q-7bea4872.png`) prominently with a few floating card overlays.

## Responsive Behavior
- **Desktop:** animation visible
- **Mobile:** show `q-b1d52962.png` static image instead
