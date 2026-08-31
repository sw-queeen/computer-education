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
 *   CS.wobble(el)                       → 젤리 워블 애니메이션 1회 재생
 *                                          (버튼류는 document 위임 클릭으로 자동 부착됨)
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
        <div class="ed-h2" style="--subject-accent:var(--text-tertiary);"><span class="num">01</span> ${C.exam.history}</div>
        <div class="cs-history-box">${opts.historyHTML}</div>
      </div>
      <div class="ed-section">
        <div class="ed-h2"><span class="num">02</span> ${C.exam.freq}</div>
        ${makeList(opts.freqItems, 'cs-exam-item-freq')}
      </div>
      <div class="ed-section">
        <div class="ed-h2" style="--subject-accent:var(--secondary);"><span class="num">03</span> ${C.exam.normal}</div>
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

      /* 선택지 HTML */
      let choiceHTML = '';

      if (q.type === 'ox') {
        choiceHTML = `<div class="ed-quiz-ox">
          ${['O', 'X'].map(ans => {
            let cls = 'ed-quiz-ox-btn';
            if (reveal && s.selected === ans) cls += (ans === q.answer) ? ' picked-correct' : ' picked-wrong';
            return `<button class="${cls}" onclick="${prefix}QuizPick(${i},'${ans}')">${ans}</button>`;
          }).join('')}
        </div>`;

      } else if (q.type === 'fill') {
        choiceHTML = reveal
          ? `<div class="ed-quiz-fill-answer"><span class="fill-label">정답:</span> <span class="fill-value">${q.answer}</span></div>`
          : `<button class="ed-quiz-fill-btn" onclick="${prefix}QuizPick(${i},'reveal')">${C.quiz.btnReveal}</button>`;

      } else {
        choiceHTML = `<div class="ed-quiz-mc">
          ${q.options.map((opt, oi) => {
            const sel = s.selected === oi, corr = oi === q.answer;
            let cls = 'ed-quiz-mc-btn';
            if (reveal && corr)      cls += ' correct';
            else if (reveal && sel)  cls += ' wrong';
            return `<button class="${cls}" onclick="${prefix}QuizPick(${i},${oi})">${oi + 1}. ${opt}</button>`;
          }).join('')}
        </div>`;
      }

      const explainHTML = reveal ? `<div class="ed-quiz-explain">${q.explain}</div>` : '';

      return `
        <div class="ed-quiz-item">
          <div class="ed-quiz-n">${typeLabel(q.type)}</div>
          <div class="ed-quiz-q">${i + 1}. ${q.q}</div>
          ${choiceHTML}
          ${explainHTML}
        </div>`;
    }

    function buildAll() {
      el.innerHTML = `
        <div class="ed-section">
          <div class="ed-h2" style="--subject-accent:var(--text-tertiary);"><span class="num">04</span> ${C.quiz.title} — 총 ${quizData.length}문항</div>
          ${quizData.map((q, i) => buildCard(q, i)).join('')}
        </div>
        <div class="quiz-footer">
          <button class="ed-reset" onclick="${prefix}QuizReset()">${C.quiz.btnReset}</button>
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

  /* ── 젤리 워블 클릭 인터랙션 ──────────────────
     .cs-wobble 클래스를 위임 클릭으로 자동 부착/해제한다.
     각 컴포넌트가 개별로 JS를 작성할 필요 없이, 아래 셀렉터에
     해당하는 요소를 클릭하면 components.css의 csWobble
     키프레임이 재생된다. prefers-reduced-motion에서는 아예 붙이지 않는다. */
  var WOBBLE_SELECTOR = [
    '.filter-btn', '.cs-quiz-btn', '.quiz-option', '.concept-card',
    '.sb-subject-chip', '.sb-area-head', '.rail-item', '.rs-item',
    '.mode-toggle-btn', '.cs-quiz-reset', '.scroll-top-btn',
    '.topbar-menu-btn', '.explore-tab-btn', '.detail-tab',
    '.ed-quiz-ox-btn', '.ed-quiz-mc-btn', '.ed-quiz-fill-btn',
    '.ed-reset', '.test-link-btn',
    '.viz-tab', '.viz-card.clickable', '.viz-nav-btn'
  ].join(', ');

  CS.wobble = function (el) {
    if (!el) return;
    el.classList.remove('cs-wobble');
    void el.offsetWidth; // 리플로우 강제 — 연타 시 애니메이션 재시작
    el.classList.add('cs-wobble');
    window.setTimeout(function () {
      el.classList.remove('cs-wobble');
    }, 950);
  };

  function initWobble() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest(WOBBLE_SELECTOR);
      if (el) CS.wobble(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWobble);
  } else {
    initWobble();
  }

  /* ── 개념 카드: 마우스 3D 틸트 + 컬러 스포트라이트 + 형제 카드 흐려짐 ──
     document에 위임(delegation)으로 붙여서, 카드 그리드가 나중에
     다시 렌더링돼도(챕터 전환, 필터 등) 별도 재초기화가 필요 없다.
     색은 하드코딩하지 않고 --subject-accent를 그대로 읽는다
     (components.css .concept-card::before 참고). */
  var TILT_MAX_DEG = 8;

  function initConceptCardTilt() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    document.addEventListener('mousemove', function (e) {
      var card = e.target.closest && e.target.closest('.concept-card');
      if (!card) return;
      var rect = card.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / rect.width;
      var ny = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', (nx * 100) + '%');
      card.style.setProperty('--my', (ny * 100) + '%');
      card.style.setProperty('--tilt-x', (TILT_MAX_DEG * (0.5 - ny) * 2) + 'deg');
      card.style.setProperty('--tilt-y', (TILT_MAX_DEG * (nx - 0.5) * 2) + 'deg');
    });

    document.addEventListener('mouseover', function (e) {
      var card = e.target.closest && e.target.closest('.concept-card');
      if (!card || card.classList.contains('is-hovered')) return;
      if (card.contains(e.relatedTarget)) return;
      card.classList.add('is-hovered');
      var grid = card.closest('.card-grid');
      if (grid) grid.classList.add('has-hover');
    });

    document.addEventListener('mouseout', function (e) {
      var card = e.target.closest && e.target.closest('.concept-card');
      if (!card) return;
      if (card.contains(e.relatedTarget)) return;
      card.classList.remove('is-hovered');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      var grid = card.closest('.card-grid');
      if (grid) grid.classList.remove('has-hover');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConceptCardTilt);
  } else {
    initConceptCardTilt();
  }

})(window.CS);
