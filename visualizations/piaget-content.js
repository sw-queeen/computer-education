/**
 * 피아제 인지발달이론 — 탭 콘텐츠
 * 원페이지 교육학 5판 기반 / SITE_CONFIG 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }

  const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
    summary: { intro:'개요', learning:'학습자의 학습 과정', teacherRole:'교사의 역할 & 수업 방법', stageChart:'단계별 특징 개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
    quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식', btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  const ACCENT = '#4EA87A';
  const BG     = '#E6F2EC';
  const FONT   = 'var(--font-body, var(--font-main))';

  if (!document.getElementById('piaget-content-style')) {
    const s = document.createElement('style');
    s.id = 'piaget-content-style';
    s.textContent = `
      .pc-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .pc-table-wrap table { min-width: 480px; }
      .pc-compare-cards { display: none; }
      .pc-common-cards { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
      .pc-common-card {
        display: flex; align-items: flex-start; gap: 10px;
        background: #fff; border: 1.5px solid ${ACCENT}44;
        border-radius: 10px; padding: 10px 14px; font-size: 12px;
      }
      .pc-common-num {
        background: ${ACCENT}; color: white; border-radius: 50%;
        width: 20px; height: 20px; display: flex; align-items: center;
        justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0;
      }
      .pc-point-tag {
        display: inline-block; font-size: 10px; font-weight: 700;
        padding: 1px 7px; border-radius: 4px; margin-right: 6px;
        vertical-align: middle;
      }
      @media (max-width: 560px) {
        .pc-table-wrap { display: none; }
        .pc-compare-cards { display: flex; flex-direction: column; gap: 8px; }
      }
    `;
    document.head.appendChild(s);
  }

  // ★ → 포인트 색상 치환
  function hl(text) {
    return text.replace(/([가-힣a-zA-Z()·\s]+)★/g,
      '<span style="color:' + ACCENT + ';font-weight:700;">$1</span>');
  }

  function compareCards(rows, headers) {
    return rows.map(r => `
      <div style="background:#faf9f7;border-radius:8px;padding:10px 14px;font-size:12px;">
        <div style="font-weight:700;color:#2C2825;margin-bottom:4px;">${r[0]}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span style="background:${BG};color:${ACCENT};padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;">${headers[1]}</span>
          <span style="color:#6B6560;">${r[1]}</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:3px;">
          <span style="background:#EAE8F8;color:#6058C0;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;">${headers[2]}</span>
          <span style="color:#6B6560;">${r[2]}</span>
        </div>
      </div>`).join('');
  }

  // ── 출제연도 태그 파싱 ([2011중] → 앞으로 + 볼드 컬러)
  function parseExamItem(text) {
    const match = text.match(/\[(.+?)\]/);
    if (!match) return `<span style="color:#2C2825;">${text}</span>`;
    const tag = match[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="pc-point-tag" style="background:#FBF0E6;color:#7A4018;">${tag}</span><span style="color:#2C2825;">${body}</span>`;
  }

  /* ────────────────────────────
     1. 핵심정리 탭
  ──────────────────────────── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    const stageRows = [
      ['감각운동기', '~2세', '대상영속성 개념 발달', '사고능력 없음'],
      ['전조작기', '2~7세', '정신적 능력 발달', '상징적 사고 / 물활론적 사고 / 자기중심적 사고 / 전개념 발달'],
      ['구체적조작기', '7~11세', '경험할 수 있는 것만 논리적 사고', '보존개념 / 탈중심화 / 가역성 / 분류(서열)능력 / 보상성'],
      ['형식적조작기', '12세~', '가설적·추상적 개념을 논리적 사고', '추상적(반성적추상화) / 자기중심적(엘킨드) / 명제적 / 가설연역적 / 조합적 사고'],
    ];

    const compareRows = [
      ['지식', '인지적 구성주의', '사회적 구성주의'],
      ['학습자', '개별적 주체', '사회적 존재'],
      ['발달', '발달이 학습에 선행', '학습이 발달에 선행'],
      ['평가', '현재 발달 평가 (정적평가)', '잠재적 발달 평가 (역동적 평가)'],
      ['교사 도움', '교사 도움 no', '교사 도움 ok'],
    ];

    const commonPoints = [
      '지식관: 구성주의 — 지식은 외부에서 주어지는 것이 아니라 학습자가 스스로 구성한다.',
      '학습자관: 능동적 주체 — 학습자는 수동적 수용자가 아니라 능동적으로 의미를 만든다.',
      '발달관: 환경과의 상호작용 — 지식은 학습자와 환경 사이의 상호작용을 통해 습득된다.',
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.intro}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.85;color:#2C2825;font-family:${FONT};">
        <strong>피아제(J. Piaget, 1896~1980)</strong> — 스위스 아동심리학자.<br>
        학습자는 기본적으로 인지구조를 가지고 있으며 능동적이다.<br>
        타고난 인지 기능으로 물리적 환경과 상호작용하여 지식을 구성한다. → <strong>인지적 구성주의</strong>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.learning}</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${[
          '학습자는 기본적으로 인지구조를 가지고 있으며 능동적이다. 타고난 인지 기능으로 물리적 환경과 상호작용하여 지식을 구성한다. <strong>(= 인지적 구성주의)</strong>',
          `자신의 기존 도식에 새로운 지식이 들어올 때 같으면 평형화 상태를 유지하고, 다르면 <span style="color:${ACCENT};font-weight:700;">불평형</span> 상태가 된다. 불평형 해소를 위해 <span style="color:${ACCENT};font-weight:700;">평형 욕구</span>가 생기고, <span style="color:${ACCENT};font-weight:700;">동화</span>(기존 도식에 포함) 또는 <span style="color:${ACCENT};font-weight:700;">조절</span>(도식 수정)을 통해 인지발달(인지적 평형화)이 일어난다.`,
        ].map((text, i) => `
          <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:#F0EDE8;border-radius:8px;font-family:${FONT};font-size:13px;line-height:1.8;">
            <span style="background:${ACCENT};color:white;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${i+1}</span>
            <div>${text}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.teacherRole}</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};font-size:13px;">
        ${[
          ['발견학습 제공', '학습자는 능동적으로 학습할 수 있으므로 스스로 관찰하고 탐구할 수 있는 수업을 제공한다. 단순한 설명식 수업은 피해야 한다.'],
          ['인지적 불균형 유발', '학습자의 인지적 불균형(불평형)을 유도하기 위해 도전감 있는 과제를 제공한다. 단, 너무 어려운 과제는 안 된다.'],
          ['인지발달 수준에 기초한 교육', '학습자가 수업 내용을 이해하는 데 필요한 인지구조가 없으면 수업은 무의미하므로 선행학습은 가능한 피해야 한다.'],
        ].map(([title, desc], i) => `
          <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:#F0EDE8;border-radius:8px;">
            <span style="background:${ACCENT};color:white;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${i+1}</span>
            <div><strong>${title}</strong> — ${desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.stageChart}</div>
      <div class="pc-table-wrap">
        <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:480px;font-family:${FONT};">
          <thead>
            <tr style="background:${BG};">
              ${['단계','연령','핵심 성취','주요 특징'].map((h,i) =>
                `<th style="padding:8px 10px;${i===1?'text-align:center;':'text-align:left;'}font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">${h}</th>`
              ).join('')}
            </tr>
          </thead>
          <tbody>
            ${stageRows.map((r,i) => `
              <tr style="border-bottom:1px solid #e8e4de;${i%2?'background:#faf9f7':''}">
                <td style="padding:8px 10px;font-weight:600;color:#2C2825;">${r[0]}</td>
                <td style="padding:8px 10px;text-align:center;color:#6B6560;white-space:nowrap;">${r[1]}</td>
                <td style="padding:8px 10px;color:${ACCENT};font-weight:600;">${r[2]}</td>
                <td style="padding:8px 10px;color:#6B6560;">${r[3]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="pc-compare-cards">
        ${stageRows.map((r,i) => `
          <div style="background:${i%2?'#faf9f7':'#fff'};border-radius:8px;padding:10px 14px;font-size:12px;border:1px solid #e8e4de;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-weight:700;color:#2C2825;">${r[0]}</span>
              <span style="color:#A09890;font-size:11px;">${r[1]}</span>
            </div>
            <div style="color:${ACCENT};font-weight:600;margin-bottom:2px;">${r[2]}</div>
            <div style="color:#6B6560;">${r[3]}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">피아제 vs 비고츠키</div>
      <!-- 공통점: 카드 강조 -->
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:${ACCENT};letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;">공통점</div>
        <div class="pc-common-cards">
          ${commonPoints.map((pt, i) => `
            <div class="pc-common-card">
              <div class="pc-common-num">${i+1}</div>
              <div style="color:#2C2825;line-height:1.6;">${pt}</div>
            </div>`).join('')}
        </div>
      </div>
      <!-- 차이점 -->
      <div style="font-size:11px;font-weight:700;color:#6058C0;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;">차이점</div>
      <div class="pc-table-wrap">
        <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:400px;font-family:${FONT};">
          <thead>
            <tr style="background:${BG};">
              <th style="padding:8px 10px;border-bottom:2px solid ${ACCENT};color:${ACCENT};font-weight:700;">구분</th>
              <th style="padding:8px 10px;border-bottom:2px solid ${ACCENT};color:${ACCENT};font-weight:700;text-align:center;">피아제</th>
              <th style="padding:8px 10px;border-bottom:2px solid #6058C0;color:#6058C0;font-weight:700;text-align:center;">비고츠키</th>
            </tr>
          </thead>
          <tbody>
            ${compareRows.map((r,i) => `
              <tr style="border-bottom:1px solid #e8e4de;${i%2?'background:#faf9f7':''}">
                <td style="padding:8px 10px;font-weight:600;color:#2C2825;white-space:nowrap;">${r[0]}</td>
                <td style="padding:8px 10px;color:#6B6560;">${r[1]}</td>
                <td style="padding:8px 10px;color:#6B6560;">${r[2]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="pc-compare-cards">
        ${compareCards(compareRows, ['구분','피아제','비고츠키'])}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#1A3C68;">${C.summary.essay}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};font-size:12px;">
        ${[
          '학습과정 2가지: ① 인지적 구성주의 ② 동화·조절을 통한 평형화',
          '교사역할 3가지: ① 발견학습 제공 ② 인지적 불균형 유발 ③ 인지발달 수준 고려',
          '피아제 비판: 외적 행동 변화만 강조 → 내면적 변화 확인 어려움',
          '비고츠키 연결: 피아제 불평형(개인 내적) ↔ 비고츠키 비계(사회적 상호작용)',
        ].map(item => `
          <div style="background:#E6EFF8;border-radius:8px;padding:10px 14px;color:#2C2825;line-height:1.7;">${item}</div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.check}</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};font-size:12px;">
        ${[
          ['❌', '#FDECEA', '#D05840', '#A83222', '혼동 주의', '"피아제의 불평형 = 사회적 상호작용으로 해소" → X. 개인 내적 과정(동화·조절)으로 해소됨. 사회적 상호작용은 비고츠키.'],
          ['❌', '#FDECEA', '#D05840', '#A83222', '혼동 주의', '"반성적 추상화 = 메타인지" → X. 반성적 추상화는 형식적조작기의 추상사고 능력.'],
          ['✅', '#EBF5EA', '#4EA87A', '#1E5A3C', '핵심 암기', '보존개념 순서: <strong>수·양·무게·부피</strong> ("수양무부"로 외우기)'],
          ['✅', '#EBF5EA', '#4EA87A', '#1E5A3C', '핵심 암기', '형식적조작기 특징 5가지: 추상적·자기중심적(엘킨드)·명제적·가설연역적·조합적 사고'],
        ].map(([icon, bg, bc, tc, label, text]) => `
          <div style="background:${bg};border-radius:8px;padding:10px 14px;border-left:3px solid ${bc};">
            <strong style="color:${tc};">${icon} ${label}</strong> — ${text}
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ────────────────────────────
     2. 기출 포인트 탭
  ──────────────────────────── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const freqItems = [
      '불평형(disequilibrium) — 오류 상황에 직면할 때 일어남. 너무 쉽거나 어렵지 않아야 함 [2011중]',
      '동화(assimilation) — 고양이를 보고 "강아지!"라고 함 [2006초]',
      '보존 개념 획득 순서: 수(6~7) → 양(7~8) → 무게(9~10) → 부피(11~12)',
      '전조작기 특징: 자기중심성, 상징적 사고, 물활론 [2007초]',
      '구체적조작기 특징: 탈자기중심화, 분류·서열화, 구체적 사물에 제한 [2007초]',
      '반성적 추상화 — 형식적조작기 핵심. 구체물 없이 추상 추론 가능 [2010중]',
    ];
    const normalItems = [
      '감각운동기 — 사고능력 없음. 대상영속성. 순환반응 1·2·3차 [2010초]',
      '구체적조작기 교수법 — 시청각 자료·실물 활용, 직접 경험 중심 [2003중]',
      '형식적조작기 — 가설연역적·명제적·반성적 추상화 사고 [2000중, 2010중]',
      '전조작기 분류 오류 — 장미꽃 vs 꽃 포함관계 이해 못함 [2005초]',
      '피아제 이론 한계 — 사회적 상호작용 경시. 불평형은 개인 내적 과정 [2008중]',
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.history}</div>
      <div style="background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:2;color:#2C2825;font-family:${FONT};">
        2000중 · 2003중 · 2005중·초 · 2006초 · 2007초 · 2008중 · 2009초 · 2010초·중 · 2011중<br>
        <span style="font-size:11px;color:#A09890;">거의 매년 출제. 전 단계 특징 + 핵심개념(동화·조절·평형화) 완벽 암기 필수.</span>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#A83222;">${C.exam.freq}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${freqItems.map(item => `
          <div style="background:#FDECEA;border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#8A6010;">${C.exam.normal}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${normalItems.map(item => `
          <div style="background:#FBF4E0;border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ────────────────────────────
     3. 리마인드 탭
  ──────────────────────────── */
  const QUIZ_DATA = [
    { type:'ox', q:'피아제에 따르면, 교사가 학습자보다 앞선 선행학습은 인지발달에 도움이 된다.', answer:'X', explain:'학습자의 인지발달 수준에 기초한 교육 강조. 인지구조가 준비 안 된 수업은 무의미 → 선행학습 피해야 함.' },
    { type:'ox', q:'고양이를 처음 본 아이가 "강아지!"라고 외치는 것은 조절(Accommodation)의 예이다.', answer:'X', explain:'기존 "강아지" 도식에 끼워 맞추므로 동화(Assimilation). 조절은 도식 자체가 수정될 때.' },
    { type:'ox', q:'구체적조작기 아동은 "장미꽃 8송이와 꽃 중 어느 게 더 많아?"에 틀릴 수 있다.', answer:'O', explain:'부분-전체 포함관계 이해는 전조작기에서 어렵고 구체적조작기로 가면서 획득됨.' },
    { type:'ox', q:'피아제의 "불평형"은 사회적 상호작용을 통해 해소된다.', answer:'X', explain:'불평형은 개인 내적 과정(동화·조절)으로 해소. 사회적 상호작용 강조는 비고츠키.' },
    { type:'ox', q:'형식적조작기는 모든 청소년이 반드시 도달하는 단계이다.', answer:'X', explain:'교육·문화 환경에 따라 달라지며 모든 사람이 완전히 도달하지는 않음.' },
    { type:'fill', q:'보존 개념의 획득 순서는 (   ) → (   ) → (   ) → (   ) 이다.', answer:'수 → 양 → 무게 → 부피', explain:'수(6~7세) → 양(7~8세) → 무게(9~10세) → 부피(11~12세). "수양무부"로 암기!' },
    { type:'fill', q:'전조작기에서 구체적조작기로 넘어갈 때 극복되는 핵심 특징은 (   )이다.', answer:'자기중심성 (탈중심화)', explain:'세 산 과제(Three Mountains Task)로 측정. 자기중심성 극복 → 탈중심화.' },
    { type:'fill', q:'기존 도식으로 설명이 안 될 때 도식 자체를 수정·확장하는 것을 (   )이라고 한다.', answer:'조절 (Accommodation)', explain:'동화(기존 도식에 맞춤)와 달리 조절은 도식 자체가 변함.' },
    { type:'mc', q:'다음 중 구체적조작기의 특징이 아닌 것은?', options:['보존 개념 획득','가역성 이해','탈중심화','가설연역적 추론','분류·서열화'], answer:3, explain:'가설연역적 추론은 형식적조작기의 핵심. 구체적조작기는 구체적 사물에 한해서만 논리적 사고 가능.' },
    { type:'mc', q:'"불평형 상태가 인지적 성장을 고무하기에 알맞은 정도로 유지되어야 한다"는 교수원리로 맞는 것은? [2011중 변형]', options:['비계설정으로 학습자를 지원한다','도전감 있되 너무 어렵지 않은 과제를 제공한다','사회적 상호작용을 촉진하는 협동학습을 실시한다','정적평가로 현재 발달을 확인한다'], answer:1, explain:'인지적 불균형을 유발하되 너무 쉬워 지루해서도, 너무 어려워 이해 불가해서도 안 됨.' },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;
    let state = QUIZ_DATA.map(() => ({ revealed: false, selected: null }));

    function renderAll() {
      el.innerHTML = `
      <div class="detail-section">
        <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.quiz.title} — 총 ${QUIZ_DATA.length}문항</div>
        <div style="font-size:12px;color:#A09890;margin-bottom:16px;font-family:${FONT};">답을 생각한 후 버튼을 눌러 확인하세요.</div>
        ${QUIZ_DATA.map((q, i) => {
          const s = state[i];
          let qBody = '';
          if (q.type === 'ox') {
            qBody = `<div style="display:flex;gap:8px;margin-top:10px;">
              ${['O','X'].map(ans => {
                const isSel = s.selected === ans;
                const isCorr = q.answer === ans;
                let border='1.5px solid #e0ddd8', bg='#fff', color='#2C2825';
                if (s.revealed && isSel) { border=`1.5px solid ${isCorr?'#4EA87A':'#D05840'}`; bg=isCorr?'#EBF5EA':'#FDECEA'; color=isCorr?'#1E5A3C':'#A83222'; }
                else if (isSel) { border=`1.5px solid ${ACCENT}`; bg='#f7f4f0'; }
                return `<button onclick="piagetQuizOX(${i},'${ans}')" style="flex:1;padding:9px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">${ans}</button>`;
              }).join('')}
            </div>`;
          } else if (q.type === 'fill') {
            qBody = `<div style="margin-top:10px;">
              <button onclick="piagetQuizReveal(${i})" style="width:100%;padding:9px;border-radius:8px;border:1.5px solid ${s.revealed?ACCENT:'#e0ddd8'};background:${s.revealed?BG:'#fff'};font-size:12px;font-weight:600;cursor:pointer;color:${s.revealed?ACCENT:'#6B6560'};font-family:inherit;">${s.revealed?C.quiz.btnRevealed:C.quiz.btnReveal}</button>
            </div>`;
          } else if (q.type === 'mc') {
            qBody = `<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
              ${q.options.map((opt, oi) => {
                let border='1.5px solid #e0ddd8', bg='#fff', color='#2C2825';
                if (s.revealed) {
                  if (oi===q.answer) { border=`1.5px solid ${ACCENT}`; bg='#EBF5EA'; color=ACCENT; }
                  else if (s.selected===oi) { border='1.5px solid #D05840'; bg='#FDECEA'; color='#A83222'; }
                } else if (s.selected===oi) { border=`1.5px solid ${ACCENT}`; bg='#f7f4f0'; }
                return `<button onclick="piagetQuizMC(${i},${oi})" style="text-align:left;padding:9px 12px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:12px;cursor:pointer;font-family:inherit;line-height:1.5;"><span style="font-weight:700;margin-right:6px;">${oi+1}.</span>${opt}</button>`;
              }).join('')}
            </div>`;
          }
          const explain = s.revealed ? `
            <div style="margin-top:10px;background:${BG};border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;color:#2C2825;border-left:3px solid ${ACCENT};font-family:${FONT};">
              <strong style="color:${ACCENT};">${C.quiz.explainLabel}</strong> ${q.explain}
            </div>` : '';
          const typeLabel = q.type==='ox'?C.quiz.typeOX : q.type==='fill'?C.quiz.typeFill : C.quiz.typeMC;
          return `
          <div style="background:#fff;border:1px solid #e8e4de;border-radius:12px;padding:16px;margin-bottom:12px;">
            <div style="font-size:11px;font-weight:700;color:#A09890;margin-bottom:6px;letter-spacing:.04em;font-family:${FONT};">${typeLabel}</div>
            <div style="font-size:13px;font-weight:600;color:#2C2825;line-height:1.6;font-family:${FONT};">${i+1}. ${q.q}</div>
            ${qBody}${explain}
          </div>`;
        }).join('')}
        <div style="text-align:center;margin-top:8px;">
          <button onclick="piagetQuizReset()" style="padding:10px 28px;border-radius:20px;border:1.5px solid #e0ddd8;background:#F0EDE8;font-size:13px;cursor:pointer;color:#6B6560;font-family:inherit;">${C.quiz.btnReset}</button>
        </div>
      </div>`;
    }

    window.piagetQuizOX     = (i, ans) => { state[i].selected=ans; state[i].revealed=true; renderAll(); };
    window.piagetQuizReveal = i         => { state[i].revealed=true; renderAll(); };
    window.piagetQuizMC     = (i, oi)  => { state[i].selected=oi; state[i].revealed=true; renderAll(); };
    window.piagetQuizReset  = ()       => { state=QUIZ_DATA.map(()=>({revealed:false,selected:null})); renderAll(); };
    renderAll();
  }

  /* ────────────────────────────
     초기화
  ──────────────────────────── */
  function init() {
    renderSummary();
    renderExam();
    renderQuiz();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    const observer = new MutationObserver(() => {
      if ($('tab-summary') && $('tab-exam') && $('tab-quiz')) {
        observer.disconnect();
        init();
      }
    });
    observer.observe(document.getElementById('main') || document.body, { childList:true, subtree:true });
    if ($('tab-summary')) init();
  }
})();
