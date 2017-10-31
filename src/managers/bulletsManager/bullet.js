export default function createBullet(args) {
  const {
    id,
    position,
    size,
    texture,
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
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(position.x, position.y, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    /*ctx.drawImage(
      texture,
      size.x * currentSprite, 0, size.x, size.y,
      position.x - size.x / 2, position.y - size.y / 2, size.x, size.y,
    );*/
  };

  const getId = () => id;

  return {
    getId,
    draw,
    update,
  };
}