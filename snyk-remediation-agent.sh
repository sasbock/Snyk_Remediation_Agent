#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 || ( "$1" != "sca" && "$1" != "sast" ) ]]; then
  echo "Usage: $0 <sca|sast>" >&2
  exit 1
fi

scan_type="$1"

git fetch origin
git reset --hard origin/main
snyk-preview fix --agentic --experimental --"$scan_type" --provider snyk
