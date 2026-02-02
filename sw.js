const CACHE_NAME = 'reader-v17-cache';
const ASSETS = [
  './',
  './index.html',
  './design_v14_functionality.html',
  './manifest.json',
  './icon.svg?v=9',
  './icon/mozi_icon_180.png?v=2',
  './icon/mozi_icon_192.png?v=2',
  './icon/mozi_icon_512.png?v=2',
  './libs/jszip.min.js',
  './libs/epub.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
