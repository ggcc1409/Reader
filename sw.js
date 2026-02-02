const CACHE_NAME = 'reader-v14-cache';
const ASSETS = [
  './design_v14_functionality.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js',
  'https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});