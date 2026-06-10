/**
 * 부울 대수·논리게이트 인터랙티브 시각화
 * 탑재: 게이트 시뮬레이터(SVG 심볼) / 카르노맵 3·4변수 / 부울 법칙
 * 마운트: #viz-container
 */
(function () {

  const ACCENT = '#6058C0';
  const BG     = '#EAE8F8';
  const FONT   = "var(--font-body,var(--font-main),'Pretendard','Apple SD Gothic Neo',sans-serif)";
  const MONO   = "'JetBrains Mono','Fira Code',monospace";

  /* ── CSS 주입 ─────────────────────────────────── */
  if (!document.getElementById('boole-viz-style')) {
    const s = document.createElement('style');
    s.id = 'boole-viz-style';
    s.textContent = `
      #boole-wrap *{box-sizing:border-box;}
      #boole-wrap{font-family:${FONT};color:var(--text-primary,#2C2825);max-width:100%;}
      #boole-wrap .bv-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;}
      #boole-wrap .bv-tab{padding:6px 16px;border-radius:20px;font-size:12px;font-weight:600;
        cursor:pointer;border:1.5px solid #C8C0F0;color:${ACCENT};background:var(--bg-white,#fff);
        transition:all .15s;font-family:${FONT};}
      #boole-wrap .bv-tab.on{background:${BG};color:#3A2898;border-color:${ACCENT};}
      #boole-wrap .bv-card{background:var(--bg-white,#fff);border:1.5px solid #D0CCF0;
        border-radius:16px;padding:18px 20px;margin-bottom:12px;}
      #boole-wrap .bv-label{font-size:10px;font-weight:700;color:var(--text-tertiary,#A09890);
        letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px;}
      /* 게이트 버튼 */
      #boole-wrap .bv-gate-btns{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px;}
      #boole-wrap .bv-gbtn{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;
        cursor:pointer;border:1.5px solid #C8C0F0;color:${ACCENT};background:var(--bg-white,#fff);
        font-family:${FONT};transition:all .15s;}
      #boole-wrap .bv-gbtn.on{background:${BG};color:#3A2898;border-color:${ACCENT};}
      /* 입력 버튼 */
      #boole-wrap .bv-input-row{display:flex;gap:12px;align-items:center;margin-bottom:14px;flex-wrap:wrap;}
      #boole-wrap .bv-ig{display:flex;flex-direction:column;align-items:center;gap:5px;}
      #boole-wrap .bv-ilbl{font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);}
      #boole-wrap .bv-bit{width:46px;height:46px;border-radius:11px;border:2px solid;font-size:20px;
        font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;
        transition:all .15s;font-family:${FONT};}
      #boole-wrap .bv-bit0{background:var(--bg-surface,#F0EDE8);border-color:#C8C0A8;color:var(--text-tertiary,#A09890);}
      #boole-wrap .bv-bit1{background:${BG};border-color:${ACCENT};color:#3A2898;}
      #boole-wrap .bv-arrow{font-size:20px;color:#C0BBB0;align-self:flex-end;padding-bottom:10px;}
      #boole-wrap .bv-out{width:54px;height:54px;border-radius:13px;border:2px solid;font-size:22px;
        font-weight:900;display:flex;align-items:center;justify-content:center;transition:all .2s;}
      #boole-wrap .bv-out0{background:var(--bg-surface,#F0EDE8);border-color:#C8C0A8;color:var(--text-tertiary,#A09890);}
      #boole-wrap .bv-out1{background:#D8D4F8;border-color:${ACCENT};color:#3A2898;box-shadow:0 0 14px #9888E038;}
      /* 진리표 */
      #boole-wrap .bv-tt{width:100%;border-collapse:collapse;font-size:12px;margin-top:10px;font-family:${MONO};}
      #boole-wrap .bv-tt th{padding:6px 10px;background:${BG};color:${ACCENT};font-weight:700;
        border-bottom:2px solid ${ACCENT};text-align:center;}
      #boole-wrap .bv-tt td{padding:5px 10px;text-align:center;border-bottom:1px solid var(--border-light,rgba(0,0,0,.07));}
      #boole-wrap .bv-tt tr.on td{background:${BG};font-weight:700;color:#3A2898;}
      /* SVG 게이트 */
      #boole-wrap .bv-svg-wrap{display:flex;align-items:center;justify-content:center;
        background:var(--bg-surface,#F0EDE8);border-radius:12px;padding:16px;margin-bottom:12px;}
      /* 카르노맵 */
      #boole-wrap .bv-kmap{border-collapse:collapse;font-family:${MONO};font-size:13px;margin:0 auto;}
      #boole-wrap .bv-kmap th{padding:6px 12px;background:${BG};color:${ACCENT};font-weight:700;
        text-align:center;border:1.5px solid #C0BBF0;}
      #boole-wrap .bv-kmap td{width:50px;height:42px;text-align:center;vertical-align:middle;
        border:1.5px solid #C0BBF0;font-weight:600;cursor:pointer;transition:all .15s;}
      #boole-wrap .bv-kmap td.k0{background:var(--bg-page,#F7F5F2);color:var(--text-tertiary,#C0BBB0);}
      #boole-wrap .bv-kmap td.k1{background:${BG};color:#3A2898;}
      #boole-wrap .bv-kmap td.kx{background:var(--bg-surface,#FBF8F0);color:#C8A030;}
      #boole-wrap .bv-kmap td.kg{outline:3px solid ${ACCENT};outline-offset:-3px;background:#D0CCF8!important;color:#3A2898;}
      #boole-wrap .bv-kresult{margin-top:10px;padding:9px 14px;background:${BG};border-radius:8px;
        font-family:${MONO};font-size:13px;color:#3A2898;font-weight:700;}
      /* 법칙 */
      #boole-wrap .bv-law-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
      #boole-wrap .bv-law{padding:9px 12px;background:var(--bg-surface,#F7F5F2);border-radius:9px;
        border-left:3px solid ${ACCENT};cursor:pointer;transition:background .15s;}
      #boole-wrap .bv-law:hover,#boole-wrap .bv-law.on{background:${BG};}
      #boole-wrap .bv-lname{font-size:10px;color:var(--text-tertiary,#A09890);font-weight:700;margin-bottom:2px;}
      #boole-wrap .bv-lexpr{font-family:${MONO};font-size:12px;color:#3A2898;font-weight:700;}
      #boole-wrap .bv-lex{font-size:11px;color:${ACCENT};margin-top:4px;display:none;line-height:1.5;}
      #boole-wrap .bv-law.on .bv-lex{display:block;}
      /* 카르노맵 탭 전환 */
      #boole-wrap .bv-kvar-tabs{display:flex;gap:6px;margin-bottom:12px;}
      #boole-wrap .bv-kvtab{padding:4px 14px;border-radius:20px;font-size:11px;font-weight:600;
        cursor:pointer;border:1.5px solid #C8C0F0;color:${ACCENT};background:var(--bg-white,#fff);
        font-family:${FONT};transition:all .15s;}
      #boole-wrap .bv-kvtab.on{background:${BG};color:#3A2898;border-color:${ACCENT};}
      @media(max-width:540px){
        #boole-wrap .bv-law-grid{grid-template-columns:1fr;}
        #boole-wrap .bv-kmap td{width:40px;height:36px;font-size:11px;}
        #boole-wrap .bv-kmap th{padding:5px 8px;font-size:11px;}
      }
    `;
    document.head.appendChild(s);
  }

  /* ── 게이트 SVG 심볼 ──────────────────────────── */
  const GATE_SVG = {
    AND: `<svg width="120" height="70" viewBox="0 0 120 70">
      <line x1="10" y1="20" x2="40" y2="20" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="10" y1="50" x2="40" y2="50" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M40 10 L40 60 Q80 60 80 35 Q80 10 40 10Z"
        fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="80" y1="35" x2="110" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="56" y="39" font-size="13" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">AND</text>
    </svg>`,
    OR: `<svg width="120" height="70" viewBox="0 0 120 70">
      <line x1="10" y1="20" x2="38" y2="20" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="10" y1="50" x2="38" y2="50" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M36 10 Q44 35 36 60 Q58 60 78 35 Q58 10 36 10Z"
        fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="78" y1="35" x2="110" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="57" y="39" font-size="13" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">OR</text>
    </svg>`,
    NOT: `<svg width="100" height="70" viewBox="0 0 100 70">
      <line x1="10" y1="35" x2="30" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <polygon points="30,10 30,60 68,35" fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="72" cy="35" r="4" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="76" y1="35" x2="95" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="45" y="39" font-size="11" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">NOT</text>
    </svg>`,
    NAND: `<svg width="130" height="70" viewBox="0 0 130 70">
      <line x1="10" y1="20" x2="40" y2="20" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="10" y1="50" x2="40" y2="50" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M40 10 L40 60 Q80 60 80 35 Q80 10 40 10Z"
        fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="84" cy="35" r="4" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="88" y1="35" x2="120" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="57" y="39" font-size="11" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">NAND</text>
    </svg>`,
    NOR: `<svg width="130" height="70" viewBox="0 0 130 70">
      <line x1="10" y1="20" x2="38" y2="20" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="10" y1="50" x2="38" y2="50" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M36 10 Q44 35 36 60 Q58 60 78 35 Q58 10 36 10Z"
        fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="82" cy="35" r="4" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="86" y1="35" x2="120" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="57" y="39" font-size="11" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">NOR</text>
    </svg>`,
    XOR: `<svg width="130" height="70" viewBox="0 0 130 70">
      <line x1="10" y1="20" x2="40" y2="20" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="10" y1="50" x2="40" y2="50" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M38 10 Q46 35 38 60 Q60 60 80 35 Q60 10 38 10Z"
        fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M32 10 Q40 35 32 60" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="80" y1="35" x2="115" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="58" y="39" font-size="11" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">XOR</text>
    </svg>`,
    XNOR: `<svg width="140" height="70" viewBox="0 0 140 70">
      <line x1="10" y1="20" x2="38" y2="20" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="10" y1="50" x2="38" y2="50" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M38 10 Q46 35 38 60 Q60 60 80 35 Q60 10 38 10Z"
        fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M32 10 Q40 35 32 60" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="84" cy="35" r="4" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="88" y1="35" x2="125" y2="35" stroke="${ACCENT}" stroke-width="2"/>
      <text x="57" y="39" font-size="10" font-weight="700" fill="${ACCENT}" font-family="monospace" text-anchor="middle">XNOR</text>
    </svg>`,
  };

  /* ── 게이트 데이터 ────────────────────────────── */
  const GATES = {
    AND:  { title:'AND',  expr:'Y = A · B',  desc:'두 입력이 모두 1일 때만 1 출력. 논리곱.', fn:(a,b)=>a&b, n:2 },
    OR:   { title:'OR',   expr:'Y = A + B',  desc:'입력 중 하나 이상 1이면 1 출력. 논리합.', fn:(a,b)=>a|b, n:2 },
    NOT:  { title:'NOT',  expr:"Y = A'",     desc:'입력을 반전. 인버터. NAND/NOR의 기본 구성 요소.', fn:(a)=>a^1, n:1 },
    NAND: { title:'NAND', expr:"Y = (A·B)'", desc:'AND의 반전. 범용 게이트 — 이것만으로 모든 논리함수 구현 가능.', fn:(a,b)=>(a&b)^1, n:2 },
    NOR:  { title:'NOR',  expr:"Y = (A+B)'", desc:'OR의 반전. 범용 게이트 — NOR만으로도 모든 논리함수 구현 가능.', fn:(a,b)=>(a|b)^1, n:2 },
    XOR:  { title:'XOR',  expr:'Y = A ⊕ B', desc:'두 입력이 서로 다를 때만 1. 배타적 OR. 패리티 비트·가산기에 사용.', fn:(a,b)=>a^b, n:2 },
    XNOR: { title:'XNOR', expr:"Y = (A⊕B)'",desc:'XOR의 반전. 두 입력이 같을 때만 1.', fn:(a,b)=>(a^b)^1, n:2 },
  };

  /* ── 상태 ─────────────────────────────────────── */
  let curGate = 'AND';
  let bits = { a:0, b:0 };
  let kVar = 3; // 현재 카르노맵 변수 수
  let cv3 = new Array(8).fill(0);
  let cv4 = new Array(16).fill(0);

  /* ── 렌더 헬퍼 ────────────────────────────────── */
  function $ (id) { return document.getElementById(id); }
  function h (tag, attr, inner) {
    return `<${tag} ${Object.entries(attr||{}).map(([k,v])=>`${k}="${v}"`).join(' ')}>${inner||''}</${tag}>`;
  }

  /* ── 메인 렌더 ────────────────────────────────── */
  function render() {
    const container = document.getElementById('viz-container');
    if (!container) return;
    container.innerHTML = `
      <div id="boole-wrap">
        <div class="bv-tabs">
          <div class="bv-tab on" onclick="bvTab('sim')">게이트 시뮬레이터</div>
          <div class="bv-tab" onclick="bvTab('kmap')">카르노맵</div>
          <div class="bv-tab" onclick="bvTab('laws')">부울 대수 법칙</div>
        </div>
        <div id="bv-sim">${renderSim()}</div>
        <div id="bv-kmap" style="display:none;">${renderKmap()}</div>
        <div id="bv-laws" style="display:none;">${renderLaws()}</div>
      </div>`;
    bindEvents();
  }

  /* ── 1. 게이트 시뮬레이터 ────────────────────── */
  function renderSim() {
    const g = GATES[curGate];
    const y = g.n===1 ? g.fn(bits.a) : g.fn(bits.a, bits.b);
    const rows = g.n===2
      ? [[0,0],[0,1],[1,0],[1,1]].map(([a,b])=>({ a,b,y:g.fn(a,b), active:a===bits.a&&b===bits.b }))
      : [[0],[1]].map(([a])=>({ a,b:null,y:g.fn(a), active:a===bits.a }));

    return `
      <div class="bv-gate-btns">${Object.keys(GATES).map(name=>`
        <button class="bv-gbtn${name===curGate?' on':''}" onclick="bvSetGate('${name}')">${name}</button>`).join('')}
      </div>
      <div class="bv-card">
        <div style="font-size:15px;font-weight:700;color:#3A2898;margin-bottom:4px;">${g.title} 게이트</div>
        <div style="font-family:${MONO};font-size:13px;color:${ACCENT};margin-bottom:12px;">${g.expr}</div>
        <div class="bv-svg-wrap">${GATE_SVG[curGate]||''}</div>
        <div class="bv-input-row">
          <div class="bv-ig">
            <div class="bv-ilbl">A</div>
            <button class="bv-bit bv-bit${bits.a}" onclick="bvToggle('a')">${bits.a}</button>
          </div>
          ${g.n===2?`<div class="bv-ig">
            <div class="bv-ilbl">B</div>
            <button class="bv-bit bv-bit${bits.b}" onclick="bvToggle('b')">${bits.b}</button>
          </div>`:''}
          <div class="bv-arrow">→</div>
          <div class="bv-ig">
            <div class="bv-ilbl">Y (출력)</div>
            <div class="bv-out bv-out${y}">${y}</div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:10px;line-height:1.6;">${g.desc}</div>
        <table class="bv-tt">
          <tr>${g.n===2?'<th>A</th><th>B</th>':'<th>A</th>'}<th>Y</th></tr>
          ${rows.map(r=>`<tr class="${r.active?'on':''}">
            <td>${r.a}</td>${r.b!==null?`<td>${r.b}</td>`:''}
            <td style="font-weight:700;color:${r.y?ACCENT:'var(--text-tertiary,#A09890)'};">${r.y}</td>
          </tr>`).join('')}
        </table>
      </div>`;
  }

  /* ── 2. 카르노맵 ──────────────────────────────── */
  function renderKmap() {
    return `
      <div class="bv-card">
        <div style="font-size:14px;font-weight:700;color:#3A2898;margin-bottom:6px;">카르노맵 (Karnaugh Map)</div>
        <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:12px;line-height:1.6;">
          셀 클릭: <strong>0 → 1 → x</strong>(don't care) 순환 | 1인 셀 그루핑 후 SOP 자동 출력
        </div>
        <div class="bv-kvar-tabs">
          <button class="bv-kvtab${kVar===3?' on':''}" onclick="bvKvar(3)">3변수 (A·B·C)</button>
          <button class="bv-kvtab${kVar===4?' on':''}" onclick="bvKvar(4)">4변수 (A·B·C·D)</button>
        </div>
        ${kVar===3 ? render3Kmap() : render4Kmap()}
        <div class="bv-kresult" id="bv-kresult">1인 셀을 클릭하면 SOP 식이 나타납니다</div>
        <div style="margin-top:8px;font-size:11px;color:var(--text-tertiary,#A09890);">
          그루핑 규칙: 2ⁿ개씩 · 사각형 · 경계 래핑 허용 · x는 1로 활용 가능
        </div>
      </div>`;
  }

  function render3Kmap() {
    // 열 순서 (그레이코드): BC=00,01,11,10
    const cols = [[0,0],[0,1],[1,1],[1,0]];
    const rows = [0, 1]; // A=0, A=1
    return `<div style="overflow-x:auto;"><table class="bv-kmap">
      <tr><th>A＼BC</th>${cols.map(([b,c])=>`<th>${b}${c}</th>`).join('')}</tr>
      ${rows.map(a=>`<tr><th>${a}</th>${cols.map(([b,c])=>{
        const idx=(a<<2)|(b<<1)|c;
        const v=cv3[idx];
        return `<td class="k${v===2?'x':v} ${isGrouped3(idx)?'kg':''}" data-k3="${idx}" onclick="bvCell3(${idx})">${v===2?'x':v}</td>`;
      }).join('')}</tr>`).join('')}
    </table></div>`;
  }

  function render4Kmap() {
    // 행: AB=00,01,11,10 / 열: CD=00,01,11,10 (그레이코드)
    const gcode = [[0,0],[0,1],[1,1],[1,0]];
    return `<div style="overflow-x:auto;"><table class="bv-kmap">
      <tr><th>AB＼CD</th>${gcode.map(([c,d])=>`<th>${c}${d}</th>`).join('')}</tr>
      ${gcode.map(([a,b])=>`<tr><th>${a}${b}</th>${gcode.map(([c,d])=>{
        const idx=(a<<3)|(b<<2)|(c<<1)|d;
        const v=cv4[idx];
        return `<td class="k${v===2?'x':v} ${isGrouped4(idx)?'kg':''}" data-k4="${idx}" onclick="bvCell4(${idx})">${v===2?'x':v}</td>`;
      }).join('')}</tr>`).join('')}
    </table></div>`;
  }

  /* ── 3. 부울 대수 법칙 ────────────────────────── */
  const LAWS = [
    { name:'항등원',    e:'x + 0 = x',       ex:'1+0=1 / 0+0=0' },
    { name:'소멸',      e:'x · 0 = 0',       ex:'1·0=0 / 0·0=0' },
    { name:'항등원',    e:'x · 1 = x',       ex:'1·1=1 / 0·1=0' },
    { name:'소멸',      e:'x + 1 = 1',       ex:'0+1=1 / 1+1=1' },
    { name:'멱등',      e:'x + x = x',       ex:'1+1=1 / 0+0=0' },
    { name:'멱등',      e:'x · x = x',       ex:'1·1=1 / 0·0=0' },
    { name:'보수',      e:"x + x' = 1",      ex:"0+1=1 / 1+0=1" },
    { name:'보수',      e:"x · x' = 0",      ex:"1·0=0 / 0·1=0" },
    { name:'드모르간',  e:"(x+y)' = x'y'",   ex:"(1+0)'=0, 1'·0'=0·1=0 ✓" },
    { name:'드모르간',  e:"(xy)' = x'+y'",   ex:"(1·1)'=0, 1'+1'=0+0=0 ✓" },
    { name:'흡수',      e:'x + xy = x',      ex:"1+(1·0)=1+0=1 ✓" },
    { name:'흡수',      e:'x(x+y) = x',      ex:"1·(1+0)=1·1=1 ✓" },
    { name:'이중 부정', e:"(x')' = x",       ex:"(1')'=(0)'=1 ✓" },
    { name:'교환',      e:'x+y = y+x',       ex:'덧셈·곱셈 순서 무관' },
    { name:'결합',      e:'x+(y+z)=(x+y)+z', ex:'괄호 위치 무관' },
    { name:'분배',      e:'x(y+z)=xy+xz',    ex:'AND가 OR에 분배' },
    { name:'분배',      e:'x+yz=(x+y)(x+z)', ex:'OR가 AND에 분배' },
  ];

  function renderLaws() {
    return `<div class="bv-law-grid">
      ${LAWS.map((l,i)=>`
        <div class="bv-law" id="bvlaw${i}" onclick="bvLaw(${i})">
          <div class="bv-lname">${l.name}</div>
          <div class="bv-lexpr">${l.e}</div>
          <div class="bv-lex">예: ${l.ex}</div>
        </div>`).join('')}
    </div>`;
  }

  /* ── 간소화 엔진 (XOR 기반 올바른 인접 그루핑) ── */
  function simplify(n, cv) {
    const size = 1 << n;
    const ones = [], dc = [];
    for (let i = 0; i < size; i++) {
      if (cv[i] === 1) ones.push(i);
      if (cv[i] === 2) dc.push(i);
    }
    if (!ones.length) return { expr: 'F = 0', grouped: new Set() };
    if (ones.length + dc.length === size) return { expr: 'F = 1', grouped: new Set() };

    const all = [...ones, ...dc];

    // 가능한 모든 prime implicant 생성 (크기 내림차순)
    const primeImplicants = []; // { ones[], mask, val }
    for (let gs = size; gs >= 1; gs >>= 1) {
      for (let mask = 0; mask < size; mask++) {
        if (popcount(mask) !== Math.log2(gs)) continue; // don't care 비트 수 = log2(gs)
        // mask 비트가 1인 위치는 don't care, 0인 위치는 고정
        // val은 고정 비트 패턴
        for (let val = 0; val < size; val++) {
          if (val & mask) continue; // don't care 자리에 1이 오면 스킵
          // 그룹 구성: don't care 비트 자유롭게 채운 모든 조합
          const grp = [];
          for (let dc2 = 0; dc2 < (1 << popcount(mask)); dc2++) {
            // mask의 1인 비트 위치에 dc2의 비트를 채움
            let m = val;
            let bit = 0;
            for (let b = 0; b < n; b++) {
              if (mask & (1 << b)) { if ((dc2 >> bit) & 1) m |= (1 << b); bit++; }
            }
            grp.push(m);
          }
          if (!grp.every(m => all.includes(m))) continue;
          const onesInGrp = grp.filter(m => ones.includes(m));
          if (!onesInGrp.length) continue;
          const term = buildTerm(n, val, mask);
          primeImplicants.push({ ones: onesInGrp, grp, term, size: gs });
        }
      }
    }

    // 중복 제거
    const unique = [];
    const seen = new Set();
    for (const pi of primeImplicants) {
      const key = pi.grp.sort((a,b)=>a-b).join(',');
      if (!seen.has(key)) { seen.add(key); unique.push(pi); }
    }

    // 필수 PI 선택 (essential prime implicant)
    const covered = new Set();
    const selected = [];
    for (const m of ones) {
      const coverers = unique.filter(pi => pi.ones.includes(m));
      if (coverers.length === 1) {
        if (!selected.includes(coverers[0])) {
          selected.push(coverers[0]);
          coverers[0].ones.forEach(x => covered.add(x));
        }
      }
    }
    // 나머지: 가장 많이 커버하는 PI 선택
    const sorted = unique
      .filter(pi => !selected.includes(pi))
      .sort((a, b) => b.size - a.size);
    for (const pi of sorted) {
      if (ones.every(m => covered.has(m))) break;
      const news = pi.ones.filter(m => !covered.has(m));
      if (news.length > 0) { selected.push(pi); news.forEach(m => covered.add(m)); }
    }
    ones.filter(m => !covered.has(m)).forEach(m => {
      selected.push({ grp: [m], ones: [m], term: mintermToTerm(n, m) });
      covered.add(m);
    });

    const grouped = new Set(selected.flatMap(p => p.ones));
    const terms = [...new Set(selected.map(p => p.term))].filter(Boolean);
    return { expr: 'F = ' + (terms.join(' + ') || '0'), grouped };
  }

  function popcount(x) { let c=0; while(x){c+=x&1;x>>=1;} return c; }

  function buildTerm(n, val, mask) {
    const vars = n===3?['A','B','C']:['A','B','C','D'];
    let t = '';
    for (let i = n-1; i >= 0; i--) {
      if (!(mask & (1<<i))) { // 고정 비트만
        t += (val & (1<<i)) ? vars[n-1-i] : vars[n-1-i]+"'";
      }
    }
    return t || '1';
  }

  function groupToTerm(n, group) {
    let same = (1 << n) - 1; // 모든 비트 1로 시작
    let val = group[0];
    for (const m of group) {
      same &= ~(val ^ m); // 다른 비트 제거
    }
    // same: 고정된 비트들
    let term = '';
    const vars = n === 3 ? ['A','B','C'] : ['A','B','C','D'];
    for (let i = n - 1; i >= 0; i--) {
      if (same & (1 << i)) {
        const bit = (val >> i) & 1;
        term += bit ? vars[n-1-i] : vars[n-1-i]+"'";
      }
    }
    return term || '1';
  }

  function mintermToTerm(n, m) {
    const vars = n === 3 ? ['A','B','C'] : ['A','B','C','D'];
    let t = '';
    for (let i = n - 1; i >= 0; i--) {
      t += ((m >> i) & 1) ? vars[n-1-i] : vars[n-1-i]+"'";
    }
    return t;
  }

  let _grouped3 = new Set(), _grouped4 = new Set();

  function isGrouped3(idx) { return _grouped3.has(idx); }
  function isGrouped4(idx) { return _grouped4.has(idx); }

  function refreshKmap() {
    const wrap = document.getElementById('bv-kmap');
    if (!wrap) return;
    if (kVar === 3) {
      const r = simplify(3, cv3);
      _grouped3 = r.grouped;
      wrap.innerHTML = renderKmap();
    } else {
      const r = simplify(4, cv4);
      _grouped4 = r.grouped;
      wrap.innerHTML = renderKmap();
    }
    // 결과 표시
    setTimeout(() => {
      const el = document.getElementById('bv-kresult');
      if (el) el.textContent = kVar===3 ? simplify(3,cv3).expr : simplify(4,cv4).expr;
    }, 10);
    bindKmapEvents();
  }

  /* ── 이벤트 바인딩 ────────────────────────────── */
  function bindEvents() {
    bindKmapEvents();
  }

  function bindKmapEvents() {
    // 이미 onclick 인라인으로 처리됨
  }

  /* ── 글로벌 핸들러 ────────────────────────────── */
  window.bvTab = function(name) {
    ['sim','kmap','laws'].forEach(s => {
      const el = document.getElementById('bv-'+s);
      if (el) el.style.display = s===name ? '' : 'none';
    });
    document.querySelectorAll('#boole-wrap .bv-tab').forEach((t,i) => {
      t.classList.toggle('on', ['sim','kmap','laws'][i]===name);
    });
    // 탭 전환 시 시각화 상단으로 스크롤
    setTimeout(() => {
      const wrap = document.getElementById('boole-wrap');
      if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  window.bvSetGate = function(name) {
    curGate = name;
    const sim = document.getElementById('bv-sim');
    if (sim) sim.innerHTML = renderSim();
  };

  window.bvToggle = function(key) {
    bits[key] ^= 1;
    const sim = document.getElementById('bv-sim');
    if (sim) sim.innerHTML = renderSim();
  };

  window.bvCell3 = function(idx) {
    cv3[idx] = (cv3[idx]+1)%3;
    const r = simplify(3, cv3);
    _grouped3 = r.grouped;
    const wrap = document.getElementById('bv-kmap');
    if (wrap) { wrap.innerHTML = renderKmap(); }
    setTimeout(() => {
      const el = document.getElementById('bv-kresult');
      if (el) el.textContent = r.expr;
    }, 10);
  };

  window.bvCell4 = function(idx) {
    cv4[idx] = (cv4[idx]+1)%3;
    const r = simplify(4, cv4);
    _grouped4 = r.grouped;
    const wrap = document.getElementById('bv-kmap');
    if (wrap) { wrap.innerHTML = renderKmap(); }
    setTimeout(() => {
      const el = document.getElementById('bv-kresult');
      if (el) el.textContent = r.expr;
    }, 10);
  };

  window.bvKvar = function(v) {
    kVar = v;
    const wrap = document.getElementById('bv-kmap');
    if (wrap) { wrap.innerHTML = renderKmap(); }
    const el = document.getElementById('bv-kresult');
    if (el) el.textContent = '1인 셀을 클릭하면 SOP 식이 나타납니다';
  };

  window.bvLaw = function(i) {
    const el = document.getElementById('bvlaw'+i);
    if (el) el.classList.toggle('on');
  };

  /* ── 초기화 ───────────────────────────────────── */
  function init() {
    const observer = new MutationObserver(() => {
      if (document.getElementById('viz-container')) {
        observer.disconnect();
        render();
      }
    });
    if (document.getElementById('viz-container')) {
      render();
    } else {
      observer.observe(document.body, { childList:true, subtree:true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
