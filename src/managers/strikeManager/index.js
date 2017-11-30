import config from 'config';

/**
 * Creates StrikeManager
 *
 * StrikeManager creates bullets, when player clicks on the page
 *
 * @param {Object} args.mouseController
 * @param {Function} args.getPlayerAngle
 * @param {Function} args.getPlayerPosition
 * @param {Object} args.enemiesManager
 * @param {Object} args.weaponsManager
 * @param {Object} args.bulletsManager
 * */
export default function createStrikeManager(args) {
  const {
    mouseController,
    getPlayerAngle,
    getPlayerPosition,
    enemiesManager,
    weaponsManager,
    bulletsManager,
  } = args;

  const { speed: bulletSpeed } = config.bullet;

  function strike() {
    if (!weaponsManager.hasAmmunition()) {
      return;
    }

    weaponsManager.useAmmunition();

    const angle = getPlayerAngle();
    const position = getPlayerPosition();

    const bullets = [
      { position: { ...position }, angle: angle - Math.PI / 50 },
      { position: { ...position }, angle },
      { position: { ...position }, angle: angle + Math.PI / 50 },
    ].map((bullet) => bulletsManager.addBullet(bullet));

    /*
    * Here I'm searching for bullets collisions with enemies
    * Bullet's speed is very high, so we can skip that fact, that enemy passes some
    * distance, before bullet reaches him, because it is very short distance
    *
    * First, find if there's a collision with enemy
    * If we have the collision, count distance and then time, in which bullet will reach enemy
    * And just set timeout for that time and kill enemy
    * */
    bullets.forEach(bullet => {
      const position = bullet.getPosition();
      const angle = bullet.getAngle();

      // intersection is the nearest enemy on the bullet track (or it is null)
      const intersection = enemiesManager.checkCollisionsWithBullet({ position, angle });
      if (intersection !== null) {
        const { enemyPosition, enemyId } = intersection;
        const dx = position.x - enemyPosition.x;
        const dy = position.y - enemyPosition.y;
        const distance = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
        const time = distance / bulletSpeed;

        setTimeout(() => {
          enemiesManager.shotToEnemy(enemyId);
          bulletsManager.removeBulletById(bullet.getId());
        }, time)
      }
    });
  }

  mouseController.subscribeForMouseClick(strike);
}