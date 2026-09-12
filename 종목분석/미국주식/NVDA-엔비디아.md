# NVIDIA (NVDA) — 앞으로 무엇을 만들려는가: GPU 회사에서 AI 팩토리 플랫폼 회사로

- **마지막 검증일:** 2026-09-12
- **현재 재료 단계:** Vera Rubin 양산 확대 / Groq 3 LPX 양산 / DSX AI Factory 확대 / Feynman 차세대 로드맵 공개

## 3줄 핵심

- **NVIDIA의 장기 목표는 GPU를 더 많이 파는 것만이 아니다.** 젠슨 황은 NVIDIA를 칩 회사에서 **AI 인프라·AI 팩토리 회사**로 확장하고 있으며 CPU·GPU·LPU·HBM·네트워크·스토리지·소프트웨어·전력·냉각 설계까지 하나의 플랫폼으로 묶고 있다.
- **가장 중요한 사업 변화:** AI 시장이 학습에서 추론·에이전트로 이동하면서 NVIDIA는 Vera Rubin, Groq 3 LPX, DSX를 통해 **토큰당 비용과 전력당 토큰**을 낮추는 데 집중하고 있다.
- **가장 큰 장기 리스크:** Google·AWS·Microsoft·Meta 등 고객이 자체 AI 칩을 확대하는 것. NVIDIA는 이를 막기만 하기보다 **NVLink Fusion으로 커스텀 XPU까지 NVIDIA 인프라 안으로 끌어들이는 전략**을 쓰고 있다.

## 먼저 쉽게 이해하면

과거 NVIDIA의 핵심 상품을 단순화하면 이랬다.

~~~text
NVIDIA
→ GPU 판매
→ CUDA 제공
~~~

현재 NVIDIA가 만들려는 구조는 훨씬 넓다.

~~~text
전력
↓
데이터센터 설계
↓
CPU + GPU + LPU
↓
HBM
↓
NVLink
↓
Ethernet / InfiniBand / 광통신
↓
스토리지 / DPU
↓
CUDA / TensorRT / Dynamo / AI Enterprise
↓
AI 모델 / 에이전트 / 로봇
↓
토큰 생산
~~~

젠슨 황은 이를 **AI Factory(인공지능 공장)**라고 부른다.

공장이 원재료를 넣어 제품을 생산하듯 AI 팩토리는 전력과 데이터를 투입해 **토큰과 AI 작업 결과**를 생산한다는 개념이다.

## NVIDIA가 궁극적으로 노리는 것

### 1. AI 연산칩 점유율을 넘어 'AI 데이터센터 표준'을 장악

NVIDIA에 가장 좋은 구조는 고객이 GPU 한 장만 사는 것이 아니다.

고객의 전체 AI 데이터센터가 NVIDIA 방식으로 설계되는 것이다.

~~~text
Rubin GPU
+ Vera CPU
+ NVLink
+ Spectrum-X
+ ConnectX
+ BlueField
+ Groq LPX
+ DSX
+ CUDA 소프트웨어
= 하나의 AI 팩토리
~~~

이렇게 되면 GPU 경쟁사가 등장해도 NVIDIA는 네트워크·CPU·소프트웨어·랙 설계 등 여러 층에서 매출을 얻을 수 있다.

### 2. '학습 왕'뿐 아니라 '추론 왕'이 되려는 전략

AI 산업 초기 NVIDIA의 폭발적 성장은 GPT 같은 초대형 모델 **학습** 수요가 만들었다.

하지만 장기적으로 더 큰 반복 수요는 추론에서 나올 수 있다.

~~~text
학습
→ 모델을 만드는 과정
→ 대규모 GPU를 한 번에 사용

추론
→ 사용자가 AI를 쓸 때마다 계산
→ 매일·매시간 반복
→ 에이전트가 늘면 토큰 소비 급증
~~~

그래서 NVIDIA는 Rubin을 범용 학습·추론 플랫폼으로 유지하면서, **Groq 3 LPX**처럼 저지연 토큰 생성에 특화된 가속기까지 추가했다.

2026-08-24 NVIDIA는 Groq 3 LPX가 양산에 들어갔다고 발표했다. NVIDIA는 이를 Vera Rubin을 보완하는 'interactive AI inference accelerator'로 정의한다.

즉 NVIDIA 내부에서도 앞으로 AI 연산이 **GPU 하나로 모두 처리되는 구조가 아니라, 워크로드별 가속기를 조합하는 구조**로 가고 있다.

## 세대별 로드맵

### Blackwell → Rubin → Feynman

NVIDIA는 매년 새로운 AI 컴퓨팅 세대를 내놓는 **annual cadence(연간 출시 주기)**를 핵심 전략으로 제시한다.

| 시기 | 세대 | 핵심 방향 |
|---|---|---|
| 2024~2025 | Blackwell / Blackwell Ultra | 초대형 학습·추론, NVL72 |
| 2026 | Vera Rubin | HBM4·Vera CPU·NVLink 6·Spectrum-6, 에이전트 AI |
| 2027 전후 | Rubin Ultra | 더 큰 랙·광 연결·차세대 LP 계열 |
| 2028 로드맵 | Feynman | 차세대 GPU·Rosa CPU·LP40·BlueField-5·CX10·광학 연결 |

**[주의]** 세부 출하 시점과 제품 구성은 양산 과정에서 변경될 수 있다. 위 표는 NVIDIA가 GTC에서 공개한 로드맵 기준이다.

### Vera Rubin

2026년 NVIDIA의 중심 제품은 Vera Rubin이다.

NVIDIA 공식 발표 기준 Rubin 플랫폼은 다음을 통합한다.

- Vera CPU
- Rubin GPU
- NVLink 6 Switch
- ConnectX-9 SuperNIC
- BlueField-4 DPU
- Spectrum-6 Ethernet
- Groq 3 LPU/LPX

2026-05-31 NVIDIA는 Vera Rubin이 **full production으로 ramping**하고 있다고 발표했다.

NVIDIA 주장 기준 대규모 에이전트 워크로드에서 Grace Blackwell 대비 최대 10배의 처리량을 목표로 한다.

### Feynman

GTC 2026에서 젠슨 황은 Rubin 다음 대형 아키텍처로 **Feynman**을 공개했다.

공개된 구성에는 다음이 포함된다.

- 차세대 Feynman GPU
- **Rosa CPU**
- **LP40** 차세대 LPU
- BlueField-5
- ConnectX-10
- 차세대 NVLink
- Kyber와 co-packaged optics 기반 연결
- Spectrum 계열 광 네트워크

핵심은 GPU만 다음 세대로 바꾸는 것이 아니다.

~~~text
GPU
+ CPU
+ 추론 전용 LPU
+ 네트워크
+ 광통신
+ DPU
+ 메모리
를 세대별로 동시에 교체
~~~

하는 **Extreme Co-Design** 전략이다.

<details>
<summary>Extreme Co-Design이란?</summary>

칩, 메모리, 네트워크, 소프트웨어, 랙, 냉각을 각각 따로 최적화하는 대신 처음부터 하나의 시스템처럼 함께 설계하는 방식이다.

NVIDIA는 단일 GPU FLOPS보다 전체 AI 팩토리의 토큰 처리량과 전력효율을 높이는 것이 더 중요하다고 주장한다.

</details>

## NVIDIA DSX — 데이터센터 설계까지 먹으려는 이유

NVIDIA는 2026년 **DSX**를 본격 확대하고 있다.

DSX는 AI 팩토리를 설계·시뮬레이션·구축·운영하는 플랫폼이다.

단순 서버 레퍼런스가 아니라 다음까지 다룬다.

- 부지
- 전력망 연결
- 배터리 저장장치
- 냉각
- 랙 배치
- 네트워크
- 스토리지
- 운영 소프트웨어
- 디지털 트윈

NVIDIA 공식 DSX 예시 설계에는 250MW급 IT 부하, 1,536 GPU racks, 110,592 GPUs 같은 규모까지 제시돼 있다.

이 전략의 의미는 명확하다.

~~~text
예전
고객: 데이터센터를 만들고 NVIDIA GPU를 구매

앞으로
NVIDIA: 데이터센터를 어떻게 설계할지부터 표준 제공
→ NVIDIA 시스템을 가장 효율적으로 쓸 구조를 먼저 깔음
~~~

NVIDIA가 GPU 공급자를 넘어 **AI 데이터센터 건설의 사실상 표준 플랫폼**이 되려는 움직임이다.

## 커스텀 AI 칩은 NVIDIA에게 위협 아닌가?

맞다. 장기적으로 매우 중요한 리스크다.

- Google → TPU
- AWS → Trainium
- Microsoft → Maia
- Meta → 자체 가속기
- AI 스타트업 → 각종 XPU
- AMD → Instinct

특히 NVIDIA의 가장 큰 고객인 hyperscaler가 자체칩을 만들기 때문에 **고객이 경쟁자이기도 한 구조**다.

그러나 NVIDIA의 대응이 흥미롭다.

## NVLink Fusion — 경쟁 칩도 NVIDIA 생태계 안으로

NVIDIA는 2025년부터 **NVLink Fusion**을 확대하고 있다.

이 기술은 고객이 자체 XPU를 만들더라도 NVIDIA의 다음 요소를 사용할 수 있게 한다.

- NVLink scale-up
- Spectrum-X scale-out
- Vera/Rosa CPU
- BlueField DPU
- MGX rack architecture
- NVHBM
- NVIDIA 소프트웨어 생태계

2026년에는 Marvell, MediaTek, d-Matrix 등이 참여를 확대했다.

즉 전략은 이렇게 바뀐다.

~~~text
과거 목표
모든 AI 계산 = NVIDIA GPU

확장된 목표
NVIDIA GPU가 아니어도
AI 팩토리의 연결·네트워크·메모리·CPU·랙·소프트웨어는
NVIDIA 플랫폼을 사용
~~~

이 전략이 성공하면 자체 ASIC 증가는 NVIDIA의 GPU 점유율에는 부정적이어도 **플랫폼 전체 점유율에는 반드시 같은 크기의 악재가 아닐 수 있다.**

## NVHBM — HBM 자체에도 더 깊게 관여

2026년 8월 NVIDIA는 NVLink Fusion용 **NVHBM**을 공개했다.

이는 커스텀 XPU와 HBM의 연결·베이스다이 설계를 NVIDIA 생태계에 맞추려는 기술이다.

NVIDIA 설명 기준 표준 HBM4e 대비 다음을 목표로 한다.

- 스택당 메모리 대역폭 최대 30% 향상
- 관련 PHY/지원 면적 최대 67% 감소
- HBM 전력 사용 최대 15% 감소

이것은 NVIDIA가 더 이상 'GPU 칩'만 설계하는 기업이 아니라 **메모리 인터페이스와 커스텀 실리콘 설계 구조까지 영향력을 확대**하고 있다는 의미다.

## 소프트웨어는 왜 계속 중요한가

경쟁사가 NVIDIA와 비슷한 칩 성능을 만든다고 바로 시장을 가져가기 어려운 이유는 CUDA 생태계 때문이다.

AI 기업 입장에서 중요한 것은 칩 가격만이 아니다.

~~~text
개발 인력
+ 라이브러리
+ 모델 호환성
+ 장애 대응
+ 분산학습
+ 추론 최적화
+ 클라우드 지원
= 실제 전환 비용
~~~

NVIDIA는 CUDA 외에도 TensorRT-LLM, Dynamo, NeMo, NIM, AI Enterprise 등 추론·배포 계층을 넓히고 있다.

따라서 경쟁사가 NVIDIA를 이기려면 단순 FLOPS가 아니라 **개발자와 운영 경험 전체**를 따라잡아야 한다.

## 다음 목표 2 — Agentic AI

NVIDIA가 2026년 가장 강조하는 시장 중 하나가 **Agentic AI**다.

에이전트는 질문 하나에 답하는 챗봇과 달리 여러 단계의 추론과 도구 호출을 수행한다.

~~~text
질문
→ 계획
→ 웹/DB 검색
→ 코드 실행
→ 결과 확인
→ 재계획
→ 추가 실행
→ 최종 결과
~~~

이 과정은 단순 채팅보다 훨씬 많은 토큰과 컴퓨팅을 소비한다.

따라서 NVIDIA 입장에서는 AI가 더 '똑똑한 에이전트'로 발전할수록 추론량이 늘어나는 구조가 중요하다.

## 다음 목표 3 — Physical AI

NVIDIA는 데이터센터 밖으로도 시장을 넓히고 있다.

### 로봇

- Isaac
- GR00T
- Omniverse
- Cosmos

### 자율주행

- DRIVE
- Alpamayo
- AlpaGym
- Cosmos-Dreams

2026년에는 **Cosmos 3**와 **Alpamayo 2 Super**를 공개했다.

NVIDIA의 목표는 로봇 자체를 직접 제조하는 것이 아니라,

~~~text
로봇·자동차 개발사가
학습
→ 시뮬레이션
→ AI 모델
→ 차량/로봇 컴퓨터
까지 NVIDIA 플랫폼 사용
~~~

하게 만드는 것이다.

이 구조는 PC 시대의 운영체제·CPU 플랫폼과 유사한 플랫폼 지배 전략이다.

## 다음 목표 4 — Sovereign AI

각 국가가 자국 데이터와 언어를 기반으로 자체 AI 인프라를 구축하려는 움직임도 NVIDIA의 성장축이다.

한국에서는 NAVER가 NVIDIA DSX 기반 AI 팩토리를 GAK 세종에서 시작해 55MW → 2028년 200MW로 확대하는 계획을 발표했다.

장기적으로 NVIDIA는 hyperscaler 몇 곳에만 의존하기보다 국가·통신사·기업 자체 AI 팩토리까지 고객층을 확대하려 한다.

## NVIDIA 전략을 한 그림으로 보면

~~~text
1단계
GPU 판매

2단계
GPU + CUDA

3단계
GPU + CPU + 네트워크 + DPU + 시스템

4단계
AI Factory 전체 설계·운영

5단계
커스텀 XPU도 NVLink Fusion으로 흡수

6단계
Agentic AI / Physical AI / Sovereign AI로
AI 사용처 자체를 확대
~~~

## DeepSeek 같은 효율적 모델은 NVIDIA에 악재인가

**단기 논리:** 같은 성능에 필요한 GPU와 HBM이 줄면 하드웨어 수요에는 부정적일 수 있다.

**장기 반대 논리:** 추론 가격이 내려가면서 사용량과 에이전트 수가 폭발하면 총 컴퓨팅 수요는 오히려 늘 수 있다.

NVIDIA는 바로 이 두 번째 시나리오에 베팅하고 있다.

그래서 회사의 핵심 지표가 단순 GPU 개수가 아니라 **tokens per watt, tokens per dollar, cost per token**으로 이동하고 있다.

## 가장 큰 리스크

### 1. 자체 ASIC

대형 고객이 NVIDIA GPU 사용을 줄이고 TPU·Trainium·Maia 같은 자체칩을 확대할 수 있다.

### 2. 모델 효율 개선

DeepSeek 같은 기술이 모델당 컴퓨팅 요구량을 급격하게 낮출 수 있다.

### 3. AI 데이터센터 과잉투자

현재의 대규모 CAPEX가 실제 AI 매출로 연결되지 않으면 데이터센터 투자 사이클이 꺾일 수 있다.

### 4. 전력 병목

GPU를 팔 수 있어도 전력망 연결이 늦으면 실제 설치와 매출 인식 속도가 제한된다.

### 5. 고객·투자 관계의 순환성

NVIDIA가 AI 기업·클라우드 기업에 투자하고 그 기업이 다시 NVIDIA 인프라를 구매하는 구조가 커질수록 실제 독립적인 최종수요를 따로 확인해야 한다.

## 투자자가 앞으로 볼 지표

1. Vera Rubin 출하 속도와 실제 고객 배치
2. Rubin Ultra·Feynman 일정 준수
3. Groq 3 LPX 채택 확대
4. NVLink Fusion에 참여하는 커스텀 XPU 수
5. GPU 외 네트워킹·DPU·AI Enterprise 매출 성장
6. 주요 hyperscaler의 자체칩 비중
7. AI 데이터센터 전력·착공 지연 여부
8. HBM 공급과 차세대 메모리 인증
9. 토큰당 비용 하락과 총 토큰 사용량 증가
10. NVIDIA 투자 대상 기업의 실제 독립 매출과 GPU 구매 구조

## 핵심 결론

NVIDIA의 최종 목표를 'GPU 시장 1위 유지'라고만 보면 회사 전략의 절반만 보는 것이다.

현재 NVIDIA가 만들려는 것은 **AI를 생산하는 데이터센터 전체의 표준 플랫폼**이다.

자체 AI 칩이 늘어나도 NVLink·Spectrum-X·BlueField·CPU·HBM 인터페이스·DSX·CUDA를 통해 NVIDIA 생태계 안에 남게 만들고, 동시에 Agentic AI·로봇·자율주행·Sovereign AI를 키워 **AI 컴퓨팅 자체의 총수요를 계속 확대**하는 것이 핵심 전략이다.

### 기억할 한 문장

> **NVIDIA가 지키려는 해자는 GPU 점유율 하나가 아니라, 어떤 AI 가속기를 쓰더라도 NVIDIA의 AI 팩토리 안에서 움직이게 만드는 전체 플랫폼이다.**

## 출처

1. NVIDIA GTC 2026 Keynote / Highlights
   - https://www.nvidia.com/en-us/on-demand/session/gtc26-s81595/
   - https://images.nvidia.com/nvimages/gtc/pdf/GTC26_SanJose_Highlights_Final.pdf
2. NVIDIA Vera Rubin, 2026-03-16 / 2026-05-31
   - https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform
   - https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory
3. NVIDIA DSX
   - https://nvidianews.nvidia.com/news/dsx-infrastructure-ai-factory
   - https://docs.nvidia.com/dsx/
4. NVIDIA Groq 3 LPX, 2026-08-24
   - https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai
5. NVIDIA NVLink Fusion / NVHBM
   - https://nvidianews.nvidia.com/news/nvidia-nvlink-fusion-semi-custom-ai-infrastructure-partner-ecosystem
   - https://developer.nvidia.com/blog/nvidia-nvlink-fusion-nvhbm-custom-high-bandwidth-memory/
6. NVIDIA Cosmos 3 / Alpamayo 2
   - https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai
   - https://nvidianews.nvidia.com/news/nvidia-alpamayo-2-super-robotaxis
7. NVIDIA·NAVER DSX AI Factory
   - https://investor.nvidia.com/news/press-release-details/2026/NAVER-NVIDIA-and-Brookfield-to-Expand-Koreas-National-AI-Factory-Infrastructure-Buildout/default.aspx
