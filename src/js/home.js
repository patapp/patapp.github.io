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

const deletePost = (id, element=null) => {
  getJSON('DELETE', 'posts', '', {post_id: id}).then( (r) => {
    if ( r.success ) {
      //alert ( 'Delete post succeeded !' );
      if (element !== null) {
        element.parentNode.removeChild(element);
      }
    } else {
      alert ( 'Error: ' + r.error );
    }
  });
};

// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************

const setFollowUser = ( userID, followOrNot ) => {
  return new Promise((resolve, reject) => {
  getJSON( (followOrNot ? 'POST' : 'DELETE'), 'follow', '', {user_id: userID}).then( (r) => {
    if ( r.success ) {
      console.log( '[setFollowUser] You are now ' + (followOrNot?'FOLLOWING':'NOT FOLLOWING') + ' user ' + userID );
      resolve(followOrNot);
    }else{
      resolve(!followOrNot);
    }
  });
  });
};

const addComment = ( postID, commentText ) => {
  getJSON( 'POST', 'comments/add', '', {post_id: postID, comment : commentText}).then( (r) => {
    if ( r.success ) {
      console.log( '[addComment] Comment added.' );
    }else{
      console.log('[addComment] ERROR: ' + r.error);
    }
  });
};

const getComments = async (postID) => {
  return new Promise((resolve, reject) => {
    getJSON( 'POST', 'comments', '', {post_id: postID} ).then( (r) => {
      resolve(r);
    });
  });
};

const deleteMyProfile = () => {
  // FORCE DELETE!!! You should ask confirmation before calling this function !!!!
  deleteUser ( sessionLoggedInUserID, true );
}

const deleteUser = ( userID, confirmed = false ) => {
  if ( sessionLoggedInUserID != userID || (sessionLoggedInUserID == userID && confirmed) ) {
    getJSON( 'DELETE', 'users', '', {user_id: userID} ).then( (r) => {
      if ( r.success ) {
        console.log( '[deleteUser] User is Deleted.' );
      }else{
        console.log('[deleteUser] ERROR: ' + r.error);
      }
    });
  }else{
    console.log('[deleteUser] ERROR: You are trying to delete own account.');
  }
};

const getUserProfileData = ( userID ) => {
  return new Promise((resolve, reject) => {
    getJSON( 'POST', 'users/profile', '', {user_id: userID} ).then( (r) => {
      resolve(r);
    });
  });
};

const renderUserProfileData = ( userID ) => {
  getUserProfileData(userID).then((r) => {
    if ( r.success ) {
      const username    = document.getElementById('user_name');
      const followers   = document.getElementById('user_followers_amount');
      const following   = document.getElementById('user_following_amount');
      const description = document.getElementById('user_description');
      const img         = document.getElementById('profile-tab__pic');
      console.log(r);
      username.textContent = r.user_name;
      followers.textContent = r.followers;
      following.textContent = r.following;
      description.textContent = r.user_description;
      console.log(r.profile_pic_uri);
      img.style.backgroundImage = `url(${(r.profile_pic_uri ? API_URL + r.profile_pic_uri : '../src/icons/default_profile_pic_250x250.png')})`;
      img.style.backgroundSize = 'cover';
      img.style.backgroundRepeat = 'none';
      img.style.backgroundPosition = 'center';
      
      
      gridUserPosts.setSearchTerm(userID);
      gridUserPosts.reset();
      
      // r.
      // last_seen_time last_seen_time_ago, posts, profile_create_time, profile_pic_uri, success, user_description, user_name
      
    }
  });
}


// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************
// NEW FUNCTIONS BY SAMULI ************************************************************************************************************************************************************



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


