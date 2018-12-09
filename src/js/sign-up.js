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

const usernameCheck = /[^a-zA-Z0-9-_]/;
const emailCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const signUpButton = document.getElementById('sign-up-btn');
const error = document.querySelector('.sign-up__form-error');
const errorMsg = document.querySelector('.sign-up__form-error > p');
let showingError = false;

const user  = document.getElementById('username');
const email = document.getElementById('email');
const pass  = document.getElementById('pass');
const pass2 = document.getElementById('confirmpass');

let isValid = {
  user: false,
  email: false,
  pass: false,
  pass2: false
}

// let inputs = {
//   user: false,
//   email: false,
//   pass: false,
//   pass2: false
// }

let inputsFilled = 0;

let checkDelay = null;

const toggleFadeScreen = () => {
  document.body.classList.toggle('screen-fade');
}

const toggleErrorMessage = () => {
  error.classList.toggle('error-hidden');
}
const showErrorMessage = (msg) => {
  hideErrorMessage();
  setTimeout(() => {
    showingError = true;
    errorMsg.innerText = msg;
    error.classList.remove('error-hidden');
  }, 300);
}
const hideErrorMessage = () => {
  showingError = false;
  error.classList.add('error-hidden');
}

const checkIsUsernameAvailable = (u) => {
  getJSON('GET', 'users/username-available/'+u, '', {}, 0)
  .then( res => {
    if (res.success) {
      if (res.available) {
        console.log('OK: username is ok and available - replace this with code!');
        isValid.user = true;
        checkIsFormValid();
      } else {
        console.log('ERROR: username is ok, but not available - replace this with code!');
        showErrorMessage("username already in use");
        isValid.user = false;
        checkIsFormValid();
      }
    } else {
      console.log('ERROR: ' + res.error ); //  - replace this with code!
      showErrorMessage(res.error);
      isValid.user = false;
      checkIsFormValid();
    }
  })
  .catch(err => {
    console.log(err);
    alert(err);
  });
  
};

const createProfile = (u,p,e) => {
  getJSON('POST', 'users/create-user-account', '', {username: u, password: p, email: e}, 0).then( (r) => {
    if ( r.success ) {
      if ( r.session ) {
        setCookie('pat_session_id', r.session_id );
        setCookie('pat_session_token', r.token );
        redirectTo('home');
      }
    } else {
      alertDialog ( r.error );
      toggleFadeScreen();
      checkIsFormValid();
    }
  });
};

const setInputFilledState = (length, inputName) => {
  if (length > 0 && inputs[inputName] == false) {
    inputs[inputName] = true;
    inputsFilled ++;
  } else if (length == 0 && inputs[inputName] == true) {
    console.log('removing one input count');
    inputs[inputName] = false;
    inputsFilled --;
  }
  console.log(`userFilled: ${inputs.user}\nemailFilled: ${inputs.email}\npassFilled: ${inputs.pass}\npass2Filled: ${inputs.pass2}`);
  console.log('inputsFilled: ', inputsFilled);
  if (inputsFilled == 4) {
    signUpButton.disabled = false;
  } else {
    signUpButton.disabled = true;
  }
}

const checkIsFormValid = () => {

  for (const key in isValid) {
    if (isValid[key] === false) {
      signUpButton.disabled = true;
      return;
    }
  }

  signUpButton.disabled = false;
}

const checkUsernameValidity = (value) => {

  if (value.length < 2) {
    showErrorMessage("username must be at least 2 characters long");
    isValid.user = false;
    checkIsFormValid();
    return;
  }
  if (usernameCheck.test(value)) {
    showErrorMessage("only ( a-z ), ( A-Z ),  ( - ),  ( _ )  allowed");
    isValid.user = false;
    checkIsFormValid();
    return;
  }
  checkIsUsernameAvailable(value);
}

const checkEmailValidity = (value) => {
  if (!emailCheck.test(value)) {
    showErrorMessage("invalid email");
    isValid.email = false;
  } else {
    isValid.email = true;
  }
}

user.addEventListener('input', () => {
  clearTimeout(checkDelay);
  //setInputFilledState(user.value.length, "user");
  
  if (showingError) hideErrorMessage();

  checkDelay = setTimeout(() => {
    if (user.value.length > 0) checkUsernameValidity(user.value);
  }, 500);

});

email.addEventListener('input', () => {
  clearTimeout(checkDelay);
  //setInputFilledState(email.value.length, "email");

  if (showingError) hideErrorMessage();

  checkDelay = setTimeout(() => {
    if (email.value.length > 0) checkEmailValidity(email.value);
    checkIsFormValid();
  }, 1200);
});

pass.addEventListener('input', () => {
  clearTimeout(checkDelay);
  //setInputFilledState(pass.value.length, "pass");

  if (showingError) hideErrorMessage();

  checkDelay = setTimeout(() => {

    if (pass.value.length > 0 && pass.value.length < 6) {
      showErrorMessage("password must be at least 6 characters long");
      isValid.pass = false;
    } else if (pass.value.length >= 6) {
      isValid.pass = true;
    }

    if (pass.value.length >= 6 && pass.value !== pass2.value && pass2.value.length !== 0) {
      console.log("main password not equal to confirm");
      isValid.pass2 = false;
      showErrorMessage("passwords don't match");
    } else if (pass.value === pass2.value) {
      isValid.pass2 = true;
    }

    checkIsFormValid();
  }, 1000);

});

pass2.addEventListener('input', () => {
  clearTimeout(checkDelay);
  //setInputFilledState(pass2.value.length, "pass2");

  if (showingError) hideErrorMessage();

  checkDelay = setTimeout(() => {
    if (pass2.value != pass.value) {
      showErrorMessage("passwords don't match");
      isValid.pass2 = false;
    } else if (pass2.value === pass.value) {
      isValid.pass2 = true;
    }
    checkIsFormValid();
  }, 1000);
});

document.getElementById('sign-up__form')
.addEventListener('submit', (e) => {
  e.preventDefault();
  signUpButton.disabled = true;
  toggleFadeScreen();
  createProfile(user.value, pass.value, email.value);
});