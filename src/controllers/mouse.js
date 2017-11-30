/**
 * Creates MouseController
 *
 * Controller allows us to subscribe for mouse position changes and mouse clicks
 *
 * here mouseCoordinates - dx and dy in pixels between top left corner of page and mouse
 * */
export default function createMouseController() {
  const mouseCoordinates = {
    x: 0,
    y: 0,
  };

  const moveSubscribers = [];
  const clickSubscribers = [];

  let isMouseDown = false;

  const subscribeForMouseMove = (callback) => {
    moveSubscribers.push(callback);
  };

  const subscribeForMouseClick = (callback) => {
    clickSubscribers.push(callback);
  };

  const getMouseCoordinates = () => ({ ...mouseCoordinates });
  const getIsMouseDown = () => isMouseDown;

  function setMouseCoordinates(event) {
    mouseCoordinates.x = event.clientX;
    mouseCoordinates.y = event.clientY;
  }

  function handleMouseMove(event) {
    setMouseCoordinates(event);
    moveSubscribers.forEach(cb => cb());
  }

  function handleMouseDown() {
    isMouseDown = true;
    clickSubscribers.forEach(cb => cb());
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('mousemove', handleMouseMove);

  return {
    getMouseCoordinates,
    getIsMouseDown,
    subscribeForMouseMove,
    subscribeForMouseClick,
  };
}
