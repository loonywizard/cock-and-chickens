import config from './../../config';

export default function createStrikeManager(args) {
  const {
    mouseController,
    getPlayerAngle,
    getPlayerPosition,
    enemiesManager,
    weaponsManager,
    bulletsManager,
  } = args;

  const bulletSpeed = config.bullet.speed;

  function strike() {
    if (weaponsManager.hasAmmunition()) {
      weaponsManager.useAmmunition();
      const angle = getPlayerAngle();
      const position = getPlayerPosition();

      const bullets = [
        { position: { ...position }, angle: angle - Math.PI / 50 },
        { position: { ...position }, angle },
        { position: { ...position }, angle: angle + Math.PI / 50 },
      ];

      bullets.forEach(bullet => {
        bulletsManager.addBullet(bullet);
        const intersection = enemiesManager.checkCollisionsWithBullet(bullet);
        if (intersection !== null) {
          const { enemyPosition, enemyId } = intersection;
          const distance = Math.pow(
            Math.pow(bullet.position.x - enemyPosition.x, 2)
            + Math.pow(bullet.position.y - enemyPosition.y, 2),
            0.5
          );
          const time = distance / bulletSpeed;
          setTimeout(() => { enemiesManager.shotToEnemy(enemyId); }, time)
        }
      });
    }
  }

  mouseController.subscribeForMouseClick(strike);
}