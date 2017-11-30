/**
 * Creates KeyboardController
 *
 * Controller can check if key is pressed or not
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

  const keyStates = {};

  window.addEventListener('keydown', (event) => {
    keyStates[keyCodes[event.keyCode]] = true;
  });

  window.addEventListener('keyup', (event) => {
    keyStates[keyCodes[event.keyCode]] = false;
  });

  const isKeyPressed = keyName => !!keyStates[keyName];

  return {
    isKeyPressed,
  };
}
