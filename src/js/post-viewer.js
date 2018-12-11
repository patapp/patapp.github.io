'use strict';

const modals = document.querySelectorAll('.modal-container');

if ( modals.length > 0 ) {
  modals.forEach((i) => {
    i.addEventListener('click', (e) => {
      i.classList.add('hide');
    });
    const contentArea = document.querySelector('.modal-container .modal-content');
    contentArea.addEventListener('click', (e) => {
      i.classList.add('hide');
      e.preventDefault();
      e.stopPropagation();
    });
  });
}

const showMediaPopup = (id) => {
  
  const container = document.getElementById('post-viewer-media');
  container.background = 'url(none) #eeeeee';
  container.innerHTML = '';
  
  const popup = document.getElementById('post-viewer');
  popup.classList.remove('hide');

  getJSON('POST','posts/getcontent', '', {items: id} ).then( (res) => {
    console.log(res);
    if ( res.success == true && res.posts_count == 1 ) {
        container.innerHTML = '';
        container.style.backgroundColor = `#${res.post_data[id].color}`;


      if ( res.post_data[id].media_type == 'v' ) {
          const src = API_URL + res.post_data[id].url;
          const vid  = document.createElement('VIDEO');
          const sou  = document.createElement('SOURCE');
          sou.src = API_URL + res.post_data[id].url ;
          vid.autoplay = true;
          vid.loop = false;
          vid.muted = true;
          vid.controls = true;
          vid.appendChild(sou);
          container.appendChild(vid);
          
          //container.innerHTML = '<video style="height:100%;width:100%;><source src="' + src + '"></video>';
          
          
      }else{
        container.style.background = `#${res.post_data[id].color} url(${API_URL + res.post_data[id].url})`;
        container.style.backgroundSize = 'contain';
        container.style.backgroundPosition = 'center center';
        container.style.backgroundRepeat = 'no-repeat';
        
      }
    }
  });
  
}; 