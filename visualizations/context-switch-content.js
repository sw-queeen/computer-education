/**
 * 운영체제 — 문맥교환 (Context Switch) 탭 콘텐츠
 * SITE_CONFIG + CS(ui.js) 참조 — 리팩토링 버전
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
  };

  const CSS_ACCENT = '#D05840';

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title">${C.summary.intro}</div>
      <div class="cs-intro-box">
        <strong>문맥교환(Context Switch)</strong>은 CPU가 실행 중인 프로세스를 교체할 때,
        <strong>현재 프로세스의 상태(문맥)를 저장</strong>하고
        <strong>새 프로세스의 상태를 복원</strong>하는 커널의 작업 전체를 말한다.<br><br>
        운영체제가 멀티태스킹을 구현하는 핵심 메커니즘이며,
        문맥교환이 발생하는 동안 CPU는 유용한 작업을 수행하지 못하므로
        <strong style="color:${CSS_ACCENT};">순수 오버헤드(Dispatcher Latency)</strong>로 간주된다.
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">발생 조건 (트리거)</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[
          ['타이머 인터럽트', '선점형(Preemptive) 스케줄러가 타임 슬라이스 만료를 감지하면 강제로 CPU를 회수한다.'],
          ['I/O 요청 또는 이벤트 대기', '실행 중인 프로세스가 I/O 작업을 요청하면 Waiting 상태로 전환되고, 다른 프로세스가 CPU를 점유한다.'],
          ['시스템 콜 (System Call)', '프로세스가 커널에 서비스를 요청할 때 일부 시스템 콜은 문맥교환을 유발한다.'],
          ['고우선순위 프로세스 도착', '선점형 스케줄러에서 Ready 큐에 더 높은 우선순위 프로세스가 들어오면 현재 프로세스를 선점한다.'],
        ].map(([title, desc], i) => `
          <div class="cs-num-row">
            <span class="cs-num cs-num-md cs-num-prim">${i+1}</span>
            <div><strong>${title}</strong> — ${desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">문맥교환 절차 (6단계)</div>
      <div style="display:flex;flex-direction:column;gap:0;">
        ${[
          ['인터럽트 / 시스템 콜 발생',   '문맥교환의 트리거. P1 실행이 일시 중단된다.',                           false],
          ['P1 문맥 저장 → PCB₁',         'PC·레지스터·SP·플래그 등 CPU 상태 전체를 P1의 PCB에 기록한다.',         true ],
          ['P1 상태 전환 → Ready / Waiting', '원인에 따라 Ready 큐 또는 Waiting 큐로 이동한다.',                   false],
          ['스케줄러가 P2 선택',           'CPU 스케줄러가 Ready 큐에서 다음 실행할 프로세스 P2를 결정한다.',       false],
          ['P2 문맥 복원 ← PCB₂',         'P2의 PCB에 저장된 상태를 레지스터에 적재한다.',                         true ],
          ['P2 실행 재개',                 '디스패처가 커널 모드 → 사용자 모드로 전환하고 P2를 실행한다.',          false],
        ].map(([title, desc, accent], i, arr) => `
          <div style="display:flex;align-items:stretch;gap:0;">
            <div style="display:flex;flex-direction:column;align-items:center;margin-right:10px;">
              <span class="cs-num cs-num-md ${accent ? 'cs-num-prim' : ''}" style="${!accent ? `background:var(--bg-surface);color:${CSS_ACCENT};` : ''}">${i+1}</span>
              ${i < arr.length-1 ? `<div style="width:2px;flex:1;background:var(--border-light);margin:3px 0;"></div>` : ''}
            </div>
            <div style="flex:1;padding-bottom:${i < arr.length-1 ? '8px' : '0'};">
              <div style="font-size:13px;font-weight:700;color:${accent ? CSS_ACCENT : 'var(--text-primary)'};margin-bottom:2px;">${title}</div>
              <div style="font-size:12px;color:var(--text-secondary);line-height:1.65;">${desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">프로세스 상태 전이 (5가지 상태)</div>
      <div class="cs-table-wrap">
        <table class="cs-table">
          <thead>
            <tr><th>상태</th><th>설명</th><th>문맥교환과의 관계</th></tr>
          </thead>
          <tbody>
            ${[
              ['New',        '생성 중',                         '문맥 없음 (PCB 초기화 중)'],
              ['Ready',      'CPU 할당 대기 중',                 '문맥교환 후 이 상태로 전환되거나, 이 상태에서 선택됨'],
              ['Running',    'CPU 점유 중 (실행 중)',            '문맥교환의 출발점(현재) 또는 도착점(다음 프로세스)'],
              ['Waiting',    'I/O 또는 이벤트 대기 중 (Blocked)', 'I/O 요청 시 Running → Waiting 전환 (문맥 저장 발생)'],
              ['Terminated', '실행 완료·종료',                   'PCB 해제. 더 이상 복원 불필요'],
            ].map(([state, desc, rel]) => `
              <tr>
                <td class="cs-td-key" style="${state === 'Running' ? `color:${CSS_ACCENT};` : ''}">${state}</td>
                <td>${desc}</td>
                <td style="color:var(--text-secondary);">${rel}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">PCB (Process Control Block) 구성 요소</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;line-height:1.7;">
        PCB는 운영체제가 프로세스를 관리하기 위해 커널 영역에 유지하는 자료구조.
        문맥교환 시 저장·복원되는 정보의 전체 목록.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${[
          { title:'프로세스 식별 정보', items:['PID — 프로세스 고유 번호', '부모 PID (PPID)', '사용자 ID (UID)'], accent: false },
          { title:'CPU 상태 정보 (문맥 핵심)', items:['프로그램 카운터 (PC)', '범용 레지스터 전체', '스택 포인터 (SP)', '상태 레지스터 (플래그)', '기본·한계 레지스터'], accent: true },
          { title:'프로세스 제어 정보', items:['프로세스 상태 (New/Ready…)', '스케줄링 우선순위', '대기 이벤트 정보'], accent: false },
          { title:'자원 관리 정보', items:['메모리 맵 (페이지 테이블 포인터)', '열린 파일 목록 (파일 디스크립터)', 'I/O 장치 목록', 'CPU 사용 시간·계정 정보'], accent: false },
        ].map(({ title, items, accent }) => `
          <div style="background:${accent ? 'var(--subject-bg)' : 'var(--bg-surface)'};border-radius:var(--radius-md);padding:12px 14px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:.04em;color:${accent ? CSS_ACCENT : 'var(--text-tertiary)'};margin-bottom:7px;">${title}</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              ${items.map(item => `
                <div style="font-size:12px;color:var(--text-primary);display:flex;gap:5px;align-items:flex-start;">
                  <span style="color:${CSS_ACCENT};font-weight:700;flex-shrink:0;">›</span>${item}
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">오버헤드 & 성능 고려사항</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${[
          { label:'디스패처 지연(Dispatcher Latency)', desc:'문맥교환에 소요되는 순수 시간. 이 시간 동안 CPU는 사용자 프로세스를 실행하지 못한다. 운영체제 설계의 핵심 최적화 대상.', accent: true },
          { label:'캐시 오염(Cache Pollution)', desc:'프로세스 전환 시 이전 프로세스가 캐시에 올려둔 데이터가 무효화된다. 새 프로세스는 콜드 캐시에서 시작하므로 초기 실행 속도가 느려진다.', accent: false },
          { label:'TLB 플러시(TLB Flush)', desc:'TLB는 페이지 테이블 캐시. 주소 공간이 바뀌면 TLB를 플러시해야 한다. ASID(Address Space ID) 태깅으로 플러시를 줄일 수 있다.', accent: false },
          { label:'성능 개선', desc:'스레드 전환은 주소 공간이 공유되므로 TLB 플러시 없이 레지스터만 교환 → 문맥교환보다 빠름.', accent: false },
        ].map(({ label, desc, accent }) => `
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${accent ? CSS_ACCENT : 'var(--subject-mid,#ECA898)'};margin-top:5px;flex-shrink:0;"></div>
            <div style="flex:1;">
              <span style="font-size:13px;font-weight:700;color:${accent ? CSS_ACCENT : 'var(--text-primary)'};">${label}</span>
              <span style="font-size:12px;color:var(--text-secondary);line-height:1.7;"> — ${desc}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">프로세스 vs 스레드 문맥교환 비교</div>
      <div class="cs-table-wrap">
        <table class="cs-table">
          <thead>
            <tr><th>구분</th><th>프로세스 문맥교환</th><th style="color:${CSS_ACCENT};">스레드 문맥교환</th></tr>
          </thead>
          <tbody>
            ${[
              ['주소 공간',   '별도 (가상 주소 공간 교체)',         '공유 (같은 프로세스 내)'],
              ['TLB 플러시', '필요 (주소 공간 변경)',               '불필요 (주소 공간 동일)'],
              ['저장 항목',  'PCB 전체 (레지스터+메모리맵+파일 등)', '레지스터·스택·PC 위주'],
              ['비용',       '높음 (Heavy)',                        '낮음 (Light)'],
              ['캐시 오염',  '심각',                                '상대적으로 경미'],
            ].map(([label, proc, thread]) => `
              <tr>
                <td class="cs-td-key">${label}</td>
                <td style="color:var(--text-secondary);">${proc}</td>
                <td style="color:${CSS_ACCENT};font-weight:600;">${thread}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">다른 개념과 비교</div>
      ${[
        ['디스패처 (Dispatcher)', '문맥교환 실행 주체', '스케줄러가 "누구"를 선택하면, <strong>디스패처</strong>가 실제 레지스터 적재·모드 전환·PC 점프를 수행한다.'],
        ['CPU 스케줄링', '문맥교환의 전제 조건', '스케줄러는 <strong>어떤 프로세스를 실행할지 결정</strong>하는 정책이고, 문맥교환은 그 결정을 <strong>구현</strong>하는 메커니즘이다.'],
        ['인터럽트 처리', '문맥교환과 구별', '인터럽트 발생 시 커널 스택에 저장하는 것은 <strong>인터럽트 처리</strong>이며, 다른 프로세스로 전환하는 <strong>문맥교환</strong>과 구별된다.'],
      ].map(([label, title, desc]) => `
        <div class="cs-compare-card">
          <div class="cs-compare-label">${label}</div>
          <div class="cs-compare-title">${title}</div>
          <div class="cs-compare-desc">${desc}</div>
        </div>`).join('')}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      ${CS.renderEssayGroups([
        { label:'개념 정의', items:['문맥교환 정의: CPU 실행 프로세스 교체 시 현재 상태 저장 + 새 프로세스 상태 복원', '문맥(Context): PCB에 저장되는 CPU 상태 정보 전체'] },
        { label:'발생 조건 및 절차', items:['트리거: 타이머 인터럽트 / I/O 요청 / 시스템 콜 / 고우선순위 프로세스 도착', '절차: ①P1 저장(PCB₁) → ②P1 큐 이동 → ③P2 선택 → ④P2 복원(PCB₂) → ⑤P2 실행'] },
        { label:'PCB 구성 & 역할', items:['PCB 저장 핵심: PC·레지스터·SP·플래그·메모리 맵·파일 디스크립터 등', 'PCB 없으면 중단된 프로세스 재개 불가'] },
        { label:'오버헤드 & 의의', items:['문맥교환 중 CPU는 유용한 작업 수행 불가 → 순수 오버헤드(Dispatcher Latency)', '멀티태스킹 구현의 핵심 메커니즘 / 스레드 전환은 프로세스 전환보다 경량'] },
      ])}
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      ${CS.renderCheckCards([
        { type:'danger',  text:'<strong>문맥교환 ≠ CPU 스케줄링.</strong> 스케줄링은 "누구를 실행할지 결정"하는 정책, 문맥교환은 그 결정을 "실제로 구현"하는 메커니즘이다.' },
        { type:'danger',  text:'<strong>문맥교환 ≠ 인터럽트 처리.</strong> 인터럽트 발생 시 커널 스택 저장은 인터럽트 처리이고, 다른 프로세스로의 전환이 문맥교환이다.' },
        { type:'success', text:'<strong>PCB 저장 핵심 3요소:</strong> 프로그램 카운터(PC) + 범용 레지스터 + 스택 포인터(SP). 이 세 가지가 없으면 프로세스 재개 불가.' },
        { type:'success', text:'<strong>스레드 문맥교환 &lt; 프로세스 문맥교환</strong>: 주소 공간을 공유하므로 TLB 플러시 없이 레지스터만 교환 → 경량(Light-Weight).' },
      ])}
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    CS.renderExamSection($('tab-exam'), {
      historyHTML: `2016중 · 2018중 · 2019중 · 2020중 · 2022중
        <span class="cs-history-note">PCB 구성 요소, 문맥교환 정의 및 절차, 디스패처 개념, 프로세스 상태 전이가 집중 출제. 스레드와의 비교 문제 비중 증가 추세.</span>`,
      freqItems: [
        '문맥교환 시 저장되는 프로그램 카운터(PC), 레지스터 등 CPU 상태 정보 [2020중]',
        'PCB 구성 요소(프로세스 상태, PC, 레지스터, 메모리 정보 등) 전반 [2018중]',
        '문맥교환의 정의와 발생 조건 (인터럽트·시스템 콜·타이머 만료) [2016중]',
        '디스패처(Dispatcher)의 역할과 디스패처 지연(Dispatcher Latency) 개념 [2022중]',
        '프로세스 상태 전이 5단계 (New·Ready·Running·Waiting·Terminated)와 전이 조건 [2019중]',
      ],
      normalItems: [
        '스레드 문맥교환과 프로세스 문맥교환의 차이 (TLB 플러시 여부, 공유 자원 범위)',
        'CPU 스케줄링 알고리즘(라운드 로빈 등)과 문맥교환 빈도의 상관관계',
        '선점형(Preemptive) vs 비선점형(Non-preemptive) 스케줄링에서 문맥교환 발생 방식',
        'TLB 플러시와 캐시 오염이 문맥교환 오버헤드에 미치는 영향',
      ],
    });
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox', q:'문맥교환(Context Switch)이 발생하는 동안 CPU는 사용자 프로세스의 유용한 작업을 수행할 수 없다.', answer:'O', explain:'문맥교환 시간은 레지스터 저장·복원에 사용되므로 순수 오버헤드(Dispatcher Latency)다.' },
    { type:'ox', q:'문맥교환 시 저장되는 정보에는 프로그램 카운터(PC), 범용 레지스터, 스택 포인터(SP)가 포함된다.', answer:'O', explain:'이 세 가지가 문맥(Context)의 핵심 구성 요소이며 PCB에 저장된다.' },
    { type:'ox', q:'프로세스 문맥교환과 스레드 문맥교환은 TLB 플러시 필요 여부가 동일하다.', answer:'X', explain:'프로세스 문맥교환은 주소 공간이 바뀌므로 TLB 플러시가 필요하지만, 같은 프로세스 내 스레드 전환은 주소 공간이 공유되어 TLB 플러시가 불필요하다.' },
    { type:'ox', q:'CPU 스케줄링과 문맥교환은 동일한 개념이다.', answer:'X', explain:'스케줄링은 "어떤 프로세스를 실행할지 결정"하는 정책이고, 문맥교환은 그 결정을 "실제로 구현"하는 메커니즘이다.' },
    { type:'ox', q:'PCB(Process Control Block)에는 열린 파일 목록(파일 디스크립터)이 포함된다.', answer:'O', explain:'PCB는 CPU 상태 정보 외에도 열린 파일 목록, I/O 장치 정보, 메모리 맵 등 프로세스 관리에 필요한 모든 정보를 담는다.' },
    { type:'fill', q:'문맥교환 시 현재 실행 중인 프로세스의 CPU 상태 정보를 저장하는 운영체제의 자료구조를 (   )(이)라 한다.', answer:'PCB (Process Control Block)', explain:'PCB는 PID, PC, 레지스터, SP, 프로세스 상태, 메모리 맵 등을 저장하며 문맥교환의 저장·복원 대상이다.' },
    { type:'fill', q:'스케줄러가 선택한 프로세스에게 실제로 CPU를 넘기고 레지스터 적재·모드 전환을 수행하는 운영체제 컴포넌트를 (   )(이)라 한다.', answer:'디스패처 (Dispatcher)', explain:'디스패처는 문맥교환을 실제로 수행하며, 소요 시간을 디스패처 지연(Dispatcher Latency)이라 한다.' },
    { type:'fill', q:'프로세스가 CPU 실행을 대기하는 상태를 (   ) 상태, I/O 완료를 기다리는 상태를 (   ) 상태라 한다.', answer:'Ready / Waiting (Blocked)', explain:'Ready: CPU만 할당받으면 실행 가능한 상태. Waiting: I/O 등 특정 이벤트가 완료될 때까지 기다리는 상태.' },
    { type:'mc', q:'문맥교환에 대한 설명으로 옳지 않은 것은?', options:['① 문맥교환 중 CPU는 유용한 사용자 작업을 수행하지 못한다.','② 문맥교환 시 프로그램 카운터(PC)와 범용 레지스터가 PCB에 저장된다.','③ 스레드 문맥교환은 주소 공간을 교체하므로 TLB 플러시가 필요하다.','④ 인터럽트나 시스템 콜이 문맥교환의 트리거가 될 수 있다.'], answer:2, explain:'③ 같은 프로세스 내 스레드 전환은 주소 공간을 공유하므로 TLB 플러시가 필요하지 않다.' },
    { type:'mc', q:'다음 중 PCB에 저장되는 정보가 아닌 것은?', options:['① 프로그램 카운터 (PC)','② 스택 포인터 (SP)','③ 프로세스가 사용 중인 알고리즘 소스 코드','④ 열린 파일 디스크립터 목록'], answer:2, explain:'③ 프로세스의 소스 코드는 PCB에 저장되지 않는다. PCB는 CPU 상태, 식별 정보, 메모리 맵, 열린 파일 목록 등을 저장한다.' },
    { type:'mc', q:'스케줄러가 선택한 프로세스에게 CPU 제어권을 실제로 넘기는 역할을 하며, 레지스터 적재·사용자 모드 전환·PC 점프를 수행하는 것은?', options:['① 스케줄러 (Scheduler)','② 디스패처 (Dispatcher)','③ 인터럽트 핸들러 (Interrupt Handler)','④ 세마포어 (Semaphore)'], answer:1, explain:'② 디스패처(Dispatcher)다. 스케줄러가 "누구를 실행할지" 결정하면, 디스패처가 "실제로 CPU를 넘기는" 작업을 수행한다.' },
  ];
  function renderQuiz() { CS.renderQuizSection($('tab-quiz'), QUIZ_DATA, 'ctx'); }

  /* ── 초기화 ── */
  function init() { renderSummary(); renderExam(); renderQuiz(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    const obs = new MutationObserver(() => {
      if ($('tab-summary') && $('tab-exam') && $('tab-quiz')) { obs.disconnect(); init(); }
    });
    obs.observe(document.getElementById('main') || document.body, { childList:true, subtree:true });
    if ($('tab-summary')) init();
  }
})();
