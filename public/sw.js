// public/sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('coslomart-cache').then((cache) => {
        return cache.addAll([
          '/home',
          'images/cosloapplogo.png',
          '/manifest.json',
          'https://www.coslomart.com/',
          'https://www.coslomart.com/home',
          // List critical CSS/JS assets
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });