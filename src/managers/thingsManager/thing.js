/**
 * Creates a Thing
 *
 * Thing is an entity, that player can catch, for example, it can be coin or ammunition
 * Thing has an animation, we see sprites that change each other with some time
 *
 * @param {Number} args.id
 * @param {Object} args.position
 * @param {Object} args.size
 * @param {Image} args.texture
 * @param {Object} args.effect
 * @param {Canvas} args.canvas
 * @param {Number} args.angle
 * @param {Number} args.speed
 * @param {Number} args.spritesCount
 * @param {Number} args.spritesChangeTime
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

  const getId = () => id;
  const use = () => ({ ...effect });
  const getPosition = () => ({ ...position });
  const getSize = () => ({ ...size });

  const hasCollisionWithRect = ({ rectPosition, rectSize }) => (
    position.x + size.x / 2 >= rectPosition.x - rectSize.x / 2
      && position.x - size.x / 2 <= rectPosition.x + rectSize.x / 2
      && position.y + size.y / 2 >= rectPosition.y - rectSize.y / 2
      && position.y - size.y / 2 <= rectPosition.y + rectSize.y / 2
  );

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
