/**
 * Creates Bullet
 *
 * @param {Number} args.id
 * @param {Object} args.position
 * @param {Number} args.radius
 * @param {Canvas} args.canvas
 * @param {Number} args.angle
 * @param {Number} args.speed
 * */
export default function createBullet(args) {
  const {
    id,
    position,
    radius,
    canvas,
    angle,
    speed,
  } = args;

  const update = (deltaTime) => {
    position.x += Math.cos(angle) * speed * deltaTime;
    position.y += Math.sin(angle) * speed * deltaTime;
  };

  const draw = () => {
    const { ctx } = canvas;

    // We draw bullets as white circles
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  };

  const getPosition = () => ({ ...position });
  const getRadius = () => radius;
  const getAngle = () => angle;
  const getId = () => id;

  return {
    getId,
    draw,
    update,
    getPosition,
    getAngle,
    getRadius,
  };
}