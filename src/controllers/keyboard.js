/**
 * Creates KeyboardController
 *
 * Example of usage: keyboardController.isKeyPressed('A')
 * */
export default function createKeyboardController() {
  const keyCodes = {
    87: 'W',
    65: 'A',
    83: 'S',
    68: 'D',
  };

  const states = {};

  window.addEventListener('keydown', function(event) {
    states[keyCodes[event.keyCode]] = true;
  });

  window.addEventListener('keyup', function(event) {
    states[keyCodes[event.keyCode]] = false;
  });

  const isKeyPressed = (keyName) => !!states[keyName];

  return {
    isKeyPressed,
  };
}