# CS.im 콘텐츠·디자인 가이드

정보컴퓨터 임용시험 학습 사이트 CS.im의  
새 개념 페이지를 만들 때 따르는 규칙 문서.

---

## 1. 파일 구조 & 역할

```
js/data.js           — 전체 개념 목록 (SUBJECTS + CONCEPTS 배열)
js/config.js         — 공통 용어 상수 (SITE_CONFIG)
js/ui.js             — 공통 UI 유틸 함수 (CS 객체) ← 리팩토링 후 추가
index.html           — 홈 + 과목 목록 SPA
concept.html         — 개념 상세 페이지 (VIZ_MAP, CONTENT_MAP 관리)
css/variables.css    — 디자인 토큰 (폰트·색상·다크모드)
css/components.css   — 레이아웃·공통 컴포넌트 클래스 (리팩토링 후 확장)
visualizations/
  [개념명].js        — 둘러보기 인터랙티브 시각화
  [개념명]-content.js — 핵심정리·기출포인트·리마인드 탭 콘텐츠
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
- 빈칸 문제: 질문 빈칸 형식과 정답 형식 일치
- 선지에 메타 텍스트 금지

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
--bg-page:    #F7F5F2   /* 최하단 페이지 배경 */
--bg-white:   #FFFFFF   /* 카드·패널 */
--bg-surface: #F0EDE8   /* 카드 내부 강조 영역 */
```

### 텍스트
```css
--text-primary:   #2C2825
--text-secondary: #6B6560
--text-tertiary:  #A09890
```

### 과목별 컬러 시스템
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
