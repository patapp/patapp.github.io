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

const loadingScreen = document.querySelector('.loading-screen');

const gridSearch = new gridFiller('grid-search', 'landing', 27 );
const gridUserPosts = new gridFiller('grid-userposts', 'user', 18 );


let lastSearchTerm = '';
let timeoutForSearch;

  const gridSearchListView = document.getElementById('grid-search');
  const tagsListView = document.getElementById('list-search-tags');
  const usersListView = document.getElementById('list-search-users');


  const gridItemClicked = ( grid, itemID ) => {
    alert( 'GridItemClicked! Grid: ' + grid + ' ItemID: ' + itemID );
    }

  const setSearchType = (searchType) => {
    const searchOptions = document.querySelectorAll('#search-for-options li');
      searchOptions.forEach((obj) => {
        obj.classList.remove('selected');
      });
    const selectedValue = document.getElementById(searchType);
    selectedValue.classList.add('selected');
    
    switch ( searchType ) {
      case 'search-for-item-post':
        tagsListView.classList.add('hide');
        usersListView.classList.add('hide');
        gridSearchListView.classList.remove('hide');
        break;
      case 'search-for-item-tag':
        gridSearchListView.classList.add('hide');
        usersListView.classList.add('hide');
        tagsListView.classList.remove('hide');
        break;
      case 'search-for-item-user':
        gridSearchListView.classList.add('hide');
        tagsListView.classList.add('hide');
        usersListView.classList.remove('hide');
        break;
      }
  };



/* This function is called only, if the session exists and user is logged in. */
const appIsReady = () => {

  // Hide the loading / waiting screen here, and do the tricks....
  conLog('[APP_IS_READY] Called.');
  loadingScreen.classList.add('hidden');

  loadPosts(); // Load TRENDING PAGE posts / post content

  gridUserPosts.setSearchTerm(sessionLoggedInUserID);
  gridSearch.init();
  renderUserProfileData(sessionLoggedInUserID);
  
  

const tagItemClicked = ( tag ) => {
  const searchBar = document.getElementById('search-bar');
  searchBar.value = '=' + tag;
  setSearchType('search-for-item-post');
  doSearch();
  }

const userItemClicked = ( userID, userName ) => {
  alert ( 'User Item clicked! User ID: ' + userID + ', Name: ' + userName );
  }  
  
  const searchTab = document.getElementById('search-tab');
  searchTab.addEventListener('scroll', () => {
      if (isVisibleOnScreen(searchLoadTrigger)) {
          gridSearch.append();
      }
  });
  
  const doSearch = () => {
    const searchBar = document.getElementById('search-bar');
    if ( searchBar.value != lastSearchTerm ) {

      const rcPost = document.getElementById('result-count-post');
      const rcTag  = document.getElementById('result-count-tag');
      const rcUser = document.getElementById('result-count-user');
    
      rcPost.textContent = '';
      rcTag.textContent = '';
      rcUser.textContent = '';
    
      lastSearchTerm  = searchBar.value;
      let searchValue = searchBar.value;
      tagsListView.innerHTML = '';
      usersListView.innerHTML = '';
      
      if ( searchValue.substring(0,1) == '=' ) {
        searchValue = searchValue.substring(1);
        if ( searchValue != "" ) {
          gridSearch.setSearchTypeAndTerm('Tag', searchValue);
          }
        }else{
        if ( searchValue != "" ) {
          gridSearch.setSearchTypeAndTerm('TagSearch', searchValue);
          }
        }
      
      
      getJSON('POST','users', '', {search_term: searchValue} ).then( (res) => {
        if ( res.success ) {
        usersListView.innerHTML = '';
        console.log(res);
          if ( res.user_count > 0 ) {
            rcUser.textContent = res.user_count;
            for( let i=0; i<res.user_count; i++ ){
              const newLI = document.createElement('LI');
              newLI.textContent = res.users[i].name;
              newLI.className = 'clickable';
              usersListView.appendChild(newLI);
              newLI.addEventListener('click', () => {
                userItemClicked(res.users[i].id, res.users[i].name);
                });
              }
            }
          }
      });
      getJSON('POST','tags', '', {search_term: searchValue} ).then( (res) => {
        if ( res.success ) {
        tagsListView.innerHTML = '';
        console.log(res);
          if ( res.tag_count > 0 ) {
            rcTag.textContent = res.tag_count;
            for( let i=0; i<res.tag_count; i++ ){
              const newLI = document.createElement('LI');
              newLI.className = 'clickable';
              newLI.textContent = res.tags[i];
              tagsListView.appendChild(newLI);
              newLI.addEventListener('click', () => {
                tagItemClicked(res.tags[i]);
                });
              }
            }
          }
      });
      
      }
    
    
  };
  const searchChanged = () => {
    clearTimeout(timeoutForSearch);
    timeoutForSearch = setTimeout(doSearch, 250);
  };
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('change', () => { searchChanged(); });
  searchBar.addEventListener('keypress', () => { searchChanged(); });
  searchBar.addEventListener('keyup', () => { searchChanged(); });
  


  const searchOptions = document.querySelectorAll('#search-for-options li');
  searchOptions.forEach((obj) => {
    obj.addEventListener('click', (e) => {
      setSearchType(obj.id);
    });
  });

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
