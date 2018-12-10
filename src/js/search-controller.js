'use strict';

const searchTab = document.getElementById('search-tab');
const feedGrid = document.querySelector('.search-tab__feed > ul');
const searchLoadTrigger = document.getElementById('search-load-trigger');
const searchBar = document.getElementById('search-bar');

const makeSearch = (value) => {
    changeToTab(SEARCH);
    searchBar.value = value;
}



//appendItems();

