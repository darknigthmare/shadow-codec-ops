/* Read the same actual saved preferences as the CQC OPTIONS screen. */
(function(root){'use strict';
 function reducedMotion(){try{const a=JSON.parse(root.localStorage?.getItem('cqc-versus.profile.v1')||'{}')?.presentation;if(a?.reducedMotion===true||a?.motion===false)return true;}catch{}try{const b=JSON.parse(root.localStorage?.getItem('cqc-v044-profile')||'{}')?.settings;if(b?.reducedMotion===true||b?.motion===false)return true;}catch{}return !!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches||!!root.document?.documentElement?.classList.contains('cqc-reduced-motion')||!!root.document?.body?.classList.contains('reduced-motion');}
 function noFlash(){try{const a=JSON.parse(root.localStorage?.getItem('cqc-versus.profile.v1')||'{}')?.presentation;if(a?.flash===false||a?.noFlash===true)return true;}catch{}try{const b=JSON.parse(root.localStorage?.getItem('cqc-v044-profile')||'{}')?.settings;if(b?.flash===false||b?.noFlash===true)return true;}catch{}return reducedMotion();}
 root.CQC_PASS33_DUEL_PREFERENCES=Object.freeze({reducedMotion,noFlash});
})(globalThis);
