# OpenAI — GPT-6 Astra 수요·접근성·컴퓨트 상태

- **마지막 검증:** 2026-09-12 13:25 KST
- **이전 버전:** [2026-09-12 13:25 이전 버전](../../자동감시/이력/openai-astra/2026-09-12-1325-이전-버전.md)
- **이전 상태:** **[확정] Astra rollout 유지 + GPT-6 Pro 사용한도 관리 + Pro $200 신규 가입·업그레이드 일시 중단 + 금융서비스 enterprise 확장**
- **현재 상태:** **[확정] 위 상태 유지 + 말레이시아 2개 AI 데이터센터의 전용 컴퓨트 용량을 다년 계약으로 확보**
- **이번 핵심 변화:** 2026-09-08 Firmus와 OpenAI는 OpenAI가 말레이시아의 **Firmus AI Factory 2곳에서 전용 AI 컴퓨트 용량을 다년 계약**하는 전략적 파트너십을 발표했다. OpenAI는 Firmus의 **anchor customer(핵심 선도 고객)**가 되며, Firmus는 신규 시설에 NVIDIA Vera Rubin NVL72 시스템을 투입할 계획이라고 밝혔다.

## 3줄 핵심

1. **[확정]** OpenAI는 Astra 수요를 관리하기 위해 Pro $200 신규 가입·업그레이드를 계속 일시 중단하고 있다. 전면적인 capacity 정상화 발표는 아직 없다.
2. **[확정]** Firmus·OpenAI 공동 발표로 OpenAI가 말레이시아의 신규 AI 데이터센터 2곳에서 **전용 컴퓨트 용량을 다년 계약**한 사실이 추가 확인됐다. 이는 단순한 수요 전망이 아니라 실제 인프라 계약이다.
3. **[확인되지 않음]** OpenAI가 계약한 정확한 MW, 계약금액, 실제 가동 개시일, Astra 전용 비중은 공개되지 않았다. Firmus 전체 고객 계약용량 `900MW+`를 OpenAI 단독 계약량으로 보면 안 된다.

## 1분 핵심

| 항목 | 현재 확인 내용 |
|---|---|
| Astra rollout | **[확정]** Plus·Pro·Business·Enterprise 및 API로 확대 중 |
| GPT-6 Pro Chat 한도 | **[확정]** Pro $200 주 200회 / Pro $100 주 50회 / Business Standard 월 15회 / Business Premium 주 50회 |
| Pro $200 신규 가입 | **[확정] 일시 중단** — 신규 가입·상위 티어 업그레이드 불가 |
| 기존 Pro $200 | **[확정]** 기존 구독 유지·갱신 가능 |
| 금융권 제품 | **[확정]** `ChatGPT for Financial Services` 출시, GPT-6 Astra reasoning 사용 |
| 신규 컴퓨트 계약 | **[확정]** Firmus와 다년 전략적 파트너십. 말레이시아 AI Factory 2곳에서 OpenAI 전용 AI 컴퓨트 용량 계약 |
| 하드웨어 | **[Firmus 발표]** 말레이시아 신규 시설에 NVIDIA DSX AI Factory Platform 및 Vera Rubin NVL72 시스템 도입 계획 |
| 정확한 OpenAI 계약용량 | **[확인되지 않음]** Firmus 전체 고객 포트폴리오는 900MW 초과지만 OpenAI 단독 MW는 비공개 |
| 계약금액 | **[확인되지 않음]** 공식 발표와 Reuters 모두 금액을 공개하지 않음 |
| capacity 정상화 | **[확인되지 않음]** 신규 capacity 확보는 진행 중이나 Astra 전체 공급 정상화 시점은 공개되지 않음 |

## 이번에 새로 확인된 내용

### 1. OpenAI가 말레이시아에서 전용 AI 컴퓨트 용량을 계약했다

**[확정]** Firmus는 2026년 9월 8일 공식 발표에서 **Firmus와 OpenAI가 다년 전략적 파트너십을 체결했으며, OpenAI가 말레이시아 Firmus AI Factory 2곳에서 dedicated AI compute capacity를 계약한다**고 밝혔다.

OpenAI의 Sachin Katti VP of Compute Strategy도 같은 발표에서 Firmus와 협력해 글로벌 컴퓨트 용량을 확대하며, 말레이시아 신규 데이터센터가 전 세계 OpenAI 제품 수요를 지원할 것이라고 직접 말했다.

즉 이번 건은 `OpenAI가 동남아 데이터센터를 검토한다`는 수준이 아니라 **당사자 공동 발표가 나온 실제 컴퓨트 용량 계약**이다.

### 2. 다만 `OpenAI가 900MW를 계약했다`는 뜻은 아니다

Firmus는 이번 파트너십을 포함해 **모든 고객을 합친 총 계약용량이 900MW를 넘었다**고 발표했다.

따라서 다음처럼 구분해야 한다.

```text
Firmus 전체 고객 계약용량 > 900MW          [확정]
OpenAI가 말레이시아 2개 시설 전용 용량 계약 [확정]
OpenAI 단독 계약용량이 900MW               [아님 / 확인되지 않음]
```

OpenAI에 배정되는 정확한 MW와 계약금액은 공개되지 않았다.

### 3. 신규 시설은 NVIDIA Vera Rubin 기반으로 계획돼 있다

**[Firmus·NVIDIA 당사자 발표]** Firmus는 새 AI Factory에 NVIDIA DSX AI Factory Platform과 **Vera Rubin NVL72** 시스템을 도입할 계획이라고 밝혔다.

이는 OpenAI의 신규 compute 확보가 차세대 NVIDIA 시스템을 사용하는 데이터센터 증설과 연결된다는 의미가 있다. 하지만 공개된 자료만으로 해당 GPU 물량 전체가 OpenAI 전용인지, 정확히 몇 대가 OpenAI 워크로드에 배정되는지는 알 수 없다.

## 이전과 달라진 점

### 이전 상태

```text
Astra rollout
+ 플랜별 사용량 제한
+ Pro $200 신규 가입 일시 중단
+ 금융서비스 enterprise 확장
+ 신규 compute 계약의 구체적 추가 확인은 문서에 없음
```

### 현재 상태

```text
기존 상태 유지
+ Firmus와 다년 계약
+ 말레이시아 AI Factory 2곳에서 OpenAI 전용 컴퓨트 용량 확보
+ 차세대 NVIDIA Vera Rubin 기반 capacity 증설 계획 확인
```

이번 변화는 `사용량을 제한하고 있다`는 수요 측 신호에 더해, **OpenAI가 실제 공급 측 capacity를 추가 확보하고 있다는 계약 근거**가 생겼다는 점이 중요하다.

## 왜 중요한가

Astra 수요를 볼 때 가장 강한 증거는 기사 제목이나 사용자 반응이 아니라 다음 순서다.

```text
사용량 급증
→ 요금제·쿼터 제한
→ 신규 가입 제한
→ 실제 데이터센터·컴퓨트 계약
→ 시설 가동
→ 사용가능 compute 증가
→ 제한 완화 또는 capacity 정상화
```

현재 OpenAI는 가운데 단계에 있다. Pro $200 신규 유입을 제한하는 동시에 말레이시아에서 추가 컴퓨트 용량을 계약했다.

**[해석]** 이는 `수요가 강해서 공급확대가 필요하다`는 기존 논리를 강화한다. 다만 계약이 곧바로 사용 가능한 capacity를 의미하지는 않는다. Firmus는 전체 7개 AI Factory 중 2곳만 현재 운영 중이고 나머지 5곳은 개발 중이며 향후 24개월 내 서비스 개시를 목표로 한다고 밝혔다. 말레이시아 2개 시설의 정확한 가동 일정도 별도로 확인해야 한다.

따라서 이번 계약을 `Astra 공급 부족 해결 완료`나 `capacity 정상화 확정`으로 해석하지 않는다.

## 기존 접근성·사용량 관리 상태

**[확정] OpenAI Help Center 기준:**

- **Pro $200:** GPT-6 Pro 주 200회
- **Pro $100:** GPT-6 Pro와 GPT-5.6 Sol Pro 합산 주 50회
- **Business Standard:** 두 Pro 모델 합산 월 15회
- **Business Premium:** 두 Pro 모델 합산 주 50회
- **Plus:** Chat의 GPT-6 Pro는 포함되지 않지만 Work·Codex에서 Astra 사용 가능

또한 2026년 9월 10일부터 **Pro $200 신규 가입·업그레이드가 일시 중단**됐다. 기존 Pro $200 구독자는 유지·갱신할 수 있고 Pro $100 가입은 영향을 받지 않는다.

재개 시점은 공개되지 않았다.

## 금융서비스 enterprise 확장 상태

**[확정]** 2026년 9월 10일 OpenAI는 `ChatGPT for Financial Services`를 출시했다. 제품은 GPT-6 Astra reasoning을 사용하며 Morgan Stanley·Evercore가 design partner로 참여했다.

하지만 다음은 여전히 공개되지 않았다.

- 실제 유료 고객 수
- 좌석 수
- 계약금액
- ARR·매출 기여도
- Morgan Stanley·Evercore의 전사 도입 범위

따라서 `대형 금융기관의 대규모 유료 도입 확정`으로 표현하지 않는다.

## 여전히 미확정인 내용

- Pro $200 신규 가입·업그레이드 재개 시점
- Astra 전체 capacity 정상화 시점
- Firmus 계약의 OpenAI 전용 MW
- Firmus 계약금액
- 말레이시아 2개 시설의 정확한 ready-for-service 날짜
- Vera Rubin NVL72 시스템 중 OpenAI에 실제 배정되는 수량
- Astra 워크로드가 해당 시설에서 차지할 비중
- Samsung·SK·Broadcom·TSMC 등 추가 공급망 계약
- ChatGPT for Financial Services 고객 수·좌석 수·usage·revenue

## 다음 확인 이벤트

1. Firmus 말레이시아 AI Factory의 정확한 가동 일정과 OpenAI 배정용량 공개
2. OpenAI의 추가 데이터센터·GPU·자체칩 capacity 계약
3. Pro $200 신규 가입·업그레이드 재개 또는 제한 확대
4. Astra 전면 rollout 또는 capacity 정상화 발표
5. GPT-6 Pro·Astra 사용한도·크레딧 가격 변경
6. Samsung·SK·Broadcom·TSMC 등 공급망 추가 계약
7. 금융서비스 제품의 실제 고객·좌석 수·usage·revenue 공개

## 출처

### 1차 자료

- Firmus, `Firmus surpasses 900 MW contracted capacity, adds OpenAI as anchor customer and expands into Malaysia` — 2026-09-08  
  https://firmus.co/newsroom/firmus-surpasses-900-mw-contracted-capacity-adds-openai-as-anchor-customer-and-expands-into-malaysia
- OpenAI Help Center, `About ChatGPT Pro tiers`  
  https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro/
- OpenAI Help Center, `GPT-5.6 and GPT-6 Pro in ChatGPT`  
  https://help.openai.com/en/articles/20001354
- OpenAI Help Center, `Managing usage with GPT-6 Astra in Work and Codex`  
  https://help.openai.com/en/articles/20001516
- OpenAI, `GPT-6 Astra: A new generation of intelligence`  
  https://openai.com/index/gpt-6-astra/
- OpenAI, `Introducing ChatGPT for Financial Services` — 2026-09-10  
  https://openai.com/index/introducing-chatgpt-financial-services/

### 교차검증

- Reuters, `Nvidia-backed Firmus signs deal with OpenAI for Malaysia data centre capacity` — 2026-09-08  
  https://www.reuters.com/world/asia-pacific/nvidia-backed-firmus-signs-deal-with-openai-malaysia-data-centre-capacity-2026-09-08/

## 업데이트 내역

- **2026-09-12 13:25:** Firmus–OpenAI 말레이시아 2개 AI Factory 전용 컴퓨트 용량 다년 계약을 반영. Firmus 전체 900MW+와 OpenAI 개별 계약용량을 구분하고, 계약금액·OpenAI MW·가동일은 미확정으로 유지.
- **2026-09-12 12:20:** Pro $200 신규 가입·업그레이드 일시 중단 공식 확인.
