'use strict';

  /* ------------------------+-------------------------------+
  |   .----.  .--.  .---.    |  CREATED BY TEAM JJS          |
  |   | {}  }/ {} \{_   _}   +-------------------------------+
  |   | .--'/  /\  \ | |     |  Joonas Kauppinen             |
  |   `-'   `-'  `-' `-'     |  "Jamie" GeonHui Yoon         |
  |   - a place for pets -   |  Samuli Virtanen              |
  +--------------------------+-------------------------------+
  | https://github.com/joonasmkauppinen/pat-project-backend  |
  | https://github.com/joonasmkauppinen/pat-project-frontend |
  +-------------------------------------------------------- */
  
const btnLogin   = document.getElementById('button__login');
const btnSignup  = document.getElementById('button__signup');
const btnSignup2 = document.getElementById('title__signup');

// handle button events:

btnLogin.addEventListener('click', (e) => {
  // go to the login screen
  window.location.href = 'login/';
  });

btnSignup.addEventListener('click', (e) => {
  // go to the sign up page
  window.location.href = 'sign-up/';
  });

btnSignup2.addEventListener('click', (e) => {
  // go to the sign up page
  window.location.href = 'sign-up/';
  });  