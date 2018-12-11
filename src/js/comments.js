'use strict';
const commentInput__message  = document.getElementsByClassName("commentInput__message")[0];
const commentInput__send     = document.getElementsByClassName("commentInput__send")[0];
const commentWrapper         = document.getElementsByClassName("contentWrapper")[0];

//param postsDataArray will contain comment data 
const loadComment = (postsDataArray) => {
getComments(postsDataArray).then( (r) => {
    if ( r.success ) {
      if ( r.amount > 0 ) {
        //For each comment related to the current post
        r.comments.forEach((c) => {
          //Li element created for the injection of comment,date and username into the ul
          const li = document.createElement("li");
          //Different p elements created for comment,date and username
          const p1 = document.createElement("p");
          const p2 = document.createElement("p");
          const p3 = document.createElement("p");
          //TextNodes created with the data (comment,date and username) from the database
          const comment   = document.createTextNode(c.comment);
          const added_ago = document.createTextNode(" - "+c.added_ago);
          //Sets added_ago to "now" if time is undefined
          if (c.added_ago === undefined) {
            added_ago.nodeValue=" - now";
          }
          const user_name = document.createTextNode(c.user_name);
          //Appends TextNodes to p elements
          p1.appendChild(user_name);
          p2.appendChild(added_ago);
          p3.appendChild(comment);
          //Class names added to p elements for the ease of positioning/styling
          p1.className="userName";
          p2.className="added_ago";
          p3.className="comment";
          //P elements appended to a single li element
          li.append(p1,p2,p3);
          //All comment li's appended to the wrapper
          commentWrapper.appendChild(li);
          });
        }
      }
    });
};

let openID = -1;
//Determines the ID of the current post being viewed
const setOpenID = (postsDataArray) => {
  openID = postsDataArray;
  console.log("ID has been set to " +openID);
};
//When "send comment" button is clicked
commentInput__send.addEventListener('click', () => {
  //First checks if the input field is empty
  if(commentInput__message.value.length != 0) {
    //Adds the value of the input field to the corresponding post
    addComment(openID,commentInput__message.value);
    //Resets input field
    commentInput__message.value='';
    refreshContent();
  }
});

const clearContent = () => {
  //Resets content when back button is pressed
  commentWrapper.innerHTML='';
};

const refreshContent = () => {
  clearContent();
  loadComment(openID);
}