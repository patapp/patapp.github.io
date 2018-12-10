'use strict';

// Session Check
const cookieID    = getCookie ( 'pat_session_id' );
const cookieToken = getCookie ( 'pat_session_token' );

const sessionCheck = async () => {
  let response = '';
  // We need to pass the session id + token manually, because at this point session does not exists yet.
  const j = await getJSON('POST', 'session/check', '', {session_id : cookieID, session_token : cookieToken}, 0).then( (r) => {
    if ( r.success && r.session_exists ) {
      sessionExists = true;
      sessionID = cookieID;
      sessionToken = cookieToken;
      sessionLoggedInUserID = r.user_id;
      }else{
      setCookie('pat_session_id', '');
      setCookie('pat_session_token', '');
      }
    response = r;
    });
  return response;
  }

conLog('[CHECK_SESSION] Checking session...');

const redirectTo = (a) => {

  conLog('[REDIRECT_TO] `' + a + '`');
  if ( DEBUG_MODE ) {
    if ( AUTO_REDIRECT ) {
      if ( REDIRECT_DELAY ) {
          conLog('[REDIRECT_TO] We are redirecting YOU to `' + a + '`...');
          conLog('[REDIRECT_TO] 2 seconds delay because of REDIRECT_DELAY');
          setTimeout( () => {
            window.location.href = BASE_ADDR + a;
            }, 2000);
        }else{
          window.location.href = BASE_ADDR + a;
        }
      }else{
      conLog('[REDIRECT_TO] Redirection cancelled, because AUTO_REDIRECT is set to FALSE');
      }
    }else{
    window.location.href = BASE_ADDR + a;
    }
  

  }

const autoRedirectCheck = () => {

  var href = window.location.href;
  var dir = href.substring(0, href.lastIndexOf('/')) + "/";
  const currentPathName = window.location.pathname;
  const pathSplit = currentPathName.split('/');
  conLog('[AUTO_REDIRECT_CHECK] You are currently viewing PAGE: `' + VIEW_PAGE+'`');
  conLog('[AUTO_REDIRECT_CHECK] Are you logged in? ' + (sessionExists ? 'YES' : 'NO' ) + '.');

  if ( sessionExists == 0 ) {
  
    if (VIEW_PAGE != 'login' && VIEW_PAGE != 'sign-up' && VIEW_PAGE != '' ) {
        conLog('[AUTO_REDIRECT_CHECK] You SHOULD NOT be on THIS PAGE.');
        redirectTo('');
      }else{
        conLog('[AUTO_REDIRECT_CHECK] This page is ALLOWED for You =)');
      }

  }else{

    if (VIEW_PAGE != 'home')  {
        conLog('[AUTO_REDIRECT_CHECK] You SHOULD NOT be on THIS PAGE.');
        redirectTo('home/');
      }else{
        conLog('[AUTO_REDIRECT_CHECK] This page is ALLOWED for You =)');
        appIsReady();
      }
  
  }

}

if ( typeof cookieID != 'undefined' && typeof cookieToken != 'undefined' && cookieID != "" && cookieToken != "" ) {
conLog('[CHECK_SESSION] Cookie found, calling backend to check is the session still valid...');
sessionCheck().then( (r) => {
  if ( r.success ) {
    conLog('[CHECK_SESSION] Response from BACKEND: Session is VALID.');
    sessionPermissions = r.permissions;
    }else{
    conLog('[CHECK_SESSION] Response from BACKEND: Not valid session.');
    }
    autoRedirectCheck();
});
  }else{
  conLog('[CHECK_SESSION] Cookie not found - or invalid. No session. Please Log In.');
  autoRedirectCheck();
  }