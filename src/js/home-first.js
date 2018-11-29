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

/* This function is called only, if the session exists and user is logged in. */
const appIsReady = () => {

  // Hide the loading / waiting screen here, and do the tricks....
  conLog('[APP_IS_READY] Called.');
  
  loadPosts(); // Load TRENDING PAGE posts / post content

  /* Modify app here to meet the permissions
    
    To check is PERMISSION:
    isPermission('POST_UPLOAD')
    TRUE = permission exists, FALSE = no permission
        
  +------------------------------------------------------------------------------------+
  | DIFFERENT PERMISSIONS                                                              |
  +-------------------------+----------------------------------------------------------+
  | USER_DELETE             | Allows to delete ANY user.                               |
  | POST_DELETE             | Allows to delete ANY post.                               |
  +-------------------------+----------------------------------------------------------+
  | POST_UPLOAD	            | Allows to UPLOAD / MODIFY OWN / DELETE OWN post.         |
  | CONTENT_REPORTS_HANDLER | Allows to view and handle content reports sent by users. |
  +-------------------------+----------------------------------------------------------+
  | COMMENT_DELETE          | Allows to delete ANY comment.                            |
  | USER_PERMISSION_CHANGE  | Allows to change user permissions.                       |
  +-------------------------+----------------------------------------------------------+
  
  */

  }
