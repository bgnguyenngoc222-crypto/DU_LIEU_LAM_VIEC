#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/.agent/skills"; DST="$ROOT/.claude/skills"
mkdir -p "$DST"
if command -v rsync >/dev/null 2>&1; then rsync -a --delete --exclude='.DS_Store' "$SRC/" "$DST/";
else rm -rf "$DST"; mkdir -p "$DST"; cp -R "$SRC/." "$DST/"; fi
echo "OK Synced $(find "$SRC" -maxdepth 1 -mindepth 1 -type d | wc -l | tr -d ' ') skills"
