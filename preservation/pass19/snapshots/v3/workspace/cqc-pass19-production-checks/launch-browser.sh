#!/bin/bash
set -eu
test "${1:-}" = '--deployment-ready'
qa_root=/workspace/cqc-pass19-production-checks
qa_profile="$qa_root/chrome-profile-9263"
qa_cache="$qa_root/chrome-cache-9263"
qa_tmp=/workspace/cqa9263-tmp
qa_spki=$(openssl x509 -in /usr/local/share/ca-certificates/environment-proxy-ca.crt -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | openssl base64)
test "$qa_spki" = 'n9jEr2dCP1tg9exQzr7xEpZ4TjG2QWO02LUFhmAzII4='
mkdir -p "$qa_profile" "$qa_cache" "$qa_tmp"
export TMPDIR="$qa_tmp"
exec chromium --headless=new --no-sandbox --disable-gpu --disable-component-update --disable-background-networking --no-first-run --no-default-browser-check --remote-debugging-address=127.0.0.1 --remote-debugging-port=9263 --user-data-dir="$qa_profile" --disk-cache-dir="$qa_cache" --disk-cache-size=8388608 --media-cache-size=2097152 --proxy-server="${HTTPS_PROXY:-http://proxy:8080}" --ignore-certificate-errors-spki-list="$qa_spki" about:blank
