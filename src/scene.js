import createScreenSizeController from 'controllers/screenSize';
import createKeyboardController from 'controllers/keyboard';
import createMouseController from 'controllers/mouse';
import createTimeController from 'controllers/time';
import createThingsManager from 'managers/thingsManager';
import createEnemiesManager from 'managers/enemiesManager';
import createStrikeManager from 'managers/strikeManager';
import createWeaponsManager from 'managers/weaponsManager';
import createIdsManager from 'managers/idsManager';
import createScoreManager from 'managers/scoreManager';
import createBulletsManager from 'managers/bulletsManager';
import createInformationBoard from './informationBoard';
import createAim from './aim';
import createCanvas from './canvas';
import createPlayer from './player';
import { stopGame } from './actions';
import config from './config';

export default function Scene(store) {

  const sceneDiv = document.createElement('div');
  const screenSizeController = createScreenSizeController();
  const keyboardController = createKeyboardController();
  const mouseController = createMouseController();
  const timeController = createTimeController();

  let canvas;
  let player;
  let enemiesManager;
  let thingsManager;
  let strikeManager;
  let weaponsManager;
  let bulletsManager;
  let idsManager;
  let scoreManager;
  let informationBoard;
  let aim;

  this.init = function (textures) {
    sceneDiv.innerHTML = '';

    idsManager = createIdsManager();
    scoreManager = createScoreManager();

    weaponsManager = createWeaponsManager({
      ammunitionCount: 30,
    });

    canvas = createCanvas({
      height: config.canvas.height,
      width: config.canvas.width,
      parent: sceneDiv,
      screenSizeController,
    });

    thingsManager = createThingsManager({
      canvas,
      textures,
      idsManager,
    });

    enemiesManager = createEnemiesManager({
      canvas,
      textures,
      timeController,
      thingsManager,
      idsManager,
    });

    player = createPlayer({
      ...config.player,
      texture: textures.player,
      canvas,
      keyboardController,
      mouseController,
      screenSizeController,
      thingsManager,
      weaponsManager,
      scoreManager,
    });

    bulletsManager = createBulletsManager({
      canvas,
      idsManager,
    });

    strikeManager = createStrikeManager({
      getPlayerAngle: player.getAngle,
      getPlayerPosition: player.getPosition,
      mouseController,
      enemiesManager,
      weaponsManager,
      bulletsManager,
    });

    informationBoard = createInformationBoard({
      canvas,
      weaponsManager,
      scoreManager,
      textures,
    });

    aim = createAim({
      ...config.aim,
      texture: textures.aim,
      mouseController,
      canvas,
    });
  };

  function gameLoop() {
    timeController.makeTimeIteration();
    const deltaTime = timeController.getDeltaTime();

    canvas.clear();

    enemiesManager.update(deltaTime);
    thingsManager.updateThings(deltaTime);
    player.update(deltaTime);
    bulletsManager.updateBullets(deltaTime);
    aim.update();

    enemiesManager.drawEnemies();
    thingsManager.drawThings();
    bulletsManager.drawBullets();
    player.draw();
    informationBoard.displayInfo();
    aim.draw();

    if (enemiesManager.hasEnemyCrossedCanvas()) {
      store.dispatch(stopGame(scoreManager.getScore()));
      return;
    }

    requestAnimationFrame(gameLoop);
  }

  this.render = function () {
    return sceneDiv;
  };

  this.startGame = function () {
    timeController.start();
    gameLoop();
  }
}