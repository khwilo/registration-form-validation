const form = document.querySelector('.form__validate');

const passwordField = document.getElementById('password');
const toggleRevealPassword = document.getElementById('revealPassword');
const revealPasswordLabel = document.getElementById('revealPasswordLabel');

form.setAttribute('novalidate', true); // Disable native form validation

const hasError = (field) => {
  let errorMessage = 'The value you entered for this field is invalid';
  // Don't validate submit and checkbox inputs

  if (field.type === 'submit' || field.type === 'checkbox') return;

  // Get the validity
  const validity = field.validity;

  // If valid, return null
  if (validity.valid) {
    errorMessage = null;
  }

  // Field is empty but required
  if (validity.valueMissing) {
    errorMessage = 'Please fill out this field';
  }

  // Entered field value is of incorrect type. E.g email / url
  if (validity.typeMismatch) {
    if (field.type === 'email') {
      errorMessage = 'Please enter an email address';
    }
  }

  // Entered field value is shorter than the specified length
  if (validity.tooShort) {
    errorMessage = `Please lengthen this text to ${field.getAttribute('minlength')} or more characters.`;
  }

  // Entered value does not match pattern
  if (validity.patternMismatch) {
    if (field.hasAttribute('title')) {
      errorMessage = field.getAttribute('title');
    } else {
      errorMessage = 'Please match the requested format';
    }
  }

  return errorMessage;
};

const displayError = (field, error) => {
  // Add invalid class from the field
  field.classList.add('invalid');

  // Get the field id or name
  const id = field.id || field.name;
  if (!id) return;

  // Get the error message field
  let errorField = field.form.querySelector(`.field-error#error-for-${id}`);
  if (!errorField) {
    errorField = document.createElement('div');
    errorField.className = 'field-error';
    errorField.id = `error-for-${id}`;
    field.parentNode.insertBefore(errorField, field.previousSibling);
  }

  // Associate the error message with the field
  field.setAttribute('aria-describedby', `error-for-${id}`);

  // Update error message
  errorField.innerHTML = `
    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    <span class="field-error__name">${error}</span>
  `;

  // Show the error message
  errorField.style.display = 'block';
  errorField.style.visibility = 'visible';
};

const removeError = (field) => {
  // Remove invalid class from the field
  field.classList.remove('invalid');

  // Remove ARIA role form the field
  field.removeAttribute('aria-describedby');

  // Get field id or name
  const id = field.id || field.name;
  if (!id) return;

  // Check if the error message field is in the DOM
  const errorField = field.form.querySelector(`.field-error#error-for-${id}`);
  if (!errorField) return;

  // If the error message exists, hide it
  errorField.innerHTML = '';
  errorField.style.display = 'none';
  errorField.style.visibility = 'hidden';
};

document.addEventListener('blur', (event) => {

  // If the form is not to be validated don't run
  if (!event.target.form.classList.contains('form__validate')) return;

  // Validate the field
  const error = hasError(event.target);
  console.log(error);

  if (error) {
    displayError(event.target, error);
  } else {
    removeError(event.target);
  }

}, true);

toggleRevealPassword.addEventListener('change', (event) => {
  if (event.target.checked) {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
});

// Check all fields on submit
document.addEventListener('submit', (event) => {
  // If the forms has not been flagged for validation, don't run
  if (!event.target.classList.contains('form__validate')) return;

  const fields = event.target.elements;

  // Validate each field
  let error;
  let hasErrors;
  for (let i = 0; i < fields.length; i += 1) {
    error = hasError(fields[i]);
    if (error) {
      displayError(fields[i], error);
      if (!hasErrors) {
        hasErrors = fields[i];
      }
    }
  }

  // If there are errors, don't submit form and focus on first element with error
  if (hasErrors) {
    event.preventDefault();
    hasErrors.focus();
  }

}, false);
