/**
 * Creates ScreenSizeController
 *
 * Controller allows us to subscribe for screen size changes
 * */
export default function createScreenSizeController() {
  const subscribers = [];
  let screenSize = getCurrentScreenSize();
  const getScreenSize = () => screenSize;

  const subscribe = (callback) => {
    subscribers.push(callback);
  };

  function getCurrentScreenSize() {
    return {
      x: window.innerWidth,
      y: window.innerHeight,
    };
  }

  window.addEventListener('resize', () => {
    screenSize = getCurrentScreenSize();
    subscribers.forEach(cb => cb());
  });


  return {
    getScreenSize,
    subscribe,
  };
}