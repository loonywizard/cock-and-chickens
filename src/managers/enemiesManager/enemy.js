/**
 * Creates Enemy
 *
 * @param {Object} args.position
 * @param {Object} args.size
 * @param {Number} args.speed
 * @param {Texture} args.texture
 * @param {Number} args.id
 * @param {Number} args.track
 * @param {Number} args.spritesCount
 * @param {Number} args.spriteChangeTime
 * */
export default function createEnemy(args) {
  const {
    position,
    size,
    speed,
    texture,
    id,
    track,
    spritesCount,
    spriteChangeTime,
  } = args;
  let { health } = args;
  let currentSprite = 0;
  let timeScinceSpriteWasChanged = 0;

  const draw = (ctx) => {
    ctx.drawImage(
      texture,
      size.x * currentSprite, 0, size.x, size.y,
      position.x - size.x / 2, position.y - size.y / 2, size.x, size.y,
    );
  };

  const update = (deltaTime) => {
    position.y += speed * deltaTime;

    timeScinceSpriteWasChanged += deltaTime;
    if (timeScinceSpriteWasChanged >= spriteChangeTime) {
      timeScinceSpriteWasChanged = 0;
      currentSprite = (currentSprite + 1) % spritesCount;
    }
  };

  const decreaseHealth = (hp = 1) => {
    health -= hp;
  };

  const getHealth = () => health;

  const getId = () => id;
  const getPosition = () => ({ ...position });
  const getSize = () => ({ ...size });
  const getTrack = () => track;
  const getSpeed = () => speed;

  return {
    draw,
    update,
    getId,
    getTrack,
    getSpeed,
    getPosition,
    getSize,
    decreaseHealth,
    getHealth,
  };
}