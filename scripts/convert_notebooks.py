#!/usr/bin/env python3
"""Convert Jupyter notebooks into Jekyll-compatible markdown files.

This script supports both of the workflows used by the project:
- `python scripts/convert_notebooks.py`
- `python scripts/convert_notebooks.py "_notebooks/...ipynb"`
- `from scripts.convert_notebooks import convert_notebooks; convert_notebooks()`

It converts notebooks under `_notebooks` into markdown files under `_posts`,
matching the filename pattern expected by the Makefile (`*_IPYNB_2_.md`).
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    import nbformat
except ImportError as exc:  # pragma: no cover - environment dependency
    raise SystemExit(f"Missing dependency: nbformat. Install requirements first. ({exc})") from exc

try:
    from nbconvert import MarkdownExporter
except ImportError as exc:  # pragma: no cover - environment dependency
    raise SystemExit(f"Missing dependency: nbconvert. Install requirements first. ({exc})") from exc

DEFAULT_SOURCE_DIR = Path("_notebooks")
DEFAULT_OUTPUT_DIR = Path("_posts")
DEFAULT_SUFFIX = "_IPYNB_2_"


def _build_output_path(notebook_path: Path, source_dir: Path = DEFAULT_SOURCE_DIR, output_dir: Path = DEFAULT_OUTPUT_DIR) -> Path:
    """Map a notebook path into its generated markdown path.

    Example:
        _notebooks/projects/gamify/2026-04-15-gamify.ipynb
        -> _posts/projects/gamify/2026-04-15-gamify_IPYNB_2_.md
    """
    rel_path = notebook_path.relative_to(source_dir)
    stem = rel_path.stem
    if not stem.endswith(DEFAULT_SUFFIX.strip("_")):
        stem = f"{stem}{DEFAULT_SUFFIX}"
    output_path = output_dir / rel_path.parent / f"{stem}.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    return output_path


def convert_notebook(notebook_path: str | Path, source_dir: Path = DEFAULT_SOURCE_DIR, output_dir: Path = DEFAULT_OUTPUT_DIR) -> Path:
    """Convert a single notebook to a markdown file in the Jekyll posts directory."""
    notebook = Path(notebook_path)
    if not notebook.exists():
        raise FileNotFoundError(f"Notebook not found: {notebook}")

    if not notebook.is_absolute():
        notebook = notebook.resolve()

    rel_source = notebook.resolve().relative_to(Path.cwd().resolve()) if notebook.is_relative_to(Path.cwd()) else notebook
    if not rel_source.exists():
        rel_source = notebook

    source_root = Path(source_dir).resolve()
    if notebook.exists() and source_dir.exists() and notebook.resolve().is_relative_to(source_root):
        output_path = _build_output_path(notebook.resolve(), source_root, output_dir.resolve())
    else:
        rel_file = notebook.name
        output_path = (output_dir / rel_file).with_suffix(".md")
        if rel_file.endswith(".ipynb"):
            output_path = output_path.with_name(f"{output_path.stem}{DEFAULT_SUFFIX}.md")
        output_path.parent.mkdir(parents=True, exist_ok=True)

    exporter = MarkdownExporter()
    body, _ = exporter.from_filename(str(notebook))
    output_path.write_text(body, encoding="utf-8")
    return output_path


def convert_notebooks(notebook_paths: list[str | Path] | None = None, source_dir: str | Path = DEFAULT_SOURCE_DIR, output_dir: str | Path = DEFAULT_OUTPUT_DIR) -> list[Path]:
    """Convert all notebooks found in the source directory or the provided list."""
    source_root = Path(source_dir)
    destination_root = Path(output_dir)
    destination_root.mkdir(parents=True, exist_ok=True)

    if notebook_paths is None:
        notebook_paths = sorted(source_root.rglob("*.ipynb"))
    else:
        notebook_paths = [Path(p) for p in notebook_paths]

    converted = []
    for notebook in notebook_paths:
        if not notebook.exists():
            print(f"Skipping missing notebook: {notebook}")
            continue
        output_path = convert_notebook(notebook, source_dir=source_root, output_dir=destination_root)
        converted.append(output_path)
        print(f"Converted: {notebook} -> {output_path}")

    return converted


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert notebooks to Jekyll markdown files.")
    parser.add_argument("notebooks", nargs="*", help="Notebook files or directories to convert.")
    parser.add_argument("--source-dir", default=str(DEFAULT_SOURCE_DIR), help="Source notebooks directory.")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Output markdown directory.")
    args = parser.parse_args()

    if args.notebooks:
        files: list[str | Path] = []
        for item in args.notebooks:
            path = Path(item)
            if path.is_dir():
                files.extend(sorted(path.rglob("*.ipynb")))
            else:
                files.append(path)
        convert_notebooks(files, source_dir=args.source_dir, output_dir=args.output_dir)
        return 0

    convert_notebooks(source_dir=args.source_dir, output_dir=args.output_dir)
    return 0


if __name__ == "__main__":
    sys.exit(main())
