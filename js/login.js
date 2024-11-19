const form = document.querySelector("form");
const userNameInput = document.getElementById("userName");
const inputUserPassword = document.getElementById("userPassword");
const errorName = document.getElementById("errorName");
const errorPassword = document.getElementById("errorPassword");
const loading = document.querySelector(".loaderbox");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.classList.add("loaderbox-block");
  const isValidUserName = validateUserName();
  const isValidPassword = validateUserPassword();

  if (isValidUserName && isValidPassword) {
    window.location.href = "./index.html";
  } else {
    loading.classList.remove("loaderbox-block");
  }
});

userNameInput.addEventListener("input", () => {
  validateUserName();
});

inputUserPassword.addEventListener("input", () => {
  validateUserPassword();
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
