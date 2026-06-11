/**
 * 가네 9가지 수업사태 — 탭 콘텐츠
 * 원페이지(1) 교수학습이론 기반 / SITE_CONFIG 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }

  const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
    quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식', btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  const ACCENT = '#D4874A';
  const BG     = '#FBF0E6';
  const FONT   = 'var(--font-body, var(--font-main))';

  if (!document.getElementById('gagne-content-style')) {
    const s = document.createElement('style');
    s.id = 'gagne-content-style';
    s.textContent = `
      .gc-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
      .gc-table-wrap table { min-width:520px; }
      .gc-point-tag { display:inline-block; font-size:10px; font-weight:700; padding:1px 7px; border-radius:4px; margin-right:6px; }
      @media(max-width:560px) { .gc-table-wrap table { min-width:360px; } }
    `;
    document.head.appendChild(s);
  }

  function parseExamItem(text) {
    const m = text.match(/\[(.+?)\]/);
    if (!m) return `<span style="color:var(--text-primary,#2C2825);">${text}</span>`;
    const tag = m[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="gc-point-tag" style="background:${BG};color:${ACCENT};font-weight:700;">${tag}</span><span style="color:var(--text-primary,#2C2825);">${body}</span>`;
  }
  function sortExamItems(items) {
    return [...items].sort((a,b) => {
      const aH=/\[.+?\]/.test(a), bH=/\[.+?\]/.test(b);
      if(!aH&&bH) return -1; if(aH&&!bH) return 1; return 0;
    });
  }

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    // 수업사태 표 데이터 — ★ 있는 항목은 색상 강조 (기호 제거)
    const steps = [
      ['주의집중',               '1. 주의집중 획득',    false, '수업이 이루어지기 위해 학습자의 주의력을 획득해야 한다.'],
      ['기대',                   '2. 학습목표 제시',    false, '수업 후 얻게 되는 수업결과를 명확히 알려줌으로써 기대감과 동기를 향상시킨다.'],
      ['장기→단기 인출',         '3. 선수학습 회상',    false, '새로운 지식은 선행학습을 기반으로 이루어지므로, 이전 학습내용을 먼저 확인한다.'],
      ['선택적 지각',            '4. 자극자료 제시',    true,  '학습자에게 학습 내용을 제시하는 단계. 독특한 특징을 부각하면 기억하기 쉽다. 선택적 지각 촉진.'],
      ['의미의 부호화',          '5. 학습안내 제공',    true,  '학습 내용들을 종합하고 상관관계를 제시하여 장기기억을 돕는다. 부호화·정교화·스캐폴딩 활용.'],
      ['반응',                   '6. 수행 유도',        true,  '학습한 내용을 유사한 실제 문제 상황에 적용해보는 단계.'],
      ['강화',                   '7. 피드백 제공',      false, '성공 수행에는 즉각 강화(칭찬), 실패 시에는 재학습 기회 제공 후 긍정적 피드백.'],
      ['인출과 강화',            '8. 형성평가 (수행평가)', false, '수업목표 달성 여부를 평가. 단순암기가 아닌 수행평가로 이해 점검.'],
      ['일반화',                 '9. 파지와 전이 증진', false, '연습 기회를 계속 제공하여 장기기억 저장(파지)과 다른 상황에의 적용(전이)을 증진한다.'],
    ];

    // 5가지 수업목표 — ★ 제거
    const goals = [
      ['언어정보', '명제적(선언적) 지식. 사실·개념·원리를 기억해 언어로 표현', '군집분석', '#D4874A', BG],
      ['지적기능', '방법적(절차적) 지식. 상징적 기호를 사용하여 진술하는 능력', '위계분석', '#3A5AA0', '#E6EAF5'],
      ['인지전략', '기억·사고 전략을 찾아내 활용하는 능력. 메타인지 포함', '위계·절차 분석', '#2A9E94', '#E0F5F2'],
      ['태도',     '특정 사건·사물·사람에 대한 개인적 성향', '통합분석', '#8050B8', '#EEE8F5'],
      ['운동기능', '신체 근육을 활용하여 특정 동작을 수행하는 능력', '절차분석', '#D05840', '#FAE8E4'],
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.intro}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.85;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong>가네(R. Gagné, 1916~2002)</strong> — 미국 교육심리학자.<br>
        학습목표에 따라 적합한 교수방법을 처방해야 한다는 교수설계이론 주창.<br>
        교수활동은 <strong>인간의 내적 학습과정</strong>에 맞추어 이루어져야 한다는 것이 핵심 전제.
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">학습의 조건</div>
      <div style="display:flex;flex-direction:column;gap:10px;font-family:${FONT};">

        <!-- 외적 조건 -->
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:12px 16px;">
          <div style="font-weight:700;color:${ACCENT};margin-bottom:8px;font-size:13px;">① 학습자의 외적 조건 — 학습자 외부에서 가해지는 다양한 교수사태</div>
          <div style="display:flex;flex-direction:column;gap:5px;font-size:12px;">
            ${[
              ['강화의 원리', '새로운 행동의 학습은 그 행동에 대해 보상이 주어질 때 잘 일어난다.'],
              ['접근의 원리', '자극과 반응이 시간적으로 근접할 때 학습이 더 잘 일어난다.'],
              ['반복의 원리', '반복 연습을 하면 학습이 증진되고 파지가 더 잘 일어난다.'],
            ].map(([t,d]) => `
              <div style="display:flex;gap:6px;">
                <span style="font-weight:700;color:${ACCENT};white-space:nowrap;">${t}</span>
                <span style="color:var(--text-secondary,#6B6560);">– ${d}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- 내적 조건 -->
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:12px 16px;">
          <div style="font-weight:700;color:${ACCENT};margin-bottom:8px;font-size:13px;">② 학습자의 내적 조건 — 학습자의 내적 인지과정</div>
          <div style="display:flex;flex-direction:column;gap:5px;font-size:12px;">
            ${[
              ['선행학습',  '이전에 학습한 내적 능력이 있어야 한다.'],
              ['학습동기',  '학습자의 능동적인 학습동기가 있어야 한다.'],
              ['자아개념',  '학습에 대한 자신감과 긍정적 자아개념이 있어야 한다.'],
              ['주의력',    '학습이 성공하기 위해서는 학습에 주의를 집중할 수 있어야 한다.'],
            ].map(([t,d]) => `
              <div style="display:flex;gap:6px;">
                <span style="font-weight:700;color:${ACCENT};white-space:nowrap;">${t}</span>
                <span style="color:var(--text-secondary,#6B6560);">– ${d}</span>
              </div>`).join('')}
          </div>
        </div>

      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">9가지 수업사태</div>
      <div class="gc-table-wrap">
        <table style="width:100%;border-collapse:collapse;font-size:12px;font-family:${FONT};">
          <thead>
            <tr style="background:${BG};">
              <th style="padding:7px 10px;text-align:left;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">내적 과정</th>
              <th style="padding:7px 10px;text-align:left;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">수업(외적)사태</th>
              <th style="padding:7px 10px;text-align:left;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">설명</th>
            </tr>
          </thead>
          <tbody>
            ${steps.map(([inner,outer,star,desc],i) => `
              <tr style="border-bottom:1px solid var(--border-light,rgba(0,0,0,.07));${i%2?'background:var(--bg-page,#faf9f7)':''}">
                <td style="padding:7px 10px;color:var(--text-secondary,#6B6560);white-space:nowrap;">${inner}</td>
                <td style="padding:7px 10px;font-weight:700;color:${star?ACCENT:'var(--text-primary,#2C2825)'};white-space:nowrap;">${outer}</td>
                <td style="padding:7px 10px;color:var(--text-secondary,#6B6560);line-height:1.6;">${desc}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">5가지 수업목표</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};font-size:12px;">
        ${goals.map(([name, desc, analysis, color, bg]) => `
          <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:${bg};border-radius:8px;border-left:3px solid ${color};">
            <div>
              <strong style="color:${color};">${name}</strong>
              <span style="color:var(--text-secondary,#6B6560);margin-left:6px;">${desc}</span>
              <div style="margin-top:3px;font-size:10px;color:${color};font-weight:700;">▶ 과제분석: ${analysis}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};font-size:13px;">

        <div style="padding:10px 14px;background:var(--bg-surface,#F0EDE8);border-radius:8px;line-height:1.8;">
          <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.04em;margin-bottom:6px;">기본 개념</div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${['학습목표에 따라 상이한 교수방법 처방','교수활동은 인간의 내적 학습과정에 맞추어 설계해야 함'].map((item,i) => `
              <div style="display:flex;gap:7px;align-items:flex-start;">
                <span style="background:#A09890;color:white;border-radius:50%;min-width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">${i+1}</span>
                <span style="color:var(--text-primary,#2C2825);">${item}</span>
              </div>`).join('')}
          </div>
        </div>

        <div style="padding:10px 14px;background:var(--bg-surface,#F0EDE8);border-radius:8px;line-height:1.8;">
          <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.04em;margin-bottom:6px;">9가지 수업사태 핵심 3단계</div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${[
              ['4단계', '자극자료 제시 — 선택적 지각 촉진'],
              ['5단계', '학습안내 제공 — 부호화·정교화·스캐폴딩'],
              ['6단계', '수행 유도 — 실제 문제 상황 적용'],
            ].map(([stage, text], i) => `
              <div style="display:flex;gap:7px;align-items:flex-start;">
                <span style="background:${ACCENT};color:white;border-radius:50%;min-width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">${i+1}</span>
                <span style="color:var(--text-primary,#2C2825);"><strong style="color:${ACCENT};">${stage}</strong> ${text}</span>
              </div>`).join('')}
          </div>
        </div>

        <div style="padding:10px 14px;background:var(--bg-surface,#F0EDE8);border-radius:8px;line-height:1.8;">
          <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.04em;margin-bottom:6px;">5가지 수업목표</div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${[
              ['<strong>언어정보</strong>', '군집분석'],
              ['<strong>지적기능</strong>', '위계분석'],
              ['인지전략',                  '위계·절차 분석'],
              ['태도',                      '통합분석'],
              ['운동기능',                  '절차분석'],
            ].map(([name, analysis], i) => `
              <div style="display:flex;gap:7px;align-items:flex-start;">
                <span style="background:#A09890;color:white;border-radius:50%;min-width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">${i+1}</span>
                <span style="color:var(--text-primary,#2C2825);">${name} <span style="color:var(--text-secondary,#6B6560);">— 과제분석: ${analysis}</span></span>
              </div>`).join('')}
          </div>
        </div>

      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};font-size:12px;">
        ${[
          ['혼동 주의', '#D05840', '"자극자료 제시 = 학습안내 제공" → X. 자극자료 제시는 새 정보를 <strong>제시</strong>하는 단계, 학습안내는 내용을 <strong>종합·부호화</strong>하는 단계'],
          ['혼동 주의', '#D05840', '"8단계 형성평가 = 총괄평가" → X. 이 단계는 수업 중 이해 여부를 점검하는 <strong>형성</strong>평가(수행평가)'],
          ['혼동 주의', '#D05840', '"지적기능 과제분석 = 군집분석" → X. 지적기능은 <strong>위계분석</strong>, 언어정보가 군집분석'],
          ['핵심 암기', '#2D8A6A', '<strong style="color:#D4874A;">4단계</strong> 선택적 지각 / <strong style="color:#D4874A;">5단계</strong> 의미의 부호화 / <strong style="color:#D4874A;">6단계</strong> 반응 — 3개가 빈출 짝꿍'],
          ['핵심 암기', '#2D8A6A', '수업사태 순서: 주의 → 목표 → 선수 → 자극 → 안내 → 수행 → 피드백 → 평가 → 파지'],
        ].map(([label, color, text]) => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;border-left:3px solid ${color};">
            <span style="display:inline-block;background:${color};color:white;font-size:10px;font-weight:700;padding:1px 8px;border-radius:20px;margin-right:8px;">${label}</span>
            <span style="color:var(--text-primary,#2C2825);">${text}</span>
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const freqItems = [
      '9가지 수업사태 각 단계와 내적과정 매칭 [2013중]',
      '자극자료 제시 단계 → 선택적 지각(selective perception) 촉진 [2012초]',
      '수업사태 순서 변경·생략 가능 여부 → 가능 [2008중]',
      '학습안내 제공 ≠ 자극자료 제시 — 기능·단계 구분 [2008중]',
      '지적기능의 과제분석 → 위계분석 [2009초]',
      '파지와 전이 증진 단계 → 다양한 문제 추가 제시 [2008중]',
    ];
    const normalItems = [
      '가네 학습결과 5가지: 언어정보·지적기능·인지전략·태도·운동기능 [2011중]',
      '인지전략 예 — 암기법, 메타인지, 창조적 능력 [2007초]',
      '태도 수업목표 → 관찰학습·동일시·교사시범 적용 [2007중]',
      '언어정보와 지적기능 구분: 선언적 지식 vs 절차적 지식 [2009초]',
      '수업사태는 학습자의 내적 학습과정을 지원하는 외적 교수활동 [2008중]',
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.history}</div>
      <div style="background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:2;color:var(--text-primary,#2C2825);font-family:${FONT};">
        2006중 · 2007중·초 · 2008중 · 2009중·초 · 2011중 · 2012초 · 2013중<br>
        <span style="font-size:11px;color:var(--text-tertiary,#A09890);">9가지 수업사태 + 5가지 수업목표 세트로 완벽 암기 필수.</span>
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
    { type:'ox', q:'가네의 수업사태는 학습자의 내적 학습과정을 지원하는 외적 교수활동이다.', answer:'O', explain:'9가지 수업사태는 각각 내적 인지과정(주의집중·기대·부호화 등)에 대응하는 외적 교수활동이다.' },
    { type:'ox', q:'가네의 9가지 수업사태는 반드시 순서대로 진행해야 하며, 생략이나 변경이 불가능하다.', answer:'X', explain:'수업사태의 순서를 변경하거나 생략할 수 있다. [2008중 정답 ②]' },
    { type:'ox', q:'자극자료 제시 단계에서 학습자는 선택적 지각(selective perception)이 촉진된다.', answer:'O', explain:'4단계 자극자료 제시는 학습자의 선택적 지각을 촉진한다. [2012초 핵심]' },
    { type:'ox', q:'가네의 지적기능에 대한 과제분석 방법은 군집분석이다.', answer:'X', explain:'지적기능은 위계분석, 언어정보가 군집분석이다. 혼동 주의!' },
    { type:'ox', q:'파지(retention)란 학습한 내용을 다른 문제 상황에 적용하는 것을 의미한다.', answer:'X', explain:'파지 = 장기기억에 저장. 전이 = 다른 상황에 적용하여 일반화. 두 개념을 구분해야 한다.' },
    { type:'fill', q:'가네의 5단계 학습안내 제공에서 활용하는 인지 전략은 (   )와(과) 정교화이다.', answer:'부호화 (encoding)', explain:'학습안내 제공 단계에서는 부호화(encoding)와 정교화를 활용하여 장기기억을 돕는다.' },
    { type:'fill', q:'가네의 9단계 중 학습한 내용을 실제 문제 상황에 적용해보는 단계는 (   )이다.', answer:'수행 유도 (6단계)', explain:'6단계 수행 유도 — 학습내용을 유사한 실제 문제에 적용. 연습문제·숙제·실험 등이 해당.' },
    { type:'mc', q:'가네(Gagné)의 수업사태에서 "삼각형의 내각의 합이 180°라는 문장에 빨간색 밑줄을 긋는 활동"이 해당하는 단계는? [2012초 변형]', options:['학습목표 제시','선수학습 회상','자극자료 제시','학습안내 제공','수행 유도'], answer:2, explain:'4단계 자극자료 제시 — 독특한 특징(색깔, 밑줄)을 부각하여 선택적 지각을 촉진하는 단계.' },
    { type:'mc', q:"다음 중 가네의 5가지 수업목표와 과제분석 방법이 올바르게 연결된 것은?", options:['언어정보 — 위계분석','지적기능 — 군집분석','태도 — 통합분석','운동기능 — 위계분석'], answer:2, explain:'태도 → 통합분석(군집+위계+절차 혼합). 언어정보→군집분석, 지적기능→위계분석, 운동기능→절차분석.' },
    { type:'mc', q:'가네의 9가지 수업사태를 순서대로 나열한 것은?', options:['주의→목표→자극→선수→안내→수행→피드백→평가→파지','주의→목표→선수→자극→안내→수행→피드백→평가→파지','주의→선수→목표→자극→안내→피드백→수행→평가→파지','주의→목표→선수→안내→자극→수행→피드백→평가→파지'], answer:1, explain:'정답: 주의획득→목표제시→선수학습회상→자극제시→학습안내→수행유도→피드백→형성평가→파지전이' },
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
                return `<button onclick="gagneQuizOX(${i},'${ans}')" style="flex:1;padding:9px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">${ans}</button>`;
              }).join('')}
            </div>`;
          } else if (q.type==='fill') {
            qBody = `<div style="margin-top:10px;">
              <button onclick="gagneQuizReveal(${i})" style="width:100%;padding:9px;border-radius:8px;border:1.5px solid ${s.revealed?ACCENT:'var(--border-light,#e0ddd8)'};background:${s.revealed?BG:'var(--bg-white,#fff)'};font-size:12px;font-weight:600;cursor:pointer;color:${s.revealed?ACCENT:'var(--text-secondary,#6B6560)'};font-family:inherit;">${s.revealed?C.quiz.btnRevealed:C.quiz.btnReveal}</button>
            </div>`;
          } else {
            qBody = `<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
              ${q.options.map((opt,oi) => {
                let border='1.5px solid var(--border-light,#e0ddd8)',bg='var(--bg-white,#fff)',color='var(--text-primary,#2C2825)';
                if(s.revealed){if(oi===q.answer){border=`1.5px solid ${ACCENT}`;bg=BG;color=ACCENT;}else if(s.selected===oi){border='1.5px solid #D05840';bg='#FDECEA';color='#A83222';}}
                else if(s.selected===oi){border=`1.5px solid ${ACCENT}`;bg='var(--bg-surface,#f7f4f0)';}
                return `<button onclick="gagneQuizMC(${i},${oi})" style="text-align:left;padding:9px 12px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:12px;cursor:pointer;font-family:inherit;line-height:1.5;"><span style="font-weight:700;margin-right:6px;">${oi+1}.</span>${opt}</button>`;
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
          <button onclick="gagneQuizReset()" style="padding:10px 28px;border-radius:20px;border:1.5px solid var(--border-light,#e0ddd8);background:var(--bg-surface,#F0EDE8);font-size:13px;cursor:pointer;color:var(--text-secondary,#6B6560);font-family:inherit;">${C.quiz.btnReset}</button>
        </div>
      </div>`;
    }

    window.gagneQuizOX     = (i,ans) => { state[i].selected=ans; state[i].revealed=true; renderAll(); };
    window.gagneQuizReveal = i       => { state[i].revealed=true; renderAll(); };
    window.gagneQuizMC     = (i,oi)  => { state[i].selected=oi; state[i].revealed=true; renderAll(); };
    window.gagneQuizReset  = ()      => { state=QUIZ_DATA.map(()=>({revealed:false,selected:null})); renderAll(); };
    renderAll();
  }

  /* ── 초기화 ── */
  function init() {
    renderSummary(); renderExam(); renderQuiz();
  }
  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    const obs = new MutationObserver(() => {
      if ($('tab-summary') && $('tab-exam') && $('tab-quiz')) { obs.disconnect(); init(); }
    });
    obs.observe(document.getElementById('main')||document.body, {childList:true, subtree:true});
    if ($('tab-summary')) init();
  }
})();
