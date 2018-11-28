'use strict';

  /*-------------------------+---------------------------+
  |   .----.  .--.  .---.    |  CREATED BY TEAM JJS      |
  |   | {}  }/ {} \{_   _}   +---------------------------+
  |   | .--'/  /\  \ | |     |  Joonas Kauppinen         |
  |   `-'   `-'  `-' `-'     |  "Jamie" GeonHui Yoon     |
  |   - a place for pets -   |  Samuli Virtanen          |
  +--------------------------+--------------------------*/
 
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