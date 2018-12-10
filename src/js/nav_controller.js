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

const editProfileElement = document.querySelector('.top-nav-bar__edit');
const editIcon = document.querySelector('.top-nav-bar__edit-icon');
const saveIcon = document.querySelector('.top-nav-bar__edit-save');
let isEditMode = false;

const menu = document.getElementById('menu');
const menuLabelElement = document.querySelector('.bottom-nav-buttons__burger > span');
let isBackButton = false;

const radioLabels = document.querySelectorAll('input[type="radio"] ~ label');
const radioButtons = document.querySelectorAll('input[type="radio"]');

const tabsWrapper = document.querySelector('.tab-views');
const newPostView = document.querySelector('.new-post-form-wrapper');
const newPostButton = document.getElementById('new-post');
const newPostCancelButton = document.getElementById('new-post-cancel');

const visitingProfile = document.getElementById('visiting-profile');
let isVisitingProfile = false;

const bottomNav = document.querySelector('.bottom-nav-bar');

const tabElements = document.querySelectorAll('.tab');

const transitionSpeed = 130;

let currentTab = 0;
const HOME    = 0,
      SEARCH  = 1,
      PROFILE = 2;

const showEditProfile = () => {
  editProfileElement.classList.remove('hidden');
}
const hideEditProfile = () => {
  editProfileElement.classList.add('hidden');
}
const toggleEditToSave = () => {
  editIcon.classList.toggle('hidden');
  saveIcon.classList.toggle('hidden');
}
const toggleDeleteIcons = () => {
  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => {
    icon.classList.toggle('hidden');
  });
}

const enableRadioButtons = () => {
  radioButtons.forEach(button => {
    button.disabled = false;
  });
}
const disableRadioButtons = () => {
  radioButtons.forEach(button => {
    button.disabled = true;
  });
}

const checkOverlayView = () => {
  if (isVisitingProfile) {
    toggleVisitingProfile();
  }
}

const toggleBurgerToBack = () => {
  menuLabelElement.classList.toggle('menu-back');
  toggleBottomNavButtons();
  isBackButton = (isBackButton === false ? true : false);
}

const toggleVisitingProfile = () => {
  if (!isVisitingProfile) {
    visitingProfile.classList.toggle('hidden');
    toggleBurgerToBack();
    isVisitingProfile = true;
  } else {
    visitingProfile.classList.toggle('hidden');
    isVisitingProfile = false;
  }
}

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
  radioButtons[tab].checked = true;
  hideTabWithTransition(currentTab);
  currentTab = tab;
  setTimeout(() => {
    showTabWithTransition(currentTab);
  }, transitionSpeed);
}

document.getElementById('home-btn')
.addEventListener('change', ()=> {
  changeToTab(HOME);
  hideEditProfile();
});

document.getElementById('search-btn')
.addEventListener('change', ()=> {
  changeToTab(SEARCH);
  hideEditProfile();
});

document.getElementById('profile-btn')
.addEventListener('change', ()=> {
  changeToTab(PROFILE);
  showEditProfile()
});

const toggelNewPostView = () => {
  tabsWrapper.classList.toggle('hidden');
  newPostView.classList.toggle('new-post-hidden');
  bottomNav.classList.toggle('bottom-nav-hidden');
}

newPostButton.addEventListener('click', () => {
  updateTopTags();
  toggelNewPostView();
});
newPostCancelButton.addEventListener('click', () => {
  toggelNewPostView();
  clearNewPostInputs();
});

const toggleBottomNavButtons = () => {
  newPostButton.classList.toggle('btn-hidden');
  radioLabels.forEach(element => {
    element.classList.toggle('btn-hidden');
  });
}
menu.addEventListener('click', (e) => {
  if (isBackButton) {
    e.preventDefault();
    toggleBurgerToBack();
    checkOverlayView();
  }
});
menu.addEventListener('change', () => {
  if (!isBackButton) {
    bottomNav.classList.toggle('expanded');
    toggleBottomNavButtons();
  }
});

editIcon.addEventListener('click', () => {
  isEditMode = true;
  disableRadioButtons();
  enableProfieEditing();
  toggleEditToSave();
  toggleDeleteIcons();
});

saveIcon.addEventListener('click', () => {
  isEditMode = false;
  enableRadioButtons();
  disableProfieEditing();

  updateProfileInfo();

  toggleDeleteIcons();
  toggleEditToSave();
});