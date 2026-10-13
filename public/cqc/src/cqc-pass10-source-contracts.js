/* Ten native source contracts V2 and explicit Root weapon capabilities.
 * Source JSON SHA256: 4b440ed2c91e44d6495a31e17ea82f3993035d38ba2ce2051a5b53a9de2fc5ff.
 */
(function(root){'use strict';
 const document={
  "schema": "cqc.pass10.root-native-source-contracts/1",
  "status": "approved",
  "confirmedByRoot": true,
  "reviewer": "Root physical action semantics and immutable source review",
  "reviewedAt": "2026-10-02T17:41:53.723940+00:00",
  "entries": {
    "core__blade_wolf": {
      "uid": "core__blade_wolf",
      "canonicalGameGroup": "mgr",
      "game": "Metal Gear Rising: Revengeance2013, original LQ-84i character model",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "9b3a93a5714a5d71834e8fb6222817d8cc4a3a6af7792f8df9884bbd6c26044c",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "jump",
        "specialDown": "heavy",
        "specialForward": "walk",
        "specialBack": "guard",
        "super": "shoot",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__blade_wolf/a-right-v1.png": "c59dc21b716f15c07adf654eae4e7fd29f889add4eaceb3c346091f3e4dc973d",
        "assets/combat-sprites/core__blade_wolf/a-left-v1.png": "72b8b22827e6fc7b51d3ebb9d09c2b24eb4499f5fd88a001e6deeefa4cfd9294",
        "assets/combat-sprites/core__blade_wolf/b-right-v1.png": "8cbfa7eacc3abfb8dc6d8989b5071b7ba25968b9c3337c14d8d9b266b2555e53",
        "assets/combat-sprites/core__blade_wolf/b-left-v1.png": "14509018799e4f7cbf1f08df5418eecf9956916a17f450229743c161fd4489a1",
        "assets/combat-sprites/core__blade_wolf/c-right-v1.png": "6ce9cc03c73cb08e8dd4d85ce7b7625706537ff2996959d2eaa0e94e6b132d99",
        "assets/combat-sprites/core__blade_wolf/c-left-v1.png": "6099c8965a3d34ae44f221612a036448d65e657c8c26c5c600185ac9e3557c08"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "contact",
        "shoot": "contact",
        "recover": "recover",
        "reload": "reload",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated authored combat phases are adaptations; exact original animation extraction and absolute pixel/model 1:1 certification are not claimed."
      ]
    },
    "core__raiden_mgs4": {
      "uid": "core__raiden_mgs4",
      "canonicalGameGroup": "mgs4",
      "game": "Metal Gear Solid4: Guns of the Patriots2008, original PS3 Raiden incarnation",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "f21014a2023e0434b83c4398ccb52e0c5880cd5fe16ff63da380723edf5785d9",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "jump",
        "specialForward": "walk",
        "specialBack": "guard",
        "super": "shoot",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__raiden_mgs4/a-right-v1.png": "d25cf68b7d74dcfcb003f72b0d35b5e9045729f7e4a55e1c14a7cf62018b8a7a",
        "assets/combat-sprites/core__raiden_mgs4/a-left-v1.png": "b3896cbcebac15a050eb0939ef3e77cabbf0563d1c95cb05190823ef7252e9cc",
        "assets/combat-sprites/core__raiden_mgs4/b-right-v1.png": "7a049c6e400fb27c4c7e5e14ff9cd356444b08f54fea1748c71e01a8914a0be3",
        "assets/combat-sprites/core__raiden_mgs4/b-left-v1.png": "a1a905cd0f80ca9040c1b21326e0131baf0f55c8485bdfbc84256e97f828d358",
        "assets/combat-sprites/core__raiden_mgs4/c-right-v1.png": "9b6591f543a5e013567da29c75cac7a8b00a5e4b5c82ea862d86f441e610c8e5",
        "assets/combat-sprites/core__raiden_mgs4/c-left-v1.png": "e2b3542365afd4b92861bc52708764284035c498343486ca0c3d6ecd3abe47a2"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "contact",
        "shoot": "contact",
        "recover": "recover",
        "reload": "reload",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated combat phases and calibrated versus parameters are authored adaptations, not extracted original game animations or absolute pixel/model1:1 certification."
      ]
    },
    "core__skull_mist": {
      "uid": "core__skull_mist",
      "canonicalGameGroup": "tpp",
      "game": "Metal Gear Solid V: The Phantom Pain (2015)",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "96cfbfa907e04d1e1b6771967616fc46e2c3ded8ce94032a5fb5b6f610dd03a1",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "deploy",
        "specialForward": "throw",
        "specialBack": "walk",
        "super": "shoot",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__skull_mist/a-right-v1.png": "7d3ce7783b6970cc169946c62f46a81a800fc6a967a9581e20ff0d65ad834ab6",
        "assets/combat-sprites/core__skull_mist/a-left-v1.png": "1da1aedda991c89a76254200d97ece0d7c290b51499792fd637dfcd5f2b8e810",
        "assets/combat-sprites/core__skull_mist/b-right-v1.png": "47b9c668da8566d8550f8628507f123bf47d5f3361ee1e504ffb92797a0d1bc9",
        "assets/combat-sprites/core__skull_mist/b-left-v1.png": "097eb9f318161884240add7df48afc9bad5698b8316c14b5e5860dfb884ea315",
        "assets/combat-sprites/core__skull_mist/c-right-v1.png": "ac6133decc5c1d0c8a83bcf60f8f9fd7f506ccfad6bdf32aa1c1029040a5120a",
        "assets/combat-sprites/core__skull_mist/c-left-v1.png": "aa6ae8ae92caa3a3a583667135ac12ce2e45fd7f0efba59da9ce584052bf4100"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "reload",
        "deploy": "recover",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated original action staging is an illustrated adaptation of supported incarnation, not extracted original-game sprites or canonical timing/collision data.",
        "Publisher capture supplies primary visible identity features; Steam player modification state not independently authenticated. Hidden topology/rotation details remain inferred."
      ],
      "weaponCapabilities": {
        "shoot": {
          "tags": [
            "ballistic"
          ],
          "statuses": [],
          "sourceEvidenceSHA256": "1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f",
          "sourceEvidenceFile": "/workspace/cqc-pass10-integrator-review/ROOT_SIX_SELECTED_FIREARM_CAPABILITY_REVIEW.json",
          "sourceEvidenceUID": "core__skull_mist",
          "confirmedByRoot": true,
          "scope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
        }
      }
    },
    "core__skull_armor": {
      "uid": "core__skull_armor",
      "canonicalGameGroup": "tpp",
      "game": "Metal Gear Solid V: The Phantom Pain (2015)",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "5c0b0ea9f35daecde0f5971714b4a044a99cfb970e35b7795dbba4d9336be9a1",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "deploy",
        "specialForward": "throw",
        "specialBack": "walk",
        "super": "shoot",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__skull_armor/a-right-v1.png": "80c0fcc1d4e9fb5f9a60408dbe297c3c745c8d9bb926b5cf3d1c4bfd43f8190f",
        "assets/combat-sprites/core__skull_armor/a-left-v1.png": "2e901e61c7ffe4b181c5200a39b848b292700cfb83a510518f06e50065d6e4a0",
        "assets/combat-sprites/core__skull_armor/b-right-v1.png": "935a68fc6bff85fb7f9f676d65ca7f13bcf5bddfa62ab42367ce6309c5a4534f",
        "assets/combat-sprites/core__skull_armor/b-left-v1.png": "ed14ebd2b060c2a619b7e94672748023b20478e399f3f1b59502e7784333ebdd",
        "assets/combat-sprites/core__skull_armor/c-right-v1.png": "78a1803cf7664d086830698eb68e148ff04b9cef255fa0ebc456d4a35350f221",
        "assets/combat-sprites/core__skull_armor/c-left-v1.png": "47cc13c1c9ea9aff4cfb014601aad54cd0fc72081eba87b5c3a043c0b0c975ea"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "contact",
        "recover": "recover",
        "reload": "reload",
        "deploy": "hardening",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated original action staging is an illustrated adaptation of supported incarnation, not extracted original-game sprites or canonical timing/collision data.",
        "Publisher capture supplies primary visible identity features; Steam player modification state not independently authenticated. Hidden topology/rotation details remain inferred."
      ]
    },
    "core__skull_sniper": {
      "uid": "core__skull_sniper",
      "canonicalGameGroup": "tpp",
      "game": "Metal Gear Solid V: The Phantom Pain (2015), original female Sniper Parasite Unit E2",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "d9133b7115581be456467916d48bb0cb3d7ce2e03c83d732cb97f3331594a7cb",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "deploy",
        "specialForward": "throw",
        "specialBack": "walk",
        "super": "shoot",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__skull_sniper/a-right-v1.png": "cb8d65a3c7da69e0b090abb3ca04d7c0f1634bf5f865f61d9355993fa3955705",
        "assets/combat-sprites/core__skull_sniper/a-left-v1.png": "8cf7d9afe791431d1f70a6650f068c778d41f53897cd3a53a850baa910ee2fc6",
        "assets/combat-sprites/core__skull_sniper/b-right-v1.png": "709012b0b00a3cb75d48003b0da4116bba5276f6c1e5021cab16378de5d299ea",
        "assets/combat-sprites/core__skull_sniper/b-left-v1.png": "92072a6d44e0022c18560fa315a57c587d6295e0467c5bae93e88f0f90493514",
        "assets/combat-sprites/core__skull_sniper/c-right-v1.png": "e2ece3d67f8b258113d4d5b28118632aa938cc358833600f04bc355479276b6c",
        "assets/combat-sprites/core__skull_sniper/c-left-v1.png": "bee95c7ad520998dd89cc153cc315a11a3e1efe663fc2b6c6cab9f1853cb7b21"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "reload",
        "deploy": "camouflage",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Steam player captures corroborate original trailer features but modification state is not independently authenticated. Hidden surfaces, small rifle components and authored combat phases are not absolute1:1-certified."
      ],
      "weaponCapabilities": {
        "shoot": {
          "tags": [
            "precision"
          ],
          "statuses": [],
          "sourceEvidenceSHA256": "1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f",
          "sourceEvidenceFile": "/workspace/cqc-pass10-integrator-review/ROOT_SIX_SELECTED_FIREARM_CAPABILITY_REVIEW.json",
          "sourceEvidenceUID": "core__skull_sniper",
          "confirmedByRoot": true,
          "scope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
        }
      }
    },
    "core__snake_mpo": {
      "uid": "core__snake_mpo",
      "canonicalGameGroup": "mpo",
      "game": "Metal Gear Solid: Portable Ops",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "ed65d38c5f9413702d7e105d8ee286d1a4020d10f9979dd6558837871174c1f8",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "low",
        "specialForward": "throw",
        "specialBack": "guard",
        "super": "heavy",
        "utility": "reload"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__snake_mpo/a-right-v1.png": "fb56a647e16800bccd100874a02a765e15b9218561bbd631dfa1903e3bdaf845",
        "assets/combat-sprites/core__snake_mpo/a-left-v1.png": "7366c796cb061d2fe5cfbe7257f29ddd10103d20d1c8a8b4f4d22564cec6d0e9",
        "assets/combat-sprites/core__snake_mpo/b-right-v1.png": "34ab95981cdf41e82127737eaa9e368942d7aefc6df06de84122403999844f4d",
        "assets/combat-sprites/core__snake_mpo/b-left-v1.png": "3ca48a173e38410eb71b7eff398b2d1cf4b1c1aa0b7977222c3758bfdae2097d",
        "assets/combat-sprites/core__snake_mpo/c-right-v1.png": "02d43677081ecc74c9ef5e1014707b1458fff3e5c1b2ce2b2252aa77d62645f9",
        "assets/combat-sprites/core__snake_mpo/c-left-v1.png": "02c2f7bb72e30e3e9cbd0202da932c3dba378b88af20f5a60e1efee71274ac2f"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "reload",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Public original artbook compilation scan is qualified rehosting, not independently authenticated original upload.",
        "Generated action staging/timings, hidden reverse gear and small handgun/bandana detail are adaptations, not extracted PSP animation or absolute1:1-certified.",
        "Original sources, rejected wrong-eye/badge and other attempts remain byte-exact and retained."
      ],
      "weaponCapabilities": {
        "shoot": {
          "tags": [
            "tranq"
          ],
          "statuses": [
            "drowsy"
          ],
          "sourceEvidenceSHA256": "1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f",
          "sourceEvidenceFile": "/workspace/cqc-pass10-integrator-review/ROOT_SIX_SELECTED_FIREARM_CAPABILITY_REVIEW.json",
          "sourceEvidenceUID": "core__snake_mpo",
          "confirmedByRoot": true,
          "scope": "MK22 tranquilizer name/loadout supported; drowsy is an authored bounded Versus effect, not original PSP timing"
        }
      }
    },
    "core__snake_pw": {
      "uid": "core__snake_pw",
      "canonicalGameGroup": "pw",
      "game": "Metal Gear Solid: Peace Walker",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "0abd38c81b9d94c3993467cf92d8051ee8610f12b0510ab4d5e8451896738c3f",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "low",
        "specialForward": "throw",
        "specialBack": "guard",
        "super": "heavy",
        "utility": "reload"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__snake_pw/a-right-v1.png": "f6015028d458990c975c9a93a264dc45a775694b87f24b599d7fcf6ae0687ca1",
        "assets/combat-sprites/core__snake_pw/a-left-v1.png": "6d6a66cd1daf83a1fc563e22fa9a0f664ad619a7124bfa26f432606a997a88f1",
        "assets/combat-sprites/core__snake_pw/b-right-v1.png": "5662f0a3ba94e4c3621079bc48f9019985573647f8d4080b35a95416cf791e5a",
        "assets/combat-sprites/core__snake_pw/b-left-v1.png": "b5fac2235fc08ef26fc58f9c17bec44a30f066544334748c68933bc847d1c794",
        "assets/combat-sprites/core__snake_pw/c-right-v1.png": "acf6c0e862fef38433b9622522f13cd51044e9163c36d2cb33b38f987345c932",
        "assets/combat-sprites/core__snake_pw/c-left-v1.png": "7ca6449490fabe2a7052cd9b34266fddab3dc0136e2289678b7d2fc2b66cb53a"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "reload",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated authored combat phases are adaptations; exact original animation extraction and absolute pixel/model 1:1 certification are not claimed."
      ],
      "weaponCapabilities": {
        "shoot": {
          "tags": [
            "ballistic"
          ],
          "statuses": [],
          "sourceEvidenceSHA256": "1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f",
          "sourceEvidenceFile": "/workspace/cqc-pass10-integrator-review/ROOT_SIX_SELECTED_FIREARM_CAPABILITY_REVIEW.json",
          "sourceEvidenceUID": "core__snake_pw",
          "confirmedByRoot": true,
          "scope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
        }
      }
    },
    "completion__big_boss_epilogue": {
      "uid": "completion__big_boss_epilogue",
      "canonicalGameGroup": "mgs4",
      "game": "Metal Gear Solid4: Guns of the Patriots",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "ca319118a87daf25e16948dad6606e5d893b16f82e98b5056340734bc63a9d00",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "charge",
        "specialDown": "low",
        "specialForward": "throw",
        "specialBack": "guard",
        "super": "charge",
        "utility": "reload"
      },
      "sourceFiles": {
        "assets/combat-sprites/completion__big_boss_epilogue/a-right-v1.png": "7456ec0bccb588035750c0646e7773e9db74a84d9eebd3f175dc7dead101909e",
        "assets/combat-sprites/completion__big_boss_epilogue/a-left-v1.png": "8796990da940f049dd2441f412721081540742114bca9965bc0486df42468aa1",
        "assets/combat-sprites/completion__big_boss_epilogue/b-right-v1.png": "d0d5fc64de6d79f5590e5d0ff91ce100dec151ef21634a9e34c716acf47814de",
        "assets/combat-sprites/completion__big_boss_epilogue/b-left-v1.png": "dc8f176e3d2e197eabed3dc3d86afed0728d13d8d19dff6e3d5e6cce0b1a3e08",
        "assets/combat-sprites/completion__big_boss_epilogue/c-right-v1.png": "5201d4c85ac095b3f6b6e7ab4dd567998b1a52358c1a05c6ed310a6164ca5424",
        "assets/combat-sprites/completion__big_boss_epilogue/c-left-v1.png": "9f335cf9d2c4cbcaeee087a92bbd4e406f63bd84e502ed066e6d284c8739c003"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "recover",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated combat phases and calibrated versus parameters are authored adaptations, not extracted original game animations or absolute pixel/model1:1 certification."
      ]
    },
    "core__venus": {
      "uid": "core__venus",
      "canonicalGameGroup": "acid2",
      "game": "Metal Gear Ac!d 2 (2005), original PSP",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "effc4781502487525591c6a907373b5b8398fb628f74011e2287a79fb4835235",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "shoot",
        "specialForward": "reload",
        "specialBack": "jump",
        "super": "shoot",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__venus/a-right-v1.png": "a79234c9f0085f29e27a180122768d71114ca9666f6dcaf64c152fd54fef7ead",
        "assets/combat-sprites/core__venus/a-left-v1.png": "2246bfae93a77aaeab6e8b7c8a9347f8206eebef9eb8356e726e86f68c085075",
        "assets/combat-sprites/core__venus/b-right-v1.png": "b64bb2e872252eafb3b8516e6fb7071993e5549fd6b7958a3ed48c2badb0bb7d",
        "assets/combat-sprites/core__venus/b-left-v1.png": "04f9a9dd59d87f6b6614bd581f08f4038727cf32fcaee41ced7bdf13ad0316fb",
        "assets/combat-sprites/core__venus/c-right-v1.png": "00cdc3f5eb943a3dc2ea9e2aabbf6027b8d3bc30187ccc8bf5af2ceb49c82b65",
        "assets/combat-sprites/core__venus/c-left-v1.png": "14e97d5d7d9ef7146ad49631077adf047572e00316c7f431bb5140a5fa78bc06"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "recover",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated authored combat phases are adaptations; exact original animation extraction and absolute pixel/model 1:1 certification are not claimed."
      ],
      "weaponCapabilities": {
        "shoot": {
          "tags": [
            "ballistic"
          ],
          "statuses": [],
          "sourceEvidenceSHA256": "1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f",
          "sourceEvidenceFile": "/workspace/cqc-pass10-integrator-review/ROOT_SIX_SELECTED_FIREARM_CAPABILITY_REVIEW.json",
          "sourceEvidenceUID": "core__venus",
          "confirmedByRoot": true,
          "scope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
        }
      }
    },
    "core__venom": {
      "uid": "core__venom",
      "canonicalGameGroup": "tpp",
      "game": "Metal Gear Solid V: The Phantom Pain (2015), released game Venom incarnation",
      "approved": true,
      "confirmedByRoot": true,
      "reviewedNativeSources": 6,
      "originalReferencePhysicallyViewed": true,
      "rootReviewSHA256": "beb4794303ff952f3b807ce8aa9d709097594c34078b8d4d3139f33db9997f2d",
      "actionMap": {
        "light": "punch",
        "heavy": "heavy",
        "low": "low",
        "throw": "throw",
        "special": "shoot",
        "specialDown": "heavy",
        "specialForward": "throw",
        "specialBack": "heavy",
        "super": "heavy",
        "utility": "recover"
      },
      "sourceFiles": {
        "assets/combat-sprites/core__venom/a-right-v1.png": "a89faf67fe47f8fb1d20b457f78a1084086f3fc258d343b1cdb08784ee43b36f",
        "assets/combat-sprites/core__venom/a-left-v1.png": "c0984e12ed10669c3cfe4cafd8c5f3c161f4040dea5078f7a3779abb34ef88b6",
        "assets/combat-sprites/core__venom/b-right-v1.png": "d93b25e22c01088447ca8eb7ec96e0df793b216621926721322f8069b2eaeb17",
        "assets/combat-sprites/core__venom/b-left-v1.png": "23c6f590389f37c8db59a2c3781c6c0aa7310a9b6e2e8fe1b286b27597c46ac3",
        "assets/combat-sprites/core__venom/c-right-v1.png": "1aa4f07c98b66802fae98f4e21040a30e7def3b7ce1c5c584d814b3200928475",
        "assets/combat-sprites/core__venom/c-left-v1.png": "9eb0e86c43192363182d7fba537e8702e55f86c21ab8fa3fb863ce3ef5da22c4"
      },
      "actionSemantics": {
        "punch": "contact",
        "heavy": "contact",
        "low": "contact",
        "throw": "contact",
        "guard": "defense",
        "walk": "movement",
        "jump": "movement",
        "shoot": "firearm",
        "recover": "recover",
        "reload": "reload",
        "deploy": "preparation",
        "charge": "contact"
      },
      "fidelityStatus": "closest_supported",
      "absolute1to1Certified": false,
      "limitations": [
        "Generated combat phases and calibrated versus parameters are authored adaptations, not extracted original game animations or absolute pixel/model1:1 certification."
      ],
      "weaponCapabilities": {
        "shoot": {
          "tags": [
            "ballistic"
          ],
          "statuses": [],
          "sourceEvidenceSHA256": "1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f",
          "sourceEvidenceFile": "/workspace/cqc-pass10-integrator-review/ROOT_SIX_SELECTED_FIREARM_CAPABILITY_REVIEW.json",
          "sourceEvidenceUID": "core__venom",
          "confirmedByRoot": true,
          "scope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
        }
      }
    }
  },
  "gameplayTimingsCollisionsBalances": "Authored Versus adaptation, not original-game metrics",
  "runtimeImported": false,
  "previousRootContractSHA256": "37f5c028f7e30b71c428b6115615d5234a21814b71e564c3174858e0efda63c4",
  "weaponCapabilityAddendum": "Six explicit selected original firearm roles bound to reviewed evidence; no unobserved weapon upgrades admitted."
};
 root.CQC_PASS10_SOURCE_CONTRACTS=document;
 // Selected firearm review SHA256: 1205828f04b6085bbf15b7134ddab4022dbbc7390ed60b4d51d4daa5488e082f.
 root.CQC_PASS10_SELECTED_FIREARM_CAPABILITY_REVIEW={
  "schema": "cqc.pass10.root-selected-firearm-capability-review/1",
  "status": "approved",
  "confirmedByRoot": true,
  "reviewer": "Root reviewed original sources and actual six-source weapon/action contract",
  "reviewedAt": "2026-10-02T17:41:53.723439+00:00",
  "entries": {
    "core__skull_mist": {
      "uid": "core__skull_mist",
      "tags": [
        "ballistic"
      ],
      "statuses": [],
      "physicallyReviewedSourceAction": "shoot",
      "rootReviewSHA256": "96cfbfa907e04d1e1b6771967616fc46e2c3ded8ce94032a5fb5b6f610dd03a1",
      "sourceKind": "visible conventional firearm supported by qualified original incarnation references",
      "capabilityScope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
    },
    "core__snake_pw": {
      "uid": "core__snake_pw",
      "tags": [
        "ballistic"
      ],
      "statuses": [],
      "physicallyReviewedSourceAction": "shoot",
      "rootReviewSHA256": "0abd38c81b9d94c3993467cf92d8051ee8610f12b0510ab4d5e8451896738c3f",
      "sourceKind": "visible conventional firearm supported by qualified original incarnation references",
      "capabilityScope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
    },
    "core__venus": {
      "uid": "core__venus",
      "tags": [
        "ballistic"
      ],
      "statuses": [],
      "physicallyReviewedSourceAction": "shoot",
      "rootReviewSHA256": "effc4781502487525591c6a907373b5b8398fb628f74011e2287a79fb4835235",
      "sourceKind": "visible conventional firearm supported by qualified original incarnation references",
      "capabilityScope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
    },
    "core__venom": {
      "uid": "core__venom",
      "tags": [
        "ballistic"
      ],
      "statuses": [],
      "physicallyReviewedSourceAction": "shoot",
      "rootReviewSHA256": "beb4794303ff952f3b807ce8aa9d709097594c34078b8d4d3139f33db9997f2d",
      "sourceKind": "visible conventional firearm supported by qualified original incarnation references",
      "capabilityScope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
    },
    "core__skull_sniper": {
      "uid": "core__skull_sniper",
      "tags": [
        "precision"
      ],
      "statuses": [],
      "physicallyReviewedSourceAction": "shoot",
      "rootReviewSHA256": "d9133b7115581be456467916d48bb0cb3d7ce2e03c83d732cb97f3331594a7cb",
      "sourceKind": "visible conventional firearm supported by qualified original incarnation references",
      "capabilityScope": "Visible firearm projectile/precision role; no supernatural status, grenade, rocket upgrade or named unattested weapon model. Precision is an authored aiming category, not original game damage certification."
    },
    "core__snake_mpo": {
      "uid": "core__snake_mpo",
      "tags": [
        "tranq"
      ],
      "statuses": [
        "drowsy"
      ],
      "physicallyReviewedSourceAction": "shoot",
      "rootReviewSHA256": "ed65d38c5f9413702d7e105d8ee286d1a4020d10f9979dd6558837871174c1f8",
      "sourceKind": "visible conventional firearm supported by qualified original incarnation references",
      "capabilityScope": "MK22 tranquilizer name/loadout supported; drowsy is an authored bounded Versus effect, not original PSP timing"
    }
  },
  "absolute1to1Certified": false
};
 if(typeof module!=='undefined'&&module.exports)module.exports=document;
})(typeof globalThis!=='undefined'?globalThis:this);
