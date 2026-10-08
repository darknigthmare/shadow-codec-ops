"""Read-only exact canonical HTTP proof; never disables standard TLS verification."""
import argparse
import concurrent.futures
import datetime
import hashlib
import html.parser
import json
import pathlib
import re
import ssl
import struct
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
EXPECTED = ROOT / 'EXPECTED_HTTP_SOURCE_PINS_V1.json'
EXPECTED_SHA = '5b9c996cc051489aa86a4d2e1cf3bf2e8d35c0eaa4d0ff2e195dc6a6c5ca12c7'
MANIFEST_SHA = 'e5ae0a59aa22dfd7c69a291b38fec441319ba0a29bb808fa96f975e2f6a8a98b'
ORIGIN = 'https://shadow-codec-ops.vercel.app'
APP = pathlib.Path('/tmp/cqc-pass19-application')


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


class Tags(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows = []

    def handle_starttag(self, tag, attrs):
        self.rows.append((tag, dict(attrs)))


def main():
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument('--prepare-only', action='store_true')
    mode.add_argument('--deployment-ready', metavar='ROOT_READY_DEPLOYMENT_ID')
    parser.add_argument('--source-commit', default=None)
    parser.add_argument('--ready-proof', type=pathlib.Path)
    args = parser.parse_args()
    raw_expected = EXPECTED.read_bytes()
    assert sha(raw_expected) == EXPECTED_SHA, 'Prepared source snapshot bytes changed'
    expected = json.loads(raw_expected)
    pins = expected['runtimeSourcePins']
    assert len(pins) == 46 and len({p['path'] for p in pins}) == 46
    assert sum(p['path'].endswith('.png') for p in pins) == 26
    assert expected['expectedRuntimeManifestSHA256'] == MANIFEST_SHA
    manifest_pin = next(p for p in pins if p['path'] == 'public/cqc/runtime-manifest.json')
    assert manifest_pin['sha256'] == MANIFEST_SHA
    for pin in pins + [expected['unchangedCQCShell']]:
        assert pin['path'].startswith('public/cqc/') and '..' not in pathlib.PurePosixPath(pin['path']).parts
        raw = (APP / pin['path']).read_bytes()
        assert len(raw) == pin['bytes'] and sha(raw) == pin['sha256'], 'Local frozen bytes changed: ' + pin['path']
    source_bytes = pathlib.Path(expected['sourceIntegration']['path']).read_bytes()
    assert sha(source_bytes) == expected['sourceIntegration']['sha256'], 'Final source integration evidence changed'
    assert json.loads(source_bytes)['runtimeSourcePins'] == pins
    if args.prepare_only:
        proof = {'schema': 'cqc.pass20.production-http.preparation/1', 'status': 'prepared-no-production-request-executed', 'at': now(), 'origin': ORIGIN, 'expectedRuntimeManifestSHA256': MANIFEST_SHA, 'expectedSnapshot': {'path': str(EXPECTED), 'bytes': len(raw_expected), 'sha256': EXPECTED_SHA}, 'sourceIntegration': expected['sourceIntegration'], 'scope': {'publicRuntimeFiles': len(pins), 'nativePNGFiles': 26, 'textFilesIncludingManifest': 20, 'totalExpectedBytes': sum(p['bytes'] for p in pins)}, 'localFrozenSourcePinsVerified': len(pins), 'tls': 'ssl.create_default_context; certificate chain and hostname validation required. No TLS bypass.', 'executionGate': 'Execute only after Root sends READY for the new PASS20 deployment; --deployment-ready must identify that signal.', 'routePlan': ['/', '/?module=cqc', '/cqc/index.html', '/cqc/modules/unified-versus-v055.html', '/cqc/modules/core-v032.html'], 'iframePlan': 'Parse real canonical root HTML module script and its lazily imported CqcLauncher chunk; verify iframe marker and cqc/index.html URL. Verify actual CQC shell iframe and unified/core module mappings, and all eight PASS20 script links in fetched Versus HTML.', 'qualification': 'This is a prepared local checker, not a production result. HTTP verifies served bytes and static route/import contracts; browser gameplay is checked separately.'}
        target = ROOT / 'PRODUCTION_HTTP_PREPARATION_ACTUAL_V1.json'
        blob = (json.dumps(proof, indent=2) + '\n').encode()
        with target.open('xb') as file:
            file.write(blob)
        print(json.dumps({'status': proof['status'], 'proof': str(target), 'sha256': sha(blob)}), flush=True)
        return 0

    assert args.deployment_ready and args.deployment_ready.strip(), 'Root READY deployment ID required'
    stamp = now().replace(':', '-').replace('.', '-')
    report = {'schema': 'cqc.pass20.production-http.exact-final-canonical/1', 'startedAt': now(), 'origin': ORIGIN, 'rootReadySignal': args.deployment_ready, 'sourceCommit': args.source_commit, 'expectedSnapshotSHA256': EXPECTED_SHA, 'sourceIntegration': expected['sourceIntegration'], 'tls': 'Python ssl.create_default_context with certificate-chain and hostname validation enabled through inherited session proxy. No TLS bypass, trust-store edit, or authentication write.', 'scope': {'publicRuntimeFiles': 46, 'nativePNGFiles': 26, 'textFilesIncludingManifest': 20, 'expectedBytes': sum(p['bytes'] for p in pins)}, 'routes': [], 'wrapperImports': [], 'files': [], 'failures': [], 'qualification': 'Exact HTTP integrity and static route/iframe import contract on canonical domain. It does not certify dynamic browser gameplay, all original art fidelity, or the unchanged multi-gigabyte baseline.'}
    if args.ready_proof:
        ready_bytes = args.ready_proof.read_bytes()
        report['rootReadyEvidence'] = {'path': str(args.ready_proof), 'bytes': len(ready_bytes), 'sha256': sha(ready_bytes)}
    ctx = ssl.create_default_context()
    assert ctx.check_hostname and ctx.verify_mode == ssl.CERT_REQUIRED

    def fetch(path, pin=None, retain=False):
        url = urllib.parse.urljoin(ORIGIN + '/', path)
        assert urllib.parse.urlsplit(url).scheme == 'https' and urllib.parse.urlsplit(url).netloc == urllib.parse.urlsplit(ORIGIN).netloc
        req = urllib.request.Request(url, headers={'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Accept-Encoding': 'identity', 'User-Agent': 'CQC-PASS20-ReadOnly-Integrity/1'})
        digest, count, chunks, prefix = hashlib.sha256(), 0, [], b''
        with urllib.request.urlopen(req, context=ctx, timeout=45) as response:
            status, final, headers = response.status, response.url, dict(response.headers)
            actual_origin = urllib.parse.urlsplit(final)
            assert actual_origin.scheme == 'https' and actual_origin.netloc == urllib.parse.urlsplit(ORIGIN).netloc, 'Canonical request redirected away: ' + final
            assert status == 200, 'Unexpected HTTP status ' + str(status)
            assert response.headers.get('Content-Encoding', 'identity').lower() in ('identity', ''), 'Encoded body despite identity request'
            while True:
                block = response.read(1024 * 1024)
                if not block:
                    break
                count += len(block)
                digest.update(block)
                prefix = (prefix + block)[:32]
                if retain:
                    assert count <= 8 * 1024 * 1024, 'Retained text unexpectedly exceeds 8 MiB'
                    chunks.append(block)
        result = {'path': path, 'requestedURL': url, 'finalURL': final, 'status': status, 'bytes': count, 'sha256': digest.hexdigest(), 'contentType': headers.get('Content-Type'), 'vercelCache': headers.get('X-Vercel-Cache'), 'etag': headers.get('Etag') or headers.get('ETag')}
        if pin:
            result['expected'] = {'bytes': pin['bytes'], 'sha256': pin['sha256']}
            result['byteIntegrityPassed'] = count == pin['bytes'] and digest.hexdigest() == pin['sha256']
        if path.endswith('.png'):
            result['nativePNGHeader'] = prefix.startswith(b'\x89PNG\r\n\x1a\n') and prefix[12:16] == b'IHDR'
            if result['nativePNGHeader']:
                result['nativeDimensions'] = list(struct.unpack('>II', prefix[16:24]))
        return result, b''.join(chunks) if retain else None

    def exact(path, pin, retain=False):
        result, body = fetch(path, pin, retain)
        if not result.get('byteIntegrityPassed'):
            raise ValueError(json.dumps({'reason': 'served-bytes-mismatch', 'observed': result}))
        if path.endswith('.png'):
            assert result['nativePNGHeader'] and all(n > 0 for n in result['nativeDimensions'])
        return result, body

    try:
        manifest_result, manifest_body = exact('/cqc/runtime-manifest.json', manifest_pin, True)
        report['files'].append(manifest_result)
        manifest = json.loads(manifest_body)
        manifest_files = {item['path']: item for item in manifest['files']}
        for pin in pins:
            if pin is manifest_pin:
                continue
            route = pin['path'].removeprefix('public/cqc/')
            item = manifest_files.get(route)
            assert item and item['sha256'] == pin['sha256'] and item['bytes'] == pin['bytes'], 'Final manifest pin differs: ' + route
        report['manifest'] = {'bytes': len(manifest_body), 'sha256': sha(manifest_body), 'runtimeFileCount': len(manifest['files']), 'runtimeTotalBytes': manifest['totalBytes'], 'integrationPinsAgree': True}
        capture_paths = {'public/cqc/modules/unified-versus-v055.html', 'public/cqc/modules/core-v032.html'}
        texts = {}
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
            tasks = {pool.submit(exact, '/' + pin['path'].removeprefix('public/'), pin, pin['path'] in capture_paths): pin for pin in pins if pin is not manifest_pin}
            completed = 1
            for job in concurrent.futures.as_completed(tasks):
                pin = tasks[job]
                try:
                    result, body = job.result()
                    report['files'].append(result)
                    if body is not None:
                        texts[pin['path']] = body.decode('utf-8')
                except Exception as error:
                    report['failures'].append({'path': pin['path'], 'error': str(error)})
                completed += 1
                if completed % 10 == 0 or completed == 46:
                    print(json.dumps({'progress': 'canonical-exact-source-pins', 'completed': completed, 'expected': 46, 'failures': len(report['failures'])}), flush=True)
        shell_result, shell_body = exact('/cqc/index.html', expected['unchangedCQCShell'], True)
        report['routes'].append(shell_result)
        shell = shell_body.decode('utf-8')
        shell_tags = Tags()
        shell_tags.feed(shell)
        assert any(tag == 'iframe' and attrs.get('id') == 'moduleFrame' for tag, attrs in shell_tags.rows)
        assert re.search(r"\bunified\s*:\s*['\"]modules/unified-versus-v055\.html['\"]", shell)
        assert re.search(r"\bcore\s*:\s*['\"]modules/core-v032\.html['\"]", shell)
        for public_path in capture_paths:
            result = next((item for item in report['files'] if item['path'] == '/' + public_path.removeprefix('public/')), None)
            assert result, 'CQC route failed exact byte verification: ' + public_path
            report['routes'].append(dict(result))
        versus = texts['public/cqc/modules/unified-versus-v055.html']
        versus_tags = Tags()
        versus_tags.feed(versus)
        linked_scripts = {urllib.parse.urljoin('/cqc/modules/unified-versus-v055.html', attrs['src']) for tag, attrs in versus_tags.rows if tag == 'script' and attrs.get('src')}
        new_scripts = {'/' + pin['path'].removeprefix('public/') for pin in pins if '/src/cqc-pass20-' in pin['path']}
        assert len(new_scripts) == 8 and new_scripts <= linked_scripts, 'Final Versus lacks a PASS20 script link'
        root_result, root_body = fetch('/', retain=True)
        integrated_result, integrated_body = fetch('/?module=cqc', retain=True)
        report['routes'] += [root_result, integrated_result]
        assert root_body == integrated_body, 'Integrated CQC SPA route served a different wrapper'
        root_html = root_body.decode('utf-8')
        assert 'Shadow Codec Ops' in root_html
        root_tags = Tags()
        root_tags.feed(root_html)
        assert any(attrs.get('id') == 'root' for _, attrs in root_tags.rows)
        module_scripts = [attrs['src'] for tag, attrs in root_tags.rows if tag == 'script' and attrs.get('type') == 'module' and attrs.get('src')]
        assert module_scripts, 'No executable wrapper entry script'
        launcher_urls = set()
        for src in module_scripts:
            entry_url = urllib.parse.urljoin(ORIGIN + '/', src)
            entry_result, entry_body = fetch(entry_url, retain=True)
            report['wrapperImports'].append(entry_result)
            entry_text = entry_body.decode('utf-8')
            for name in re.findall(r'(CqcLauncher-[A-Za-z0-9_-]+\.js)', entry_text):
                launcher_urls.add(urllib.parse.urljoin(entry_url, name))
        assert len(launcher_urls) == 1, 'Exactly one actual lazily imported CqcLauncher expected'
        launcher_result, launcher_body = fetch(next(iter(launcher_urls)), retain=True)
        report['wrapperImports'].append(launcher_result)
        launcher = launcher_body.decode('utf-8')
        assert 'cqc/index.html' in launcher and 'cqc-game-frame' in launcher and 'iframe' in launcher
        report['staticIframeContract'] = {'rootRoutesAgree': True, 'canonicalWrapperModuleVerified': True, 'lazyCqcLauncherChunk': launcher_result['finalURL'], 'embeddedCQCShellRoute': ORIGIN + '/cqc/index.html', 'shellIframeID': 'moduleFrame', 'shellVersusMapping': '/cqc/modules/unified-versus-v055.html', 'shellCoreMapping': '/cqc/modules/core-v032.html', 'linkedNewPASS20Scripts': sorted(new_scripts), 'qualification': 'Static HTTP import/iframe contract; dynamic browser behavior is covered by separate UI QA.'}
        assert len(report['files']) == 46
        report['status'] = 'passed' if not report['failures'] else 'failed'
    except Exception as error:
        report['status'] = 'failed'
        report['error'] = str(error)
    report['files'].sort(key=lambda row: row['path'])
    report['finishedAt'] = now()
    report['checkerSourceSHA256'] = sha(pathlib.Path(__file__).read_bytes())
    target = ROOT / ('PRODUCTION_HTTP_EXACT_FINAL_ACTUAL_V1_' + stamp + '.json')
    body = (json.dumps(report, indent=2) + '\n').encode()
    with target.open('xb') as file:
        file.write(body)
    print(json.dumps({'status': report['status'], 'proof': str(target), 'sha256': sha(body), 'exactFiles': len(report['files']), 'routeChecks': len(report['routes']), 'failures': report['failures'], 'error': report.get('error')}), flush=True)
    return 0 if report['status'] == 'passed' else 1


if __name__ == '__main__':
    raise SystemExit(main())
