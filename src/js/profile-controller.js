'use strict';

const followBtn = document.querySelector('.follow-btn');
const followBtnText = document.querySelector('.follow-btn-text > span');
const followBtnIc = document.querySelector('.follow-btn__check-ic');

const profilePicInput = document.getElementById('new-profile-pic');
const profilePic = document.querySelector('.profile-tab__pic');
const addPicElement = document.querySelector('.profile-tab__change-pic');
const bio = document.querySelector('.proflie-tab__bio > p');
let currentBio = bio.innerText;

// const toggleFollowButtonStyle = () => {
//     followBtnIc.classList.toggle('hidden');
//     followBtn.classList.toggle('btn-following');
//     followBtnText.classList.toggle('text-following');
//     followBtnText.innerHTML = (followBtnText.innerHTML == "FOLLOW" ? "FOLLOWING":"FOLLOW");
// }

// followBtn.addEventListener('click', () => {
//     toggleFollowButtonStyle();
// });

const enableProfieEditing = () => {
    addPicElement.classList.remove('hidden');
    bio.contentEditable = true;
    bio.focus();
}

const disableProfieEditing = () => {
    addPicElement.classList.add('hidden');
    bio.contentEditable = false
}

const updateProfileInfo = () => {
    
    if (currentBio !== bio.innerText || profilePicInput.files[0]) {
        console.log("Profile info changed...");
        const data = new FormData();
        if (profilePicInput.files[0]) {
            console.log('New profile pic');

            data.append('upload_file', profilePicInput.files[0]);

            profilePicInput.value = "";
        }
        if (currentBio !== bio.innerText) {
            console.log('New bio');

            data.append('description', bio.innerText);

            currentBio = bio.innerText;
        }
        data.append( 'session_id', sessionID );
        data.append( 'session_token', sessionToken );
        
        const options = { method: 'PATCH', "Content-Type": "application/x-www-form-urlencoded", body: data };
        
        fetch(API_URL + 'users', options).then( res => {
            return res.json();
        }).then((json) => {
            console.log(json);
        });
        
    } else {
        console.log('No changes to profile');
    }

}

profilePicInput.addEventListener('change', () => {
    console.log('Adding new image to profile');
    profilePic.style.backgroundImage = `url(${URL.createObjectURL(profilePicInput.files[0])})`;
});