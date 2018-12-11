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

// ************ HELPER FUNCTIONS **************

// *** For rating slider ***
const checkClassName = (className, line, dots) => {
  console.log('[checkClassName] function called');
	if (line.classList.contains(className)) {
		line.classList.toggle(className)
	}
	if (dots.classList.contains(className)) {
		dots.classList.toggle(className);
	}
}

const applyNewClass = (newClass, line, dots) => {
  console.log('[applyNewClass] function called');
  if (newClass === null) return;
	line.classList.toggle(newClass);
	dots.classList.toggle(newClass);
}

const switchSliderThumb = (newClass, slider) => {
  console.log('[switchSliderThumb] function called');
	thumbs.forEach(className => {
		if (slider.classList.contains(className)) {
			slider.classList.toggle(className);
		}
	});
	setTimeout(() => {
		slider.classList.toggle(newClass);
	}, 200);
}

const switchSliderGradient = (newClass, line, dots) => {
  console.log('[switchSliderGradient] function called');
	setTimeout(() => {
		gradients.forEach(className => {
			checkClassName(className, line, dots);
		});
		applyNewClass(newClass, line, dots);
	}, 250);
}

const setSliderVal = (value, slider, line, dots) => {
	slider.value = value;
	updateSlider(slider, line, dots);
}

const updateSlider = (slider, line, dots) => {
  console.log('[updateSlider] function called');
	switch (slider.value) {
		
		case "1":
		switchSliderThumb(thumbs[0], slider);
		switchSliderGradient(gradients[0], line, dots);
		break;
		
		case "2":
		switchSliderThumb(thumbs[1], slider);
		switchSliderGradient(gradients[1], line, dots);
		break;
		
		case "3":
		switchSliderThumb(thumbs[2], slider);
		switchSliderGradient(gradients[2], line, dots);
		break;
		
		case "4":
		switchSliderThumb(thumbs[3], slider);
		switchSliderGradient(gradients[3], line, dots);
		break;
		
		case "5":
		switchSliderThumb(thumbs[4], slider);
		switchSliderGradient(gradients[4], line, dots);
		break;
		
  }
  
}

const setSlilderStylesToRated = (slider, postHeader) => {
  slider.max = 5;
  slider.classList.remove('unrated__slider');
  postHeader.classList.remove('unrated__wrapper');
}

const updatePostRating = (post, value) => {
  getJSON('POST', 'ratings', '', 
  {
    post_id: post,
    rating: value
  }).then( res => {
    if (res.success) {
      console.log(`[SUCCESS] post-id: ${post}, new-rating-value: ${value}`);
    } else {
      console.error(`[ERROR UPDATING POST RATING] ${res.error}`);
    }
  });
}


const btn = document.getElementById('visiting-profile_follow-btn');
btn.addEventListener('click', () => {
const btntxt = document.querySelector('#visiting-profile_follow-btn .follow-btn-text span');
if ( btntxt.textContent == 'FOLLOW' || btntxt.textContent == 'UNFOLLOW' ) {
  const toValue = (btntxt.textContent == 'UNFOLLOW' ? false : true );
  console.log(toValue);
  btntxt.textContent = ' ... ';
  setFollowUser(visitingUserID, toValue).then( (r) => {
    if ( r == false ) {
      btntxt.textContent = 'FOLLOW';
      }else{
      btntxt.textContent = 'UNFOLLOW';
      }
  });
}
});



// *** For post element click listener ***
const openUserView = (username) => {
  toggleVisitingProfile();
  const btn = document.getElementById('visiting-profile_follow-btn');
  btn.classList.add('hide');
  getJSON('POST','users/get-user-id', '', {user_name: username} ).then( (res) => {
    
    if ( res.success ) {
      const userId = res.user_id;
      console.log('SUCCESS: user id is: ' + userId );
      
      getUserProfileData(userId).then( res => {
        setVisitingProfileInfo(res); 
      });

    } else {
      alert('user not found');
    }

  });
}

const getUsernameFromDocument = (id) => {
  
  const username = document.querySelector("#post-"+id+" .post-header__username > p").innerHTML;
  console.log('You clicked on user: ', username);
  openUserView(username);
  
}

const checkTarget = (id, target) => {
  
  console.log('[checkTarget] called');
  console.log('target', target);
  
  switch (target.tagName) {
    
    case "IMG":
    console.log('case IMG');
    if (target.closest('div').classList.contains("post-header__picture")) {
      getUsernameFromDocument(id);
      
    }
    break;
    
    case "P":
    console.log('case P');
    if (target.closest('div').classList.contains("post-header__username")) {
      getUsernameFromDocument(id);
    }
    break;
    
    case "LI":
    if (target.closest('ul').className === "post-info__tags") {
      const tagValue = target.innerHTML;
      console.log('You clicked on tag: ', tagValue);
      makeSearch(tagValue);
    }
    break;
    
  }
  
}

//*********************************************

// Class names for rating slider gradients and slider thumb image
const thumbs    = ["value_1", "value_2", "value_3", "value_4", "value_5"];
const gradients = ["gradient_val-minus-2", "gradient_val-minus-1", null, "gradient_val-plus-1", "gradient_val-plus-2"];
// **************************************************************



// removed: <li class="post" id="{id}">
const postElement = `

<div class="post-header">
<div class="post-header__picture clickable"></div>
<div class="post-header__username clickable"></div>
</div>

<div class="post-media"></div>

<!-- rating graphic -->
<div class="post-rating unrated__wrapper">
<div class="rating-line"></div>
<div class="rating-dots"></div>
<input class="rating-slider unrated__slider" type="range" min="1" max="6" value="6">
</div>

<div class="post-info">
<ul class="post-info__tags"></ul>
<div class="post-info__description"></div>
<p class="post-description-toggle"></p>
<div class="post-info__comments">
<img class="post-info__comments-logo" src="../src/svg/comment_ic.svg" onerror="this.onerror=null;this.src='./src/svg/comment_ic.svg';">
<span></span><p></p>
</div>
<div class="post-info__timestamp">
<p></p><span></span>
</div>
</div>

<!-- POPUP FOR UNREGISTERED USERS ON WELCOME PAGE -->
<div class="unregisteredPopup">
<div class="unregisteredPopupContent">
<p>This feature is only available for registered users. </p>
<button id="urSignup" class="signUp btn btn-primary">SIGN UP</button>
</div>
</div>
<!-- POPUP FOR UNREGISTERED USERS ON WELCOME PAGE -->
`;

const feedContainer = document.getElementById('home-feed');
const loadTrigger = document.getElementById('load-trigger');
const commentPopup = document.getElementsByClassName("commentPopup")[0];
let postsInitialized = 0;
let postsDataLoaded = 0;
let postsDataCount = -1;
let postsDataArray = [];
let postsDataContentLoadedTo = 0;

const renderPosts = (from, to) => {
  
  conLog('[renderPosts] Rendering: ' + from + ' --> ' + to);  
  let renderItems = [];
  
  for (let p=from; p<=to; p++) {
    renderItems.push(postsDataArray[p]);
  }
  
  getJSON('POST','posts/getcontent', '', {items: renderItems.join('-')} ).then( (res) => {
    
    for (let p=from; p<=to; p++) {
      
      const postHeader                    = document.querySelector("#post-"+p);
      
      const userpic                   = document.querySelector("#post-"+p+" .post-header__picture");
      const username                  = document.querySelector("#post-"+p+" .post-header__username");
      
      const postmedia                 = document.querySelector("#post-"+p+" .post-media");
      
      const ratingParent              = document.querySelector("#post-"+p+" .post-rating")
      const ratingLine                = document.querySelector("#post-"+p+" .rating-line");
      const ratingDots                = document.querySelector("#post-"+p+" .rating-dots");
      const ratingSlider              = document.querySelector("#post-"+p+" .rating-slider");
      let   isRated                   = false;
      
      const tags                      = document.querySelector("#post-"+p+" .post-info__tags");
      
      const description               = document.querySelector("#post-"+p+" .post-info__description");
      const showDesc                  = document.querySelector("#post-"+p+" .post-description-toggle");
      
      const comment                   = document.querySelector("#post-"+p+" .post-info__comments");
      const commentCount              = document.querySelector("#post-"+p+" .post-info__comments > span");
      const commentIcon               = document.querySelector("#post-"+p+" .post-info__comments > img");
      const addComments               = document.querySelector("#post-"+p+" .post-info__comments > p");
      
      const timestamp                 = document.querySelector("#post-"+p+" .post-info__timestamp > p");
      
      const unregisteredPopup         = document.querySelector("#post-"+p+" .unregisteredPopup");
      const unregisteredPopup_button  = document.querySelector("#post-"+p+" .unregisteredPopupContent > button");
      
      // Check if username, profilepic or any tag was clicked
      postHeader.addEventListener('click', (e) => {
        checkTarget(p, e.target);
      });
      
      userpic.innerHTML = '<img height="45" width="45" src="'+(res.post_data[postsDataArray[p]].user_pic ? API_URL+res.post_data[postsDataArray[p]].user_pic : '.'+(VIEW_PAGE == 'home' ? '.' : '')+'/src/icons/default_profile_pic_250x250.png')+'">';
      
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
        //description.classList.toggle('post-info__description::after');
      }
      showDesc.addEventListener('click', () => {
        showDesc.innerHTML = (showDesc.innerHTML == "more" ? "less":"more");
        description.classList.toggle('post-description-hidden');
        //description.classList.toggle('post-info__description::after');
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
          tagItem.classList.add('clickable');
          tagItem.innerHTML = res.post_data[postsDataArray[p]].tags[i];
          tags.appendChild(tagItem);
        }
      }
      
      
      // --------------------------- POST MEDIA ----------------------------------
      if ( res.post_data[postsDataArray[p]].media_type == 'i' ) { // Image
        
        // Set media background color based on post colors
        const mediaColor = res.post_data[postsDataArray[p]].color;
        postmedia.style.backgroundColor = `#${mediaColor}`;
        
        // Create img element, set src attribute and append to media element.
        // Also check if image size is landscape and add appropriate class.
        const imgSrc = API_URL + res.post_data[postsDataArray[p]].url;
        const image = new Image();
        const imgElem = document.createElement('img');
        
        image.addEventListener('load', () => {
          const width  = image.width;
          const height = image.height;
          console.log('LOAD event on image');
          console.log(`Width: ${width}, Height: ${height}`);
          if (width >= height) {
            console.log('landscape image');
            imgElem.classList.add('landscape');
          }
        });
        
        image.src = imgSrc;
        imgElem.setAttribute('src', imgSrc);
        postmedia.appendChild(imgElem);
        
      } else if ( res.post_data[postsDataArray[p]].media_type == 'v' ) { // Video
        
        postmedia.classList.add('video');
        postmedia.innerHTML = '<video muted loop controls><source src="'+API_URL+res.post_data[postsDataArray[p]].url+'"></source></video>';
        // const mediaVideo = postmedia.children[0];
        // mediaVideo.addEventListener('')
      }
      // ------------------------ END OF POST MEDIA --------------------------------
      
      
      // --------------------- POST RATING ------------------------------------
      // Set slider value if user has already rated post
      const dbValue = res.post_data[postsDataArray[p]].my_rate;
      if (dbValue != 0) {
        console.log(`post_id${p} setting rating to ${dbValue}`);
        setSlilderStylesToRated(ratingSlider, ratingParent);
        isRated = true;
        setSliderVal(dbValue, ratingSlider, ratingLine, ratingDots);
      }
      
      // Triggered when slider value changes
      ratingSlider.addEventListener('input', () => {
        console.log('Slider INPUT event called.');
        if (!isRated) {
          setSlilderStylesToRated(ratingSlider, ratingParent);
          isRated = true;
        } 
        updateSlider(ratingSlider, ratingLine, ratingDots);
      });
      
      // Triggered when user lets go of slider
      ratingSlider.addEventListener('change', () => {
        // Do database updating here
        const id = postsDataArray[p];
        const value = ratingSlider.value;
        updatePostRating(id, value);
        
      });
      // -------------------- END OF POST RATING -----------------------------------
      
      //Redirects to the sign-up page when button is clicked on the unregistered popup on the welcome page
      unregisteredPopup_button.addEventListener('click', () => {
        window.location.href = "sign-up/";
      });
      
      addComments.innerHTML = "Add comment...";
      if (res.post_data[postsDataArray[p]].comments > 999) {
        //Prevents a long comment counter with a cap of 999
        commentCount.insertAdjacentHTML('beforeend',"999+");
      }
      else {
        //Gets the number of comments for each post
        commentCount.insertAdjacentHTML('beforeend',res.post_data[postsDataArray[p]].comments);
      }
      //When the entire comment div("Add comment..." and comment icon) is clicked
      comment.addEventListener('click', () =>{
        //VIEW_PAGE checked to ensure comment window does not show for unregistered users
        if (VIEW_PAGE == 'home'){
          //Shows comment window
          commentPopup.style.display="block";
          //Burger button transitions into a back button and hides all other nav bar buttons
          toggleBurgerToBack();
          //Determines ID of current post
          setOpenID(postsDataArray[p]);
          //Loads comments for current post
          loadComment(postsDataArray[p]);
          
          //When there is a back button being displayed
          if (isBackButton) {
            menu.addEventListener('click', () => {
              //Hides comment window when back button is pressed
              commentPopup.style.display="none";
              //Clears the loaded comments
              clearContent();
            });
          }
        }
        //Different popup shown for unregistered users on welcome page
        else if (VIEW_PAGE =='') {
          unregisteredPopup.style.display="block";
        }
      });
      //Dismisses popup when grey areas are clicked
      window.addEventListener('click', () => {
        if (event.target == unregisteredPopup) {
          unregisteredPopup.style.display="none";
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

const destroyUnneeded = () => {
  if ( postsInitialized > postsDataCount ) {
    for ( let i = postsDataCount; i<postsInitialized; i++ ){
      const destroyObject = document.getElementById('post-' + i);
      if ( typeof destroyObject != 'undefined' ) {
        destroyObject.remove();
      }
    }
    postsInitialized = postsDataCount;
  }
  if ( postsDataCount == 0 ) {
    // No media at all.
    const hlt = document.getElementById('home-load-trigger');
    hlt.innerHTML = '<div class="msgTitle">No media to show =(</div><div class="msgText">Go follow someone to fill your feed =)</div>';
    hlt.className = '';
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
    destroyUnneeded();
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
    newLIElement.className = 'post';
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

if ( VIEW_PAGE == 'home' ) {
  
  const homeTab         = document.getElementById('home-tab');
  const homeLoadTrigger = document.getElementById('home-load-trigger');
  homeTab.addEventListener('scroll', () => {
    
    if (isVisibleOnScreen(homeLoadTrigger)) {
      console.log('Current tab HOME adding 5 new posts to home feed')
      appendPosts(5);
    }
    
  });
  appendPosts(5);
  
}