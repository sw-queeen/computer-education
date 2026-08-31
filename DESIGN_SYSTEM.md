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

**Core Principles**: Glassmorphism creates the illusion of frosted glass panes floating above a colored backdrop. Every surface is translucent (`rgba(255,255,255,α)`) and blurred (`backdrop-filter: blur()`), so the gradient and content behind it are always faintly visible through the panel — nothing is ever fully opaque. Depth comes from three simultaneous cues, not one: a soft outer drop shadow (the panel floats above the page), a bright inset top highlight (light catching the glass rim), and a subtle inset bottom bevel (the glass's own thickness). Raised elements (cards, buttons) are *more opaque* and cast a visible drop shadow; recessed elements (wells, inputs, quiz answer boxes) are *more transparent* and show only inward shadow, no outer lift.

**Vibe**: Airy, luminous, modern, and calm — closer to looking through a pane of frosted glass in soft daylight than to touching plastic. It should feel light and a little playful (interactive elements answer a tap with a small elastic "jelly wobble"), while staying legible enough for dense study content: text always sits on a surface opaque enough to read comfortably, never directly on the raw gradient.

**Unique Visual Signatures**:
- **Fixed calm gradient backdrop**: a soft, low-saturation lavender → periwinkle → mint gradient (`--bg-gradient`) pinned to the viewport (`background-attachment: fixed`) so every glass panel blurs a *consistent* backdrop regardless of scroll position.
- **Three-layer glass shadow** (`box-shadow`, no real `border`): outer drop shadow (depth) + inset top sheen (rim light) + inset bottom bevel (glass thickness). This fully replaces the neumorphism dual-shadow "extruded/inset" physics with a translucent equivalent that keeps the same token *names* (`--shadow-extruded*`, `--shadow-inset*`) so every existing component picks it up automatically.
- **Backdrop blur on every surface**: `backdrop-filter: blur(20px) saturate(160%)` (`--glass-blur`) on every card, bar, well, and pill — never a flat opaque fill.
- **Translucent surface hierarchy**: `--bg-page` (≈0.42 alpha, chrome/sticky bars) < `--bg-surface` (≈0.34 alpha, recessed wells) < `--bg-white` (≈0.60 alpha, raised cards) — opacity itself communicates elevation, the same way neumorphism used shadow direction.
- **Glass-tinted subject palette**: the 6-color pastel palette's `-bg` tokens become translucent (`rgba(…,0.55)`) so a subject-colored box still reads as glass, not a flat sticker; `-mid`/`-accent`/`-text` stay fully opaque for legibility.
- **Jelly wobble micro-interaction**: on click/tap, interactive elements (buttons, chips, quiz options, tabs) get a brief (~900ms) damped elastic `scale()`/`rotate()` keyframe animation (`.cs-wobble` / `csWobble`) — a light, playful bounce rather than a flat state change. Respects `prefers-reduced-motion`.
- **Soft, generous corners retained**: the existing `12–32px` radius scale carries over unchanged — glassmorphism is a *material* swap (soft foam → frosted glass), not a layout rebuild.

---

## Design Token System (The DNA)

### Background

Unlike neumorphism's single flat base color, the page sits on a **fixed decorative gradient** that every glass surface blurs through:

```css
--bg-gradient: linear-gradient(135deg, #EAF0FB 0%, #ECE9F7 45%, #EAF5F0 100%);
```

Applied only once, on `body`, with `background-attachment: fixed` so scrolling never reveals a seam between the gradient and the translucent bars/panels sitting on top of it.

### Colors (Light Mode — Translucent Glass over Cool Gradient)

- **Background (decorative)**: `--bg-gradient` — soft lavender → periwinkle → mint, very low saturation, calm rather than showy. No photography, no busy ambient orbs beyond the existing hero glow blobs.
- **Chrome surface** (`--bg-page: rgba(255,255,255,0.42)`) — topbar, sidebar, sticky bars. The most transparent "raised" surface — chrome should feel like it barely interrupts the backdrop.
- **Card surface** (`--bg-white: rgba(255,255,255,0.60)`) — concept cards, quiz cards, detail sections, dropdowns. The most opaque surface; content here needs to read clearly.
- **Well/recessed surface** (`--bg-surface: rgba(255,255,255,0.34)`) — intro boxes, essay groups, check cards, exam items, inset inputs. More see-through than a card, reinforcing that it's *pressed into* the glass rather than floating above it.
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

This is where glassmorphism most visibly diverges from neumorphism's dual-shadow bevel. Every shadow token now layers **three shadows in one `box-shadow` declaration**: an outer drop shadow (or none, for recessed wells), an inset top sheen, and an inset bottom bevel. No component selector needs to change — these are the same token *names* the neumorphism system used, redefined.

**Extruded (Standard)** — cards, buttons, chips at rest:
```css
box-shadow:
  0 10px 34px rgba(35,42,64,0.14),
  inset 0 1.5px 0 rgba(255,255,255,0.6),
  inset 0 -1px 0 rgba(35,42,64,0.06);
```

**Extruded Hover (Lifted)**:
```css
box-shadow:
  0 16px 46px rgba(35,42,64,0.18),
  inset 0 1.5px 0 rgba(255,255,255,0.7),
  inset 0 -1px 0 rgba(35,42,64,0.07);
```

**Extruded Small** — chips, small buttons:
```css
box-shadow:
  0 4px 18px rgba(35,42,64,0.10),
  inset 0 1px 0 rgba(255,255,255,0.55),
  inset 0 -1px 0 rgba(35,42,64,0.05);
```

**Inset (Pressed / shallow well)** — no outer drop shadow (recessed elements don't cast light):
```css
box-shadow:
  inset 0 3px 8px rgba(35,42,64,0.13),
  inset 0 -1px 0 rgba(255,255,255,0.4);
```

**Inset Deep** — active/pressed states, deep wells:
```css
box-shadow:
  inset 0 5px 14px rgba(35,42,64,0.17),
  inset 0 -1px 0 rgba(255,255,255,0.35);
```

**Inset Small** — subtle tracks, pills:
```css
box-shadow:
  inset 0 1px 4px rgba(35,42,64,0.10),
  inset 0 -1px 0 rgba(255,255,255,0.4);
```

**Backdrop blur** — applied alongside every one of the surfaces above:
```css
--glass-blur: blur(20px) saturate(160%);
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
- **Contrast**: Primary text `#28303A` is checked against the *most transparent* surface it's likely to sit on (`--bg-surface` at ~0.34 alpha over the brightest gradient stop), not just the nominal hex — this is why foreground colors were darkened relative to the neumorphism edition.
- **Focus States**: Visible 2px accent rings (`ring-2` in `--primary`), 2px offset. Mandatory on all interactive elements — unchanged.
- **Touch Targets**: Minimum 44×44px — unchanged.
- **Reduced Motion**: `prefers-reduced-motion: reduce` disables both the hero glow float animation and the jelly wobble.

## Responsive Design

- **Mobile First**: Unchanged.
- **Breakpoints**: `md:` (768px), `lg:` (1024px) — unchanged, matches site's existing breakpoints.
- **Navigation**: Sticky header now genuinely glass (translucent + blurred) rather than flat-matching the page color — on mobile, this still reliably hides scrolled content because `--bg-page` is opaque enough (0.42 alpha) combined with the blur.

---

## Anti-Patterns (Do Not Do)
- **Fully Opaque "Glass"**: Never set a card/panel background to a solid hex or `rgba(...,1)` — if it isn't translucent + blurred, it isn't glass.
- **Blur Without Translucency (or vice versa)**: `backdrop-filter` and a translucent `rgba` fill must always travel together; one without the other looks like a rendering bug, not a design choice.
- **Photographic/busy backgrounds**: The backdrop is a calm gradient, not a photo — don't add background images or additional ambient orbs beyond the existing hero glow blobs.
- **Real borders on glass surfaces**: Do not add `border: 1px solid …` to cards/panels — the rim-light effect comes from the inset sheen inside `box-shadow`, exactly as neumorphism never used real borders either.
- **Recoloring subject accents**: Never adjust `-mid`/`-accent`/`-text` in the 6-color palette to "fit" the glass base — only `-bg` became translucent; the rest stays exactly as registered.
- **Wobble on passive elements**: The jelly wobble is for things the user *clicks* (buttons, chips, tabs, quiz options) — never apply it to cards on hover or to purely decorative elements; it should read as direct feedback to a tap, not ambient motion.
- **Poor Contrast**: Never place body text directly on `--bg-gradient` without a glass surface underneath it — always route through `--bg-page`/`--bg-white`/`--bg-surface`.
</design-system>
