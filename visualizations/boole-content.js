/**
 * 부울 대수·논리게이트 — 탭 콘텐츠 (리팩토링)
 * SITE_CONFIG + CS(ui.js) 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };
  const CSS_ACCENT = '#6058C0';

  /* 컴퓨터구조 과목은 CSS 변수를 override — subject-accent가 인디고 */
  if (!document.getElementById('boole-content-style')) {
    const s = document.createElement('style');
    s.id = 'boole-content-style';
    s.textContent = `
      .bc-gate-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:10px; }
      .bc-gate-card { background:var(--bg-surface); border-radius:var(--radius-md); padding:12px 14px; }
      .bc-gate-name { font-size:13px; font-weight:700; color:${CSS_ACCENT}; margin-bottom:4px; }
      .bc-gate-expr { font-family:'JetBrains Mono','Fira Code',monospace; font-size:12px; color:var(--text-secondary); margin-bottom:6px; }
      .bc-gate-desc { font-size:11px; color:var(--text-secondary); line-height:1.5; }
      .bc-law-row { display:flex; gap:8px; align-items:flex-start; padding:5px 10px; background:var(--bg-surface); border-radius:6px; font-size:12px; margin-bottom:3px; }
      .bc-law-num { color:${CSS_ACCENT}; font-weight:700; min-width:20px; flex-shrink:0; }
      .bc-law-expr { font-family:'JetBrains Mono','Fira Code',monospace; flex:1; color:var(--text-primary); }
      .bc-law-name { font-size:10px; color:var(--text-tertiary); min-width:60px; text-align:right; flex-shrink:0; }
      @media(max-width:560px) { .bc-gate-grid { grid-template-columns:1fr 1fr; } }
    `;
    document.head.appendChild(s);
  }

  const GATES = [
    { name:'AND',    expr:'Y = A · B',   desc:'두 입력이 모두 1일 때만 1 출력. 논리곱.', tt:['0·0=0','0·1=0','1·0=0','1·1=1'] },
    { name:'OR',     expr:'Y = A + B',   desc:'입력 중 하나 이상 1이면 1 출력. 논리합.', tt:['0+0=0','0+1=1','1+0=1','1+1=1'] },
    { name:'NOT',    expr:"Y = A'",      desc:'입력을 반전(보수). 인버터.', tt:["0→1","1→0"] },
    { name:'NAND',   expr:"Y = (A·B)'",  desc:'AND의 반전. 0이 하나라도 있으면 1.', tt:['0·0→1','0·1→1','1·0→1','1·1→0'] },
    { name:'NOR',    expr:"Y = (A+B)'",  desc:'OR의 반전. 둘 다 0일 때만 1.', tt:['0+0→1','0+1→0','1+0→0','1+1→0'] },
    { name:'XOR',    expr:'Y = A ⊕ B',  desc:'두 입력이 서로 다를 때만 1. 배타적 OR.', tt:['0⊕0=0','0⊕1=1','1⊕0=1','1⊕1=0'] },
    { name:'XNOR',   expr:"Y = (A⊕B)'", desc:'XOR의 반전. 두 입력이 같을 때만 1.', tt:['0⊕0→1','0⊕1→0','1⊕0→0','1⊕1→1'] },
    { name:'BUFFER', expr:'Y = A',       desc:'입력을 그대로 출력. 신호 증폭·지연용.', tt:['0→0','1→1'] },
  ];
  const LAWS = [
    ['x + 0 = x',        '항등원'],  ['x · 0 = 0',        '소멸'],
    ['x + 1 = 1',        '소멸'],    ['x · 1 = x',        '항등원'],
    ['x + x = x',        '멱등'],    ['x · x = x',        '멱등'],
    ["x + x' = 1",       '보수'],    ["x · x' = 0",       '보수'],
    ['x + y = y + x',    '교환'],    ['xy = yx',          '교환'],
    ['x+(y+z)=(x+y)+z',  '결합'],    ['x(yz)=(xy)z',      '결합'],
    ['x(y+z)=xy+xz',     '분배'],    ['x+yz=(x+y)(x+z)',  '분배'],
    ["(x+y)'=x'y'",      '드모르간'], ["(xy)'=x'+y'",     '드모르간'],
    ['x+xy=x',           '흡수'],    ['x(x+y)=x',         '흡수'],
    ["(x')'=x",          '이중 부정'],
  ];

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;
    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title">${C.summary.intro}</div>
      <div class="cs-intro-box">
        <strong>부울 대수(Boolean Algebra)</strong> — 0과 1 두 값만 사용하는 논리 대수. 조지 부울이 1854년 창안.<br>
        <strong>논리게이트(Logic Gate)</strong> — 부울 대수 연산을 물리적으로 구현한 전자 회로 소자.<br>
        논리회로 설계 흐름: 진리표 → 부울 식 → 간소화(카르노맵) → 게이트 구현
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">기본 논리게이트 8종</div>
      <div class="bc-gate-grid">
        ${GATES.map(g => `
          <div class="bc-gate-card">
            <div class="bc-gate-name">${g.name}</div>
            <div class="bc-gate-expr">${g.expr}</div>
            <div class="bc-gate-desc">${g.desc}</div>
            <div style="margin-top:6px;font-size:10px;color:var(--text-tertiary);">${g.tt.join(' / ')}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">
        부울 대수 법칙
        <span style="font-size:11px;font-weight:400;color:var(--text-tertiary);margin-left:8px;">19가지 핵심 공식</span>
      </div>
      <div>
        ${LAWS.map(([expr, name], i) => `
          <div class="bc-law-row">
            <span class="bc-law-num">${i+1}</span>
            <span class="bc-law-expr">${expr}</span>
            <span class="bc-law-name">${name}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">카르노맵 (Karnaugh Map)</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[
          ['목적', '복잡한 부울 식을 시각적으로 최소화(SOP/POS 형태로 간소화)하는 도구'],
          ['그룹 규칙', '2의 거듭제곱(1, 2, 4, 8, …) 크기로만 묶을 수 있다. 크게 묶을수록 간소화 효과가 크다.'],
          ["Don't care (X)", "출력이 정해지지 않은 조건. 간소화에 유리하면 1, 불리하면 0으로 자유롭게 처리한다."],
          ['경계 연결', '카르노맵은 위-아래, 좌-우 경계가 연결된 도넛(토러스) 구조로 경계 셀끼리 묶을 수 있다.'],
        ].map(([title, desc], i) => `
          <div class="cs-num-row">
            <span class="cs-num cs-num-md cs-num-prim">${i+1}</span>
            <div><strong>${title}</strong> — ${desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">드모르간 법칙 (핵심)</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[
          ["(x + y)' = x'·y'", 'OR의 부정 = 각각 부정 후 AND'],
          ["(x · y)' = x' + y'", 'AND의 부정 = 각각 부정 후 OR'],
        ].map(([expr, desc]) => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-surface);border-radius:var(--radius-sm);">
            <code style="font-family:'JetBrains Mono','Fira Code',monospace;font-size:13px;font-weight:700;color:${CSS_ACCENT};white-space:nowrap;">${expr}</code>
            <span style="font-size:12px;color:var(--text-secondary);">${desc}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay || '논술 답안 구조'}</div>
      ${CS.renderEssayGroups([
        { label:'논리게이트 서술 순서', items:['게이트명 → 부울 식 → 진리표 → 특징·활용'] },
        { label:'카르노맵 풀이 순서', items:['진리표 작성 → 카르노맵 배치 → 2의 거듭제곱으로 그룹화 → SOP 식 도출'] },
        { label:'드모르간 적용 순서', items:['전체 부정 → 연산자 교환(AND↔OR) → 각 변수 부정'] },
      ])}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check || '체크 포인트'}</div>
      ${CS.renderCheckCards([
        { type:'danger',  text:`XOR vs XNOR — XOR은 입력이 <strong>다를 때</strong> 1, XNOR는 입력이 <strong>같을 때</strong> 1. 시험에서 혼동하기 쉬운 포인트.` },
        { type:'danger',  text:`카르노맵 그룹 크기: 3개, 5개는 불가. 반드시 1, 2, 4, 8(2의 거듭제곱)이어야 함.` },
        { type:'success', text:`NAND·NOR = 범용 게이트(Universal Gate). 각각 하나만으로 AND·OR·NOT 모두 구현 가능.` },
        { type:'success', text:`드모르간 핵심: (x+y)' = x'y' / (xy)' = x'+y' — 부호를 반전하고 연산자를 교환.` },
      ])}
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `2010중1 · 2014중A · 2021중B · 2022중A
        <span class="cs-history-note">카르노맵·드모르간·XOR 활용이 반복 출제. 게이트 진리표 + 식 변환 완벽 암기 필수.</span>`,
      freqItems: [
        '드모르간 법칙 적용 — (x+y)\'=x\'y\', (xy)\'=x\'+y\' [2014중A]',
        '카르노맵으로 부울 식 최소 SOP 간소화 [2010중1]',
        '카르노맵 4변수 don\'t care 처리 [2010중1]',
        'NAND·NOR 범용 게이트 — 임의의 논리함수 구현 가능',
        'XOR 게이트 활용 — 패리티 비트 생성·검사 [2021중B]',
      ],
      normalItems: [
        '4-세그먼트 LED 제어 회로: 진리표 → 카르노맵 → SOP [2022중A]',
        '반가산기(Half Adder): S=A⊕B, C=A·B',
        '전가산기(Full Adder): 반가산기 2개 + OR 게이트',
        '2의 보수 덧셈기 설계',
        'XOR vs XNOR 진리표 구분',
      ],
    });
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox', q:"드모르간 법칙에 의해 (A+B)' = A'·B' 이다.", answer:'O', explain:"(A+B)' = A'B' — OR의 부정은 각각 부정 후 AND. (AB)' = A'+B' — AND의 부정은 각각 부정 후 OR." },
    { type:'ox', q:'XOR 게이트는 두 입력이 같을 때 1을 출력한다.', answer:'X', explain:'XOR(배타적 OR)은 두 입력이 서로 다를 때 1. 같을 때 1이 되는 것은 XNOR.' },
    { type:'ox', q:'NAND 게이트 하나만으로 AND·OR·NOT을 모두 구현할 수 있다.', answer:'O', explain:'NAND와 NOR은 범용 게이트(Universal Gate). 드모르간 법칙으로 모든 논리함수 구현 가능.' },
    { type:'ox', q:"부울 대수에서 흡수 법칙은 x + xy = x 이다.", answer:'O', explain:'흡수 법칙: x+xy=x (OR), x(x+y)=x (AND). 식을 간소화할 때 자주 사용.' },
    { type:'ox', q:"카르노맵에서 don't care(x)는 반드시 0으로 처리해야 한다.", answer:'X', explain:"Don't care는 간소화에 유리하면 1로, 불리하면 0으로 자유롭게 사용 가능." },
    { type:'fill', q:'두 입력이 서로 다를 때만 1을 출력하는 게이트는 (   ) 이다.', answer:'XOR (배타적 OR)', explain:'XOR: A⊕B. 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0. 패리티 비트 생성에 활용.' },
    { type:'fill', q:'카르노맵에서 그룹 크기는 반드시 (   )의 거듭제곱이어야 한다.', answer:'2 (1, 2, 4, 8, …)', explain:"2의 거듭제곱(2⁰=1, 2¹=2, 2²=4, 2³=8 …) 크기로만 묶어야 변수가 소거됨. 크게 묶을수록 간소화 효과 큼." },
    { type:'fill', q:'NAND와 NOR을 (   ) 게이트라고 한다.', answer:'범용 게이트 (Universal Gate)', explain:'NAND나 NOR 하나만으로 AND·OR·NOT을 모두 구현할 수 있어서 범용 게이트라 부름.' },
    { type:'mc', q:"(A·B·C)' 를 드모르간 법칙으로 올바르게 변환한 것은?", options:["A'·B'·C'", "A'+B'·C'", "A'+B'+C'", "(A'+B')·C'"], answer:2, explain:"드모르간: (A·B·C)' = A'+B'+C'. AND의 부정은 각 변수를 부정한 후 OR로 연결." },
    { type:'mc', q:'반가산기(Half Adder)의 합(Sum) 출력을 나타내는 부울 식은?', options:['S = A + B', 'S = A · B', 'S = A ⊕ B', "(S = (A+B)'"], answer:2, explain:'반가산기: S = A⊕B (XOR), C = A·B (AND). 전가산기는 반가산기 2개 + OR 1개로 구성.' },
  ];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'boole'); }

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
