import config from 'config';

/**
 * Creates InformationBoard
 *
 * InformationBoard displays information about game: score and ammunition count
 *
 * @param {Canvas} args.canvas
 * @param {WeaponsManager} args.weaponsManager
 * @param {ScoreManager} args.scoreManager
 * @param {Textures} args.textures
 * */
export default function createInformationBoard(args) {
  const {
    canvas,
    weaponsManager,
    scoreManager,
    textures,
  } = args;

  const displayInfo = () => {
    const ammunitionCount = weaponsManager.getAmmunitionCount();
    const score = scoreManager.getScore();
    const canvasSize = canvas.getGameSize();
    const { ctx } = canvas;

    ctx.fillStyle = '#ffffff';
    ctx.font = '38px Courier New';

    ctx.drawImage(
      textures.coin,
      0, 0, config.coin.size.x, config.coin.size.y,
      canvasSize.x - 290, 15, config.coin.size.x, config.coin.size.y,
    );

    ctx.drawImage(
      textures.ammunition,
      canvasSize.x - 170, 10, config.ammunition.size.x, config.ammunition.size.y,
    );

    ctx.fillText(score, canvasSize.x - 220, 50);
    ctx.fillText(ammunitionCount, canvasSize.x - 80, 50);
  };

  return {
    displayInfo,
  };
}
