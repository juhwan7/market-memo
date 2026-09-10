from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Any

import requests
import yaml
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
KST = timezone(timedelta(hours=9))
TODAY = datetime.now(KST).date().isoformat()


def load_yaml(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def fetch_html(url: str) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; market-memo-ipo-watch/1.0; +https://github.com/juhwan7/market-memo)",
        "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.7",
    }
    response = requests.get(url, headers=headers, timeout=30)
    response.raise_for_status()
    if not response.encoding or response.encoding.lower() == "iso-8859-1":
        response.encoding = response.apparent_encoding or "utf-8"
    return response.text


def detect_new_listing(html: str, company: str) -> tuple[bool, str | None, str | None]:
    soup = BeautifulSoup(html, "html.parser")
    target = soup.find(string=lambda s: isinstance(s, str) and company in s)
    if target is None:
        return False, None, None

    row = target.find_parent("tr")
    context = str(row) if row else str(target.parent or target)
    row_text = row.get_text(" ", strip=True) if row else target.strip()

    code = None
    for pattern in (
        r"repIsuSrtCd=A?(\d{6})",
        r"isuSrtCd=A?(\d{6})",
        r"isuCd=A?(\d{6})",
        r"\bA(\d{6})\b",
    ):
        match = re.search(pattern, context)
        if match:
            code = match.group(1)
            break

    date_match = re.search(r"20\d{2}[-./]\d{2}[-./]\d{2}", row_text)
    listing_date = date_match.group(0).replace(".", "-").replace("/", "-") if date_match else None
    return True, code, listing_date


def replace_line(text: str, label: str, replacement: str) -> str:
    pattern = rf"^- \*\*{re.escape(label)}:\*\*.*$"
    if re.search(pattern, text, flags=re.MULTILINE):
        return re.sub(pattern, replacement, text, count=1, flags=re.MULTILINE)
    return text


def upsert_auto_status(text: str, block: str) -> str:
    start = "<!-- AUTO_IPO_STATUS_START -->"
    end = "<!-- AUTO_IPO_STATUS_END -->"
    wrapped = f"{start}\n{block.rstrip()}\n{end}"
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.DOTALL)
    if pattern.search(text):
        return pattern.sub(wrapped, text, count=1)

    anchor = "> 이 문서는"
    idx = text.find(anchor)
    if idx >= 0:
        line_end = text.find("\n", idx)
        if line_end >= 0:
            return text[: line_end + 1] + "\n" + wrapped + "\n" + text[line_end + 1 :]

    first_sep = text.find("\n---\n")
    if first_sep >= 0:
        return text[:first_sep] + "\n\n" + wrapped + "\n" + text[first_sep:]
    return text.rstrip() + "\n\n" + wrapped + "\n"


def insert_update_log(text: str, date: str, lines: list[str]) -> str:
    heading = f"## {date}"
    entry = "\n".join(lines).rstrip() + "\n"
    if heading in text:
        pos = text.find(heading) + len(heading)
        return text[:pos] + "\n\n### 자동감시\n\n" + entry + text[pos:]

    first_date = re.search(r"^## 20\d{2}-\d{2}-\d{2}\s*$", text, flags=re.MULTILINE)
    block = f"{heading}\n\n### 자동감시\n\n{entry}\n"
    if first_date:
        return text[: first_date.start()] + block + text[first_date.start() :]
    return text.rstrip() + "\n\n" + block


def insert_readme_recent(text: str, date: str, bullet_lines: list[str]) -> str:
    section = "## 최근 업데이트"
    sec_pos = text.find(section)
    if sec_pos < 0:
        return text

    next_section = text.find("\n## ", sec_pos + len(section))
    end = next_section if next_section >= 0 else len(text)
    chunk = text[sec_pos:end]
    date_heading = f"### {date}"
    bullets = "\n".join(bullet_lines).rstrip() + "\n"

    if date_heading in chunk:
        local = chunk.find(date_heading) + len(date_heading)
        new_chunk = chunk[:local] + "\n\n" + bullets + chunk[local:]
    else:
        marker = "전체 변경 기록은 [`최근-업데이트.md`](최근-업데이트.md)에서 확인합니다."
        local = chunk.find(marker)
        if local >= 0:
            local += len(marker)
            new_chunk = chunk[:local] + f"\n\n{date_heading}\n\n{bullets}" + chunk[local:]
        else:
            new_chunk = chunk.rstrip() + f"\n\n{date_heading}\n\n{bullets}\n"

    return text[:sec_pos] + new_chunk + text[end:]


def create_stock_document(
    path: Path,
    company: str,
    code: str,
    ipo_doc: str,
    listing_date: str | None,
    source_url: str,
) -> None:
    if path.exists():
        return

    listing_date_text = listing_date or TODAY
    content = f"""# {company} ({code})

- **마지막 업데이트:** {TODAY}
- **종목코드:** {code}
- **종목명:** {company}
- **시장:** KOSPI
- **상태:** 신규상장 확인
- **상장일:** {listing_date_text}
- **핵심 한줄 요약:** KRX KIND 신규상장기업현황에서 상장이 확인되어 비상장 IPO 추적 문서에서 상장 종목 분석 대상으로 전환된 초기 문서입니다.

> 이 문서는 자동 감시가 만든 **전환 초안**입니다. 실제 종목 분석을 시작할 때 최신 사업·실적·공시·수급 자료를 다시 조사해 보강해야 합니다.

## IPO 이력

- 기존 IPO 추적 문서: [`{Path(ipo_doc).name}`](../../비상장기업/{Path(ipo_doc).name})
- 공식 확인 출처: [KRX KIND 신규상장기업현황]({source_url})

## 다음 업데이트 때 확인할 것

- 상장 직후 시가총액과 공모가 대비 주가
- 보호예수·구주매출·FI 지분 변화
- 상장 후 첫 분기 실적
- 외국인·기관 수급
- 사업·실적·밸류에이션 종합 분석

## 업데이트 내역

### {TODAY}
- KRX KIND 신규상장 확인에 따라 자동 전환 초안 생성
"""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def process_target(target: dict[str, Any]) -> bool:
    if not target.get("enabled", True) or target.get("type") != "ipo":
        return False

    company = target["company"]
    source_url = target["sources"]["kind_new_listing"]
    html = fetch_html(source_url)
    listed, code, listing_date = detect_new_listing(html, company)

    state_path = ROOT / target["state_file"]
    state = load_json(state_path)
    current = state.get("status")

    print(
        f"[{company}] current={current} listed_detected={listed} "
        f"code={code} listing_date={listing_date}"
    )

    if not listed or current == "listed":
        return False

    state.update(
        {
            "status": "listed",
            "status_label": "신규상장 완료",
            "status_changed_at": listing_date or TODAY,
            "last_official_detection_at": TODAY,
            "stock_code": code,
            "source": source_url,
        }
    )
    save_json(state_path, state)

    doc_path = ROOT / target["document"]
    text = doc_path.read_text(encoding="utf-8")
    text = replace_line(text, "마지막 업데이트", f"- **마지막 업데이트:** {TODAY}")
    text = replace_line(
        text,
        "현재 상태",
        "- **현재 상태:** 신규상장 완료 — KRX KIND 공식 신규상장기업현황에서 확인",
    )
    text = replace_line(
        text,
        "핵심 한줄 요약",
        f"- **핵심 한줄 요약:** {company}는 KRX KIND 신규상장기업현황에서 신규상장이 확인되어 IPO 추적 단계가 종료됐습니다. 이후 정보는 상장 종목 기준으로 최신 자료를 다시 확인해야 합니다.",
    )

    status_block = f"""## 자동 감시 상태

- **감지 결과:** 신규상장 완료
- **공식 확인일:** {TODAY}
- **상장일:** {listing_date or 'KIND 행에서 날짜 추출 실패 — 원문 확인 필요'}
- **종목코드:** {code or '자동 추출 실패 — 원문 확인 필요'}
- **확인 출처:** [KRX KIND 신규상장기업현황]({source_url})
- **주의:** 이 블록은 기사나 검색 결과가 아니라 KRX KIND 신규상장기업현황에 회사명이 실제 표시된 경우에만 갱신됩니다.
"""
    text = upsert_auto_status(text, status_block)
    doc_path.write_text(text, encoding="utf-8")

    if code:
        stock_path = ROOT / f"종목분석/한국주식/{code}-{company}.md"
        create_stock_document(stock_path, company, code, target["document"], listing_date, source_url)

    log_path = ROOT / "최근-업데이트.md"
    log = log_path.read_text(encoding="utf-8")
    log_lines = [
        f'- `{target["document"]}`',
        f"  - KRX KIND에서 {company} 신규상장을 자동 감지해 상태를 `신규상장 완료`로 변경",
    ]
    if code:
        log_lines.append(
            f"  - 종목코드 `{code}`를 감지해 `종목분석/한국주식/{code}-{company}.md` 전환 초안 생성"
        )
    else:
        log_lines.append("  - 종목코드 자동 추출에 실패해 한국주식 문서 전환은 보류")
    log_path.write_text(insert_update_log(log, TODAY, log_lines), encoding="utf-8")

    readme_path = ROOT / "README.md"
    readme = readme_path.read_text(encoding="utf-8")
    readme_lines = [
        f"- **[자동감시] {company} 신규상장 확인** — KRX KIND 공식 신규상장기업현황 기준",
    ]
    if code:
        readme_lines.append(f"  - `종목분석/한국주식/{code}-{company}.md` 전환 초안 생성")
    readme_path.write_text(insert_readme_recent(readme, TODAY, readme_lines), encoding="utf-8")

    return True


def main() -> int:
    config = load_yaml(ROOT / "감시대상.yaml")
    changed = False
    errors: list[str] = []

    for target in config.get("targets", []):
        try:
            changed = process_target(target) or changed
        except Exception as exc:
            # fail closed: 접속/파싱 오류를 상태 변화로 해석하지 않는다.
            errors.append(f'{target.get("id", "unknown")}: {exc}')

    if errors:
        print("감시 중 오류가 발생했습니다. 상태는 변경하지 않습니다.", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("STATUS_CHANGED=true" if changed else "STATUS_CHANGED=false")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
