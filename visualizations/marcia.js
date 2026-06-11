/**
 * 마르시아 정체성 지위 이론 — 인터랙티브 시각화
 * 마운트: #viz-container
 */
(function () {

  const ACCENT = '#4EA87A';
  const BG     = '#E6F2EC';
  const MID    = '#A8D8BC';
  const FONT   = "var(--font-body,var(--font-main),'Pretendard','Apple SD Gothic Neo',sans-serif)";

  if (!document.getElementById('marcia-viz-style')) {
    const s = document.createElement('style');
    s.id = 'marcia-viz-style';
    s.textContent = `
      #marcia-wrap { font-family:${FONT}; max-width:100%; color:var(--text-primary,#2C2825); }
      #marcia-wrap * { box-sizing:border-box; }

      #marcia-wrap .mv-tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
      #marcia-wrap .mv-tab {
        padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600;
        cursor:pointer; border:1.5px solid ${MID}; color:${ACCENT};
        background:var(--bg-white,#fff); transition:all .15s; font-family:${FONT};
      }
      #marcia-wrap .mv-tab.on { background:${BG}; color:#1E5A3C; border-color:${ACCENT}; }

      #marcia-wrap .mv-axis-label {
        font-size:11px; font-weight:700; letter-spacing:.06em;
        color:var(--text-tertiary,#A09890); text-transform:uppercase;
      }

      #marcia-wrap .mv-grid {
        display:grid;
        grid-template-columns:1fr 1fr;
        grid-template-rows:1fr 1fr;
        gap:8px;
        margin-top:6px;
      }
      #marcia-wrap .mv-cell {
        border-radius:14px;
        border:2px solid transparent;
        padding:16px;
        cursor:pointer;
        transition:all .18s cubic-bezier(.4,0,.2,1);
        position:relative;
      }
      #marcia-wrap .mv-cell:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.1); }
      #marcia-wrap .mv-cell.on {
        border-color:var(--cell-accent);
        box-shadow:0 4px 20px rgba(0,0,0,.13);
        transform:translateY(-2px);
      }
      #marcia-wrap .mv-cell-badge {
        display:inline-flex; align-items:center; gap:4px;
        font-size:10px; font-weight:700; letter-spacing:.05em;
        padding:2px 8px; border-radius:6px; margin-bottom:8px;
      }
      #marcia-wrap .mv-cell-title {
        font-size:16px; font-weight:800; margin-bottom:4px; line-height:1.2;
      }
      #marcia-wrap .mv-cell-en {
        font-size:10px; opacity:.6; margin-bottom:6px; font-style:italic;
      }
      #marcia-wrap .mv-cell-desc {
        font-size:12px; line-height:1.7; color:var(--text-secondary,#6B6560);
      }
      #marcia-wrap .mv-cell-keyword {
        margin-top:8px; font-size:11px; font-weight:700;
        color:var(--cell-accent); padding:6px 10px;
        background:rgba(255,255,255,.6); border-radius:8px;
        display:none;
      }
      #marcia-wrap .mv-cell.on .mv-cell-keyword { display:block; }
      #marcia-wrap .mv-cell-example {
        margin-top:6px; font-size:11px; color:var(--text-tertiary,#A09890);
        display:none; line-height:1.6;
      }
      #marcia-wrap .mv-cell.on .mv-cell-example { display:block; }

      #marcia-wrap .mv-axis-bar {
        display:flex; align-items:center;
        padding:6px 10px; border-radius:8px; font-size:11px; font-weight:700;
        background:var(--bg-surface,#F0EDE8); color:var(--text-secondary,#6B6560);
        margin-bottom:6px;
      }
      #marcia-wrap .mv-axis-bar-inner { display:flex; align-items:center; gap:6px; }
      #marcia-wrap .mv-dot { width:8px; height:8px; border-radius:50%; }

      #marcia-wrap .mv-compare-table {
        width:100%; border-collapse:collapse; font-size:12px; font-family:${FONT};
      }
      #marcia-wrap .mv-compare-table th {
        padding:10px 12px; text-align:left; font-size:11px; font-weight:700;
        letter-spacing:.04em; border-bottom:2px solid var(--border-light,rgba(0,0,0,.08));
        background:var(--bg-surface,#F0EDE8);
      }
      #marcia-wrap .mv-compare-table td {
        padding:9px 12px; border-bottom:1px solid var(--border-light,rgba(0,0,0,.07));
        line-height:1.6; vertical-align:top;
      }
      #marcia-wrap .mv-compare-table tr:hover td { background:var(--bg-surface,#F0EDE8); }

      #marcia-wrap .mv-path-item {
        display:flex; align-items:flex-start; gap:12px;
        padding:12px 0; border-bottom:1px solid var(--border-light,rgba(0,0,0,.07));
      }
      #marcia-wrap .mv-path-item:last-child { border-bottom:none; }
      #marcia-wrap .mv-path-num {
        width:28px; height:28px; border-radius:50%; flex-shrink:0;
        display:flex; align-items:center; justify-content:center;
        font-size:12px; font-weight:800;
      }

      @media(max-width:560px) {
        #marcia-wrap .mv-cell { padding:12px; }
        #marcia-wrap .mv-cell-title { font-size:14px; }
        #marcia-wrap .mv-cell-desc { font-size:11px; }
      }
    `;
    document.head.appendChild(s);
  }

  const STATUSES = [
    {
      id: 'foreclosure',
      title: '정체감 유실', titleSub: '(폐쇄)',
      en: 'Identity Foreclosure',
      crisis: false, commitment: true,
      bg: '#FBF0E6', accent: '#C87840', text: '#7A4018',
      desc: '정체성 위기를 경험하지 않았지만 정체성이 확립된 것처럼 행동하는 단계',
      keyword: '남의 가치관을 그대로 따름',
      example: '예: 부모가 원하는 직업을 의심 없이 선택하는 경우',
      freq: true,
    },
    {
      id: 'achievement',
      title: '정체감 성취', titleSub: '(확립)',
      en: 'Identity Achievement',
      crisis: true, commitment: true,
      bg: '#E6F2EC', accent: '#3A8858', text: '#1E5A3C',
      desc: '스스로 분야를 탐색하고 참여하여 목표를 성취해 정체성을 확립한 단계',
      keyword: '삶의 목표를 능동적으로 선택함',
      example: '예: 다양한 직업을 탐색한 후 스스로 진로를 결정한 경우',
      freq: false,
    },
    {
      id: 'diffusion',
      title: '정체감 혼미', titleSub: '',
      en: 'Identity Diffusion',
      crisis: false, commitment: false,
      bg: '#F5F0F8', accent: '#7848A8', text: '#3E1E6A',
      desc: '정체성을 찾으려고 노력을 하지 않는 단계',
      keyword: '가치 있는 활동에 전념하지 않음',
      example: '예: 진로나 가치관에 무관심하며 그냥 흘러가는 경우',
      freq: false,
    },
    {
      id: 'moratorium',
      title: '정체감 유예', titleSub: '(모라토리움)',
      en: 'Identity Moratorium',
      crisis: true, commitment: false,
      bg: '#E6EAF5', accent: '#3A5AA0', text: '#1A2E60',
      desc: '정체성 위기를 경험하고 정체성 확립을 위해 노력하는 단계',
      keyword: '적극적으로 정체성을 탐색함',
      example: '예: 여러 분야를 탐색하며 자신에게 맞는 길을 찾는 중인 경우',
      freq: true,
    },
  ];

  const GRID_ORDER = [0, 1, 2, 3];
  let curTab = 'matrix';
  let activeCell = null;

  function render() {
    const container = document.getElementById('viz-container');
    if (!container) return;
    container.innerHTML = `
      <div id="marcia-wrap">
        <div class="mv-tabs">
          <div class="mv-tab ${curTab==='matrix'?'on':''}" onclick="marciaTab('matrix')">정체감 지위 매트릭스</div>
          <div class="mv-tab ${curTab==='compare'?'on':''}" onclick="marciaTab('compare')">4가지 비교표</div>
          <div class="mv-tab ${curTab==='path'?'on':''}"   onclick="marciaTab('path')">발달 경로</div>
        </div>
        <div id="mv-matrix" style="display:${curTab==='matrix'?'':'none'};">${renderMatrix()}</div>
        <div id="mv-compare" style="display:${curTab==='compare'?'':'none'};">${renderCompare()}</div>
        <div id="mv-path"    style="display:${curTab==='path'?'':'none'};">${renderPath()}</div>
      </div>`;
  }

  function renderMatrix() {
    return `
      <div class="mv-axis-bar">
        <div class="mv-axis-bar-inner">
          <span class="mv-dot" style="background:#3A5AA0;"></span>
          <span>위기(탐색, crisis) — <em style="font-weight:400;">직업·가치관 선택에 고민과 갈등을 느꼈는가?</em></span>
        </div>
      </div>
      <div class="mv-axis-bar" style="margin-bottom:12px;">
        <div class="mv-axis-bar-inner">
          <span class="mv-dot" style="background:#3A8858;"></span>
          <span>전념(몰입, commitment) — <em style="font-weight:400;">주어진 역할과 과업에 몰입을 했는가?</em></span>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px;padding:0 2px;">
        <div style="text-align:center;" class="mv-axis-label">위기 <span style="font-size:13px;color:#C87840;">✕</span></div>
        <div style="text-align:center;" class="mv-axis-label">위기 <span style="font-size:13px;color:#3A8858;">○</span></div>
      </div>

      <div style="display:flex;gap:8px;">
        <div style="display:flex;flex-direction:column;justify-content:space-around;gap:8px;padding:4px 0;">
          <div class="mv-axis-label" style="writing-mode:vertical-rl;transform:rotate(180deg);height:50%;display:flex;align-items:center;justify-content:center;font-size:10px;">
            전념 <span style="margin-top:2px;color:#3A8858;">○</span>
          </div>
          <div class="mv-axis-label" style="writing-mode:vertical-rl;transform:rotate(180deg);height:50%;display:flex;align-items:center;justify-content:center;font-size:10px;">
            전념 <span style="margin-top:2px;color:#C87840;">✕</span>
          </div>
        </div>

        <div class="mv-grid" style="flex:1;">
          ${GRID_ORDER.map(i => {
            const st = STATUSES[i];
            const isOn = activeCell === st.id;
            return `
            <div class="mv-cell ${isOn?'on':''}"
              style="background:${st.bg};--cell-accent:${st.accent};${st.freq?`border-color:${st.accent}40;`:''}"
              onclick="marciaCell('${st.id}')">
              <div class="mv-cell-badge" style="background:${st.accent}22;color:${st.accent};">
                <span>위기 ${st.crisis?'○':'✕'}</span>
                <span style="opacity:.5;">·</span>
                <span>전념 ${st.commitment?'○':'✕'}</span>
                ${st.freq ? `<span style="margin-left:2px;font-size:9px;opacity:.7;">빈출</span>` : ''}
              </div>
              <div class="mv-cell-title" style="color:${st.text};">${st.title}<span style="font-size:11px;font-weight:600;opacity:.7;">${st.titleSub}</span></div>
              <div class="mv-cell-en">${st.en}</div>
              <div class="mv-cell-desc">${st.desc}</div>
              <div class="mv-cell-keyword" style="color:${st.accent};">› ${st.keyword}</div>
              <div class="mv-cell-example">${st.example}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div style="text-align:center;padding:12px 0 4px;font-size:11px;color:var(--text-tertiary,#A09890);font-family:${FONT};">
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
      ['출제', '빈출', '—', '—', '빈출'],
    ];

    return `
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;font-family:${FONT};">
        <table class="mv-compare-table" style="min-width:500px;">
          <thead>
            <tr>
              <th style="min-width:90px;">구분</th>
              ${cols.map((c,i) => `<th style="color:${accents[i]};">${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(([label,...cells]) => `
              <tr>
                <td style="font-weight:700;color:var(--text-secondary,#6B6560);font-size:11px;">${label}</td>
                ${cells.map((v,i) => `<td style="color:${(v==='○'||v==='빈출')?accents[i]:(v==='✕'?'var(--text-tertiary,#A09890)':'var(--text-primary,#2C2825)')};">${v}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:16px;background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:1.8;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong style="color:${ACCENT};">핵심 암기 공식</strong><br>
        위기 ✕ + 전념 ○ = <strong style="color:#C87840;">유실</strong> &nbsp;|&nbsp;
        위기 ○ + 전념 ○ = <strong style="color:#3A8858;">성취</strong> &nbsp;|&nbsp;
        위기 ✕ + 전념 ✕ = <strong style="color:#7848A8;">혼미</strong> &nbsp;|&nbsp;
        위기 ○ + 전념 ✕ = <strong style="color:#3A5AA0;">유예</strong>
      </div>`;
  }

  function renderPath() {
    const paths = [
      { from:'정체감 혼미', to:'정체감 유예', desc:'아무런 탐색도 하지 않다가 위기를 경험하고 적극적으로 탐색을 시작한다.', color:'#3A5AA0', bg:'#E6EAF5' },
      { from:'정체감 유예', to:'정체감 성취', desc:'탐색 과정을 거쳐 자신만의 가치관·목표를 확립하고 전념하게 된다. 가장 건강한 발달 경로.', color:'#3A8858', bg:'#E6F2EC' },
      { from:'정체감 유실', to:'정체감 성취', desc:'남의 가치관을 따르다가 스스로 탐색하고 재정립하는 과정을 거쳐 성취에 도달할 수 있다.', color:'#3A8858', bg:'#E6F2EC' },
      { from:'정체감 유실', to:'정체감 혼미', desc:'외부 기대가 무너지면 탐색 의지 없이 방황 상태(혼미)로 빠질 수 있다.', color:'#7848A8', bg:'#F5F0F8' },
    ];

    return `
      <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:16px;line-height:1.8;font-family:${FONT};">
        정체감 지위는 고정된 것이 아니라 <strong>유동적으로 변화</strong>할 수 있다.
        일반적으로 혼미 › 유예 › 성취의 경로가 가장 건강한 발달 흐름으로 본다.
      </div>
      ${paths.map((p,i) => `
        <div class="mv-path-item">
          <div class="mv-path-num" style="background:${p.bg};color:${p.color};">${i+1}</div>
          <div style="flex:1;font-family:${FONT};">
            <div style="font-size:12px;font-weight:700;color:${p.color};margin-bottom:3px;">
              ${p.from} › ${p.to}
            </div>
            <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.65;">${p.desc}</div>
          </div>
        </div>`).join('')}
      <div style="margin-top:16px;background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:1.8;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong style="color:${ACCENT};">교사의 역할</strong><br>
        ① 솔선수범으로 올바른 모델링 제공<br>
        ② 올바른 또래집단 문화 형성을 위한 배려와 관심<br>
        ③ 직업체험·적성검사 등 실제적·맥락적 교육 제공
      </div>`;
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
