(() => {
  const STORAGE_KEY = "market-memo:reading-state:v1";
  const VALID_STATUSES = new Set(["unread", "reading", "read"]);
  const STATUS_LABELS = {
    unread: "안 읽음",
    reading: "읽는 중",
    read: "읽음",
  };

  let memoryState = {};
  let storageAvailable = true;
  let activeFilter = "all";

  function siteRootUrl() {
    const logo = document.querySelector("a.md-header__button.md-logo[href]");
    if (logo) {
      try {
        return new URL(logo.href, window.location.href);
      } catch (_error) {
        // Fall through to a safe default.
      }
    }

    const path = window.location.pathname;
    const deployedPrefix = "/market-memo/";
    const rootPath = path.startsWith(deployedPrefix) ? deployedPrefix : "/";
    return new URL(rootPath, window.location.origin);
  }

  function documentKey(input = window.location.href) {
    try {
      const root = siteRootUrl();
      const url = new URL(input, root);
      let pathname = decodeURIComponent(url.pathname);
      const rootPath = decodeURIComponent(root.pathname).replace(/\/+$/, "/");

      if (pathname.startsWith(rootPath)) {
        pathname = pathname.slice(rootPath.length);
      } else {
        pathname = pathname.replace(/^\/+/, "");
      }

      return pathname
        .replace(/index\.html$/i, "")
        .replace(/\.html$/i, "")
        .replace(/\/+$/, "")
        .replace(/^\/+/, "");
    } catch (_error) {
      return "";
    }
  }

  function isAnalysisDocument(key) {
    if (!key || key.includes("템플릿")) return false;
    return (
      key.startsWith("시황/") ||
      key.startsWith("산업-테마/") ||
      key.startsWith("종목분석/")
    );
  }

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_error) {
      storageAvailable = false;
      return memoryState;
    }
  }

  function saveState(state) {
    memoryState = state;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      storageAvailable = true;
    } catch (_error) {
      storageAvailable = false;
    }
  }

  function entryFor(key) {
    const state = loadState();
    const raw = state[key] || {};
    const status = VALID_STATUSES.has(raw.status) ? raw.status : "unread";
    return {
      status,
      favorite: Boolean(raw.favorite),
      updatedAt: raw.updatedAt || null,
    };
  }

  function updateEntry(key, changes) {
    if (!isAnalysisDocument(key)) return;
    const state = loadState();
    const current = entryFor(key);
    const next = {
      ...current,
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    if (!VALID_STATUSES.has(next.status)) next.status = "unread";
    state[key] = next;
    saveState(state);
    refresh();
  }

  function statusText(entry) {
    return STATUS_LABELS[entry.status] || STATUS_LABELS.unread;
  }

  function renderDocumentControls(panel, key) {
    const entry = entryFor(key);
    panel.dataset.state = entry.status;
    panel.dataset.favorite = entry.favorite ? "true" : "false";

    panel.querySelectorAll("[data-mm-set-status]").forEach((button) => {
      const selected = button.dataset.mmSetStatus === entry.status;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    const favorite = panel.querySelector("[data-mm-toggle-favorite]");
    if (favorite) {
      favorite.classList.toggle("is-active", entry.favorite);
      favorite.setAttribute("aria-pressed", entry.favorite ? "true" : "false");
      favorite.textContent = entry.favorite ? "★ 즐겨찾기" : "☆ 즐겨찾기";
    }

    const note = panel.querySelector("[data-mm-storage-note]");
    if (note) {
      note.textContent = storageAvailable
        ? "이 상태는 현재 브라우저에만 저장되며 GitHub 문서에는 기록되지 않습니다."
        : "브라우저 저장을 사용할 수 없어 현재 탭에서만 상태가 유지됩니다.";
    }
  }

  function mountDocumentControls() {
    const key = documentKey();
    if (!isAnalysisDocument(key)) return;

    const content = document.querySelector(".md-content .md-typeset");
    const heading = content?.querySelector("h1");
    if (!content || !heading) return;

    let panel = content.querySelector("[data-mm-reading-controls]");
    if (!panel) {
      panel = document.createElement("section");
      panel.className = "mm-reading-controls";
      panel.dataset.mmReadingControls = "";
      panel.innerHTML = `
        <div class="mm-reading-controls__row" role="group" aria-label="문서 읽기 상태">
          <button type="button" class="mm-reading-button" data-mm-set-status="unread">● 안 읽음</button>
          <button type="button" class="mm-reading-button" data-mm-set-status="reading">◐ 읽는 중</button>
          <button type="button" class="mm-reading-button" data-mm-set-status="read">✓ 읽음</button>
          <button type="button" class="mm-reading-button mm-reading-favorite" data-mm-toggle-favorite>☆ 즐겨찾기</button>
        </div>
        <p class="mm-reading-storage-note" data-mm-storage-note></p>
      `;
      heading.insertAdjacentElement("afterend", panel);

      panel.querySelectorAll("[data-mm-set-status]").forEach((button) => {
        button.addEventListener("click", () => {
          updateEntry(key, { status: button.dataset.mmSetStatus });
        });
      });

      panel.querySelector("[data-mm-toggle-favorite]")?.addEventListener("click", () => {
        const current = entryFor(key);
        updateEntry(key, { favorite: !current.favorite });
      });
    }

    renderDocumentControls(panel, key);
  }

  function cardKey(card) {
    const explicit = card.dataset.mmDocPath;
    if (explicit) return documentKey(explicit);
    const link = card.querySelector("a[href]");
    return link ? documentKey(link.href) : "";
  }

  function renderReadingDashboard() {
    const dashboard = document.querySelector("[data-mm-reading-dashboard]");
    const list = document.querySelector("[data-mm-reading-list]");
    if (!dashboard || !list) return;

    const cards = [...list.querySelectorAll(".mm-reading-card")];
    const counts = { all: cards.length, unread: 0, reading: 0, read: 0, favorite: 0 };

    for (const card of cards) {
      const key = cardKey(card);
      if (!isAnalysisDocument(key)) continue;
      const entry = entryFor(key);
      counts[entry.status] += 1;
      if (entry.favorite) counts.favorite += 1;

      card.dataset.state = entry.status;
      card.dataset.favorite = entry.favorite ? "true" : "false";
      const badge = card.querySelector("[data-mm-card-status]");
      if (badge) badge.textContent = statusText(entry);
      const star = card.querySelector("[data-mm-card-favorite]");
      if (star) {
        star.textContent = entry.favorite ? "★" : "";
        star.setAttribute("aria-label", entry.favorite ? "즐겨찾기" : "");
      }

      const visible =
        activeFilter === "all" ||
        (activeFilter === "favorite" ? entry.favorite : entry.status === activeFilter);
      card.hidden = !visible;
    }

    Object.entries(counts).forEach(([name, count]) => {
      dashboard.querySelectorAll(`[data-mm-count="${name}"]`).forEach((node) => {
        node.textContent = String(count);
      });
    });

    dashboard.querySelectorAll("[data-mm-filter]").forEach((button) => {
      const selected = button.dataset.mmFilter === activeFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    const empty = list.querySelector("[data-mm-reading-empty]");
    if (empty) {
      empty.hidden = cards.some((card) => !card.hidden);
    }

    if (!dashboard.dataset.mmBound) {
      dashboard.dataset.mmBound = "true";
      dashboard.querySelectorAll("[data-mm-filter]").forEach((button) => {
        button.addEventListener("click", () => {
          activeFilter = button.dataset.mmFilter || "all";
          renderReadingDashboard();
        });
      });
    }
  }

  function renderInlineCardStatuses() {
    document.querySelectorAll(".mm-card-grid a[href]").forEach((link) => {
      const key = documentKey(link.href);
      if (!isAnalysisDocument(key)) return;
      const entry = entryFor(key);

      let badge = link.querySelector(".mm-inline-reading-status");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "mm-inline-reading-status";
        link.append(" ", badge);
      }
      badge.dataset.state = entry.status;
      badge.textContent = entry.favorite ? `★ ${statusText(entry)}` : statusText(entry);
    });
  }

  function refresh() {
    mountDocumentControls();
    renderReadingDashboard();
    renderInlineCardStatuses();
  }

  document.addEventListener("DOMContentLoaded", refresh);

  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      activeFilter = "all";
      refresh();
    });
  }

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) refresh();
  });
})();
