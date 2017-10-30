export default function createStrikeManager(args) {
  const {
    mouseController,
    getPlayerAngle,
    getPlayerPosition,
    enemiesManager,
    weaponsManager,
  } = args;

  function strike() {
    if (weaponsManager.hasAmmunition()) {
      weaponsManager.useAmmunition();
      const angle = getPlayerAngle();
      const position = getPlayerPosition();
      enemiesManager.checkCollisionsWithBullet({ angle, position });
    }
  }

  mouseController.subscribeForMouseClick(strike);
}