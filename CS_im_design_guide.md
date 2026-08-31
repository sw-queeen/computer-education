# CS.im 콘텐츠·디자인 가이드

컴퓨터·정보 교육 개념 학습 사이트 CS.im의  
새 개념 페이지를 만들 때 따르는 규칙 문서.

> **⚠ 2026 디자인 시스템 전환 — Neumorphism (Soft UI, Cool Grey)**
> 사이트 전체가 다크 전용 **Terminal CLI** 테마 → **Serif** 테마를 거쳐, 현재는 **Neumorphism** 테마로 전환됨(`css/variables.css` 전면 재작성). 아래 §11(디자인 토큰)·§15(6색 파스텔 팔레트)는 최초 라이트 테마 당시 기록이며 세부 수치는 다를 수 있으나, **"라이트 배경 + 6색 파스텔 과목 팔레트"라는 구조 자체는 Neumorphism에서도 그대로 유지**됩니다. 실제 라이브 토큰 값은 항상 `css/variables.css`가 유일한 소스입니다.
> **Neumorphism 디자인 시스템의 전체 원문 스펙(철학·토큰·컴포넌트 규칙)은 [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)에 별도로 정리되어 있으며, 시각 디자인을 다루는 모든 작업은 그 문서를 일관되게 따릅니다.** 핵심 사항:
> - 배경은 라이트 전용, 뉴모피즘 쿨그레이 단일 색 `#E0E5EC` (다크모드 없음) — 카드·버튼·인풋 모두 이 색과 동일한 배경이며, 그림자(양각/음각)만으로 형태를 구분
> - 폰트: 표제(`--font-heading`)는 `Plus Jakarta Sans`, 본문(`--font-body`)은 `DM Sans` — 둘 다 한글 글리프가 없어 한글 텍스트는 시스템 산세리프로 자동 폴백됨(의도된 동작)
> - **사이트 공통 액센트(버튼·링크·포커스링)는 소프트 바이올렛**(`--primary`/`--accent: #6C63FF`, 라이트 톤 `--secondary`/`--accent-secondary: #8B84FF`) — 모두 `#E0E5EC` 베이스에 맞춰 파생된 값
> - **보더는 사용하지 않음** — 기존 `--border-light`/`--border-mid` 자리는 `transparent`이며, 구획 구분은 전부 `--shadow-extruded*`/`--shadow-inset*` 뉴모픽 그림자 토큰으로 대체
> - `--radius-*`는 12~32px(버튼 16px·카드 32px)로 대폭 확대, `box-shadow`는 뉴모픽 이중 그림자(`--shadow-extruded/-hover/-sm`, `--shadow-inset/-deep/-sm`)로 전면 교체
> - 6색 파스텔 팔레트(`--c-pink/coral/yellow/mint/blue/lilac-*`)는 §15 스프레드시트 원본 HEX 값 그대로 사용 — **이번 뉴모피즘 전환 대상이 아님.** 과목 구분은 이 팔레트가 전담하고, 사이트 전역 바이올렛 액센트·그레이 베이스와는 별개 레이어로 그대로 유지됨. 추가로 `--c-chrome-silver-*`·`--c-ink-black-*` 2종 중립 토큰 존재(과거 액센트 원재료, 참고용)
> - 탭 구조·콘텐츠 작성 규칙(§2~§10, §17~§19)은 변경 없음. 새 개념을 추가할 때 색상 값을 하드코딩하지 말고 항상 `var(--...)` 토큰을 참조할 것 (§13 참고).
> - `test-design.html`은 이번 전환 범위에서 제외(원래도 본 사이트와 무관한 실험 페이지, §16 참고).
> - 카드·버튼 hover는 그림자가 한 단계 더 깊어지는 `-hover` 톤 + 미세한 리프트(-1~2px)를 함께 사용, active(press) 시에는 인셋 그림자로 눌리는 느낌을 표현 — Neumorphism 스펙의 "모든 상호작용은 촉각적 피드백" 원칙.

---

## 1. 파일 구조 & 역할

```
js/data.js           — 전체 개념 목록 (SUBJECTS + CONCEPTS 배열)
js/config.js         — 공통 용어 상수 (SITE_CONFIG)
js/ui.js             — 공통 UI 유틸 함수 (CS 객체) ← 리팩토링 후 추가
index.html           — 홈 + 과목 목록 SPA (아코디언 구조, §14 참고)
concept.html         — 개념 상세 페이지 (VIZ_MAP, CONTENT_MAP 관리)
css/variables.css    — 디자인 토큰 (폰트·색상·다크모드)
css/components.css   — 레이아웃·공통 컴포넌트 클래스 (리팩토링 후 확장)
visualizations/
  [개념명].js        — 둘러보기 인터랙티브 시각화
  [개념명]-content.js — 핵심정리·기출포인트·리마인드 탭 콘텐츠
test-design.html     — 디자인 실험 전용 독립 페이지 (§16 참고, 본 사이트와 무관)
```

### 스크립트 로드 순서 (concept.html, index.html 공통)

```html
<script src="js/data.js"></script>
<script src="js/config.js"></script>
<script src="js/ui.js"></script>   ← 반드시 세 번째
```

`ui.js`가 없으면 content 파일의 `CS.*` 함수 호출이 전부 실패해 탭 내용이 비어있게 된다.

---

## 2. 탭 구조 & 순서

개념 상세 페이지는 4개 탭으로 구성. **순서 고정.**

| 순서 | 탭 이름 | 내용 |
|---|---|---|
| 1 | 핵심 정리 | 개요 → 핵심 섹션들 → 다른 이론과 비교 → 논술 답안 구조 → 체크 포인트 |
| 2 | 둘러보기 | 인터랙티브 시각화 |
| 3 | 리마인드 | OX · 빈칸 채우기 · 객관식 퀴즈 |
| 4 | 기출 포인트 | 기출 연도 현황 → 자주 출제 → 간헐 출제 |

> **둘러보기·리마인드 없는 개념**은 해당 탭 자체를 숨김.  
> 탭 전환 및 이전/다음 단계 버튼 클릭 시 `scrollIntoView`로 해당 위치로 스크롤.

---

## 3. 핵심 정리 — 섹션 구성 패턴

섹션마다 **시각 언어를 다르게** 써서 리듬 만들기. 같은 박스를 반복하지 않는다.

### 섹션별 권장 형식

| 섹션 | 형식 | 예시 |
|---|---|---|
| 개요 | prim 배경색 박스 + 본문 텍스트 | 피아제·가네·마르시아·브론펜브레너 개요 |
| 학습자의 학습 과정 | 원형 번호 카드 (bg-surface) | 피아제 평형화 과정 |
| 교사의 역할 & 수업 방법 | 원형 번호 카드 (bg-surface) | 피아제 교사역할 |
| 단계별 특징 개요 | 테이블 (모바일: 카드 전환) | 피아제 4단계 |
| 4분할 지위·유형 분류 | 3×3 그리드 매트릭스 (항상 펼쳐진 상태) | 마르시아 정체감 지위 |
| A vs B 비교 | 공통점 카드 + 차이점 테이블 | 피아제 vs 비고츠키 |
| 목록형 내용 | 번호 리스트 (원형 번호 + 텍스트 한 줄) | 가네 수업사태 |
| 교육적 시사점 | bg-surface 카드 (회색 원형 번호 + 설명) | 브론펜브레너·마르시아 시사점 |
| 이론의 특징 | prim 원형 번호 카드 | 브론펜브레너 특징 |
| 체계·단계별 상세 설명 | prim bg 카드 (이름 + key pill + 정의 + 예시) | 브론펜브레너 5체계 |
| 다른 이론과 비교 | bg-surface 카드 (이론명 레이블 + 부제목 + 설명) | 마르시아·브론펜브레너 비교 섹션 |
| 논술 답안 구조 | 무채색 그룹 카드 (회색 label + 회색 원형 번호 세부항목) | 공통 — 피아제 패턴 |
| 체크 포인트 | 왼쪽 컬러 border 카드 + 레이블 pill | 공통 |

### 섹션 순서 규칙
- **논술 답안 구조** 바로 위에 **다른 이론과 비교** 섹션 배치
- 다른 이론·학자와 연결되는 내용은 체크 포인트가 아닌 이 섹션에 넣는다
- **논술 답안 구조**와 **체크 포인트**의 `detail-section-title` 색상은 `--subject-accent:#6B6560` 무채색으로 고정

### 강조 표현 규칙
- `★` 기호 사용 금지 → **색상** 또는 **볼드**로 대체
- 텍스트 내 중요 키워드: `<span style="color:ACCENT;font-weight:700;">`
- 테이블에서 중요 행: 텍스트 색상만으로 구분 (행 배경색 강조 금지)

### 원형 번호 색상 규칙
- **핵심 항목·단계**: `cs-num-prim` (ACCENT 색상)
- **교육적 시사점·일반 나열**: `cs-num-gray` (`#A09890`)
- **논술 답안 구조 세부항목**: 회색 원형 번호
- **논술 답안 구조 그룹 제목**: 원형 번호 없음, 회색 소형 레이블 텍스트만

### 카드 왼쪽 선(`border-left`) 사용 원칙
- **체크 포인트** 카드: `border-left:3px solid [labelColor]` 유지
- **체계별·단계별 상세 설명** 카드: 배경색이 이미 구분 역할 → `border-left` 제거
- **4분할 지위 카드**: 배경색으로 구분 → `border-left` 제거
- 같은 정보를 배경색과 선 두 가지로 동시에 강조하지 않는다

### 논술 답안 구조 — 표준 패턴
```javascript
CS.renderEssayGroups([
  { label: '그룹 제목 1', items: ['세부항목 A', '세부항목 B'] },
  { label: '그룹 제목 2', items: ['세부항목 C'] },
])
```
- 그룹 제목: 회색 소형 레이블 (`font-size:11px; color:text-tertiary`)
- 세부항목 번호: 회색 원형 (`#A09890`)
- 이전 방식(`1. **제목** — 설명` 형식)은 사용하지 않음

### 체크 포인트 레이블 & 규칙
```javascript
CS.renderCheckCards([
  { type: 'danger',  text: '혼동 주의 내용' },
  { type: 'success', text: '핵심 암기 내용' },
])
```
- `danger` → `#D05840` 빨강 (먼저 배치)
- `success` → `#2D8A6A` 초록 (마지막에 배치)
- 두 레이블만 사용. 타 이론 연결 내용은 **다른 이론과 비교** 섹션으로 이동
- **레이블과 본문은 고정폭 flex 컬럼으로 분리**한다 (`width:76px` 등). 본문이 길어져도 레이블이 줄바꿈되어 본문 위로 떨어지지 않도록 함 (§17 참고)

---

## 4. 공통 UI 유틸 — `js/ui.js` (CS 객체)

리팩토링 후 추가된 파일. 모든 content 파일에서 공유하는 함수 모음.  
**content 파일에서 직접 같은 로직을 구현하지 않는다.**

### 제공 함수 목록

```javascript
CS.parseExamItem(text)              // 기출 연도 태그 파싱 → HTML
CS.sortExamItems(items)             // 연도 태그 있는 항목 상단 정렬
CS.numBall(n, cls?)                 // 번호 원형 HTML ('prim'|'gray', default prim)
CS.renderEssayGroups(groups)        // 논술 답안 구조 섹션 HTML
CS.renderCheckCards(cards)          // 체크 포인트 카드 HTML
CS.renderExamSection(el, opts)      // 기출 포인트 탭 전체 렌더
CS.renderQuizSection(el, data, pfx) // 리마인드 탭 전체 렌더
```

### 기출 포인트 탭 렌더

```javascript
CS.renderExamSection($('tab-exam'), {
  historyHTML: `연도 나열<span class="cs-history-note">한 줄 요약</span>`,
  freqItems:   ['내용 [2013중]', '내용2'],
  normalItems: ['내용3'],
});
```

### 리마인드 탭 렌더

```javascript
CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'prefix');
// prefix: 전역 핸들러 이름 충돌 방지용 (piaget, gagne, marcia, bronf, boole, ctx …)
```

---

## 5. 공통 CSS 클래스 — `css/components.css`

리팩토링 후 추가된 콘텐츠용 공통 클래스. **인라인 스타일 대신 이 클래스를 사용한다.**

### 주요 클래스

| 클래스 | 용도 |
|---|---|
| `.cs-intro-box` | 개요 박스 (과목 bg 배경) |
| `.cs-num` + `.cs-num-sm/.cs-num-md` + `.cs-num-prim/.cs-num-gray` | 번호 원형 |
| `.cs-num-row` | 번호 원형 + 텍스트 한 줄 행 |
| `.cs-essay-group` / `.cs-essay-label` / `.cs-essay-items` / `.cs-essay-item` | 논술 답안 구조 |
| `.cs-check-card` + `.cs-check-danger` / `.cs-check-success` | 체크 포인트 카드 |
| `.cs-check-label` | 체크 포인트 레이블 pill |
| `.cs-exam-item` + `.cs-exam-item-freq` / `.cs-exam-item-normal` | 기출 포인트 아이템 |
| `.cs-exam-tag` | 기출 연도 태그 pill |
| `.cs-history-box` / `.cs-history-note` | 기출 연도 현황 박스 |
| `.cs-compare-card` / `.cs-compare-label` / `.cs-compare-title` / `.cs-compare-desc` | 비교 섹션 카드 |
| `.cs-table-wrap` / `.cs-table` / `.cs-td-key` / `.cs-td-accent` | 공통 테이블 |
| `.cs-quiz-card` / `.cs-quiz-type` / `.cs-quiz-q` | 퀴즈 카드 구조 |
| `.cs-quiz-btn` + `.cs-quiz-btn-ox/.cs-quiz-btn-mc/.cs-quiz-btn-reveal` | 퀴즈 버튼 |
| `.cs-quiz-btn.state-correct/.state-wrong/.state-selected/.state-revealed` | 퀴즈 상태 색상 |
| `.cs-quiz-explain` / `.cs-quiz-fill-answer` / `.cs-quiz-options` / `.cs-quiz-reset` | 퀴즈 보조 |
| `.cs-insight-card` / `.cs-insight-area` / `.cs-insight-point` / `.cs-insight-desc` | 시사점 카드 |

### 사용 예시

```html
<!-- 개요 박스 -->
<div class="cs-intro-box">
  <strong>개념명</strong> — 설명 텍스트
</div>

<!-- 번호 카드 행 -->
<div class="cs-num-row">
  <span class="cs-num cs-num-md cs-num-prim">1</span>
  <div>내용</div>
</div>

<!-- 비교 카드 -->
<div class="cs-compare-card">
  <div class="cs-compare-label">피아제 — 인지발달이론</div>
  <div class="cs-compare-title">내적 인지 구조의 발달</div>
  <div class="cs-compare-desc">설명 텍스트</div>
</div>

<!-- 테이블 -->
<div class="cs-table-wrap">
  <table class="cs-table">
    <thead><tr><th>항목</th><th>내용</th></tr></thead>
    <tbody>
      <tr><td class="cs-td-key">키</td><td>값</td></tr>
    </tbody>
  </table>
</div>
```

---

## 6. content 파일 패턴

```javascript
// visualizations/[개념]-content.js
(function () {
  function $(id) { return document.getElementById(id); }

  // SITE_CONFIG fallback (ui.js 로드 실패 방어)
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };

  // 개념 고유 CSS만 최소한으로 (공통 클래스로 커버 안 되는 것만)
  if (!document.getElementById('[개념]-content-style')) {
    const s = document.createElement('style');
    s.id = '[개념]-content-style';
    s.textContent = `/* 이 개념에만 필요한 최소 CSS */`;
    document.head.appendChild(s);
  }

  const CSS_ACCENT = '[과목 accent 색상]'; // variables.css 토큰 참조

  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;
    el.innerHTML = `
      <div class="detail-section">
        <div class="detail-section-title">${C.summary.intro}</div>
        <div class="cs-intro-box">...</div>
      </div>
      ...
      ${CS.renderEssayGroups([...])}
      ...
      ${CS.renderCheckCards([...])}
    `;
  }

  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `연도 나열<span class="cs-history-note">요약</span>`,
      freqItems:   [...],
      normalItems: [...],
    });
  }

  const QUIZ_DATA = [...];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, '[prefix]'); }

  function init() { renderSummary(); renderExam(); renderQuiz(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    const obs = new MutationObserver(() => {
      if ($('tab-summary') && $('tab-exam') && $('tab-quiz')) { obs.disconnect(); init(); }
    });
    obs.observe(document.getElementById('main') || document.body, { childList:true, subtree:true });
    if ($('tab-summary')) init();
  }
})();
```

---

## 7. 둘러보기 — 시각화 파일 패턴

```javascript
// visualizations/[개념].js
(function () {
  const CSS_ACCENT = '[과목 accent]';
  const CSS_BG     = '[과목 bg]';
  const CSS_MID    = '[과목 mid]';

  // CSS 주입 (id로 중복 방지)
  if (!document.getElementById('[개념]-viz-style')) {
    const s = document.createElement('style');
    s.id = '[개념]-viz-style';
    s.textContent = `
      /* 탭 버튼은 components.css의 .filter-btn 패턴과 통일 */
      #[개념]-wrap .cv-tab {
        padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600;
        cursor:pointer; border:1px solid var(--border-light); color:var(--text-secondary);
        background:var(--bg-white); transition:all .15s;
      }
      #[개념]-wrap .cv-tab.on {
        background:[CSS_ACCENT]; color:white; border-color:transparent; font-weight:600;
      }
      /* 나머지 개념 고유 스타일 */
    `;
    document.head.appendChild(s);
  }

  let curTab = 'tab1';
  let activeItem = null;

  function render() {
    const c = document.getElementById('viz-container');
    if (!c) return;
    c.innerHTML = `...`;
  }

  // 전역 핸들러
  window.[개념]Tab   = function(tab) { curTab = tab; render(); };
  window.[개념]Click = function(id)  { activeItem = activeItem===id ? null : id; render(); };

  function init() {
    if (document.getElementById('viz-container')) render();
    else {
      const obs = new MutationObserver(() => {
        if (document.getElementById('viz-container')) { obs.disconnect(); render(); }
      });
      obs.observe(document.body, { childList:true, subtree:true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
```

### 시각화 내 UI 규칙
- 탭 버튼: `components.css`의 `.filter-btn` 패턴과 동일하게 → `.on` 시 prim 배경 + 흰 텍스트
- `→ ↓ ▶` 등 화살표 기호 대신 `›` 사용
- 클릭 가능한 항목: 호버 시 border 등장, 선택 시 prim border + 배경
- 아코디언 패턴: 기본 상태에서 핵심 정보 노출, 클릭 시 상세 펼침
- 탭 전환 후 `scrollIntoView({ behavior:'smooth', block:'start' })`
- **탭이 여러 개인 시각화를 외부 페이지(예: 개념 상세 페이지 상단에 고정 헤더가 있는 경우)에 끼워 넣을 때는, 내부 탭을 누를 때마다 탭 바 자체가 고정 헤더 바로 아래에 오도록 매번 스크롤을 보정한다.** 한 번만 보정하거나 "가려질 때만" 보정하면 콘텐츠 길이에 따라 탭 바가 화면 밖으로 밀려날 수 있다 (§16 참고)

### 둘러보기 탭 구성 원칙
- 핵심 정리에 이미 있는 정보를 둘러보기 탭으로 분리하지 않는다
- 핵심 정리로 전달하기 어려운 **인터랙티브 체험** 요소를 제공한다
- 비교표에 출제빈도 행 포함 금지 → 기출 포인트 탭에서 확인

---

## 8. 퀴즈 구성 규칙

### 문항 구성 권장
- OX: 5문항
- 빈칸 채우기: 2~3문항
- 객관식: 2~3문항

### 데이터 형식

```javascript
const QUIZ_DATA = [
  { type:'ox',   q:'질문', answer:'O', explain:'해설' },
  { type:'fill', q:'빈칸 (   ) 문제', answer:'정답', explain:'해설' },
  { type:'mc',   q:'질문', options:['①','②','③'], answer:0, explain:'해설' },
];
// answer: OX는 'O'/'X' 문자열, MC는 0-indexed 정수
```

### 문제 작성 원칙
- 객관식은 **정답이 반드시 하나**여야 함
- 빈칸 문제: 질문 빈칸 형식과 정답 형식 일치. 빈칸은 `(   )`처럼 괄호 사이에 공백 몇 칸을 두는 표기를 권장 (실제 빈칸처럼 보여 가독성이 좋음)
- 선지에 메타 텍스트 금지

### 퀴즈 UI 디자인 — Editorial 박스 없는 패턴 (§16·§17에서 확정)
디자인 실험(test-design.html) 결과로 확정된 패턴. `CS.renderQuizSection()` / `components.css`의 퀴즈 관련 클래스에 반영할 것:

- **OX 버튼**: 박스·배경색 없이 큰 타이포(28~34px)만 사용. 버튼 영역은 가운데 정렬. 기본 상태는 무채색, hover 시에만 살짝 진해짐. **선택한 버튼만** 정답이면 초록, 오답이면 빨강으로 색이 바뀌고, 선택하지 않은 나머지 버튼은 계속 무채색으로 둔다 (양쪽 다 색칠되는 것은 오류)
- **빈칸 채우기**: "정답 보기"는 박스 버튼이 아니라 포인트색 밑줄이 있는 텍스트 링크로. 정답을 보여줄 때 **"정답:" 레이블은 본문(질문)과 같은 무채색**, 실제 정답 값만 과목 accent 색상으로 강조
- **객관식**: 박스·배경색 없음. 정답은 **accent 색상 + 볼드**로, 오답은 **취소선**만 추가 (배경색 강조 금지). 해설은 항상 선택한 선지 바로 아래(질문과 같은 카드 안)에 위치, 별도 위치로 분리하지 않음
- **전체 초기화 버튼**: 카드 영역 우측·좌측이 아닌 **중앙 정렬**, 연한 무채색(`text-tertiary`급) 텍스트 버튼으로

---

## 9. 기출 포인트 구성 규칙

### 연도 태그 형식
```
'내용 설명 [2013중]'   ← 텍스트 끝에 [연도+학교급]
```
`CS.parseExamItem()`이 자동으로 태그를 맨 앞으로 이동 + pill 스타일 적용.

### 항목 정렬
- 연도 태그 **있는** 항목 → 상단
- 연도 태그 **없는** 항목 → 하단
- `CS.sortExamItems()`가 자동 처리

### 기출 연도 현황 박스
- 등급 표현(`S급`, `★` 등) 금지
- 연도 나열 + 한 줄 요약만
- `<span class="cs-history-note">요약 문장</span>` 패턴 사용

### 연도/학교급 열의 정렬 (Editorial 패턴, §16)
- 연도+학교급 항목 앞에 작은 점(dot)을 두어 설명 텍스트 시작 위치를 표시하는 경우, **연도 태그가 없는 "상시" 항목에도 투명한(보이지 않는) 점을 동일하게 넣어 자리만 차지하게 한다.** 그래야 "상시" 항목의 설명 텍스트 시작 지점이 연도 있는 항목들과 정확히 일치한다
- 표 형태로 보여줄 경우 연도/학교급, '상시' 열은 가운데 정렬

---

## 10. 새 개념 추가 체크리스트

```
□ data.js에 개념 항목 추가
  { subject, chapter, name, keywords, freq, viz, quiz }
  ※ name이 concept.html의 MAP 키와 정확히 일치해야 함

□ visualizations/[개념].js 생성
□ visualizations/[개념]-content.js 생성

□ concept.html VIZ_MAP에 등록
  '[개념명]': 'visualizations/[개념].js'

□ concept.html CONTENT_MAP에 등록
  '[개념명]': 'visualizations/[개념]-content.js'

□ data.js name 값과 MAP 키가 공백·특수문자 포함 완전 일치하는지 확인
  ('문맥교환 (Context Switch)' → 괄호·공백 한 글자도 틀리면 안 뜸)
```

---

## 11. 디자인 토큰

### 폰트
```css
--font-main:    'Pretendard'               /* UI 전반 */
--font-heading: 'Pretendard'               /* 제목류 */
--font-body:    'NostalgicMyoeunHeullim'   /* 본문·콘텐츠 */
--font-mono:    'JetBrains Mono'           /* 코드·수식 */
```

### 배경 레이어 (라이트)
```css
--bg-page:    #E8E8EC   /* 최하단 페이지 배경 — 무채색 계열로 변경 (기존 #F7F5F2) */
--bg-white:   #F6F6F8   /* 카드·패널 */
--bg-surface: #DCDCE2   /* 카드 내부 강조 영역 */
```
> 메인 화면(index.html) 전체에 적용된 배경. `test-design.html`처럼 별도 실험 페이지에서 다른 배경 톤을 쓰고 싶을 때는 §19의 페이지 전용 변수 격리 패턴을 따른다.

### 텍스트
```css
--text-primary:   #2C2825
--text-secondary: #6B6560
--text-tertiary:  #A09890
```

### 과목별 컬러 시스템 (개념 상세 페이지 — concept.html)
각 과목은 `bg / mid / accent / text` 4가지 값으로 구성:
```
bg     — 헤더·박스 배경 (파스텔)
mid    — 도트·보더·배지 배경
accent — 강조 텍스트·아이콘 (prim)
text   — 헤더 위 텍스트 (어두운 버전)
```

주요 과목 accent 색상:
```
교육심리학  #4EA87A (그린)
교수학습이론 #D4874A (오렌지)
교육과정론  #C4688E (핑크)
교육행정    #3A5AA0 (네이비)
생활지도·상담 #8050B8 (보라)
운영체제    #D05840 (레드)
컴퓨터구조  #6058C0 (인디고)
자료구조    #3878B8 (블루)
알고리즘    #2A9E94 (틸)
데이터베이스 #3A8858 (다크그린)
네트워크    #2888C8 (스카이블루)
```

> **메인 화면(index.html)은 위 4값 시스템 대신 §15의 6색 파스텔 팔레트를 사용한다.** concept.html 상세 페이지 색상 체계는 변경되지 않았음.

### 다크모드
- `@media (prefers-color-scheme: dark)` 에서 변수 오버라이드
- `bg`: #30~#48 수준 (배경 `#1C1A18`과 충분히 대비)
- `accent/text`: 밝고 채도 있게 유지 (가독성 확보)

---

## 12. 리팩토링 현황 (2025.06 이후)

### 변경 전 vs 후

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| 퀴즈 렌더링 | 각 content 파일에 개별 구현 | `CS.renderQuizSection()` 한 곳 |
| 기출 포인트 렌더링 | 각 content 파일에 개별 구현 | `CS.renderExamSection()` 한 곳 |
| 논술 답안 구조 | 인라인 스타일 HTML | `CS.renderEssayGroups()` |
| 체크 포인트 | 인라인 스타일 HTML | `CS.renderCheckCards()` |
| 공통 레이아웃 | 인라인 스타일 반복 | `components.css` 공통 클래스 |
| 탭 버튼 스타일 | 각 viz 파일에 하드코딩 | `components.css` 패턴 통일 |
| 메인 화면 과목 탐색 | 과목 클릭 → 페이지 이동 → 개념 목록 → 페이지 이동 | 과목 클릭 시 같은 자리에서 아코디언으로 펼침 (§14) |

### 리팩토링 후 디자인 변경 난이도

| 변경 사항 | 난이도 | 수정 위치 |
|---|---|---|
| 과목 포인트 컬러 | 매우 쉬움 | `variables.css` 1줄 |
| 전체 폰트 | 쉬움 | `variables.css` 1곳 |
| 퀴즈 전체 UI | 쉬움 | `ui.js` 1곳 |
| 기출 포인트 스타일 | 쉬움 | `components.css` 1곳 |
| 체크 포인트 디자인 | 쉬움 | `components.css` `.cs-check-card` |
| 카드 border-radius | 쉬움 | `components.css` + 개념별 고유 CSS |
| 핵심정리 개념 고유 구조 | 개념별 | 해당 content 파일만 |
| 메인 화면 영역 순서·구조 | 쉬움 | `config.js`의 `SITE_CONFIG.areas` 순서 + `index.html` `renderHome()` |

### 아직 개별 수정이 필요한 것
- 각 개념 고유의 핵심정리 구조 (매트릭스, 단계 흐름, 체계 카드 등)
- viz 파일 내 개념별 시각화 로직

---

## 13. 자주 실수하는 포인트

| 실수 | 올바른 방법 |
|---|---|
| `★` 기호 사용 | 색상 또는 볼드로 대체 |
| 테이블 행 배경색으로 강조 | 텍스트 색상으로만 강조 |
| 비교 섹션에서 비교군도 prim 색상 | 비교군은 보색(`#C05808`) 사용 |
| 논술 답안 구조 그룹 제목에 원형 번호 | 회색 소형 레이블 텍스트만 |
| 논술/체크포인트 소제목에 prim 색상 | `--subject-accent:#6B6560` 무채색 고정 |
| 체계·지위 카드에 `border-left` 추가 | 배경색이 구분 역할 → 선 제거 |
| 화살표 기호 `→ ↓ ▶` | `›` 텍스트 아이콘으로 통일 |
| 퀴즈 정답이 여러 개인 객관식 | 반드시 정답 하나만 |
| 비교표에 출제빈도 행 포함 | 기출 포인트 탭에만 |
| 체크포인트에 타 이론 연결 내용 혼재 | 다른 이론과 비교 섹션으로 분리 |
| sortExamItems에서 연도 있는 항목을 하단으로 | 연도 있는 항목 상단 |
| 기출 포인트 연도 태그를 무채색으로 | 과목 prim 색상 사용 |
| 4분할 매트릭스에서 `writing-mode` 사용 | 모든 레이블 가로 읽기 유지 |
| content 파일에 퀴즈·기출 렌더 로직 직접 구현 | `CS.renderQuizSection()` / `CS.renderExamSection()` 사용 |
| viz 파일 탭 버튼을 과목 색상 border로 스타일링 | `.on` 시 prim 배경 + 흰 텍스트 패턴으로 통일 |
| data.js name과 MAP 키가 미묘하게 다름 | 공백·괄호 포함 완전 일치 확인 |
| concept.html VIZ_MAP/CONTENT_MAP 등록 누락 | 새 개념 추가 시 체크리스트 10번 항목 필수 확인 |
| ui.js 로드 전에 content 파일 실행 | 로드 순서: data.js → config.js → ui.js |
| `CS` 객체 없이 content 파일 작성 | `window.CS.*` 함수 존재 전제로 작성 |
| **(신규)** 탭으로 정보를 나누고 그 안에서 디자인 스타일(Editorial/Bento 등)을 다르게 적용 | 탭이 정보를 미리 잘라버리면 스타일의 본질(타이포 위계, 카드 크기 차등)이 발현되지 않음. 한 페이지로 흐르게 하거나, 스타일은 페이지 레벨에서 통일 |
| **(신규)** Bento 스타일에서 모든 카드를 같은 크기로 제작 | Bento의 본질은 카드 크기 차등으로 정보 위계를 표현하는 것. 균일한 크기면 그냥 그리드일 뿐 |
| **(신규)** "클릭 가능함이 안 보인다"는 피드백에 박스·배경색을 추가로 해결 | 본질은 hover 색상 변화·커서 등 가벼운 신호로 충분히 전달 가능. 박스를 추가하면 Editorial의 박스 없는 기조와 충돌 |
| **(신규)** sticky 요소 여러 개에 각각 `top:0` 부여 | 실제 높이 계산이 틀어지면 틈새로 콘텐츠가 보임. 하나의 부모를 sticky로 묶어 자식들을 자연스럽게 쌓는 방식이 안전 |
| **(신규)** 절차·타임라인의 세로선과 원형 마커를 서로 다른 부모 요소 기준 좌표로 배치 | 좌표계가 다르면 미세하게 어긋남. 같은 기준점에서 중심좌표를 정확히 계산해 일치시킬 것 |
| **(신규)** 키워드·개념 그래프에 자동 흔들림 애니메이션 적용 | 산만함을 유발함. 노드를 직접 드래그해 옮기는 인터랙션이 더 차분하고 탐색에 적합 |
| **(신규)** 실험용 페이지에서 메인 사이트의 `variables.css` 변수를 직접 덮어씀 | 페이지 전용 prefix 변수(`--td-*` 등)를 새로 선언해 메인 사이트에 영향 없이 격리 (§19) |

---

## 14. 메인 화면(index.html) 구조

### 14.1 타이포그래피 히어로
- 첫 화면 최상단에 큰 타이포 블록 배치: `COMPUTER`(진하게) / `EDUCATION`(옅은 회색, `text-tertiary` 톤), 56px 전후, `letter-spacing:-.04em`
- 구성 순서: eyebrow(사이트명 한 줄) → 큰 타이포 제목 → 설명 문장(lede) → 통계 스탯(개념 카드 수·빈출 수·둘러보기 수)

### 14.2 아코디언 탐색 구조
- 기존: 과목 클릭 → 페이지 이동(`concept.html?subject=`) → 개념 목록 → 또 페이지 이동
- 변경: **과목을 클릭하면 같은 화면에서 그 자리에 하위 개념이 펼쳐짐** (`toggleSubject()`)
- 개념 카드를 클릭하면 그제서야 `concept.html`(상세 페이지)로 이동
- 사이드바 과목 클릭도 동일하게 동작 — 페이지 이동 없이 홈으로 와서 해당 과목을 펼침 (`goHomeAndOpen()`)
- 펼칠 때 해당 과목 위치까지 `scrollIntoView`로 부드럽게 스크롤
- `?subject=` URL로 직접 들어와도 해당 과목이 펼쳐진 상태로 초기 렌더

### 14.3 챕터 단위 그룹화
- 아코디언을 펼쳤을 때 개념 카드가 그냥 나열되지 않고, **챕터별로 다시 그룹화**되어 보임 (`acc-chapter`, `acc-chapter-title`, `acc-chapter-count`)
- 각 챕터 제목 옆에 해당 챕터의 개념 개수 표시

### 14.4 3열 영역 레이아웃
- 교육학 / 교과교육학 / 전공 3개 영역이 **가로로 나란히 3개 열**을 이루고, 각 열 안에서 과목은 세로로 나열 (`area-columns`, `area-column`)
- 영역 순서는 `config.js`의 `SITE_CONFIG.areas` 키 순서를 따름: `{ edu: '교육학', info: '교과교육학', cs: '전공' }`
- 모바일(768px 이하)에서는 3열 → 1열로 전환

### 14.5 배경·여백
- `--bg-page` 등 배경을 무채색 계열(`#E8E8EC`)로 통일 (§11 참고)

---

## 15. 6색 파스텔 팔레트 (메인 화면 과목 색상)

메인 화면(index.html)의 과목별 색상은 4값 체계(bg/mid/accent/text) 대신, **6가지 색상 그룹을 교육학·교과교육학·전공 3영역에 공유**하는 방식으로 구성한다. 서브 텍스트 HEX 값을 `mid`로 재활용한다.

| 색상 | bg | text | mid(서브텍스트) | 교육학 | 교과교육학 | 전공 |
|---|---|---|---|---|---|---|
| 베이비 핑크 | `#FFC9E3` | `#7A1F4D` | `#993D6B` | 교육과정 | 정보과 교육과정 | 인공지능 · 이산수학 |
| 피치 코랄 | `#FFD5B8` | `#803300` | `#803300` | 교수학습 | 교수학습 방법 | 운영체제 · 프로그래밍언어론 |
| 베이비 옐로우 | `#FFF3B8` | `#5C4D00` | `#806A00` | 교육평가 | 평가론 | 자료구조 · 알고리즘 |
| 민트 | `#B8FFE0` | `#0A4D33` | `#1F7A52` | 교육심리 | 컴퓨팅 사고력(CT) | 데이터베이스 · 소프트웨어공학 |
| 베이비 블루 | `#AEE2FF` | `#0A3C5C` | `#1E5A80` | 교육행정 | SW·AI 교육론 | 네트워크 · 정보보안 |
| 라일락 | `#E1C5FF` | `#3D1F6B` | `#5C3D8C` | 생활지도·상담 | (미사용) | 컴퓨터구조 · 컴파일러 |

**라일락 제약**: 교과교육학 과목이 5개뿐이라 라일락을 쓸 자리가 없음 → 교육학의 "생활지도·상담"과 전공의 "컴퓨터구조·컴파일러"에만 한정 적용.

다크모드에서도 동일한 6색 팔레트 구조를 유지하되, bg는 어둡게(`#1E~#42` 대), mid/accent는 밝고 채도 있게 오버라이드한다.

---

## 16. 디자인 실험 — Editorial 패턴 확정 (test-design.html)

`test-design.html`은 본 사이트(concept.html)와 무관한 **독립적인 디자인 실험 페이지**다. 운영체제 "문맥교환" 개념 콘텐츠를 복제해 다양한 스타일을 시험해본 뒤, 향후 concept.html 상세 페이지 디자인 개편에 반영할 방향을 결정하기 위해 운용한다.

> **중요**: `test-design.html` 작업은 원본 `visualizations/context-switch.js`, `context-switch-content.js`를 절대 수정하지 않는다. 둘러보기 탭에서 원본 시각화 파일을 `<script src>`로 그대로 재사용(패키징)할 뿐, 콘텐츠는 별도로 새로 작성한다.

### 16.1 시도했던 스타일과 최종 결론
세 가지를 시도함:
- **Editorial**: 타이포그래피 위계(글자 크기·굵기·여백)로 정보 구조를 표현. 박스를 거의 쓰지 않음
- **Bento Grid**: 카드 크기 차등으로 정보 중요도를 표현
- **Mix**: 흐름은 Editorial, 병렬 데이터(트리거·PCB 등)만 Bento 타일로 삽입

→ **최종적으로 Bento·Mix 토글을 제거하고 Editorial 단일 스타일로 확정.** 이유:
- 탭으로 콘텐츠를 미리 잘라버리면 두 스타일의 본질적 특징이 드러나지 않음 (§13 신규 항목 참고)
- Bento는 카드 크기를 의도적으로 차등 줘야 의미가 있는데, 콘텐츠가 많아지자 균일한 크기의 카드 나열이 되어 버려 일반 그리드와 차이가 없어짐
- Editorial이 가독성·정보 위계 면에서 가장 안정적으로 동작함

### 16.2 Concept / Note 토글
탭(핵심정리·둘러보기·기출포인트·리마인드 4개) 대신, 콘텐츠를 두 그룹으로 단순화:
- **Concept**: 개념 자체 — 발생조건·절차·상태전이·PCB·오버헤드·비교표
- **Note**: 부가 정보 — 논술 답안 구조·체크 포인트·기출 포인트·리마인드

`Note`라는 이름과 짝이 되도록, 메인 콘텐츠 쪽 토글 이름은 `Concept`으로 명명한다 (이전에 시도한 "메인", "Tip" 등의 이름은 폐기).

### 16.3 키워드 그래프 — 드래그 가능한 노드 그래프
- 옵시디언 그래프 뷰 스타일: SVG로 노드(원)와 선(연결선)을 그려서 핵심 키워드 간 관계를 보여줌
- **자동 애니메이션(흔들림·둥둥 떠다님)은 적용하지 않는다** — 산만함을 유발하는 것으로 확인됨
- 대신 **마우스/터치로 노드를 직접 드래그해서 위치를 옮길 수 있게 구현**한다. 노드를 옮기면 연결된 선도 실시간으로 따라옴
- 중심 키워드(예: "문맥교환")는 더 크고 진한 색(accent), 주변 키워드는 작고 옅은 파스텔 색

### 16.4 둘러보기(인터랙티브 시각화)와 키워드 그래프의 배치
- 둘 다 "둘러보기" 성격의 보조 콘텐츠이므로, 헤더 바로 아래(Concept/Note 토글보다 위) 같은 위치에 모아둔다
- 하나의 패널에 욱여넣거나 서브탭으로 전환하는 방식은 피한다 — 한쪽을 보기 위해 다른 쪽이 사라지는 구조보다, **"키워드 그래프"와 "인터랙티브 시각화"를 각각 독립된 토글(접기/펼치기)로 나열**하는 편이 자연스러움
- 토글 버튼은 박스·배경색 없이 화살표(`›`) + 텍스트만 있는 가벼운 한 줄 형태로. 이모지(돋보기 등)로 꾸미지 않는다
- 인터랙티브 시각화는 처음 펼칠 때만 해당 viz 파일을 lazy-load한다

### 16.5 Sticky 헤더 — 틈 방지
- 상단 네비게이션 바와 Concept/Note 토글처럼 스크롤 시 고정되는 요소가 여러 개일 경우, **개별로 `position:sticky; top:0`을 따로따로 주지 않는다.** 높이 계산이 정확히 맞지 않으면 그 사이 틈으로 콘텐츠가 스쳐 지나가 보이는 버그가 생긴다
- 대신 두 요소를 **하나의 부모 컨테이너로 묶어 그 컨테이너만 sticky**로 만든다
- Concept/Note 토글을 누르면 페이지 최상단으로 스크롤(`window.scrollTo({top:0})`)하여, 토글 전환 시 사용자가 다시 위로 스크롤해야 하는 수고를 없앤다

### 16.6 인터랙티브 시각화 내부 탭 — 스크롤 보정
- 시각화 자체에 탭이 여러 개 있는 경우(예: "문맥교환 단계" / "CPU 타임라인" / "PCB 구조"), 탭을 클릭할 때마다 **탭 바가 고정 헤더 바로 아래에 오도록 매번 스크롤을 보정**한다
- "가려질 때만" 보정하는 조건부 로직은 콘텐츠 길이에 따라 탭 바가 화면 밖으로 밀려나는 경우를 놓칠 수 있어, 매번 무조건 위치를 재조정하는 방식이 안전하다
- 원본 시각화 파일은 수정하지 않고, 전역 탭 전환 함수(`window.ctxTab` 등)를 외부에서 감싸서(wrap) 스크롤 로직만 추가한다

---

## 17. 리마인드 퀴즈 UI — 세부 디자인 결정 (§8 보강)

§8의 퀴즈 UI 규칙을 다음과 같이 더 구체화함 (test-design.html 실험 결과):

- OX 버튼: 큰 타이포(28~34px), 가운데 정렬, 박스 없음. 기본 무채색 → hover 시 톤만 살짝 진해짐. 누른 버튼만 정답/오답 색이 적용되고 나머지는 그대로 무채색 유지
- 빈칸 채우기: "정답 보기"는 텍스트 링크(포인트색 밑줄), 정답 노출 시 "정답:" 레이블은 본문과 동일한 무채색, 정답 값만 accent색
- 객관식: 박스 없음, 정답=accent색+볼드, 오답=취소선만(배경색 강조 금지), 해설은 선택한 선지 바로 아래
- 전체 초기화 버튼: 중앙 정렬, 연한 무채색 텍스트

---

## 18. 절차·타임라인 좌표 정렬 — 체크리스트

세로 타임라인(절차·단계 흐름)에서 세로선과 원형 마커(스텝 마커)를 함께 쓸 때:
- 선과 원이 **반드시 같은 기준 좌표계에서 중심점이 일치하도록 계산**한다. 부모 요소가 다르거나 `padding`/`position`이 섞이면 1~3px씩 미세하게 어긋나기 쉽다
- 강조(현재 핵심 단계)는 원의 배경/테두리 색상만 바꿔서 표시하고, 선 자체는 끊기지 않게 유지한다 (강조 단계에 박스를 씌우면 선이 그 구간에서 끊겨 의미가 모호해짐)

---

## 19. 페이지 전용 색상 변수 격리 패턴

`test-design.html`처럼 메인 사이트와 다른 배경·포인트 색상이 필요한 실험적 페이지를 만들 때:
- 메인 사이트의 `variables.css`는 절대 직접 수정하지 않는다
- 해당 페이지의 `<style>` 블록 안에 **페이지 전용 prefix가 붙은 변수**를 새로 선언한다 (예: `--td-bg-page`, `--td-coral-bg`, `--td-coral-deep` 등 `td-` = test-design)
- 이렇게 하면 실험 페이지에서 자유롭게 색을 바꿔도 메인 사이트(index.html, concept.html)의 색상 체계에 전혀 영향을 주지 않는다
