/**
 * 마르시아 정체성 지위 이론 — 탭 콘텐츠 (리팩토링)
 * SITE_CONFIG + CS(ui.js) 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;
    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title">${C.summary.intro}</div>
      <div class="cs-intro-box">
        <strong>마르시아(J. Marcia)</strong> — 캐나다 출신 발달심리학자. 에릭슨의 정체성 이론을 조작적으로 확장.<br>
        청소년기에 나타나는 정체감 유형을 <strong>두 가지 기준</strong>에 따라 <strong>4가지 지위</strong>로 구분한 이론.
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">정체감 지위 구분 기준</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${[
          ['정체성을 탐색하는 과정에서 갈등·고민을 경험했는지 여부', '위기 (탐색)', '직업과 가치관 선택에 <strong>고민과 갈등</strong>을 느꼈는가?'],
          ['특정 가치관·목표에 헌신하고 있는지 여부', '전념 (몰입·수행)', '주어진 역할과 과업에 <strong>몰입</strong>을 했는가?'],
        ].map(([sub, title, q]) => `
          <div class="cs-intro-box">
            <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:3px;">${sub}</div>
            <div style="font-size:13px;font-weight:800;color:var(--subject-accent);">${title}</div>
            <div style="font-size:13px;color:var(--text-primary);margin-top:3px;">${q}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">4가지 정체감 지위</div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;">
        ${[
          { bg:'#FBF0E6', color:'#C87840', title:'정체감 유실(폐쇄)', desc:'정체성 위기를 경험하지 않았지만 정체성이 확립된 것처럼 행동하는 단계', key:'남의 가치관을 그대로 따름' },
          null, // 레이블: 전념 ○
          { bg:'#E6F2EC', color:'#3A8858', title:'정체감 성취(확립)', desc:'스스로 탐색하고 전념하여 목표를 성취해 정체성을 확립한 단계', key:'삶의 목표를 능동적으로 선택함' },
        ].map(c => c ? `
          <div style="border-radius:var(--radius-md);background:${c.bg};padding:14px 16px;">
            <div style="font-size:14px;font-weight:800;color:${c.color};margin-bottom:6px;">${c.title}</div>
            <div style="font-size:12px;color:var(--text-primary);line-height:1.7;margin-bottom:4px;">${c.desc}</div>
            <div style="font-size:11px;font-weight:700;color:${c.color};">› ${c.key}</div>
          </div>` : `<div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary);padding:4px 10px;border-radius:20px;background:var(--bg-surface);white-space:nowrap;">전념 ○</div>`).join('')}

        <div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary);padding:4px 10px;border-radius:20px;background:var(--bg-surface);white-space:nowrap;">위기 ✕</div>
        <div style="display:flex;align-items:center;justify-content:center;"><div style="width:6px;height:6px;border-radius:50%;background:var(--border-mid);"></div></div>
        <div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary);padding:4px 10px;border-radius:20px;background:var(--bg-surface);white-space:nowrap;">위기 ○</div>

        ${[
          { bg:'#F5F0F8', color:'#7848A8', title:'정체감 혼미', desc:'정체성을 찾으려고 노력을 하지 않는 단계', key:'가치 있는 활동에 전념하지 않음' },
          null,
          { bg:'#E6EAF5', color:'#3A5AA0', title:'정체감 유예', desc:'정체성 위기를 경험하고 정체성 확립을 위해 적극적으로 탐색하는 단계', key:'적극적으로 정체성을 탐색함' },
        ].map(c => c ? `
          <div style="border-radius:var(--radius-md);background:${c.bg};padding:14px 16px;">
            <div style="font-size:14px;font-weight:800;color:${c.color};margin-bottom:6px;">${c.title}</div>
            <div style="font-size:12px;color:var(--text-primary);line-height:1.7;margin-bottom:4px;">${c.desc}</div>
            <div style="font-size:11px;font-weight:700;color:${c.color};">› ${c.key}</div>
          </div>` : `<div style="display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-secondary);padding:4px 10px;border-radius:20px;background:var(--bg-surface);white-space:nowrap;">전념 ✕</div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">교육적 시사점 (자아정체감 높이는 방법)</div>
      ${[
        ['#C87840', '교사 측면',     '교사의 솔선수범',           '청소년기 가장 중요한 관계는 교사. 교사의 언행이 모델링에 영향을 주므로 잘못된 모델링을 하지 않도록 신경써야 한다.'],
        ['#3A5AA0', '학생 측면',     '올바른 또래집단 문화 형성', '12~18세의 중요한 관계는 또래. 배려·관심(신뢰감), 선택의 기회(자율성), 다양한 시도(주도성), 도움과 격려(근면성)에 신경쓴다.'],
        ['#3A8858', '교육방법 측면', '실제적·맥락적 교육 제공',   '학생들이 직접 자신의 인생에 직면해보는 과정이 필요. 지식교육보다 직업체험·적성검사 같은 창의적 체험활동을 제공한다.'],
      ].map(([color, area, point, detail]) => `
        <div class="cs-insight-card">
          <div class="cs-insight-area" style="color:${color};">${area}</div>
          <div class="cs-insight-point">${point}</div>
          <div class="cs-insight-desc">${detail}</div>
        </div>`).join('')}
    </div>

    <div class="detail-section">
      <div class="detail-section-title">다른 이론과 비교</div>
      ${[
        ['에릭슨 — 이론적 토대', '자아정체감 대 역할혼미 (심리사회발달 5단계)', '마르시아는 에릭슨이 청소년기 과제로 제시한 \'정체성 탐색\'을 <strong>위기·전념</strong> 두 기준으로 조작적 정의하여 구체화했다. 에릭슨의 개념을 측정 가능한 4가지 지위로 확장한 것이 핵심 기여이다.'],
        ['에릭슨 — 심리적 유예기', '모라토리움(Moratorium)', '에릭슨은 청소년이 일정 기간 <strong>심리적 유예기</strong>를 경험하는 것이 건강한 정체성 발달에 필요하다고 보았다. 마르시아의 \'정체감 유예\' 지위가 이 상태에 대응한다.'],
      ].map(([label, title, desc]) => `
        <div class="cs-compare-card">
          <div class="cs-compare-label">${label}</div>
          <div class="cs-compare-title">${title}</div>
          <div class="cs-compare-desc">${desc}</div>
        </div>`).join('')}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      ${CS.renderEssayGroups([
        { label:'두 가지 기준 제시', items:['위기(crisis) — 정체성 탐색 여부', '전념(commitment) — 특정 가치·역할에 대한 헌신 여부'] },
        { label:'해당 지위 서술', items:['지위명 — 위기·전념 여부 명시 (예: 위기 ○ / 전념 ✕)', '정의 — "정체감 유예란 ~ 단계이다."', '특징 키워드 — "적극적으로 정체성을 탐색함"'] },
        { label:'교육적 시사점', items:['청소년이 심리적 유예기(모라토리움)를 경험할 수 있도록 다양한 탐색 기회 제공', '교사·부모는 가치관 강요 대신 자율적 탐색을 지지해야 함'] },
      ])}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      ${CS.renderCheckCards([
        { type:'danger',  text:'정체감 유실 vs 유예 — 둘 다 위기나 전념 중 하나가 ✕이지만, 어떤 것이 ✕인지 정반대' },
        { type:'danger',  text:'정체감 성취 ≠ 외부에서 목표를 부여받은 것 — 스스로 탐색 후 능동적으로 선택해야 성취' },
        { type:'success', text:'유·성·혼·예 순서 — 위기: ✕ ○ ✕ ○ / 전념: ○ ○ ✕ ✕' },
      ])}
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `2005초 · 2009중
        <span class="cs-history-note">4가지 지위의 위기·전념 조합이 핵심. 지위 명칭과 특징 키워드 세트로 암기 필수.</span>`,
      freqItems: [
        '[2009중] 마샤(Marcia) 정체감 지위 중 "혼미(diffusion)" 또는 "유예(moratorium)" 해당 항목 고르기',
        '[2005초] 정체감 상태 중 보기에 해당하는 것 — 위기 경험 없음 + 삶의 목표 탐색 시도 없음 → 혼미',
        '정체감 유실(폐쇄) — 위기 없이 전념 있음, 남의 가치관 그대로 따름',
        '정체감 유예(모라토리움) — 위기 있음 + 전념 없음, 적극적 탐색 중',
      ],
      normalItems: [
        '위기(crisis)와 전념(commitment) 두 기준으로 4가지 지위 구분',
        '정체감 성취 — 가장 이상적·건강한 상태, 위기 ○ + 전념 ○',
        '교사의 역할 — 솔선수범, 또래집단 문화, 실제적 체험 교육',
        '에릭슨 심리적 유예기와 마르시아 유예 지위의 관계',
      ],
    });
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox', q:'마르시아(Marcia)가 정체감 지위를 구분하는 두 가지 기준은 위기(crisis)와 전념(commitment)이다.', answer:'O', explain:'마르시아는 "직업·가치관 선택에 고민·갈등을 느꼈는가?(위기)"와 "역할·과업에 몰입했는가?(전념)" 두 기준으로 4가지 지위를 구분한다.' },
    { type:'ox', q:'정체감 유실(폐쇄)은 위기를 경험하고 전념을 하는 상태이다.', answer:'X', explain:'유실은 위기 ✕ + 전념 ○. 위기(탐색)를 경험하지 않고 타인의 가치관을 그대로 따르는 상태다.' },
    { type:'ox', q:'정체감 유예(모라토리움)는 위기를 경험하고 아직 전념하지 않은 상태로, 적극적으로 정체성을 탐색한다.', answer:'O', explain:'유예 = 위기 ○ + 전념 ✕. 탐색이 활발하게 진행 중인 과도기적 상태이다.' },
    { type:'ox', q:'정체감 혼미는 위기를 경험하지 못했고 전념도 하지 않으며, 정체감 지위 중 가장 취약한 상태이다.', answer:'O', explain:'혼미 = 위기 ✕ + 전념 ✕. 탐색 시도조차 없는 상태로 정체성 발달이 가장 취약하다.' },
    { type:'ox', q:'정체감 지위는 한번 결정되면 변하지 않는 고정된 상태이다.', answer:'X', explain:'정체감 지위는 유동적으로 변화할 수 있다. 일반적으로 혼미 › 유예 › 성취의 경로가 건강한 발달 흐름으로 본다.' },
    { type:'fill', q:'마르시아의 4가지 정체감 지위 중 가장 이상적이고 건강한 상태로, 위기 ○ + 전념 ○에 해당하는 것은 (   )이다.', answer:'정체감 성취', explain:'정체감 성취는 스스로 탐색하고 전념하여 목표를 능동적으로 선택한 가장 건강한 발달 상태이다.' },
    { type:'fill', q:'마르시아 이론에서 교사는 청소년의 정체성 교육을 위해 지식교육보다 직업체험·적성검사 같은 (   ) 교육을 제공해야 한다.', answer:'실제적·맥락적', explain:'정체성 교육을 위해 학생들이 직접 자신의 인생에 직면해보는 과정이 필요하며, 실제적·맥락적 교육이 요구된다.' },
    { type:'mc', q:'다음 설명에 해당하는 마르시아(Marcia)의 정체감 지위는?\n"정체감 위기를 경험하지 못하였으며, 삶의 목표와 가치를 탐색하려는 시도조차 하지 않는 상태"', options:['정체감 유실','정체감 성취','정체감 혼미','정체감 유예'], answer:2, explain:'혼미(Diffusion) = 위기 ✕ + 전념 ✕. 탐색 의지와 전념 모두 없는 상태. [2005초, 2009중 기출 유형]' },
    { type:'mc', q:'마르시아의 4가지 정체감 지위와 위기·전념 조합이 바르게 짝지어진 것은?', options:['유실 — 위기 ○, 전념 ○','유예 — 위기 ○, 전념 ✕','성취 — 위기 ✕, 전념 ○','혼미 — 위기 ○, 전념 ✕'], answer:1, explain:'유예 = 위기 ○ + 전념 ✕ (정답). 유실=위기✕+전념○, 성취=위기○+전념○, 혼미=위기✕+전념✕.' },
    { type:'mc', q:'마르시아 이론에서 자아정체감을 높이기 위한 교사의 역할로 적절하지 않은 것은?', options:['학생들이 직업체험과 적성검사에 참여할 기회를 제공한다.','교사 스스로 솔선수범하여 올바른 모델링을 보여준다.','또래집단 문화 형성을 위해 배려와 관심을 기울인다.','정체성 교육은 지식 위주의 강의 중심 수업으로 한다.'], answer:3, explain:'지식교육 중심이 아닌 실제적·맥락적 체험 교육이 요구된다. 직업체험, 창의적 체험 활동 등이 적절하다.' },
  ];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'marcia'); }

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
