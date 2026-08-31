/**
 * 운영체제 — 문맥교환 (Context Switch) 인터랙티브 시각화
 * 마운트: #viz-container
 */
(function () {

  const CSS_ACCENT = '#D05840';
  const CSS_BG     = '#FAE8E4';
  const CSS_MID    = '#ECA898';
  const CSS_TEXT   = '#6E2010';

  if (!document.getElementById('ctx-viz-style')) {
    const s = document.createElement('style');
    s.id = 'ctx-viz-style';
    s.textContent = `
      #ctx-wrap { font-family:var(--font-body,var(--font-main)); max-width:100%; color:var(--text-primary); }
      #ctx-wrap * { box-sizing:border-box; }

      /* 탭 — components.css .filter-btn 유리 버튼 패턴과 동일하게 */
      #ctx-wrap .cv-tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
      #ctx-wrap .cv-tab {
        padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600;
        cursor:pointer; border:none; color:var(--text-secondary);
        background:var(--bg-white); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        box-shadow:var(--shadow-extruded-sm); transition:box-shadow .2s ease-out, color .12s, transform .2s ease-out;
        font-family:var(--font-body,var(--font-main));
      }
      #ctx-wrap .cv-tab:hover { box-shadow:var(--shadow-extruded-hover); color:var(--text-primary); transform:translateY(-1px); }
      #ctx-wrap .cv-tab.on { background:${CSS_ACCENT}; color:white; box-shadow:var(--shadow-inset-sm); font-weight:600; transform:none; }

      /* 단계 아코디언 — 유리 카드. 펼친 상태는 시맨틱 색을 살짝 섞어 표시 */
      #ctx-wrap .cv-step {
        border-radius:var(--radius-md,10px);
        background:var(--bg-white); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        box-shadow:var(--shadow-extruded-sm);
        cursor:pointer; transition:box-shadow .2s ease-out, background .2s ease-out;
        overflow:hidden; margin-bottom:8px;
      }
      #ctx-wrap .cv-step:hover { box-shadow:var(--shadow-extruded-hover); }
      #ctx-wrap .cv-step.on {
        background:color-mix(in srgb, ${CSS_ACCENT} 10%, var(--bg-white));
        box-shadow:var(--shadow-extruded-hover);
      }
      #ctx-wrap .cv-step-head { display:flex; align-items:center; gap:10px; padding:11px 14px; }
      #ctx-wrap .cv-step-num {
        width:28px; height:28px; border-radius:50%;
        display:flex; align-items:center; justify-content:center;
        font-size:12px; font-weight:800; flex-shrink:0;
        background:${CSS_BG}; color:${CSS_ACCENT};
      }
      #ctx-wrap .cv-step.on .cv-step-num { background:${CSS_ACCENT}; color:white; }
      #ctx-wrap .cv-step-title { font-family:var(--font-heading,var(--font-main)); font-size:15px; font-weight:700; flex:1; }
      #ctx-wrap .cv-step-badge {
        font-size:10px; font-weight:700; padding:2px 8px; border-radius:10px;
        background:${CSS_BG}; color:${CSS_ACCENT};
      }
      #ctx-wrap .cv-step-body {
        display:none; padding:0 14px 14px 52px;
        font-size:12px; color:var(--text-secondary); line-height:1.75;
      }
      #ctx-wrap .cv-step.on .cv-step-body { display:block; }
      #ctx-wrap .cv-step-detail {
        background:color-mix(in srgb, ${CSS_ACCENT} 12%, var(--bg-surface));
        backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        box-shadow:var(--shadow-inset-sm); border-radius:var(--radius-sm,6px);
        padding:10px 14px; font-size:12px; line-height:1.8;
        color:var(--text-primary); margin-top:8px;
      }

      /* 타임라인 */
      #ctx-wrap .cv-row { display:flex; align-items:stretch; gap:0; margin-bottom:6px; }
      #ctx-wrap .cv-label {
        width:80px; flex-shrink:0; display:flex; align-items:center;
        font-size:11px; font-weight:700; color:var(--text-secondary); padding-right:10px;
      }
      #ctx-wrap .cv-track { flex:1; display:flex; align-items:center; gap:3px; min-height:44px; }
      #ctx-wrap .cv-seg {
        height:32px; border-radius:var(--radius-sm,6px); display:flex; align-items:center;
        justify-content:center; font-size:11px; font-weight:700;
        white-space:nowrap; overflow:hidden; padding:0 8px;
        font-family:var(--font-body,var(--font-main));
      }
      #ctx-wrap .cv-seg-run  { background:${CSS_ACCENT}; color:white; }
      #ctx-wrap .cv-seg-wait { background:var(--bg-surface); color:var(--text-tertiary); }
      #ctx-wrap .cv-seg-ctx  { background:${CSS_MID}; color:${CSS_TEXT}; }

      /* PCB 그리드 */
      #ctx-wrap .cv-pcb-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
      #ctx-wrap .cv-pcb-card {
        background:var(--bg-surface); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        box-shadow:var(--shadow-inset-sm); border-radius:var(--radius-md,10px); padding:12px 14px;
      }
      #ctx-wrap .cv-pcb-title { font-size:11px; font-weight:700; letter-spacing:.04em; color:var(--text-tertiary); margin-bottom:6px; }
      #ctx-wrap .cv-pcb-item { display:flex; align-items:baseline; gap:6px; font-size:12px; margin-bottom:3px; }
      #ctx-wrap .cv-pcb-key { font-weight:700; color:${CSS_ACCENT}; min-width:80px; font-size:11px; flex-shrink:0; }

      @media(max-width:480px) {
        #ctx-wrap .cv-label { width:60px; font-size:10px; }
        #ctx-wrap .cv-step-body { padding-left:42px; }
        #ctx-wrap .cv-pcb-grid { grid-template-columns:1fr; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── 데이터 ── */
  const STEPS = [
    { num:1, title:'인터럽트 또는 시스템 콜 발생', badge:'트리거',
      desc:'타임 슬라이스 만료, I/O 요청, 시스템 콜 등 CPU 양도 조건이 발생한다.',
      detail:'운영체제 커널이 개입하는 진입점. 현재 실행 중인 프로세스(P1)는 실행을 일시 중단한다. 트리거 원인: 타이머 인터럽트(선점), I/O 완료 인터럽트, 명시적 sys_call(협력적).' },
    { num:2, title:'현재 프로세스 상태 저장 (P1 PCB)', badge:'저장',
      desc:'커널이 P1의 실행 상태를 PCB에 저장한다. PC, 레지스터 전체, 스택 포인터 등을 포함한다.',
      detail:'저장 항목: PC (다음 실행 명령 주소), 범용 레지스터 전체, 스택 포인터(SP), 플래그 레지스터, 메모리 관리 정보. 이 정보가 없으면 P1은 재개 불가.' },
    { num:3, title:'P1 상태 → Ready / Waiting 전환', badge:'큐 이동',
      desc:'스케줄러가 P1의 상태를 변경한다. I/O 대기면 Waiting 큐로, 단순 선점이면 Ready 큐로 이동.',
      detail:'P1 상태: Running → Ready 또는 Running → Waiting. Ready 큐는 CPU를 기다리는 상태, Waiting 큐는 I/O 등 이벤트를 기다리는 상태.' },
    { num:4, title:'스케줄러가 다음 프로세스 선택 (P2)', badge:'스케줄링',
      desc:'단기 스케줄러가 Ready 큐에서 다음 실행 프로세스를 선택한다.',
      detail:'FCFS, SJF, Round-Robin, 우선순위 스케줄링 등 알고리즘에 따라 P2 선택. 스케줄링 결정 자체는 문맥교환의 일부가 아닌 전제 조건이다.' },
    { num:5, title:'새 프로세스 상태 복원 (P2 PCB)', badge:'복원',
      desc:'P2의 PCB에 저장된 이전 실행 상태를 레지스터에 복원한다.',
      detail:'복원 항목: P2의 PC, 범용 레지스터, SP, 플래그 등. 이 복원 이후 CPU는 마치 P2가 중단 없이 실행된 것처럼 이어서 작동한다. MMU(페이지 테이블 포인터)도 함께 전환된다.' },
    { num:6, title:'P2 실행 재개', badge:'실행',
      desc:'디스패처가 P2에게 CPU를 넘기고, P2가 이전에 중단된 지점부터 실행을 재개한다.',
      detail:'디스패처(Dispatcher) 역할: 레지스터 적재, 사용자 모드 전환, PC 점프. 디스패처 지연(Dispatcher Latency): 문맥교환에 걸리는 시간 — 이 시간 동안 CPU는 유용한 작업을 하지 못한다.' },
  ];

  const TL = {
    P1:  [{ t:'run',  f:3, lb:'P1 실행' }, { t:'ctx', f:1, lb:'저장' }, { t:'wait', f:4, lb:'대기' }, { t:'run', f:3, lb:'P1 재개' }],
    CTX: [{ t:'gap',  f:3, lb:'' }, { t:'ctx', f:1, lb:'문맥교환' }, { t:'ctx', f:1, lb:'문맥교환' }, { t:'gap', f:2, lb:'' }],
    P2:  [{ t:'wait', f:4, lb:'대기' }, { t:'ctx', f:1, lb:'복원' }, { t:'run', f:3, lb:'P2 실행' }],
  };

  const PCB_GROUPS = [
    { title:'프로세스 식별 정보', items:[['PID','프로세스 식별자 (고유 번호)'],['부모 PID','PPID'],['사용자 ID','UID']], accent:false },
    { title:'CPU 상태 (문맥교환 핵심)', items:[['PC','프로그램 카운터 — 다음 명령 주소'],['레지스터','범용 레지스터 전체 값'],['SP','스택 포인터'],['플래그','상태 레지스터'],['기본 레지스터','메모리 기본/한계 주소']], accent:true },
    { title:'프로세스 상태 & 스케줄링', items:[['상태','New/Ready/Running/Waiting/Terminated'],['우선순위','스케줄링 우선순위 값'],['스케줄링','대기 시간, 실행 시간 등']], accent:false },
    { title:'자원 관리 정보', items:[['메모리 맵','페이지 테이블 포인터'],['열린 파일','파일 디스크립터 테이블'],['I/O 정보','할당된 I/O 장치 목록'],['계정 정보','CPU 사용 시간, 한도 등']], accent:false },
  ];

  let curTab = 'flow';
  let activeStep = null;

  /* ── 렌더 ── */
  function render() {
    const c = document.getElementById('viz-container');
    if (!c) return;
    c.innerHTML = `
      <div id="ctx-wrap">
        <div class="cv-tabs">
          <div class="cv-tab ${curTab==='flow'?'on':''}" onclick="ctxTab('flow')">문맥교환 단계</div>
          <div class="cv-tab ${curTab==='tl'?'on':''}"   onclick="ctxTab('tl')">CPU 타임라인</div>
          <div class="cv-tab ${curTab==='pcb'?'on':''}"  onclick="ctxTab('pcb')">PCB 구조</div>
        </div>
        <div id="cv-flow" style="display:${curTab==='flow'?'':'none'};">${renderFlow()}</div>
        <div id="cv-tl"   style="display:${curTab==='tl'?'':'none'};">${renderTimeline()}</div>
        <div id="cv-pcb"  style="display:${curTab==='pcb'?'':'none'};">${renderPCB()}</div>
      </div>`;
  }

  function renderFlow() {
    return `
      <div style="display:flex;flex-direction:column;">
        ${STEPS.map(step => {
          const on = activeStep === step.num;
          return `
          <div class="cv-step ${on?'on':''}" onclick="ctxStep(${step.num})">
            <div class="cv-step-head">
              <div class="cv-step-num">${step.num}</div>
              <div class="cv-step-title">${step.title}</div>
              <div class="cv-step-badge">${step.badge}</div>
            </div>
            <div class="cv-step-body">
              <div>${step.desc}</div>
              <div class="cv-step-detail">${step.detail}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div style="text-align:center;padding:10px 0 2px;font-size:11px;color:var(--text-tertiary);">단계를 클릭하면 상세 설명이 펼쳐집니다</div>`;
  }

  function renderTimeline() {
    function row(label, segs) {
      return `<div class="cv-row">
        <div class="cv-label">${label}</div>
        <div class="cv-track">
          ${segs.map(seg =>
            seg.t === 'gap'
              ? `<div style="flex:${seg.f};"></div>`
              : `<div class="cv-seg cv-seg-${seg.t}" style="flex:${seg.f};">${seg.lb}</div>`
          ).join('')}
        </div>
      </div>`;
    }
    return `
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;line-height:1.8;">
        문맥교환(주황 구간) 동안 CPU는 <strong style="color:${CSS_ACCENT};">유용한 작업을 수행하지 못한다.</strong>
        이 시간이 문맥교환의 오버헤드(Dispatcher Latency)이다.
      </div>
      ${row('P1', TL.P1)}
      ${row('커널', TL.CTX)}
      ${row('P2', TL.P2)}
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px;align-items:center;">
        ${[['cv-seg-run','CPU 실행'],['cv-seg-ctx','문맥교환 (오버헤드)'],['cv-seg-wait','Ready / Wait']].map(([cls,lb])=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;">
            <div class="cv-seg ${cls}" style="width:16px;height:16px;border-radius:4px;flex:none;padding:0;"></div>
            <span style="color:var(--text-secondary);">${lb}</span>
          </div>`).join('')}
      </div>
      <div style="margin-top:14px;background:color-mix(in srgb, ${CSS_ACCENT} 12%, var(--bg-surface));backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--shadow-inset-sm);border-radius:var(--radius-md,10px);padding:12px 16px;font-size:12px;line-height:1.8;color:var(--text-primary);">
        <strong style="color:${CSS_ACCENT};">핵심 포인트</strong><br>
        P1이 <strong>저장</strong>되고 P2가 <strong>복원</strong>되는 사이 구간 전체가 순수 오버헤드.
        하드웨어가 레지스터 저장을 지원하면(예: 인텔 TSS) 오버헤드를 줄일 수 있다.
      </div>`;
  }

  function renderPCB() {
    return `
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:14px;line-height:1.8;">
        <strong>PCB(Process Control Block)</strong>는 운영체제가 프로세스를 관리하기 위해 유지하는 자료구조.
        문맥교환 시 저장·복원되는 정보의 전체 목록.
      </div>
      <div class="cv-pcb-grid">
        ${PCB_GROUPS.map(g => `
          <div class="cv-pcb-card" style="${g.accent ? `background:color-mix(in srgb, ${CSS_ACCENT} 14%, var(--bg-surface));` : ''}">
            <div class="cv-pcb-title" style="${g.accent ? `color:${CSS_ACCENT};` : ''}">${g.title}</div>
            ${g.items.map(([k,v]) => `
              <div class="cv-pcb-item">
                <span class="cv-pcb-key">${k}</span>
                <span style="color:var(--text-secondary);">${v}</span>
              </div>`).join('')}
          </div>`).join('')}
      </div>
      <div style="margin-top:12px;background:color-mix(in srgb, ${CSS_ACCENT} 12%, var(--bg-surface));backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--shadow-inset-sm);border-radius:var(--radius-md,10px);padding:12px 16px;font-size:12px;line-height:1.8;color:var(--text-primary);">
        <strong style="color:${CSS_ACCENT};">저장/복원 핵심 항목:</strong>
        프로그램 카운터(PC), 범용 레지스터, 스택 포인터(SP) — 이 세 가지가 반드시 처리되어야 한다.
        메모리 맵(페이지 테이블)도 함께 전환되어야 주소 공간이 정확히 전환된다.
      </div>`;
  }

  window.ctxTab = function(tab) {
    curTab = tab; activeStep = null; render();
    setTimeout(() => {
      const w = document.getElementById('ctx-wrap');
      if (w) w.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 50);
  };

  window.ctxStep = function(num) {
    activeStep = activeStep === num ? null : num;
    const el = document.getElementById('cv-flow');
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
