// import { AUTH_REGISTER_URL } from "../constants.js";

// const registerForm = document.querySelector("#register-form");
// const emailInput = document.querySelector("#email");
// const emailError = document.querySelector("#email-error");
// const passwordInput = document.querySelector("#password");
// const passwordError = document.querySelector("#password-error");

// async function registerUser(userDetails) {
//   try {
//     const fetchOptions = {
//       method: "POST",
//       body: JSON.stringify(userDetails),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await fetch(AUTH_REGISTER_URL, fetchOptions);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Registration failed.");
//     }

//     alert("Registration successful! You can now log in.");
//     window.location.href = "/auth/login.html"; // Redirect to login page
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

// function onRegisterFormSubmit(event) {
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

//   registerUser(formFields);
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

// registerForm.addEventListener("submit", onRegisterFormSubmit);

import { AUTH_REGISTER_URL } from "../constants.js";

const registerForm = document.querySelector("#register-form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(AUTH_REGISTER_URL, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      // Handle "Profile already exists" error
      if (data.errors && data.errors[0].message === "Profile already exists") {
        emailError.classList.remove("hidden");
        emailError.textContent = "This email is already registered."; // Custom error message for existing email
      } else {
        // Handle other errors
        throw new Error(data.message || "Registration failed.");
      }
      return; // Stop execution if there's an error
    }

    alert("Registration successful! You can now log in.");
    window.location.href = "/auth/login.html"; // Redirect to login page
  } catch (error) {
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

function onRegisterFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  let isValid = true;

  // Validate email
  if (!validateEmail(formFields.email)) {
    emailError.classList.remove("hidden");
    emailError.textContent = "Please enter a valid email."; // Custom message for invalid email format
    isValid = false;
  } else {
    emailError.classList.add("hidden");
  }

  // Validate password
  if (!validatePassword(formFields.password)) {
    passwordError.classList.remove("hidden");
    passwordError.textContent = "Password must be at least 8 characters."; // Custom message for password validation
    isValid = false;
  } else {
    passwordError.classList.add("hidden");
  }

  if (!isValid) return; // Stop form submission if validation fails

  registerUser(formFields);
}

// Live validation while typing
emailInput.addEventListener("input", () => {
  if (!validateEmail(emailInput.value)) {
    emailError.classList.remove("hidden");
    emailError.textContent = "Please enter a valid email."; // Custom message for invalid email format
  } else {
    emailError.classList.add("hidden");
  }
});

passwordInput.addEventListener("input", () => {
  if (!validatePassword(passwordInput.value)) {
    passwordError.classList.remove("hidden");
    passwordError.textContent = "Password must be at least 8 characters."; // Custom message for password validation
  } else {
    passwordError.classList.add("hidden");
  }
});

registerForm.addEventListener("submit", onRegisterFormSubmit);
