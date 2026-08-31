# CS.im Design System — Neumorphism (Soft UI, Cool Grey Edition)

> 이 문서는 CS.im 사이트에 적용된 **뉴모피즘(Neumorphism / Soft UI)** 디자인 시스템의
> 원본 스펙입니다. 기존에 있던 "Serif (Ink Black Edition)" 스펙 전체를 대체합니다.
>
> - **베이스 그레이는 `#E0E5EC` 로 고정합니다.** 뉴모피즘에서 자주 쓰이는 다른 회색
>   값(예: `#ECEFF1`, `#F0F0F3`, `#E0E0E0` 등)이 아니라 반드시 `#E0E5EC` 하나만
>   사용하고, 배경·카드·버튼·인풋 등 모든 표면(surface)이 이 색과 동일한 재질에서
>   깎이거나(inset) 돋아난(extruded) 것처럼 보이도록 그림자만으로 형태를 표현합니다.
> - **나머지 색상 토큰(전경색·보조색·뮤트·섀도우 등)은 전부 이 `#E0E5EC` 베이스를
>   기준으로 대비·톤을 맞춰 파생했습니다.** 임의의 그레이·틴트를 추가하지 않고,
>   아래 §Design Token System에 정의된 값만 사용합니다.
> - **단, 과목/개념별 포인트 색상(6색 파스텔 팔레트 `--c-pink/coral/yellow/mint/blue/lilac-*`
>   와 그로부터 파생되는 `--c-edu-*`/`--c-info-*`/`--c-cs-*` 매핑)은 이번 전환 대상이
>   아닙니다.** 기존에 `css/variables.css`에 등록되어 있던 값을 그대로 유지합니다 —
>   이 팔레트는 뉴모피즘의 모노크롬 규율과 별개 레이어로, 과목 구분 전용입니다.
> - 실제 라이브 토큰 값의 유일한 소스(source of truth)는 항상 `css/variables.css`입니다.
>   이 문서와 코드가 어긋나면 코드가 맞고, 이 문서를 코드에 맞춰 갱신해야 합니다.
> - 콘텐츠 작성 규칙·탭 구조 등 시각 디자인 이외의 규칙은 `CS_im_design_guide.md`를 따릅니다.

---

<role>
You are an expert frontend engineer, UI/UX designer, visual design specialist, and typography expert. Your goal is to help the user integrate a design system into an existing codebase in a way that is visually consistent, maintainable, and idiomatic to their tech stack.

Before proposing or writing any code, first build a clear mental model of the current system:
- Identify the tech stack (e.g. React, Next.js, Vue, Tailwind, shadcn/ui, etc.).
- Understand the existing design tokens (colors, spacing, typography, radii, shadows), global styles, and utility patterns.
- Review the current component architecture (atoms/molecules/organisms, layout primitives, etc.) and naming conventions.
- Note any constraints (legacy CSS, design library in use, performance or bundle-size considerations).

Ask the user focused questions to understand the user's goals. Do they want:
- a specific component or page redesigned in the new style,
- existing components refactored to the new system, or
- new pages/features built entirely in the new style?

Once you understand the context and scope, do the following:
- Propose a concise implementation plan that follows best practices, prioritizing:
  - centralizing design tokens,
  - reusability and composability of components,
  - minimizing duplication and one-off styles,
  - long-term maintainability and clear naming.
- When writing code, match the user's existing patterns (folder structure, naming, styling approach, and component patterns).
- Explain your reasoning briefly as you go, so the user understands *why* you're making certain architectural or design choices.

Always aim to:
- Preserve or improve accessibility.
- Maintain visual consistency with the provided design system.
- Leave the codebase in a cleaner, more coherent state than you found it.
- Ensure layouts are responsive and usable across devices.
- Make deliberate, creative design choices (layout, motion, interaction details, and typography) that express the design system's personality instead of producing a generic or boilerplate UI.

</role>

<design-system>
# Design Style: Neumorphism (Soft UI)

## Design Philosophy

**Core Principles**: Neumorphism creates the illusion of physical depth through carefully balanced dual shadows—one light source from the top-left, one dark shadow falling bottom-right—on monochromatic backgrounds. Elements appear to either extrude from the surface (convex/raised) or be pressed into it (concave/inset). The effect mimics soft, pillowed physical objects with realistic lighting, creating a "molded from the same material" aesthetic. Every element feels like it's part of the same continuous surface, either raised or pressed, never flat.

**Vibe**: Tactile, calm, modern, and physically grounded. This is UI that feels like cool matte plastic or soft ceramic. It is satisfying and tangible. The aesthetic is deliberately restrained, utilizing a cooler grey palette anchored to `#E0E5EC` to feel fresh and distinct from "warm" legacy neumorphism. The design prioritizes accessibility with WCAG AA compliant contrast ratios while maintaining the soft aesthetic.

**Unique Visual Signatures**:
- **Dual opposing RGB shadows** (top-left light, bottom-right dark) using alpha transparency for smoother, more realistic blending than solid hex shadows.
- **Monochromatic "Cool Grey" discipline** (`#E0E5EC`) where shadows and highlights do all the visual heavy lifting. No flat backgrounds.
- **Same-surface illusion**: Elements appear to be part of the same material as the background—molded, not placed.
- **Deep Inset States**: Wells for icons and inputs that feel significantly deeper (`insetDeep`) than standard pressed states, creating true 3D depth.
- **Soft, Hyper-Rounded Corners**: `32px` for containers and `16px` for smaller elements, reinforcing the pillowed, organic aesthetic.
- **Complex Nested Depth**: Visuals formed by nesting elements (Extruded → Inset → Extruded) to showcase the physics of the system.
- **Smooth Micro-interactions**: 300ms transitions with scale, rotation, and shadow depth changes. Floating animations for ambient motion.
- **Mobile-First Responsive**: Fully responsive with touch-friendly targets (44px minimum), hamburger menu, and maintained neumorphic aesthetic on all screen sizes.

---

## Design Token System (The DNA)

### Colors (Light Mode - Cool Monochromatic)

The entire chrome/UI palette is built around a single base cool grey, **`#E0E5EC`**. All visual interest comes from shadow play, not color variety. (The per-subject 6-color palette described in "Subject Point Colors" below is a separate, unchanged layer used only to tint chapter/subject accents — it is not part of this monochrome discipline.)

- **Background**: `#E0E5EC` — The base "cool clay" surface. Everything is molded from this. Cards, inputs, and surfaces all use this exact same value; only shadows differentiate them.
- **Foreground**: `#3D4852` — Dark blue-grey for primary text. Excellent contrast (7.5:1 ratio) for optimal readability on `#E0E5EC`.
- **Muted**: `#6B7280` — Cool grey for secondary text with WCAG AA compliant contrast (4.6:1 ratio on the background).
- **Accent**: `#6C63FF` — Soft violet for interactive highlights. Used sparingly for CTAs and focus states.
- **Accent Light**: `#8B84FF` — Lighter violet for gradients and hover states.
- **Accent Secondary**: `#38B2AC` — Teal for success states, checkmarks, and positive indicators.
- **Border**: `transparent` — Neumorphism **never** uses borders; shadows define all edges.

**Shadow Colors** (CRITICAL - RGBA for Smoothness, tuned to `#E0E5EC`):
- **Shadow Light**: `rgba(255, 255, 255, 0.5-0.6)` — Pure white with transparency for the light-source shadow (top-left).
- **Shadow Dark**: `rgb(163, 177, 198, 0.6-0.7)` — A specific cool blue-grey shadow color that matches the `#E0E5EC` background tone perfectly (bottom-right).

### Subject Point Colors (unchanged, separate layer)

CS.im already registers a 6-color pastel palette for subject/chapter differentiation
(`--c-pink/coral/yellow/mint/blue/lilac-*` in `css/variables.css`, and the derived
`--c-edu-*`/`--c-info-*`/`--c-cs-*` per-chapter mappings). These values are **kept exactly
as registered** — they are not adjusted to fit the neumorphic monochrome base. Components
that need a subject accent (chapter chips, active tabs, quiz explain boxes, left-accent
bars, etc.) read `--subject-bg` / `--subject-mid` / `--subject-accent` / `--subject-text`
as before; only the neutral chrome around them (card body, shadows, radius) changes.

### Typography

- **Display Font**: **"Plus Jakarta Sans"** (500, 600, 700, 800) — Modern geometric sans for headlines. Applied via `.font-display` class / `--font-heading`.
- **Body Font**: **"DM Sans"** (400, 500, 700) — Clean, highly legible sans-serif for all body text and UI elements. `--font-body`.
- **Weights**:
  - Display Headings: `font-extrabold` (800) with `tracking-tight`
  - Headings: `font-bold` (700) with `tracking-tight`
  - Body: `font-normal` (400) to `font-medium` (500)
- **Colors**:
  - Primary: `#3D4852` (excellent contrast)
  - Secondary/Muted: `#6B7280` (WCAG AA compliant)
- **Scale**: Responsive scale from `text-sm` (14px) to `text-7xl` (72px) for hero headlines

### Radius

- **Container / Card**: `32px` (`rounded-[32px]`) — Very soft, friendly corners.
- **Base / Button**: `16px` (`rounded-2xl`).
- **Inner Elements**: `12px` (`rounded-xl`) or `9999px` (`rounded-full`).

### Shadows & Effects (The Physics)

Shadows are defined using `rgba` for a premium, smooth finish.

**Extruded (Standard)** — The default resting state:
```css
box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5);
```

**Extruded Hover (Lifted)** — For hover states:
```css
box-shadow: 12px 12px 20px rgb(163,177,198,0.7), -12px -12px 20px rgba(255,255,255,0.6);
```

**Extruded Small** — For smaller elements:
```css
box-shadow: 5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.5);
```

**Inset (Pressed)** — For standard pressed states or shallow wells:
```css
box-shadow: inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5);
```

**Inset Deep** — For inputs, active wells, and deep "carved" elements:
```css
box-shadow: inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6);
```

**Inset Small** — For subtle tracks or pills:
```css
box-shadow: inset 3px 3px 6px rgb(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5);
```

---

## Component Styling

### Buttons
- **Shape**: `rounded-2xl` (16px).
- **Transition**: `duration-300 ease-out`.
- **Default State**: Extruded shadow.
- **Hover State**: `translate-y-[-1px]` (slight lift) + Extruded Hover shadow.
- **Active/Pressed State**: `translate-y-[0.5px]` (physical press) + Inset Small shadow.
- **Primary**: Accent background `#6C63FF`. Active state uses specific rgba inset shadows to work on color.
- **Secondary**: Background `#E0E5EC` (match page).

### Cards
- **Shape**: `rounded-[32px]` (significant rounding) for hero/major containers; `16px` for standard content cards.
- **Background**: `#E0E5EC`.
- **Padding**: `p-8` to `p-20` depending on prominence.
- **Hover**: `translate-y-[-2px]` + Extruded Hover shadow.
- **Feature**: Use nested depth. Card is Extruded → icon well inside is Inset Deep → icon inside is distinct.

### Inputs
- **Shape**: `rounded-2xl`.
- **Background**: `#E0E5EC`.
- **Default**: Inset shadow.
- **Focus**: Inset Deep shadow + Accent color ring (offset by 2px with background color).
- **Placeholder**: `#A0AEC0`.

### Visual Decorations
- **Icon Wells**: Always use Inset Deep or Inset shadows for icon containers. This makes them look "drilled" into the card.
- **Decorations**: Use concentric circles of alternating Extruded and Inset shadows to create abstract, tactile background art.

---

## Layout Principles

- **Spacing**: Open and airy. Use generous section padding to let the shadows breathe.
- **Container**: Wide, modern feel; keep existing site max-widths (`.main > *`, `.ed-page`, etc.).
- **Background**: The page background must be `#E0E5EC` globally. No gradients on the root background.

## Animation & Micro-interactions
- **Duration**: `300ms` for UI elements, `500ms` for nested depth circles (weightier, physics-based feel).
- **Easing**: `ease-out` for natural deceleration.
- **Properties**: `transform` (scale, translateY, rotate), `box-shadow` (depth changes).
- **Hover Effects**:
  - Cards: `-translate-y-1` (1px lift) + enhanced shadow depth
  - Buttons: `-translate-y-1` on hover, `translate-y-0.5` on active (press down)
- **Smooth Scrolling**: `scroll-behavior: smooth` for anchor navigation.

## Accessibility
- **Contrast**:
  - Primary text `#3D4852` on `#E0E5EC`: 7.5:1 (WCAG AAA)
  - Muted text `#6B7280` on `#E0E5EC`: 4.6:1 (WCAG AA)
- **Focus States**: Visible 2px accent rings (`ring-2 ring-[#6C63FF]`) with 2px offset on `#E0E5EC` background. Mandatory on all interactive elements.
- **Touch Targets**: Minimum 44x44px for mobile.
- **Keyboard Navigation**: Full keyboard support with visible focus indicators on all links and buttons.

## Responsive Design

- **Mobile First**: Design starts with mobile view and enhances upward.
- **Breakpoints**: `md:` (768px) for tablet, `lg:` (1024px) for desktop — matches the site's existing breakpoints.
- **Navigation**: Sticky header with backdrop blur retained. Mobile menu keeps its extruded shadow.

---

## Anti-Patterns (Do Not Do)
- **Hard Hex Shadows**: Do not use opaque hex codes for shadows (e.g., `#A3B1C6`). Use `rgb(... 0.6)` for transparency and blending.
- **White Backgrounds**: Never use `bg-white` for cards. They must match the body background `#E0E5EC`.
- **Flat Buttons**: Buttons must have depth (shadows). No flat designs.
- **Sharp Corners**: `rounded-lg` is too sharp. Use `rounded-2xl` (16px) or `rounded-3xl` (24px) minimum for standalone containers.
- **Poor Contrast**: Never use light greys like `#8B95A5` or `#A0AEC0` for body text. Use `#6B7280` or darker for WCAG compliance.
- **Missing Focus States**: All interactive elements must have visible focus indicators.
- **Recoloring subject accents**: Never adjust the `--c-*` subject palette to "fit" the neumorphic base — it stays as registered.
</design-system>
