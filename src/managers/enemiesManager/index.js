import createEnemy from './enemy';
import config from '../../config';
import { getRandomInt } from '../../utils/random';
import { findIntersectionBetweenRayAndSegment } from '../../utils/collisions';
import { ENEMY_TYPES } from '../../consts';

/**
 * Creates EnemyManager
 *
 * EnemyManager can add, remove, update and draw enemies
 *
 * @param {Canvas} args.canvas
 * @param {Textures} args.textures
 * @param {TimeController} args.timeController
 * @param {ThingsManager} args.thingsManager
 * @param {IdsManager} args.idsManager
 * */
export default function createEnemiesManager(args) {
  const {
    canvas,
    textures,
    timeController,
    thingsManager,
    idsManager,
  } = args;

  const enemies = [];

  let enemyCrossedCanvas = false;
  let createEnemyTimeout;

  function getFreeTracks(speed) {
    const tracks = [];
    for (let i = 1; i <= 10; i++) {
      if (isTrackFree(i, speed)) {
        tracks.push(i);
      }
    }
    return tracks;
  }

  function isTrackFree(track, speed) {
    for (let i = 0; i < enemies.length; i += 1) {
      const enemy = enemies[i];
      const enemyTrack = enemy.getTrack();
      const enemySpeed = enemy.getSpeed();
      const enemyPosition = enemy.getPosition();
      const canvasSize = canvas.getGameSize();
      if (enemyTrack !== track) continue;
      if (speed <= enemySpeed) continue;
      if (canvasSize.y / speed <= (canvasSize.y - enemyPosition.y) / enemySpeed) return false;
    }
    return true;
  }

  function chooseTypeForNewEnemy() {
    const randomInt = getRandomInt(0, 20);
    if (randomInt < 15)
      return ENEMY_TYPES.CHICKEN;
    return ENEMY_TYPES.GRAY_CHICKEN;
  }

  function createNewEnemy() {
    const gameTime = timeController.getGameTime();

    let type = chooseTypeForNewEnemy();
    let speed = config[type].speed + gameTime / 10e5 < config[type].maxSpeed ?
      config[type].speed + gameTime / 10e5 : config[type].maxSpeed;
    let freeTracks = getFreeTracks(speed);

    while (freeTracks.length === 0) {
      type = chooseTypeForNewEnemy();
      speed = config[type].speed + gameTime / 10e5 < config[type].maxSpeed ?
        config[type].speed + gameTime / 10e5 : config[type].maxSpeed;
      freeTracks = getFreeTracks(speed);
    }

    const track = freeTracks[getRandomInt(0, freeTracks.length - 1)];

    enemies.push(createEnemy({
      ...config[type],
      position: { x: track * 800 / 11, y: -config[type].size.y },
      texture: textures[type],
      id: idsManager.getUniqueId(),
      track,
      speed,
    }));

    const x = 1 - gameTime / (4 * 10e3) > 0 ? 1 - gameTime / (4 * 10e3) : 0;

    createEnemyTimeout = setTimeout(createNewEnemy, 550 + x * 450);
  }

  createEnemyTimeout = setTimeout(createNewEnemy, 1000);

  function findEnemyById(id) {
    for (let i = 0; i < enemies.length; i += 1) {
      if (enemies[i].getId() === id) {
        return enemies[i];
      }
    }
  }

  function deleteEnemyById(id) {
    let index = -1;
    for (let i = 0; i < enemies.length; i++) {
      if (id === enemies[i].getId()) {
        index = i;
        break;
      }
    }
    enemies.splice(index, 1);
  }

  const update = (deltaTime) => {
    enemies.forEach(enemy => {
      enemy.update(deltaTime);

      if (enemy.getPosition().y >= canvas.getGameSize().y) {
        enemyCrossedCanvas = true;
        clearTimeout(createEnemyTimeout);
      }
    });
  };

  const drawEnemies = () => {
    enemies.forEach(enemy => { enemy.draw(canvas.ctx); });
  };

  const checkCollisionsWithBullet = ({ angle, position }) => {
    const ray = {
      a: { x: position.x, y: position.y },
      b: { x: position.x + 100 * Math.cos(angle), y: position.y + 100 * Math.sin(angle) },
    };

    const intersections = [];

    enemies.forEach(enemy => {
      const enemyPosition = enemy.getPosition();
      const enemySize = enemy.getSize();

      const segments = [
        {
          a: { x: enemyPosition.x - enemySize.x / 2,  y: enemyPosition.y - enemySize.y / 2 },
          b: { x: enemyPosition.x + enemySize.x / 2,  y: enemyPosition.y - enemySize.y / 2 },
        },
        {
          a: { x: enemyPosition.x - enemySize.x / 2,  y: enemyPosition.y - enemySize.y / 2 },
          b: { x: enemyPosition.x - enemySize.x / 2,  y: enemyPosition.y + enemySize.y / 2 },
        },
        {
          a: { x: enemyPosition.x + enemySize.x / 2,  y: enemyPosition.y - enemySize.y / 2 },
          b: { x: enemyPosition.x + enemySize.x / 2,  y: enemyPosition.y + enemySize.y / 2 },
        },
        {
          a: { x: enemyPosition.x - enemySize.x / 2,  y: enemyPosition.y + enemySize.y / 2 },
          b: { x: enemyPosition.x + enemySize.x / 2,  y: enemyPosition.y + enemySize.y / 2 },
        },
      ];

      for (let i = 0; i < segments.length; i++) {
        const intersect = findIntersectionBetweenRayAndSegment(ray,segments[i]);
        if (!!intersect) {
          const dx = intersect.x - ray.a.x;
          const dy = intersect.y - ray.a.y;
          const distance = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);

          intersections.push({
            distance,
            enemyId: enemy.getId(),
          })
        }
      }
    });

    let closestIntersection;

    intersections.forEach(intersection => {
      if (!closestIntersection || intersection.distance < closestIntersection.distance) {
        closestIntersection = intersection;
      }
    });

    if (closestIntersection) {
      return  {
        enemyId: closestIntersection.enemyId,
        enemyPosition: findEnemyById(closestIntersection.enemyId).getPosition(),
      };
    } else {
      return null;
    }
  };

  const shotToEnemy = (enemyId) => {
    const enemy = findEnemyById(enemyId);

    if (!enemy) return;

    enemy.decreaseHealth();
    if (enemy.getHealth() <= 0) {
      const countOfThingsToCreate = getRandomInt(1, 5);
      for (let i = 0; i < countOfThingsToCreate; i += 1) {
        thingsManager.addThing({ position: enemy.getPosition() });
      }
      deleteEnemyById(enemyId);
    }
  };

  const hasEnemyCrossedCanvas = () => enemyCrossedCanvas;

  return {
    drawEnemies,
    update,
    checkCollisionsWithBullet,
    hasEnemyCrossedCanvas,
    shotToEnemy,
  };
}