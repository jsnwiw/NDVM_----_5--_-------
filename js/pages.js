/* NDVM - Content Pages (Home, Disaster Analysis, Safety Guide, About, Help) */

function homePage() {
  const faq = [
    ['메뉴는 어디에 있나요?', '화면 오른쪽 위의 메뉴 버튼을 누르면 지도, 강수량, 대피시설, 안전동행 등의 기능을 선택할 수 있습니다.'],
    ['취약도 점수는 실시간 위험을 의미하나요?', '아니요. 과거 자료를 바탕으로 계산한 교육용 시범 지표이며 실제 재난 발생 가능성이나 정부의 공식 위험등급이 아닙니다.'],
    ['안전동행에서 만든 문서가 자동으로 제출되나요?', '아니요. 신고서는 직접 복사하거나 저장해 관할 기관의 공식 접수 창구에 제출해야 합니다.'],
    ['구호물자 매칭으로 실제 물품을 주고받을 수 있나요?', '현재는 예시 데이터와 사용 중인 기기에서 등록한 목록끼리 비교하는 시연 기능입니다. 실제 지원 연결은 이루어지지 않습니다.'],
    ['비상용품 관리함은 어떻게 활용하나요?', '물품 이름과 현재 수량, 목표 수량, 유통기한 또는 점검일을 등록하면 보충할 목록을 따로 내보낼 수 있습니다. 기록은 사용 중인 기기에 저장됩니다.'],
    ['안심 그룹으로 인터넷 없이 자동 메시지를 보낼 수 있나요?', '현재 웹 버전은 자동 블루투스 전파가 아닙니다. 미리 사이트를 열어 두고 QR·전달 코드·파일을 사람 사이에 직접 교환하는 오프라인 릴레이 시연입니다. 전달이나 수신을 보장하지 않습니다.'],
    ['인터넷이 없어도 이용할 수 있나요?', '비상용품 관리함과 안심 그룹은 브라우저에 저장된 데이터를 사용합니다. 사이트의 오프라인 캐시는 인터넷 연결 중 한 번 열고 준비해야 하며, HTTPS 또는 localhost에서 지원됩니다. 지도 배경과 공공데이터 조회는 인터넷이나 별도 서버가 필요할 수 있습니다.']
  ];
  return `<div class="home">
    <section class="hero"><span class="hero-tag">NATURAL DISASTER VULNERABILITY MAP</span>
      <h1>재난을 이해하고,<br><em>안전을 준비하다.</em></h1>
      <p>우리 지역의 자연재해 정보를 더 쉽고 명확하게.<br>위험을 살펴보고, 필요한 안전 도구도 직접 이용하세요.</p>
      <div class="hero-buttons">
        <button type="button" data-page="map" class="btn primary">취약도 지도 보기 <span aria-hidden="true">→</span></button>
        <button type="button" data-page="action" class="btn">안전동행 바로가기 <span aria-hidden="true">›</span></button>
      </div>
    </section>
    <div class="home-bottom">
      <span>필요한 기능은 오른쪽 위 메뉴에서 확인할 수 있습니다.</span>
      <button type="button" class="text-link" data-page="about">프로젝트 소개 →</button>
    </div>
    <section class="home-help" id="home-help" aria-labelledby="home-help-heading">
      <div class="home-help-intro"><span class="eyebrow">HELP & CONTACT</span><h2 id="home-help-heading">이용 안내 및 문의</h2><p>자주 묻는 질문을 확인하거나 문의할 내용을 정리할 수 있습니다.</p></div>
      <div class="home-help-grid">
        <div class="home-help-faq"><h3>자주 묻는 질문</h3>
          ${faq.map(([q,a]) => `<details class="home-help-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
        </div>
        <div class="home-help-contact"><h3>문의 내용 작성</h3><p>궁금한 점이나 의견을 적으면 문의 내용을 복사할 수 있습니다.</p>
          <label for="home-inquiry">문의 내용</label>
          <textarea id="home-inquiry" rows="6" maxlength="1000" placeholder="문의나 개선 의견을 입력하세요."></textarea>
          <button type="button" id="home-inquiry-copy" class="btn primary">문의 내용 복사</button>
          <p id="home-inquiry-status" role="status" aria-live="polite" class="safety-hint">※ 실제 문의는 학교 프로젝트 담당자에게 별도로 전달해야 합니다. 이 버튼은 메시지를 전송하지 않습니다.</p>
        </div>
      </div>
    </section>
  </div>`;
}

function disasterPage() {
  const info = DISASTER[state.disaster];
  return `<div class="page narrow">${head('01 / DISASTER ANALYSIS', '재해 유형별 분석', '관심 있는 재해를 선택해 주요 위험요인과 분석 화면 구성을 확인하세요.')}
    ${chips(TYPES, state.disaster, 'disaster')}
    <section class="feature panel"><div class="feature-letter" aria-hidden="true">D</div><div><span class="little-label">OVERVIEW</span><h2>${esc(state.disaster)} 분석 개요</h2><p>${esc(info[0])}</p></div></section>
    <h3 class="section-label">주요 분석 항목</h3>
    <div class="card-grid">${info.slice(1).map((item, i) => `<article class="card panel"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(item)}</h3><p>공공데이터를 기반으로 위험 요인을 분석합니다.</p></article>`).join('')}</div>
    <div class="action-banner panel"><div><span class="little-label">MAP VIEW</span><h3>지도에서 직접 확인하기</h3><p>선택한 재해의 지역별 취약도를 시각적으로 탐색합니다.</p></div><button type="button" class="btn primary" data-page="map">지도 화면 보기 →</button></div>
  </div>`;
}

function guidePage() {
  const [title, ...items] = GUIDES[state.guideIndex];
  return `<div class="page narrow">${head('06 / SAFETY GUIDE', '재난 행동요령', '재난 유형별 대피 원칙과 비상시 행동 요령을 확인하세요.')}
    <div class="chips" role="group" aria-label="재난 유형 선택">${GUIDES.map(([name], i) => `<button type="button" class="chip ${state.guideIndex === i ? 'active' : ''}" data-guide="${i}">${esc(name)}</button>`).join('')}</div>
    <section class="feature panel"><div class="feature-letter" aria-hidden="true">G</div><div><span class="little-label">SAFETY PRINCIPLES</span><h2>${esc(title)} 발생 시 기본 원칙</h2><p>신속한 상황 판단과 침착한 대응이 가장 중요합니다.</p></div></section>
    <h3 class="section-label">단계별 행동요령</h3>
    <div class="card-grid">${items.map((text, i) => `<article class="card panel"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>단계 ${i + 1}</h3><p>${esc(text)}</p></article>`).join('')}</div>
    ${note('※ 본 행동요령은 행정안전부 국민안전포털의 표준 재난대응 지침을 기반으로 작성되었습니다.')}
  </div>`;
}

function aboutPage() {
  return `<div class="page narrow">${head('07 / ABOUT PROJECT', '프로젝트 소개', '자연재해 정보를 쉽게 탐색할 수 있는 데이터 기반 정보 서비스입니다.')}
    <section class="about-hero panel"><span class="big-n" aria-hidden="true">N</span><div><span class="little-label">PROJECT NDVM</span><h2>자연재해 취약지역 지도 대시보드</h2><p>지역별 위험요인과 재난 안전정보를 찾아보기 쉽게 전달하기 위해 기획한 교육용 웹 프로젝트입니다.</p></div></section>
    <div class="card-grid two">
      <article class="card panel"><span class="num">PURPOSE</span><h3>프로젝트 목표</h3><p>자연재해 관련 공공데이터를 사용자가 쉽게 탐색할 수 있도록 구성</p></article>
      <article class="card panel"><span class="num">DESIGN</span><h3>UI/UX 설계 원칙</h3><p>직관적인 홈 화면, 통합 대시보드 메뉴, 일관된 화면 구성과 넓은 여백</p></article>
    </div>
    <section class="timeline panel">
      <h2>개발 일정</h2>
      <div class="timeline-row"><b>11월 9일</b><strong>2차 중간점검</strong><span>UI 구조 및 주요 화면 시연</span></div>
      <div class="timeline-row"><b>11월 말</b><strong>최종 발표</strong><span>기능 연동 및 사용성 개선</span></div>
    </section>
    ${note('※ 실제 공공데이터 출처: 행정안전부 재해연보, 기상청 ASOS 관측망, 산림청 산사태정보, 공공데이터포털(data.go.kr, odcloud.kr).')}
  </div>`;
}

