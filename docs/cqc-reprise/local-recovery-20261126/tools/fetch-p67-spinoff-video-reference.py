import json, re, sys, urllib.request
from pathlib import Path

ROOT = Path('/mnt/data/cqc-p66/shadow-codec-ops/docs/cqc-reprise/pass67/research/spinoffs')

def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=30).read()

if sys.argv[1] == 'search':
    from urllib.parse import quote_plus
    for query in sys.argv[2:]:
        source = fetch('https://www.youtube.com/results?search_query=' + quote_plus(query)).decode('utf-8', errors='replace')
        match = re.search(r'var ytInitialData = (\{.*?\});', source)
        data = json.loads(match.group(1)); found = []
        def visit(x):
            if isinstance(x, dict):
                if 'videoRenderer' in x:
                    v=x['videoRenderer']; found.append({'video':v.get('videoId'), 'title':''.join(r.get('text','') for r in v.get('title',{}).get('runs',[]))})
                for value in x.values(): visit(value)
            elif isinstance(x,list):
                for value in x: visit(value)
        visit(data)
        print(json.dumps({'query':query,'results':found[:7]},ensure_ascii=False))
else:
    video=sys.argv[1]
    source = fetch('https://www.youtube.com/watch?v='+video).decode('utf-8', errors='replace')
    match = re.search(r'"playerStoryboardSpecRenderer":\s*\{.*?"spec":\s*("(?:[^"\\]|\\.)*")', source)
    if not match: raise RuntimeError('No public storyboard spec for '+video)
    spec=json.loads(match.group(1)); parts=spec.split('|'); f=parts[-1].split('#')
    metadata={'video':'https://www.youtube.com/watch?v='+video,'spec':spec,'selectedLevel':len(parts)-2,'format':list(map(int,f[:6]))}
    (ROOT/(video+'-storyboard-spec.json')).write_text(json.dumps(metadata,indent=2))
    for index in map(int,sys.argv[2:]):
        url=parts[0].replace('$L',str(len(parts)-2)).replace('$N',f[6]).replace('$M',str(index))+'&sigh='+f[7]
        content=fetch(url); path=ROOT/f'{video}-storyboard-{index}.jpg';path.write_bytes(content)
        print(json.dumps({'path':str(path),'bytes':len(content),'format':metadata['format'],'sheet':index}))
