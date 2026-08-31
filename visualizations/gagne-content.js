/**
 * 가네 9가지 수업사태 — 탭 콘텐츠 (리팩토링)
 * SITE_CONFIG + CS(ui.js) 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };
  const CSS_ACCENT = '#D4874A';

  if (!document.getElementById('gagne-content-style')) {
    const s = document.createElement('style');
    s.id = 'gagne-content-style';
    s.textContent = `.gc-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}.gc-table-wrap table{min-width:520px;}@media(max-width:560px){.gc-table-wrap table{min-width:360px;}}`;
    document.head.appendChild(s);
  }

  const STEPS = [
    ['주의집중',       '주의집중 획득',      false],
    ['기대',           '학습목표 제시',       false],
    ['장기→단기 인출', '선수학습 회상',       false],
    ['선택적 지각',    '자극자료 제시',       true ],
    ['의미의 부호화',  '학습안내 제공',       true ],
    ['반응',           '수행 유도',           true ],
    ['강화',           '피드백 제공',         false],
    ['인출과 강화',    '형성평가 (수행평가)', false],
    ['일반화',         '파지와 전이 증진',    false],
  ];
  const GOALS = [
    ['언어정보', '명제적(선언적) 지식. 언어로 표현하는 능력', '군집분석', '#D4874A'],
    ['지적기능', '방법적(절차적) 지식. 상징적 기호 활용 능력', '위계분석', '#3A5AA0'],
    ['인지전략', '기억·사고 학습전략을 찾아 활용하는 능력', '위계·절차 분석', '#2A9E94'],
    ['태도',     '특정 사건·사물에 대한 개인적 성향', '통합분석', '#8050B8'],
    ['운동기능', '신체 근육을 활용하여 동작을 수행하는 능력', '절차분석', '#D05840'],
  ];

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;
    el.innerHTML = `
    <div class="ed-section">
      <div class="ed-h2"><span class="num">01</span> ${C.summary.intro}</div>
      <div class="cs-intro-box">
        <strong>가네(R. Gagné, 1916~2002)</strong> — 미국 교육심리학자.<br>
        학습목표에 따라 적합한 교수방법을 처방해야 한다는 교수설계이론 주창.<br>
        교수활동은 <strong>인간의 내적 학습과정</strong>에 맞추어 이루어져야 한다는 것이 핵심 전제.
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">02</span> 학습의 조건</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="cs-intro-box">
          <div style="font-size:13px;font-weight:700;color:${CSS_ACCENT};margin-bottom:8px;">외적 조건 — 학습자 외부에서 가해지는 교수사태</div>
          ${[['강화의 원리','새로운 행동의 학습은 그 행동에 대해 보상이 주어질 때 잘 일어난다.'],
             ['접근의 원리','자극과 반응이 시간적으로 근접할 때 학습이 더 잘 일어난다.'],
             ['반복의 원리','반복 연습을 하면 학습이 증진되고 파지가 더 잘 일어난다.']].map(([t,d])=>`
            <div style="display:flex;gap:8px;align-items:baseline;font-size:12px;margin-bottom:5px;">
              <span style="font-weight:700;color:var(--text-primary);white-space:nowrap;">${t}</span>
              <span style="color:var(--text-secondary);">${d}</span>
            </div>`).join('')}
        </div>
        <div class="cs-intro-box">
          <div style="font-size:13px;font-weight:700;color:${CSS_ACCENT};margin-bottom:8px;">내적 조건 — 학습자의 내적 인지과정</div>
          ${[['선행학습','이전에 학습한 내적 능력이 있어야 한다.'],
             ['학습동기','학습자의 능동적인 학습동기가 있어야 한다.'],
             ['자아개념','학습에 대한 자신감과 긍정적 자아개념이 있어야 한다.'],
             ['주의력',  '학습이 성공하기 위해서는 학습에 주의를 집중할 수 있어야 한다.']].map(([t,d])=>`
            <div style="display:flex;gap:8px;align-items:baseline;font-size:12px;margin-bottom:5px;">
              <span style="font-weight:700;color:var(--text-primary);white-space:nowrap;">${t}</span>
              <span style="color:var(--text-secondary);">${d}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">03</span> 9가지 수업사태</div>
      <div style="display:flex;flex-direction:column;gap:4px;">
        ${STEPS.map(([inner,outer,star],i)=>`
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:var(--radius-sm);background:var(--bg-surface);">
            <span class="cs-num cs-num-sm ${star?'cs-num-prim':'cs-num-gray'}">${i+1}</span>
            <span style="font-size:11px;color:var(--text-tertiary);white-space:nowrap;min-width:90px;">${inner}</span>
            <span style="font-size:13px;font-weight:${star?700:500};color:${star?CSS_ACCENT:'var(--text-primary)'};">› ${outer}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">04</span> 5가지 수업목표</div>
      <div style="border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--border-light);">
        ${GOALS.map(([name,desc,analysis,color],i,arr)=>`
          <div style="display:flex;align-items:center;gap:12px;padding:9px 14px;background:var(--bg-white);${i<arr.length-1?'border-bottom:1px solid var(--border-light);':''}">
            <div class="cs-num cs-num-sm" style="background:${color};">${i+1}</div>
            <div style="flex:1;min-width:0;">
              <span style="font-size:13px;font-weight:700;color:${color};">${name}</span>
              <span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${desc}</span>
            </div>
            <div style="font-size:10px;font-weight:700;color:${color};background:${color}18;padding:2px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0;">${analysis}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2" style="--subject-accent:#6B6560;"><span class="num">05</span> ${C.summary.essay}</div>
      ${CS.renderEssayGroups([
        { label:'기본 개념', items:['학습목표에 따라 상이한 교수방법 처방','교수활동은 인간의 내적 학습과정에 맞추어 설계'] },
        { label:'9가지 수업사태 핵심 3단계', items:['4단계 — 자극자료 제시 (선택적 지각 촉진)','5단계 — 학습안내 제공 (부호화·정교화·스캐폴딩)','6단계 — 수행 유도 (실제 문제 상황 적용)'] },
        { label:'5가지 수업목표', items:['<strong>언어정보</strong> — 군집분석','<strong>지적기능</strong> — 위계분석','인지전략 — 위계·절차 분석','태도 — 통합분석','운동기능 — 절차분석'] },
      ])}
    </div>

    <div class="ed-section">
      <div class="ed-h2" style="--subject-accent:#6B6560;"><span class="num">06</span> ${C.summary.check}</div>
      ${CS.renderCheckCards([
        { type:'danger',  text:'"자극자료 제시 = 학습안내 제공" → X. 자극자료 제시는 새 정보를 <strong>제시</strong>, 학습안내는 내용을 <strong>종합·부호화</strong>' },
        { type:'danger',  text:'"8단계 형성평가 = 총괄평가" → X. 수업 중 이해 여부를 점검하는 <strong>형성</strong>평가(수행평가)' },
        { type:'danger',  text:'"지적기능 과제분석 = 군집분석" → X. 지적기능은 <strong>위계분석</strong>, 언어정보가 군집분석' },
        { type:'success', text:`<strong style="color:${CSS_ACCENT};">4단계</strong> 선택적 지각 / <strong style="color:${CSS_ACCENT};">5단계</strong> 의미의 부호화 / <strong style="color:${CSS_ACCENT};">6단계</strong> 반응` },
        { type:'success', text:'수업사태 순서: 주의 → 목표 → 선수 → 자극 → 안내 → 수행 → 피드백 → 평가 → 파지' },
      ])}
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `2006중 · 2007중·초 · 2008중 · 2009중·초 · 2011중 · 2012초 · 2013중
        <span class="cs-history-note">9가지 수업사태 + 5가지 수업목표 세트로 완벽 암기 필수.</span>`,
      freqItems: [
        '9가지 수업사태 각 단계와 내적과정 매칭 [2013중]',
        '자극자료 제시 단계 → 선택적 지각(selective perception) 촉진 [2012초]',
        '수업사태 순서 변경·생략 가능 여부 → 가능 [2008중]',
        '학습안내 제공 ≠ 자극자료 제시 — 기능·단계 구분 [2008중]',
        '지적기능의 과제분석 → 위계분석 [2009초]',
        '파지와 전이 증진 단계 → 다양한 문제 추가 제시 [2008중]',
      ],
      normalItems: [
        '가네 학습결과 5가지: 언어정보·지적기능·인지전략·태도·운동기능 [2011중]',
        '인지전략 예 — 암기법, 메타인지, 창조적 능력 [2007초]',
        '태도 수업목표 → 관찰학습·동일시·교사시범 적용 [2007중]',
        '언어정보와 지적기능 구분: 선언적 지식 vs 절차적 지식 [2009초]',
        '수업사태는 학습자의 내적 학습과정을 지원하는 외적 교수활동 [2008중]',
      ],
    });
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox', q:'가네의 수업사태는 학습자의 내적 학습과정을 지원하는 외적 교수활동이다.', answer:'O', explain:'9가지 수업사태는 각각 내적 인지과정(주의집중·기대·부호화 등)에 대응하는 외적 교수활동이다.' },
    { type:'ox', q:'가네의 9가지 수업사태는 반드시 순서대로 진행해야 하며, 생략이나 변경이 불가능하다.', answer:'X', explain:'수업사태의 순서를 변경하거나 생략할 수 있다. [2008중 정답 ②]' },
    { type:'ox', q:'자극자료 제시 단계에서 학습자는 선택적 지각(selective perception)이 촉진된다.', answer:'O', explain:'4단계 자극자료 제시는 학습자의 선택적 지각을 촉진한다. [2012초 핵심]' },
    { type:'ox', q:'가네의 지적기능에 대한 과제분석 방법은 군집분석이다.', answer:'X', explain:'지적기능은 위계분석, 언어정보가 군집분석이다. 혼동 주의!' },
    { type:'ox', q:'파지(retention)란 학습한 내용을 다른 문제 상황에 적용하는 것을 의미한다.', answer:'X', explain:'파지 = 장기기억에 저장. 전이 = 다른 상황에 적용하여 일반화. 두 개념을 구분해야 한다.' },
    { type:'fill', q:'가네의 5단계 학습안내 제공에서 활용하는 인지 전략은 (   )와(과) 정교화이다.', answer:'부호화 (encoding)', explain:'학습안내 제공 단계에서는 부호화(encoding)와 정교화를 활용하여 장기기억을 돕는다.' },
    { type:'fill', q:'가네의 9단계 중 학습한 내용을 실제 문제 상황에 적용해보는 단계는 (   )이다.', answer:'수행 유도 (6단계)', explain:'6단계 수행 유도 — 학습내용을 유사한 실제 문제에 적용. 연습문제·숙제·실험 등이 해당.' },
    { type:'mc', q:'가네(Gagné)의 수업사태에서 "삼각형의 내각의 합이 180°라는 문장에 빨간색 밑줄을 긋는 활동"이 해당하는 단계는? [2012초 변형]', options:['학습목표 제시','선수학습 회상','자극자료 제시','학습안내 제공','수행 유도'], answer:2, explain:'4단계 자극자료 제시 — 독특한 특징(색깔, 밑줄)을 부각하여 선택적 지각을 촉진하는 단계.' },
    { type:'mc', q:'다음 중 가네의 5가지 수업목표와 과제분석 방법이 올바르게 연결된 것은?', options:['언어정보 — 위계분석','지적기능 — 군집분석','태도 — 통합분석','운동기능 — 위계분석'], answer:2, explain:'태도 → 통합분석(군집+위계+절차 혼합). 언어정보→군집분석, 지적기능→위계분석, 운동기능→절차분석.' },
    { type:'mc', q:'가네의 9가지 수업사태를 순서대로 나열한 것은?', options:['주의→목표→자극→선수→안내→수행→피드백→평가→파지','주의→목표→선수→자극→안내→수행→피드백→평가→파지','주의→선수→목표→자극→안내→피드백→수행→평가→파지','주의→목표→선수→안내→자극→수행→피드백→평가→파지'], answer:1, explain:'정답: 주의획득→목표제시→선수학습회상→자극제시→학습안내→수행유도→피드백→형성평가→파지전이' },
  ];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'gagne'); }

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
