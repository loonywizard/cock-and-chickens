/*
* Returns random Integer between min and max
* */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/*
* Returns random Float between min and max
* */
export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

/*
* Returns random angle between left bottom corner and right bottom corner of screen
*
* dy is distance between entity position and bottom of the canvas
* leftDx is distance between entity position and left side of the canvas
* rightDx is distance between entity position and right side of the canvas
*
* We need to find left and right angles
* random angle - is random angle between left and right angles
* */
export function getRandomAngle(position, canvasSize) {
  const dy = canvasSize.y - position.y;
  const leftDx = position.x - 20;
  const rightDx = canvasSize.x - position.x - 20;
  const leftAngle = Math.atan2(dy, -leftDx);
  const rightAngle = Math.atan2(dy, rightDx);

  return getRandomFloat(rightAngle, leftAngle);
}
