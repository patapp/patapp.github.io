'use strict';

  /*-------------------------+---------------------------+
  |   .----.  .--.  .---.    |  CREATED BY TEAM JJS      |
  |   | {}  }/ {} \{_   _}   +---------------------------+
  |   | .--'/  /\  \ | |     |  Joonas Kauppinen         |
  |   `-'   `-'  `-' `-'     |  "Jamie" GeonHui Yoon     |
  |   - a place for pets -   |  Samuli Virtanen          |
  +--------------------------+--------------------------*/

const logIn = async (u,p) => {
  conLog({function : 'logIn'});
  return new Promise((resolve, reject) => {
  const dataObject = {username: u, password: p};
  const j = getJSON('POST', 'session/login', '', dataObject, 0).then( (r) => {
    if ( r.success ) {
      sessionExists = true;
      sessionID = r.session_id;
      sessionToken = r.token;
      conLog('[LOGIN] Success!');
      setCookie ( 'pat_session_id', sessionID, 60 );
      setCookie ( 'pat_session_token', sessionToken, 60 );
      }
    conLog({f : 'logIn', 'finished' : 'TRUE', 'response' : 'FAILED'});
    resolve(r);
    });
  });
  }
  
const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = document.getElementById('username').value;
  const p = document.getElementById('pass').value;
  logIn(u,p).then((i) => {
    if ( i.success == 1 ) {
      // we've logged in successfully
      window.location.href = '../home/';
      }else{
      if ( i.success == 0 ) {
        alert ( i.error );
        }else{
        alert ( 'Unknown Error :/' );
        }
      }
    });
  });
