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
    }
  ]
};
