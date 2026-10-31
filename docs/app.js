// UI strings. Game text comes from quests.json as [Korean, English, handle].
const I18N = {
  ko: {
    site_book: "BG3 책 열람실", site_dnd: "5.5e 모드 데이터 검색",
    title: "BG3 퀘스트 일지", sub: "발더스 게이트 3 일지의 퀘스트·단계·목표·마커·보상 데이터", unit: "개 퀘스트",
    q: "제목·단계 내용·ID 검색 (한/영)", "f-c": "분류", "f-ac": "막", "f-v": "일지 표시", "f-rw": "보상",
    all: "전체", reset: "필터 초기화", shown: (n) => `${n}개 표시`, pick: "왼쪽 목록에서 퀘스트를 선택하세요.",
    visible: "표시", hidden: "숨김", hasXp: "경험치 있음", hasTable: "보상 테이블 있음", hasGold: "골드 있음", hasAch: "도전 과제 연결",
    steps: "단계", objectives: "목표", rewards: "퀘스트 보상", data: "데이터", none: "(설명 없음)", noTitle: "(제목 없음)",
    related: "관련 퀘스트", hiddenQ: "일지 숨김",
    stepId: "단계 ID", objective: "목표", dev: "개발 메모", xp: "경험치", lv: (n) => `${n}레벨`,
    gold: "추가 골드", ach: "도전 과제", tt: "추가 트레저 테이블", owner: "보상 소유자", lo: "레벨 덮어쓰기", rep: "평판",
    rc: "보상 개수", rl: "보상 레벨", ud: "UnlockDisable", flag: "대화 플래그 GUID", stg: "StatTrigger GUID",
    titleOverride: "제목 덮어쓰기", tables: "보상 테이블", optTables: "선택 보상 테이블", tmpl: "보상 템플릿 설명",
    rewardTarget: "보상 대상(QuestRewardTarget)", sort: "정렬 우선순위", guid: "GUID", handle: "제목 핸들",
    priority: "우선순위", techShow: "기술 정보 표시", techHide: "기술 정보 숨기기", help: "도움말", markers: "마커", noMarker: "마커 정보 없음", target: "대상", radius: "반경",
    "f-st": "진행", done: "완료", hid: "숨김", unmarked: "표시 안 함", markDone: "퀘스트 완료", markHide: "퀘스트 숨기기",
    showHid: "숨긴 퀘스트 보기", hideHid: "숨긴 퀘스트 숨기기", stepDone: "단계 완료", stepHide: "단계 숨기기",
    doneOnly: "완료 단계만 보기", allSteps: "모든 단계 보기", showHidSteps: "숨긴 단계 보기", hideHidSteps: "숨긴 단계 숨기기",
    stepProg: (d, n) => `${d}/${n} 단계`, catProg: (d, n) => `${d}/${n} 퀘스트`, stepSum: (d, n, h) => `완료 ${d}/${n}` + (h ? ` · 숨김 ${h}` : ""),
    clearSteps: "단계 완료·숨기기 초기화", clearStepsAsk: (n) => `이 퀘스트의 단계 표시 ${n}개를 지울까요?`, export: "진행 내보내기", exportMd: "마크다운 내보내기", mdTitle: "BG3 퀘스트 진행", mdHidden: "숨김", resetMarks: "진행 초기화", import: "진행 불러오기", importBad: "진행 파일을 읽을 수 없습니다.",
    importAsk: (n) => `${n}개 표시를 불러옵니다. 지금 표시는 모두 바뀝니다. 계속할까요?`, resetAsk: (n) => `완료·숨김 표시 ${n}개를 모두 지울까요?`,
    footer: "데이터: 바닐라 게임 파일(Story/Journal의 quest·objective·questcategory 프로토타입과 Markers, Levelmaps의 경험치·골드 표)에서 추출. 막은 목표 마커의 레벨로 분류했습니다.",
  },
  en: {
    site_book: "BG3 Book Library", site_dnd: "5.5e mod data browser",
    title: "BG3 Quest Journal", sub: "Quests, steps, objectives, markers and rewards from the Baldur's Gate 3 journal", unit: "quests",
    q: "Search title, step text or ID", "f-c": "Category", "f-ac": "Act", "f-v": "Journal", "f-rw": "Reward",
    all: "All", reset: "Reset filters", shown: (n) => `${n} shown`, pick: "Pick a quest from the list.",
    visible: "Visible", hidden: "Hidden", hasXp: "Gives XP", hasTable: "Has reward table", hasGold: "Gives gold", hasAch: "Linked achievement",
    steps: "Steps", objectives: "Objectives", rewards: "Quest rewards", data: "Data", none: "(no text)", noTitle: "(no title)",
    related: "Related quests", hiddenQ: "Hidden in journal",
    stepId: "Step ID", objective: "Objective", dev: "Dev comment", xp: "Experience", lv: (n) => `Lv ${n}`,
    gold: "Additional gold", ach: "Achievement", tt: "Additional treasure table", owner: "Reward owner", lo: "Level override", rep: "Reputation",
    rc: "Reward count", rl: "Reward level", ud: "UnlockDisable", flag: "Dialog flag GUID", stg: "StatTrigger GUID",
    titleOverride: "Title override", tables: "Reward tables", optTables: "Optional reward tables", tmpl: "Reward template descriptions",
    rewardTarget: "QuestRewardTarget", sort: "Sorting priority", guid: "GUID", handle: "Title handle",
    priority: "Priority", techShow: "Show technical info", techHide: "Hide technical info", help: "Help", markers: "Markers", noMarker: "No marker data", target: "Target", radius: "Radius",
    "f-st": "Progress", done: "Completed", hid: "Hidden", unmarked: "Unmarked", markDone: "Complete quest", markHide: "Hide quest",
    showHid: "Show hidden quests", hideHid: "Hide hidden quests", stepDone: "Complete step", stepHide: "Hide step",
    doneOnly: "Show completed steps only", allSteps: "Show all steps", showHidSteps: "Show hidden steps", hideHidSteps: "Hide hidden steps",
    stepProg: (d, n) => `${d}/${n} steps`, catProg: (d, n) => `${d}/${n} quests`, stepSum: (d, n, h) => `completed ${d}/${n}` + (h ? ` · hidden ${h}` : ""),
    clearSteps: "Clear step marks", clearStepsAsk: (n) => `Clear ${n} step marks in this quest?`, export: "Export progress", exportMd: "Export Markdown", mdTitle: "BG3 quest progress", mdHidden: "hidden", resetMarks: "Reset progress", import: "Import progress", importBad: "Could not read the progress file.",
    importAsk: (n) => `Import ${n} marks? This replaces all current marks.`, resetAsk: (n) => `Clear all ${n} completed/hidden marks?`,
    footer: "Data extracted from the vanilla game files (Story/Journal quest, objective and category prototypes and Markers; Levelmaps XP and gold tables). Acts come from the levels of objective markers.",
  },
};
const $ = (id) => document.getElementById(id);
const FILTERS = ["f-c", "f-ac", "f-v", "f-rw", "f-st"];
// starting value of each filter, also restored by "Reset filters"; journal-hidden quests start filtered out
const FILTER_DEFAULT = { "f-v": "1" };
let filled = false;
let data = null, quests = [], byId = {}, current = null;
let ui = pickUi();
// technical rows (IDs, GUIDs, dev comments) start hidden; the choice lives only in this browser
let tech = false;
try { tech = localStorage.getItem("tech") === "1"; } catch (e) { /* storage blocked */ }
// marks saved in this browser: "done" | "hide" per quest ID, and per step as "questID::stepID".
// "hide" is for quests and steps a playthrough's branch never reaches.
let marks = {};
try { marks = JSON.parse(localStorage.getItem("marks")) || {}; } catch (e) { /* storage blocked or bad JSON */ }
// step view toggles: hidden steps stay out of view until hidSteps is on; doneOnly shows only completed steps
let hidSteps = false, doneOnly = false;
try { hidSteps = localStorage.getItem("hidSteps") === "1"; doneOnly = localStorage.getItem("doneOnly") === "1"; } catch (e) { /* storage blocked */ }
// category groups start collapsed; the ones opened are saved in this browser
let opened = new Set();
try { opened = new Set(JSON.parse(localStorage.getItem("opened")) || []); } catch (e) { /* storage blocked or bad JSON */ }
// hidden quests stay out of the list until this is on
let showHid = false;
try { showHid = localStorage.getItem("showHid") === "1"; } catch (e) { /* storage blocked */ }
function saveOpened() {
  try { localStorage.setItem("opened", JSON.stringify([...opened])); } catch (e) { /* storage blocked */ }
}
// step progress of a quest; hidden steps count toward neither side
function stepCount(q) {
  let done = 0, hid = 0;
  q.steps.forEach((s) => { const m = marks[q.id + "::" + s.id]; if (m === "done") done++; else if (m === "hide") hid++; });
  return { done, hid, total: q.steps.length - hid };
}
function saveMarks() {
  try { localStorage.setItem("marks", JSON.stringify(marks)); } catch (e) { /* storage blocked */ }
}

function pickUi() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "ko" || q === "en") return q;
  try { const s = localStorage.getItem("ui"); if (s === "ko" || s === "en") return s; } catch (e) { /* storage blocked */ }
  return (navigator.language || "").toLowerCase().startsWith("ko") ? "ko" : "en";
}
const T = (k, ...a) => (typeof I18N[ui][k] === "function" ? I18N[ui][k](...a) : I18N[ui][k]);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const clean = (s) => (s && !s.startsWith("%%%") ? s : "");
// game text: keep <br>, <b>, <i>; drop LSTag and other markup but keep its inner text
const plain = (s) => clean(s).replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
const tx = (t) => (ui === "en" ? plain(t[1]) : plain(t[0]) || plain(t[1]));
const qTitle = (q) => tx(q.t) || q.id;
const catName = (c) => (data.categories[c] && tx(data.categories[c].t)) || c;
const actName = (a) => (ui === "en" ? a[1] : a[0]);
const ACT_ORDER = ["프롤로그", "1막", "2막", "3막", "엔딩", "에필로그"];
let hl = null;
const mark = (s) => (hl ? esc(s).replace(hl, (m) => `<mark>${m}</mark>`) : esc(s));

function haystack(q) {
  const parts = [q.id, q.t[0], q.t[1]];
  q.steps.forEach((s) => parts.push(s.id, s.d[0], s.d[1], s.dev, s.ob));
  q.obs.forEach((o) => parts.push(o.id, o.d[0], o.d[1]));
  return parts.join("\n").toLowerCase();
}

// categories in a fixed order; any category not listed goes last, by name
const CAT_ORDER = ["MainQuest", "PersonalStory", "Tutorial", "Act1_HiddenBoosters", "Crashside", "Grove", "Underdark", "Creche",
  "Act2_HiddenBoosters", "Shadowcurse", "Act3_HiddenBoosters", "BaldursGate", "Companions", "CompletedQuests"];
const catRank = (c) => (CAT_ORDER.includes(c) ? CAT_ORDER.indexOf(c) : CAT_ORDER.length);
function catOrder(a, b) {
  return catRank(a) - catRank(b) || catName(a).localeCompare(catName(b), ui);
}
// quests in a category follow SortingPriority ascending, then name in the UI language
function questOrder(a, b) {
  return catOrder(a.c, b.c) || a.sort - b.sort || qTitle(a).localeCompare(qTitle(b), ui);
}

function fillFilters() {
  const keep = FILTERS.map((id) => $(id).value);
  const cats = {}, acts = {};
  quests.forEach((q) => {
    cats[q.c] = (cats[q.c] || 0) + 1;
    q.ac.forEach((a) => (acts[a[0]] = acts[a[0]] || [a, 0])[1]++);
  });
  const opt = (v, l, n) => `<option value="${esc(v)}">${esc(l)}${n == null ? "" : ` (${n})`}</option>`;
  const all = `<option value="">${T("all")}</option>`;
  $("f-c").innerHTML = all + Object.keys(cats).sort(catOrder).map((c) => opt(c, catName(c), cats[c])).join("");
  $("f-ac").innerHTML = all + Object.keys(acts).sort((a, b) => ACT_ORDER.indexOf(a) - ACT_ORDER.indexOf(b))
    .map((k) => opt(k, actName(acts[k][0]), acts[k][1])).join("");
  $("f-v").innerHTML = all + opt("1", T("visible")) + opt("0", T("hidden"));
  $("f-rw").innerHTML = all + ["xp", "table", "gold", "ach"].map((k) => opt(k, T("has" + k[0].toUpperCase() + k.slice(1)))).join("");
  const st = { done: 0, hide: 0 };
  quests.forEach((q) => marks[q.id] && st[marks[q.id]]++);
  $("f-st").innerHTML = all + opt("done", T("done"), st.done) + opt("hide", T("hid"), st.hide) +
    opt("none", T("unmarked"), quests.length - st.done - st.hide);
  FILTERS.forEach((id, i) => ($(id).value = filled ? keep[i] : FILTER_DEFAULT[id] || ""));
  filled = true;
}

const REWARD = {
  xp: (q) => q.steps.some((s) => s.xp), table: (q) => q.rw.length || q.rwo.length || q.steps.some((s) => s.tt),
  gold: (q) => q.steps.some((s) => s.gold), ach: (q) => q.steps.some((s) => s.ach),
};

function apply() {
  const raw = $("q").value.trim(), q = raw.toLowerCase();
  hl = raw ? new RegExp(raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi") : null;
  const f = Object.fromEntries(FILTERS.map((id) => [id, $(id).value]));
  const shown = quests.filter((x) => (!q || x._h.includes(q)) && (!f["f-c"] || x.c === f["f-c"]) &&
    (!f["f-ac"] || x.ac.some((a) => a[0] === f["f-ac"])) && (!f["f-v"] || x.vis === (f["f-v"] === "1")) &&
    (!f["f-rw"] || REWARD[f["f-rw"]](x)) && (!f["f-st"] || (marks[x.id] || "none") === f["f-st"]) &&
    (showHid || f["f-st"] === "hide" || marks[x.id] !== "hide"));
  $("count").textContent = T("shown", shown.length);
  shown.sort(questOrder);
  const per = {}, perDone = {};
  // hidden quests count toward neither side
  shown.forEach((x) => {
    per[x.c] = per[x.c] || 0;
    if (marks[x.id] !== "hide") per[x.c]++;
    if (marks[x.id] === "done") perDone[x.c] = (perDone[x.c] || 0) + 1;
  });
  let html = "", last = null;
  shown.forEach((x) => {
    // a search opens every group that has a hit, without changing the saved state
    const shut = !raw && !opened.has(x.c);
    if (x.c !== last) {
      html += `<li class="grp${shut ? " shut" : ""}" data-grp="${esc(x.c)}">${esc(catName(x.c))} <span>(${esc(T("catProg", perDone[x.c] || 0, per[x.c]))})</span></li>`;
      last = x.c;
    }
    if (shut) return;
    const meta = [...(tech ? [x.id] : []), (({ done, total }) => T("stepProg", done, total))(stepCount(x))].concat(x.vis ? [] : [T("hiddenQ")]).join(" · ");
    const cls = [current && current.id === x.id ? "on" : "", marks[x.id] || ""].join(" ").trim();
    html += `<li data-id="${esc(x.id)}" class="${cls}">` +
      `<span class="t">${mark(qTitle(x))}</span><span class="m">${esc(meta)}</span></li>`;
  });
  $("list").innerHTML = html;
}

const qLink = (id) => `<a class="chip" href="#${encodeURIComponent(id)}">${esc(byId[id] ? qTitle(byId[id]) : id)}</a>`;
// a third element marks a row as technical (hidden unless the technical toggle is on)
const dl = (rows) => `<dl>${rows.filter((r) => r[1] !== "" && r[1] != null)
  .map(([k, v, t]) => `<dt${t ? ' class="tech"' : ""}>${esc(k)}</dt><dd${t ? ' class="tech"' : ""}>${v}</dd>`).join("")}</dl>`;
const code = (s) => `<code>${esc(s)}</code>`;

function xpCell(x) {
  if (!x.lv) return code(x.n);
  return `${esc(x.n)}<br><span class="m">${x.lv.map((v, i) => `${T("lv", i + 1)} ${v}`).join(" · ")}</span>`;
}

function stepHtml(s, i) {
  const rows = [
    [T("objective"), s.ob ? `<a href="#" data-obj="${esc(s.ob)}">${code(s.ob)}</a>` : "", 1],
    [T("titleOverride"), s.to ? esc(tx(s.to)) : ""],
    [T("xp"), s.xp ? xpCell(s.xp) : "", 1],
    [T("gold"), s.gold ? code(Object.values(s.gold).join(" · ")) : ""],
    [T("tt"), s.tt ? code(s.tt) : ""],
    [T("owner"), s.on || s.ol ? esc([s.on, s.ol].filter(Boolean).join(" @ ")) : ""],
    [T("ach"), s.ach ? esc(s.ach) : ""],
    [T("lo"), s.lo ?? ""], [T("rep"), s.rep ?? ""], [T("rc"), s.rc ?? ""], [T("rl"), s.rl ?? ""], [T("ud"), s.ud ?? "", 1],
    [T("flag"), s.fl ? code(s.fl) : "", 1], [T("stg"), s.stg ? code(s.stg) : "", 1], [T("guid"), code(s.g), 1],
  ];
  const key = current.id + "::" + s.id, m = marks[key] || "";
  if ((m === "hide" && !hidSteps) || (doneOnly && m !== "done")) return "";
  const btns = [["done", "stepDone"], ["hide", "stepHide"]].map(([k, l]) =>
    `<button type="button" data-smark="${esc(s.id)}" data-k="${k}" class="${k}${m === k ? " on" : ""}">${T(l)}</button>`).join("");
  return `<div class="step${m ? " " + m : ""}" id="step-${i}"><div class="hd"><b>${i + 1}</b><span class="tech">${code(s.id)}</span>` +
    `<span class="toggle marks">${btns}</span></div>` +
    `<div class="txt">${mark(tx(s.d)) || `<span class="empty">${T("none")}</span>`}</div>` +
    (s.dev ? `<div class="dev tech">${T("dev")}: ${mark(s.dev)}</div>` : "") + dl(rows) + `</div>`;
}

function objHtml(o) {
  const mks = o.mk.flatMap((m) => m.at.map((a) => {
    const place = (ui === "en" ? a.ln[1] : a.ln[0] || a.ln[1]) || "";
    return `<div class="mk">📍 ${esc(tx(a.t) || m.id)} — ${esc(place)}<span class="tech"> ${code(a.lvl)} · ${esc(a.icon)} · ` +
      `${T("target")} ${esc(a.ty)} ${code(a.tg)}${a.r ? ` · ${T("radius")} ${a.r}` : ""}</span></div>`;
  }));
  return `<div class="obj" id="obj-${esc(o.id)}"><div>${mark(tx(o.d)) || `<span class="empty">${T("none")}</span>`}</div>` +
    `<div class="mk tech">${code(o.id)} · ${T("priority")} ${o.pr}</div>${mks.join("") || `<div class="mk">${T("noMarker")}</div>`}</div>`;
}

function show(q) {
  current = q;
  document.querySelectorAll("#list li[data-id]").forEach((li) => li.classList.toggle("on", li.dataset.id === q.id));
  const chips = [`<span class="chip cat">${esc(catName(q.c))}</span>`]
    .concat(q.ac.map((a) => `<span class="chip">${esc(actName(a))}</span>`))
    .concat(q.vis ? [] : [`<span class="chip">${T("hiddenQ")}</span>`]);
  // parent, subquests and quests naming this one as parent, merged without duplicates
  const related = [...new Set([...(q.p ? [q.p] : []), ...q.sub, ...quests.filter((x) => x.p === q.id).map((x) => x.id)])];
  const rel = [
    [T("related"), related.map(qLink).join(" ")],
  ];
  const rewards = [
    [T("tables"), q.rw.map(code).join("<br>")],
    [T("optTables"), q.rwo.map(code).join("<br>")],
    [T("tmpl"), q.rtd.map((r) => `${esc(r.n)} <span class="tech">${code(r.g)}</span>${r.l ? " @ " + esc(r.l) : ""}`).join("<br>")],
  ].filter((r) => r[1]);
  $("detail").innerHTML =
    `<h2 class="title">${esc(qTitle(q)) || T("noTitle")}</h2>` +
    `<div class="chips">${chips.join("")}</div>` +
    `<div class="toggle marks">${[["done", "markDone"], ["hide", "markHide"]].map(([k, l]) =>
      `<button type="button" data-qmark="${k}" class="${k}${marks[q.id] === k ? " on" : ""}">${T(l)}</button>`).join("")}</div>` +
    dl(rel) +
    (rewards.length ? `<section><h3>${T("rewards")}</h3>${dl(rewards)}</section>` : "") +
    `<section><h3>${T("steps")} (${q.steps.length}) <span class="prog">${esc((({ done, total, hid }) => T("stepSum", done, total, hid))(stepCount(q)))}</span></h3>` +
    `<div class="toggle"><button type="button" data-sv="doneOnly" class="${doneOnly ? "on" : ""}">${T(doneOnly ? "allSteps" : "doneOnly")}</button>` +
    `<button type="button" data-sv="hidSteps" class="${hidSteps ? "on" : ""}"${doneOnly ? " disabled" : ""}>${T(hidSteps ? "hideHidSteps" : "showHidSteps")}</button>` +
    `<button type="button" id="clear-steps">${T("clearSteps")}</button></div>` +
    `${q.steps.map(stepHtml).join("")}</section>` +
    `<section><h3>${T("objectives")} (${q.obs.length})</h3>${q.obs.map(objHtml).join("")}</section>` +
    `<section class="tech"><h3>${T("data")}</h3>${dl([["QuestID", code(q.id)], ["CategoryID", code(q.c)], [T("guid"), code(q.g)],
      [T("handle"), code(q.t[2])], [T("sort"), q.sort], [T("rewardTarget"), q.rwt]])}</section>`;
  $("detail").querySelectorAll("[data-qmark]").forEach((b) => (b.onclick = () => setQuestMark(q, b.dataset.qmark)));
  $("clear-steps").onclick = () => clearSteps(q);
  $("detail").querySelectorAll("[data-smark]").forEach((b) => (b.onclick = () => {
    const key = q.id + "::" + b.dataset.smark;
    if (marks[key] === b.dataset.k) delete marks[key];
    else marks[key] = b.dataset.k;
    saveMarks();
    apply();
    show(q);
  }));
  $("detail").querySelectorAll("[data-sv]").forEach((b) => (b.onclick = () => {
    const k = b.dataset.sv;
    if (k === "doneOnly") doneOnly = !doneOnly; else hidSteps = !hidSteps;
    try { localStorage.setItem(k, (k === "doneOnly" ? doneOnly : hidSteps) ? "1" : "0"); } catch (e) { /* storage blocked */ }
    show(q);
  }));
  $("detail").querySelectorAll("[data-obj]").forEach((a) => (a.onclick = (e) => {
    e.preventDefault();
    const el = document.getElementById("obj-" + a.dataset.obj);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }));
}

// clicking the active mark again clears it
function setQuestMark(q, k) {
  if (marks[q.id] === k) delete marks[q.id];
  else marks[q.id] = k;
  saveMarks();
  fillFilters();
  apply();
  show(q);
}

function download(text, type, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function exportMarks() {
  const out = Object.entries(marks).map(([id, st]) => ({ id, status: st, title: byId[id.split("::")[0]] ? qTitle(byId[id.split("::")[0]]) : "" }));
  download(JSON.stringify({ exported: new Date().toISOString(), marks: out }, null, 2), "application/json", "bg3quest-progress.json");
}

// every quest with a quest or step mark, grouped by category; steps as a checklist, hidden steps struck through
function exportMd() {
  const ids = new Set(Object.keys(marks).map((k) => k.split("::")[0]).filter((id) => byId[id]));
  const qs = [...ids].map((id) => byId[id]).sort(questOrder);
  const one = (t) => t.replace(/\s*\n+\s*/g, " ").trim();
  const lines = [`# ${T("mdTitle")}`, "", new Date().toLocaleString(ui)];
  let last = null;
  qs.forEach((q) => {
    if (q.c !== last) { lines.push("", `## ${catName(q.c)}`); last = q.c; }
    lines.push("", marks[q.id] === "hide" ? `### ~~${qTitle(q)}~~ (${T("mdHidden")})` : `### ${marks[q.id] === "done" ? "✔ " : ""}${qTitle(q)}`, "");
    q.steps.forEach((st, i) => {
      const m = marks[q.id + "::" + st.id], text = one(tx(st.d)) || T("none");
      lines.push(m === "hide" ? `- [ ] ~~${i + 1}. ${text}~~ (${T("mdHidden")})` : `- [${m === "done" ? "x" : " "}] ${i + 1}. ${text}`);
    });
  });
  download(lines.join("\n") + "\n", "text/markdown", "bg3quest-progress.md");
}

// reads a file made by exportMarks and replaces the current marks
function importMarks(file) {
  file.text().then((txt) => {
    const list = JSON.parse(txt).marks;
    if (!Array.isArray(list)) throw new Error("no marks");
    const next = {};
    list.forEach((m) => { if (m && typeof m.id === "string" && (m.status === "done" || m.status === "hide")) next[m.id] = m.status; });
    if (!confirm(T("importAsk", Object.keys(next).length))) return;
    marks = next;
    saveMarks();
    fillFilters();
    apply();
    if (current) show(current);
  }).catch(() => alert(T("importBad")));
}

function clearSteps(q) {
  const keys = Object.keys(marks).filter((k) => k.startsWith(q.id + "::"));
  if (!keys.length || !confirm(T("clearStepsAsk", keys.length))) return;
  keys.forEach((k) => delete marks[k]);
  saveMarks();
  apply();
  show(q);
}

function resetMarks() {
  const n = Object.keys(marks).length;
  if (!n || !confirm(T("resetAsk", n))) return;
  marks = {};
  saveMarks();
  fillFilters();
  apply();
  if (current) show(current);
}

function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (byId[id]) {
    // open the quest's group so the list shows the quest being read
    if (!opened.has(byId[id].c)) { opened.add(byId[id].c); saveOpened(); }
    show(byId[id]);
    apply();
    window.scrollTo(0, 0);
  }
  else if (!current) $("detail").innerHTML = `<p class="empty">${T("pick")}</p>`;
}

function applyUi() {
  document.documentElement.lang = ui;
  document.title = T("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = T(el.dataset.i18n)));
  document.querySelectorAll("[data-ui]").forEach((b) => b.classList.toggle("on", b.dataset.ui === ui));
  showTech();
  showHidBtn();
  $("help").href = "help.html?lang=" + ui;
  $("q").placeholder = T("q");
  if (!data) return;
  $("total").textContent = `· ${quests.length.toLocaleString()} ${T("unit")}`;
  fillFilters();
  apply();
  current ? show(current) : route();
}

document.querySelectorAll("[data-ui]").forEach((b) => (b.onclick = () => {
  ui = b.dataset.ui;
  try { localStorage.setItem("ui", ui); } catch (e) { /* storage blocked */ }
  applyUi();
}));
$("q").oninput = () => { apply(); if (current) show(current); };
FILTERS.forEach((id) => ($(id).onchange = apply));
$("reset").onclick = () => { $("q").value = ""; FILTERS.forEach((id) => ($(id).value = FILTER_DEFAULT[id] || "")); apply(); if (current) show(current); };
$("export").onclick = exportMarks;
$("export-md").onclick = exportMd;
$("reset-marks").onclick = resetMarks;
function showHidBtn() {
  $("show-hid").classList.toggle("on", showHid);
  $("show-hid").textContent = T(showHid ? "hideHid" : "showHid");
}
$("show-hid").onclick = () => {
  showHid = !showHid;
  try { localStorage.setItem("showHid", showHid ? "1" : "0"); } catch (e) { /* storage blocked */ }
  showHidBtn();
  if (data) apply();
};
$("import").onclick = () => $("import-file").click();
$("import-file").onchange = (e) => { const f = e.target.files[0]; e.target.value = ""; if (f) importMarks(f); };
$("list").onclick = (e) => {
  const g = e.target.closest("li[data-grp]");
  if (g) {
    opened.has(g.dataset.grp) ? opened.delete(g.dataset.grp) : opened.add(g.dataset.grp);
    saveOpened();
    apply();
    return;
  }
  const li = e.target.closest("li[data-id]");
  if (li) location.hash = encodeURIComponent(li.dataset.id);
};
window.addEventListener("hashchange", route);

// the button names what a click does: show while hidden, hide while shown
function showTech() {
  document.body.classList.toggle("notech", !tech);
  $("tech").classList.toggle("on", tech);
  $("tech").textContent = T(tech ? "techHide" : "techShow");
}
function toggleTech() {
  tech = !tech;
  try { localStorage.setItem("tech", tech ? "1" : "0"); } catch (e) { /* storage blocked */ }
  showTech();
  if (data) apply();
}
$("tech").onclick = toggleTech;
addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || (e.target instanceof Element && e.target.closest("input, select, textarea"))) return;
  if (e.code === "KeyT") { e.preventDefault(); toggleTech(); } // physical key, so t, T, ㅅ and ㅆ all count
});

applyUi();
fetch("data/quests.json").then((r) => r.json()).then((d) => {
  data = d;
  quests = d.quests;
  quests.forEach((q) => { byId[q.id] = q; q._h = haystack(q); });
  applyUi();
  route();
});
