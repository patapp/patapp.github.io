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
 
const checkIsUsernameAvailable = (u) => {
  if ( u != "" ) {
  getJSON('GET', 'users/username-available/'+u, '', {}, 0).then( (r) => {
    if ( r.success ) {
        if ( r.available ) {
          console.log('OK: username is ok and available - replace this with code!');
          }else{
          console.log('ERROR: username is ok, but not available - replace this with code!');
          }
      }else{
        console.log('ERROR: ' + r.error ); //  - replace this with code!
      }
    });
  }else{
    console.log('ERROR: username cannot be empty!'); //  - replace this with code!
  }
};
  
const createProfile = (u,p,e) => {
  getJSON('POST', 'users/create-user-account', '', {username: u, password: p, email: e}, 0).then( (r) => {
  if ( r.success ) {
      if ( r.session ) {
        setCookie('pat_session_id', r.session_id );
        setCookie('pat_session_token', r.token );
        redirectTo('home');
      }
    }else{
      alertDialog ( r.error );
    }
  });
};
  
  
const signupForm = document.getElementById('sign-up__form');
  signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user  = document.getElementById('username');
  const email = document.getElementById('email');
  const pass  = document.getElementById('pass');
  const pass2 = document.getElementById('confirmpass');
  if ( pass.value != pass2.value ) {
    alertDialog ( 'Password and Confirm password does not match.' );
    }else{
    createProfile(user.value, pass.value, email.value);
    }
});