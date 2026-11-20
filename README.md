# NDVM 통합 프로젝트

이 프로젝트는 두 코드베이스를 합친 버전입니다.

- 프론트엔드: NDVM 지도/대시보드/오프라인 안전 기능
- 백엔드: FastAPI 기반 기상청/WMS API 연결
- 추가 기능: 안심 그룹 오프라인 릴레이, 비상용품 관리, 재난문자 티커, 서비스 워커 기반 오프라인 캐시

## 실행 순서

### 1) 백엔드 설정
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload --port 8000
```

`.env`에는 본인 기상청/공공데이터포털 인증키를 넣고, 공개 저장소에 업로드하지 마세요.

### 2) 프론트엔드 실행
브라우저에서 `index.html`을 직접 열거나 로컬 서버를 띄운 뒤 접속합니다.

```powershell
cd .
python -m http.server 5500
```

그 다음 브라우저에서 `http://localhost:5500`에 접속합니다.

### 3) 기본 설정
기본 API 베이스는 `http://127.0.0.1:8000` 입니다. 필요하면 브라우저 콘솔에서 다음을 설정할 수 있습니다.

```js
localStorage.setItem('ndvm-api-base', 'http://127.0.0.1:8000');
```

## 포함된 기능
- 지도 기반 취약지역 시각화
- 기상청 강수량 조회
- 재난문자 타이머/티커
- 비상용품 관리함
- 오프라인 메시지 릴레이 시연
- 서비스 워커 기반 오프라인 활용

## 참고
- 공식 기관 데이터와 API 키는 백엔드에서 관리합니다.
- 실제 민원 접수/자동 전송 기능은 포함하지 않습니다.
- 긴급한 상황에서는 공식 구조 기관(119/112) 또는 관할 기관의 안내를 우선적으로 따르세요.
