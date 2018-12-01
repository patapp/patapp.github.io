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


let topTagsArr = ['cat', 'dog', 'funny', 'cute', 'meme', 'pat-post', 'pat-app', 'doggo', 'catto', 'doge', 'boop'];
let currentTagsArr = [];
const tagDelimiters = [' ', ',', '.'];

const tagsParent     = document.querySelector('new-post-form__tags-input');

const fileInput      = document.getElementById('media');
const mediaElement   = document.querySelector('.new-post-form__add-media');
const description    = document.getElementById('new-post-description');

const currentTags    = document.getElementById('current-tags');
const tagsInput      = document.getElementById('new-post-tags');
const topTagsSection = document.querySelector('.new-post-form__tags-input__top-tags');
const topTagsList    = document.getElementById('top-tags');

let topTagsExpanded = false;

const newTag = (value, topTag = false) => {
	const li = document.createElement('li');
	li.classList.add('new-post-tag');
	li.innerHTML = value;
	if (topTag) {
		li.addEventListener('click', () => {
			tagsInput.focus();
			addNewCurrentTag(li.innerHTML);
		});
	}
	return li;
}

const addNewCurrentTag = (tag = null) => {
	let tagVal = tag;

	if (tagVal === null) {
		const inputVal = tagsInput.value;
		if (inputVal === " " || inputVal === "," || inputVal === ".") { 
			return; 
		}

		tagVal = inputVal.substring(0, inputVal.length-1);
	}

	if (isCurrentTag(tagVal)) return;

	currentTagsArr.push(tagVal);
	currentTags.insertBefore(newTag(tagVal), currentTags.children[currentTags.childElementCount-1]);
	toggleTopTag(tagVal);
}

const removeCurrentTag = () => {
	currentTags.removeChild(currentTags.childNodes[currentTagsArr.length]);
	const removedTag = currentTagsArr.pop();
	toggleTopTag(removedTag);
}


const toggleTopTag = (tagValue) => {
	const i = topTagsArr.indexOf(tagValue);
	if (i !== -1) {
		topTagsList.children[i].classList.toggle('new-post-tag-hidden');
	}
}

const isCurrentTag = (tag) => {
	const index = currentTagsArr.indexOf(tag);
	if (index === -1) {
		return false;
	} else {
		return true;
	}
}



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

tagsInput.addEventListener('focus', () => {
	if (topTagsExpanded === false) {
		topTagsSection.classList.toggle('top-tags-hidden');
		topTagsExpanded = true;
	}
});

tagsInput.addEventListener('blur', () => {
	if(topTagsExpanded === true) {
		topTagsSection.classList.toggle('top-tags-hidden');
		topTagsExpanded = false;
	}
});

tagsInput.addEventListener('input', (e) => {
	tagDelimiters.forEach(element => {
		if (e.data === element) {
			addNewCurrentTag();
			tagsInput.value = "";
		}
	});
});

tagsInput.addEventListener('keyup', (e) => {

	if (e.keyCode === 8 && tagsInput.value === "" && currentTagsArr.length > 0) {
		console.log('removing last tag...');
		removeCurrentTag();
	}

});


description.addEventListener('input', () => {
	description.style.height = "10px";
	description.style.height = (description.scrollHeight)+"px";
});

topTagsArr.forEach(element => {
	topTagsList.appendChild(newTag(element, true));
});