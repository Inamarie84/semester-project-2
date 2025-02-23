import { loginUser } from "../../../api/authApi.js";
import {
  validateEmail,
  validatePassword,
  validateField,
} from "../../../utils/validationUtils.js";
import { addToLocalStorage } from "../../../utils/storage.js";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
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

    alert("Login successful! Redirecting...");
    window.location.href = "/";
  } catch (error) {
    alert(error.message);
  }
}

loginForm.addEventListener("submit", onLoginFormSubmit);
