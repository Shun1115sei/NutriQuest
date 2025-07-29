// 2025-07-29 17:52:49: Updated file for cache busting
// Define the name of the cache
const CACHE_NAME = 'nutriquest-cache-v1';
// List of the files that you cache
const urlsToCache = [
  './',
  './index.html'
  // Add here if you have anything else that you desire to cache
  // (eg. './style.css', './app.js', './images/logo.png' ...)
];

// Processing the installation of service-worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Processing responses to the request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If it hits the cache, it returns it
        if (response) {
          return response;
        }
        // If not in cache, retrieved from network
        return fetch(event.request);
      }
    )
  );
});
