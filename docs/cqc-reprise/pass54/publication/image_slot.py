import sys,os,json,pathlib
p=pathlib.Path('/tmp/cqc-p54-20261120/locks')
if sys.argv[1]=='claim':
 for n in range(2):
  d=p/f'image-slot-{n}'
  try:d.mkdir()
  except FileExistsError:continue
  (d/'owner.json').write_text(json.dumps({'owner':sys.argv[2]}));print(d);break
 else:print('BUSY');sys.exit(75)
elif sys.argv[1]=='release':
 d=pathlib.Path(sys.argv[2]);assert d.parent==p and d.name in ['image-slot-0','image-slot-1'];(d/'owner.json').unlink();d.rmdir()
