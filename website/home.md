---
hide:
  - toc
---

<div class="mm-hero" markdown>

# Market Memo

**많이 모으기보다, 시장을 움직이는 핵심만 빠르게 이해하는 개인 시장 메모.**

한국·미국 증시, 경제지표, 산업·테마, 기업 자료를 `1분 핵심 → 왜 중요한가 → 핵심 근거 → 앞으로 볼 것` 순서로 짧게 정리합니다.

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

    오늘 시장을 지배한 2~3개 변수와 수급·환율·선물의 방향만 빠르게 연결해서 봅니다.

    [시황 전체 보기 →](시황/)

-   :material-factory: **산업·테마**

    테마가 생긴 이유, 실제 확정된 변화, 직접 연결되는 기업과 다음 촉매만 추립니다.

    [산업·테마 전체 보기 →](산업-테마/)

-   :material-office-building: **종목·기업**

    무슨 회사인지, 왜 움직이는지, 실제 사업·실적 연결과 핵심 리스크만 봅니다.

    [종목분석 전체 보기 →](종목분석/)

-   :material-clock-outline: **최근 업데이트**

    새로 추가되거나 핵심 내용이 바뀐 자료를 시간순으로 확인합니다.

    [변경 기록 보기 →](최근-업데이트.md)

</div>

## 최근 업데이트

새 문서를 `main`에 추가하면 최근 Git 커밋을 기준으로 이 영역도 자동 갱신됩니다.

{{RECENT_DOCS}}

## 주요 일정·매크로

CPI·PPI·FOMC처럼 시장 전체의 방향을 바꿀 수 있는 일정만 우선 봅니다.

{{SCHEDULE_DOCS}}

## 이 사이트를 읽는 기준

<div class="grid cards mm-principle-grid" markdown>

-   **핵심부터 읽기**

    첫 화면의 `1분 핵심`만 읽어도 사건, 시장 의미, 다음 확인사항이 이해되게 작성합니다.

-   **[확정]과 [시장 기대]를 분리**

    공식 발표·계약·공시와 아직 가격에 기대만 반영된 내용을 같은 사실처럼 쓰지 않습니다.

-   **숫자보다 ‘왜’에 집중**

    결론을 바꾸는 숫자만 남기고 원인 → 시장 영향의 연결을 우선합니다.

-   **불필요한 정보는 과감히 삭제**

    긴 배경, 반복 설명, 관련주 나열보다 다음 판단에 필요한 핵심 근거를 남깁니다.

</div>

!!! warning "투자 참고용 개인 메모"
    이 사이트는 개인 학습 및 시장 분석을 위한 자료입니다. 매수·매도 추천이 아니며, 중요한 판단 전에는 공시·정부기관·기업 IR 등 원문을 다시 확인합니다.
