import urllib.request,json,hashlib
from pathlib import Path
from html.parser import HTMLParser
class Parse(HTMLParser):
 def __init__(self):super().__init__();self.images=[];self.words=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='img':self.images.append(a.get('data-src') or a.get('src'))
 def handle_data(self,d):self.words.append(d)
r=Path('/tmp/cqc-pass19-pw-box-generation/references')
urls={'pw-official-manual':'https://metalgear.konami.net/manual/mc2/mgspw/xbox/en/page08.html','pw-mgcvt-equipment':'https://mgcvt.com/guide/mgspw/equipment.htm','pw-wikiwiki-equipment':'https://wikiwiki.jp/walker/%E8%A3%85%E5%82%99%E5%93%81','pw-cardboard-wiki':'https://metalgear.fandom.com/wiki/Cardboard_box','pw-straw-wiki':"https://metalgear.fandom.com/wiki/Assassin%27s_Straw_Box"}
rows=[]
for name,url in urls.items():
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=25) as f:b=f.read(2000000);status=f.status
  p=r/(name+'.html');p.write_bytes(b);s=Parse();s.feed(b.decode('utf8','replace'));rows.append({'name':name,'url':url,'status':status,'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'images':s.images,'tailText':' '.join(s.words)[-1000:]})
 except Exception as e:rows.append({'name':name,'url':url,'error':str(e)})
(r/'REFERENCE_PAGE_FETCH_V1.json').write_text(json.dumps({'rows':rows},ensure_ascii=False,indent=2)+'\n')
for e in rows:print(json.dumps(e,ensure_ascii=False))
