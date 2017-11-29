/**
 * Creates ScreenSizeController
 *
 * Controller allows us to subscribe for screen size changes
 *
 * screenSize is the size of web page in pixels
 * */
export default function createScreenSizeController() {
  const subscribers = [];
  let screenSize;
  const getScreenSize = () => screenSize;

  const subscribe = (callback) => {
    subscribers.push(callback);
  };

  function setScreenSize() {
    screenSize = {
      x: window.innerWidth,
      y: window.innerHeight,
    };
  }

  setScreenSize();

  window.addEventListener('resize', () => {
    setScreenSize();
    subscribers.forEach(cb => cb());
  });


  return {
    getScreenSize,
    subscribe,
  };
}