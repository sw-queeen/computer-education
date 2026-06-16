/**
 * 운영체제 — 문맥교환(Context Switch) 탭 콘텐츠
 * 핵심정리 · 리마인드 · 기출 포인트
 * SITE_CONFIG 참조 / CS.im 디자인 가이드 준수
 */
(function () {
  function $(id) { return document.getElementById(id); }

  const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
    quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식',
               btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  const ACCENT = '#D05840';
  const BG     = '#FAE8E4';
  const MID    = '#ECA898';
  const TEXT   = '#6E2010';
  const FONT   = 'var(--font-body, var(--font-main))';

  if (!document.getElementById('ctx-content-style')) {
    const s = document.createElement('style');
    s.id = 'ctx-content-style';
    s.textContent = `
      .cc-tag { display:inline-block; font-size:10px; font-weight:700;
        padding:1px 7px; border-radius:4px; margin-right:6px; }
      .cc-table { width:100%; border-collapse:collapse; font-size:12px; font-family:${FONT}; }
      .cc-table th { padding:8px 10px; text-align:left; font-size:11px; font-weight:700;
        background:${BG}; color:${ACCENT}; border-bottom:2px solid ${MID}; }
      .cc-table td { padding:8px 10px; border-bottom:1px solid var(--border-light,rgba(0,0,0,.08));
        vertical-align:top; line-height:1.65; font-size:12px; }
      .cc-table tr:hover td { background:var(--bg-surface,#F0EDE8); }
      .cc-state-row { display:flex; align-items:stretch; gap:0; }
      .cc-state-arrow { display:flex; align-items:center; justify-content:center;
        font-size:12px; color:var(--text-tertiary,#A09890); padding:0 6px; }
      @media(max-width:560px) {
        .cc-table th, .cc-table td { padding:6px 8px; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── 유틸 ── */
  function numBall(n, color) {
    return `<span style="background:${color||ACCENT};color:white;border-radius:50%;
      min-width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;
      font-size:10px;font-weight:800;flex-shrink:0;margin-top:2px;">${n}</span>`;
  }
  function grayBall(n) { return numBall(n, '#A09890'); }

  function parseExamItem(text) {
    const m = text.match(/\[(.+?)\]/);
    if (!m) return `<span style="color:var(--text-primary,#2C2825);">${text}</span>`;
    const tag = m[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="cc-tag" style="background:${BG};color:${ACCENT};">${tag}</span>
            <span style="color:var(--text-primary,#2C2825);">${body}</span>`;
  }

  function sortExamItems(items) {
    return [...items].sort((a, b) => {
      const aHas = /\[.+?\]/.test(a), bHas = /\[.+?\]/.test(b);
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return 0;
    });
  }

  /* ═══════════════════════════════════════════
     1. 핵심 정리
  ═══════════════════════════════════════════ */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    el.innerHTML = `

    <!-- ① 개요 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.intro}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;
           line-height:1.95;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong style="color:${ACCENT};">문맥교환(Context Switch)</strong>은 CPU가 실행 중인 프로세스를 교체할 때,
        <strong>현재 프로세스의 상태(문맥)를 저장</strong>하고
        <strong>새 프로세스의 상태를 복원</strong>하는 커널의 작업 전체를 말한다.<br><br>
        운영체제가 멀티태스킹을 구현하는 핵심 메커니즘이며,
        문맥교환이 발생하는 동안 CPU는 유용한 작업을 수행하지 못하므로
        <strong style="color:${ACCENT};">순수 오버헤드(Pure Overhead)</strong>로 간주된다.
        저장되는 정보의 집합이 곧 프로세스의 <strong>문맥(Context)</strong>이며,
        이는 <strong>PCB(Process Control Block)</strong>에 기록된다.
      </div>
    </div>

    <!-- ② 발생 조건 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">발생 조건 (트리거)</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        ${[
          ['타이머 인터럽트', '선점형(Preemptive) 스케줄러가 타임 슬라이스 만료를 감지하면 강제로 CPU를 회수한다. 라운드 로빈 방식의 핵심 트리거.'],
          ['I/O 요청 또는 이벤트 대기', '실행 중인 프로세스가 I/O 작업을 요청하면 Waiting 상태로 전환되고, 다른 프로세스가 CPU를 점유한다.'],
          ['시스템 콜 (System Call)', '프로세스가 커널에 서비스를 요청할 때 사용자 모드 → 커널 모드로 전환. 일부 시스템 콜은 문맥교환을 유발한다.'],
          ['우선순위가 더 높은 프로세스 준비', '선점형 스케줄러에서 Ready 큐에 더 높은 우선순위 프로세스가 들어오면 현재 프로세스를 선점한다.'],
        ].map(([title, desc], i) => `
          <div style="display:flex;align-items:flex-start;gap:10px;">
            ${numBall(i+1)}
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:700;color:var(--text-primary,#2C2825);margin-bottom:2px;">${title}</div>
              <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;">${desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ③ 6단계 절차 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">문맥교환 절차 (6단계)</div>
      <div style="display:flex;flex-direction:column;gap:4px;font-family:${FONT};">
        ${[
          ['인터럽트 / 시스템 콜 발생', '문맥교환의 트리거. P1 실행이 일시 중단된다.'],
          ['P1 문맥 저장 → PCB₁', 'PC·레지스터·SP·플래그 등 CPU 상태 전체를 P1의 PCB에 기록한다.'],
          ['P1 상태 전환 → Ready 또는 Waiting', '원인에 따라 Ready 큐 또는 Waiting 큐로 이동한다.'],
          ['스케줄러가 P2 선택', 'CPU 스케줄러가 Ready 큐에서 다음 실행할 프로세스 P2를 결정한다.'],
          ['P2 문맥 복원 ← PCB₂', 'P2의 PCB에 저장된 상태를 레지스터에 적재한다.'],
          ['P2 실행 재개', '디스패처가 커널 모드 → 사용자 모드로 전환하고 P2를 실행한다.'],
        ].map(([title, desc], i) => `
          <div style="display:flex;align-items:stretch;gap:0;">
            <div style="display:flex;flex-direction:column;align-items:center;margin-right:10px;">
              <div style="width:28px;height:28px;border-radius:50%;background:${i===1||i===4?ACCENT:'var(--bg-surface,#F0EDE8)'};
                color:${i===1||i===4?'white':ACCENT};display:flex;align-items:center;justify-content:center;
                font-size:12px;font-weight:800;flex-shrink:0;">${i+1}</div>
              ${i<5?`<div style="width:2px;flex:1;background:var(--border-light,rgba(0,0,0,.08));margin:3px 0;"></div>`:''}
            </div>
            <div style="flex:1;padding-bottom:${i<5?'8px':'0'};">
              <div style="font-size:13px;font-weight:700;color:${i===1||i===4?ACCENT:'var(--text-primary,#2C2825)'};margin-bottom:2px;">${title}</div>
              <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.65;">${desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ④ 프로세스 상태 전이 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">프로세스 상태 전이 (5가지 상태)</div>
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;font-family:${FONT};">
        <table class="cc-table" style="min-width:460px;">
          <thead>
            <tr>
              <th>상태</th><th>설명</th><th>문맥교환과의 관계</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['New',       '생성 중',                         '문맥 없음 (PCB 초기화 중)'],
              ['Ready',     'CPU 할당 대기 중',                 '문맥교환 후 이 상태로 전환 또는 이 상태에서 선택됨'],
              ['Running',   'CPU 점유 중 (실행 중)',            '문맥교환의 출발점 (현재 프로세스) 또는 도착점 (다음 프로세스)'],
              ['Waiting',   'I/O 또는 이벤트 대기 중 (Blocked)', 'I/O 요청 시 Running → Waiting 전환 (문맥 저장 발생)'],
              ['Terminated','실행 완료·종료',                   'PCB 해제. 더 이상 복원 불필요'],
            ].map(([state, desc, rel]) => `
              <tr>
                <td style="font-weight:700;color:${state==='Running'?ACCENT:'var(--text-primary,#2C2825)'};">${state}</td>
                <td>${desc}</td>
                <td style="color:var(--text-secondary,#6B6560);">${rel}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- ⑤ PCB 구성 요소 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">PCB (Process Control Block) 구성 요소</div>
      <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:12px;line-height:1.7;font-family:${FONT};">
        PCB는 운영체제가 프로세스를 관리하기 위해 커널 영역에 유지하는 자료구조.
        문맥교환 시 저장·복원되는 정보의 전체 목록.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-family:${FONT};">
        ${[
          {
            title: '프로세스 식별 정보',
            items: ['PID — 프로세스 고유 번호', '부모 PID (PPID)', '사용자 ID (UID)'],
          },
          {
            title: 'CPU 상태 정보 (문맥 핵심)',
            items: ['프로그램 카운터 (PC)', '범용 레지스터 전체', '스택 포인터 (SP)', '상태 레지스터 (플래그)', '기본·한계 레지스터'],
            accent: true,
          },
          {
            title: '프로세스 제어 정보',
            items: ['프로세스 상태 (New/Ready…)', '스케줄링 우선순위', '대기 이벤트 정보'],
          },
          {
            title: '자원 관리 정보',
            items: ['메모리 맵 (페이지 테이블 포인터)', '열린 파일 목록 (파일 디스크립터)', 'I/O 장치 목록', 'CPU 사용 시간·계정 정보'],
          },
        ].map(({ title, items, accent }) => `
          <div style="background:${accent?BG:'var(--bg-surface,#F0EDE8)'};border-radius:10px;padding:12px 14px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:.04em;
              color:${accent?ACCENT:'var(--text-tertiary,#A09890)'};margin-bottom:7px;">${title}</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              ${items.map(item => `
                <div style="font-size:12px;color:var(--text-primary,#2C2825);
                  display:flex;gap:5px;align-items:flex-start;">
                  <span style="color:${ACCENT};font-weight:700;flex-shrink:0;">›</span>${item}
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ⑥ 오버헤드와 성능 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">오버헤드 & 성능 고려사항</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        ${[
          {
            label: '디스패처 지연(Dispatcher Latency)',
            desc: '문맥교환에 소요되는 순수 시간. 이 시간 동안 CPU는 사용자 프로세스를 실행하지 못한다. 운영체제 설계의 핵심 최적화 대상.',
            accent: true,
          },
          {
            label: '캐시 오염(Cache Pollution)',
            desc: '프로세스 전환 시 이전 프로세스가 캐시에 올려둔 데이터가 무효화된다. 새 프로세스는 콜드 캐시에서 시작하므로 초기 실행 속도가 느려진다.',
          },
          {
            label: 'TLB 플러시(TLB Flush)',
            desc: 'TLB(Translation Lookaside Buffer)는 페이지 테이블 캐시. 주소 공간이 바뀌면 TLB를 플러시해야 한다. ASID(Address Space ID) 태깅으로 플러시를 줄일 수 있다.',
          },
          {
            label: '성능 개선 방법',
            desc: '스레드 전환(프로세스 내 스레드 간 전환)은 주소 공간이 공유되므로 TLB 플러시 없이 레지스터만 교환 → 문맥교환보다 빠름. 하드웨어 지원(인텔 TSS)으로도 오버헤드 감소 가능.',
          },
        ].map(({ label, desc, accent }) => `
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${accent?ACCENT:MID};
              margin-top:5px;flex-shrink:0;"></div>
            <div style="flex:1;">
              <span style="font-size:13px;font-weight:700;color:${accent?ACCENT:'var(--text-primary,#2C2825)'};">
                ${label}</span>
              <span style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;"> — ${desc}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ⑦ 스레드 vs 프로세스 문맥교환 비교 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">프로세스 vs 스레드 문맥교환 비교</div>
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;font-family:${FONT};">
        <table class="cc-table" style="min-width:440px;">
          <thead>
            <tr><th>구분</th><th>프로세스 문맥교환</th><th>스레드 문맥교환</th></tr>
          </thead>
          <tbody>
            ${[
              ['주소 공간',     '별도 (가상 주소 공간 교체)', '공유 (같은 프로세스 내)'],
              ['TLB 플러시',   '필요 (주소 공간 변경)',      '불필요 (주소 공간 동일)'],
              ['저장 항목',    'PCB 전체 (레지스터+메모리맵+파일 등)', '레지스터·스택·PC 위주'],
              ['비용',        '높음 (Heavy)',               '낮음 (Light) — 경량 전환'],
              ['캐시 오염',    '심각 (새 프로세스로 교체)',   '상대적으로 경미'],
            ].map(([label, proc, thread]) => `
              <tr>
                <td style="font-weight:700;color:var(--text-secondary,#6B6560);">${label}</td>
                <td>${proc}</td>
                <td style="color:${ACCENT};font-weight:600;">${thread}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- ⑧ 다른 개념과 비교 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">다른 개념과 비교</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        ${[
          {
            label: '디스패처 (Dispatcher) — 운영체제',
            title: '문맥교환 실행 주체',
            desc: '스케줄러가 "누구"를 선택하면, <strong>디스패처</strong>가 실제 레지스터 적재·모드 전환·PC 점프를 수행한다. 디스패처 지연(Dispatcher Latency)이 문맥교환의 순수 오버헤드다.',
          },
          {
            label: 'CPU 스케줄링 — 운영체제',
            title: '문맥교환의 전제 조건',
            desc: '스케줄러는 <strong>어떤 프로세스를 실행할지 결정</strong>하는 정책(FCFS·SJF·RR 등)이고, 문맥교환은 그 결정을 실제로 <strong>구현</strong>하는 메커니즘이다. 정책과 메커니즘은 별개.',
          },
          {
            label: '인터럽트 처리 — 운영체제',
            title: '문맥교환과 구별',
            desc: '인터럽트 발생 시 커널 스택에 현재 상태를 저장하는 것은 <strong>인터럽트 처리</strong>이며, 다른 프로세스로 전환하는 <strong>문맥교환</strong>과는 구별된다. 인터럽트가 문맥교환을 유발하는 트리거가 될 수 있다.',
          },
        ].map(({ label, title, desc }) => `
          <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:12px 14px;">
            <div style="font-size:10px;font-weight:700;color:var(--text-tertiary,#A09890);
              letter-spacing:.06em;margin-bottom:4px;">${label}</div>
            <div style="font-size:13px;font-weight:700;color:var(--text-primary,#2C2825);margin-bottom:4px;">${title}</div>
            <div style="font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;">${desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ⑨ 논술 답안 구조 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-family:${FONT};">
        ${[
          {
            label: '개념 정의',
            items: [
              '문맥교환의 정의: CPU 실행 프로세스 교체 시 현재 상태 저장 + 새 프로세스 상태 복원',
              '문맥(Context)의 정의: PCB에 저장되는 CPU 상태 정보 전체',
            ]
          },
          {
            label: '발생 조건 및 절차',
            items: [
              '트리거: 타이머 인터럽트 / I/O 요청 / 시스템 콜 / 고우선순위 프로세스 도착',
              '절차: ①P1 상태 저장(PCB₁) → ②P1 큐 이동 → ③P2 선택 → ④P2 상태 복원(PCB₂) → ⑤P2 실행',
            ]
          },
          {
            label: 'PCB 구성 & 역할',
            items: [
              'PCB 저장 항목: PC·레지스터·SP·플래그·메모리 맵·파일 디스크립터 등',
              'PCB가 없으면 중단된 프로세스의 재개 불가',
            ]
          },
          {
            label: '오버헤드 & 의의',
            items: [
              '문맥교환 중 CPU는 유용한 작업 수행 불가 → 순수 오버헤드(Dispatcher Latency)',
              '멀티태스킹 구현의 핵심 메커니즘 / 스레드 전환은 프로세스 전환보다 경량',
            ]
          },
        ].map(({ label, items }) => `
          <div style="padding:10px 14px;background:var(--bg-surface,#F0EDE8);border-radius:8px;line-height:1.8;">
            <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);
              letter-spacing:.04em;margin-bottom:6px;">${label}</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              ${items.map((item, i) => `
                <div style="display:flex;gap:7px;align-items:flex-start;">
                  ${grayBall(i+1)}
                  <span style="color:var(--text-primary,#2C2825);">${item}</span>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- ⑩ 체크 포인트 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;font-family:${FONT};">
        ${[
          {
            label: '혼동 주의', labelColor: '#D05840',
            text: '<strong>문맥교환 ≠ CPU 스케줄링.</strong> 스케줄링은 "누구를 실행할지 결정"하는 정책, 문맥교환은 그 결정을 "실제로 구현"하는 메커니즘이다. 시험에서 두 개념을 혼용하지 않도록 주의.',
          },
          {
            label: '혼동 주의', labelColor: '#D05840',
            text: '<strong>문맥교환 ≠ 인터럽트 처리.</strong> 인터럽트 발생 시 커널 스택 저장은 인터럽트 처리이고, 다른 프로세스로의 전환이 문맥교환이다. 인터럽트는 문맥교환을 유발하는 트리거일 수 있다.',
          },
          {
            label: '핵심 암기', labelColor: '#2D8A6A',
            text: '<strong>PCB 저장 핵심 3요소:</strong> 프로그램 카운터(PC) + 범용 레지스터 + 스택 포인터(SP). 이 세 가지가 없으면 프로세스 재개 불가.',
          },
          {
            label: '핵심 암기', labelColor: '#2D8A6A',
            text: '<strong>스레드 문맥교환 &lt; 프로세스 문맥교환</strong>: 스레드는 주소 공간을 공유하므로 TLB 플러시 없이 레지스터만 교환 → 경량(Light-Weight).',
          },
        ].map(({ label, labelColor, text }) => `
          <div style="background:var(--bg-surface,#F0EDE8);border-radius:8px;
            padding:10px 14px;border-left:3px solid ${labelColor};">
            <div style="margin-bottom:5px;">
              <span style="background:${labelColor};color:white;border-radius:20px;
                padding:1px 8px;font-size:10px;font-weight:700;">${label}</span>
            </div>
            <div style="color:var(--text-primary,#2C2825);line-height:1.75;">${text}</div>
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ═══════════════════════════════════════════
     2. 리마인드 (퀴즈)
  ═══════════════════════════════════════════ */
  const QUIZ_DATA = [
    /* OX */
    { type:'ox',   q:'문맥교환(Context Switch)이 발생하는 동안 CPU는 사용자 프로세스의 유용한 작업을 수행할 수 없다.', answer:'O', explain:'문맥교환 시간은 레지스터 저장·복원에 사용되므로 순수 오버헤드(Dispatcher Latency)다.' },
    { type:'ox',   q:'문맥교환 시 저장되는 정보에는 프로그램 카운터(PC), 범용 레지스터, 스택 포인터(SP)가 포함된다.', answer:'O', explain:'이 세 가지가 문맥(Context)의 핵심 구성 요소이며 PCB에 저장된다.' },
    { type:'ox',   q:'프로세스 문맥교환과 스레드 문맥교환은 TLB 플러시 필요 여부가 동일하다.', answer:'X', explain:'프로세스 문맥교환은 주소 공간이 바뀌므로 TLB 플러시가 필요하지만, 같은 프로세스 내 스레드 전환은 주소 공간이 공유되어 TLB 플러시가 불필요하다.' },
    { type:'ox',   q:'CPU 스케줄링과 문맥교환은 동일한 개념이다.', answer:'X', explain:'스케줄링은 "어떤 프로세스를 실행할지 결정"하는 정책이고, 문맥교환은 그 결정을 "실제로 구현"하는 메커니즘이다.' },
    { type:'ox',   q:'PCB(Process Control Block)에는 열린 파일 목록(파일 디스크립터)이 포함된다.', answer:'O', explain:'PCB는 CPU 상태 정보 외에도 열린 파일 목록, I/O 장치 정보, 메모리 맵 등 프로세스 관리에 필요한 모든 정보를 담는다.' },
    /* 빈칸 */
    { type:'fill', q:'문맥교환 시 현재 실행 중인 프로세스의 CPU 상태 정보를 저장하는 운영체제의 자료구조를 (   )(이)라 한다.', answer:'PCB(Process Control Block)', explain:'PCB는 PID, PC, 레지스터, SP, 프로세스 상태, 메모리 맵 등을 저장하며 문맥교환의 저장·복원 대상이다.' },
    { type:'fill', q:'문맥교환에서 스케줄러가 선택한 프로세스에게 실제로 CPU를 넘기고 레지스터를 적재·모드 전환을 수행하는 운영체제 컴포넌트를 (   )(이)라 한다.', answer:'디스패처(Dispatcher)', explain:'디스패처는 문맥교환을 실제로 수행하며, 디스패처가 소요하는 시간을 디스패처 지연(Dispatcher Latency)이라 한다.' },
    { type:'fill', q:'프로세스가 CPU 실행을 대기하는 상태를 (   ) 상태, I/O 완료를 기다리는 상태를 (   ) 상태라 한다.', answer:'Ready / Waiting(Blocked)', explain:'Ready: CPU만 할당받으면 실행 가능한 상태. Waiting(Blocked): I/O 등 특정 이벤트가 완료될 때까지 기다리는 상태.' },
    /* 객관식 */
    { type:'mc', q:'문맥교환에 대한 설명으로 옳지 않은 것은?',
      options:[
        '① 문맥교환 중 CPU는 유용한 사용자 작업을 수행하지 못한다.',
        '② 문맥교환 시 프로그램 카운터(PC)와 범용 레지스터가 PCB에 저장된다.',
        '③ 스레드 문맥교환은 주소 공간을 교체하므로 TLB 플러시가 필요하다.',
        '④ 인터럽트나 시스템 콜이 문맥교환의 트리거가 될 수 있다.',
      ],
      answer: 2,
      explain: '③ 같은 프로세스 내 스레드 전환은 주소 공간을 공유하므로 TLB 플러시가 필요하지 않다. 이것이 스레드 문맥교환이 프로세스 문맥교환보다 가벼운 이유다.',
    },
    { type:'mc', q:'다음 중 PCB에 저장되는 정보가 아닌 것은?',
      options:[
        '① 프로그램 카운터 (PC)',
        '② 스택 포인터 (SP)',
        '③ 프로세스가 사용 중인 알고리즘 소스 코드',
        '④ 열린 파일 디스크립터 목록',
      ],
      answer: 2,
      explain: '③ 프로세스의 소스 코드는 PCB에 저장되지 않는다. PCB는 CPU 상태(PC·레지스터·SP·플래그), 프로세스 식별 정보, 메모리 맵, 열린 파일 목록, 스케줄링 정보 등을 저장한다.',
    },
    { type:'mc', q:'다음 설명에서 (가)에 해당하는 용어는?<br><br><em>"(가)은/는 단기 스케줄러가 선택한 프로세스에게 CPU 제어권을 실제로 넘기는 역할을 하며, 레지스터 적재, 사용자 모드 전환, 프로그램 카운터 점프를 수행한다. (가)이/가 소요하는 시간은 문맥교환의 순수 오버헤드다."</em>',
      options:[
        '① 스케줄러 (Scheduler)',
        '② 디스패처 (Dispatcher)',
        '③ 인터럽트 핸들러 (Interrupt Handler)',
        '④ 세마포어 (Semaphore)',
      ],
      answer: 1,
      explain: '② 디스패처(Dispatcher)다. 스케줄러가 "누구를 실행할지" 결정하면, 디스패처가 "실제로 CPU를 넘기는" 작업을 수행한다.',
    },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;

    const state = {}; // { index: { revealed, selected } }
    QUIZ_DATA.forEach((_, i) => state[i] = { revealed: false, selected: null });

    function typeLabel(type) {
      if (type === 'ox')   return C.quiz.typeOX;
      if (type === 'fill') return C.quiz.typeFill;
      return C.quiz.typeMC;
    }

    function buildHTML() {
      let html = `<div style="display:flex;align-items:center;justify-content:space-between;
        margin-bottom:16px;flex-wrap:wrap;gap:8px;font-family:${FONT};">
        <div style="font-size:14px;font-weight:700;color:var(--text-primary,#2C2825);">
          ${C.quiz.title} — 총 ${QUIZ_DATA.length}문항</div>
        <button onclick="ctxResetQuiz()"
          style="padding:5px 14px;border-radius:20px;border:1px solid var(--border-light);
          background:var(--bg-white,#fff);font-size:12px;color:var(--text-secondary,#6B6560);
          cursor:pointer;font-family:${FONT};">${C.quiz.btnReset}</button>
      </div>`;

      QUIZ_DATA.forEach((q, i) => {
        const st = state[i];
        const revealed = st.revealed;

        let answerHTML = '';
        if (q.type === 'ox') {
          answerHTML = `<div style="display:flex;gap:8px;margin-top:10px;">
            ${['O','X'].map(opt => {
              let bg = 'var(--bg-surface,#F0EDE8)'; let clr = 'var(--text-primary,#2C2825)';
              if (revealed) {
                if (opt === q.answer) { bg = '#EBF5EA'; clr = '#2E6A28'; }
                else if (st.selected === opt) { bg = '#FDECEA'; clr = '#6E2010'; }
              }
              return `<button onclick="ctxQuizAnswer(${i},'${opt}')"
                style="flex:1;padding:10px;border-radius:8px;border:1.5px solid var(--border-light);
                background:${bg};color:${clr};font-size:16px;font-weight:800;cursor:pointer;
                font-family:${FONT};">${opt}</button>`;
            }).join('')}
          </div>`;
        } else if (q.type === 'mc') {
          answerHTML = `<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
            ${q.options.map((opt, oi) => {
              let bg = 'var(--bg-surface,#F0EDE8)'; let clr = 'var(--text-primary,#2C2825)';
              if (revealed) {
                if (oi === q.answer) { bg = '#EBF5EA'; clr = '#2E6A28'; }
                else if (st.selected === oi) { bg = '#FDECEA'; clr = '#6E2010'; }
              }
              return `<button onclick="ctxQuizAnswer(${i},${oi})"
                style="padding:9px 14px;border-radius:8px;border:1.5px solid var(--border-light);
                background:${bg};color:${clr};font-size:12px;text-align:left;cursor:pointer;
                font-family:${FONT};line-height:1.5;">${opt}</button>`;
            }).join('')}
          </div>`;
        } else {
          // fill
          answerHTML = revealed
            ? `<div style="margin-top:10px;padding:10px 14px;background:#EBF5EA;
                border-radius:8px;font-size:13px;font-weight:700;color:#2E6A28;font-family:${FONT};">
                정답: ${q.answer}</div>`
            : `<button onclick="ctxQuizAnswer(${i},'reveal')"
                style="margin-top:10px;padding:8px 18px;border-radius:20px;
                background:${ACCENT};color:white;border:none;font-size:12px;font-weight:700;
                cursor:pointer;font-family:${FONT};">${C.quiz.btnReveal}</button>`;
        }

        html += `<div class="quiz-card" style="margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="background:${BG};color:${ACCENT};font-size:10px;font-weight:700;
              padding:2px 8px;border-radius:10px;">${typeLabel(q.type)}</span>
            <span style="font-size:11px;color:var(--text-tertiary,#A09890);">Q${i+1}</span>
          </div>
          <div class="quiz-q" style="font-family:${FONT};">${q.q}</div>
          ${answerHTML}
          ${revealed ? `<div style="margin-top:8px;padding:9px 12px;background:var(--bg-surface,#F0EDE8);
            border-radius:7px;font-size:12px;color:var(--text-secondary,#6B6560);line-height:1.7;
            font-family:${FONT};">
            <strong style="color:var(--text-primary,#2C2825);">${C.quiz.explainLabel}:</strong> ${q.explain}
          </div>` : ''}
        </div>`;
      });

      el.innerHTML = html;
    }

    window.ctxQuizAnswer = function(i, val) {
      state[i].selected = val;
      state[i].revealed = true;
      buildHTML();
      setTimeout(() => {
        const cards = el.querySelectorAll('.quiz-card');
        if (cards[i]) cards[i].scrollIntoView({ behavior:'smooth', block:'nearest' });
      }, 50);
    };

    window.ctxResetQuiz = function() {
      QUIZ_DATA.forEach((_, i) => state[i] = { revealed: false, selected: null });
      buildHTML();
    };

    buildHTML();
  }

  /* ═══════════════════════════════════════════
     3. 기출 포인트
  ═══════════════════════════════════════════ */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const freqItems = sortExamItems([
      '문맥교환 시 저장되는 프로그램 카운터(PC), 레지스터 등 CPU 상태 정보를 묻는 문제 [2020중]',
      'PCB 구성 요소(프로세스 상태, PC, 레지스터, 메모리 정보 등) 전반 [2018중]',
      '문맥교환의 정의와 발생 조건 (인터럽트·시스템 콜·타이머 만료) [2016중]',
      '디스패처(Dispatcher)의 역할과 디스패처 지연(Dispatcher Latency) 개념 [2022중]',
      '프로세스 상태 전이 5단계 (New·Ready·Running·Waiting·Terminated)와 전이 조건 [2019중]',
    ]);

    const normalItems = sortExamItems([
      '스레드 문맥교환과 프로세스 문맥교환의 차이 (TLB 플러시 여부, 공유 자원 범위)',
      'CPU 스케줄링 알고리즘(라운드 로빈 등)과 문맥교환 빈도의 상관관계',
      '선점형(Preemptive) vs 비선점형(Non-preemptive) 스케줄링에서 문맥교환 발생 방식',
      'TLB(Translation Lookaside Buffer) 플러시와 캐시 오염이 문맥교환 오버헤드에 미치는 영향',
    ]);

    function listItems(items, accentColor, bgColor) {
      return items.map(text => `
        <div style="display:flex;align-items:flex-start;gap:8px;padding:10px 12px;
          background:${bgColor};border-radius:8px;line-height:1.7;font-family:${FONT};">
          <span style="color:${accentColor};font-weight:700;flex-shrink:0;">›</span>
          <span style="font-size:12px;">${parseExamItem(text)}</span>
        </div>`).join('');
    }

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.history}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;
        line-height:1.95;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong style="color:${ACCENT};">주요 출제 연도:</strong> 2016·2018·2019·2020·2022 중등<br>
        프로세스 관리와 CPU 스케줄링 단원에서 <strong>PCB 구성 요소</strong>,
        <strong>문맥교환 정의 및 절차</strong>, <strong>디스패처 개념</strong>,
        <strong>프로세스 상태 전이</strong>가 집중적으로 출제된다.
        최근 스레드와의 비교 문제 비중이 늘고 있는 추세.
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.freq}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${listItems(freqItems, ACCENT, BG)}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.normal}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${listItems(normalItems, MID, 'var(--bg-surface,#F0EDE8)')}
      </div>
    </div>`;
  }

  /* ═══════════════════════════════════════════
     초기화 & 탭 감시
  ═══════════════════════════════════════════ */
  function init() {
    function tryRender() {
      if ($('tab-summary')) { renderSummary(); renderQuiz(); renderExam(); return true; }
      return false;
    }
    if (!tryRender()) {
      const obs = new MutationObserver(() => { if (tryRender()) obs.disconnect(); });
      obs.observe(document.body, { childList:true, subtree:true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
