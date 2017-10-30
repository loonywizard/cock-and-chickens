import createThing from './thing';
import config from './../../config';
import {
  getRandomInt,
  getRandomFloat,
} from './../../utils/random';

function getRandomAngle(position, canvasSize) {
  const dy = canvasSize.y - position.y;
  const leftDx = position.x - 20;
  const rightDx = canvasSize.x - position.x - 20;
  const leftAngle = Math.atan2(dy, -leftDx);
  const rightAngle = Math.atan2(dy, rightDx);

  return getRandomFloat(rightAngle, leftAngle);
}

export default function createThingsManager(args) {
  const {
    canvas,
    textures,
    idsManager,
  } = args;
  const things = [];

  function removeThingById(id) {
    let thingIndex;
    things.forEach((thing, index) => {
      if (thing.getId() === id) {
        thingIndex = index;
      }
    });
    things.splice(thingIndex, 1);
  }

  const drawThings = () => {
    things.forEach(thing => { thing.draw() });
  };

  const updateThings = (deltaTime) => {
    things.forEach(thing => {
      thing.update(deltaTime);
      if (thing.getPosition().y > canvas.getGameSize().y + thing.getSize().y * 2) {
        removeThingById(thing.getId());
      }
    });
  };

  const addThing = ({ position }) => {
    const isAmmunition = getRandomInt(0, 10) < 2;
    let effect;
    let type;
    if (isAmmunition) {
      type = 'ammunition';
      effect = { ammunitionCount: getRandomInt(10, 20) };
    } else {
      type = 'coin';
      effect = { coinsCount: 1 };
    }
    const angle = getRandomAngle(position, canvas.getGameSize());
    const id = idsManager.getUniqueId();
    things.push(createThing({
      id,
      effect,
      texture: textures[type],
      angle,
      canvas,
      position,
      ...config[type],
    }));
  };

  const handleCollisionsWithPlayer = ({ getPlayerPosition, getPlayerSize }) => {
    const playerPosition = getPlayerPosition();
    const playerSize = getPlayerSize();
    const result = [];
    const thingsIdsToRemove = [];
    things.forEach(thing => {
      if (
        thing.hasCollisionWithRect({
          rectPosition: playerPosition,
          rectSize: playerSize,
        })
      ) {
        result.push(thing.use());
        thingsIdsToRemove.push(thing.getId());
      }
    });
    thingsIdsToRemove.forEach(thingId => { removeThingById(thingId); });
    return result;
  };

  return {
    drawThings,
    updateThings,
    addThing,
    handleCollisionsWithPlayer,
  };
}