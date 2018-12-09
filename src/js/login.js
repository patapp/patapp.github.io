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

const loginButton = document.getElementById('login-btn');
const error = document.querySelector('.sign-up__form-error');
const errorMsg = document.querySelector('.sign-up__form-error > p');

const user = document.getElementById('username');
const pass = document.getElementById('pass');

const enableButton = () => {
  loginButton.disabled = false;
}
const disableButton = () => {
  loginButton.disabled = true;
}

const toggleFadeScreen = () => {
  document.body.classList.toggle('screen-fade');
}

const showErrorMessage = (msg) => {
  hideErrorMessage();
  setTimeout(() => {
    errorMsg.innerText = msg;
    error.classList.remove('error-hidden');
  }, 300);
}
const hideErrorMessage = () => {
  error.classList.add('error-hidden');
}

const logIn = async (u,p) => {
  conLog({function : 'logIn'});
  return new Promise((resolve, reject) => {
    const dataObject = {username: u, password: p};
    const j = getJSON('POST', 'session/login', '', dataObject, 0).then( (r) => {
      if ( r.success ) {
        sessionExists = true;
        sessionID = r.session_id;
        sessionToken = r.token;
        conLog('[LOGIN] Success!');
        setCookie ( 'pat_session_id', sessionID, 60 );
        setCookie ( 'pat_session_token', sessionToken, 60 );
      }
      conLog({f : 'logIn', 'finished' : 'TRUE', 'response' : 'FAILED'});
      resolve(r);
    });
  });
}

const checkForm = () => {
  if (user.value.length > 0 && pass.value.length > 0) {
    enableButton()
  } else {
    disableButton()
  }
}

user.addEventListener('input', () => {
  checkForm()
});

pass.addEventListener('input', () => {
  checkForm();
});

document.getElementById('formLogin')
.addEventListener('submit', (e) => {
  e.preventDefault();
  
  toggleFadeScreen();
  disableButton()

  setTimeout(() => {
    
  }, 2000);

  logIn(user, pass)
  .then( res => {
    if ( res.success == 1 ) {
      // we've logged in successfully
      window.location.href = '../home/';
    } else {
      if ( res.success == 0 ) {
        alert ( res.error );
        toggleFadeScreen();
        showErrorMessage(res.error);
        enableButton();
      } else {
        toggleFadeScreen();
        showErrorMessage("Unknown error 🤷‍♂️");
        enableButton();
      }
    }
  });

});
