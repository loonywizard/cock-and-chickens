/**
 * Creates a thing, it can be an ammunition, some paper tips, etc,
 * things are animated, they do small movements from top to down
 * for small distances
 * player can pick up a thing if he go throw it or if he clicks on it
 * if mouse is over the thing, mouse cursor has type "hand"
 * 
 * @param args.id
 * @param args.position: position of left top corner of a thing
 * @param args.size: size of the thing
 * @param args.effect: an object, that consists of an effect of that thing,
 *  see config for things for examples
 * @param args.textureUrl: url to texture for using as src for texture
 * @param args.canvas
 * @param args.cameraController
 * @param args.mouseController
 * @param args.animationSpeed
 * @param args.animationDistance: an Y distance for position changes
 * */
export default function createThing(args) {
  const {
    id,
    position,
    size,
    texture,
    effect,
    canvas,
    angle,
    speed,
    spritesCount,
    spriteChangeTime,
  } = args;
  let currentSprite = 0;
  let timeScinceSpriteWasChanged = 0;

  const update = (deltaTime) => {
    position.x += Math.cos(angle) * speed * deltaTime;
    position.y += Math.sin(angle) * speed * deltaTime;

    timeScinceSpriteWasChanged += deltaTime;
    if (timeScinceSpriteWasChanged >= spriteChangeTime) {
      timeScinceSpriteWasChanged = 0;
      currentSprite = (currentSprite + 1) % spritesCount;
    }
  };

  const draw = () => {
    const { ctx } = canvas;
    ctx.drawImage(
      texture,
      size.x * currentSprite, 0, size.x, size.y,
      position.x - size.x / 2, position.y - size.y / 2, size.x, size.y,
    );
  };

  const use = () => effect;
  const getId = () => id;
  const getPosition = () => ({ ...position });
  const getSize = () => ({ ...size });

  const hasCollisionWithRect = ({ rectPosition, rectSize }) => {
    return (
      position.x + size.x / 2 >= rectPosition.x - rectSize.x / 2
      && position.x - size.x / 2 <= rectPosition.x + rectSize.x / 2
      && position.y + size.y / 2 >= rectPosition.y - rectSize.y / 2
      && position.y - size.y / 2 <= rectPosition.y + rectSize.y / 2
    );
  };

  return {
    getId,
    use,
    draw,
    update,
    getPosition,
    getSize,
    hasCollisionWithRect,
  };
}