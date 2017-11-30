import { THING_TYPES, ENEMY_TYPES } from './consts';

const canvas = {
  width: 900,
  height: 800,
};

const player = {
  textureUrl: 'images/player.png',
  position: { x: 150, y: canvas.height - 80 },
  walkingArea: {
    x: { from: 0, to: canvas.width },
    y: { from: canvas.height - 200, to: canvas.height },
  },
  size: { x: 46, y: 80 },
  maxSpeed: 0.65,
  radius: 25,
};

const config = {
  canvas,
  player,
  [ENEMY_TYPES.CHICKEN]: {
    textureUrl: 'images/white_chicken_texture.png',
    size: { x: 50, y: 61 },
    spritesCount: 2,
    spriteChangeTime: 250,
    speed: 0.05,
    maxSpeed: 0.25,
    health: 1,
  },
  [ENEMY_TYPES.GRAY_CHICKEN]: {
    textureUrl: 'images/gray_chicken_texture.png',
    size: { x: 50, y: 61 },
    spritesCount: 2,
    spriteChangeTime: 200,
    speed: 0.15,
    maxSpeed: 0.45,
    health: 1,
  },
  [THING_TYPES.AMMUNITION]: {
    size: { x: 60, y: 57 },
    speed: 0.45,
    textureUrl: 'images/shotgun.png',
  },
  [THING_TYPES.COIN]: {
    textureUrl: 'images/coin.png',
    size: { x: 55, y: 45 },
    spritesCount: 6,
    spriteChangeTime: 100,
    speed: 0.45,
  },
  aim: {
    textureUrl: 'images/aim.png',
    size: { x: 36, y: 36 },
  },
  bullet: {
    speed: 5,
    radius: 10,
  }
};

export default config;