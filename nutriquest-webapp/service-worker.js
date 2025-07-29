// 2025-07-29 13:19:30: Updated file for cache busting
// キャッシュの名前を定義
const CACHE_NAME = 'nutriquest-cache-v1';
// キャッシュするファイルのリスト
const urlsToCache = [
  './',
  './index.html'
  // アプリで他にキャッシュしたいファイルがあればここに追加します
  // (例: './style.css', './app.js', './images/logo.png' など)
];

// サービスワーカーのインストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエストへの応答処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにヒットすればそれを返す
        if (response) {
          return response;
        }
        // キャッシュになければネットワークから取得
        return fetch(event.request);
      }
    )
  );
});
