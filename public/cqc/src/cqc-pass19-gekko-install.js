/* Guarded additive upgrade from five left-only mappings to independent two-face native sources. */
(function(root){'use strict';
 const addition=root.CQC_PASS19_GEKKO_CATALOG,extra=root.CQC_PASS19_GEKKO_DATA,base=root.CQC_MACHINE_PARTS_CATALOG,data=root.CQC_PASS18_MACHINE_DATA;
 if(!addition||!extra||!base||!data||addition.schema!==base.schema)throw Error('Dossiers natifs Gekko indisponibles');
 const old=new Map(base.machines.map(m=>[m.id,m])),fresh=[];
 for(const rig of addition.machines){const exists=old.get(rig.id);if(exists){if(JSON.stringify(exists)!==JSON.stringify(rig))throw Error('Rig Gekko incompatible: '+rig.id);}else fresh.push(rig);}
 for(const [uid,pair]of Object.entries(extra.playable)){const before=data.playable?.[uid];if(before&&JSON.stringify(before)!==JSON.stringify(pair)&&!(JSON.stringify(before)===JSON.stringify([uid,uid])&&JSON.stringify(pair)===JSON.stringify([uid,uid+'_right'])))throw Error('UID Gekko déjà attribué: '+uid);}
 const states={...data.states};for(const [id,state]of Object.entries(extra.states)){if(!states[id])states[id]=state;}
 root.CQC_MACHINE_PARTS_CATALOG={...base,machines:[...base.machines,...fresh]};
 root.CQC_PASS18_MACHINE_DATA={...data,playable:{...data.playable,...extra.playable},states};
})(globalThis);
