"use strict";
// Offline support. Pages, scripts and data: network first, cached copy when offline,
// so site updates show up without bumping CACHE. Images: cache first.
const CACHE = "bg3quest-v1";
const PRECACHE = ["./", "index.html", "help.html", "style.css", "app.js", "pwa.js", "manifest.webmanifest",
  "assets/favicon.png", "assets/icon-192.png", "assets/icon-512.png", "data/quests.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  const put = res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  };
  if (req.destination === "image") {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(put)));
  } else {
    e.respondWith(fetch(req).then(put).catch(() => caches.match(req, { ignoreSearch: true })));
  }
});
