'use strict';

const postElement = `
<li class="post">
            
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

const appendPosts = (amount) => {
    for (let i=0; i<amount; i++) {
        feedContainer.innerHTML += postElement;
    }
};

const isVisibleOnScreen = (element) => {
    const bounding = element.getBoundingClientRect();
    if (bounding.bottom <= window.innerHeight) {
        console.log('Home feed trigger in viewport');
        return true;
    } else {
        return false;
    }
};

window.addEventListener('scroll', () => {
    if (isVisibleOnScreen(loadTrigger)) {
        appendPosts(5);
    }
});

appendPosts(5);