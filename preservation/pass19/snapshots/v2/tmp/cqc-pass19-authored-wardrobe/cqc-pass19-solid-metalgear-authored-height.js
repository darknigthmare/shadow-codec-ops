/* Original compact machine costume dimension; no canonical Metal Gear measurement claim. */
(function(root){'use strict';
 const existing=root.CQC_PASS19_COSTUME_HEIGHTS||{},prior=existing.core__solid?.metalgear;
 if(prior && (prior.metres!==3.4 || prior.evidence!=='original-authored-physical-dimension'))throw Error('Dimension de châssis déjà inscrite');
 const record={metres:3.4,evidence:'original-authored-physical-dimension',sources:[],scope:'Châssis original créé pour ce costume ; aucune taille canonique revendiquée.',absoluteHeightCertified:false};
 root.CQC_PASS19_COSTUME_HEIGHTS={...existing,core__solid:{...(existing.core__solid||{}),metalgear:prior||record}};
})(globalThis);
