# AISection Specification

## Overview
- **Target file:** `src/components/AISection.tsx`
- **Interaction model:** static section with decorative "AI demo" UI mockup

## DOM Structure
```
section#ai.ai
  div.section-header         ← badge "Reflect AI" + h2 + subtitle
  div.ai-background-wrap     ← full-width background image
    img (q-6c12dbae.png)     ← dark purple/galaxy background 2880×1670
  div.ai-content             ← two-column layout
    div.ai-demo              ← left: mock AI chat interface
    div.ai-features          ← right: feature list
```

## Section Header
- Badge: "Reflect AI" (with sparkle icon, same style as hero-badge)
- H2: "Notes with an AI assistant"
- Subtitle: "Reflect uses GPT-4 and Whisper from OpenAI to improve your writing, organize your thoughts, and act as your intellectual thought partner."
- Link below subtitle: "How to use AI to take better notes"

## AI Demo (left column) — decorative mock UI
Shows a fake AI chat interface with:
- Input field: "Ask anything to AI..."
- A sample prompt: "What can LLMs like GPT do, specifically for note-taking?"
- Sample answer with "Custom" badge
- Action buttons: Answer the question / Re-run / Insert / Copy / Replace

## AI Features list (right column)
Title: "What can you do with Reflect AI?"

Items (each with icon):
1. "Transcribe voice notes with human-level accuracy"
2. "Generate article outlines from your scattered thoughts"
3. "List key takeaways and action items from your meeting notes"
4. "Chat with your notes to find and organize information"
5. "Save your own custom prompts"

## Computed Styles

### section.ai
- padding-top: 116px
- padding-bottom: 110px
- position: relative
- overflow: visible

### .ai-background-wrap
- position: absolute
- inset: 0
- z-index: 0
- overflow: hidden

### Background image (q-6c12dbae.png)
- position: absolute
- width: 100%
- height: 100%
- object-fit: cover
- opacity: ~0.5 (blends with dark bg)

### .ai-content (inner container)
- max-width: 1280px
- margin: 0 auto
- padding: 0 80px
- display: grid
- grid-template-columns: 1fr 1fr
- gap: 64px
- align-items: center
- position: relative
- z-index: 3

### .ai-demo (left column)
- background: rgba(255, 255, 255, 0.04)
- border: 1px solid rgba(255, 255, 255, 0.08)
- border-radius: 16px
- padding: 24px
- backdrop-filter: blur(16px)

### AI input field
- background: rgba(255, 255, 255, 0.06)
- border: 1px solid rgba(255, 255, 255, 0.1)
- border-radius: 8px
- padding: 10px 14px
- color: rgba(239, 237, 253, 0.5)
- font-size: 14px

### AI answer area
- background: rgba(255, 255, 255, 0.04)
- border-radius: 8px
- padding: 16px
- font-size: 14px
- color: rgba(239, 237, 253, 0.8)
- margin-top: 12px

### .ai-features (right column)
- display: flex
- flex-direction: column
- gap: 20px

### Feature item
- display: flex
- align-items: flex-start
- gap: 12px
- font-size: 18px
- line-height: 28px
- color: #ffffff

### Feature item icon
- width: 24px, height: 24px
- color: rgba(113, 47, 255, 0.8)

## Assets
- Background: `/images/q-6c12dbae.png` (2880×1670)

## Responsive Behavior
- **Desktop:** 2-column grid
- **Mobile:** stack vertically, demo above features
- **Breakpoint:** ~768px
