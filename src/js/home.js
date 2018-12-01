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

const tabWindow = document.querySelector('.tab-views');
tabWindow.addEventListener('scroll', () => {
  
  if (currentTab === HOME && isVisibleOnScreen(loadTrigger)) {
    appendPosts(5);
  }

  if (currentTab === SEARCH && isVisibleOnScreen(searchFeedLoadTrigger)) {
    appendItems();
  }

});

const newPostForm = document.getElementById('new-post-form');

newPostForm.addEventListener('submit', (e) => {
  
  e.preventDefault();
  
  const upload_file = document.getElementById('media');
  const tags        = document.getElementById('new-post-tags');
  const description = document.getElementById('new-post-description');
  
  const data = new FormData();
  
  data.append ( 'upload_file', upload_file.files[0] );
  data.append ( 'tags', tags.value );
  data.append ( 'description', description.value );
  data.append ( 'session_id', sessionID );
  data.append ( 'session_token', sessionToken );
  
  const settings = { method: 'POST', "Content-Type": "application/x-www-form-urlencoded", body: data };
  
  fetch(API_URL + 'posts/upload', settings).then((r) => {
    return r.json();
  }).then((json) => {
    console.log(json);
  });
  
  
});


appendPosts(5);