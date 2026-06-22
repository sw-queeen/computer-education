/**
 * CS.im — 공통 UI 유틸리티
 * js/ui.js
 *
 * 로드 순서: data.js → config.js → ui.js → (index/concept).html
 *
 * 제공 API:
 *   CS.parseExamItem(text)              → 기출 연도 태그 파싱 HTML
 *   CS.sortExamItems(items)             → 연도 태그 있는 항목 상단 정렬
 *   CS.numBall(n, cls?)                 → 번호 원형 HTML (cls: 'prim'|'gray', default prim)
 *   CS.renderEssayGroups(groups)        → 논술 답안 구조 HTML
 *   CS.renderCheckCards(cards)          → 체크 포인트 카드 HTML
 *   CS.renderExamSection(el, opts)      → 기출 포인트 탭 전체 렌더
 *   CS.renderQuizSection(el, quizData, prefix) → 리마인드 탭 전체 렌더
 */
window.CS = window.CS || {};

(function (CS) {

  /* ── 기출 태그 파싱 ───────────────────────── */
  CS.parseExamItem = function (text) {
    const m = text.match(/\[(.+?)\]/);
    if (!m) return `<span style="color:var(--text-primary);">${text}</span>`;
    const tag  = m[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="cs-exam-tag">${tag}</span><span style="color:var(--text-primary);">${body}</span>`;
  };

  /* ── 정렬 (연도 태그 있는 항목 상단) ─────── */
  CS.sortExamItems = function (items) {
    return [...items].sort((a, b) => {
      const aH = /\[.+?\]/.test(a), bH = /\[.+?\]/.test(b);
      if (aH && !bH) return -1;
      if (!aH && bH) return 1;
      return 0;
    });
  };

  /* ── 번호 원형 HTML ──────────────────────── */
  CS.numBall = function (n, cls) {
    const c = cls === 'gray' ? 'cs-num-gray' : 'cs-num-prim';
    return `<span class="cs-num cs-num-sm ${c}" style="margin-top:2px;">${n}</span>`;
  };

  /* ── 논술 답안 구조 ──────────────────────── */
  // groups: [{ label, items: string[] }]
  CS.renderEssayGroups = function (groups) {
    return groups.map(({ label, items }) => `
      <div class="cs-essay-group">
        <div class="cs-essay-label">${label}</div>
        <div class="cs-essay-items">
          ${items.map((item, i) => `
            <div class="cs-essay-item">
              ${CS.numBall(i + 1, 'gray')}
              <span style="color:var(--text-primary);">${item}</span>
            </div>`).join('')}
        </div>
      </div>`).join('');
  };

  /* ── 체크 포인트 카드 ────────────────────── */
  // cards: [{ type: 'danger'|'success', text }]
  CS.renderCheckCards = function (cards) {
    const LABEL = { danger: '혼동 주의', success: '핵심 암기' };
    return cards.map(({ type, text }) => `
      <div class="cs-check-card cs-check-${type}">
        <span class="cs-check-label">${LABEL[type]}</span>
        <span style="color:var(--text-primary);">${text}</span>
      </div>`).join('');
  };

  /* ── 기출 포인트 탭 렌더 ─────────────────── */
  /*
    opts: {
      historyHTML: string,       // 연도 현황 내부 HTML
      freqItems:   string[],
      normalItems: string[],
    }
  */
  CS.renderExamSection = function (el, opts) {
    if (!el) return;
    const C = window.SITE_CONFIG || {
      exam: { history: '기출 연도 현황', freq: '자주 출제', normal: '간헐 출제' }
    };

    const makeList = (items, cls) =>
      CS.sortExamItems(items).map(item =>
        `<div class="cs-exam-item ${cls}">${CS.parseExamItem(item)}</div>`
      ).join('');

    el.innerHTML = `
      <div class="ed-section">
        <div class="detail-section-title">${C.exam.history}</div>
        <div class="cs-history-box">${opts.historyHTML}</div>
      </div>
      <div class="ed-section">
        <div class="detail-section-title" style="--subject-accent:#A83222;">${C.exam.freq}</div>
        ${makeList(opts.freqItems, 'cs-exam-item-freq')}
      </div>
      <div class="ed-section">
        <div class="detail-section-title" style="--subject-accent:#8A6010;">${C.exam.normal}</div>
        ${makeList(opts.normalItems, 'cs-exam-item-normal')}
      </div>`;
  };

  /* ── 리마인드(퀴즈) 탭 렌더 ─────────────── */
  /*
    quizData: [
      { type:'ox',   q, answer:'O'|'X', explain }
      { type:'fill', q, answer, explain }
      { type:'mc',   q, options:[], answer:number, explain }
    ]
    prefix: 전역 함수명 접두사 (충돌 방지) e.g. 'piaget'
  */
  CS.renderQuizSection = function (el, quizData, prefix) {
    if (!el) return;
    const C = window.SITE_CONFIG || {
      quiz: {
        title: '리마인드', typeOX: 'O / X', typeFill: '빈칸 채우기', typeMC: '객관식',
        btnReveal: '정답 보기', btnRevealed: '정답 확인됨 ✓',
        btnReset: '전체 초기화', explainLabel: '해설',
      }
    };

    let state = quizData.map(() => ({ revealed: false, selected: null }));

    function typeLabel(t) {
      return t === 'ox' ? C.quiz.typeOX : t === 'fill' ? C.quiz.typeFill : C.quiz.typeMC;
    }

    function buildCard(q, i) {
      const s = state[i];
      const reveal = s.revealed;

      /* 선택지 버튼 */
      let choiceHTML = '';

      if (q.type === 'ox') {
        choiceHTML = `<div class="cs-quiz-ox">
          ${['O', 'X'].map(ans => {
            const sel = s.selected === ans, corr = q.answer === ans;
            let cls = '';
            if (reveal && sel)  cls = corr ? 'state-correct' : 'state-wrong';
            else if (sel)       cls = 'state-selected';
            return `<button class="cs-quiz-btn cs-quiz-btn-ox ${cls}"
              onclick="${prefix}QuizPick(${i},'${ans}')">${ans}</button>`;
          }).join('')}
        </div>`;

      } else if (q.type === 'fill') {
        choiceHTML = reveal
          ? `<div class="cs-quiz-fill-answer">정답: ${q.answer}</div>`
          : `<div style="margin-top:10px;">
               <button class="cs-quiz-btn cs-quiz-btn-reveal"
                 onclick="${prefix}QuizPick(${i},'reveal')">${C.quiz.btnReveal}</button>
             </div>`;

      } else {
        choiceHTML = `<div class="cs-quiz-options">
          ${q.options.map((opt, oi) => {
            const sel = s.selected === oi, corr = oi === q.answer;
            let cls = '';
            if (reveal && corr)       cls = 'state-correct';
            else if (reveal && sel)   cls = 'state-wrong';
            else if (!reveal && sel)  cls = 'state-selected';
            return `<button class="cs-quiz-btn cs-quiz-btn-mc ${cls}"
              onclick="${prefix}QuizPick(${i},${oi})">
              <span style="font-weight:700;margin-right:6px;">${oi + 1}.</span>${opt}
            </button>`;
          }).join('')}
        </div>`;
      }

      const explainHTML = reveal
        ? `<div class="cs-quiz-explain">
             <strong>${C.quiz.explainLabel}</strong> ${q.explain}
           </div>` : '';

      return `
        <div class="cs-quiz-card">
          <div class="cs-quiz-type">${typeLabel(q.type)}</div>
          <div class="cs-quiz-q">${i + 1}. ${q.q}</div>
          ${choiceHTML}
          ${explainHTML}
        </div>`;
    }

    function buildAll() {
      el.innerHTML = `
        <div class="ed-section">
          <div class="detail-section-title">
            ${C.quiz.title} — 총 ${quizData.length}문항
          </div>
          ${quizData.map((q, i) => buildCard(q, i)).join('')}
          <button class="cs-quiz-reset" onclick="${prefix}QuizReset()">${C.quiz.btnReset}</button>
        </div>`;
    }

    /* 전역 핸들러 등록 */
    window[`${prefix}QuizPick`] = function (i, val) {
      if (typeof val === 'number') state[i].selected = val;
      else if (val === 'reveal') { /* fill: 그냥 reveal */ }
      else state[i].selected = val; // OX string
      state[i].revealed = true;
      buildAll();
    };
    window[`${prefix}QuizReset`] = function () {
      state = quizData.map(() => ({ revealed: false, selected: null }));
      buildAll();
    };

    buildAll();
  };

})(window.CS);
