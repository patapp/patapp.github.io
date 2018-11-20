'use strict';

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

  // REMOVE THIS IN PRODUCTION VERSION
  console.log('getJSON' + rMethod + ':' + request);
  console.log(API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ));

  console.log('fetch data obj:');
  console.log(dataObject);

  const response = await fetch( API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ), {
    method: "POST",
    body: serialize(dataObject),
    headers:
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  } );
  
  console.log('testing');
  
  const json = await response.json();
  console.log(json);
  return json;
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
      }
    response = r;
    });
  return response;
  }


if ( typeof cookieID != 'undefined' && typeof cookieToken != 'undefined' && cookieID != "" && cookieToken != "" ) {
console.log('*** SessionCheck!' + cookieID);
sessionCheck().then( (r) => {
  if ( r.success ) {
    //console.log ( r.session_exists );
    sessionPermissions = r.permissions;
    }
});
  


  
  }  
