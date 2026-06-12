/**
 * 마르시아 정체성 지위 이론 — 탭 콘텐츠
 * 원페이지(1) 교육심리학 기반 / SITE_CONFIG 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }

  const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
    quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식',
               btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  const ACCENT = '#4EA87A';
  const BG     = '#E6F2EC';
  const FONT   = 'var(--font-body, var(--font-main))';

  if (!document.getElementById('marcia-content-style')) {
    const s = document.createElement('style');
    s.id = 'marcia-content-style';
    s.textContent = `
      .mc-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
      .mc-table-wrap table { min-width:480px; }
      .mc-point-tag { display:inline-block; font-size:10px; font-weight:700;
        padding:1px 7px; border-radius:4px; margin-right:6px; }
      .mc-status-pill {
        display:inline-block; font-size:10px; font-weight:700;
        padding:2px 8px; border-radius:6px; margin:0 2px;
      }
      @media(max-width:560px) { .mc-table-wrap table { min-width:360px; } }
    `;
    document.head.appendChild(s);
  }

  function parseExamItem(text) {
    const m = text.match(/\[(.+?)\]/);
    if (!m) return `<span style="color:var(--text-primary,#2C2825);">${text}</span>`;
    const tag = m[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="mc-point-tag" style="background:${BG};color:${ACCENT};font-weight:700;">${tag}</span><span style="color:var(--text-primary,#2C2825);">${body}</span>`;
  }

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    el.innerHTML = `
    <!-- 개요 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.intro}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong>마르시아(J. Marcia)</strong> — 캐나다 출신 발달심리학자. 에릭슨의 정체성 이론을 조작적으로 확장.<br>
        청소년기에 나타나는 정체감 유형을 <strong>두 가지 기준</strong>에 따라 <strong>4가지 지위</strong>로 구분한 이론.
      </div>
    </div>

    <!-- 두 가지 기준 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">정체감 지위 구분 기준</div>
      <div style="display:flex;flex-direction:column;gap:10px;font-family:${FONT};">
        <div style="background:${BG};border-radius:10px;padding:13px 16px;">
          <div style="font-size:11px;color:var(--text-tertiary,#A09890);margin-bottom:3px;">정체성을 탐색하는 과정에서 갈등·고민을 경험했는지 여부</div>
          <div style="font-size:13px;font-weight:800;color:${ACCENT};">위기 (탐색)</div>
          <div style="font-size:13px;color:var(--text-primary,#2C2825);margin-top:3px;">직업과 가치관 선택에 <strong>고민과 갈등</strong>을 느꼈는가?</div>
        </div>
        <div style="background:${BG};border-radius:10px;padding:13px 16px;">
          <div style="font-size:11px;color:var(--text-tertiary,#A09890);margin-bottom:3px;">특정 가치관·목표에 헌신하고 있는지 여부</div>
          <div style="font-size:13px;font-weight:800;color:${ACCENT};">전념 (몰입·수행)</div>
          <div style="font-size:13px;color:var(--text-primary,#2C2825);margin-top:3px;">주어진 역할과 과업에 <strong>몰입</strong>을 했는가?</div>
        </div>
      </div>
    </div>

    <!-- 4가지 정체감 지위 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">4가지 정체감 지위</div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;font-family:${FONT};">

        <!-- 유실 -->
        <div style="border-radius:12px;background:#FBF0E6;padding:14px 16px;">
          <div style="font-size:14px;font-weight:800;color:#C87840;margin-bottom:6px;">정체감 유실(폐쇄)</div>
          <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.7;margin-bottom:4px;">정체성 위기를 경험하지 않았지만 정체성이 확립된 것처럼 행동하는 단계</div>
          <div style="font-size:11px;font-weight:700;color:#C87840;">› 남의 가치관을 그대로 따름</div>
        </div>

        <!-- 전념 ○ 레이블 -->
        <div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary,#6B6560);padding:4px 10px;border-radius:20px;background:var(--bg-surface,#F0EDE8);white-space:nowrap;">전념 ○</div>

        <!-- 성취 -->
        <div style="border-radius:12px;background:#E6F2EC;padding:14px 16px;">
          <div style="font-size:14px;font-weight:800;color:#3A8858;margin-bottom:6px;">정체감 성취(확립)</div>
          <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.7;margin-bottom:4px;">스스로 탐색하고 전념하여 목표를 성취해 정체성을 확립한 단계</div>
          <div style="font-size:11px;font-weight:700;color:#3A8858;">› 삶의 목표를 능동적으로 선택함</div>
        </div>

        <!-- 위기 ✕ 레이블 -->
        <div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary,#6B6560);padding:4px 10px;border-radius:20px;background:var(--bg-surface,#F0EDE8);white-space:nowrap;">위기 ✕</div>

        <!-- 중앙 dot -->
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:6px;height:6px;border-radius:50%;background:var(--border-mid,rgba(0,0,0,.2));"></div>
        </div>

        <!-- 위기 ○ 레이블 -->
        <div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary,#6B6560);padding:4px 10px;border-radius:20px;background:var(--bg-surface,#F0EDE8);white-space:nowrap;">위기 ○</div>

        <!-- 혼미 -->
        <div style="border-radius:12px;background:#F5F0F8;padding:14px 16px;">
          <div style="font-size:14px;font-weight:800;color:#7848A8;margin-bottom:6px;">정체감 혼미</div>
          <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.7;margin-bottom:4px;">정체성을 찾으려고 노력을 하지 않는 단계</div>
          <div style="font-size:11px;font-weight:700;color:#7848A8;">› 가치 있는 활동에 전념하지 않음</div>
        </div>

        <!-- 전념 ✕ 레이블 -->
        <div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary,#6B6560);padding:4px 10px;border-radius:20px;background:var(--bg-surface,#F0EDE8);white-space:nowrap;">전념 ✕</div>

        <!-- 유예 -->
        <div style="border-radius:12px;background:#E6EAF5;padding:14px 16px;">
          <div style="font-size:14px;font-weight:800;color:#3A5AA0;margin-bottom:6px;">정체감 유예</div>
          <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.7;margin-bottom:4px;">정체성 위기를 경험하고 정체성 확립을 위해 적극적으로 탐색하는 단계</div>
          <div style="font-size:11px;font-weight:700;color:#3A5AA0;">› 적극적으로 정체성을 탐색함</div>
        </div>

      </div>
    </div>

    <!-- 교육적 시사점 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">교육적 시사점 (자아정체감 높이는 방법)</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        ${[
          ['교사 측면',     '교사의 솔선수범',           '청소년기 가장 중요한 관계는 교사. 교사의 언행이 모델링에 영향을 주므로 잘못된 모델링을 하지 않도록 신경써야 한다.', '#C87840'],
          ['학생 측면',     '올바른 또래집단 문화 형성', '12~18세의 중요한 관계는 또래. 배려·관심(신뢰감), 선택의 기회(자율성), 다양한 시도(주도성), 도움과 격려(근면성)에 신경쓴다.', '#3A5AA0'],
          ['교육방법 측면', '실제적·맥락적 교육 제공',   '학생들이 직접 자신의 인생에 직면해보는 과정이 필요. 지식교육보다 직업체험·적성검사 같은 창의적 체험활동을 제공한다.', '#3A8858'],
        ].map(([area, point, detail, color]) => `
          <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:12px 14px;">
            <div style="font-size:10px;font-weight:700;color:${color};letter-spacing:.06em;margin-bottom:4px;">${area}</div>
            <div style="font-size:13px;font-weight:700;color:var(--text-primary,#2C2825);margin-bottom:4px;">${point}</div>
            <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;">${detail}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 다른 이론과 비교 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">다른 이론과 비교</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:12px 14px;">
          <div style="font-size:10px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.06em;margin-bottom:4px;">에릭슨 — 이론적 토대</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-primary,#2C2825);margin-bottom:4px;">자아정체감 대 역할혼미 (심리사회발달 5단계)</div>
          <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;">마르시아는 에릭슨이 청소년기 과제로 제시한 '정체성 탐색'을 <strong>위기·전념</strong> 두 기준으로 조작적 정의하여 구체화했다. 에릭슨의 개념을 측정 가능한 4가지 지위로 확장한 것이 핵심 기여이다.</div>
        </div>
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:12px 14px;">
          <div style="font-size:10px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.06em;margin-bottom:4px;">에릭슨 — 심리적 유예기</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-primary,#2C2825);margin-bottom:4px;">모라토리움(Moratorium)</div>
          <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;">에릭슨은 청소년이 일정 기간 <strong>심리적 유예기</strong>를 경험하는 것이 건강한 정체성 발달에 필요하다고 보았다. 마르시아의 '정체감 유예' 지위가 이 상태에 대응한다.</div>
        </div>
      </div>
    </div>

    <!-- 논술 답안 구조 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:14px 16px;font-size:12px;line-height:1.9;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${[
            ['두 가지 기준 제시', '위기(crisis)와 전념(commitment)'],
            ['해당 지위 명칭 + 정의', '예: "정체감 유예란 ~ 단계이다."'],
            ['위기·전념 여부 명시', '"위기 ○ / 전념 ✕"'],
            ['특징 키워드', '"적극적으로 정체성을 탐색함"'],
          ].map(([title, desc], i) => `
            <div style="display:flex;gap:8px;align-items:baseline;">
              <span style="color:#A09890;font-weight:700;font-size:12px;flex-shrink:0;">${i+1}.</span>
              <span><strong>${title}</strong> — ${desc}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- 체크 포인트 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};font-size:12px;">
        ${[
          ['혼동 주의', '#D05840', '정체감 유실 vs 유예 — 둘 다 위기나 전념 중 하나가 ✕이지만, 어떤 것이 ✕인지 정반대'],
          ['혼동 주의', '#D05840', '정체감 성취 ≠ 외부에서 목표를 부여받은 것 — 스스로 탐색 후 능동적으로 선택해야 성취'],
          ['핵심 암기', '#2D8A6A', '유·성·혼·예 순서 — 위기: ✕ ○ ✕ ○ / 전념: ○ ○ ✕ ✕'],
        ].map(([label, color, content]) => `
          <div style="background:var(--bg-surface,#F0EDE8);border-radius:8px;padding:10px 14px;border-left:3px solid ${color};">
            <span style="display:inline-block;background:${color};color:white;font-size:10px;font-weight:700;padding:1px 8px;border-radius:20px;margin-right:8px;letter-spacing:.02em;">${label}</span>
            <span style="color:var(--text-primary,#2C2825);">${content}</span>
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const freqItems = [
      '[2009중] 마샤(Marcia) 정체감 지위 중 "혼미(diffusion)" 또는 "유예(moratorium)" 해당 항목 고르기',
      '[2005초] 정체감 상태 중 보기에 해당하는 것 — 위기 경험 없음 + 삶의 목표 탐색 시도 없음 → 혼미',
      '정체감 유실(폐쇄) — 위기 없이 전념 있음, 남의 가치관 그대로 따름',
      '정체감 유예(모라토리움) — 위기 있음 + 전념 없음, 적극적 탐색 중',
    ];
    const normalItems = [
      '위기(crisis)와 전념(commitment) 두 기준으로 4가지 지위 구분',
      '정체감 성취 — 가장 이상적·건강한 상태, 위기 ○ + 전념 ○',
      '교사의 역할 — 솔선수범, 또래집단 문화, 실제적 체험 교육',
      '에릭슨 심리적 유예기와 마르시아 유예 지위의 관계',
    ];

    function sortExamItems(items) {
      return [...items].sort((a, b) => {
        const aHas = /\[.+?\]/.test(a), bHas = /\[.+?\]/.test(b);
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return 0;
      });
    }

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.history}</div>
      <div style="background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:2;color:var(--text-primary,#2C2825);font-family:${FONT};">
        2005초 · 2009중<br>
        <span style="font-size:11px;color:var(--text-tertiary,#A09890);">
          4가지 지위의 위기·전념 조합이 핵심. 지위 명칭과 특징 키워드 세트로 암기 필수.
        </span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#A83222;">${C.exam.freq}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${sortExamItems(freqItems).map(item => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;border-left:2px solid #D05840;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#8A6010;">${C.exam.normal}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${sortExamItems(normalItems).map(item => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;border-left:2px solid #C8A830;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox',
      q:'마르시아(Marcia)가 정체감 지위를 구분하는 두 가지 기준은 위기(crisis)와 전념(commitment)이다.',
      answer:'O', explain:'마르시아는 "직업·가치관 선택에 고민·갈등을 느꼈는가?(위기)"와 "역할·과업에 몰입했는가?(전념)" 두 기준으로 4가지 지위를 구분한다.' },
    { type:'ox',
      q:'정체감 유실(폐쇄)은 위기를 경험하고 전념을 하는 상태이다.',
      answer:'X', explain:'유실은 위기 ✕ + 전념 ○. 위기(탐색)를 경험하지 않고 타인의 가치관을 그대로 따르는 상태다. 위기 ○ + 전념 ○은 정체감 성취이다.' },
    { type:'ox',
      q:'정체감 유예(모라토리움)는 위기를 경험하고 아직 전념하지 않은 상태로, 적극적으로 정체성을 탐색한다.',
      answer:'O', explain:'유예 = 위기 ○ + 전념 ✕. 탐색이 활발하게 진행 중인 과도기적 상태이다.' },
    { type:'ox',
      q:'정체감 혼미는 위기를 경험하지 못했고 전념도 하지 않으며, 정체감 지위 중 가장 취약한 상태이다.',
      answer:'O', explain:'혼미 = 위기 ✕ + 전념 ✕. 탐색 시도조차 없는 상태로 정체성 발달이 가장 취약하다.' },
    { type:'ox',
      q:'정체감 지위는 한번 결정되면 변하지 않는 고정된 상태이다.',
      answer:'X', explain:'정체감 지위는 유동적으로 변화할 수 있다. 일반적으로 혼미 › 유예 › 성취의 경로가 건강한 발달 흐름으로 본다.' },
    { type:'fill',
      q:'마르시아의 4가지 정체감 지위 중 가장 이상적이고 건강한 상태로, 위기 ○ + 전념 ○에 해당하는 것은 (   )이다.',
      answer:'정체감 성취', explain:'정체감 성취는 스스로 탐색하고 전념하여 목표를 능동적으로 선택한 가장 건강한 발달 상태이다.' },
    { type:'fill',
      q:'마르시아 이론에서 교사는 청소년의 정체성 교육을 위해 지식교육보다 직업체험·적성검사 같은 (   ) 교육을 제공해야 한다.',
      answer:'실제적·맥락적', explain:'정체성 교육을 위해 학생들이 직접 자신의 인생에 직면해보는 과정이 필요하며, 실제적·맥락적 교육이 요구된다.' },
    { type:'mc',
      q:'다음 설명에 해당하는 마르시아(Marcia)의 정체감 지위는?\n"정체감 위기를 경험하지 못하였으며, 삶의 목표와 가치를 탐색하려는 시도조차 하지 않는 상태"',
      options:['정체감 유실','정체감 성취','정체감 혼미','정체감 유예'], answer:2,
      explain:'혼미(Diffusion) = 위기 ✕ + 전념 ✕. 탐색 의지와 전념 모두 없는 상태. [2005초, 2009중 기출 유형]' },
    { type:'mc',
      q:'마르시아의 4가지 정체감 지위와 위기·전념 조합이 바르게 짝지어진 것은?',
      options:[
        '유실 — 위기 ○, 전념 ○',
        '유예 — 위기 ○, 전념 ✕',
        '성취 — 위기 ✕, 전념 ○',
        '혼미 — 위기 ○, 전념 ✕',
      ], answer:1,
      explain:'유예 = 위기 ○ + 전념 ✕ (정답). 유실=위기✕+전념○, 성취=위기○+전념○, 혼미=위기✕+전념✕.' },
    { type:'mc',
      q:'마르시아 이론에서 자아정체감을 높이기 위한 교사의 역할로 적절하지 않은 것은?',
      options:[
        '학생들이 직업체험과 적성검사에 참여할 기회를 제공한다.',
        '교사 스스로 솔선수범하여 올바른 모델링을 보여준다.',
        '또래집단 문화 형성을 위해 배려와 관심을 기울인다.',
        '정체성 교육은 지식 위주의 강의 중심 수업으로 한다.',
      ], answer:3,
      explain:'지식교육 중심이 아닌 실제적·맥락적 체험 교육이 요구된다. 직업체험, 창의적 체험 활동 등이 적절하다.' },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;
    let state = QUIZ_DATA.map(() => ({ revealed:false, selected:null }));

    function renderAll() {
      el.innerHTML = `
      <div class="detail-section">
        <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.quiz.title} — 총 ${QUIZ_DATA.length}문항</div>
        <div style="font-size:12px;color:var(--text-tertiary,#A09890);margin-bottom:16px;font-family:${FONT};">답을 생각한 후 버튼을 눌러 확인하세요.</div>
        ${QUIZ_DATA.map((q,i) => {
          const s = state[i];
          let qBody = '';
          if (q.type==='ox') {
            qBody = `<div style="display:flex;gap:8px;margin-top:10px;">
              ${['O','X'].map(ans => {
                const isSel=s.selected===ans, isCorr=q.answer===ans;
                let border='1.5px solid var(--border-light,#e0ddd8)',bg='var(--bg-white,#fff)',color='var(--text-primary,#2C2825)';
                if(s.revealed&&isSel){border=`1.5px solid ${isCorr?'#4EA87A':'#D05840'}`;bg=isCorr?'#EBF5EA':'#FDECEA';color=isCorr?'#1E5A3C':'#A83222';}
                else if(isSel){border=`1.5px solid ${ACCENT}`;bg='var(--bg-surface,#f7f4f0)';}
                return `<button onclick="marciaQuizOX(${i},'${ans}')" style="flex:1;padding:9px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">${ans}</button>`;
              }).join('')}
            </div>`;
          } else if (q.type==='fill') {
            qBody = `<div style="margin-top:10px;">
              ${s.revealed
                ? `<div style="padding:9px 14px;border-radius:8px;background:${BG};border:1.5px solid ${ACCENT};font-size:12px;font-weight:700;color:${ACCENT};font-family:${FONT};">정답: ${q.answer}</div>`
                : `<button onclick="marciaQuizReveal(${i})" style="width:100%;padding:9px;border-radius:8px;border:1.5px solid var(--border-light,#e0ddd8);background:var(--bg-white,#fff);font-size:12px;font-weight:600;cursor:pointer;color:var(--text-secondary,#6B6560);font-family:inherit;">${C.quiz.btnReveal}</button>`}
            </div>`;
          } else {
            qBody = `<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
              ${q.options.map((opt,oi) => {
                let border='1.5px solid var(--border-light,#e0ddd8)',bg='var(--bg-white,#fff)',color='var(--text-primary,#2C2825)';
                if(s.revealed){if(oi===q.answer){border=`1.5px solid ${ACCENT}`;bg=BG;color=ACCENT;}else if(s.selected===oi){border='1.5px solid #D05840';bg='#FDECEA';color='#A83222';}}
                else if(s.selected===oi){border=`1.5px solid ${ACCENT}`;bg='var(--bg-surface,#f7f4f0)';}
                return `<button onclick="marciaQuizMC(${i},${oi})" style="text-align:left;padding:9px 12px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:12px;cursor:pointer;font-family:inherit;line-height:1.5;white-space:pre-line;"><span style="font-weight:700;margin-right:6px;">${oi+1}.</span>${opt}</button>`;
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
            <div style="font-size:13px;font-weight:600;color:var(--text-primary,#2C2825);line-height:1.6;font-family:${FONT};white-space:pre-line;">${i+1}. ${q.q}</div>
            ${qBody}${explain}
          </div>`;
        }).join('')}
        <div style="text-align:center;margin-top:8px;">
          <button onclick="marciaQuizReset()" style="padding:10px 28px;border-radius:20px;border:1.5px solid var(--border-light,#e0ddd8);background:var(--bg-surface,#F0EDE8);font-size:13px;cursor:pointer;color:var(--text-secondary,#6B6560);font-family:inherit;">${C.quiz.btnReset}</button>
        </div>
      </div>`;
    }

    window.marciaQuizOX     = (i,ans) => { state[i].selected=ans; state[i].revealed=true; renderAll(); };
    window.marciaQuizReveal = i       => { state[i].revealed=true; renderAll(); };
    window.marciaQuizMC     = (i,oi)  => { state[i].selected=oi; state[i].revealed=true; renderAll(); };
    window.marciaQuizReset  = ()      => { state=QUIZ_DATA.map(()=>({revealed:false,selected:null})); renderAll(); };
    renderAll();
  }

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
