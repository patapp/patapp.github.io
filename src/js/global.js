"use strict";

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

const API_URL = 'http://127.0.0.1:3114/';   // local
//const API_URL = 'https://tucloud.fi/pat/';   // public-server

const BASE_ADDR = '/pat-project-frontend/'; // if in root folder, set this to '/'

// Display all the debug messages in the console
const DEBUG_MODE = true;

/* Redirect automatically from wrong page to right page if SESSION state is wrong. 
Plase note: Does not make effect if DEBUG_MODE = false */
const AUTO_REDIRECT = true;

let sessionExists = false;
let sessionID = '';
let sessionToken = '';
let sessionPermissions = []

const conLog = ( m ) => {
  // Print debug messages to the Console, if DEBUG_MODE is ACTIVE (TRUE).
  if ( DEBUG_MODE ) {
      console.log(m);
    }
  }

const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const getJSON = async ( rMethod , request, rParams='', dataObject = {}, sendSessionInfo=1 ) => {

  return new Promise((resolve, reject) => {

    conLog({ function: 'getJSON'});
    conLog({ f: 'getJSON', method: rMethod, req: request, fullPath: API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ) });
    

    if ( sendSessionInfo ) {  
      dataObject.session_id    = sessionID;
      dataObject.session_token = sessionToken;
      }

    conLog(Object.assign({f: 'getJSON', description: 'ajax-response-data-object'}, dataObject));

    const dataParams = {
        method: rMethod,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
    
    if ( rMethod != "GET" ) {
      dataParams.body = serialize(dataObject);
      }

    const response = fetch( API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ), dataParams).then( (r) => {
        resolve(r.json());
      });
    
    conLog({ f: 'getJSON', finished: 'TRUE'});
    
    });
  
  }
  
const isSession = () => sessionExists;

const isPermission = (p) => {
  if ( isSession() ) {
    if ( sessionPermissions.indexOf(p) == -1 ) {
      return false;
      }else{
      return true;
      }
    }else{
      conLog('[isPermission] WARNING!!! You should not call this function before session exists! ');
      return false;
    }
  }

const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
  }

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
      conLog('[REDIRECT_TO] We are redirecting YOU to `' + a + '`...');
      conLog('[REDIRECT_TO] 2 seconds delay because of DEBUG_MODE');
      setTimeout( () => {
        window.location.href = BASE_ADDR + a;
        }, 2000);
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

const confirmDialog = async ( text ) => {
  return new Promise((resolve, reject) => {
    if ( confirm ( text ) ) {
      resolve('ok');
      }else{
      resolve('cancel');
      }
    });
  }
