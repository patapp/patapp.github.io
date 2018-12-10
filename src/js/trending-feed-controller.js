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


const postElement = `
<li class="post" id="{id}">
            
    <div class="post-header">
        <div class="post-header__picture"></div>
        <div class="post-header__username"></div>
    </div>

    <div class="post-media"></div>

    <!-- TODO: add rating graphic -->

    <div class="post-info">
        <div class="post-info__tags"></div>
        <div class="post-info__description"></div>
        <div class="post-info__comments"></div>
                
        <div class="post-info__timestamp">
            <p></p><span></span>
        </div>

    </div>

</li>
`;

