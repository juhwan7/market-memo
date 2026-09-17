# OpenAI — GPT-6 Astra 수요·접근성·컴퓨트 상태

- **마지막 검증:** 2026-09-18 06:48 KST
- **이전 버전:** [2026-09-18 06:48 이전 버전](../../자동감시/이력/openai-astra/2026-09-18-0648-이전-버전.md)
- **이전 상태:** **[확정] Astra rollout + GPT-6 Pro 사용한도 관리 + Pro $200 신규 가입·업그레이드 일시 중단 + 금융서비스 확장 + Firmus 말레이시아 컴퓨트 계약 + Perplexity 프로덕션 도입 사례**
- **현재 상태:** **[확정] 기존 상태 유지 + Astra for Law 출시·선정 로펌 Trusted Access·Harvey/Legora API 구축 경로 공식화**
- **이번 핵심 변화:** 2026-09-17 OpenAI가 `Astra for Law`를 공식 출시했다. GPT-6 Astra에 법률 검색·전문 워크플로·보안 통제를 결합하고, 선정 로펌에는 ChatGPT·Codex의 Trusted Access로 우선 제공하며 Harvey·Legora 등 API 고객이 이를 기반으로 제품·워크플로를 구축할 수 있다고 밝혔다. 다만 고객 수·좌석 수·계약금액·usage·revenue는 공개되지 않았다.

## 3줄 핵심

1. **[확정]** Astra가 범용 모델에서 금융서비스에 이어 **법률 전문 vertical**로 확장됐다. OpenAI는 9월 17일 Astra for Law를 출시하고 선정 로펌에 Trusted Access를 제공한다고 밝혔다.
2. **[확정/당사자 발표]** Harvey·Legora가 API 고객으로 Astra for Law 기반 제품·워크플로를 구축할 수 있고, Sullivan & Cromwell·Latham & Watkins 등 대형 로펌이 초기 테스트·설계에 참여한 사실이 공식 페이지에서 확인된다.
3. **[확인되지 않음]** 실제 유료 고객 수, 좌석 수, API 사용량, 계약금액, ARR·매출 기여도는 공개되지 않았다. 따라서 `대형 enterprise 매출 확정`으로는 해석하지 않는다.

## 1분 핵심

| 항목 | 현재 확인 내용 |
|---|---|
| Astra rollout | **[확정]** ChatGPT Work·Codex·API 등에서 확대 중 |
| GPT-6 Pro Chat 한도 | **[확정]** Pro $200 주 200회 / Pro $100 주 50회 / Business Standard 월 15회 / Business Premium 주 50회 |
| Pro $200 신규 가입 | **[확정] 일시 중단** — 신규 가입·상위 티어 업그레이드 불가 |
| 금융서비스 | **[확정]** ChatGPT for Financial Services 출시 |
| 법률서비스 | **[확정]** Astra for Law 출시. 선정 로펌 Trusted Access, API 제공 예정 |
| 기업 실사용 | **[확정/당사자 사례]** Perplexity 프로덕션 사용 사례 공개 |
| 신규 컴퓨트 계약 | **[확정]** Firmus 말레이시아 AI Factory 2곳 전용 컴퓨트 다년 계약 |
| capacity 정상화 | **[확인되지 않음]** Pro $200 신규가입 제한이 유지되고 전체 공급 정상화 발표 없음 |

## 이번에 새로 확인된 내용

### Astra for Law가 공식 출시됐다

**[확정]** OpenAI는 2026년 9월 17일 `Introducing Astra for Law`를 공개했다. GPT-6 Astra에 법률 분석·작성용 설정과 도구, 전문 법률 검색 인덱스, 기밀업무용 접근통제를 결합한 법률 전문 기반이다.

OpenAI 공식 발표에서 확인되는 범위는 다음과 같다.

- 미국 판례·법령·규정·법원규칙·행정결정 등을 검색하는 **2억3천만 개 이상 URL** 규모의 법률 검색 인덱스
- 선정 로펌에 **Trusted Access** 방식으로 ChatGPT·Codex에서 초기 제공
- 모델 선택기에는 `GPT-6 Astra Law`, 향후 API에는 `gpt-6-astra-law`로 제공 예정
- **Harvey·Legora** 등 API 고객이 Astra for Law 위에서 자체 제품·워크플로를 구축할 수 있다고 명시
- **Sullivan & Cromwell**이 초기 버전을 테스트했고, **Latham & Watkins**와 정보권한·ethical wall·고객 지침·감독 구조를 설계 중
- Relativity·Clio 등 전문도구와 연결하는 **26개 ecosystem plugin** 지원

**[당사자 성능 주장]** OpenAI는 Vals AI Legal Research Bench 비공개 검증셋 200문항에서 최고 reasoning effort 기준 전체 정확성 통과율이 Astra for Law 54.0%, 일반 GPT-6 Astra+웹검색 38.7%였다고 밝혔다. 이는 OpenAI가 공개한 자체 평가 결과이며 독립적인 실제 고객 생산성·수익성 검증과는 구분한다.

## 이전과 달라진 점

```text
이전
Astra 범용 rollout
+ 금융서비스 vertical
+ Perplexity 프로덕션 사용 사례

현재
기존 상태 유지
+ Astra for Law 공식 출시
+ 선정 로펌 Trusted Access
+ Harvey·Legora API 구축 경로
+ 대형 로펌 초기 테스트·거버넌스 설계 참여
```

이번 변화는 단순 고객 사례 하나가 추가된 것보다 **Astra를 특정 전문산업에 맞춘 제품군으로 확장하는 전략이 금융 → 법률로 반복 확인됐다는 점**이 중요하다.

## 왜 중요한가

Astra의 enterprise 수요는 다음 단계로 구분해서 본다.

```text
전문 제품 출시
→ 선정 고객 시험·Trusted Access
→ 실제 프로덕션 사용
→ 좌석·API 사용량 공개
→ 계약금액·ARR·매출 공개
```

Astra for Law는 앞의 두 단계를 공식적으로 강화했다. 그러나 아직 고객별 사용량이나 계약금액이 없어 **수요의 존재는 확인되지만 매출 규모는 확인되지 않은 상태**다.

## 기존 접근성·capacity 상태

**[확정] OpenAI Help Center 기준:** Pro $200은 GPT-6 Pro 주 200회, Pro $100은 GPT-6 Pro와 GPT-5.6 Sol Pro 합산 주 50회, Business Standard는 합산 월 15회, Business Premium은 합산 주 50회다. Plus는 일반 Chat의 GPT-6 Pro는 포함되지 않지만 Work·Codex에서 Astra를 사용할 수 있다.

2026년 9월 10일부터 **Pro $200 신규 가입·업그레이드는 일시 중단** 상태다. 기존 Pro $200 사용자는 유지·갱신할 수 있으며 재개 시점은 공개되지 않았다.

## 컴퓨트 공급 확대 상태

**[확정]** Firmus와 OpenAI는 9월 8일 다년 전략적 파트너십을 발표했고 OpenAI는 말레이시아 Firmus AI Factory 2곳의 전용 AI 컴퓨트 용량을 계약했다. Firmus는 NVIDIA DSX AI Factory Platform과 Vera Rubin NVL72 시스템을 도입할 계획이다.

**[확인되지 않음]** Firmus 전체 고객 계약용량 `900MW+`를 OpenAI 단독 계약량으로 볼 수 없다. OpenAI 전용 MW·계약금액·정확한 가동일은 공개되지 않았다.

## 기존 enterprise 채택 상태

- **[확정] 금융:** 9월 10일 `ChatGPT for Financial Services` 출시. Morgan Stanley·Evercore가 design partner로 공개됨.
- **[확정/당사자 사례] 기술:** 9월 14일 OpenAI가 Perplexity의 Astra 프로덕션 시스템 사용 사례를 공개함.
- **[확정] 법률:** 9월 17일 `Astra for Law` 출시. 선정 로펌 Trusted Access 및 Harvey·Legora API 구축 경로 공개.

세 사례 모두 enterprise 확장의 방향성은 보여주지만 **실제 좌석·사용량·계약금액·매출 기여도는 아직 공개되지 않았다.**

## 여전히 미확정인 내용

- Pro $200 신규 가입·업그레이드 재개 시점
- Astra 전체 capacity 정상화 시점
- Firmus 계약의 OpenAI 전용 MW·계약금액·정확한 가동일
- Samsung·SK·Broadcom·TSMC 등 추가 공급망 계약
- Astra for Law의 실제 유료 로펌 수·좌석 수·계약금액·API usage·revenue
- Harvey·Legora의 실제 상용 배포 규모와 API 사용량
- ChatGPT for Financial Services 고객 수·좌석 수·usage·revenue
- Perplexity의 Astra 사용량·계약금액·매출 기여도

## 다음 확인 이벤트

1. Astra for Law API의 실제 출시와 일반 접근 범위 확대
2. 선정 로펌의 유료 전환·좌석·usage·계약금액 공개
3. Harvey·Legora 등 법률기술 고객의 실제 상용 배포·사용량 공개
4. Pro $200 신규 가입·업그레이드 재개 또는 제한 확대
5. Astra 전면 rollout 또는 capacity 정상화 발표
6. GPT-6 Pro·Astra 사용한도·크레딧 가격 변경
7. Firmus 말레이시아 AI Factory의 가동 일정과 OpenAI 배정용량
8. 추가 데이터센터·GPU·자체칩·Samsung·SK·Broadcom·TSMC 공급망 계약
9. 금융서비스·Perplexity 고객의 좌석·usage·계약금액·revenue 공개

## 출처

### 1차 자료

- OpenAI, `Introducing Astra for Law` — 2026-09-17  
  https://openai.com/index/astra-for-law/
- OpenAI, `Perplexity trusts GPT-6 Astra with end-to-end systems` — 2026-09-14  
  https://openai.com/index/perplexity-improving-accuracy-with-astra/
- OpenAI, `GPT-6 Astra: A new generation of intelligence`  
  https://openai.com/index/gpt-6-astra/
- OpenAI, `Introducing ChatGPT for Financial Services` — 2026-09-10  
  https://openai.com/index/introducing-chatgpt-financial-services/
- Firmus, `Firmus surpasses 900 MW contracted capacity, adds OpenAI as anchor customer and expands into Malaysia` — 2026-09-08  
  https://firmus.co/newsroom/firmus-surpasses-900-mw-contracted-capacity-adds-openai-as-anchor-customer-and-expands-into-malaysia
- OpenAI Help Center, `About ChatGPT Pro tiers`  
  https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro/
- OpenAI Help Center, `GPT-5.6 and GPT-6 Pro in ChatGPT`  
  https://help.openai.com/en/articles/20001354
- OpenAI Help Center, `Managing usage with GPT-6 Astra in Work and Codex`  
  https://help.openai.com/en/articles/20001516

### 교차검증

- Legal IT Insider, `Breaking news: OpenAI unveils Astra for Law` — 2026-09-17
- Reuters, `Nvidia-backed Firmus signs deal with OpenAI for Malaysia data centre capacity` — 2026-09-08

## 업데이트 내역

- **2026-09-18 06:48:** 9/17 OpenAI 공식 `Astra for Law` 출시 반영. 선정 로펌 Trusted Access, Harvey·Legora API 구축 경로, 대형 로펌 초기 테스트·거버넌스 설계 참여를 추가하되 사용량·계약금액·매출은 미확정으로 유지.
- **2026-09-14 10:18:** Perplexity 프로덕션 시스템 도입 사례 반영.
- **2026-09-12 13:25:** Firmus–OpenAI 말레이시아 AI Factory 전용 컴퓨트 다년 계약 반영.
- **2026-09-12 12:20:** Pro $200 신규 가입·업그레이드 일시 중단 공식 확인.