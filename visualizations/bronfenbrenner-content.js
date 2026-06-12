/**
 * 브론펜브레너 생태학적 발달이론 — 탭 콘텐츠
 * 원페이지(1) 교육심리학 기반 / SITE_CONFIG 참조
 */
(function () {
  function $(id) { return document.getElementById(id); }

  const C = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
    summary: { intro:'개요', essay:'논술 답안 구조', check:'체크 포인트' },
    exam:    { freq:'자주 출제', normal:'간헐 출제', history:'기출 연도 현황' },
    quiz:    { title:'리마인드', typeOX:'O / X', typeFill:'빈칸 채우기', typeMC:'객관식',
               btnReveal:'정답 보기', btnRevealed:'정답 확인됨 ✓', btnReset:'전체 초기화', explainLabel:'해설' },
  };

  const ACCENT = '#4EA87A';
  const BG     = '#E6F2EC';
  const FONT   = 'var(--font-body, var(--font-main))';

  if (!document.getElementById('bronf-content-style')) {
    const s = document.createElement('style');
    s.id = 'bronf-content-style';
    s.textContent = `
      .bc-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
      .bc-table-wrap table { min-width:480px; width:100%; border-collapse:collapse; font-size:12px; }
      .bc-table-wrap th {
        padding:9px 12px; text-align:left; font-size:11px; font-weight:700;
        letter-spacing:.04em; border-bottom:2px solid var(--border-light,rgba(0,0,0,.08));
        background:var(--bg-surface,#F0EDE8);
      }
      .bc-table-wrap td {
        padding:9px 12px; border-bottom:1px solid var(--border-light,rgba(0,0,0,.07));
        line-height:1.65; vertical-align:top;
      }
      .bc-table-wrap tr:hover td { background:var(--bg-surface,#F5F5F5); }
      .bc-point-tag {
        display:inline-block; font-size:10px; font-weight:700;
        padding:1px 7px; border-radius:4px; margin-right:6px;
      }
      @media(max-width:560px) { .bc-table-wrap table { min-width:360px; } }
    `;
    document.head.appendChild(s);
  }

  function parseExamItem(text) {
    const m = text.match(/\[(.+?)\]/);
    if (!m) return `<span style="color:var(--text-primary,#2C2825);">${text}</span>`;
    const tag = m[1];
    const body = text.replace(/\s*\[.+?\]/, '').trim();
    return `<span class="bc-point-tag" style="background:${BG};color:${ACCENT};font-weight:700;">${tag}</span><span style="color:var(--text-primary,#2C2825);">${body}</span>`;
  }

  function sortExamItems(items) {
    return [...items].sort((a, b) => {
      const aTag = /\[.+?\]/.test(a), bTag = /\[.+?\]/.test(b);
      if (aTag && !bTag) return -1;
      if (!aTag && bTag) return 1;
      return 0;
    });
  }

  /* ── 1. 핵심정리 ── */
  function renderSummary() {
    const el = $('tab-summary');
    if (!el) return;

    const layers = [
      { num:1, name:'미시체계', nameEn:'Microsystem', color:'#3A8858', bg:'#E6F2EC',
        def:'아동의 발달에 직접적으로 영향을 미치는 환경',
        examples:'가족, 학교, 또래, 놀이터, 유치원, 교회',
        key:'직접 경험하는 가장 가까운 환경' },
      { num:2, name:'중간체계', nameEn:'Mesosystem', color:'#2888C8', bg:'#E4F2FA',
        def:'미시체계들 간의 상호관계',
        examples:'가정↔학교 관계, 가정↔또래 관계, 부모-교사 협력',
        key:'두 개 이상 미시체계의 연결 고리' },
      { num:3, name:'외체계', nameEn:'Exosystem', color:'#C87840', bg:'#FBF0E6',
        def:'아동이 직접 참여하지는 않지만 간접적으로 영향을 미치는 사회적 환경',
        examples:'부모 직장, 이웃, 교육위원회, 사회복지기관, 대중매체',
        key:'간접적 영향 · 아동 비참여' },
      { num:4, name:'거시체계', nameEn:'Macrosystem', color:'#8050B8', bg:'#EEE8F5',
        def:'외체계를 둘러싼 문화적 환경',
        examples:'문화, 관습, 법, 이념, 사회규범',
        key:'사회 전체의 신념·가치 체계' },
      { num:5, name:'시간체계', nameEn:'Chronosystem', color:'#6B6560', bg:'#F0EDE8',
        def:'개인의 전 생애에 걸친 변화와 사회·역사적 환경의 변화 (=연대체계)',
        examples:'부모이혼, 가정폭력, 학교폭력, 남녀평등문제, 역사적 사건',
        key:'시간적 차원 · 생애 변화' },
    ];

    el.innerHTML = `
    <!-- 개요 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.summary.intro}</div>
      <div style="background:${BG};border-radius:10px;padding:14px 18px;font-size:13px;line-height:1.9;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <strong>브론펜브레너(U. Bronfenbrenner)</strong> — 아동 발달에 영향을 미치는 환경을 <strong>다층적 체계</strong>로 파악한 생태학적 이론.<br>
        아동을 둘러싼 직접적 환경(가족관계)뿐만 아니라, 간접적으로 영향을 미칠 수 있는 <strong>사회적 환경</strong>이 어떻게 아동 발달에 영향을 미치는지 보여주는 이론이다.
      </div>
    </div>

    <!-- 기본 특징 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">이론의 특징</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        <div style="display:flex;align-items:flex-start;gap:12px;background:${BG};border-radius:10px;padding:13px 16px;">
          <div style="width:26px;height:26px;border-radius:50%;background:${ACCENT};color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:${ACCENT};margin-bottom:2px;">유전 × 환경 상호작용</div>
            <div style="font-size:12px;color:var(--text-primary,#2C2825);">개인의 발달은 유전과 환경 <strong>모두의 영향</strong>을 받는다. 어느 한쪽만으로 설명 불가능.</div>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;background:${BG};border-radius:10px;padding:13px 16px;">
          <div style="width:26px;height:26px;border-radius:50%;background:${ACCENT};color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:${ACCENT};margin-bottom:2px;">아동 = 능동적 존재</div>
            <div style="font-size:12px;color:var(--text-primary,#2C2825);">아동은 환경에 영향을 받기만 하는 수동적 존재가 아니라, <strong>환경에 영향을 주기도</strong> 하는 능동적 존재이다.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5가지 환경 체계 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">개인을 둘러싼 5가지 환경 체계</div>
      <div style="font-size:12px;color:var(--text-secondary,#6B6560);margin-bottom:14px;line-height:1.7;font-family:${FONT};">
        연령 증가에 따라 발달에 영향을 미치는 지배적 환경은 미시체계에서 바깥층 체계로 점차 이동한다.
      </div>
      <div class="bc-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="min-width:30px;">순</th>
              <th style="min-width:90px;">체계</th>
              <th style="min-width:160px;">정의</th>
              <th style="min-width:180px;">예시</th>
            </tr>
          </thead>
          <tbody>
            ${layers.map(l => `
              <tr>
                <td><div style="width:22px;height:22px;border-radius:50%;background:${l.color};color:white;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;">${l.num}</div></td>
                <td><span style="font-weight:700;color:${l.color};">${l.name}</span><br><span style="font-size:10px;color:var(--text-tertiary,#A09890);">${l.nameEn}</span></td>
                <td style="color:var(--text-primary,#2C2825);">${l.def}</td>
                <td style="color:var(--text-secondary,#6B6560);">${l.examples}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 각 체계 상세 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">체계별 상세 설명</div>
      <div style="display:flex;flex-direction:column;gap:10px;font-family:${FONT};">
        ${layers.map(l => `
          <div style="border-radius:12px;padding:14px 16px;background:${l.bg};border-left:4px solid ${l.color};">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="font-size:14px;font-weight:800;color:${l.color};">${l.name}</span>
              <span style="font-size:10px;color:var(--text-tertiary,#A09890);font-weight:600;">${l.nameEn}</span>
              <span style="margin-left:auto;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:white;color:${l.color};">${l.key}</span>
            </div>
            <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.75;margin-bottom:6px;">${l.def}</div>
            <div style="font-size:11px;color:var(--text-secondary,#6B6560);">예: ${l.examples}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 교육적 시사점 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">교육적 시사점</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:13px 16px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);margin-bottom:3px;">시사점 1</div>
          <div style="font-size:13px;color:var(--text-primary,#2C2825);line-height:1.75;">아동 발달에 직접 영향을 미치는 미시체계에만 집중하는 관점에서 벗어나, <strong>여러 환경체계들 간의 상호관계</strong>의 중요성을 강조했다.</div>
        </div>
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:13px 16px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);margin-bottom:3px;">시사점 2</div>
          <div style="font-size:13px;color:var(--text-primary,#2C2825);line-height:1.75;">아동을 둘러싼 가정교육뿐만 아니라 <strong>사회 전체의 노력</strong>이 함께 요구된다.</div>
        </div>
      </div>
    </div>

    <!-- 다른 이론과 비교 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">다른 이론과 비교</div>
      <div style="display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:13px 16px;">
          <div style="font-size:11px;font-weight:700;color:${ACCENT};margin-bottom:3px;">피아제 인지발달이론과의 비교</div>
          <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.75;">피아제는 아동의 내적 인지 구조 발달에 초점. 브론펜브레너는 외부 환경 체계와의 상호작용을 강조. 두 이론 모두 아동을 능동적 존재로 봄.</div>
        </div>
        <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:13px 16px;">
          <div style="font-size:11px;font-weight:700;color:#C05808;margin-bottom:3px;">비고츠키 사회문화이론과의 비교</div>
          <div style="font-size:12px;color:var(--text-primary,#2C2825);line-height:1.75;">비고츠키는 근접발달영역·비계 등 사회적 상호작용의 <em>메커니즘</em>에 집중. 브론펜브레너는 환경 체계의 <em>구조와 층위</em>를 체계적으로 분류했다는 점에서 다름.</div>
        </div>
      </div>
    </div>

    <!-- 논술 답안 구조 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.essay}</div>
      <div style="background:var(--bg-surface,#F0EDE8);border-radius:10px;padding:14px 18px;font-size:12px;line-height:2;color:var(--text-primary,#2C2825);font-family:${FONT};">
        <div style="margin-bottom:6px;">1. 브론펜브레너 생태학적 발달이론의 기본 관점 (유전×환경, 능동적 존재)</div>
        <div style="margin-bottom:6px;">2. 아동을 둘러싼 5가지 환경 체계 설명 (미시→중간→외→거시→시간)</div>
        <div style="margin-bottom:6px;">3. 각 체계의 정의 + 구체적 예시 제시</div>
        <div style="margin-bottom:6px;">4. 교육적 시사점 (다층 환경의 상호관계 강조, 사회 전체 노력 필요)</div>
        <div>5. 결론: 교사·학교가 미시체계를 넘어 중간체계(가정-학교 연계) 강화를 위해 노력해야 함</div>
      </div>
    </div>

    <!-- 체크 포인트 -->
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#6B6560;">${C.summary.check}</div>
      <div style="font-size:12px;display:flex;flex-direction:column;gap:8px;font-family:${FONT};">
        <div style="border-left:3px solid #D05840;border-radius:0 8px 8px 0;padding:10px 14px;background:var(--bg-white,#fff);">
          <span style="display:inline-block;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;background:#FDECEA;color:#D05840;margin-bottom:5px;">혼동 주의</span>
          <div style="color:var(--text-primary,#2C2825);line-height:1.75;"><strong>외체계 vs 거시체계</strong> — 외체계는 아동이 직접 참여하지 않는 사회적 환경(부모 직장 등). 거시체계는 더 넓은 문화·법·관습 수준. 외체계 ⊂ 거시체계 구조로 외체계가 안쪽임을 주의.</div>
        </div>
        <div style="border-left:3px solid #D05840;border-radius:0 8px 8px 0;padding:10px 14px;background:var(--bg-white,#fff);">
          <span style="display:inline-block;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;background:#FDECEA;color:#D05840;margin-bottom:5px;">혼동 주의</span>
          <div style="color:var(--text-primary,#2C2825);line-height:1.75;"><strong>시간체계</strong>는 고리 밖 별도 차원. 공간적 층위가 아닌 <strong>시간적 차원</strong>이며, 다른 네 체계와 달리 '연대체계'라고도 불린다. 나머지 4개와 별도로 외워야 함.</div>
        </div>
        <div style="border-left:3px solid #2D8A6A;border-radius:0 8px 8px 0;padding:10px 14px;background:var(--bg-white,#fff);">
          <span style="display:inline-block;font-size:10px;font-weight:700;padding:1px 7px;border-radius:4px;background:#E6F2EC;color:#2D8A6A;margin-bottom:5px;">핵심 암기</span>
          <div style="color:var(--text-primary,#2C2825);line-height:1.75;"><strong>미→중→외→거→시</strong> 순서와 각각의 핵심 예시 세트 암기. 2012초 기출은 4가지 진술 중 해당 이론 고르기 형식. "다차원 환경 체계 상호작용", "미시에서 바깥층으로 이동" 문구 숙지 필수.</div>
        </div>
      </div>
    </div>`;
  }

  /* ── 2. 기출 포인트 ── */
  function renderExam() {
    const el = $('tab-exam');
    if (!el) return;

    const freqItems = [
      '5가지 환경 체계의 명칭과 정의, 각 예시 [2012초]',
      '생태학적 이론의 특징 진술 (다차원 환경 상호작용, 미시→바깥 이동) [2012초]',
    ];
    const normalItems = [
      '유전과 환경 모두의 영향을 받는다는 상호작용 관점',
      '아동은 환경에 영향을 주기도 하는 능동적 존재',
      '미시체계에만 집중하는 관점을 넘어선 다층 환경의 중요성',
      '가정교육뿐 아니라 사회적 노력이 함께 필요하다는 시사점',
    ];

    el.innerHTML = `
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.exam.history}</div>
      <div style="background:${BG};border-radius:10px;padding:13px 16px;font-size:12px;line-height:2;color:var(--text-primary,#2C2825);font-family:${FONT};">
        2012초<br>
        <span style="font-size:11px;color:var(--text-tertiary,#A09890);">
          5가지 환경 체계의 정의와 예시, 이론 특징 진술 구별이 핵심. 2012초에서 4개 진술 중 브론펜브레너를 고르는 형식으로 출제됨.
        </span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#A83222;">${C.exam.freq}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${sortExamItems(freqItems).map(item => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;border-left:2px solid #D05840;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title" style="--subject-accent:#8A6010;">${C.exam.normal}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-family:${FONT};">
        ${sortExamItems(normalItems).map(item => `
          <div style="background:var(--bg-surface,#F5F5F5);border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;border-left:2px solid #C8A830;">
            ${parseExamItem(item)}
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── 3. 리마인드 ── */
  const QUIZ_DATA = [
    { type:'ox',
      q:'브론펜브레너는 아동이 직접 접촉하는 환경(가족, 학교 등)인 미시체계만이 발달에 영향을 미친다고 주장했다.',
      answer:'X', explain:'브론펜브레너는 미시체계뿐 아니라 중간체계, 외체계, 거시체계, 시간체계까지 다층적 환경 전체가 발달에 영향을 미친다고 보았다.' },
    { type:'ox',
      q:'브론펜브레너 이론에서 아동은 환경에 영향을 받기만 하는 수동적 존재가 아니라, 환경에 영향을 주기도 하는 능동적 존재이다.',
      answer:'O', explain:'생태학적 이론의 핵심 특징 중 하나. 아동과 환경은 양방향 상호작용 관계에 있다.' },
    { type:'ox',
      q:'중간체계(Mesosystem)란 아동이 직접 참여하지 않지만 간접적으로 영향을 미치는 사회적 환경이다.',
      answer:'X', explain:'그 설명은 외체계(Exosystem)이다. 중간체계는 미시체계들 간의 상호관계(예: 가정↔학교 관계)를 말한다.' },
    { type:'ox',
      q:'시간체계(Chronosystem)는 다른 4개 체계와 달리 공간적 층위가 아닌 시간적 차원을 나타내며, 연대체계라고도 불린다.',
      answer:'O', explain:'시간체계는 개인의 전 생애 변화와 사회·역사적 환경 변화를 포함하며, 동심원 구조 밖의 별도 차원이다.' },
    { type:'ox',
      q:'브론펜브레너는 개인의 발달은 유전보다 환경에 더 큰 영향을 받는다고 주장했다.',
      answer:'X', explain:'브론펜브레너는 유전과 환경 모두의 영향을 받는다고 주장했다. 어느 한쪽을 더 강조하지 않는다.' },
    { type:'fill',
      q:'브론펜브레너의 생태학적 이론에서 아동이 직접 참여하지는 않지만 간접적으로 영향을 미치는 환경 — 부모 직장, 교육위원회, 대중매체 등이 해당하는 체계는 (   )이다.',
      answer:'외체계', explain:'외체계(Exosystem)는 아동이 직접 관여하지 않는 사회적 환경으로, 부모 직장, 이웃, 교육위원회, 사회복지기관, 대중매체 등이 포함된다.' },
    { type:'fill',
      q:'브론펜브레너 이론에서 5개 체계 중 유일하게 공간적 층위가 아닌 (   )적 차원을 나타내는 체계는 시간체계이다.',
      answer:'시간', explain:'시간체계(Chronosystem)는 개인의 전 생애에 걸친 변화와 사회·역사적 환경 변화를 다루는, 동심원 구조와 구분되는 시간적 차원이다.' },
    { type:'mc',
      q:'다음 중 브론펜브레너의 거시체계(Macrosystem)에 해당하는 예로 가장 적절한 것은?',
      options:['가정과 학교의 상호관계', '부모의 직장 환경과 근무 시간', '사회 전반의 문화, 관습, 법', '아동이 다니는 학교와 또래 집단'],
      answer:2,
      explain:'거시체계는 외체계를 둘러싼 문화적 환경으로, 문화·관습·법·이념·사회규범 등이 포함된다. ①은 중간체계, ②는 외체계, ④는 미시체계에 해당한다.' },
    { type:'mc',
      q:'브론펜브레너(U. Bronfenbrenner)의 생태학적 이론에 대한 설명으로 옳지 않은 것은?',
      options:[
        '개인의 발달은 유전과 환경 모두의 영향을 받는다.',
        '미시체계들 간의 상호관계를 중간체계라 한다.',
        '아동 발달에 영향을 미치는 환경은 연령 증가에 따라 미시체계에서 바깥 체계로 이동한다.',
        '아동은 환경에 일방적으로 영향을 받는 수동적 존재이다.',
      ], answer:3,
      explain:'브론펜브레너는 아동을 환경에 영향을 주기도 하는 능동적 존재로 보았다. 나머지 보기는 모두 옳은 설명이다. [2012초 유형]' },
    { type:'mc',
      q:'다음 중 브론펜브레너의 중간체계(Mesosystem)에 해당하는 예로 적절한 것은?',
      options:['아동이 다니는 교회와 또래 집단', '부모와 교사 간의 협력 관계', '남녀평등에 관한 사회적 이념', '아동의 부모이혼 경험'],
      answer:1,
      explain:'중간체계는 미시체계들 간의 상호관계. 부모-교사 협력은 가정(미시)↔학교(미시) 간의 관계로 중간체계에 해당한다. ①은 두 미시체계 나열이지 상호관계 아님, ③은 거시체계, ④는 시간체계.' },
  ];

  function renderQuiz() {
    const el = $('tab-quiz');
    if (!el) return;
    let state = QUIZ_DATA.map(() => ({ revealed:false, selected:null }));

    function renderAll() {
      el.innerHTML = `
      <div class="detail-section">
        <div class="detail-section-title" style="--subject-accent:${ACCENT};">${C.quiz.title} — 총 ${QUIZ_DATA.length}문항</div>
        <div style="font-size:12px;color:var(--text-tertiary,#A09890);margin-bottom:16px;font-family:${FONT};">답을 생각한 후 버튼을 눌러 확인하세요.</div>
        ${QUIZ_DATA.map((q,i) => {
          const s = state[i];
          let qBody = '';
          if (q.type === 'ox') {
            qBody = `<div style="display:flex;gap:8px;margin-top:10px;">
              ${['O','X'].map(ans => {
                const isSel = s.selected === ans, isCorr = q.answer === ans;
                let border = '1.5px solid var(--border-light,#e0ddd8)', bg = 'var(--bg-white,#fff)', color = 'var(--text-primary,#2C2825)';
                if (s.revealed && isSel) { border = `1.5px solid ${isCorr?'#4EA87A':'#D05840'}`; bg = isCorr?'#EBF5EA':'#FDECEA'; color = isCorr?'#1E5A3C':'#A83222'; }
                else if (isSel) { border = `1.5px solid ${ACCENT}`; bg = 'var(--bg-surface,#f7f4f0)'; }
                return `<button onclick="bronfQuizOX(${i},'${ans}')" style="flex:1;padding:9px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">${ans}</button>`;
              }).join('')}
            </div>`;
          } else if (q.type === 'fill') {
            qBody = `<div style="margin-top:10px;">
              ${s.revealed
                ? `<div style="padding:9px 14px;border-radius:8px;background:${BG};border:1.5px solid ${ACCENT};font-size:12px;font-weight:700;color:${ACCENT};font-family:${FONT};">정답: ${q.answer}</div>`
                : `<button onclick="bronfQuizReveal(${i})" style="width:100%;padding:9px;border-radius:8px;border:1.5px solid var(--border-light,#e0ddd8);background:var(--bg-white,#fff);font-size:12px;font-weight:600;cursor:pointer;color:var(--text-secondary,#6B6560);font-family:inherit;">${C.quiz.btnReveal}</button>`}
            </div>`;
          } else {
            qBody = `<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
              ${q.options.map((opt,oi) => {
                let border = '1.5px solid var(--border-light,#e0ddd8)', bg = 'var(--bg-white,#fff)', color = 'var(--text-primary,#2C2825)';
                if (s.revealed) { if (oi === q.answer) { border = `1.5px solid ${ACCENT}`; bg = BG; color = ACCENT; } else if (s.selected === oi) { border = '1.5px solid #D05840'; bg = '#FDECEA'; color = '#A83222'; } }
                else if (s.selected === oi) { border = `1.5px solid ${ACCENT}`; bg = 'var(--bg-surface,#f7f4f0)'; }
                return `<button onclick="bronfQuizMC(${i},${oi})" style="text-align:left;padding:9px 12px;border-radius:8px;border:${border};background:${bg};color:${color};font-size:12px;cursor:pointer;font-family:inherit;line-height:1.5;white-space:pre-line;"><span style="font-weight:700;margin-right:6px;">${oi+1}.</span>${opt}</button>`;
              }).join('')}
            </div>`;
          }
          const explain = s.revealed ? `
            <div style="margin-top:10px;background:${BG};border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.7;color:var(--text-primary,#2C2825);border-left:3px solid ${ACCENT};font-family:${FONT};">
              <strong style="color:${ACCENT};">${C.quiz.explainLabel}</strong> ${q.explain}
            </div>` : '';
          const typeLabel = q.type==='ox'?C.quiz.typeOX:q.type==='fill'?C.quiz.typeFill:C.quiz.typeMC;
          return `
          <div style="background:var(--bg-white,#fff);border:1px solid var(--border-light,#e8e4de);border-radius:12px;padding:16px;margin-bottom:12px;">
            <div style="font-size:11px;font-weight:700;color:var(--text-tertiary,#A09890);margin-bottom:6px;font-family:${FONT};">${typeLabel}</div>
            <div style="font-size:13px;font-weight:600;color:var(--text-primary,#2C2825);line-height:1.6;font-family:${FONT};white-space:pre-line;">${i+1}. ${q.q}</div>
            ${qBody}${explain}
          </div>`;
        }).join('')}
        <div style="text-align:center;margin-top:8px;">
          <button onclick="bronfQuizReset()" style="padding:10px 28px;border-radius:20px;border:1.5px solid var(--border-light,#e0ddd8);background:var(--bg-surface,#F0EDE8);font-size:13px;cursor:pointer;color:var(--text-secondary,#6B6560);font-family:inherit;">${C.quiz.btnReset}</button>
        </div>
      </div>`;
    }

    window.bronfQuizOX     = (i, ans) => { state[i].selected = ans; state[i].revealed = true; renderAll(); };
    window.bronfQuizReveal = i         => { state[i].revealed = true; renderAll(); };
    window.bronfQuizMC     = (i, oi)   => { state[i].selected = oi; state[i].revealed = true; renderAll(); };
    window.bronfQuizReset  = ()        => { state = QUIZ_DATA.map(() => ({ revealed:false, selected:null })); renderAll(); };
    renderAll();
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
