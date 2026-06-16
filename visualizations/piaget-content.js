/**
 * 피아제 인지발달이론 — 탭 콘텐츠
 * 원페이지 교육학 기반 / SITE_CONFIG + CS(ui.js) 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', learning:'학습자의 학습 과정', teacherRole:'교사의 역할 & 수업 방법', stageChart:'단계별 특징 개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };

  /* ── 색상 (variables.css 토큰 참조) ── */
  const ACCENT = 'var(--c-edu-psych-accent, #4EA87A)';
  const CSS_ACCENT = '#4EA87A';

  /* ── 개념별 최소 CSS (테이블 모바일 전환만) ── */
  if (!document.getElementById('piaget-content-style')) {
    const s = document.createElement('style');
    s.id = 'piaget-content-style';
    s.textContent = `
      .pc-table-hide { display:none; }
      @media(max-width:560px) {
        .pc-table-show { display:none !important; }
        .pc-table-hide { display:flex !important; flex-direction:column; gap:8px; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── 데이터 ── */
  const stageRows = [
    ['감각운동기', '~2세', '대상영속성 개념 발달', '사고능력 없음'],
    ['전조작기', '2~7세', '정신적 능력 발달', '상징적 사고 / 물활론적 사고 / 자기중심적 사고 / 전개념 발달'],
    ['구체적조작기', '7~11세', '경험할 수 있는 것만 논리적 사고', '보존개념 / 탈중심화 / 가역성 / 분류(서열)능력 / 보상성'],
    ['형식적조작기', '12세~', '가설적·추상적 개념을 논리적 사고', '추상적(반성적추상화) / 자기중심적(엘킨드) / 명제적 / 가설연역적 / 조합적 사고'],
  ];
  const compareRows = [
    ['지식',     '인지적 구성주의',           '사회적 구성주의'],
    ['학습자',   '개별적 주체',               '사회적 존재'],
    ['발달',     '발달이 학습에 선행',         '학습이 발달에 선행'],
    ['평가',     '현재 발달 평가 (정적평가)',   '잠재적 발달 평가 (역동적 평가)'],
    ['교사 도움','교사 도움 no',              '교사 도움 ok'],
  ];
  const commonPoints = [
    '지식관: 구성주의 — 지식은 외부에서 주어지는 것이 아니라 학습자가 스스로 구성한다.',
    '학습자관: 능동적 주체 — 학습자는 수동적 수용자가 아니라 능동적으로 의미를 만든다.',
    '발달관: 환경과의 상호작용 — 지식은 학습자와 환경 사이의 상호작용을 통해 습득된다.',
  ];

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title">${C.summary.intro}</div>
      <div class="cs-intro-box">
        <strong>피아제(J. Piaget, 1896~1980)</strong> — 스위스 아동심리학자.<br>
        학습자는 기본적으로 인지구조를 가지고 있으며 능동적이다.<br>
        타고난 인지 기능으로 물리적 환경과 상호작용하여 지식을 구성한다. → <strong>인지적 구성주의</strong>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">${C.summary.learning}</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[
          '학습자는 기본적으로 인지구조를 가지고 있으며 능동적이다. 타고난 인지 기능으로 물리적 환경과 상호작용하여 지식을 구성한다. <strong>(= 인지적 구성주의)</strong>',
          `자신의 기존 도식에 새로운 지식이 들어올 때 같으면 평형화 상태를 유지하고, 다르면 <strong style="color:${CSS_ACCENT};">불평형</strong> 상태가 된다. 불평형 해소를 위해 <strong style="color:${CSS_ACCENT};">평형 욕구</strong>가 생기고, <strong style="color:${CSS_ACCENT};">동화</strong>(기존 도식에 포함) 또는 <strong style="color:${CSS_ACCENT};">조절</strong>(도식 수정)을 통해 인지발달(인지적 평형화)이 일어난다.`,
        ].map((text, i) => `
          <div class="cs-num-row">
            <span class="cs-num cs-num-md cs-num-prim">${i+1}</span>
            <div>${text}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">${C.summary.teacherRole}</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[
          ['발견학습 제공', '학습자는 능동적으로 학습할 수 있으므로 스스로 관찰하고 탐구할 수 있는 수업을 제공한다. 단순한 설명식 수업은 피해야 한다.'],
          ['인지적 불균형 유발', '학습자의 인지적 불균형(불평형)을 유도하기 위해 도전감 있는 과제를 제공한다. 단, 너무 어려운 과제는 안 된다.'],
          ['인지발달 수준에 기초한 교육', '학습자가 수업 내용을 이해하는 데 필요한 인지구조가 없으면 수업은 무의미하므로 선행학습은 가능한 피해야 한다.'],
        ].map(([title, desc], i) => `
          <div class="cs-num-row">
            <span class="cs-num cs-num-md cs-num-prim">${i+1}</span>
            <div><strong>${title}</strong> — ${desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">${C.summary.stageChart || '단계별 특징 개요'}</div>
      <!-- 테이블 (≥560px) -->
      <div class="cs-table-wrap pc-table-show">
        <table class="cs-table">
          <thead>
            <tr>${['단계','연령','핵심 성취','주요 특징'].map(h=>`<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${stageRows.map((r,i)=>`
              <tr>
                <td class="cs-td-key">${r[0]}</td>
                <td style="white-space:nowrap;color:var(--text-secondary);">${r[1]}</td>
                <td class="cs-td-accent">${r[2]}</td>
                <td style="color:var(--text-secondary);">${r[3]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <!-- 카드 (<560px) -->
      <div class="pc-table-hide">
        ${stageRows.map((r,i)=>`
          <div style="background:var(--bg-surface);border-radius:var(--radius-sm);padding:10px 14px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-weight:700;color:var(--text-primary);">${r[0]}</span>
              <span style="color:var(--text-tertiary);font-size:11px;">${r[1]}</span>
            </div>
            <div style="color:var(--subject-accent,${CSS_ACCENT});font-weight:600;margin-bottom:2px;">${r[2]}</div>
            <div style="color:var(--text-secondary);">${r[3]}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">피아제 vs 비고츠키</div>
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:${CSS_ACCENT};letter-spacing:.04em;margin-bottom:8px;">공통점</div>
        ${commonPoints.map((pt, i) => `
          <div class="cs-num-row" style="background:var(--bg-white);border:1.5px solid ${CSS_ACCENT}44;">
            <span class="cs-num cs-num-sm cs-num-prim">${i+1}</span>
            <div style="color:var(--text-primary);line-height:1.6;">${pt}</div>
          </div>`).join('')}
      </div>
      <div style="font-size:11px;font-weight:700;color:#C05808;letter-spacing:.04em;margin-bottom:8px;">차이점</div>
      <div class="cs-table-wrap pc-table-show">
        <table class="cs-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>피아제</th>
              <th style="color:#C05808;">비고츠키</th>
            </tr>
          </thead>
          <tbody>
            ${compareRows.map(r=>`
              <tr>
                <td class="cs-td-key">${r[0]}</td>
                <td style="color:var(--text-secondary);">${r[1]}</td>
                <td style="color:var(--text-secondary);">${r[2]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="pc-table-hide">
        ${compareRows.map(r=>`
          <div style="background:var(--bg-surface);border-radius:var(--radius-sm);padding:10px 14px;font-size:12px;">
            <div style="font-weight:700;color:var(--text-primary);margin-bottom:4px;">${r[0]}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <span style="background:var(--subject-bg);color:${CSS_ACCENT};padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;">피아제</span>
              <span style="color:var(--text-secondary);">${r[1]}</span>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:3px;">
              <span style="background:#FFF0E8;color:#C05808;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;">비고츠키</span>
              <span style="color:var(--text-secondary);">${r[2]}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      ${CS.renderEssayGroups([
        { label:'학습과정 2가지',   items:['인지적 구성주의', '동화·조절을 통한 평형화'] },
        { label:'교사역할 3가지',   items:['발견학습 제공', '인지적 불균형 유발', '인지발달 수준 고려'] },
        { label:'피아제 비판',      items:['외적 행동 변화만 강조 → 내면적 변화 확인 어려움'] },
        { label:'비고츠키 연결',    items:['피아제 불평형(개인 내적) ↔ 비고츠키 비계(사회적 상호작용)'] },
      ])}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      ${CS.renderCheckCards([
        { type:'danger',  text:'피아제의 불평형 = 사회적 상호작용으로 해소" → X. 개인 내적 과정(동화·조절)으로 해소됨. 사회적 상호작용은 비고츠키.' },
        { type:'danger',  text:'"반성적 추상화 = 메타인지" → X. 반성적 추상화는 형식적조작기의 추상사고 능력.' },
        { type:'success', text:'형식적조작기 특징 5가지: 추상적·자기중심적(엘킨드)·명제적·가설연역적·조합적 사고' },
      ])}
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `2000중 · 2003중 · 2005중·초 · 2006초 · 2007초 · 2008중 · 2009초 · 2010초·중 · 2011중
        <span class="cs-history-note">거의 매년 출제. 전 단계 특징 + 핵심개념(동화·조절·평형화) 완벽 암기 필수.</span>`,
      freqItems: [
        '불평형(disequilibrium) — 오류 상황에 직면할 때 일어남. 너무 쉽거나 어렵지 않아야 함 [2011중]',
        '동화(assimilation) — 고양이를 보고 "강아지!"라고 함 [2006초]',
        '보존 개념 획득 순서: 수(6~7) → 양(7~8) → 무게(9~10) → 부피(11~12)',
        '전조작기 특징: 자기중심성, 상징적 사고, 물활론 [2007초]',
        '구체적조작기 특징: 탈자기중심화, 분류·서열화, 구체적 사물에 제한 [2007초]',
        '반성적 추상화 — 형식적조작기 핵심. 구체물 없이 추상 추론 가능 [2010중]',
      ],
      normalItems: [
        '감각운동기 — 사고능력 없음. 대상영속성. 순환반응 1·2·3차 [2010초]',
        '구체적조작기 교수법 — 시청각 자료·실물 활용, 직접 경험 중심 [2003중]',
        '형식적조작기 — 가설연역적·명제적·반성적 추상화 사고 [2000중, 2010중]',
        '전조작기 분류 오류 — 장미꽃 vs 꽃 포함관계 이해 못함 [2005초]',
        '피아제 이론 한계 — 사회적 상호작용 경시. 불평형은 개인 내적 과정 [2008중]',
      ],
    });
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox', q:'피아제에 따르면, 교사가 학습자보다 앞선 선행학습은 인지발달에 도움이 된다.', answer:'X', explain:'학습자의 인지발달 수준에 기초한 교육 강조. 인지구조가 준비 안 된 수업은 무의미 → 선행학습 피해야 함.' },
    { type:'ox', q:'고양이를 처음 본 아이가 "강아지!"라고 외치는 것은 조절(Accommodation)의 예이다.', answer:'X', explain:'기존 "강아지" 도식에 끼워 맞추므로 동화(Assimilation). 조절은 도식 자체가 수정될 때.' },
    { type:'ox', q:'구체적조작기 아동은 "장미꽃 8송이와 꽃 중 어느 게 더 많아?"에 틀릴 수 있다.', answer:'O', explain:'부분-전체 포함관계 이해는 전조작기에서 어렵고 구체적조작기로 가면서 획득됨.' },
    { type:'ox', q:'피아제의 "불평형"은 사회적 상호작용을 통해 해소된다.', answer:'X', explain:'불평형은 개인 내적 과정(동화·조절)으로 해소. 사회적 상호작용 강조는 비고츠키.' },
    { type:'ox', q:'형식적조작기는 모든 청소년이 반드시 도달하는 단계이다.', answer:'X', explain:'교육·문화 환경에 따라 달라지며 모든 사람이 완전히 도달하지는 않음.' },
    { type:'fill', q:'구체적조작기에서 논리적 사고가 가능하려면 반드시 (   )이 필요하다.', answer:'구체적 사물 (직접 경험할 수 있는 것)', explain:'구체적조작기는 눈앞의 구체적 사물·경험에 한해서만 논리적 사고 가능. 추상적 상황은 형식적조작기에 가능.' },
    { type:'fill', q:'전조작기에서 구체적조작기로 넘어갈 때 극복되는 핵심 특징은 (   )이다.', answer:'자기중심성 (탈중심화)', explain:'세 산 과제(Three Mountains Task)로 측정. 자기중심성 극복 → 탈중심화.' },
    { type:'fill', q:'기존 도식으로 설명이 안 될 때 도식 자체를 수정·확장하는 것을 (   )이라고 한다.', answer:'조절 (Accommodation)', explain:'동화(기존 도식에 맞춤)와 달리 조절은 도식 자체가 변함.' },
    { type:'mc', q:'다음 중 구체적조작기의 특징이 아닌 것은?', options:['보존 개념 획득','가역성 이해','탈중심화','가설연역적 추론','분류·서열화'], answer:3, explain:'가설연역적 추론은 형식적조작기의 핵심. 구체적조작기는 구체적 사물에 한해서만 논리적 사고 가능.' },
    { type:'mc', q:'"불평형 상태가 인지적 성장을 고무하기에 알맞은 정도로 유지되어야 한다"는 교수원리로 맞는 것은? [2011중 변형]', options:['비계설정으로 학습자를 지원한다','도전감 있되 너무 어렵지 않은 과제를 제공한다','사회적 상호작용을 촉진하는 협동학습을 실시한다','정적평가로 현재 발달을 확인한다'], answer:1, explain:'인지적 불균형을 유발하되 너무 쉬워 지루해서도, 너무 어려워 이해 불가해서도 안 됨.' },
  ];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'piaget'); }

  /* ── 초기화 ── */
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
