// UI strings. Game text comes from quests.json as [Korean, English, handle].
const I18N = {
  ko: {
    title: "BG3 퀘스트 일지", sub: "발더스 게이트 3 일지의 퀘스트·단계·목표·마커·보상 데이터", unit: "개 퀘스트",
    q: "제목·단계 내용·ID 검색 (한/영)", "f-c": "분류", "f-ac": "막", "f-v": "일지 표시", "f-rw": "보상",
    all: "전체", reset: "필터 초기화", shown: (n) => `${n}개 표시`, pick: "왼쪽 목록에서 퀘스트를 선택하세요.",
    visible: "표시", hidden: "숨김", hasXp: "경험치 있음", hasTable: "보상 테이블 있음", hasGold: "골드 있음", hasAch: "업적 연결",
    steps: "단계", objectives: "목표", rewards: "퀘스트 보상", data: "데이터", none: "(설명 없음)", noTitle: "(제목 없음)",
    parent: "상위 퀘스트", subs: "하위 퀘스트", children: "이 퀘스트를 상위로 둔 퀘스트", hiddenQ: "일지 숨김",
    showEn: "영문 함께 보기", stepId: "단계 ID", objective: "목표", dev: "개발 메모", xp: "경험치", lv: (n) => `${n}레벨`,
    gold: "추가 골드", ach: "업적", tt: "추가 트레저 테이블", owner: "보상 소유자", lo: "레벨 덮어쓰기", rep: "평판",
    rc: "보상 개수", rl: "보상 레벨", ud: "UnlockDisable", flag: "대화 플래그 GUID", stg: "StatTrigger GUID",
    titleOverride: "제목 덮어쓰기", tables: "보상 테이블", optTables: "선택 보상 테이블", tmpl: "보상 템플릿 설명",
    rewardTarget: "보상 대상(QuestRewardTarget)", sort: "정렬 우선순위", guid: "GUID", handle: "제목 핸들",
    priority: "우선순위", tech: "기술 정보", help: "도움말", markers: "마커", noMarker: "마커 정보 없음", target: "대상", radius: "반경",
    footer: "데이터: 바닐라 게임 파일(Story/Journal의 quest·objective·questcategory 프로토타입과 Markers, Levelmaps의 경험치·골드 표)에서 추출. 막은 목표 마커의 레벨로 분류했습니다.",
  },
  en: {
    title: "BG3 Quest Journal", sub: "Quests, steps, objectives, markers and rewards from the Baldur's Gate 3 journal", unit: "quests",
    q: "Search title, step text or ID", "f-c": "Category", "f-ac": "Act", "f-v": "Journal", "f-rw": "Reward",
    all: "All", reset: "Reset filters", shown: (n) => `${n} shown`, pick: "Pick a quest from the list.",
    visible: "Visible", hidden: "Hidden", hasXp: "Gives XP", hasTable: "Has reward table", hasGold: "Gives gold", hasAch: "Linked achievement",
    steps: "Steps", objectives: "Objectives", rewards: "Quest rewards", data: "Data", none: "(no text)", noTitle: "(no title)",
    parent: "Parent quest", subs: "Subquests", children: "Quests with this as parent", hiddenQ: "Hidden in journal",
    showEn: "", stepId: "Step ID", objective: "Objective", dev: "Dev comment", xp: "Experience", lv: (n) => `Lv ${n}`,
    gold: "Additional gold", ach: "Achievement", tt: "Additional treasure table", owner: "Reward owner", lo: "Level override", rep: "Reputation",
    rc: "Reward count", rl: "Reward level", ud: "UnlockDisable", flag: "Dialog flag GUID", stg: "StatTrigger GUID",
    titleOverride: "Title override", tables: "Reward tables", optTables: "Optional reward tables", tmpl: "Reward template descriptions",
    rewardTarget: "QuestRewardTarget", sort: "Sorting priority", guid: "GUID", handle: "Title handle",
    priority: "Priority", tech: "Technical info", help: "Help", markers: "Markers", noMarker: "No marker data", target: "Target", radius: "Radius",
    footer: "Data extracted from the vanilla game files (Story/Journal quest, objective and category prototypes and Markers; Levelmaps XP and gold tables). Acts come from the levels of objective markers.",
  },
};
const $ = (id) => document.getElementById(id);
const FILTERS = ["f-c", "f-ac", "f-v", "f-rw"];
let data = null, quests = [], byId = {}, current = null, withEn = false;
let ui = pickUi();
// technical rows (IDs, GUIDs, dev comments) start hidden; the choice lives only in this browser
let tech = false;
try { tech = localStorage.getItem("tech") === "1"; } catch (e) { /* storage blocked */ }

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
const txAlt = (t) => (ui === "ko" && withEn && plain(t[0]) ? plain(t[1]) : "");
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

function catOrder(a, b) {
  const ca = data.categories[a] || { sort: -1 }, cb = data.categories[b] || { sort: -1 };
  return cb.sort - ca.sort || catName(a).localeCompare(catName(b), ui);
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
  FILTERS.forEach((id, i) => ($(id).value = keep[i]));
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
    (!f["f-rw"] || REWARD[f["f-rw"]](x)));
  $("count").textContent = T("shown", shown.length);
  shown.sort((a, b) => catOrder(a.c, b.c) || qTitle(a).localeCompare(qTitle(b), ui));
  let html = "", last = null;
  shown.forEach((x) => {
    if (x.c !== last) { html += `<li class="grp">${esc(catName(x.c))}</li>`; last = x.c; }
    const meta = [...(tech ? [x.id] : []), x.steps.length + " " + T("steps")].concat(x.vis ? [] : [T("hiddenQ")]).join(" · ");
    html += `<li data-id="${esc(x.id)}" class="${current && current.id === x.id ? "on" : ""}">` +
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
  const alt = txAlt(s.d);
  const rows = [
    [T("objective"), s.ob ? `<a href="#" data-obj="${esc(s.ob)}">${code(s.ob)}</a>` : "", 1],
    [T("titleOverride"), s.to ? esc(tx(s.to)) : ""],
    [T("xp"), s.xp ? xpCell(s.xp) : ""],
    [T("gold"), s.gold ? code(Object.values(s.gold).join(" · ")) : ""],
    [T("tt"), s.tt ? code(s.tt) : ""],
    [T("owner"), s.on || s.ol ? esc([s.on, s.ol].filter(Boolean).join(" @ ")) : ""],
    [T("ach"), s.ach ? esc(s.ach) : ""],
    [T("lo"), s.lo ?? ""], [T("rep"), s.rep ?? ""], [T("rc"), s.rc ?? ""], [T("rl"), s.rl ?? ""], [T("ud"), s.ud ?? "", 1],
    [T("flag"), s.fl ? code(s.fl) : "", 1], [T("stg"), s.stg ? code(s.stg) : "", 1], [T("guid"), code(s.g), 1],
  ];
  return `<div class="step" id="step-${i}"><div class="hd"><b>${i + 1}</b><span class="tech">${code(s.id)}</span></div>` +
    `<div class="txt">${mark(tx(s.d)) || `<span class="empty">${T("none")}</span>`}</div>` +
    (alt ? `<div class="alt">${mark(alt)}</div>` : "") +
    (s.dev ? `<div class="dev tech">${T("dev")}: ${mark(s.dev)}</div>` : "") + dl(rows) + `</div>`;
}

function objHtml(o) {
  const mks = o.mk.flatMap((m) => m.at.map((a) => {
    const place = (ui === "en" ? a.ln[1] : a.ln[0] || a.ln[1]) || "";
    return `<div class="mk">📍 ${esc(tx(a.t) || m.id)} — ${esc(place)}<span class="tech"> ${code(a.lvl)} · ${esc(a.icon)} · ` +
      `${T("target")} ${esc(a.ty)} ${code(a.tg)}${a.r ? ` · ${T("radius")} ${a.r}` : ""}</span></div>`;
  }));
  const alt = txAlt(o.d);
  return `<div class="obj" id="obj-${esc(o.id)}"><div>${mark(tx(o.d)) || `<span class="empty">${T("none")}</span>`}</div>` +
    (alt ? `<div class="mk">${mark(alt)}</div>` : "") +
    `<div class="mk tech">${code(o.id)} · ${T("priority")} ${o.pr}</div>${mks.join("") || `<div class="mk">${T("noMarker")}</div>`}</div>`;
}

function show(q) {
  current = q;
  document.querySelectorAll("#list li[data-id]").forEach((li) => li.classList.toggle("on", li.dataset.id === q.id));
  const en = ui === "ko" && plain(q.t[1]) && plain(q.t[1]) !== qTitle(q) ? plain(q.t[1]) : "";
  const kids = quests.filter((x) => x.p === q.id);
  const chips = [`<span class="chip cat">${esc(catName(q.c))}</span>`]
    .concat(q.ac.map((a) => `<span class="chip">${esc(actName(a))}</span>`))
    .concat(q.vis ? [] : [`<span class="chip">${T("hiddenQ")}</span>`]);
  const rel = [
    [T("parent"), q.p ? qLink(q.p) : ""],
    [T("subs"), q.sub.map(qLink).join(" ")],
    [T("children"), kids.map((k) => qLink(k.id)).join(" ")],
  ];
  const rewards = [
    [T("tables"), q.rw.map(code).join("<br>")],
    [T("optTables"), q.rwo.map(code).join("<br>")],
    [T("tmpl"), q.rtd.map((r) => `${esc(r.n)} <span class="tech">${code(r.g)}</span>${r.l ? " @ " + esc(r.l) : ""}`).join("<br>")],
  ].filter((r) => r[1]);
  $("detail").innerHTML =
    `<h2 class="title">${esc(qTitle(q)) || T("noTitle")}</h2>` + (en ? `<p class="title-en">${esc(en)}</p>` : "") +
    `<div class="chips">${chips.join("")}</div>` + dl(rel) +
    (ui === "ko" ? `<div class="toggle"><button type="button" id="en-toggle" class="${withEn ? "on" : ""}">${T("showEn")}</button></div>` : "") +
    (rewards.length ? `<section><h3>${T("rewards")}</h3>${dl(rewards)}</section>` : "") +
    `<section><h3>${T("steps")} (${q.steps.length})</h3>${q.steps.map(stepHtml).join("")}</section>` +
    `<section><h3>${T("objectives")} (${q.obs.length})</h3>${q.obs.map(objHtml).join("")}</section>` +
    `<section class="tech"><h3>${T("data")}</h3>${dl([["QuestID", code(q.id)], ["CategoryID", code(q.c)], [T("guid"), code(q.g)],
      [T("handle"), code(q.t[2])], [T("sort"), q.sort], [T("rewardTarget"), q.rwt]])}</section>`;
  const tg = $("en-toggle");
  if (tg) tg.onclick = () => { withEn = !withEn; show(q); };
  $("detail").querySelectorAll("[data-obj]").forEach((a) => (a.onclick = (e) => {
    e.preventDefault();
    const el = document.getElementById("obj-" + a.dataset.obj);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }));
}

function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (byId[id]) { show(byId[id]); window.scrollTo(0, 0); }
  else if (!current) $("detail").innerHTML = `<p class="empty">${T("pick")}</p>`;
}

function applyUi() {
  document.documentElement.lang = ui;
  document.title = T("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = T(el.dataset.i18n)));
  document.querySelectorAll("[data-ui]").forEach((b) => b.classList.toggle("on", b.dataset.ui === ui));
  document.body.classList.toggle("notech", !tech);
  $("tech").classList.toggle("on", tech);
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
$("reset").onclick = () => { $("q").value = ""; FILTERS.forEach((id) => ($(id).value = "")); apply(); if (current) show(current); };
$("list").onclick = (e) => {
  const li = e.target.closest("li[data-id]");
  if (li) location.hash = encodeURIComponent(li.dataset.id);
};
window.addEventListener("hashchange", route);

function toggleTech() {
  tech = !tech;
  try { localStorage.setItem("tech", tech ? "1" : "0"); } catch (e) { /* storage blocked */ }
  document.body.classList.toggle("notech", !tech);
  $("tech").classList.toggle("on", tech);
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
