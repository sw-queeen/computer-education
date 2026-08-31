# CS.im Design System — Glassmorphism (Liquid Glass, Cool Violet Edition)

> 이 문서는 CS.im 사이트에 적용된 **글래스모피즘(Glassmorphism / Liquid Glass)** 디자인
> 시스템의 원본 스펙입니다. 기존에 있던 "Neumorphism (Soft UI, Cool Grey Edition)" 스펙
> 전체를 대체합니다.
>
> - **베이스는 더 이상 단일 불투명 그레이(`#E0E5EC`)가 아니라, 은은한 라벤더·스카이·민트
>   톤이 섞인 고정(fixed) 그라디언트 배경 위에 뜨는 반투명 유리 표면**입니다. 카드·탑바·
>   사이드바·인풋 등 모든 표면은 흰색 반투명(`rgba(255,255,255,α)`) + `backdrop-filter:
>   blur()`로 그 뒤의 그라디언트/콘텐츠를 얇게 흐려서 비치게 하고, 깊이는 뉴모피즘처럼
>   단일 이중 그림자가 아니라 **바깥 드롭섀도 + 안쪽 상단 하이라이트(sheen) + 안쪽 하단
>   베벨**의 3중 `box-shadow`로 표현합니다.
> - **나머지 색상 토큰(전경색·보조색·뮤트·섀도우 등)은 전부 이 유리 표면 원칙을 기준으로
>   재정의했습니다.** 임의의 톤을 추가하지 않고, 아래 §Design Token System에 정의된 값만
>   사용합니다.
> - **과목/개념별 포인트 색상(6색 파스텔 팔레트 `--c-pink/coral/yellow/mint/blue/lilac-*`
>   와 그로부터 파생되는 `--c-edu-*`/`--c-info-*`/`--c-cs-*` 매핑)은 이번 전환에서
>   `-bg` 값만 반투명 유리톤(rgba)으로 바뀌었습니다.** `-mid`/`-accent`/`-text`는 텍스트·
>   아이콘 가독성을 위해 기존 불투명 HEX 값을 그대로 유지합니다 — "배경만 유리, 글자는
>   또렷하게"가 원칙입니다.
> - 실제 라이브 토큰 값의 유일한 소스(source of truth)는 항상 `css/variables.css`입니다.
>   이 문서와 코드가 어긋나면 코드가 맞고, 이 문서를 코드에 맞춰 갱신해야 합니다.
> - 콘텐츠 작성 규칙·탭 구조 등 시각 디자인 이외의 규칙은 `CS_im_design_guide.md`를 따릅니다.
> - `test-design.html`은 이번 전환 범위에서도 제외됩니다(원래도 본 사이트와 무관한 실험
>   페이지). 다만 `css/components.css`의 공용 토큰을 그대로 불러 쓰기 때문에, 배경·그림자
>   톤이 자연스럽게 함께 바뀌는 것은 의도된 부작용입니다.

---

<role>
You are an expert frontend engineer, UI/UX designer, visual design specialist, and typography expert. Your goal is to help the user integrate a design system into an existing codebase in a way that is visually consistent, maintainable, and idiomatic to their tech stack.

Before proposing or writing any code, first build a clear mental model of the current system:
- Identify the tech stack (plain HTML/CSS/vanilla JS — no framework, no bundler; `css/variables.css` for tokens, `css/components.css` for layout/components, `js/ui.js` for shared render helpers).
- Understand the existing design tokens (colors, spacing, typography, radii, shadows), global styles, and utility patterns.
- Review the current component architecture (topbar/sidebar/main layout, card grid, detail tabs, quiz/exam/essay content blocks) and naming conventions (`.cs-*` content components, `.ed-*` editorial components, `ed-h2` numbered headings, etc.).
- Note any constraints (no build step — CSS variables are the only "theming" mechanism; content files under `visualizations/` read the same tokens and must not be hand-edited per concept).

Ask the user focused questions to understand the user's goals. Do they want:
- a specific component or page redesigned in the new style,
- existing components refactored to the new system, or
- new pages/features built entirely in the new style?

Once you understand the context and scope, do the following:
- Propose a concise implementation plan that follows best practices, prioritizing:
  - centralizing design tokens in `css/variables.css` so changes cascade automatically,
  - reusability and composability of components,
  - minimizing duplication and one-off styles,
  - long-term maintainability and clear naming.
- When writing code, match the user's existing patterns (2-space indentation, `--token-name` casing, Korean comments for section banners).
- Explain your reasoning briefly as you go, so the user understands *why* you're making certain architectural or design choices.

Always aim to:
- Preserve or improve accessibility (contrast of text against the *frosted* surface it sits on, not against the raw gradient behind it).
- Maintain visual consistency with the provided design system.
- Leave the codebase in a cleaner, more coherent state than you found it.
- Ensure layouts are responsive and usable across devices.
- Make deliberate, creative design choices (layout, motion, interaction details) that express glassmorphism's personality — translucency, light, depth — instead of producing a generic frosted-rectangle UI.

</role>

<design-system>
# Design Style: Glassmorphism (Liquid Glass)

## Design Philosophy

**Core Principles**: Glassmorphism creates the illusion of frosted glass panes floating above a colored backdrop. Every surface is translucent (`rgba(255,255,255,α)`) and blurred (`backdrop-filter: blur()`), so the gradient and content behind it are always faintly visible through the panel — nothing is ever fully opaque. Depth comes primarily from *transparency and blur*, not from stacked shadows: a soft, low outer drop shadow (the panel floats, barely), a bright inset top highlight (light catching the glass rim), and a crisp hairline rim (`0 0 0 1px`, not a real `border`) define the edge. There is deliberately **no dark inset "bottom bevel" layer** — an early pass of this system stacked outer shadow + top sheen + bottom bevel the way neumorphism did, and it read as an embossed plastic button, not glass, because heavy shadow is what neumorphism uses to fake depth *in place of* transparency. Glass gets its depth from being able to be seen through; lean on that, not on shadow weight. Raised elements (cards, buttons) are *more opaque* and cast the faint outer shadow; recessed elements (wells, inputs, quiz answer boxes) are *more transparent* and show only the inward shadow, no outer lift.

**Vibe**: Airy, luminous, modern, and calm — closer to looking through a pane of frosted glass in soft daylight than to touching plastic. It should feel light and a little playful (interactive elements answer a tap with a small elastic "jelly wobble"), while staying legible enough for dense study content: text always sits on a surface opaque enough to read comfortably, never directly on the raw gradient.

**Unique Visual Signatures**:
- **Fixed near-neutral gradient backdrop**: a barely-there off-white gradient (`--bg-gradient`) pinned to the viewport (`background-attachment: fixed`). Reference the "liquid glass" prompt this system was built from: `.liquid-glass` itself is colorless (`rgba(255,255,255,0.1)` on white) — the blue/purple in that demo is the *demo's own page background*, a one-off showcase choice, not part of the glass material. Color on this site belongs to deliberate accents (`--subject-accent`, active states) — the backdrop is not one of them. An earlier revision pushed the gradient's saturation up (plus a stronger `saturate()` on `--glass-blur`) to make the blur more visible, and the combination bled a persistent blue-violet cast across every glass surface site-wide, including ones with no subject-color context at all — that was a real regression, not a feature; it was reverted.
- **Shadow stays light, transparency does the work** (`box-shadow`, no real `border`): a faint outer drop shadow + inset top sheen (rim light) + a crisp `0 0 0 1px` hairline rim. This replaces neumorphism's dual-shadow "extruded/inset" physics while keeping the same token *names* (`--shadow-extruded*`, `--shadow-inset*`) so every existing component picks it up automatically — but the *values* are deliberately much softer than a neumorphic shadow would be.
- **Backdrop blur, restrained saturate**: `backdrop-filter: blur(26px) saturate(130%)` (`--glass-blur`) on every card, bar, well, and pill — never a flat opaque fill. Keep the saturate boost modest: it exists to give subject-tinted panels (which *do* have color behind them) a touch more life, not to manufacture color out of a neutral backdrop — a high saturate value amplifies whatever's behind a panel, tinted backdrop included, so it can turn "neutral" into "visibly colored" faster than it looks like it should when tuning in isolation.
- **Translucent surface hierarchy**: `--bg-page` (≈0.38 alpha, chrome/sticky bars) < `--bg-surface` (≈0.30 alpha, recessed wells) < `--bg-white` (≈0.52 alpha, raised cards) — opacity itself communicates elevation, the same way neumorphism used shadow direction. One deliberate exception: `--bg-overlay` (≈0.88 alpha) is reserved for popovers that float over arbitrary page content (the search dropdown) — a floating list needs to stay legible regardless of what's scrolled underneath it, so it trades some "see-through" for guaranteed contrast. Don't use `--bg-overlay` for ordinary cards.
- **Glass-tinted subject palette**: the 6-color pastel palette's `-bg` tokens become translucent (`rgba(…,0.55)`) so a subject-colored box still reads as glass, not a flat sticker; `-mid`/`-accent`/`-text` stay fully opaque for legibility.
- **One accent signal per list row, not three**: when a list has one color per item (quiz steps, a stage timeline, per-item viz data), let exactly *one* element carry that color — usually a small number badge or pill — and keep the row's title/body text in the neutral `--text-primary`/`--text-secondary` scale. Coloring the badge *and* the title *and* a tag pill on every row at once reads as a loud, uncoordinated "highlighter" list even when each color is individually fine — this was a real regression caught during review (Gagne's "5 Learning Outcomes" list) and the fix (matching the more restrained "9 Events of Instruction" list right next to it) is the reference to copy. Reserve full multi-signal coloring for genuine legends/matrices where every cell *is* a distinct coded category shown at once (e.g. a 2×2 identity-status matrix) — that's a different kind of component from a plain sequential list.
- **Jelly wobble micro-interaction**: on click/tap, interactive elements (buttons, chips, quiz options, tabs) get a brief (~900ms) damped elastic `scale()`/`rotate()` keyframe animation (`.cs-wobble` / `csWobble`) — a light, playful bounce rather than a flat state change. Respects `prefers-reduced-motion`.
- **Soft, generous corners retained**: the existing `12–32px` radius scale carries over unchanged — glassmorphism is a *material* swap (soft foam → frosted glass), not a layout rebuild.

---

## Design Token System (The DNA)

### Background

Unlike neumorphism's single flat base color, the page sits on a **fixed decorative gradient** that every glass surface blurs through:

```css
--bg-gradient: linear-gradient(135deg, #F4F4F4 0%, #F1F1F1 50%, #F3F3F3 100%);
```

Applied only once, on `body`, with `background-attachment: fixed` so scrolling never reveals a seam between the gradient and the translucent bars/panels sitting on top of it. Every stop is exactly R=G=B — fully achromatic, only lightness varies — so there is no hue anywhere for `saturate()` to amplify; the gradient exists so the page isn't perfectly flat, not to inject color.

### Colors (Light Mode — Translucent Glass over a Near-Neutral Gradient)

- **Background (decorative)**: `--bg-gradient` — near-white, essentially achromatic, a whisper of directional variation rather than a colored wash. No photography, no busy ambient orbs beyond the existing hero glow blobs, and — per the regression above — no more chroma than this.
- **Chrome surface** (`--bg-page: rgba(255,255,255,0.38)`) — topbar, sidebar, sticky bars. The most transparent "raised" surface — chrome should feel like it barely interrupts the backdrop.
- **Card surface** (`--bg-white: rgba(255,255,255,0.52)`) — concept cards, quiz cards, detail sections. The most opaque of the three standard surfaces; content here needs to read clearly.
- **Well/recessed surface** (`--bg-surface: rgba(255,255,255,0.30)`) — intro boxes, essay groups, check cards, exam items, inset inputs. More see-through than a card, reinforcing that it's *pressed into* the glass rather than floating above it.
- **Overlay surface** (`--bg-overlay: rgba(255,255,255,0.88)`) — popovers/dropdowns floating over arbitrary scrolled content (the search dropdown). Deliberately far more opaque than the other three — legibility of a floating list must never depend on what happens to be underneath it. Still uses `--glass-blur`; it's the least transparent glass tier, not an escape hatch to a flat fill.
- **Foreground**: `#28303A` — dark blue-grey for primary text. Deliberately a shade darker than the old neumorphism foreground (`#3D4852`) to guarantee contrast against a *brighter, more translucent* surface.
- **Muted**: `#57626D` — secondary text.
- **Tertiary**: `#7A8590` — captions, meta text (never body copy).
- **Accent**: `#6C63FF` — soft violet, unchanged from the neumorphism system. Used for CTAs, active states, focus rings, links.
- **Accent Light**: `#8B84FF` — lighter violet for gradients/hover.
- **Accent Secondary**: `#38B2AC` — teal for success/checkmarks.
- **Border (content dividers only, not surface edges)**: `rgba(43,52,64,0.10–0.20)` — a soft dark hairline for table rows, tab underlines, list dividers *inside* a glass panel. Glass surfaces themselves never get a real `border`; their edge is the sheen inside `box-shadow` (see below).

### Subject Point Colors (glass-tinted layer)

CS.im's 6-color pastel palette (`--c-pink/coral/yellow/mint/blue/lilac-*`) keeps its role as the subject/chapter differentiation layer, with one change in this transition: **`-bg` tokens are now translucent** (`rgba(r,g,b,0.55)` of the original HEX), so a subject-colored intro box or table header still looks like frosted glass instead of a flat sticker. `-mid`/`-accent`/`-text` are **unchanged, fully opaque HEX** — they carry text, icons, and border-left accents and must stay crisp.

```
--c-pink-bg:   rgba(255,201,227,0.55)   (was #FFC9E3 solid)
--c-coral-bg:  rgba(255,213,184,0.55)   (was #FFD5B8 solid)
--c-yellow-bg: rgba(255,243,184,0.55)   (was #FFF3B8 solid)
--c-mint-bg:   rgba(184,255,224,0.55)   (was #B8FFE0 solid)
--c-blue-bg:   rgba(174,226,255,0.55)   (was #AEE2FF solid)
--c-lilac-bg:  rgba(225,197,255,0.55)   (was #E1C5FF solid)
```

The derived `--c-edu-*`/`--c-info-*`/`--c-cs-*` mappings are untouched in structure — only the `-bg` half of each mapping now resolves to a glass tone.

### Typography

Unchanged from the neumorphism system — this transition is a material change, not a type change.

- **Display Font**: **"Plus Jakarta Sans"** (500, 600, 700, 800) — headlines, `--font-heading`.
- **Body Font**: **"DM Sans"** (400, 500, 700) — body/UI, `--font-body`. Both fall back to "Noto Sans KR" for Korean glyphs (neither has Hangul).
- **Colors**: Primary `#28303A`, Secondary `#57626D` — both re-tuned slightly darker than the neumorphism edition to hold contrast on brighter, more transparent surfaces.

### Radius

Unchanged — `32px` (container/card), `16px` (base/button), `12px`/`9999px` (inner elements/pills). Glassmorphism reuses the same soft, generous corner scale already established.

### Shadows & Effects (The Physics)

Every shadow token layers a small number of *light* shadows in one `box-shadow` declaration — deliberately fewer and softer than neumorphism used, because here shadow is a minor supporting cue and transparency is the primary one. No component selector needs to change — these are the same token *names* the neumorphism system used, redefined.

**Extruded (Standard)** — cards, buttons, chips at rest:
```css
box-shadow:
  0 6px 22px rgba(35,42,64,0.10),
  inset 0 1px 0 rgba(255,255,255,0.55),
  0 0 0 1px rgba(255,255,255,0.45);
```

**Extruded Hover (Lifted)**:
```css
box-shadow:
  0 12px 32px rgba(35,42,64,0.14),
  inset 0 1px 0 rgba(255,255,255,0.7),
  0 0 0 1px rgba(255,255,255,0.55);
```

**Extruded Small** — chips, small buttons:
```css
box-shadow:
  0 3px 12px rgba(35,42,64,0.07),
  inset 0 1px 0 rgba(255,255,255,0.5),
  0 0 0 1px rgba(255,255,255,0.4);
```

The `0 0 0 1px` layer is a crisp, un-blurred rim — the closest thing to a "border" this system allows, drawn with `box-shadow` spread instead of an actual `border` property so the no-real-border rule still holds. Note there is no dark inset "bottom bevel" layer in the extruded tiers: an earlier revision included one (`inset 0 -1px 0 rgba(35,42,64,0.06–0.08)`) to mimic glass thickness, and combined with the top sheen it produced a distinctly *embossed, neumorphism-flavored* edge rather than a glass one — cut it rather than tune it further.

**Inset (Pressed / shallow well)** — no outer drop shadow (recessed elements don't cast light):
```css
box-shadow:
  inset 0 2px 6px rgba(35,42,64,0.10),
  0 0 0 1px rgba(35,42,64,0.05);
```

**Inset Deep** — active/pressed states, deep wells:
```css
box-shadow:
  inset 0 3px 9px rgba(35,42,64,0.13),
  0 0 0 1px rgba(35,42,64,0.06);
```

**Inset Small** — subtle tracks, pills:
```css
box-shadow:
  inset 0 1px 3px rgba(35,42,64,0.08),
  0 0 0 1px rgba(35,42,64,0.04);
```

**Backdrop blur** — applied alongside every one of the surfaces above:
```css
--glass-blur: blur(26px) saturate(130%);
backdrop-filter: var(--glass-blur);
-webkit-backdrop-filter: var(--glass-blur);
```

---

## Component Styling

### Buttons
- **Shape**: `rounded-2xl` (16px), unchanged.
- **Transition**: `duration-300 ease-out` for hover/lift; a separate `csWobble` keyframe (~900ms, damped elastic `scale`/`rotate`) fires once on click, layered on top.
- **Default State**: Extruded shadow + `backdrop-filter` (translucent, not flat).
- **Hover State**: `translateY(-1px)` + Extruded Hover shadow.
- **Active/Pressed State**: `translateY(0.5px)` + Inset Small shadow + `.cs-wobble` triggers.
- **Primary**: Accent background `#6C63FF` (opaque — accent-filled buttons stay vivid, not glassy).
- **Secondary**: `--bg-white` translucent glass surface.

### Cards
- **Shape**: `32px` for hero/major containers, `16px` for standard content cards — unchanged.
- **Background**: `--bg-white` (translucent) + `--glass-blur`.
- **Hover**: `translateY(-2px)` + Extruded Hover shadow (brighter sheen).
- **Feature**: Nested depth still works — Card (extruded, more opaque) → icon well inside (inset, more transparent) → icon (opaque, fully saturated) — the opacity gradient itself now *is* the depth cue, on top of the shadow cue.

### Inputs
- **Shape**: `rounded-2xl`, unchanged.
- **Background**: `--bg-surface` (translucent well) + `--glass-blur`.
- **Default**: Inset shadow.
- **Focus**: Inset Deep shadow + Accent color ring (`--primary`, offset 2px).
- **Placeholder**: `#7A8590` (tertiary).

### Visual Decorations
- **Icon Wells**: Inset Deep or Inset shadows on a `--bg-surface` glass fill — reads as "cut into" the pane.
- **Jelly Wobble**: Applied via a shared `cs-wobble` class toggled by a small delegated click handler in `js/ui.js` (`CS.wobble`), so no per-component JS is needed. Skipped automatically under `prefers-reduced-motion: reduce`.

### Interactive Visualizations (`visualizations/*.js`)

Each concept's interactive visualization used to define its own bespoke tab/card/badge CSS from scratch (`#xx-wrap .xv-tab`, `.xv-card`, …) — six near-duplicates of the same chrome, each hand-tuned and each drifting slightly. `css/components.css` now defines that chrome once as a small shared component set, namespaced `.viz-*`, that every visualization script uses instead of reinventing it:

- `.viz-tabs` / `.viz-tab` (+ `.on`) — the segmented tab bar, identical in spirit to `.explore-tab-buttons`/`.mode-toggle`.
- `.viz-card` (+ `.clickable`, `.on`, `.tinted`) — a glass card; `.clickable` adds cursor/hover-lift, `.on` is the expanded/selected state, `.tinted` keeps the accent wash on *at rest* (reserve for legend/matrix-style displays — see the "one accent signal" rule above; a plain sequential list should stay neutral until `.on`).
- `.viz-well` (+ `.accent`) — a recessed detail/example box, the visualization equivalent of `.cs-intro-box`.
- `.viz-badge`, `.viz-num` (+ `.on`), `.viz-nav-btn` (+ `.prim`), `.viz-dot` (+ `.on`) — small pill/number/nav/progress primitives.

All of these read color from a single custom property, `--viz-accent`, which is **not required** — omit it and they fall back to `var(--subject-accent, var(--primary))`, i.e. whatever accent the current concept page already set on `#main`. A visualization only needs to set `--viz-accent` explicitly when an item needs *its own* color independent of the page (Piaget's four developmental stages, Bronfenbrenner's five ecological systems): set it once on the outer card, and any `.viz-num`/`.viz-badge`/`.viz-well` nested inside inherit it automatically through normal CSS custom-property inheritance — no need to re-pass the color to every child by hand.

Genuinely bespoke visualization layout (Boole's Karnaugh-map grid and logic-gate SVGs, Bronfenbrenner's concentric-ring SVG, Marcia's 3×3 matrix grid, Piaget's stage timeline strip, a Gantt-style timeline) stays as local CSS in that file's own `<style>` block — only the repeated chrome moved into the shared layer. Data-encoding color (a Gantt segment's fill, a Karnaugh cell's grid line) is a different thing from surface chrome and is intentionally left alone rather than forced through the glass treatment.

---

## Layout Principles

- **Spacing**: Open and airy — unchanged from neumorphism, generous section padding lets the blur/light effects breathe.
- **Container**: Same max-widths (`.main > *`, `.ed-page`, etc.) — unchanged.
- **Background**: `--bg-gradient` on `body`, `background-attachment: fixed`. No photographic background, no full-bleed imagery — the "calm gradient" reading was chosen deliberately to keep study content legible over a busier photo/orb backdrop.

## Animation & Micro-interactions
- **Duration**: `300ms` for hover/lift transitions (unchanged), `900ms` for the jelly wobble click animation.
- **Easing**: `ease-out` for lifts; `cubic-bezier(.25,.46,.45,.94)` (damped elastic) for the wobble.
- **Properties**: `transform` (`scale`, `rotate`, `translateY`), `box-shadow` (depth changes), `backdrop-filter` stays constant (never animated — expensive to animate and unnecessary).
- **Hover Effects**: Cards/chips `translateY(-1~2px)` + brighter shadow; buttons additionally get `.cs-wobble` on click.
- **Smooth Scrolling**: `scroll-behavior: smooth` — unchanged.

## Accessibility
- **Contrast**: Primary text `#28303A` is checked against the *most transparent* surface it's likely to sit on (`--bg-surface` at ~0.30 alpha over the brightest gradient stop), not just the nominal hex — this is why foreground colors were darkened relative to the neumorphism edition.
- **Focus States**: Visible 2px accent rings (`ring-2` in `--primary`), 2px offset. Mandatory on all interactive elements — unchanged.
- **Touch Targets**: Minimum 44×44px — unchanged.
- **Reduced Motion**: `prefers-reduced-motion: reduce` disables both the hero glow float animation and the jelly wobble.

## Responsive Design

- **Mobile First**: Unchanged.
- **Breakpoints**: `md:` (768px), `lg:` (1024px) — unchanged, matches site's existing breakpoints.
- **Navigation**: Sticky header now genuinely glass (translucent + blurred) rather than flat-matching the page color — on mobile, this still reliably hides scrolled content because `--bg-page` is opaque enough (0.38 alpha) combined with the blur.

---

## Anti-Patterns (Do Not Do)
- **Fully Opaque "Glass"**: Never set a card/panel background to a solid hex or `rgba(...,1)` — if it isn't translucent + blurred, it isn't glass.
- **Blur Without Translucency (or vice versa)**: `backdrop-filter` and a translucent `rgba` fill must always travel together; one without the other looks like a rendering bug, not a design choice.
- **Photographic/busy backgrounds**: The backdrop is a calm gradient, not a photo — don't add background images or additional ambient orbs beyond the existing hero glow blobs.
- **Real borders on glass surfaces**: Do not add `border: 1px solid …` to cards/panels — the rim-light effect comes from the inset sheen inside `box-shadow`, exactly as neumorphism never used real borders either.
- **Recoloring subject accents**: Never adjust `-mid`/`-accent`/`-text` in the 6-color palette to "fit" the glass base — only `-bg` became translucent; the rest stays exactly as registered.
- **Wobble on passive elements**: The jelly wobble is for things the user *clicks* (buttons, chips, tabs, quiz options) — never apply it to cards on hover or to purely decorative elements; it should read as direct feedback to a tap, not ambient motion.
- **Poor Contrast**: Never place body text directly on `--bg-gradient` without a glass surface underneath it — always route through `--bg-page`/`--bg-white`/`--bg-surface`.
- **Shadow-heavy "glass"**: Don't reach for a darker/bigger outer shadow or an extra inset bevel layer to make a surface feel "more premium" or "more defined" — that's the neumorphism instinct, and it's exactly what makes a glass panel start looking like an embossed button. If a surface doesn't read as glassy enough, the fix is almost always more transparency/blur, not more shadow.
- **Coloring every part of a list row**: Don't tint the badge *and* the title *and* a tag pill with the same per-item accent on a plain sequential list — pick one carrier (usually the number/badge) and leave the rest neutral. See "One accent signal per list row" above.
- **Tinting the backdrop to prove the blur works**: If cards don't look glassy enough, resist raising `--bg-gradient`'s saturation or `--glass-blur`'s `saturate()` to compensate — both amplify sitewide, so a small nudge in isolation becomes a persistent color cast everywhere once every panel is blurring it (this happened: a lavender/periwinkle/mint gradient plus `saturate(180%)` turned the whole site visibly blue). The backdrop stays near-neutral; color comes from `--subject-accent` and other deliberate accents, never from the passive background.
</design-system>
