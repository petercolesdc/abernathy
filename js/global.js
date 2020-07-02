
// Tell our document that javascript is enabled
document.documentElement.className = 'js';

// Check to see if touchscreen and append body accordingly
if(window.matchMedia("(pointer: coarse)").matches) {
  document.querySelector('html').classList.add('touch');
} else {
  document.querySelector('html').classList.add('no-touch');
}
