const passwordField = document.getElementById('password');
const toggleRevealPassword = document.getElementById('revealPassword');
const revealPasswordLabel = document.getElementById('revealPasswordLabel');

toggleRevealPassword.addEventListener('change', (event) => {
  if (event.target.checked) {
    passwordField.type = 'text';
    revealPasswordLabel.textContent = 'Hide password';
  } else {
    passwordField.type = 'password';
    revealPasswordLabel.textContent = 'Show password';
  }
});
