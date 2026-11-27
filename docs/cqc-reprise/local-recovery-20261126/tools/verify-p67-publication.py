from pathlib import Path
import json,subprocess,hashlib,os,sys
R=Path('/mnt/data/cqc-p66/shadow-codec-ops')
G=Path('/workspace/scratch/7d4d5e1f4fd4/shadow-codec-git')
P=Path('/mnt/data/cqc-p66')
plan=json.loads((P/'p67-publication-plan.json').read_text())
commit=sys.argv[1]
env={**os.environ,'GIT_NO_LAZY_FETCH':'1'}
def git(*args):return subprocess.check_output(['git',*args],cwd=G,env=env)
def tree(ref):
 result={}
 for line in git('ls-tree','-rz',ref).split(b'\0'):
  if line:
   m,p=line.split(b'\t',1);result[p.decode()]=tuple(m.decode().split())
 return result
before=tree(plan['baseCommit']);after=tree(commit)
added=set(after)-set(before);removed=set(before)-set(after)
changed={p for p in set(before)&set(after) if before[p]!=after[p]}
assert not removed,removed
assert added=={x['path'] for x in plan['files'] if x['change']=='added'}
assert changed=={x['path'] for x in plan['files'] if x['change']=='modified'}
assert len(before)==plan['baseTreeEntries']
for f in plan['files']:
 assert after[f['path']]==('100644','blob',f['sha']),(f['path'],after[f['path']])
 b=(R/f['path']).read_bytes()
 assert len(b)==f['bytes'] and hashlib.sha256(b).hexdigest()==f['sha256'],f['path']
parents=git('rev-list','--parents','-n','1',commit).decode().strip().split()
assert parents==[commit,plan['baseCommit']],parents
head=json.loads((P/'p67-published-pr-head.json').read_text())
assert head['head_sha']==commit and head['head']=='codex/cqc-p61-missing-static-sources-20261125'
assert head['draft'] and head['state']=='open' and not head['merged']
historic=[];archives=[]
for p in ['asset-associations.json','asset-associations-p63.json','asset-associations-p64.json','asset-associations-p65.json','asset-associations-p66.json']:
 rel='docs/cqc-bible/'+p;assert before[rel]==after[rel]
 data=json.loads((R/rel).read_text());historic+=data['assets'];archives+=data.get('archives',[])
assert len(historic)==225 and len(archives)==18
for row in historic+archives:
 assert before[row['path']]==after[row['path']] and after[row['path']][2]==row['gitBlobSha']
result={'schema':'cqc.p67.post-publication-verification.v1','status':'passed','commit':commit,'parent':plan['baseCommit'],'tree':git('rev-parse',commit+'^{tree}').decode().strip(),'branchHeadVerified':True,'draft':head['draft'],'merged':head['merged'],'beforeEntries':len(before),'afterEntries':len(after),'added':len(added),'modified':len(changed),'deleted':len(removed),'unchanged':len(before)-len(changed),'verifiedPublishedFiles':len(plan['files']),'publishedLocalBytes':sum(x['bytes'] for x in plan['files']),'historicalSourcesPreserved':len(historic),'historicalArchivesPreserved':len(archives),'historicalRegistriesByteIdentitiesPreserved':5,'unrelatedLocalDifferencesExcluded':len(plan['unrelatedLocalDifferencesExcludedAndLeftUntouched']),'checks':['All entries in the actual Git trees compared, not only selected paths.','All published blob identities match the frozen local files.','No file deleted; unchanged baseline entries preserve exact mode/type/blob identity.','Remote PR head, single parent, draft/open/unmerged status verified.'],'limits':['Full historical PNG content is not downloaded; Git object identities are compared.','Publication verification is not browser execution or deployment verification.']}
(P/'p67-post-publication-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result,ensure_ascii=False,indent=2))
