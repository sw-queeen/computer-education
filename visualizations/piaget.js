/**
 * 피아제 인지발달이론 시각화
 * 사용법: concept.html?subject=교육심리학&concept=피아제+인지발달+4단계
 * 또는 독립 실행: <div id="viz-root"></div> 후 이 파일 로드
 *
 * 단계마다 고유 색을 갖는 시각화라, #piaget-wrap에 --viz-accent 하나만
 * 매 단계 전환마다 다시 심어준다 — 배경/보더/뱃지 색은 전부 이 한 값에서
 * color-mix()로 유도되므로(예전처럼 --s-bg/--s-accent/--s-border 3개를
 * 따로 계산해서 넘기지 않는다), 그리고 하위 .viz-* 공용 컴포넌트도 상속으로
 * 자동으로 같은 톤을 받는다. 타임라인·배지·아이콘 시각화처럼 이 페이지에만
 * 있는 레이아웃만 로컬 클래스로 유지한다.
 */

(function () {
  // ── 원페이지(1) 기준 데이터 ───────────────────────
  const STAGES = [
    {
      num: "1", name: "감각운동기", age: "~2세", keyword: "감각·운동으로 세계 이해",
      accent: "#C87840",
      desc: "감각 및 운동을 통해 세계를 이해하는 단계. 사고능력은 없다.",
      chars: [
        "대상영속성 개념 발달",
        "사고능력 없음"
      ],
      key: "대상영속성",
      viz_type: "arrow",
      viz: [{ icon: "👁️", label: "감각" }, { icon: "🤲", label: "운동" }, { icon: "🧠", label: "도식 형성" }],
      concepts: {
        "대상영속성 개념 발달":
          "대상이 더 이상 보이지 않고 감지할 수 없어도 그 대상이 계속해서 존재한다는 개념.",
        "사고능력 없음":
          "이 단계는 감각과 운동으로만 세계를 이해하며 아직 사고(인지적 조작) 능력은 없다."
      },
      exam: [
        "감각 및 운동을 통해 세계를 이해하는 단계 — 정의 그대로 암기",
        "사고능력이 없다는 것이 핵심 특징",
        "대상영속성: 눈앞에서 사라진 사물이 계속 존재한다는 것을 아는 것"
      ]
    },
    {
      num: "2", name: "전조작기", age: "2~7세", keyword: "정신적 능력 발달·상징·자기중심",
      accent: "#C4688E",
      desc: "생각으로 사물을 다룰 수 있는 정신적 능력이 발달하는 단계.",
      chars: [
        "상징적 사고",
        "물활론적 사고",
        "자기중심적 사고",
        "전개념의 발달"
      ],
      key: "자기중심적 사고",
      viz_type: "bars",
      viz: [
        { label: "상징적 사고", w: "85%" },
        { label: "자기중심성", w: "90%" },
        { label: "논리적 조작", w: "10%" },
        { label: "보존 개념", w: "8%" }
      ],
      concepts: {
        "상징적 사고":
          "부모나 TV 속 인물을 모방하거나 자신이 다른 사람인 것처럼 행동한다. 소꿉장난, 병원놀이.",
        "물활론적 사고":
          "모든 사물이 생명력을 가지고 있다는 생각을 한다.",
        "자기중심적 사고":
          "다른 사람의 관점을 고려하지 못하고 자기중심적으로 생각한다.",
        "전개념의 발달":
          "언어가 급속도로 발달하지만 어른 수준까지는 아니다."
      },
      exam: [
        "전조작기 4가지 특징 암기: 상징적 사고 / 물활론적 사고 / 자기중심적 사고 / 전개념 발달",
        "자기중심적 사고 ↔ 탈중심화(구체적조작기) 대비 빈출 [07초]",
        "물활론: 모든 사물에 생명력이 있다고 생각"
      ]
    },
    {
      num: "3", name: "구체적조작기", age: "7~11세", keyword: "경험할 수 있는 것만 논리적 사고",
      accent: "#4EA87A",
      desc: "경험할 수 있는 것만 논리적으로 사고하는 단계.",
      chars: [
        "보존개념 발달",
        "탈중심화",
        "가역성",
        "분류(서열)능력",
        "보상성(상보성)"
      ],
      key: "보존개념 발달",
      viz_type: "arrow",
      viz: [{ icon: "🧱", label: "구체물" }, { icon: "⚖️", label: "보존" }, { icon: "📊", label: "분류·서열" }],
      concepts: {
        "보존개념 발달":
          "물체가 위치나 모양이 달라도 그 본질은 변함이 없다는 것을 아는 것.",
        "탈중심화":
          "사물이나 현상의 여러 측면을 고려할 줄 아는 능력.",
        "가역성":
          "처음 상태로 돌이켜 생각할 수 있는 능력.",
        "분류(서열)능력":
          "여러 기준을 사용하여 사물을 분류하는 능력.",
        "보상성(상보성)":
          "한 차원이 변해도 다른 차원에 의해 보상되어 서로 상쇄된다는 것을 아는 능력. 고무를 늘렸을 때 두께가 얇아져도 길이로 보상되어 물체가 동일하다는 것을 안다."
      },
      exam: [
        "구체적조작기 5가지 특징 암기: 보존개념 / 탈중심화 / 가역성 / 분류(서열)능력 / 보상성",
        "전조작기 vs 구체적조작기 비교 빈출 — 자기중심적 사고↔탈중심화",
        "'경험할 수 있는 것만' 논리적 사고 — 추상적 사고는 아직 불가"
      ]
    },
    {
      num: "4", name: "형식적조작기", age: "12세~", keyword: "가설적·추상적 개념을 논리적 사고",
      accent: "#6058C0",
      desc: "가설적이고 추상적인 개념을 논리적으로 사고하는 단계.",
      chars: [
        "추상적 사고(반성적 추상화)",
        "자기중심적 사고 (by Elkind)",
        "명제적 사고",
        "가설연역적 사고",
        "조합적 사고"
      ],
      key: "가설연역적 사고",
      viz_type: "arrow",
      viz: [{ icon: "❓", label: "가설 설정" }, { icon: "🔬", label: "체계적 검증" }, { icon: "💡", label: "결론 도출" }],
      concepts: {
        "추상적 사고(반성적 추상화)":
          "구체적인 경험 없이도 추상적인 개념을 이해할 수 있는 능력.\n예) 1/3은 5/15와 같다 / '하루라도 책을 읽지 않으면 입안에 가시가 돋는다'는 비유적 표현 이해",
        "자기중심적 사고 (by Elkind)":
          "모든 사람이 자신의 사고·감정·행동에 관심이 있다고 생각.\n① 상상적 청중 — 모두가 나를 쳐다본다고 생각\n② 개인우화 — 나는 특별하고 남과 다르다고 생각 (백만장자가 될 것 등)\n③ 불멸의 환상 — 나는 죽지 않는다고 생각",
        "명제적 사고":
          "명제를 바탕으로 가설을 설정하고 논리적으로 추론하는 능력.\n예) 'A는 B보다 크고, B는 C보다 크다면 A는 C보다 크다' — 실물 없이 명제만으로 추론",
        "가설연역적 사고":
          "가설적 상황을 설정하고 검증하여 연역적 추론을 하는 능력.\n예) '모든 사람의 키가 같다면 어떻게 될까?'처럼 현실에 없는 상황도 논리적으로 전개",
        "조합적 사고":
          "문제 해결 가능한 방법을 체계적으로 모두 탐색하는 능력.\n예) 빨강·파랑·노랑으로 만들 수 있는 모든 색 조합 — 구체적조작기 아동은 무작위로 섞지만, 형식적조작기 아동은 한 번씩 체계적으로 실험"
      },
      exam: [
        "형식적조작기 5가지 특징 순서 암기: 추상적·자기중심적·명제적·가설연역적·조합적 사고",
        "엘킨드(Elkind) 자기중심적 사고 3종: 상상적 청중 / 개인우화 / 불멸의 환상",
        "추상적 사고 = 반성적 추상화 — 구체적 경험 없이 추상 개념 이해 [10중]",
        "가설연역적 사고 = 가설 설정 후 검증해 연역적 추론 [00중]"
      ]
    }
  ];

  // ── 원페이지(1) 기준 핵심개념 ─────────────────────
  const CORE = [
    {
      name: "도식 (Schema)", accent: "#C87840",
      desc: "세상을 이해하는 인지적 틀. 경험이 쌓이면서 점점 정교해지고 세분화됨.",
      ex: "예: 처음엔 '네 발 달린 동물 = 강아지' → 경험 후 강아지·고양이·소로 분화"
    },
    {
      name: "동화 (Assimilation)", accent: "#4EA87A",
      desc: "새로운 경험을 기존 도식에 끼워 맞추는 과정. 도식 자체는 변하지 않음.",
      ex: "예: 고양이를 처음 보고 기존 '강아지' 도식에 넣어 '강아지!'라고 함"
    },
    {
      name: "조절 (Accommodation)", accent: "#6058C0",
      desc: "기존 도식으로 설명이 안 될 때 도식 자체를 수정·확장하는 과정.",
      ex: "예: 고양이가 강아지와 다르다는 걸 알고 '고양이' 도식을 새로 형성"
    },
    {
      name: "평형화 (Equilibration)", accent: "#C4688E",
      desc: "불평형 상태 → 평형 욕구 → 동화 또는 조절 → 새로운 평형(인지발달). 인지 성장의 원동력.",
      ex: "예: 길쭉한 컵이 납작한 컵보다 물이 많다고 생각(불평형) → 가역성 획득으로 같음을 이해(평형)"
    }
  ];

  let cur = 0;
  let activeConcept = null;

  // ── 마운트 대상 탐색 ──────────────────────────────
  const mountEl = document.getElementById('viz-container') || document.getElementById('viz-root');
  if (!mountEl) return;

  // ── 스타일 주입 (한 번만) ─────────────────────────
  if (!document.getElementById('piaget-style')) {
    const style = document.createElement('style');
    style.id = 'piaget-style';
    style.textContent = `
      #piaget-wrap{max-width:100%;box-sizing:border-box;color:var(--text-primary);}
      #piaget-wrap *{box-sizing:border-box;}

      /* 단계 타임라인 — 이 시각화 고유 레이아웃, 유리 패널로 감싼다 */
      #piaget-wrap .p-timeline{
        display:flex; border-radius:12px; overflow:hidden; margin-bottom:20px;
        background:var(--bg-surface); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        box-shadow:var(--shadow-inset-sm);
      }
      #piaget-wrap .p-tl{flex:1;padding:10px 6px 8px;cursor:pointer;text-align:center;transition:background .15s;min-width:0;}
      #piaget-wrap .p-tl.on{background:color-mix(in srgb, var(--viz-accent) 22%, transparent);}
      #piaget-wrap .p-tl-num{font-size:11px;font-weight:700;margin-bottom:2px;color:var(--viz-accent);}
      #piaget-wrap .p-tl-name{font-size:11px;font-weight:600;color:var(--text-primary);margin-bottom:1px;}
      #piaget-wrap .p-tl-age{font-size:10px;color:var(--text-tertiary);}
      #piaget-wrap .p-tl-bar{height:3px;border-radius:2px;opacity:0;margin-top:7px;background:var(--viz-accent);transition:opacity .15s;}
      #piaget-wrap .p-tl.on .p-tl-bar{opacity:1;}

      #piaget-wrap .p-header{display:flex;align-items:flex-start;gap:16px;margin-bottom:18px;}
      #piaget-wrap .p-badge{
        width:48px;height:48px;border-radius:12px;flex-shrink:0;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        background:color-mix(in srgb, var(--viz-accent) 16%, var(--bg-surface));
      }
      #piaget-wrap .p-badge-num{font-size:18px;font-weight:700;color:var(--viz-accent);}
      #piaget-wrap .p-badge-lbl{font-size:8px;font-weight:700;color:var(--viz-accent);letter-spacing:.04em;}
      #piaget-wrap .p-title{font-family:var(--font-heading,var(--font-main));font-size:22px;font-weight:700;color:var(--text-primary);margin-bottom:2px;}
      #piaget-wrap .p-age{font-size:12px;color:var(--text-tertiary);font-weight:500;}
      #piaget-wrap .p-kw{margin-top:4px;}

      #piaget-wrap .p-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
      #piaget-wrap .p-ilabel{font-size:10px;font-weight:700;color:var(--text-tertiary);letter-spacing:.05em;margin-bottom:6px;}
      #piaget-wrap .p-ibody{font-size:13px;color:var(--text-primary);line-height:1.65;}

      #piaget-wrap .p-viz{
        border-radius:10px;padding:14px 16px;margin-bottom:14px;min-height:72px;
        display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0;
      }
      #piaget-wrap .p-viz-item{text-align:center;padding:8px 12px;}
      #piaget-wrap .p-viz-circle{width:44px;height:44px;border-radius:50%;background:var(--viz-accent);display:flex;align-items:center;justify-content:center;margin:0 auto 6px;font-size:18px;}
      #piaget-wrap .p-viz-lbl{font-size:11px;font-weight:600;color:var(--viz-accent);}
      #piaget-wrap .p-viz-arrow{font-size:18px;color:var(--viz-accent);opacity:.5;align-self:center;padding:0 4px;}
      #piaget-wrap .p-bar{height:24px;border-radius:6px;background:var(--viz-accent);display:flex;align-items:center;padding:0 10px;font-size:11px;font-weight:600;color:#fff;margin-bottom:3px;}

      #piaget-wrap .p-exam-title{font-size:11px;font-weight:700;color:var(--viz-accent);letter-spacing:.05em;margin-bottom:6px;}
      #piaget-wrap .p-exam-body{font-size:12px;color:var(--text-secondary);line-height:1.75;}

      #piaget-wrap .p-ctabs{display:flex;gap:4px;margin-bottom:10px;flex-wrap:wrap;}
      #piaget-wrap .p-ctab{
        padding:5px 12px;border-radius:20px;border:none;
        background:var(--bg-white); backdrop-filter:var(--glass-blur); -webkit-backdrop-filter:var(--glass-blur);
        box-shadow:var(--shadow-extruded-sm);
        font-size:12px;font-weight:500;cursor:pointer;color:var(--text-secondary);
        transition:box-shadow .15s ease-out, color .12s; font-family:inherit;
      }
      #piaget-wrap .p-ctab:hover{box-shadow:var(--shadow-extruded-hover);color:var(--text-primary);}
      #piaget-wrap .p-ctab.on{
        background:color-mix(in srgb, var(--viz-accent) 18%, var(--bg-white));
        color:var(--viz-accent); box-shadow:var(--shadow-inset-sm); font-weight:700;
      }
      #piaget-wrap .p-ccontent{min-height:72px;}

      #piaget-wrap .p-core-title{font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:.05em;margin-bottom:14px;}
      #piaget-wrap .p-core-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;}
      #piaget-wrap .p-ccard{border-radius:10px;padding:12px;}
      #piaget-wrap .p-ccard-name{font-size:12px;font-weight:700;margin-bottom:5px;}
      #piaget-wrap .p-ccard-desc{font-size:11px;line-height:1.6;color:var(--text-secondary);}
      #piaget-wrap .p-ccard-ex{font-size:10px;margin-top:5px;color:var(--text-tertiary);line-height:1.5;}

      @media(max-width:600px){
        #piaget-wrap .p-grid2{grid-template-columns:1fr;}
        #piaget-wrap .p-core-grid{grid-template-columns:1fr 1fr;}
        #piaget-wrap .p-tl-name{font-size:10px;}
        #piaget-wrap .p-tl-age{display:none;}
        #piaget-wrap .p-viz{flex-wrap:wrap;}
      }
      @media(max-width:400px){
        #piaget-wrap .p-core-grid{grid-template-columns:1fr;}
      }
    `;
    document.head.appendChild(style);
  }

  // ── 렌더 함수 ─────────────────────────────────────
  function setVars(s) {
    const w = document.getElementById('piaget-wrap');
    if (!w) return;
    w.style.setProperty('--viz-accent', s.accent);
  }

  function renderViz(s) {
    if (s.viz_type === 'arrow') {
      return s.viz.map((v, i) => {
        const arrow = i < s.viz.length - 1 ? `<span class="p-viz-arrow">→</span>` : '';
        return `<div class="p-viz-item"><div class="p-viz-circle">${v.icon}</div><div class="p-viz-lbl">${v.label}</div></div>${arrow}`;
      }).join('');
    }
    // bars 타입: 라벨을 바 왼쪽에, 바는 오른쪽에 배치
    return `<div style="width:100%;display:flex;flex-direction:column;gap:7px;">` +
      s.viz.map(v => `
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:90px;font-size:11px;font-weight:600;color:var(--viz-accent);text-align:right;flex-shrink:0;line-height:1.3;">${v.label}</div>
          <div style="flex:1;background:var(--border-light);border-radius:20px;height:14px;overflow:hidden;">
            <div style="width:${v.w};height:100%;background:var(--viz-accent);border-radius:20px;opacity:0.75;"></div>
          </div>
        </div>`
      ).join('') + `</div>`;
  }

  function renderConcepts(s) {
    const keys = Object.keys(s.concepts);
    if (!activeConcept || !s.concepts[activeConcept]) activeConcept = keys[0];
    const tabs = keys.map(k =>
      `<button class="p-ctab ${k === activeConcept ? 'on' : ''}" onclick="piagetSwitchConcept('${k}')">${k}</button>`
    ).join('');
    const raw = s.concepts[activeConcept];
    const parts = raw.split('\n');
    const mainDesc = parts[0];
    const examples = parts.slice(1).filter(p => p.trim());
    const exHtml = examples.length
      ? `<div style="margin-top:8px;font-size:11px;color:var(--text-secondary);line-height:1.7;padding-left:4px;">
          ${examples.map(e => `<div>${e}</div>`).join('')}
        </div>` : '';
    return `<div class="p-ctabs">${tabs}</div>
      <div class="viz-well p-ccontent">
        <div style="line-height:1.75;">${mainDesc}</div>${exHtml}
      </div>`;
  }

  function render() {
    const s = STAGES[cur];

    const timeline = STAGES.map((st, i) =>
      `<div class="p-tl ${i === cur ? 'on' : ''}" style="--viz-accent:${st.accent};" onclick="piagetJump(${i})">
        <div class="p-tl-num">단계 ${st.num}</div>
        <div class="p-tl-name">${st.name}</div>
        <div class="p-tl-age">${st.age}</div>
        <div class="p-tl-bar"></div>
      </div>`
    ).join('');

    const charList = s.chars.map(c => `<li style="margin-bottom:3px;">${c}</li>`).join('');
    // 기출 연도 [xxxx] 태그를 문장 앞으로 이동
    function fmtExam(text) {
      const m = text.match(/\[([^\]]+)\]/);
      if (!m) return text;
      const tag = m[1];
      const body = text.replace(/\s*\[[^\]]+\]/, '').trim();
      return `<span class="viz-badge">${tag}</span>${body}`;
    }
    const examList = s.exam.map(e => `<li style="margin-bottom:5px;">${fmtExam(e)}</li>`).join('');

    const coreCards = CORE.map(c =>
      `<div class="viz-card tinted p-ccard" style="--viz-accent:${c.accent};">
        <div class="p-ccard-name" style="color:${c.accent};">${c.name}</div>
        <div class="p-ccard-desc">${c.desc}</div>
        <div class="p-ccard-ex">${c.ex}</div>
      </div>`
    ).join('');

    const dots = STAGES.map((_, i) => `<div class="viz-dot ${i === cur ? 'on' : ''}" style="--viz-accent:${STAGES[i].accent};"></div>`).join('');

    document.getElementById('piaget-wrap').innerHTML = `
      <div style="padding:1rem 0 2rem;">

        <div class="viz-well" style="margin-bottom:16px;padding:18px 20px;">
          <div class="p-core-title">핵심 개념 — 도식 · 동화 · 조절 · 평형화</div>
          <div class="p-core-grid">${coreCards}</div>
        </div>

        <div class="p-timeline">${timeline}</div>

        <div class="viz-card" style="padding:20px;margin-bottom:14px;">
          <div class="p-header">
            <div class="p-badge">
              <div class="p-badge-num">${s.num}</div>
              <div class="p-badge-lbl">단계</div>
            </div>
            <div>
              <div class="p-title">${s.name}</div>
              <div class="p-age">${s.age}</div>
              <div class="viz-badge p-kw">${s.keyword}</div>
            </div>
          </div>

          <div class="p-grid2">
            <div class="viz-well">
              <div class="p-ilabel">이 시기의 특징</div>
              <div class="p-ibody"><ul style="padding-left:16px;">${charList}</ul></div>
            </div>
            <div class="viz-well">
              <div class="p-ilabel">핵심 성취</div>
              <div style="font-size:14px;font-weight:700;color:var(--viz-accent);margin-bottom:6px;">${s.key}</div>
              <div class="p-ibody">${s.desc}</div>
            </div>
          </div>

          <div class="viz-well accent p-viz">${renderViz(s)}</div>

          <div class="viz-well" style="margin-bottom:14px;">
            <div class="p-ilabel">세부 개념 살펴보기</div>
            <div style="margin-top:8px;">${renderConcepts(s)}</div>
          </div>

          <div class="viz-well accent">
            <div class="p-exam-title">기출 포인트</div>
            <div class="p-exam-body"><ul style="padding-left:16px;">${examList}</ul></div>
          </div>
        </div>

        <div class="p-nav" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <button class="viz-nav-btn ${cur > 0 ? 'prim' : ''}" onclick="piagetGo(-1)" ${cur === 0 ? 'disabled' : ''}>← 이전 단계</button>
          <div class="p-dots" style="display:flex;gap:6px;">${dots}</div>
          <button class="viz-nav-btn ${cur < STAGES.length - 1 ? 'prim' : ''}" onclick="piagetGo(1)" ${cur === STAGES.length - 1 ? 'disabled' : ''}>다음 단계 →</button>
        </div>

      </div>`;

    setVars(s);
  }

  // ── 전역 이벤트 핸들러 ────────────────────────────
  window.piagetGo = function (d) {
    cur = Math.max(0, Math.min(STAGES.length - 1, cur + d));
    activeConcept = null;
    render();
    setTimeout(() => {
      const tl = document.querySelector('#piaget-wrap .p-timeline');
      if (tl) tl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };
  window.piagetJump = function (i) {
    cur = i;
    activeConcept = null;
    render();
    setTimeout(() => {
      const tl = document.querySelector('#piaget-wrap .p-timeline');
      if (tl) tl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };
  window.piagetSwitchConcept = function (k) {
    activeConcept = k;
    render();
  };

  // ── 초기 마운트 ───────────────────────────────────
  mountEl.innerHTML = '<div id="piaget-wrap"></div>';
  render();
})();
