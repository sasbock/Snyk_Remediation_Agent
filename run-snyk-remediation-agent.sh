#!/usr/bin/env bash
set -euo pipefail

git fetch origin
git reset --hard origin/main
snyk-preview fix --agentic --experimental --sast --provider snyk
