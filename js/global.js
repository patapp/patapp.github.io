'use strict';

//const API_URL = 'http://127.0.0.1:3114/';   // local
const API_URL = 'http://82.181.20.24:3114/';   // public-server

let sessionExists = 0;
let sessionID = '';
let sessionToken = '';
let sessionPermissions = []

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

    // REMOVE THIS IN PRODUCTION VERSION
    console.log('getJSON' + rMethod + ':' + request);
    console.log(API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ));

    if ( sendSessionInfo ) {  
      dataObject.session_id    = sessionID;
      dataObject.session_token = sessionToken;
      }

    console.log('fetch data obj:');
    console.log(dataObject);

    const response = fetch( API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ), {
        method: "POST",
        body: serialize(dataObject),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then( (r) => {
        console.log('test 1234');
        resolve(r.json());
      });
    
    console.log('testing');
    
    });
  
  }
  
const isSession = () => sessionExists;


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
    if ( r.success == 1 && r.session_exists == 1) {
      sessionExists = 1;
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

var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

console.log(dir);
console.log(dir);
console.log(window.location.pathname);

console.log('*** AUTO SESSION CHECK ***');

if ( typeof cookieID != 'undefined' && typeof cookieToken != 'undefined' && cookieID != "" && cookieToken != "" ) {
console.log('*** SessionCheck!' + cookieID);
sessionCheck().then( (r) => {
  if ( r.success ) {
    sessionPermissions = r.permissions;
    }
});
  }else{
  console.log('No Session :(');
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