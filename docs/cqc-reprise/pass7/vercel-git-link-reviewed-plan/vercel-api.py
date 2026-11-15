import datetime, json, os, pathlib, subprocess, sys

ROOT = pathlib.Path('/workspace/vercel-pass7-git-link-plan')
CLI = '/tmp/vercel-pass6-npm-cache/_npx/dee980217d0014f3/node_modules/vercel/dist/index.js'
TEAM = 'team_VrIjq2UWV6VaHZr7DdQFwvfu'
PROJECT = 'prj_CAulbIX6GAPNda82UbIEbe8e33MV'
method, endpoint, label = sys.argv[1:4]
cmd = ['node', '--use-env-proxy', CLI, 'api', endpoint, '--method', method, '--global-config', '/tmp/vercel-pass6-global', '--non-interactive', '--raw']
if len(sys.argv) > 4:
    cmd += ['--input', sys.argv[4]]
env = dict(os.environ, NODE_USE_ENV_PROXY='1', XDG_CACHE_HOME='/tmp/vercel-pass6-cache', VERCEL_TELEMETRY_DISABLED='1')
result = subprocess.run(cmd, env=env, cwd=ROOT, capture_output=True, text=True, timeout=180)
try:
    body = json.loads(result.stdout)
except ValueError:
    body = {'nonJsonResponse': result.stdout[:2000]}

def sanitized(value, key=''):
    if key.lower() in {'env', 'envs', 'environmentvariables', 'token', 'access_token', 'refresh_token', 'oidctoken', 'authorization', 'cookies', 'password', 'secret', 'credentials', 'jwt', 'ssoprotectionbypass'} or any(word in key.lower() for word in ['bypasssecret', 'authtoken', 'accesstoken', 'refreshtoken']):
        return '[REDACTED]'
    if isinstance(value, dict):
        return {k: sanitized(v, k) for k, v in value.items()}
    if isinstance(value, list):
        return [sanitized(v) for v in value]
    return value

safe = sanitized(body)
artifact = {'schema': 'vercel-pass7-readonly-git-proof/v1', 'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'method': method, 'endpoint': endpoint, 'exitCode': result.returncode, 'response': safe, 'stderr': result.stderr[:12000]}
(ROOT / (label + '.json')).write_text(json.dumps(artifact, indent=2) + '\n')
summary_keys = ['id', 'url', 'name', 'readyState', 'readySubstate', 'target', 'alias', 'aliasError', 'error', 'errorCode', 'errorMessage', 'gitSource', 'projectId', 'builds', 'buildingAt', 'readyAt']
print(json.dumps({'label': label, 'exitCode': result.returncode, 'response': {k: safe[k] for k in summary_keys if isinstance(safe, dict) and k in safe}, 'githubCommitSha': safe.get('meta', {}).get('githubCommitSha') if isinstance(safe, dict) else None, 'stderrFirstLine': result.stderr.splitlines()[0] if result.stderr else ''}, indent=2))
sys.exit(result.returncode)
