'use strict';

let sessionExists = 0;
let sessionID = '';
let sessionToken = '';

const getJSON = async ( rMethod , request, rParams='', sendSessionInfo=1 ) => {

  // REMOVE THIS IN PRODUCTION VERSION
  console.log(API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ));

  const response = await fetch( API_URL + request + rParams + ( sendSessionInfo && sessionExists ? ( rParams == '' ? '?' : '&' ) + 'session_id=' + sessionID + '&session_token=' + sessionToken : '' ), {
    method: "POST"
  } );
  
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
  const j = await getJSON('POST', 'session/check', '?session_id=' + cookieID + '&session_token=' + cookieToken, 0).then( (r) => {
    if ( r.success == 1 && r.session_exists == 1) {
      sessionExists = 1;
      sessionID = cookieID;
      sessionToken = cookieToken;
      //setCookie ( 'pat_session_id', cookieID, 60 );
      //setCookie ( 'pat_session_token', cookieToken, 60 );
      }
    response = r;
    });
  return response;
  }


if ( typeof cookieID != 'undefined' && typeof cookieToken != 'undefined' && cookieID != "" && cookieToken != "" ) {
console.log('Session Check!' + cookieID);
sessionCheck().then( (r) => {
  if ( r.success ) {
    console.log ( r.session_exists );
    }
});
  


  
  }  
