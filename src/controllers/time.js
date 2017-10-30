/**
 * Creates TimeController
 *
 * Controller allows us to iterate time in game loop
 * */
export default function createTimeController() {
  let currentTime;
  let lastTime;
  let deltaTime;
  let gameTime;

  const start = () => {
    lastTime = new Date().getTime();
    gameTime = 0;
  };

  const makeTimeIteration = () => {
    currentTime = new Date().getTime();
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    gameTime += deltaTime;
  };

  const getDeltaTime = () => deltaTime;
  const getCurrentTime = () => new Date().getTime();
  const getGameTime = () => gameTime;

  return {
    start,
    makeTimeIteration,
    getDeltaTime,
    getCurrentTime,
    getGameTime,
  };
}
