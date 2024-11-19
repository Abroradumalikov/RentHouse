const form = document.querySelector("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastName");
const userNameInput = document.getElementById("userName");
const inputUserPassword = document.getElementById("userPassword");
const errorFirst = document.getElementById("errorFirst");
const errorLast = document.getElementById("errorLast");
const errorName = document.getElementById("errorName");
const errorPassword = document.getElementById("errorPassword");
const loading = document.querySelector(".loaderbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.classList.add("loaderbox-block");

  const isValidUserName = validateUserName();
  const isValidPassword = validateUserPassword();
  const isValidFirstName = validateFirstName();
  const isvalidLastName = validateLastName();

  if (
    isValidUserName &&
    isValidPassword &&
    isValidFirstName &&
    isvalidLastName
  ) {
    window.location.href = "./index.html";
  } else {
    loading.classList.remove("loaderbox-block");
  }
});

firstName.addEventListener("input", () => {
  validateFirstName();
});

function validateFirstName() {
  const firstNameValue = firstName.value.trim();
  if (!firstNameValue) {
    errorFirst.style.display = "none";
    return false;
  } else if (firstNameValue.length < 2 || firstNameValue.length > 15) {
    errorFirst.style.display = "block";
    errorFirst.textContent = "Username must be between 2 and 15 characters.";
    return false;
  } else if (!/[A-Z]/.test(firstNameValue)) {
    errorFirst.style.display = "block";
    errorFirst.textContent =
      "Username must contain at least one uppercase letter.";
    return false;
  } else {
    errorFirst.style.display = "none";
    return true;
  }
}

lastName.addEventListener("input", () => {
  validateLastName();
});

function validateLastName() {
  const lastNameValue = lastName.value.trim();
  if (!lastNameValue) {
    errorLast.style.display = "none";
    return false;
  } else if (lastNameValue.length < 4 || lastNameValue.length > 20) {
    errorLast.style.display = "block";
    errorLast.textContent = "Username must be between 4 and 20 characters.";
    return false;
  } else if (!/[A-Z]/.test(lastNameValue)) {
    errorLast.style.display = "block";
    errorLast.textContent =
      "Username must contain at least one uppercase letter.";
    return false;
  } else {
    errorLast.style.display = "none";
    return true;
  }
}

userNameInput.addEventListener("input", () => {
  validateUserName();
});

function validateUserName() {
  const inputValue = userNameInput.value.trim();

  if (!inputValue) {
    errorName.style.display = "none";
    return false;
  } else if (inputValue.length < 3 || inputValue.length > 30) {
    errorName.style.display = "block";
    errorName.textContent = "Username must be between 3 and 30 characters.";
    return false;
  } else {
    errorName.style.display = "none";
    return true;
  }
}

inputUserPassword.addEventListener("input", () => {
  validateUserPassword();
});

function validateUserPassword() {
  const passwordValue = inputUserPassword.value.trim();

  if (!passwordValue) {
    errorPassword.style.display = "none";
    return false;
  } else if (passwordValue.length < 6 || passwordValue.length > 10) {
    errorPassword.style.display = "block";
    errorPassword.textContent = "Password must be between 6 and 10 characters.";
    return false;
  } else if (!/[A-Z]/.test(passwordValue)) {
    errorPassword.style.display = "block";
    errorPassword.textContent =
      "Password must contain at least one uppercase letter.";
    return false;
  } else if (!/[a-z]/.test(passwordValue)) {
    errorPassword.style.display = "block";
    errorPassword.textContent =
      "Password must contain at least one lowercase letter.";
    return false;
  } else {
    errorPassword.style.display = "none";
    return true;
  }
}
