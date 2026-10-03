/* Native articulated part catalogue. Original reference editions are kept distinct. */
window.CQC_MACHINE_PARTS_CATALOG = {
  "schema": "cqc.machine-parts/1",
  "machines": [
    {
      "id": "rex_mgs1_ps1",
      "edition": "Metal Gear REX — original Metal Gear Solid 1998 PS1-era design, articulated 2D adaptation",
      "origin": [
        1250,
        0
      ],
      "scale": [
        1,
        1
      ],
      "sources": [
        {
          "id": "body",
          "file": "assets/machine-parts/rex-mgs1/body.png",
          "sha256": "b9c49febc4e7bda8897c0d2b1269cee4830265421a300370503f1de9d1a870fe",
          "bytes": 2004429,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "head",
          "file": "assets/machine-parts/rex-mgs1/head.png",
          "sha256": "706dcbc4c5ed1558d97075f6c5262d81d99d0ddbe9affc128ce80ef399bc066c",
          "bytes": 2041360,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "body_components",
          "file": "assets/machine-parts/rex-mgs1/body_components.png",
          "sha256": "5384ced4c9df00585d6500bb658b6d948db116044df2078a4f3aa82117e86156",
          "bytes": 1437350,
          "width": 1448,
          "height": 1086
        },
        {
          "id": "near_legs",
          "file": "assets/machine-parts/rex-mgs1/near_legs.png",
          "sha256": "6df07e6b1f05eb5392dc3c30d8c3b297259ee41fef52ab102539e7bb1db12403",
          "bytes": 2251232,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "far_legs",
          "file": "assets/machine-parts/rex-mgs1/far_legs.png",
          "sha256": "05d6dc576712ce5310430a9c1aa635d66ba507908a5f1fc5dd3864002c6913de",
          "bytes": 1365627,
          "width": 2172,
          "height": 724
        },
        {
          "id": "equipment",
          "file": "assets/machine-parts/rex-mgs1/equipment.png",
          "sha256": "cf6be6b13959b055a6cdcbf380ac84346467d4ef71d8af59cfd2e4821d49d413",
          "bytes": 1964138,
          "width": 1536,
          "height": 1024
        }
      ],
      "parts": [
        {
          "id": "pelvis_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            0,
            0
          ],
          "z": 0,
          "imageScale": 1,
          "rotation": 0
        },
        {
          "id": "body",
          "source": "body",
          "rect": [
            224,
            24,
            1240,
            976
          ],
          "pivot": [
            956,
            846
          ],
          "offset": [
            30,
            235
          ],
          "z": 30,
          "imageScale": 0.235,
          "rotation": 0,
          "channels": {
            "rotation": [
              {
                "channel": "idleBreath",
                "factor": 0.12,
                "cosmetic": true
              }
            ],
            "y": [
              {
                "channel": "rexCollapse",
                "factor": -0.7
              }
            ]
          },
          "parent": "pelvis_anchor"
        },
        {
          "id": "head",
          "source": "head",
          "rect": [
            64,
            48,
            1472,
            976
          ],
          "pivot": [
            1230,
            400
          ],
          "offset": [
            -100,
            110
          ],
          "z": 43,
          "imageScale": 0.205,
          "rotation": 0,
          "parent": "body",
          "channels": {
            "rotation": [
              {
                "channel": "cockpitOpen",
                "factor": -18
              }
            ]
          }
        },
        {
          "id": "jaw",
          "source": "body_components",
          "rect": [
            90,
            652,
            720,
            396
          ],
          "pivot": [
            612,
            107
          ],
          "offset": [
            -100,
            72
          ],
          "z": 41,
          "imageScale": 0.35,
          "rotation": 0,
          "channels": {
            "rotation": [
              {
                "channel": "cockpitOpen",
                "factor": 28
              }
            ],
            "y": [
              {
                "channel": "cockpitOpen",
                "factor": -8
              }
            ]
          },
          "parent": "body"
        },
        {
          "id": "cockpit_interior",
          "source": "body_components",
          "rect": [
            914,
            648,
            416,
            368
          ],
          "pivot": [
            218,
            113
          ],
          "offset": [
            -235,
            62
          ],
          "z": 40,
          "imageScale": 0.32,
          "rotation": 0,
          "showWhen": [
            "cockpitOpened"
          ],
          "parent": "body"
        },
        {
          "id": "far_upper_leg",
          "source": "far_legs",
          "rect": [
            0,
            0,
            730,
            724
          ],
          "pivot": [
            646,
            224
          ],
          "offset": [
            55,
            250
          ],
          "z": 10,
          "imageScale": 0.25,
          "rotation": 0,
          "parent": "pelvis_anchor"
        },
        {
          "id": "far_lower_leg",
          "source": "far_legs",
          "rect": [
            730,
            0,
            680,
            724
          ],
          "pivot": [
            530,
            94
          ],
          "offset": [
            -50.25,
            -94.5
          ],
          "z": 11,
          "imageScale": 0.215,
          "rotation": 0,
          "parent": "far_upper_leg"
        },
        {
          "id": "far_foot",
          "source": "far_legs",
          "rect": [
            1400,
            0,
            772,
            724
          ],
          "pivot": [
            655,
            580
          ],
          "offset": [
            -31.605,
            -110.295
          ],
          "z": 12,
          "imageScale": 0.33238970588235295,
          "rotation": 0,
          "parent": "far_lower_leg"
        },
        {
          "id": "near_upper_leg",
          "source": "near_legs",
          "rect": [
            48,
            40,
            495,
            472
          ],
          "pivot": [
            442,
            106
          ],
          "offset": [
            100,
            255
          ],
          "z": 50,
          "imageScale": 0.28,
          "rotation": 0,
          "channels": {
            "y": [
              {
                "channel": "stompLift",
                "factor": 1
              }
            ]
          },
          "parent": "pelvis_anchor"
        },
        {
          "id": "near_lower_leg",
          "source": "near_legs",
          "rect": [
            552,
            24,
            416,
            490
          ],
          "pivot": [
            337,
            68
          ],
          "offset": [
            -61.60000000000001,
            -74.76
          ],
          "z": 51,
          "imageScale": 0.28,
          "rotation": 15,
          "parent": "near_upper_leg"
        },
        {
          "id": "near_foot",
          "source": "near_legs",
          "rect": [
            972,
            128,
            564,
            384
          ],
          "pivot": [
            328,
            80
          ],
          "offset": [
            -22.680000000000003,
            -98.28000000000002
          ],
          "z": 52,
          "imageScale": 0.2847268596752157,
          "rotation": -15,
          "parent": "near_lower_leg"
        },
        {
          "id": "railgun",
          "source": "equipment",
          "rect": [
            0,
            64,
            768,
            440
          ],
          "pivot": [
            710,
            286
          ],
          "offset": [
            -25,
            143
          ],
          "z": 20,
          "imageScale": 0.5,
          "rotation": 9,
          "parent": "body"
        },
        {
          "id": "radome",
          "source": "equipment",
          "rect": [
            768,
            64,
            390,
            494
          ],
          "pivot": [
            186,
            200
          ],
          "offset": [
            42,
            160
          ],
          "z": 60,
          "imageScale": 0.33,
          "rotation": 0,
          "variants": [
            {
              "when": "radomeDestroyed",
              "source": "equipment",
              "rect": [
                1160,
                48,
                376,
                518
              ],
              "pivot": [
                190,
                216
              ],
              "imageScale": 0.33
            }
          ],
          "parent": "body"
        },
        {
          "id": "radome_fragment_a",
          "source": "equipment",
          "rect": [
            80,
            552,
            400,
            440
          ],
          "pivot": [
            195,
            186
          ],
          "offset": [
            20,
            172
          ],
          "z": 62,
          "imageScale": 0.235,
          "rotation": 0,
          "showWhen": [
            "radomeDestroyed"
          ],
          "detachment": {
            "when": "radomeDestroyed",
            "clock": "radomeDetachFrames",
            "anchor": [
              50,
              407
            ],
            "duration": 76,
            "vx": -1.15,
            "vy": 1.8,
            "gravity": 0.13,
            "spin": 1.5,
            "fade": 18
          },
          "parent": "body"
        },
        {
          "id": "radome_fragment_b",
          "source": "equipment",
          "rect": [
            584,
            608,
            376,
            376
          ],
          "pivot": [
            165,
            171
          ],
          "offset": [
            50,
            155
          ],
          "z": 63,
          "imageScale": 0.235,
          "rotation": 0,
          "showWhen": [
            "radomeDestroyed"
          ],
          "detachment": {
            "when": "radomeDestroyed",
            "clock": "radomeDetachFrames",
            "anchor": [
              80,
              390
            ],
            "duration": 88,
            "vx": 1.4,
            "vy": 1.1,
            "gravity": 0.11,
            "spin": -1.4,
            "fade": 20
          },
          "parent": "body"
        },
        {
          "id": "radome_fragment_c",
          "source": "equipment",
          "rect": [
            1056,
            704,
            432,
            256
          ],
          "pivot": [
            203,
            93
          ],
          "offset": [
            65,
            133
          ],
          "z": 64,
          "imageScale": 0.235,
          "rotation": 0,
          "showWhen": [
            "radomeDestroyed"
          ],
          "detachment": {
            "when": "radomeDestroyed",
            "clock": "radomeDetachFrames",
            "anchor": [
              95,
              368
            ],
            "duration": 92,
            "vx": 0.45,
            "vy": 2.1,
            "gravity": 0.15,
            "spin": 2.2,
            "fade": 20
          },
          "parent": "body"
        }
      ]
    },
    {
      "id": "ray_mgs2_arsenal",
      "edition": "MGS2 Arsenal Gear mass-produced unmanned RAY; original MGS2 appearance, exact executable build unspecified by reference archive",
      "origin": [
        1250,
        0
      ],
      "scale": [
        1,
        1
      ],
      "sources": [
        {
          "id": "torsoSheet",
          "file": "assets/machine-parts/ray-mgs2/ray-mgs2-torso-head-01.png",
          "sha256": "3eb3227cb9df2b03578e693d30aa2253f78b6f09832ff4c3b78bcb8813d28657",
          "bytes": 2143459,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "legsSheet",
          "file": "assets/machine-parts/ray-mgs2/ray-mgs2-legs-01.png",
          "sha256": "a112e537f58420a72a0faa9769427b89466b7f009f973531c3723acc450de3fd",
          "bytes": 1998393,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "armsSheet",
          "file": "assets/machine-parts/ray-mgs2/ray-mgs2-arms-01.png",
          "sha256": "92aa6054049d76dc1a696a7e7d62d3288ea47bf211b4b8572635c415ece6c223",
          "bytes": 1962491,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "headSheet",
          "file": "assets/machine-parts/ray-mgs2/ray-mgs2-head-jaw-02.png",
          "sha256": "3c58e7da84896bf2bdfbf5f89e453800606654871e2af486ebe9a873d6b22196",
          "bytes": 1527117,
          "width": 1536,
          "height": 1024
        }
      ],
      "parts": [
        {
          "id": "torso",
          "source": "torsoSheet",
          "rect": [
            110,
            18,
            620,
            592
          ],
          "pivot": [
            370,
            512
          ],
          "offset": [
            0,
            240
          ],
          "imageScale": 0.41,
          "z": 5,
          "channels": {
            "y": [
              {
                "channel": "unitCollapse",
                "factor": -1
              }
            ]
          }
        },
        {
          "id": "head",
          "source": "headSheet",
          "rect": [
            15,
            65,
            749,
            360
          ],
          "pivot": [
            696,
            185
          ],
          "offset": [
            -10.4068,
            157.8452
          ],
          "imageScale": 0.2365,
          "z": 10,
          "parent": "torso",
          "channels": {
            "rotation": [
              {
                "channel": "jawOpen",
                "factor": 20
              }
            ]
          }
        },
        {
          "id": "lowerJaw",
          "source": "headSheet",
          "rect": [
            779,
            134,
            730,
            345
          ],
          "pivot": [
            661,
            131
          ],
          "offset": [
            0.0,
            -3.01
          ],
          "imageScale": 0.2365,
          "z": 12,
          "parent": "head",
          "channels": {
            "rotation": [
              {
                "channel": "jawOpen",
                "factor": 20
              }
            ]
          }
        },
        {
          "id": "mouthInterior",
          "source": "headSheet",
          "rect": [
            61,
            640,
            697,
            242
          ],
          "pivot": [
            640,
            106
          ],
          "offset": [
            -15,
            -55
          ],
          "imageScale": 0.215,
          "z": 11,
          "parent": "head",
          "showWhen": [
            "jawOpen"
          ]
        },
        {
          "id": "nearThigh",
          "source": "legsSheet",
          "rect": [
            110,
            25,
            495,
            535
          ],
          "pivot": [
            400,
            119
          ],
          "offset": [
            -50.2326,
            -21.8782
          ],
          "imageScale": 0.258,
          "z": 6,
          "parent": "torso",
          "channels": {
            "rotation": [
              {
                "channel": "nearKneeStagger",
                "factor": -8
              }
            ]
          }
        },
        {
          "id": "nearShin",
          "source": "legsSheet",
          "rect": [
            635,
            10,
            415,
            545
          ],
          "pivot": [
            317,
            92
          ],
          "offset": [
            -45.7674,
            -88.1218
          ],
          "imageScale": 0.2236,
          "z": 7,
          "parent": "nearThigh"
        },
        {
          "id": "nearFoot",
          "source": "legsSheet",
          "rect": [
            1050,
            135,
            486,
            430
          ],
          "pivot": [
            430,
            114
          ],
          "offset": [
            -56.5708,
            -85.2218
          ],
          "imageScale": 0.1419,
          "z": 8,
          "parent": "nearShin"
        },
        {
          "id": "farThigh",
          "source": "legsSheet",
          "rect": [
            150,
            545,
            405,
            445
          ],
          "pivot": [
            97,
            101
          ],
          "offset": [
            48.246,
            8.465
          ],
          "imageScale": 0.2795,
          "z": 1,
          "parent": "torso",
          "channels": {
            "rotation": [
              {
                "channel": "farKneeStagger",
                "factor": 8
              }
            ]
          }
        },
        {
          "id": "farShin",
          "source": "legsSheet",
          "rect": [
            735,
            552,
            300,
            425
          ],
          "pivot": [
            165,
            55
          ],
          "offset": [
            46.754,
            -75.465
          ],
          "imageScale": 0.385,
          "z": 2,
          "parent": "farThigh"
        },
        {
          "id": "farFoot",
          "source": "legsSheet",
          "rect": [
            1080,
            650,
            435,
            335
          ],
          "pivot": [
            326,
            71
          ],
          "offset": [
            20.79,
            -120.7798
          ],
          "imageScale": 0.1978,
          "z": 3,
          "parent": "farShin"
        },
        {
          "id": "nearShoulder",
          "source": "armsSheet",
          "rect": [
            155,
            515,
            525,
            465
          ],
          "pivot": [
            122,
            306
          ],
          "offset": [
            69.7,
            143.55
          ],
          "imageScale": 0.215,
          "z": 8,
          "parent": "torso"
        },
        {
          "id": "nearWing",
          "source": "armsSheet",
          "rect": [
            0,
            75,
            779,
            415
          ],
          "pivot": [
            45,
            269
          ],
          "offset": [
            64.5,
            44.505
          ],
          "imageScale": 0.26,
          "z": 7,
          "parent": "nearShoulder"
        },
        {
          "id": "farShoulder",
          "source": "armsSheet",
          "rect": [
            875,
            530,
            500,
            460
          ],
          "pivot": [
            384,
            307
          ],
          "offset": [
            -94.7,
            145.55
          ],
          "imageScale": 0.215,
          "z": 2,
          "parent": "torso"
        },
        {
          "id": "farWing",
          "source": "armsSheet",
          "rect": [
            779,
            90,
            757,
            405
          ],
          "pivot": [
            727,
            267
          ],
          "offset": [
            -58.48,
            42.14
          ],
          "imageScale": 0.3,
          "z": 1,
          "parent": "farShoulder"
        }
      ]
    },
    {
      "id": "mgd_mg2_msx2",
      "edition": "Metal Gear D — original Metal Gear 2: Solid Snake, MSX2 1990 manual 51–52; candidate articulated 2D adaptation",
      "origin": [
        1120,
        0
      ],
      "scale": [
        1,
        1
      ],
      "sources": [
        {
          "id": "body",
          "file": "assets/machine-parts/mgd-mg2-msx2/body.png",
          "sha256": "dd0746cab5460107189043ebc10b42527eb803994745a9785426340768822cb9",
          "bytes": 1701310,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "upper",
          "file": "assets/machine-parts/mgd-mg2-msx2/upper.png",
          "sha256": "d765a70cb38958e1d26d69c7fe70ed157473bc7f64e055e8cc24bd4ba1fbdaf8",
          "bytes": 1112595,
          "width": 1774,
          "height": 887
        },
        {
          "id": "lower",
          "file": "assets/machine-parts/mgd-mg2-msx2/lower.png",
          "sha256": "316c813f2cc6c3a2e63859bfcafbddc9f6eb28df5a1de9f28fd919d33ac44684",
          "bytes": 2139773,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "segmentation",
          "file": "assets/machine-parts/mgd-mg2-msx2/segmentation.png",
          "sha256": "17335b42f92dc5fc9f650e9b4ec6f9bb5398a7be18379da4e8d5be2b45ea6d16",
          "bytes": 915843,
          "width": 1448,
          "height": 1086
        },
        {
          "id": "equipment",
          "file": "assets/machine-parts/mgd-mg2-msx2/equipment.png",
          "sha256": "3bbe39ff0e8ba5f139812379d1672c5f8750b87c245723111ee4c1087e9be8a7",
          "bytes": 1788869,
          "width": 1536,
          "height": 1024
        },
        {
          "id": "gun",
          "file": "assets/machine-parts/mgd-mg2-msx2/gun.png",
          "sha256": "a46adbe53c4ee0620e835ce28e1d8a7c62c39cccf4c01a81bd476645d911395d",
          "bytes": 330749,
          "width": 1881,
          "height": 836
        },
        {
          "id": "far_foot",
          "file": "assets/machine-parts/mgd-mg2-msx2/far_foot.png",
          "sha256": "e17daa0cf5b8b74231b382693c717232aa02a775719bd268799c1039f7a94cff",
          "bytes": 525364,
          "width": 1774,
          "height": 887
        }
      ],
      "parts": [
        {
          "id": "machine_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            0,
            0
          ],
          "z": 0,
          "imageScale": 1,
          "rotation": 0,
          "channels": {
            "y": [
              {
                "channel": "mgdCollapseDrop",
                "factor": -1
              }
            ],
            "rotation": [
              {
                "channel": "mgdCollapseTilt",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "body_hull",
          "source": "body",
          "rect": [
            22,
            155,
            756,
            467
          ],
          "pivot": [
            508,
            428
          ],
          "offset": [
            0,
            245
          ],
          "z": 30,
          "imageScale": 0.48,
          "rotation": 0,
          "parent": "machine_anchor",
          "channels": {
            "y": [
              {
                "channel": "idleBreath",
                "factor": 1.1,
                "cosmetic": true
              }
            ]
          }
        },
        {
          "id": "rear_power_housing",
          "source": "body",
          "rect": [
            789,
            223,
            324,
            341
          ],
          "pivot": [
            90,
            310
          ],
          "offset": [
            50,
            327
          ],
          "z": 12,
          "imageScale": 0.34,
          "rotation": 0,
          "parent": "machine_anchor"
        },
        {
          "id": "belly_actuator",
          "source": "body",
          "rect": [
            1152,
            322,
            361,
            276
          ],
          "pivot": [
            180,
            30
          ],
          "offset": [
            9,
            262
          ],
          "z": 25,
          "imageScale": 0.24,
          "rotation": 0,
          "parent": "machine_anchor"
        },
        {
          "id": "sensor_top",
          "source": "body",
          "rect": [
            231,
            758,
            195,
            173
          ],
          "pivot": [
            94,
            151
          ],
          "offset": [
            -36,
            423
          ],
          "z": 34,
          "imageScale": 0.27,
          "rotation": 0,
          "parent": "machine_anchor"
        },
        {
          "id": "aerial_pair",
          "source": "body",
          "rect": [
            587,
            649,
            346,
            310
          ],
          "pivot": [
            155,
            295
          ],
          "offset": [
            0,
            26
          ],
          "z": 35,
          "imageScale": 0.32,
          "rotation": 0,
          "parent": "sensor_top"
        },
        {
          "id": "six_port_missile_pod",
          "source": "equipment",
          "rect": [
            235,
            35,
            422,
            600
          ],
          "pivot": [
            300,
            540
          ],
          "offset": [
            -98,
            360
          ],
          "z": 15,
          "imageScale": 0.31,
          "rotation": 0,
          "parent": "machine_anchor"
        },
        {
          "id": "opposite_side_housing",
          "source": "equipment",
          "rect": [
            916,
            186,
            321,
            381
          ],
          "pivot": [
            110,
            170
          ],
          "offset": [
            130,
            292
          ],
          "z": 33,
          "imageScale": 0.25,
          "rotation": 0,
          "parent": "machine_anchor"
        },
        {
          "id": "rear_diagonal_tube",
          "source": "segmentation",
          "rect": [
            988,
            590,
            434,
            389
          ],
          "pivot": [
            72,
            328
          ],
          "offset": [
            99,
            334
          ],
          "z": 13,
          "imageScale": 0.31,
          "rotation": 0,
          "parent": "machine_anchor"
        },
        {
          "id": "three_tube_rotary_gun",
          "source": "gun",
          "rect": [
            627,
            258,
            696,
            304
          ],
          "pivot": [
            556,
            167
          ],
          "offset": [
            -230,
            251
          ],
          "z": 38,
          "imageScale": 0.2,
          "rotation": 0,
          "parent": "machine_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "mgdGunRecoil",
                "factor": -0.5,
                "cosmetic": true
              }
            ]
          }
        },
        {
          "id": "far_hip_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            84,
            231
          ],
          "z": 0,
          "imageScale": 1,
          "rotation": 0,
          "parent": "machine_anchor",
          "channels": {
            "y": [
              {
                "channel": "strideLift",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "far_proximal_composite",
          "source": "upper",
          "rect": [
            1071,
            160,
            569,
            594
          ],
          "pivot": [
            419,
            205
          ],
          "offset": [
            0,
            0
          ],
          "z": 10,
          "imageScale": 0.235,
          "rotation": 28,
          "parent": "far_hip_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "farLegDisabled",
                "factor": -15
              },
              {
                "channel": "mgdFarFoldUpper",
                "factor": 1
              }
            ],
            "opacity": [
              {
                "channel": "farLegDamage",
                "factor": -0.12
              }
            ]
          }
        },
        {
          "id": "far_distal_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            -19.975,
            -77.785
          ],
          "z": 0,
          "imageScale": 1,
          "rotation": 0,
          "parent": "far_proximal_composite"
        },
        {
          "id": "far_lower_leg",
          "source": "lower",
          "rect": [
            790,
            523,
            281,
            460
          ],
          "pivot": [
            58,
            43
          ],
          "offset": [
            0,
            0
          ],
          "z": 11,
          "imageScale": 0.3,
          "rotation": -46,
          "parent": "far_distal_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "farLegDisabled",
                "factor": 24
              },
              {
                "channel": "mgdFarFoldLower",
                "factor": 1
              }
            ],
            "x": [
              {
                "channel": "farLegDisabled",
                "factor": 7
              },
              {
                "channel": "mgdFarFoldX",
                "factor": 1
              }
            ],
            "y": [
              {
                "channel": "farLegDisabled",
                "factor": -9
              },
              {
                "channel": "mgdFarFoldY",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "far_foot",
          "source": "far_foot",
          "rect": [
            319,
            246,
            1230,
            467
          ],
          "pivot": [
            835,
            139
          ],
          "offset": [
            42.3,
            -111.6
          ],
          "z": 12,
          "imageScale": 0.104,
          "rotation": 18,
          "parent": "far_lower_leg",
          "channels": {
            "rotation": [
              {
                "channel": "farLegDisabled",
                "factor": -8
              },
              {
                "channel": "mgdFarFootLevel",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "near_hip_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            -40,
            235
          ],
          "z": 0,
          "imageScale": 1,
          "rotation": 0,
          "parent": "machine_anchor",
          "channels": {
            "y": [
              {
                "channel": "strideLift",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "near_proximal_composite",
          "source": "upper",
          "rect": [
            191,
            161,
            617,
            589
          ],
          "pivot": [
            553,
            199
          ],
          "offset": [
            0,
            0
          ],
          "z": 40,
          "imageScale": 0.235,
          "rotation": 0,
          "parent": "near_hip_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "nearLegDisabled",
                "factor": 12
              },
              {
                "channel": "mgdNearFoldUpper",
                "factor": 1
              }
            ],
            "opacity": [
              {
                "channel": "nearLegDamage",
                "factor": -0.12
              }
            ]
          }
        },
        {
          "id": "near_distal_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            -24.44,
            -81.545
          ],
          "z": 0,
          "imageScale": 1,
          "rotation": 0,
          "parent": "near_proximal_composite"
        },
        {
          "id": "near_lower_leg",
          "source": "lower",
          "rect": [
            787,
            58,
            277,
            453
          ],
          "pivot": [
            56,
            42
          ],
          "offset": [
            0,
            0
          ],
          "z": 41,
          "imageScale": 0.31,
          "rotation": -46,
          "parent": "near_distal_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "nearLegDisabled",
                "factor": -22
              },
              {
                "channel": "mgdNearFoldLower",
                "factor": 1
              }
            ],
            "x": [
              {
                "channel": "nearLegDisabled",
                "factor": -7
              },
              {
                "channel": "mgdNearFoldX",
                "factor": 1
              }
            ],
            "y": [
              {
                "channel": "nearLegDisabled",
                "factor": -9
              },
              {
                "channel": "mgdNearFoldY",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "near_foot",
          "source": "segmentation",
          "rect": [
            33,
            805,
            491,
            205
          ],
          "pivot": [
            347,
            51
          ],
          "offset": [
            45.57,
            -110.98
          ],
          "z": 42,
          "imageScale": 0.3,
          "rotation": 46,
          "parent": "near_lower_leg",
          "channels": {
            "rotation": [
              {
                "channel": "nearLegDisabled",
                "factor": 12
              },
              {
                "channel": "mgdNearFootLevel",
                "factor": 1
              }
            ]
          }
        }
      ]
    },
    {
      "id": "tx55_mg1_msx1987",
      "edition": "TX-55 — original Metal Gear MSX2 1987, Konami JP manual RC750 p17; stationary 2D presentation adaptation",
      "origin": [
        825,
        0
      ],
      "scale": [
        1,
        1
      ],
      "sources": [
        {
          "id": "body",
          "sha256": "3787517a1b8da2a90f083e98c7ea4299becee8e8fbe97571d5c450c1f8982fc4",
          "bytes": 1670982,
          "width": 1536,
          "height": 1024,
          "file": "assets/machine-parts/tx55-mg1-msx/body.png"
        },
        {
          "id": "weapons",
          "sha256": "ffa571a0be6dccfcab1fe69e8af8c9c3dac3e3058da39a9c1a5bd32afcd0a496",
          "bytes": 703196,
          "width": 1254,
          "height": 1254,
          "file": "assets/machine-parts/tx55-mg1-msx/weapons.png"
        },
        {
          "id": "legs",
          "sha256": "fa8249951b62e3cb8d5a9478b539836969f89cdb1b89e36d3e69508de270c1a3",
          "bytes": 1559050,
          "width": 1536,
          "height": 1024,
          "file": "assets/machine-parts/tx55-mg1-msx/legs.png"
        }
      ],
      "parts": [
        {
          "id": "machine_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            0,
            0
          ],
          "imageScale": 1,
          "z": 0,
          "hideWhen": [
            "tx55Absent"
          ]
        },
        {
          "id": "chassis",
          "source": "body",
          "rect": [
            80,
            101,
            467,
            432
          ],
          "pivot": [
            235,
            326
          ],
          "offset": [
            35,
            292
          ],
          "imageScale": 0.46,
          "z": 30,
          "parent": "machine_anchor"
        },
        {
          "id": "cockpit",
          "source": "body",
          "rect": [
            600,
            117,
            517,
            430
          ],
          "pivot": [
            240,
            355
          ],
          "offset": [
            92,
            340
          ],
          "imageScale": 0.43,
          "z": 44,
          "parent": "machine_anchor"
        },
        {
          "id": "sight",
          "source": "body",
          "rect": [
            1215,
            266,
            249,
            253
          ],
          "pivot": [
            120,
            237
          ],
          "offset": [
            -14,
            465
          ],
          "imageScale": 0.3,
          "z": 47,
          "parent": "machine_anchor"
        },
        {
          "id": "rear_stabilizer",
          "source": "body",
          "rect": [
            104,
            600,
            336,
            343
          ],
          "pivot": [
            245,
            109
          ],
          "offset": [
            130,
            303
          ],
          "imageScale": 0.28,
          "z": 5,
          "parent": "machine_anchor"
        },
        {
          "id": "main_nozzle",
          "source": "body",
          "rect": [
            644,
            679,
            303,
            233
          ],
          "pivot": [
            136,
            192
          ],
          "offset": [
            20,
            255
          ],
          "imageScale": 0.24,
          "z": 40,
          "parent": "machine_anchor"
        },
        {
          "id": "power_pipe",
          "source": "body",
          "rect": [
            1134,
            664,
            346,
            276
          ],
          "pivot": [
            174,
            140
          ],
          "offset": [
            135,
            315
          ],
          "imageScale": 0.22,
          "z": 39,
          "parent": "machine_anchor"
        },
        {
          "id": "nuclear_launcher",
          "source": "weapons",
          "rect": [
            129,
            65,
            433,
            554
          ],
          "pivot": [
            229,
            529
          ],
          "offset": [
            -78,
            348
          ],
          "imageScale": 0.37,
          "z": 46,
          "parent": "machine_anchor"
        },
        {
          "id": "gun_module",
          "source": "weapons",
          "rect": [
            740,
            238,
            367,
            366
          ],
          "pivot": [
            193,
            317
          ],
          "offset": [
            -84,
            302
          ],
          "imageScale": 0.29,
          "z": 48,
          "parent": "machine_anchor"
        },
        {
          "id": "near_tasset",
          "source": "weapons",
          "rect": [
            129,
            700,
            402,
            459
          ],
          "pivot": [
            301,
            52
          ],
          "offset": [
            -72,
            303
          ],
          "imageScale": 0.29,
          "z": 42,
          "parent": "machine_anchor"
        },
        {
          "id": "far_tasset",
          "source": "weapons",
          "rect": [
            801,
            693,
            337,
            471
          ],
          "pivot": [
            66,
            66
          ],
          "offset": [
            100,
            299
          ],
          "imageScale": 0.26,
          "z": 18,
          "parent": "machine_anchor"
        },
        {
          "id": "near_thigh",
          "source": "legs",
          "rect": [
            197,
            68,
            203,
            413
          ],
          "pivot": [
            92,
            32
          ],
          "offset": [
            -69,
            284.69
          ],
          "imageScale": 0.29,
          "z": 25,
          "parent": "machine_anchor"
        },
        {
          "id": "near_shin",
          "source": "legs",
          "rect": [
            656,
            63,
            219,
            437
          ],
          "pivot": [
            90,
            29
          ],
          "offset": [
            -15.66,
            -95.12
          ],
          "imageScale": 0.27,
          "z": 26,
          "parent": "near_thigh"
        },
        {
          "id": "near_foot",
          "source": "legs",
          "rect": [
            1070,
            180,
            396,
            337
          ],
          "pivot": [
            220,
            33
          ],
          "offset": [
            -8.1,
            -100.17
          ],
          "imageScale": 0.3,
          "z": 27,
          "parent": "near_shin"
        },
        {
          "id": "far_thigh",
          "source": "legs",
          "rect": [
            192,
            542,
            208,
            424
          ],
          "pivot": [
            97,
            31
          ],
          "offset": [
            115,
            279.7
          ],
          "imageScale": 0.29,
          "z": 10,
          "parent": "machine_anchor"
        },
        {
          "id": "far_shin",
          "source": "legs",
          "rect": [
            666,
            536,
            216,
            433
          ],
          "pivot": [
            84,
            40
          ],
          "offset": [
            -17.11,
            -97.15
          ],
          "imageScale": 0.27,
          "z": 11,
          "parent": "far_thigh"
        },
        {
          "id": "far_foot",
          "source": "legs",
          "rect": [
            1077,
            650,
            383,
            332
          ],
          "pivot": [
            205,
            37
          ],
          "offset": [
            -9.99,
            -95.85
          ],
          "imageScale": 0.3,
          "z": 12,
          "parent": "far_shin"
        }
      ]
    },
    {
      "id": "icbmg_mpo_psp2006",
      "edition": "ICBMG — Metal Gear Solid: Portable Ops original PSP 2006; distinct from RAXA; source-led 2D ballistic presentation",
      "origin": [
        1210,
        300
      ],
      "scale": [
        1,
        1
      ],
      "sources": [
        {
          "id": "native_master",
          "file": "assets/machine-parts/icbmg-mpo-psp/master.png",
          "sha256": "a5157543dc7d2af0abdae16f208ed86a53fbf8000f15334821a446488a237aef",
          "bytes": 491854,
          "width": 1060,
          "height": 1484
        }
      ],
      "parts": [
        {
          "id": "machine_anchor",
          "source": "native_master",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            0,
            0
          ],
          "z": 0,
          "imageScale": 1,
          "channels": {
            "x": [
              {
                "channel": "icbmgDivertedDrift",
                "factor": 1
              }
            ],
            "rotation": [
              {
                "channel": "icbmgDivertedTilt",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "guidance_crown_composite",
          "source": "native_master",
          "rect": [
            419,
            19,
            230,
            267
          ],
          "pivot": [
            114,
            136
          ],
          "offset": [
            -120,
            65
          ],
          "z": 20,
          "imageScale": 0.38,
          "parent": "machine_anchor"
        },
        {
          "id": "axial_fuselage",
          "source": "native_master",
          "rect": [
            448,
            286,
            172,
            1042
          ],
          "pivot": [
            85,
            0
          ],
          "offset": [
            0,
            -49.78
          ],
          "z": 10,
          "imageScale": 0.38,
          "parent": "guidance_crown_composite"
        },
        {
          "id": "exhaust_mount",
          "source": "native_master",
          "rect": [
            430,
            1328,
            205,
            57
          ],
          "pivot": [
            103,
            0
          ],
          "offset": [
            0,
            -395.96
          ],
          "z": 30,
          "imageScale": 0.38,
          "parent": "axial_fuselage"
        },
        {
          "id": "left_exhaust_bell",
          "source": "native_master",
          "rect": [
            447,
            1385,
            60,
            75
          ],
          "pivot": [
            31,
            0
          ],
          "offset": [
            -20.9,
            -21.66
          ],
          "z": 40,
          "imageScale": 0.38,
          "parent": "exhaust_mount"
        },
        {
          "id": "center_exhaust_bell",
          "source": "native_master",
          "rect": [
            507,
            1385,
            54,
            75
          ],
          "pivot": [
            26,
            0
          ],
          "offset": [
            0,
            -21.66
          ],
          "z": 41,
          "imageScale": 0.38,
          "parent": "exhaust_mount"
        },
        {
          "id": "right_exhaust_bell",
          "source": "native_master",
          "rect": [
            561,
            1385,
            63,
            75
          ],
          "pivot": [
            29,
            0
          ],
          "offset": [
            21.66,
            -21.66
          ],
          "z": 42,
          "imageScale": 0.38,
          "parent": "exhaust_mount"
        }
      ],
      "sourceQualification": {
        "absolute1to1Certified": false,
        "edition": "Original PSP 2006 visual design, region/ROM/emulator of reproduced stream not certified",
        "confirmed": "Artbook0045: long vertical missile, broad open crown, long cylindrical fuselage, lower mount and three bell nozzles. PSP cinematic thumbnail24001 confirms upper crown, side apertures, external vertical braces and lower crown ring.",
        "guidance": "Single existing engine target is a logical anchor inside the crown composite; exact canonical internal gyroscope location/appearance not independently authenticated. No fabricated exposed gyroscope bitmap.",
        "nozzles": "Three source rectangles preserve the native adjacent bell silhouettes; their bottom antialias edges touch in the generated master. No relative hardware rotation, detachment or extra HP is introduced.",
        "cropAlpha": "PNG bytes untouched. Source-native crop rectangles retain slight <=19-alpha edge residues. Runtime alpha clipping or image pixel editing is not used.",
        "viewport": "Canonical tall missile partly extends below the launch floor at initial engine height. Crown tracks the existing guidance anchor. The rig does not squat, walk or distort the missile to fit the prior procedural silhouette."
      }
    },
    {
      "id": "raxa_mpo_psp2006",
      "edition": "Metal Gear RAXA — Metal Gear Solid: Portable Ops 2006 original PSP, documented four-support prototype; articulated 2D adaptation, not absolute1:1 certification",
      "origin": [
        1170,
        0
      ],
      "scale": [
        1,
        1
      ],
      "sources": [
        {
          "id": "body",
          "file": "assets/machine-parts/raxa-mpo-psp/body.png",
          "sha256": "9abfbcaf2254ea36619dd627d30be065726100cc5750bb4ff06d88bfcf594f88",
          "width": 1536,
          "height": 1024,
          "bytes": 1946701
        },
        {
          "id": "equipment",
          "file": "assets/machine-parts/raxa-mpo-psp/equipment.png",
          "sha256": "4145648ef07d74950cc92483ddbfc8909c75328fcd449d328bfa7ec1fac035b5",
          "width": 1536,
          "height": 1024,
          "bytes": 2074433
        },
        {
          "id": "legs",
          "file": "assets/machine-parts/raxa-mpo-psp/legs.png",
          "sha256": "cac75cce19bd350049d6181bed2d88c8522f92ceb603729388e7eeae83144e66",
          "width": 1536,
          "height": 1024,
          "bytes": 1896598
        },
        {
          "id": "bays",
          "file": "assets/machine-parts/raxa-mpo-psp/bays.png",
          "sha256": "4496c2c7ef5b28a6ee887b1bab4560168627ef25792ad42a75cdd157e5529d19",
          "width": 1536,
          "height": 1024,
          "bytes": 2267401
        }
      ],
      "parts": [
        {
          "id": "machine_anchor",
          "source": "body",
          "rect": [
            0,
            0,
            1,
            1
          ],
          "pivot": [
            0,
            0
          ],
          "offset": [
            0,
            0
          ],
          "z": -99,
          "channels": {
            "y": [
              {
                "channel": "raxaCollapseDrop",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "body",
          "source": "body",
          "rect": [
            220,
            70,
            1255,
            880
          ],
          "pivot": [
            580,
            680
          ],
          "offset": [
            0,
            260
          ],
          "imageScale": 0.24,
          "z": 30,
          "parent": "machine_anchor"
        },
        {
          "id": "camera_gun",
          "source": "equipment",
          "rect": [
            155,
            615,
            475,
            375
          ],
          "pivot": [
            230,
            180
          ],
          "offset": [
            -60,
            240
          ],
          "imageScale": 0.2,
          "z": 50,
          "parent": "machine_anchor"
        },
        {
          "id": "left_silo",
          "source": "bays",
          "rect": [
            30,
            70,
            735,
            350
          ],
          "pivot": [
            690,
            160
          ],
          "offset": [
            -100,
            335
          ],
          "imageScale": 0.75,
          "z": 20,
          "parent": "machine_anchor",
          "variants": [
            {
              "when": "raxaLeftPodOpen",
              "rect": [
                25,
                465,
                742,
                488
              ],
              "pivot": [
                695,
                247
              ]
            }
          ]
        },
        {
          "id": "right_silo",
          "source": "bays",
          "rect": [
            780,
            88,
            737,
            355
          ],
          "pivot": [
            45,
            140
          ],
          "offset": [
            110,
            260
          ],
          "imageScale": 0.64,
          "z": 38,
          "parent": "machine_anchor",
          "variants": [
            {
              "when": "raxaRightPodOpen",
              "rect": [
                775,
                462,
                739,
                509
              ],
              "pivot": [
                45,
                285
              ]
            }
          ]
        },
        {
          "id": "p1_upper",
          "source": "legs",
          "rect": [
            80,
            60,
            255,
            277
          ],
          "pivot": [
            65,
            93
          ],
          "offset": [
            -140,
            180
          ],
          "imageScale": 0.4,
          "z": 9,
          "parent": "machine_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP1Upper",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p1_shin",
          "source": "legs",
          "rect": [
            116,
            361,
            193,
            371
          ],
          "pivot": [
            133,
            55
          ],
          "offset": [
            23.2,
            -62.8
          ],
          "imageScale": 0.42,
          "z": 9.1,
          "parent": "p1_upper",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP1Lower",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p1_foot",
          "source": "legs",
          "rect": [
            40,
            755,
            352,
            178
          ],
          "pivot": [
            226,
            50
          ],
          "offset": [
            -30.24,
            -119.28
          ],
          "imageScale": 0.3,
          "z": 9.2,
          "parent": "p1_shin",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP1FootLevel",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p2_upper",
          "source": "legs",
          "rect": [
            440,
            55,
            300,
            290
          ],
          "pivot": [
            150,
            105
          ],
          "offset": [
            -60,
            198
          ],
          "imageScale": 0.47,
          "z": 44,
          "parent": "machine_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP2Upper",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p2_shin",
          "source": "legs",
          "rect": [
            502,
            365,
            198,
            372
          ],
          "pivot": [
            163,
            50
          ],
          "offset": [
            28.2,
            -71.44
          ],
          "imageScale": 0.3,
          "z": 44.1,
          "parent": "p2_upper",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP2Lower",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p2_foot",
          "source": "legs",
          "rect": [
            401,
            775,
            341,
            169
          ],
          "pivot": [
            209,
            45
          ],
          "offset": [
            -28.5,
            -86.7
          ],
          "imageScale": 0.3,
          "z": 44.2,
          "parent": "p2_shin",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP2FootLevel",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p3_upper",
          "source": "legs",
          "rect": [
            830,
            68,
            278,
            283
          ],
          "pivot": [
            164,
            101
          ],
          "offset": [
            60,
            194
          ],
          "imageScale": 0.47,
          "z": 43,
          "parent": "machine_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP3Upper",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p3_shin",
          "source": "legs",
          "rect": [
            874,
            368,
            209,
            367
          ],
          "pivot": [
            46,
            65
          ],
          "offset": [
            -43.71,
            -66.27
          ],
          "imageScale": 0.31,
          "z": 43.1,
          "parent": "p3_upper",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP3Lower",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p3_foot",
          "source": "legs",
          "rect": [
            807,
            765,
            366,
            185
          ],
          "pivot": [
            186,
            55
          ],
          "offset": [
            31.62,
            -81.53
          ],
          "imageScale": 0.3,
          "z": 43.2,
          "parent": "p3_shin",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP3FootLevel",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p4_upper",
          "source": "legs",
          "rect": [
            1215,
            57,
            276,
            276
          ],
          "pivot": [
            55,
            108
          ],
          "offset": [
            140,
            180
          ],
          "imageScale": 0.43,
          "z": 11,
          "parent": "machine_anchor",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP4Upper",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p4_shin",
          "source": "legs",
          "rect": [
            1266,
            373,
            180,
            373
          ],
          "pivot": [
            84,
            72
          ],
          "offset": [
            27.95,
            -51.6
          ],
          "imageScale": 0.43,
          "z": 11.1,
          "parent": "p4_upper",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP4Lower",
                "factor": 1
              }
            ]
          }
        },
        {
          "id": "p4_foot",
          "source": "legs",
          "rect": [
            1215,
            775,
            289,
            177
          ],
          "pivot": [
            155,
            50
          ],
          "offset": [
            8.6,
            -113.95
          ],
          "imageScale": 0.3,
          "z": 11.2,
          "parent": "p4_shin",
          "channels": {
            "rotation": [
              {
                "channel": "raxaP4FootLevel",
                "factor": 1
              }
            ]
          }
        }
      ]
    }
  ]
};
