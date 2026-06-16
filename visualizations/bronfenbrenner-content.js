/**
 * 브론펜브레너 생태학적 발달이론 — 탭 콘텐츠 (리팩토링)
 * SITE_CONFIG + CS(ui.js) 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };

  const LAYERS = [
    { name:'미시체계', color:'#3A8858', bg:'#E6F2EC', def:'아동의 발달에 직접적으로 영향을 미치는 환경', examples:'가족, 학교, 또래, 놀이터, 유치원, 교회', key:'직접 경험하는 가장 가까운 환경' },
    { name:'중간체계', color:'#2888C8', bg:'#E4F2FA', def:'미시체계들 간의 상호관계', examples:'가정↔학교 관계, 가정↔또래 관계, 부모-교사 협력', key:'두 개 이상 미시체계의 연결 고리' },
    { name:'외체계',   color:'#C87840', bg:'#FBF0E6', def:'아동이 직접 참여하지는 않지만 간접적으로 영향을 미치는 사회적 환경', examples:'부모 직장, 이웃, 교육위원회, 사회복지기관, 대중매체', key:'간접적 영향 · 아동 비참여' },
    { name:'거시체계', color:'#8050B8', bg:'#EEE8F5', def:'외체계를 둘러싼 문화적 환경', examples:'문화, 관습, 법, 이념, 사회규범', key:'사회 전체의 신념·가치 체계' },
    { name:'시간체계', color:'#6B6560', bg:'#F0EDE8', def:'개인의 전 생애에 걸친 변화와 사회·역사적 환경의 변화 (=연대체계)', examples:'부모이혼, 가정폭력, 학교폭력, 남녀평등문제, 역사적 사건', key:'시간적 차원 · 생애 변화' },
  ];

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;
    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title">${C.summary.intro}</div>
      <div class="cs-intro-box">
        <strong>브론펜브레너(U. Bronfenbrenner, 1917~2005)</strong> — 러시아 태생 미국 발달심리학자.<br>
        인간의 발달은 개인을 둘러싼 다층적 환경 체계들과의 <strong>상호작용</strong>을 통해 이루어진다.<br>
        유전과 환경 모두의 영향을 받으며, 아동은 환경에 영향을 주기도 하는 <strong>능동적 존재</strong>이다.
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">이론의 특징</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[
          '개인의 발달은 <strong>유전과 환경 모두</strong>의 영향을 받는다.',
          '아동은 환경에 영향을 받기만 하는 수동적 존재가 아니라, 환경에 영향을 주기도 하는 <strong>능동적 존재</strong>이다.',
          '환경은 상호 연결된 <strong>다층적 체계</strong>로 구성되어 있으며, 아동의 연령 증가에 따라 영향 범위가 미시체계에서 바깥 체계로 이동한다.',
        ].map((text, i) => `
          <div class="cs-num-row">
            <span class="cs-num cs-num-md cs-num-prim">${i+1}</span>
            <div>${text}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">5가지 환경 체계</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${LAYERS.map(l => `
          <div style="border-radius:var(--radius-md);padding:14px 16px;background:${l.bg};">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="font-size:14px;font-weight:800;color:${l.color};">${l.name}</span>
              <span style="margin-left:auto;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:white;color:${l.color};">${l.key}</span>
            </div>
            <div style="font-size:12px;color:var(--text-primary);line-height:1.75;margin-bottom:6px;">${l.def}</div>
            <div style="font-size:11px;color:var(--text-secondary);">예: ${l.examples}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">교육적 시사점</div>
      ${[
        '미시체계에만 집중하는 관점에서 벗어나, <strong>여러 환경체계들 간의 상호관계</strong>의 중요성을 강조했다.',
        '아동을 둘러싼 가정교육뿐만 아니라 <strong>사회 전체의 노력</strong>이 함께 요구된다.',
      ].map((desc, i) => `
        <div class="cs-num-row">
          <span class="cs-num cs-num-md cs-num-gray">${i+1}</span>
          <div>${desc}</div>
        </div>`).join('')}
    </div>

    <div class="detail-section">
      <div class="detail-section-title">다른 이론과 비교</div>
      ${[
        ['피아제 — 인지발달이론', '내적 인지 구조의 발달', '피아제는 아동 내부의 <strong>인지 도식</strong>이 동화·조절·평형화를 거쳐 발달한다고 보았다. 브론펜브레너는 이와 달리 외부 <strong>환경 체계와의 상호작용</strong>에 초점을 둔다. 두 이론 모두 아동을 능동적 존재로 본다는 공통점이 있다.'],
        ['비고츠키 — 사회문화이론', '근접발달영역과 비계설정', '비고츠키는 <strong>근접발달영역·비계</strong>처럼 사회적 상호작용의 구체적 메커니즘을 설명했다. 브론펜브레너는 환경 체계의 <strong>구조와 층위</strong>를 분류하는 데 집중했다. 두 이론 모두 사회적 맥락이 발달에 필수적이라는 관점을 공유한다.'],
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
        { label:'기본 관점 2가지',    items:['유전과 환경의 상호작용', '아동은 능동적 존재'] },
        { label:'5가지 환경 체계',    items:['미 → 중 → 외 → 거 → 시 순서로 열거', '체계명 — 정의 — 구체적 예시(2개 이상) 세트로 서술'] },
        { label:'교육적 시사점 2가지', items:['여러 환경체계들 간의 상호관계의 중요성', '가정교육을 넘어 사회 전체의 노력 필요'] },
        { label:'결론',              items:['교사·학교가 미시체계를 넘어 중간체계(가정-학교 연계) 강화를 위해 노력해야 함'] },
      ])}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      ${CS.renderCheckCards([
        { type:'danger',  text:'외체계 vs 거시체계 — 외체계는 아동이 직접 참여하지 않는 사회적 환경(부모 직장 등). 거시체계는 더 넓은 문화·법·관습 수준. 외체계 ⊂ 거시체계 구조로 외체계가 안쪽임을 주의.' },
        { type:'danger',  text:'시간체계는 고리 밖 별도 차원. 공간적 층위가 아닌 시간적 차원이며, 다른 네 체계와 달리 \'연대체계\'라고도 불린다.' },
        { type:'success', text:'미→중→외→거→시 순서와 각각의 핵심 예시 세트 암기. "다차원 환경 체계 상호작용", "미시에서 바깥층으로 이동" 문구 숙지 필수.' },
      ])}
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `2012초
        <span class="cs-history-note">5가지 환경 체계의 정의와 예시, 이론 특징 진술 구별이 핵심. 4개 진술 중 브론펜브레너를 고르는 형식으로 출제됨.</span>`,
      freqItems: [
        '5가지 환경 체계의 명칭과 정의, 각 예시 [2012초]',
        '생태학적 이론의 특징 진술 (다차원 환경 상호작용, 미시→바깥 이동) [2012초]',
      ],
      normalItems: [
        '유전과 환경 모두의 영향을 받는다는 상호작용 관점',
        '아동은 환경에 영향을 주기도 하는 능동적 존재',
        '미시체계에만 집중하는 관점을 넘어선 다층 환경의 중요성',
        '가정교육뿐 아니라 사회적 노력이 함께 필요하다는 시사점',
      ],
    });
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox', q:'브론펜브레너는 아동이 직접 접촉하는 환경(가족, 학교 등)인 미시체계만이 발달에 영향을 미친다고 주장했다.', answer:'X', explain:'브론펜브레너는 미시체계뿐 아니라 중간체계, 외체계, 거시체계, 시간체계까지 다층적 환경 전체가 발달에 영향을 미친다고 보았다.' },
    { type:'ox', q:'브론펜브레너 이론에서 아동은 환경에 영향을 받기만 하는 수동적 존재가 아니라, 환경에 영향을 주기도 하는 능동적 존재이다.', answer:'O', explain:'생태학적 이론의 핵심 특징 중 하나. 아동과 환경은 양방향 상호작용 관계에 있다.' },
    { type:'ox', q:'중간체계(Mesosystem)란 아동이 직접 참여하지 않지만 간접적으로 영향을 미치는 사회적 환경이다.', answer:'X', explain:'그 설명은 외체계(Exosystem)이다. 중간체계는 미시체계들 간의 상호관계(예: 가정↔학교 관계)를 말한다.' },
    { type:'ox', q:'시간체계는 다른 4개 체계와 달리 공간적 층위가 아닌 시간적 차원을 나타내며, 연대체계라고도 불린다.', answer:'O', explain:'시간체계는 개인의 전 생애 변화와 사회·역사적 환경 변화를 포함하며, 동심원 구조 밖의 별도 차원이다.' },
    { type:'ox', q:'브론펜브레너는 개인의 발달은 유전보다 환경에 더 큰 영향을 받는다고 주장했다.', answer:'X', explain:'브론펜브레너는 유전과 환경 모두의 영향을 받는다고 주장했다. 어느 한쪽을 더 강조하지 않는다.' },
    { type:'fill', q:'브론펜브레너의 생태학적 이론에서 아동이 직접 참여하지는 않지만 간접적으로 영향을 미치는 환경 — 부모 직장, 교육위원회, 대중매체 등이 해당하는 체계는 (   )이다.', answer:'외체계', explain:'외체계는 아동이 직접 관여하지 않는 사회적 환경으로, 부모 직장, 이웃, 교육위원회, 사회복지기관, 대중매체 등이 포함된다.' },
    { type:'fill', q:'브론펜브레너 이론에서 5개 체계 중 유일하게 공간적 층위가 아닌 (   )적 차원을 나타내는 체계는 시간체계이다.', answer:'시간', explain:'시간체계(연대체계)는 개인의 전 생애에 걸친 변화와 사회·역사적 환경 변화를 다루는, 동심원 구조와 구분되는 시간적 차원이다.' },
    { type:'mc', q:'다음 중 브론펜브레너의 거시체계에 해당하는 예로 가장 적절한 것은?', options:['가정과 학교의 상호관계','부모의 직장 환경과 근무 시간','사회 전반의 문화, 관습, 법','아동이 다니는 학교와 또래 집단'], answer:2, explain:'거시체계는 문화·관습·법·이념·사회규범 등이 포함된다. ①은 중간체계, ②는 외체계, ④는 미시체계.' },
    { type:'mc', q:'브론펜브레너의 생태학적 이론에 대한 설명으로 옳지 않은 것은?', options:['개인의 발달은 유전과 환경 모두의 영향을 받는다.','미시체계들 간의 상호관계를 중간체계라 한다.','아동 발달에 영향을 미치는 환경은 연령 증가에 따라 미시체계에서 바깥 체계로 이동한다.','아동은 환경에 일방적으로 영향을 받는 수동적 존재이다.'], answer:3, explain:'브론펜브레너는 아동을 능동적 존재로 보았다. 나머지 보기는 모두 옳다. [2012초 유형]' },
    { type:'mc', q:'다음 중 브론펜브레너의 중간체계에 해당하는 예로 적절한 것은?', options:['아동이 다니는 교회와 또래 집단','부모와 교사 간의 협력 관계','남녀평등에 관한 사회적 이념','아동의 부모이혼 경험'], answer:1, explain:'중간체계는 미시체계들 간의 상호관계. 부모-교사 협력은 가정(미시)↔학교(미시) 간의 관계로 중간체계에 해당한다.' },
  ];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'bronf'); }

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
