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

// removed: <li class="post" id="{id}">
const postElement = `


  <div class="post-header">
    <div class="post-header__picture"></div>
    <div class="post-header__username"></div>
  </div>

  <div class="post-media"></div>

  <!-- TODO: add rating graphic -->

  <div class="post-info">
  <ul class="post-info__tags"></ul>
  <div class="post-info__description"></div>
  <p class="post-description-toggle"></p>
  <div class="post-info__comments">
    <span></span><p></p>
  </div>
  <div class="post-info__timestamp">
    <p></p><span></span>
  </div>

  </div>

`;

const feedContainer = document.getElementById('home-feed');
const loadTrigger = document.getElementById('load-trigger');
let postsInitialized = 0;
let postsDataLoaded = 0;
let postsDataCount = -1;
let postsDataArray = [];
let postsDataContentLoadedTo = 0;

const renderPosts = (from, to) => {
  conLog('[renderPosts] Rendering: ' + from + ' --> ' + to);  
  let renderItems = [];
  for(let p=from;p<=to;p++){
    renderItems.push(postsDataArray[p]);
  }
  getJSON('POST','posts/getcontent', '', {items: renderItems.join('-')} ).then( (res) => {
    for(let p=from;p<=to;p++){
      const userpic     = document.querySelector("#post-"+p+" .post-header__picture");
      const username    = document.querySelector("#post-"+p+" .post-header__username");
      const postmedia   = document.querySelector("#post-"+p+" .post-media");
      const tags        = document.querySelector("#post-"+p+" .post-info__tags");
      const description = document.querySelector("#post-"+p+" .post-info__description");
      const showDesc    = document.querySelector("#post-"+p+" .post-description-toggle");
      const comment     = document.querySelector('#post-'+p+" .post-info__comments");
      const commentCount= document.querySelector("#post-"+p+" .post-info__comments > span");
      const addComments = document.querySelector("#post-"+p+" .post-info__comments > p");
      const timestamp   = document.querySelector("#post-"+p+" .post-info__timestamp > p");
      
      userpic.innerHTML = '<img height="45" width="45" src="'+API_URL+res.post_data[postsDataArray[p]].user_pic+'">';
      
      //username.textContent    = res.post_data[postsDataArray[p]].addedby_user;
      let usernameP = document.createElement('p');
      usernameP.innerHTML = res.post_data[postsDataArray[p]].addedby_user;
      username.appendChild(usernameP);
      
      //description.textContent = res.post_data[postsDataArray[p]].post;
      let descriptionP = document.createElement('p');
      descriptionP.innerHTML = res.post_data[postsDataArray[p]].post;
      description.appendChild(descriptionP);
      if (descriptionP.offsetHeight > 40) {
        showDesc.innerHTML = "more";
        description.classList.toggle('post-description-hidden');
        description.classList.toggle('post-info__description::after');
      }
      showDesc.addEventListener('click', () => {
        showDesc.innerHTML = (showDesc.innerHTML == "more" ? "less":"more");
        description.classList.toggle('post-description-hidden');
        description.classList.toggle('post-info__description::after');
      });
      timestamp.innerHTML = res.post_data[postsDataArray[p]].added_ago;
      
      
      // -------------- PET TAGS DISABLED FOR NOW ----------------
      // if ( res.post_data[postsDataArray[p]].pets.length > 0 ) {
      //   for (let i=0; i<res.post_data[postsDataArray[p]].pets.length; i++){
      //     tags.innerHTML += '<span class="post-pet__item">'+res.post_data[postsDataArray[p]].pets[i]+'</span>';
      //     }
      //   }
      
      // ----------------------- REGULAR TAGS -----------------------
      if ( res.post_data[postsDataArray[p]].tags.length > 0 ) {
        for (let i=0; i<res.post_data[postsDataArray[p]].tags.length; i++){
          //tags.innerHTML += '<span class="post-tag__item">'+res.post_data[postsDataArray[p]].tags[i]+'</span>';
          let tagItem = document.createElement('li');
          tagItem.innerHTML = res.post_data[postsDataArray[p]].tags[i];
          tags.appendChild(tagItem);
        }
      }
      // --------------------------- POST MEDIA ----------------------------------
      if ( res.post_data[postsDataArray[p]].media_type == 'i' ) { // Image
        
        //postmedia.innerHTML = '<img src="'+API_URL+res.post_data[postsDataArray[p]].url+'">';
        const img = document.createElement('img');
        img.setAttribute('src', `${API_URL}${res.post_data[postsDataArray[p]].url}`);
        img.addEventListener('load', () => {
          console.log('LOAD event on IMG tag');
          if (img.width >= img.height) {
            console.log('landscape image');
            img.classList.add('landscape');
          }
        });
        postmedia.appendChild(img);
        
      } else if ( res.post_data[postsDataArray[p]].media_type == 'v' ) { // Video
        
        postmedia.classList.add('video');
        postmedia.innerHTML = '<video muted loop controls><source src="'+API_URL+res.post_data[postsDataArray[p]].url+'"></source></video>';
        // const mediaVideo = postmedia.children[0];
        // mediaVideo.addEventListener('')
      }

      //POST COMMENTS REMOVED FOR TESTING
      /*if ( res.post_data[postsDataArray[p]].comments == 0 ) {
        comments.innerHTML = '0 comments';
      }else{
        comments.innerHTML = res.post_data[postsDataArray[p]].comments+' comments';
        comments.innerHTML += ', sender: '+res.post_data[postsDataArray[p]].latest_comment.sender;
        comments.innerHTML += ', at: '+res.post_data[postsDataArray[p]].latest_comment.added_ago;
      }*/
      addComments.innerHTML = "Add comment...";
      if (res.post_data[postsDataArray[p]].comments > 999) {
        commentCount.innerHTML = "999+";
      }
      else {
        commentCount.innerHTML = res.post_data[postsDataArray[p]].comments;
      }
      comment.addEventListener('click', () =>{
        if (VIEW_PAGE == 'home'){
          conLog("YOU CAN COMMENT ON STUFF");
        }
        else if (VIEW_PAGE =='') {
          conLog("YOU CANNOT COMMENT ON STUFF");
        }
      });
    }
  });
}

const fetchPosts = () => {
  conLog('[fetchPosts] Skeletons: ' + postsInitialized + ", TotalItems: " + postsDataCount + ', ContentLoadedTo: ' + postsDataContentLoadedTo );
  if ( postsDataContentLoadedTo < postsDataCount ) {
    const renderFrom = postsDataContentLoadedTo;
    const renderTo   = (postsInitialized < postsDataCount ? postsInitialized : postsDataCount) - 1;
    postsDataContentLoadedTo = renderTo + 1;
    conLog('[fetchPosts] I will render from ' + renderFrom + ' to ' + renderTo );
    renderPosts (renderFrom, renderTo);
  }else{
    conLog('[fetchPosts] all already fetched');
  }
}

const loadPosts = () => {
  conLog('[loadPosts] Called.');
  getJSON('POST', 'posts').then((res) => {
    console.log(res);
    conLog('[loadPosts] Total number of posts: ' + res.posts_count);
    postsDataArray = res.posts;
    postsDataLoaded = 1;
    postsDataCount = res.posts_count;
    fetchPosts();
  });
}

const appendPosts = (amount) => {
  conLog ( '[appendPosts] Called with amount: ' + amount );
  let maxAmount = amount;
  if ( postsDataLoaded ) {
    // posts data is loaded, let's check, is there how many elements still left
    maxAmount = (postsDataCount - postsInitialized);
    conLog('[appendPosts] Elements Left: ' + maxAmount);
    if ( maxAmount < amount ) conLog ( '[appendPosts] Only ' + maxAmount + ' items left, i will be rendering only just ' + maxAmount );
    if ( maxAmount == 0 ) {
      conLog('[appendPosts] No items left! Cannot append more posts!');
      return;
    }
  }
  let addedAmount = 0;
  for (let i=0; i<amount && i<maxAmount; i++) {
    const newLIElement = document.createElement('LI');
    newLIElement.innerHTML += postElement;
    newLIElement.id = 'post-'+(i+postsInitialized);
    feedContainer.appendChild(newLIElement);
    //feedContainer.innerHTML += postElement.replace('{id}', 'post-'+(i+postsInitialized));
    addedAmount++;
  }
  postsInitialized=postsInitialized+addedAmount;
  conLog('[appendPosts] New elements are created!');
  if ( postsDataLoaded ) fetchPosts();
};

const isVisibleOnScreen = (element) => {
  const bounding = element.getBoundingClientRect();
  if (bounding.bottom <= window.innerHeight) {
    conLog(element.tagName + ' trigger in viewport');
    return true;
  } else {
    return false;
  }
};

const homeTab         = document.getElementById('home-tab');
const homeLoadTrigger = document.getElementById('home-load-trigger');
homeTab.addEventListener('scroll', () => {
  
  if (isVisibleOnScreen(homeLoadTrigger)) {
    console.log('Current tab HOME adding 5 new posts to home feed')
    appendPosts(5);
  }
  
});

appendPosts(5);