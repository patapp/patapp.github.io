'use strict';

const followBtn = document.querySelector('.follow-btn');
const followBtnText = document.querySelector('.follow-btn-text > span');
const followBtnIc = document.querySelector('.follow-btn__check-ic');

const toggleFollowButtonStyle = () => {
    followBtnIc.classList.toggle('hidden');
    followBtn.classList.toggle('btn-following');
    followBtnText.classList.toggle('text-following');
    followBtnText.innerHTML = (followBtnText.innerHTML == "FOLLOW" ? "FOLLOWING":"FOLLOW");
}

followBtn.addEventListener('click', () => {
    toggleFollowButtonStyle();
});