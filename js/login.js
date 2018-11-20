'use strict';

const logIn = async (u,p) => {
  let response = '';
  const dataObject = {username: u, password: p};
  const j = await getJSON('POST', 'session/login', '', dataObject, 0).then( (r) => {
    if ( r.success == 1 ) {
      sessionExists = 1;
      sessionID = r.session_id;
      sessionToken = r.token;
      setCookie ( 'pat_session_id', sessionID, 60 );
      setCookie ( 'pat_session_token', sessionToken, 60 );
      }
    response = r;
    });
  return response;
  }
  
const logOut = async (u,p) => {
  if ( isSession () ) {
    let response = '';
    const j = await getJSON('POST', 'session/logout').then( (r) => {
      if ( r.success == 1 ) {
        sessionExists = 0;
        sessionID = '';
        sessionToken = ''   ;
        setCookie ( 'pat_session_id', sessionID, 60 );
        setCookie ( 'pat_session_token', sessionToken, 60 );
        }
      response = r;
      });
    return response;
  }else{
    return { success: 0 };
    }
  }