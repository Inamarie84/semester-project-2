// import { AUTH_LOGIN_URL } from "../../api/constants.js";
// import { addToLocalStorage } from "../../utils/storage.js";

// const loginForm = document.querySelector("#login-form");
// const emailInput = document.querySelector("#email");
// const emailError = document.querySelector("#email-error");
// const passwordInput = document.querySelector("#password");
// const passwordError = document.querySelector("#password-error");

// async function loginUser(userDetails) {
//   try {
//     const fetchOptions = {
//       method: "POST",
//       body: JSON.stringify(userDetails),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
//     const json = await response.json();

//     if (!response.ok) {
//       throw new Error(json.message || "Login failed.");
//     }

//     const accessToken = json.data.accessToken;
//     addToLocalStorage("accessToken", accessToken);

//     alert("Login successful! Redirecting...");
//     window.location.href = "/"; // Redirect to dashboard
//   } catch (error) {
//     alert(error.message);
//   }
// }

// function validateEmail(email) {
//   const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
//   return emailPattern.test(email);
// }

// function validatePassword(password) {
//   return password.length >= 8;
// }

// function onLoginFormSubmit(event) {
//   event.preventDefault();

//   const formData = new FormData(event.target);
//   const formFields = Object.fromEntries(formData);

//   let isValid = true;

//   // Validate email
//   if (!validateEmail(formFields.email)) {
//     emailError.classList.remove("hidden");
//     isValid = false;
//   } else {
//     emailError.classList.add("hidden");
//   }

//   // Validate password
//   if (!validatePassword(formFields.password)) {
//     passwordError.classList.remove("hidden");
//     isValid = false;
//   } else {
//     passwordError.classList.add("hidden");
//   }

//   if (!isValid) return; // Stop form submission if validation fails

//   loginUser(formFields);
// }

// // Live validation while typing
// emailInput.addEventListener("input", () => {
//   if (!validateEmail(emailInput.value)) {
//     emailError.classList.remove("hidden");
//   } else {
//     emailError.classList.add("hidden");
//   }
// });

// passwordInput.addEventListener("input", () => {
//   if (!validatePassword(passwordInput.value)) {
//     passwordError.classList.remove("hidden");
//   } else {
//     passwordError.classList.add("hidden");
//   }
// });

// loginForm.addEventListener("submit", onLoginFormSubmit);

import { AUTH_LOGIN_URL } from "../../api/constants.js";
import { addToLocalStorage } from "../../utils/storage.js";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

async function loginUser(userDetails) {
  try {
    console.log("Attempting to log in with user details:", userDetails); // Log the user details

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
    const json = await response.json();

    console.log("Response from server:", json); // Log the server response

    if (!response.ok) {
      throw new Error(json.message || "Login failed.");
    }

    const accessToken = json.data.accessToken;
    console.log("Access token received:", accessToken); // Log the access token

    addToLocalStorage("accessToken", accessToken);

    alert("Login successful! Redirecting...");
    console.log("Redirecting to dashboard..."); // Log before redirect
    window.location.href = "/"; // Redirect to dashboard
  } catch (error) {
    console.error("Login error:", error); // Log error message
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
  console.log("Form submitted"); // Log form submission

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  console.log("Form data:", formFields); // Log form data

  let isValid = true;

  // Validate email
  if (!validateEmail(formFields.email)) {
    console.log("Invalid email:", formFields.email); // Log invalid email
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    console.log("Valid email:", formFields.email); // Log valid email
    emailError.classList.add("hidden");
  }

  // Validate password
  if (!validatePassword(formFields.password)) {
    console.log("Invalid password:", formFields.password); // Log invalid password
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    console.log("Valid password"); // Log valid password
    passwordError.classList.add("hidden");
  }

  if (!isValid) return; // Stop form submission if validation fails

  console.log("Form is valid, proceeding with login...");
  loginUser(formFields);
}

// Live validation while typing
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
