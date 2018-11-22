'use strict';


const menu = document.getElementById('menu');
const bottomNav = document.querySelector('.bottom-nav-bar');
const radioButtons = document.querySelectorAll('input[type="radio"] ~ label');
const newPostButton = document.getElementById('new-post');
const bottomNavHeight = bottomNav.offsetHeight;
const navBarHeight = 43;
const navBarHiddenPos = (bottomNavHeight - navBarHeight) * -1;

const tabElements = document.querySelectorAll('.tab');

const transitionSpeed = 130;

let currentTab = 0;
const HOME    = 0,
      SEARCH  = 1,
      PROFILE = 2;

const hideTabWithTransition = (tab) => {
  const targetTab = tabElements[tab];
  targetTab.classList.toggle('visible');
  setTimeout(() => {
    targetTab.classList.toggle('show-element');
  }, transitionSpeed);
}
const showTabWithTransition = (tab) => {
  const targetTab = tabElements[tab];
  targetTab.classList.toggle('show-element');
  setTimeout(() => {
    targetTab.classList.toggle('visible');
  }, transitionSpeed);
}

const changeToTab = (tab) => {
  hideTabWithTransition(currentTab);
  currentTab = tab;
  setTimeout(() => {
    showTabWithTransition(currentTab);
  }, transitionSpeed);
}

document.getElementById('home-btn')
.addEventListener('change', ()=> {
  changeToTab(HOME);
});

document.getElementById('search-btn')
.addEventListener('change', ()=> {
  changeToTab(SEARCH);
});

document.getElementById('profile-btn')
.addEventListener('change', ()=> {
  changeToTab(PROFILE);
});

const styleHidden = document.createElement('style');
styleHidden.type = 'text/css';
styleHidden.innerHTML = `.menu-hidden { bottom: ${navBarHiddenPos}px }`;
document.getElementsByTagName('head')[0].appendChild(styleHidden);
bottomNav.classList.add('menu-hidden');

menu.addEventListener('change', ()=> {
	bottomNav.classList.toggle('menu-hidden');
  newPostButton.classList.toggle('btn-hidden');
  radioButtons.forEach(element => {
    element.classList.toggle('btn-hidden');
  });
});

setTimeout(() => {
  bottomNav.style.transition = 'bottom 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s';
}, 1);