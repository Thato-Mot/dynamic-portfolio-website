// Array of theme names, including the new colorful themes
// const themes = [
//    'blue','burgundy', 'mint', 'light', 
//   'teal', 'purple', 'green', 'pink', 
//   'orange', 'fresh-green', 
//   'red', 'electric-blue', 'vibrant-purple', 
//   'yellow', 'cyan', 'lively-green'
// ];
const themes = [
  'blue', 
 'light',
];

let currentIndex = 0; // Start with the first theme

// Function to switch to the next theme
function switchTheme() {
  // Move to the next theme in the array
  currentIndex = (currentIndex + 1) % themes.length;
  const newTheme = themes[currentIndex];
  
  // Apply the new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Save the new theme to localStorage
}

// Function to reset to the default theme
function resetToDefaultTheme() {
  const defaultTheme = 'blue'; // Set your default theme here
  currentIndex = themes.indexOf(defaultTheme); // Find the index of the default theme
  document.documentElement.setAttribute('data-theme', defaultTheme);
  localStorage.setItem('theme', defaultTheme); // Save the default theme to localStorage
}

// Function to initialize the theme based on saved preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'blue'; // Default to 'burgundy'
  currentIndex = themes.indexOf(savedTheme); // Set the current index based on saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Event listener for keypress to toggle theme with 'T' key and reset with 'D' key
document.addEventListener('keydown', function(event) {
  if (event.key === 'T' || event.key === 't') { // Check if the pressed key is 'T'
    switchTheme();
  } else if (event.key === 'D' || event.key === 'd') { // Check if the pressed key is 'D'
    resetToDefaultTheme();
  }
});

// Load the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();

  // Add event listener to the theme switch button
  const themeSwitcherButton = document.getElementById('theme-switcher');
  if (themeSwitcherButton) {
    themeSwitcherButton.addEventListener('click', switchTheme);
  }
});
