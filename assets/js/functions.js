// functions.js

document.addEventListener('DOMContentLoaded', function () {
  const modeToggle = document.getElementById('mode-toggle');

  // Check if dark mode is saved in localStorage
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Add event listener to the toggle button
  modeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Save the current mode in localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});