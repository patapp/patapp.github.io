
// Service worker for the application

'use strict';

self.addEventListener('install', (event) => {
  console.log('Service worker INSTALLED.');

  event.waitUntil(
    caches.open('static')
    .then( (cache) => {
      cache.addAll([
        // TODO: add fonts to cache
        'index.html',
        'src/css/landing.css',
        'src/svg/pat_main_ic.svg',
        'src/js/pwa.js',
        'login/index.html',
        'src/css/styles_login.css',
        'sign-up/index.html',
        'src/css/styles_signup.css',
        'home/index.html',
        'src/css/nav-bars.css',
        'src/css/post-card.css',
        'src/css/tab-views.css'
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
