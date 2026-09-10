from __future__ import annotations

import html
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / ".site-docs"
WEBSITE = ROOT / "website"

CONTENT_ROOTS = ("시황", "산업-테마", "종목분석", "자료정책")
ROOT_DOCS = ("최근-업데이트.md", "면책고지.md")

README_LINK_RE = re.compile(r"(\]\()([^\)\n]*?)README\.md((?:#[^\)]*)?\))")


def run_git(*args: str) -> str:
    try:
        completed = subprocess.run(
            ["git", *args],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
        return completed.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def is_markdown(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() == ".md"


def is_analysis_document(path: Path) -> bool:
    if not is_markdown(path):
        return False
    if path.name in {"README.md", "AGENTS.md"}:
        return False
    if "템플릿" in path.stem:
        return False
    try:
        relative = path.relative_to(ROOT)
    except ValueError:
        return False
    return relative.parts and relative.parts[0] in {"시황", "산업-테마", "종목분석"}


def destination_for(source: Path) -> Path:
    relative = source.relative_to(ROOT)
    if source.name == "README.md":
        relative = relative.with_name("index.md")
    return OUT / relative


def rewrite_readme_links(text: str) -> str:
    # 폴더 README는 사이트에서 index.md로 복제되므로 링크 목적지만 맞춘다.
    return README_LINK_RE.sub(lambda m: f"{m.group(1)}{m.group(2)}index.md{m.group(3)}", text)


def copy_markdown(source: Path) -> None:
    destination = destination_for(source)
    destination.parent.mkdir(parents=True, exist_ok=True)
    text = source.read_text(encoding="utf-8")
    destination.write_text(rewrite_readme_links(text), encoding="utf-8")


def title_for(path: Path) -> str:
    try:
        text = path.read_text(encoding="utf-8")
    except OSError:
        return path.stem
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem.replace("-", " ")


def site_path_for(source: Path) -> str:
    relative = source.relative_to(ROOT)
    if source.name == "README.md":
        relative = relative.with_name("index.md")
    return relative.as_posix()


def site_route_for(source: Path) -> str:
    relative = source.relative_to(ROOT)
    if source.name == "README.md":
        relative = relative.with_name("index.md")
    if relative.name == "index.md":
        route = relative.parent.as_posix()
    else:
        route = relative.with_suffix("").as_posix()
    return f"{route.rstrip('/')}/" if route not in {"", "."} else "./"


def last_commit_for(path: Path) -> tuple[str, str]:
    raw = run_git("log", "-1", "--format=%cs%x1f%s", "--", path.relative_to(ROOT).as_posix())
    if "\x1f" not in raw:
        return "", ""
    date, message = raw.split("\x1f", 1)
    return date.strip(), message.strip()


def recent_documents(limit: int = 8, prefix: str | None = None) -> list[Path]:
    raw = run_git(
        "log",
        "--format=",
        "--name-only",
        "--diff-filter=AM",
        "-n",
        "120",
        "--",
        "*.md",
    )
    seen: set[str] = set()
    result: list[Path] = []

    for line in raw.splitlines():
        candidate = line.strip()
        if not candidate or candidate in seen:
            continue
        seen.add(candidate)
        path = ROOT / candidate
        if not is_analysis_document(path):
            continue
        if prefix and not candidate.startswith(prefix.rstrip("/") + "/"):
            continue
        result.append(path)
        if len(result) >= limit:
            break

    if result:
        return result

    # git 정보가 없는 로컬 복사본에서도 최소한 동작하도록 fallback.
    candidates: list[Path] = []
    for root_name in ("시황", "산업-테마", "종목분석"):
        root = ROOT / root_name
        if root.exists():
            candidates.extend(path for path in root.rglob("*.md") if is_analysis_document(path))
    candidates.sort(key=lambda p: p.as_posix())
    if prefix:
        candidates = [
            p for p in candidates if p.relative_to(ROOT).as_posix().startswith(prefix.rstrip("/") + "/")
        ]
    return candidates[:limit]


def all_documents() -> list[Path]:
    paths: list[Path] = []
    for root_name in ("시황", "산업-테마", "종목분석"):
        root = ROOT / root_name
        if root.exists():
            paths.extend(path for path in root.rglob("*.md") if is_analysis_document(path))

    dated: list[tuple[str, str, Path]] = []
    for path in paths:
        date, _message = last_commit_for(path)
        dated.append((date, path.relative_to(ROOT).as_posix(), path))

    dated.sort(key=lambda item: (item[0], item[1]), reverse=True)
    return [path for _date, _name, path in dated]


def card_list(paths: list[Path], empty_text: str) -> str:
    if not paths:
        return empty_text

    rows = ['<div class="grid cards mm-card-grid" markdown>']
    for path in paths:
        date, message = last_commit_for(path)
        title = title_for(path)
        href = site_path_for(path)
        meta = " · ".join(part for part in (date, message) if part)
        rows.extend(
            [
                "",
                f"-   **{title}**",
                "",
                f"    <span class=\"mm-card-meta\">{meta or 'Market Memo'}</span>",
                "",
                f"    [문서 열기 →]({href})",
            ]
        )
    rows.extend(["", "</div>"])
    return "\n".join(rows)


def reading_card_list(paths: list[Path]) -> str:
    if not paths:
        return '<p class="mm-reading-empty">분석 문서가 없습니다.</p>'

    rows = ['<div class="mm-reading-grid" data-mm-reading-list>']
    for path in paths:
        date, message = last_commit_for(path)
        title = html.escape(title_for(path))
        relative = path.relative_to(ROOT)
        category = html.escape(relative.parts[0])
        route = html.escape(site_route_for(path), quote=True)
        meta = html.escape(" · ".join(part for part in (date, message) if part) or "Market Memo")

        rows.extend(
            [
                f'  <article class="mm-reading-card" data-mm-doc-path="{route}" data-mm-state="unread">',
                '    <div class="mm-reading-card__top">',
                '      <span class="mm-reading-card-status" data-mm-card-status>안 읽음</span>',
                '      <span class="mm-reading-card-favorite" data-mm-card-favorite aria-hidden="true"></span>',
                "    </div>",
                f"    <h3>{title}</h3>",
                f'    <p class="mm-reading-card-meta">{category} · {meta}</p>',
                f'    <a class="mm-reading-card-link" href="{route}">문서 열기 →</a>',
                "  </article>",
            ]
        )

    rows.extend(
        [
            '  <p class="mm-reading-empty" data-mm-reading-empty hidden>이 조건에 해당하는 문서가 없습니다.</p>',
            "</div>",
        ]
    )
    return "\n".join(rows)


def document_counts() -> dict[str, int]:
    counts = {"시황": 0, "산업-테마": 0, "종목분석": 0}
    for root_name in counts:
        root = ROOT / root_name
        if root.exists():
            counts[root_name] = sum(1 for path in root.rglob("*.md") if is_analysis_document(path))
    counts["전체"] = sum(counts.values())
    return counts


def build_homepage() -> None:
    template = (WEBSITE / "home.md").read_text(encoding="utf-8")
    counts = document_counts()
    replacements = {
        "{{DOC_COUNT}}": str(counts["전체"]),
        "{{MARKET_COUNT}}": str(counts["시황"]),
        "{{THEME_COUNT}}": str(counts["산업-테마"]),
        "{{STOCK_COUNT}}": str(counts["종목분석"]),
        "{{RECENT_DOCS}}": card_list(recent_documents(limit=8), "최근 분석 문서가 없습니다."),
        "{{SCHEDULE_DOCS}}": card_list(
            recent_documents(limit=4, prefix="시황/주요일정"),
            "등록된 주요 일정 문서가 없습니다.",
        ),
        "{{READING_DOCS}}": reading_card_list(all_documents()),
    }
    for key, value in replacements.items():
        template = template.replace(key, value)
    (OUT / "index.md").write_text(template, encoding="utf-8")


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    for root_doc in ROOT_DOCS:
        path = ROOT / root_doc
        if path.exists():
            copy_markdown(path)

    for root_name in CONTENT_ROOTS:
        root = ROOT / root_name
        if not root.exists():
            continue
        for path in sorted(root.rglob("*.md")):
            if path.name == "AGENTS.md":
                continue
            copy_markdown(path)

    assets = WEBSITE / "assets"
    if assets.exists():
        shutil.copytree(assets, OUT / "assets", dirs_exist_ok=True)

    build_homepage()

    page_count = len(list(OUT.rglob("*.md")))
    print(f"Prepared {page_count} Markdown pages in {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
