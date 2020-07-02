
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
