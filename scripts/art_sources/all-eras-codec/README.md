# All-eras Codec portrait sources

This directory stores the uncropped OpenAI-generated source sheets used by the
character-specific Codec packs after MGS3. They are original fan-made artwork,
not extracted game files.

## Production contract

- Official Konami character pages are checked before generation.
- Identity, age, hair, costume and signature accessories are reviewed visually.
- A sheet is regenerated when it drifts into another game-era design.
- No official screenshot, logo, label, watermark or surrounding Codec UI is used.
- Every sheet contains six states in this fixed order: neutral, serious,
  warning, calm, humor, glitch.
- scripts/splitCodecPortraitSheet.py exports runtime files as 512 x 512 WebP.

## Metal Gear 2 reference set

- Konami Metal Gear 2 character archive:
  https://www.konami.com/mg/archive/mg2/chara.html
- Konami Metal Gear 2 history page:
  https://www.konami.com/mg/history/jp/ja/mg2

Runtime destination: public/portraits/msx/mg2/<character>/.

## Peace Walker reference set

- Konami Peace Walker history page:
  https://www.konami.com/mg/history/jp/ja/mgspw
- Konami Peace Walker character archive:
  https://www.konami.com/mg/archive/mgs_pw/en/character/index.html
- Konami AI Pod reference:
  https://www.konami.com/mg/archive/ssg/advice_pw/advice_mgspw_01.html

Runtime destination: public/portraits/peace_walker/<character>/.

## MGSV reference set

- Konami Ground Zeroes introduction:
  https://www.konami.com/mg/mgs5/gz/jp/introduction/index.php
- Konami The Phantom Pain story and characters:
  https://www.konami.com/mg/mgs5/tpp/jp/story/

Runtime destination: public/portraits/mgsv/<character>/.

## MGS4 reference set

- Konami MGS4 history and character page:
  https://www.konami.com/mg/history/jp/ja/mgs4
- Konami MGS4 official archive:
  https://www.konami.com/mg/archive/mgs4/jp/
- Konami Metal Gear Archive MGS4 sample:
  https://img.konami.com/mg/mc2/s/img/top/book_sample_mgs4_en.pdf

Runtime destination: public/portraits/mgs4/<character>/.

## VR Simulation reference set

- Konami Metal Gear Solid Integral VR archive:
  https://www.konami.com/mg/archive/integral/vr/index.html
- Konami HD Edition overview describing the VR Missions set:
  https://www.konami.com/mg/archive/hd/mgs/index.html

Runtime destination: public/portraits/vr_simulation/<character>/.

## Patriots AI reference set

- Konami MGS2 history page:
  https://www.konami.com/mg/history/jp/ja/mgs2
- Konami MGS2 Plant story archive:
  https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html

Runtime destination: public/portraits/patriots_ai/<character>/.
