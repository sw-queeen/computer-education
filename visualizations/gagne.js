/**
 * 가네 9가지 수업사태 — 인터랙티브 시각화
 * 마운트: #viz-container
 * 원페이지(1) 교수학습이론 파트 기반
 */
(function () {

  const ACCENT = '#D4874A';
  const BG     = '#FBF0E6';
  const MID    = '#F0C89A';
  const FONT   = "var(--font-body,var(--font-main),'Pretendard','Apple SD Gothic Neo',sans-serif)";

  /* ── CSS ─────────────────────────────────────────── */
  if (!document.getElementById('gagne-viz-style')) {
    const s = document.createElement('style');
    s.id = 'gagne-viz-style';
    s.textContent = `
      #gagne-wrap { font-family:${FONT}; max-width:100%; color:var(--text-primary,#2C2825); }
      #gagne-wrap * { box-sizing:border-box; }

      /* 탭 */
      #gagne-wrap .gv-tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px; }
      #gagne-wrap .gv-tab {
        padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600;
        cursor:pointer; border:1.5px solid ${MID}; color:${ACCENT};
        background:var(--bg-white,#fff); transition:all .15s; font-family:${FONT};
      }
      #gagne-wrap .gv-tab.on { background:${BG}; color:#7A4018; border-color:${ACCENT}; }

      /* 9단계 플로우 */
      #gagne-wrap .gv-flow { display:flex; flex-direction:column; gap:4px; }
      #gagne-wrap .gv-step {
        display:flex; align-items:stretch; border-radius:12px; overflow:hidden;
        border:1.5px solid transparent; cursor:pointer; transition:all .15s;
      }
      #gagne-wrap .gv-step:hover { border-color:${MID}; }
      #gagne-wrap .gv-step.on {
        border-color:${ACCENT};
        box-shadow:0 2px 12px rgba(212,135,74,0.18);
      }
      #gagne-wrap .gv-step-num {
        width:36px; flex-shrink:0; display:flex; flex-direction:column;
        align-items:center; justify-content:center; font-size:13px;
        font-weight:800; padding:10px 0;
      }
      #gagne-wrap .gv-step-body { flex:1; padding:10px 14px; }
      #gagne-wrap .gv-step-inner { font-size:11px; font-weight:700; letter-spacing:.04em; margin-bottom:2px; }
      #gagne-wrap .gv-step-outer { font-size:13px; font-weight:700; }
      #gagne-wrap .gv-step-desc { font-size:12px; color:var(--text-secondary,#6B6560); margin-top:2px; display:none; line-height:1.65; }
      #gagne-wrap .gv-step.on .gv-step-desc { display:block; }
      #gagne-wrap .gv-step-example {
        margin-top:6px; font-size:11px;
        color:${ACCENT}; display:none; padding-left:2px;
      }
      #gagne-wrap .gv-step.on .gv-step-example { display:block; }
      #gagne-wrap .gv-arrow {
        text-align:center; font-size:14px; color:var(--text-tertiary,#C0BBB0);
        line-height:1; padding:2px 0;
      }

      /* 상세 패널 */
      #gagne-wrap .gv-detail {
        background:var(--bg-white,#fff); border:1.5px solid ${MID};
        border-radius:14px; padding:16px 18px; margin-top:12px;
      }
      #gagne-wrap .gv-detail-num {
        display:inline-flex; align-items:center; justify-content:center;
        width:28px; height:28px; border-radius:50%; font-size:13px;
        font-weight:800; margin-right:8px; flex-shrink:0;
      }
      #gagne-wrap .gv-detail-title { font-size:15px; font-weight:700; color:#7A4018; }
      #gagne-wrap .gv-detail-inner { font-size:11px; color:${ACCENT}; font-weight:600; margin-bottom:8px; }
      #gagne-wrap .gv-detail-desc { font-size:13px; line-height:1.8; color:var(--text-primary,#2C2825); }
      #gagne-wrap .gv-detail-ex {
        margin-top:10px; padding:8px 12px;
        background:${BG}; border-radius:8px;
        font-size:12px; color:#7A4018; line-height:1.7;
      }
      #gagne-wrap .gv-detail-ex-label { font-size:10px; font-weight:700; color:${ACCENT}; letter-spacing:.05em; margin-bottom:4px; }

      /* 수업목표 카드 */
      #gagne-wrap .gv-goal-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:10px; }
      #gagne-wrap .gv-goal-card {
        background:var(--bg-surface,#F0EDE8); border-radius:12px; padding:14px 16px;
        border-left:3px solid;
      }
      #gagne-wrap .gv-goal-name { font-size:13px; font-weight:700; margin-bottom:4px; }
      #gagne-wrap .gv-goal-desc { font-size:11px; color:var(--text-secondary,#6B6560); line-height:1.6; }
      #gagne-wrap .gv-goal-method {
        margin-top:8px; font-size:10px; font-weight:700;
        color:var(--text-tertiary,#A09890); letter-spacing:.04em;
      }
      #gagne-wrap .gv-goal-tag {
        display:inline-block; font-size:10px; padding:2px 8px;
        border-radius:20px; margin-top:4px;
      }
      #gagne-wrap .gv-goal-analysis {
        margin-top:6px; font-size:11px; color:${ACCENT}; font-weight:600;
      }

      @media(max-width:480px) {
        #gagne-wrap .gv-goal-grid { grid-template-columns:1fr; }
        #gagne-wrap .gv-step-outer { font-size:12px; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── 데이터 ───────────────────────────────────────── */
  const STEPS = [
    {
      num:1,
      inner:'주의집중 (내적 과정)',
      outer:'주의집중 획득',
      desc:'수업이 이루어지기 위해 학습자의 주의력을 획득해야 한다.',
      example:'교사가 질문을 던지거나 흥미로운 사례를 제시한다.',
      bg:'#FBF0E6', color:'#C87840'
    },
    {
      num:2,
      inner:'기대 (내적 과정)',
      outer:'학습목표 제시',
      desc:'수업 후 얻게 되는 수업결과를 명확히 알려줌으로써 수업 기대감과 동기를 향상시킨다.',
      example:'"여러분들은 수업 후 이 이유를 알게 될 것입니다."',
      bg:'#FBF4E0', color:'#B89020'
    },
    {
      num:3,
      inner:'장기기억→단기기억 인출 (내적 과정)',
      outer:'선수학습 회상',
      desc:'새로운 지식은 선행학습을 기반으로 이루어지기 때문에 새로운 학습을 하기 전에 이전 학습내용을 확인해야 한다.',
      example:'이전 수업에서 배운 내용을 떠올리도록 유도한다.',
      bg:'#EEF8E0', color:'#609020'
    },
    {
      num:4,
      inner:'선택적 지각 (내적 과정)★',
      outer:'자극자료 제시★',
      desc:'학습자에게 학습할 내용을 제시하는 단계. 새로운 정보에 독특한 특징을 부각하면 기억하기 쉽다. 이때 학습자의 선택적 지각을 촉진한다.',
      example:'예시·사례·영상자료 제시, 밑줄 긋기, 시범 → 삼각형 내각의 합을 가르칠 때 180° 숫자에 빨간 밑줄',
      bg:'#FAE8E4', color:'#B84830'
    },
    {
      num:5,
      inner:'의미의 부호화 (내적 과정)★',
      outer:'학습안내 제공★',
      desc:'학습한 내용들을 종합하고 서로의 상관관계를 제시하여 장기기억을 돕는 활동. 부호화·정교화 전략을 사용한다.',
      example:'도표, 규칙, 순서도 등 스캐폴딩(비계) 제공',
      bg:'#EAE8F8', color:'#5848B0'
    },
    {
      num:6,
      inner:'반응 (내적 과정)★',
      outer:'수행 유도★',
      desc:'학습한 내용을 유사한 실제 문제 상황에 적용해보는 단계.',
      example:'연습문제, 숙제, 실험, 정리 활동',
      bg:'#E6EAF5', color:'#3A5080'
    },
    {
      num:7,
      inner:'강화 (내적 과정)',
      outer:'피드백 제공',
      desc:'학습자 수행이 성공적이면 칭찬으로 즉시 강화. 그렇지 않다면 재학습 기회를 제공 후 긍정적인 피드백과 조언을 한다.',
      example:'정답이면 "잘 했어요!" 즉각 칭찬, 오답이면 교정 피드백 제공',
      bg:'#E0F8F0', color:'#208858'
    },
    {
      num:8,
      inner:'인출과 강화 / 재생을 위한 암시 (내적 과정)',
      outer:'형성평가 (수행평가)',
      desc:'학습자가 수업목표를 달성했는지 성취수준을 평가하는 단계. 단순암기 평가가 아니라 이해 여부를 점검하기 위해 수행평가를 활용한다.',
      example:'퀴즈, 실기 과제, 프로젝트 등으로 이해 점검',
      bg:'#E4F2FA', color:'#1878A8'
    },
    {
      num:9,
      inner:'일반화 (내적 과정)',
      outer:'파지와 전이 증진',
      desc:'목표 도달 평가로 끝나는 것이 아니라, 연습 기회를 계속 제공하여 파지와 전이를 증진시킨다. 파지: 장기기억에 저장 / 전이: 다른 문제 상황에 적용하여 일반화',
      example:'다양한 형태의 문제를 추가 제시, 복습 기회 제공',
      bg:'#EEE8F5', color:'#6840A8'
    },
  ];

  const GOALS = [
    {
      name:'언어정보★',
      desc:'명제적(선언적) 지식. 사실·개념·원리 등을 기억해 언어로 표현하는 능력.',
      method:'과제분석: 군집분석',
      analysis:'학습과제를 범주(군집)별로 묶는 기법',
      example:'정의 외우기, 역사 기억하기, 공식 진술',
      effective:'선행조직자 제시, 청킹',
      border:'#D4874A', bg:'#FBF0E6', color:'#7A4018'
    },
    {
      name:'지적기능★',
      desc:'방법적(절차적) 지식. 언어·숫자·부호 등 상징적 기호를 사용하여 진술하는 능력.',
      method:'과제분석: 위계분석',
      analysis:'상위기능과 하위기능으로 분석하는 기법',
      example:'교집합·합집합 구분, 수식 계산',
      effective:'위계학습, 예제사례 제시, 새로운 문제',
      border:'#3A5AA0', bg:'#E6EAF5', color:'#1A2E60'
    },
    {
      name:'인지전략',
      desc:'학습자가 기억하고 사고하며 과제에 맞는 학습전략을 찾아내 활용하는 능력.',
      method:'과제분석: 위계·절차 분석',
      analysis:'다양한 상황에서의 문제해결 경험으로 개발',
      example:'암기법, 메타인지 전략',
      effective:'연습, 설명, 토의',
      border:'#2A9E94', bg:'#E0F5F2', color:'#0E4E48'
    },
    {
      name:'태도',
      desc:'특정 사건·사물·사람에 대해 나타나는 개인적 성향.',
      method:'과제분석: 통합분석',
      analysis:'군집·위계·절차 분석을 혼합하는 방법',
      example:'솔선수범, 양보',
      effective:'관찰학습, 동일시, 교사시범',
      border:'#8050B8', bg:'#EEE8F5', color:'#3E1E6A'
    },
    {
      name:'운동기능',
      desc:'신체 근육을 활용하여 특정한 동작을 수행하는 능력.',
      method:'과제분석: 절차분석',
      analysis:'먼저 수행해야 할 과제의 순서를 분석하는 기법',
      example:'수영하기, 축구하기, 글씨 쓰기',
      effective:'반복 연습, 시범',
      border:'#D05840', bg:'#FAE8E4', color:'#6E2010'
    },
  ];

  /* ── 상태 ─────────────────────────────────────────── */
  let activeStep = null;
  let curTab = 'flow';

  /* ── 렌더 ─────────────────────────────────────────── */
  function render() {
    const container = document.getElementById('viz-container');
    if (!container) return;
    container.innerHTML = `
      <div id="gagne-wrap">
        <div class="gv-tabs">
          <div class="gv-tab ${curTab==='flow'?'on':''}" onclick="gagneTab('flow')">9가지 수업사태</div>
          <div class="gv-tab ${curTab==='goal'?'on':''}" onclick="gagneTab('goal')">5가지 수업목표</div>
        </div>
        <div id="gv-flow" style="display:${curTab==='flow'?'':'none'};">
          ${renderFlow()}
        </div>
        <div id="gv-goal" style="display:${curTab==='goal'?'':'none'};">
          ${renderGoal()}
        </div>
      </div>`;
  }

  function renderFlow() {
    const items = STEPS.map((step, i) => {
      const isOn = activeStep === step.num;
      return `
        <div class="gv-step ${isOn?'on':''}"
          style="background:${isOn ? step.bg : 'var(--bg-white,#fff)'};"
          onclick="gagneStep(${step.num})">
          <div class="gv-step-num" style="background:${step.bg};color:${step.color};">
            <span>${step.num}</span>
          </div>
          <div class="gv-step-body">
            <div class="gv-step-inner" style="color:${step.color};">${step.inner}</div>
            <div class="gv-step-outer">${step.outer}</div>
            <div class="gv-step-desc">${step.desc}</div>
            <div class="gv-step-example">예: ${step.example}</div>
          </div>
        </div>
        ${i < STEPS.length-1 ? '<div class="gv-arrow">↓</div>' : ''}`;
    }).join('');

    const detail = activeStep ? (() => {
      const s = STEPS.find(x => x.num === activeStep);
      return `
        <div class="gv-detail">
          <div style="display:flex;align-items:center;margin-bottom:8px;">
            <div class="gv-detail-num" style="background:${s.bg};color:${s.color};">${s.num}</div>
            <div class="gv-detail-title">${s.outer}</div>
          </div>
          <div class="gv-detail-inner">내적 과정: ${s.inner}</div>
          <div class="gv-detail-desc">${s.desc}</div>
          <div class="gv-detail-ex">
            <div class="gv-detail-ex-label">수업 활동 예시</div>
            ${s.example}
          </div>
        </div>`;
    })() : `<div style="text-align:center;padding:16px;font-size:12px;color:var(--text-tertiary,#A09890);">단계를 클릭하면 상세 설명이 나타납니다</div>`;

    return `<div class="gv-flow">${items}</div>${detail}`;
  }

  function renderGoal() {
    return `
      <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:14px;line-height:1.7;">
        가네는 수업목표를 5가지로 구분하고, 각각 다른 교수방법을 처방해야 한다고 주장했다.
        각 영역마다 과제분석 방법이 다르다는 점이 시험 핵심.
      </div>
      <div class="gv-goal-grid">
        ${GOALS.map(g => `
          <div class="gv-goal-card" style="border-left-color:${g.border};background:var(--bg-surface,#F0EDE8);">
            <div class="gv-goal-name" style="color:${g.color};">${g.name}</div>
            <div class="gv-goal-desc">${g.desc}</div>
            <div class="gv-goal-analysis" style="color:${g.border};">▶ ${g.method}</div>
            <div style="font-size:10px;color:var(--text-secondary,#6B6560);margin-top:2px;">${g.analysis}</div>
            <div class="gv-goal-method">효과적 학습방법</div>
            <div style="font-size:11px;color:var(--text-secondary,#6B6560);">${g.effective}</div>
            <div class="gv-goal-method" style="margin-top:6px;">예</div>
            <div style="font-size:11px;color:var(--text-secondary,#6B6560);">${g.example}</div>
          </div>`).join('')}
      </div>`;
  }

  /* ── 글로벌 핸들러 ───────────────────────────────── */
  window.gagneTab = function(tab) {
    curTab = tab;
    render();
    setTimeout(() => {
      const wrap = document.getElementById('gagne-wrap');
      if (wrap) wrap.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 50);
  };

  window.gagneStep = function(num) {
    activeStep = activeStep === num ? null : num;
    render();
  };

  /* ── 초기화 ──────────────────────────────────────── */
  function init() {
    if (document.getElementById('viz-container')) {
      render();
    } else {
      const obs = new MutationObserver(() => {
        if (document.getElementById('viz-container')) {
          obs.disconnect(); render();
        }
      });
      obs.observe(document.body, { childList:true, subtree:true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
