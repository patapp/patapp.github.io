'use strict';

  /*-------------------------+---------------------------+
  |   .----.  .--.  .---.    |  CREATED BY TEAM JJS      |
  |   | {}  }/ {} \{_   _}   +---------------------------+
  |   | .--'/  /\  \ | |     |  Joonas Kauppinen         |
  |   `-'   `-'  `-' `-'     |  "Jamie" GeonHui Yoon     |
  |   - a place for pets -   |  Samuli Virtanen          |
  +--------------------------+--------------------------*/

const VIEW_PAGE = 'home';

const appIsReady = () => {

  // Hide the loading / waiting screen here, and do the tricks....
  conLog('[APP_IS_READY] Called.');

  }

const logOut = async (u,p) => {
  return new Promise((resolve, reject) => {
  if ( isSession () ) {
    let response = '';
    getJSON('POST', 'session/logout').then( (r) => {
      if ( r.success == 1 ) {
        sessionExists = 0;
        sessionID = '';
        sessionToken = ''   ;
        setCookie ( 'pat_session_id', sessionID, 60 );
        setCookie ( 'pat_session_token', sessionToken, 60 );
        }else{
        response = r;
        console.log(r);
        }
      response = r;
      resolve( response );      
      });
  }else{
    resolve ({ success: 0 });
    }
  });
  }
  
const btnLogOut = document.getElementById('btnLogOut');

btnLogOut.addEventListener('click', (e) => {
  confirmDialog ( 'Are you sure you want to log out?' ).then((res) => {
    if ( res == "ok" ) {
      // User confirmed logout, let's log out...
      logOut().then( (res) => {
        if ( res.success ) {
          // Successfully logged out
          window.location.href='../';
          console.log(res);
          }else{
          console.log('*** ERROR LOGGING OUT ***');
          console.log(res);
          }
        });
      }
  });
});