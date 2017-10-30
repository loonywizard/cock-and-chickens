export default function createInformationBoard(args) {
  const {
    canvas,
    weaponsManager,
    scoreManager,
  } = args;

  const displayInfo = () => {
    const ammunitionCount = weaponsManager.getAmmunitionCount();
    const score = scoreManager.getScore();
    const canvasSize = canvas.getGameSize();
    const { ctx } = canvas;

    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';

    ctx.fillText(score, canvasSize.x - 200, 40);
    ctx.fillText(ammunitionCount, canvasSize.x - 80, 40);
  };

  return {
    displayInfo,
  };
}