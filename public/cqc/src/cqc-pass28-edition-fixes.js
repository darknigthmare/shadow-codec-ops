/* Correct an edition mismatch without discarding the historical source artwork. */
(function(root){'use strict';
 const clone=value=>JSON.parse(JSON.stringify(value));
 function apply(catalog){const copy=clone(catalog),machine=copy.machines.find(m=>m.id==='bulldozer_mg1_msx1987');if(!machine)return{catalog:copy,changes:[]};
  machine.edition='Armored Bulldozer — Metal Gear 1987; source-led CQC adaptation, blade reverse camera pending';
  const mislabeled=machine.parts.find(p=>p.id==='roof');if(mislabeled){mislabeled.opacity=0;delete mislabeled.detachment;}
  return{catalog:copy,changes:[{id:machine.id,edition:'Metal Gear 1987',hidden:'roof crop actually depicts a hydraulic actuator; original source retained'}]};
 }
 const targetParts={bulldozer:[{part:'near_track'},{part:'far_track'},{part:'blade'},{part:'hull'}]};
 const canonicalDimensions=Object.freeze(Object.fromEntries([['rex_mgs1_ps1',13],['gekko_mgs4_ps3_2008',4.2],['gekko_mgs4_right',4.2]].map(([id,heightM])=>[id,{heightM,source:'https://www.konami.com/mg/mgs5/tpp/jp/evolution/_img/his_pic02_zoom.jpg',sha256:'dc09917d09f220cbc8d3e5028687c37fd0768f6e8b3d51ec48bac607531a4540',evidence:'primary published Konami weapons-history chart; exact depicted incarnation only'}])));
 root.CQC_PASS28_EDITION_FIXES=Object.freeze({apply,targetParts,canonicalDimensions,limits:['Bulldozer native blade perspective requires an independently redrawn facing; the false roof is hidden, never relabeled as official art.']});
})(globalThis);
