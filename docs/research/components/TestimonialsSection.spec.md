# TestimonialsSection Specification

## Overview
- **Target file:** `src/components/TestimonialsSection.tsx`
- **Interaction model:** marquee / auto-scroll horizontally

## DOM Structure
```
section.testimonials
  div.testimonials-heart          ← decorative heart/sparkle image + particles
    img.testimonials-heart-image  ← (q-13ad8cef.png)
  div.section-header
    span label "Wall of love"
    h2 "Loved by thinkers"
    p "Here's what people are saying about us"
  div.testimonials-items          ← two rows of marquee cards
    div.testimonials-row          ← row 1 scrolls left
      div.testimonials-card × N
    div.testimonials-row.reverse  ← row 2 scrolls right (reverse)
      div.testimonials-card × N
```

## Testimonials Data
Cards (repeat 2× for seamless loop):

1. **Sean Rose** @seanrose
   - Avatar: `/images/q-f9bd42b4.png` (wait this is Ryan Delk)
   - "Really, really liking @reflectnotes so far. It's just the right amount of simple/fast for a personal note taking app and does most of the hard work of organizing in the background."

2. **Ryan Delk** @delk
   - Avatar: `/images/q-f9bd42b4.png`
   - "Don't take it from me: @reflectnotes is magic."

3. **Demetria Giles** @drosewritings
   - Avatar: `/images/q-5b9ee7a6.png`
   - "Playing around with @reflectnotes. I'm back logging key thoughts, details and soundbites from episodes, books, meetings, articles, etc from the past week. So far, it's a knowledge worker's dream come true."

4. **Flour storm** @adnan_wahab_
   - Avatar: `/images/q-6a31352e.png`
   - "@maccaw holy shit reflect app design is so good my writing and introspective ability went up 10x since i got it. was using bear/notion before but the simplicity of reflect is beautiful."

5. **Fabrizio Rinaldi** — Avatar: `/images/q-63640e93.png`
6. **Chris** — Avatar: `/images/q-d860527e.png`

Note: Cards repeat for seamless marquee loop.

## Computed Styles

### section.testimonials
- padding-top: ~120px
- padding-bottom: ~120px
- overflow: hidden
- position: relative

### .testimonials-heart
- position: relative
- text-align: center
- margin-bottom: 48px

### .testimonials-heart-image
- width: ~120px
- src: `/images/q-13ad8cef.png`

### .section-header
- text-align: center
- margin-bottom: 64px

### .testimonials-items
- display: flex
- flex-direction: column
- gap: 16px
- overflow: hidden

### .testimonials-row
- display: flex
- gap: 16px
- animation: marquee 40s linear infinite
- width: max-content

### .testimonials-row.reverse
- animation: marqueeReverse 40s linear infinite

### .testimonials-card
- background: rgba(255, 255, 255, 0.03)
- border: 1px solid rgba(255, 255, 255, 0.06)
- border-radius: 16px
- padding: 20px 24px
- min-width: 340px
- max-width: 400px
- flex-shrink: 0
- backdrop-filter: blur(8px)

### Card header (avatar + name + handle)
- display: flex
- align-items: center
- gap: 10px
- margin-bottom: 12px

### Avatar
- width: 36px
- height: 36px
- border-radius: 50%
- object-fit: cover

### Name
- font-size: 14px
- font-weight: 500
- color: #ffffff

### Handle
- font-size: 13px
- color: rgba(239, 237, 253, 0.5)

### Tweet text
- font-size: 14px
- line-height: 20px
- color: rgba(239, 237, 253, 0.7)

## Animations
Use `animate-marquee` and `animate-marquee-reverse` classes from globals.css.
Duplicate cards array for seamless infinite loop.

## Responsive Behavior
- Marquee works at any width
- Mobile: cards slightly narrower (min-width: 280px)
