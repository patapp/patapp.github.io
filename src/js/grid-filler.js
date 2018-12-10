"use strict";

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

class gridFiller {
  
  constructor(elementID, searchType, loadItemsCount=27, searchTerm='') {
    this.elementID = elementID;
    this.searchType = searchType;
    this.loadItemsCount = loadItemsCount;
    this.searchTerm = searchTerm;
    this.obj = document.getElementById(elementID);
    console.log('[gridFiller] New Gridfiller initialized. elementID: ' + elementID + ' searchType: ' + searchType + ' loadItemsCount: ' + loadItemsCount);
  }
  
  init(){
    this.reset();
  }
  
  setSearchTerm(newTerm) {
    this.searchTerm = newTerm;
    this.reset();
  }
  setSearchType(newType) {
    this.searchType = newType;
    this.reset();
  }
  setSearchTypeAndTerm(newType,newTerm) {
    this.searchTerm = newTerm;
    this.searchType = newType;
    this.reset();
  }
  
  reset(){
    this.postsInitialized = 0;
    this.postsDataLoaded = 0;
    this.postsDataContentLoadedTo = 0;
    this.postsDataArray = [];
    this.postsDataCount = -1;
    this.obj.innerHTML = '';
    console.log('[gridFiller] Reset.');
    this.append();
    this.loadPosts();
  }
  
  append(amount) {
    if ( !amount ) amount = this.loadItemsCount;
    conLog ( '[gridFiller] append() : Called with amount: ' + amount );
    let maxAmount = amount;
    if ( this.postsDataLoaded ) {
      maxAmount = (this.postsDataCount - this.postsInitialized);
      conLog('[gridFiller] append() : Elements Left: ' + maxAmount);
      if ( maxAmount < amount ) conLog ( '[gridFiller] Only ' + maxAmount + ' items left, i will be rendering only just ' + maxAmount );
      if ( maxAmount == 0 ) {
        conLog('[gridFiller] append() : No items left! Cannot append more posts!');
        return;
      }
    }
    let addedAmount = 0;
    for (let i=0; i<amount && i<maxAmount; i++) {
      const newElement = document.createElement('LI');
      newElement.id = this.elementID + '-item-' + (i+this.postsInitialized);
      this.obj.appendChild(newElement);
      addedAmount++;
    }
    this.postsInitialized=this.postsInitialized+addedAmount;
    conLog('[gridFiller] New elements are created!');
    if ( this.postsDataLoaded ) this.fetchPosts();
  }

  renderPosts (from, to) {
    
    conLog('[gridFiller] renderPosts() : Rendering: ' + from + ' --> ' + to);  
    let renderItems = [];
    
    for (let p=from; p<=to; p++) {
      renderItems.push(this.postsDataArray[p]);
    }
    
    getJSON('POST','posts/getcontent', '', {items: renderItems.join('-')} ).then( (res) => {
      if ( res.success == false ) conLog('errori');
      for (let p=from; p<=to; p++) {
        const liElem = document.getElementById(this.elementID + '-item-' + p);
        
        const deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src', '../icons/delete_ic_140x140.png')
        deleteIcon.classList.add('delete-icon');

        liElem.style.position = 'relative';
        liElem.style.backgroundColor = `#${res.post_data[this.postsDataArray[p]].color}`;
        liElem.style.backgroundImage = `url('${API_URL + res.post_data[this.postsDataArray[p]].thumbnail}')`;
        liElem.style.backgroundSize = 'cover';
        liElem.style.backgroundRepeat = 'none';
        liElem.style.backgroundPosition = 'center';
        liElem.className = 'clickable';
        liElem.innerHTML = ' ';
        liElem.addEventListener('click', () => {
          gridItemClicked ( this.elementID, this.postsDataArray[p] );
        });
      }
    });
  }
  
   destroyUnneeded() {
   console.log('DD'+this.postsInitialized);
    if ( this.postsInitialized > this.postsDataCount ) {
      for ( let i = this.postsDataCount; i<this.postsInitialized; i++ ){
        const destroyObject = document.getElementById(this.elementID + '-item-' + i);
        if ( typeof destroyObject != 'undefined' ) {
          destroyObject.remove();
          }
        }
        this.postsInitialized = this.postsDataCount;
      }
   }
  
   fetchPosts () {
    conLog('[gridFiller] fetchPosts() : Skeletons: ' + this.postsInitialized + ", TotalItems: " + this.postsDataCount + ', ContentLoadedTo: ' + this.postsDataContentLoadedTo );
    if ( this.postsDataContentLoadedTo < this.postsDataCount ) {
      const renderFrom = this.postsDataContentLoadedTo;
      const renderTo   = (this.postsInitialized < this.postsDataCount ? this.postsInitialized : this.postsDataCount) - 1;
      this.postsDataContentLoadedTo = renderTo + 1;
      conLog('[gridFiller] I will render from ' + renderFrom + ' to ' + renderTo );
      this.renderPosts (renderFrom, renderTo);
    }else{
      conLog('[gridFiller] fetchPosts() : all already fetched');
    }
  }

  loadPosts() {
    conLog('[gridFiller] loadPosts() : Called.');
    getJSON('POST', 'posts', '', {filter_by: this.searchType, filter_string: this.searchTerm} ).then((res) => {
      conLog('[gridFiller] loadPosts() : Total number of posts: ' + res.posts_count);
      this.postsDataArray = res.posts;
      this.postsDataLoaded = 1;
      this.postsDataCount = res.posts_count;
      this.destroyUnneeded();
      this.fetchPosts();
    });
  }

  

}
