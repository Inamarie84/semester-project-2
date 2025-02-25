import { registerUser } from "../../../api/auth/fetchAuth.js";
import {
  validateEmail,
  validatePassword,
  validateField,
} from "../../../utils/auth/validationUtils.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";

const registerForm = document.querySelector("#register-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");

async function onRegisterFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  let isValid = true;

  isValid &= validateField(
    formFields.email,
    validateEmail,
    emailError,
    "Please enter a valid email.",
  );
  isValid &= validateField(
    formFields.password,
    validatePassword,
    passwordError,
    "Password must be at least 8 characters.",
  );

  if (!isValid) return;

  try {
    await registerUser(formFields);
    showMessage("success", "registrationSuccess");
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 2000);
  } catch (error) {
    showMessage("error", "registrationFailed");
  }
}

registerForm.addEventListener("submit", onRegisterFormSubmit);
