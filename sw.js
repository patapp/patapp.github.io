
// Service worker for the application

'use strict';

self.addEventListener('install', (event) => {
  console.log('Service worker INSTALLED.');

  event.waitUntil(
    caches.open('static')
    .then( (cache) => {
      cache.addAll([
        // TODO: add fonts to cache
        '/',
        '/index.html',
        '/landing.css',
        '/svg/pat_main_ic.svg',
        '/js/pwa.js',
        '/login/index.html',
        '/login/styles.css',
        '/sign-up/index.html',
        '/sign-up/styles.css',
        '/home/index.html',
        '/home/css/nav-bars.css',
        '/home/css/post-card.css',
        '/home/css/tab-views.css'
      ]);
    })
  );

});

self.addEventListener('activate', () => {
  console.log('Service worker ACTIVATED.');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then( (res) => {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});