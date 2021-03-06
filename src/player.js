/**
 * Creates Player
 *
 * @param {Object} args.position
 * @param {Object} args.size
 * @param {KeyboardController} args.keyboardController
 * @param {MouseController} args.mouseController
 * @param {Canvas} args.canvas
 * @param {Texture} args.texture
 * @param {Number} args.maxSpeed
 * @param {Object} args.walkingArea
 * @param {ThingsManager} args.thingsManager
 * @param {WeaponsManager} args.weaponsManager
 * @param {ScoreManager} args.scoreManager
 * */
export default function createPlayer(args) {
  const {
    position,
    size,
    keyboardController,
    mouseController,
    canvas,
    texture,
    maxSpeed,
    walkingArea,
    thingsManager,
    weaponsManager,
    scoreManager,
  } = args;

  let angle = 0;

  const getAngle = () => angle;
  const getPosition = () => ({ ...position });
  const getSize = () => ({ ...size });

  function calculateAngle() {
    const canvasOffset = canvas.getOffset();
    const canvasGameSize = canvas.getGameSize();
    const canvasRealSize = canvas.getRealSize();
    const coefficientX = canvasGameSize.x / canvasRealSize.x;
    const coefficientY = canvasGameSize.y / canvasRealSize.y;
    const mouseCoordinates = mouseController.getMouseCoordinates();
    const dx = mouseCoordinates.x * coefficientX - (canvasOffset.x * coefficientX + position.x);
    const dy = mouseCoordinates.y * coefficientY - (canvasOffset.y * coefficientY + position.y);
    angle = Math.atan2(dy, dx);
  }

  mouseController.subscribeForMouseMove(calculateAngle);

  const draw = () => {
    const { ctx } = canvas;
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.drawImage(texture, -size.x / 2, -size.y / 2, size.x, size.y);
    ctx.restore();
  };

  const update = (deltaTime) => {
    const speed = {
      x: 0,
      y: 0,
    };

    if (keyboardController.isKeyPressed('A')) {
      speed.x -= maxSpeed;
    }
    if (keyboardController.isKeyPressed('D')) {
      speed.x += maxSpeed;
    }
    if (keyboardController.isKeyPressed('W')) {
      speed.y -= maxSpeed;
    }
    if (keyboardController.isKeyPressed('S')) {
      speed.y += maxSpeed;
    }

    if (Math.abs(speed.x) === Math.abs(speed.y)) {
      speed.x *= Math.cos(Math.PI / 4);
      speed.y *= Math.cos(Math.PI / 4);
    }

    if (
      position.x + speed.x * deltaTime + size.x / 2 >= walkingArea.x.to
      || position.x + speed.x * deltaTime - size.x / 2 <= walkingArea.x.from
    ) {
      speed.x = 0;
    }

    if (
      position.y + speed.y * deltaTime + size.y / 2 >= walkingArea.y.to
      || position.y + speed.y * deltaTime - size.y / 2 <= walkingArea.y.from
    ) {
      speed.y = 0;
    }

    if (speed.x || speed.y) {
      calculateAngle();
    }

    position.x += speed.x * deltaTime;
    position.y += speed.y * deltaTime;

    const things = thingsManager.handleCollisionsWithPlayer({
      getPlayerPosition: getPosition,
      getPlayerSize: getSize,
    });

    things.forEach((thingEffect) => {
      if (thingEffect.ammunitionCount) {
        weaponsManager.addAmmunition(thingEffect.ammunitionCount);
      }
      if (thingEffect.coinsCount) {
        scoreManager.increaseScore(thingEffect.coinsCount);
      }
    });
  };

  return {
    draw,
    update,
    getAngle,
    getPosition,
  };
}
