import createThing from './thing';
import config from '../../config';
import {
  getRandomInt,
  getRandomAngle,
} from '../../utils/random';
import { THING_TYPES } from '../../consts';

/**
 * Creates ThingsManager
 *
 * ThingsManager manages all things in the game,
 * it can update, draw them, find collisions with player
 *
 * @param {Canvas} args.canvas
 * @param {Object} args.textures
 * @param {IdsManager} args.idsManager
 * */
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

      // remove things, that are under bottom of page
      if (thing.getPosition().y > canvas.getGameSize().y + thing.getSize().y * 2) {
        removeThingById(thing.getId());
      }
    });
  };

  // We're creating random thing (coin or bullet) with random effect (ammunition count)
  const addThing = ({ position }) => {
    const isAmmunition = getRandomInt(0, 10) < 2;
    const angle = getRandomAngle(position, canvas.getGameSize());
    const id = idsManager.getUniqueId();
    let effect;
    let type;

    if (isAmmunition) {
      type = THING_TYPES.AMMUNITION;
      effect = { ammunitionCount: getRandomInt(10, 20) };
    } else {
      type = THING_TYPES.COIN;
      effect = { coinsCount: 1 };
    }

    things.push(createThing({
      id,
      effect,
      angle,
      canvas,
      position,
      texture: textures[type],
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

    // remove things, that have collisions with player
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