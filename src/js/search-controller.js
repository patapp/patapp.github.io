'use strict';

const searchTab = document.getElementById('search-tab');
const feedGrid = document.querySelector('.search-tab__feed > ul');
const searchLoadTrigger = document.getElementById('search-load-trigger');
const searchBar = document.getElementById('search-bar');

const makeSearch = (value) => {
    changeToTab(SEARCH);
    searchBar.value = value;
}

const appendItems = (amount = 27) => {
    for (let i=0; i<amount; i++) {
        feedGrid.appendChild( document.createElement('li') );
    }
}

searchTab.addEventListener('scroll', () => {
    if (isVisibleOnScreen(searchLoadTrigger)) {
        appendItems();
    }
});

appendItems();