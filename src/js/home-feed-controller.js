'use strict';

const postElement = `
<li class="post" id="{id}">
            
    <div class="post-header">
        <div class="post-header__picture"></div>
        <div class="post-header__username"></div>
    </div>

    <div class="post-media"></div>

    <!-- TODO: add rating graphic -->

    <div class="post-info">
        <div class="post-info__tags"></div>
        <div class="post-info__description"></div>
        <div class="post-info__comments"></div>
                
        <div class="post-info__timestamp">
            <p></p><span></span>
        </div>

    </div>

</li>
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
      const description = document.querySelector("#post-"+p+" .post-info__description");
      const username    = document.querySelector("#post-"+p+" .post-header__username");
      const timestamp   = document.querySelector("#post-"+p+" .post-info__timestamp");
      const userpic     = document.querySelector("#post-"+p+" .post-header__picture");
      
      description.textContent = res.post_data[postsDataArray[p]].post;
      username.textContent    = res.post_data[postsDataArray[p]].addedby_user;
      timestamp.textContent   = res.post_data[postsDataArray[p]].added_ago;
      userpic.innerHTML = '<img height="45" width="45" src="'+API_URL+res.post_data[postsDataArray[p]].user_pic+'">';
      
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
        feedContainer.innerHTML += postElement.replace('{id}', 'post-'+(i+postsInitialized));
        addedAmount++;
    }
    postsInitialized=postsInitialized+addedAmount;
    conLog('[appendPosts] New elements are created!');
    if ( postsDataLoaded ) fetchPosts();
};

const isVisibleOnScreen = (element) => {
    const bounding = element.getBoundingClientRect();
    if (bounding.bottom <= window.innerHeight) {
        conLog('Home feed trigger in viewport');
        return true;
    } else {
        return false;
    }
};