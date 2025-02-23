import { registerUser } from "../../../api/authApi.js";
import {
  validateEmail,
  validatePassword,
  validateField,
} from "../../../utils/validationUtils.js";

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

  // Validate email and password fields
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
    alert("Registration successful! You can now log in.");
    window.location.href = "/auth/login.html"; // Redirect to login page after successful registration
  } catch (error) {
    alert(error.message);
  }
}

registerForm.addEventListener("submit", onRegisterFormSubmit);
