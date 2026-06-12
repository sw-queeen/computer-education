/**
 * 브론펜브레너 생태학적 발달이론 — 인터랙티브 시각화
 * 마운트: #viz-container
 */
(function () {

  const ACCENT = '#4EA87A';
  const BG     = '#E6F2EC';
  const MID    = '#A8D8BC';
  const FONT   = "var(--font-body,var(--font-main),'Pretendard','Apple SD Gothic Neo',sans-serif)";

  if (!document.getElementById('bronf-viz-style')) {
    const s = document.createElement('style');
    s.id = 'bronf-viz-style';
    s.textContent = `
      #bronf-wrap { font-family:${FONT}; max-width:100%; color:var(--text-primary,#2C2825); }
      #bronf-wrap * { box-sizing:border-box; }

      /* ── 탭 ── */
      #bronf-wrap .bv-tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
      #bronf-wrap .bv-tab {
        padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600;
        cursor:pointer; border:1.5px solid ${MID}; color:${ACCENT};
        background:var(--bg-white,#fff); transition:all .15s; font-family:${FONT};
      }
      #bronf-wrap .bv-tab.on { background:${BG}; color:#1E5A3C; border-color:${ACCENT}; }

      /* ── 동심원 SVG 래퍼 ── */
      #bronf-wrap .bv-rings-wrap {
        display:flex; flex-direction:column; gap:16px; align-items:center;
      }
      #bronf-wrap .bv-rings-svg { width:100%; max-width:420px; height:auto; cursor:pointer; }

      /* ── 레이어 목록 ── */
      #bronf-wrap .bv-layer-list { display:flex; flex-direction:column; gap:6px; width:100%; }
      #bronf-wrap .bv-layer-item {
        border-radius:12px; border:1.5px solid transparent;
        cursor:pointer; overflow:hidden; transition:all .15s;
        background:var(--bg-white,#fff);
      }
      #bronf-wrap .bv-layer-item:hover { border-color:var(--item-mid); }
      #bronf-wrap .bv-layer-item.on {
        border-color:var(--item-accent);
        box-shadow:0 2px 12px rgba(0,0,0,.1);
      }
      #bronf-wrap .bv-layer-header {
        display:flex; align-items:center; gap:12px; padding:12px 16px;
      }
      #bronf-wrap .bv-layer-num {
        width:32px; height:32px; border-radius:50%; flex-shrink:0;
        display:flex; align-items:center; justify-content:center;
        font-size:12px; font-weight:800; color:white;
      }
      #bronf-wrap .bv-layer-name { font-size:14px; font-weight:700; }
      #bronf-wrap .bv-layer-sub { font-size:11px; color:var(--text-secondary,#6B6560); margin-top:1px; }
      #bronf-wrap .bv-layer-detail {
        display:none; padding:0 16px 14px 60px; font-size:12px;
        line-height:1.75; color:var(--text-secondary,#6B6560);
      }
      #bronf-wrap .bv-layer-item.on .bv-layer-detail { display:block; }
      #bronf-wrap .bv-layer-examples {
        display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;
      }
      #bronf-wrap .bv-example-pill {
        font-size:10px; font-weight:700; padding:2px 9px; border-radius:10px;
        background:var(--bg-surface,#F0EDE8); color:var(--text-secondary,#6B6560);
      }
      #bronf-wrap .bv-hint {
        text-align:center; font-size:11px; color:var(--text-tertiary,#A09890);
        padding:6px 0 2px; font-family:${FONT};
      }

      /* ── 상호작용 다이어그램 ── */
      #bronf-wrap .bv-interact-grid {
        display:grid; grid-template-columns:1fr 1fr; gap:10px;
      }
      #bronf-wrap .bv-interact-card {
        border-radius:12px; padding:14px 16px;
        border:1.5px solid var(--border-light,rgba(0,0,0,.08));
        background:var(--bg-white,#fff);
      }
      #bronf-wrap .bv-interact-title { font-size:13px; font-weight:800; margin-bottom:4px; }
      #bronf-wrap .bv-interact-desc { font-size:11px; color:var(--text-secondary,#6B6560); line-height:1.7; }

      @media(max-width:480px) {
        #bronf-wrap .bv-layer-name { font-size:12px; }
        #bronf-wrap .bv-layer-detail { padding:0 12px 12px 46px; }
        #bronf-wrap .bv-interact-grid { grid-template-columns:1fr; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── 데이터 ── */
  const LAYERS = [
    {
      num: 1,
      name: '미시체계',
      nameEn: 'Microsystem',
      color: '#3A8858',
      bg: '#E6F2EC',
      mid: '#A8D8BC',
      desc: '아동의 발달에 <strong>직접적으로 영향</strong>을 미치는 환경. 아동이 직접 경험하는 가장 가까운 맥락.',
      examples: ['가족', '학교', '또래', '놀이터', '유치원', '교회'],
      ringR: 52,
    },
    {
      num: 2,
      name: '중간체계',
      nameEn: 'Mesosystem',
      color: '#2888C8',
      bg: '#E4F2FA',
      mid: '#88C4E8',
      desc: '미시체계들 <strong>간의 상호관계</strong>. 두 개 이상의 미시체계 사이의 연결 고리.',
      examples: ['가정↔학교 관계', '가정↔또래 관계', '부모-교사 협력'],
      ringR: 88,
    },
    {
      num: 3,
      name: '외체계',
      nameEn: 'Exosystem',
      color: '#C87840',
      bg: '#FBF0E6',
      mid: '#F0C89A',
      desc: '아동이 <strong>직접 참여하지는 않지만</strong> 아동에게 간접적으로 영향을 미치는 사회적 환경.',
      examples: ['부모 직장', '이웃', '교육위원회', '사회복지기관', '대중매체'],
      ringR: 124,
    },
    {
      num: 4,
      name: '거시체계',
      nameEn: 'Macrosystem',
      color: '#8050B8',
      bg: '#EEE8F5',
      mid: '#C4A8E0',
      desc: '외체계를 둘러싼 <strong>문화적 환경</strong>. 사회 전반의 신념·가치·규범 체계.',
      examples: ['문화', '관습', '법', '이념', '사회규범'],
      ringR: 158,
    },
    {
      num: 5,
      name: '시간체계',
      nameEn: 'Chronosystem',
      color: '#6B6560',
      bg: '#F0EDE8',
      mid: '#C8C0B8',
      desc: '개인의 <strong>전 생애에 걸친 변화</strong>와 사회·역사적 환경의 변화. (=연대체계)',
      examples: ['부모이혼', '가정폭력', '학교폭력', '남녀평등문제', '역사적 사건'],
      ringR: null, // 시간체계는 원 밖 별도 표시
    },
  ];

  let activeLayer = null;
  let curTab = 'rings';

  /* ── SVG 동심원 ── */
  function renderRingsSVG() {
    const cx = 210, cy = 210, size = 420;
    const rings = LAYERS.filter(l => l.ringR !== null);
    // 바깥→안쪽 순서로 그려야 하므로 역순
    const ringsDesc = [...rings].reverse();

    let circles = ringsDesc.map(l => {
      const isOn = activeLayer === l.num;
      return `<circle cx="${cx}" cy="${cy}" r="${l.ringR}"
        fill="${l.bg}" stroke="${isOn ? l.color : l.mid}"
        stroke-width="${isOn ? 3 : 1.5}"
        style="cursor:pointer;transition:all .15s;"
        onclick="bronfClick(${l.num})" />`;
    }).join('');

    // 레이블 — 각 링에 텍스트 (호 위에)
    const labelAngles = [270, 280, 285, 288]; // 각 체계 레이블 각도
    let labels = rings.map((l, i) => {
      const angle = (-75 + i * 25) * Math.PI / 180;
      const r = i === 0 ? 28 : (rings[i-1].ringR + l.ringR) / 2;
      const tx = cx + r * Math.cos(angle - Math.PI/2);
      const ty = cy + r * Math.sin(angle - Math.PI/2);
      const isOn = activeLayer === l.num;
      return `<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle"
        font-size="11" font-weight="${isOn ? 800 : 600}"
        fill="${isOn ? l.color : '#6B6560'}"
        style="cursor:pointer;font-family:Pretendard,sans-serif;"
        onclick="bronfClick(${l.num})">${l.name}</text>`;
    }).join('');

    // 시간체계 — 하단 곡선 화살표 표시
    const chronoOn = activeLayer === 5;
    const chronoStroke = chronoOn ? '#6B6560' : '#C8C0B8';
    const chronoFill = chronoOn ? '#F0EDE8' : 'none';

    let timeArc = `
      <path d="M ${cx-170} ${cy+175} Q ${cx} ${cy+220} ${cx+170} ${cy+175}"
        stroke="${chronoStroke}" stroke-width="${chronoOn?2.5:1.5}" fill="none" stroke-dasharray="6 3"
        style="cursor:pointer;" onclick="bronfClick(5)" />
      <text x="${cx}" y="${cy+218}" text-anchor="middle" dominant-baseline="middle"
        font-size="10" font-weight="${chronoOn?800:600}" fill="${chronoOn?'#6B6560':'#A09890'}"
        style="cursor:pointer;font-family:Pretendard,sans-serif;"
        onclick="bronfClick(5)">시간체계 (시간 흐름)</text>`;

    return `<svg class="bv-rings-svg" viewBox="0 0 ${size} ${size+40}" xmlns="http://www.w3.org/2000/svg">
      ${circles}
      <!-- 아동 중심 -->
      <circle cx="${cx}" cy="${cy}" r="22" fill="${activeLayer===1?'#3A8858':'#A8D8BC'}" />
      <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
        font-size="10" font-weight="800" fill="white"
        style="font-family:Pretendard,sans-serif;">아동</text>
      ${labels}
      ${timeArc}
    </svg>`;
  }

  function renderLayerList() {
    return LAYERS.map(l => {
      const isOn = activeLayer === l.num;
      return `
        <div class="bv-layer-item ${isOn?'on':''}"
          style="--item-accent:${l.color};--item-mid:${l.mid};${isOn?`background:${l.bg};`:''}border-color:${isOn?l.color:'var(--border-light,rgba(0,0,0,.08))'};"
          onclick="bronfClick(${l.num})">
          <div class="bv-layer-header">
            <div class="bv-layer-num" style="background:${l.color};">${l.num}</div>
            <div style="flex:1;">
              <div class="bv-layer-name" style="color:${l.color};">${l.name}
                <span style="font-size:10px;font-weight:500;color:var(--text-tertiary,#A09890);margin-left:4px;">${l.nameEn}</span>
              </div>
              <div class="bv-layer-sub">${l.examples.slice(0,3).join(' · ')}${l.examples.length>3?' …':''}</div>
            </div>
            <span style="font-size:12px;color:var(--text-tertiary,#A09890);">${isOn?'▲':'▽'}</span>
          </div>
          <div class="bv-layer-detail">
            <div style="line-height:1.75;margin-bottom:8px;">${l.desc}</div>
            <div class="bv-layer-examples">
              ${l.examples.map(e=>`<span class="bv-example-pill">${e}</span>`).join('')}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function render() {
    const container = document.getElementById('viz-container');
    if (!container) return;
    container.innerHTML = `
      <div id="bronf-wrap">
        <div class="bv-tabs">
          <div class="bv-tab ${curTab==='rings'?'on':''}" onclick="bronfTab('rings')">동심원 모형</div>
          <div class="bv-tab ${curTab==='interact'?'on':''}" onclick="bronfTab('interact')">특징 & 시사점</div>
        </div>
        <div id="bv-rings" style="display:${curTab==='rings'?'':'none'};">
          <div class="bv-rings-wrap">
            ${renderRingsSVG()}
            <div class="bv-layer-list">${renderLayerList()}</div>
          </div>
          <div class="bv-hint">원 또는 항목을 클릭하면 상세 내용이 펼쳐집니다</div>
        </div>
        <div id="bv-interact" style="display:${curTab==='interact'?'':'none'};">${renderInteract()}</div>
      </div>`;
  }

  function renderInteract() {
    const chars = [
      { title:'상호작용성', desc:'아동은 환경에 영향을 받기만 하는 수동적 존재가 아니라, 환경에 영향을 주기도 하는 능동적 존재이다.', color:'#3A8858', bg:'#E6F2EC' },
      { title:'다차원적 환경', desc:'개인의 발달은 미시체계부터 거시체계까지 여러 층위의 환경이 동시에 상호작용하여 형성된다.', color:'#2888C8', bg:'#E4F2FA' },
      { title:'유전 × 환경', desc:'개인의 발달은 유전과 환경 모두의 영향을 받는다. 어느 한쪽만으로 설명할 수 없다.', color:'#C87840', bg:'#FBF0E6' },
      { title:'연령에 따른 이동', desc:'발달에 영향을 미치는 지배적 환경은 연령 증가에 따라 미시체계에서 바깥층 체계로 점차 이동한다.', color:'#8050B8', bg:'#EEE8F5' },
    ];
    const implications = [
      { label:'시사점 1', text:'아동 발달에 직접 영향을 미치는 미시체계에만 집중하는 관점에서 벗어나 <strong>여러 환경체계들 간의 상호관계</strong>의 중요성을 각인시켰다.', color:'#3A8858' },
      { label:'시사점 2', text:'아동을 둘러싼 가정교육뿐만 아니라 <strong>사회의 노력</strong>이 함께 요구된다.', color:'#2888C8' },
    ];

    return `
      <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:16px;line-height:1.75;font-family:${FONT};">
        브론펜브레너는 아동 발달을 단순한 심리 내부 과정이 아닌, <strong>다층적 환경 체계와의 상호작용</strong>으로 설명했다.
      </div>
      <div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text-tertiary,#A09890);margin-bottom:10px;">이론의 특징</div>
      <div class="bv-interact-grid" style="margin-bottom:20px;">
        ${chars.map(c=>`
          <div class="bv-interact-card" style="border-left:3px solid ${c.color};background:${c.bg};">
            <div class="bv-interact-title" style="color:${c.color};">${c.title}</div>
            <div class="bv-interact-desc">${c.desc}</div>
          </div>`).join('')}
      </div>
      <div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text-tertiary,#A09890);margin-bottom:10px;">교육적 시사점</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${implications.map((imp,i)=>`
          <div style="background:var(--bg-white,#fff);border-radius:12px;padding:14px 16px;
            border:1.5px solid var(--border-light,rgba(0,0,0,.08));display:flex;align-items:flex-start;gap:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:${imp.color};color:white;
              font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${i+1}</div>
            <div style="font-size:12px;line-height:1.75;color:var(--text-primary,#2C2825);font-family:${FONT};">${imp.text}</div>
          </div>`).join('')}
      </div>`;
  }

  window.bronfTab = function(tab) {
    curTab = tab;
    render();
    setTimeout(() => {
      const wrap = document.getElementById('bronf-wrap');
      if (wrap) wrap.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 50);
  };

  window.bronfClick = function(num) {
    activeLayer = activeLayer === num ? null : num;
    render();
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
