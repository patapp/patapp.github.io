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

const deletePost = (id) => {
  getJSON('DELETE', 'posts/' + id, '').then( (r) => {
    if ( r.success ) {
      alert ( 'Delete post succeeded !' );
      }else{
      alert ( 'Error: ' + r.error );
      }
  });
};



// const homeTab = document.getElementById('home-tab');
// const homeLoadTrigger = document.getElementById('home-load-trigger');
// homeTab.addEventListener('scroll', () => {

//   if (isVisibleOnScreen(homeLoadTrigger)) {
//     console.log('Current tab HOME adding 5 new posts to home feed')
//     appendPosts(5);
//   }
  
// });

// const searchTab = document.getElementById('search-tab');


// if (currentTab === SEARCH && isVisibleOnScreen(searchFeedLoadTrigger)) {
//   appendItems();
// }

// appendPosts(5);