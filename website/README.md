# Market Memo 웹사이트

기존 `market-memo`의 Markdown 파일을 옮기거나 복제해서 관리하지 않습니다.

웹사이트 빌드 시 `scripts/prepare_site.py`가 다음 작업을 자동으로 수행합니다.

1. `시황/`, `산업-테마/`, `종목분석/`, `자료정책/`의 Markdown을 `.site-docs/`로 복사
2. 각 폴더의 `README.md`를 웹용 `index.md`로 변환
3. 최근 Git 커밋을 읽어 홈 화면의 최근 문서 카드 생성
4. `website/assets/`의 CSS·JavaScript 적용
5. MkDocs Material이 `.site-output/`에 정적 웹사이트 생성

따라서 새 분석 문서를 기존 폴더에 추가하면 별도의 웹 메뉴 작업 없이 다음 빌드에서 자동 노출됩니다.

## 로컬 미리보기

```bash
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements-site.txt
python scripts/prepare_site.py
mkdocs serve
```

브라우저에서 `http://127.0.0.1:8000/`을 엽니다.

## GitHub Pages 배포

`.github/workflows/pages.yml`이 `main`에 Markdown 또는 웹사이트 관련 파일이 반영될 때 자동으로 빌드·배포합니다.

GitHub Pages를 처음 사용하는 저장소라면 GitHub에서 한 번만 다음 설정이 필요합니다.

`Settings → Pages → Build and deployment → Source → GitHub Actions`

배포 주소는 다음을 기준으로 합니다.

`https://juhwan7.github.io/market-memo/`

## 웹 전용 파일

- `mkdocs.yml` — 사이트·검색·내비게이션·테마 설정
- `scripts/prepare_site.py` — 기존 Markdown을 웹용 문서 트리로 준비
- `website/home.md` — 홈 대시보드 템플릿
- `website/assets/stylesheets/extra.css` — 읽기·카드·배지 스타일
- `website/assets/javascripts/extra.js` — `[확정]`, `[시장 기대]`, `★★★` 등을 배지로 표시
- `.github/workflows/pages.yml` — GitHub Pages 자동 빌드·배포

`.site-docs/`와 `.site-output/`은 빌드 중 생성되는 임시 디렉터리이며 원본 자료가 아닙니다.
