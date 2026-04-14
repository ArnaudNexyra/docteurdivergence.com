# TetrisSection Specification

## Overview
- **Target file:** `src/components/TetrisSection.tsx`
- **Interaction model:** interactive Tetris game (simplified to static visual in clone)

## DOM Structure
```
div.tetris
  div.tetris-box
    img.tetris-background.tetris-background-default   ← (q-cb7440aa.png) idle state
    img.tetris-background.tetris-background-playing   ← (q-d228e6d6.png) playing state
    div.tetris-content                                ← Academy CTA
      span label "Academy"
      h2 "Learn how to take great notes at our academy"
      p "Master the principles of note-taking in Reflect's free online Academy."
      a → "Take the course"
    canvas#tetris-canvas                              ← game canvas
  div.tetris-keys
    span "Press "Controls" to play:"
    div.tetris-keys-group (Rotate)
    div.tetris-keys-group (Fall Faster:)
```

## Text Content
- Label: "Academy"
- H2: "Learn how to take great notes at our academy"
- Description: "Master the principles of note-taking in Reflect's free online Academy."
- CTA: "Take the course" → href="https://reflect.academy"

## Implementation Strategy
Since implementing a full Tetris game is out of scope, show:
1. The background image `q-d228e6d6.png` (playing state) as a decorative background
2. The Academy CTA prominently on the right/left side
3. The keyboard hints at bottom
4. Optional: simple falling block animation using CSS

## Computed Styles

### div.tetris
- padding: ~80px 0
- position: relative
- overflow: hidden

### .tetris-box
- position: relative
- max-width: 1280px
- margin: 0 auto
- display: grid
- grid-template-columns: 1fr 1fr
- gap: 64px
- align-items: center
- padding: 0 80px

### .tetris-background
- position: absolute
- inset: 0
- width: 100%
- height: 100%
- object-fit: cover
- z-index: 0
- opacity: 0.3

### .tetris-content
- position: relative
- z-index: 3

### Academy label
- font-size: 14px
- color: rgba(239, 237, 253, 0.5)
- text-transform: uppercase
- letter-spacing: 0.1em
- margin-bottom: 12px

### H2
- font-family: AeonikPro
- font-size: 48px
- font-weight: 500
- line-height: 56px
- color: #ffffff
- margin-bottom: 16px

### Description p
- font-size: 16px
- line-height: 24px
- color: rgba(239, 237, 253, 0.7)
- margin-bottom: 32px

### "Take the course" link
- Use .btn-reflect class
- Text: "Take the course"

### .tetris-keys
- text-align: center
- font-size: 12px
- color: rgba(239, 237, 253, 0.4)
- margin-top: 24px
- display: flex
- align-items: center
- gap: 16px
- justify-content: center

## Assets
- Default bg: `/images/q-cb7440aa.png`
- Playing bg: `/images/q-d228e6d6.png`

## Responsive Behavior
- **Desktop:** 2-column (game/visual left, text right)
- **Mobile:** stack, text on top
