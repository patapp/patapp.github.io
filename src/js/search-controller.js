'use strict';

const searchTab = document.getElementById('search-tab');
const feedGrid = document.querySelector('.search-tab__feed > ul');
const searchFeedLoadTrigger = document.querySelector('.search-tab__feed > span');

const appendItems = (amount = 20) => {
    for (let i=0; i<amount; i++) {
        feedGrid.appendChild( document.createElement('li') );
    }
}

// searchTab.addEventListener('scroll', () => {
//     if (isVisibleOnScreen(searchFeedLoadTrigger) && currentTab == SEARCH) {
//         appendItems();
//     }
// });

appendItems();