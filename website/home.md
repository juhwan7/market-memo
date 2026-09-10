---
hide:
  - toc
---

<div class="mm-hero" markdown>

# Market Memo

**뉴스 한 줄보다, 시장이 움직이는 구조를 남기는 개인 시장 지식베이스.**

한국·미국 증시, 경제지표, 산업·테마, 기업 자료를 `30초 요약 → 5분 이해 → 시장 체크포인트 → 깊게 보기` 흐름으로 연결합니다.

[최근 업데이트](최근-업데이트.md){ .md-button .md-button--primary }
[시황 보기](시황/){ .md-button }
[산업·테마 보기](산업-테마/){ .md-button }

</div>

<div class="mm-stat-grid" markdown>

<div class="mm-stat"><strong>{{DOC_COUNT}}</strong><span>전체 분석 문서</span></div>
<div class="mm-stat"><strong>{{MARKET_COUNT}}</strong><span>시황·일정</span></div>
<div class="mm-stat"><strong>{{THEME_COUNT}}</strong><span>산업·테마</span></div>
<div class="mm-stat"><strong>{{STOCK_COUNT}}</strong><span>종목·기업</span></div>

</div>

## 읽기 관리

분석 문서를 `안 읽음 → 읽는 중 → 읽음`으로 관리하고, 다시 볼 자료는 즐겨찾기에 남길 수 있습니다.

<div class="mm-reading-dashboard" data-mm-reading-dashboard>
  <div class="mm-reading-summary">
    <div class="mm-reading-summary-item"><strong data-mm-count="all">{{DOC_COUNT}}</strong><span>전체</span></div>
    <div class="mm-reading-summary-item"><strong data-mm-count="unread">{{DOC_COUNT}}</strong><span>안 읽음</span></div>
    <div class="mm-reading-summary-item"><strong data-mm-count="reading">0</strong><span>읽는 중</span></div>
    <div class="mm-reading-summary-item"><strong data-mm-count="read">0</strong><span>읽음</span></div>
    <div class="mm-reading-summary-item"><strong data-mm-count="favorite">0</strong><span>즐겨찾기</span></div>
  </div>
  <div class="mm-reading-filter-row" role="group" aria-label="읽기 상태 필터">
    <button type="button" class="mm-reading-filter is-active" data-mm-filter="all" aria-pressed="true">전체 <span data-mm-count="all">{{DOC_COUNT}}</span></button>
    <button type="button" class="mm-reading-filter" data-mm-filter="unread" aria-pressed="false">안 읽음 <span data-mm-count="unread">{{DOC_COUNT}}</span></button>
    <button type="button" class="mm-reading-filter" data-mm-filter="reading" aria-pressed="false">읽는 중 <span data-mm-count="reading">0</span></button>
    <button type="button" class="mm-reading-filter" data-mm-filter="read" aria-pressed="false">읽음 <span data-mm-count="read">0</span></button>
    <button type="button" class="mm-reading-filter" data-mm-filter="favorite" aria-pressed="false">즐겨찾기 <span data-mm-count="favorite">0</span></button>
  </div>
  <p class="mm-reading-dashboard-note">읽기 상태와 즐겨찾기는 이 브라우저의 localStorage에만 저장됩니다. GitHub 저장소나 다른 방문자의 상태에는 영향을 주지 않습니다.</p>
</div>

{{READING_DOCS}}

## 어디부터 볼까

<div class="grid cards mm-section-grid" markdown>

-   :material-chart-line: **시황**

    지수만 보는 게 아니라 금리·환율·유가·수급·경제지표가 왜 시장을 움직였는지 연결해서 봅니다.

    [시황 전체 보기 →](시황/)

-   :material-factory: **산업·테마**

    원전·로봇·대미투자·미국 정책처럼 여러 종목을 함께 움직이는 구조와 재료의 단계를 추적합니다.

    [산업·테마 전체 보기 →](산업-테마/)

-   :material-office-building: **종목·기업**

    사업·실적·공시·밸류에이션·현재 재료를 분리해서 기업을 이해합니다.

    [종목분석 전체 보기 →](종목분석/)

-   :material-clock-outline: **최근 업데이트**

    새로 추가되거나 핵심 내용이 바뀐 자료를 시간순으로 확인합니다.

    [변경 기록 보기 →](최근-업데이트.md)

</div>

## 최근 업데이트

새 문서를 `main`에 추가하면 최근 Git 커밋을 기준으로 이 영역도 자동 갱신됩니다.

{{RECENT_DOCS}}

## 주요 일정·매크로

CPI·PPI·FOMC처럼 시장 전체의 금리 기대를 바꾸는 자료를 우선 모아봅니다.

{{SCHEDULE_DOCS}}

## 이 사이트를 읽는 기준

<div class="grid cards mm-principle-grid" markdown>

-   **[확정]과 [시장 기대]를 분리**

    공식 발표·계약·공시와 아직 가격에 기대만 반영된 내용을 같은 사실처럼 쓰지 않습니다.

-   **숫자보다 ‘왜’에 집중**

    `유가가 100달러다`에서 끝내지 않고 공급·물가·금리·업종으로 어떻게 전달되는지 연결합니다.

-   **재료의 다음 단계를 추적**

    아이디어 → 협의 → 계약 → 수주 → 착공 → 실적 반영처럼 현재 어디까지 왔는지를 봅니다.

-   **새 뉴스가 기존 흐름 어디에 들어가는지 확인**

    문서는 정보 저장소가 아니라 다음 뉴스를 더 빨리 이해하기 위한 기준점으로 사용합니다.

</div>

!!! warning "투자 참고용 개인 메모"
    이 사이트는 개인 학습 및 시장 분석을 위한 자료입니다. 매수·매도 추천이 아니며, 중요한 판단 전에는 공시·정부기관·기업 IR 등 원문을 다시 확인합니다.
