import { AUTH_LOGIN_URL } from "../../api/constants.js";
import { addToLocalStorage } from "../../utils/storage.js";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

//add more errorhandling

async function loginUser(userDetails) {
  try {
    console.log("Attempting to log in with user details:", userDetails);

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
    const json = await response.json();

    console.log("Response from server:", json);

    if (!response.ok) {
      throw new Error(json.message || "Login failed.");
    }

    const accessToken = json.data.accessToken;
    const username = json.data.name;

    console.log("Access token received:", accessToken);
    console.log("Username received:", username);

    addToLocalStorage("accessToken", accessToken);
    addToLocalStorage("username", username);

    alert("Login successful! Redirecting...");
    console.log("Redirecting to dashboard...");
    window.location.href = "/";
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function onLoginFormSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  console.log("Form data:", formFields);

  let isValid = true;

  if (!validateEmail(formFields.email)) {
    console.log("Invalid email:", formFields.email);
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    console.log("Valid email:", formFields.email);
    emailError.classList.add("hidden");
  }

  if (!validatePassword(formFields.password)) {
    console.log("Invalid password:", formFields.password);
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    console.log("Valid password");
    passwordError.classList.add("hidden");
  }

  if (!isValid) return;

  console.log("Form is valid, proceeding with login...");
  loginUser(formFields);
}

emailInput.addEventListener("input", () => {
  if (!validateEmail(emailInput.value)) {
    emailError.classList.remove("hidden");
  } else {
    emailError.classList.add("hidden");
  }
});

passwordInput.addEventListener("input", () => {
  if (!validatePassword(passwordInput.value)) {
    passwordError.classList.remove("hidden");
  } else {
    passwordError.classList.add("hidden");
  }
});

loginForm.addEventListener("submit", onLoginFormSubmit);
