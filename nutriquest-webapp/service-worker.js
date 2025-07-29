// 2025-07-29 18:09:49: Updated file for cache busting
// Define the name of the cache
const CACHE_NAME = 'nutriquest-cache-v1';
// List of the files that you cache
const urlsToCache = [
  './',
  './index.html'
  // Add more assets here
  // (eg. './style.css', './app.js', './images/logo.png' ...)
];

// Install: cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback to network, fallback to offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        return fetch(event.request)
          .catch(() => {
            // Optionally, return a fallback page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
