# CS.im 콘텐츠·디자인 가이드

정보컴퓨터 임용시험 학습 사이트 CS.im의  
새 개념 페이지를 만들 때 따르는 규칙 문서.

---

## 1. 파일 구조 & 역할

```
js/data.js           — 전체 개념 목록 (SUBJECTS + CONCEPTS 배열)
js/config.js         — 공통 용어 상수 (SITE_CONFIG)
index.html           — 홈 + 과목 목록 SPA
concept.html         — 개념 상세 페이지 (VIZ_MAP, CONTENT_MAP 관리)
css/variables.css    — 디자인 토큰 (폰트·색상·다크모드)
css/components.css   — 레이아웃·공통 컴포넌트
visualizations/
  [개념명].js        — 둘러보기 인터랙티브 시각화
  [개념명]-content.js — 핵심정리·기출포인트·리마인드 탭 콘텐츠
```

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
| 개요 | prim 배경색 박스 + 본문 텍스트 | 피아제·가네·마르시아 개요 |
| 학습자의 학습 과정 | 원형 번호 카드 (bg-surface) | 피아제 평형화 과정 |
| 교사의 역할 & 수업 방법 | 원형 번호 카드 (bg-surface) | 피아제 교사역할 |
| 단계별 특징 개요 | 테이블 (모바일: 카드 전환) | 피아제 4단계 |
| 4분할 지위·유형 분류 | 3×3 그리드 매트릭스 (항상 펼쳐진 상태) | 마르시아 정체감 지위 |
| A vs B 비교 | 공통점 카드 + 차이점 테이블 | 피아제 vs 비고츠키 |
| 목록형 내용 | 번호 리스트 (원형 번호 + 텍스트 한 줄) | 가네 수업사태 |
| 교육적 시사점 | bg-surface 카드 (영역 레이블 + 제목 + 설명) | 마르시아 교육적 시사점 |
| 다른 이론과 비교 | bg-surface 카드 (이론명 레이블 + 내용) | 마르시아 에릭슨 연결 |
| 논술 답안 구조 | 무채색 카드 + 회색 숫자 번호 | 공통 |
| 체크 포인트 | 왼쪽 컬러 border 카드 + 레이블 pill | 공통 |

### 섹션 순서 규칙
- **논술 답안 구조** 바로 위에 **다른 이론과 비교** 섹션 배치
- 다른 이론·학자와 연결되는 내용(에릭슨 연결, 비고츠키 비교 등)은 체크 포인트가 아닌 이 섹션에 넣는다
- **논술 답안 구조**와 **체크 포인트**의 소제목 막대(`detail-section-title`) 색상은 무채색(`--subject-accent:#6B6560`)으로 고정

### 4분할 매트릭스 형식 (마르시아 등)
두 기준(X축·Y축)으로 4개 항목을 분류하는 개념에 사용.

```html
<!-- CSS: grid-template-columns: 1fr auto 1fr; grid-template-rows: 1fr auto 1fr; -->
<div style="display:grid; grid-template-columns:1fr auto 1fr; gap:8px;">

  <!-- 셀(좌상) -->    <!-- Y축 상단 레이블 -->    <!-- 셀(우상) -->
  <!-- X축 좌 레이블 --> <!-- 중앙 dot -->        <!-- X축 우 레이블 -->
  <!-- 셀(좌하) -->    <!-- Y축 하단 레이블 -->    <!-- 셀(우하) -->

</div>
```

- 레이블은 `background:var(--bg-surface);border-radius:20px;` pill 형태
- 중앙 교차점: 작은 dot(`width:6px;height:6px;border-radius:50%`)만 배치
- **둘러보기(시각화)** 에서는 클릭 시 상세 펼침 / **핵심 정리** 에서는 항상 펼쳐진 상태
- 핵심 정리의 매트릭스에는 위기·전념 여부 pill 레이블 표시 없음

### 원형 번호 색상 규칙
- **논술 답안 구조**: `#A09890` 회색 무채색, 원형 아닌 일반 숫자(`1.` `2.`)로 표시
- **핵심 3단계 등 중요 항목**: `prim(ACCENT)` 색상 원형
- **일반 나열**: `#A09890` 회색 원형

### 강조 표현 규칙
- `★` 기호 사용 금지 → **색상** 또는 **볼드**로 대체
- 텍스트 내 중요 키워드: `<span style="color:ACCENT;font-weight:700;">`
- 테이블에서 중요 행: 텍스트 색상만으로 구분 (행 배경색 강조 금지)
- 컬럼명 전부 좌측 정렬

### 비교 섹션 색상 규칙
- 주 이론(e.g., 피아제): `prim(ACCENT)` 색상
- 비교군(e.g., 비고츠키): `#C05808` 보색 (오렌지 계열)
- '차이점' 타이틀: 보색 적용
- '공통점' 카드: 번호 있는 강조 카드로 충분히 눈에 띄게

### 체크 포인트 레이블 & 규칙
- `혼동 주의` → `#D05840` 빨강 (먼저 배치)
- `핵심 암기` → `#2D8A6A` 초록 (마지막에 배치)
- 두 레이블만 사용. 에릭슨 연결 등 타 이론 참고 내용은 **다른 이론과 비교** 섹션으로 이동
- 폰트 크기: `font-size:12px` 래퍼로 감싸기 (다른 섹션과 통일)

---

## 4. 둘러보기 — 시각화 파일 패턴

```javascript
// visualizations/[개념].js
(function () {
  // 1. CSS 주입 (id로 중복 방지)
  if (!document.getElementById('[개념]-viz-style')) { ... }

  // 2. 데이터
  const DATA = [...];

  // 3. 상태
  let activeItem = null;

  // 4. render() — #viz-container에 마운트
  function render() {
    const container = document.getElementById('viz-container');
    if (!container) return;
    container.innerHTML = `...`;
  }

  // 5. 전역 핸들러 (onclick에서 호출)
  window.[개념]Tab   = function(name) { ... };
  window.[개념]Click = function(id)   { ... };

  // 6. 초기화 (MutationObserver로 viz-container 대기)
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
- `→` `↓` `▶` 등 화살표 기호 대신 `›` 텍스트 아이콘 사용
- 클릭 가능한 항목: 호버 시 border 등장, 선택 시 prim border + 배경
- 탭 전환: `.on` 스타일 (prim 배경 + 어두운 텍스트)
- 예시 텍스트: `var(--text-tertiary)` 무채색 (강조하지 않음)
- 단계 사이 구분: 화살표 대신 `gap` 간격만 사용
- 내적과정 표시: 배지보다 회색 소형 텍스트로 조용하게
- 아코디언 패턴: 기본 상태에서 핵심 정보 노출, 클릭 시 상세 펼침
- 탭 전환 후 `scrollIntoView({ behavior:'smooth', block:'start' })`로 시각화 상단 스크롤

### 4분할 매트릭스 시각화 (마르시아 등)
```
유실    (전념○)    성취
(위기✕)   [·]    (위기○)
혼미    (전념✕)    유예
```
- CSS Grid `grid-template-columns: 1fr auto 1fr`으로 구현
- 레이블 칸 클래스: `mv-mid-label` (bg-surface pill)
- 중앙 교차점: dot만
- 클릭 시 해당 셀 상세 내용 펼침 (아코디언)
- `writing-mode` 절대 사용 금지 — 모든 레이블은 가로 읽기

### 비교표에서 제외할 항목
- 출제빈도/출제 행 → 기출 포인트 탭에서 확인. 비교표에 넣지 않는다

---

## 5. 리마인드 — 퀴즈 구성 규칙

### 문항 구성 권장
- OX: 5문항
- 빈칸 채우기: 2~3문항
- 객관식: 2~3문항

### 문제 작성 원칙
- 객관식은 **정답이 반드시 하나**여야 함
- "아닌 것은?" 형식은 선지 전체를 검증 후 사용
- 선지에 메타 텍스트 금지
- 빈칸 문제: 질문의 빈칸 형식과 정답 형식이 일치해야 함

### 퀴즈 파일 패턴
```javascript
const QUIZ_DATA = [
  { type:'ox',   q:'질문', answer:'O', explain:'해설' },
  { type:'fill', q:'빈칸 (   ) 문제', answer:'정답', explain:'해설' },
  { type:'mc',   q:'질문', options:['①','②','③','④'], answer:0, explain:'해설' },
];
// answer: OX는 'O'/'X' 문자열, MC는 0-indexed 정수
```

---

## 6. 기출 포인트 — 구성 규칙

### 연도 태그 형식
```
'내용 설명 [2013중]'   ← 텍스트 끝에 [연도+학교급]
```
`parseExamItem()` 함수가 자동으로 태그를 맨 앞으로 이동 + pill 스타일 적용.

### 연도 태그 pill 색상
- 배경: 과목 prim 색상의 연한 bg (`background:BG`)
- 텍스트: 과목 prim 색상 (`color:ACCENT`)
- 무채색 사용 금지

### 항목 정렬 규칙 (`sortExamItems`)
- 연도 태그(`[2013중]` 등) **있는** 항목 → 상단
- 연도 태그 **없는** 항목 → 하단

```javascript
function sortExamItems(items) {
  return [...items].sort((a, b) => {
    const aHasTag = /\[.+?\]/.test(a);
    const bHasTag = /\[.+?\]/.test(b);
    if (aHasTag && !bHasTag) return -1;
    if (!aHasTag && bHasTag) return 1;
    return 0;
  });
}
```

### 기출 연도 현황 박스
- S급, ★ 등 등급 표현 금지
- 연도 나열 + 한 줄 요약만

### 레이블
- 자주 출제 / 간헐 출제

---

## 7. 공통 상수 — SITE_CONFIG 참조

모든 용어는 `js/config.js`의 `SITE_CONFIG`에서 참조.  
콘텐츠 파일에서 직접 하드코딩 금지.

```javascript
const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
  summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
  quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식',
             btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
};
```

---

## 8. 디자인 토큰

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
--text-primary:   #2C2825   /* 본문 */
--text-secondary: #6B6560   /* 보조 설명 */
--text-tertiary:  #A09890   /* 힌트·레이블·예시 */
```

### 과목별 컬러 시스템
각 과목은 4가지 값으로 구성:
```
bg     — 헤더·박스 배경 (파스텔)
mid    — 도트·보더·배지 배경
accent — 강조 텍스트·아이콘 (prim)
text   — 헤더 위 텍스트 (어두운 버전)
```

### 다크모드
- `@media (prefers-color-scheme: dark)` 에서 변수 오버라이드
- `bg`: 과목별 어두운 색조 (#30~#48 수준, 배경과 충분히 대비)
- `mid`: 약간 밝은 무채색 계열
- `accent/text`: 밝고 채도 있게 유지 (가독성 확보)

---

## 9. 새 개념 추가 체크리스트

```
□ data.js에 개념 항목 추가
  {subject, chapter, name, keywords, freq, viz, quiz}

□ visualizations/[개념].js 생성
□ visualizations/[개념]-content.js 생성

□ concept.html VIZ_MAP에 등록
  '[개념명]': 'visualizations/[개념].js'

□ concept.html CONTENT_MAP에 등록
  '[개념명]': 'visualizations/[개념]-content.js'

□ data.js에 중복 항목 없는지 확인
  (이름이 정확히 일치해야 매핑 작동)
```

---

## 10. 자주 실수하는 포인트

| 실수 | 올바른 방법 |
|---|---|
| `★` 기호 사용 | 색상 또는 볼드로 대체 |
| 테이블 행 배경색으로 강조 | 텍스트 색상으로만 강조 |
| 비교 섹션에서 비교군도 prim 색상 | 비교군은 보색(`#C05808`) 사용 |
| 논술 답안 구조 번호에 원형+prim 색상 | 회색 일반 숫자(`1.` `2.`)로 표시 |
| 논술/체크포인트 소제목에 prim 색상 | `--subject-accent:#6B6560` 무채색 고정 |
| 외적/내적 조건을 대비 구도로 배치 | 대비가 아닌 경우 순서대로 나열 |
| 강조 설명 문구 별도 추가 | 강조는 디자인이 말하게, 텍스트로 설명 불필요 |
| 화살표 기호 `→ ↓ ▶` | `›` 텍스트 아이콘으로 통일 |
| 퀴즈 정답이 여러 개인 객관식 | 반드시 정답 하나만 되도록 문제 재설계 |
| ID에 특수문자 포함 | `name.replace(/[^a-zA-Z0-9가-힣]/g, '_')` |
| 개념명에 불필요한 부연 표기 | 임용 공부에 혼란을 줄 수 있는 부연(예: 모라토리움) 생략 |
| 4분할 매트릭스에서 writing-mode 사용 | 모든 레이블 가로 읽기 유지 |
| 비교표에 출제빈도 행 포함 | 출제 정보는 기출 포인트 탭에만 |
| 체크포인트에 타 이론 연결 내용 혼재 | 다른 이론과 비교 섹션으로 분리 |
| 체크포인트 글씨 크기 미통일 | 래퍼에 `font-size:12px` 명시 |
| sortExamItems에서 연도 있는 항목을 하단으로 | 연도 있는 항목 상단, 없는 항목 하단 |
| 기출 포인트 연도 태그를 무채색으로 | 과목 prim(ACCENT) 색상 사용 |
