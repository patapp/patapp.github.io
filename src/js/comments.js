'use strict';
const commentPopup__comments = document.getElementsByClassName("commentPopup__comments")[0];
const commentSender          = document.getElementsByClassName("commentSender")[0];
const commentTime            = document.getElementsByClassName("commentTime")[0];
const commentContent         = document.getElementsByClassName("commentContent")[0];
const commentInput__message  = document.getElementsByClassName("commentInput__message")[0];
const commentInput__send     = document.getElementsByClassName("commentInput__send")[0];

const loadComment = (postsDataArray) => {
getComments(postsDataArray).then( (r) => {
    if ( r.success ) {
      console.log ( r.amount );
      if ( r.amount > 0 ) {
        r.comments.forEach((c) => {
          commentContent.insertAdjacentHTML('beforeend',c.comment); 
          commentSender.insertAdjacentHTML('beforeend',c.user_name);
          commentTime.insertAdjacentHTML('beforeend',c.added_ago);
          //commentContent.insertAdjacentHTML('beforeend',c.comment);
          console.log('username: ' + c.user_name);
          console.log('added: ' + c.added_ago);
          console.log('comment:' + c.comment);
          });
        }
      }
    });
}

const sendComment = (postsDataArray) => {
  commentInput__send.addEventListener('click', () => {
  addComment(postsDataArray,commentInput__message.value);
  commentInput__message.value='';
  });
}

const clearContent = () => {
  commentSender.innerHTML='';
  commentContent.innerHTML='';
  commentTime.innerHTML='';
}