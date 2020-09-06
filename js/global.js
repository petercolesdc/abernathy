
// Tell our document that javascript is enabled
document.documentElement.className = 'js';

// Check to see if touchscreen and append body accordingly
// Note: This is not to be relied upon, it is intended as a
// general check for prototyping
if(window.matchMedia("(pointer: coarse)").matches) {
  document.querySelector('html').classList.add('touch');
} else {
  document.querySelector('html').classList.add('no-touch');
}

// Listen to tab events to enable outlines (accessibility improvement)
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);
