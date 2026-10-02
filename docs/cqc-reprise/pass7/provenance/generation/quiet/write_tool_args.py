from pathlib import Path
import json,sys
b=Path('/workspace/cqc-pass7-generation/quiet')
x=json.load(sys.stdin)
(b/'prompts'/x['name']).write_text(json.dumps(x['args'],indent=2,ensure_ascii=False)+'\n')
