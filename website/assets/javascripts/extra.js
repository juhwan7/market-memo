(() => {
  const tokenMap = new Map([
    ["[확정]", "status-confirmed"],
    ["[당사자 주장]", "status-claim"],
    ["[가능성 높음]", "status-likely"],
    ["[시장 기대]", "status-expectation"],
    ["[추정]", "status-estimate"],
    ["[확인되지 않음]", "status-unconfirmed"],
  ]);

  const tokenPattern = /(\[확정\]|\[당사자 주장\]|\[가능성 높음\]|\[시장 기대\]|\[추정\]|\[확인되지 않음\]|★★★|★★|★)/g;
  const ignored = "code, pre, a, script, style, .status-badge, .importance-badge";

  function badgeFor(token) {
    const span = document.createElement("span");
    if (token.startsWith("★")) {
      span.className = "importance-badge";
    } else {
      span.className = `status-badge ${tokenMap.get(token) || ""}`;
    }
    span.textContent = token;
    return span;
  }

  function enhance(root = document) {
    const content = root.querySelector?.(".md-content") || document.querySelector(".md-content");
    if (!content) return;

    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const targets = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || parent.closest(ignored)) continue;
      if (!tokenPattern.test(node.nodeValue || "")) {
        tokenPattern.lastIndex = 0;
        continue;
      }
      tokenPattern.lastIndex = 0;
      targets.push(node);
    }

    for (const node of targets) {
      const text = node.nodeValue || "";
      const fragment = document.createDocumentFragment();
      let cursor = 0;

      text.replace(tokenPattern, (match, _capture, offset) => {
        if (offset > cursor) fragment.append(text.slice(cursor, offset));
        fragment.append(badgeFor(match));
        cursor = offset + match.length;
        return match;
      });

      if (cursor < text.length) fragment.append(text.slice(cursor));
      node.replaceWith(fragment);
      tokenPattern.lastIndex = 0;
    }
  }

  document.addEventListener("DOMContentLoaded", () => enhance());
  if (typeof document$ !== "undefined") {
    document$.subscribe(() => enhance());
  }
})();
