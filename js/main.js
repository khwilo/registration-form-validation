const passwordField = document.getElementById('password');
const toggleRevealPassword = document.getElementById('revealPassword');
const revealPasswordLabel = document.getElementById('revealPasswordLabel');

toggleRevealPassword.addEventListener('change', (event) => {
  if (event.target.checked) {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
});
