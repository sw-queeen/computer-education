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

      @media(max-width:480px) {
        #bronf-wrap .bv-layer-name { font-size:12px; }
        #bronf-wrap .bv-layer-detail { padding:0 12px 12px 46px; }
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
  let activeAge = null;

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
          <div class="bv-tab ${curTab==='flow'?'on':''}" onclick="bronfTab('flow')">체계 간 흐름</div>
        </div>
        <div id="bv-rings" style="display:${curTab==='rings'?'':'none'};">
          <div class="bv-rings-wrap">
            ${renderRingsSVG()}
            <div class="bv-layer-list">${renderLayerList()}</div>
          </div>
          <div class="bv-hint">원 또는 항목을 클릭하면 상세 내용이 펼쳐집니다</div>
        </div>
        <div id="bv-flow" style="display:${curTab==='flow'?'':'none'};">${renderFlow()}</div>
      </div>`;
  }

  function renderFlow() {
    const ACCENT = '#4EA87A';
    const FONT_V = "var(--font-body,var(--font-main),'Pretendard','Apple SD Gothic Neo',sans-serif)";

    // 연령대별 발달 흐름 데이터
    const AGES = [
      {
        label: '영·유아기', range: '0–5세',
        color: '#3A8858', bg: '#E6F2EC', mid: '#A8D8BC',
        active: [1],  // 미시체계 중심
        desc: '가족·부모와의 애착이 발달의 전부. 미시체계(가족, 양육환경)의 영향이 절대적.',
        spotlight: '미시체계',
        examples: '부모의 양육 방식, 형제 관계, 가정 분위기',
      },
      {
        label: '학령 전기', range: '5–7세',
        color: '#2888C8', bg: '#E4F2FA', mid: '#88C4E8',
        active: [1, 2],
        desc: '유치원·어린이집이 새로운 미시체계로 추가되고, 가정↔기관 연계(중간체계)가 처음 형성됨.',
        spotlight: '미시 + 중간체계',
        examples: '부모-교사 관계, 또래와의 첫 사회화',
      },
      {
        label: '아동기', range: '7–12세',
        color: '#C87840', bg: '#FBF0E6', mid: '#F0C89A',
        active: [1, 2, 3],
        desc: '학교·또래집단이 핵심 미시체계. 부모 직장환경·교육정책 등 외체계의 간접 영향이 두드러짐.',
        spotlight: '외체계까지 확장',
        examples: '부모 직장의 스트레스 → 가정 분위기, 교육 정책의 변화',
      },
      {
        label: '청소년기', range: '12–18세',
        color: '#8050B8', bg: '#EEE8F5', mid: '#C4A8E0',
        active: [1, 2, 3, 4],
        desc: '문화·이념·사회규범(거시체계)을 의식하기 시작. 정체성 형성 과정에서 사회 전체의 가치관이 영향을 미침.',
        spotlight: '거시체계까지 확장',
        examples: '사회의 성 역할 규범, 문화적 기대, 미디어',
      },
      {
        label: '성인기~', range: '18세 이상',
        color: '#6B6560', bg: '#F0EDE8', mid: '#C8C0B8',
        active: [1, 2, 3, 4, 5],
        desc: '결혼·취업·이혼 등 생애 사건(시간체계)이 발달에 중요한 변수가 됨. 5가지 체계 모두 영향.',
        spotlight: '시간체계 포함 전체',
        examples: '이직, 이사, 가족 변화 등 생애 전환점',
      },
    ];

    const LAYER_NAMES = ['미시', '중간', '외', '거시', '시간'];
    const LAYER_COLORS = ['#3A8858','#2888C8','#C87840','#8050B8','#6B6560'];
    const LAYER_BG = ['#E6F2EC','#E4F2FA','#FBF0E6','#EEE8F5','#F0EDE8'];

    return `
      <div style="font-family:${FONT_V};display:flex;flex-direction:column;gap:14px;">

        <!-- 범례 -->
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding:10px 14px;background:var(--bg-surface,#F0EDE8);border-radius:10px;">
          <span style="font-size:10px;font-weight:700;color:var(--text-tertiary,#A09890);letter-spacing:.06em;margin-right:4px;">체계</span>
          ${LAYER_NAMES.map((n,i) => `
            <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:${LAYER_BG[i]};color:${LAYER_COLORS[i]};">${n}체계</span>
          `).join('')}
        </div>

        <!-- 연령대 카드 -->
        ${AGES.map((age, ai) => {
          const isOn = activeAge === ai;
          return `
          <div onclick="bronfAge(${ai})"
            style="border-radius:12px;border:1.5px solid ${isOn ? age.color : 'var(--border-light,rgba(0,0,0,.08))'};
              background:${isOn ? age.bg : 'var(--bg-white,#fff)'};cursor:pointer;overflow:hidden;transition:all .15s;">
            <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;">
              <!-- 연령 뱃지 -->
              <div style="flex-shrink:0;text-align:center;min-width:52px;">
                <div style="font-size:13px;font-weight:800;color:${age.color};">${age.label}</div>
                <div style="font-size:10px;color:var(--text-tertiary,#A09890);font-weight:600;">${age.range}</div>
              </div>
              <!-- 활성 체계 바 -->
              <div style="flex:1;display:flex;gap:4px;align-items:center;">
                ${LAYER_NAMES.map((n,li) => {
                  const active = age.active.includes(li+1);
                  return `<div style="height:6px;flex:1;border-radius:3px;background:${active ? LAYER_COLORS[li] : 'var(--border-light,rgba(0,0,0,.08))'};transition:all .2s;"></div>`;
                }).join('')}
              </div>
              <!-- 스포트라이트 pill -->
              <div style="flex-shrink:0;font-size:10px;font-weight:700;padding:2px 9px;border-radius:10px;
                background:${age.color}18;color:${age.color};white-space:nowrap;">${age.spotlight}</div>
              <span style="font-size:12px;color:var(--text-tertiary,#A09890);flex-shrink:0;">${isOn?'▲':'▽'}</span>
            </div>
            ${isOn ? `
            <div style="padding:0 16px 14px 16px;font-family:${FONT_V};">
              <div style="width:100%;height:1px;background:${age.color}30;margin-bottom:10px;"></div>
              <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.8;margin-bottom:8px;">${age.desc}</div>
              <div style="font-size:11px;color:var(--text-tertiary,#A09890);">예: ${age.examples}</div>
              <!-- 활성 체계 상세 -->
              <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:10px;">
                ${age.active.map(li => `
                  <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:8px;
                    background:${LAYER_BG[li-1]};color:${LAYER_COLORS[li-1]};">${LAYER_NAMES[li-1]}체계 활성</span>
                `).join('')}
              </div>
            </div>` : ''}
          </div>`;
        }).join('')}

        <div style="text-align:center;font-size:11px;color:var(--text-tertiary,#A09890);padding:4px 0;">
          연령대를 클릭하면 상세 설명이 펼쳐집니다
        </div>
      </div>`;
  }
  window.bronfTab = function(tab) {
    curTab = tab;
    activeAge = null;
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

  window.bronfAge = function(ai) {
    activeAge = activeAge === ai ? null : ai;
    const el = document.getElementById('bv-flow');
    if (el) el.innerHTML = renderFlow();
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
