/**
 * 마르시아 정체성 지위 이론 — 인터랙티브 시각화
 * 마운트: #viz-container
 *
 * 탭/카드/번호원은 components.css의 공용 유리 컴포넌트(.viz-*)를 쓴다.
 * 4가지 정체감 지위는 매트릭스 칸마다 늘 자기 색이 보여야 하므로
 * .viz-card.tinted를 쓰고, 각 칸에 --viz-accent만 지정해 넘긴다.
 */
(function () {

  const FONT = "var(--font-body,var(--font-main),'Pretendard','Apple SD Gothic Neo',sans-serif)";

  if (!document.getElementById('marcia-viz-style')) {
    const s = document.createElement('style');
    s.id = 'marcia-viz-style';
    s.textContent = `
      #marcia-wrap { font-family:${FONT}; max-width:100%; color:var(--text-primary); }
      #marcia-wrap * { box-sizing:border-box; }

      /* ── 매트릭스 레이아웃: 3×3 그리드 ── */
      #marcia-wrap .mv-matrix-wrap {
        display:grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: 1fr auto 1fr;
        gap:8px;
      }
      /* 가운데 레이블 칸 */
      #marcia-wrap .mv-mid-label {
        display:flex; align-items:center; justify-content:center;
        font-size:11px; font-weight:700;
        color:var(--text-secondary);
        padding:4px 10px; border-radius:20px;
        background:var(--bg-surface);
        backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        white-space:nowrap;
      }
      #marcia-wrap .mv-cell-title { font-family:var(--font-heading,var(--font-main)); font-size:16px; font-weight:700; margin-bottom:3px; line-height:1.2; }
      #marcia-wrap .mv-cell-desc { font-size:11px; line-height:1.65; color:var(--text-secondary); }
      #marcia-wrap .mv-cell-keyword {
        margin-top:7px; font-size:11px; font-weight:700;
        color:var(--viz-accent); padding:5px 9px;
        background:var(--bg-overlay); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        border-radius:7px; display:none;
      }
      #marcia-wrap .mv-cell.on .mv-cell-keyword { display:block; }
      #marcia-wrap .mv-cell-example {
        margin-top:5px; font-size:11px; color:var(--text-tertiary); display:none; line-height:1.6;
      }
      #marcia-wrap .mv-cell.on .mv-cell-example { display:block; }

      /* ── 비교 테이블 ── */
      #marcia-wrap .mv-compare-table {
        width:100%; border-collapse:collapse; font-size:12px; font-family:${FONT};
      }
      #marcia-wrap .mv-compare-table th {
        padding:10px 12px; text-align:left; font-size:11px; font-weight:700;
        letter-spacing:.04em; border-bottom:2px solid var(--border-mid);
        background:var(--bg-surface); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
      }
      #marcia-wrap .mv-compare-table td {
        padding:9px 12px; border-bottom:1px solid var(--border-light);
        line-height:1.6; vertical-align:top;
      }
      #marcia-wrap .mv-compare-table tr:hover td { background: rgba(108,99,255,0.06); }

      /* ── 발달 경로 ── */
      #marcia-wrap .mv-path-item {
        display:flex; align-items:flex-start; gap:12px;
        padding:12px 0; border-bottom:1px solid var(--border-light);
      }
      #marcia-wrap .mv-path-item:last-child { border-bottom:none; }

      @media(max-width:480px) {
        #marcia-wrap .mv-cell-title { font-size:12px; }
        #marcia-wrap .mv-cell-desc { font-size:10px; }
        #marcia-wrap .mv-mid-label { font-size:9px; padding:2px 6px; }
      }
    `;
    document.head.appendChild(s);
  }

  const STATUSES = [
    {
      id: 'foreclosure', title: '정체감 유실', titleSub: '(폐쇄)',
      crisis: false, commitment: true,
      accent: '#C87840', text: '#7A4018',
      desc: '탐색 없이 타인의 가치관·목표를 그대로 따르는 단계',
      keyword: '남의 가치관을 그대로 따름',
      example: '예: 부모가 원하는 직업을 의심 없이 선택하는 경우',
    },
    {
      id: 'achievement', title: '정체감 성취', titleSub: '(확립)',
      crisis: true, commitment: true,
      accent: '#3A8858', text: '#1E5A3C',
      desc: '스스로 탐색하고 전념하여 정체성을 확립한 단계',
      keyword: '삶의 목표를 능동적으로 선택함',
      example: '예: 다양한 직업을 탐색한 후 스스로 진로를 결정한 경우',
    },
    {
      id: 'diffusion', title: '정체감 혼미', titleSub: '',
      crisis: false, commitment: false,
      accent: '#7848A8', text: '#3E1E6A',
      desc: '탐색도 전념도 없이 방향감 없이 떠다니는 단계',
      keyword: '가치 있는 활동에 전념하지 않음',
      example: '예: 진로나 가치관에 무관심하며 그냥 흘러가는 경우',
    },
    {
      id: 'moratorium', title: '정체감 유예', titleSub: '(모라토리움)',
      crisis: true, commitment: false,
      accent: '#3A5AA0', text: '#1A2E60',
      desc: '위기를 경험하며 적극적으로 정체성을 탐색 중인 단계',
      keyword: '적극적으로 정체성을 탐색함',
      example: '예: 여러 분야를 탐색하며 자신에게 맞는 길을 찾는 중인 경우',
    },
  ];

  let curTab = 'matrix';
  let activeCell = null;

  function render() {
    const container = document.getElementById('viz-container');
    if (!container) return;
    container.innerHTML = `
      <div id="marcia-wrap">
        <div class="viz-tabs">
          <div class="viz-tab ${curTab==='matrix'?'on':''}" onclick="marciaTab('matrix')">정체감 지위 매트릭스</div>
          <div class="viz-tab ${curTab==='compare'?'on':''}" onclick="marciaTab('compare')">4가지 비교표</div>
          <div class="viz-tab ${curTab==='path'?'on':''}"   onclick="marciaTab('path')">발달 경로</div>
        </div>
        <div id="mv-matrix" style="display:${curTab==='matrix'?'':'none'};">${renderMatrix()}</div>
        <div id="mv-compare" style="display:${curTab==='compare'?'':'none'};">${renderCompare()}</div>
        <div id="mv-path"    style="display:${curTab==='path'?'':'none'};">${renderPath()}</div>
      </div>`;
  }

  function renderMatrix() {
    function cell(idx) {
      const st = STATUSES[idx];
      const isOn = activeCell === st.id;
      return `
        <div class="viz-card tinted clickable mv-cell ${isOn?'on':''}"
          style="--viz-accent:${st.accent};"
          onclick="marciaCell('${st.id}')">
          <div class="mv-cell-title" style="color:${st.text};">${st.title}<span style="font-size:10px;font-weight:600;opacity:.65;">${st.titleSub}</span></div>
          <div class="mv-cell-desc">${st.desc}</div>
          <div class="mv-cell-keyword">› ${st.keyword}</div>
          <div class="mv-cell-example">${st.example}</div>
        </div>`;
    }

    // 정확한 배치:
    // 유실   (전념○)   성취
    // (위기✕)  [·]  (위기○)
    // 혼미   (전념✕)   유예

    return `
      <div class="mv-matrix-wrap">
        ${cell(0)}
        <div class="mv-mid-label">전념 ○</div>
        ${cell(1)}

        <div class="mv-mid-label">위기 ✕</div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:6px;height:6px;border-radius:50%;background:var(--border-mid);"></div>
        </div>
        <div class="mv-mid-label">위기 ○</div>

        ${cell(2)}
        <div class="mv-mid-label">전념 ✕</div>
        ${cell(3)}
      </div>
      <div style="text-align:center;padding:8px 0 2px;font-size:11px;color:var(--text-tertiary);font-family:${FONT};">
        카드를 클릭하면 상세 내용이 펼쳐집니다
      </div>`;
  }

  function renderCompare() {
    const cols = ['정체감 유실', '정체감 성취', '정체감 혼미', '정체감 유예'];
    const accents = ['#C87840', '#3A8858', '#7848A8', '#3A5AA0'];
    const rows = [
      ['위기(탐색)', '✕', '○', '✕', '○'],
      ['전념(몰입)', '○', '○', '✕', '✕'],
      ['특징', '남의 가치관 그대로 따름', '능동적으로 목표 선택', '어떤 활동에도 전념 안 함', '적극적으로 탐색 중'],
      ['안정성', '겉으론 안정적', '가장 안정적 (이상적)', '가장 불안정', '일시적 불안'],
    ];

    return `
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;font-family:${FONT};">
        <table class="mv-compare-table" style="min-width:460px;">
          <thead>
            <tr>
              <th style="min-width:80px;">구분</th>
              ${cols.map((c,i) => `<th style="color:${accents[i]};">${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(([label,...cells]) => `
              <tr>
                <td style="font-weight:700;color:var(--text-secondary);font-size:11px;">${label}</td>
                ${cells.map((v,i) => `<td style="color:${v==='○'?accents[i]:v==='✕'?'var(--text-tertiary)':'var(--text-primary)'};${v==='○'?'font-weight:700;':''}">${v}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="viz-well accent" style="margin-top:14px;font-size:12px;line-height:1.8;color:var(--text-primary);font-family:${FONT};">
        <strong style="color:var(--subject-accent, var(--primary));">핵심 암기 공식</strong><br>
        위기 ✕ + 전념 ○ = <strong style="color:#C87840;">유실</strong> &nbsp;|&nbsp;
        위기 ○ + 전념 ○ = <strong style="color:#3A8858;">성취</strong> &nbsp;|&nbsp;
        위기 ✕ + 전념 ✕ = <strong style="color:#7848A8;">혼미</strong> &nbsp;|&nbsp;
        위기 ○ + 전념 ✕ = <strong style="color:#3A5AA0;">유예</strong>
      </div>`;
  }

  function renderPath() {
    const paths = [
      { from:'정체감 혼미', to:'정체감 유예', desc:'아무런 탐색도 하지 않다가 위기를 경험하고 적극적으로 탐색을 시작한다.', accent:'#3A5AA0' },
      { from:'정체감 유예', to:'정체감 성취', desc:'탐색 과정을 거쳐 자신만의 가치관·목표를 확립하고 전념하게 된다. 가장 건강한 발달 경로.', accent:'#3A8858' },
      { from:'정체감 유실', to:'정체감 성취', desc:'남의 가치관을 따르다가 스스로 탐색하고 재정립하는 과정을 거쳐 성취에 도달할 수 있다.', accent:'#3A8858' },
      { from:'정체감 유실', to:'정체감 혼미', desc:'외부 기대가 무너지면 탐색 의지 없이 방황 상태(혼미)로 빠질 수 있다.', accent:'#7848A8' },
    ];

    return `
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:14px;line-height:1.8;font-family:${FONT};">
        정체감 지위는 고정된 것이 아니라 <strong>유동적으로 변화</strong>할 수 있다.
        일반적으로 혼미 › 유예 › 성취의 경로가 가장 건강한 발달 흐름으로 본다.
      </div>
      ${paths.map((p,i) => `
        <div class="mv-path-item">
          <div class="viz-num on" style="--viz-accent:${p.accent};">${i+1}</div>
          <div style="flex:1;font-family:${FONT};">
            <div style="font-size:12px;font-weight:700;color:${p.accent};margin-bottom:3px;">
              ${p.from} › ${p.to}
            </div>
            <div style="font-size:12px;color:var(--text-secondary);line-height:1.65;">${p.desc}</div>
          </div>
        </div>`).join('')}`;
  }

  window.marciaTab = function(tab) {
    curTab = tab; activeCell = null; render();
    setTimeout(() => {
      const wrap = document.getElementById('marcia-wrap');
      if (wrap) wrap.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 50);
  };

  window.marciaCell = function(id) {
    activeCell = activeCell === id ? null : id;
    const matrixEl = document.getElementById('mv-matrix');
    if (matrixEl) matrixEl.innerHTML = renderMatrix();
  };

  function init() {
    if (document.getElementById('viz-container')) render();
    else {
      const obs = new MutationObserver(() => {
        if (document.getElementById('viz-container')) { obs.disconnect(); render(); }
      });
      obs.observe(document.body, { childList:true, subtree:true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
