import config from './../../config';
import createBullet from './bullet';

/**
 * Creates BulletsManager
 *
 * BulletsManager manages all bullets in game
 * Manager can add, remove, update and draw bullets
 *
 * @param {Canvas} args.canvas
 * @param {IdsManager} args.idsManager
 * */
export default function createBulletsManager(args) {
  const {
    canvas,
    idsManager,
  } = args;
  
  const bullets = [];

  function removeBulletById(id) {
    let bulletIndex;
    bullets.forEach((bullet, index) => {
      if (bullet.getId() === id) {
        bulletIndex = index;
      }
    });
    bullets.splice(bulletIndex, 1);
  }

  const drawBullets = () => {
    bullets.forEach(bullet => { bullet.draw() });
  };

  const updateBullets = (deltaTime) => {
    bullets.forEach(bullet => {
      bullet.update(deltaTime);

      // remove bullets, that are out of screen
      const bulletPosition = bullet.getPosition();
      const bulletRadius = bullet.getRadius();
      const gameScreenSize = canvas.getGameSize();

      const isBulletOutOfScreen = (
        bulletPosition.y + bulletRadius < 0 ||
        bulletPosition.y - bulletRadius > gameScreenSize.y ||
        bulletPosition.x + bulletRadius < 0 ||
        bulletPosition.x - bulletRadius > gameScreenSize.x
      );

      if (isBulletOutOfScreen) {
        removeBulletById(bullet.getId());
      }
    });
  };

  const addBullet = ({ position, angle }) => {
    const id = idsManager.getUniqueId();
    const bullet = createBullet({
      id,
      angle,
      canvas,
      position,
      ...config.bullet,
    });

    bullets.push(bullet);

    return bullet;
  };

  return {
    drawBullets,
    updateBullets,
    addBullet,
    removeBulletById,
  };
}