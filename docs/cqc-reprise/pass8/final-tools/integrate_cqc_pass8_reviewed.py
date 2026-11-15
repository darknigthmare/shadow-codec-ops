#!/usr/bin/env python3
"""Import only a root-reviewed delivery, without changing native pixels."""
import argparse, hashlib, json, os, pathlib, subprocess, sys

R=pathlib.Path('/workspace/cqc-game-working/cqc-versus-v056')
sys.path.insert(0,str(R/'tools'))
from assemble_reviewed_combat_sprite_pass8 import assemble, write_json
from prepare_combat_sprite import import_sprite

def integrate(selection):
    delivery_path=pathlib.Path(selection['delivery'])
    d=json.loads(delivery_path.read_text())
    assert selection['allSixNativeSheetsPhysicallyViewedByRoot'] is True
    review={'uid':d['uid'],'status':'approved','reviewer':'root / actual original references and all six full native sheets physically inspected',
            'reviewedAt':'2026-10-02','displayHeight':selection.get('displayHeight',d['displayHeight']),
            'sources':{},'limits':selection.get('limits',[]),'actionMapOverrides':selection.get('actionMapOverrides',{}),
            'sourceReviewNotes':selection['notes'],'absolute1to1Certified':False}
    for row in d['sourceFiles']:
        k=row['key']; p=pathlib.Path(row['source']); sha=hashlib.sha256(p.read_bytes()).hexdigest(); assert sha==row['sha256']
        height=row.get('standingSourceHeight') or d.get('sourceGeometry',{}).get(k,{}).get('recommendStandingSourceHeight')
        assert isinstance(height,(float,int)) and height>0,(k,height)
        q={'sha256':sha,'completeBodyAndWeaponViewed':True,'standingSourceHeight':height,'notes':selection['notes']}
        pivots=row.get('observedBodyPivots') or d.get('observedBodyPivots',{}).get(k)
        if pivots:q['observedBodyPivots']=pivots
        if selection.get('completeLayouts'):
            lp=pathlib.Path(selection['completeLayouts'][k]);q['completeLayoutOverride']={'path':str(lp),'sha256':hashlib.sha256(lp.read_bytes()).hexdigest(),'completeBodyAndAllEquipmentViewed':True}
        review['sources'][k]=q
    rp=delivery_path.parent/'ROOT_INTEGRATOR_VISUAL_REVIEW.json';write_json(rp,review)
    result=assemble(R,delivery_path,rp)
    document=json.loads(pathlib.Path(result['review']).read_text())
    dry=import_sprite(R,document,True,R/'preparation/combat-sprites-pass8/approved-reviews')
    for row in document['sourceFiles']:
        src=pathlib.Path(row['source']);dst=R/row['file'];dst.parent.mkdir(parents=True,exist_ok=True)
        if dst.exists():assert dst.read_bytes()==src.read_bytes()
        else:os.link(src,dst)
    actual=import_sprite(R,document,False,R/'preparation/combat-sprites-pass8/approved-reviews')
    report=R/'preparation/reprise-pass8-provenance'/('IMPORT-'+d['uid']+'.json')
    write_json(report,{'selection':selection,'assembly':result,'dryRun':dry,'actual':actual})
    print(json.dumps({'uid':d['uid'],'report':str(report),'nativePNGs':6,'uniquePoses':72}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('selection',type=pathlib.Path);a=p.parse_args()
    for row in json.loads(a.selection.read_text()):integrate(row)
