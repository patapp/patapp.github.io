
// Service worker for the application

'use strict';

self.addEventListener('install', (event) => {
  console.log('Service worker INSTALLED.');

  event.waitUntil(
    caches.open('static')
    .then( (cache) => {
      cache.addAll([
        // general
        'https://fonts.googleapis.com/css?family=Dosis:400,500,700|Patrick+Hand|Roboto:400,500,700',
        './src/js/pwa.js',
        './src/js/global.js',
        './src/js/landing.js',
        './src/js/*',
        // welcome page
        './index.html',
        './src/css/landing.css',
        './src/svg/pat_main_ic.svg',
        // login page
        './src/js/login.js',
        './login/index.html',
        './src/css/styles__login.css',
        // sign up page
        './sign-up/index.html',
        './src/js/sign-up.js',
        './src/css/styles_signup.css',
        // home page
        './home/index.html',
        './src/css/nav-bars.css',
        './src/css/post-card.css',
        './src/css/tab-views.css',
        './src/js/home.js',
        './src/js/trending-feed-controller.js',
        './src/js/nav_controller.js'
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
      .catch( err => {
        console.log("cache error");
      })
  );
});
