# Portfolio Build — AI Collaboration Log

> This log tracks all AI interactions, decisions, and outputs for Harsh Rawat's portfolio website.
> Other AI models can reference this file to understand the project context and continue work seamlessly.

---

## Session 1 — 2026-07-07

### Context
- **User**: Harsh Rawat (GitHub: HarshRawat12)
- **Goal**: Build a minimal, elegantly animated portfolio website
- **References**: 4 portfolios from Wall of Portfolios (Saumy, Neelesh Chaudhary, Denisha Ved, Kristian Ulrych)
- **Key inspiration**: Saumy's portfolio (saumyxdesign.work) — dark theme, monospace typography, corner bracket decorations, lime-green accent

### Decisions Made
1. **Tech Stack**: Pure HTML + CSS + Vanilla JS (no framework, max portability)
2. **Design System**: Dark mode (#0A0A0A), Inter + JetBrains Mono, lime-green accent (#86F94F)
3. **Sections**: Hero → About → Experience → Projects → Skills → Contact → Footer
4. **Animations**: 
   - Text reveal with blur→clear transition (hero title)
   - Scroll-triggered fade-up (Intersection Observer)
   - Scroll progress bar in nav
   - Staggered skill tag entrance
   - Hover glow effects on skill tags
   - Corner bracket decorations on nav links
5. **Content**: Placeholder content used (CV was Adobe Illustrator PDF, couldn't extract text)
6. **Hosting**: GitHub Pages via repo `harsh-portfolio`

### Files Created
| File | Purpose |
|------|---------|
| `index.html` | Single-page portfolio structure |
| `css/style.css` | Complete design system (~700 lines) |
| `js/main.js` | All interactions and animations |
| `Logs.md` | This file — AI collaboration log |
| `.gitignore` | Git ignore rules |
| `README.md` | Project documentation |

### Outstanding Items
- [ ] Replace placeholder content with real CV data (name confirmed as Harsh Rawat)
- [ ] Add real profile photo
- [ ] Add real project screenshots
- [ ] Update social links with actual URLs
- [ ] Update email address
- [ ] Consider adding project detail pages
- [ ] Consider adding a blog section

### For Other AI Models
- **Design tokens** are in CSS custom properties in `css/style.css`
- **Content** is in `index.html` — search for placeholder text to update
- **Hero title words** are defined in `js/main.js` in the `initTextReveal()` function
- **Animation classes**: Add `animate-on-scroll` to any element, use `delay-1` through `delay-4` for stagger
- The site is a **static site** — no build step required, just serve files

---
