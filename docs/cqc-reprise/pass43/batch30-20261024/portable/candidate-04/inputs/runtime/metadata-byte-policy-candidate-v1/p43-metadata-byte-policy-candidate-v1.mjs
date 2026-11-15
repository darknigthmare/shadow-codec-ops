const p43LargeMetadataReviews=new Map([{"uid":"core__raiden","id":"mgr-custom-body-yellow","artAuditSHA256":"5f8938005e004a707d001cde1f7f6489698f944a3542af9efdb8de368644d230"},{"uid":"core__raiden","id":"mgr-combat-visor-closed","artAuditSHA256":"847c56e0040362f2982e0034c3c663f77f2a1201d1380313c94889cb8102cfc9"},{"uid":"core__sam","id":"mgr-breathing-mask-closed","artAuditSHA256":"24b10a486d2d52d8f7ee8d1215d93348a8932950ce578561a213239bcd3b4cdf"},{"uid":"core__sundowner","id":"mgr-six-reactive-shields","artAuditSHA256":"4d06dde1a2a2aabbcec537cf577d306f2178fea207e51abc3164122e6d7fa2ea"},{"uid":"core__sundowner","id":"mgr-phase2-closed-visor","artAuditSHA256":"eee097cd55865b8d935d53f945457c90b0a98e42042161443f980adc54ccd059"},{"uid":"core__venom","id":"mgsv-raiden","artAuditSHA256":"a4b13cd2d96d66bf84080f0eb2eb4c3afc7d2323dff8bc63dd6a36186c361a79"}].map(r=>[r.uid+':'+r.id,r.artAuditSHA256]));
function p43MetadataByteLimit(item){
 const fallback=4*1024*1024,review=item?.review,expected=p43LargeMetadataReviews.get(item?.uid+':'+item?.id),metadata=item?.metadata;
 if(!expected||review?.status!=='approved'||typeof review.reviewer!=='string'||!review.reviewer.startsWith('Root')||review.artAuditSHA256!==expected||!/^[a-f0-9]{64}$/.test(metadata?.sha256||''))return fallback;
 const prefix='assets/combat-costumes-pass43/'+item.uid+'/'+item.id+'/';
 if(metadata.path===prefix+'metadata-v2.json')return 8*1024*1024;
 if(item.uid==='core__venom'&&item.id==='mgsv-raiden'&&metadata.path===prefix+'metadata-core-v1.json'&&item.coreModeVariant?.schema==='cqc.p43.core-mode-descriptor/1'&&/^[a-f0-9]{64}$/.test(item.coreModeVariant.baseVSMetadataSHA256||''))return 8*1024*1024;
 return fallback;
}

export {p43MetadataByteLimit};
