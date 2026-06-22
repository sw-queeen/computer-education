/**
 * 운영체제 — 문맥교환 (Context Switch) 콘텐츠
 * Editorial Design System (ed-* 클래스 활용)
 */
(function () {
  function $(id) { return document.getElementById(id); }
  const C = window.SITE_CONFIG || {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam: { history:'기출 연도 현황', freq:'자주 출제', normal:'간헐 출제' },
    quiz: { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식', btnReveal:'정답 보기', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  /* ── 키워드 그래프 데이터 ── */
  window.CONCEPT_KW_NODES = [
    { id:'core',    label:'문맥교환',         x:320, y:155, r:30, core:true },
    { id:'pcb',     label:'PCB',              x:180, y:80,  r:24 },
    { id:'disp',    label:'디스패처',          x:470, y:70,  r:20 },
    { id:'lat',     label:'디스패처 지연',     x:500, y:180, r:16 },
    { id:'state',   label:'프로세스 상태',     x:175, y:220, r:20 },
    { id:'timer',   label:'타이머 인터럽트',   x:60,  y:50,  r:13 },
    { id:'sys',     label:'시스템 콜',         x:90,  y:270, r:13 },
    { id:'tlb',     label:'TLB 플러시',        x:380, y:270, r:13 },
    { id:'cache',   label:'캐시 오염',         x:500, y:270, r:13 },
    { id:'sched',   label:'스케줄러',          x:330, y:38,  r:14 },
    { id:'preempt', label:'선점형',            x:55,  y:155, r:13 },
    { id:'thread',  label:'스레드 전환',       x:265, y:280, r:13 },
  ];
  window.CONCEPT_KW_EDGES = [
    ['core','pcb'],  ['core','disp'],  ['core','state'], ['core','lat'],
    ['pcb','timer'], ['pcb','sched'],  ['state','sys'],  ['state','preempt'],
    ['disp','lat'],  ['disp','sched'], ['core','tlb'],   ['core','cache'],
    ['tlb','thread'],['core','sys'],
  ];

  /* ── 1. 핵심정리 (Concept 모드) ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    el.innerHTML = `
    <div class="ed-section">
      <div class="ed-h2"><span class="num">01</span> 개요</div>
      <div class="cs-intro-box">
        <strong>문맥교환(Context Switch)</strong>은 CPU가 실행 중인 프로세스를 교체할 때,
        <strong>현재 프로세스의 상태(문맥)를 저장</strong>하고
        <strong>새 프로세스의 상태를 복원</strong>하는 커널의 작업 전체를 말한다.<br><br>
        운영체제가 멀티태스킹을 구현하는 핵심 메커니즘이며,
        문맥교환이 발생하는 동안 CPU는 유용한 작업을 수행하지 못하므로
        <strong>순수 오버헤드(Dispatcher Latency)</strong>로 간주된다.
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">02</span> 발생 조건 (트리거)</div>
      <div class="ed-trigger">
        <div class="ed-trigger-n">01</div>
        <div>
          <div class="ed-trigger-name">타이머 인터럽트</div>
          <div class="ed-trigger-desc">선점형(Preemptive) 스케줄러가 타임 슬라이스(Time Slice)를 기준으로 실행 중인 프로세스를 중단하고 다른 프로세스로 교체.</div>
        </div>
      </div>
      <div class="ed-trigger">
        <div class="ed-trigger-n">02</div>
        <div>
          <div class="ed-trigger-name">I/O 요청 또는 이벤트 대기</div>
          <div class="ed-trigger-desc">실행 중인 프로세스가 키보드·마우스·디스크 I/O 등 외부 리소스를 요청하거나 이벤트 완료를 기다릴 때.</div>
        </div>
      </div>
      <div class="ed-trigger">
        <div class="ed-trigger-n">03</div>
        <div>
          <div class="ed-trigger-name">시스템 콜 (System Call)</div>
          <div class="ed-trigger-desc">프로세스가 커널에 서비스를 요청할 때 (예: 파일 오픈, 메모리 할당, 프로세스 생성). 일부 시스템 콜은 문맥교환을 유발.</div>
        </div>
      </div>
      <div class="ed-trigger">
        <div class="ed-trigger-n">04</div>
        <div>
          <div class="ed-trigger-name">고우선순위 프로세스 도착</div>
          <div class="ed-trigger-desc">선점형 스케줄러에서 더 높은 우선순위의 프로세스가 도착했을 때 현재 프로세스를 즉시 중단.</div>
        </div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">03</span> 문맥교환 절차 — 6단계</div>
      <div class="ed-flow">
        <div class="ed-flowstep">
          <div class="ed-flowstep-title">인터럽트 / 시스템 콜 발생</div>
          <div class="ed-flowstep-desc">문맥교환의 트리거. P1 실행이 일시 중단되며 제어권이 CPU에서 커널(운영체제)로 넘어간다. 모드도 사용자 모드 → 커널 모드로 전환.</div>
        </div>
        <div class="ed-flowstep accent">
          <div class="ed-flowstep-title">P1 문맥 저장 → PCB₁</div>
          <div class="ed-flowstep-desc">PC·레지스터·SP·플래그 등 CPU 상태 전체를 P1의 PCB(Process Control Block)에 저장한다. 이 정보 없이는 나중에 P1을 재개할 수 없다.</div>
        </div>
        <div class="ed-flowstep">
          <div class="ed-flowstep-title">P1 상태 전환 → Ready / Waiting</div>
          <div class="ed-flowstep-desc">원인에 따라 Ready 큐 또는 Waiting 큐로 이동. 타이머 인터럽트면 Ready, I/O 대기면 Waiting으로.</div>
        </div>
        <div class="ed-flowstep">
          <div class="ed-flowstep-title">스케줄러가 P2 선택</div>
          <div class="ed-flowstep-desc">CPU 스케줄러가 Ready 큐에서 다음 실행할 프로세스 P2를 선택 (FCFS·RR·Priority 등의 알고리즘 적용).</div>
        </div>
        <div class="ed-flowstep accent">
          <div class="ed-flowstep-title">P2 문맥 복원 ← PCB₂</div>
          <div class="ed-flowstep-desc">P2의 PCB에 저장된 상태를 레지스터에 적재. 이전에 중단된 그 지점부터 정확히 재개 가능.</div>
        </div>
        <div class="ed-flowstep">
          <div class="ed-flowstep-title">P2 실행 재개</div>
          <div class="ed-flowstep-desc">디스패처가 커널 모드 → 사용자 모드로 전환하고 P2를 실행. P2의 PC 주소로 점프하여 제어 흐름이 연속.</div>
        </div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">04</span> 프로세스 상태 전이 — 5가지</div>
      <table class="ed-statetable">
        <tr><td data-label="상태">New</td><td data-label="의미">생성 중</td><td data-label="설명">문맥 없음 (PCB 초기화 중)</td></tr>
        <tr class="running"><td data-label="상태">Running</td><td data-label="의미">CPU 점유 중</td><td data-label="설명">문맥교환의 출발점 또는 도착점</td></tr>
        <tr><td data-label="상태">Ready</td><td data-label="의미">CPU 할당 대기 중</td><td data-label="설명">문맥교환 후 이 상태로 전환되거나, 이 상태에서 선택됨</td></tr>
        <tr><td data-label="상태">Waiting</td><td data-label="의미">I/O 또는 이벤트 대기 중</td><td data-label="설명">Running → Waiting 전환 시 문맥 저장 발생</td></tr>
        <tr><td data-label="상태">Terminated</td><td data-label="의미">실행 완료·종료</td><td data-label="설명">PCB 해제. 더 이상 복원 불필요</td></tr>
      </table>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">05</span> PCB 구성 요소</div>
      <div class="ed-pcb-row accent">
        <div class="ed-pcb-label-col">CPU 상태 정보 — 문맥 핵심</div>
        <div class="ed-pcb-items">프로그램 카운터(PC) · 범용 레지스터 전체 · 스택 포인터(SP) · 프로그램 상태 워드(PSW/플래그)</div>
      </div>
      <div class="ed-pcb-row">
        <div class="ed-pcb-label-col">프로세스 식별 정보</div>
        <div class="ed-pcb-items">PID(고유 번호) · 부모 PID(PPID) · 사용자 ID(UID)</div>
      </div>
      <div class="ed-pcb-row">
        <div class="ed-pcb-label-col">프로세스 제어 정보</div>
        <div class="ed-pcb-items">프로세스 상태 · 스케줄링 우선순위 · 대기 이벤트 정보</div>
      </div>
      <div class="ed-pcb-row">
        <div class="ed-pcb-label-col">자원 관리 정보</div>
        <div class="ed-pcb-items">메모리 맵(페이지 테이블 포인터) · 열린 파일 목록 · I/O 장치 정보</div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">06</span> 오버헤드 & 성능 고려사항</div>
      <div class="ed-over-item">
        <div class="ed-over-label accent">디스패처 지연(Dispatcher Latency)</div>
        <div class="ed-over-desc">문맥교환에 소요되는 순수 시간. 이 시간 동안 CPU는 유용한 작업을 하지 못한다. 마이크로초 단위지만 초당 수천 번 발생하면 무시할 수 없다.</div>
      </div>
      <div class="ed-over-item">
        <div class="ed-over-label">캐시 오염(Cache Pollution)</div>
        <div class="ed-over-desc">프로세스 전환 시 이전 프로세스가 캐시에 올려둔 데이터가 새 프로세스에 유용하지 않으면 캐시 미스 증가 → 메모리 접근 지연.</div>
      </div>
      <div class="ed-over-item">
        <div class="ed-over-label">TLB 플러시(TLB Flush)</div>
        <div class="ed-over-desc">TLB는 페이지 테이블 캐시. 주소 공간이 바뀌면 TLB를 플러시해야 하므로 가상 주소 → 물리 주소 변환 시 TLB 미스 증가.</div>
      </div>
      <div class="ed-over-item">
        <div class="ed-over-label">성능 개선 — 스레드 전환</div>
        <div class="ed-over-desc">스레드 전환은 주소 공간이 공유되므로 TLB 플러시 없음. 저장할 정보도 적음(PC·레지스터·스택만). 따라서 프로세스 전환보다 빠름.</div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">07</span> 프로세스 vs 스레드 문맥교환</div>
      <table class="ed-vstable">
        <thead><tr><th>구분</th><th>프로세스</th><th>스레드</th></tr></thead>
        <tbody>
          <tr><td>주소 공간</td><td>별도 (가상 주소 공간 교체)</td><td>공유</td></tr>
          <tr><td>TLB 플러시</td><td>필요</td><td>불필요</td></tr>
          <tr><td>저장 항목</td><td>PCB 전체</td><td>레지스터·스택·PC 위주</td></tr>
          <tr><td>비용</td><td>높음 (Heavy)</td><td>낮음 (Light)</td></tr>
          <tr><td>캐시 오염</td><td>심각</td><td>경미</td></tr>
        </tbody>
      </table>
    </div>`;
  }

  /* ── 2. 기출 포인트 (Note 모드) ── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    el.innerHTML = `
    <div class="ed-section">
      <div class="ed-h2"><span class="num">01</span> 논술 답안 구조</div>
      <div class="ed-essay-group">
        <div class="ed-essay-label">개념 정의</div>
        <div class="ed-essay-item">문맥교환 정의: CPU 실행 프로세스 교체 시 현재 상태 저장 + 새 프로세스 상태 복원</div>
        <div class="ed-essay-item">문맥(Context): PCB에 저장되는 CPU 상태 정보 전체</div>
      </div>
      <div class="ed-essay-group">
        <div class="ed-essay-label">발생 조건 및 절차</div>
        <div class="ed-essay-item">트리거: 타이머 인터럽트 / I/O 요청 / 시스템 콜 / 고우선순위 프로세스 도착</div>
        <div class="ed-essay-item">절차: ①P1 저장(PCB₁) → ②P1 큐 이동 → ③P2 선택 → ④P2 복원(PCB₂) → ⑤P2 실행</div>
      </div>
      <div class="ed-essay-group">
        <div class="ed-essay-label">PCB 구성 & 역할</div>
        <div class="ed-essay-item">PCB 저장 핵심: PC·레지스터·SP·플래그·메모리 맵·파일 디스크립터 등</div>
        <div class="ed-essay-item">PCB 없으면 중단된 프로세스 재개 불가</div>
      </div>
      <div class="ed-essay-group">
        <div class="ed-essay-label">오버헤드 & 의의</div>
        <div class="ed-essay-item">문맥교환 중 CPU는 유용한 작업 수행 불가 → 순수 오버헤드(Dispatcher Latency)</div>
        <div class="ed-essay-item">멀티태스킹 구현의 핵심 메커니즘. 스레드 전환은 프로세스 전환보다 경량</div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">02</span> 체크 포인트</div>
      <div class="ed-check">
        <span class="ed-check-label danger">혼동 주의</span>
        <div class="ed-check-body"><strong>문맥교환 ≠ CPU 스케줄링.</strong> 스케줄링은 "누구를 실행할지" 결정하는 정책. 문맥교환은 그 결정을 실행하는 메커니즘.</div>
      </div>
      <div class="ed-check">
        <span class="ed-check-label danger">혼동 주의</span>
        <div class="ed-check-body"><strong>문맥교환 ≠ 인터럽트 처리.</strong> 인터럽트 발생 시 커널이 제어권을 가지지만, 같은 프로세스로 돌아가면 문맥교환이 아님.</div>
      </div>
      <div class="ed-check">
        <span class="ed-check-label success">핵심 암기</span>
        <div class="ed-check-body"><strong>PCB 저장 핵심 3요소:</strong> 프로그램 카운터(PC) + 범용 레지스터 + 프로그램 상태 워드(플래그).</div>
      </div>
      <div class="ed-check">
        <span class="ed-check-label success">핵심 암기</span>
        <div class="ed-check-body"><strong>스레드 문맥교환 &lt; 프로세스 문맥교환:</strong> 주소 공간 공유 → TLB 플러시 불필요 → 빠르고 경량.</div>
      </div>
    </div>

    <div class="ed-section">
      <div class="ed-h2"><span class="num">03</span> 기출 포인트</div>
      <div class="ed-exam-meta">
        <span class="years">2016 · 2018 · 2019 · 2020 · 2022</span>
        PCB 구성 요소, 문맥교환 정의 및 절차, 디스패처 개념, 프로세스 상태 전이, 스레드 vs 프로세스 비교
      </div>
      <div class="ed-exam-item"><div class="ed-exam-year">2020중</div><div class="ed-exam-text"><span class="ed-exam-freq-dot"></span>문맥교환 시 저장되는 프로그램 카운터(PC), 레지스터, SP 등의 정보</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">2018중</div><div class="ed-exam-text"><span class="ed-exam-freq-dot"></span>PCB 구성 요소(프로세스 상태, PC, 레지스터, 메모리 정보)</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">2016중</div><div class="ed-exam-text"><span class="ed-exam-freq-dot"></span>문맥교환의 정의와 발생 조건 (인터럽트·시스템 콜·I/O)</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">2022중</div><div class="ed-exam-text"><span class="ed-exam-freq-dot"></span>디스패처(Dispatcher)의 역할과 디스패처 지연(Dispatcher Latency)</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">2019중</div><div class="ed-exam-text"><span class="ed-exam-freq-dot"></span>프로세스 상태 전이 5단계와 전이 조건</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">상시</div><div class="ed-exam-text"><span class="ed-exam-freq-dot invisible"></span>스레드 문맥교환과 프로세스 문맥교환 비교</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">상시</div><div class="ed-exam-text"><span class="ed-exam-freq-dot invisible"></span>CPU 스케줄링 알고리즘과 문맥교환 빈도 관계</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">상시</div><div class="ed-exam-text"><span class="ed-exam-freq-dot invisible"></span>선점형 vs 비선점형 스케줄링에서 문맥교환 발생</div></div>
      <div class="ed-exam-item"><div class="ed-exam-year">상시</div><div class="ed-exam-text"><span class="ed-exam-freq-dot invisible"></span>TLB 플러시와 캐시 오염이 문맥교환 오버헤드에 미치는 영향</div></div>
    </div>`;
  }

  /* ── 3. 리마인드 퀴즈 (Note 모드) ── */
  const QUIZ_DATA = [
    { type:'ox',   q:'문맥교환(Context Switch)이 발생하는 동안 CPU는 사용자 프로세스의 유용한 작업을 수행할 수 없다.', answer:'O', explain:'문맥교환 시간은 레지스터 저장·복원에 사용되므로 순수 오버헤드(Dispatcher Latency)다.' },
    { type:'ox',   q:'문맥교환 시 저장되는 정보에는 프로그램 카운터(PC), 범용 레지스터, 스택 포인터(SP)가 포함된다.', answer:'O', explain:'이 세 가지가 문맥(Context)의 핵심 구성 요소이며 PCB에 저장된다.' },
    { type:'ox',   q:'프로세스 문맥교환과 스레드 문맥교환은 TLB 플러시 필요 여부가 동일하다.', answer:'X', explain:'프로세스 문맥교환은 주소 공간이 바뀌므로 TLB 플러시가 필요하지만, 같은 프로세스 내 스레드 전환은 주소 공간이 공유되어 TLB 플러시가 불필요하다.' },
    { type:'ox',   q:'CPU 스케줄링과 문맥교환은 동일한 개념이다.', answer:'X', explain:'스케줄링은 "어떤 프로세스를 실행할지 결정"하는 정책이고, 문맥교환은 그 결정을 "실제로 구현"하는 메커니즘이다.' },
    { type:'ox',   q:'PCB(Process Control Block)에는 열린 파일 목록(파일 디스크립터)이 포함된다.', answer:'O', explain:'PCB는 CPU 상태 정보 외에도 열린 파일 목록, I/O 장치 정보, 메모리 맵 등을 담는다.' },
    { type:'fill', q:'문맥교환 시 현재 실행 중인 프로세스의 CPU 상태 정보를 저장하는 운영체제의 자료구조를 (   )(이)라 한다.', answer:'PCB (Process Control Block)', explain:'PCB는 PID, PC, 레지스터, SP, 프로세스 상태, 메모리 맵 등을 저장한다.' },
    { type:'fill', q:'스케줄러가 선택한 프로세스에게 실제로 CPU를 넘기고 레지스터 적재·모드 전환을 수행하는 운영체제 컴포넌트를 (   )(이)라 한다.', answer:'디스패처 (Dispatcher)', explain:'디스패처는 문맥교환을 실제로 수행하며, 소요 시간을 디스패처 지연(Dispatcher Latency)이라 한다.' },
    { type:'fill', q:'프로세스가 CPU 실행을 대기하는 상태를 (   ) 상태, I/O 완료를 기다리는 상태를 (   ) 상태라 한다.', answer:'Ready / Waiting (Blocked)', explain:'Ready: CPU만 할당받으면 실행 가능한 상태. Waiting: I/O 등 특정 이벤트가 완료될 때까지 기다리는 상태.' },
    { type:'mc',   q:'문맥교환에 대한 설명으로 옳지 않은 것은?', options:['문맥교환 중 CPU는 유용한 사용자 작업을 수행하지 못한다.','문맥교환 시 프로그램 카운터(PC)는 필수 저장 항목이다.','문맥교환은 TLB 플러시 없이도 항상 가능하다.','문맥교환 절차에 디스패처가 관여한다.'], answer:2, explain:'문맥교환은 프로세스 전환 시 TLB 플러시가 필요. 이것이 프로세스 전환이 스레드 전환보다 느린 이유다.' },
    { type:'mc',   q:'다음 중 PCB에 저장되는 정보가 아닌 것은?', options:['프로그램 카운터 (PC)','스택 포인터 (SP)','프로세스가 사용 중인 알고리즘 소스 코드','프로세스 우선순위'], answer:2, explain:'PCB는 상태·CPU정보·자원정보·제어정보를 저장. 소스 코드는 별도 메모리(코드 섹션)에 있다.' },
    { type:'mc',   q:'스케줄러가 선택한 프로세스에게 CPU 제어권을 실제로 넘기고 레지스터 적재·모드 전환·PC 점프를 수행하는 것은?', options:['CPU','디스패처','인터럽트 핸들러','커널'], answer:1, explain:'디스패처(Dispatcher)는 CPU 스케줄링 알고리즘의 결정을 실제 CPU 실행으로 변환하는 운영체제 모듈.' },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;

    let state = QUIZ_DATA.map(() => ({ revealed: false, selected: null }));

    function typeLabel(t) { return t === 'ox' ? 'O / X' : t === 'fill' ? '빈칸 채우기' : '객관식'; }

    function buildCard(q, i) {
      const s = state[i];
      const rev = s.revealed;
      let choiceHTML = '';

      if (q.type === 'ox') {
        choiceHTML = `<div class="ed-quiz-ox">` + ['O','X'].map(ans => {
          let cls = 'ed-quiz-ox-btn';
          if (rev && s.selected === ans) cls += (ans === q.answer) ? ' picked-correct' : ' picked-wrong';
          return `<button class="${cls}" onclick="ctxQuizPick(${i},'${ans}')">${ans}</button>`;
        }).join('') + `</div>`;
      } else if (q.type === 'fill') {
        choiceHTML = rev
          ? `<div class="ed-quiz-fill-answer"><span class="fill-label">정답:</span> <span class="fill-value">${q.answer}</span></div>`
          : `<button class="ed-quiz-fill-btn" onclick="ctxQuizPick(${i},'reveal')">정답 보기</button>`;
      } else {
        choiceHTML = `<div class="ed-quiz-mc">` + q.options.map((opt, oi) => {
          const corr = oi === q.answer, sel = s.selected === oi;
          let cls = 'ed-quiz-mc-btn';
          if (rev && corr) cls += ' correct';
          else if (rev && sel) cls += ' wrong';
          return `<button class="${cls}" onclick="ctxQuizPick(${i},${oi})">${oi+1}. ${opt}</button>`;
        }).join('') + `</div>`;
      }

      const explainHTML = rev ? `<div class="ed-quiz-explain">${q.explain}</div>` : '';
      return `<div class="ed-quiz-item">
        <div class="ed-quiz-n">${typeLabel(q.type)}</div>
        <div class="ed-quiz-q">${i+1}. ${q.q}</div>
        ${choiceHTML}
        ${explainHTML}
      </div>`;
    }

    function buildAll() {
      el.innerHTML = `
        <div class="ed-section">
          <div class="ed-h2"><span class="num">04</span> 리마인드 — ${QUIZ_DATA.length}문항</div>
          ${QUIZ_DATA.map((q, i) => buildCard(q, i)).join('')}
        </div>
        <div class="quiz-footer">
          <button class="ed-reset" onclick="ctxQuizReset()">전체 초기화</button>
        </div>`;
    }

    window.ctxQuizPick = function(i, val) {
      if (typeof val === 'number') state[i].selected = val;
      else if (val !== 'reveal') state[i].selected = val;
      state[i].revealed = true;
      buildAll();
    };
    window.ctxQuizReset = function() {
      state = QUIZ_DATA.map(() => ({ revealed: false, selected: null }));
      buildAll();
    };

    buildAll();
  }

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
