#!/usr/bin/env python
"""Collect every vanilla BG3 journal quest with its steps, objectives, markers and rewards.

Run from anywhere:  python build_quests.py
Writes docs/data/quests.json next to this script.
"""
import glob
import json
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
BG3DND = HERE.parent / "bg3dnd"

U = r"D:/BG3/응용프로그램/bg3-modders-multitool/UnpackedData"
JOURNAL = U + "/Gustav/Mods/GustavDev/Story/Journal"
ZERO = "00000000-0000-0000-0000-000000000000"


def load_loca(path):
    out = {}
    for c in ET.parse(path).getroot().iter("content"):
        out[c.get("contentuid")] = c.text or ""
    return out


KO = load_loca(BG3DND / ".reference/bg3-original-korean.xml")
EN = load_loca(BG3DND / ".reference/bg3-original-english.xml")
REGIONS = json.loads((BG3DND / ".docs/data/regions.json").read_text(encoding="utf-8"))


def attrs(node):
    """Attribute id -> value (handle for TranslatedString). Ids are stripped: 'RewardAdditionalGold ' has a trailing space."""
    out = {}
    for a in node.findall("attribute"):
        out[a.get("id").strip()] = a.get("handle") if a.get("type") == "TranslatedString" else a.get("value")
    return out


def handle(h):
    return h if h and h.startswith("h") and "g" in h else ""


def text(h):
    h = handle(h)
    return [KO.get(h, ""), EN.get(h, ""), h]


def kids(node, child):
    """Values of <node id=child> children holding an attribute of the same id (SubQuests, QuestRewardTables, Markers)."""
    out = []
    for c in node.findall("children/node"):
        if c.get("id") == child:
            out += [a.get("value") for a in c.findall("attribute") if a.get("value")]
    return out


def guid_names(pattern, region):
    """GUID -> attributes for every row of a Levelmaps table, later packs overriding earlier ones."""
    out = {}
    for pack in ["Shared/Public/Shared", "Shared/Public/SharedDev", "Gustav/Public/Gustav", "Gustav/Public/GustavDev"]:
        for f in glob.glob(f"{U}/{pack}/Levelmaps/{pattern}"):
            for n in ET.parse(f).getroot().iter("node"):
                if n.get("id") == region:
                    a = attrs(n)
                    out[a["UUID"]] = a
    return out


XP = guid_names("ExperienceRewards.lsx", "ExperienceReward")
GOLD = guid_names("GoldValues.lsx", "GoldValue")


def xp_of(g):
    a = XP.get(g)
    if not a:
        return None
    lv = sorted((int(k[5:]), int(v)) for k, v in a.items() if k.startswith("Level") and k[5:].isdigit())
    return {"n": a.get("Name", ""), "lv": [v for _, v in lv]}


def gold_of(g):
    a = GOLD.get(g)
    return a and {k: v for k, v in a.items() if k != "UUID"}


# ---------- levels ----------
def level_name(level):
    for key in ("levels", "sublevels", "sublevelsByLevelName"):
        v = REGIONS.get(key, {}).get(level)
        if v:
            return [v.get("ko", ""), v.get("en", "")]
    return ["", ""]


def act_of(level):
    v = REGIONS.get("acts", {}).get((level or "").split("_")[0])
    return [v["ko"], v["en"]] if v else ["", ""]


# ---------- journal ----------
markers = {}
for f in glob.glob(JOURNAL + "/Markers/*.lsx"):
    for n in ET.parse(f).getroot().iter("node"):
        if n.get("id") != "Marker":
            continue
        a = attrs(n)
        markers.setdefault(a["MarkerID"], []).append({
            "t": text(a.get("DisplayText")), "lvl": a.get("MarkerLevel", ""), "ln": level_name(a.get("MarkerLevel", "")),
            "icon": a.get("MarkerIcon", ""), "ty": a.get("MarkerTargetObjectType", ""),
            "tg": a.get("MarkerTargetObjectUUID", ""), "r": int(a.get("Radius") or 0), "g": a.get("Guid", ""),
        })

objectives = {}
for n in ET.parse(JOURNAL + "/objective_prototypes.lsx").getroot().iter("node"):
    if n.get("id") != "Objective":
        continue
    a = attrs(n)
    objectives[a["ObjectiveID"]] = {
        "id": a["ObjectiveID"], "q": a.get("QuestID", ""), "d": text(a.get("Description")),
        "pr": int(a.get("Priority") or 0), "g": a.get("QuestObjectiveGuid", ""), "mk": kids(n, "Markers"),
    }

categories = {}
for n in ET.parse(JOURNAL + "/questcategory_prototypes.lsx").getroot().iter("node"):
    if n.get("id") == "QuestCategory":
        a = attrs(n)
        categories[a["CategoryID"]] = {"t": text(a.get("Description")), "sort": int(a.get("SortingPriority") or 0)}

# the hidden booster categories have no name in English and only Act 3 has one in Korean (제3장); fill the gaps in that pattern
for i in (1, 2, 3):
    t = categories.get(f"Act{i}_HiddenBoosters", {}).get("t")
    if t:
        if not t[0]:
            t[0] = f"제{i}장"
        if not t[1] or t[1].startswith("%%%"):
            t[1] = f"Chapter {i}"

quests = []
for n in ET.parse(JOURNAL + "/quest_prototypes.lsx").getroot().iter("node"):
    if n.get("id") != "Quest":
        continue
    a = attrs(n)
    steps = []
    for s in n.findall("children/node"):
        if s.get("id") != "QuestStep":
            continue
        b = attrs(s)
        st = {"id": b.get("ID", ""), "d": text(b.get("Description")), "dev": b.get("DevComment", ""),
              "ob": b.get("Objective", ""), "g": b.get("QuestStepGuid", "")}
        to = text(b.get("QuestTitleOverride"))
        if to[2]:
            st["to"] = to
        if b.get("DialogFlagGUID") not in (None, "", ZERO):
            st["fl"] = b["DialogFlagGUID"]
        for key, src, fn in (("xp", "ExperienceReward", xp_of), ("gold", "RewardAdditionalGold", gold_of)):
            g = b.get(src)
            if g and g != ZERO:
                st[key] = fn(g) or {"n": g}
        for key, src in (("ach", "Achievement"), ("tt", "RewardAdditionalTreasureTable"),
                         ("on", "RewardAdditionalOwnerName"), ("ol", "RewardAdditionalOwnerLevelName")):
            if b.get(src):
                st[key] = b[src]
        for key, src in (("lo", "LevelOverride"), ("rep", "ReputationGain"), ("rc", "QuestRewardCount"),
                         ("rl", "QuestRewardLevel"), ("ud", "UnlockDisable")):
            if int(b.get(src) or 0):
                st[key] = int(b[src])
        if b.get("StatTriggerGUID") not in (None, "", ZERO):
            st["stg"] = b["StatTriggerGUID"]
        steps.append(st)
    rtd = []
    for c in n.iter("node"):
        if c.get("id") == "RewardTemplateDescription":
            d = attrs(c)
            rtd.append({"n": d.get("RewardTemplateDescriptionName", ""), "g": d.get("RewardTemplateDescriptionGUID", ""),
                        "l": d.get("RewardTemplateDescriptionLevelName", ""),
                        "rt": (d.get("RewardTemplateDescriptionIsRootTemplate") or "").lower() == "true"})
    obs = sorted((o for o in objectives.values() if o["q"] == a["QuestID"]), key=lambda o: -o["pr"])
    for o in obs:
        o["mk"] = [{"id": m, "at": markers.get(m, [])} for m in o["mk"]]
    lvls = [m["lvl"] for o in obs for mk in o["mk"] for m in mk["at"]]
    acts = []
    for lv in lvls:
        ac = act_of(lv)
        if ac[0] and ac not in acts:
            acts.append(ac)
    quests.append({
        "id": a["QuestID"], "g": a.get("QuestGuid", ""), "c": a.get("CategoryID", ""), "p": a.get("ParentQuestID", ""),
        "t": text(a.get("QuestTitle")), "vis": (a.get("QuestVisiblity") or "").lower() == "true", "sort": int(a.get("SortingPriority") or 0),
        "rwt": int(a.get("QuestRewardTarget") or 0), "sub": kids(n, "SubQuests"),
        "rw": kids(n, "QuestRewardTables"), "rwo": kids(n, "QuestRewardOptionalTables"), "rtd": rtd,
        "ac": acts, "steps": steps, "obs": obs,
    })

# objectives whose QuestID matches no quest are kept so nothing in the file is dropped
qids = {q["id"] for q in quests}
orphans = [o for o in objectives.values() if o["q"] not in qids]
for o in orphans:
    o["mk"] = [{"id": m, "at": markers.get(m, [])} if isinstance(m, str) else m for m in o["mk"]]

out = {"categories": categories, "quests": quests, "orphanObjectives": orphans}
dst = HERE / "docs/data/quests.json"
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

used = {m["id"] for o in objectives.values() for m in o["mk"]}
print(f"quests {len(quests)}, steps {sum(len(q['steps']) for q in quests)}, objectives {len(objectives)} "
      f"(orphans {len(orphans)}), markers {len(markers)} ids, objective marker refs unresolved "
      f"{len([m for m in used if m not in markers])}")
print("no KO title:", sum(1 for q in quests if not q["t"][0]), "no EN title:", sum(1 for q in quests if not q["t"][1]))
print("categories:", Counter(q["c"] for q in quests).most_common())
print(f"-> {dst} ({dst.stat().st_size // 1024} KB)")
