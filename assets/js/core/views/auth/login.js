import { loginUser } from "../../../api/auth/fetchAuth.js";
import {
  validateEmail,
  validatePassword,
  validateField,
} from "../../../utils/auth/validationUtils.js";
import { addToLocalStorage } from "../../../utils/storage/storage.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";

const loginForm = document.querySelector("#login-form");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");

async function onLoginFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  let isValid = true;

  isValid &= validateField(
    formFields.email,
    validateEmail,
    emailError,
    "Invalid email format.",
  );
  isValid &= validateField(
    formFields.password,
    validatePassword,
    passwordError,
    "Password must be at least 8 characters.",
  );

  if (!isValid) return;

  try {
    const { accessToken, name: username } = await loginUser(formFields);
    addToLocalStorage("accessToken", accessToken);
    addToLocalStorage("username", username);

    showMessage("success", "login was successfull!");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch {
    showMessage(
      "error",
      "There was an error login in - please check your details!",
    );
  }
}

loginForm.addEventListener("submit", onLoginFormSubmit);
