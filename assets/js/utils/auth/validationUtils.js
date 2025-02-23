// Utility functions for form validation
export function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailPattern.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateField(
  value,
  validationFunc,
  errorElement,
  errorMessage,
) {
  if (!validationFunc(value)) {
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("hidden");
    return false;
  }
  errorElement.classList.add("hidden");
  return true;
}
