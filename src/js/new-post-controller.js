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

const submitNewPost  = document.getElementById('submit-new-post');

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
		
		if (mediaElement.children[1] !== undefined) {
			mediaElement.removeChild(mediaElement.children[1]);
		} else {
			mediaElement.children[0].classList.toggle('hidden');
		}
		
		console.log("Media file type: ", fileInput.files[0].type);
		
		submitNewPost.disabled = false;
		
		//mediaElement.removeChild(mediaElement.children[0]);
		
		const reader = new FileReader();
		
		let selectedMedia = null;
		
		switch (fileInput.files[0].type) {
			case "image/jpeg":
				selectedMedia = document.createElement('img');
				
				reader.onload = (file) => selectedMedia.setAttribute('src', file.target.result);
				reader.readAsDataURL(fileInput.files[0]);
			break;
			
			case "video/mp4":
				selectedMedia = document.createElement('video');
				selectedMedia.autoplay = true;
				selectedMedia.muted = true;
				selectedMedia.loop = true;
				
				reader.onload = (file) => selectedMedia.setAttribute('src', file.target.result);
				reader.readAsDataURL(fileInput.files[0]);
			break;
			
			default:
			return;
			break;
		}
		
		mediaElement.appendChild(selectedMedia);
		mediaElement.style.height = '100%';
		mediaElement.children[1].classList.add('media-preview');
		
	} else {
		
		submitNewPost.disabled = true;
		
		mediaElement.removeChild(mediaElement.children[1]);
		mediaElement.children[0].classList.toggle('hidden');
		mediaElement.style.height = "100vw";
		
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

tagsInput.addEventListener('input', (file) => {
	tagDelimiters.forEach(element => {
		if (file.data === element) {
			addNewCurrentTag();
			tagsInput.value = "";
		}
	});
});

tagsInput.addEventListener('keyup', (file) => {
	
	if (file.keyCode === 8 && tagsInput.value === "" && currentTagsArr.length > 0) {
		console.log('removing last tag...');
		removeCurrentTag();
	}
	
});

topTagsList.addEventListener('click', () => {
	tagsInput.focus();
});

currentTags.addEventListener('click', () => {
	tagsInput.focus();
})

description.addEventListener('input', () => {
	description.style.height = "10px";
	description.style.height = (description.scrollHeight)+"px";
});

topTagsArr.forEach(element => {
	topTagsList.appendChild(newTag(element, true));
});
