# reflect.app/home — Page Topology

## Page dimensions
- Total height: ~13,459px
- Background: #030014

## Sections (top to bottom)

| # | Section class | offsetTop | offsetHeight | Interaction |
|---|--------------|-----------|--------------|-------------|
| 1 | `.header` (div) | 0 | 88px | fixed, scroll-triggered bg |
| 2 | `section.hero` | 0 | 1339px | black-hole canvas animation, video reveal |
| 3 | `section#features.features` | 1261px | 392px | swiper horizontal scroll |
| 4 | `section#ai.ai` | 1653px | 1287px | static + click-driven demo |
| 5 | `section#connected.connected` | 2940px | 1241px | scroll-in animations |
| 6 | `section.research` | 4181px | 1110px | static |
| 7 | `section.encryption` | 5291px | 776px | static + animated text scramble |
| 8 | `section.meetings` | 6067px | 1154px | animated floating cards |
| 9 | `section#integrations.integrations` | 7221px | 940px | static |
| 10 | `section#pricing.pricing` | 8161px | 1256px | static |
| 11 | `section.testimonials` | 9417px | 868px | marquee scroll |
| 12 | `section#about.about` | 10285px | 824px | static |
| 13 | `div.tetris` | 11109px | 916px | interactive Tetris game |
| 14 | `section.cta` | 12097px | 600px | static |
| 15 | `div.footer` | 12697px | 762px | static |

## Z-index layers
- Header: z-index 10 (fixed overlay)
- Hero black hole: z-index below content
- Section content: z-index 3

## Scroll container
- Native browser scroll (no Lenis detected)
- No scroll-snap on body

## Layout system
- Max-width container: ~1280px centered
- Side padding: 80px desktop, 40px tablet, 20px mobile
