/**
 * 부울 대수·논리게이트 — 탭 콘텐츠
 * 기본서 완전정복 컴퓨터구조 기반 / SITE_CONFIG 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }

  const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
    summary: { intro:'개요', learning:'학습자의 학습 과정', teacherRole:'교사의 역할 & 수업 방법', stageChart:'단계별 특징 개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
    quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식', btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  const ACCENT = '#6058C0'; // 컴퓨터구조 인디고
  const BG     = '#EAE8F8';
  const FONT   = 'var(--font-body, var(--font-main))';

  if (!document.getElementById('boole-content-style')) {
    const s = document.createElement('style');
    s.id = 'boole-content-style';
    s.textContent = `
      .bc-table { width:100%; border-collapse:collapse; font-size:12px; font-family:${FONT}; }
      .bc-table th { padding:7px 10px; background:${BG}; color:${ACCENT}; font-weight:700; border-bottom:2px solid ${ACCENT}; text-align:center; }
      .bc-table td { padding:6px 10px; text-align:center; border-bottom:1px solid var(--border-light,rgba(0,0,0,.08)); color:var(--text-primary,#2C2825); font-family:'JetBrains Mono','Fira Code',monospace; }
      .bc-table tr:nth-child(even) td { background:var(--bg-page,#faf9f7); }
      .bc-gate-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:10px; }
      .bc-gate-card { background:var(--bg-surface,#F0EDE8); border-radius:10px; padding:12px 14px; }
      .bc-gate-name { font-size:13px; font-weight:700; color:${ACCENT}; margin-bottom:4px; }
      .bc-gate-expr { font-family:'JetBrains Mono','Fira Code',monospace; font-size:12px; color:var(--text-secondary,#6B6560); margin-bottom:6px; }
      .bc-gate-desc { font-size:11px; color:var(--text-secondary,#6B6560); line-height:1.5; }
      .bc-law-grid { display:flex; flex-direction:column; gap:4px; }
      .bc-law-row { display:flex; gap:8px; align-items:flex-start; padding:6px 10px; background:var(--bg-surface,#F0EDE8); border-radius:6px; font-size:12px; }
      .bc-law-num { color:${ACCENT}; font-weight:700; min-width:20px; flex-shrink:0; font-family:${FONT}; }
      .bc-law-expr { font-family:'JetBrains Mono','Fira Code',monospace; flex:1; color:var(--text-primary,#2C2825); }
      .bc-law-name { font-size:10px; color:var(--text-tertiary,#A09890); min-width:60px; text-align:right; flex-shrink:0; }
      .bc-kmap { font-family:'JetBrains Mono','Fira Code',monospace; font-size:12px; }
      .bc-point-tag { display:inline-block; font-size:10px; font-weight:700; padding:1px 7px; border-radius:4px; margin-right:6px; }
      @media(max-width:560px) {
        .bc-gate-grid { grid-template-columns:1fr 1fr; }
      }
    `;
    document.head.appendChild(s);
  }

  function parseExamItem(text) {
    const match = text.match(/\[(.+?)\]/);
    if (!match) return `<span style="color:var(--text-primary,#2C2825);">${text}</span>`;
    const tag = match[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="bc-point-tag" style="background:var(--bg-surface,#F0EDE8);color:${ACCENT};font-weight:700;">${tag}</span><span style="color:var(--text-primary,#2C2825);">${body}</span>`;
  }

  function sortExamItems(items) {
    return [...items].sort((a, b) => {
      const aHas = /\[.+?\]/.test(a), bHas = /\[.+?\]/.test(b);
      if (!aHas && bHas) return -1;
      if (aHas && !bHas) return 1;
      return 0;
    });
  }

  /* ── 1. 핵심정리 ─────────────────────────── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    const gates = [
      { name:'AND', expr:'Y = A · B', desc:'두 입력이 모두 1일 때만 1 출력. 논리곱.', tt:['0·0=0','0·1=0','1·0=0','1·1=1'] },
      { name:'OR',  expr:'Y = A + B', desc:'입력 중 하나 이상 1이면 1 출력. 논리합.', tt:['0+0=0','0+1=1','1+0=1','1+1=1'] },
      { name:'NOT', expr:"Y = A'", desc:'입력을 반전(보수). 인버터.', tt:["0→1","1→0"] },
      { name:'NAND', expr:"Y = (A·B)'", desc:'AND의 반전. 0이 하나라도 있으면 1.', tt:['0·0→1','0·1→1','1·0→1','1·1→0'] },
      { name:'NOR',  expr:"Y = (A+B)'", desc:'OR의 반전. 둘 다 0일 때만 1.', tt:['0+0→1','0+1→0','1+0→0','1+1→0'] },
      { name:'XOR',  expr:'Y = A ⊕ B', desc:'두 입력이 서로 다를 때만 1. 배타적 OR.', tt:['0⊕0=0','0⊕1=1','1⊕0=1','1⊕1=0'] },
      { name:'XNOR', expr:"Y = (A⊕B)'", desc:'XOR의 반전. 두 입력이 같을 때만 1.', tt:['0⊕0→1','0⊕1→0','1⊕0→0','1⊕1→1'] },
      { name:'BUFFER', expr:'Y = A', desc:'입력을 그대로 출력. 신호 증폭·지연용.', tt:['0→0','1→1'] },
    ];

    const laws = [
      ['x + 0 = x',      '(1) 항등원'],
      ['x · 0 = 0',      '(2) 소멸'],
      ['x + 1 = 1',      '(3) 소멸'],
      ['x · 1 = x',      '(4) 항등원'],
      ['x + x = x',      '(5) 멱등'],
      ['x · x = x',      '(6) 멱등'],
      ["x + x' = 1",     "(7) 보수"],
      ["x · x' = 0",     "(8) 보수"],
      ['x + y = y + x',  '(9) 교환'],
      ['xy = yx',        '(10) 교환'],
      ['x+(y+z)=(x+y)+z','(11) 결합'],
      ['x(yz)=(xy)z',    '(12) 결합'],
      ['x(y+z)=xy+xz',   '(13) 분배'],
      ['x+yz=(x+y)(x+z)','(14) 분배'],
      ["(x+y)'=x'y'",    '(15) 드모르간'],
      ["(xy)'=x'+y'",    '(16) 드모르간'],
      ['x+xy=x',         '(17) 흡수'],
      ['x(x+y)=x',       '(18) 흡수'],
      ["(x')'=x",        '(19) 이중 부정'],
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.intro}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.85;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong>부울 대수(Boolean Algebra)</strong> — 0과 1 두 값만 사용하는 논리 대수. 조지 부울이 1854년 창안.<br>
        <strong>논리게이트(Logic Gate)</strong> — 부울 대수 연산을 물리적으로 구현한 전자 회로 소자.<br>
        논리회로 설계의 기초: 진리표 → 부울 식 → 간소화(카르노맵) → 게이트 구현
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">기본 논리게이트 8종</div>
      <div class="bc-gate-grid">
        ${gates.map(g => `
          <div class="bc-gate-card">
            <div class="bc-gate-name">${g.name}</div>
            <div class="bc-gate-expr">${g.expr}</div>
            <div class="bc-gate-desc">${g.desc}</div>
            <div style="margin-top:6px;font-size:10px;color:var(--text-tertiary,#A09890);">${g.tt.join(' / ')}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">부울 대수 법칙 19개 (★ 암기 필수)</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
        ${laws.map(([expr, name]) => `
          <div class="bc-law-row">
            <span class="bc-law-expr">${expr}</span>
            <span class="bc-law-name">${name}</span>
          </div>`).join('')}
      </div>
      <div style="margin-top:10px;background:var(--bg-surface,#F0EDE8);border-radius:8px;padding:10px 14px;font-size:12px;font-family:${FONT};line-height:1.7;color:var(--text-primary,#2C2825);">
        <strong style="color:${ACCENT};">드모르간 법칙 핵심</strong><br>
        <span style="font-family:'JetBrains Mono','Fira Code',monospace;">(x+y)' = x'y'</span> — OR의 부정 = 각각 부정 후 AND<br>
        <span style="font-family:'JetBrains Mono','Fira Code',monospace;">(xy)' = x'+y'</span> — AND의 부정 = 각각 부정 후 OR
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">카르노맵 (Karnaugh Map)</div>
      <div style="font-family:${FONT};font-size:13px;line-height:1.8;color:var(--text-primary,#2C2825);">
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[
            ['목적', '진리표에서 부울 식을 최소항(SOP) 또는 최대항(POS)으로 간소화하는 도구'],
            ['원리', '인접한 셀끼리 묶으면 변수가 소거됨. 그룹 크기는 2의 거듭제곱(1·2·4·8·…)'],
            ['규칙 ①', '1인 셀을 최대한 크게 묶는다 (가능한 한 큰 2ⁿ 그룹)'],
            ['규칙 ②', '지도의 경계(위-아래, 좌-우)는 서로 인접으로 취급'],
            ["Don't Care (x)", '출력이 0이든 1이든 무관한 경우. 간소화에 유리하게 1로 사용 가능'],
            ['SOP', '최소항의 합(Sum Of Products): 1인 셀을 묶어 AND → OR'],
            ['POS', '최대항의 곱(Product Of Sums): 0인 셀을 묶어 OR → AND'],
          ].map(([k, v]) => `
            <div style="display:flex;gap:10px;padding:8px 12px;background:var(--bg-surface,#F0EDE8);border-radius:8px;">
              <span style="color:${ACCENT};font-weight:700;min-width:80px;flex-shrink:0;">${k}</span>
              <span style="color:var(--text-primary,#2C2825);">${v}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};font-size:13px;">
        ${[
          { label: '논리회로 설계 절차', items: ['요구사항 → 진리표 작성', '카르노맵으로 부울 식 간소화', '게이트 회로도 구현'] },
          { label: '드모르간 활용', items: ['NAND만으로 AND·OR·NOT 구현 가능 (범용 게이트)', 'NOR만으로도 AND·OR·NOT 구현 가능 (범용 게이트)'] },
        ].map(({ label, items }) => `
          <div style="padding:10px 14px;background:var(--bg-surface,#F0EDE8);border-radius:8px;line-height:1.8;">
            <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.04em;margin-bottom:6px;">${label}</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              ${items.map((item, i) => `
                <div style="display:flex;gap:7px;align-items:flex-start;">
                  <span style="background:#A09890;color:white;border-radius:50%;min-width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">${i+1}</span>
                  <span style="color:var(--text-primary,#2C2825);">${item}</span>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};font-size:12px;">
        ${[
          ['혼동 주의', '#D05840', 'XOR vs XNOR: XOR은 두 입력이 <strong>다를 때</strong> 1, XNOR은 <strong>같을 때</strong> 1'],
          ['혼동 주의', '#D05840', 'NAND와 NOR은 각각 AND·OR의 부정이므로, 드모르간 적용 시 연산자가 바뀜'],
          ['핵심 암기', '#2D8A6A', 'NAND·NOR은 범용 게이트 — 이 하나로 모든 논리함수 구현 가능'],
          ['핵심 암기', '#2D8A6A', "카르노맵 그루핑 규칙: 반드시 2ⁿ개씩, 사각형 모양, 경계 래핑 허용"],
          ['핵심 암기', '#2D8A6A', "드모르간: (A+B)' = A'B', (AB)' = A'+B'"],
        ].map(([label, color, text]) => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;border-left:3px solid ${color};">
            <span style="display:inline-block;background:${color};color:white;font-size:10px;font-weight:700;padding:1px 8px;border-radius:20px;margin-right:8px;">${label}</span>
            <span style="color:var(--text-primary,#2C2825);">${text}</span>
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── 2. 기출 포인트 ──────────────────────── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const freqItems = [
      '드모르간 법칙 적용 — (x+y)\'=x\'y\', (xy)\'=x\'+y\' [2014중A]',
      '카르노맵으로 부울 식 최소 SOP 간소화 [2010중1]',
      '카르노맵 4변수 don\'t care 처리 [2010중1]',
      'NAND·NOR 범용 게이트 — 임의의 논리함수 구현 가능',
      'XOR 게이트 활용 — 패리티 비트 생성·검사 [2021중B]',
    ];
    const normalItems = [
      '4-세그먼트 LED 제어 회로: 진리표 → 카르노맵 → SOP [2022중A]',
      '반가산기(Half Adder): S=A⊕B, C=A·B',
      '전가산기(Full Adder): 반가산기 2개 + OR 게이트',
      '2의 보수 덧셈기 설계',
      'XOR vs XNOR 진리표 구분',
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.history}</div>
      <div style="background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:2;color:var(--text-primary,#2C2825);font-family:${FONT};">
        2010중1 · 2014중A · 2021중B · 2022중A<br>
        <span style="font-size:11px;color:var(--text-tertiary,#A09890);">카르노맵·드모르간·XOR 활용이 반복 출제. 게이트 진리표 + 식 변환 완벽 암기 필수.</span>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6058C0;">${C.exam.freq}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${sortExamItems(freqItems).map(item => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;border-left:2px solid #6058C0;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#8A7010;">${C.exam.normal}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${sortExamItems(normalItems).map(item => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;border-left:2px solid #A09020;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── 3. 리마인드 ─────────────────────────── */
  const QUIZ_DATA = [
    { type:'ox', q:"드모르간 법칙에 의해 (A+B)' = A'·B' 이다.", answer:'O', explain:"(A+B)' = A'B' — OR의 부정은 각각 부정 후 AND. (AB)' = A'+B' — AND의 부정은 각각 부정 후 OR." },
    { type:'ox', q:'XOR 게이트는 두 입력이 같을 때 1을 출력한다.', answer:'X', explain:'XOR(배타적 OR)은 두 입력이 서로 다를 때 1. 같을 때 1이 되는 것은 XNOR.' },
    { type:'ox', q:'NAND 게이트 하나만으로 AND·OR·NOT을 모두 구현할 수 있다.', answer:'O', explain:'NAND와 NOR은 범용 게이트(Universal Gate). 드모르간 법칙으로 모든 논리함수 구현 가능.' },
    { type:'ox', q:"부울 대수에서 흡수 법칙은 x + xy = x 이다.", answer:'O', explain:'흡수 법칙: x+xy=x (OR), x(x+y)=x (AND). 식을 간소화할 때 자주 사용.' },
    { type:'ox', q:'카르노맵에서 don\'t care(x)는 반드시 0으로 처리해야 한다.', answer:'X', explain:"Don't care는 간소화에 유리하면 1로, 불리하면 0으로 자유롭게 사용 가능." },
    { type:'fill', q:'두 입력이 서로 다를 때만 1을 출력하는 게이트는 (   ) 이다.', answer:'XOR (배타적 OR)', explain:'XOR: A⊕B. 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0. 패리티 비트 생성에 활용.' },
    { type:'fill', q:'카르노맵에서 그룹 크기는 반드시 (   )의 배수여야 한다.', answer:'2의 거듭제곱 (1, 2, 4, 8, …)', explain:'1·2·4·8·16… 크기로만 묶어야 변수가 소거됨. 크게 묶을수록 간소화 효과 큼.' },
    { type:'fill', q:'NAND와 NOR을 (   ) 게이트라고 한다.', answer:'범용 게이트 (Universal Gate)', explain:'NAND나 NOR 하나만으로 AND·OR·NOT을 모두 구현할 수 있어서 범용 게이트라 부름.' },
    { type:'mc', q:'다음 중 부울 대수의 드모르간 법칙으로 올바른 것은?', options:["(A+B)' = A'+B'", "(A·B)' = A'·B'", "(A+B)' = A'·B'", "(A·B)' = A'+B' (이것도 틀림)", 'A와 C 모두'], answer:2, explain:"드모르간 법칙: (A+B)'=A'B' / (AB)'=A'+B'. OR의 부정은 AND로, AND의 부정은 OR로 바뀌고 각 변수는 보수를 취함." },
    { type:'mc', q:'반가산기(Half Adder)의 합(Sum) 출력을 나타내는 부울 식은?', options:['S = A + B', "S = A · B", "S = A ⊕ B", "S = (A+B)'", "S = A' + B'"], answer:2, explain:'반가산기: S = A⊕B (XOR), C = A·B (AND). 전가산기는 반가산기 2개 + OR 1개로 구성.' },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;
    let state = QUIZ_DATA.map(() => ({ revealed: false, selected: null }));

    function renderAll() {
      el.innerHTML = `
      <div class="detail-section">
        <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.quiz.title} — 총 ${QUIZ_DATA.length}문항</div>
        <div style="font-size:12px;color:var(--text-tertiary,#A09890);margin-bottom:16px;font-family:${FONT};">답을 생각한 후 버튼을 눌러 확인하세요.</div>
        ${QUIZ_DATA.map((q, i) => {
          const s = state[i];
          let qBody = '';
          if (q.type === 'ox') {
            qBody = `<div style="display:flex;gap:8px;margin-top:10px;">
              ${['O','X'].map(ans => {
                const isSel=s.selected===ans, isCorr=q.answer===ans;
                let border='1.5px solid var(--border-light,#e0ddd8)', bg='var(--bg-white,#fff)', color='var(--text-primary,#2C2825)';
                if (s.revealed&&isSel) { border=`1.5px solid ${isCorr?'#4EA87A':'#D05840'}`; bg=isCorr?'#EBF5EA':'#FDECEA'; color=isCorr?'#1E5A3C':'#A83222'; }
                else if (isSel) { border=`1.5px solid ${ACCENT}`; bg='var(--bg-surface,#f7f4f0)'; }
                return `<button onclick="booleQuizOX(${i},'${ans}')" style="flex:1;padding:9px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">${ans}</button>`;
              }).join('')}
            </div>`;
          } else if (q.type === 'fill') {
            qBody = `<div style="margin-top:10px;">
              <button onclick="booleQuizReveal(${i})" style="width:100%;padding:9px;border-radius:8px;border:1.5px solid ${s.revealed?ACCENT:'var(--border-light,#e0ddd8)'};background:${s.revealed?BG:'var(--bg-white,#fff)'};font-size:12px;font-weight:600;cursor:pointer;color:${s.revealed?ACCENT:'var(--text-secondary,#6B6560)'};font-family:inherit;">${s.revealed?C.quiz.btnRevealed:C.quiz.btnReveal}</button>
            </div>`;
          } else {
            qBody = `<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
              ${q.options.map((opt, oi) => {
                let border='1.5px solid var(--border-light,#e0ddd8)', bg='var(--bg-white,#fff)', color='var(--text-primary,#2C2825)';
                if (s.revealed) {
                  if (oi===q.answer) { border=`1.5px solid ${ACCENT}`; bg=BG; color=ACCENT; }
                  else if (s.selected===oi) { border='1.5px solid #D05840'; bg='#FDECEA'; color='#A83222'; }
                } else if (s.selected===oi) { border=`1.5px solid ${ACCENT}`; bg='var(--bg-surface,#f7f4f0)'; }
                return `<button onclick="booleQuizMC(${i},${oi})" style="text-align:left;padding:9px 12px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:12px;cursor:pointer;font-family:inherit;line-height:1.5;"><span style="font-weight:700;margin-right:6px;">${oi+1}.</span>${opt}</button>`;
              }).join('')}
            </div>`;
          }
          const explain = s.revealed ? `
            <div style="margin-top:10px;background:${BG};border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;color:var(--text-primary,#2C2825);border-left:3px solid ${ACCENT};font-family:${FONT};">
              <strong style="color:${ACCENT};">${C.quiz.explainLabel}</strong> ${q.explain}
            </div>` : '';
          const typeLabel = q.type==='ox'?C.quiz.typeOX:q.type==='fill'?C.quiz.typeFill:C.quiz.typeMC;
          return `
          <div style="background:var(--bg-white,#fff);border:1px solid var(--border-light,#e8e4de);border-radius:12px;padding:16px;margin-bottom:12px;">
            <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);margin-bottom:6px;font-family:${FONT};">${typeLabel}</div>
            <div style="font-size:13px;font-weight:600;color:var(--text-primary,#2C2825);line-height:1.6;font-family:${FONT};">${i+1}. ${q.q}</div>
            ${qBody}${explain}
          </div>`;
        }).join('')}
        <div style="text-align:center;margin-top:8px;">
          <button onclick="booleQuizReset()" style="padding:10px 28px;border-radius:20px;border:1.5px solid var(--border-light,#e0ddd8);background:var(--bg-surface,#F0EDE8);font-size:13px;cursor:pointer;color:var(--text-secondary,#6B6560);font-family:inherit;">${C.quiz.btnReset}</button>
        </div>
      </div>`;
    }

    window.booleQuizOX     = (i,ans)=> { state[i].selected=ans; state[i].revealed=true; renderAll(); };
    window.booleQuizReveal = i      => { state[i].revealed=true; renderAll(); };
    window.booleQuizMC     = (i,oi) => { state[i].selected=oi; state[i].revealed=true; renderAll(); };
    window.booleQuizReset  = ()     => { state=QUIZ_DATA.map(()=>({revealed:false,selected:null})); renderAll(); };
    renderAll();
  }

  /* ── 초기화 ──────────────────────────────── */
  function init() {
    renderSummary();
    renderExam();
    renderQuiz();
  }

  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    const observer = new MutationObserver(() => {
      if ($('tab-summary') && $('tab-exam') && $('tab-quiz')) {
        observer.disconnect(); init();
      }
    });
    observer.observe(document.getElementById('main')||document.body, {childList:true,subtree:true});
    if ($('tab-summary')) init();
  }
})();
