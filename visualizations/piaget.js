/**
 * 피아제 인지발달이론 시각화
 * 사용법: concept.html?subject=교육심리학&concept=피아제+인지발달+4단계
 * 또는 독립 실행: <div id="viz-root"></div> 후 이 파일 로드
 */

(function () {
  const STAGES = [
    {
      num: "1", name: "감각운동기", age: "0~2세", keyword: "반사 → 목적행동",
      bg: "#FBF0E6", accent: "#C87840", border: "#F0C89A",
      desc: "감각(보기·듣기)과 운동(잡기·빨기)으로 세계를 탐색하는 시기. 언어 이전 단계로, 반사행동에서 점점 목적이 있는 행동으로 발달해. 사고능력은 없음.",
      chars: ["반사행동으로 출발", "대상영속성 획득 (8~12개월)", "1·2·3차 순환반응 발달", "모방행동 나타남", "표상 능력은 없음(언어 이전)"],
      key: "대상영속성 획득",
      viz_type: "arrow",
      viz: [{ icon: "👁️", label: "감각" }, { icon: "🤲", label: "운동" }, { icon: "🧠", label: "도식 형성" }],
      concepts: {
        "대상영속성": "눈앞에서 사라져도 물체가 계속 존재한다는 것을 아는 능력. 생후 8~12개월경 획득. 예: 담요 밑에 숨긴 장난감을 찾으러 감.",
        "순환반응": "우연히 흥미로운 결과를 낳은 행동을 반복하는 것. 1차(자기 신체)→2차(외부 물체)→3차(새 결과 탐색) 순으로 발달.",
        "모방행동": "부모나 TV 속 인물을 모방하는 행동 시작. 단계 말(18~24개월)에 이미 본 행동을 나중에 재현하는 지연모방도 가능.",
        "표상 능력 없음": "이 단계는 언어 이전 단계. 사물·사건을 내적으로 표상하는 능력이 없다가, 단계 말기에야 싹트기 시작함."
      },
      exam: [
        "대상영속성 획득 시기(8~12개월) 암기 필수",
        "순환반응 1·2·3차 구분 출제",
        "언어 이전 단계 — 표상 능력(사고)이 없다는 점이 핵심",
        "감각 및 운동을 통해 세계를 이해하는 단계"
      ]
    },
    {
      num: "2", name: "전조작기", age: "2~7세", keyword: "상징·자기중심성",
      bg: "#F5E6EC", accent: "#C4688E", border: "#E8AECA",
      desc: "생각으로 사물을 다룰 수 있는 정신적 능력이 발달하는 시기. 언어와 상징을 쓰기 시작하지만 아직 논리적 조작이 불가능. 자기중심적 사고가 강하고 보존 개념이 없어.",
      chars: ["상징적 사고 시작 (소꿉장난·병원놀이)", "자기중심성 — 타인 관점 이해 불가", "물활론 — 모든 사물에 생명 부여", "전개념 발달 (언어 급속 발달)", "보존 개념 미발달 (중심화)"],
      key: "자기중심성",
      viz_type: "bars",
      viz: [
        { label: "상징적 사고", w: "85%" },
        { label: "자기중심성", w: "90%" },
        { label: "논리적 조작", w: "15%" },
        { label: "보존 개념", w: "10%" }
      ],
      concepts: {
        "자기중심성": "타인도 자신과 같은 방식으로 세계를 본다고 생각하는 것. 세 산 과제(Three Mountains Task)로 측정. 구체적조작기에 탈중심화로 극복.",
        "물활론": "무생물에 생명·의도를 부여. 예: '의자가 나를 때렸어!'. 전조작기 후반에 점차 소멸.",
        "보존 개념 없음(중심화)": "물의 양은 그릇 모양이 달라도 같다는 것을 모름. 외형의 한 측면에만 집중(중심화). 구체적조작기에 획득.",
        "상징적 사고": "부모나 TV 인물을 모방하거나 자신이 다른 사람인 것처럼 행동. 소꿉장난·병원놀이. 언어 폭발의 기반."
      },
      exam: [
        "자기중심성 ↔ 탈중심화(구체적조작기) 대비 빈출",
        "세 산 과제(Three Mountains Task) 이름 암기",
        "보존 개념 없음 — 중심화(centration) 때문",
        "물활론·직관적 사고·전개념은 이 시기만의 특징"
      ]
    },
    {
      num: "3", name: "구체적조작기", age: "7~11세", keyword: "보존·논리(구체물)",
      bg: "#E6F2EC", accent: "#4EA87A", border: "#A8D8BC",
      desc: "경험할 수 있는 것만 논리적으로 사고하는 단계. 보존 개념이 생기고 분류·서열화가 가능. 탈중심화로 타인 관점 이해 시작. 아직 추상적 사고는 어려워.",
      chars: ["보존 개념 획득 (수→양→무게→부피)", "분류·서열화 가능", "탈중심화 — 타인 관점 이해", "가역성 이해", "보상성(상보성) 이해", "구체적 사물이 반드시 필요"],
      key: "보존 개념 획득",
      viz_type: "arrow",
      viz: [{ icon: "🧱", label: "구체물" }, { icon: "⚖️", label: "보존" }, { icon: "📊", label: "분류·서열" }],
      concepts: {
        "보존 개념": "물체가 위치나 모양이 달라도 본질은 변함없다는 것을 아는 것. 획득 순서: 수(6~7세)→양(7~8세)→무게(9~10세)→부피(11~12세). 순서 암기 필수!",
        "가역성": "조작을 원래대로 되돌릴 수 있다는 이해. 4+3=7이면 7-3=4. 보존 개념의 인지적 기반.",
        "탈중심화": "사물이나 현상의 여러 측면을 동시에 고려할 줄 아는 능력. 전조작기 자기중심성과 대비되는 핵심 변화.",
        "보상성(상보성)": "한 차원이 변해도 다른 차원에 의해 보상되어 상쇄됨을 아는 것. 예: 고무를 늘리면 두께가 얇아져도 길이로 보상되어 동일함."
      },
      exam: [
        "보존 개념 획득 순서(수→양→무게→부피) 반드시 암기",
        "전조작기 vs 구체적조작기 비교 빈출 (자기중심성↔탈중심화)",
        "'구체적' = 눈앞에 있는 사물에만 논리 적용 가능",
        "가역성·보상성이 보존 개념의 인지적 기반"
      ]
    },
    {
      num: "4", name: "형식적조작기", age: "12세~", keyword: "추상·가설연역",
      bg: "#EAE8F8", accent: "#6058C0", border: "#B0A8E8",
      desc: "가설적이고 추상적인 개념을 논리적으로 사고하는 단계. '만약 ~라면'처럼 가상의 상황을 추론할 수 있어. 모든 사람이 완전히 도달하지는 않아.",
      chars: ["가설연역적 사고 (가설 설정→검증)", "추상적 사고 (반성적 추상화)", "명제적 사고 (명제 바탕 추론)", "조합적 사고 (체계적 변수 탐색)", "청소년기 자아중심성 재등장 (by 엘킨드)"],
      key: "가설연역적 추론",
      viz_type: "arrow",
      viz: [{ icon: "❓", label: "가설 설정" }, { icon: "🔬", label: "체계적 검증" }, { icon: "💡", label: "결론 도출" }],
      concepts: {
        "가설연역적 사고": "가설적 상황을 설정하고 그 가설을 검증해 연역적 추론을 하는 능력. 예: '모든 사람의 키가 같으면 어떻게 될까?'처럼 비현실적 상황도 논리적으로 추론.",
        "추상적 사고(반성적 추상화)": "구체적 경험 없이도 추상적 개념 이해 가능. 예: '1/3은 5/15와 같다', 대수식 이해. 메타사고(사고에 대한 사고)도 가능.",
        "명제적 사고": "명제를 바탕으로 가설을 설정하고 논리적으로 추론. 예: 'A는 B보다 크지만 무게는 가볍다.' 같은 관계 유추.",
        "청소년 자아중심성(엘킨드)": "상상적 청중(모두가 나를 본다)과 개인적 우화(나는 특별하다)로 나타남. 에릭슨의 자아정체감과 연결되어 출제."
      },
      exam: [
        "'형식적' = 추상적·가설적 — 구체물 없이 사고 가능",
        "모든 사람이 이 단계에 도달하지는 않음 (교육·문화 영향)",
        "청소년 자아중심성(엘킨드) — 상상적 청중·개인적 우화 암기",
        "반성적 추상화(추상적 사고)가 핵심 출제 키워드"
      ]
    }
  ];

  const CORE = [
    {
      name: "도식 (Schema)", accent: "#C87840", bg: "#FBF0E6",
      desc: "세상을 이해하는 인지적 틀. 경험이 쌓이면서 점점 정교해져. 장기기억 속에 조직화된 구조.",
      ex: "예: '개' 도식 — 처음엔 털 있고 네 발 → 점점 세분화됨"
    },
    {
      name: "동화 (Assimilation)", accent: "#4EA87A", bg: "#E6F2EC",
      desc: "새 경험을 기존 도식에 끼워 맞추는 과정. 도식은 변하지 않아.",
      ex: "예: 고양이를 처음 보고 '강아지!'라고 함"
    },
    {
      name: "조절 (Accommodation)", accent: "#6058C0", bg: "#EAE8F8",
      desc: "기존 도식으로 설명 안 될 때 도식 자체를 수정·확장하는 것.",
      ex: "예: 고양이가 강아지와 다르다는 걸 알고 도식 수정"
    },
    {
      name: "평형화 (Equilibration)", accent: "#C4688E", bg: "#F5E6EC",
      desc: "동화와 조절의 균형을 찾아가는 자기조절 과정. 인지발달의 원동력. 불균형(인지갈등)→조절→새 평형.",
      ex: "예: 불평형 상태(인지 갈등) → 조절 → 평형 회복"
    }
  ];

  let cur = 0;
  let activeConcept = null;

  // ── 마운트 대상 탐색 ──────────────────────────────
  // concept.html 의 #viz-container 또는 독립 실행 시 #viz-root
  const mountEl = document.getElementById('viz-container') || document.getElementById('viz-root');
  if (!mountEl) return;

  // ── 스타일 주입 (한 번만) ─────────────────────────
  if (!document.getElementById('piaget-style')) {
    const style = document.createElement('style');
    style.id = 'piaget-style';
    style.textContent = `
      #piaget-wrap{--s-bg:#FBF0E6;--s-accent:#C87840;--s-border:#F0C89A;max-width:100%;box-sizing:border-box;}
      #piaget-wrap *{box-sizing:border-box;}
      #piaget-wrap .p-timeline{display:flex;border-radius:12px;overflow:hidden;border:1px solid var(--color-border-tertiary,#e0ddd8);margin-bottom:20px;}
      #piaget-wrap .p-tl{flex:1;padding:10px 6px 8px;cursor:pointer;text-align:center;border-right:1px solid var(--color-border-tertiary,#e0ddd8);transition:background .15s;min-width:0;}
      #piaget-wrap .p-tl:last-child{border-right:none;}
      #piaget-wrap .p-tl.on{background:var(--s-bg);}
      #piaget-wrap .p-tl-num{font-size:11px;font-weight:700;margin-bottom:2px;}
      #piaget-wrap .p-tl-name{font-size:11px;font-weight:600;color:#2C2825;margin-bottom:1px;}
      #piaget-wrap .p-tl-age{font-size:10px;color:#A09890;}
      #piaget-wrap .p-tl-bar{height:3px;border-radius:2px;opacity:0;margin-top:7px;transition:opacity .15s;}
      #piaget-wrap .p-tl.on .p-tl-bar{opacity:1;}
      #piaget-wrap .p-panel{background:#fff;border:1px solid #e0ddd8;border-radius:14px;padding:20px 20px;margin-bottom:14px;}
      #piaget-wrap .p-header{display:flex;align-items:flex-start;gap:16px;margin-bottom:18px;}
      #piaget-wrap .p-badge{width:48px;height:48px;border-radius:12px;background:var(--s-bg);display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;border:1px solid var(--s-border);}
      #piaget-wrap .p-badge-num{font-size:18px;font-weight:700;color:var(--s-accent);}
      #piaget-wrap .p-badge-lbl{font-size:8px;font-weight:700;color:var(--s-accent);letter-spacing:.04em;}
      #piaget-wrap .p-title{font-size:20px;font-weight:700;color:#2C2825;margin-bottom:2px;}
      #piaget-wrap .p-age{font-size:12px;color:#A09890;font-weight:500;}
      #piaget-wrap .p-kw{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:8px;background:var(--s-bg);color:var(--s-accent);margin-top:4px;}
      #piaget-wrap .p-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
      #piaget-wrap .p-icard{background:#F0EDE8;border-radius:10px;padding:12px 14px;}
      #piaget-wrap .p-ilabel{font-size:10px;font-weight:700;color:#A09890;letter-spacing:.05em;margin-bottom:6px;}
      #piaget-wrap .p-ibody{font-size:13px;color:#2C2825;line-height:1.65;}
      #piaget-wrap .p-viz{background:var(--s-bg);border-radius:10px;padding:14px 16px;margin-bottom:14px;min-height:72px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0;}
      #piaget-wrap .p-viz-item{text-align:center;padding:8px 12px;}
      #piaget-wrap .p-viz-circle{width:44px;height:44px;border-radius:50%;background:var(--s-accent);display:flex;align-items:center;justify-content:center;margin:0 auto 6px;font-size:18px;}
      #piaget-wrap .p-viz-lbl{font-size:11px;font-weight:600;color:var(--s-accent);}
      #piaget-wrap .p-viz-arrow{font-size:18px;color:var(--s-accent);opacity:.5;align-self:center;padding:0 4px;}
      #piaget-wrap .p-bar{height:24px;border-radius:6px;background:var(--s-accent);display:flex;align-items:center;padding:0 10px;font-size:11px;font-weight:600;color:#fff;margin-bottom:3px;}
      #piaget-wrap .p-exam{background:#fff;border:1px solid var(--s-border);border-left:3px solid var(--s-accent);border-radius:0 10px 10px 0;padding:12px 16px;margin-bottom:14px;}
      #piaget-wrap .p-exam-title{font-size:11px;font-weight:700;color:var(--s-accent);letter-spacing:.05em;margin-bottom:6px;}
      #piaget-wrap .p-exam-body{font-size:12px;color:#6B6560;line-height:1.75;}
      #piaget-wrap .p-ctabs{display:flex;gap:4px;margin-bottom:10px;flex-wrap:wrap;}
      #piaget-wrap .p-ctab{padding:5px 12px;border-radius:20px;border:1px solid #e0ddd8;background:#F0EDE8;font-size:12px;font-weight:500;cursor:pointer;color:#6B6560;transition:all .12s;}
      #piaget-wrap .p-ctab.on{background:var(--s-bg);color:var(--s-accent);border-color:var(--s-border);font-weight:700;}
      #piaget-wrap .p-ccontent{background:#F0EDE8;border-radius:10px;padding:14px 16px;font-size:13px;color:#6B6560;line-height:1.75;min-height:72px;}
      #piaget-wrap .p-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
      #piaget-wrap .p-nbtn{padding:8px 20px;border-radius:20px;border:1px solid #c0bbb5;background:#fff;font-size:13px;cursor:pointer;color:#6B6560;font-family:inherit;transition:all .12s;}
      #piaget-wrap .p-nbtn:hover{background:#F0EDE8;}
      #piaget-wrap .p-nbtn:disabled{opacity:.3;cursor:default;}
      #piaget-wrap .p-nbtn.prim{background:var(--s-bg);color:var(--s-accent);border-color:var(--s-border);font-weight:600;}
      #piaget-wrap .p-dots{display:flex;gap:6px;}
      #piaget-wrap .p-dot{width:8px;height:8px;border-radius:50%;background:#c0bbb5;transition:background .15s;}
      #piaget-wrap .p-dot.on{background:var(--s-accent);}
      #piaget-wrap .p-core{background:#F0EDE8;border-radius:14px;padding:18px 20px;}
      #piaget-wrap .p-core-title{font-size:11px;font-weight:700;color:#A09890;letter-spacing:.05em;margin-bottom:14px;}
      #piaget-wrap .p-core-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;}
      #piaget-wrap .p-ccard{border-radius:10px;padding:12px;}
      #piaget-wrap .p-ccard-name{font-size:12px;font-weight:700;margin-bottom:5px;}
      #piaget-wrap .p-ccard-desc{font-size:11px;line-height:1.6;color:#6B6560;}
      #piaget-wrap .p-ccard-ex{font-size:10px;margin-top:5px;color:#A09890;line-height:1.5;}
      @media(max-width:600px){
        #piaget-wrap .p-grid2{grid-template-columns:1fr;}
        #piaget-wrap .p-panel{padding:16px 14px;}
        #piaget-wrap .p-core-grid{grid-template-columns:1fr 1fr;}
        #piaget-wrap .p-tl-name{font-size:10px;}
        #piaget-wrap .p-tl-age{display:none;}
        #piaget-wrap .p-viz{flex-wrap:wrap;}
      }
      @media(max-width:400px){
        #piaget-wrap .p-core-grid{grid-template-columns:1fr;}
        #piaget-wrap .p-nbtn{padding:8px 12px;font-size:12px;}
      }
    `;
    document.head.appendChild(style);
  }

  // ── 렌더 함수 ─────────────────────────────────────
  function setVars(s) {
    const w = document.getElementById('piaget-wrap');
    if (!w) return;
    w.style.setProperty('--s-bg', s.bg);
    w.style.setProperty('--s-accent', s.accent);
    w.style.setProperty('--s-border', s.border);
  }

  function renderViz(s) {
    if (s.viz_type === 'arrow') {
      return s.viz.map((v, i) => {
        const arrow = i < s.viz.length - 1 ? `<span class="p-viz-arrow">→</span>` : '';
        return `<div class="p-viz-item"><div class="p-viz-circle">${v.icon}</div><div class="p-viz-lbl">${v.label}</div></div>${arrow}`;
      }).join('');
    }
    return s.viz.map(v =>
      `<div style="width:100%;margin-bottom:3px;"><div class="p-bar" style="width:${v.w}">${v.label}</div></div>`
    ).join('');
  }

  function renderConcepts(s) {
    const keys = Object.keys(s.concepts);
    if (!activeConcept || !s.concepts[activeConcept]) activeConcept = keys[0];
    const tabs = keys.map(k =>
      `<button class="p-ctab ${k === activeConcept ? 'on' : ''}" onclick="piagetSwitchConcept('${k}')">${k}</button>`
    ).join('');
    return `<div class="p-ctabs">${tabs}</div><div class="p-ccontent">${s.concepts[activeConcept]}</div>`;
  }

  function render() {
    const s = STAGES[cur];

    const timeline = STAGES.map((st, i) =>
      `<div class="p-tl ${i === cur ? 'on' : ''}" style="--s-bg:${st.bg};--s-accent:${st.accent};" onclick="piagetJump(${i})">
        <div class="p-tl-num" style="color:${st.accent};">단계 ${st.num}</div>
        <div class="p-tl-name">${st.name}</div>
        <div class="p-tl-age">${st.age}</div>
        <div class="p-tl-bar" style="background:${st.accent};"></div>
      </div>`
    ).join('');

    const charList = s.chars.map(c => `<li style="margin-bottom:3px;">${c}</li>`).join('');
    const examList = s.exam.map(e => `<li style="margin-bottom:3px;">${e}</li>`).join('');

    const coreCards = CORE.map(c =>
      `<div class="p-ccard" style="background:${c.bg};border:1px solid ${c.accent}22;">
        <div class="p-ccard-name" style="color:${c.accent};">${c.name}</div>
        <div class="p-ccard-desc">${c.desc}</div>
        <div class="p-ccard-ex">${c.ex}</div>
      </div>`
    ).join('');

    const dots = STAGES.map((_, i) => `<div class="p-dot ${i === cur ? 'on' : ''}"></div>`).join('');

    document.getElementById('piaget-wrap').innerHTML = `
      <div style="padding:1rem 0 2rem;">
        <div class="p-timeline">${timeline}</div>

        <div class="p-panel">
          <div class="p-header">
            <div class="p-badge">
              <div class="p-badge-num">${s.num}</div>
              <div class="p-badge-lbl">단계</div>
            </div>
            <div>
              <div class="p-title">${s.name}</div>
              <div class="p-age">${s.age}</div>
              <div class="p-kw">${s.keyword}</div>
            </div>
          </div>

          <div class="p-grid2">
            <div class="p-icard">
              <div class="p-ilabel">이 시기의 특징</div>
              <div class="p-ibody"><ul style="padding-left:16px;">${charList}</ul></div>
            </div>
            <div class="p-icard">
              <div class="p-ilabel">핵심 성취</div>
              <div style="font-size:14px;font-weight:700;color:var(--s-accent);margin-bottom:6px;">${s.key}</div>
              <div class="p-ibody">${s.desc}</div>
            </div>
          </div>

          <div class="p-viz">${renderViz(s)}</div>

          <div class="p-icard" style="margin-bottom:14px;">
            <div class="p-ilabel">세부 개념 살펴보기</div>
            <div style="margin-top:8px;">${renderConcepts(s)}</div>
          </div>

          <div class="p-exam">
            <div class="p-exam-title">임용 기출 포인트</div>
            <div class="p-exam-body"><ul style="padding-left:16px;">${examList}</ul></div>
          </div>
        </div>

        <div class="p-nav">
          <button class="p-nbtn" onclick="piagetGo(-1)" ${cur === 0 ? 'disabled' : ''}>← 이전 단계</button>
          <div class="p-dots">${dots}</div>
          <button class="p-nbtn prim" onclick="piagetGo(1)" ${cur === STAGES.length - 1 ? 'disabled' : ''}>다음 단계 →</button>
        </div>

        <div class="p-core">
          <div class="p-core-title">핵심 개념 — 도식 · 동화 · 조절 · 평형화</div>
          <div class="p-core-grid">${coreCards}</div>
        </div>
      </div>`;

    setVars(s);
  }

  // ── 전역 이벤트 핸들러 ────────────────────────────
  window.piagetGo = function (d) {
    cur = Math.max(0, Math.min(STAGES.length - 1, cur + d));
    activeConcept = null;
    render();
  };
  window.piagetJump = function (i) {
    cur = i;
    activeConcept = null;
    render();
  };
  window.piagetSwitchConcept = function (k) {
    activeConcept = k;
    render();
  };

  // ── 초기 마운트 ───────────────────────────────────
  mountEl.innerHTML = '<div id="piaget-wrap"></div>';
  render();
})();
