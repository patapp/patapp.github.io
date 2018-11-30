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

const fileInput    = document.getElementById('media');
const mediaElement = document.querySelector('.new-post-form__add-media');
const description  = document.getElementById('new-post-description');

fileInput.addEventListener('change', () => {
    
    if (fileInput.files && fileInput.files[0]) {
        
        mediaElement.removeChild(mediaElement.children[0]);
        const img = document.createElement('img');

        const reader = new FileReader();
        reader.onload = (e) => img.setAttribute('src', e.target.result);
        reader.readAsDataURL(fileInput.files[0]);
        
        mediaElement.appendChild(img);
        mediaElement.style.height = '100%';
        mediaElement.children[0].classList.add('media-preview');
    }

});

description.addEventListener('input', () => {
    description.style.height = "10px";
    description.style.height = (description.scrollHeight)+"px";
});