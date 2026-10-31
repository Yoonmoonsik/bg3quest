# BG3 퀘스트 일지

발더스 게이트 3 바닐라 데이터의 일지 퀘스트를 단계·목표·마커·보상까지 조회하는 사이트입니다.

- 사이트: https://yoonmoonsik.github.io/bg3quest/
- `build_quests.py`: 언팩한 게임 데이터(`Story/Journal`의 quest·objective·questcategory 프로토타입과 Markers, `Levelmaps`의 경험치·골드 표)에서 `docs/data/quests.json`을 다시 만듭니다. 번역은 `../bg3dnd/.reference`, 지역 이름은 `../bg3dnd/.docs/data/regions.json`을 씁니다.

## 진행 기록

- 퀘스트와 단계의 완료·숨기기 표시(분기 때문에 진행할 수 없는 것은 숨기기), 숨긴 퀘스트 보기·숨기기.
- 목록에 단계 진행 수(예: 2/21 단계), 분류에 퀘스트 완료 수(예: 5/31 퀘스트). 숨긴 단계와 숨긴 퀘스트는 분모에서 뺍니다.
- 완료 단계만 보기, 숨긴 단계 보기·숨기기, 퀘스트별 단계 표시 초기화.
- 진행 내보내기(JSON)·불러오기, 마크다운 체크리스트 내보내기, 진행 초기화.
- 기록은 브라우저 `localStorage`에만 저장됩니다.
