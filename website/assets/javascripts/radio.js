(() => {
  const PLAYER_SELECTOR = "[data-mm-radio-player]";
  const MAX_CHUNK_LENGTH = 180;
  const CORE_MAX_CHARS = 7600;
  const STORAGE_KEY = "market-memo:radio:v1";

  let chunks = [];
  let chunkIndex = 0;
  let playing = false;
  let paused = false;
  let sleepTimerId = null;
  let currentUtterance = null;
  let requestedSeekPercent = 0;
  let seekDragging = false;

  const expandedTerms = new Set();

  const TERM_EXPANSIONS = new Map([
    ["CPI", "CPI, 소비자물가지수"],
    ["PPI", "PPI, 생산자물가지수"],
    ["PCE", "PCE, 개인소비지출 물가지수"],
    ["FOMC", "FOMC, 미국 연방공개시장위원회"],
    ["DXY", "DXY, 달러인덱스"],
    ["ETF", "ETF, 상장지수펀드"],
    ["GDP", "GDP, 국내총생산"],
    ["AI", "AI, 인공지능"],
  ]);

  function currentPath() {
    try {
      return decodeURIComponent(window.location.pathname);
    } catch (_error) {
      return window.location.pathname;
    }
  }

  function isAnalysisDocument() {
    const path = currentPath();
    return path.includes("/시황/") || path.includes("/산업-테마/") || path.includes("/종목분석/");
  }

  function loadSettings() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_error) {
      return {};
    }
  }

  function saveSettings(panel) {
    try {
      const settings = {
        mode: panel.querySelector("[data-mm-radio-mode]")?.value || "core",
        rate: panel.querySelector("[data-mm-radio-rate]")?.value || "0.92",
        timer: panel.querySelector("[data-mm-radio-timer]")?.value || "30",
        voice: panel.querySelector("[data-mm-radio-voice]")?.value || "auto",
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (_error) {
      // Playback still works when storage is unavailable.
    }
  }

  function cleanText(input) {
    let text = String(input || "")
      .replace(/\[(확정|당사자 주장|가능성 높음|시장 기대|추정|확인되지 않음)\]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[★☆]{1,3}/g, "")
      .replace(/→/g, ". 그리고 ")
      .replace(/↔/g, " 그리고 ")
      .replace(/[|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    for (const [term, expansion] of TERM_EXPANSIONS.entries()) {
      if (expandedTerms.has(term)) continue;
      const pattern = new RegExp(`\\b${term}\\b`);
      if (pattern.test(text)) {
        text = text.replace(pattern, expansion);
        expandedTerms.add(term);
      }
    }

    return text;
  }

  function headingTransition(text) {
    const heading = cleanText(text);
    if (!heading) return "";
    if (/3줄|30초|요약|핵심/.test(heading)) return "먼저 오늘 핵심부터 또렷하게 짚어볼게요.";
    if (/왜 중요|중요한가/.test(heading)) return "자, 여기서 왜 중요한지 한 번 볼게요. 이 부분이 흐름을 이해하는 데 꽤 중요합니다.";
    if (/쉽게|이해/.test(heading)) return "숫자가 조금 많아 보여도 괜찮습니다. 핵심만 편하게 풀어서 설명해볼게요.";
    if (/현재|지금|시장.*보|사람.*보/.test(heading)) return "이제 시장이 실제로 어떻게 보고 있는지 볼게요. 뉴스의 숫자보다 이 반응이 더 중요할 때가 많습니다.";
    if (/과거|역사|이전/.test(heading)) return "여기서 잠깐 과거 흐름을 같이 보면 지금 상황이 훨씬 잘 보입니다.";
    if (/시나리오|경우/.test(heading)) return "좋습니다. 이제 경우의 수를 나눠볼게요. 어렵게 생각할 필요는 없습니다.";
    if (/투자|한국.*영향|시장.*영향/.test(heading)) return "그럼 이게 실제 시장에는 어떻게 연결될까요. 바로 이어서 볼게요.";
    if (/앞으로|체크|확인/.test(heading)) return "이제 앞으로 뭘 확인하면 되는지 딱 짚어볼게요.";
    if (/결론|정리|기억/.test(heading)) return "마지막으로 정리하겠습니다. 이것만 기억해두면 충분합니다.";
    return `${heading}, 이 부분도 뉴스처럼 핵심은 정확하게, 말은 편하게 이어서 볼게요.`;
  }

  function isLowValueSection(heading) {
    return /출처|원출처|참고자료|업데이트 내역|면책|체크리스트/.test(heading);
  }

  function coreSection(heading) {
    if (!heading) return true;
    return /3줄|30초|요약|핵심|왜 중요|쉽게|현재|지금|시장|과거|시나리오|투자|영향|앞으로|결론|정리|기억|오늘/.test(heading);
  }

  function directText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    clone.querySelectorAll?.(
      "code, pre, table, .md-typeset__table, script, style, .status-badge, .importance-badge, [data-mm-reading-controls], [data-mm-radio-player]"
    ).forEach((node) => node.remove());
    return cleanText(clone.textContent || "");
  }

  function buildSegments(mode) {
    expandedTerms.clear();

    const content = document.querySelector(".md-content .md-typeset");
    const title = directText(content?.querySelector("h1"));
    if (!content || !title) return [];

    const segments = [
      `안녕하세요. 마켓 메모 라디오입니다. 오늘은 ${title} 이야기입니다. 뉴스 아나운서처럼 핵심은 정확하게 짚고, 옆에서 친구가 설명해주듯 편하게 풀어볼게요.`,
    ];

    let currentHeading = "";
    let skipSection = false;
    let totalChars = segments[0].length;

    const nodes = [...content.querySelectorAll("h2, h3, p, li, blockquote")];

    for (const node of nodes) {
      if (node.closest(PLAYER_SELECTOR) || node.closest("[data-mm-reading-controls]")) continue;
      if (node.closest("table, pre, details, .admonition")) continue;
      if (node.matches("li") && node.querySelector("p, ul, ol")) continue;

      if (node.matches("h2, h3")) {
        currentHeading = directText(node);
        skipSection = isLowValueSection(currentHeading) || (mode === "core" && !coreSection(currentHeading));
        if (!skipSection) {
          const transition = headingTransition(currentHeading);
          if (transition) {
            segments.push(transition);
            totalChars += transition.length;
          }
        }
        continue;
      }

      if (skipSection) continue;

      const text = directText(node);
      if (!text || text.length < 8) continue;
      if (/^(마지막 검증일|분류|작성 시점|핵심 일정|관련 문서|연결 문서)\s*[:：]/.test(text)) continue;
      if (/^(http|www\.)/i.test(text)) continue;

      segments.push(text);
      totalChars += text.length;

      if (mode === "core" && totalChars >= CORE_MAX_CHARS) {
        segments.push("여기까지가 이 문서에서 먼저 기억할 핵심 내용입니다.");
        break;
      }
    }

    return segments;
  }

  function splitLongText(text) {
    const normalized = cleanText(text);
    if (!normalized) return [];
    if (normalized.length <= MAX_CHUNK_LENGTH) return [normalized];

    const sentences = normalized
      .split(/(?<=[.!?])\s+|(?<=다\.)\s+|(?<=요\.)\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    const output = [];
    let buffer = "";

    const flush = () => {
      if (buffer.trim()) output.push(buffer.trim());
      buffer = "";
    };

    for (const sentence of sentences.length ? sentences : [normalized]) {
      if (sentence.length > MAX_CHUNK_LENGTH) {
        flush();
        let rest = sentence;
        while (rest.length > MAX_CHUNK_LENGTH) {
          let cut = rest.lastIndexOf(",", MAX_CHUNK_LENGTH);
          if (cut < 70) cut = rest.lastIndexOf(" ", MAX_CHUNK_LENGTH);
          if (cut < 70) cut = MAX_CHUNK_LENGTH;
          output.push(rest.slice(0, cut).trim());
          rest = rest.slice(cut).replace(/^[,\s]+/, "");
        }
        if (rest.trim()) buffer = rest.trim();
        continue;
      }

      const next = buffer ? `${buffer} ${sentence}` : sentence;
      if (next.length > MAX_CHUNK_LENGTH) {
        flush();
        buffer = sentence;
      } else {
        buffer = next;
      }
    }

    flush();
    return output;
  }

  function buildChunks(mode) {
    return buildSegments(mode).flatMap(splitLongText).filter(Boolean);
  }

  function voiceScore(voice) {
    const name = String(voice.name || "");
    const lang = String(voice.lang || "");
    let score = lang.toLowerCase().startsWith("ko") ? 100 : 0;
    if (/natural|neural|premium|enhanced|online/i.test(name)) score += 80;
    if (/google/i.test(name)) score += 55;
    if (/samsung/i.test(name)) score += 45;
    if (/microsoft/i.test(name)) score += 40;
    if (/sunhi|heami|injoon|hyunsu/i.test(name)) score += 25;
    if (/compact|espeak|festival/i.test(name)) score -= 60;
    if (voice.default) score += 10;
    return score;
  }

  function koreanVoices() {
    if (!("speechSynthesis" in window)) return [];
    return window.speechSynthesis
      .getVoices()
      .filter((voice) => String(voice.lang || "").toLowerCase().startsWith("ko"))
      .sort((a, b) => voiceScore(b) - voiceScore(a));
  }

  function populateVoices(panel) {
    const select = panel.querySelector("[data-mm-radio-voice]");
    if (!select) return;

    const settings = loadSettings();
    const previous = select.value || settings.voice || "auto";
    const voices = koreanVoices();

    select.innerHTML = "";
    const auto = document.createElement("option");
    auto.value = "auto";
    auto.textContent = voices.length
      ? `추천 음성 · ${voices[0].name}`
      : "추천 한국어 음성 자동 선택";
    select.append(auto);

    voices.slice(0, 10).forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = voice.voiceURI || voice.name;
      option.textContent = `${index === 0 ? "추천 · " : ""}${voice.name}`;
      select.append(option);
    });

    if ([...select.options].some((option) => option.value === previous)) {
      select.value = previous;
    }
  }

  function selectedVoice(panel) {
    const select = panel.querySelector("[data-mm-radio-voice]");
    const voices = koreanVoices();
    if (!voices.length) return null;
    if (!select || select.value === "auto") return voices[0];
    return voices.find((voice) => (voice.voiceURI || voice.name) === select.value) || voices[0];
  }

  function setStatus(panel, message) {
    const status = panel.querySelector("[data-mm-radio-status]");
    if (status) status.textContent = message;
  }

  function clampPercent(value) {
    return Math.max(0, Math.min(100, Number(value) || 0));
  }

  function percentForChunk(index) {
    if (!chunks.length) return requestedSeekPercent;
    if (chunks.length === 1) return 100;
    return clampPercent((index / (chunks.length - 1)) * 100);
  }

  function updateSeekUi(panel, percent = requestedSeekPercent) {
    const value = Math.round(clampPercent(percent));
    const seek = panel.querySelector("[data-mm-radio-seek]");
    const label = panel.querySelector("[data-mm-radio-seek-label]");
    if (seek && !seekDragging) seek.value = String(value);

    if (label) {
      let extra = "";
      if (chunks.length) {
        const totalMinutes = Math.max(1, chunks.join(" ").length / 360);
        const minute = Math.round(totalMinutes * (value / 100));
        extra = minute > 0 ? ` · 약 ${minute}분 지점` : " · 처음부터";
      }
      label.textContent = `${playing ? "재생 위치" : "시작 위치"} ${value}%${extra}`;
    }

    panel.querySelectorAll("[data-mm-radio-jump]").forEach((button) => {
      button.classList.toggle(
        "is-active",
        Number(button.dataset.mmRadioJump) === value
      );
    });
  }

  function updateProgress(panel) {
    const progress = panel.querySelector("[data-mm-radio-progress]");
    const label = panel.querySelector("[data-mm-radio-progress-label]");
    const ratio = chunks.length ? Math.min(1, chunkIndex / chunks.length) : 0;
    if (progress) progress.style.width = `${Math.round(ratio * 100)}%`;
    if (label) label.textContent = chunks.length
      ? `${Math.min(chunkIndex + 1, chunks.length)} / ${chunks.length}`
      : "준비";

    if (playing && chunks.length) {
      requestedSeekPercent = percentForChunk(chunkIndex);
      updateSeekUi(panel, requestedSeekPercent);
    } else {
      updateSeekUi(panel, requestedSeekPercent);
    }
  }

  function seekToPercent(panel, percent) {
    requestedSeekPercent = clampPercent(percent);
    updateSeekUi(panel, requestedSeekPercent);

    if (!chunks.length) {
      setStatus(panel, `${Math.round(requestedSeekPercent)}% 지점부터 들을 준비를 했습니다.`);
      return;
    }

    const nextIndex = Math.min(
      chunks.length - 1,
      Math.max(0, Math.round((requestedSeekPercent / 100) * (chunks.length - 1)))
    );

    chunkIndex = nextIndex;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    currentUtterance = null;
    updateProgress(panel);

    if (playing && !paused) {
      setStatus(panel, `${Math.round(requestedSeekPercent)}% 지점으로 이동했습니다. 여기서부터 이어서 들려드릴게요.`);
      window.setTimeout(() => speakNext(panel), 120);
    } else if (playing && paused) {
      setStatus(panel, `${Math.round(requestedSeekPercent)}% 지점으로 이동했습니다. 계속 듣기를 누르면 여기서 시작합니다.`);
    } else {
      setStatus(panel, `${Math.round(requestedSeekPercent)}% 지점부터 들을 준비를 했습니다.`);
    }
  }

  function setPlayingUi(panel) {
    const play = panel.querySelector("[data-mm-radio-play]");
    const pause = panel.querySelector("[data-mm-radio-pause]");
    const stop = panel.querySelector("[data-mm-radio-stop]");

    if (play) {
      play.disabled = playing && !paused;
      play.textContent = playing && paused ? "▶ 계속 듣기" : playing ? "재생 중" : "▶ 라디오로 듣기";
    }
    if (pause) {
      pause.disabled = !playing;
      pause.textContent = paused ? "▶ 계속" : "Ⅱ 잠깐 멈춤";
    }
    if (stop) stop.disabled = !playing;
  }

  function clearSleepTimer() {
    if (sleepTimerId) window.clearTimeout(sleepTimerId);
    sleepTimerId = null;
  }

  function stopPlayback(panel, message = "재생을 정지했습니다.") {
    clearSleepTimer();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    currentUtterance = null;
    playing = false;
    paused = false;
    chunkIndex = 0;
    updateProgress(panel);
    setPlayingUi(panel);
    updateSeekUi(panel, requestedSeekPercent);
    setStatus(panel, message);
  }

  function scheduleSleepTimer(panel) {
    clearSleepTimer();
    const value = Number(panel.querySelector("[data-mm-radio-timer]")?.value || 0);
    if (!value) return;

    sleepTimerId = window.setTimeout(() => {
      stopPlayback(panel, `취침 타이머 ${value}분이 끝나 재생을 멈췄습니다.`);
    }, value * 60 * 1000);
  }

  function speakNext(panel) {
    if (!playing || paused || !("speechSynthesis" in window)) return;
    if (chunkIndex >= chunks.length) {
      clearSleepTimer();
      playing = false;
      paused = false;
      setPlayingUi(panel);
      updateProgress(panel);
      setStatus(panel, "문서 설명을 모두 들었습니다.");
      return;
    }

    const text = chunks[chunkIndex];
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectedVoice(panel);
    const rate = Number(panel.querySelector("[data-mm-radio-rate]")?.value || 0.92);

    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || "ko-KR";
    const friendlyLine = /자,|좋습니다|잠깐|볼게요|기억해|괜찮습니다|바로 이어서/.test(text);
    utterance.rate = Math.max(0.72, Math.min(1.2, rate + (friendlyLine ? 0.01 : 0)));
    utterance.pitch = friendlyLine ? 1.03 : 0.99;
    utterance.volume = 1;

    utterance.onend = () => {
      if (!playing || paused) return;
      chunkIndex += 1;
      updateProgress(panel);
      window.setTimeout(() => speakNext(panel), 135);
    };

    utterance.onerror = (event) => {
      if (!playing) return;
      if (event.error === "canceled" || event.error === "interrupted") return;
      chunkIndex += 1;
      updateProgress(panel);
      window.setTimeout(() => speakNext(panel), 120);
    };

    currentUtterance = utterance;
    updateProgress(panel);
    setStatus(panel, `설명 중 · ${text.slice(0, 52)}${text.length > 52 ? "…" : ""}`);
    window.speechSynthesis.speak(utterance);
  }

  function startPlayback(panel) {
    if (!("speechSynthesis" in window)) {
      setStatus(panel, "이 브라우저에서는 음성 재생을 지원하지 않습니다.");
      return;
    }

    if (playing && paused) {
      paused = false;
      try {
        window.speechSynthesis.resume();
      } catch (_error) {
        // Some Android engines resume only when the next utterance is queued.
      }
      setPlayingUi(panel);
      setStatus(panel, "설명을 이어서 재생합니다.");
      if (!window.speechSynthesis.speaking) speakNext(panel);
      return;
    }

    window.speechSynthesis.cancel();
    const mode = panel.querySelector("[data-mm-radio-mode]")?.value || "core";
    chunks = buildChunks(mode);

    if (!chunks.length) {
      setStatus(panel, "읽을 본문을 찾지 못했습니다.");
      return;
    }

    chunkIndex = Math.min(
      chunks.length - 1,
      Math.max(0, Math.round((requestedSeekPercent / 100) * (chunks.length - 1)))
    );

    playing = true;
    paused = false;
    saveSettings(panel);
    scheduleSleepTimer(panel);
    setPlayingUi(panel);
    updateProgress(panel);

    const estimatedMinutes = Math.max(1, Math.round(chunks.join(" ").length / 360));
    const startNote = requestedSeekPercent > 0 ? ` · ${Math.round(requestedSeekPercent)}% 지점부터` : "";
    setStatus(panel, `${mode === "core" ? "핵심 설명" : "전체 설명"} · 약 ${estimatedMinutes}분${startNote} · 뉴스처럼 또렷하고 친구처럼 편한 말투로 들려드립니다.`);
    window.setTimeout(() => speakNext(panel), 120);
  }

  function togglePause(panel) {
    if (!playing || !("speechSynthesis" in window)) return;

    if (paused) {
      paused = false;
      try {
        window.speechSynthesis.resume();
      } catch (_error) {}
      if (!window.speechSynthesis.speaking) speakNext(panel);
      setStatus(panel, "설명을 이어서 재생합니다.");
    } else {
      paused = true;
      try {
        window.speechSynthesis.pause();
      } catch (_error) {}
      setStatus(panel, "잠깐 멈췄습니다.");
    }

    setPlayingUi(panel);
  }

  function mount() {
    document.querySelectorAll(PLAYER_SELECTOR).forEach((old) => old.remove());
    if (!isAnalysisDocument()) return;

    const content = document.querySelector(".md-content .md-typeset");
    const heading = content?.querySelector("h1");
    if (!content || !heading) return;

    if (playing && "speechSynthesis" in window) window.speechSynthesis.cancel();
    clearSleepTimer();
    playing = false;
    paused = false;
    chunks = [];
    chunkIndex = 0;
    requestedSeekPercent = 0;
    seekDragging = false;

    const settings = loadSettings();
    const panel = document.createElement("section");
    panel.className = "mm-radio-player";
    panel.dataset.mmRadioPlayer = "";
    panel.innerHTML = `
      <div class="mm-radio-player__head">
        <div>
          <span class="mm-radio-eyebrow">MARKET MEMO RADIO</span>
          <strong>눈 감고 듣기</strong>
          <p>핵심은 뉴스처럼 또렷하게, 말투는 친한 친구처럼 부드럽게 설명합니다.</p>
        </div>
        <button type="button" class="mm-radio-primary" data-mm-radio-play>▶ 라디오로 듣기</button>
      </div>

      <div class="mm-radio-controls">
        <label>
          <span>내용</span>
          <select data-mm-radio-mode>
            <option value="core">핵심 설명</option>
            <option value="full">전체 설명</option>
          </select>
        </label>
        <label class="mm-radio-voice-field">
          <span>목소리</span>
          <select data-mm-radio-voice>
            <option value="auto">추천 한국어 음성 자동 선택</option>
          </select>
        </label>
        <label>
          <span>속도</span>
          <select data-mm-radio-rate>
            <option value="0.84">0.84× 느긋하게</option>
            <option value="0.92">0.92× 취침 추천</option>
            <option value="1">1.00× 보통</option>
            <option value="1.08">1.08× 빠르게</option>
          </select>
        </label>
        <label>
          <span>취침 타이머</span>
          <select data-mm-radio-timer>
            <option value="0">사용 안 함</option>
            <option value="15">15분</option>
            <option value="30">30분</option>
            <option value="45">45분</option>
            <option value="60">60분</option>
          </select>
        </label>
      </div>

      <div class="mm-radio-seek">
        <div class="mm-radio-seek__top">
          <strong data-mm-radio-seek-label>시작 위치 0%</strong>
          <div class="mm-radio-seek__quick" aria-label="빠른 시작 위치">
            <button type="button" data-mm-radio-jump="0" class="is-active">처음</button>
            <button type="button" data-mm-radio-jump="25">25%</button>
            <button type="button" data-mm-radio-jump="50">50%</button>
            <button type="button" data-mm-radio-jump="75">75%</button>
          </div>
        </div>
        <input type="range" min="0" max="100" step="1" value="0" data-mm-radio-seek aria-label="재생 시작 위치" />
      </div>

      <div class="mm-radio-actions">
        <button type="button" data-mm-radio-pause disabled>Ⅱ 잠깐 멈춤</button>
        <button type="button" data-mm-radio-stop disabled>■ 정지</button>
        <span class="mm-radio-quality">뉴스 앵커 + 편한 친구 톤</span>
      </div>

      <div class="mm-radio-progress-track" aria-hidden="true">
        <span data-mm-radio-progress></span>
      </div>
      <div class="mm-radio-footer">
        <span data-mm-radio-status>재생을 누르면 설명형 스크립트를 즉석에서 구성합니다.</span>
        <b data-mm-radio-progress-label>준비</b>
      </div>
      <p class="mm-radio-note">문장 구성은 뉴스처럼 핵심을 먼저 짚고, 중간 연결은 친구가 옆에서 설명하듯 부드럽게 바꿉니다. 실제 목소리의 질감은 휴대폰·브라우저의 한국어 음성 엔진에 따라 달라질 수 있습니다.</p>
    `;

    const readingControls = content.querySelector("[data-mm-reading-controls]");
    if (readingControls) readingControls.insertAdjacentElement("afterend", panel);
    else heading.insertAdjacentElement("afterend", panel);

    const mode = panel.querySelector("[data-mm-radio-mode]");
    const rate = panel.querySelector("[data-mm-radio-rate]");
    const timer = panel.querySelector("[data-mm-radio-timer]");

    if (settings.mode && mode) mode.value = settings.mode;
    if (settings.rate && rate) rate.value = settings.rate;
    if (settings.timer && timer) timer.value = settings.timer;

    populateVoices(panel);

    panel.querySelector("[data-mm-radio-play]")?.addEventListener("click", () => startPlayback(panel));
    panel.querySelector("[data-mm-radio-pause]")?.addEventListener("click", () => togglePause(panel));
    panel.querySelector("[data-mm-radio-stop]")?.addEventListener("click", () => stopPlayback(panel));

    const seek = panel.querySelector("[data-mm-radio-seek]");
    seek?.addEventListener("pointerdown", () => {
      seekDragging = true;
    });
    seek?.addEventListener("input", () => {
      requestedSeekPercent = clampPercent(seek.value);
      const label = panel.querySelector("[data-mm-radio-seek-label]");
      if (label) label.textContent = `${playing ? "재생 위치" : "시작 위치"} ${Math.round(requestedSeekPercent)}%`;
    });
    seek?.addEventListener("change", () => {
      seekDragging = false;
      seekToPercent(panel, seek.value);
    });
    seek?.addEventListener("pointerup", () => {
      seekDragging = false;
    });

    panel.querySelectorAll("[data-mm-radio-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        seekDragging = false;
        seekToPercent(panel, button.dataset.mmRadioJump || 0);
      });
    });

    panel.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => {
        saveSettings(panel);
        if (select.matches("[data-mm-radio-mode]") && playing) {
          stopPlayback(panel, "내용 범위를 바꿨습니다. 시작 위치를 확인한 뒤 다시 재생해주세요.");
        }
      });
    });

    if (!("speechSynthesis" in window)) {
      panel.querySelector("[data-mm-radio-play]").disabled = true;
      setStatus(panel, "이 브라우저에서는 음성 합성을 지원하지 않습니다.");
    }

    setPlayingUi(panel);
    updateSeekUi(panel, requestedSeekPercent);
  }

  document.addEventListener("DOMContentLoaded", mount);

  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      mount();
    });
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener?.("voiceschanged", () => {
      const panel = document.querySelector(PLAYER_SELECTOR);
      if (panel) populateVoices(panel);
    });
  }

  window.addEventListener("beforeunload", () => {
    clearSleepTimer();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  });
})();
