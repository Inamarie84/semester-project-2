import { AUTH_REGISTER_URL } from "../../api/constants.js";

const registerForm = document.querySelector("#register-form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

async function registerUser(userDetails) {
  try {
    const response = await fetch(AUTH_REGISTER_URL, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors?.length) {
        emailError.textContent =
          data.errors[0].message === "Profile already exists"
            ? "This email is already registered."
            : "Registration failed.";
        emailError.classList.remove("hidden");
      } else {
        alert("Registration failed. Please try again.");
      }
      return;
    }
    alert("Registration successful! You can now log in.");
    window.location.href = "/auth/login.html";
  } catch (error) {
    alert(error.message);
  }
}

function validateEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function onRegisterFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  if (!validateEmail(formFields.email)) {
    emailError.textContent = "Please enter a valid email.";
    emailError.classList.remove("hidden");
    return;
  }
  emailError.classList.add("hidden");
  if (!validatePassword(formFields.password)) {
    passwordError.textContent = "Password must be at least 8 characters.";
    passwordError.classList.remove("hidden");
    return;
  }
  passwordError.classList.add("hidden");
  registerUser(formFields);
}

emailInput.addEventListener("input", () => {
  emailError.classList.toggle("hidden", validateEmail(emailInput.value));
});
passwordInput.addEventListener("input", () => {
  passwordError.classList.toggle(
    "hidden",
    validatePassword(passwordInput.value),
  );
});
registerForm.addEventListener("submit", onRegisterFormSubmit);
