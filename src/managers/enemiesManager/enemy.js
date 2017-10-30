export default function createEnemy(args) {
  const {
    position,
    size,
    speed,
    texture,
    id,
    radius,
    track,
  } = args;
  let { health } = args;

  const draw = (ctx) => {
    ctx.drawImage(texture, position.x - size.x / 2, position.y - size.y / 2, size.x, size.y);
  };

  const update = (deltaTime) => {
    position.y += speed * deltaTime;
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