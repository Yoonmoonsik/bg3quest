# BG3 퀘스트 일지

발더스 게이트 3 바닐라 데이터의 일지 퀘스트를 단계·목표·마커·보상까지 조회하는 사이트입니다.

- 사이트: `docs/` (GitHub Pages)
- `build_quests.py`: 언팩한 게임 데이터(`Story/Journal`의 quest·objective·questcategory 프로토타입과 Markers, `Levelmaps`의 경험치·골드 표)에서 `docs/data/quests.json`을 다시 만듭니다. 번역은 `../bg3dnd/.reference`, 지역 이름은 `../bg3dnd/.docs/data/regions.json`을 씁니다.
