/**
 * 피아제 인지발달이론 — 탭 콘텐츠 (핵심정리 / 기출포인트 / 셀프퀴즈)
 * 원페이지 교육학 5판 기반
 * 사용법: concept.html이 piaget.js 로드 후 자동으로 이 파일도 로드
 */

(function () {

  /* ──────────────────────────────────────────
     헬퍼
  ────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }

  const ACCENT = '#4EA87A';  // 교육심리학 그린
  const BG     = '#E6F2EC';

  /* ──────────────────────────────────────────
     1. 핵심정리 탭 (#tab-summary)
  ────────────────────────────────────────── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">개요</div>
      <div style="background:${BG};border-radius:10px;padding:16px 20px;font-size:13px;line-height:1.8;color:#2C2825;">
        <strong>피아제(J. Piaget, 1896~1980)</strong>는 스위스 아동심리학자로,<br>
        학습자는 기본적으로 인지구조를 가지고 있으며 능동적이다.<br>
        타고난 인지 기능으로 물리적 환경과 상호작용해 지식을 구성한다. → <strong>인지적 구성주의</strong>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">학습과정 (★★★)</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="background:#F0EDE8;border-radius:10px;padding:14px 16px;font-size:13px;line-height:1.8;">
          <span style="color:${ACCENT};font-weight:700;">① 인지적 구성</span><br>
          학습자는 능동적으로 타고난 인지 기능으로 물리적 환경과 상호작용해 지식을 구성함
        </div>
        <div style="background:#F0EDE8;border-radius:10px;padding:14px 16px;font-size:13px;line-height:1.8;">
          <span style="color:${ACCENT};font-weight:700;">② 평형화 과정</span><br>
          기존 도식에 새 지식이 들어올 때 → 같으면 <strong>평형(동화)</strong>, 다르면 <strong>불평형</strong><br>
          불평형 상태 → 평형 욕구 발생 → <strong>동화</strong>(기존 도식에 맞춤) 또는 <strong>조절</strong>(도식 수정) → <strong>인지발달(평형화)</strong>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">교사 역할 & 학습방법 (★★★)</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
        <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:#F0EDE8;border-radius:8px;">
          <span style="background:${ACCENT};color:white;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">1</span>
          <div><strong>발견학습 제공</strong> — 학습자는 능동적이므로 스스로 관찰·탐구할 수 있는 수업 제공. 단순 설명식 수업은 피한다.</div>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:#F0EDE8;border-radius:8px;">
          <span style="background:${ACCENT};color:white;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">2</span>
          <div><strong>인지적 불균형 유발</strong> — 학습자의 인지적 불균형(불평형)을 유도하기 위해 쉽게 해결할 수 없는 도전감 있는 과제 제공. 단, 너무 어려운 과제는 안 됨.</div>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:#F0EDE8;border-radius:8px;">
          <span style="background:${ACCENT};color:white;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">3</span>
          <div><strong>인지발달 수준에 기초한 교육</strong> — 수업 내용 이해에 필요한 인지구조가 없으면 수업은 무의미. 선행학습은 가능한 피해야 함.</div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">4단계 비교표</div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:${BG};">
              <th style="padding:8px 10px;text-align:left;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">단계</th>
              <th style="padding:8px 10px;text-align:center;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">연령</th>
              <th style="padding:8px 10px;text-align:left;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">핵심 성취</th>
              <th style="padding:8px 10px;text-align:left;font-weight:700;color:${ACCENT};border-bottom:2px solid ${ACCENT};">주요 특징</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['감각운동기', '0~2세', '대상영속성 획득', '사고능력 없음, 언어 이전, 순환반응'],
              ['전조작기', '2~7세', '상징적 사고 시작', '자기중심성, 물활론, 보존개념 없음(중심화)'],
              ['구체적조작기', '7~11세', '보존 개념 획득', '탈중심화, 가역성, 보상성, 분류·서열화'],
              ['형식적조작기', '12세~', '가설연역적 사고', '추상적사고, 명제적사고, 조합적사고']
            ].map((r, i) => `
              <tr style="border-bottom:1px solid #e8e4de;${i%2?'background:#faf9f7':''}">
                <td style="padding:8px 10px;font-weight:600;color:#2C2825;">${r[0]}</td>
                <td style="padding:8px 10px;text-align:center;color:#6B6560;">${r[1]}</td>
                <td style="padding:8px 10px;color:${ACCENT};font-weight:600;">${r[2]}</td>
                <td style="padding:8px 10px;color:#6B6560;">${r[3]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">피아제 vs 비고츠키 비교</div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:${BG};">
              <th style="padding:8px 10px;border-bottom:2px solid ${ACCENT};color:${ACCENT};font-weight:700;">구분</th>
              <th style="padding:8px 10px;border-bottom:2px solid ${ACCENT};color:${ACCENT};font-weight:700;text-align:center;">피아제</th>
              <th style="padding:8px 10px;border-bottom:2px solid #6058C0;color:#6058C0;font-weight:700;text-align:center;">비고츠키</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['공통점', '구성주의관, 능동적 학습자, 환경과 상호작용', '↑ 동일'],
              ['지식관', '인지적 구성주의', '사회적 구성주의'],
              ['학습자', '개별적 주체', '사회적 존재'],
              ['발달·학습 관계', '발달이 학습에 선행', '학습이 발달에 선행'],
              ['평가', '현재 발달 평가 (정적평가)', '잠재적 발달 평가 (역동적평가)'],
              ['교사 도움', '도움 불필요 (자기조절)', '도움 중요 (비계설정)'],
            ].map((r, i) => `
              <tr style="border-bottom:1px solid #e8e4de;${i%2?'background:#faf9f7':''}">
                <td style="padding:8px 10px;font-weight:600;color:#2C2825;">${r[0]}</td>
                <td style="padding:8px 10px;color:#6B6560;">${r[1]}</td>
                <td style="padding:8px 10px;color:#6B6560;">${r[2]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    `;
  }

  /* ──────────────────────────────────────────
     2. 기출포인트 탭 (#tab-exam)
  ────────────────────────────────────────── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const points = [
      {
        year: '★★★★ 빈출',
        color: '#A83222', bg: '#FDECEA',
        items: [
          '불평형(disequilibrium) — 오류 상황에 직면할 때 일어남. 너무 쉽거나 어렵지 않아야 함 [2011중]',
          '동화(assimilation) — 고양이를 보고 "강아지!"라고 함 [2006초]',
          '보존 개념 획득 순서: 수(6~7) → 양(7~8) → 무게(9~10) → 부피(11~12)',
          '전조작기 특징: 자기중심성, 상징적 사고, 물활론 [2007초]',
          '구체적조작기 특징: 탈자기중심화, 분류·서열화, 구체적 사물에 제한된 논리 [2007초]',
          '반성적 추상화 — 형식적조작기의 핵심 특징. 구체물 없이 추상 추론 [2010중]',
        ]
      },
      {
        year: '★★★ 출제',
        color: '#8A6010', bg: '#FBF4E0',
        items: [
          '감각운동기 — 사고능력 없음. 대상영속성 획득(8~12개월). 순환반응 1·2·3차 [2010초]',
          '구체적조작기 교수법 — 시청각 자료와 실물 활용, 직접 경험을 통한 학습 [2003중]',
          '형식적조작기 — 가설연역적 추론, 명제적 사고, 반성적 추상화 [2000중, 2010중]',
          '전조작기 아동 분류 오류 — 장미꽃 vs 꽃의 포함관계 이해 못 함 [2005초]',
          '피아제 이론 한계: 사회적 상호작용 경시 (피아제의 평형화는 개인 내적 과정) [2008중]',
        ]
      },
      {
        year: '논술 답안 뼈대',
        color: '#1A3C68', bg: '#E6EFF8',
        items: [
          '학습과정 2가지: ① 인지적 구성주의 ② 동화·조절을 통한 평형화',
          '교사역할 3가지: ① 발견학습 제공 ② 인지적 불균형 유발 ③ 인지발달 수준 고려',
          '피아제 비판(아이즈너): 외적 행동 변화만 강조 → 내면 변화 확인 어려움',
          '비고츠키와 연결: 피아제의 평형화는 개인 내적 — 비고츠키의 비계는 사회적 상호작용',
        ]
      }
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">기출 연도 현황</div>
      <div style="background:${BG};border-radius:10px;padding:14px 16px;font-size:13px;line-height:2;color:#2C2825;">
        <strong style="color:${ACCENT};">★★★★ S급</strong> — 2011중, 2010초, 2010중, 2009초, 2008중, 2007초, 2006초, 2005중, 2005초, 2003중, 2000중<br>
        <span style="font-size:11px;color:#A09890;">거의 매년 출제되는 최상위 빈출 주제. 전 단계 특징 + 핵심개념(동화·조절·평형화) 완벽 암기 필수.</span>
      </div>
    </div>

    ${points.map(p => `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${p.color};">${p.year}</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${p.items.map(item => `
          <div style="background:${p.bg};border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;color:#2C2825;">
            ${item}
          </div>
        `).join('')}
      </div>
    </div>
    `).join('')}

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">자주 틀리는 포인트</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;">
        <div style="background:#FDECEA;border-radius:8px;padding:10px 14px;border-left:3px solid #D05840;">
          <strong style="color:#A83222;">❌ 혼동주의</strong> "순환반응 3차 = 새로운 방법으로 결과 탐색" — 3차는 단순 반복이 아니라 새로운 결과를 적극 탐색함
        </div>
        <div style="background:#FDECEA;border-radius:8px;padding:10px 14px;border-left:3px solid #D05840;">
          <strong style="color:#A83222;">❌ 혼동주의</strong> "반성적 추상화 = 메타인지"라고 혼동하는 경우 — 반성적 추상화는 피아제의 형식적조작기 추상사고 능력
        </div>
        <div style="background:#FDECEA;border-radius:8px;padding:10px 14px;border-left:3px solid #D05840;">
          <strong style="color:#A83222;">❌ 혼동주의</strong> 피아제의 "불평형" vs 비고츠키의 "비계설정" — 불평형은 개인 내적, 비계설정은 사회적 상호작용 [2008중 보기①번이 오답인 이유]
        </div>
        <div style="background:#EBF5EA;border-radius:8px;padding:10px 14px;border-left:3px solid #4EA87A;">
          <strong style="color:#1E5A3C;">✅ 핵심암기</strong> 보존개념 순서: <strong>수·양·무게·부피</strong> (수양무부로 외우기)
        </div>
      </div>
    </div>
    `;
  }

  /* ──────────────────────────────────────────
     3. 셀프퀴즈 탭 (#tab-quiz)
  ────────────────────────────────────────── */

  const QUIZ_DATA = [
    // OX 퀴즈
    {
      type: 'ox',
      q: '피아제에 따르면, 교사가 학습자보다 앞선 수준의 내용을 먼저 가르치는 선행학습은 인지발달에 도움이 된다.',
      answer: 'X',
      explain: '피아제는 학습자의 인지발달 수준에 기초한 교육을 강조. 인지구조가 준비되지 않은 상태에서의 수업은 무의미하므로 선행학습은 가능한 피해야 함.'
    },
    {
      type: 'ox',
      q: '고양이를 처음 본 아이가 "강아지!"라고 외치는 것은 조절(Accommodation)의 예이다.',
      answer: 'X',
      explain: '기존 "강아지" 도식에 고양이를 끼워 맞추는 것이므로 동화(Assimilation)의 예. 조절은 도식 자체가 수정될 때 일어남.'
    },
    {
      type: 'ox',
      q: '구체적조작기 아동은 "장미꽃 8송이와 국화꽃 5송이 중 어느 게 더 많아?" 질문에는 답하지만, "장미꽃과 꽃 중 어느 게 더 많아?"에는 틀릴 수 있다.',
      answer: 'O',
      explain: '포함관계(부분-전체)에 대한 논리적 사고는 전조작기에서 어렵고, 구체적조작기로 가면서 획득됨. 이 예시는 전조작기 아동의 특징이기도 함.'
    },
    {
      type: 'ox',
      q: '피아제의 "불평형(disequilibrium)"은 사회적 상호작용을 통해 해소된다.',
      answer: 'X',
      explain: '피아제의 불평형은 개인 내적 과정(동화·조절)을 통해 해소됨. 사회적 상호작용을 강조한 것은 비고츠키. 기출에서 자주 혼동하는 포인트!'
    },
    {
      type: 'ox',
      q: '형식적조작기는 모든 청소년이 반드시 도달하는 단계이다.',
      answer: 'X',
      explain: '형식적조작기는 교육·문화적 환경에 따라 달라지며, 모든 사람이 완전히 도달하지는 않음. 이 점이 기출 함정 포인트.'
    },
    // 빈칸 채우기
    {
      type: 'fill',
      q: '피아제에 따르면, 보존 개념의 획득 순서는 (   ) → (   ) → (   ) → (   ) 이다.',
      answer: '수 → 양 → 무게 → 부피',
      explain: '수(6~7세) → 양(7~8세) → 무게(9~10세) → 부피(11~12세). "수양무부"로 암기!'
    },
    {
      type: 'fill',
      q: '피아제의 인지발달 단계 중, 전조작기에서 구체적조작기로 넘어갈 때 극복되는 핵심 특징은 (   )이다.',
      answer: '자기중심성 (탈중심화)',
      explain: '세 산 과제(Three Mountains Task)로 측정되는 자기중심성이 극복되면서 탈중심화가 이루어짐. 전조작기 vs 구체적조작기 비교 빈출!'
    },
    {
      type: 'fill',
      q: '피아제의 4가지 핵심개념 중, 기존 도식으로 설명이 안 될 때 도식 자체를 수정·확장하는 것을 (   )이라고 한다.',
      answer: '조절 (Accommodation)',
      explain: '동화(기존 도식에 맞춤)와 달리 조절은 도식 자체가 변함. 2005년 중등 기출에서 카메라 예시로 동화·조절 구분 출제됨.'
    },
    // 객관식
    {
      type: 'mc',
      q: '다음 중 구체적조작기의 특징이 아닌 것은?',
      options: ['보존 개념 획득', '가역성 이해', '탈중심화', '가설연역적 추론', '분류·서열화 가능'],
      answer: 3,
      explain: '가설연역적 추론은 형식적조작기의 핵심 특징. 구체적조작기는 구체적 사물에 한해 논리적 사고가 가능하며, 추상적·가설적 사고는 형식적조작기에 가능.'
    },
    {
      type: 'mc',
      q: '피아제 이론에서 "불평형 상태가 인지적 성장을 고무하기에 알맞은 정도로 유지되어야 한다"는 것이 의미하는 교수원리로 가장 적합한 것은? [2011중 변형]',
      options: [
        '비계설정을 통해 학습자를 지원한다',
        '도전감 있되 너무 어렵지 않은 과제를 제공한다',
        '사회적 상호작용을 촉진하는 협동학습을 실시한다',
        '학습자의 현재 발달을 정적평가로 확인한다'
      ],
      answer: 1,
      explain: '인지적 불균형을 유발하되 너무 쉬워 지루해서도, 너무 어려워 이해 불가능해서도 안 됨. 이것이 피아제가 강조한 교사의 과제 제공 원리.'
    },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;

    let state = QUIZ_DATA.map(() => ({ revealed: false, selected: null }));

    function renderAll() {
      el.innerHTML = `
      <div class="detail-section">
        <div class="detail-section-title" style="--subject-accent:${ACCENT};">셀프 퀴즈 — 총 ${QUIZ_DATA.length}문항</div>
        <div style="font-size:12px;color:#A09890;margin-bottom:16px;">답을 생각한 후 버튼을 눌러 확인하세요.</div>

        ${QUIZ_DATA.map((q, i) => {
          const s = state[i];
          let qBody = '';

          if (q.type === 'ox') {
            qBody = `
              <div style="display:flex;gap:8px;margin-top:10px;">
                <button onclick="piagetQuizOX(${i},'O')" style="flex:1;padding:9px;border-radius:8px;border:1.5px solid ${s.selected==='O'?(s.revealed?(q.answer==='O'?'#4EA87A':'#D05840'):'#4EA87A'):'#e0ddd8'};background:${s.selected==='O'?(s.revealed?(q.answer==='O'?'#EBF5EA':'#FDECEA'):'#f7f4f0'):'#fff'};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">O</button>
                <button onclick="piagetQuizOX(${i},'X')" style="flex:1;padding:9px;border-radius:8px;border:1.5px solid ${s.selected==='X'?(s.revealed?(q.answer==='X'?'#4EA87A':'#D05840'):'#C4688E'):'#e0ddd8'};background:${s.selected==='X'?(s.revealed?(q.answer==='X'?'#EBF5EA':'#FDECEA'):'#f7f4f0'):'#fff'};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">X</button>
              </div>`;
          } else if (q.type === 'fill') {
            qBody = `
              <div style="margin-top:10px;">
                <button onclick="piagetQuizReveal(${i})" style="width:100%;padding:9px;border-radius:8px;border:1.5px solid ${s.revealed?ACCENT:'#e0ddd8'};background:${s.revealed?BG:'#fff'};font-size:12px;font-weight:600;cursor:pointer;color:${s.revealed?ACCENT:'#6B6560'};font-family:inherit;">${s.revealed?'정답 확인됨 ✓':'정답 보기'}</button>
              </div>`;
          } else if (q.type === 'mc') {
            qBody = `
              <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
                ${q.options.map((opt, oi) => {
                  let border = '1.5px solid #e0ddd8';
                  let bg = '#fff';
                  let color = '#2C2825';
                  if (s.revealed) {
                    if (oi === q.answer) { border=`1.5px solid ${ACCENT}`; bg='#EBF5EA'; color=ACCENT; }
                    else if (s.selected === oi) { border='1.5px solid #D05840'; bg='#FDECEA'; color='#A83222'; }
                  } else if (s.selected === oi) {
                    border=`1.5px solid ${ACCENT}`; bg='#f7f4f0';
                  }
                  return `<button onclick="piagetQuizMC(${i},${oi})" style="text-align:left;padding:9px 12px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:12px;cursor:pointer;font-family:inherit;line-height:1.5;">
                    <span style="font-weight:700;margin-right:6px;">${oi+1}.</span>${opt}
                  </button>`;
                }).join('')}
              </div>`;
          }

          const explainBlock = s.revealed ? `
            <div style="margin-top:10px;background:${BG};border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;color:#2C2825;border-left:3px solid ${ACCENT};">
              <strong style="color:${ACCENT};">해설</strong> ${q.explain}
            </div>` : '';

          return `
          <div style="background:#fff;border:1px solid #e8e4de;border-radius:12px;padding:16px 18px;margin-bottom:12px;">
            <div style="font-size:11px;font-weight:700;color:#A09890;margin-bottom:6px;letter-spacing:.04em;">
              ${q.type==='ox'?'O / X 문제':q.type==='fill'?'빈칸 채우기':'객관식'}
            </div>
            <div style="font-size:13px;font-weight:600;color:#2C2825;line-height:1.6;">${i+1}. ${q.q}</div>
            ${qBody}
            ${explainBlock}
          </div>`;
        }).join('')}

        <div style="text-align:center;margin-top:8px;">
          <button onclick="piagetQuizReset()" style="padding:10px 28px;border-radius:20px;border:1.5px solid #e0ddd8;background:#F0EDE8;font-size:13px;cursor:pointer;color:#6B6560;font-family:inherit;">전체 초기화</button>
        </div>
      </div>`;
    }

    window.piagetQuizOX = function(i, ans) {
      state[i].selected = ans;
      state[i].revealed = true;
      renderAll();
    };
    window.piagetQuizReveal = function(i) {
      state[i].revealed = true;
      renderAll();
    };
    window.piagetQuizMC = function(i, oi) {
      state[i].selected = oi;
      state[i].revealed = true;
      renderAll();
    };
    window.piagetQuizReset = function() {
      state = QUIZ_DATA.map(() => ({ revealed: false, selected: null }));
      renderAll();
    };

    renderAll();
  }

  /* ──────────────────────────────────────────
     초기화 — piaget.js 렌더 이후 실행
  ────────────────────────────────────────── */
  function init() {
    // piaget.js의 렌더가 끝난 후 각 탭 내용을 채움
    // (piaget.js가 #tab-summary를 통째로 교체하지 않고 내부에 placholder가 있으므로)
    renderSummary();
    renderExam();
    renderQuiz();
  }

  // DOM이 준비되어 있으면 바로, 아니면 이벤트 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // concept.html의 renderConcept()가 innerHTML을 다시 그리므로
    // MutationObserver로 탭 컨테이너가 생긴 뒤 실행
    const observer = new MutationObserver(() => {
      if ($('tab-summary') && $('tab-exam') && $('tab-quiz')) {
        observer.disconnect();
        init();
      }
    });
    observer.observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
    // 이미 렌더됐을 경우 즉시 시도
    if ($('tab-summary')) init();
  }

})();
