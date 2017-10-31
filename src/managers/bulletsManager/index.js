import config from './../../config';
import createBullet from './bullet';

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
      /*if (bullet.getPosition().y > canvas.getGameSize().y + bullet.getSize().y * 2) {
        removeBulletById(bullet.getId());
      }*/
    });
  };

  const addBullet = ({ position, angle }) => {
    const id = idsManager.getUniqueId();
    bullets.push(createBullet({
      id,
      angle,
      canvas,
      position,
      ...config.bullet,
    }));
  };

  return {
    drawBullets,
    updateBullets,
    addBullet,
  };
}